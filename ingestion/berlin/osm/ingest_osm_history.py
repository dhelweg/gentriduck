"""
ingestion/berlin/osm/ingest_osm_history.py
==========================================
C1 — OSM full-history ingestion → annual POI snapshots for Berlin.

Source (ADR-0002, Option B):
  Geofabrik internal server — regional Germany .osh.pbf
  URL: https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf
  Requires: OSM contributor account login (browser download with session cookie).
  Licence: ODbL — https://www.openstreetmap.org/copyright

Processing:
  osmium (PyPI, BSL-1.0, v4+) reads the .osh.pbf history file.
  For each target year, we extract a point-in-time snapshot (features visible
  at YYYY-01-01T00:00:00Z), filtered to the Berlin bounding box and the
  poi_mapping tag set.  Output: one GeoParquet per year under
  data/raw/osm/berlin/<year>.parquet.

Usage:
  uv run python ingestion/berlin/osm/ingest_osm_history.py \\
      --osh-pbf data/raw/osm/germany-internal.osh.pbf \\
      --out-dir data/raw/osm/berlin \\
      --years 2008-2024

Dependency note (new in C1):
  `osmium` (PyPI, BSL-1.0) was added to pyproject.toml as part of this task.
  ADR-0002 selected the .osh.pbf + libosmium toolchain as Option B; the `osmium`
  Python package provides the cross-platform Python binding without requiring the
  osmium-tool CLI.

Attribution (mandatory — ODbL):
  All output parquet files carry source_attribution = "OSM via Geofabrik full-
  history .osh.pbf / ODbL — https://www.openstreetmap.org/copyright".
  The dbt staging model (stg_osm_poi) and the website attribution page (Epic G3)
  must surface this attribution.
"""

from __future__ import annotations

import argparse
import datetime
import logging
import sys
from pathlib import Path
from typing import Any

import osmium
import osmium.osm
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Berlin bounding box (WGS-84, degrees).
# Source: OpenStreetMap Nominatim — Berlin, Germany.
BERLIN_MIN_LON = 13.088
BERLIN_MAX_LON = 13.761
BERLIN_MIN_LAT = 52.338
BERLIN_MAX_LAT = 52.675

# ODbL attribution string stored per-row.
SOURCE_ATTRIBUTION = (
    "OSM via Geofabrik full-history .osh.pbf / ODbL — https://www.openstreetmap.org/copyright"
)

CITY_CODE = "berlin"

# Default year range: thesis year + forward through most recent complete year.
DEFAULT_YEARS = list(range(2008, 2025))

# Snapshot timestamp: YYYY-01-01T00:00:00Z — features active at start of year.
# A feature is "active" if: it had been created before this timestamp AND
# its latest version before this timestamp is visible (not deleted).
SNAPSHOT_HOUR = datetime.time(0, 0, 0, tzinfo=datetime.timezone.utc)

# Parquet schema for the output files.
# Matches the stg_osm_poi.sql schema exactly.
OUTPUT_SCHEMA = pa.schema(
    [
        ("city_code", pa.string()),
        ("area_code", pa.string()),  # PLR code — populated if LOR data available
        ("snapshot_year", pa.int32()),
        ("osm_id", pa.string()),
        ("poi_domain", pa.string()),
        ("poi_category", pa.string()),
        ("poi_type", pa.string()),
        ("lon", pa.float64()),
        ("lat", pa.float64()),
        ("source_attribution", pa.string()),
    ]
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stdout,
)
log = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# POI mapping loader
# ---------------------------------------------------------------------------


def load_poi_mapping(seeds_dir: Path) -> dict[tuple[str, str], tuple[str, str, str]]:
    """Return a dict mapping (osm_key, osm_value) -> (domain, category, poi_type).

    The seed_poi_mapping.csv does not contain OSM tag keys/values; it contains
    the *category labels* from the 2018 thesis.  We therefore maintain a
    supplementary OSM tag lookup table here.  This keeps the mapping logic in
    the ingestion layer (not dbt) so that the staging model merely reads
    pre-mapped parquet files.

    The mapping is intentionally broad: we capture the superset of tags that
    correspond to any poi_type in seed_poi_mapping.csv, then project down via
    the seed in dbt (int_poi_mapping).

    Expand this table as new indicators are added (Epic C2 tag-drift work).
    """
    # fmt: off
    # (osm_key, osm_value) -> (domain, category, poi_type)
    # Values match the seed_poi_mapping.csv labels exactly.
    mapping: dict[tuple[str, str], tuple[str, str, str]] = {
        # Tourism / Accommodation
        ("tourism", "hostel"):              ("Tourism", "Accommodation", "Hostel"),
        ("tourism", "hotel"):               ("Tourism", "Accommodation", "Hotel"),
        ("tourism", "guest_house"):         ("Tourism", "Accommodation", "Other Accommodation"),
        ("tourism", "motel"):               ("Tourism", "Accommodation", "Other Accommodation"),
        ("tourism", "chalet"):              ("Tourism", "Accommodation", "Other Accommodation"),
        ("tourism", "apartment"):           ("Tourism", "Accommodation", "Other Accommodation"),
        # Tourism / Sights
        ("tourism", "artwork"):             ("Tourism", "Sights", "Artwork"),
        ("tourism", "viewpoint"):           ("Tourism", "Sights", "Viewpoint"),
        ("historic", "monument"):           ("Tourism", "Sights", "Other Monument"),
        ("historic", "memorial"):           ("Tourism", "Sights", "Other Monument"),
        ("historic", "building"):           ("Tourism", "Sights", "Listed Building"),
        # Tourism / Info
        ("tourism", "information"):         ("Tourism", "Info", "Info"),
        # Entertainment / Culture
        ("amenity", "arts_centre"):         ("Entertainment", "Culture", "Art Center"),
        ("tourism", "gallery"):             ("Entertainment", "Culture", "Gallery"),
        ("tourism", "museum"):              ("Entertainment", "Culture", "Museum"),
        ("amenity", "theatre"):             ("Entertainment", "Culture", "Theater"),
        ("tourism", "zoo"):                 ("Entertainment", "Culture", "Zoo"),
        # Entertainment / Nightlife
        ("amenity", "casino"):              ("Entertainment", "Nightlife", "Gambling"),
        ("amenity", "nightclub"):           ("Entertainment", "Nightlife", "Nightclub"),
        ("amenity", "brothel"):             ("Entertainment", "Nightlife", "Brothel"),
        # Entertainment / Leisure
        ("amenity", "cinema"):              ("Entertainment", "Leisure", "Cinema"),
        # Entertainment / Bar
        ("amenity", "bar"):                 ("Entertainment", "Bar", "Bar"),
        ("amenity", "pub"):                 ("Entertainment", "Bar", "Pub"),
        # Sports and Recreation
        ("leisure", "swimming_pool"):       ("Sports and Recreation", "Sport", "Swimming"),
        ("sport", "basketball"):            ("Sports and Recreation", "Sport", "Basketball"),
        ("sport", "soccer"):                ("Sports and Recreation", "Sport", "Football"),
        ("sport", "football"):              ("Sports and Recreation", "Sport", "Football"),
        ("leisure", "sports_centre"):       ("Sports and Recreation", "Sport", "Sports Center"),
        ("sport", "table_tennis"):          ("Sports and Recreation", "Sport", "Table Tennis"),
        ("leisure", "sauna"):               ("Sports and Recreation", "Recreation", "Sauna"),
        ("sport", "tennis"):                ("Sports and Recreation", "Sport", "Tennis"),
        ("sport", "martial_arts"):          ("Sports and Recreation", "Sport", "Martial Arts"),
        ("leisure", "fitness_centre"):      ("Sports and Recreation", "Sport", "Fitness Center"),
        ("leisure", "playground"):          ("Sports and Recreation", "Recreation", "Playground"),
        ("leisure", "water_park"):          ("Sports and Recreation", "Recreation", "Water Sports"),
        # Gastronomy
        ("amenity", "restaurant"):          ("Gastronomy", "Restaurant", "Other Restaurant"),
        ("amenity", "fast_food"):           ("Gastronomy", "Fast Food", "Other Fast Food"),
        ("amenity", "cafe"):                ("Gastronomy", "Cafe", "Other Cafes"),
        ("amenity", "ice_cream"):           ("Gastronomy", "Cafe", "Ice Cream Shop"),
        ("amenity", "beer_garden"):         ("Gastronomy", "Restaurant", "Beer Garden"),
        # Public Service / Education
        ("amenity", "kindergarten"):        ("Public Service", "Education", "Kindergarten"),
        ("amenity", "university"):          ("Public Service", "Education", "University"),
        ("amenity", "college"):             ("Public Service", "Education", "University"),
        ("amenity", "daycare"):             ("Public Service", "Education", "Daycare"),
        ("amenity", "school"):              ("Public Service", "Education", "School"),
        ("amenity", "library"):             ("Public Service", "Education", "Library"),
        ("amenity", "music_school"):        ("Public Service", "Other", "Music School"),
        ("amenity", "driving_school"):      ("Public Service", "Other", "Driving School"),
        # Public Service / Health
        ("amenity", "dentist"):             ("Public Service", "Health", "Dentist"),
        ("amenity", "veterinary"):          ("Public Service", "Health", "Vet"),
        ("amenity", "doctors"):             ("Public Service", "Health", "Doctor"),
        ("amenity", "pharmacy"):            ("Public Service", "Health", "Pharmacy"),
        ("amenity", "hospital"):            ("Public Service", "Health", "Hospital"),
        ("amenity", "clinic"):              ("Public Service", "Health", "Clinic"),
        # Public Service / Safety
        ("amenity", "police"):              ("Public Service", "Safety", "Police"),
        ("amenity", "fire_station"):        ("Public Service", "Safety", "Fire Station"),
        # Public Service / Social
        ("amenity", "community_centre"):    ("Public Service", "Social", "Community Center"),
        ("amenity", "social_facility"):     ("Public Service", "Social", "Social Service"),
        # Public Service / Bank
        ("amenity", "bank"):                ("Public Service", "Bank", "Bank Branch"),
        ("amenity", "atm"):                 ("Public Service", "Bank", "ATM"),
        # Public Service / Other
        ("amenity", "marketplace"):         ("Public Service", "Other", "Weekly Market"),
        # Mobility
        ("amenity", "fuel"):                ("Mobility", "Individual", "Gas Station"),
        ("amenity", "car_rental"):          ("Mobility", "Individual", "Car Rental"),
        ("amenity", "charging_station"):    ("Mobility", "Individual", "Charging Station"),
        ("amenity", "bicycle_rental"):      ("Mobility", "Individual", "Bike Rental"),
        ("amenity", "taxi"):                ("Mobility", "Individual", "Taxi Stand"),
        ("amenity", "parking"):             ("Mobility", "Individual", "Parking Lot"),
        ("amenity", "bicycle_parking"):     ("Mobility", "Individual", "Bike Parking"),
        ("amenity", "vending_machine"):     ("Mobility", "Individual", "Parking Ticket Machine"),
        ("highway", "bus_stop"):            ("Mobility", "Public Transport", "Stop"),
        ("public_transport", "stop_position"): ("Mobility", "Public Transport", "Stop"),
        # Public Space
        ("amenity", "toilets"):             ("Public Space", "Toilet", "Toilet"),
        ("amenity", "post_office"):         ("Public Space", "Post", "Post Office"),
        ("amenity", "telephone"):           ("Public Space", "Phone", "Phone"),
        ("amenity", "recycling"):           ("Public Space", "Recycling", "Glass Container"),
        ("amenity", "waste_basket"):        ("Public Space", "Recycling", "Trash Can"),
        ("amenity", "bench"):               ("Public Space", "Bench", "Park Bench"),
        ("amenity", "post_box"):            ("Public Space", "Mail", "Mailbox"),
        ("amenity", "parcel_locker"):       ("Public Space", "Mail", "Parcel Locker"),
        ("amenity", "bbq"):                 ("Public Space", "Other", "Barbecue Area"),
        # Religion
        ("amenity", "place_of_worship"):    ("Religion", "Religious Buildings", "Church"),
        ("landuse", "cemetery"):            ("Religion", "Cemetery", "Cemetery"),
        # Office
        ("office", "yes"):                  ("Office", "Office", "Office"),
        # Hipster / Coworking
        ("amenity", "coworking_space"):     ("Other", "Hipster", "Coworking Space"),
        # Embassy
        ("amenity", "embassy"):             ("Other", "Other", "Embassy"),
        # Retail / Food
        ("shop", "bakery"):                 ("Retail", "Food and Drink", "Bakery"),
        ("shop", "supermarket"):            ("Retail", "Food and Drink", "Supermarket"),
        ("shop", "kiosk"):                  ("Retail", "Food and Drink", "Kiosk"),
        ("shop", "beverages"):              ("Retail", "Food and Drink", "Beverages"),
        ("shop", "deli"):                   ("Retail", "Food and Drink", "Delicatessen"),
        ("shop", "alcohol"):                ("Retail", "Food and Drink", "Liquor"),
        ("shop", "butcher"):                ("Retail", "Food and Drink", "Butcher"),
        ("shop", "confectionery"):          ("Retail", "Food and Drink", "Sweets"),
        ("shop", "convenience"):            ("Retail", "Food and Drink", "Kiosk"),
        # Retail / Clothing
        ("shop", "clothes"):                ("Retail", "Clothing", "Clothing"),
        ("shop", "shoes"):                  ("Retail", "Clothing", "Shoes"),
        ("shop", "boutique"):               ("Retail", "Clothing", "Boutique"),
        ("shop", "second_hand"):            ("Retail", "Clothing", "Second Hand"),
        ("shop", "tailor"):                 ("Retail", "Clothing", "Tailor"),
        ("shop", "sports"):                 ("Retail", "Clothing", "Sports"),
        # Retail / Other
        ("shop", "florist"):                ("Retail", "Other Goods", "Florist"),
        ("shop", "jewelry"):                ("Retail", "Other Goods", "Jewelry"),
        ("shop", "furniture"):              ("Retail", "Other Goods", "Furniture"),
        ("shop", "electronics"):            ("Retail", "Tech", "Electronics"),
        ("shop", "mobile_phone"):           ("Retail", "Tech", "Mobile"),
        ("shop", "computer"):               ("Retail", "Other Goods", "Computer"),
        ("shop", "toys"):                   ("Retail", "Toys and Gifts", "Toys"),
        ("shop", "gift"):                   ("Retail", "Toys and Gifts", "Gifts"),
        ("shop", "books"):                  ("Retail", "Print", "Books"),
        ("shop", "photo"):                  ("Retail", "Art", "Photo"),
        ("shop", "art"):                    ("Retail", "Art", "Art"),
        ("shop", "optician"):               ("Retail", "Medical", "Optician"),
        ("shop", "hearing_aids"):           ("Retail", "Medical", "Hearing Aid"),
        ("shop", "medical_supply"):         ("Retail", "Medical", "Medical"),
        ("shop", "drugstore"):              ("Retail", "Drugstore", "Drugstore"),
        ("shop", "discount"):               ("Retail", "Other Goods", "Discount Market"),
        ("shop", "hardware"):               ("Retail", "Hardware", "Hardware Store"),
        ("shop", "trade"):                  ("Retail", "Hardware", "Ironmonger"),
        ("shop", "pet"):                    ("Retail", "Other Goods", "Pet Shop"),
        ("shop", "fabric"):                 ("Retail", "Other Goods", "Textile Shop"),
        ("shop", "stationery"):             ("Retail", "Print", "Copy Shop"),
        ("shop", "newspaper"):              ("Retail", "Print", "Newspaper"),
        ("shop", "copyshop"):               ("Retail", "Print", "Copy Shop"),
        ("shop", "decoration"):             ("Retail", "Other Goods", "Decoration"),
        # Retail / Workshop
        ("shop", "bicycle"):                ("Retail", "Workshop", "Bicycle"),
        ("shop", "car_repair"):             ("Retail", "Workshop", "Car Repair"),
        ("shop", "car"):                    ("Retail", "Workshop", "Car Dealership"),
        # Services
        ("shop", "hairdresser"):            ("Services", "Hairdresser", "Hairdresser"),
        ("shop", "beauty"):                 ("Services", "Beauty", "Beauty"),
        ("shop", "massage"):                ("Services", "Massage", "Massage"),
        ("shop", "travel_agency"):          ("Services", "Travel", "Travel"),
        ("shop", "laundry"):                ("Services", "Laundry", "Laundromat"),
        ("shop", "dry_cleaning"):           ("Services", "Laundry", "Dry Cleaning"),
        ("amenity", "funeral_hall"):        ("Services", "Funeral", "Funeral Home"),
        # Vacancy
        ("shop", "vacant"):                 ("Vacancy", "Vacancy", "Vacancy"),
        ("disused:shop", "yes"):            ("Vacancy", "Vacancy", "Vacancy"),
    }
    # fmt: on
    return mapping


# ---------------------------------------------------------------------------
# Core snapshot extractor
# ---------------------------------------------------------------------------


class _HistorySnapshotHandler(osmium.SimpleHandler):
    """osmium SimpleHandler that extracts a point-in-time snapshot from .osh.pbf.

    For each node in the history file, the handler receives ALL versions of that
    node in increasing version order.  We track the "best candidate" for each
    osm_id: the latest version whose timestamp is <= the snapshot datetime.

    Only nodes within the Berlin bounding box and matching the POI tag mapping
    are retained.

    Args:
        snapshot_dt: The point-in-time to snapshot (UTC).
        poi_mapping: Dict of (osm_key, osm_value) -> (domain, category, poi_type).
        year: The snapshot year integer (stored in output rows).
    """

    def __init__(
        self,
        snapshot_dt: datetime.datetime,
        poi_mapping: dict[tuple[str, str], tuple[str, str, str]],
        year: int,
    ) -> None:
        super().__init__()
        self.snapshot_dt = snapshot_dt
        self.poi_mapping = poi_mapping
        self.year = year
        # osm_id -> row dict (updated as we encounter later applicable versions)
        self._candidates: dict[int, dict[str, Any]] = {}

    def node(self, n: osmium.osm.Node) -> None:
        """Called for each node version in the history file."""
        # Skip if this version was created after the snapshot date.
        if n.timestamp > self.snapshot_dt:
            return

        # Quick bbox pre-filter (lon/lat available on nodes).
        try:
            lon = n.lon
            lat = n.lat
        except Exception:
            return
        if not (
            BERLIN_MIN_LON <= lon <= BERLIN_MAX_LON and BERLIN_MIN_LAT <= lat <= BERLIN_MAX_LAT
        ):
            return

        # Check visibility — deleted nodes are not "active" at snapshot time.
        if not n.visible:
            # If this node was deleted before snapshot_dt, clear any prior candidate.
            self._candidates.pop(n.id, None)
            return

        # Match tags to POI mapping — take the first matching (key, value) pair.
        poi_match: tuple[str, str, str] | None = None
        for tag in n.tags:
            key = tag.k
            val = tag.v
            match = self.poi_mapping.get((key, val))
            if match is not None:
                poi_match = match
                break

        if poi_match is None:
            # Node doesn't match any POI type — remove any prior candidate.
            self._candidates.pop(n.id, None)
            return

        domain, category, poi_type = poi_match
        self._candidates[n.id] = {
            "city_code": CITY_CODE,
            "area_code": None,  # populated by dbt join to LOR geometry
            "snapshot_year": self.year,
            "osm_id": f"node/{n.id}",
            "poi_domain": domain,
            "poi_category": category,
            "poi_type": poi_type,
            "lon": lon,
            "lat": lat,
            "source_attribution": SOURCE_ATTRIBUTION,
        }

    def get_rows(self) -> list[dict[str, Any]]:
        """Return the collected snapshot rows."""
        return list(self._candidates.values())


def extract_snapshot(
    osh_pbf_path: Path,
    year: int,
    poi_mapping: dict[tuple[str, str], tuple[str, str, str]],
) -> pd.DataFrame:
    """Extract a single-year POI snapshot from the .osh.pbf history file.

    Args:
        osh_pbf_path: Path to the Geofabrik Germany .osh.pbf file.
        year: Calendar year to snapshot (e.g. 2018).
        poi_mapping: Tag-to-POI-type mapping from load_poi_mapping().

    Returns:
        DataFrame with columns matching OUTPUT_SCHEMA (area_code may be None).
    """
    snapshot_dt = datetime.datetime(year, 1, 1, 0, 0, 0, tzinfo=datetime.timezone.utc)
    log.info("Extracting snapshot year=%d (at %s) ...", year, snapshot_dt.isoformat())

    handler = _HistorySnapshotHandler(snapshot_dt, poi_mapping, year)
    handler.apply_file(str(osh_pbf_path))  # applies handler to the .osh.pbf

    rows = handler.get_rows()
    log.info("  -> %d POI candidates after history filter + bbox + tag match", len(rows))

    if not rows:
        return pd.DataFrame(columns=list(OUTPUT_SCHEMA.names))

    df = pd.DataFrame(rows)
    # Ensure column order and types match schema.
    df = df[list(OUTPUT_SCHEMA.names)]
    df["snapshot_year"] = df["snapshot_year"].astype("int32")
    df["lon"] = df["lon"].astype("float64")
    df["lat"] = df["lat"].astype("float64")
    return df


# ---------------------------------------------------------------------------
# Writer
# ---------------------------------------------------------------------------


def write_parquet(df: pd.DataFrame, out_path: Path) -> None:
    """Write the snapshot DataFrame to a GeoParquet-compatible parquet file."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    table = pa.Table.from_pandas(df, schema=OUTPUT_SCHEMA, preserve_index=False)
    pq.write_table(table, out_path, compression="zstd", compression_level=3)
    log.info("  -> Written: %s (%d rows)", out_path, len(df))


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def parse_years(years_arg: str) -> list[int]:
    """Parse a year range string like '2008-2024' or '2018,2019,2020'."""
    if "-" in years_arg:
        parts = years_arg.split("-")
        if len(parts) == 2:
            start, end = int(parts[0]), int(parts[1])
            return list(range(start, end + 1))
    if "," in years_arg:
        return [int(y.strip()) for y in years_arg.split(",")]
    return [int(years_arg)]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="C1 — Extract annual OSM POI snapshots from a .osh.pbf history file."
    )
    parser.add_argument(
        "--osh-pbf",
        required=True,
        type=Path,
        help=(
            "Path to the Geofabrik Germany full-history file "
            "(e.g. data/raw/osm/germany-internal.osh.pbf). "
            "Download from https://osm-internal.download.geofabrik.de/europe/ "
            "with your OSM contributor account."
        ),
    )
    parser.add_argument(
        "--out-dir",
        default=Path("data/raw/osm/berlin"),
        type=Path,
        help="Output directory for per-year .parquet files (default: data/raw/osm/berlin).",
    )
    parser.add_argument(
        "--years",
        default="2008-2024",
        help="Year range to process, e.g. '2008-2024' or '2018,2019,2020' (default: 2008-2024).",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        default=True,
        help="Skip years where the output parquet already exists (default: True).",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        default=False,
        help="Overwrite existing output parquet files.",
    )
    args = parser.parse_args(argv)

    osh_pbf = args.osh_pbf
    if not osh_pbf.exists():
        log.error(
            "OSH PBF file not found: %s\n"
            "Download the Germany full-history file from:\n"
            "  https://osm-internal.download.geofabrik.de/europe/\n"
            "Requires an OSM contributor account (https://www.openstreetmap.org).\n"
            "Save to: data/raw/osm/germany-internal.osh.pbf  (gitignored).",
            osh_pbf,
        )
        return 1

    years = parse_years(args.years)
    out_dir: Path = args.out_dir
    skip_existing = args.skip_existing and not args.force

    # Locate the seeds directory relative to this script.
    # ingestion/berlin/osm/ -> ../../.. -> repo root -> transform/seeds/
    repo_root = Path(__file__).resolve().parents[3]
    seeds_dir = repo_root / "transform" / "seeds"
    poi_mapping = load_poi_mapping(seeds_dir)

    log.info(
        "Starting C1 OSM history ingestion: %d years (%d-%d), output -> %s",
        len(years),
        min(years),
        max(years),
        out_dir,
    )
    log.info("POI mapping: %d tag pairs loaded", len(poi_mapping))

    for year in sorted(years):
        out_path = out_dir / f"{year}.parquet"
        if skip_existing and out_path.exists():
            log.info("Skipping year=%d (output exists: %s)", year, out_path)
            continue

        df = extract_snapshot(osh_pbf, year, poi_mapping)
        write_parquet(df, out_path)

    log.info("Done. Output directory: %s", out_dir)
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""
web/scripts/export_area_geojson.py
====================================
G1c (#132) -- export a static GeoJSON FeatureCollection per area_level, for Evidence's
`AreaMap` component (choropleth map page).

Why this script exists: `AreaMap`'s `geoJsonUrl` prop expects a URL to a **bundled static
asset**, not a live query (unlike every other Evidence chart, which queries DuckDB-WASM
directly) -- see @evidence-dev/core-components AreaMap.svelte.d.ts. The area polygons
(`dim_area_geometry`, exposed by the G1c data-engineer prep, f68928c) and the governed
index values (`gentrification_index`) both live in the F2/#34 parquet snapshot
(`data/serving/*.parquet`, ADR-0012) -- this script joins them and writes plain GeoJSON
files under `web/static/geo/`, which SvelteKit's static-file convention serves at
`/geo/<area_level>.geojson` (the `static/` path segment itself is stripped -- see
`@evidence-dev/evidence/cli.js`'s `staticlessDir` handling, same convention already used
for `static/data/*`).

Non-methodology-bearing: this is presentation plumbing (GeoJSON serialization + a join),
not a new spatial method/aggregation and not on the R-C1 methodology-bearing model list.
It reads only the *already-published* governed index values (no re-derivation).

Vintage note: `gentrification_index` doesn't carry `area_vintage` directly, but per
stg_berlin_ewr.sql's documented convention, MSS/EWR periods <=2020 use the pre-2021 447/448
-PLR LOR scheme (area_vintage='lor_pre2021') and periods >=2021 use the 2021+ 542-PLR scheme
(area_vintage='lor_2021'). We pick, for each area_level, the geometry vintage matching the
*latest available* gentrification_index period, so the map always shows the boundaries the
displayed values were actually computed on.

Usage (from repo root, after `uv run poe build && uv run poe export-serving`):
  uv run python web/scripts/export_area_geojson.py
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

import duckdb

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SERVING_DIR = REPO_ROOT / "data" / "serving"
OUT_DIR = REPO_ROOT / "web" / "static" / "geo"

AREA_LEVELS = ("plr", "bzr")


# Mirrors stg_berlin_ewr.sql's documented period<->LOR-vintage convention: MSS/EWR editions
# <=2020 report on the pre-2021 (447/448-PLR) scheme, >=2021 on the 2021+ (542-PLR) scheme.
def _vintage_for_period(period_yyyymm: str) -> str:
    year = int(period_yyyymm[:4])
    return "lor_2021" if year >= 2021 else "lor_pre2021"


def main() -> None:
    geometry_path = SERVING_DIR / "dim_area_geometry.parquet"
    index_path = SERVING_DIR / "gentrification_index.parquet"
    for p in (geometry_path, index_path):
        if not p.exists():
            raise SystemExit(f"{p} not found -- run `uv run poe export-serving` first.")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    con = duckdb.connect(":memory:")
    con.execute(f"create view dim_area_geometry as select * from read_parquet('{geometry_path}')")
    con.execute(f"create view gentrification_index as select * from read_parquet('{index_path}')")

    for area_level in AREA_LEVELS:
        latest_period_row = con.execute(
            """
            select max(period_yyyymm) as period
            from gentrification_index
            where variant = 'standard' and area_level = ?
            """,
            [area_level],
        ).fetchone()
        latest_period = latest_period_row[0] if latest_period_row else None
        vintage = _vintage_for_period(latest_period) if latest_period else "lor_pre2021"

        rows = con.execute(
            """
            select
                g.city_code,
                g.area_code,
                g.area_name,
                g.status_index,
                g.status_class,
                g.status_class_bi,
                g.dynamism_index,
                g.dynamism_class,
                g.dynamism_class_bi,
                g.period_yyyymm,
                geo.geometry_geojson
            from dim_area_geometry as geo
            left join gentrification_index as g
                on g.city_code = geo.city_code
                and g.area_code = geo.area_code
                and g.area_level = ?
                and g.variant = 'standard'
                and g.period_yyyymm = ?
            where geo.area_level = ?
              and geo.area_vintage = ?
            order by geo.area_code
            """,
            [area_level, latest_period, area_level, vintage],
        ).fetchall()

        features = []
        for (
            city_code,
            area_code,
            area_name,
            status_index,
            status_class,
            status_class_bi,
            dynamism_index,
            dynamism_class,
            dynamism_class_bi,
            period_yyyymm,
            geometry_geojson,
        ) in rows:
            features.append(
                {
                    "type": "Feature",
                    "geometry": json.loads(geometry_geojson),
                    "properties": {
                        "city_code": city_code,
                        "area_code": area_code,
                        "area_name": area_name,
                        "status_index": status_index,
                        "status_class": status_class,
                        "status_class_bi": status_class_bi,
                        "dynamism_index": dynamism_index,
                        "dynamism_class": dynamism_class,
                        "dynamism_class_bi": dynamism_class_bi,
                        "period_yyyymm": period_yyyymm,
                    },
                }
            )

        feature_collection = {"type": "FeatureCollection", "features": features}
        out_path = OUT_DIR / f"{area_level}.geojson"
        out_path.write_text(json.dumps(feature_collection))
        logger.info(
            "exported %s (%d features, vintage=%s, period=%s) -> %s",
            area_level,
            len(features),
            vintage,
            latest_period,
            out_path.relative_to(REPO_ROOT),
        )

    con.close()


if __name__ == "__main__":
    main()

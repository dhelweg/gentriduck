"""
web/scripts/export_area_geojson.py
====================================
G1c (#132) -- export a static GeoJSON FeatureCollection per (area_level, variant), for
Evidence's `AreaMap` component (choropleth map page).

Why this script exists: `AreaMap`'s `geoJsonUrl` prop expects a URL to a **bundled static
asset**, not a live query (unlike every other Evidence chart, which queries DuckDB-WASM
directly) -- see @evidence-dev/core-components AreaMap.svelte.d.ts. The area polygons
(`dim_area_geometry`, exposed by the G1c data-engineer prep, f68928c) and the governed
index values (`gentrification_index`) both live in the F2/#34 parquet snapshot
(`data/serving/*.parquet`, ADR-0012) -- this script joins them and writes plain GeoJSON
files under `web/static/geo/`, which SvelteKit's static-file convention serves at
`/geo/<area_level>_<variant>.geojson` (the `static/` path segment itself is stripped --
see `@evidence-dev/evidence/cli.js`'s `staticlessDir` handling, same convention already
used for `static/data/*`).

Non-methodology-bearing: this is presentation plumbing (GeoJSON serialization + a join),
not a new spatial method/aggregation and not on the R-C1 methodology-bearing model list.
It reads only the *already-published* governed index values (no re-derivation).

Vintage note (#149): `gentrification_index` doesn't carry `area_vintage` directly, but per
stg_berlin_ewr.sql's documented convention, MSS/EWR periods <=2020 use the pre-2021 447/448
-PLR LOR scheme (area_vintage='lor_pre2021') and periods >=2021 use the 2021+ 542-PLR scheme
(area_vintage='lor_2021'). Crucially, the two variants shown on the maps page sit on
*different* sides of that 2021 boundary redraw: `standard` (the 2018 thesis reproduction)
is frozen at Dec 2016 (pre-2021 codes), while `live_data`'s latest period is >=2021 (current
codes). A single shared geojson file per area_level therefore can only ever line up with
one of the two variants -- #149 was exactly this: the shared `plr.geojson` matched
`standard` (pre-2021, 448 areas) but not `live_data` (2021+, 542 areas), so the default
live-data map rendered essentially empty (only ~93 codes coincidentally overlap).

Fix: export one geojson **per (area_level, variant)** we actually show on the map, each
using the geometry vintage matching *that variant's* latest available period, so every
view's `geoJsonUrl` always matches the area codes its query data uses.

OA-D7 pass 2 (#240, ADR-0024) addition: `export_oa_arealevel_geometry()` exports plain
geometry-only FeatureCollections for BZR/PGR/Bezirk at the `lor_2021` vintage (no
`gentrification_index` join -- that mart has no bzr/pgr/bezirk `live_data` rows yet, see
the `VARIANTS_BY_AREA_LEVEL` comment below), for the live PGR/Bezirk Offering Advantage
choropleth on `/methodology-oa-modes` (`mart_poi_oa_arealevel`, OA-D6). Named
`<area_level>_lor2021.geojson` rather than reusing the `<area_level>_<variant>` scheme
above, since OA's area-level mart has no `variant` dimension analogous to
`gentrification_index.variant` (only a single `weight_variant='standard'` /
`methodology_variant='faithful'` combination exists today) -- the vintage IS the only axis
that varies. PLR at this vintage is already covered by `plr_live_data.geojson` (also
`lor_2021`) and is not re-exported here.

Usage (from repo root, after `uv run poe build && uv run poe export-serving`):
  uv run python web/scripts/export_area_geojson.py

H3 (#237) addition: `export_hamburg_geometry()` exports a Hamburg `subarea_l2` (statistisches
Gebiet) FeatureCollection, joined against `gentrification_index`'s newly-admitted `city_code='HH'`
rows, for the new `/hamburg/maps` and `/hamburg/poi-map` pages (docs/epic-h/H3-domain-signoff.md
condition 1, docs/epic-h/H3-geo-signoff.md). This is a SEPARATE, simpler function rather than an
extension of `export_gentrification_index_geometry()`/`VARIANTS_BY_AREA_LEVEL` above, because
Hamburg does not share that function's Berlin-specific assumptions: it has a single
`area_vintage='current'` (no pre-2021/2021+ boundary split, so no `_vintage_for_period()` lookup
is needed) and a single `variant='live_data'` (no `standard`/`improved`/`distance_weighted`
Hamburg rows exist). Non-methodology-bearing, same class of change as the rest of this script
(presentation plumbing reading already-published, already-signed-off `gentrification_index`
values -- no new indicator/weight/aggregation).
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

# The (area_level, variant) combinations the maps page (web/pages/maps.md) actually renders.
# `bzr` only ever shows `standard` -- `live_data` has no BZR-level rows yet (the page already
# warns about this), so we don't export a `bzr_live_data.geojson` that would just 404.
VARIANTS_BY_AREA_LEVEL = {
    "plr": ("standard", "live_data"),
    "bzr": ("standard",),
}

# OA-D7 pass 2: fixed 12-entry Bezirk-code -> name lookup, the same one hardcoded across the
# site's coarse-area pages (e.g. pages/berlin/area-detail.md's <Dropdown>,
# pages/berlin/area/bezirk/[code].md's `bezirk_name` query) -- `dim_area_geometry` carries no
# `area_name` for `area_level = 'bezirk'` rows (its dissolved-polygon derivation, OA-D6, never
# populated one), so this is presentation-only, not a new source of truth.
BEZIRK_NAMES = {
    "01": "Mitte",
    "02": "Friedrichshain-Kreuzberg",
    "03": "Pankow",
    "04": "Charlottenburg-Wilmersdorf",
    "05": "Spandau",
    "06": "Steglitz-Zehlendorf",
    "07": "Tempelhof-Schöneberg",
    "08": "Neukölln",
    "09": "Treptow-Köpenick",
    "10": "Marzahn-Hellersdorf",
    "11": "Lichtenberg",
    "12": "Reinickendorf",
}


# Mirrors stg_berlin_ewr.sql's documented period<->LOR-vintage convention: MSS/EWR editions
# <=2020 report on the pre-2021 (447/448-PLR) scheme, >=2021 on the 2021+ (542-PLR) scheme.
def _vintage_for_period(period_yyyymm: str) -> str:
    year = int(period_yyyymm[:4])
    return "lor_2021" if year >= 2021 else "lor_pre2021"


def export_gentrification_index_geometry(con: duckdb.DuckDBPyConnection) -> None:
    for area_level, variants in VARIANTS_BY_AREA_LEVEL.items():
        for variant in variants:
            latest_period_row = con.execute(
                """
                select max(period_yyyymm) as period
                from gentrification_index
                where variant = ? and area_level = ?
                """,
                [variant, area_level],
            ).fetchone()
            latest_period = latest_period_row[0] if latest_period_row else None
            if latest_period is None:
                logger.warning(
                    "skipping %s/%s -- no gentrification_index rows for that combination",
                    area_level,
                    variant,
                )
                continue
            vintage = _vintage_for_period(latest_period)

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
                    and g.variant = ?
                    and g.period_yyyymm = ?
                where geo.area_level = ?
                  and geo.area_vintage = ?
                order by geo.area_code
                """,
                [area_level, variant, latest_period, area_level, vintage],
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
            out_path = OUT_DIR / f"{area_level}_{variant}.geojson"
            out_path.write_text(json.dumps(feature_collection))
            logger.info(
                "exported %s/%s (%d features, vintage=%s, period=%s) -> %s",
                area_level,
                variant,
                len(features),
                vintage,
                latest_period,
                out_path.relative_to(REPO_ROOT),
            )


def export_oa_arealevel_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """OA-D7 pass 2 (#240): plain geometry FeatureCollections for BZR/PGR/Bezirk at
    `lor_2021`, for the live PGR/Bezirk Offering Advantage choropleth on
    `/methodology-oa-modes`. Geometry-only (city_code/area_code/area_name properties) --
    the OA values themselves are joined client-side from `mart_poi_oa_arealevel` by the
    Evidence page's own SQL query (`geoId`/`areaCol` = `area_code`), the same pattern
    `/berlin/poi-map` already uses for its PLR choropleth. See this module's header
    comment for why these are named `<area_level>_lor2021` rather than reusing the
    `<area_level>_<variant>` scheme above.
    """
    for area_level in ("bzr", "pgr", "bezirk"):
        rows = con.execute(
            """
            select city_code, area_code, area_name, geometry_geojson
            from dim_area_geometry
            where area_level = ? and area_vintage = 'lor_2021'
            order by area_code
            """,
            [area_level],
        ).fetchall()

        features = []
        for city_code, area_code, area_name, geometry_geojson in rows:
            resolved_name = area_name
            if area_level == "bezirk" and not resolved_name:
                resolved_name = BEZIRK_NAMES.get(area_code, area_code)
            features.append(
                {
                    "type": "Feature",
                    "geometry": json.loads(geometry_geojson),
                    "properties": {
                        "city_code": city_code,
                        "area_code": area_code,
                        "area_name": resolved_name,
                    },
                }
            )

        feature_collection = {"type": "FeatureCollection", "features": features}
        out_path = OUT_DIR / f"{area_level}_lor2021.geojson"
        out_path.write_text(json.dumps(feature_collection))
        logger.info(
            "exported %s/lor2021 (%d features) -> %s",
            area_level,
            len(features),
            out_path.relative_to(REPO_ROOT),
        )


def export_hamburg_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """Hamburg `subarea_l2` (statistisches Gebiet) FeatureCollection, joined against
    `gentrification_index`'s `city_code='HH'` rows at their latest `period_yyyymm`. See this
    module's header comment (H3, #237) for why this is a dedicated function rather than an entry
    in `VARIANTS_BY_AREA_LEVEL` above.

    NB (H3-domain-signoff.md condition 3 / H1-domain-signoff.md §3): `area_name` is genuinely
    blank for every Hamburg `subarea_l2` row in the source data (only Hamburg's coarser
    `subarea_l1`/Stadtteil and `district` levels carry names) -- this is passed through as-is
    (empty string), not backfilled, so the map/tooltip honestly shows only the numeric Gebiet
    code where no name exists, rather than inventing one.
    """
    latest_period_row = con.execute(
        """
        select max(period_yyyymm) as period
        from gentrification_index
        where city_code = 'HH' and area_level = 'subarea_l2' and variant = 'live_data'
        """
    ).fetchone()
    latest_period = latest_period_row[0] if latest_period_row else None
    if latest_period is None:
        logger.warning("skipping hamburg subarea_l2 -- no gentrification_index HH rows found")
        return

    rows = con.execute(
        """
        select
            geo.city_code,
            geo.area_code,
            geo.area_name,
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
            and g.area_level = 'subarea_l2'
            and g.variant = 'live_data'
            and g.period_yyyymm = ?
        where geo.city_code = 'HH'
          and geo.area_level = 'subarea_l2'
          and geo.area_vintage = 'current'
        order by geo.area_code
        """,
        [latest_period],
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
    out_path = OUT_DIR / "subarea_l2_live_data.geojson"
    out_path.write_text(json.dumps(feature_collection))
    logger.info(
        "exported hamburg subarea_l2/live_data (%d features, period=%s) -> %s",
        len(features),
        latest_period,
        out_path.relative_to(REPO_ROOT),
    )


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

    export_gentrification_index_geometry(con)
    export_oa_arealevel_geometry(con)
    export_hamburg_geometry(con)

    con.close()


if __name__ == "__main__":
    main()

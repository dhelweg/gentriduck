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

#308 addition: `export_area_drilldown_geometry()` / `export_ortsteil_self_geometry()` export the
combined self+child-level (and, for Ortsteil, self-only) FeatureCollections consumed by the new
`<AreaDrilldownMap>` component (web/components/AreaDrilldownMap.svelte) on every Berlin and Hamburg
per-area profile page -- district/subarea_l1-level Hamburg geometry (previously not exported at all,
only Hamburg's subarea_l2 was, via export_hamburg_geometry() above) is now exported too, since the
mini map needs a district's/Stadtteil's own polygon and its children's. Same LGV Hamburg WFS
geometry `dim_area_geometry` already ingests -- no new data source, geometry-only (no
`gentrification_index` join, matching `export_oa_arealevel_geometry()`'s pattern above), so no
architect gate. See `DRILLDOWN_LEVEL_PAIRS`' own comment for the per-pair vintage/level detail.

#351 addition: display simplification. The site's maps are now drawn by the in-repo SVG component
`web/components/PolygonMap.svelte` (no Leaflet, no tile provider), which downloads and projects
these files in the browser. The raw WFS geometry is survey-grade (sub-metre vertices), which made
the files 1-13 MB each (e.g. bzr_plr_drilldown.geojson was 12.8 MB, fetched by every PLR and BZR
profile page) for a city-wide map where one screen pixel is ~30-60 m. `_load_display_geometry()`
therefore swaps the `geometry_geojson` column for a display copy before any export runs:
simplified with `shapely.coverage_simplify` once per (city_code, area_level, area_vintage)
coverage (shared borders between neighbours are simplified once, so no slivers or gaps open up
between them, unlike per-polygon simplification), with coordinates rounded to 5 decimals (~1 m).
Shapely is already a declared project dependency (pyproject.toml), so nothing new is added. This is
display-only: no area, centroid, join, or indicator is computed from these files, and the governed
`dim_area_geometry` mart and its parquet export keep the full-resolution geometry.

#351 review addition: orphan areas are left out of the DISPLAY export. Now that the SVG maps draw
every area in a file (areas without data in grey), a source-data placeholder becomes visible.
Today that is exactly one feature: Hamburg statistisches Gebiet 106001, a 5-vertex, ~17.5 km^2
rectangle north of the city (9.87-9.93 E, 53.69-53.73 N) with no gentrification_index row, lying
entirely outside the Stadtteil (subarea_l1) layer; dim_area_hierarchy already flags it as an
anomaly with a fallback parent. `_drop_orphan_display_areas()` applies a generic rule, not a
hard-coded code: for every child level of `DRILLDOWN_LEVEL_PAIRS`, an area is dropped from the
display copy when less than ORPHAN_MIN_INSIDE_PARENT_SHARE of its area lies inside the union of
its parent level AND it has no gentrification_index row at all. Measured on the current data,
every other area at every level pair is at least 90 % inside its parent layer, and 106001 is 0 %
inside. The governed `dim_area_geometry` mart and its parquet export are NOT changed; the
placeholder itself is a data follow-up.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

import duckdb
import shapely
from shapely.geometry import mapping, shape

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SERVING_DIR = REPO_ROOT / "data" / "serving"
OUT_DIR = REPO_ROOT / "web" / "static" / "geo"

# #351: display-simplification tolerance in degrees (coverage_simplify's Visvalingam-Whyatt
# tolerance, about 3-5 m at Berlin/Hamburg latitudes). Small enough that a profile page's zoomed
# detail panel (a single PLR across ~400 px, ~5 m/px) still looks smooth; it still cuts the files
# by roughly 85-90 %.
DISPLAY_SIMPLIFY_TOLERANCE_DEG = 0.00005
# #351: decimal places kept per coordinate (5 = ~1 m).
DISPLAY_COORD_DECIMALS = 5
# #351 review: an area with no data is left out of the display export when less than this share of
# it lies inside its parent level's layer (see the module docstring, "orphan areas").
ORPHAN_MIN_INSIDE_PARENT_SHARE = 0.5


def _round_coords(obj):
    """Recursively round every coordinate in a GeoJSON `coordinates` array."""
    if isinstance(obj, (list, tuple)):
        if obj and isinstance(obj[0], (int, float)):
            return [round(c, DISPLAY_COORD_DECIMALS) for c in obj]
        return [_round_coords(o) for o in obj]
    return obj


def _simplify_coverage(geometry_geojsons: list[str]) -> list[str]:
    """#351: simplify one polygon coverage (all areas of one level/vintage) for display.

    `coverage_simplify` keeps shared edges identical between neighbours. If GEOS rejects the
    input as a coverage, it falls back to per-polygon topology-preserving simplification. If a
    geometry would come out empty, the original is kept, so an area never disappears from the map.
    """
    geoms = [shape(json.loads(g)) for g in geometry_geojsons]
    try:
        # coverage_simplify needs shapely >= 2.1 (pinned in pyproject.toml); AttributeError is
        # caught as well so an older shapely degrades to the per-polygon path instead of failing.
        simplified = list(shapely.coverage_simplify(geoms, DISPLAY_SIMPLIFY_TOLERANCE_DEG))
    except (shapely.errors.GEOSException, AttributeError) as exc:
        logger.warning("coverage_simplify failed (%s) -- falling back to per-polygon simplify", exc)
        simplified = [
            shapely.simplify(g, DISPLAY_SIMPLIFY_TOLERANCE_DEG, preserve_topology=True)
            for g in geoms
        ]
    out = []
    for original, simple in zip(geoms, simplified, strict=True):
        chosen = original if simple is None or simple.is_empty else simple
        geo = mapping(chosen)
        out.append(
            json.dumps(
                {"type": geo["type"], "coordinates": _round_coords(geo["coordinates"])},
                separators=(",", ":"),
            )
        )
    return out


def _load_display_geometry(con: duckdb.DuckDBPyConnection, geometry_path: Path) -> None:
    """#351: materialize `dim_area_geometry` as a table whose `geometry_geojson` column holds the
    display-simplified geometry (see the module docstring), so every export function below reads
    the light copy without needing any change of its own."""
    con.execute(
        "create table dim_area_geometry as "
        "select row_number() over () as _display_rid, * from read_parquet(?)",
        [str(geometry_path)],
    )
    _drop_orphan_display_areas(con)
    groups = con.execute(
        "select distinct city_code, area_level, area_vintage from dim_area_geometry order by all"
    ).fetchall()
    for city_code, area_level, area_vintage in groups:
        rows = con.execute(
            """
            select _display_rid, geometry_geojson
            from dim_area_geometry
            where city_code is not distinct from ?
              and area_level is not distinct from ?
              and area_vintage is not distinct from ?
              and geometry_geojson is not null
            """,
            [city_code, area_level, area_vintage],
        ).fetchall()
        if not rows:
            continue
        simplified = _simplify_coverage([g for _, g in rows])
        before = sum(len(g) for _, g in rows)
        after = sum(len(g) for g in simplified)
        con.executemany(
            "update dim_area_geometry set geometry_geojson = ? where _display_rid = ?",
            [[g, rid] for (rid, _), g in zip(rows, simplified, strict=True)],
        )
        logger.info(
            "simplified %s/%s/%s for display (%d areas, %.1f MB -> %.1f MB)",
            city_code,
            area_level,
            area_vintage,
            len(rows),
            before / 1e6,
            after / 1e6,
        )


def _drop_orphan_display_areas(con: duckdb.DuckDBPyConnection) -> None:
    """#351 review: remove orphan placeholder areas from the display copy of `dim_area_geometry`
    (see the module docstring, "orphan areas", for the rule and the one case it catches today).
    Requires the `gentrification_index` view to exist already."""
    for parent_level, parent_vintage, child_level, child_vintage, _ in DRILLDOWN_LEVEL_PAIRS:
        parents = con.execute(
            """
            select geometry_geojson from dim_area_geometry
            where area_level = ? and area_vintage = ? and geometry_geojson is not null
            """,
            [parent_level, parent_vintage],
        ).fetchall()
        if not parents:
            continue
        parent_layer = shapely.union_all([shape(json.loads(g)) for (g,) in parents])
        children = con.execute(
            """
            select geo._display_rid, geo.city_code, geo.area_code, geo.geometry_geojson,
                   exists (
                       select 1 from gentrification_index as g
                       where g.city_code = geo.city_code
                         and g.area_level = geo.area_level
                         and g.area_code = geo.area_code
                   ) as has_data
            from dim_area_geometry as geo
            where geo.area_level = ? and geo.area_vintage = ? and geo.geometry_geojson is not null
            """,
            [child_level, child_vintage],
        ).fetchall()
        for rid, city_code, area_code, geometry_geojson, has_data in children:
            if has_data:
                continue
            geom = shape(json.loads(geometry_geojson))
            if geom.area <= 0:
                continue
            inside = geom.intersection(parent_layer).area / geom.area
            if inside < ORPHAN_MIN_INSIDE_PARENT_SHARE:
                con.execute("delete from dim_area_geometry where _display_rid = ?", [rid])
                logger.warning(
                    "display export: dropped orphan %s %s/%s (%.0f%% inside the %s layer, no "
                    "gentrification_index row) -- governed parquet unchanged",
                    city_code,
                    child_level,
                    area_code,
                    inside * 100,
                    parent_level,
                )


def _write_feature_collection(out_path: Path, feature_collection: dict) -> None:
    """#351: compact JSON (no whitespace), since the browser downloads these files."""
    out_path.write_text(json.dumps(feature_collection, separators=(",", ":")), encoding="utf-8")


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
                -- #351: identity columns come from the geometry side of the left join. They
                -- used to come from `g`, so every area without an index row (e.g. uninhabited
                -- PLRs) was exported with area_code = null and could not be drawn at all,
                -- not even as a grey "No data" area.
                select
                    geo.city_code,
                    geo.area_code,
                    coalesce(g.area_name, geo.area_name) as area_name,
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
            _write_feature_collection(out_path, feature_collection)
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
        _write_feature_collection(out_path, feature_collection)
        logger.info(
            "exported %s/lor2021 (%d features) -> %s",
            area_level,
            len(features),
            out_path.relative_to(REPO_ROOT),
        )


def export_hamburg_rollup_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """#310 (map granularity selector): plain geometry FeatureCollections for Hamburg's
    subarea_l1 (Stadtteil) and district (Bezirk) levels -- the two new rollup levels
    `/hamburg/maps`'s "Area level" dropdown adds. Same geometry-only pattern as
    `export_oa_arealevel_geometry()` above (no `gentrification_index` join -- the OA-D7
    precedent this mirrors -- the choropleth values are joined client-side from
    `mart_area_rollup_stage_mix` by the Evidence page's own SQL query, geoId/areaCol =
    `area_code`). Named `<area_level>_current.geojson` (Hamburg's single, un-split
    geometry vintage -- see stg_hamburg_geo/dim_area_hierarchy's own "current" vintage
    convention) rather than reusing the `<area_level>_<variant>` scheme, since Hamburg's
    rollup levels have no `gentrification_index` variant of their own (mirrors
    `export_oa_arealevel_geometry()`'s own naming rationale in this module's header).
    Both subarea_l2 (via `export_hamburg_geometry()` above) and subarea_l1/district
    (here) share the same LGV Hamburg WFS source `dim_area_geometry` already ingests --
    no new data source.
    """
    for area_level in ("subarea_l1", "district"):
        rows = con.execute(
            """
            select city_code, area_code, area_name, geometry_geojson
            from dim_area_geometry
            where city_code = 'HH' and area_level = ? and area_vintage = 'current'
            order by area_code
            """,
            [area_level],
        ).fetchall()

        features = [
            {
                "type": "Feature",
                "geometry": json.loads(geometry_geojson),
                "properties": {
                    "city_code": city_code,
                    "area_code": area_code,
                    "area_name": area_name,
                },
            }
            for city_code, area_code, area_name, geometry_geojson in rows
        ]

        feature_collection = {"type": "FeatureCollection", "features": features}
        out_path = OUT_DIR / f"{area_level}_current.geojson"
        _write_feature_collection(out_path, feature_collection)
        logger.info(
            "exported hamburg %s/current (%d features) -> %s",
            area_level,
            len(features),
            out_path.relative_to(REPO_ROOT),
        )


def export_hamburg_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """Hamburg `subarea_l2` (statistisches Gebiet) FeatureCollection, joined against
    `gentrification_index`'s `city_code='HH'` rows at their latest `period_yyyymm`. See this
    module's header comment (H3, #237) for why this is a dedicated function rather than an entry
    in `VARIANTS_BY_AREA_LEVEL` above.

    NB (#352, maintainer spec): the Hamburg `subarea_l2` source data has no name (only Hamburg's
    coarser `subarea_l1`/Stadtteil and `district` levels do), so `dim_area_geometry.area_name`
    carries a derived display label instead --
    '<Stadtteil> · <OSM place name>' or '<Stadtteil> · Gebiet <code>' (see
    transform/models/intermediate/int_hamburg_gebiet_names.sql) -- passed through here unchanged.
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
    _write_feature_collection(out_path, feature_collection)
    logger.info(
        "exported hamburg subarea_l2/live_data (%d features, period=%s) -> %s",
        len(features),
        latest_period,
        out_path.relative_to(REPO_ROOT),
    )


# #308: (parent_level, parent_vintage, child_level, child_vintage, output_name) tuples the
# per-area drill-down mini map (<AreaDrilldownMap>, web/components/AreaDrilldownMap.svelte) needs --
# one combined, WHOLE-CITY FeatureCollection per pair, containing BOTH that parent level's own
# polygons (drawn as the "self" highlight on that level's own profile page) and that child level's
# polygons (drawn as the clickable "next level down" set on the same page). Features are tagged with
# a level-qualified `feature_key` (`<area_level>:<area_code>`), not a bare `area_code`, so the two
# levels' code spaces can never collide within one file -- defence in depth, not reliance on
# Berlin's/Hamburg's code schemes happening not to collide today. The web-layer SQL query on each
# area page (not this script) decides, per request, which of these city-wide features are actually
# "self" vs "child" for the CURRENT area (`${params.code}`) and colors/links them accordingly --
# this export is role-agnostic, matching the same "static geometry, page-scoped SQL narrows what's
# drawn" pattern already established by export_gentrification_index_geometry() /
# export_oa_arealevel_geometry() above (Areas.svelte only ever draws geoJSON features present in the
# page's own `data` query result -- see AreaDrilldownMap.svelte's own header comment).
#
# Berlin: uses the LOR ladder's 'lor_2021' (current, 542-PLR) vintage throughout, matching the
# vintage already used for the live map/detail pages elsewhere on this site (never mixed with
# 'lor_pre2021' -- see this module's own header "Vintage note").
# Hamburg: single 'current' vintage at every level (no pre/post-reform split, unlike Berlin) --
# same convention export_hamburg_geometry() above already uses.
#
# Berlin's Ortsteil level is deliberately NOT one of these pairs -- dim_area_hierarchy.sql resolves
# no children for Ortsteil (Ortsteil<->PLR is a non-nesting area-overlap crosswalk, not a hierarchy
# edge -- see that model's header), so per #308's issue text Ortsteil is grouped with PLR as one of
# Berlin's two finest-grain, no-drill-down levels; see export_ortsteil_self_geometry() below.
DRILLDOWN_LEVEL_PAIRS = (
    ("bezirk", "lor_2021", "pgr", "lor_2021", "bezirk_pgr_drilldown"),
    ("pgr", "lor_2021", "bzr", "lor_2021", "pgr_bzr_drilldown"),
    ("bzr", "lor_2021", "plr", "lor_2021", "bzr_plr_drilldown"),
    ("district", "current", "subarea_l1", "current", "district_subarea_l1_drilldown"),
    ("subarea_l1", "current", "subarea_l2", "current", "subarea_l1_subarea_l2_drilldown"),
)


def export_area_drilldown_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """#308: per-area drill-down mini map geometry -- see DRILLDOWN_LEVEL_PAIRS' comment above for
    the file shape, the `feature_key` join-key rationale, and why this is role-agnostic (no
    self/child distinction baked in here; that is a per-page, per-request SQL decision).
    """
    for parent_level, parent_vintage, child_level, child_vintage, out_name in DRILLDOWN_LEVEL_PAIRS:
        rows = con.execute(
            """
            select area_level, city_code, area_code, area_name, geometry_geojson
            from dim_area_geometry
            where (area_level = ? and area_vintage = ?)
               or (area_level = ? and area_vintage = ?)
            order by area_level, area_code
            """,
            [parent_level, parent_vintage, child_level, child_vintage],
        ).fetchall()

        features = [
            {
                "type": "Feature",
                "geometry": json.loads(geometry_geojson),
                "properties": {
                    "feature_key": f"{area_level}:{area_code}",
                    "area_level": area_level,
                    "city_code": city_code,
                    "area_code": area_code,
                    "area_name": area_name,
                },
            }
            for area_level, city_code, area_code, area_name, geometry_geojson in rows
        ]

        feature_collection = {"type": "FeatureCollection", "features": features}
        out_path = OUT_DIR / f"{out_name}.geojson"
        _write_feature_collection(out_path, feature_collection)
        logger.info(
            "exported drilldown %s->%s (%d features) -> %s",
            parent_level,
            child_level,
            len(features),
            out_path.relative_to(REPO_ROOT),
        )


def export_ortsteil_self_geometry(con: duckdb.DuckDBPyConnection) -> None:
    """#308: Ortsteil has no child level in `mart_area_hierarchy` (see DRILLDOWN_LEVEL_PAIRS'
    comment above) -- a plain self-only FeatureCollection (one feature per Ortsteil), for the
    Ortsteil profile page's orientation-only mini map (own polygon highlighted, no drill-down
    affordance, same treatment as Berlin's PLR leaf page reusing bzr_plr_drilldown.geojson and
    Hamburg's Gebiet leaf page reusing subarea_l1_subarea_l2_drilldown.geojson).
    """
    rows = con.execute(
        """
        select city_code, area_code, area_name, geometry_geojson
        from dim_area_geometry
        where area_level = 'ortsteil' and area_vintage = 'current'
        order by area_code
        """
    ).fetchall()

    features = [
        {
            "type": "Feature",
            "geometry": json.loads(geometry_geojson),
            "properties": {
                "feature_key": f"ortsteil:{area_code}",
                "area_level": "ortsteil",
                "city_code": city_code,
                "area_code": area_code,
                "area_name": area_name,
            },
        }
        for city_code, area_code, area_name, geometry_geojson in rows
    ]

    feature_collection = {"type": "FeatureCollection", "features": features}
    out_path = OUT_DIR / "ortsteil_self.geojson"
    _write_feature_collection(out_path, feature_collection)
    logger.info(
        "exported ortsteil self (%d features) -> %s", len(features), out_path.relative_to(REPO_ROOT)
    )


def main() -> None:
    geometry_path = SERVING_DIR / "dim_area_geometry.parquet"
    index_path = SERVING_DIR / "gentrification_index.parquet"
    for p in (geometry_path, index_path):
        if not p.exists():
            raise SystemExit(f"{p} not found -- run `uv run poe export-serving` first.")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    con = duckdb.connect(":memory:")
    # gentrification_index first: the display-geometry step's orphan rule reads it.
    con.execute(f"create view gentrification_index as select * from read_parquet('{index_path}')")
    _load_display_geometry(con, geometry_path)

    export_gentrification_index_geometry(con)
    export_oa_arealevel_geometry(con)
    export_hamburg_geometry(con)
    export_hamburg_rollup_geometry(con)
    export_area_drilldown_geometry(con)
    export_ortsteil_self_geometry(con)

    con.close()


if __name__ == "__main__":
    main()

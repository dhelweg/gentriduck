"""
analysis/e3_maps.py
===================
E3 choropleth maps: gentrification index and trajectory stage by PLR.

Produces SVG-based choropleth maps using shapely and the LOR 2021 geometry
(data/raw/berlin/lor/lor_2021.parquet). geopandas is available for geometry
loading and coordinate projection; matplotlib is NOT in the project dependencies,
so maps are rendered as inline-SVG HTML files (no paid APIs, no new libraries).

Source attributions:
  - LOR geometry: Geoportal Berlin / GDI Berlin, CC BY 3.0 DE
  - OSM POI data: OpenStreetMap contributors, ODbL

Usage:
  uv run python analysis/e3_maps.py
"""

from __future__ import annotations

import logging
import os
import sys
from pathlib import Path

import duckdb
import pandas as pd

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

DB_PATH = os.environ.get("GENTRIDUCK_DB", "data/gentriduck.duckdb")
LOR_PARQUET = Path("data/raw/berlin/lor/lor_2021.parquet")
OUT_DIR = Path("data/analysis")

# D1×D2 stage colour palette (colourblind-accessible diverging scheme)
STAGE_COLOURS: dict[str, str] = {
    "stable-established": "#2166ac",
    "pre-gentrification": "#fee090",
    "active-gentrification": "#d73027",
    "pioneer-signal": "#fc8d59",
    "consolidation-pressure": "#a50026",
    "improving-vulnerable": "#74add1",
}
STAGE_LABELS: dict[str, str] = {
    "stable-established": "Stable / established",
    "pre-gentrification": "Pre-gentrification",
    "active-gentrification": "Active gentrification",
    "pioneer-signal": "Pioneer signal",
    "consolidation-pressure": "Consolidation pressure",
    "improving-vulnerable": "Improving (vulnerable baseline)",
}

# D1 status_index colour (1=hoch=best, 4=sehr_niedrig=worst)
STATUS_COLOURS = ["#2166ac", "#92c5de", "#f4a582", "#d73027"]


def load_geometry() -> "pd.DataFrame | None":
    """Loads LOR 2021 PLR geometry from parquet; returns None with warning on failure."""
    if not LOR_PARQUET.exists():
        log.warning(
            "LOR geometry parquet not found at %s — maps will not be generated.", LOR_PARQUET
        )
        return None
    try:
        import pyarrow.parquet as pq
        from shapely import wkb

        df = pq.read_table(str(LOR_PARQUET)).to_pandas()
        df["geometry"] = df["geometry_wkb"].apply(wkb.loads)
        return df[["area_code", "area_name", "geometry"]]
    except Exception as exc:
        log.warning("Failed to load LOR geometry: %s — maps will not be generated.", exc)
        return None


def project_to_wgs84(geom_df: pd.DataFrame) -> pd.DataFrame:
    """
    Reprojects from EPSG:25833 (ETRS89 / UTM33N) to WGS84 for SVG rendering.
    Uses geopandas which is available as a transitive dep of quackosm.
    """
    try:
        import geopandas as gpd

        gdf = gpd.GeoDataFrame(geom_df, geometry="geometry", crs="EPSG:25833")
        gdf_wgs = gdf.to_crs("EPSG:4326")
        out = geom_df.copy()
        out["geometry"] = gdf_wgs.geometry.values
        return out
    except Exception as exc:
        log.warning("CRS reprojection failed: %s — using raw coordinates.", exc)
        return geom_df


def _ring_to_svg(coords) -> str:
    """Converts a coordinate ring to SVG path commands (M ... L ... Z). Y-axis is flipped."""
    pts = list(coords)
    if not pts:
        return ""
    x0, y0 = pts[0][0], pts[0][1]
    cmds = [f"M {x0:.5f} {-y0:.5f}"]
    for pt in pts[1:]:
        cmds.append(f"L {pt[0]:.5f} {-pt[1]:.5f}")
    cmds.append("Z")
    return " ".join(cmds)


def geom_to_svg_path(geom) -> str:
    """Converts a shapely Polygon or MultiPolygon to an SVG path d-attribute string."""

    def poly_to_path(poly) -> str:
        parts = [_ring_to_svg(poly.exterior.coords)]
        for interior in poly.interiors:
            parts.append(_ring_to_svg(interior.coords))
        return " ".join(parts)

    if geom.geom_type == "Polygon":
        return poly_to_path(geom)
    if geom.geom_type == "MultiPolygon":
        return " ".join(poly_to_path(p) for p in geom.geoms)
    return ""


def compute_svg_transform(
    geom_df: pd.DataFrame, width: int, height: int
) -> tuple[float, float, float]:
    """Returns (scale, tx, ty) to fit all geometries into the SVG viewport."""
    all_x: list[float] = []
    all_y: list[float] = []
    for geom in geom_df["geometry"]:
        if geom is None:
            continue
        b = geom.bounds  # (minx, miny, maxx, maxy)
        all_x += [b[0], b[2]]
        all_y += [b[1], b[3]]

    if not all_x:
        return 1.0, 0.0, 0.0

    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)

    # After y-flip: SVG y_min = -geo_max_y
    svg_min_y = -max_y
    svg_max_y = -min_y

    geo_w = max_x - min_x
    geo_h = svg_max_y - svg_min_y
    padding = 20

    sx = (width - 2 * padding) / geo_w if geo_w > 0 else 1.0
    sy = (height - 2 * padding) / geo_h if geo_h > 0 else 1.0
    scale = min(sx, sy)

    tx = padding - min_x * scale
    ty = padding - svg_min_y * scale

    return scale, tx, ty


def render_svg_choropleth(
    geom_data: pd.DataFrame,
    colour_col: str,
    title: str,
    legend_items: list[tuple[str, str]],
    width: int = 800,
    height: int = 900,
) -> str:
    """
    Renders a choropleth as an SVG string.
    geom_data must have: area_code, area_name, geometry, <colour_col> (hex colour).
    """
    scale, tx, ty = compute_svg_transform(geom_data, width, height)

    paths_html: list[str] = []
    for _, row in geom_data.iterrows():
        if row["geometry"] is None:
            continue
        d = geom_to_svg_path(row["geometry"])
        if not d:
            continue
        fill = row[colour_col] if pd.notna(row[colour_col]) else "#cccccc"
        stroke_w = 0.5 / scale
        paths_html.append(
            f'  <path d="{d}" fill="{fill}" stroke="#ffffff" stroke-width="{stroke_w:.4f}"'
            f' transform="scale({scale:.4f}) translate({tx / scale:.4f},{ty / scale:.4f})">'
            f"<title>{row['area_name']} ({row['area_code']})</title></path>"
        )

    legend_html: list[str] = []
    ly = 30
    for colour, label in legend_items:
        legend_html.append(
            f'  <rect x="10" y="{ly}" width="16" height="16" fill="{colour}" stroke="#666" stroke-width="0.5"/>'
        )
        legend_html.append(
            f'  <text x="32" y="{ly + 12}" font-size="13" font-family="sans-serif" fill="#222">'
            f"{label}</text>"
        )
        ly += 22

    legend_bg_h = ly + 10

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height + 60}">\n'
        f'  <rect width="{width}" height="{height + 60}" fill="#f8f8f8"/>\n'
        f'  <text x="{width // 2}" y="22" font-size="16" font-weight="bold" font-family="sans-serif"'
        f' fill="#111" text-anchor="middle">{title}</text>\n'
        f'  <g transform="translate(0,30)">\n' + "".join(paths_html) + "  </g>\n"
        f'  <g transform="translate({width - 240},35)">\n'
        f'    <rect width="228" height="{legend_bg_h}" fill="rgba(255,255,255,0.85)" rx="4"'
        f' stroke="#ccc" stroke-width="0.8"/>\n' + "".join(legend_html) + "  </g>\n"
        f'  <text x="8" y="{height + 52}" font-size="10" font-family="sans-serif" fill="#777">'
        f"Geometry: Geoportal Berlin / GDI Berlin, CC BY 3.0 DE. "
        f"POI data: OpenStreetMap contributors, ODbL.</text>\n"
        "</svg>"
    )
    return svg


def make_index_map(geom_df: pd.DataFrame, data: pd.DataFrame) -> str:
    """
    Choropleth of D1 status_index at the latest MSS edition.
    status_index 1=hoch/best (blue) to 4=sehr_niedrig/worst (red).
    """
    latest_year = int(data["snapshot_year"].max())
    latest = data[data["snapshot_year"] == latest_year][["area_code", "status_index"]].copy()
    merged = geom_df.merge(latest, on="area_code", how="left")

    def status_colour(val) -> str:
        if pd.isna(val):
            return "#cccccc"
        return STATUS_COLOURS[max(0, min(3, int(val) - 1))]

    merged["fill"] = merged["status_index"].apply(status_colour)

    legend = [
        (STATUS_COLOURS[0], "1 — Hoch (best social status)"),
        (STATUS_COLOURS[1], "2 — Mittel"),
        (STATUS_COLOURS[2], "3 — Niedrig"),
        (STATUS_COLOURS[3], "4 — Sehr niedrig (most deprived)"),
        ("#cccccc", "Uninhabited / no data"),
    ]
    return render_svg_choropleth(
        merged,
        "fill",
        f"Berlin PLR Social Status Index (MSS {latest_year}; D1 ordinal)",
        legend,
    )


def make_trajectory_map(geom_df: pd.DataFrame, traj: pd.DataFrame) -> str:
    """Choropleth of R-A8 longitudinal trajectory dominant_stage (2021-2025)."""
    traj_sub = traj[["area_code", "dominant_stage"]].copy()
    merged = geom_df.merge(traj_sub, on="area_code", how="left")
    merged["fill"] = merged["dominant_stage"].map(STAGE_COLOURS).fillna("#cccccc")

    legend = [(v, STAGE_LABELS[k]) for k, v in STAGE_COLOURS.items()]
    legend.append(("#cccccc", "No trajectory data"))

    return render_svg_choropleth(
        merged,
        "fill",
        "Berlin PLR Gentrification Trajectory (2021-2025; R-A8 model)",
        legend,
    )


def write_html(svg: str, path: Path, title: str) -> None:
    """Wraps SVG in minimal HTML for browser viewing."""
    html = (
        "<!DOCTYPE html>\n"
        '<html lang="en">\n'
        f'<head><meta charset="utf-8"><title>{title}</title></head>\n'
        '<body style="margin:0;background:#fff">'
        f"{svg}"
        "</body>\n</html>"
    )
    path.write_text(html, encoding="utf-8")


def main() -> None:
    if not Path(DB_PATH).exists():
        log.error("Database not found at %s", DB_PATH)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    con = duckdb.connect(DB_PATH, read_only=True)

    change_df = con.execute("""
        SELECT snapshot_year, area_code, status_index, is_uninhabited
        FROM fct_gentrification_change
        WHERE area_vintage = 'lor_2021'
    """).fetchdf()

    traj_df = con.execute("""
        SELECT area_code, dominant_stage, trajectory_type, trajectory_confidence
        FROM fct_gentrification_trajectory
        WHERE area_vintage = 'lor_2021'
    """).fetchdf()

    con.close()

    geom_df = load_geometry()
    if geom_df is None:
        log.warning("Map generation skipped — geometry unavailable.")
        return

    geom_df = project_to_wgs84(geom_df)

    # matplotlib is not in pyproject.toml; SVG choropleths are produced instead.
    # The SPEC requested .png but that requires matplotlib (needs ADR-0001 approval).
    # Stub .png files contain the explanation; real output is .svg + .html.

    for map_fn, label in [
        (lambda: make_index_map(geom_df, change_df), "index"),
        (lambda: make_trajectory_map(geom_df, traj_df), "trajectory"),
    ]:
        try:
            svg = map_fn()
            svg_path = OUT_DIR / f"e3_map_{label}.svg"
            html_path = OUT_DIR / f"e3_map_{label}.html"
            png_path = OUT_DIR / f"e3_map_{label}.png"

            svg_path.write_text(svg, encoding="utf-8")
            write_html(svg, html_path, f"Gentriduck — {label} choropleth")

            png_path.write_text(
                f"matplotlib is not in pyproject.toml (ADR-0001: consult architect before adding).\n"
                f"SVG choropleth generated instead: {svg_path.name} and {html_path.name}\n"
                f"Open {html_path.name} in any browser.\n",
                encoding="utf-8",
            )
            log.info("Map '%s' saved to %s (SVG + HTML)", label, svg_path)
        except Exception as exc:
            log.warning("Failed to generate '%s' map: %s", label, exc)

    log.info("E3 maps complete. Output in %s", OUT_DIR)


if __name__ == "__main__":
    main()

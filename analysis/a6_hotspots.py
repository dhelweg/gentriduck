"""
analysis/a6_hotspots.py
=======================
A6 (#69): Getis-Ord Gi* amenity-change hotspot detection per PLR per year.

spatial-methods.md §6: Uses PySAL esda.G_Local (Getis-Ord Gi*) with Queen contiguity
weights built directly from shapely geometries parsed from DuckDB WKB (no geopandas —
ADR-0010 Required 1). Input y = C5-corrected distance-weighted dynamism_score from
int_poi_status_dynamism (spatial-methods.md §5: C5 share-normalization first,
distance-weighting second; never apply kernel to raw counts).

PUBLIC LABELLING (spatial-methods.md §6, G-1/G-2 guardrails; domain-expert C1):
  The internal statistic is "Gi* hotspot". Public-facing labels MUST use a hedged
  qualifier: "amenity-change hotspot" or "social-change-pressure cluster". A bare
  "gentrification hotspot" is prohibited in public output. Output CSV uses the
  internal label; consumers (G2 page, map legends) must apply the hedged label
  with the §1.2 G-2 ecological-inference disclaimer.

Weights:
  Queen contiguity (shared edge or vertex) built via libpysal.weights.Queen from
  shapely geometries parsed from DuckDB WKB (ST_AsWKB in EPSG:25833 — no pyproj,
  no CRS round-trip; ADR-0010 Amendment 3; spatial-methods.md §3).
  Fallback: k-NN (k=6) for disconnected/island PLRs (water bodies, airport perimeter
  — the area_code = NULL zones; spatial-methods.md §6; ADR-0010 §5).

Inference:
  esda.G_Local(y, w, permutations=999, seed=42, star=True) — explicit per-call seed
  (R-C3; ADR-0010 Required 4). star=True: focal unit included (Gi* not Gi; Ord &
  Getis 1995; spatial-methods.md §6). Row-standardized weights. α=0.05 for
  hot/cold/ns label.

Output: data/analysis/a6_hotspots_{year}.csv per year.
  Columns: area_code, snapshot_year, dynamism_score, gi_zscore, gi_pvalue, cluster_label.
  cluster_label: 'hot' (p<0.05, z>0), 'cold' (p<0.05, z<0), 'ns' (not significant).

DB: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (local default; configurable for
    MotherDuck parity, ADR-0010 Amendment 7).

Usage:
  uv run python analysis/a6_hotspots.py

Citations:
  Getis & Ord (1992), Geographical Analysis 24(3) — Gi* statistic.
  Ord & Getis (1995), Geographical Analysis 27(4) — local Gi*.
  Döring & Ulbricht (2016), Gentrification-Hotspots und Verdrängungsprozesse in Berlin.
  spatial-methods.md §6 (methodology), §3 (CRS/WKB handoff), §5 (C5 composition).
"""

from __future__ import annotations

import logging
import os
import sys
from pathlib import Path
from typing import Any

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configurable DB path (ADR-0010 Amendment 7: configurable, not hard-coded)
# ---------------------------------------------------------------------------
_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = _env_db if _env_db else "data/gentriduck.duckdb"

OUT_DIR = Path("data/analysis")

# spatial-methods.md §6: α=0.05 significance threshold for cluster labels.
ALPHA = 0.05


def _import_deps() -> tuple:
    """Import required packages with clear error messages on missing deps."""
    try:
        import duckdb
    except ImportError:
        log.error("duckdb not installed. Run: uv sync")
        sys.exit(1)
    try:
        import numpy as np
    except ImportError:
        log.error("numpy not installed. Run: uv sync")
        sys.exit(1)
    try:
        import pandas as pd
    except ImportError:
        log.error("pandas not installed. Run: uv sync")
        sys.exit(1)
    try:
        from shapely import from_wkb
    except ImportError:
        log.error("shapely not installed. Run: uv sync")
        sys.exit(1)
    try:
        import libpysal.weights as weights
        from esda import G_Local
    except ImportError:
        log.error(
            "libpysal / esda not installed. Run: uv sync  "
            "(ADR-0010: libpysal>=4.10, esda>=2.5 required)"
        )
        sys.exit(1)
    return duckdb, np, pd, from_wkb, weights, G_Local


def load_data(con) -> tuple[Any, Any]:
    """Load dynamism scores and PLR geometries from DuckDB.

    spatial-methods.md §3: geometries exported as WKB in EPSG:25833 via ST_AsWKB.
    No pyproj, no CRS round-trip (ADR-0010 Amendment 3).
    """
    # C5-corrected dynamism_score from int_poi_status_dynamism.
    # spatial-methods.md §5: input y = C5-corrected dimension sub-score.
    scores_sql = """
        SELECT
            area_code,
            snapshot_year,
            dynamism_score
        FROM int_poi_status_dynamism
        WHERE area_code IS NOT NULL
          AND dynamism_score IS NOT NULL
        ORDER BY snapshot_year, area_code
    """
    scores_df = con.execute(scores_sql).df()

    if scores_df.empty:
        log.warning(
            "int_poi_status_dynamism has no rows. "
            "Run ingestion (uv run poe ingest) then uv run poe build first."
        )
        return scores_df, _empty_geom_df()

    # PLR geometries as WKB in EPSG:25833 (spatial-methods.md §3; ADR-0010 Amendment 3).
    # Load from stg_berlin_lor via the DuckDB model (lor_2021 vintage for current analysis).
    # We need the 2021 geometry set for the Queen weights matrix — consistent with the
    # primary analysis vintage (index-definition.md §6.2 area_vintage='lor_2021').
    geom_sql = """
        SELECT
            area_code,
            ST_AsWKB(ST_GeomFromWKB(geometry_wkb)) AS geom_wkb
        FROM stg_berlin_lor
        WHERE geometry_wkb IS NOT NULL
          AND area_vintage = 'lor_2021'
        ORDER BY area_code
    """
    try:
        geom_df = con.execute(geom_sql).df()
    except Exception as e:
        log.warning("Could not load LOR geometries: %s", e)
        geom_df = _empty_geom_df()

    return scores_df, geom_df


def _empty_geom_df() -> Any:
    import pandas as pd

    return pd.DataFrame(columns=["area_code", "geom_wkb"])


def build_queen_weights(geom_df: Any, from_wkb: Any, weights_mod: Any) -> tuple[Any, list]:
    """Build Queen contiguity weights from shapely geometries.

    spatial-methods.md §6 + ADR-0010 Required 1: no geopandas; weights built directly
    from shapely geometries parsed from DuckDB WKB.
    Fallback to k-NN (k=6) for disconnected/island PLRs (spatial-methods.md §6).

    Returns (w, ordered_area_codes) or (None, []) on failure.
    """
    from shapely import from_wkb as _from_wkb

    if geom_df.empty:
        return None, []

    geoms = [_from_wkb(bytes(wkb)) for wkb in geom_df["geom_wkb"]]
    area_codes = list(geom_df["area_code"])

    try:
        # spatial-methods.md §6: Queen contiguity (shared edge or vertex), parameter-free
        # first choice for areal tessellations (Ord & Getis 1995).
        w = weights_mod.Queen.from_iterable(geoms, ids=area_codes)
        log.info("Queen weights: %d PLRs, mean neighbours=%.1f", len(w.id_order), w.mean_neighbors)

        # Check for islands (no neighbours) — fallback to k-NN (spatial-methods.md §6).
        islands = [k for k, v in w.neighbors.items() if len(v) == 0]
        if islands:
            log.warning(
                "Queen weights: %d island PLRs detected (water bodies / airport perimeter). "
                "Falling back to k-NN (k=6) for these PLRs (spatial-methods.md §6).",
                len(islands),
            )
            # Build k-NN for island PLRs and fill in missing neighbours.
            # Extract centroids for k-NN (islands need coordinate input).
            import numpy as np

            centroids = np.array([(g.centroid.x, g.centroid.y) for g in geoms], dtype=float)
            knn = weights_mod.KNN.from_array(centroids, k=6, ids=area_codes)
            for island_id in islands:
                w.neighbors[island_id] = knn.neighbors[island_id]
                w.weights[island_id] = knn.weights[island_id]
            w._reset()

        # Row-standardize (spatial-methods.md §6: row-standardized weights).
        w.transform = "r"
        return w, area_codes

    except Exception as e:
        log.error("Failed to build Queen weights: %s", e)
        return None, []


def run_gi_star(
    scores_df: Any,
    w: Any,
    ordered_codes: list,
    G_Local: Any,
    np: Any,
    year: int,
) -> Any | None:
    """Run Getis-Ord Gi* for a single snapshot_year.

    spatial-methods.md §6:
      esda.G_Local(y, w, permutations=999, seed=42)
      Explicit per-call seed=42 (R-C3; ADR-0010 Required 4).
      Output: z-score + permutation p-value per PLR; hot/cold/ns label at α=0.05.
    """
    import pandas as pd

    year_df = scores_df[scores_df["snapshot_year"] == year].copy()
    if year_df.empty:
        log.warning("No dynamism_score rows for year=%d; skipping.", year)
        return None

    # Align dynamism_score to weights matrix order.
    score_map = dict(zip(year_df["area_code"], year_df["dynamism_score"]))
    y_values = np.array([score_map.get(code, float("nan")) for code in ordered_codes], dtype=float)

    # Exclude PLRs with NaN scores (uninhabited, missing data).
    valid_mask = ~np.isnan(y_values)
    n_valid = valid_mask.sum()
    if n_valid < 3:
        log.warning(
            "Year=%d: only %d valid PLRs after NaN exclusion; cannot run Gi*.", year, n_valid
        )
        return None

    # Replace NaN with 0.0 for PySAL (NaN-aware G_Local not available in older esda).
    # This is a conservative fill: uninhabited PLRs contribute 0 to spatial clustering.
    y_filled = np.where(valid_mask, y_values, 0.0)

    try:
        # spatial-methods.md §6: permutations=999, seed=42 (R-C3).
        # star=True: Gi* (focal unit included in its own neighbourhood sum).
        # star=False (esda default) computes Gi (focal excluded) — wrong per spec.
        # Getis & Ord (1992); Ord & Getis (1995); spatial-methods.md §6.
        gi = G_Local(y_filled, w, permutations=999, seed=42, star=True)
    except Exception as e:
        log.error("G_Local failed for year=%d: %s", year, e)
        return None

    # Build output DataFrame.
    result = pd.DataFrame(
        {
            "area_code": ordered_codes,
            "snapshot_year": year,
            "dynamism_score": y_values,
            "gi_zscore": gi.Zs,
            # gi.p_sim = permutation p-value (two-tailed; spatial-methods.md §6).
            "gi_pvalue": gi.p_sim,
        }
    )

    # Hot/cold/ns label at α=0.05 (spatial-methods.md §6).
    # cluster_label uses internal statistic terminology ("Gi* hotspot").
    # PUBLIC output must use hedged label ("amenity-change hotspot" / "social-change-pressure
    # cluster") + G-2 ecological-inference disclaimer (spatial-methods.md §6; domain-expert C1).
    result["cluster_label"] = "ns"
    result.loc[(result["gi_pvalue"] < ALPHA) & (result["gi_zscore"] > 0), "cluster_label"] = "hot"
    result.loc[(result["gi_pvalue"] < ALPHA) & (result["gi_zscore"] < 0), "cluster_label"] = "cold"

    # Restore NaN for uninhabited PLRs (set dynamism_score back to NaN).
    result.loc[~valid_mask, ["dynamism_score", "gi_zscore", "gi_pvalue"]] = float("nan")
    result.loc[~valid_mask, "cluster_label"] = "ns"

    return result


def main() -> None:
    duckdb, np, pd, from_wkb, weights_mod, G_Local = _import_deps()

    # Open DuckDB connection (configurable path; ADR-0010 Amendment 7).
    if not Path(DUCKDB_PATH).exists():
        log.error("DuckDB not found at %s. Run uv run poe build first.", DUCKDB_PATH)
        sys.exit(1)

    con = duckdb.connect(DUCKDB_PATH, read_only=True)

    # Load the spatial extension (required for ST_AsWKB / ST_GeomFromWKB).
    try:
        con.execute("LOAD spatial;")
    except Exception:
        pass  # already loaded or not available (stub DB)

    scores_df, geom_df = load_data(con)
    con.close()

    if scores_df.empty:
        log.warning("No scores data; exiting without writing output.")
        return

    if geom_df.empty:
        log.error("No PLR geometries found. Run: uv run poe ingest && uv run poe build")
        sys.exit(1)

    # Build Queen contiguity weights (spatial-methods.md §6).
    w, ordered_codes = build_queen_weights(geom_df, from_wkb, weights_mod)
    if w is None:
        log.error("Could not build spatial weights; exiting.")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    years = sorted(scores_df["snapshot_year"].unique())
    log.info("Running Gi* for %d years: %s", len(years), years)

    for year in years:
        result_df = run_gi_star(scores_df, w, ordered_codes, G_Local, np, year)
        if result_df is None:
            continue

        out_path = OUT_DIR / f"a6_hotspots_{year}.csv"
        result_df.to_csv(out_path, index=False)
        n_hot = (result_df["cluster_label"] == "hot").sum()
        n_cold = (result_df["cluster_label"] == "cold").sum()
        log.info(
            "Year=%d: %d hot / %d cold / %d ns PLRs → %s",
            year,
            n_hot,
            n_cold,
            len(result_df) - n_hot - n_cold,
            out_path,
        )

    log.info("a6_hotspots.py complete.")


if __name__ == "__main__":
    main()

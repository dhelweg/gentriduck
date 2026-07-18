"""
analysis/f_oa_getis_ord.py
===========================
OA-D3c (#280, ADR-0025): Getis-Ord Gi* hotspot statistic for Offering
Advantage (OA) domain-grain local stock -- the one OA method (Getis-Ord)
ADR-0024 held out ("z-score/binomial-SLQ, Getis-Ord, density, per-capita")
because it needs a spatial-weights matrix W (Queen contiguity), which is
NOT a SQL operation (OA-D0 geo sign-off C9, docs/methodology/
OA-D0-geo-signoff.md). ADR-0025 (accepted 2026-07-18) authorizes this
analysis->mart handoff: this script computes Gi*, writes a small precomputed
results table, and `mart_poi_oa_hotspots.sql` joins it by stable key -- the
Gi* statistic itself never runs inside dbt/DuckDB (ADR-0025 Decision 2).

R-C2 GROUNDING CITATIONS (mandatory per CLAUDE.md grounding rule):
  Getis, A. & Ord, J.K. (1992), "The Analysis of Spatial Association by Use
    of Distance Statistics", Geographical Analysis 24(3) -- the Gi*
    statistic.
  Ord, J.K. & Getis, A. (1995), "Local Spatial Autocorrelation Statistics:
    Distributional Issues and an Application", Geographical Analysis 27(4)
    -- local Gi*, star=True (focal unit included).
  Benjamini, Y. & Hochberg, Y. (1995), "Controlling the False Discovery
    Rate: A Practical and Powerful Approach to Multiple Testing", JRSS B
    57(1) -- the BH step-up FDR correction applied below (note 5).
  OA-D0 geo-DS sign-off (docs/methodology/OA-D0-geo-signoff.md) Condition
    C9 -- binding scope (PLR/BZR only, domain grain only), weights spec
    (Queen, row-standardized, seed=42, k-NN fallback), FDR/multiple-
    comparison caveat, public-labelling guardrail.
  ADR-0025 (docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md) -- tool +
    analysis->mart handoff boundary (this script IS the handoff).
  ADR-0010 (spatial tooling adoption) Required 1/4, Amendment 3/4, Sec 5 --
    no geopandas (WKB parsed via shapely), per-call seed=42, k-NN(k=6)
    island fallback -- same conventions as a6_hotspots.py / a9_spatial_
    dynamic.py, reused verbatim here (this ADR's own pointer, "reuse
    a9_spatial_dynamic.py's patterns").

DESIGN CHOICES (ADR-0025 left these as "a methodology detail for the R-C1
gate" -- documented here for that gate's review, not self-certified):

1. INPUT VARIABLE: domain_stock_local (int_poi_offering_advantage_arealevel)
   -- the mass-conserved local POI stock per (area, domain, year), the same
   quantity feeding every other OA method. NOT oa_domain (the LQ itself):
   Gi* over an LQ ratio double-counts the city-share normalization Gi*'s own
   permutation-null already implicitly controls for via the observed spatial
   distribution -- a raw provision/stock surface is the more standard Gi*
   input (matches a6_hotspots.py's own choice of a raw score, not a ratio).
   weight_variant='standard' / methodology_variant='faithful' ONLY (the
   bandwidth-free hard-count construct) -- avoids compounding an already-
   large MAUP/multiple-comparison surface (OA-D0 geo sign-off C5) with a
   THIRD sweep axis (kernel bandwidth) this ticket does not scope; same
   restriction oa_bandwidth_sweep.py / c_offering_relevance_validation.py
   already apply to their own canonical-figure reads.

2. GEOMETRY SOURCE: dim_area_geometry (WGS84 GeoJSON) + dim_city.
   native_crs_epsg, reprojected back to native CRS IN SQL before WKB export
   (ADR-0010 Amendment 3: reproject in SQL, parse WKB in Python) --
   city-agnostic by construction (ADR-0005 / ADR-0025 Decision 5): this
   query has no city_code literal anywhere, it is parameterized per
   (city_code, area_level, area_vintage) discovered from the OA stock table
   itself. a6_hotspots.py/a9_spatial_dynamic.py instead read stg_berlin_lor
   directly (already-native-CRS, but Berlin-only by construction) -- this
   script reads the already-city-agnostic dim_area_geometry mart instead,
   since ADR-0025 Decision 5 requires no Berlin branch in this script.

3. SCOPE RESTRICTION (ADR-0025 Decision 3, BINDING, not a default): only
   area_level IN ('plr', 'bzr') -- a DATA-DRIVEN filter on the area_level
   column value, not a city_code branch (today only Berlin has rows at
   these two literal level codes; if a future city's own area_hierarchy
   ever used the same level-code vocabulary, this filter would apply to it
   identically, with no code change -- see ADR-0025 Decision 5 note that
   "Hamburg reuse can be validated later"). Bezirk (12 units, degenerate
   contiguity) and PGR (not yet R-C1-validated) are never computed.
   Taxonomy grain is ALWAYS poi_domain_h (never poi_category_h/poi_type_h)
   -- domain grain only, per ADR-0025 Decision 3.

4. SPATIAL WEIGHTS: Queen contiguity, row-standardized (transform='r'),
   built ONCE per (city_code, area_vintage, area_level) -- never across the
   2019->2021 LOR reform seam (ADR-0025 Decision 4), reused across every
   (snapshot_year, poi_domain_h) combination sharing that geometry. Island
   fallback: k-NN (k=6), same pattern as a6_hotspots.py / a9_spatial_
   dynamic.py -- every area receiving the fallback is logged AND flagged in
   the output (gi_star_w_fallback column) for auditability (ADR-0025
   Decision 4 "log/annotate any unit that received the fallback").

5. FDR CORRECTION -- CORRECTION-GROUP CHOICE (ADR-0025 Decision 4, the one
   genuinely open design call this script makes): Benjamini-Hochberg (1995)
   step-up, applied POOLED across every (area_code, poi_domain_h) p-value
   tested for the SAME (city_code, area_vintage, area_level, snapshot_year)
   -- i.e. one correction batch per published "map" (~hundreds of PLRs x 13
   domains at once), not per-domain-only. This directly matches OA-D0 geo
   sign-off C9's own framing of the risk ("Gi* over hundreds of PLRs x
   domains inflates false hotspots") -- a narrower per-domain-only
   correction would under-correct relative to that stated risk, since a
   reader scanning across domain maps for one year faces the WIDER combined
   family of tests, not just one domain's. `gi_star_cluster_label` (the
   published hot/cold/ns label) is derived from the FDR-adjusted
   significance flag, NOT the raw p-value -- the raw p is still carried
   through (gi_star_p) for a reader who wants the uncorrected number, per
   OA-D0 geo sign-off C9's "apply BH correction OR AT MINIMUM disclose the
   uncorrected-p caveat" (this script does the stronger of the two: both
   correct AND disclose). No new dependency: BH is implemented directly
   (statsmodels is not a project dependency; the step-up procedure is ~10
   lines, Benjamini & Hochberg 1995 Eq. 1-2).

6. PUBLIC LABELLING GUARDRAIL (ADR-0025 Decision 3 item 7 / OA-D0 geo
   sign-off C9): `gi_star_cluster_label` uses the SAME internal short codes
   as a6_hotspots.py ('hot'/'cold'/'ns') -- consumers MUST apply a
   provision/stock-calibrated hedged qualifier ("amenity-provision cluster"
   / "concentrated-provision area"), NOT a6_hotspots.py's own hedge
   ("amenity-change hotspot" / "social-change-pressure cluster"), which is
   calibrated for a change/dynamism input, not this column's single-
   snapshot-year stock input (domain_stock_local) -- OA-D3c domain sign-off
   F1. Also apply the ecological-inference disclaimer before any public
   surface. This script never emits the raw phrase "gentrification hotspot".

OUTPUT: data/analysis/oa_getis_ord/oa_getis_ord_{city_code}_{area_vintage}_
{area_level}.parquet (gitignored, deterministically rebuilt). Read by
transform/models/staging/stg_oa_getis_ord.sql via a glob
(union_by_name=true), same convention as every ingestion-fed staging model.

BUILD ORDER (binding, two-pass -- see stg_oa_getis_ord.sql header):
  1. uv run poe build                          # populates int_poi_offering_advantage_arealevel
  2. uv run python analysis/f_oa_getis_ord.py   # writes the parquet this script produces
  3. uv run poe build                           # materializes stg_oa_getis_ord + mart_poi_oa_hotspots
This mirrors the shape every ingestion-fed staging model already has
(ingest, then build) -- the "ingestion" step here is this deterministic
analysis script instead of an external-source fetch.

DB: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (local default; ADR-0010
    Amendment 7).

Usage:
  uv run python analysis/f_oa_getis_ord.py

Citations:
  Getis & Ord (1992), Geographical Analysis 24(3).
  Ord & Getis (1995), Geographical Analysis 27(4).
  Benjamini & Hochberg (1995), JRSS B 57(1).
  docs/methodology/OA-D0-geo-signoff.md C9.
  docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md.
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
_repo_root = Path(__file__).parent.parent
DUCKDB_PATH = Path(_env_db) if _env_db else _repo_root / "data" / "gentriduck.duckdb"

OUT_DIR = _repo_root / "data" / "analysis" / "oa_getis_ord"

# ADR-0025 Decision 3 (BINDING): PLR/BZR area levels only, domain taxonomy
# grain only. A data-driven filter on area_level's VALUE, not a city_code
# branch (see module docstring note 3).
SCOPE_AREA_LEVELS = ("plr", "bzr")

# ADR-0025 Decision 4 / R-C3 / ADR-0010 Required 4: explicit per-call seed.
SEED = 42
PERMUTATIONS = 999

# Note 1: bandwidth-free hard-count construct only (see module docstring).
WEIGHT_VARIANT = "standard"
METHODOLOGY_VARIANT = "faithful"

ALPHA = 0.05


# ---------------------------------------------------------------------------
# Dependency imports
# ---------------------------------------------------------------------------


def _import_deps() -> tuple:
    """Import required packages with clear error messages on missing deps."""
    missing = []
    try:
        import duckdb
    except ImportError:
        missing.append("duckdb")
        duckdb = None  # type: ignore[assignment]
    try:
        import numpy as np
    except ImportError:
        missing.append("numpy")
        np = None  # type: ignore[assignment]
    try:
        import pandas as pd
    except ImportError:
        missing.append("pandas")
        pd = None  # type: ignore[assignment]
    try:
        from shapely import from_wkb
    except ImportError:
        missing.append("shapely")
        from_wkb = None  # type: ignore[assignment]
    try:
        import libpysal.weights as weights_mod
    except ImportError:
        missing.append("libpysal")
        weights_mod = None  # type: ignore[assignment]
    try:
        from esda import G_Local
    except ImportError:
        missing.append("esda")
        G_Local = None  # type: ignore[assignment]

    if missing:
        log.error(
            "Missing packages: %s. Run: uv sync (ADR-0010: libpysal>=4.10, esda>=2.5 required)",
            ", ".join(missing),
        )
        sys.exit(1)

    return duckdb, np, pd, from_wkb, weights_mod, G_Local  # type: ignore[return-value]


# ---------------------------------------------------------------------------
# Discovery: which (city_code, area_vintage, area_level) combos exist
# ---------------------------------------------------------------------------


def discover_scope(con: Any) -> Any:
    """Discover every (city_code, area_vintage, area_level) combo present at
    the ADR-0025 Decision 3 scope restriction (PLR/BZR only) -- city-agnostic
    (ADR-0005): no city_code literal, purely a data-driven query against
    int_poi_offering_advantage_arealevel (note 3, module docstring).
    """
    placeholders = ", ".join(f"'{lvl}'" for lvl in SCOPE_AREA_LEVELS)
    sql = f"""
        SELECT DISTINCT city_code, area_vintage, area_level
        FROM int_poi_offering_advantage_arealevel
        WHERE area_level IN ({placeholders})
          AND weight_variant = '{WEIGHT_VARIANT}'
          AND methodology_variant = '{METHODOLOGY_VARIANT}'
          AND area_code IS NOT NULL
        ORDER BY city_code, area_vintage, area_level
    """  # noqa: S608 -- placeholders built from a fixed module constant, not user input
    return con.execute(sql).df()


def load_geoms(con: Any, city_code: str, area_vintage: str, area_level: str) -> Any:
    """Load area geometries as WKB in each city's OWN native metric CRS.

    Note 2 (module docstring): reads dim_area_geometry (already-city-agnostic,
    WGS84 GeoJSON) + dim_city.native_crs_epsg, reprojecting back to native
    CRS IN SQL (ADR-0010 Amendment 3) -- no city_code branch, no pyproj.
    """
    sql = """
        SELECT
            g.area_code,
            ST_AsWKB(
                ST_Transform(
                    ST_GeomFromGeoJSON(g.geometry_geojson),
                    'EPSG:4326',
                    'EPSG:' || c.native_crs_epsg,
                    always_xy := true
                )
            ) AS geom_wkb
        FROM dim_area_geometry AS g
        INNER JOIN dim_city AS c ON g.city_code = c.city_code
        WHERE g.city_code = ?
          AND g.area_vintage = ?
          AND g.area_level = ?
          AND g.geometry_geojson IS NOT NULL
        ORDER BY g.area_code
    """
    try:
        return con.execute(sql, [city_code, area_vintage, area_level]).df()
    except Exception as e:
        log.warning(
            "Could not load geometry for %s/%s/%s: %s", city_code, area_vintage, area_level, e
        )
        import pandas as pd

        return pd.DataFrame(columns=["area_code", "geom_wkb"])


def load_domain_stock(con: Any, city_code: str, area_vintage: str, area_level: str) -> Any:
    """Load domain-grain local stock, deduped down from
    int_poi_offering_advantage_arealevel's leaf-grain rows.

    Fan-out guard (oa_bandwidth_sweep.py precedent): domain_stock_local
    repeats once per (poi_category_h, poi_type_h) leaf under a domain by
    construction -- GROUP BY + any_value() collapses back to true
    (area_code, snapshot_year, poi_domain_h) grain.
    """
    sql = """
        SELECT
            area_code,
            snapshot_year,
            poi_domain_h,
            any_value(domain_stock_local) AS domain_stock_local
        FROM int_poi_offering_advantage_arealevel
        WHERE city_code = ?
          AND area_vintage = ?
          AND area_level = ?
          AND weight_variant = ?
          AND methodology_variant = ?
          AND area_code IS NOT NULL
        GROUP BY area_code, snapshot_year, poi_domain_h
        ORDER BY snapshot_year, poi_domain_h, area_code
    """
    return con.execute(
        sql, [city_code, area_vintage, area_level, WEIGHT_VARIANT, METHODOLOGY_VARIANT]
    ).df()


# ---------------------------------------------------------------------------
# Spatial weights (reused verbatim pattern from a6_hotspots.py / a9)
# ---------------------------------------------------------------------------


def build_queen_weights(geom_df: Any, from_wkb: Any, weights_mod: Any, np: Any) -> tuple:
    """Build Queen contiguity weights from shapely geometries.

    ADR-0010 Required 1: no geopandas -- built directly from shapely
    geometries parsed from DuckDB WKB. Island fallback: k-NN (k=6),
    row-standardized (transform='r') -- same pattern as a6_hotspots.py /
    a9_spatial_dynamic.py.

    Returns (w, ordered_area_codes, fallback_codes) or (None, [], []) on
    failure. fallback_codes is the set of area_code that received the k-NN
    fallback (ADR-0025 Decision 4: "log/annotate any unit that received the
    fallback").
    """
    if geom_df is None or geom_df.empty:
        return None, [], set()

    geoms = [from_wkb(bytes(wkb)) for wkb in geom_df["geom_wkb"]]
    area_codes = list(geom_df["area_code"])

    try:
        w = weights_mod.Queen.from_iterable(geoms, ids=area_codes)
        log.info("Queen weights: %d areas, mean neighbours=%.1f", len(w.id_order), w.mean_neighbors)

        islands = [k for k, v in w.neighbors.items() if len(v) == 0]
        fallback_codes: set = set()
        if islands:
            log.warning(
                "Queen weights: %d island areas -- falling back to k-NN (k=6) "
                "(ADR-0025 Decision 4).",
                len(islands),
            )
            centroids = np.array([(g.centroid.x, g.centroid.y) for g in geoms], dtype=float)
            knn = weights_mod.KNN.from_array(centroids, k=6, ids=area_codes)
            for island_id in islands:
                w.neighbors[island_id] = knn.neighbors[island_id]
                w.weights[island_id] = knn.weights[island_id]
                fallback_codes.add(island_id)
            w._reset()

        w.transform = "r"
        return w, area_codes, fallback_codes

    except Exception as e:
        log.error("Failed to build Queen weights: %s", e)
        return None, [], set()


# ---------------------------------------------------------------------------
# Benjamini-Hochberg FDR (Benjamini & Hochberg 1995) -- no new dependency
# ---------------------------------------------------------------------------


def benjamini_hochberg(pvalues: Any, np: Any) -> Any:
    """BH (1995) step-up FDR correction.

    Ignores NaN entries (returns NaN for them); corrects only the finite
    subset, consistent with how esda/scipy p-values are already NaN-filled
    for excluded units elsewhere in this pipeline (a6_hotspots.py /
    a9_spatial_dynamic.py convention).

    Reference: Benjamini, Y. & Hochberg, Y. (1995), "Controlling the False
    Discovery Rate", JRSS B 57(1), Eq. 1-2 (step-up procedure).
    """
    pvalues = np.asarray(pvalues, dtype=float)
    out = np.full(pvalues.shape, np.nan)
    valid = ~np.isnan(pvalues)
    n_valid = int(valid.sum())
    if n_valid == 0:
        return out

    valid_p = pvalues[valid]
    order = np.argsort(valid_p)
    ranked = valid_p[order]
    ranks = np.arange(1, n_valid + 1)
    adjusted = ranked * n_valid / ranks
    # Step-up monotonicity: enforce non-decreasing adjusted p as rank decreases.
    adjusted = np.minimum.accumulate(adjusted[::-1])[::-1]
    adjusted = np.clip(adjusted, 0, 1)

    result = np.empty(n_valid)
    result[order] = adjusted
    out[valid] = result
    return out


# ---------------------------------------------------------------------------
# Gi* per (city, vintage, level, year, domain)
# ---------------------------------------------------------------------------


def run_gi_star_for_scope(
    stock_df: Any,
    w: Any,
    ordered_codes: list,
    fallback_codes: set,
    G_Local: Any,
    np: Any,
    pd: Any,
    city_code: str,
    area_vintage: str,
    area_level: str,
) -> Any:
    """Run Gi* for every (snapshot_year, poi_domain_h) in this scope, then
    apply the pooled-per-year BH correction (note 5, module docstring).

    Missing (area_code, snapshot_year, poi_domain_h) combinations in
    stock_df mean "zero local stock of this domain in this area this year"
    (int_poi_offering_advantage_arealevel is a SPARSE table -- a domain with
    literally zero POIs in an area does not get a row), not "missing data"
    -- zero-filled, same convention a6_hotspots.py/a9_spatial_dynamic.py use
    for uninhabited areas.
    """
    if stock_df.empty:
        return pd.DataFrame()

    years = sorted(stock_df["snapshot_year"].unique())
    domains = sorted(stock_df["poi_domain_h"].unique())
    all_rows: list[dict] = []

    for year in years:
        year_df = stock_df[stock_df["snapshot_year"] == year]
        # Pivot to (area_code -> domain -> stock), zero-filled for missing combos.
        pivot = year_df.pivot_table(
            index="area_code",
            columns="poi_domain_h",
            values="domain_stock_local",
            aggfunc="sum",
            fill_value=0.0,
        )

        year_rows: list[dict] = []
        for domain in domains:
            if domain not in pivot.columns:
                y_values = np.zeros(len(ordered_codes))
            else:
                domain_map = pivot[domain].to_dict()
                y_values = np.array(
                    [float(domain_map.get(code, 0.0)) for code in ordered_codes], dtype=float
                )

            try:
                # Getis & Ord (1992); Ord & Getis (1995): star=True (Gi*, focal
                # unit included). seed=42, permutations=999 (R-C3; ADR-0010
                # Required 4). alternative='two-sided': bilateral hot/cold
                # classification.
                gi = G_Local(
                    y_values,
                    w,
                    permutations=PERMUTATIONS,
                    seed=SEED,
                    star=True,
                    alternative="two-sided",
                )
            except Exception as e:
                log.error(
                    "G_Local failed for %s/%s/%s year=%d domain=%s: %s",
                    city_code,
                    area_vintage,
                    area_level,
                    year,
                    domain,
                    e,
                )
                continue

            for i, area_code in enumerate(ordered_codes):
                # esda's two-sided p_sim (alternative="two-sided") is computed by
                # esda.significance._permutation_significance's symmetric
                # percentile-tail-count formula, (n_outside + 1) / (permutations + 1)
                # -- not by doubling a one-sided value (the G_Local attribute
                # docstring's "multiplied by 2" wording is stale relative to the
                # installed esda version's actual implementation). Under ties in
                # the permutation reference distribution -- common with sparse,
                # zero-heavy domain_stock_local -- this count-based formula can
                # push n_outside above the permutation count, yielding p_sim > 1.0
                # (observed up to ~1.10 empirically for this dataset, reproduced
                # directly against esda.G_Local on real data during code review).
                # A p-value cannot exceed 1 by definition -- clip at the source.
                p_sim = min(float(gi.p_sim[i]), 1.0)
                year_rows.append(
                    {
                        "city_code": city_code,
                        "area_vintage": area_vintage,
                        "area_level": area_level,
                        "area_code": area_code,
                        "snapshot_year": int(year),
                        "poi_domain_h": domain,
                        "domain_stock_local": float(y_values[i]),
                        "gi_star_z": float(gi.Zs[i]),
                        "gi_star_p": p_sim,
                        "gi_star_w_fallback": area_code in fallback_codes,
                    }
                )

        if not year_rows:
            continue

        # Note 5: BH correction pooled across every (area_code, poi_domain_h)
        # p-value tested for THIS year (the "one published map" batch).
        year_block = pd.DataFrame(year_rows)
        year_block["gi_star_p_fdr"] = benjamini_hochberg(year_block["gi_star_p"].values, np)
        year_block["gi_star_fdr_significant"] = year_block["gi_star_p_fdr"] < ALPHA

        # Note 6: cluster label derived from the FDR-adjusted flag, not raw p.
        year_block["gi_star_cluster_label"] = "ns"
        year_block.loc[
            year_block["gi_star_fdr_significant"] & (year_block["gi_star_z"] > 0),
            "gi_star_cluster_label",
        ] = "hot"
        year_block.loc[
            year_block["gi_star_fdr_significant"] & (year_block["gi_star_z"] < 0),
            "gi_star_cluster_label",
        ] = "cold"

        all_rows.append(year_block)

    if not all_rows:
        return pd.DataFrame()
    return pd.concat(all_rows, ignore_index=True)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def _check_table(con: Any, table: str) -> bool:
    rows = con.execute(
        f"SELECT count(*) FROM information_schema.tables "  # noqa: S608
        f"WHERE table_schema='main' AND table_name='{table}'"
    ).fetchone()
    return bool(rows and rows[0] > 0)


def main() -> None:
    duckdb, np, pd, from_wkb, weights_mod, G_Local = _import_deps()

    if not DUCKDB_PATH.exists():
        log.info(
            "DuckDB not found at %s. Set GENTRIDUCK_DB or run 'uv run poe build' first. "
            "Exiting cleanly (data-presence guard).",
            DUCKDB_PATH,
        )
        sys.exit(0)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    try:
        con.execute("LOAD spatial;")
    except Exception:  # noqa: S110 -- best-effort load, absence handled downstream
        pass

    required_tables = {"int_poi_offering_advantage_arealevel", "dim_area_geometry", "dim_city"}
    for tbl in required_tables:
        if not _check_table(con, tbl):
            log.info(
                "Required table '%s' not found. Run 'uv run poe build' first. Exiting cleanly.",
                tbl,
            )
            con.close()
            sys.exit(0)

    scope_df = discover_scope(con)
    if scope_df.empty:
        log.warning(
            "No (city_code, area_vintage, area_level) combos found at scope %s / "
            "weight_variant=%s / methodology_variant=%s. Nothing to compute.",
            SCOPE_AREA_LEVELS,
            WEIGHT_VARIANT,
            METHODOLOGY_VARIANT,
        )
        con.close()
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    n_written = 0
    for _, scope_row in scope_df.iterrows():
        city_code = scope_row["city_code"]
        area_vintage = scope_row["area_vintage"]
        area_level = scope_row["area_level"]

        log.info("=== %s / %s / %s ===", city_code, area_vintage, area_level)

        geom_df = load_geoms(con, city_code, area_vintage, area_level)
        if geom_df.empty:
            log.warning(
                "No geometry for %s/%s/%s -- skipping.", city_code, area_vintage, area_level
            )
            continue

        # ADR-0025 Decision 4: W built ONCE per (city, vintage, level), never
        # across the 2019->2021 LOR reform seam.
        w, ordered_codes, fallback_codes = build_queen_weights(geom_df, from_wkb, weights_mod, np)
        if w is None:
            log.error(
                "Could not build spatial weights for %s/%s/%s -- skipping.",
                city_code,
                area_vintage,
                area_level,
            )
            continue

        stock_df = load_domain_stock(con, city_code, area_vintage, area_level)
        if stock_df.empty:
            log.warning(
                "No domain-grain stock for %s/%s/%s -- skipping.",
                city_code,
                area_vintage,
                area_level,
            )
            continue

        result_df = run_gi_star_for_scope(
            stock_df,
            w,
            ordered_codes,
            fallback_codes,
            G_Local,
            np,
            pd,
            city_code,
            area_vintage,
            area_level,
        )
        if result_df.empty:
            log.warning(
                "No Gi* results produced for %s/%s/%s.", city_code, area_vintage, area_level
            )
            continue

        out_path = OUT_DIR / f"oa_getis_ord_{city_code}_{area_vintage}_{area_level}.parquet"
        result_df.to_parquet(out_path, index=False)
        n_written += len(result_df)

        n_hot = int((result_df["gi_star_cluster_label"] == "hot").sum())
        n_cold = int((result_df["gi_star_cluster_label"] == "cold").sum())
        n_fallback_rows = int(result_df["gi_star_w_fallback"].sum())
        log.info(
            "%s/%s/%s: %d rows (%d hot / %d cold / %d ns after FDR; "
            "%d rows carry a k-NN-fallback area) -> %s",
            city_code,
            area_vintage,
            area_level,
            len(result_df),
            n_hot,
            n_cold,
            len(result_df) - n_hot - n_cold,
            n_fallback_rows,
            out_path,
        )

    con.close()
    log.info(
        "f_oa_getis_ord.py complete: %d total rows written under %s. "
        "Run 'uv run poe build' again to materialize stg_oa_getis_ord / "
        "mart_poi_oa_hotspots with this precompute.",
        n_written,
        OUT_DIR,
    )


if __name__ == "__main__":
    main()

# ADR-0025: Getis-Ord Gi* via PySAL (`esda`/`libpysal`) — analysis→mart handoff

- **Status:** Proposed — **awaiting maintainer acceptance.** The maintainer greenlit *drafting* this
  ADR (2026-07-17); nothing is wired until they accept it. This is a **new-tool-adoption** record under
  CLAUDE.md golden rule 2.
- **Date:** 2026-07-17
- **Deciders:** system-architect (author); maintainer (accepts/rejects). The Gi\* *methodology* itself
  (weights parameters, cut-points, disclosure) re-enters the **R-C1 dual gate** (geo-data-scientist +
  gentrification-domain-expert) separately when the analysis script is built — the architect authors
  this tool decision and does **not** self-sign the methodology.
- **Issue:** OA-D (Getis-Ord follow-on); discharges the ⚠ open item in ADR-0024.
- **Extends:** ADR-0010 (spatial tooling — already adopted PySAL for the analysis layer) and ADR-0024
  (OA calculation-method vocabulary — unblocks the one method it held out). **Does not** re-open the
  other nine confirmed OA methods, nor change any accepted ADR (ADRs are append-only).
- **Grounding (R-C2):** `docs/methodology/OA-D0-geo-signoff.md` C9 (Gi\* grain/W/FDR caveats) and
  call-out 4 (analysis→mart handoff routed to the architect); ADR-0024 *Maintainer scope confirmation*
  ⚠ block; ADR-0010 §2 + Amendments 3/4 (PySAL adoption, WKB handoff, seed discipline); Getis & Ord
  (1992); Ord & Getis (1995).

---

## Context

ADR-0024 confirmed a maximal-breadth ("everything") OA method set that includes **Getis-Ord Gi\***
hotspot statistics. The R-C1 geo sign-off (OA-D0, condition **C9** + call-out 4) flagged that **Gi\***
**cannot be computed in pure DuckDB**: it requires (1) a **spatial-weights matrix W** (Queen
contiguity built from area polygons) and (2) the Gi\* statistic with **permutation inference** — neither
of which is a SQL operation. In practice this means a PySAL-family library (`esda` for the statistic,
`libpysal` for the weights). ADR-0024 therefore **held Gi\* out of the build** pending this decision:
either (a) drop Gi\* to keep ADR-0024 tool-free, or (b) greenlight this follow-on new-tool ADR. The
maintainer chose to have (b) drafted.

The tool is **not new to the repo**: **ADR-0010 already adopted `libpysal` + `esda` (+ `spreg`)** as
accepted dependencies, restricted to the **`analysis/` Python layer** for spatial diagnostics
(Moran's I, LISA, Gi\* hotspots) — never in the dbt build path. What is *new* here is **promoting a
Gi\* result into a published mart**, which forces an **analysis→mart handoff** (a Python precompute
that lands a small results table the SQL mart joins). That handoff is the ADR-0009 tooling-boundary
question the geo reviewer explicitly routed to the architect; it is the substance of this ADR.

## Decision

### 1. Tool: reuse PySAL (`esda` + `libpysal`), already adopted (ADR-0010) — no genuinely new dependency

- **`esda`** (Exploratory Spatial Data Analysis) provides `esda.G_Local` (Getis-Ord Gi\*) with
  conditional-permutation inference. **`libpysal`** provides Queen-contiguity weights
  (`libpysal.weights.Queen` / the modern `libpysal.graph` API) built directly from `shapely`
  geometries. Both are **BSD-3-Clause** (free + open-source, golden rule 1), pure-Python,
  pip/`uv`-installable, and cross-platform (macOS/Windows/Linux) — no OS-specific CLI, no compiled
  GDAL/geopandas chain (ADR-0010 Amendment 1 keeps `geopandas`/`pyproj`/`fiona` excluded; WKB is read
  straight from DuckDB and parsed with `shapely.from_wkb`).
- **Versions:** the ADR-0010 floors already in `pyproject.toml`/`uv.lock` — **`libpysal>=4.10`,
  `esda>=2.5`** (exact pins set by the `uv.lock` resolve). **No new library is added by this ADR**; it
  only authorizes *using the already-adopted `esda`/`libpysal` to feed a mart*. `spreg` is unrelated to
  Gi\* and is untouched.
- **Minimal dependency:** `esda` needs `libpysal` (the weights object is `esda.G_Local`'s input), so
  **both** are required; `esda` alone does not suffice, and `libpysal` alone cannot compute the
  statistic. This is the minimal pair — nothing beyond ADR-0010's manifest is pulled in.

### 2. Where it runs: an `analysis/*.py` step that feeds the mart (binding boundary)

Gi\* **stays out of dbt/DuckDB.** Do **not** attempt to re-implement contiguity or the Gi\* statistic
in SQL (geo C9: "keep Gi\* as an analysis-layer feed into the mart rather than re-implementing
contiguity in SQL"). Concretely:

1. A deterministic **`analysis/*.py`** step (the existing `analysis/a9_spatial_dynamic.py` spatial
   layer, or a sibling under the same governance) reads **OA stocks/geometry** from DuckDB — the area
   `weighted_count`/local-stock table and `dim_area_geometry` WKB — via a **configurable** DuckDB
   connection (ADR-0010 Amendment 7: local file now, `md:` later; not a hard-coded path).
2. It builds W, computes Gi\* + permutation z/p, and **writes a small results table** (parquet/seed:
   keyed on `city_code, area_vintage, area_level, area_code, snapshot_year, poi_domain_h`, plus
   `gi_star_z`, `gi_star_p`, FDR-adjusted flag, hotspot/coldspot label).
3. The **mart layer joins** that precomputed table by stable key. The mart performs **no spatial
   computation** — the DuckDB→MotherDuck swap and the pure-SQL build path are preserved (ADR-0001).

This is the correct read of the ADR-0009 boundary: the *statistic* lives in the governed, deterministic
analysis layer (its own R-C1/R-C3 discipline); the *mart* only serves a joined, precomputed column.

### 3. Scope restriction (binding): PLR and BZR × domain grain only

Per geo C9, published Gi\* is **restricted** to:

- **Area levels: PLR and BZR only.** **NOT Bezirk** (12 units → degenerate contiguity graph, meaningless
  neighbour structure) — suppress there. Bezirk-level Gi\* must not be computed or published.
- **Taxonomy grain: domain grain (optionally category).** **NOT full type-leaf grain** — a sparse type
  surface is mostly near-empty cells, so Gi\* on it is noise. This is a **deliberate asymmetry**: the
  rest of the OA mart is full leaf grain (ADR-0024 knob 4), but Gi\* is domain(/category) grain only.
  State the asymmetry explicitly in the model/script and the serving view.

These are **binding constraints**, not defaults — the analysis step must hard-restrict its output grid.

### 4. Spatial weights (W)

- **W = Queen contiguity** (shared edge *or* vertex) built **generically from `dim_area_geometry`**
  polygons at the target level, per `area_vintage` (prefix nesting/geometry differ across the 2021 LOR
  reform — build W within one vintage, never across it).
- **Row-standardized** W (`transform='r'`) so Gi\* is a neighbourhood-mean comparison (ADR-0010
  Required-4 posture; geo C9).
- **Permutation inference with `seed=42`** on every `esda` call (ADR-0010 Amendment 4; R-C3 leakage
  guard) — no reliance on a process-global RNG.
- **Island / no-neighbour handling:** any area with an empty contiguity row (water bodies, airport
  perimeters, the known `area_code = NULL` PLR zones) must not produce an empty W row. Fall back to
  **k-nearest-neighbour (k≈6)** for disconnected units (ADR-0010 §5 fallback), and log/annotate any
  unit that received the fallback so the neighbour structure is auditable.
- **FDR / multiple-comparison caveat:** Gi\* over hundreds of PLRs × domains inflates false hotspots —
  apply **Benjamini–Hochberg** correction (or, at minimum, disclose the uncorrected-p caveat) as geo C9
  requires. The exact correction is a methodology detail for the R-C1 gate, but the tool decision
  records that it is mandatory.

### 5. City-agnostic (ADR-0005)

W is constructed **generically** from `dim_area_geometry` for the requested `city_code`/`area_level` —
**Berlin is never hard-coded.** The metric CRS (Berlin EPSG:25833) is a per-city attribute supplied in
SQL before the WKB export (ADR-0010 Amendment 3: reproject in SQL, parse WKB in Python, no Python-side
reprojection). Hamburg (ADR-0014) reuses the **same** analysis path with its own polygons and CRS — no
Berlin-specific branch in the shared script.

### 6. Relationship to ADR-0024

This ADR **unblocks the single method ADR-0024 held out** (Getis-Ord Gi\*). It does **not** re-open the
other nine confirmed OA methods, and it does not change ADR-0024's other knobs. When accepted, ADR-0024's
⚠ open item is discharged via option (b): `esda` greenlit, Gi\* restricted to PLR/BZR × domain grain.

## Alternatives considered

- **(a) Drop Getis-Ord entirely** (keep ADR-0024 tool-free) — **REJECTED by the maintainer's greenlight
  to draft (b).** Viable and lowest-cost, but loses the one method that directly answers "where are the
  contiguous gentrification hotspots" (Döring & Ulbricht motivation, ADR-0010) — and the tool is already
  in the repo for analysis-layer use, so the marginal cost of (b) is the handoff, not a new dependency.
- **Re-implement Gi\* + Queen contiguity in pure DuckDB SQL — REJECTED** (geo C9; ADR-0010 Alternatives).
  Permutation inference and contiguity graphs are error-prone and unreviewable in SQL; `esda` is the
  citable reference implementation (R-C2 grounding).
- **Compute Gi\* inside the dbt build path via a Python model / community extension — REJECTED.** Pulls
  the statistical machinery into the build DAG, breaks the pure-SQL, MotherDuck-portable build
  (ADR-0001), and (for any DuckDB spatial-stats community extension) fails the reproducibility/
  cross-platform bar (ADR-0010 §3 rationale). The analysis→mart handoff keeps the build green everywhere.
- **A different weights library (e.g. rolling our own, or a non-PySAL package) — REJECTED.** PySAL is
  already the adopted, BSD-3 standard (ADR-0010); introducing a second spatial-stats stack is needless
  dependency creep.

## Consequences

- **No new dependency to add** — `esda`/`libpysal` are already in the ADR-0010 manifest; this ADR
  **authorizes a new *use*** of them (feeding a published mart via an analysis precompute), not a new
  install. `uv.lock` is unchanged by this decision.
- **Gi\* becomes an analysis→mart feed**, not a dbt computation. The build path stays pure-SQL and
  MotherDuck-portable; the precomputed results table is the only new mart input, joined by stable key.
- **Published Gi\* is narrow by construction** — PLR/BZR × domain(/category) grain only, Bezirk and
  full type leaf suppressed. Fewer, more defensible hotspot columns than the rest of the OA mart.
- **The Gi\* methodology is still gated.** When the analysis script is built, its weights parameters,
  FDR correction, cut-points, and public hotspot-labelling guardrails (geo C9 / A9.2 hedged-qualifier
  convention — no raw "hotspot" targeting language on a displacement-adjacent surface) re-enter the
  **R-C1 dual gate** (geo-DS + domain-expert `PASS`) before integration into `develop`. This ADR fixes
  **only the tool + the boundary + the scope envelope**, not the numbers.
- **City-agnostic seam upheld** — the same analysis path serves Hamburg with its own polygons/CRS.
- **Ethics posture carried forward** — Gi\* hotspot maps default to BZR (ADR-0024 domain sign-off) and
  cuisine/nationality-coded type dominance stays off public surfaces; Gi\* being domain/category grain
  only is consistent with that.

## Sources

- `docs/methodology/OA-D0-geo-signoff.md` — condition **C9** (Gi\* grain/W/row-standardization/FDR/
  public-labelling) and call-out **4** (analysis→mart handoff routed to the architect).
- `docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md` — *Maintainer scope confirmation* ⚠
  open item (option (a) drop vs (b) follow-on `esda` ADR).
- `docs/adr/0010-spatial-distance-weighting.md` — §2 (PySAL adoption, BSD-3), Amendment 1 (no
  geopandas/pyproj), Amendment 3 (WKB handoff contract), Amendment 4 (per-call `seed=`), §5 (queen +
  k-NN fallback), Amendment 6 (floors: `libpysal>=4.10`, `esda>=2.5`).
- `docs/adr/0001-*` (DuckDB local-first + pure-SQL build), `docs/adr/0005-*` (city-agnostic core),
  `docs/adr/0009-*` (tooling boundary), `docs/adr/0014-*` (Hamburg reuse).
- Getis, A. & Ord, J.K. (1992) *The Analysis of Spatial Association by Use of Distance Statistics*,
  Geographical Analysis 24(3); Ord, J.K. & Getis, A. (1995) *Local Spatial Autocorrelation Statistics:
  Distributional Issues and an Application*, Geographical Analysis 27(4).
- PySAL — `esda` (`G_Local` = Getis-Ord Gi\*), `libpysal` (Queen weights); BSD-3-Clause.
  <https://pysal.org/>

---

**Awaiting maintainer acceptance.** On accept, this discharges ADR-0024's ⚠ open item via option (b):
`esda`/`libpysal` (already adopted, BSD-3) may feed a Gi\* results table into the mart via an
`analysis/*.py` handoff, restricted to PLR/BZR × domain(/category) grain. Nothing is wired until then,
and the Gi\* methodology still passes the R-C1 dual gate separately.

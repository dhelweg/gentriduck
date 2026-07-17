# OA-D0 (ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** ADR-0024 (OA calculation-method vocabulary, area-hierarchy roll-up,
  within-group dominance) + `docs/planning/oa-modes-hierarchy-dominance.md`, reviewed against the
  **maintainer-confirmed D7 scope knobs** (maximal breadth: all methods promoted to mart, prefix-sum
  weighted roll-up, reuse existing WFS geometry + `ST_Union`-derived Bezirk, full leaf grain at every
  area level).
- **Date:** 2026-07-17
- **Grounding (R-C2):** `docs/methodology/spatial-methods.md` §7 (MAUP r>0.7), §11.1–§11.4 (OA construct,
  LQ-last, mass-conservation invariance, completeness caveat C-2); `int_poi_offering_advantage.sql`;
  `int_osm_poi_plr_weighted.sql` (§2 mass conservation, §11.3 leakage guard);
  `test_c1_oa_weighted_mass_conservation_invariance.sql`; `dim_area_geometry.sql`;
  `int_ewr_socioeco.sql` / `int_berlin_ewr_plr2021.sql`; ADR-0017 D1–D5; Openshaw (1984); Getis & Ord
  (1992); Haklay (2010); Clayton & Kaldor (1987).

---

## Verdict: PASS WITH CONDITIONS

The architecture is spatially and statistically sound and the "methods-as-columns / area_level-as-grain /
dominance-as-separate-model / never-blend" spine is correct. The **maximal-breadth** configuration the
maintainer confirmed (D7 knobs 1–4) is *buildable*, but it moves four methods (z-score/binomial-SLQ,
Getis-Ord, density, per-capita) out of the analysis layer and into a published mart at **full leaf grain
across four area levels** — which materially enlarges the MAUP/temporal-fragility surface. My PASS is
therefore **conditioned** on the fragility being *measured and disclosed per mode × per level* (never
silently published) and on the ten conditions below. None of these block build start; they are buildable
acceptance criteria for the D2–D6 tickets. The two open questions the ADR flagged to me are answered
concretely in C3 (completeness threshold) and C4 (`min_parent_base`).

---

## Conditions and answers to the open questions

### C1 — Prefix-sum weighted roll-up **is acceptable**, and is in fact the *only* correct cheap option (open question, answered)

Answer to ADR D7 knob 2 / open decision 3: **prefix-sum the mass-conserved PLR `weighted_count` up the
LOR-prefix hierarchy — do NOT per-level re-kernel.** This is not merely a pragmatic simplification; it is
the choice that *provably preserves* the C-1 invariant, whereas re-kernelling would *break* it:

1. **It preserves C-1 at every area level by construction.** `int_osm_poi_plr_weighted` guarantees each
   POI's weights sum to exactly 1 across the PLRs it reaches (§2 mass conservation + §11.3 leakage guard).
   Summing `weighted_count` up a *disjoint, exhaustive* prefix partition (bzr=6, pgr=4, bezirk=2 digit
   prefixes of the 8-digit PLR — each PLR maps to exactly one parent at each level) is a linear
   aggregation of quantities that already sum to the hard count. Therefore
   `Σ_{plr∈parent} weighted_count = Σ_{plr∈parent} hard_count` holds at *every* level, and the citywide
   total is unchanged. Prefix-sum inherits §11.1's invariance exactly (see C6 test).
2. **Re-kernelling against coarser geometries would VIOLATE C-1** unless a fresh leakage guard were
   re-derived per level, and would change the citywide denominator (a POI's Gaussian spread against BZR
   representative points is a *different* mass distribution than against PLR points). It also re-opens the
   representative-point and bandwidth questions (§11.2/§11.3) at each level for no interpretive gain: the
   kernel's whole job (§1) is to fix *sub-PLR edge effects*; at BZR/PGR/Bezirk grain the edge-effect
   fraction shrinks, so re-smoothing buys precision the coarse grain has already washed out.

**Condition C1:** the weighted roll-up MUST be prefix-sum of `weighted_count`, formed **before** the LQ
(LQ-last, §11.1), within a single `area_vintage` (prefix nesting holds inside `lor_pre2021`/`lor_2021`,
never across the 2021 reform). Document in the model SQL that this is a *deliberate* choice preserving C-1,
and that the kernel is intentionally applied only at the finest grain. Grounding: §11.1, §11.3, §2.

### C2 — Stock-first / LQ-last / broadcast-once city denominator is BLOCKING and correct

ADR D2 rules 1 (aggregate stocks, ratio last — never average child LQs; Simpson/Jensen) and 2 (city
denominators computed once at the finest level and broadcast by join, never re-windowed over the unioned
multi-level rows) are both **mandatory**. Rule 2 is the specific structural defense against the I15-class
bug at 4× scale: window-summing over rows that now exist at four levels would count each POI up to four
times and silently break `OA=1 ⇒ average`. This same rule extends to HHI/entropy inputs (dominance) and
to **every** new method column in C7. Grounding: §11.1; ADR-0017 D-2; I15 findings.

### C3 — Completeness-contamination test threshold (open question, answered)

The C-2 caveat (§11.1: nested-LQ is invariant to *uniform* PLR coverage scaling; the residual threat is
*category-differential* mapping completeness and tag-schema drift — Haklay 2010 shows coverage is not
spatially neutral) becomes a pass/fail gate as follows:

- **Statistic:** per area level × per mode, compute Spearman ρ between each area's temporal
  Δ(earliest→latest snapshot) in the mode's value and a **coverage-growth proxy** =
  Δ `all_domains_stock_local` (total POI count) for that area over the same window. Use Spearman (rank),
  not Pearson, because coverage growth is heavy-tailed and monotone-but-nonlinear.
- **Threshold:** a mode **fails** (is flagged temporal-unsafe on the G2 page and barred from temporal
  claims) at level L if **|ρ| ≥ 0.3** with permutation p < 0.05 (seed-fixed, R-C3). 0.3 is the
  conventional "weak but non-negligible" Cohen boundary; I set it deliberately conservative because a
  displacement-adjacent public surface must err toward disclosure. This is a *directional expectation
  check*, not a fitted cutoff: nested-LQ / log-LQ / EB-shrunk / rank SHOULD pass (|ρ|<0.3); **raw
  within-group share, density, and per-capita SHOULD fail** — and if they don't, that itself is a finding
  to investigate, not a green light.
- **Posture:** contamination is **disclosed, never hidden** (§11.1 anti-erasure framing). A failing mode
  is still computed and shown *with a temporal-unsafe badge*; it is only barred from *change-over-time*
  interpretation. Report the full per-mode × per-level ρ table in the D5 study.

### C4 — `min_parent_base` cut (open question, answered)

Reuse the existing, already-justified machinery rather than inventing a new number: the OA layer already
ships `oa_min_poi_base_n` (dbt var, default **10**, per-city per ADR-0005) keyed on each level's *own*
local-share denominator (`int_poi_offering_advantage.sql` D-3 flags). My recommendation:

- **Keep the default at 10** for the LQ family at PLR grain (a conventional small-sample cutoff; the model
  header already characterises its Berlin footprint: ~0.4% of domain-level PLR-years, ~44% of
  category/type PLR-domain rows in the latest snapshot).
- **For the dominance family, key the gate on `n_children`-weighted parent base and set it higher —
  suppress/annotate HHI, top_share, entropy, evenness when the parent node's local stock
  `< max(oa_min_poi_base_n, 5·n_children)`.** Rationale: a concentration index over k children needs
  meaningfully more than k observations before `Σ p_i²` is stable; with base ≈ k the top_share is
  dominated by integer-granularity noise (one POI moves a share by 1/base). The `5·k` heuristic is a
  documented rule of thumb (≈5 obs/cell, the standard χ²/contingency-table minimum-expected-count
  convention), not an empirical fit — state it as such.
- **Coarser area levels partly self-heal this** (larger base → the resolution-vs-stability dial, ADR-0024
  D2), so the flag will fire far less at bzr/pgr/bezirk — report the flagged-fraction per level so readers
  see the dial working.
- **Suppression is annotate-not-delete** (§11.1 / #274 Condition D1 anti-erasure): a thin cell means "too
  thinly observed to compute a stable ratio," NEVER "commercially dead" — and because OSM completeness
  correlates with area advantage (Haklay 2010), a blanked peripheral/low-income Kiez risks exactly the
  stigmatisation this project exists to avoid. The raw value stays available to callers who ask.

### C5 — Density at full type grain across all levels is the fragile corner; measure MAUP per mode × per level

This is the heaviest and most MAUP-exposed part of the maximal-breadth config, and the maintainer should
go in eyes-open (see "call-outs" below). Conditions:

- The §7 **r>0.7 rank-stability gate applies per mode AND per area_level pair** (PLR↔BZR as the primary
  §7 pair; optionally BZR↔PGR, PGR↔Bezirk). Compute Spearman rank correlation of each mode's per-area
  ranking between adjacent scales. **Density and raw share WILL frequently fall below 0.7** — this is
  expected (density is dimensionally area-dependent; Openshaw 1984) and is a **finding to disclose, not a
  reason to block**. Nested-LQ/global-LQ/log/EB/rank should clear it.
- **Density MUST NOT be published at PGR/Bezirk until those levels have real polygon area.** The ADR text
  is stale here: per the maintainer's knob 3, PGR/BZR/Ortsteil geometry already exists in
  `dim_area_geometry` (#242/#269) and Bezirk is to be `ST_Union`-derived (C8). So `area_km²` is available
  at every level — but density at **full type grain** over a Bezirk (12 units) is an ecological-fallacy
  magnet: "cafés per km² in a whole borough" says nothing about any Kiez inside it. Require the
  ecological-fallacy disclaimer (mirroring the A9.2/§6 public-labelling guardrail) on every coarse-level
  density figure, and treat scale-rank flips as substantive (ADR-0024 D2 / C-4 mirror).
- Density's denominator is **geometric area (`area_km²`)**, computed in native EPSG:25833 via
  `ST_Area` *before* the WGS84 reprojection (never compute area in EPSG:4326 degrees — see C8).

### C6 — New blocking test `test_c1b_oa_arealevel_mass_conservation_invariance.sql`

Design is correct and required. Concretely: per
`(city_code, snapshot_year, area_vintage, weight_variant, poi_domain_h, poi_category_h, poi_type_h,
area_level)`, assert `Σ_{area at that level} local_stock == city_stock` at every taxonomy level, and
additionally assert **cross-level equality** — `city_stock` and the summed `local_stock` must be
**identical across all four `area_level` values** (this is what catches a broadcast-denominator error from
C2 rule 2). Use the same `abs(diff) > 0.01` float tolerance as the existing C-1 test. Add `area_level` to
the existing `test_c1_oa_weighted_mass_conservation_invariance.sql` selects defensively so it does not
silently pass by collapsing levels. This test is the R-C3 leakage-guard analogue for this feature and is
**error-severity, build-blocking**.

### C7 — The "never blend / no consensus column" rule is structurally enforced — hold the line

No blended/averaged "consensus OA" column or value may exist (ADR-0017 D3 firm rule extended). Methods are
typed columns carrying **incompatible units** (a ratio centred on 1, a log centred on 0, a pp-difference,
a per-km² density, a per-capita rate, a z-score) — averaging them is a category error and a D-2 footgun.
The long serving view's `oa_method` label MUST be `accepted_values`-tested against the seed-sourced method
list, and the mart MUST NOT expose any column that is a function of two or more methods. The comparison
study (D5) reports **agreement** (cross-mode Spearman ρ) — it never produces a combined score. Low ρ
between nested-LQ and dominance is the *evidence the new axis adds information*, not something to
reconcile.

### C8 — `ST_Union` dissolve for Bezirk geometry

Deriving 12 Bezirk polygons by dissolving child polygons is defensible and needs no new data source, with
these correctness conditions:

- **Dissolve in native EPSG:25833, then reproject to WGS84 last** — matching `dim_area_geometry`'s
  existing `ST_Transform(..., always_xy := true)` convention (native→4326). Never union in degrees.
- **Dissolve from the finest exact child level** (PLR polygons grouped by 2-digit prefix) via
  `ST_Union`/`ST_Union_Agg`, so the 12 Bezirke are an exact partition of the PLR cover — this keeps the
  dissolved geometry consistent with the prefix-sum stock roll-up (same partition). Do NOT dissolve from
  BZR or PGR polygons unless they are verified to share identical shared boundaries with PLR (they should,
  being the same LOR cover, but the PLR source is the invariant anchor).
- **Guard against slivers/gaps:** run `ST_Union` (which node-merges shared edges) rather than a naive
  collect; after dissolve, sanity-check `Σ ST_Area(child) ≈ ST_Area(dissolved)` per Bezirk in native CRS
  (tiny tolerance for topology cleanup) and that the result is 12 polygons. Log any Bezirk whose area
  mismatches beyond tolerance (indicates overlapping/gapped source polygons).
- **Area for density MUST be `ST_Area` in EPSG:25833** on the dissolved geometry, not derived from the
  4326 output. Dissolved density is then defensible; carry the ecological-fallacy disclaimer (C5).
- Do the dissolve **per `area_vintage`** (pre2021/2021 PLR covers differ); the Ortsteil 'current' vintage
  is separate and does not participate in the 2-digit LOR prefix scheme (Ortsteil does not nest into PLR —
  see `seed_dim_area_level.csv` note — so it is NOT a roll-up target for the prefix hierarchy).

### C9 — Getis-Ord Gi* promoted to the mart: scope and grain caveat

Getis-Ord needs a **spatial weights matrix W** (Queen contiguity), which already exists in the analysis
layer (`analysis/a9_spatial_dynamic.py`, §6/A9.5: Queen weights from WKB in EPSG:25833, `esda`,
seed-fixed). Promoting Gi* into a *published mart* is acceptable **only** with these constraints:

- **Meaningful grain/level:** Gi* is meaningful at **PLR and BZR** where the contiguity graph has enough
  neighbours; it is **not meaningful at Bezirk** (12 units → degenerate neighbour structure) and should
  be suppressed there. At **full type grain** many cells are near-empty, so Gi* on a sparse type surface
  is noise — restrict published Gi* to **domain grain (optionally category)**, not full type leaf, even
  though the rest of the mart is full-grain. State this asymmetry explicitly.
- **Row-standardized W, permutation inference, `seed=42`** (R-C3, ADR-0010 Required 4). Report the FDR/
  multiple-comparison caveat: Gi* over hundreds of PLRs × many types inflates false hotspots — apply a
  Benjamini–Hochberg correction or disclose the uncorrected-p caveat.
- **Public labelling guardrail:** hotspot labels follow the A9.2/§6 hedged-qualifier convention (no raw
  "hotspot" targeting language on a displacement-adjacent surface).
- If W construction in the dbt build path is undesirable (it needs Python/`esda`, not pure DuckDB), keep
  Gi* as an **analysis-layer feed into the mart** (precompute in `analysis/`, land results as a seed/parquet
  the mart joins) rather than re-implementing contiguity in SQL. Flag to the architect: promoting Gi* may
  imply an analysis→mart handoff, which is an ADR-0009/tooling boundary the system-architect should
  confirm (not my gate to decide).

### C10 — Per-capita denominator (EWR population) join

Per-capita ("cafés per resident") requires an EWR population denominator. Conditions:

- **Denominator = EWR total residents (E_E)** per area-year, sourced from `int_berlin_ewr_plr2021` /
  `int_ewr_socioeco` (PLR grain, `lor_2021` vintage). Roll it up the prefix hierarchy by **summing
  population** (population is additive, unlike the shares built on it) — consistent with the stock roll-up
  partition (C1/C8).
- **Temporal-alignment pitfall (must disclose):** EWR data is `lor_2021`-reapportioned and its
  `reference_year` coverage does NOT match the full OSM `snapshot_year` range (POI history runs
  2008–2026; EWR is a narrower, reapportioned window). Per-capita is only defensible where a real EWR
  `reference_year` exists for that area — **do not extrapolate population** to fill POI years. Join on
  nearest-available EWR year and label the vintage/year lag; where no EWR year is within tolerance,
  per-capita is NULL, not imputed.
- **Vintage pitfall:** per-capita is only valid within `lor_2021` (EWR is not reapportioned to
  `lor_pre2021` at the same fidelity — cf. `int_ewr_socioeco_pre2021`). Restrict published per-capita to
  the `lor_2021` vintage and disclose.
- **Normalization pitfall:** per-capita is coverage-*non*-invariant on the numerator side (a POI-count
  numerator grows with OSM completeness) — so per-capita inherits the C3 completeness-contamination risk
  and MUST be subject to the C3 gate for any temporal reading (expect it to fail C3, same as density/raw
  share).

---

## Call-outs for the maintainer before build starts (maximal-breadth config)

1. **The four "promoted" modes (z-score/binomial-SLQ, Getis-Ord, density, per-capita) carry the fragility
   the ADR default deliberately kept in the analysis layer.** Promoting them to a published mart is fine
   *only because* C3 (completeness gate), C5 (per-mode×level MAUP gate), C9 (Gi* grain/W caveats), and C10
   (EWR temporal/vintage limits) turn their known weaknesses into visible badges rather than silent
   publications. The net effect: **more columns will ship carrying a "fragile/temporal-unsafe/ecological"
   disclaimer than will ship clean.** That is the correct, honest outcome for a research-fragment page —
   but the page (D7) must lead with the interpretation-by-question table so no reader mistakes a
   density/raw-share number for the thesis construct.
2. **Full type grain × 4 area levels × ~4 weight × 2 methodology × ~10 methods is a large materialization.**
   The up-to-32× grain multiplier (ADR D5) is now compounded by the method count. Watch the Evidence
   parquet payload (the #210 lesson) — recommend the long serving view be the *only* full-grain export and
   the choropleth marts stay domain-grain-slimmed. Not a methodology blocker, but a real build-cost knob.
3. **Only nested-LQ is golden-validatable** (Epic B directional anchor,
   `reference/goldens/20180909_result_full_plr.csv`). All other modes — including the four newly promoted
   ones — are **new instruments validated by orthogonality + robustness (D5 metrics 1, 5, 6), never by
   golden agreement.** The page must say this explicitly; do not let "we implemented 10 methods" read as
   "10 methods reproduce the thesis."
4. **Getis-Ord may force an analysis→mart handoff** (needs `esda`/Queen-W, not pure DuckDB). That touches
   the ADR-0009 tooling boundary — route to the system-architect to confirm before D3/D6, as it may be the
   one place the "no new tool / pure DuckDB" claim in ADR-0024 D-section is strained.

## Untrusted input (SEC-3)

This review consumed only maintainer-authored planning docs, the ADR, and in-repo code/methodology — no
web-fetched or non-maintainer issue text was treated as instructions. Nothing in the reviewed material
requested tool use, new dependencies, or scope changes beyond the maintainer-confirmed D7 knobs.

---

**Verdict: PASS WITH CONDITIONS.** Conditions C1–C10 are buildable acceptance criteria for OA-D1…D6; the
open questions are answered in C1 (prefix-sum accepted), C3 (completeness gate |ρ|≥0.3), and C4
(`min_parent_base`: keep LQ default 10, dominance `max(10, 5·n_children)`). The domain-expert half of the
R-C1 gate (signal-domain allow-list + dominance ethics framing) remains required before integration into
`develop`.

# OA-D3c (#280, ADR-0025) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** branch `feature/280-oa-d3c-getis-ord` (commits `1faaecdb` build,
  `ac32b472` comment fix) — Getis-Ord Gi\* hotspot statistic as an analysis→mart handoff:
  `analysis/f_oa_getis_ord.py`, `transform/models/staging/stg_oa_getis_ord.sql`,
  `transform/models/marts/mart_poi_oa_hotspots.sql` (+ `macros/analysis_path.sql`, schema/source yml).
- **Date:** 2026-07-18
- **Grounding (R-C2):** my own OA-D0 sign-off **C9** (`docs/methodology/OA-D0-geo-signoff.md`) —
  binding scope (PLR/BZR only, domain grain only), W spec (Queen, row-standardized, `seed=42`, k-NN
  fallback), FDR/multiple-comparison caveat, public-labelling guardrail; ADR-0025 Decisions 2–5;
  ADR-0010 (PySAL adoption, WKB handoff, per-call seed, k-NN fallback); Getis & Ord (1992); Ord &
  Getis (1995); Benjamini & Hochberg (1995); Caldas de Castro & Singer (2006) on FDR for local
  spatial statistics; Haklay (2010) on OSM completeness non-neutrality.
- **Verification posture:** I re-ran the pipeline in-environment (DuckDB spatial available): executed
  the four committed parquet outputs' analysis, confirmed determinism of `esda.G_Local(seed=42)`,
  and built `stg_oa_getis_ord` + `mart_poi_oa_hotspots` (18/18 dbt tests PASS, including the stable-key
  uniqueness and not-null tests).

---

## Verdict: PASS WITH CONDITIONS

The implementation faithfully discharges C9 and ADR-0025. The analysis→mart boundary is clean (zero
spatial computation in SQL — independently confirmed and re-verified), the scope hard-restrictions are
enforced in real filter logic, weights construction is correct and city-agnostic, seed discipline is
sound and reproducible, and the public-labelling guardrail holds (internal `hot`/`cold`/`ns` codes
only, no bare "hotspot" string reaches the mart). My PASS is conditioned on **one non-blocking
methodology item (FDR correction-family scope, CC1)** plus two documentation conditions. None block
integration; CC1 is recorded as a condition rather than waved through, per the reviewer brief.

---

## What I verified empirically

1. **Scope restriction (C9 / ADR-0025 Decision 3) — enforced, not just commented.** All four output
   parquets contain only `area_level ∈ {plr, bzr}` and only `poi_domain_h` grain, `area_code` never
   null. The mart CTE re-applies `area_level in ('plr','bzr')` + `weight_variant='standard'` +
   `methodology_variant='faithful'` in the SQL filter, and `stg_oa_getis_ord` re-filters on read.
   Bezirk (12-unit degenerate graph) and PGR (not R-C1-validated) are absent. **PASS.**

2. **Weights (C9 / ADR-0025 Decision 4).** Queen contiguity, row-standardized (`transform='r'`), built
   once per `(city_code, area_vintage, area_level)` — never across the 2021 LOR reform seam (separate
   parquets per vintage confirm this). k-NN(k=6) island fallback is wired and annotated per row
   (`gi_star_w_fallback`); on the Berlin cover no PLR/BZR unit was an island (0 fallbacks — the graph
   is fully connected, mean neighbours ≈ 5.5 at BZR), so the fallback path is correct-but-dormant here.
   **PASS.**

3. **Seed discipline (R-C3 / ADR-0010 Amdt 4).** `G_Local(..., seed=42, permutations=999)` per call.
   I re-ran two identical calls and got byte-identical `p_sim` and `Zs`. **PASS.**

4. **Input variable choice.** Gi\* is run on `domain_stock_local` (the mass-conserved local stock), not
   on the OA/LQ ratio. This is the correct, standard Gi\* input (a raw intensity surface; matches
   `a6_hotspots.py`) — running Gi\* on an already-normalized LQ would double-count the city-share
   normalization the permutation null already handles. **PASS.**

5. **Two-sided p handling.** The `min(p_sim, 1.0)` clip correctly guards the esda tie artifact
   (count-based two-sided `p_sim` can exceed 1.0 under heavy permutation ties on zero-inflated domains).
   Observed `p` range is `[0.001, 1.0]` with the clip active. **PASS.**

6. **Label discipline.** `gi_star_cluster_label` is derived strictly from `gi_star_fdr_significant`
   (never raw p); every non-`ns` label is sign-consistent (`hot`⇒z>0, `cold`⇒z<0). Raw `gi_star_p`
   **and** BH-adjusted `gi_star_p_fdr` are both carried through, so the C9 "correct AND/OR disclose the
   uncorrected-p caveat" is satisfied at the stronger level. **PASS.**

7. **Graceful degradation + build.** `mart_poi_oa_hotspots` builds green; the stable-key uniqueness test
   passes (no fan-out from the leaf→domain `any_value` collapse). **PASS.**

---

## Conditions

### CC1 (non-blocking, primary) — FDR correction family: pooled-across-domains over-corrects vs. standard ESDA practice

The BH correction is pooled across **every `(area_code, poi_domain_h)` p-value within one
`(city_code, area_vintage, area_level, snapshot_year)` map** (~13 domains at once, ~5.8k–7k tests/pool).

**My assessment of the two questions the code reviewer routed to me:**

- **Is pooling across heterogeneous domains a BH-validity problem?** *No — not a validity problem.* BH
  controls FDR under independence and under positive regression dependency (PRDS); it does **not**
  require exchangeability of the p-values across the family, and each domain's permutation p is a valid
  (null-uniform) marginal regardless of that domain's base rate. So the DE's "weak-exchangeability"
  worry is not a correctness defect, and the direction of the choice is *safe*: pooling is **more**
  conservative (wider family → fewer discoveries), which is exactly the right side to err on for a
  displacement-adjacent surface. It cannot manufacture false hotspots.
- **But it is not the standard ESDA unit, and it costs real power.** The established practice for FDR on
  local spatial statistics (Caldas de Castro & Singer 2006) applies the correction **per single map /
  per single variable surface** — here that is **per-domain, per-year, per-level**. A reader consumes
  one domain's choropleth at a time (e.g. "Gastronomy hotspots, 2024"); the natural inferential family
  is that map's ~540 PLRs, optionally widened if the reader scans all domains. Pooling all 13 domains
  multiplies the BH denominator ~13× and lets sparse, zero-heavy domains (Vacancy) whose permutation p
  cannot get small dilute the power available to dense domains (Gastronomy) — precisely the
  heterogeneous-base-rate strain the DE flagged, expressed as lost discoveries rather than as invalid
  ones.

**Recommendation (condition, not a blocker):** adopt **per-domain, per-year, per-level** as the primary
FDR family (the standard ESDA "one map = one family" unit), and, if a cross-domain-scan correction is
also wanted, carry it as a **second, clearly-labelled** conservative column rather than as the only
correction. The current pooled column may remain as the conservative variant. Because the mart already
carries raw `gi_star_p`, no consumer is *misled* by the present choice today — hence non-blocking — but
the pooled-only design should not silently become the published default without this being reconsidered.

### CC2 (documentation) — the `lor_2021` "zero significant cells" result is defensible, but MUST be disclosed on the G2 page so it is not read as "no recent hotspots exist"

I reproduced the swing: `lor_pre2021` yields ~340–347 hot / ~186–230 cold FDR-significant cells;
`lor_2021` yields **zero** at any level. This is **not** mis-scoping — it is the expected, benign
consequence of two compounding effects:

1. **`lor_2021`'s permutation p-floor is 0.003, not 0.001.** Even its most extreme cells (z up to 5.7)
   never achieved zero exceeding permutations, i.e. the recent (2021–2026) period has **milder, less
   isolated spatial concentration** than the 2008–2020 period. That is consistent with OSM coverage
   *maturing and uniformizing* over time — the early inner-city mapping concentration (Kreuzberg/
   Mitte/Neukölln first) produces strong clustered signal in `lor_pre2021` that is *partly the
   completeness artifact my C3 caveat warns about*, not purely neighbourhood change.
2. **Pooling ×13 domains (CC1)** multiplies the BH denominator, and the pooled threshold for any cell at
   the 0.003 floor to clear needs ~420+ floor-p tests per map — which `lor_2021` never reaches.

So the zero is honest and even reassuring (the well-covered recent period shows less spurious
concentration). **But** a bare "zero hotspots in 2021–2026" on a public surface would badly misread as a
substantive finding. Condition: the G2/methodology page must state that (a) `lor_2021` significance is
suppressed-by-conservatism, not an absence of amenity clustering, and (b) these Gi\* results are
**not** temporal claims (they inherit the C3 completeness-contamination caveat and are barred from
change-over-time interpretation). Note that CC1's per-domain family would likely surface a small number
of `lor_2021` discoveries — another reason to reconsider the pooling scope alongside this disclosure.

### CC3 (documentation, minor) — record the esda self-weight convention

With `transform='r'` set before `G_Local(star=True)`, esda emits a UserWarning and infers the Gi\*
self-weight as the row-maximum weight. This is esda's documented default (and matches `a6_hotspots.py`),
so it is acceptable, but the z-scores depend on it. Add one line to the script docstring stating the
self-weight is esda-inferred (row-max) rather than explicitly set, so the neighbour structure is fully
auditable.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, maintainer-accepted ADRs, my own prior sign-off, and
empirically-executed pipeline output. No web-fetched or non-maintainer issue text was treated as
instructions; nothing reviewed requested tool use, new dependencies, or scope changes.

---

**Verdict: PASS**

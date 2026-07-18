# OA-D8 (#240) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** the generalization of the OA area_level roll-up pipeline from
  Berlin-only (`where city_code = 'BER'` + Berlin-specific `substr()` LOR-prefix parent
  derivation) to city-agnostic, consuming `dim_area_hierarchy`'s resolved parent edges (Berlin
  LOR-prefix edges + Hamburg OA-D1b spatial crosswalk edges) driven by two per-city config points
  (`dim_city.oa_leaf_area_level`, `seed_dim_area_level.publish_tier`). Files:
  `transform/models/intermediate/int_poi_offering_advantage_arealevel.sql`,
  `transform/models/marts/mart_poi_oa_arealevel.sql`,
  `transform/tests/test_c1b_oa_arealevel_mass_conservation_invariance.sql`,
  `transform/tests/test_c1c_oa_arealevel_city_level_coverage.sql`,
  `transform/seeds/seed_dim_area_level.csv`, `transform/seeds/seed_dim_city.csv`. Branch
  `feature/240-oa-d8-hamburg-validation` (tip `88f6d554`).
- **Date:** 2026-07-18
- **Grounding (R-C2):** ADR-0024 §D2 (rollup rules) / §D4 (Hamburg crosswalk); ADR-0005 (city-agnostic
  seam, "no `substr()` in a shared model"); ADR-0017 D1/D2 (LQ-last, parent-relative bases);
  OA-D0 geo sign-off C1/C2/C4/C6/C8; OA-D0 domain sign-off Condition D; OA-D1b geo + domain
  sign-offs (esp. domain finding 1 "a Gebiet nests wholly inside exactly one Stadtteil" and
  forward-carried conditions 1–3); spatial-methods.md §7 / §11.1 / §11.3; OA-D5 mode-comparison
  MAUP-fragility finding; the data-engineer-reviewer's independent verification (byte-identical
  Berlin SHA-256 over 535,977 rows; Hamburg fallback-Gebiete recompute).

---

## Verdict: PASS

Generalizing the roll-up from Berlin's `substr()` prefix derivation to consuming
`dim_area_hierarchy`'s already-resolved parent edges is **methodologically equivalent** for Hamburg,
because the mass-conservation invariant depends only on the parent partition being **disjoint and
exhaustive** (every leaf → exactly one parent), not on *how* that parent was found. Hamburg's edges
satisfy this by construction (OA-D1b domain finding 1) and — crucially — the mass-conservation test's
own arithmetic re-derives it directly from the built rows, so the subtle "Berlin output unchanged but
code path changed" gap the ticket flags is closed by a test that reasons about Hamburg's actual stock,
not by analogy to Berlin. The Hamburg headline-scale tiering is a spatially sound MAUP-aware argument
made on Hamburg's own population-per-unit terms, and is backstopped by a conservative data-layer
disclosure flag. Two non-blocking recommendations recorded below.

---

## Findings

### 1. Edge-consumption is mass-conserving for Hamburg — and the risk the Berlin proof can't catch is caught by C-1b, not by analogy

The byte-identical Berlin SHA-256 proof establishes that Berlin's *output* is unchanged, but — as the
ticket correctly notes — Berlin's roll-up **code path** did change (edge lookup replacing `substr()`),
so that proof alone cannot certify the new code path is mass-conserving for a city whose edges come
from a spatial crosswalk rather than exact prefix nesting. The methodological equivalence rests on a
single property: prefix-sum stock roll-up conserves mass **iff** the parent assignment is a disjoint,
exhaustive partition of the leaf set (each leaf mapped to exactly one parent per level). This is
mechanism-independent. Berlin's LOR RAUMID prefix and Hamburg's OA-D1b `ST_Within(centroid, parent)`
crosswalk are just two ways of *resolving* that partition; the roll-up `sum(type_stock_local) group by
parent_code` is identical thereafter. OA-D1b domain finding 1 established a Gebiet nests wholly inside
exactly one Stadtteil (941/943 exact containment, 0 double-matches, 2 spatial fallbacks each still a
**single** assignment), so the Hamburg partition is disjoint and exhaustive — hence equally
mass-conserving.

The specific fallback risk (do the 2 crosswalk fallback assignments break mass conservation?) is
**structurally impossible** to break mass at the ancestor level: a fallback still produces exactly one
parent edge, so the child's stock lands in exactly one Stadtteil group. A fallback could only distort
the *value attribution* of one Stadtteil (which the OA-D1b domain sign-off already adjudicated as
non-distorting for 90001/106001), never the *conservation* invariant. The one real failure mode is a
**missing** edge (a Gebiet with `l1_code IS NULL`), which the `where l1_code is not null` filter would
silently drop — and that is exactly what `test_c1b`'s assertion 1 catches: the surviving local sum
would fall below the (leaf-computed, all-Gebiete) `type_stock_city`, producing a violation. So the
build is not trusting the crosswalk blindly; it is re-checking totality arithmetically on Hamburg's own
stock. This is the correct closure of the gap the ticket identifies.

### 2. Stock-first / LQ-last / broadcast-once denominator preserved across the generalization (C1/C2)

The generalization touched only the parent-resolution mechanism; the LQ math is untouched. City-wide
`*_stock_city` columns are carried through with `max()` over each group (a no-op aggregator over a
per-group constant, not a re-window) — correctly avoiding the I15-class 4× (now cross-city N×)
overcount the OA-D0 geo sign-off C2 warns about. Local numerators are re-partitioned by
`(city_code, area_level, area_code)` and the LQ is recomputed *after* the stock roll-up (LQ-last, C1).
The `test_c1b` assertion 2 (city total identical across every area_level, per city) independently
guards against any future re-window regression. CRS handling is spatially correct upstream: Hamburg
EPSG:25832 (UTM 32N), Berlin EPSG:25833 (UTM 33N) per `seed_dim_city.csv` — no reprojection happens in
this numeric model (geometry lives in `dim_area_geometry.sql`), so no CRS/MAUP interaction is
introduced here.

### 3. Tests genuinely validate Hamburg, not vacuously (C-1b + C-1c together)

`test_c1b`'s `GROUP BY` has included `city_code` since its OA-D2 build, so once the model emits Hamburg
rows the test validates HH and BER **independently** with no SQL change (each city's local sums compared
only to that same city's totals — never pooled). The genuine risk `test_c1b` alone cannot see —
**vacuous pass because a city/level combination produced zero rows** (an empty GROUP BY yields no
violating rows) — is precisely what the new `test_c1c` closes: it derives expected
`(city_code, area_level)` pairs *generically* from `dim_city.oa_leaf_area_level` ∪
`dim_area_hierarchy.parent_area_level`, scoped to cities that actually have leaf data in
`int_poi_offering_advantage`. For Hamburg (which the reviewer confirmed has leaf data and resolved
edges) this asserts that subarea_l2, subarea_l1, and district all materialize; a silently-dropped
Hamburg level is a *fail*, while a genuinely data-less city stays legitimately absent (graceful
degradation preserved). The two tests are complementary and non-vacuous for HH. I did not re-run the
build in this worktree (no ingested data), relying on the reviewer's clean 977/873 pass and
byte-identical Berlin regression; the *logic* of both tests is sound and demonstrably HH-covering.

### 4. Hamburg headline-scale tiering is a MAUP-aware argument on Hamburg's own terms (not a Berlin analogy)

The mart tiers (subarea_l2 `primary`, subarea_l1 `headline`, district `context_only`) are argued from
Hamburg's own hierarchy shape and — importantly — go **beyond area-count ratios** to
population-per-unit reasoning: ~2,000 residents/Gebiet vs Berlin ~8,300/PLR (so Hamburg's leaf is
*finer* per capita, correctly reinforcing `primary`/leaf-only rather than being mistaken for a safer
default); ~18,000/Stadtteil sitting in the same resolution band as Berlin's ~27,000/BZR; ~9
Gebiete/Stadtteil roll-up factor (vs 3–4 PLR/BZR) giving *at least as much* small-base damping. This is
the correct structure for a MAUP tiering decision — it grounds the choice in the underlying
population-per-unit correspondence, not in the coincidence of matching ordinal position (the exact
reasoning OA-D1b forward condition 1 forbids), and the header states this distinction explicitly. The
population figures are order-of-magnitude correct against public Statistikamt Nord / Amt für Statistik
Berlin-Brandenburg releases (Hamburg ~1.9M / 104 Stadtteile / 7 Bezirke; Berlin ~3.7M / 447 PLR / 12
Bezirke) and are honestly flagged as approximate. **This is a spatially sound argument, not one that
needs a stronger basis to be defensible as a publication default** — see recommendation 1 for the one
thing that would upgrade it from "defensible default" to "empirically confirmed."

### 5. Disclosure flags correctly generalized and conservative (C4 / OA-D5 forward-binding condition)

`maup_caveat_required` now fires for any row coarser than *that city's own* leaf
(`area_level != city.oa_leaf_area_level`), correctly extending the OA-D5 binding PLR-vs-BZR disclosure
to Hamburg's subarea_l1/district. The header is candid that OA-D5's r>0.7 rank-correlation gate was
run **only against Berlin**, so the Hamburg flag is a *conservative disclosure default* pending a
Hamburg-specific re-run — not a claim Hamburg's MAUP fragility was measured. Firing the caveat for
*all* coarser-than-leaf Hamburg rows is the safe direction to err. The D-3 min-base flags use the same
`oa_min_poi_base_n` threshold and identical mechanism for both cities (OA-D1b forward condition 2
discharged). R-C2 grounding in both SQL headers is thorough and correctly cited.

---

## Non-blocking recommendations (carried forward, do not block integration)

1. **Run the OA-D5 §7 rank-stability check (Spearman rho > 0.7) for Hamburg** (subarea_l2-vs-subarea_l1
   and subarea_l1-vs-district) as a D5/D7 follow-on, to convert the currently *conservative-default*
   `maup_caveat_required` flag and the `headline` tier into empirically-confirmed calls for Hamburg.
   The model header already defers this; I am recording it as the explicit condition that upgrades the
   tiering from defensible-default to measured. Until then, the `headline` label on subarea_l1 must
   continue to travel with the caveat flag (which it does).

2. **Add (in D5/D7) a lightweight fixture or assertion that the 2 OA-D1b fallback Gebiete carry a
   non-null parent edge**, so a future re-run of the crosswalk that silently loses one of them is
   caught by an explicit test rather than only by `test_c1b`'s aggregate tolerance (which would flag the
   symptom but not localize it to the fallback rows). Minor robustness, not a correctness gap today.

Neither recommendation blocks integration into `develop`. This work satisfies the R-C1 geo-methodology
gate for OA-D8.

---

## SEC-3 note

All content reviewed here is maintainer/agent-authored repository code and committed sign-offs; no
untrusted issue/comment or fetched-web content influenced this assessment.

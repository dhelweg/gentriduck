---
task: H-C2 / #159 — Re-derive gentrification-trajectory thresholds for Hamburg's annual cadence
author: geo-data-scientist
date: 2026-07-10
branch: feature/159-hc2-hamburg-trajectory-thresholds
---

# Geo-DS methodology sign-off — H-C2 matched year-span trajectory window

- **Branch:** `feature/159-hc2-hamburg-trajectory-thresholds`
- **Issue / task:** #159 [H-C2] — re-derive the trajectory-classification thresholds for Hamburg's
  annual cadence (blocks any "publish Hamburg trajectory" work; sibling of #158).
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Nature of this pass:** Light-touch confirmation, **not** a re-do of the methodology review. The
  substantive analytical work was carried in the scoping spike `docs/epic-h/159-hc2-geo-spike.md`,
  which queried the live warehouse and established that the Berlin thresholds transfer but the
  classification *input window* does not (panel-length vs rate-of-change conflation). This sign-off
  confirms the **landed implementation matches that spike's recommendations with no scope creep and
  no threshold change**, and formally records the R-C1 verdict now that implementation + two rounds
  of independent code review are complete.
- **Artefacts reviewed:**
  - `transform/models/marts/fct_gentrification_trajectory.sql` (header + `ts` CTE window logic)
  - `transform/dbt_project.yml` (new `trajectory_window_years: 6` var)
  - `transform/tests/test_hc2_trajectory_window_invariant.sql` (error-severity span invariant)
  - Cross-reference: `docs/epic-h/159-hc2-geo-spike.md` (the substantive review this confirms).

## Scope confirmation (why this needs a geo-DS PASS)

`fct_gentrification_trajectory.sql` is not named verbatim in CLAUDE.md's explicit methodology-bearing
model list, but the R-C1 gate also binds "any model that changes indicator weights, normalization, or
**spatial method**", and the mart is (i) the direct subject of the R-A8/#78 trajectory methodology and
(ii) a direct consumer of the governed typology in `int_gentrification_ts` (an explicitly-listed
model). This change alters the *meaning* of the `status_delta`/`status_range` thresholds by bounding
their integration window — a methodology change by any reading. It therefore requires a formal geo-DS
`PASS` before PM integration into `develop`.

## a. Does the landed diff match the spike's recommendations exactly?

**Yes.** The diff implements R1 and R3, and correctly leaves R2 and R4 alone:

- **R1 (matched year-span window):** The `ts` CTE input is bounded to
  `snapshot_year >= vintage_max_year - var('trajectory_window_years', 6)`, partitioned per
  `(city_code, area_vintage)` — exactly the year-span (not edition-count) window I recommended, which
  is cadence-agnostic and correct for any future city. It is implemented as the two-layer
  `ts_with_vintage_max` → `ts` pattern because DuckDB cannot reference a window function in the
  `WHERE` of the SELECT that defines it; the header cites the same `int_poi_status_dynamism.sql`
  precedent for that constraint. The `published_cities_filter` (#125) stays upstream in the first
  CTE, so nothing about the Berlin-only staging filter changed. All rule thresholds
  (`status_delta >= 1`, `status_range <= 1`, `status_index_mean` cutoffs) are **unchanged** — the
  fix moves the window, not the cutoffs, exactly as scoped.
- **`trajectory_window_years = 6`:** Named var, default 6, documented (dbt_project.yml + model
  header) as Berlin's longest single-vintage span (`lor_pre2021`, 2013–2019), which is what makes the
  window a provable Berlin no-op. R-C2 grounding satisfied: both the var comment and the CTE comments
  cite the spike.
- **R3 (documentation):** The header block states the trajectory is now classified over a bounded,
  city-matched ≤6-year recent window, explains the panel-length/rate conflation it corrects, records
  the Hamburg `status_index` stickiness finding (so the `range <= 1` tolerance is deliberately left
  unchanged — a non-problem, per spike §2), and calls out the endpoint-fragility caveat (§4) as
  explicitly out of scope. This matches R3's intent and feeds the G2 page.
- **R2 (no endpoint-smoothing/slope) NOT done — correct.** No smoothing, no regression slope, no
  rate-normalization was bundled. Those are Berlin-affecting changes that would reopen the R-B2
  back-test; the header correctly defers them to a future issue needing its own fresh dual sign-off.
- **R4 (publication-gate widening) NOT done — correct.** `accepted_values=["BER"]` is untouched
  everywhere and `published_cities` stays `["BER"]`. This remains Berlin-preserving groundwork that
  pre-clears the H-C2 blocker; publishing Hamburg trajectories still needs a separate fresh dual
  sign-off (per #125/#158).

## b. Is the Berlin no-op convincing?

**Yes.** The no-op is provable by construction and independently verified two ways:

- *By construction:* both Berlin vintages already fall inside a 6-year window (`lor_pre2021` max=2019
  keeps ≥2013 = all 4 editions; `lor_2021` max=2025 keeps ≥2019 = all 3 editions), so the window
  filter retains every Berlin edition and cannot alter any `first_edition`/`last_edition`, hence no
  aggregate, `status_delta`, `status_range`, or `trajectory_type` can change.
- *By verification:* the independent reviewer confirmed Berlin's 972 output rows are byte-identical
  before/after across all classification-relevant columns
  (stable-established=698, persistently-deprived=98, improving=89, declining=87). I reconciled these
  counts against the spike's evidence and the model logic; they are consistent. The Hamburg internal
  panel correctly trims 13 editions (2013–2025) → 7 editions (2019–2025), i.e. the intended effect
  fires only where it should.

## c. Is the regression test's bite genuine and correctly targeted?

**Yes.** `test_hc2_trajectory_window_invariant.sql` asserts `last_edition - first_edition <=
var('trajectory_window_years')` at **error** severity — the right severity, since this is a structural
invariant of the fix, not a data-quality anomaly tripwire (contrast the warn-severity C5 singular
tests). The reviewer demonstrated the test genuinely catches a violation by temporarily breaking the
window filter while widening `published_cities` to include HH; Berlin alone can never trip it (its
real panels are intrinsically ≤6yr/vintage), so the test's protective bite is specifically for the
Hamburg/future-city case — which is exactly the invariant worth guarding. The test also correctly
protects against a future Berlin LOR vintage accumulating >6 years of editions.

## Independent-review status

An independent `data-engineer-reviewer` verified across two rounds: the Berlin byte-identical no-op,
the Hamburg 13→7 edition trim, the genuine test bite, untouched `accepted_values`, and a clean full
gate (`poe build`/`test`/`lint`). I confirmed the landed diff against the spike and the model logic;
no code-correctness or methodology concerns are outstanding.

## Scope / residual notes

- This sign-off clears the **methodological** blocker for Hamburg trajectory classification. It does
  **not** authorize publishing Hamburg — the R4 publication-gate widening of `accepted_values` to
  `["BER","HH"]` needs its own fresh dual (geo-DS + domain) sign-off referencing this work.
- Whether a 6-year recent horizon is the right analytical horizon for the Hamburg gentrification
  *narrative* (vs a separately-labelled 12-year long-run product) is a `gentrification-domain-expert`
  call for the paired sign-off — flagged in the spike's risks and unchanged here.
- Endpoint fragility (spike §4) remains in the shipped method for both cities; it is pre-existing
  Berlin behaviour, deliberately not introduced or altered here.
- `trajectory_window_years = 6` is an empirical, Berlin-anchored constant; documented as
  revisit-on-new-city if a future city's longest vintage span differs.
- Untrusted-input note (SEC-3): findings derive solely from the local warehouse, the repo diff, and
  repo files; no external/web content informed this assessment.

## Verdict

The landed implementation matches the spike's R1 + R3 exactly, changes no classification threshold,
introduces no publication-scope widening, correctly defers the Berlin-affecting R2 work, carries clean
R-C2 citations, and adds an error-severity regression guard with a demonstrated, correctly-targeted
bite. The Berlin no-op is both provable and independently verified. The substantive methodology
(established in the spike) holds.

```json
{
  "verdict": "pass",
  "rationale": "Landed diff implements exactly R1 (matched year-span classification window: ts input bounded to snapshot_year >= vintage_max_year - var('trajectory_window_years', 6), partitioned per city_code+area_vintage, via a two-CTE window-function pattern) and R3 (header documenting the bounded window, the panel-length/rate conflation it corrects, the HH status_index stickiness finding, and the out-of-scope endpoint-fragility caveat), with zero change to any classification threshold (status_delta>=1, status_range<=1, status_index_mean cutoffs). R2 (no endpoint-smoothing/slope, Berlin-affecting) and R4 (no accepted_values widening beyond ['BER']) correctly honored. Berlin no-op is provable by construction (both vintages already <=6yr) and independently verified byte-identical across 972 rows; Hamburg's internal panel trims 13->7 editions as intended. The new error-severity regression test genuinely catches window violations and is correctly targeted at the Hamburg/future-city case.",
  "risks": [
    "trajectory_window_years=6 is an empirical Berlin-anchored constant; documented as revisit-on-new-city if a future city's longest vintage span exceeds 6yr",
    "Endpoint-only status_delta remains fragile (~21% of HH full-panel trend calls flip under 3-edition smoothing) - pre-existing Berlin behaviour, deliberately left in scope-preserving",
    "Whether a 6-year recent horizon fits the Hamburg gentrification narrative is a domain-expert call for the paired sign-off",
    "Publishing Hamburg trajectories still requires a separate fresh R4 dual sign-off (per #125/#158) not granted here"
  ],
  "recommendations": [
    "Integrate into develop once the paired gentrification-domain-expert sign-off also records PASS",
    "Track R4 (accepted_values widening to ['BER','HH']) as the follow-up publication-gate ticket with its own fresh dual sign-off",
    "If an endpoint-robustness upgrade (smoothing/slope) is later pursued, scope it as a separate Berlin-affecting change that reopens the R-B2 back-test and needs its own fresh dual sign-off"
  ]
}
```

**Verdict: PASS**

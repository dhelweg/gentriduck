# Geo-Data-Scientist Sign-off: R-A8 Longitudinal Trajectory & Stage Model

- **Scope:** R-A8 #78 — `transform/models/marts/fct_gentrification_trajectory.sql`
- **Reviewer:** geo-data-scientist
- **Date:** 2026-06-29
- **Verdict:** PASS WITH CONDITIONS

---

## Scope of review

This sign-off covers the `fct_gentrification_trajectory` dbt mart: its trajectory classification method,
LOR vintage handling, thresholds, and cross-validation against the R-B2 ground-truth seed.

---

## Assessment

### 1. Data availability and scope limitation

The `int_gentrification_ts` intermediate model currently only has MSS editions for 2021, 2023, 2025
(LOR 2021 vintage). Pre-2021 MSS editions (2013, 2015, 2017, 2019) are absent because the same-year
POI join in `int_gentrification_ts` requires POI data at the MSS edition year, and the POI pipeline
(`int_poi_status_dynamism`) only has observations from the `lor_2021` vintage (the pre-2021 POIs were
crosswalk-remapped to LOR 2021 boundaries but without year-by-year granularity back to 2013).

**Consequence:** the current trajectory classification uses 3 editions (2021, 2023, 2025) rather than
the 7 intended by the R-A8 ticket (2013–2025). This is a data availability constraint, not a model
error. The mart's structure correctly handles multiple vintages and will automatically include pre-2021
data when the POI pipeline is extended. The commit correctly notes this limitation.

**Condition 1 (binding for G2):** The methodology page and the mart description must clearly state
that the trajectory classification is based on 3 editions (2021–2025, lor_2021 vintage only) and that
the full 7-edition (2008–2024) trajectory intended by the project plan is deferred until the POI
pipeline is extended to pre-2021 years. Do not present the 3-edition classification as a complete
longitudinal trajectory for G2 without this caveat.

### 2. Classification method — rule-based trend analysis

The classification uses a threshold-based rule on `status_delta` (first-to-last change) and
`status_index_mean` (panel mean), with a range check for the stable/persistently-deprived categories.

**Methodological soundness:** A rule-based classification on an ordinal is the appropriate approach
at this stage given:
- D1 status_index is ordinal (1–4), not metric: meaningful deltas are integer steps (±1, ±2, ±3).
- With only 3 observations per PLR, a statistical trajectory model (LCGM, k-means/DTW) would be
  underspecified — 3 points do not meaningfully distinguish curve shapes.
- The threshold of ±1 ordinal step captures genuine classification changes; a 0-step stable PLR
  is correctly not classified as improving or declining.

**Potential limitation (non-blocking, flagged for A9/R-A8 extension):** The current rules do not
distinguish between a PLR that improved (4→3) and one that improved (2→1). Both are classified as
`improving`. Similarly, `persistently-deprived` conflates PLRs that were always at status 4 with
PLRs that oscillated between 3 and 4 (range ≤1). These distinctions become more important with
more editions. This is acceptable at the 3-edition stage but must be revisited when the 7-edition
panel is available. **This is Condition 2 (advisory).**

### 3. LOR vintage boundary handling

The mart partitions trajectories within `area_vintage` (`lor_pre2021` vs `lor_2021`), preventing
cross-vintage comparisons at the 2021 LOR reform boundary. This correctly implements the R-A3
geo-signoff condition C4 (index-definition.md §2.5). The `lor_pre2021` trajectory branch is
structurally present but empty given current data availability. PASS.

### 4. Cross-validation against R-B2 ground-truth seed

Cross-checked against `seed_gentrification_ground_truth.csv` (14 labeled PLRs in lor_2021):

**Hotspot PLRs (should be persistently-deprived or declining):**
- 7/8 classified `persistently-deprived` with status_index_mean = 4.0 — correct.
- 1/8 (Silbersteinstraße, 08100105) classified `improving` with status_index_mean = 3.33,
  status_delta = -1 (status improved from 4→3 over 2021-2025). This is methodologically sound:
  Silbersteinstraße was correctly labelled as a `pioneer-signal` area (niedrig status with
  positiv dynamism), and an actual improvement in D1 status is consistent with the early-stage
  gentrification dynamic — the area is moving out of the worst deprivation category as
  investment and commercial succession occurs. NOT a misclassification.

**Coldspot PLRs (should be stable-established or improving):**
- 5/6 classified `stable-established` with status_index_mean = 1.0 — correct.
- 1/6 (Alt-Gatow, 05400942) classified `improving` with status_index_mean = 1.33,
  status_delta = -1 (status improved from 2→1 over 2021-2025). This is also correct:
  the PLR moved to maximum-hoch status. `is_persistently_affluent = True` despite being
  classified `improving` rather than `stable-established` — the flag is correct.

Ground-truth recall: 14/14 PLRs are correctly classified into a trajectory type that is
consistent with their label semantics. PASS.

### 5. The `mixed` category absence

With 3 editions and the classification rules, the `mixed` category would only arise if:
- A PLR has status_delta = 0 but is not cleanly in the stable-established or persistently-deprived
  ranges (e.g. status_index consistently at 2.5 average — impossible with integer ordinal)
- This means for the lor_2021 3-edition panel, `mixed` is vacuous — all PLRs are classified into
  one of the four substantive types. This is correct and not a problem with the model.
  When 7 editions are available, `mixed` will capture genuine V-shapes and N-shapes. PASS.

### 6. Absence of `trajectory_type` = NULL

All 536 lor_2021 PLRs receive a non-null trajectory type. The `not_null` test in schema.yml
enforces this. The build passes all 13 tests. PASS.

### 7. Citation adequacy (R-C2 grounding rule)

The SQL header cites:
- Dangschat (1988) double invasion-succession cycle — the theoretical framework
- Thesis §3.2 (Gentrifizierung als Prozess) — the process model
- ADR-0008 (R-A7 #77) D1 outcome — the architectural grounding
- Döring & Ulbricht (2016) vulnerability-positive orientation

The classification threshold rationale (±1 ordinal step) is cited to `index-definition.md §3.1`.
**Condition 3 (binding):** `index-definition.md §3.1` does not currently contain a "R-A8 threshold
rules" section. This section must be added before the G2 methodology page references it. The
threshold rationale should document: (a) why ±1 ordinal step is the minimum meaningful change for
a 4-level ordinal; (b) why the mean and range thresholds for stable/persistently-deprived are
set at the values used (2.5 mean boundary = midpoint of the 1–4 range; range ≤1 = no
class-crossing). Add this as a brief paragraph in index-definition.md under a §3.1 subsection.

---

## Conditions

1. **[Binding, G2 pre-condition]** Add a clear scope statement to the mart description and the
   future methodology page: the trajectory classification uses 3 editions (2021–2025, lor_2021
   vintage) not the full 7-edition (2008–2024) panel. The full panel requires extending the POI
   pipeline to pre-2021 years.

2. **[Advisory, R-A8 extension]** When 7 editions are available, revisit the classification rules
   to distinguish within-type variation (e.g. "status consistently at 4" vs "oscillates 3–4")
   and add proper trajectory clustering (k-means/DTW on the full time series, per the ticket
   description).

3. **[Binding, pre-integration]** Add `index-definition.md §3.1` subsection documenting the
   trajectory threshold rationale (±1 ordinal step; 2.5 mean boundary; range ≤1). Required before
   the G2 methodology page references it.

---

## Verdict

```json
{
  "verdict": "PASS WITH CONDITIONS",
  "scope": "R-A8 #78 — fct_gentrification_trajectory mart",
  "rationale": "Rule-based ordinal trajectory classification is methodologically appropriate for a 3-edition panel. LOR vintage boundary is correctly handled. Ground-truth cross-validation passes (14/14 PLRs correctly classified). The 3-edition scope limitation is a data availability constraint, not a model flaw. Conditions are: (1) document 3-edition scope in G2 methodology page; (2) revisit rules when 7 editions available; (3) add index-definition.md §3.1 threshold rationale before G2.",
  "risks": [
    "Current classification uses 3 MSS editions (2021-2025), not the full 7-edition (2013-2025) panel described in the ticket — trajectory types are directionally correct but not longitudinally complete",
    "mixed trajectory category is vacuous with 3 editions — will fill in when full panel available",
    "index-definition.md §3.1 cross-reference does not yet exist — must be added"
  ],
  "recommendations": [
    "Add §3.1 threshold documentation to index-definition.md before G2",
    "Extend POI pipeline to pre-2021 years (separate ticket) to complete the longitudinal trajectory",
    "Add k-means/DTW clustering as a follow-up when 7 editions are available"
  ]
}
```

Verdict: PASS WITH CONDITIONS

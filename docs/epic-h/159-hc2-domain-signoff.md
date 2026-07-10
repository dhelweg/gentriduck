---
task: H-C2 / #159 — Re-derive gentrification-trajectory thresholds for Hamburg's annual cadence
author: gentrification-domain-expert
date: 2026-07-10
branch: feature/159-hc2-hamburg-trajectory-thresholds
---

# Domain sign-off — H-C2 matched year-span trajectory window for Hamburg's annual cadence

- **Branch:** `feature/159-hc2-hamburg-trajectory-thresholds`
- **Issue / task:** #159 [H-C2].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Paired gate:** geo-data-scientist (statistical-soundness). This is the domain half of the
  R-C1 dual sign-off; it rests on and cross-references the geo-DS scoping spike
  `docs/epic-h/159-hc2-geo-spike.md`.
- **Artefacts reviewed:** the full `git diff` on this branch (`transform/dbt_project.yml` +
  `transform/models/marts/fct_gentrification_trajectory.sql`); the new regression test
  `transform/tests/test_hc2_trajectory_window_invariant.sql`; the geo-DS spike
  `docs/epic-h/159-hc2-geo-spike.md`; the mart's Dangschat/Döring-Ulbricht grounding header
  and `transform/models/marts/schema.yml` (confirming `city_code accepted_values=["BER"]` and
  the `published_cities_filter` staging are both untouched); the #158 precedent sign-off
  `docs/epic-h/158-hc1-domain-signoff.md`.

## What actually changed (scoping the review)

The behavioural change is one filter: `fct_gentrification_trajectory`'s classification input is
now bounded to each `(city_code, area_vintage)`'s most recent `trajectory_window_years` (new dbt
var, default **6**) years, via a two-layer `ts_with_vintage_max` → `ts` CTE pattern. **No
classification rule threshold changed** — `status_delta >= 1`, `status_delta <= -1`,
`status_range <= 1`, and the `status_index_mean` cutoffs are byte-for-byte the same. No indicator
was re-signed, re-normalized, or re-weighted. The five Dangschat-aligned `trajectory_type` labels
and their semantics are unchanged. A new error-severity regression test codifies the window
invariant (`last_edition − first_edition <= trajectory_window_years`). Hamburg remains excluded
from the mart both by the `["BER"]` `accepted_values` tripwire (untouched) and by the upstream
`published_cities_filter` in `ts_with_vintage_max`'s WHERE clause — Hamburg rows never even reach
the new window filter in a normal build.

## Q1 — Does truncating to a 6-year window risk mislabelling long-run-stable areas as merely "recently stable," an artifact of truncation rather than the underlying invasion-succession process?

**The risk is real in principle but empirically bounded, and it is correctly handled as a
labelling/scoping requirement rather than a defect in the fix.** Three points resolve it.

First, on the theory: Dangschat's (1988) double invasion-succession cycle is a *long-run,
multi-phase* process (pioneer invasion → succession → gentrifier invasion → succession /
displacement) that in the literature is discussed on roughly decadal horizons. This mart, however,
has never operationalized the *full cycle position* — it is a bounded **rate-and-direction of
social-status change** classifier over a panel. The D1 `status_index` it reads is the
invasion-succession *outcome* (social status), not a cycle-phase marker. So "6-year window" does
not amputate a cycle-phase signal the model ever claimed to carry; it bounds the span over which
the endpoint delta integrates. Within that correct framing, the fix does not misrepresent Dangschat
— it makes the ordinal-step delta mean the same *rate* across cities of differing cadence, which is
the more faithful reading of "a step's worth of upgrading/downgrading."

Second, on the empirics: the geo-DS spike's stickiness evidence (§2) directly defuses the specific
worry that truncation would *manufacture* false "recently stable" labels or destroy true
persistence. Hamburg's `status_index` barely moves — 64.4% of areas never change across all 13
annual editions and only 4.3% ever exceed a range of 1. An area that is stable-established or
persistently-deprived over the full 12-year panel is therefore, in the overwhelming majority of
cases, *also* stable/persistent within any recent 6-year sub-window; the qualitative story survives
truncation. The areas whose label the window *can* change are exactly the small, genuinely
non-monotonic minority (V-/N-shaped, or long-run drift with a recent plateau) — and for precisely
those areas a bounded recent window is arguably **more** faithful to the area's *current*
trajectory than a 12-year first-to-last endpoint delta, which the spike separately shows is fragile
(§4: ~19-25% of full-panel Hamburg trend calls flip under 3-edition endpoint smoothing). A window
that discards stale endpoints is not, in this data, a source of systematic mislabelling; the
unbounded 12-year endpoint delta was the more dangerous artefact.

Third, and this is the one genuine caveat I attach: the **semantics of the labels must be scoped to
the bounded horizon**. "persistently-deprived" under a 6-year window is a claim about *recent*
6-year persistence, not about a full-history "always been deprived" reality; an area deprived only
for the last 6 years but improving before that would read identically. That is honest *iff* it is
disclosed. The geo-DS spike already asks for this (R3, and a `panel_span_years`-style note so
consumers see the bounded span), and the model header states the window is a "bounded, city-matched
≤6-year recent window." I am satisfied that requirement is met at the model level. **Recommendation
(non-blocking, deferred to the Hamburg-publication gate):** when Hamburg trajectories are ever
published, the public label copy and the G2 methodology page must say the trajectory describes a
*recent bounded window*, not the full ingested history, and the 12-year long-run view — if wanted —
should be offered as a *separate, clearly-labelled long-run descriptive product*, not squeezed
through these span-calibrated thresholds. This mirrors the geo-DS caveat and does not block #159,
which is Berlin-only groundwork.

## Q2 — Should the window be tied to something more theoretically motivated than "matches Berlin's data availability," or is "hold panel length constant so the same ordinal-step threshold means the same thing" the correct/sufficient domain justification?

**Cross-city comparability of the threshold's *rate meaning* is itself the correct and sufficient
domain justification; the specific number 6 is a pragmatic, honestly-disclosed anchor, and that is
the right way to have made this call.** There is no cycle-length constant in Dangschat (1988),
Döring & Ulbricht (2016), Holm (2010), or the MSS/Sozialmonitoring documentation that maps a
gentrification "wave" to a specific threshold-window length; invasion-succession waves are
described qualitatively and vary by market, so pretending to derive "6 years" from theory would be
false precision. The defensible domain principle is exactly the one the fix invokes: an ordinal
`status_delta >= 1` must denote a comparable *rate* of social-status change before it can carry the
same "declining"/"improving" meaning across two cities — otherwise Hamburg's 12-year integration
window silently redefines the indicator (encoding a ~3× slower per-year rate, inflating trend
classifications from ~14-16% to 21.5% purely as a function of elapsed years). Holding *span*
constant is what restores the like-for-like reading; it is a comparability/measurement-validity
argument, which is squarely a domain-fidelity concern and is the right one. The choice of a
**year-span** window over an edition-count window is also domain-correct: it is cadence-agnostic
(biennial vs annual vs any future cadence), so it is the invariant that generalizes.

That 6 happens to equal Berlin's longest single-vintage span (`lor_pre2021`, 2013-2019) is a
pragmatic convenience that buys the **provable Berlin no-op** — which is itself a domain virtue
here, because it means the R-B2 back-tested Berlin calibration and its Dangschat-anchored ground
truth are not disturbed. I confirm the no-op logic: `lor_pre2021` (max=2019) retains
`snapshot_year >= 2013` = all 4 editions; `lor_2021` (max=2025) retains `>= 2019` = all 3 editions;
so every Berlin edition is kept and no Berlin `trajectory_type` can change. The new
error-severity regression test guards this invariant going forward, including the future-Berlin case
where a new vintage could accumulate >6 years. The number being pragmatic rather than theoretical is
disclosed in both the var comment and the model header; that transparency is exactly what R-C2 asks
for. No change requested.

## Q3 — Confirm this is purely groundwork: no publication-scope change, no Milieuschutz/displacement claim, no touch to #70's scope.

**Confirmed.** I verified the diff and schema:

- `city_code accepted_values=["BER"]` in `schema.yml` is **unchanged** (not in the diff), and the
  `published_cities_filter` staging in `ts_with_vintage_max` is retained — Hamburg is doubly staged
  out and no Hamburg trajectory row is published by this mart.
- No displacement-zone, Milieuschutz / Soziale-Erhaltungsgebiete, Wohnlage, rent, or Kauffälle
  model is touched. No descriptive or causal displacement claim is made or implied. The
  "not-flagged ≠ no-displacement-pressure" framing established in B1 and re-affirmed in #158
  carries forward and is unaffected.
- This is Berlin-output-preserving groundwork that *pre-clears* the panel-length dimension of the
  H-C2 methodological blocker. It does **not** authorize widening the mart to Hamburg. Consistent
  with the geo-DS spike (R4) and the #125/#158 precedent, actually publishing Hamburg trajectories
  — widening `accepted_values` to `["BER","HH"]` — remains a **separate methodology-bearing action
  requiring its own fresh geo-DS + domain dual sign-off**, at which point the Q1 bounded-horizon
  labelling recommendation and the Hamburg-narrative-horizon question become live.
- Nothing here changes #70's scope.

## Untrusted input (SEC-3)

All findings derive from repo files and the local warehouse spike; no web/external content informed
this assessment, and none was treated as instruction.

## Forward guidance (non-blocking)

1. **At the Hamburg-publication gate:** scope the public trajectory labels and the G2 methodology
   page to the *bounded recent window* (per Q1); if a full 12-year Hamburg view is desired, ship it
   as a separate, clearly-labelled long-run descriptive product rather than through these
   span-calibrated thresholds.
2. **Carry the endpoint-fragility caveat (spike §4)** into the same future publication decision — a
   move to smoothed endpoints or a regression-slope trend would be Berlin-affecting and needs its
   own fresh dual sign-off; it is correctly out of scope here.
3. **Revisit the `6` constant** if a future city's longest vintage span exceeds 6 years, or if a
   future Berlin LOR vintage accumulates >6 years of editions (the new regression test will flag the
   latter).

## Verdict

The change is a narrow, rule-preserving input-window bound that improves cross-city measurement
validity: it makes the Dangschat-aligned `status_delta` ordinal-step threshold denote a comparable
*rate* of social-status change across cities of differing MSS/Sozialmonitoring cadence, rather than
silently redefining "declining"/"improving" as a function of elapsed panel years. It is a provable
no-op for Berlin (no R-B2 disturbance), guarded by a new error-severity regression test, and rests
on Hamburg-specific empirical evidence (stickiness) rather than a Berlin assumption transplant. The
comparability justification is the correct and sufficient domain rationale; the specific 6-year
number is a pragmatic, transparently-disclosed anchor. The one genuine domain caveat — that the
labels must be scoped as a *bounded recent-window* trajectory, not a full-history claim — is already
met at the model level and is carried forward as the binding condition for any future Hamburg
publication. No Hamburg number is published, no displacement/Milieuschutz claim is made, and #70's
scope is untouched. No changes requested.

```json
{
  "verdict": "pass",
  "domain_rationale": "Rule-preserving input-window bound that restores like-for-like meaning of the Dangschat-aligned status_delta ordinal-step threshold across cities of differing cadence (biennial vs annual) by holding panel SPAN constant, rather than letting Hamburg's 12-year endpoint delta silently encode a ~3x slower per-year rate. Comparability/measurement-validity is the correct domain justification; the 6-year constant is a pragmatic, disclosed Berlin-anchor giving a provable Berlin no-op (no R-B2 disturbance). Truncation risk is bounded by status_index stickiness (64% of HH areas never move, 4.3% exceed range 1 over 13 years), and the labels are scoped to a bounded recent window at the model level.",
  "theory_risks": [
    "Bounded-window labels ('persistently-deprived'/'stable-established') denote RECENT 6-year persistence, not full-history persistence; must be disclosed as such in any future public copy/G2 page (met at model level; binding condition at the Hamburg-publication gate).",
    "6-year window is a pragmatic Berlin-anchor, not a Dangschat/MSS-derived cycle length; correct but should never be presented as theoretically-derived.",
    "Endpoint-only status_delta remains fragile for both cities (spike §4, ~19-25% of HH full-panel trend calls flip under smoothing); pre-existing, correctly left out of scope, needs its own future dual sign-off.",
    "A 12-year long-run Hamburg narrative, if ever wanted, must be a separate clearly-labelled product, not squeezed through these span-calibrated thresholds."
  ],
  "recommendations": [
    "At the Hamburg-publication gate (separate fresh dual sign-off, per #125/#158): scope public trajectory labels and the G2 methodology page to the bounded recent window; offer any long-run 12-year view as a separate labelled descriptive product.",
    "Carry the endpoint-fragility caveat (spike §4) into that same future decision.",
    "Revisit trajectory_window_years=6 if a future city's longest vintage span exceeds 6 years, or a future Berlin LOR vintage accumulates >6 years (the new regression test guards the latter)."
  ]
}
```

**Verdict: PASS**

# H3 Geo-Data-Scientist Sign-Off

- **Task:** H3 #237 — admit Hamburg into the published, contract-enforced `gentrification_index`
  mart (widen `city_code` accepted_values from `["BER"]` to `["BER","HH"]` and `area_level` to
  include Hamburg's finest grain), per the maintainer's 2026-07-18 ruling that this admission
  decision needs its own fresh, independent dual sign-off.
- **Date:** 2026-07-18
- **Scope reviewed independently:** `transform/models/marts/gentrification_index.sql` (full, incl.
  the #125 BERLIN-ONLY header note lines 34–47), `transform/models/marts/schema.yml`
  (`city_code`/`area_level` accepted_values + unique-key), `int_gentrification_ts` Branch C
  (Hamburg join), `stg_hamburg_geo` (area_level taxonomy), the H1 geo/domain sign-offs and their
  publication-blocking conditions, `H1-condition1-closeout.md`, and the current G2
  `web/pages/methodology.md` §6 cross-city disclosures. I did not rely on any prior draft H3
  sign-off (none present; any that existed is void).

## Verdict: PASS WITH CONDITIONS

The admission is **methodologically defensible** and the substantive validation is genuinely
already done and gated. My conditions are precise *index-implementation* requirements (the
accepted_values/filter/description edits that actually perform the admission) plus one
correctness verification; they are not new methodology work. None is a CONCERNS/FAIL-level gap.

---

## Why the admission surface is narrower than the ticket framing implies (key finding)

The single most important thing I verified — and it materially de-risks this decision — is **what
actually flows into `gentrification_index` for Hamburg**. This mart's Hamburg rows come *only* from
the `live_data` variant (`improved` is Berlin-only by construction; the thesis variants are Berlin
2018 goldens). For `live_data`, the mart carries **D1 Status ordinal, D2 Dynamik ordinal,
typology_stage, and population** — and `own_idx_class`/`own_idx_class_bi` are **hard-NULL**
(lines 162–163). Consequently:

- **The 3-indicator-vs-5-indicator D4 (EWR) composite difference does NOT enter this mart.** The
  EWR composite (`ewr_composite`, migration-background/residence-duration omission, the uniform
  Stadtteil→Gebiet inheritance and its Gebiet↔Stadtteil crosswalk) surfaces in
  `fct_gentrification_change` and the Hamburg regressions — **which remain `city_code=["BER"]` and
  are NOT part of this widening.** So H1's crosswalk match-rate condition (already closed at 98.6%,
  `H1-condition1-closeout.md`) and the D4-clustering/effective-N condition (#265) bind on those
  models, not on the mart being admitted here. Question 4's "3-vs-5 composite" concern is therefore
  *moot for this specific mart*.
- **The C5 OSM completeness-bias correction and the D3 POI predictor also do NOT enter
  `live_data` status.** `live_data.status_index` is the Sozialmonitoring/MSS *outcome* ordinal, not
  a POI score. The C1–C6 re-fits are real and gated but bind on the POI/change/OA marts, not on the
  outcome ordinals admitted here. **Update (#312, 2026-07-24):** the OA-mart-scoped C5 re-fit this
  note flags as still-open has since been **investigated** --
  `docs/epic-h/312-oa-c5-geo-spike.md` re-fits the completeness-bias correction specifically for
  `mart_poi_offering_advantage` (structural same-year-ratio argument plus an empirical extension of
  the OA-D0 completeness-contamination gate to Hamburg) and finds the mart's existing
  `accepted_values=["BER","HH"]` methodologically justified -- but this finding is still **pending
  geo-DS + domain-expert dual sign-off** (see #312 spike doc, `docs/epic-h/312-oa-c5-geo-spike.md`)
  and is not yet closed under CLAUDE.md's methodology gate (R-C1). That pending finding does not
  retroactively alter anything in *this* H3 sign-off, which never depended on it.

What *does* enter, and is therefore what this gate genuinely turns on: the **D1/D2 Sozialmonitoring
outcome ordinals and the reused Berlin D1×D2 typology matrix / Dynamik relabel**, applied to
Hamburg's `subarea_l2` (statistisches Gebiet, ~945) grain.

## 1. Grain mismatch (Berlin `plr` ~448/542 vs Hamburg `subarea_l2` ~945)

Admitting both into one contract is sound **because the mart is row-keyed by
`(city_code, area_level, area_code, period_yyyymm, variant)`** — no pooling or cross-city
arithmetic happens at the row level; each row is intrinsically single-city. Berlin `plr` and
Hamburg `subarea_l2` are each their city's finest analytical grain ("PLR analogue"), which is the
correct correspondence to expose. The unique-combination test still holds: Hamburg carries a single
`area_vintage='current'` and annual `period_yyyymm=YYYY12`, so there is no key collision with
Berlin's two LOR vintages. The only residual risk is a **consumer** computing a naive cross-city
comparison; that is a disclosure matter, addressed in §3 and already on G2.

## 2. Dynamik cadence (Berlin 2-yr biennial vs Hamburg annual editions / 3-yr Dynamik window)

This is the one substantive comparability caveat that genuinely reaches this mart, via
`dynamism_index`/`dynamism_class`/`typology_stage`. The same numeric Dynamik code encodes a
different velocity threshold in each city's source methodology (H1 domain §1). H1's domain sign-off
judged reuse of the matrix logic defensible *with disclosure*, and I concur from the spatial/
statistical side: the relabel and the D1×D2 case logic operate only on the shared ordinal domain
(1–4 Status, 1–3 Dynamik), introduce no new normalization, and make no interval-scale claim. This
is handled at the **disclosure** level (as B's directional-revival framing permits), not by forcing
a common cadence — which is the correct, honest choice rather than fabricating a re-timed index.

## 3. Are the H1 publication-blocking disclosures actually satisfied on G2?

Yes. H1's PASS was explicitly scoped to pipeline wiring and its conditions were said to block
publication. I checked whether the *specific* conditions are now met, not just that a generic caveat
exists. `web/pages/methodology.md` §6 states: different observation windows (line 268), a
"same-named typology stage … does not represent an identical underlying threshold" qualitative
caveat (line 270, satisfying H1 domain Cond 1 + 4), and Hamburg's "thinner (fewer indicators,
coarser geography)" baseline (line 269, satisfying H1 domain Cond 2 + geo/domain Cond 3). Combined
with the closed crosswalk condition (98.6%), the H1 publication gates are discharged.

## Conditions (index-implementation requirements; must land in the #237 admission commit)

1. **Widen the contract accepted_values in `schema.yml` to exactly match what flows in — no wider.**
   `city_code`: add `"HH"` → `["BER","HH"]`. `area_level`: add **`"subarea_l2"`** (Hamburg's Gebiet
   grain, the only Hamburg level `int_gentrification_ts` emits into this mart) → do **not**
   speculatively add `district`/`subarea_l1`, which do not appear in `live_data` rows. The reviewer
   must confirm the built distinct `area_level` set equals the declared set (accepted_values is the
   guard that keeps this honest).
2. **Update the stale Berlin-only prose so the contract's documentation matches its behaviour.** The
   `gentrification_index.sql` header (lines 34–47) and `schema.yml` model/`city_code` descriptions
   still assert "stays Berlin-only … keeps Hamburg out." These must be rewritten to record the H3
   admission and cite this sign-off + the G2 disclosures. An uncited/contradictory methodology
   comment is an R-C2 finding.
3. **Verify the admission is not a silent no-op.** The Hamburg rows only appear if (a) the
   `published_cities` var / `published_cities_filter` now includes `HH`, and (b) `dim_area` actually
   contains `HH` `subarea_l2` rows for the inner join on `(city_code, area_code)`. The reviewer must
   confirm Hamburg rows are present and non-zero in the built mart (and that the `live_data` typology
   columns populate as expected), so the widening admits real data rather than passing tests on an
   empty Hamburg branch.
4. **Confirm scope discipline in the PR description:** this ticket admits **`gentrification_index`
   only**. `fct_gentrification_change`, `fct_gentrification_trajectory`, and `mart_area_demographics`
   must remain `city_code=["BER"]` (their EWR-composite / trajectory-threshold / regression concerns
   — H1 Cond 2/#265, C2 thresholds — are not discharged for publication by this ticket). Any
   accidental widening of those marts is out of scope and would reopen the D4 concerns I ruled moot
   above.

All four are mechanical/verification items enforceable by the data-engineer-reviewer within the
admission commit; none requires new methodology. On their satisfaction I am satisfied the Hamburg
admission into `gentrification_index` is spatially and statistically sound.

---

## Addendum (2026-07-31, #329)

The "3-indicator-vs-5-indicator D4 (EWR) composite difference" referenced above is a historical
description, left as-is. #329 subsequently changed `int_ewr_socioeco_hamburg`'s `ewr_composite` to
a **2-indicator** composite (dropping `unemployment_share` as a predictor/outcome conflation risk
against Hamburg's own D1 Sozialmonitoring Statusindex, ADR-0014 §2). This does not change the
finding above — the composite still does not enter `gentrification_index` (this mart), so the
conclusion that "Question 4's '3-vs-5 composite' concern is moot for this specific mart" continues
to hold verbatim for the now-2-vs-5 composite.

**Verdict: PASS WITH CONDITIONS**

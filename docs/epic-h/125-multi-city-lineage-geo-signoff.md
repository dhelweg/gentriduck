# #125 Multi-City Lineage — Geo-Data-Scientist Sign-Off

- **Task:** Epic H / #125 — generalize the gentrification-index lineage for a second city
  (Hamburg) after full local ingestion of HH raw data; stage Hamburg OUT of published/governed
  marts while letting it flow through the intermediate lineage.
- **Branch / commits:** `epic-h-125-multi-city-lineage` (`1732821` + `cd2c462`, off `develop`).
- **Date:** 2026-07-07
- **Scope of this verdict:** the plumbing generalization + the *staging-out* decision only. This
  is explicitly **not** a sign-off to publish any Hamburg number.
- **Verdict: PASS**

I approve integrating this diff into `develop`. The change is methodologically the *conservative,
correct* move: it makes the shared lineage city-agnostic (so a second city no longer trivially
green-builds by degrading to zero rows), while every governed/published surface remains
Berlin-only via an explicit `city_code = 'BER'` filter. Berlin output is byte-identical
pre/post (reviewer-verified: `int_poi_share_base_2021` BER = 10197 rows, `assert_frame_equal`
passed; published-mart BER counts unchanged), so this diff publishes nothing new and cannot
regress the thesis-revival results. The methodology risks below are real but are **contained by
the staging-out filter**, and I convert each into an explicit pre-publication condition.

---

## Assessment of the flagged methodology questions

### Q1 — C5 dynamism re-fit for Hamburg (share-based completeness-bias correction)

**Not trustworthy for Hamburg as-is; correctly contained by staging-out.** The C5 correction
(`int_poi_status_dynamism`, geo-DS approved 2026-06-19 for Berlin, `docs/epic-c/C5-geo-signoff.md`)
rests on a **uniform OSM coverage-growth assumption**: city-wide mapping growth cancels in
`share_yoy_change`, leaving real relative-density signal. That assumption was validated against
*Berlin's* specific 2008–2024 coverage curve at PLR scale. Hamburg has its own, independent OSM
completeness trajectory (different mapper community, different onboarding timeline, different
statistische-Gebiete grain) — the uniform-growth premise has **not** been tested there. The 77
Hamburg `test_c5_poi_share_spike` rows (vs 75 pre-existing Berlin, which are a *known, accepted*
warning) are direct evidence that Hamburg's share dynamics contain spikes consistent with
non-uniform coverage onset rather than real churn. Per ADR-0014, re-fitting C5 for Hamburg is a
distinct methodology-bearing task separate from source approval.

Because `int_poi_status_dynamism` is city-agnostic and computed for HH here, its Hamburg rows
exist in the intermediate layer — but the reviewer confirmed **0 HH rows in all three published
marts** and HH is filtered out of `int_mss_lead_lag`. Since `dynamism_score` only reaches a
governed surface through `int_gentrification_ts` Branch C → `gentrification_index` (which carries
`where ts.city_code = 'BER'`), the untrusted Hamburg dynamism is **never surfaced**. Containment is
adequate. **Condition C1 (blocks Hamburg publication):** re-fit/validate C5 for Hamburg — establish
whether the uniform-coverage assumption holds for HH's OSM history (or adopt Option B, ohsome
edit-density normalization, referenced in the model header), and drive the Hamburg
`test_c5_poi_share_spike` count down to a documented, understood residual — before any Hamburg
dynamism enters a published mart.

### Q3 — Trajectory thresholds vs panel cadence (biennial Berlin vs annual Hamburg)

**The filter is the right interim containment.** `fct_gentrification_trajectory`'s step/threshold
logic was calibrated on Berlin's **biennial** MSS panel; a "step" is implicitly a ~2-year interval.
Hamburg's Sozialmonitoring is **annual**, so applying the same thresholds unchanged would silently
redefine the time base of every trajectory classification (an annual step is not comparable to a
biennial one — velocity-of-change semantics differ by ~2x). Keeping Hamburg out
(`fct_gentrification_trajectory.sql:110`, `where ... city_code = 'BER'`) is the correct call; this
is not a defect in the diff. **Condition C2 (blocks Hamburg publication):** before publishing
Hamburg trajectories, redefine "a step" for annual cadence (either re-derive thresholds on the
annual panel or resample to a common cadence) — this should be its own methodology-gated ticket.

### Q4 — Lead-lag cadence (biennial `lag_k*2` hardcoded)

**Filtering Hamburg out is correct; a separate annual model should be a follow-up ticket.**
`int_mss_lead_lag` hardcodes Berlin's biennial edition spacing (the `lag_k*2` construction relies on
`edition_tk = edition_t + 2*k`); it is now filtered to `city_code = 'BER'`
(`int_mss_lead_lag.sql:82`). Running Hamburg's annual editions through a biennial lag arithmetic
would mislabel lead-lag horizons, so the filter is the right interim call. **Condition C3 (follow-up
ticket, blocks Hamburg lead-lag publication):** file a separate annual-cadence Hamburg lead-lag
model rather than parameterizing the biennial one in place — the horizon semantics (what lag_k
*means* in years) must be city-cadence-aware and independently gated.

### Q5 — Passthrough generality for a future reform city

**Correct for Hamburg; must NOT harden into a general rule.** Hamburg has a single `'current'`
statistische-Gebiete vintage with no mid-series boundary reform (ADR-0014 Pillar 1), so the new
"any non-`lor_pre2021` vintage passes through unchanged" branch in `int_poi_share_base_2021` is
exactly right: there is nothing to crosswalk, and the model comments (lines 29–36) already flag
this as a non-general assumption. Methodologically this is sound *for the ingested data today*. The
model header's own METHODOLOGY QUESTION correctly anticipates the hazard: a **future** city that
DOES undergo a mid-series boundary reform must get its **own** crosswalk seed (mirroring
`seed_lor_crosswalk_2006_to_2021`) — passing its reformed vintages through unchanged would break the
LAG continuity across its boundary break exactly the way #63 broke for Berlin, producing spurious
NULL/step artifacts in `share_yoy_change`. I confirm: passthrough is **not** a general
"never needs a crosswalk" rule. **Condition C4 (documentation / future-city gate):** any future city
onboarding must assert single-vintage-across-series; if it has a reform, it requires a per-city
crosswalk seed and this passthrough branch must be gated on `area_vintage`-count per city, not left
implicit.

I also confirm the reviewer's spatial-integrity findings are methodologically meaningful, not just
mechanical: `plr_poi_share` summing to exactly 1.0 per `(city_code, snapshot_year, area_vintage)`
and no `area_code` collision across BER/HH are the two properties that guarantee the per-vintage
window partitioning (`int_poi_share_base_2021.sql:138-146`) keeps each city's city-wide POI
denominator sealed from the other — so no cross-city contamination of shares or z-scores can leak
even in the intermediate layer.

---

## Conditions before Hamburg may be PUBLISHED (none block this `develop` integration)

- **C1 — C5 re-fit for Hamburg** (methodology-gated ticket): validate/replace the uniform-coverage
  assumption on HH's OSM history; resolve the 77 `test_c5_poi_share_spike` rows to a documented
  residual before any HH dynamism reaches a governed mart.
- **C2 — Cadence-aware trajectory thresholds** (methodology-gated ticket): redefine "a step" for
  Hamburg's annual Sozialmonitoring before publishing HH trajectories.
- **C3 — Annual-cadence Hamburg lead-lag model** (follow-up ticket): a separate model, not an
  in-place parameterization of the biennial one.
- **C4 — Future reform-city crosswalk** (documentation + future gate): document that passthrough
  presumes single-vintage-across-series; a reform city needs its own crosswalk seed.

I recommend the PM file C1–C3 as tracked follow-up tickets now (blocking any future "widen
`city_code` to include HH" work), and record C4 on the Epic H methodology page. None of these
require changes to this diff.

**Verdict: PASS**

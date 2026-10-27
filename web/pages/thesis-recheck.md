---
title: The 2018 thesis, re-checked
sidebar_position: 10
---

<!--
  NEW page (maintainer request): a dedicated thesis-vs-project re-check, structured by the six
  original hypotheses. The live site leads with CURRENT data (home/maps/area-detail); this page is
  the historical reproduction study, kept separate. Content restates the signed-off Epic B findings
  (docs/epic-g/O4-milestone-B-narrative.md) plus the OA-A "faithful" revival (Run 1) findings
  (docs/epic-e/E1-regression-findings.md #168, docs/epic-b/A3-oa-validation-findings.md #167) — no
  new methodology claim, only the thesis's own Offering-Advantage predictor swapped in per ADR-0017.
  Public framing follows the #155/G2 sign-off precedent (geo-DS + domain-expert read of the public
  claims) — see docs/epic-g/A5-thesis-recheck-refresh-*-signoff.md.

  I3 (#220): re-platformed onto the shared `<Hero>`/`<FooterNav>` components, removing the
  hand-copied `.hero-compact` CSS this page and `pages/index.md` had each carried inline (flagged
  by the 2026-07-10 storytelling review, finding 4, and I1's own header comment: "Other pages keep
  their own inline hero/pipeline/footer copies until I3 converts them one by one"). Content/data
  unchanged; added one backward link to `/about` in "Further reading" per
  docs/epic-i/storytelling-guide.md §2's explicit note ("I3 should add a backward link *into*
  About from thesis-recheck").

  #309: added the fixed BZR/`standard` map (below the six-hypotheses table) that this page never
  had -- it was previously mixed into /berlin/maps behind a `variant`/`area_level` dropdown pair,
  the only reason that page ever showed the 2018 thesis's own Dec-2016 BZR snapshot. Moved here in
  full (no dropdown -- see the map's own script-block comment), next to the hypothesis writeup it
  actually illustrates. Not methodology-bearing: same `gentrification_index` rows, same
  `standard`/`bzr` filter, just relocated and no longer selector-driven.

  #309 review fix: the first cut wired this map to `stage_label`/categorical (mirroring
  /berlin/maps' `live_data`/`plr` map), but `stage_label` is derived from `status_class` via a
  CASE that only matches the six-stage typology's own values -- and for `standard`/`bzr`,
  `status_class` instead takes `high`/`medium`/`low` (verified against the build parquet: 137/137
  rows, 3 distinct values, none of the six-stage strings), so every `stage_label` came out NULL
  and the map rendered blank with an empty legend. Switched to `dynamism_index` (137/137 populated,
  scalar) -- same "speed of change" framing and scalar-legend convention (no colorPalette,
  Evidence's default single-hue sequential ramp, `legendType="scalar"`) /berlin/maps already uses
  for this indicator. `status_class`'s own `high`/`medium`/`low` labelling was left for a future
  pass rather than bolted on here under review-fix time pressure -- see that page's Dropdown/
  indicatorShortLabel pattern if picking this back up.
-->

<Hero compact eyebrow="The historical reproduction study" title="The 2018 thesis, re-checked" lede="Gentriduck began as a question: an <a href='https://github.com/dhelweg/masterthesis2018_gentrification'>award-era master's thesis</a> from 2018 claimed that the churn of shops, cafés and restaurants in a Berlin neighbourhood tracks — and partly <i>predicts</i> — its social change. Eight years and a completely rebuilt, open-source stack later: <b>does that result still hold?</b>" />

This page answers that hypothesis by hypothesis. It is deliberately about the *reproduction* — the
historical check. For what Berlin looks like **today**, start with the [home page](/), the
[maps](/berlin/maps), and the [area detail](/berlin/area-detail); those lead with the current data,
where these 2018 hypotheses matter less than the live picture.

<Alert status="info">
  <b>The short version: partly.</b> The thesis's clearest result — fast-food density goes with lower
  social status (H1b) — replicates robustly, and most strongly with the thesis's own commercial
  predictor, the <b>Offering Advantage</b>. Its timing claim — social change comes <i>before</i>
  commercial change (H3b), which the thesis itself rated only "rather confirmed" — holds on Berlin's
  official social monitor for 2021–2025, but not on its 2013–2019 editions. Those include the thesis's
  own 2013, 2015 and 2017 editions, so they are the like-for-like re-test, and there H2, H3a and H3b are
  all not significant — though the re-check measures change as a move between the four status classes, while the thesis used the finer MSS Dynamik index, so this is a lower-powered test, not a clean refutation. On Berlin's resident register (EWR), which measures
  population composition rather than social status, commerce and composition move together with neither
  clearly leading. The thesis's claim that social status is related to the local mix of businesses (H1)
  was only re-tested with single-number proxies, which do not reproduce it. The relationship
  between commerce and social change is real, but fragile — it depends on how you measure both and on
  the period you look at. Earlier editions of this page called it a clean replication; see the
  caveats for why that was wrong.
</Alert>

## Two studies, same idea

|  | 2018 thesis | Gentriduck (this project) |
|---|---|---|
| **Question** | Does commercial activity track & predict neighbourhood social change in Berlin? | The same — re-checked, then extended |
| **Commercial signal** | OpenStreetMap points of interest, expressed as an *Offering Advantage* (a location quotient: a PLR's local share of a business category relative to Berlin overall) | Same OSM sources and same Offering-Advantage construct, full annual history back to 2008 |
| **Social measure** | Berlin's official social monitor (MSS Status and Dynamik indices, editions 2013–2017); resident-register (EWR) data as context inputs | The official social monitor (MSS), editions 2013–2025; the resident register (EWR, 2014–2020) as a population-composition context panel |
| **Stack** | Hadoop · Hive SQL · Java · R · Weka | dbt · DuckDB · Python (scipy, scikit-learn) — free, open, local-first |
| **Grain** | Planungsraum (≈2,000–5,000 residents) | Same, plus coarser scales for robustness checks |
| **Scope** | One-shot analysis | Ongoing public statistics site, Berlin now, more cities later |

The original thesis repository is left untouched as the historical record; Gentriduck is a
from-scratch rebuild from open sources only. Two methodological points matter here: the thesis
blended everything into one score, while this project keeps **what we're trying to explain** (social
status) strictly separate from **the commercial signal used to explain it** (see the
[methodology page](/methodology)); and this re-check (Run 1, faithful revival) now uses the thesis's
actual predictor — the **Offering Advantage**, a location quotient of how over- or under-represented a
business category is in a given area, exactly as the thesis computed it (its `oa_*`/`prev_oa_*`
columns) — rather than a plain POI count. Both are shown below where they diverge.

## The six hypotheses, then and now

Each hypothesis links commercial activity to social status. A result only counts if it is
**statistically significant** — not merely pointing the expected way. **Supported** = significant in
the thesis's predicted direction; **contradicted** = significant in the opposite direction;
**not significant** = the data cannot tell. H3a and H3b are claims about *timing*, so they are tested
with a cross-lagged design: changes in two strictly ordered, non-overlapping time windows, each
direction controlling for the other series' own earlier change, with confidence intervals that allow
for neighbouring areas not being independent. The thesis's own verdicts are taken from its summary
table (Tabelle 6-16).

| # | The hypothesis | 2018 thesis (Tabelle 6-16) | Our re-check | Verdict |
|---|---|---|---|---|
| **H1** | Social status is related to the local mix of businesses | Proven (a multi-feature model plus category correlations of mixed sign) | Only single-number proxies were tested, not the thesis's multi-feature model: total POI count not significant (rho −0.05); a four-domain OA basket significant in the **opposite** direction (rho +0.15, n=433) | ⚠️ Not reproduced by a single-number proxy; the thesis's multi-feature test was not re-run |
| **H1b** | More fast-food outlets → lower status | Proven | Supported on raw counts (rho 0.13) and clearly stronger on the OA quotient (rho 0.35, n=341); also holds at Bezirksregion scale | ✅ Replicates robustly |
| **H2** | Today's commerce predicts tomorrow's social change | Inconclusive ("kein klares Bild") | Not significant on the official monitor 2013–2019 (the thesis's own editions). Supported on the official monitor 2021–2025 (rho −0.10 to −0.19) and on the resident-register composition series (rho −0.26 to −0.39, small effects: R² ≤ 0.04, and its pooled area-year p-values overstate significance) | ⚠️ Panel-dependent, small effects |
| **H3a** | Commercial change comes first, status change follows | Rejected | Official monitor 2013–2019: not significant. Official monitor 2021–2025: a borderline result in the opposite direction on the dynamism measure (interval only just excludes zero; p ≈ 0.06), not significant on OA. Resident register: supported | ⚠️ Panel-dependent |
| **H3b** | Status change comes first, commercial change follows | Only tentatively supported ("eher bestätigt") | Official monitor 2013–2019: not significant. Official monitor 2021–2025: supported on both predictors (partial rho −0.13 and −0.16), but this panel's test runs without the baseline-susceptibility (D4) control, which is unavailable at the 2023 pivot, and its windows span the pandemic and its aftermath. Resident register: supported — but so is the reverse (H3a), at similar strength — at the two-year lag commerce-first is, if anything, the larger | ⚠️ Holds on the recent official monitor only |
| **H3c** | Commercial and social change co-occur | Inconclusive | Official monitor (both eras): not significant on the dynamism measure, significant in the opposite direction on OA. Resident register: rho −0.42, but not a like-for-like test (same-year levels, not co-occurring changes) | ⚠️ Not supported |

## The 2018 snapshot, mapped

<script>
  // #309: carved out of /berlin/maps, where this map used to live behind a `variant`/
  // `area_level` dropdown pair (see that page's header comment). This is the thesis's own
  // reproduction -- Berlin's pre-2021 Bezirksregion (BZR) boundaries, the Dec-2016 snapshot,
  // `gentrification_index`'s `standard` variant -- so unlike /berlin/maps it is fixed, no
  // dropdown: there is exactly one (variant, area_level) combination to show here.
  //
  // #309 review fix: this used to be `stage_label`/categorical (see the top-of-file comment for
  // why that rendered blank for `standard`/`bzr`). Now `dynamism_index`, a scalar -- so no
  // categorical palette is needed here; /berlin/maps' scalar indicators use Evidence's default
  // single-hue sequential ramp (light -> dark blue), reused here unmodified via `legendType`
  // alone (no `colorPalette` prop, see the <AreaMap> below).
  import { base } from '$app/paths';

  const areaTooltip = [
    { id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
    { id: 'dynamism_index', title: 'Dynamism (speed of change)', fmt: 'num1' },
    { id: 'area_code', title: 'Area code', valueClass: 'text-xs opacity-60', fmt: 'id' }
  ];
</script>

The map below is the 2018 thesis's own snapshot — Berlin's pre-2021 Bezirksregion (BZR) boundaries,
December 2016. Unlike the rest of the site, the plain-language six-stage typology isn't available
at this variant/level (`status_class` here takes a coarser `high`/`medium`/`low` reading instead —
see the script-block comment above), so this map instead shades by **dynamism** — how fast an
area's social status was moving at the time, the same scalar indicator and colour convention the
[maps page](/berlin/maps) uses for its own "Dynamism" option. It's fixed (no data or area-level
picker) because it's a historical snapshot, not a live view — for the current, live picture at
neighbourhood (Planungsraum) detail, see the [maps page](/berlin/maps).

```sql thesis_areas
-- #309 review fix: status_class here takes 'high'/'medium'/'low' values, not the six-stage
-- typology strings /berlin/maps' `live_data`/`plr` query CASEs into stage_label -- running that
-- same CASE against this `standard`/`bzr` slice produces NULL for all 137 rows (verified against
-- the build parquet), which is why the first cut of this map rendered blank. dynamism_index and
-- status_index are both 137/137 populated here, so this maps on dynamism_index (scalar) instead;
-- status_class is still selected for a future high/medium/low categorical pass, just not mapped.
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class
from gentriduck_marts.gentrification_index
where variant = 'standard'
  and area_level = 'bzr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'standard' and area_level = 'bzr'
  )
order by dynamism_index desc
```

<PolygonMap
    data={thesis_areas}
    geoJsonUrl={`${base}/geo/bzr_standard.geojson`}
    geoId="area_code"
    areaCol="area_code"
    value="dynamism_index"
    legendType="scalar"
    title="Berlin Bezirksregion (BZR) — Dynamism (speed of status change), 2018 thesis reproduction (Dec 2016 snapshot)"
    tooltip={areaTooltip}
/>

There's no click-through here — the thesis's pre-2021 area codes don't resolve on the per-area
pages, which are built on today's boundaries. Hover an area for its name and dynamism score.

### Read the columns together, not alone

The verdicts hinge on **two things at once: which data measures "social status," and which
predictor measures "commerce."**

- **On Berlin's *official* social monitor, thesis era (MSS, editions 2013–2019):** this includes
  the thesis's own 2013, 2015 and 2017 editions, so it is the like-for-like re-test. H2, H3a and H3b
  are all not significant, under either predictor. But the re-check measures change as a move between the four status classes, while the thesis used the finer MSS Dynamik index, so this is a lower-powered test, not a clean refutation.
- **On Berlin's resident register (EWR, 2014–2020, raw POI count):** this series measures population
  composition (residence duration, age structure, nationality / migration background), not social
  status, and it was not the thesis's outcome. Both timing directions are significant at similar
  strength — at the two-year lag commerce-first is, if anything, the larger — so commerce and
  composition move together without one clearly leading. This panel uses raw OSM count changes without
  the completeness correction, so mapping growth may contribute to both directions. Effects are small
  (at most about 4% of the variation explained), and it has not yet been re-tested with the OA
  predictor (a documented scope boundary — see caveats).
- **On the official monitor, modern era (2021–2025):** fast food (H1b) and the predictive link (H2)
  hold, and the timing test favours the thesis's direction — status change first (H3b), on both
  predictors, with commerce-first (H3a) not supported. With three editions this is a single
  comparison window (pivot 2023); this panel's test runs without the baseline-susceptibility (D4)
  control, which is unavailable at the 2023 pivot, and its windows span the pandemic and its aftermath.
  Whether it reflects a real shift, a better-measured outcome, the type of area, a period-specific shock
  or chance cannot be settled from this data alone. The MSS status index tracks concentrations of
  disadvantage, so "status first" here means a fall in measured disadvantage comes before commercial
  change — it is not evidence that anyone was displaced.
- **In Hamburg** (annual Sozialmonitoring, an independent re-test), neither timing direction shows up
  at any lag from one to three years.

## What still matters for social science today

For the **current** picture the six hypotheses take a back seat to the live typology on the
[home page](/). But three threads remain genuinely interesting:

- **Fast food as a durable down-signal, strengthened by the thesis's own predictor (H1b).** Of
  everything tested, the fast-food association is the most robust — it holds on official data, it
  survives aggregation to Bezirksregion scale, *and* it gets clearly stronger once measured the way the
  thesis actually measured it (a location quotient, not a raw count). This is the one commercial
  indicator that behaves consistently as a status marker.
- **The timing question is open, not settled (H3a/H3b).** With a test that actually separates the
  two directions, "status first, commerce second" shows up on Berlin's official monitor for 2021–2025,
  but not for 2013–2019 (the thesis's own editions), not in Hamburg, and on the resident-register
  composition series the two move together with neither leading. That is weaker than the thesis's own tentative verdict suggested, and
  much weaker than the "clean replication" earlier editions of this page reported.
- **Same-time co-movement (H3c) is not supported.** On the official monitor it is not significant
  on the dynamism measure and points the other way on OA. The one significant result, on the resident
  register, correlates same-year levels rather than co-occurring changes, so it is not a like-for-like
  test of H3c.

## Honest caveats

- No multiple-comparison correction was applied; these are **directional indicators, consistent with
  a hypothesis, not confirmatory proof.** Across the roughly 40 tests behind this table, about two would
  come out significant by chance alone, so a single isolated result is weak evidence.
- All analysis is at the aggregate planning-area level. Nothing here says anything about an individual
  person, household, or building (the ecological fallacy).
- EWR, MSS, and OSM measure different things on different schedules; a difference between the two
  social measures is a measurement story as much as a real-world one.
- **The EWR panel (resident register, 2014–2020) has not yet been re-tested with
  the OA predictor** — it still uses the raw POI count/dynamism measures from earlier editions of this
  page. This is a documented scope boundary for Run 1 (OA is currently built at PLR scale only), not a
  result — a future run may close this gap.
- **Method correction (October 2026).** Earlier editions reported H3a and H3b from a test that
  computed the *same* correlation for both directions, so it could never tell them apart, and counted a
  result as "passing" whenever its sign matched, even when it was indistinguishable from noise. The
  table now uses a cross-lagged design and requires significance. The thesis's own verdicts were also
  misreported here: it found H2 and H3c inconclusive, rejected H3a, and supported H3b only
  tentatively (thesis Tabelle 6-16).
- **Data correction (October 2026).** Shops and services deleted from OpenStreetMap had been kept in
  every later year by an extraction bug, inflating counts by up to about a fifth and making commercial
  growth look stronger than it was. All results here use the corrected data.
- Reproducing a 2018 result is a directional check, not a number-for-number replay — see the
  [Epic B framing](https://github.com/dhelweg/gentriduck/blob/main/docs/PROJECT_PLAN.md) for why.
- **Data correction (2026-07-09, #200):** the H1 (OA) test's sample was previously understated
  (n=92 instead of the correct n=435) by an area-code join bug that silently dropped most PLRs;
  fixing it changed the H1 (OA) result from "not significant either way" to "statistically
  significant, in the direction opposite the thesis's prior" — a more decisive, not a more
  favourable, finding. No other hypothesis in this table was affected. (After the October 2026
  deletion fix the sample is n=433.)

## Further reading

- [Epic B milestone write-up](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/O4-milestone-B-narrative.md) — the full signed-off findings this page summarises
- [E1 regression findings (OA-A.4, Run 1)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1-regression-findings.md) — the full H1–H3c results table this page draws from
- [OA direct validation vs. the 2018 golden (OA-A.3)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-b/A3-oa-validation-findings.md) — confirms the recomputed Offering Advantage matches the thesis's own numbers directionally
- [Faithful vs improved methodology comparison](/methodology#7-faithful-vs-improved--a-methodology-comparison) — does curating which business types count sharpen the signal? (OA-C.2, now §7 of the methodology page)
- [Methodology & data sources](/methodology) — what the current index measures and how it differs from the 2018 original
- [Home page](/) and [maps](/berlin/maps) — the current, live picture of Berlin
- [About this project](/about) — curious who rebuilt this and why? The origin story and the team (human and AI) behind this re-check
- [github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck) — all code, models, and decisions

---

<FooterNav />


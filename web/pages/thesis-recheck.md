---
title: The 2018 thesis, re-checked
sidebar_position: 10
---

<!--
  NEW page (maintainer request): a dedicated thesis-vs-project re-check, structured by the
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

  #309: added the fixed BZR/`standard` map (below the hypotheses table) that this page never
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

  #354 phase C (2026-11): the hypothesis section now reports the pre-registered thesis hypothesis
  suite (docs/epic-e/E1b-berlin-hypothesis-suite-findings.md; geo-DS + domain Verdict: PASS,
  docs/epic-e/354-geo-signoff.md, docs/epic-e/354-domain-signoff.md). Eight hypotheses (H1a and
  H1c added), two panels (thesis era re-analysed 2013–2019; 2019–2025). Public wording is bound by
  the domain sign-off §4 (corrections block, verbatim) and §5 (table labels and per-row sentences,
  which supersede the geo-DS §4 text where they differ), and by pre-registration §9 (must-not-claim).
  The verdict table is NOT hand-copied: it reads the committed results CSV through the
  `gentriduck_findings.thesis_hypothesis_suite` source (primary rows only, raw `verdict` column
  deliberately not selected), maps the CSV's `holds` field to the domain §5 plain-word labels, and
  appends one compact estimate only where the label is "Holds" (as in domain §5's table). The
  hypothesis wording and the thesis column (words only, no AUC, domain §5 / findings §6) are
  hand-written from domain §5. Removed as stale per domain §5: every "status first" sentence, the
  "no multiple-comparison correction" caveat (BH now applies to every headline row), "six
  hypotheses", the H3c "opposite direction on OA" claim, the E1 single-number H1 proxy row, and the
  E5 Hamburg sentence (replaced by a neutral #355 placeholder, no claim). The EWR results are out of
  the suite's scope (findings §11) and are now only pointed to (E1 §4), not restated.

  #355 (page part, 2026-11): the neutral "Hamburg: re-test in progress (#355)" placeholder is
  replaced by a pointer to /hamburg/thesis-recheck (no Hamburg result is stated here), and the
  same link is added to "Further reading". The Berlin table and its `city = 'BER'` filter are
  unchanged. Page review R1 (docs/epic-h/355c-page-domain-signoff.md): the study table's grain row
  now gives the pre-registration §4.5 figure, "about 7,000 residents on average" (median 7,224),
  so this page and /hamburg/thesis-recheck agree.

  #371 (2026-11): links only. The Hamburg bullet under "Reading the two right-hand columns" and
  "Further reading" now point to /berlin-vs-hamburg, the matched Berlin-Hamburg comparison. No
  result is stated here; the Berlin table and its filter are unchanged.
-->

<Hero compact eyebrow="The historical reproduction study" title="The 2018 thesis, re-checked" lede="Gentriduck began as a question: an <a href='https://github.com/dhelweg/masterthesis2018_gentrification'>award-era master's thesis</a> from 2018 claimed that the churn of shops, cafés and restaurants in a Berlin neighbourhood tracks — and partly <i>predicts</i> — its social change. Eight years and a completely rebuilt, open-source stack later: <b>does that result still hold?</b>" />

This page answers that hypothesis by hypothesis. It is deliberately about the *reproduction* — the
historical check. For what Berlin looks like **today**, start with the [home page](/), the
[maps](/berlin/maps), and the [area detail](/berlin/area-detail); those lead with the current data,
where these 2018 hypotheses matter less than the live picture.

<Alert status="info">
  <b>The short version: partly.</b> In 2026 we re-tested all eight of the thesis's hypotheses with a
  design fixed in advance, once on the thesis's own era (2013–2019) and once on 2019–2025. Two of its
  findings hold in both: an area's social status is linked to its local business mix, modestly (H1),
  and fast food makes up a larger <i>share</i> of the gastronomy mix where officially measured
  disadvantage is higher (H1b). On timing, we find no detectable ordering between commercial change
  and change in officially measured disadvantage, in either direction (H3a–c): the thesis's tentative
  finding that a fall in disadvantage comes first (H3b) is not reproduced, and its rejection of
  "commerce first" (H3a) holds. The link between today's mix and the next change (H2) is explained by an area's current
  status level, which matches how the thesis itself read it. One result this page used to report, that
  a fall in disadvantage came before commercial change on recent data, is not reproduced; see the
  corrections below.
</Alert>

## Two studies, same idea

|  | 2018 thesis | Gentriduck (this project) |
|---|---|---|
| **Question** | Does commercial activity track & predict neighbourhood social change in Berlin? | The same — re-checked, then extended |
| **Commercial signal** | OpenStreetMap points of interest, expressed as an *Offering Advantage* (a location quotient: a PLR's local share of a business category relative to Berlin overall) | Same OSM sources and same Offering-Advantage construct, full annual history back to 2008 |
| **Social measure** | Berlin's official social monitor (MSS Status and Dynamik indices, editions 2013–2017); resident-register (EWR) data as context inputs | The official social monitor (MSS), editions 2013–2025 |
| **Stack** | Hadoop · Hive SQL · Java · R · Weka | dbt · DuckDB · Python (scipy, scikit-learn) — free, open, local-first |
| **Grain** | Planungsraum (about 7,000 residents on average) | Same, plus coarser scales for robustness checks |
| **Scope** | One-shot analysis | Ongoing public statistics site, Berlin now, more cities later |

The original thesis repository is left untouched as the historical record; Gentriduck is a
from-scratch rebuild from open sources only. Two methodological points matter here: the thesis
blended everything into one score, while this project keeps **what we're trying to explain** (social
status) strictly separate from **the commercial signal used to explain it** (see the
[methodology page](/methodology)); and this re-check uses the thesis's actual predictor for the
status hypotheses (H1, H2) — the **Offering Advantage**, a location quotient of how over- or
under-represented a category of shops, services or public facilities is in a given area, as the thesis computed it — rather than a
plain POI count. The timing hypotheses (H3a–c) use growth in commercial businesses only (shops,
gastronomy, services, entertainment).

## The eight hypotheses, then and now

**How the re-test works.** Every hypothesis was re-tested in 2026 with a design fixed in advance
([pre-registered](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/354-355-hypothesis-suite-preregistration.md)),
in two periods: the thesis era (2013–2019), re-analysed with current methods, and 2019–2025. Each
hypothesis has one main test per period. A result counts only if it is statistically significant
after a Benjamini–Hochberg correction across the eight main tests of its period: within a period,
this bounds the expected share of false claims among the results marked significant; it does not
protect each result individually. Confidence intervals resample whole district regions
(Bezirksregionen), so neighbouring planning areas are not treated as independent. The timing tests
use two starting points per period, allow for an area's starting level, and count commercial
businesses only.

**What "status" means here.** Social status as measured by Berlin's Monitoring Soziale
Stadtentwicklung: unemployment, welfare receipt and child poverty. For *change* we say "change in
officially measured disadvantage". It can fall for many reasons besides gentrification: jobs,
children growing older, new-build residents, refugee accommodation closing, or benefit rule changes.
Our change measure is a continuous score built from the same three indicators. Its rank agreement
with the official three-class Dynamik ordering is about 0.7, which is 95–100% of the highest
agreement any continuous score can reach, because most areas share one class. That also means the
0.8 agreement we set in advance could not be reached in any edition and was missed. Where the score
and the classes disagree, we report both.

```sql suite_cells
-- #354 phase C: one row per (panel, hypothesis), read from the committed results CSV via the
-- gentriduck_findings source (primary rows only; no raw verdict column). The CASE maps the CSV's
-- "Holds?" field (`holds`, findings §1 italics) to the plain-word labels of domain sign-off §5.
-- An unrecognised `holds` value yields NULL (a blank cell), never the raw string or verdict.
-- A compact estimate is appended only for "Holds" rows, as in domain §5's table: AUC for the
-- out-of-fold-AUC rows (H1), Spearman rho otherwise (H1b); 2 decimals, straight from `estimate`.
select
    city,
    panel,
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER'
```

```sql suite_table
-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs,
-- findings §6 / domain §5) are the domain sign-off §5 text; the two right-hand columns come from
-- suite_cells above.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix', 'Supported'),
        (2, 'H1a', 'Areas with many cafés have higher status', 'Undecided'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status', 'Supported'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows', 'Tentatively supported'),
        (8, 'H3c', 'Both change in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    te.cell as thesis_era,
    mo.cell as modern
from hyp h
left join ${suite_cells} te on te.hypothesis = h.hypothesis and te.panel = 'thesis-era'
left join ${suite_cells} mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order
```

```sql suite_run
-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select string_agg(distinct run_sha, ', ') as run_sha from ${suite_cells}
```

<DataTable data={suite_table} rows=8 sortable=false downloadable=false wrapTitles=true formatColumnTitles=false>
    <Column id=hypothesis title="#"/>
    <Column id=plain title="Hypothesis" wrap=true/>
    <Column id=thesis_words title="2018 thesis (its own verdict, Tabelle 6-16)" wrap=true/>
    <Column id=thesis_era title="Thesis era 2013–2019, re-analysed with current methods" wrap=true/>
    <Column id=modern title="2019–2025" wrap=true/>
</DataTable>

The thesis-era column re-uses the thesis's own data, so it is not an independent replication. A
difference between the two right-hand columns reflects era *and* method (boundaries, status measure,
map completeness), not a measured change in Berlin. The two right-hand columns are read directly from
the committed [results table](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv)
(run <Value data={suite_run} column=run_sha/>); AUC and ρ are the main test's estimate.

**Reading the labels.** *Holds*: the re-test finds the thesis's supported result again. *Still
unclear*: the thesis was undecided, and the re-test cannot decide either. *Rejected, as in 2018*: the
thesis rejected it, and the re-test finds no effect either. *Not reproduced*: the thesis's tentative
support does not show up. *Opposite direction*: a significant link the other way from the hypothesis,
which the thesis had left undecided.

### Each hypothesis in a sentence

<Details title="H1: social status and the local business mix">

The local business mix tells better-off and worse-off planning areas apart better than chance,
modestly. The full model also includes public facilities, some of which are placed *because* of need
(social services, for example), so this is an association, not a signal of where an area is heading.

</Details>

<Details title="H1a: cafés">

Café share of the gastronomy mix shows no link. As in the thesis, cafés per resident go slightly with
lower disadvantage (an exploratory check).

</Details>

<Details title="H1b: fast food's share of the gastronomy mix">

Among neighbourhoods with at least ten gastronomy outlets (about half of all planning areas), fast
food makes up a larger **share** of the gastronomy mix where officially measured disadvantage is
higher. The number of fast-food outlets per resident shows no clear link. This is an area-level
pattern, in line with research on fast food and deprivation (Pearce et al. 2007, New Zealand). We
could not test whether this depends on one type of outlet, because the map data does not tell them
apart.

</Details>

<Details title="H1c: sport and leisure facilities">

The 2018 thesis rated H1c as undecided. Its correlations between sport and leisure facilities and the
official status index were very small and of mixed sign. At planning-area level, more facilities went
slightly with lower official status; at district-region level, the population-weighted count went
slightly with higher status. The thesis text describes the planning-area result as in line with the
hypothesis; under the index's own sign convention it is not. The "undecided" verdict is unaffected.
In OpenStreetMap this category is mostly public playgrounds and table-tennis tables, which are
provided where many families live, including large estates. Our check on organised sport
facilities alone had too little data to report.

</Details>

<Details title="H2: today's mix and the next change">

Today's mix of shops, services and public facilities is only weakly linked to how officially measured
disadvantage changes over the next two years (AUC about 0.61, "poor"). An area's current level
predicts that change better on its own, and adding the mix adds nothing. The link is negligible or
absent when the question is narrowed to the roughly one area in ten that the official monitor classes
as worsening. This matches the 2018 thesis, which read its own H2 association as a spurious
correlation running through the current status level.

</Details>

<Details title="H3a, H3b, H3c: which comes first?">

We find no detectable ordering in either direction. Business change did not measurably come before
change in officially measured disadvantage, nor the other way round, and they did not measurably move
together within the same period (all main-test effects negligible, |ρ| ≤ 0.06). This holds for both
eras and for each starting point separately. On the official classes, one of the many secondary
checks came out weakly the other way for H3b in the thesis era (ρ 0.10); about 4–5 such checks are
expected by chance, so we do not read it as a finding. It rules out a strong ordering, not a small one.
Every window contains shocks and rule changes (pandemic, refugee arrivals entering the benefit
statistics in 2016–18 and 2022, the 2023 Bürgergeld reform).

</Details>

### Reading the two right-hand columns

- **Not like-for-like.** The two periods use different planning-area boundaries (before and after
  Berlin's 2021 redraw, so no area is followed across it), different status measures for H1–H1c (the
  thesis's own December 2016 status index; a composite of the 2025 monitor), indicator definitions
  that changed in between, and different OpenStreetMap completeness. A difference between the columns
  is a difference between eras *and* methods, not a measured change in Berlin.
- **The thesis column shows words only.** The thesis's AUCs come from coarser areas, a different
  validation scheme and the best of about 19 algorithms, so they cannot be compared with the
  re-test's and are not shown.
- **Hamburg:** the same eight hypotheses have also been re-tested on Hamburg, as an out-of-sample
  transfer test rather than a replication, with its own monitor, grain and windows; see the
  [Hamburg thesis re-check](/hamburg/thesis-recheck). For a comparison of the two cities on matched
  areas, shared indicators and the same years, see
  [Berlin vs Hamburg, like for like](/berlin-vs-hamburg).

## Corrections

**Correction (November 2026, #354).** Earlier versions of this page reported that, on Berlin's
social monitor for 2021–2025, a fall in officially measured disadvantage came before commercial
change (H3b). That came from a simpler test: one time window, no allowance for an area's starting
level, and all mapped objects rather than businesses. A re-test whose design was fixed in advance
does not reproduce it, for 2021–2025 or for the thesis era. We now report H3b as "not reproduced".

The same re-test changes two rows in the other direction. **H1 now holds**: earlier versions reported
it as "not reproduced by a single-number proxy", because the thesis's multi-feature test had not been
re-run. **H2 on the 2021–2025 monitor** moves from "supported" to "explained by current status
level". Earlier editions of this page also called the overall result a clean replication; the
October 2026 entry below explains why that was wrong.

Earlier corrections, kept for the record:

- **Method correction (October 2026).** Earlier editions reported H3a and H3b from a test that
  computed the *same* correlation for both directions, so it could never tell them apart, and counted a
  result as "passing" whenever its sign matched, even when it was indistinguishable from noise. The
  test was changed to a cross-lagged design that requires significance. The thesis's own verdicts were
  also misreported here: it found H2 and H3c inconclusive, rejected H3a, and supported H3b only
  tentatively (thesis Tabelle 6-16).
- **Data correction (October 2026).** Shops and services deleted from OpenStreetMap had been kept in
  every later year by an extraction bug, inflating counts by up to about a fifth and making commercial
  growth look stronger than it was. All results here use the corrected data.
- **Data correction (2026-07-09, #200):** the H1 (OA) test's sample was previously understated
  (n=92 instead of the correct n=435) by an area-code join bug that silently dropped most PLRs;
  fixing it changed the H1 (OA) result from "not significant either way" to "statistically
  significant, in the direction opposite the thesis's prior" — a more decisive, not a more
  favourable, finding. No other hypothesis in this table was affected. (After the October 2026
  deletion fix the sample is n=433.) That single-number test is no longer how H1 is tested; see the
  November 2026 entry above.

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
  // alone (no `colorPalette` prop, see the <PolygonMap> below; #351 replaced AreaMap).
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
pages, which are built on today's boundaries. Hover an area for its name and dynamism score. One
Bezirksregion, Forst Grunewald (the forest in the south-west), has a boundary but no index value in
this snapshot, so it is drawn with grey hatching ("No data"); that is missing data, not a score.

## What still matters for social science today

For the **current** picture these hypotheses take a back seat to the live typology on the
[home page](/). But three threads remain genuinely interesting:

- **Fast food's share of the gastronomy mix (H1b).** In both periods, among neighbourhoods with at
  least ten gastronomy outlets, fast food makes up a larger share of the gastronomy mix where
  officially measured disadvantage is higher, a moderate effect. It is an area-level pattern, read as
  a deprivation hypothesis, not a statement about any outlet or its owners; the number of fast-food
  outlets per resident shows no clear link.
- **The timing question (H3a–c).** With a design that separates the two directions, we find no
  detectable ordering in either direction, in either era. That rules out a strong ordering, not a
  small one, and every window contains shocks and rule changes.
- **The thesis's own caution about H2.** An area's current level predicts the next change in
  officially measured disadvantage better on its own, and adding the mix of shops, services and public
  facilities adds nothing. This matches the 2018 thesis, which read its own H2 association as a
  spurious correlation running through the current status level.

## Honest caveats

- Significance is corrected across the eight main tests of each period (Benjamini–Hochberg). The
  many secondary and sensitivity checks in the
  [findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1b-berlin-hypothesis-suite-findings.md)
  are not corrected: of about 90 such checks, about 4.5 would come out significant by chance alone,
  so they are context, not verdicts.
- All analysis is at the aggregate planning-area level. Nothing here says anything about an individual
  person, household, or building (the ecological fallacy).
- These are associations. Nothing here shows that commercial change causes change in officially
  measured disadvantage, or that anyone was displaced.
- MSS and OSM measure different things on different schedules; a difference between them is a
  measurement story as much as a real-world one.
- Every result counts places mapped as points in OpenStreetMap; places mapped as building outlines or
  areas are not yet counted ([#337](https://github.com/dhelweg/gentriduck/issues/337)), and mapping
  completeness grew over both periods.
- There is no open small-area source on refugee accommodation, so its effect on the benefit-based
  indicators is disclosed, not corrected.
- **The resident-register (EWR) panel is outside this re-test.** Its earlier results remain
  documented in the
  [E1 regression findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1-regression-findings.md), §4.
- Reproducing a 2018 result is a directional check, not a number-for-number replay — see the
  [Epic B framing](https://github.com/dhelweg/gentriduck/blob/main/docs/PROJECT_PLAN.md) for why.

## Further reading

- [Berlin hypothesis-suite findings (#354)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1b-berlin-hypothesis-suite-findings.md) — the full results behind the table above, including every secondary and sensitivity check
- [The 2018 thesis, re-tested on Hamburg](/hamburg/thesis-recheck) — the same eight hypotheses as an out-of-sample transfer test on Hamburg, side by side with the thesis and Berlin today (#355)
- [Berlin vs Hamburg, like for like](/berlin-vs-hamburg) — the thesis hypotheses in both cities on matched areas, shared indicators and the same years, with a tested city difference for each (#371)
- [Pre-registration](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/354-355-hypothesis-suite-preregistration.md) — the design fixed before the results were computed, including what the results must not be used to claim (§9)
- [Results table (CSV)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv) — every row, machine-readable
- [Epic B milestone write-up](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/O4-milestone-B-narrative.md) — the original signed-off revival findings; its hypothesis results predate the November 2026 re-test
- [E1 regression findings (OA-A.4, Run 1)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1-regression-findings.md) — the earlier single-test results this page reported until November 2026
- [OA direct validation vs. the 2018 golden (OA-A.3)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-b/A3-oa-validation-findings.md) — confirms the recomputed Offering Advantage matches the thesis's own numbers directionally
- [Faithful vs improved methodology comparison](/methodology#7-faithful-vs-improved--a-methodology-comparison) — does curating which business types count sharpen the signal? (OA-C.2, now §7 of the methodology page)
- [Methodology & data sources](/methodology) — what the current index measures and how it differs from the 2018 original
- [Home page](/) and [maps](/berlin/maps) — the current, live picture of Berlin
- [About this project](/about) — curious who rebuilt this and why? The origin story and the team (human and AI) behind this re-check
- [github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck) — all code, models, and decisions

---

<FooterNav />

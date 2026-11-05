---
title: Berlin vs Hamburg, like for like
sidebar_position: 13
---

<!--
  #371 (E1c) page: the matched Berlin-Hamburg comparison of the thesis hypotheses.
  Results: docs/epic-e/E1c-matched-comparison-findings.md (generated) from
  docs/epic-e/matched-comparison-results.csv (+ matched-comparison-metadata.json). Design:
  docs/methodology/371-matched-comparison-preregistration.md (Revisions 1-3, Amendment 4 with
  revision 1, Amendment 5 with its correction note). Gate: the #371 results sign-offs,
  docs/epic-e/371-results-geo-signoff.md and docs/epic-e/371-results-domain-signoff.md.

  BINDING WORDING (domain sign-off §3, geo sign-off R1-R3):
  - The page lead is the domain §3 binding headline sentence, verbatim (Hero lede).
  - The five domain §3 supporting sentences, verbatim, in "What the comparison shows"; the Berlin
    H2 sentence (bullet 3) is also placed in the Berlin H2 cell itself (domain O2).
  - The R7 and E9 page wordings and the R1 scale caveat, verbatim, in "Read this first".
  - Every X8 "no difference detected" whose MDD is above the pre-registered threshold (0.30 rho,
    0.10 AUC) carries "too imprecise to say the cities agree (MDD x > t)" in the cell (geo R1).
    The rule is evaluated from the CSV's `mdd` and `estimator`, so H3c (MDD 0.213) and the N3
    city difference (0.280) carry no such note, as the sign-offs require.
  - Flags never render as bare tokens (domain R1, geo R2). Each flag is shown as the check that set
    it, plus its meaning, derived from the rows under the pre-registered A5.1 / §6.5 rules: for
    the A5.1 flips, "(sign unstable around zero)" when the primary and the sensitivity are both
    non-significant (unadjusted, p_boot >= 0.05), otherwise "(unadjusted significance change)",
    the same labels the regenerated findings use (2e818492);
    for `maup_flip` (sign-only, A5.1 scope F1), "sign unstable around zero" when the matched and
    the fine-grain estimate are both non-significant, otherwise "grain-dependent, MAUP".
    `ewr_2022_interpolated` is a disclosure, not a flip: it is explained once (legend + methods
    box), not per cell. `w2_only` on the X8 H2 row points to the D6 note, which sits with the
    W2-only exploratory row (geo R3), not on the primary row.
  - Must-not list (domain §3, PR §10, findings §7.7): no "same"/"different" cities claim, no level
    ranking of the cities (no U/T/C or K levels are shown at all), no fast-food marker reading, no
    forecasting framing, no "ordering refuted", no "N1 not supported" (O3: "could not be tested at
    this grain"), no Hamburg Gebiet named, no Dynamik claim, no S1/S7, nothing about protection
    zones, and no count of significant exploratory rows.

  DATA. Every verdict, estimate, CI, MDD and flag comes from the CSV through the
  `gentriduck_findings.matched_comparison` source (no notes column, no "Holds?" column). Verdicts
  map to plain words; an unrecognised verdict yields a blank cell, never the raw string. The
  hand-written sentences are the signed-off text for the binding run (run_sha 14d20548b5be); each
  is shown only while the rows still carry the result it was written for (the `guards` query), so a
  regenerated CSV with a different result replaces it with a "being updated" note instead of
  keeping a stale sentence. The guards check verdicts, not run_sha, because a wording-only
  regeneration changes run_sha with byte-identical estimates (the sign-off wording round,
  run_sha 635166279667, changed only run_sha and one notes cell; verified column by column).

  Not methodology-bearing as a page change: no statistic is computed or altered here.
-->

```sql mc_shown
-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))
```

```sql mc_checks
-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from ${mc_shown}
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window
```

```sql mc_cells
-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from ${mc_shown} s
    left join ${mc_checks} c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits with the verdict.
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9">In Berlin, the business mix gave a weak hint of which areas fell behind in 2021–2023 only. It disappears without the welfare-receipt indicator and adds nothing to knowing how disadvantaged an area already was. That period coincides with refugees from Ukraine entering basic income support (Grundsicherung), so we do not read it as an effect of local businesses.</span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base
```

```sql mc_hyp
-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas with many cafés have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)
```

```sql thesis_side_by_side
select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg
from ${mc_hyp} h
left join ${mc_cells} be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join ${mc_cells} hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
where h.hypothesis not like 'N%'
order by h.sort_order
```

```sql thesis_differences
select h.sort_order, h.hypothesis, h.plain, d.delta_ci, d.mdd_txt, d.cell as result
from ${mc_hyp} h
left join ${mc_cells} d on d.hypothesis = h.hypothesis and d.city = 'BER-HH' and d.family = 'X8'
where h.hypothesis not like 'N%'
order by h.sort_order
```

```sql new_hypotheses
select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg,
    case when d.delta_ci is not null then 'Δ ' || d.delta_ci || ', MDD ' || d.mdd_txt || '<br>' else '' end
    || d.cell as difference
from ${mc_hyp} h
left join ${mc_cells} be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join ${mc_cells} hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
left join ${mc_cells} d on d.hypothesis = h.hypothesis and d.city = 'BER-HH'
where h.hypothesis like 'N%'
order by h.sort_order
```

```sql guards
-- Each hand-written sentence is shown only while the rows still carry the result it was written
-- for (see the header comment). x8_differs feeds the statement-rule line (domain O1).
select
    (select count(*) from ${mc_shown} where family = 'X8') = 8
        and (select count(*) from ${mc_shown}
             where family = 'X8' and verdict <> 'NO DIFFERENCE DETECTED') = 0 as lead_ok,
    (select count(*) from ${mc_shown}
     where family = 'T8' and hypothesis in ('H1a', 'H1b') and verdict = 'SUPPORTED') = 4 as s1_ok,
    (select count(*) from ${mc_shown}
     where family = 'T8' and hypothesis in ('H3a', 'H3b', 'H3c')
       and verdict = 'NOT SIGNIFICANT') = 6 as s2_ok,
    (select count(*) from ${mc_shown}
     where city = 'BER' and family = 'T8' and hypothesis = 'H2' and verdict = 'SUPPORTED') = 1 as s3_ok,
    (select count(*) from ${mc_shown}
     where city = 'BER' and family = 'T8' and hypothesis = 'H1c' and verdict = 'CONTRADICTED') = 1 as h1c_ok,
    (select count(*) from ${mc_shown}
     where family = 'X8' and hypothesis = 'H2' and flags like '%w2_only%') = 1 as w2_note_ok,
    (select count(*) from ${mc_shown} where family = 'X8') as x8_n,
    (select count(*) from ${mc_shown} where family = 'X8' and verdict = 'DIFFERS') as x8_differs,
    (select string_agg(distinct run_sha, ', ') from ${mc_shown}) as run_sha
```

<script>
  // #371: hand-written sentences are guarded by the rows they describe (see the header comment).
  $: g = guards?.[0] ?? {};
</script>

{#if g.lead_ok}

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Berlin vs Hamburg, like for like" lede="Compared like for like (neighbourhoods of similar size, the same three indicators of poverty and unemployment, the same years and the same map data), Berlin and Hamburg show no detectable difference in how the local mix of shops and services relates to neighbourhood disadvantage. The comparison can only pick up large differences, so this does not mean the two cities are the same." />

{:else}

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Berlin vs Hamburg, like for like" lede="The eight hypotheses of the 2018 thesis, tested in Berlin and Hamburg on matched areas, shared indicators and the same years. This summary is being updated after a re-run of the analysis; the tables below show the current results." />

{/if}

The [Berlin](/thesis-recheck) and [Hamburg](/hamburg/thesis-recheck) re-checks of the 2018
thesis each use their own city's monitor, area size and years, so they cannot be set against each
other directly. This page puts the two cities on one footing instead: areas of similar size, the
same three indicators, the same editions and the same map data. It then tests, hypothesis by
hypothesis, whether the link between the local business mix and neighbourhood disadvantage shows a
detectable city difference.

## What the comparison shows

{#if g.s1_ok}

- In each city, areas where cafés make up a larger share of local businesses tend to be less
  disadvantaged, and areas where fast-food outlets do tend to be more disadvantaged. This describes
  where businesses are today. It does not mean that cafés improve an area or that fast-food outlets
  signal a problem: which businesses can survive depends largely on local incomes, rents and
  passing trade.

{/if}

{#if g.s2_ok}

- In neither city did changes in the business mix come before changes in measured disadvantage, or
  follow them, between 2019 and 2025. The areas compared have 15,000–26,000 residents, so changes
  at street or block level may not show up at this scale.

{/if}

{#if g.s3_ok}

- In Berlin, the business mix gave a weak hint of which areas fell behind in 2021–2023 only. It
  disappears without the welfare-receipt indicator and adds nothing to knowing how disadvantaged an
  area already was. That period coincides with refugees from Ukraine entering basic income support
  (Grundsicherung), so we do not read it as an effect of local businesses.

{/if}

- The years covered include the pandemic, the arrival of refugees from Ukraine and the 2023 benefit
  reforms. These moved the official indicators in both cities, but not always through the same
  indicator or at the same time.
- These results describe patterns in official statistics and open map data. They are not forecasts
  and cannot be used to identify neighbourhoods that will gentrify.

{#if !(g.s1_ok && g.s2_ok && g.s3_ok)}

Some sentences of this summary are being updated after a re-run of the analysis; the tables below
show the current results.

{/if}

## Read this first

- **Welfare receipt.** Welfare receipt is measured slightly differently in the two cities:
  Berlin's figure, derived from two published indicators, includes social assistance (mainly older
  and disabled people); Hamburg's includes asylum-seeker benefits. A city difference is only stated
  if it also appears without this indicator.
- **Refugee accommodation in Hamburg.** In Hamburg, the welfare indicator includes asylum-seeker
  benefits. Where the city opens or closes refugee accommodation, an area's figure can change by
  tens of percentage points without any change among its existing residents. Such changes show
  where accommodation was placed. We do not read them as neighbourhood decline or improvement.
- **Scale.** The areas compared (15,000–26,000 residents) are coarser than the scale at which
  gentrification is usually observed, so a null result here does not rule out a process at
  neighbourhood scale.
- **Within-city scores.** The disadvantage score is standardised within each city, so it ranks
  areas within a city only. A Berlin and a Hamburg area with the same score are not equally
  disadvantaged, and this page does not compare the cities' levels.
- **Change is not either city's official trend.** The change measure here is built from the three
  shared indicators. It is not either city's own published change classification.

## The thesis hypotheses in each city

Each city is tested on its own, with the same design. A result counts as supported or opposite only
if it is significant after a Benjamini–Hochberg correction across the city's eight tests. ρ is a
rank correlation with the disadvantage score (positive: goes with more disadvantage); AUC says how
well the mix tells areas apart (0.5 is chance). Brackets give the 95% confidence interval.

<DataTable data={thesis_side_by_side} rows=8 sortable=false downloadable=false wrapTitles=true formatColumnTitles=false>
    <Column id=hypothesis title="#"/>
    <Column id=plain title="Hypothesis" wrap=true/>
    <Column id=berlin title="Berlin (143 Bezirksregionen)" contentType=html wrap=true/>
    <Column id=hamburg title="Hamburg (99 Stadtteile)" contentType=html wrap=true/>
</DataTable>

{#if g.h1c_ok}

**Berlin H1c, read carefully.** In Berlin, where sport and leisure make up a larger share of all
mapped places, measured disadvantage tends to be higher. That share rises where few shops and
services are mapped, so the result is about the mix of mapped places, not about sports provision
as such.

{/if}

## City differences, tested

For each hypothesis, the test compares Berlin's estimate with Hamburg's: Δ is Berlin's minus
Hamburg's. The MDD is the smallest difference the comparison could reliably detect (2.8 times its
standard error). "No difference detected" is never "the same": where the MDD is larger than 0.30
(ρ) or 0.10 (AUC), the comparison is too imprecise to say the cities agree.

<DataTable data={thesis_differences} rows=8 sortable=false downloadable=false wrapTitles=true formatColumnTitles=false>
    <Column id=hypothesis title="#"/>
    <Column id=plain title="Hypothesis" wrap=true/>
    <Column id=delta_ci title="Δ Berlin − Hamburg [95% CI]" wrap=true/>
    <Column id=mdd_txt title="MDD" wrap=true/>
    <Column id=result title="City difference" contentType=html wrap=true/>
</DataTable>

**Statement rule, fixed in advance.** A city difference is stated only if it shows up in this main
test, holds up without areas under 5,000 residents and without the welfare-receipt indicator, and
points the same way with Berlin's uncorrected welfare indicator. {#if g.x8_n === 8 && g.x8_differs === 0}None of the eight comparisons gives a difference in the main test, so no city difference is stated.{:else}<Value data={guards} column=x8_differs/> of the <Value data={guards} column=x8_n/> comparisons are flagged in the main test; see the findings for which of them pass the rule.{/if}

{#if g.w2_note_ok}

**H2, 2021–2023 window only (exploratory).** Run on this window alone, without correction for
multiple testing, the comparison test is flagged. That is not a city difference: in this window
Hamburg's estimate is below chance, so the test only registers Berlin's weak 2021–2023 hint (see
Berlin H2 above) against nothing usable on the Hamburg side (pre-registration Amendment 3, D6). The
window coincides with refugees from Ukraine entering basic income support in June 2022, which did
not enter both cities' indicators through the same route. The main comparison, over all three windows, detects
no difference.

{/if}

## Three new hypotheses

Pre-registered for this comparison: N1 and N2 are confirmatory in each city (corrected across the
city's N tests), N3 is exploratory, and the city differences for N1–N3 are exploratory and
uncorrected. These are ordering tests, not warning, forecasting or investment indicators.

<DataTable data={new_hypotheses} rows=3 sortable=false downloadable=false wrapTitles=true formatColumnTitles=false>
    <Column id=hypothesis title="#"/>
    <Column id=plain title="Hypothesis" wrap=true/>
    <Column id=berlin title="Berlin" contentType=html wrap=true/>
    <Column id=hamburg title="Hamburg" contentType=html wrap=true/>
    <Column id=difference title="City difference" contentType=html wrap=true/>
</DataTable>

N1 is about the more disadvantaged half of neighbourhoods in each city, which mixes very different
kinds of area; it is not about gentrifying areas. In Berlin, N1 could not be tested at this grain:
the areas above the median fall into too few of the spatial blocks used for the confidence
intervals.

**Reading the checks.** Each result was also re-run with one change at a time. A check is listed
under a result only where it moved that result. *Sign unstable around zero*: the estimate changes
sign, but is not statistically significant in either version, so it is not a substantive change.
*Unadjusted significance change*: significant before correction in one version and not in the
other. *Grain-dependent, MAUP*: the result depends on the size of the areas (the modifiable areal
unit problem). No check can change a verdict, and a check is not a finding on its own. Berlin's
uncorrected welfare indicator, for example, counts unemployment twice in the disadvantage score,
which is why the corrected one is used for every verdict.

The tables are read directly from the committed
[results table](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/matched-comparison-results.csv)
(run <Value data={guards} column=run_sha/>).

<MethodsBox title="How the comparison works">

- **Matched grain.** Berlin Bezirksregionen (BZR, 143) and Hamburg Stadtteile (99): areas of
  roughly 15,000–26,000 residents and 4–6 km². Each is built up from the city's smaller areas
  (Berlin planning areas, Hamburg statistical areas), weighted by residents.
- **Harmonised core.** The same three indicators in both cities: unemployment, welfare receipt and
  child poverty. Berlin's welfare figure is re-based to all recipients (T\*), so that both cities
  weigh unemployment the same way. The remaining differences in what each figure counts are
  disclosed above.
- **Same years.** The 2019, 2021, 2023 and 2025 editions of each city's social monitor, with the
  same reference dates and three two-year windows, and the same OpenStreetMap snapshots and
  business categories. Berlin's end-2022 population, used as weights, is interpolated between
  2020 and 2024, as fixed in advance.
- **Spatial block bootstrap.** Confidence intervals resample 24 blocks of neighbouring areas per
  city (1,999 draws), so neighbours are not treated as independent. Benjamini–Hochberg corrects
  across each city's eight tests and across the eight city comparisons.
- **Hamburg 2019 base revised by the publisher.** Hamburg's 2019 welfare figures come from an S3
  base revised by the publisher (a change in how asylum-seeker benefits are counted, Hamburg
  Sozialmonitoring report 2021). The comparison uses the revised base; the figures as first
  published are a check.
- **Fixed in advance.** The design, the checks and this page's statement rule were registered
  before the results were computed:
  [pre-registration](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/371-matched-comparison-preregistration.md),
  [data checks](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/371-data-checks.md),
  [findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1c-matched-comparison-findings.md).

</MethodsBox>

## Honest caveats

- With about 100–143 areas per city, the comparison can detect only large differences between the
  cities.
- OpenStreetMap is not mapped equally completely everywhere, nor equally in both cities, so the
  business mix is captured more fully in some areas than in others.
- All analysis is at the level of areas. Nothing here says anything about an individual person,
  household, business or building.
- These are associations. Nothing here shows that commercial change causes change in officially
  measured disadvantage.
- The many secondary and sensitivity checks in the findings are not corrected for multiple testing,
  so they are context, not verdicts.

## Further reading

- [The 2018 thesis, re-checked](/thesis-recheck) — the Berlin re-test in full, on Berlin's own planning areas and monitor
- [The 2018 thesis, re-tested on Hamburg](/hamburg/thesis-recheck) — the Hamburg transfer test on Hamburg's own statistical areas and monitor
- [Matched comparison findings (#371)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1c-matched-comparison-findings.md) — every primary, secondary and sensitivity row behind this page
- [Pre-registration](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/371-matched-comparison-preregistration.md) — the design fixed in advance, including what the results must not be used to claim (§10)
- [Data checks](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/371-data-checks.md) — how the two cities' indicators were checked and aligned
- [Results table (CSV)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/matched-comparison-results.csv) — every row, machine-readable
- [Methodology & data sources](/methodology) — what the site's index measures, city by city

---

<FooterNav />

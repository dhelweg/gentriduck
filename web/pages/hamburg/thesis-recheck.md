---
title: The 2018 thesis, re-tested on Hamburg
sidebar_position: 6
hide_breadcrumbs: true
---

<!--
  #355 (page part): the Hamburg thesis-recheck page that pre-registration §7.2 asks for ("a Hamburg
  recheck page with columns thesis (Berlin 2018) / Berlin today / Hamburg full chain / Hamburg
  pivot 2022, so the era difference is visible"). Results: docs/epic-h/H-thesis-hypothesis-suite-
  findings.md (generated, run_sha 1ed46268d3ed); gate: docs/epic-h/355-geo-signoff.md (Verdict:
  PASS, condition (c) binds this page to its §7) and docs/epic-h/355-domain-signoff.md (Verdict:
  PASS after the C1-C4 re-check).

  BINDING WORDING. The page follows the "Addendum (2026-11-01)" reconciliation table in
  docs/epic-h/355-domain-signoff.md, which supersedes both sign-offs' earlier per-row text:
  - Column header "Matches Berlin 2018?" for both Hamburg columns. The H1 family (H1, H1a-c) is one
    2025 cross-section shared by both panels, so it is shown once: the pivot-2022 column says
    "Same test" instead of repeating it (and only does so while the two panels' labels agree; if
    they ever differed, the pivot cell would show its own label instead).
  - H1 / H2 Hamburg cells: HARD-CODED from the Addendum (geo-DS §7 text), overriding the CSV label
    (the CSV says "not reproduced at the corrected threshold (nominally significant)" for H1 and
    "consistent (still unclear)" for H2; the agreed page text replaces both with "Not comparable",
    because no business category passes the A1.1 feature rule at Gebiet grain). The lead line is
    structural and always shown; each result sub-line is shown only while the CSV still carries the
    `holds` value the Addendum was written against, so a regenerated CSV with a different result
    blanks the sub-line instead of keeping a stale sentence. The H2 sub-line names transport and
    public facilities only (H2 has no tourism feature: findings §4, domain §2/§13 C1); the
    Addendum's "...found no transferable prediction" leaves the start of that sentence open.
  - H1a cell label "Stronger than thesis (tentative)"; H1a/H1b/H1c/H3 per-row sentences are the
    Addendum text (geo-DS §4/§7 plus the domain's additions) -- see the <Details> blocks.
  - Above the table: the domain §5 construct paragraph (binding), which already contains the
    geo-DS "Always" line (agreement is not proof of the same mechanism), so that line is NOT
    repeated. Corrections: the domain §5 E5 supersession note, verbatim.
  - Not on the page (Addendum): the H2 "classed as improving" secondary.
  - Never on the page (pre-registration §9, findings §13, domain §5 "must not appear"): "not
    reproduced" for Hamburg H1/H2, "shops"/"services"/"businesses"/"business mix" for Hamburg H1/H2
    (outside the binding construct paragraph, which says they are too sparse to measure), "pressure"
    for Dynamik, "Hamburg confirms Berlin", any thesis AUC, causal or displacement language.

  DATA. Labels and estimates are read from the committed results CSV through the existing
  `gentriduck_findings.thesis_hypothesis_suite` source (primary rows only; the raw `verdict`
  column is not selected there and never reaches this page). `holds` is mapped to plain-word
  labels; an unrecognised `holds` value renders a blank cell. The "Berlin today" column uses the
  same BER/modern rows and the same mapping as /thesis-recheck. The hypothesis wording and thesis
  column (words only, no AUC) are the domain §5 Hamburg table text. The per-row sentences are the
  agreed text at run_sha 1ed46268d3ed and must be re-checked if the Hamburg rows are regenerated.
  #355 page review (web low 1): the per-row <Details> blocks render only while the CSV's Hamburg
  run_sha equals that signed-off run (SIGNED_OFF_HH_RUN in the script block); otherwise a one-line
  "being updated after a re-run" note replaces them.

  #355 page review fixes (docs/epic-h/355c-page-geo-signoff.md C1, 355c-page-domain-signoff.md P1,
  R2): the H2 below-chance line now says "each of the five held-out groups of districts and in
  every time window" (5 GroupKFold folds + 4 windows, not 99 per-district results); the H1b/H1c
  "as in Berlin" carry the §4.5 qualifier in place; the construct paragraph notes that H2 uses
  transport and public facilities only. Berlin-today H1 reads "Holds (businesses, AUC ...)" here
  (domain C4/§5), on this page only.

  Not methodology-bearing as a page change: no statistic is computed or altered here; every label
  and estimate comes from the signed-off CSV, and every sentence from the signed-off Addendum.
-->

<script>
  // #353 convention: explicit breadcrumb trail (hide_breadcrumbs above) and browser-tab title.
  // #355 page review (web low 1): the per-row sentences below are the agreed text for this run
  // only. If the Hamburg rows are regenerated (different run_sha, or a mixed-run CSV), they are
  // replaced by a one-line note until the wording is re-checked; the table keeps reading the CSV.
  const SIGNED_OFF_HH_RUN = '1ed46268d3ed';
  $: perRowCurrent = suite_runs?.[0]?.hh_run_sha === SIGNED_OFF_HH_RUN;

  const crumbs = [
    { label: 'Hamburg', href: '/hamburg' },
    { label: 'Thesis re-check' }
  ];
</script>

<AreaBreadcrumbs {crumbs} />
<PageTitle title="Thesis re-check · Hamburg" />

<Hero compact eyebrow="Chapter 3 — The Evidence" title="The 2018 thesis, re-tested on Hamburg" lede="The eight hypotheses of the 2018 Berlin thesis, re-tested on Hamburg with the same design fixed in advance, and set side by side with the thesis and with Berlin today. This is an out-of-sample transfer test, not a replication." />

This page is the Hamburg counterpart of [the 2018 thesis, re-checked](/thesis-recheck), which
explains how the re-test works and reports Berlin in full. Here every hypothesis was re-tested on
Hamburg's statistische Gebiete twice: over the full chain of Sozialmonitoring editions (2013–2025,
the main test) and over 2019–2025 only (pivot 2022, an era-matched comparison with its own
correction, not a second confirmation).

## Read this first

Hamburg measures social status differently. Its Sozialmonitoring combines seven indicators: the
share of children with a migration background, children of single parents, SGB II and asylum-seeker
benefits, unemployment, children and older people on minimum income, and school-leaving outcomes.
It publishes four status classes and three change classes. A Hamburg result is an association with
that composite, not with any one indicator or group. Hamburg is an out-of-sample transfer test,
not a replication. A matching result is not evidence that the same process is at work, and a
different result is not evidence that it isn't. At Hamburg's small statistical areas (about 2,200
residents), shops and services are too sparse to measure the local mix, so Hamburg's H1 and H2 use
transport, public facilities and tourist facilities instead (H2: transport and public facilities
only).

## The eight hypotheses: thesis, Berlin today, Hamburg

```sql ber_cells
-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
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
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern'
```

```sql hh_cells
-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while `holds` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised `holds` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH'
```

```sql hh_table
-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs)
-- are the domain sign-off 355 §5 Hamburg table text. The H1 family is one 2025 cross-section in
-- both Hamburg panels (findings §1), so the pivot-2022 column shows it once as "Same test" --
-- but only while both panels carry the same label; otherwise it shows its own cell.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'Social status is linked to the local mix', 'Supported'),
        (2, 'H1a', 'Many cafés: higher status', 'Undecided'),
        (3, 'H1b', 'Larger fast-food share of the gastronomy mix: lower status', 'Supported'),
        (4, 'H1c', 'Many sport and leisure facilities: higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change first', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage first', 'Tentatively supported'),
        (8, 'H3c', 'Both in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    be.cell as berlin_today,
    coalesce(fu.cell, '') as hh_full,
    case
        when h.hypothesis in ('H1', 'H1a', 'H1b', 'H1c') and mo.cell = fu.cell
            then '<i>Same test as the full chain (one 2025 cross-section)</i>'
        else coalesce(mo.cell, '')
    end as hh_modern
from hyp h
left join ${ber_cells} be on be.hypothesis = h.hypothesis
left join ${hh_cells} fu on fu.hypothesis = h.hypothesis and fu.panel = 'full'
left join ${hh_cells} mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order
```

```sql suite_runs
-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select
    (select string_agg(distinct run_sha, ', ') from ${hh_cells}) as hh_run_sha,
    (select string_agg(distinct run_sha, ', ') from ${ber_cells}) as ber_run_sha
```

<DataTable data={hh_table} rows=8 sortable=false downloadable=false wrapTitles=true formatColumnTitles=false>
    <Column id=hypothesis title="#"/>
    <Column id=plain title="Hypothesis" wrap=true/>
    <Column id=thesis_words title="2018 thesis (Berlin, its own verdict)" wrap=true/>
    <Column id=berlin_today title="Berlin today (2019–2025)" wrap=true/>
    <Column id=hh_full title="Hamburg, full chain 2013–2025: Matches Berlin 2018?" contentType=html wrap=true/>
    <Column id=hh_modern title="Hamburg, 2019–2025 (pivot 2022): Matches Berlin 2018?" contentType=html wrap=true/>
</DataTable>

The labels, the estimates and the Berlin column are read directly from the committed
[results table](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv)
(Hamburg run <Value data={suite_runs} column=hh_run_sha/>, Berlin run <Value data={suite_runs} column=ber_run_sha/>);
AUC and ρ are the main test's estimate. The thesis column shows words only: the thesis's AUCs come
from coarser areas and a different validation scheme, so they are not set against the re-test's.

**Reading the labels.** *Holds*: the re-test finds the thesis's supported result. *Stronger than
thesis*: the thesis was undecided, and the re-test finds a significant link in the hypothesised
direction. *Opposite direction*: a significant link the other way from the hypothesis, which the
thesis had left undecided. *Still unclear*: the thesis was undecided, and the re-test cannot decide
either. *Rejected, as in 2018*: the thesis rejected it, and the re-test finds no effect either. *Not
reproduced*: the thesis's tentative support does not show up. *Not comparable*: the Hamburg test
cannot measure what the thesis tested. *Same test*: the H1 family uses one 2025 cross-section in
both Hamburg columns, so it is shown once and counts once.

### Not like-for-like

- **Different monitor.** Hamburg's seven indicators include migration background and school
  leaving; Berlin's status measure here is built from unemployment, welfare receipt and child
  poverty.
- **Different change window.** Hamburg's change classes cover three years, Berlin's two.
- **Different status measure.** Hamburg publishes classes; Berlin's re-test uses continuous
  composites.
- **Different grain.** A Hamburg statistisches Gebiet has about 2,200 residents, a Berlin
  planning area about 7,000.
- **Different era.** The Hamburg full chain covers 2013–2025, Berlin today 2019–2025; the Hamburg
  2019–2025 column is the era-matched comparison.

### Each hypothesis in a sentence

{#if perRowCurrent}

<Details title="H1: social status and the local mix">

Not comparable: no business category can be measured at Hamburg's small-area grain. A test on
transport, public and tourist facilities found no clear link.

</Details>

<Details title="H1a: cafés">

Among the roughly one in eight Hamburg statistical areas with at least ten gastronomy outlets, cafés
make up a larger share of the gastronomy mix where the Sozialmonitoring status is better (ρ −0.27, a
small effect). This is significant under the false-discovery-rate correction used for all headline
tests, but not under the stricter family-wise correction. The number of cafés per resident shows no
clear link. Treat it as tentative. Status here is Hamburg's composite index, which includes migration
background and school-leaving outcomes. Berlin's own re-test found no café link, which is not
evidence that the two cities differ.

</Details>

<Details title="H1b: fast food's share of the gastronomy mix">

Among the roughly one in eight areas with at least ten gastronomy outlets, fast food makes up a
larger share of the gastronomy mix where the Sozialmonitoring status is worse (ρ 0.42, moderate), as
in Berlin; a matching result is not evidence that the same process is at work. Status here is Hamburg's composite index as a whole (seven indicators, including
migration background and school-leaving outcomes), not any single one of its indicators. This is an
area-level pattern, not a statement about any group or business. We could not test whether it
depends on one type of outlet. It is one 2025 cross-section, so it counts once, not once per
Hamburg column.

</Details>

<Details title="H1c: sport and leisure facilities">

Opposite direction, small, as in Berlin (a matching result, not evidence of the same process): more
sport and leisure facilities go slightly with a worse Sozialmonitoring status (Hamburg's composite index, which includes migration background and
school-leaving outcomes). In OpenStreetMap these are mostly playgrounds and public table tennis,
provided where many families live.

</Details>

<Details title="H2: today's mix and the next change">

Not comparable: no business category can be measured at Hamburg's small-area grain. A test on
transport and public facilities found no transferable prediction. Over the full chain, prediction
was worse than chance in each of the five held-out groups of districts and in every time window. We
read this as no usable signal, not as an opposite effect.

</Details>

<Details title="H3a, H3b, H3c: which comes first?">

No detectable ordering between commercial change and change in officially measured disadvantage
(Hamburg's Sozialmonitoring Dynamik class), in either direction, over 2013–2025 or since 2022.
Three-year windows and a measure where most areas are 'stable' rule out a strong ordering, not a
small one. Every window contains shocks: refugee arrivals 2015–18 and 2022, the pandemic, and the
2023 benefit reforms.

</Details>

{:else}

The per-hypothesis sentences are being updated after a re-run of the Hamburg analysis; the table above shows the current results.

{/if}

## Corrections

This replaces an earlier Hamburg timing analysis (E5), which compared overlapping change windows.
Its conclusion, no ordering in either direction, is unchanged; its numbers should no longer be
cited.

## Honest caveats

- Significance is corrected across the eight main tests of each Hamburg column
  (Benjamini–Hochberg); the full chain is the main test, and the 2019–2025 column is a comparison,
  not a second confirmation. The many secondary checks in the
  [Hamburg findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H-thesis-hypothesis-suite-findings.md)
  are not corrected, so they are context, not verdicts.
- All analysis is at the aggregate level of the statistisches Gebiet. Nothing here says anything
  about an individual person, household, or building.
- These are associations. Nothing here shows that commercial change causes change in officially
  measured disadvantage, or that anyone was displaced.
- A fall in officially measured disadvantage is not the same as gentrification: it can come from
  jobs, children growing older, new-build residents, refugee accommodation closing, or benefit rule
  changes.
- Every result counts places mapped as points in OpenStreetMap, and mapping completeness grew over
  the period.

## Further reading

- [The 2018 thesis, re-checked](/thesis-recheck) — the Berlin re-test in full, including how the re-test works
- [Hamburg hypothesis-suite findings (#355)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H-thesis-hypothesis-suite-findings.md) — the full results behind the table above, including every secondary and sensitivity check
- [Pre-registration](https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/354-355-hypothesis-suite-preregistration.md) — the design fixed before the results were computed, including the Hamburg comparability statement (§4.5) and what the results must not be used to claim (§9)
- [Results table (CSV)](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv) — every row, machine-readable
- [Hamburg data hub](/hamburg) — maps, time series and area profiles for Hamburg
- [Methodology & data sources, §6](/methodology) — what is different about Hamburg's data

---

<FooterNav />

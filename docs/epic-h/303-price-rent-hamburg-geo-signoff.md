---
task: I21-i / H-price-rent / #303 — Wire Hamburg into mart_price_rent_dimension
author: geo-data-scientist
date: 2026-07-24
branch: feature/303-price-rent-hamburg-wiring
---

# Geo-DS methodology sign-off — Hamburg admission into mart_price_rent_dimension

- **Branch:** `feature/303-price-rent-hamburg-wiring`
- **Issue / task:** #303 [I21-i / H-price-rent] — admits already-signed-off Hamburg
  Wohnlage/Mietenspiegel data (from `int_hamburg_wohnlage_stadtteil` #203, and
  `int_hamburg_wohnlage_mietenspiegel` #215) into the previously Berlin-only
  `mart_price_rent_dimension`. Per the #237/#302 precedent, admission into a specific
  published mart is its own gated step, even when the underlying data already passed.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Scope of this gate:** confirm the WIRING is spatially/statistically faithful and the
  disclosures are honest — NOT to re-litigate #203/#215's methodology.
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_price_rent_brw_wohnlage_combined_hamburg.sql` (new)
  - `transform/models/marts/mart_price_rent_dimension.sql` (`combined` UNION ALL;
    `brw_group_has_signal` guard; normalization CTEs)
  - `transform/models/marts/mart_price_rent_dimension_pre2021.sql` (isolation check)
  - `transform/models/marts/schema.yml` (disclosures + `accepted_values` widening)
  - `transform/models/marts/fct_gentrification_change.sql` (formatting-only touch, confirmed)
  - Prior sign-offs: `docs/epic-h/203-hc5-geo-signoff.md` (PASS),
    `docs/epic-h/215-hc6-geo-signoff.md` (PASS)

Both prior sign-offs confirmed present and each ends `Verdict: PASS`. This wiring does not
contradict or exceed what they approved: #203 explicitly ruled against cross-city tier
remapping and #215 established the current-state (no-vintage) degenerate `MAX(edition_year)`
match and the low-N NULL guard — this admission carries all three forward unchanged rather
than inventing new alignment rules.

## a. Winsorized per-(city_code, snapshot_year) z-score normalization at Hamburg's N=104

**Sound.** The normalization is already city-year-partitioned (Berlin and Hamburg never
pool into a shared distribution), so admitting HH as its own `(HH, 2025)` group is the
correct behaviour, not a new choice. At N=104 the 1%/99% winsorization clips roughly the
single most-extreme observation in each tail before computing the mean/stddev — this is
well-behaved (N is far above the ~a-dozen floor where quantile winsorization becomes
erratic), and `stddev_pop` over 104 clipped values is a stable moment. The `wohnlage_low_n`
guard (verified in #215 to exclude <10-address Stadtteile; none currently trip it) protects
the moments from thin-signal areas. No small-N pathology; the only caveat worth carrying to
G2 is the *observational* one in (f), not a defect in the estimator.

## b. `brw_group_has_signal` NULL-guard for `brw_rank` / `brw_percentile`

**Statistically correct, and the right call — not merely code that matches its claim.**
`RANK()` / `PERCENT_RANK()` over a partition whose ordering column is entirely NULL assign
every row the same value (tied rank 1 / percentile 0.0). That output is not "lowest land
value in the city-year" — it is "no land-value signal exists at all," and the two are
semantically opposite for a rent-gap reading. NULLing the whole degenerate group is the
honest representation of *absence of evidence*. The guard keys on
`brw_weighted_avg_eur_m2 IS NOT NULL` at the *group* level, so it fires for every Hamburg
group (no BRW source) and for Berlin's pre-existing Wohnlage-only 2026 vintage, while
leaving individual NULL-BRW rows inside otherwise-populated Berlin groups (park/water PLRs)
with their genuine tied rank. This correctly distinguishes "this row has no BRW but its
peers do" (a real rank position exists) from "no row in this group has BRW" (rank is
undefined). Reasoning holds independently of the code reviewer's confirmation that populated
Berlin groups are numerically unchanged.

## c. Two-tier vs three-tier Wohnlage non-equivalence — no silent blending

**Correctly isolated.** Hamburg's `pct_gute_wohnlage` / `pct_normale_wohnlage` are carried
in their own new nullable columns, NULL for Berlin; Berlin's `pct_einfach`/`pct_mittel`/
`pct_gut` are NULL for Hamburg. I checked every downstream consumer of this mart:
`mart_price_rent_dimension_pre2021` is the only dbt-model consumer, and it selects
`where area_vintage = 'lor_2021'` — Hamburg rows are `area_vintage='current'` and are
therefore structurally excluded, so no areal-interpolation or tier-blending touches Hamburg.
No model, test, or seed averages/composites across the two tier vocabularies, and
`wohnlage_score` (the only derived value that would collapse tiers into one number) is NULL
for Hamburg by construction. The non-equivalence is thus enforced by column separation, not
just documented. The schema.yml disclosures on both column families explicitly state they
are non-comparable across cities and route cross-city comparison through the G2
non-equivalence page.

## d. `snapshot_year` = Mietenspiegel edition year as the Hamburg vintage proxy

**Reasonable and clearly labelled; no false time series implied.** Hamburg's Wohnlage side
is current-state (no edition-year dimension — established in #203/#215), so the Mietenspiegel
`edition_year` is the only genuine vintage signal available, and using it for `snapshot_year`
is transparent. Critically, this produces a *single* Hamburg group (currently `(HH, 2025)`) —
there is no fabricated multi-year Hamburg panel. `area_vintage='current'` and
`wohnlage_vintage_matched=NULL` both reinforce that no historical Hamburg series exists;
recording the Mietenspiegel year under a "wohnlage_vintage_matched" label was correctly
avoided (it would misrepresent a current-state crosswalk as a dated vintage). The schema and
header state plainly that Hamburg is current-state-only versus Berlin's
2017/2019/2021/2023/2026 vintages.

## e. MAUP / ecological-fallacy asymmetry (Stadtteil vs PLR grain)

**No new MAUP hazard introduced, and the asymmetry is disclosed.** Both cities remain
area-aggregate rows in their own city-year partitions; nothing in this mart computes a
cross-city ratio, difference, or pooled rank that would force Hamburg's coarser Stadtteil
grain (~104 units) and Berlin's finer PLR grain into a single spatial comparison. The
existing header MAUP disclosure (Openshaw 1984; the BRW-zone-vs-PLR grain mismatch) is
untouched, and the #303 header + schema now additionally state that Hamburg rows are
Stadtteil-grain. Because the per-city normalization is self-contained, the modifiable-areal-
unit exposure is confined within each city and does not leak across the union — the standard
guardrail (never compare raw z-scores/ranks across differently-tessellated cities without the
G2 disclosure) already covers this. Adequate for an admission step.

## f. Observation (non-blocking): Hamburg `est_rent_zscore` is collinear with tier share

Because Hamburg has (i) no BRW signal and (ii) a single Mietenspiegel edition with fixed
per-tier rent constants, `est_rent_mid` for a Stadtteil is an affine function of
`pct_gute_wohnlage` (`pct_gute*ms_gute + (1-pct_gute)*ms_normale`). Its winsorized z-score is
therefore a near-monotone transform of the tier share rather than an *independent* third
signal — the same linear-rescale property that justified NOT producing a 2-tier
`wohnlage_score` (#215). This is not an error (it is a legitimate modelled-rent estimate and
is honestly labelled "modelled, not observed"), but the G2 methodology page should note that
for Hamburg the rent-estimate and Wohnlage-composition signals are not statistically
independent, so they must not be presented as two corroborating dimensions. Recommendation
for Epic G2, not a blocker for this admission.

## Verdict

**Verdict: PASS.** The Berlin↔Hamburg UNION preserves per-city, city-year-partitioned
normalization (winsorized z-score sound at N=104); the `brw_group_has_signal` guard is the
statistically correct treatment of an all-NULL ranking partition; the two-tier/three-tier
vocabularies are isolated in separate nullable columns with no downstream blending (verified
against the only consumer, `_pre2021`, which excludes Hamburg by `area_vintage`); the
Mietenspiegel-edition `snapshot_year` proxy is transparent and creates no false Hamburg time
series; and no new MAUP/ecological-fallacy exposure is introduced. The disclosures in the
model header and schema.yml are honest and complete. One non-blocking G2 documentation
recommendation is logged in (f) regarding the collinearity of Hamburg's rent-estimate and
tier-share signals. No changes requested.

---
task: R-A4 / #67 — Berlin MSS indexind SES-indicator ingestion + staging
author: geo-data-scientist
date: 2026-06-19
pr: 91 (feat/67-ses-indicators)
---

# Geo-DS methodology sign-off — R-A4 (MSS `indexind` SES indicators)

- **PR:** #91 (`feat/67-ses-indicators`)
- **Issue / task:** #67 / R-A4 — MSS `indexind` (SES indicator) WFS ingestion → `stg_berlin_mss_indicators`
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `ingestion/berlin/mss/ingest_mss_indicators.py` (module docstring + parse logic)
  - `transform/models/staging/stg_berlin_mss_indicators.sql`
  - `transform/models/staging/schema.yml` (`stg_berlin_mss_indicators` block, L740–829)
  - `docs/adr/0007-berlin-ses-indicators.md`
  - Cross-reference: `docs/methodology/R-A3-geo-signoff.md` (the `indizes` outcome these inputs feed),
    `docs/methodology/indicator-semantics.md` / R-A5 (#85 sign-convention precedent)

This is methodology-bearing work (R-C1): `stg_berlin_mss_indicators` becomes the **continuous SES
predictor stack** for R-A1, the keystone re-grounding task. The assessment weights *meaning*
(indicator validity, sign/polarity, comparability across editions) over code style.

---

## a. Are the 8 indicators (4 status + 4 dynamik) semantically appropriate SES predictors for R-A1? Are they the indicators that define the MSS Status/Dynamik classes?

**Yes — and this is the strongest possible alignment available.** The four status-level indicators
captured —

| canonical | German term | role |
|---|---|---|
| `arbeitslose_anteil` | Arbeitslosigkeit nach SGB II | unemployment rate |
| `transferbezug_anteil` | Transferbezug (nicht-arbeitslose Empfänger SGB II/XII) | transfer-benefit dependency |
| `kinderarmut_anteil` | Kinderarmut (SGB-II-Transferbezug u15) | child poverty |
| `alleinerziehende_anteil` | Kinder/Jugendliche in alleinerziehenden Haushalten | single-parent-household children |

— are **by construction the four index indicators (`Index-Indikatoren`) the Berlin Senate uses to
compute the MSS Status-Index and Dynamik-Index** (SenSBW MSS 2025 report: "vier Index-Indikatoren:
Arbeitslosigkeit, Kinder/Jugendliche in alleinerziehenden Haushalten, Transferbezug, Kinderarmut").
This is exactly what ADR-0007 Decision 2 promised, and it is methodologically ideal: the SES *inputs*
and the MSS *outcome* (`stg_berlin_mss`, R-A3) are measured on the **same definitions, same vintages,
same boundaries, same source**. R-A1 will explain the Senate's own classes using the Senate's own
indicators — a tight grounding story (ADR-0004) with no definition-drift seam between X and y.

These are recognised, peer-reviewed-equivalent small-area deprivation measures (benefit receipt +
unemployment + child poverty are the canonical German *soziale Benachteiligung* battery; cf. the
MSS methodology and the wider German Sozialberichterstattung tradition). Validity as SES predictors
is not in question.

**One scope caveat (not a defect):** like the MSS itself, this battery carries **no income variable**
and no housing-cost/rent variable. ADR-0007 Consequences flags this explicitly; the fill (RSA /
Sozialatlas) is a future ADR. For R-A1 this is acceptable because the goal is alignment with the
MSS outcome, whose own definition also excludes income. I concur with that scoping. Note for the
domain expert: the four indicators are **highly collinear** (benefit receipt, unemployment, and child
poverty all load on the same disadvantage axis), so R-A1 should expect near-redundancy and treat them
as one latent SES dimension rather than four independent effects (see R-A1 guidance below).

## b. Is the long-format design appropriate for R-A1 consumption? What joins/pivots will R-A1 need?

**Yes — long format is the correct choice and matches house convention.** It mirrors the
`stg_berlin_ewr` / `int_ewr_socioeco` `(year/edition, plr, indicator, value)` contract (ADR-0003
Decision 8, ADR-0007 Decision 3) and, crucially, it **absorbs the 3→4 indicator-set change at 2023 as
data, not as a column-count break** — the `alleinerziehende_*` rows simply do not exist before 2023,
and `transferbezug_*` rows exist but carry null values pre-2023 (the `s2_x`/`d2_x` quirk). A wide table
would have forced silent back-fill or a schema fork. The grain
`(city_code, edition, area_code, indicator)` is enforced unique by
`dbt_utils.unique_combination_of_columns`, which is the right key.

**R-A1 will need a pivot to the modelling matrix.** The model wants one row per `(edition, PLR)` with
indicator columns. The consume-side shape is:

1. **Pivot** `stg_berlin_mss_indicators` from long → wide on `indicator`, keyed on
   `(city_code, edition, area_code, area_vintage)`, producing up to 8 feature columns.
2. **Join the outcome** `stg_berlin_mss` on `(city_code, edition, area_code)` **within the same
   `area_vintage`** — never across the 2019→2021 LOR break without the crosswalk (R-A3 condition C4
   applies identically here; the `area_vintage` tag is carried for exactly this).
3. **Join geometry / `dim_area`** only if a spatial feature is needed; the PLR key joins to
   `stg_berlin_lor`. Geometry is correctly dropped from this layer (ADR-0007 Decision 4).
4. **Filter uninhabited PLRs** (`indicator_value is null` for the status indicators ⇔ WFS sentinel
   −9999) before any fit — same structural-missingness rule as R-A3 condition C3.

The staging view itself is clean: a glob-driven `read_parquet(..., union_by_name=true)` with a
zero-row typed stub for graceful degradation, identical to the approved `stg_berlin_mss` pattern. No
spatial-method concerns (no CRS, distance, or areal-aggregation operations occur in this layer; the
PLR is the native grain). I confirm no MAUP/CRS issue is introduced here.

## c. Is the `s2`/`d2` (transferbezug) null in 2015–2021 a concern? Should R-A1 use only indicators available across all editions?

**It is a concern only if mishandled; the staging design handles it correctly, but R-A1 must respect
the missingness pattern.** Two distinct discontinuities are present and must not be conflated:

- **`transferbezug_*` is null in editions ≤2021** (WFS published `s2_x`/`d2_x`, always null — the
  indicator was suspended/reformatted in that span). Rows exist with `value = null`.
- **`alleinerziehende_*` does not exist before 2023** (the 4th indicator, added 2023+). No rows
  pre-2023.

The **cross-edition stable core present and populated in *all* firm editions is therefore just two
indicators: `arbeitslose_*` and `kinderarmut_*`** (plus their dynamik forms). `transferbezug_*` is
populated only 2023+, and `alleinerziehende_*` exists only 2023+.

> Note: ADR-0007 Consequences describes the stable core as "3 indicators (unemployment, transfer
> receipt, child poverty)". The implemented ingestion reveals that `transferbezug` is in fact **null
> ≤2021**, so the *populated* stable core across all editions is **2**, not 3. This is a divergence of
> the as-built data from the ADR's expectation and should be recorded (R1 below). It is not a defect —
> the long format absorbs it — but R-A1's feature engineering must key off the *actual* null pattern,
> not the ADR's table.

**Guidance (not "use only the all-edition core" full stop):** the right rule depends on the modelling
window, exactly as in the R-A3 vintage discussion:

- For a **single-edition cross-sectional** R-A1 fit on a **2023 or 2025** edition: use **all 4 status
  indicators** — they are all populated there, and that is the richest, most MSS-faithful feature set.
- For a **cross-edition / longitudinal** feature (e.g. a trend or pooled fit spanning ≤2021): restrict
  to the **populated stable core (`arbeitslose_*`, `kinderarmut_*`)**; treat `transferbezug_*` and
  `alleinerziehende_*` as **2023+-only enrichments**, never back-filled with zero or imputed across
  the suspension gap. Document the truncated feature set for those editions.

This matches ADR-0007's "never silently back-fill the 4th indicator as zero" and the R-A3 vintage
discipline. A per-edition indicator-availability dbt test (asserting which indicators are
populated-non-null per edition) would make the break *visible and tested* rather than discovered at
model time — see R2.

## d. Sign-convention / polarity issue analogous to the R-A5 `mean_age_years` finding?

**Yes — there is a real and important polarity subtlety in the dynamik indicators, and it is exactly
the genus of trap R-A5/#85 surfaced. It is not a bug in this PR (the staging layer correctly passes
the raw published value through unaltered), but it is a binding caveat R-A1 must encode.** The
staging layer does no sign transformation, which is the correct behaviour for a staging view — but it
means the polarity responsibility is deferred to R-A1, and R-A1 must get it right.

The trap is a **sign-orientation inversion between two things that share the word "Dynamik":**

1. **The per-indicator dynamik *value* (`d1`–`d4`, `*_dynamik`)** is the **change in the underlying
   disadvantage rate** over the two-snapshot window. A **positive `arbeitslose_dynamik` means the
   unemployment rate *rose* → social status *worsened*.** So for the raw dynamik *values*,
   **positive = worsening = vulnerability-positive** (rising deprivation is associated with the
   displacement/upgrading pressure that gentrification analysis cares about).

2. **The composite MSS Dynamik-Index *class*** (the `dynamik_index` 1/2/3 in `stg_berlin_mss`, R-A3)
   uses the **opposite convention**: SenSBW labels **"positiv" = improving** (declining disadvantage)
   and **"negativ" = worsening**. R-A3 signed off on `{1→positiv, 3→stabil-ish, 5→negativ}` with
   "positiv is best".

So **a positive `*_dynamik` raw value corresponds to the *negativ* (worsening) end of the official
Dynamik-Index class.** If R-A1 ever places a raw dynamik value and the Dynamik-Index class in the
same model, or interprets "positive dynamik" colloquially, the sign will silently flip — precisely
the `mean_age_years` failure mode (a single mis-oriented term inside a composite that nobody catches
because the magnitude looks plausible).

**Required R-A1 sign discipline (the caveat that discharges this):**

- Adopt one explicit orientation for all SES features. The house convention established in R-A5 is
  **vulnerability-positive** (higher = more pre-gentrification vulnerability / disadvantage). Under
  that convention, the **status-level** indicators (`*_anteil`) are already correctly oriented
  (higher unemployment/poverty = higher disadvantage = positive). The **raw dynamik values**
  (`*_dynamik`) are **also already vulnerability-positive as published** (rate rising = disadvantage
  rising) — so, importantly, **no negation is required for the raw `*_dynamik` values**, *provided*
  R-A1 treats them as "change in deprivation rate" and **not** as "MSS Dynamik-Index direction".
- The error to guard against is **reusing the R-A3 `dynamik_index` directional sign** (positiv=good)
  for these raw values, or vice versa. Document in the R-A1 model SQL comment exactly which object is
  being used and its orientation, and add a sign-orientation assertion in the R-A1 methodology note
  (cite this section).
- I could **not** confirm from the public MSS technical PDF whether the published `d1`–`d4` are
  **absolute (percentage-point) change** vs **relative (%) change**, nor whether any per-indicator
  dynamik is itself sign-flipped at source. This mirrors R-A3 condition C1 (the WFS code semantics are
  inspection-confirmed, not source-documented). R-A1 must **empirically verify the dynamik value sign**
  before use: cross-tab the sign of `arbeitslose_dynamik` against the change in `arbeitslose_anteil`
  computed from consecutive editions for the same PLR — they must move together (positive d ⇔ rising
  anteil). This is a cheap, decisive check and is condition C1 below.

---

## Verdict

```
Verdict: PASS WITH CONDITIONS
```

**Rationale.** The ingestion and staging design is methodologically sound and well-aligned with its
purpose: the eight indicators are exactly the MSS Status/Dynamik index indicators (best-possible
input↔outcome alignment for R-A1); the long format is the correct, house-consistent shape and absorbs
the 3→4 indicator change and the `transferbezug` suspension cleanly; the grain key is enforced;
uninhabited PLRs are preserved-but-nulled and excludable; no spatial-method (CRS/MAUP) issue is
introduced. The conditions below are not defects in *meaning* in this PR — the staging layer correctly
passes raw values through — but they are **consumption guardrails** that R-A1 must satisfy, because
(i) the raw dynamik values carry a sign-orientation that inverts relative to the official
Dynamik-Index *class* (the R-A5/#85 polarity-trap genus), (ii) the populated cross-edition core is
narrower than ADR-0007 states (2, not 3, indicators), and (iii) the vintage break from R-A3 applies
identically here.

### Conditions (must be satisfied before / as part of R-A1 consumption)

- **C1 — Empirically verify the dynamik value sign and orientation.** Before using any `*_dynamik`
  feature, cross-tab `sign(*_dynamik)` against the consecutive-edition change in the matching
  `*_anteil` for the same PLR (within one LOR vintage). Confirm positive dynamik ⇔ rising rate
  ⇔ worsening status. Pin the result (and whether the change is absolute or relative) in the R-A1
  methodology note. Until confirmed, treat dynamik orientation as inspection-pending. This is the
  R-A4 analogue of R-A3 C1.
- **C2 — Single explicit, documented sign orientation for all SES features.** Use the house
  vulnerability-positive convention (R-A5). `*_anteil` need no transform; raw `*_dynamik` need **no
  negation** under that convention (rising rate = rising vulnerability) — but R-A1 must **not** import
  the R-A3 `dynamik_index` "positiv=good" sign for these raw values. State the orientation of every
  SES term in the model SQL comment, citing this section. This is the explicit guard against the
  `mean_age_years`-style silent flip.
- **C3 — Respect the populated-indicator window.** For cross-edition/longitudinal R-A1 features use
  only the **populated stable core (`arbeitslose_*`, `kinderarmut_*`)**; use the full 4-indicator set
  only for single-edition fits on 2023/2025. Never back-fill `transferbezug_*` (null ≤2021) or
  `alleinerziehende_*` (absent ≤2021) with zero or cross-gap imputation. Report the per-edition
  feature set used.
- **C4 — Exclude uninhabited PLRs and respect the LOR vintage break.** Filter null-valued
  (uninhabited) PLRs before any fit; do not join SES inputs to the MSS outcome or compute PLR deltas
  across the 2019→2021 boundary without the LOR crosswalk. Carry `area_vintage` through the pivot.
  (Inherits R-A3 C3/C4.)

### Recommendations (non-blocking)

- **R1 — Reconcile ADR-0007 with as-built `transferbezug` availability.** ADR-0007 Consequences calls
  the stable core "3 indicators incl. transfer receipt", but `transferbezug_*` is **null ≤2021**, so
  the populated all-edition core is **2**. Note this divergence on the G2 methodology page and,
  ideally, as a one-line correction/addendum to ADR-0007.
- **R2 — Add a per-edition indicator-availability dbt test.** Assert which indicators are
  populated-non-null per edition (e.g. `arbeitslose_*`/`kinderarmut_*` non-null all editions;
  `transferbezug_*` non-null only ≥2023; `alleinerziehende_*` rows only ≥2023). This makes the
  suspension/addition breaks visible and tested rather than discovered at model time, mirroring
  ADR-0007's "the break is visible and tested" intent.
- **R3 — Use the inputs for the free internal cross-check** (ADR-0007 Consequences): confirm a PLR's
  `indexind` profile is consistent with its `indizes` class (high unemployment + high transfer
  receipt should not sit in Status "hoch"). Low-cost correctness signal for R-A1.
- **R4 — Collinearity handling.** The four status indicators are near-collinear (one disadvantage
  axis). R-A1 should expect this — prefer a regularised model, a single SES composite/first PC, or
  explicit collinearity reporting — rather than interpreting four independent coefficients. Keep the
  AUC / F-weighted vs-2018-baseline comparison within a single LOR vintage (R-A3 C2).

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may merge.*

## Sources

- ADR-0007: `docs/adr/0007-berlin-ses-indicators.md`
- R-A3 geo-signoff (the `indizes` outcome these inputs feed): `docs/methodology/R-A3-geo-signoff.md`
- R-A5 / #85 sign-convention precedent: `docs/methodology/R-A5-geo-signoff.md`, `docs/methodology/indicator-semantics.md`
- SenSBW MSS 2025 report (four index indicators; Dynamik-Index positiv/stabil/negativ):
  <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2025/>
- SenSBW MSS 2023 report (3→4 indicator change; "positiv" = declining disadvantage):
  <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2023/>
- MSS index-indicator technical description (PDF; per-indicator definitions):
  <https://fbinter.stadt-berlin.de/fb_daten/beschreibung/MSS/MSS_Index-Indikatoren__TechnBeschreibung.pdf>
- MSS 2021 layer description: <https://fbinter.stadt-berlin.de/fb_daten/beschreibung/MSS/MSS_2021.html>

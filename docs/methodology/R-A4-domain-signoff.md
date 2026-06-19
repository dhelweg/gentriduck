# R-A4 Domain Sign-off — Berlin MSS `indexind` SES indicators ingestion (#67 / PR #91)

- **Author:** gentrification-domain-expert
- **Date:** 2026-06-19
- **Scope:** domain-theory validity of adopting the official Berlin MSS `indexind`
  (index-indicator) layer — per-PLR continuous SES indicators (unemployment SGB II,
  transfer-benefit receipt, child poverty, single-parent-household children, plus their
  Dynamik-change counterparts) — as the **SES predictor input layer** for the gentrification
  index re-grounding (R-A1).
- **Artefacts reviewed:** `docs/adr/0007-berlin-ses-indicators.md`,
  `transform/models/staging/stg_berlin_mss_indicators.sql`,
  `transform/models/staging/stg_berlin_mss.sql` (the R-A3 outcome it shares a source with),
  and the companion `docs/methodology/R-A3-domain-signoff.md`.
- **Companion gate:** geo-data-scientist statistical sign-off (R-A4) — required before merge.

## Assessment

### a. Are SGB II rate, unemployment, child poverty, and alleinerziehende the right SES indicators?

Yes — these are the canonical small-area social-disadvantage indicators in the German
gentrification literature, and they are precisely the EWR/MSS-style inputs the 2018 thesis
operationalized for social status (it could not use them at the resident-register grain, which is
why R-A4 promotes the MSS-computed versions). Transfer-benefit receipt (SGB II/XII), unemployment,
and child poverty are the standard "soziale Benachteiligung" axis that underpins the Senate's
own Status-Index and that Holm (2010) and the Döring–Ulbricht displacement typology treat as the
social-precarity baseline against which upgrading is read. The fourth indicator
(children/youth in single-parent households, 2023+) extends the same household-precarity axis;
it broadens but does not reorient the construct, consistent with the R-A3 finding on the 3→4 drift.

### b. Is sourcing predictors from the same data as the MSS outcome a circularity problem?

**This is the central risk of the PR and the binding condition on the sign-off.** The Senate
computes the Status/Dynamik *classes* (R-A3, `stg_berlin_mss`) **by aggregating exactly these four
`indexind` indicators**. Therefore using the `indexind` levels as predictors of the contemporaneous
MSS class is **definitional, not explanatory** — a model that "predicts" Status from the indicators
Status is built from is tautological and would report a spuriously perfect fit. The indicators are
nonetheless legitimately ingestible and useful, but **only in roles that break the circularity**:
(i) as the **lagged baseline SES state** (status at t−1) against which a *later* outcome is read —
this is the lead-lag spine of the thesis; (ii) as a **continuous re-expression of the outcome
itself** (a status *gradient* rather than four bins), in which case they are outcome-side, not
predictor-side; or (iii) as inputs to a **POI→ΔSES model where the POI dynamism is the predictor and
SES change is the outcome** (the 2018 lead-lag hypothesis). What R-A1 must **never** do is regress
same-edition MSS Status class on same-edition `indexind` levels and present the fit as validation.

### c. Correct polarity for each indicator in a vulnerability / pre-gentrification composite

All four status indicators are **vulnerability-positive**: higher unemployment (SGB II), higher
transfer-benefit receipt, higher child poverty, and a higher single-parent-household share each
denote **greater social disadvantage / displacement exposure**, so each enters a vulnerability
composite with a **positive** sign. Note this is the **opposite numeric direction** to the R-A3
`status_index` encoding (`1=hoch … 4=sehr niedrig`, i.e. low code = high status): a high `indexind`
indicator value corresponds to a *high* status_index *code* (low social status). This mirrors the
sign reasoning already settled in the active branch fix `#85` (mean-age is vulnerability-positive,
no negation) — the composite must add disadvantage indicators positively, not negate them. The
**Dynamik-change** counterparts carry the opposite reading from a gentrification standpoint: a
*falling* unemployment/transfer/child-poverty rate in a currently-disadvantaged PLR is the canonical
socio-economic **upgrading** signal (potential gentrification), so the change indicators must be
signed and interpreted distinctly from the level indicators and must **not** be folded into a static
vulnerability composite with the same polarity as the levels.

### d. Is the absence of income data a significant gap for R-A1?

It is a **known and acceptable** gap, not a blocker. The MSS itself excludes income and uses
transfer-receipt + unemployment as the social-status proxy, so for the purpose of grounding against
the Senate's own classes the input set is *definitionally complete* — adding income would actually
*decouple* inputs from the outcome they validate. The honest limitation is that transfer-receipt
proxies capture the *bottom* of the income distribution well but are blind to mid/upper-income
in-movers, which is the demand side of the rent-gap (Smith) and invasion-succession (Dangschat)
story. Gentrification is the *arrival of higher-status residents*, and `indexind` can only observe
that indirectly (as falling disadvantage rates), never directly as rising income. For R-A1 this is
tolerable because POI dynamism is the intended proxy for the in-mover/demand side; if R-A1 finds an
income gradient material, the fill is the RSA/Sozialatlas under a follow-up ADR (ADR-0007 Open Q2),
not a scope addition here.

## Conditions for R-A1 (carry-forward)

1. **Circularity firewall (binding).** Do **not** use same-edition `indexind` levels as predictors
   of the same-edition MSS Status/Dynamik class — that is tautological (assessment b). Permitted
   roles: lagged baseline SES (t−1) feeding a later outcome; a continuous *outcome-side* status
   gradient; or the outcome in a POI(t−1)→ΔSES(t) lead-lag model. R-A1 must state in the model SQL
   comment (R-C2) which role each `indexind` indicator plays and why it is not circular.
2. **Polarity, documented per indicator.** All four status indicators are vulnerability-positive
   (enter a vulnerability composite with `+` sign); none are negated. The Dynamik-change indicators
   are signed *separately* (falling disadvantage in a low-status PLR = upgrading) and must not be
   pooled with the levels at the same polarity. Document the sign of every indicator in the model
   comment, consistent with the `#85` mean-age sign convention.
3. **Levels vs. change is a deliberate feature choice (ADR-0007 Open Q3).** R-A1 must decide, with
   this gate, whether it uses status levels, the Dynamik form, or both — and keep their roles
   distinct (a level is a *state*, a Dynamik is a *trajectory*; conflating them re-introduces the
   level/process confusion flagged in R-A3 assessment a).
4. **Use the stable 3-indicator core for any cross-edition SES series.** The single-parent-household
   indicator is 2023+ only; never back-fill it as zero before 2023 (ADR-0007 Consequences). The
   `transferbezug_*` null-in-≤2021 columns (model comment, WFS `s2_x`) must likewise be treated as
   missing, not zero.
5. **Boundary vintage.** Cross-2019→2021 SES series must route through the LOR crosswalk
   (`area_vintage` tag), identical to R-A3 condition 3; absent that, treat the 447- and 542-PLR
   regimes as separate panels.
6. **Ethics framing (carry to G2/O2).** A PLR with high transfer-receipt/child-poverty *and* a
   positive (downward) disadvantage Dynamik is exactly a neighbourhood under displacement pressure.
   Public presentation must frame this as **descriptive monitoring of risk**, never as a targeting
   tool, and must state the income-blindness limitation (assessment d) so the measure is not read as
   a complete social-status account.

## Verdict

```
Verdict: PASS WITH CONDITIONS
Ref: docs/adr/0007-berlin-ses-indicators.md; docs/methodology/R-A3-domain-signoff.md
```

The `indexind` SES indicators are the theoretically correct, official, citable social-disadvantage
inputs for a 2026 Berlin gentrification revival, and the staging model handles the indicator-set
drift, null semantics, and boundary vintage honestly. The conditions above are **R-A1 carry-forwards
and one binding firewall** (no same-edition self-prediction), not defects in this ingestion PR.
R-A4 ingestion is domain-valid to merge once the geo-data-scientist statistical sign-off also
records PASS.

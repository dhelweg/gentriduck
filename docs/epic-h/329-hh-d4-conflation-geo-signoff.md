---
task: H / #329 — Drop `unemployment_share` from Hamburg's D4 `ewr_composite` (predictor/outcome conflation)
author: geo-data-scientist
date: 2026-07-31
branch: fix/329-hamburg-d4-composite-conflation
---

# Geo-DS methodology sign-off — Hamburg D4 composite de-conflation (#329)

- **Branch:** `fix/329-hamburg-d4-composite-conflation`, HEAD `2c8f8cd9`; baseline for the diff is
  develop's pre-#329 tip `a284ce80`.
- **Reviewer:** `geo-data-scientist` (methodology gate, R-C1).
- **Scope:** is the *narrowed* Hamburg D4 predictor composite methodologically sound, are the
  downstream descriptions truthful, and does the fix create any new problem? Not re-litigating
  #40/H1's two-grain reconciliation, #313's mart wiring, or ADR-0014's ingestion decisions.
- **Method:** independent read of `int_ewr_socioeco_hamburg.sql` (full), `int_ewr_socioeco.sql`
  header, ADR-0008 §"four dimensions" + role discipline, ADR-0014 §2 verbatim, the full diff of the
  three named models plus `schema.yml`, and the H1/H3 addenda. ADR text was read directly, not
  taken from the commit message.

---

## 1. Is the diagnosed conflation real? — Yes, verified at source

ADR-0014 §2 (`docs/adr/0014-hamburg-data-sources.md`, lines 81–84) states verbatim that Hamburg's
Statusindex × Dynamikindex → Gesamtindex is

> "computed from **seven** attention indicators (migration-background youth, single-parent
> children, SGB-II share, **unemployment**, Mindestsicherung for children and for elderly,
> Schulabschluss)."

Unemployment is therefore a *constituent input* of Hamburg's D1 outcome, not merely correlated with
it. ADR-0008 (lines 74–78) fixes D1 as the **outcome** and D4 as a **predictor**, and its
composition rules require predictor and outcome dimensions to be fused only at the composite /
typology layer, never averaged into one input. ADR-0014 §2's own "Role discipline" bullet repeats
this for Sozialmonitoring specifically ("outcome / ground-truth variable, never a predictor").

Placing `unemployment_share` inside `ewr_composite` and then regressing D1 change on
`ewr_composite_t` (`int_hamburg_lead_lag` line 234 → `analysis/e5_hamburg_lead_lag.py`
`test_h3_with_d4_control`, lines 459–533) put a component of the outcome's own construction on the
right-hand side. That is a genuine (partial) self-prediction defect, not a stylistic objection.
**The fix is correct and necessary.**

## 2. Does the Berlin parallel actually hold? — Structurally yes, and the header states it honestly

`int_ewr_socioeco.sql`'s header enumerates its five composite inputs (`foreigners_share`,
`age_under18_share`, `mean_age_years`, `migration_background_share`,
`residence_duration_5y_share`) — all population-composition variables; no
unemployment/benefit-receipt variable appears. Berlin's `arbeitslose_anteil` lives on the MSS
(D1/D2) side, so Berlin was structurally immune *by source separation* rather than by an explicit
exclusion.

The Hamburg header (lines 114–125) says exactly this, including that Hamburg's single combined
EWR-equivalent source publishes unemployment alongside demographic fields and therefore *required*
an explicit exclusion. That is an accurate, non-overstated framing of the analogy — it does not
claim Berlin ever made this decision consciously.

## 3. Is a 2-indicator composite still a defensible D4? — Yes, with disclosure

Two concerns considered:

**(a) Thinness.** Two indicators is thin, but it is not *ipso facto* invalid: both retained
indicators are population-composition shares of the kind D4 is defined to carry (ADR-0008 line 98:
"D4 is *demographic* vulnerability"), both are among Berlin's own five, and the loss is driven by
source availability (ADR-0014 open question #3: no residence-duration or migration-background field
in the ingested Hamburg Stadtteil set), not by analyst discretion. A thin-but-clean predictor is
methodologically preferable to a thicker one contaminated by the outcome. Losing one of three
indicators is a real precision cost, but precision is recoverable (ADR-0014's Statistikamt-Nord
XLSX fallback would widen the set); circularity is not.

**(b) Residual conflation of the two survivors — a NEW finding, see Condition C1.** Checking
`age_under18_share` and `foreigners_share` against the same seven attention indicators (ADR-0014
§2, line 83) shows *partial construct overlap*, which the model header does not currently disclose:

- **"migration-background youth"** conditions on *both* migration background and youth. It
  overlaps `foreigners_share` (foreign nationality is a coarse proxy for migration background —
  Berlin's own model treats `foreigners_share` and `migration_background_share` as distinct but
  related, `int_ewr_socioeco.sql` header) **and** `age_under18_share`.
- **"single-parent children"** and **"Mindestsicherung for children"** are both under-18-conditioned
  populations, i.e. their denominators covary mechanically with `age_under18_share`.

This overlap is materially weaker than the unemployment case: the Statusindex indicators are
*benefit-receipt / status* rates within those subpopulations, whereas D4's survivors are plain
population-*composition* shares — an area can have many under-18s with few on Mindestsicherung. So
it is an induced-correlation risk, not the definitional identity `unemployment` had. It does **not**
warrant dropping further indicators (that would empty the composite), but it **must be disclosed**,
because a reader of the H1/H3/G2 material would otherwise conclude from #329 that Hamburg's D4 is
now fully independent of D1. It is *substantially more* independent, not *fully* independent.

## 4. Mechanical change and downstream consistency — correct

- `int_ewr_socioeco_hamburg.sql`: `z_unemployment_share` is no longer computed (lines 173–199) and
  `ewr_composite = (z_age_under18_share + z_foreigners_share) / 2.0` (line 223). Divisor matches
  the term count — **no mis-scaling**. `unemployment_share` survives as a raw SELECT column
  (line 215) with an inline comment marking it non-composite.
- `mart_area_demographics` reads `unemployment_share` but never `ewr_composite`, so the #313 use is
  genuinely non-circular. Confirmed by grep, not assumed.
- `int_gentrification_ts.sql` (lines ~352–361) and `int_hamburg_lead_lag.sql` (lines 86–93) both
  update "3-indicator" → "2-indicator" and cite the reason. `schema.yml` updates all four affected
  descriptions (model, `ewr_composite`, `ewr_composite_t`, plus a new `unemployment_share` column
  doc). No stale "3-indicator" reference to the *Hamburg* composite remains in the tree
  (the surviving hits are Berlin's pre-2014 partial composite and the MSS 3-indicator history —
  unrelated).
- **Scale note (non-blocking):** the mean of *k* correlated z-scores has SD `sqrt((1+(k-1)r)/k)`,
  so shrinking k from 3 to 2 *raises* the composite's SD. Hamburg's
  `legacy_gentrification_score = (status + dynamism - ewr_composite)/3`
  (`int_gentrification_ts.sql` line 398) is therefore now slightly more D4-weighted than before.
  That column is already flagged pre-existing as a legacy pre-R-A1 diagnostic and explicitly
  NOT cross-city comparable (line 394), and `ewr_composite` does not enter `gentrification_index`
  (per H3-geo-signoff), so no published number is corrupted. Recorded for the G2 page, not a
  blocker.

## 5. Honesty of the H1/H3 addenda — accurate

Both addenda (a) label the older text as a historical record rather than editing it, (b) state the
2-indicator change and its reason with the correct ADR citations, (c) state that
`unemployment_share` itself was not dropped from the model, and (d) H3 correctly reasons that its
own conclusion is unchanged because the composite does not reach that mart. Neither overstates the
fix as making Hamburg's D4 "independent" in absolute terms — though neither surfaces the residual
overlap in §3(b) either, which C1 addresses.

---

## Conditions

**C1 (documentation, before G2 publication of any Hamburg D4 material).** Add to
`int_ewr_socioeco_hamburg.sql`'s #329 header block a short paragraph disclosing the *residual*
partial overlap between the two surviving indicators and the Statusindex attention indicators
"migration-background youth", "single-parent children" and "Mindestsicherung for children"
(ADR-0014 §2, line 83) — stating that the overlap is compositional rather than definitional, why it
does not justify further exclusions, and that Hamburg D4→D1 findings should be read as
substantially-but-not-fully independent. Mirror one sentence of this onto the G2 methodology page
alongside the existing cross-city magnitude caveat.

**C2 (regeneration, before any Hamburg D4 result is cited).** `docs/epic-h/E5-hamburg-lead-lag-findings.md`
Section 2 reports `ewr_composite_t` coefficients and p-values computed with the old **3-indicator**
composite; those numbers are now stale and were not regenerated on this branch. Re-run
`uv run poe analysis` and commit the regenerated findings (the cluster-count narrative at line 71
should be re-verified at the same time, since the D4 NULL mask drives it). Non-blocking for
integration of this branch, blocking for citation/publication.

Neither condition disputes the change; both are disclosure/refresh follow-ups. The composite change
itself is sound, correctly implemented, correctly scaled, and honestly described.

**Verdict: PASS WITH CONDITIONS**

---

## Addendum — C1 verification (geo-data-scientist, 2026-07-31)

Narrow re-review of the uncommitted header edit to
`transform/models/intermediate/int_ewr_socioeco_hamburg.sql`. My original review (above) stands
unchanged; only C1 was re-assessed.

**Comment-only, confirmed.** Every added/removed line in the diff is a `--` comment line (checked by
filtering the diff for non-comment changes: none). No SELECT list, no z-score CTE, no divisor, no
`ewr_composite` expression touched. `ewr_composite = (z_age_under18_share + z_foreigners_share)/2.0`
is untouched, so §4's mechanical verification is unaffected.

**C1 elements, all present** in the new "RESIDUAL OVERLAP DISCLOSURE" block:
1. Names the three overlapping Statusindex attention indicators ("migration-background youth",
   "single-parent children", "Mindestsicherung for children") with the ADR-0014 §2 line-83 citation
   (R-C2 satisfied).
2. States the overlap is **compositional, not definitional** — with the correct mechanism
   (subpopulation benefit-receipt/status *rates* vs whole-population *composition* shares) and the
   correct "induced correlation, not identity" characterisation.
3. States it does **not** justify further exclusions (a one-indicator "composite" is not a
   composite).
4. Discloses that `foreigners_share`'s weight rose **1/3 → 1/2**, concentrating the residual overlap
   in a now double-weighted term. This is the point my §3(b) implied but did not spell out; the
   header states it more sharply than I did.
5. States the Berlin parallel is **asymmetric** per ADR-0006 lines 20–22. I verified those lines
   directly: Berlin's MSS *index indicators* are unemployment, transfer-benefit receipt, child
   poverty, and (from 2023) single-parent children — no origin/nationality measure; migration
   background sits among the ~17–20 *context* indicators, outside the index. The header's claim is
   accurate, and it correctly narrows §2's "structurally yes" to "disjoint by construction in
   Berlin, substantially-but-not-fully in Hamburg".

**No contradiction with my original analysis.** The added "Primary grounding (R-C2)" paragraph
quotes ADR-0008 lines 98–99 verbatim and accurately ("D4 is *demographic composition*, **not** a
socio-economic-status (income / unemployment / transfer-recipient) measure"); it strengthens the
justification (dimension-membership violation *and* circularity) rather than replacing it. The
softening of "genuinely independent" → "best available" for `foreigners_share` is a correction in
the honest direction.

C1 is satisfied. C2 (regenerating `docs/epic-h/E5-hamburg-lead-lag-findings.md`) remains open but
was explicitly non-blocking for integration; it stays blocking for citation/publication, as does the
one-sentence G2 mirror of this disclosure.

**Verdict: PASS**

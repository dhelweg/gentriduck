---
task: H-C6 / #215 — Hamburg Mietenspiegel rent-VALUE join (Berlin D1 analogue)
author: geo-data-scientist
date: 2026-07-09
branch: feature/215-hc6-hamburg-mietenspiegel-rent-join
---

# Geo-DS methodology sign-off — Hamburg Mietenspiegel rent-value join

- **Branch:** `feature/215-hc6-hamburg-mietenspiegel-rent-join`
- **Issue / task:** #215 [H-C6] — follow-up to #203 [H-C5], which deferred the Mietenspiegel
  rent-VALUE join because `stg_hamburg_mietenspiegel`'s `ausstattung` (fitting-standard) dimension
  was not yet reconciled against the two-tier Wohnlage scheme.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_hamburg_wohnlage_mietenspiegel.sql` (new)
  - `transform/models/staging/stg_hamburg_mietenspiegel.sql` (added `ausstattung` column, plumbing)
  - `transform/models/intermediate/schema.yml` / `transform/models/staging/schema.yml` (new/updated
    test blocks)
  - `data/raw/hamburg/rent/mietenspiegel.parquet` (2025 edition, inspected directly)
  - Cross-reference: `transform/models/intermediate/int_price_rent_wohnlage_mietspiegel.sql` (Berlin
    D1 pattern being mirrored), `transform/models/staging/stg_berlin_mietspiegel.sql` (Berlin's own
    "standard equipment" framing), `docs/epic-h/203-hc5-geo-signoff.md` Sec.e (original scoping-out
    rationale).

This model is methodology-bearing under R-C1: it decides a representative dwelling profile
(`ausstattung`, `size_bucket`, `year_built_bucket`) for a rent-VALUE estimate, the same class of
decision Berlin's D1 model made (geo condition 9 there). It does not touch `gentrification_index`
(contract-enforced mart) — disclosure-only, same as #203's two models.

## a. Is `ausstattung = 'mit Bad und Sammelheizung'` a defensible representative-profile pick, not an invented judgment call?

**Yes.** I queried the live parquet directly rather than trusting the ticket's framing of an
"unreconciled dimension": `ausstattung` carries **exactly one value across all 88 rows** of the
currently-ingested 2025 edition. This is not a case of choosing among several fitting-standard
categories (which would require a grounded weighting/selection rule) — there is only one value the
publisher currently offers. Filtering to it is a no-op selection, not a modelling choice with
alternatives left on the table. I additionally cross-checked Berlin's own D1 model: its source
comment already states "All cells represent standard equipment (mit SH, Bad, IWC)" — meaning Berlin's
Mietspiegel *also* only publishes at one implicit standard-fitting baseline, just without an explicit
column for it. Hamburg's `ausstattung='mit Bad und Sammelheizung'` and Berlin's implicit "mit SH, Bad,
IWC" describe materially the same status (bathroom + central heating as standard). This slice's
representative-profile choice is therefore directly analogous to, not diverging from, the established
Berlin D1 precedent.

## b. Is the `size_bucket`/`year_built_bucket` pick methodologically sound given only a single ingested edition?

**Yes, with a flagged limitation.** `size_bucket='66m² bis unter 91m²'` is Hamburg's own mid-size
band, the closest analogue to Berlin's 60–90 sqm anchor — both are the bucket bracketing a typical
2-3 room apartment. `year_built_bucket='1968 bis 1977'` is the median-position bucket among Hamburg's
10 published construction-era bands and represents a large, typical segment of Hamburg's postwar
housing stock — playing the same "typical stock, not extreme" role as Berlin's 1950–1964 anchor.
Unlike Berlin's D1 model, I could **not** verify this bucket persists unchanged across multiple
Mietenspiegel editions (geo condition 10's harmonised-bucket check), because only the 2025 edition is
currently ingested. I flagged this explicitly in the model header and schema description as an
open caveat to revisit at the next Hamburg Mietenspiegel ingestion, rather than silently presenting it
as a permanently-verified anchor the way Berlin's is. This is the correct honesty level for a
single-edition dataset — deferring the stability claim, not deferring the whole ticket.

## c. Is the degenerate "join to `MAX(edition_year)`" vintage-matching rule correct, given Wohnlage has no vintage dimension?

**Yes.** `int_hamburg_wohnlage_stadtteil` is explicitly a current-state crosswalk with no
WFS-edition-year dimension (its own header states this, inherited unchanged from #203). Berlin's D1
"nearest `<=` Mietspiegel vintage" rule exists specifically to match a *dated* Wohnlage vintage to the
correct historical Mietspiegel edition; with no date on the Hamburg Wohnlage side, there is nothing to
match against except "the latest data we have," which is what `MAX(edition_year)` computes. This is
the correct degenerate case of the same rule, not an ad hoc shortcut.

## d. Is the low-N NULL-guard correctly inherited?

**Yes.** `wohnlage_low_n` is carried through unchanged from `int_hamburg_wohnlage_stadtteil` (< 10
addresses per Stadtteil), and `est_rent_*` are NULLed under that flag exactly as Berlin's D1 model
NULLs `wohnlage_score`/`est_rent_*` under its own `wohnlage_low_n`. I verified against the built table:
all 104 Stadtteile currently resolve to non-NULL rent estimates (no low-N Stadtteile in the live
data), so the guard is present but not yet exercised — correctly implemented regardless.

## e. Is keeping this model disclosure-only (out of `gentrification_index`, uncomposited with the displacement-zone flag) the right scoping call?

**Yes, for the same reasoning as #203 Sec.f.** A continuous modelled-rent estimate and a binary policy
marker remain epistemically different kinds of evidence; blending them without a grounded weighting
rule would misrepresent both. This model publishes at the same Stadtteil grain as
`int_hamburg_wohnlage_stadtteil` and `int_hamburg_displacement_zone_flag`, so a future G2/web layer
can join all three without an additional cross-grain step, but no such compositing is attempted here.

## Verdict

**Verdict: PASS.** The `ausstattung` reconciliation is empirically grounded (single published value,
directly analogous to Berlin's own implicit standard-equipment baseline), the representative-profile
pick is reasoned and its single-edition limitation is disclosed rather than hidden, the degenerate
vintage-matching rule is correct given the input data's shape, and the scoping (disclosure-only,
matched grain) is sound. No changes requested.

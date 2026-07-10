---
task: H-C6 / #215 — Hamburg Mietenspiegel rent-VALUE join (Berlin D1 analogue)
author: gentrification-domain-expert
date: 2026-07-09
branch: feature/215-hc6-hamburg-mietenspiegel-rent-join
---

# Domain sign-off — Hamburg Mietenspiegel rent-value join

- **Branch:** `feature/215-hc6-hamburg-mietenspiegel-rent-join`
- **Issue / task:** #215 [H-C6].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Artefacts reviewed:** `int_hamburg_wohnlage_mietenspiegel.sql` header/columns,
  `int_price_rent_wohnlage_mietspiegel.sql` (Berlin D1, theoretical basis carried over),
  `docs/epic-h/215-hc6-geo-signoff.md`, `docs/epic-h/203-hc5-domain-signoff.md` (precedent for the
  deferred-scope call this ticket resolves).

## a. Is a modelled rent-VALUE estimate at a fixed profile a legitimate gentrification-pressure signal for Hamburg, on the same basis as Berlin's D1?

**Yes.** The grounding carried over from Berlin's D1 model is about the *institutional mechanism*:
a Mietenspiegel/Mietenspiegel-equivalent rent table is a government-recognized reference rent
(ortsübliche Vergleichsmiete) that responds, with a lag, to actual market pressure (Holm 2010's
Bestandsmiete-lagging-bias applies identically in Hamburg — the Hamburger Mietenspiegel is the same
class of instrument, serving the same §558 BGB legal function as the Berliner Mietspiegel). Weighting
the fixed-profile rent value by Wohnlage tier shares turns a single administrative number into a
location-quality-weighted estimate comparable in kind (not magnitude — see (c)) to Berlin's D1
output. This is theoretically sound, not a forced transplant.

## b. Is treating Hamburg's single `ausstattung` value as "the standard fitting profile" rather than an unresolved gap the correct call?

**Yes — this is the crux of what #215 asked to resolve, and I re-checked it rather than deferring
again.** The original #203 scoping-out language framed `ausstattung` as an "unreconciled dimension,"
which reads as if a genuine multi-category alignment decision was outstanding. Having inspected the
live data (per the geo sign-off), that framing turns out to be more cautious than the actual data
requires: there is only one value published. Treating "mit Bad und Sammelheizung" (bathroom + central
heating) as Hamburg's standard baseline is not an assumption this pipeline is making unilaterally — it
mirrors precisely what Berlin's own Mietspiegel already assumes table-wide ("mit SH, Bad, IWC"),
a housing-policy convention, not a data-engineering shortcut: German Mietenspiegel/Mietenspiegel-style
tables are conventionally built around a modal/standard fitting level for a city's stock, and
sub-standard or premium fitting is handled via separate deduction/surcharge schedules outside the base
table — exactly the framing Berlin's own staging model already documents. Hamburg publishing that
standard level explicitly as a column, rather than only in a table-wide footnote like Berlin, does not
change the underlying methodology; it makes it more legible. No invented equivalence is being made.

## c. Is the non-equivalence disclosure (single-edition caveat, no cross-city rent-magnitude comparison) adequately carried forward?

**Yes.** The model header and schema documentation both flag that the representative-profile pick is
verified against a single ingested edition (2025) rather than the Berlin pattern's multi-edition
stability check, and — inheriting #203's own disclosure discipline — this model is not wired into
`gentrification_index` or compared numerically against Berlin's D1 rent estimates without going
through the G2 methodology page's cross-city non-equivalence framing (different bucket vocabularies,
different Wohnlage tier counts, and now a materially different verification depth). This avoids the
single most likely misuse: someone subtracting a Hamburg est_rent_mid from a Berlin est_rent_mid and
treating the difference as a real Berlin-vs-Hamburg rent gap, when it is at minimum a difference in
profile definition and evidentiary strength, not just city.

## d. Is the disclosure-only scoping (uncomposited, not index-wired) ethically sound?

**Yes, for the same reasoning as #203 (d):** a modelled rent value at a fixed profile and Hamburg's
existing displacement-zone policy marker are different kinds of evidence; publishing them
independently at matched Stadtteil grain (allowing a future page to present them side-by-side) without
inventing a blended score is the epistemically honest choice.

## Verdict

**Verdict: PASS.** The `ausstattung` reconciliation correctly identifies that Hamburg's single
published value is analogous to Berlin's own implicit standard-fitting baseline rather than an
unresolved methodological gap, the theoretical grounding for the rent-VALUE signal transfers cleanly,
and the single-edition / non-equivalence disclosures are adequate and correctly scoped. No changes
requested.

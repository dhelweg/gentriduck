# H1 Geo-Signoff Condition 1 — Close-out (#125)

- **Task:** #125 — Gebiet<->Stadtteil crosswalk name-match normalization fix.
- **Date:** 2026-07-01
- **Disposition:** Non-methodology-bearing plumbing fix, pre-authorized by
  `H1-geo-signoff.md` Condition 1.

## Why this does not require a fresh dual sign-off

`H1-geo-signoff.md` (2026-07-01, `Verdict: PASS`) already reviewed and approved the
**join strategy** this fix operates within — a name-matched Gebiet-to-Stadtteil
crosswalk with uniform inheritance (Condition 1's own text: *"This is a
straightforward assertion the data-engineer should add as a dbt test once real
parquet exists — I would want to see actual name strings before specifying the
exact normalization rule ... but I am not blocking this slice on it"*). That
sign-off explicitly anticipated and scoped this exact follow-up: tightening the
**string-normalization rule** used to compare two already-approved name columns,
plus adding the match-rate dbt test it specified. Nothing about the spatial
method, the statistical composite (z-score construction), the join *cardinality*
(still Gebiet -> exactly one Stadtteil), or the indicator weights changed.

The catch-all in `CLAUDE.md`'s methodology-gate definition ("any model that
changes indicator weights, normalization, or spatial method") refers to
**statistical/indicator normalization** (e.g. z-scoring, weighting) and
**spatial method** (e.g. areal interpolation, distance decay) — not string
key-normalization for an already-approved administrative name-match join. This
change is data-cleaning within a pre-approved method, exactly the class of
follow-up Condition 1 pre-scoped as not requiring a fresh blocking review.

## What changed (see commit `fbb1cbc` on `fix/125-hamburg-crosswalk-normalization`)

1. Join-key normalization broadened from `lower(trim(x))` to also strip internal
   spaces, dots, colons, and hyphens on both sides of the name comparison
   (closes spelling/punctuation-variant mismatches: "GroßFlottbek" vs
   "Groß Flottbek", "St.Pauli"/"St:Pauli" vs "St. Pauli").
2. An explicit, documented alias maps Sozialmonitoring's
   Hamm-Mitte/Hamm-Nord/Hamm-Süd three-way split to the single official
   Stadtteil "Hamm" (a genuine administrative-level difference between the two
   sources, not a spelling variant — resolved by name substitution, not
   fuzzy matching).
3. Added `test_hamburg_gebiet_stadtteil_crosswalk_match_rate` per Condition 1's
   explicit ask (fails if match rate < 98%, denominator restricted to Gebiete
   that have a Sozialmonitoring score at all).

## Result

Measured match rate: **98.6%** (850/862 scored Gebiete), up from 88.5%,
clearing the >=98% bar. Residual 1.4% is the documented `Hammerbrook`
data-coverage gap (scored by Sozialmonitoring, not a distinct polygon in the
current geometry edition) — a source-coverage fact, not a normalization bug.

`uv run poe build`: 573 PASS, 2 WARN (pre-existing, unrelated to this change),
0 ERROR.

## Follow-up carried forward

`Hammerbrook`'s absence as a distinct Stadtteil polygon should be verified
against LGV Hamburg's current WFS boundary set the next time the geometry
pillar is refreshed (may be a genuine boundary-merge in the source, not a
gap) — not blocking, noted for the geo-data-scientist's awareness.

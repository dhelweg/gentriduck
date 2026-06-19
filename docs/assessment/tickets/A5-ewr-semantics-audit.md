[A5] EWR indicator-semantics & sign audit (DAU5/DAU10, residence-duration, age band) vs. the official codebook

## Why (problem)
There is a concrete naming/sign risk in the socio-economic pipeline:

- The ingestion maps **DAU5/DAU10 → "residence_duration"** (`ingestion/berlin/ewr/ingest_ewr.py:40-41,520-521`).
  In the thesis's Döring-Ulbricht *status* index, `dau5`/`dau10` are negated **alongside income**, i.e. treated
  as deprivation (unemployment-like) — `reference/system/60_lor_own_idx.sql:101-107`. These cannot both be right.
- `residence_duration_5y_share` enters `ewr_composite` with a positive ("vulnerability") sign then is negated
  (`int_ewr_socioeco.sql`); whether DAU5 means "share resident <5 years" (recent arrivals / churn) or
  "≥5 years" (stable tenure) flips the entire indicator — and high churn is usually a gentrification *signal*,
  not a not-yet-gentrified signal.
- `age_under18_share` is used as "vulnerability"; the thesis used **young-adult** (18-35 / 35-45) shares as the
  gentrification signal, not children.

A wrong sign silently corrupts every downstream score.

## Goal
Each EWR/socio-economic indicator's definition, unit, and sign verified against the official Berlin EWR/MSS
codebook and documented, with any corrections applied.

## Scope & approach
1. For each indicator in `seed_ewr_indicator_meta` and `int_ewr_socioeco`, confirm against the official EWR
   "Merkmale"/codebook: exact definition, numerator/denominator, direction.
2. Resolve the DAU5/DAU10 question definitively (Wohndauer vs. Arbeitslosendauer/unemployment) and the
   residence-duration polarity; correct the mapping and the `ewr_composite` sign if needed.
3. Reassess `age_under18_share` vs. young-adult shares for the gentrification construct (coordinate with A1).
4. Record findings in `docs/methodology/indicator-semantics.md` (one row per indicator: source field,
   definition, unit, sign, citation) and add/adjust dbt tests where polarity is testable.

## Acceptance criteria
- Every key indicator has a documented definition + sign with a codebook citation.
- DAU5/DAU10 semantics resolved and the code matches; residence-duration polarity correct.
- Any sign corrections applied; `uv run poe build` green; affected tests updated.

## Gate / sign-off
geo-DS `pass` (small but methodology-bearing). Cite the codebook (C2).

## Dependencies / relations
Feeds A1/A4. Quick win — can run in parallel with A2/A3.

## References
- `ingestion/berlin/ewr/ingest_ewr.py`, `transform/models/staging/stg_berlin_ewr.sql`,
  `transform/models/intermediate/int_ewr_socioeco.sql`, `seed_ewr_indicator_meta`
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.3

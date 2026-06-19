[A4] Add socio-economic-status indicators (transfer recipients / SGB II / unemployment / income)

## Why (problem)
`int_ewr_socioeco.ewr_composite` (`transform/models/intermediate/int_ewr_socioeco.sql:159-169`) is built
purely from **demographic composition** (foreigners, migration background, under-18, mean age, residence
duration). It contains **no socio-economic-status variable** — no income, no unemployment, no transfer-
recipient share. The 2018 thesis's outcome was precisely the **share of welfare/transfer recipients** and
the Döring-Ulbricht index used **income (k11)** and **unemployment (dau)** (`reference/system/60_lor_own_idx.sql`).
In Berlin some demographic variables are themselves correlated with gentrification, so the current composite's
sign is not theory-clean (review doc §2.3).

## Goal
Real SES indicators available per PLR over time, so the social-status outcome (A1) reflects deprivation/affluence,
not just demographic mix.

## Scope & approach
1. **Source discovery + ADR** (architect): identify open per-PLR SES series. Candidates:
   - SGB II / transfer-recipient share and child poverty (often part of the MSS feed — coordinate with A3 to
     avoid duplication).
   - Unemployment share (Bundesagentur für Arbeit / Amt für Statistik Berlin-Brandenburg open releases).
   - Income proxy if an open per-PLR series exists (else document the gap; the thesis's k11 came from MSS).
2. Ingestion + `stg_berlin_ses` (or extend the MSS/EWR staging), normalized, multi-year, `dim_area`-mapped.
3. Wire into the social-status composite used by A1, with documented signs (high transfer-recipient share =
   low status, etc.).

## Acceptance criteria
- ADR merged; all sources free/open/login-free; attribution captured.
- Per-PLR SES series staged with tests; covers a usable time range.
- The A1 social-status outcome includes at least transfer-recipient/unemployment; signs documented.
- `uv run poe build` green.

## Gate / sign-off
New data source → architect ADR + maintainer OK. geo-DS/domain-expert review of indicator choice & signs.

## Dependencies / relations
Pairs with A3 (MSS likely carries SGB II/child poverty). Feeds A1. Relates to A5 (semantics audit).

## References
- `reference/system/60_lor_own_idx.sql` (k11 income, dau unemployment), `50_lor_ewr_data.sql`
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.3
- Thesis abstract (welfare-recipient correlation), p.97

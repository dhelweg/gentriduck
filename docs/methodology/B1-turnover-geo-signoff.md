---
task: B1 / #70 — Berlin turnover / Wohndauer proxy (third slice)
author: geo-data-scientist
date: 2026-07-09
branch: feature/70-b1-turnover-proxy
---

# Geo-DS methodology sign-off — B1 turnover proxy (`int_berlin_turnover_proxy`)

- **Branch:** `feature/70-b1-turnover-proxy`
- **Issue / task:** #70 [B1], third slice — turnover/Wohndauer proxy, deferred from the first
  two slices pending #68 (EWR indicator-semantics audit), now closed.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_turnover_proxy.sql`
  - `transform/models/intermediate/schema.yml` (new block)
  - Cross-reference: `docs/methodology/indicator-semantics.md` (lines 65-66, 103, 184-190 —
    the DAU5/`residence_duration_5y_share` sign-and-change-convention findings this model
    directly operationalizes), `int_ewr_socioeco.sql` (source), `int_ewr_lead_lag.sql`
    (precedent for year-over-year EWR deltas)

This model is methodology-bearing under R-C1 (a new normalized change-score entering the B1
displacement dimension). Not yet a consumer of `gentrification_index` — contained blast radius,
same staged-slice pattern already used for `int_berlin_rent_pressure_proxy`.

## a. Is the year-over-year self-join (rather than `LAG()`) the right choice, and is it correctly implemented?

**Yes.** I checked the EWR panel's actual year coverage directly: `2008-2020` then a real gap to
`2024-2025` (the #197 upstream ingestion gap). A blind `LAG(...) OVER (ORDER BY reference_year)`
would silently compute a 2020→2024 "one-step" delta as if it were an annual change — a four-year
gap masquerading as a one-year one. The model instead does an explicit `INNER JOIN ... ON
prev.reference_year = curr.reference_year - 1`, which correctly drops any pair without a true
adjacent-year counterpart. I independently verified this against the built table: there is no
row with `reference_year = 2024` in the output (2024→2023 delta would need 2023 present, which it
is, but 2024's own `residence_duration_5y_share` is entirely NULL per the #197 gap — see (c)), and
no spurious 2020→2024 pairing appears anywhere. This is the same discipline already applied in
`int_berlin_rent_pressure_proxy`'s nearest-`<=`-edition matching and is correct here too.

## b. Is the sign convention (`-1 * delta`) correctly grounded?

**Yes, and it is the most directly-grounded choice possible.** `indicator-semantics.md` lines
65-66 document that the *original 2018 thesis pipeline itself* negates this exact field's change
(`dau5_msr * -1`) with the stated rationale "DAU5 falling → gentrifying." This model reproduces
that convention verbatim rather than inventing a new one, and cites the exact source lines in its
header — this is the R-C2 grounding rule working as intended (citing a prior, already-audited
finding rather than re-deriving a sign convention from first principles). I re-derive the logic
independently and concur: a shrinking long-tenure share means established residents are leaving
faster than they are being replaced by other long-tenure residents, which is turnover-positive by
construction, and the negation correctly maps "long-tenure share falls" to "turnover_raw rises."

## c. Is the #197 NULL-propagation for 2024/2025 handled honestly?

**Yes.** I independently queried the built table: `residence_duration_5y_share` is `0/542` and
`0/540` populated for `reference_year` 2024 and 2025 respectively in `int_ewr_socioeco` (confirmed
directly, not assumed from the ticket). The model's `INNER JOIN` on `residents_total > 0` still
lets 2024/2025 rows *exist* in the base CTE (population is fine, only the residence-duration field
is missing), so the resulting `turnover_raw`/`turnover_proxy` for `reference_year=2025` are NULL by
correct propagation rather than silently zero-filled or dropped — I confirmed all 540 `2025` rows
in the final output have `turnover_raw IS NULL`. This is honest and matches the model's own header
disclosure; no corrective action needed, this is downstream of the already-tracked #197 gap.

## d. Is the z-score-per-year normalization sound, and is this a defensible standalone (non-composite) construct?

**Yes.** `NULLIF(stddev_pop(...), 0)` guards degenerate years, matching the house pattern in
`int_ewr_socioeco` and `int_berlin_rent_pressure_proxy`. Unlike the rent-pressure proxy, this is a
single-indicator change score, not a multi-input composite — there is no weighting/averaging
decision to scrutinize here, which simplifies the statistical review considerably. I verified the
per-year `turnover_proxy` values have `stddev_pop ≈ 1.0` for every populated year (2009-2020), as
expected for a per-year z-score.

## e. Any spatial-method (CRS/MAUP) concern?

None. Purely tabular — no new geometric operation, no new spatial join, same PLR grain already
audited for `int_ewr_socioeco`.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The sign convention is directly and correctly grounded in the thesis's own
documented convention (R-C2 satisfied at the strongest possible level — reproducing an
already-audited prior finding rather than introducing a new judgment call); the explicit
year-over-year self-join correctly avoids the multi-year-gap trap a naive `LAG()` would have
introduced across the real 2020→2024 EWR gap; the #197 NULL-propagation for 2024/2025 is honest
and independently verified; the per-year z-score construction is sound and, being single-indicator,
carries no weighting-decision risk. No defect found.

### Conditions (must be satisfied before this proxy is promoted into `gentrification_index` or any published mart)

- **C1 — Any future promotion into the governed index or an intermediate sub-index must state
  explicitly that this is a *single-indicator* change signal**, not a composite, and should be
  paired with the rent-pressure proxy and/or Milieuschutz marker (per B1-rent-pressure-domain
  Recommendation D4) rather than presented in isolation.
- **C2 — Carry the #197 coverage gap forward.** Any consumer must handle
  `turnover_proxy IS NULL` for `reference_year=2025` explicitly (do not impute or zero-fill), and
  should be aware the gap will persist for any future year until #197 is resolved upstream.

### Recommendations (non-blocking)

- **R1 — Once #197 is resolved**, backfill/rebuild will naturally repopulate 2024/2025 rows; no
  model change needed, just a rebuild.
- **R2 — Consider exposing a `years_since_prev` column** if this model is ever generalized to a
  non-annual-cadence city (mirrors the H-C3 Hamburg annual-cadence caution) — not needed for
  Berlin today since the self-join already enforces exactly 1-year adjacency.

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- `docs/methodology/indicator-semantics.md` lines 65-66 (thesis `dau5_msr * -1` convention),
  103 (DAU5 level vulnerability-positive finding), 184-190 (DAU5/DAU10 semantic pass)
- `transform/models/intermediate/int_ewr_socioeco.sql` (source panel, z-score pattern precedent)
- `transform/models/intermediate/int_ewr_lead_lag.sql` (year-over-year EWR delta precedent,
  explicit-adjacency discipline already applied there for the `delta_ewr_vs_prev` column)
- `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql` (nearest-vintage-matching
  discipline precedent) + `docs/methodology/B1-rent-pressure-geo-signoff.md`
- Issue #197 (upstream EWR CSV parse failures 2024/2025) — coverage-gap cross-reference

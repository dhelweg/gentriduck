---
task: D3-brw-change / #263 — BRW change / rent-gap-realisation signal
author: geo-data-scientist
date: 2026-07-16
branch: feature/263-d3-brw-change
---

# Geo-DS methodology sign-off — D3 BRW trend (`int_berlin_brw_trend`)

- **Branch:** `feature/263-d3-brw-change`
- **Issue / task:** #263 [D3-brw-change] — explicit, separately-polarised BRW change signal,
  deferred from D3 (#29) per that ticket's own geo-signoff condition 14 ("a defensible
  `brw_yoy`/`brw_trend` change signal is possible ... but it must be built and polarised as an
  explicit change indicator, distinct from the level").
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_brw_trend.sql`
  - `transform/models/intermediate/schema.yml` (new block)
  - Cross-reference: `docs/epic-d/d3-price-rent-geo-signoff.md` (condition 14, the deferral this
    ticket discharges), `int_berlin_brw_plr.sql` (source level model), `int_berlin_turnover_proxy.sql`
    (explicit self-join precedent), `int_berlin_rent_pressure_proxy.sql` (z-score-composite pattern
    precedent)
  - Independently queried the built table (`data/gentriduck.duckdb`,
    `main.int_berlin_brw_trend`): per-`snapshot_year` `avg(brw_trend)` ≈ 0 (order 1e-16) for every
    year 2018–2024, confirming the per-year z-score is centred as expected.

This model is methodology-bearing under R-C1 (a new normalized predictor-side signal). Not yet a
consumer of `int_gentrification_ts` or `gentrification_index` — contained blast radius, same
staged-slice pattern already used for `int_berlin_rent_pressure_proxy` and
`int_berlin_turnover_proxy`.

## a. Is the year-over-year self-join (rather than `LAG()`) the right choice, and is it correctly implemented?

**Yes.** I checked `int_berlin_brw_plr`'s actual year coverage: 2017–2024, but coverage is per-PLR
conditional on residential BRW zones overlapping that PLR in that year (a PLR can appear in some
years and not others as zone boundaries are redrawn). A blind `LAG() OVER (ORDER BY snapshot_year)`
would bridge any such gap as a spurious 1-year delta. The model instead does an explicit
`INNER JOIN ... ON prev.snapshot_year = curr.snapshot_year - 1`, correctly dropping any pair without
a true adjacent-year counterpart — the same discipline already applied and approved in
`int_berlin_turnover_proxy`. I independently verified the built table has no row for
`snapshot_year = 2017` (correctly absent — no predecessor exists), and `snapshot_year` ranges
2018–2024 exactly as documented.

## b. Is the percentage-change form (rather than raw EUR delta) the right basis for z-scoring, and is the polarity correctly grounded?

**Yes, on both counts.** BRW levels vary by roughly an order of magnitude across Berlin PLRs (from
low hundreds to several thousand EUR/m²); z-scoring the raw absolute delta would let PLRs with a
high baseline dominate the standardisation purely on scale, not on relative pressure. Converting to
`brw_yoy_pct_change` first removes that scale confound — this is the correct normalisation choice
for a cross-sectional comparison of price *pressure*, not price *level*. On polarity: the model
documents "HIGH brw_trend = land value rose faster than the citywide average = upgrading pressure
being actively realised," which is exactly the D3 geo-signoff condition 14 / Smith (1979)
rent-gap-realisation framing this ticket was scoped to build. I confirm this is change-positive, the
opposite convention from a vulnerability composite (where high = more vulnerable), and the header
correctly warns against pooling it unsigned into a vulnerability composite. No re-orientation
needed.

## c. Is the z-score-per-year normalization sound, and is this a defensible standalone (non-composite) construct?

**Yes.** `NULLIF(stddev_pop(...), 0)` guards degenerate years, matching the house pattern already
approved in `int_ewr_socioeco`, `int_berlin_rent_pressure_proxy`, and `int_berlin_turnover_proxy`.
This is a single-indicator change score (like `int_berlin_turnover_proxy`), not a multi-input
composite — no weighting/averaging decision to scrutinize. I independently verified the per-year
`brw_trend` values have `avg ≈ 0` for every populated year (2018–2024) as expected for a per-year
z-score.

## d. Is the residential-coverage guard correctly inherited, and is the "never zero-impute" discipline preserved?

**Yes.** `int_berlin_brw_trend` performs no independent coverage filtering — it inherits the
guarantee from `int_berlin_brw_plr` that a PLR with zero residential BRW coverage never appears with
a `brw_weighted_avg_eur_m2` of `0`; it is simply absent from that year's rows. The self-join
therefore naturally excludes any (year_t, year_t-1) pair where either year lacks residential BRW
coverage, rather than manufacturing a delta against an implicit zero. This correctly preserves the
"exclude, don't zero-impute" discipline (index-definition §7) through the new model.

## e. Any spatial-method (CRS/MAUP) concern?

None. Purely tabular over the already-audited `int_berlin_brw_plr` output — no new geometric
operation, no new spatial join, no new CRS handling. The lor_2021-only vintage constraint is
correctly inherited (BRW change is only meaningful over the same fixed PLR geometry across years;
mixing vintages would conflate a boundary redraw with a genuine value change).

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The construction matches, without deviation, what D3's own geo-signoff condition 14
pre-approved as the correct future shape for this signal — the explicit self-join avoids the
coverage-gap trap a naive `LAG()` would introduce, the percentage-change basis correctly removes a
scale confound before standardising, the polarity is correctly grounded in Smith (1979) and stated
as change-positive (opposite the vulnerability convention, with an explicit non-pooling warning),
and the residential-coverage "never zero-impute" discipline is correctly inherited from
`int_berlin_brw_plr`. No defect found.

### Conditions (must be satisfied before this signal is promoted into `int_gentrification_ts`, `gentrification_index`, or any published mart)

- **C1 — Any future wiring into `int_gentrification_ts` must place `brw_trend` on the
  predictor/lead side (ADR-0008), never blended with the D1/D2 MSS outcome side, and must state its
  change-positive polarity explicitly** so a future maintainer does not accidentally pool it unsigned
  into a vulnerability composite.
- **C2 — Any public/G2 framing of `brw_trend` must carry the "not a measured rent or displacement
  outcome" caveat** (per D3 domain sign-off point D5) and should be read jointly with low-status/
  low-Wohnlage context, not presented alone as a displacement-risk score.
- **C3 — Back-series-depth caveat carries forward**: only 2018–2024 change years exist (7 years);
  any consumer computing longer-run trend statistics (e.g. multi-year slopes) should be aware of
  this shallow depth relative to the EWR/POI panels.

### Recommendations (non-blocking)

- **R1 — When #258 (D5-wire)'s displacement/affordability sub-index work is picked up**, consider
  whether `brw_trend` (predictor-side, land-value realisation) is a natural fourth input alongside
  the Milieuschutz flag / rent-pressure proxy / turnover proxy — but note it sits on the opposite
  side of the index (predictor vs. B1's more outcome-adjacent proxies) per ADR-0008, so this is a
  placement question for that ticket's own gate, not decided here.
- **R2 — A future wiring ticket** (mirroring #258's pattern for the B1 proxies) should thread
  `brw_trend` through `int_gentrification_ts`'s three branches (2021 / pre2021 / Hamburg), with
  explicit `NULL` casts where BRW data does not exist (pre2021 BRW back-series depth and Hamburg
  BRW sourcing are both open, unaddressed questions — not resolved by this ticket).

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- `docs/epic-d/d3-price-rent-geo-signoff.md` condition 14 (the deferral this ticket discharges)
- `transform/models/intermediate/int_berlin_brw_plr.sql` (source level model, area-weighted
  intensive-variable formula, residential-only filter, vintage constraint)
- `transform/models/intermediate/int_berlin_turnover_proxy.sql` +
  `docs/methodology/B1-turnover-geo-signoff.md` (explicit self-join discipline precedent)
- `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql` (z-score-composite pattern
  precedent)
- Smith, N. (1979). "Toward a theory of gentrification: a back to the city movement by capital, not
  people." *Journal of the American Planning Association*, 45(4), 538–548. (rent gap /
  rent-gap-realisation framing)

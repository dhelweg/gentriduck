---
task: B1 / #70 — Berlin rent-pressure / affordability-stress proxy (ADR-0019 Decision 2)
author: geo-data-scientist
date: 2026-07-09
branch: feature/70-b1-rent-pressure-proxy
---

# Geo-DS methodology sign-off — B1 rent-pressure proxy (`int_berlin_rent_pressure_proxy`)

- **Branch:** `feature/70-b1-rent-pressure-proxy`
- **Issue / task:** #70 [B1], second slice — the affordability/rent-pressure proxy ADR-0019
  Decision 2 explicitly deferred to a follow-up gated slice.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql`
  - `transform/models/intermediate/schema.yml` (new block)
  - `docs/adr/0019-berlin-milieuschutz-displacement-source.md` (Decision 2, Alternative C)
  - Cross-reference: `docs/methodology/R-A4-geo-signoff.md` (transferbezug sign/coverage
    findings this model inherits), `int_ewr_socioeco.sql` (the z-score-composite pattern mirrored)

This model is methodology-bearing under R-C1 ("any model that changes indicator weights,
normalization, or spatial method" — it constructs a new normalized composite). Not yet a consumer
of `gentrification_index` (ADR-0019 explicitly scoped that integration to a later slice), so the
blast radius is contained, but the *formula* itself needs to be right before anything downstream
relies on it.

## a. Is the z-score-of-(rent-level, transfer-share) construction statistically sound?

**Yes, with one caveat already disclosed.** Both inputs are put on a comparable unit-variance scale
via per-`snapshot_year` z-scoring (`NULLIF(stddev_pop,0)` degenerate-year guard), then averaged with
equal weight — this is the same construction as `int_ewr_socioeco`'s composite (mean of z-scores,
not a sum, correctly avoiding the SD-inflation trap that model's own header warns about). I
independently verified the join fix (area_code was originally missing from the `transfer_stress`
join predicate, causing a 542×542 cross-join fan-out on first build; the corrected model now passes
the `unique_combination_of_columns` test at the declared grain with `est_rent_mid`/`transferbezug_anteil`
row counts matching their source tables exactly for every snapshot_year — I re-ran this check
independently against the built table, not just trusting the dbt test pass).

The equal-weight choice (rather than a fitted/PCA weight) is a defensible default for a *first-cut
proxy* explicitly scoped as "not a true burden ratio" (ADR-0019) — I would not require empirical
weight-fitting before this can exist as a standalone diagnostic column, but any future consumer that
promotes this into the governed index must either justify equal weighting explicitly or run a
sensitivity check on the weight (per ADR-0008's mandated sensitivity-analysis precedent for
composite indices). Flagging this as a condition for the *next* slice, not this one.

## b. Is the edition-matching (nearest-<=-MSS-edition per Wohnlage snapshot_year) correct and honestly documented?

**Yes — and the model corrects a documentation gap in doing so.** I checked the *as-ingested*
`transferbezug_anteil` null pattern directly against `stg_berlin_mss_indicators` rather than trusting
the R-A4/#67 sign-off's summary ("null ≤2021"): the true pattern is non-null for editions 2015, 2017,
2023, 2025 and null only for 2019, 2021. The model's header and schema.yml comments were updated to
state this precisely (with the divergence from R-A4's characterization called out explicitly) rather
than propagate a stale claim. This is good practice — verifying against the actual data rather than
citing a prior sign-off's prose from memory — and it changes the practical coverage picture
materially: **3 of 5 Wohnlage snapshot years now have a populated composite (2017, 2023, 2026)**, not
the 2-of-5 the ADR's own header implied. I recommend a similar direct-data-check discipline be
applied whenever a new model cites an older sign-off's summary numbers.

The nearest-`<=`-edition join logic itself is correct: for each Wohnlage `snapshot_year` it picks
`max(edition) where edition <= snapshot_year`, exactly mirroring the already-approved Mietspiegel
vintage-matching pattern (geo condition 8 precedent) — same city_code, same area_vintage scoping to
respect the LOR 2019→2021 boundary.

## c. Is the "no rent-to-income ratio" framing (ADR-0019 Alternative C rejection) upheld?

**Yes.** The model computes a relative-position composite (two z-scores averaged), not a literal
ratio, and the column/model documentation is explicit and repeated at three sites (model header,
schema.yml model description, `rent_pressure_proxy` column description) that this is *not* a
burden ratio and *not* backed by a PLR-grain income series. This is the correct honesty discipline
under R-C2 grounding — no methodology choice here overclaims beyond what the inputs support.

## d. Sign-convention / polarity check

Both terms are vulnerability/pressure-positive under the house convention (R-A5): higher
`est_rent_mid` (rent above the year's median) and higher `transferbezug_anteil` (more transfer-
dependent residents) both increase the composite. I re-confirm the R-A4/#67 Finding d conclusion
(no negation needed for `transferbezug_anteil` as a *level* share, as opposed to the `*_dynamik`
change variable that finding specifically warned about — this model uses the level, not the dynamik,
so that trap does not apply here). No polarity issue found.

## e. Any spatial-method (CRS/MAUP) concern?

None. This model performs no geometric operation; it is a tabular join + per-year z-score over the
existing PLR grain inherited from its two staged inputs. No new MAUP exposure beyond what
`int_price_rent_wohnlage_mietspiegel` and `stg_berlin_mss_indicators` already carry (and have
already been signed off).

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The composite construction is statistically sound and mirrors an already-approved
house pattern (`int_ewr_socioeco`); a real join bug (missing `area_code` predicate causing row
explosion) was caught and correctly fixed before this sign-off, and I independently re-verified the
fix; the edition-matching is correct and its coverage claim was tightened against the actual ingested
data rather than an inherited summary; the "not a ratio" framing from ADR-0019 is upheld throughout;
sign convention is correct; no spatial-method issue. This model is not yet a consumer of the governed
index, so no contract/index-definition change is in scope for this PASS.

### Conditions (must be satisfied before this proxy is promoted into `gentrification_index` or any published mart)

- **C1 — Justify or sensitivity-test the equal weighting** before promotion into any governed index,
  per ADR-0008's sensitivity-analysis mandate for composite indices.
- **C2 — Carry the coverage gap forward.** Any consumer must handle `rent_pressure_proxy IS NULL`
  for `snapshot_year` in (2019, 2021) explicitly (not silently drop or zero-fill those rows).

### Recommendations (non-blocking)

- **R1 — G2 caveat when this proxy is ever surfaced publicly:** state plainly that it is a
  relative-position composite of modelled rent and transfer-receipt share, not observed rent burden,
  not a ratio, and not causal evidence of displacement.
- **R2 — Consider a per-edition indicator-availability dbt test** for `transferbezug_anteil` (mirrors
  R-A4/#67 Recommendation R2), which would have made this model's more-precise coverage finding
  testable/visible rather than requiring a manual data check during this sign-off.

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- ADR-0019: `docs/adr/0019-berlin-milieuschutz-displacement-source.md` (Decision 2, Alternative C)
- R-A4/#67 geo-signoff: `docs/methodology/R-A4-geo-signoff.md` (transferbezug coverage/sign findings)
- `transform/models/intermediate/int_ewr_socioeco.sql` (z-score-composite pattern precedent)
- `transform/models/intermediate/int_price_rent_wohnlage_mietspiegel.sql` (nearest-<=-vintage
  matching precedent, geo condition 8)

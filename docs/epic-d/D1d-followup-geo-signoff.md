# D1d-followup Geo-Data-Scientist Sign-Off

- **Task:** Derive a technically-correct 2021 -> pre2021 PLR reverse crosswalk to re-key
  `mart_price_rent_dimension` onto `lor_pre2021` area codes
- **Issue:** #136
- **Date:** 2026-07-04
- **Verdict: PASS**

---

## Context

`mart_price_rent_dimension` is published only on the `lor_2021` (542-PLR) scheme, because
its source models (`int_berlin_brw_plr`, `int_berlin_wohnlage_plr`) always join against the
post-2021 LOR geometry for a single consistent spatial grain. The governed
`gentrification_index` (currently only period 201612) and the `area-detail` page report on
`lor_pre2021` (447/448-PLR) instead — a different area-code scheme, not just a renumbering
— so the price/rent dimension was previously unreachable from the governed index/UI (#135,
resolved at the time as a documented limitation rather than a crosswalk).

#136 asks whether a *technically correct* reverse (2021 -> pre2021) crosswalk can now close
that gap, and requires geo-DS sign-off because it is a new spatial derivation/join direction,
not a mechanical reuse of the already-approved forward crosswalk (#51/#63,
`docs/epic-c/C3-crosswalk-geo-signoff.md`).

---

## Approach under review

Two artefacts were proposed and implemented:

1. **`ingestion/berlin/lor/ingest_lor_crosswalk.py`** was extended to compute a
   `reverse_weight` column from the *same* intersection geometry as the existing
   forward `weight`:
   - `weight(i, j) = intersection_area(i, j) / area(pre2021 PLR i)` (existing, #51/#63)
   - `reverse_weight(i, j) = intersection_area(i, j) / area(2021 PLR j)` (new, #136)

   Both are written to `seed_lor_crosswalk_2006_to_2021` (now 3088 rows, up from 3055 —
   the re-run against the same source geometries picked up a handful of additional
   near-boundary slivers at the same `WEIGHT_SUM_TOLERANCE`; not a methodology change).

2. **`mart_price_rent_dimension_pre2021.sql`** (new mart) re-keys
   `mart_price_rent_dimension`'s intensive covariates (BRW EUR/m2, Wohnlage
   composition/score, modelled rent) onto `lor_pre2021` area codes.

---

## Methodology assessment

### 1. Key finding: the reverse re-keying of *this mart* does not actually need `reverse_weight`

This is the central technical correction from this review. The #136 ticket's premise —
that the existing forward `weight` column is "not invertible without re-deriving areas
from source geometry" — is not correct for the specific operation this mart needs.

Re-deriving *why*: `weight(i, j) = intersection_area(i, j) / area(i)` is defined per
pre-2021 PLR `i`, and by construction `SUM_j weight(i, j) = 1.0` for a **fixed** `i`
(validated at ingestion, `WEIGHT_SUM_TOLERANCE = 0.01`). That is *exactly* the
areal-weighted-average coefficient set needed to blend 2021-grain intensive values into a
pre-2021 PLR's footprint:

```
value_pre2021(i) = SUM_j( value_2021(j) * weight(i, j) )     -- weights already sum to 1 over j, for fixed i
```

This is the identical technique `int_berlin_brw_plr` already uses (area-weighted mean of
an intensive variable across a non-aligned tessellation), just applied PLR-to-PLR instead
of BRW-zone-to-PLR. **No new weight derivation was required for this specific
re-keying** — grouping the *existing*, already-approved forward crosswalk rows by
`plr_id_pre2021` (instead of by `plr_id_2021`, as `int_berlin_ewr_plr2021` does) is
sufficient and correct.

`reverse_weight` (`intersection_area / area_2021_plr`) is the correct primitive for the
*different* operation of apportioning an **extensive** (count) value defined on the 2021
grid into pre-2021 shares (by construction, `SUM_i reverse_weight(i, j) = 1.0` for a fixed
`j`) — the mirror image of what `int_berlin_ewr_plr2021` already does in the forward
direction for extensive EWR indicators. No such extensive-apportionment consumer exists
yet, but the primitive is a legitimate, low-risk addition to the shared crosswalk seed
(re-uses the intersection geometry the ingestion script already computes) and is validated
identically to the forward direction. **Approved as a general-purpose crosswalk
primitive**, even though it is not exercised by #136's mart itself.

### 2. Areal-weighted averaging as the reaggregation method (both directions)

**Approved**, on the same basis as the original C3-crosswalk sign-off: Flowerdew & Green
(1992) areal interpolation with dasymetric (intersection-area) weights is the standard,
reproducible method for reaggregating administrative statistics across a boundary reform,
using only publicly available LOR geometries (CC BY 3.0 DE). Using the *same* intersection
geometry for both normalizing directions (rather than recomputing intersections) is
correct and avoids introducing a second source of geometric error.

### 3. Intensive-variable NULL handling

**Approved, and an improvement over a naive weighted sum.** `mart_price_rent_dimension_
pre2021` computes a NULL-aware weighted average per covariate — both the numerator and
the (renormalized) denominator restrict to 2021 PLRs where the covariate is non-NULL:

```
value_pre2021(i) = SUM_j(value_2021(j) * weight(i,j) WHERE value_2021(j) IS NOT NULL)
                   / SUM_j(weight(i,j) WHERE value_2021(j) IS NOT NULL)
```

This is preferable to the `SUM`-only approximation `int_berlin_ewr_plr2021` uses for
intensive EWR indicators (which was accepted there as "standard practice absent sub-PLR
population grids", but does not renormalize by available weight mass). Renormalizing
avoids silently downward-biasing a pre-2021 PLR's estimate when part of its footprint
falls on non-residential/low-n 2021 PLRs (e.g., parks, water, thin Wohnlage samples).
The `*_coverage_frac` columns (retained weight mass, 0-1) give consumers a transparent
signal of estimate reliability — a stronger transparency posture than the source mart's
`brw_residential_coverage_frac` alone. **Recommend**: surface `*_coverage_frac` (or a
threshold-derived flag) on the G2/area-detail page if this mart is used for any
comparative ranking; the current area-detail integration (line-chart + table only) is
low-risk without it, so this is a recommendation, not a blocking condition.

### 4. `wohnlage_low_n` propagation at the re-keyed grain

**Approved.** `wohnlage_low_n_pre2021` is TRUE when the weight-apportioned address count
(`SUM(weight * total_n_addresses)`, an extensive-style apportionment of a count — correct
use of `weight` for this sub-purpose since it is being summed, not averaged) is below the
same 10-address threshold used at the lor_2021 grain, OR when every contributing 2021 PLR
was itself already low_n. This is a conservative (OR, not AND) low_n propagation rule that
correctly refuses to manufacture a stable estimate out of several individually-unstable
2021-grain estimates.

### 5. Scope: levels only, not z-scores/ranks

**Approved.** The re-keyed mart intentionally does not recompute winsorized z-scores,
rank, or percentile at the lor_pre2021 grain — those are normalization moments over the
*lor_2021* population (`brw_moments`/`ws_moments`/`er_moments` in
`mart_price_rent_dimension`) and would need their own city-year moments computed over the
lor_pre2021 population to be meaningful, which is legitimately a separate, larger
follow-up (a second full renormalization pass) rather than part of a spatial re-keying
task. Documented as an explicit non-goal in the model header; no methodology risk from
leaving it out.

### 6. Weight-sum conservation validation (new: reverse direction)

**Required gate — met.** `ingest_lor_crosswalk.py` now validates both `weight`
(per pre-2021 PLR) and `reverse_weight` (per 2021 PLR) sums against the same
`WEIGHT_SUM_TOLERANCE = 0.01`. Observed at ingestion (2026-07-04): forward weight sums
mean=1.0000, min=0.9993, max=1.0000 (448/448 PLRs within tolerance); reverse weight sums
mean=1.0000, min=0.9987, max=1.0000 (542/542 PLRs within tolerance). A new dbt test,
`test_lor_reverse_crosswalk_weight_conservation.sql`, enforces this at build time
(mirrors the existing `test_lor_crosswalk_population_conservation.sql` forward check).

### 7. MAUP exposure (second-order)

**Acceptable, documented.** Re-keying a PLR-level aggregate across a boundary reform is a
second exposure to the Modifiable Areal Unit Problem on top of the existing PLR-level
ecological-fallacy guardrail already documented on `mart_price_rent_dimension` (domain
D10, Openshaw 1984). This is inherent to any cross-vintage crosswalk (already accepted
for the forward EWR direction in C3-crosswalk) and does not introduce new risk beyond
what's already disclosed; no additional guardrail needed beyond the existing PLR-level
ecological-fallacy language, carried through in the new mart's schema/header.

---

## Risks

1. **Coverage-thinning at the re-keyed grain**: a pre-2021 PLR whose footprint spans
   several 2021 PLRs, some non-residential, will have a lower-coverage (more uncertain)
   estimate than either source PLR alone. Mitigated by `*_coverage_frac` (transparency,
   not correction).
2. **Compounding two boundary-crossing operations**: a value that was already an
   area-weighted approximation inside `int_berlin_brw_plr` (BRW-zone -> lor_2021 PLR) is
   now re-averaged a second time (lor_2021 PLR -> lor_pre2021 PLR). Each step is
   individually sound (areal interpolation with intersection-area weights); the
   compounding is a second-order smoothing effect, not a bias, and is standard for
   multi-hop areal interpolation chains.
3. **`reverse_weight` is currently unused** (no extensive-apportionment consumer exists
   yet). Low risk — it is a validated, documented, low-maintenance addition to an
   already-approved seed; if it goes unused indefinitely, a future cleanup could drop it,
   but there is no correctness or governance risk in keeping it.

---

## Conditions for implementation approval

1. **Weight-sum validation, both directions** — met (§6 above); dbt test added.
2. **NULL-aware (not zero-filled) weighted averaging** for every re-keyed covariate — met
   (§3 above).
3. **Document the "no new weight needed" finding** in the new mart's model header, so a
   future reader does not re-derive `reverse_weight` under the mistaken assumption it is
   required for this operation — met (`mart_price_rent_dimension_pre2021.sql` header).
4. **Carry through the source mart's polarity/framing caveats** (structural LEVEL vs
   dynamic signal, Milieuschutz counter-misuse framing, ecological-fallacy guardrail) —
   met by cross-reference in the new mart's schema.yml description; this is a
   re-projection of an already-signed-off mart, not a new signal requiring its own
   domain-expert review.
5. **Domain-expert sign-off**: not required. Confirmed at review time per the issue's own
   scope note — this changes only the spatial grain of an already domain-signed-off mart
   (`docs/epic-d/d3-price-rent-domain-signoff.md`), not its indicator definitions, framing,
   or ethical posture.

---

## Sign-Off

```json
{
  "verdict": "pass",
  "rationale": "The reverse (2021->pre2021) re-keying of mart_price_rent_dimension's intensive covariates does not require a newly-derived weight: the existing forward `weight` column (from the already-approved #51/#63 crosswalk) already sums to 1.0 per pre-2021 PLR, which is exactly the areal-weighted-average operator needed for this direction (same technique as int_berlin_brw_plr, applied PLR-to-PLR). The newly-added `reverse_weight` column is a separately-validated, correct primitive for a different (extensive-apportionment) use case, not required by this mart but a sound general-purpose addition to the shared crosswalk seed. NULL-aware weighted averaging (not zero-fill) and explicit coverage-fraction reporting improve on the forward direction's precedent. Weight-sum conservation validated in both directions at +/-0.01 tolerance, enforced by a new dbt test. Scope is correctly limited to covariate levels; z-scores/ranks are not recomputed at this grain (documented non-goal). Domain-expert sign-off not required -- no change to indicator definitions or framing, only spatial grain.",
  "risks": [
    "Coverage-thinning at the re-keyed grain for footprints spanning non-residential/low-n 2021 PLRs (mitigated by *_coverage_frac transparency)",
    "Compounding two areal-interpolation hops (BRW-zone->lor_2021, lor_2021->lor_pre2021) is a second-order smoothing effect, not a bias",
    "reverse_weight is currently unused by any consumer; low risk, documented as a general-purpose primitive"
  ],
  "recommendations": [
    "Surface *_coverage_frac (or a derived threshold flag) on any future comparative ranking/G2 use of this mart",
    "If a pre2021-grain ranking is ever needed, compute a fresh set of city-year normalization moments over the lor_pre2021 population rather than reusing the lor_2021 moments"
  ]
}
```

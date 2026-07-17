---
task: D3-brw-wire / #273 — wire brw_trend predictor into int_gentrification_ts
author: geo-data-scientist
date: 2026-07-16
branch: feature/273-d3-brw-wire
---

# Geo-DS methodology sign-off — D3 BRW-trend wiring (`int_gentrification_ts`)

- **Branch:** `feature/273-d3-brw-wire`
- **Issue / task:** #273 [D3-brw-wire] — thread `brw_trend` (`int_berlin_brw_trend`, #263) through
  `int_gentrification_ts`'s branch structure, discharging D3-brw-trend-geo-signoff recommendation R2
  ("a future wiring ticket ... mirroring #258's pattern for the B1 proxies").
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_gentrification_ts.sql` (new `brw_2021` CTE, left join into
    `joined_2021`, explicit `NULL` casts in `joined_pre2021`/`joined_hamburg`)
  - `transform/models/intermediate/schema.yml` (new `brw_trend`/`brw_yoy_pct_change` column blocks)
  - `docs/methodology/index-definition.md` row 475 (updated to reflect the wiring)
  - Cross-reference: `docs/methodology/D3-brw-trend-geo-signoff.md` conditions C1-C3, recommendation
    R2 (the deferral this ticket discharges)
  - Independently queried the built table (`data/gentriduck.duckdb`, `main.int_gentrification_ts`):
    `brw_trend`/`brw_yoy_pct_change` populated for 1,080 of 1,626 `('BER','lor_2021')` rows (the
    remainder correctly NULL — first-edition 2021 rows have no year_t-1 BRW predecessor, and PLRs
    without residential BRW coverage in either year are naturally excluded), and exactly 0 of 1,788
    `('BER','lor_pre2021')` rows and 0 of 11,020 `('HH','current')` rows — confirming the branch
    scoping is correctly enforced.

This wiring is methodology-bearing under R-C1 (placement of a normalized predictor-side signal into
the governed time-series panel; ADR-0008 placement discipline applies).

## a. Is `brw_trend` correctly placed on the predictor/lead side, never blended with the D1/D2 outcome or D4 baseline?

**Yes.** The join adds `brw_trend`/`brw_yoy_pct_change` as two new standalone columns in
`joined_2021`, alongside (not merged into) `status_score`/`dynamism_score`/`status_index`/
`dynamik_index`/`ewr_composite`. No arithmetic combines it with any outcome or baseline column. This
is exactly condition C1 of the #263 geo-signoff ("place `brw_trend` on the predictor/lead side,
never blended with the D1/D2 MSS outcome side, and must state its change-positive polarity
explicitly").

## b. Is the join key correct and does it avoid a cross-vintage leak?

**Yes.** The join is `mss.area_code = brw.area_code AND mss.area_vintage = brw.area_vintage AND
mss.edition = brw.snapshot_year`, applied only inside `joined_2021` (Branch A). Including
`area_vintage` in the join predicate is a defensive correctness measure — although
`int_berlin_brw_trend` is `lor_2021`-only in practice, requiring the explicit vintage match means a
future upstream change (e.g. if `int_berlin_brw_trend` ever gained multi-vintage rows) could not
silently cross-contaminate Branch A with a mismatched vintage. `joined_pre2021` and `joined_hamburg`
correctly use `cast(null as double)` rather than any join — I verified this is not a "join that
happens to return NULL" but a hard-coded absence, which is the correct choice since
`int_berlin_brw_trend` has no lor_pre2021 or Hamburg rows to join against at all (joining against an
empty/filtered set vs. explicit NULL cast are equivalent in output but the explicit cast is clearer
and matches the house style used for `status_score_improved` et al.).

## c. Is the "not yet surfaced on `gentrification_index`" scope decision defensible?

**Yes.** The ticket's own scope note left this open ("decide whether/how to surface this on
`gentrification_index` ... or leave it at the `int_gentrification_ts` predictor layer only"). I
reviewed `gentrification_index`'s contract: it is a per-`variant` shape (`status_index`/
`dynamism_index`/`status_class`/...) built around either the D1×D2 MSS typology (`live_data`) or a
full predictor-substitution (`improved`, OA-B.3). `brw_trend` is a single indicator, not a
status/dynamism-shaped replacement — forcing it into that contract's `status_index`/`dynamism_index`
slots would misrepresent it as a typology-equivalent, which it is not (it has no typology derivation,
unlike `improved`'s `status_score_improved`/`dynamism_score_improved` which *do* substitute for a
full D3 predictor pair). Leaving it at the `int_gentrification_ts` layer, with the mart-surfacing
question explicitly deferred to "a future deliberate contract-extension ticket," is the correct,
minimal-blast-radius choice — it does not foreclose future publication, and does not risk a rushed,
ill-shaped contract change under this ticket's scope.

## d. Back-series-depth and coverage caveats — correctly carried forward?

**Yes.** The new header comment in `int_gentrification_ts.sql` and the `schema.yml` column
description both restate: change-positive polarity, "not a measured rent or displacement outcome,"
and the Berlin-lor_2021-only scope with pre2021/Hamburg sourcing explicitly flagged as open,
unresolved questions (not silently assumed away). This matches condition C2/C3 of the #263
geo-signoff.

## e. Any spatial-method (CRS/MAUP) concern?

None new. This is a tabular join on already-audited `int_berlin_brw_trend` output (itself audited in
the #263 geo-signoff) into an already-audited `int_gentrification_ts` panel — no new geometric
operation, spatial join, or CRS handling introduced.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The wiring correctly discharges the #263 geo-signoff's own recommendation R2:
`brw_trend` is added as a clean, non-blended predictor/lead-side column, correctly scoped to Branch A
(Berlin lor_2021) only with explicit `NULL` in Branch B/C rather than a silent join miss, and the
decision to leave it un-surfaced on the contract-enforced `gentrification_index` mart (deferring any
contract extension to its own future ticket) is the correct, minimal-risk scope call. `uv run poe
build` is green (PASS=806, WARN=4 pre-existing/unrelated, ERROR=0). No defect found.

### Conditions (must be satisfied before any future promotion to `gentrification_index` or a public dashboard)

- **C1 — Any future `gentrification_index` (or public dashboard) surfacing of `brw_trend` needs its
  own deliberate ADR-0004 contract-extension ticket** — do not silently repurpose the existing
  `status_index`/`dynamism_index` variant slots for a single non-typology indicator.
- **C2 — The change-positive polarity warning must travel with `brw_trend` into any future consumer**
  (never pooled unsigned into a vulnerability composite).

### Recommendations (non-blocking)

- **R1 — When #258 (D5-wire) is picked up**, revisit whether `brw_trend` should be considered
  alongside the B1 displacement proxies for a joint predictor-side sub-index, noting it sits on the
  opposite side of the index from B1's more outcome-adjacent proxies (per the #263 geo-signoff's own
  R1).

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- `docs/methodology/D3-brw-trend-geo-signoff.md` conditions C1-C3, recommendation R2 (the deferral
  this ticket discharges)
- `transform/models/intermediate/int_berlin_brw_trend.sql` (source predictor model, audited #263)
- `transform/models/intermediate/int_gentrification_ts.sql` (OA-B.3 `*_improved` columns — the
  precedent pattern for a Berlin-lor_2021-only predictor column with explicit NULL elsewhere)
- ADR-0008 (predictor/outcome/covariate placement discipline)
- ADR-0004 (`gentrification_index` governed contract)

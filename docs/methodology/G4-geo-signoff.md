---
task: G4 / #138 — backfill status_class_bi/dynamism_class_bi for the live_data variant
author: geo-data-scientist
date: 2026-07-04
model: transform/models/marts/gentrification_index.sql
---

# Geo-DS sign-off — G4 live_data binary classification backfill

## What changed

`gentrification_index.sql`'s `live_data` branch previously left `status_class_bi`,
`dynamism_class_bi` (and `dynamism_class`) hard-`NULL`, blocking the site from ever defaulting to
`live_data` (index.md's headline counts, dynamism-class bar chart, and "top pressure areas" table all
filter/group on these fields). Two deterministic derivations were added, both **relabels of an
existing governed ordinal**, not new thresholds or a new statistical method:

1. **`dynamism_class` / `dynamism_class_bi`** — a 1:1 relabel of the D2 MSS Dynamik ordinal already
   in the mart (`dynamism_index`: `1.0=positiv, 2.0=stabil, 3.0=negativ`) onto the same
   `positive/neutral/negative` domain the thesis variants use. No cut-point is invented — the MSS
   Senate's own three Dynamik classes *are* the three buckets. Both columns carry the identical value
   for `live_data` because, unlike the 2018 thesis (which ran two distinct classification passes,
   `_prj` and `_prj_bi`), there is only one MSS Dynamik reading to project.
2. **`status_class_bi`** — a 4-class-to-3-bucket grouping of the D1 MSS Status ordinal
   (`status_index`: `1=hoch, 2=mittel, 3=niedrig, 4=sehr_niedrig`) onto `high/medium/low`:
   `hoch→high`, `mittel→medium`, `{niedrig, sehr_niedrig}→low`. This is a **categorical grouping of
   an already-ordinal class**, not an arithmetic operation on the codes — it does not violate the
   ADR-0008 D1 binding (§1: "must... not average the class codes as if metric"; R-A3 geo-signoff C2).
   The niedrig/sehr_niedrig grouping is grounded in `index-definition-domain-draft.md`'s D1×D2 stage
   table, which already treats both classes as a single "-deprived" band in its stage naming
   (`stable-deprived` / `stable-very-deprived` fall in the same qualitative tier, both distinct from
   `stable-established`/`stable-high` at D1=1 and the mixed D1=2 tier). I reviewed this grouping
   against the published MSS 2023/2025 class distributions (already reconciled per R-A3 geo-signoff
   C1/R2, `docs/methodology/backtest.md`) and it does not distort the distribution: `niedrig` and
   `sehr_niedrig` are both minority classes at the low-status tail, so merging them for the coarse
   `_bi` field does not create a majority-swallowing bucket (see counts below).

`own_idx_class`/`own_idx_class_bi` remain `NULL` for `live_data` — correctly out of scope; they are
the D4/EWR own-index, not part of this ticket's D1/D2-derived acceptance criteria.

## Verification

- `uv run poe build`: PASS=593 WARN=2 (unchanged baseline warnings) ERROR=0.
- New `accepted_values` tests on `status_class_bi` (`high/medium/low`) and `dynamism_class_bi`
  (`positive/neutral/negative`) pass for `live_data` rows.
- No mismatch: 0 rows where `status_index`/`dynamism_index` is non-null but the derived `_bi` field
  is null (both derivations propagate `NULL` only for the 66 uninhabited-PLR rows, consistent with
  `status_class`/`typology_stage`'s existing null-for-uninhabited convention).
- `live_data` distribution (latest build): `status_class_bi` — high=547, medium=2167, low=634,
  null=66; `dynamism_class_bi` — positive=384, neutral=2628, negative=336, null=66. Distributions are
  directionally consistent with the MSS class shares reconciled in `backtest.md` (Dynamik `stabil`
  dominant per the Senate's own published shares; Status skews toward `mittel`).
- No new spatial method, weight, or normalization introduced — this is a categorical relabel/grouping
  of already-governed D1/D2 ordinals, so R-A9/ADR-0008's spatial-inference and sensitivity-analysis
  requirements are unaffected.

```
Verdict: PASS
Ref: ADR-0008 §1 (D1/D2 bindings), docs/methodology/index-definition-domain-draft.md D1xD2 stage
table, docs/methodology/backtest.md (MSS class-distribution reconciliation)
Conditions: none — pure relabel/grouping of already-governed ordinals, no new threshold rule.
```

# QA-raumid (#266) — repo-wide un-padded raum_id/area_code audit findings

**Ticket:** [#266](https://github.com/dhelweg/gentriduck/issues/266) ·
`docs/epic-c/tickets/QA-raumid.md`.
**Date:** 2026-07-16.

## Root cause

The 2018 thesis golden CSVs' `raum_id` column drops the leading zero for Bezirk 1-9 PLR codes
(7 chars, e.g. `'1033102'` instead of the WFS-canonical 8-char `'01033102'`). BZR-level `raum_id`
values in the same golden files do **not** exhibit this quirk (verified: all 137 BZR rows are a
consistent 6 chars) — the bug is PLR-specific.

`int_thesis_2018_area_index.sql` already `lpad`'d this correctly inside its own WFS-name-lookup
**join condition** (`on lpad(plr.raum_id, 8, '0') = wfs_names.area_code`), but the **emitted**
`area_code` column carried the raw, un-padded `raum_id` verbatim — the join fixed the *lookup*, not
the *output*. That mismatch propagated downstream to every consumer of this model's `area_code`.

## Empirical impact (measured before the fix)

- `int_thesis_2018_area_index` (plr level): 686 rows with a 7-char `area_code`, 186 with 8-char
  (out of 872 total plr rows across the 3 CTEs — standard, distance-weighted use the same golden).
- `dim_area` (plr level): **343 orphan duplicate rows** — a 7-char thesis-only row alongside the
  correct 8-char WFS row for the *same real-world PLR* (990 correctly-padded rows already present
  from the WFS sources, `stg_berlin_lor`). The `QUALIFY row_number() ... partition by (city_code,
  area_level, area_code)` dedup in `dim_area.sql` couldn't collapse these because the un-padded and
  padded strings are different partition keys.
- `dim_area_hierarchy`: PLR->BZR parent derivation already defended against this
  (`substr(lpad(area_code, 8, '0'), 1, 6)`) so it did not silently mis-derive parents, but was
  carrying the defensive lpad as a load-bearing fix rather than a no-op safety net.
- `gentrification_index` (the R-C1-gated, contract-enforced governed mart): the "2018 thesis
  baseline" `select *` from `int_thesis_2018_area_index` with **no** padding step of its own —
  the 343 affected PLRs' rows in the published index carried an un-padded `area_code` that would
  not join cleanly against `dim_area`'s WFS-sourced canonical rows in any consumer expecting 8-char
  keys (maps, area profile pages keyed by the WFS-canonical code).

## Fix applied

- **`int_thesis_2018_area_index.sql`**: `lpad()` applied to the *emitted* `area_code` in all three
  CTEs (`bzr_standard` -> 6 chars, `plr_standard` / `plr_distcalc` -> 8 chars), matching the width
  already used in each CTE's own join condition. Source-side fix — no consumer needs its own
  re-padding step anymore.
- **`dim_area_hierarchy.sql`**: comment updated to record that its defensive `lpad(area_code, 8,
  '0')` is now always a no-op (kept as a cheap guard against any future un-padded source, not
  removed).
- **New guard test** `transform/tests/test_thesis_area_code_padding.sql`: asserts
  `length(area_code) = 8` for `area_level = 'plr'` and `= 6` for `'bzr'` in
  `int_thesis_2018_area_index` — catches any regression of this exact bug class at the model
  boundary, default `error` severity (not overridden to `warn` in `dbt_project.yml`).

## Row-count / result parity (verified post-fix, `uv run poe build`: 799 PASS / 4 pre-existing
unrelated WARN / 0 ERROR — all 810 tests including the new guard)

| Check | Before | After |
|---|---|---|
| `int_thesis_2018_area_index` plr area_code widths | 686×7-char, 186×8-char | 872×8-char (row count unchanged: 872) |
| `dim_area` plr rows | 990×8-char + 343×7-char (orphans) | 990×8-char only — orphans eliminated |
| `dim_area_hierarchy` BER plr rows with `parent_area_code IS NULL` | (not re-measured; orphans would have failed the `not_null`/`relationships` tests were they reachable via this path) | 0 |
| `gentrification_index` variant row counts | standard/plr: 436, distance_weighted/plr: 436, standard/bzr: 137 (values unchanged) | Same counts, now uniformly 8-char (plr) / 6-char (bzr) `area_code` |

No status_index/dynamism_index/own_idx_class *values* changed for any row — this is purely a key-
formatting fix; the same 436 PLRs / 137 BZRs are present before and after, now joinable everywhere
via a single canonical, zero-padded `area_code`.

## Repo-wide audit of other `raum_id`/`area_code` joins (scope item 1)

Grepped every `raum_id` reference across `transform/models/**` and `analysis/*.py`:

- **`analysis/e1_regressions.py`, `analysis/e2_classification.py`, `analysis/c_three_way_comparison.py`,
  `analysis/b_oa_validation.py`** (PLR-level joins): all already `lpad(t.raum_id, 8, '0')` in their
  join *conditions* (the #200 fix pattern) — no silent-drop risk remains in these join paths.
  A few of these scripts additionally carry `t.raum_id AS area_code` as an **output-only, non-join**
  column in their returned dataframe (e.g. `e2_classification.py`'s `load_h1_data`, used only by the
  R-C3 leakage guard's train/test-fold uniqueness check, which is unaffected by padding since each
  raw `raum_id` string is still a unique per-PLR identifier regardless of width). **Not changed by
  this ticket** — `analysis/*.py` is on the CLAUDE.md R-C1 gated-file list, and this ticket is scoped
  as *not* methodology-bearing (mechanical data-quality only); editing these files, even for a
  purely cosmetic, zero-effect-on-results padding tweak, would trigger that gate unnecessarily.
  Flagged here for the record; a follow-up could pick this up if a maintainer wants full consistency
  in those scripts' output columns, but there is no known bug or silently-wrong result to fix.
- **`analysis/e1_regressions.py` / `e2_classification.py` BZR-level joins** (`t.raum_id =
  p.bzr_code`, no lpad): confirmed **not a bug** — BZR-level `raum_id` in the golden files is
  already a consistent 6 chars (no leading-zero-drop quirk at this level), verified empirically
  (137/137 rows, all 6 chars).
- **`stg_thesis_2018_result_plr_oa.sql`**: already applies `lpad(cast("r.raum_id" as varchar), 8,
  '0')` when deriving its own `area_code` — no fix needed, already correct.
- **`dim_area.sql`**: sources `int_thesis_2018_area_index` directly with no padding step of its
  own — this was the actual propagation path for the dim_area duplicate-row bug; now fixed
  transitively by the source-side fix (no change needed in `dim_area.sql` itself).

## Conclusion

The only genuine un-padded-join hazard beyond #200's already-fixed one was
`int_thesis_2018_area_index.sql`'s emitted (not just joined) `area_code` — now fixed at source,
with a regression guard test. No other latent silent-drop bugs found in the repo-wide audit.

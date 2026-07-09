# Geo-Data-Scientist Sign-off: QA-7b (#205) — e1 dominant-PLR crosswalk-bridge extraction

- **Scope:** QA-7b #205 — extraction of `analysis/e1_regressions.py`'s inline `xw_dominant` CTE
  (dominant/max-weight pre-2021↔2021 PLR crosswalk, used to bridge `int_ewr_lead_lag`'s lor_2021
  EWR rows to `int_poi_features_pivot`'s lor_pre2021 POI-count rows for the same-era H2/H3
  comparison) into a new gated dbt intermediate,
  `transform/models/intermediate/int_berlin_lor_crosswalk_dominant_2021.sql`.
- **Operationalizes:** the pre-existing `load_ewr_lead_lag_data` docstring (unchanged in
  substance, only relocated) documenting the dominant-PLR bridging rationale and the
  pseudo-replication caveat; `seed_lor_crosswalk_2006_to_2021` (geo-DS approved 2026-06-19,
  `docs/epic-c/C3-crosswalk-geo-signoff.md`) as the underlying areal-weighted crosswalk this model
  selects a representative row from.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/205-qa7b-e1-crosswalk-bridge-extraction → develop
- **Deliverables reviewed:** `transform/models/intermediate/int_berlin_lor_crosswalk_dominant_2021.sql`,
  `transform/models/intermediate/schema.yml` (new model doc block + tests), the rewired
  `load_ewr_lead_lag_data` in `analysis/e1_regressions.py`.
- **Verdict:** PASS

---

## 1. Summary

1. **This is a pure plumbing move, not a methodology change — verified, not just asserted.** I ran
   `analysis/e1_regressions.py` against the same populated `data/gentriduck.duckdb` both before
   (inline `xw_dominant` CTE, checked out from `develop`) and after (reading the new
   `int_berlin_lor_crosswalk_dominant_2021` table) this extraction. The full stdout — every
   H1/H2/H3a/H3b/H3c row across the MSS panel, MSS pre-2021 panel, EWR same-era panel, BZR scale,
   and Bezirk scale, including every N, rho/beta, p-value, and directional-match flag — is **byte-for-byte
   identical** (the only diff line is the findings-file output path, an artefact of running the
   "before" copy from a scratch directory). This is exactly the verification method the ticket's
   acceptance criterion asked for, and it is the strongest possible evidence that no silent
   behaviour change slipped in.
2. **The "dominant" (max-weight representative-unit) selection is the methodologically correct
   choice for this specific bridging need, and is properly distinguished from areal-weighted
   apportionment.** I checked this against `int_berlin_ewr_plr2021`, the other consumer of
   `seed_lor_crosswalk_2006_to_2021`: that model correctly uses **full areal-weighted apportionment**
   (`SUM(indicator_value * weight)` across *all* contributing pre-2021 PLRs) because EWR indicators
   are counts/shares that can be validly fractionally split and re-summed. POI counts bridged here
   are different: `int_poi_features_pivot`'s pre-2021 rows are keyed to a specific historical PLR
   polygon's OSM feature count, not a divisible quantity — there is no sound way to apportion "0.3 of
   a café" across split pre-2021 PLRs. Picking the single largest-overlap-share pre-2021 PLR as the
   representative match is the standard "closest single areal unit" simplification for exactly this
   situation (cf. Goodchild & Lam 1980's discussion of areal interpolation trade-offs between exact
   apportionment of divisible quantities and single-unit approximation for non-divisible ones — cited
   correctly in the model header, R-C2). This was already the *implemented* logic pre-extraction; the
   new model's header (§"Why 'dominant'…") is the first place this distinction is written down
   explicitly and cross-referenced against the sibling model, closing a documentation gap rather than
   introducing a new decision.
3. **Grain and coverage are correct and tested.** `int_berlin_lor_crosswalk_dominant_2021` produces
   exactly 542 rows (one per lor_2021 PLR — I queried the live table directly to confirm), matching
   `int_ewr_lead_lag`'s full lor_2021 universe with no `xw` join producing a NULL
   `plr_id_pre2021` for any of the 542 codes (verified: the "no PLR falls through to the
   `COALESCE(0)` sentinel" claim in the docstring still holds post-extraction — the row counts in the
   before/after diff for `poi_count_t`/`poi_count_tk` non-null rates are identical, as expected since
   the join key population is unchanged). `dbt_utils.unique_combination_of_columns` on
   `plr_id_2021` plus a `unique`/`not_null` column test on `plr_id_2021` correctly encode this
   1-row-per-2021-PLR grain as an enforced contract, not just documentation.
4. **Tie-breaking behaviour is unchanged and correctly disclosed as such.** `ROW_NUMBER() OVER
   (PARTITION BY plr_id_2021 ORDER BY weight DESC)` has no explicit tie-break column, same as the
   original inline CTE — DuckDB's row order for exact-weight ties is not contractually guaranteed
   across DuckDB versions, but this was already true before extraction and is correctly disclosed in
   the model header rather than silently assumed stable. I checked: no `plr_id_2021` in the live seed
   data has two pre-2021 candidates with bit-identical `weight` values (the areal-weighted crosswalk
   weights are floating-point intersection-area ratios, vanishingly unlikely to tie exactly), so this
   is a theoretical, not practical, risk — noted as a risk below for completeness, not a blocker.
5. **The pseudo-replication caveat (~78 pre-2021 PLRs are the dominant match for 2+ lor_2021 PLRs,
   ~35% of lor_2021 PLRs affected) is carried forward verbatim** into both the model header and the
   schema.yml description, and the `e1_regressions.py` docstring retains its "treat as directional
   evidence, not independent-observation p-values" instruction. This is the single most
   consequence-bearing methodological fact about this crosswalk and it would have been easy to lose
   in a mechanical extraction; it was not.
6. **Verified against a live, green `uv run poe build`.** 650 pass / 4 pre-existing unrelated warnings
   (BRW residential coverage, OSM Hamburg/Berlin null-rate, C5 POI-share-spike — none touching this
   model or its inputs) / 0 errors. `poe lint` clean. `poe test-py` 19 passed / 2 skipped (unrelated).

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Representative-unit (max-weight) crosswalk vs. areal-weighted apportionment — correctly scoped

Confirmed this is not "the wrong crosswalk method reused from a different context" — it is a
deliberate, different method for a genuinely different data type (non-divisible integer counts vs.
divisible shares/counts), and the new model's header now makes the contrast with
`int_berlin_ewr_plr2021` explicit for the first time. No change requested.

### 2.2 Materialization choice (table) is appropriate

`table`, not `view`, matches the sibling `int_berlin_ewr_plr2021` and avoids re-computing the
window-function ranking on every downstream read; the model is small (542 rows) so the storage cost
is negligible. No objection.

### 2.3 `dominant_weight` output column is a reasonable informational addition

Not present in the original inline CTE (which only selected `plr_id_2021, plr_id_pre2021`), but
correctly documented as "informational only, not an apportionment factor" and not consumed by
`e1_regressions.py`'s rewired query — an additive, non-breaking enhancement that gives a future
consumer visibility into match confidence (e.g. flagging low-`dominant_weight` PLRs as weaker
bridges) without changing current behaviour. No objection; recommend a future ticket could use this
to flag/exclude low-confidence dominant matches from the EWR H2/H3 comparison as a sensitivity check,
but this is out of scope for a pure-plumbing extraction.

---

## 3. Conditions

None blocking. One advisory, carried forward:

- **Advisory (future sensitivity check, not gating):** a future ticket could use the new
  `dominant_weight` column to test whether excluding low-confidence dominant matches (e.g.
  `dominant_weight < 0.5`, meaning the "dominant" pre-2021 PLR holds less than half the 2021 PLR's
  area) changes the EWR same-era H2/H3 results materially — this would strengthen the
  pseudo-replication disclosure from a fixed caveat into a testable sensitivity bound. Not required
  for this extraction, which is correctly scoped as plumbing-only.

---

## 4. Risks

1. Tie-breaking on exact-weight ties has no explicit deterministic rule (relies on DuckDB's row
   order) — theoretical only, no live tie exists in the current seed data (§1.4).
2. The pseudo-replication caveat (~35% of lor_2021 PLRs share a dominant match) remains a structural
   property of this bridging approach, not something this extraction can or should fix — inherited
   unchanged from the pre-extraction implementation.

---

## 5. Certification

The extraction is a verified, byte-for-byte-identical plumbing move (confirmed by direct before/after
script execution against the same database), the underlying crosswalk method (max-weight
representative unit, not areal-weighted apportionment) is methodologically correct for bridging
non-divisible POI counts and is now explicitly distinguished from the sibling
`int_berlin_ewr_plr2021` model's apportionment approach, the pseudo-replication caveat is carried
forward intact, and the new model's grain is enforced by a `dbt_utils.unique_combination_of_columns`
+ column-level `unique`/`not_null` test. Verified on a live, green `dbt build`.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "int_berlin_lor_crosswalk_dominant_2021 correctly extracts e1_regressions.py's inline xw_dominant CTE with zero behaviour change -- verified by running the full e1_regressions.py output before (inline CTE, develop) and after (new intermediate) against the same database: every H1-H3c row (N, rho/beta, p-value, directional match) across all five scale panels is byte-for-byte identical. The max-weight representative-unit crosswalk method is methodologically correct for bridging non-divisible POI-count data (distinct from int_berlin_ewr_plr2021's areal-weighted apportionment of divisible EWR shares/counts, a distinction now explicitly documented for the first time), and the pseudo-replication caveat (~35% of lor_2021 PLRs share a dominant match) is carried forward verbatim in both the model header and e1_regressions.py's docstring. Grain (one row per plr_id_2021, 542 total) is enforced by dbt_utils.unique_combination_of_columns plus not_null/unique column tests. Verified on a live dbt build: 650 pass / 0 errors / 4 pre-existing unrelated warnings; poe lint and poe test-py clean.",
  "risks": [
    "Tie-breaking on exact-weight crosswalk ties has no explicit deterministic rule beyond DuckDB's row order -- theoretical only, no live tie exists in the current seed data",
    "The ~35% pseudo-replication rate in the dominant-PLR bridge is a structural property of this crosswalk approach, unchanged by this extraction, and still requires downstream consumers to treat EWR H2/H3 results as directional evidence rather than independent-observation p-values"
  ],
  "recommendations": [
    "A future ticket could use the new dominant_weight output column to test whether excluding low-confidence dominant matches (e.g. dominant_weight < 0.5) changes the EWR same-era H2/H3 results, turning the fixed pseudo-replication caveat into a testable sensitivity bound"
  ]
}
```

---

## Final Verdict

Verdict: PASS

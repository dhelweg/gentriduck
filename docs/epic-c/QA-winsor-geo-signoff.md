# QA-winsor Geo-Data-Scientist Sign-Off

- **Task:** Winsorize `dynamism_score` at ±3 SD (#268)
- **Issue:** #268
- **Date:** 2026-07-16
- **Branch:** `feature/268-qa-winsor`
- **Verdict: PASS**

---

## Context

Winsorizing `dynamism_score` at ±3 SD was raised as a non-blocking recommendation in four
successive sign-offs and never implemented:

- `docs/epic-c/C4-geo-signoff.md` (§5): "Consider winsorising z-scores (e.g. ±3 SD) before summing,
  so a single extreme PLR-year does not swing the composite."
- `docs/epic-c/C5-geo-signoff.md` (risk #2, recommendation): "winsorizing at +/-3 SD is recommended"
  / "Consider winsorizing dynamism_score at +/-3 SD as a non-blocking enhancement post-C5".
- `docs/epic-c/C6-geo-signoff.md` (PASS condition 2, "still open"): measured **149 observations
  beyond ±3 SD, range -5.1 to +13.4**, and made implementation a named follow-up before dynamism
  feeds E-series regressions or public visuals.
- `docs/epic-g/G2-geo-signoff.md`: non-blocking suggestion that the public methodology page could
  note winsorizing as a future revision.

This ticket (#268, filed from the 2026-07-14 deferred-work audit) closes that four-sign-off gap.

## Approach reviewed

`transform/macros/winsorize.sql` adds a single-purpose macro:

```sql
{% macro winsorize(expr, lower=-3, upper=3) %}
    least(greatest({{ expr }}, {{ lower }}), {{ upper }})
{% endmacro %}
```

Applied in the two places `dynamism_score` is originally computed as a raw z-score:

- `int_poi_status_dynamism.sql` (lor_2021 branch, all cities via `city_code` filter downstream)
- `int_poi_status_dynamism_pre2021.sql` (B7 thesis-era lor_pre2021 branch)

Each model now emits **both** `dynamism_score_raw` (the pre-existing, unclipped z-score — kept for
diagnostics) and `dynamism_score` (the winsorized value, clipped to `[-3, 3]`). Every existing
downstream reference to `dynamism_score` (int_gentrification_ts, fct_gentrification_change,
gentrification_index, int_mss_lead_lag, int_hamburg_lead_lag, the E-series analysis scripts)
continues to select the column by name and therefore now receives the winsorized value
automatically — no downstream model required a code change, since none of them do `select *`
across the dynamism-scoring boundary (verified: `int_gentrification_ts`'s `poi_2021`/`poi_pre2021`
CTEs do `select *` internally but the final `joined_*` CTEs explicitly project `poi.dynamism_score`,
not `poi.dynamism_score_raw`).

`status_score` (the D3 density face) is **not** winsorized — no sign-off ever flagged it, and the
scope across all four source sign-offs is specifically `dynamism_score`. Not extending scope beyond
what was asked and cited avoids an ungrounded methodology change.

`dynamism_score_improved` (the OA-weighted variant in `int_poi_status_dynamism_improved.sql`) is
also **out of scope** — no sign-off recommended winsorizing it, and touching it would be scope creep
beyond the four cited sources.

## Methodology assessment

### 1. Winsorization as a bound on an already-approved statistic

**Approved.** This is not a new normalization method — it is a symmetric clip applied on top of the
C5-approved z-score (`docs/epic-c/C5-geo-signoff.md`). Winsorizing at a fixed number of standard
deviations is a standard, well-understood robustness technique for exactly the failure mode
identified in C6: a small number of thin-PLR, small-denominator observations producing extreme
z-scores that would otherwise dominate any sum/average/map-color-scale that uses `dynamism_score`.

### 2. Choice of bound (±3 SD)

**Approved, matches the cited recommendation exactly.** ±3 SD is the bound all four sign-offs
independently proposed; under a roughly normal reference distribution this affects ~0.3% of
observations in the tails by construction, consistent with C6's empirical count (149 of ~14k+
PLR-year observations, now confirmed at 456 raw pre-2021+2021 observations combined across both
models in the rebuilt warehouse — the larger count reflects the pre-2021 series now also being
in scope, which C6 could not have counted since B7/#117 had not yet landed when C6 was signed).

### 3. NULL-safety

**Verified correct.** DuckDB's `LEAST`/`GREATEST` are NULL-in/NULL-out; wrapping the existing
`NULLIF(stddev(...), 0)`-guarded expression preserves the pre-existing missing-data semantics
(first-year-per-PLR/vintage NULLs and <2-PLR-population NULLs remain NULL, not clipped to a bound).

### 4. Raw value retained, not discarded

**Approved.** Keeping `dynamism_score_raw` alongside satisfies the ticket's acceptance ("keep the
raw value available if any consumer needs it") and preserves an audit trail — a future analyst can
always recover the pre-winsorization distribution without re-deriving it from `share_yoy_change`.

### 5. Verification against the built warehouse

Rebuilt `uv run poe build`: **799 pass / 4 warn / 0 error / 0 skip / 7 no-op** — identical pass/warn
counts to the pre-change baseline build (the 4 warnings are the pre-existing BRW-coverage and
OSM-null-rate warn-severity sentinels, unrelated to this change; `test_c5_poi_share_spike`, which
operates on `plr_poi_share` not `dynamism_score`, is correctly unaffected).

Queried the rebuilt fact tables directly:

```
int_poi_status_dynamism:          dynamism_score range [-3.0, 3.0]; dynamism_score_raw range [-8.16, 21.24]
int_poi_status_dynamism_pre2021:  dynamism_score range [-3.0, 3.0]; dynamism_score_raw range [-5.12, 11.28]
```

Confirms the clip is exact and both extremes (previously up to +21.2, per the base model's wider
2008-2026 range vs C6's 2008-2024 sample) are now correctly bounded.

## Risks

1. **Winsorizing changes the effective variance of `dynamism_score`** wherever it feeds a downstream
   sum/composite (`legacy_gentrification_score`, hotspot Gi* inputs). This is the intended effect —
   the whole point is to stop 149+ extreme observations from dominating those composites — but any
   published finding that cites an exact `dynamism_score` magnitude for one of the previously-extreme
   PLR-years will now see a different (bounded) number. No currently-published finding depends on an
   uncapped extreme value (checked: `docs/epic-e/*-findings.md` cite typology/classification outcomes,
   not raw dynamism magnitudes for specific outlier PLRs).
2. **`dynamism_score_improved` remains unwinsorized** — a future ticket should assess it on its own
   merits if the same extreme-tail pattern is observed there; not assessed here (out of scope).

## Conditions for implementation

1. `winsorize()` macro added, NULL-safe, symmetric ±3 SD default. ✅
2. Applied at both places `dynamism_score` is originally computed (base + pre2021 branch). ✅
3. `dynamism_score_raw` retained alongside for diagnostics. ✅
4. `uv run poe build` green, no regression vs baseline pass/warn/error counts. ✅
5. G2 methodology page updated to note the winsorization is now implemented (data-engineer to land
   before integration, tracked in the same PR/branch).

---

## Sign-Off

```json
{
  "verdict": "pass",
  "rationale": "Winsorizing dynamism_score at +/-3 SD via a NULL-safe LEAST/GREATEST macro is a bound applied on top of the already-approved C5 z-score, not a new normalization method. It matches exactly what four prior sign-offs (C4/C5/C6/G2) recommended, uses the same +/-3 SD threshold all four cited, preserves NULL semantics, retains the raw value for diagnostics, and every existing downstream consumer picks it up automatically by column name with zero code changes required elsewhere. Verified against the rebuilt warehouse: build is green with an unchanged pass/warn/error profile, and the clipped range is exactly [-3.0, 3.0] in both the lor_2021 and lor_pre2021 branches.",
  "risks": [
    "Downstream composites/hotspot inputs that use dynamism_score will see a different (bounded) value for the ~150-450 previously-extreme PLR-years; this is the intended effect, not a defect",
    "dynamism_score_improved (OA-weighted variant) is not winsorized -- out of scope, no sign-off recommended it"
  ],
  "recommendations": [
    "Note the implemented winsorization on the G2 public methodology page (supersedes the prior 'not yet implemented' note)",
    "If dynamism_score_improved is later found to have the same extreme-tail pattern, file a follow-up rather than silently extending this change's scope"
  ]
}
```

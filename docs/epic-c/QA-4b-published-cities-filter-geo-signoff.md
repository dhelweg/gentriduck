# Geo-Data-Scientist Sign-off: QA-4b (#202) — publication-filter consolidation

- **Scope:** QA-4b #202 — replaces the hard-coded `city_code = 'BER'` publication-filter literals
  in `gentrification_index.sql` (both variant branches), `fct_gentrification_change.sql`, and
  `fct_gentrification_trajectory.sql` with a new `published_cities_filter()` macro driven by a
  `var('published_cities')` list (`dbt_project.yml`). This file list includes
  `gentrification_index.sql`, which is on the R-C1 enumerated-files list — reviewed under the full
  gate even though the change itself is a mechanism refactor, not an index/weighting change.
- **Operationalizes:** no new methodology — this ticket introduces no weighting, scoring, or
  index-construction change; it reviews whether the *publication-readiness gate* mechanism itself
  preserves the exact same set of published rows as the literal it replaces.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/202-qa4b-published-cities-filter → develop
- **Deliverables reviewed:** `transform/dbt_project.yml` (`published_cities` var),
  `transform/macros/published_cities_filter.sql`, the three edited mart files, `.sqlfluff` (macro
  stub for the plain-jinja templater).
- **Verdict:** PASS

---

## 1. Summary

1. **The filter is provably equivalent to the literal it replaces for the current single-city
   state.** `var('published_cities') = ["BER"]` renders `published_cities_filter('ts.city_code')`
   to `ts.city_code in ('BER')`, which is logically identical to the prior `ts.city_code = 'BER'`
   for any single-element list — there is no case where `IN ('BER')` and `= 'BER'` diverge. I
   confirmed this is not merely an assertion: I ran `uv run poe build` post-change and checked row
   counts directly against the live warehouse for all three affected marts
   (`gentrification_index`: 6049 rows / 1 distinct city_code; `fct_gentrification_change`: 3414 rows
   / 1; `fct_gentrification_trajectory`: 972 rows / 1) — all three match the row/city counts already
   visible from this session's earlier `poe web-build` run (which used the pre-change marts), and
   `dbt build`'s own `accepted_values_gentrification_index_city_code__BER` test still passes,
   confirming the output set is unchanged.
2. **No methodology content is touched.** I read both `gentrification_index.sql` call sites in
   full: the surrounding column selection, join logic, and variant-branch comments (live_data vs.
   improved, OA-B.3 #172's tier-weighted predictor discipline) are untouched byte-for-byte except
   for the `where` clause's filter expression itself. Same for `fct_gentrification_change.sql`'s
   `ts` CTE and `fct_gentrification_trajectory.sql`'s uninhabited-row exclusion — only the
   city-code comparison changed form, not the surrounding logic.
3. **The macro correctly distinguishes this concern from `canonical_city_code()` (#179).** I
   confirm the header commentary is accurate: `canonical_city_code()` fixes a legacy-lowercase
   ingestion-format bug (`'berlin'` → `'BER'`) at the staging boundary, while
   `published_cities_filter()` is a downstream publication-readiness gate deciding which
   *already-canonical* `city_code` values a mart exposes. These are genuinely different concerns
   and conflating them into one macro would have been the wrong design — keeping them separate is
   correct.
4. **`int_gentrification_ts.sql`'s `'BER' as city_code` literals were correctly left untouched.** I
   checked both occurrences (Branch A `joined_2021`, Branch B `joined_pre2021`): these are
   *value-assignment* literals labelling which source city a join branch's data came from (the
   branch only ever processes Berlin-sourced tables), not a publication-readiness filter deciding
   what to expose downstream. Changing these to reference `published_cities` would have been a
   category error — the ticket correctly scoped the change to the three marts that actually gate
   publication, not the intermediate model that labels provenance.
5. **Verified against a live, green `dbt build`.** 650 pass / 4 pre-existing unrelated warnings
   (unchanged from before this ticket) / 0 errors. `poe lint` clean (required adding a
   `published_cities_filter` stub macro to `.sqlfluff`'s plain-jinja templater config, following the
   exact precedent of the `canonical_city_code`/`raw_path` stubs already there for the same reason —
   sqlfluff parses macros via a stub context, not a real dbt compile).

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Single-city-list edge case is handled correctly

I checked the macro's Jinja loop (`{% for city in var("published_cities") %}...{% if not
loop.last %}, {% endif %}{% endfor %}`) renders a syntactically valid `IN (...)` clause for both a
one-element and a future multi-element list, with no trailing-comma bug. No objection.

### 2.2 Future second-city onboarding (Hamburg, #125) will correctly extend, not silently change, this filter

When Hamburg's `city_code` is added to `published_cities`, all three marts will begin including
Hamburg rows in one dbt-var edit rather than three hand-edited literals — this is the intended
benefit and does not itself constitute a methodology decision (that decision belongs to #125's own
sign-off gate when Hamburg is actually onboarded as a published city).

---

## 3. Conditions

None.

---

## 4. Risks

None beyond the inherent (and pre-existing, unchanged) risk that `dbt_project.yml`'s `published_cities`
var must be kept in sync with the maintainer's actual publication-readiness decision — same
trust boundary the literal `'BER'` already had, just centralized to one line instead of three.

---

## 5. Certification

The publication-filter consolidation is provably equivalent to the literals it replaces for the
current single-published-city state (verified via live row-count and `accepted_values` test
checks), touches no index/weighting/scoring logic, and correctly leaves
`int_gentrification_ts.sql`'s unrelated provenance-labelling literals alone. Verified on a live,
green `dbt build`.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate (triggered here solely because `gentrification_index.sql`
is on the enumerated file list, not because this ticket carries any substantive methodology risk).

```json
{
  "verdict": "pass",
  "rationale": "published_cities_filter() replaces three hard-coded city_code = 'BER' publication-filter literals with a var('published_cities')-driven IN clause. Verified provably equivalent for the current single-city state (IN ('BER') == = 'BER'), confirmed via live row-count checks against gentrification_index (6049/1), fct_gentrification_change (3414/1), fct_gentrification_trajectory (972/1) matching pre-change figures, and the accepted_values_gentrification_index_city_code__BER test still passing post-change. No index/weighting/scoring/join logic is touched -- only the filter expression's form changed. int_gentrification_ts.sql's unrelated 'BER' as city_code provenance-labelling literals were correctly left untouched (different concern: value assignment for Berlin-sourced join branches, not a publication-readiness gate). Verified on a live dbt build: 650 pass / 0 errors / 4 pre-existing unrelated warnings; poe lint clean after adding the required sqlfluff plain-jinja macro stub.",
  "risks": [
    "dbt_project.yml's published_cities var must be kept in sync with the maintainer's actual publication-readiness decision when a second city is onboarded -- same trust boundary the prior literal already had, now centralized to one line"
  ],
  "recommendations": []
}
```

---

## Final Verdict

Verdict: PASS

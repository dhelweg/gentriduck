# OA-D4 (#240, ADR-0024) — geo-data-scientist sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, geo/statistical-fidelity half (pairs with `OA-D4-domain-signoff.md`).
- **Artifact under review:** `transform/models/intermediate/int_poi_within_group_dominance.sql`,
  `transform/seeds/seed_oa_dominance_groups.csv`, `transform/tests/test_oa_dominance_group_public_safe_constant.sql`
  (branch `feature/240-oa-d4-dominance`).
- **Reviewer:** geo-data-scientist.
- **Date:** 2026-07-17.
- **Scope reviewed against:** OA-D0 geo sign-off (`docs/methodology/OA-D0-geo-signoff.md`) and
  OA-D0 domain sign-off (`docs/methodology/OA-D0-domain-signoff.md`) Conditions A/B, which this
  ticket implements as its acceptance criteria — this is a **conformance review** against an
  already-approved architecture (mirrors OA-D2's precedent), not a new methodology decision.

## Summary judgement

Conforms. The model computes exactly the concentration/diversity math specified: HHI (Herfindahl
1950/Hirschman 1945), top-share, Shannon entropy (1948), and Pielou evenness (1966), correctly
built off the SAME local-stock columns `int_poi_offering_advantage` already computes and tests —
no new stock derivation, no new join, no new tool. This satisfies OA-D0 geo sign-off's
"reuse the existing stock pair" expectation for methods-as-columns work.

## Checks performed

1. **Allow-list fidelity (Condition A):** `seed_oa_dominance_groups.csv` implements exactly the
   five confirmed groups (gastronomy_category, gastronomy_restaurant_cuisine, retail_category,
   entertainment_category, wellness_curated) and omits every confirmed exclusion (Vacancy,
   Mobility, Public Service, Religion, Office, Public Space, Tourism, Hipster/Coworking) —
   cross-checked row-by-row against the domain sign-off's Condition A enumeration. The
   `wellness_curated` group correctly pools `Services > {Beauty, Massage}` (category grain) with
   `Sports and Recreation > Sport > {Fitness Center, Martial Arts}` and
   `> Recreation > Sauna` (type grain) as ONE cross-domain, mixed-grain group — resolving the
   fitness/wellness signal-placement gap the ADR's "partial Services" framing missed (Condition
   A.4), confirmed against a live spot-check (Fitness Center correctly resolves as the top_child
   with `offering_tier=3` in the sample above).
2. **Grain correctness:** category-grain members are deduplicated (`select distinct` over
   `int_poi_offering_advantage`'s type-level fan-out) before entering the concentration math —
   without this, a category's `category_stock_local` would be double/triple-counted once per
   sibling type, corrupting every share and the HHI. Verified by inspection and by the live
   warehouse spot-check (`n_children` for `retail_category` averages ~4.4, consistent with a
   handful of the 12 allow-listed Retail categories actually present per PLR-year, not a fan-out
   multiple of that).
3. **Zero-stock exclusion:** `present_members` filters `child_stock > 0` before computing shares —
   correct, since a structurally-absent taxonomy slot (never present in the sparse
   `fct_poi_development` convention this codebase already uses) must not inflate `n_children` or
   silently contribute a `share=0` term that would still count toward the "number of children"
   denominator of Pielou evenness.
4. **Concentration-math correctness:** `hhi = Σ share_i²` bounded in `[1/n, 1]`, verified in-range
   by `dbt_utils.accepted_range` (0 to ~1.0000001, floating tolerance) against the live warehouse
   (940 tests passed, `uv run poe build` clean). `entropy = -Σ share_i·ln(share_i)` correctly
   guards `share_i = 0` with a `case` (not `nullif`, since `0 * ln(0)` is the well-defined limit 0,
   not an error) — confirmed this is NOT the same guard pattern as OA's `nullif`-based division
   guards, and that distinction is deliberate/correct here.
5. **Pielou evenness degeneracy (Condition B.4 stability question):** `evenness` is NULLed (not
   divided-by-zero-errored, not silently zero) when `n_children <= 1` — `ln(1) = 0` makes the ratio
   undefined; the live spot-check above shows exactly this NaN/NULL behaviour for the five
   `n_children = 1` wellness rows. Correct: a single-present-child cell has no "evenness" question
   to answer, distinct from the domain sign-off's separate Condition A.6/A.7 exclusion of
   structurally-degenerate GROUPS (Hipster, Vacancy) from the allow-list entirely — this is a
   per-cell NULL within an otherwise-valid group, not a group-level exclusion, and the model
   correctly does not conflate the two.
6. **Min-parent-base gate (dominance-specific, stricter than OA's flat floor):**
   `is_thin_base := group_stock_local < greatest(10, 5 * n_children)` implements the exact
   scaling rule specified in the OA-D0 pre-integration note ("dominance `max(10, 5·n_children)`"),
   correctly stricter than OA's flat `oa_min_poi_base_n` (10) floor since HHI's small-sample
   instability compounds with more possible children. Live spot-check shows ~85-95% thin-base
   rates across groups at the PLR grain in the current snapshot — expected and consistent with
   OA's own D-3 finding that PLR-grain compositional ratios are frequently thin; this is a flag,
   not a drop, matching the anti-erasure requirement (Condition B.4) — verified the column is
   exposed, never used to filter rows out of the model.
7. **Sign-blind pairing (Condition B.2):** `top_child` + `top_child_offering_tier` +
   `top_child_offering_weight` are joined from `seed_poi_offering_relevance.csv` at the correct
   `(level, domain, category, type)` key via the `group_child_key` CTE (a plain equi-join, not a
   correlated subquery — checked for both correctness and query-plan sanity). Confirmed the join
   correctly discriminates `level='category'` vs `level='type'` rows in the relevance seed (which
   share domain/category keys across levels) via `top_child_level`, so a category-grain top_child
   never accidentally matches a type-grain relevance row.
8. **Anti-stigma technical enforcement (Condition B.3):** `is_public_safe` is aggregated with
   `min(is_public_safe)` per `dominance_group` — this is only correct if the seed encodes a SINGLE
   `is_public_safe` value per group (never mixed). Flagged this as a silent-masking risk if the
   seed were ever miscoded (a stray `true` child in an otherwise-`false` group would make `min()`
   read the correct `false`, but the reverse — a stray `false` in an otherwise-`true` group — would
   incorrectly blanket the WHOLE group as unsafe, hiding the miscoding rather than surfacing it).
   **Required and confirmed added:** `test_oa_dominance_group_public_safe_constant.sql`, a new
   blocking test asserting `count(distinct is_public_safe) = 1` per group — passed in the live
   build (940/952 total, 0 errors). This closes the one gap found in review; no other changes
   requested.
9. **Join-order lint (ST09) fixes:** three join conditions were reordered during review to list
   the earlier-referenced table first per the repo's `sqlfluff` convention — cosmetic, verified no
   semantic change (`uv run poe lint` clean after).
10. **Build verification:** `uv run poe build` — 940 PASS / 5 WARN (pre-existing, unrelated to this
    ticket: BRW coverage, Ortsteil-overlap, Hamburg null-rate, C5 anomaly warn-severity tests) /
    0 ERROR / 952 total. All new tests (seed schema, model schema, the new blocking test) pass.

## Grounding (R-C2)

Herfindahl 1950; Hirschman 1945; Shannon 1948 "A Mathematical Theory of Communication"; Simpson
1949 (diversity complement, same math family as HHI); Pielou 1966 "The Measurement of Diversity in
Different Types of Biological Collections" (evenness = entropy / ln(n)); Isard (1960); OA-D0
geo/domain sign-offs (this ticket's own governing conditions); ADR-0024.

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — conforms to the already-approved OA-D0 architecture and Condition A allow-list;
the one gap found (public_safe seed-invariant enforcement) was closed in-review with a new
blocking test, confirmed passing. No open items remain for D4; ready for `develop` integration.

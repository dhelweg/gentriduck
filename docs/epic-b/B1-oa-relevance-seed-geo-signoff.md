# Geo-Data-Scientist Sign-off: OA-B.1 (#170) — seed_poi_offering_relevance

- **Scope:** OA-B.1 #170 — `transform/seeds/seed_poi_offering_relevance.csv`, a 231-row (13 domain +
  55 category + 163 type) causality-first tier/weight seed curating which POI taxonomy nodes count
  toward the **improved** (Workstream 2, `methodology_variant='improved'`) offering-advantage signal.
  Verifies the seed is structurally sound (grain, encoding, referential integrity against the existing
  taxonomy) and consistent with the ADR-0017 D3 non-circularity rule from the *methods* side (the
  domain-expert sign-off covers the causal-plausibility content).
- **Operationalizes:** ADR-0017 D3 (2×2 causality-first-with-data-confirmation rule), D5 (this ticket
  is not itself gated by a C-1…C-5/D-1…D-3 condition, but its output feeds OA-B.3 #172 which is);
  `docs/planning/oa-revival-and-methodology-improvement.md` §"POI relevance model".
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/170-oa-b1-seed-poi-offering-relevance → develop
- **Deliverables reviewed:** `transform/seeds/seed_poi_offering_relevance.csv`,
  `transform/seeds/schema.yml` (new seed section).
- **Verdict:** PASS

---

## 1. Summary

1. **Grain is exactly the existing taxonomy, no invention.** Every `(poi_domain_h, poi_category_h,
   poi_type_h)` combination is generated directly from `seed_poi_mapping.csv` (13 domains, 55
   categories, 163 types — confirmed by direct enumeration), so the seed cannot silently drift from the
   taxonomy `int_poi_offering_advantage` (#166) already computes OA over. `(level, poi_domain_h,
   poi_category_h, poi_type_h)` is unique across all 231 rows (verified) — no duplicate node can
   double-apply a weight downstream.
2. **Weight scale is a clean, monotone, bounded encoding.** `offering_tier ∈ {0,1,2,3}` maps 1:1 to
   `offering_weight ∈ {0.0, 0.33, 0.66, 1.0}` — deterministic, no free-floating weights that could
   silently diverge from their tier. `dbt build` confirms `accepted_values` on both `level` and
   `offering_tier`, and `not_null` on every column except the deliberately-blank `data_corr` placeholder
   and the level-conditional `poi_category_h`/`poi_type_h`. All 7 schema tests pass.
3. **`data_corr` is correctly left null, not zero-filled or fabricated.** OA-B.2 (#171) owns filling it;
   pre-populating it here (even with a plausible-looking placeholder value) would risk being mistaken
   for an already-run correlation and short-circuit the 2×2 data-confirmation step. Leaving it genuinely
   absent is the right non-circularity-preserving choice.
4. **No new tool/library/data source.** Pure seed CSV + schema.yml, consistent with ADR-0001's
   dbt/DuckDB seed pattern already used for `seed_poi_mapping`, `seed_poi_thesis_taxonomy_crosswalk`.
5. **Verified against a live `dbt build`.** `uv run poe build`: 642 pass / 6 pre-existing unrelated
   warnings (none touching this seed) / 0 errors. `poe lint` clean.

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Parent-child tier inheritance is a defensible default, not silent noise

The generation logic (domain default → category override → type override) means a type inherits its
category's tier unless a specific literature-cited exception is named (e.g. `Fitness Center` overridden
to tier 3 within the otherwise tier-1 `Sport` category; `Delicatessen` overridden to tier 3 within the
otherwise tier-1 `Food and Drink` category). This is the right default for a 163-leaf taxonomy: it
avoids fabricating a distinct, unsupported rationale for every leaf while still letting cited exceptions
override where the literature specifically singles out a format. I spot-checked ~20 type-level
overrides against their stated category default and found the inheritance internally consistent (no
type contradicts its stated parent default without an explicit override row).

### 2.2 Structural precedent for the causality-first-then-data-confirmation split is honoured

Tier-0 ("drop") nodes carry `offering_weight = 0.0` and are excluded from any nonzero weighting by
construction — OA-B.2/B.3 consuming this seed cannot accidentally include a dropped node just by
joining on the taxonomy, since a 0.0 weight zeroes its contribution. This structurally enforces the
"data can never promote a tier-0 node" rule (ADR-0017 D3) at the *weight* level, in addition to the
`data_corr` placeholder being empty — a double structural safeguard, which is good practice.

### 2.3 Vacancy is correctly flagged as out-of-band, not silently summed

`Vacancy` is tiered 3 (full weight) but its `causal_rationale` explicitly states it is the
**opposite-pole disinvestment marker** (Smith 1979 rent-gap) and must not be summed with amenity-OA
rows into one score, citing ADR-0017 D-2 by name. This is a documentation-level safeguard only — I flag
as an **advisory condition** (not blocking) that OA-B.3 (#172), which will actually compute the weighted
index, must implement this as a structural separation (e.g. a distinct `disinvestment` component or
sign flag), not merely inherit the comment. This is exactly the kind of condition ADR-0017 D5's pattern
is designed to carry forward onto the next ticket.

### 2.4 No spatial/statistical method introduced here — appropriately scoped

This ticket is pure taxonomy curation (no LQ computation, no bandwidth, no spatial join), so none of the
OA-P0.1/A.2 spatial-method conditions (C-1…C-5) apply to it directly; I confirm none are silently
re-litigated or contradicted by this seed.

---

## 3. Conditions

None blocking. One advisory, carried forward to the next ticket:

- **Advisory (new, scoped to OA-B.3 #172):** implement Vacancy's disinvestment signal as a structurally
  separate component from the amenity-offering weighted composite (not merely documented in this seed's
  `causal_rationale`), per ADR-0017 D-2.

---

## 4. Risks

1. Tier assignment at the type level for the ~140 non-overridden types relies on category-level
   inheritance rather than a per-type literature citation — acceptable default (§2.1) but means OA-B.2's
   data-driven confirmation pass carries more of the calibration weight for those types than for the
   ~20 explicitly-cited exceptions.
2. The tier scale (0/0.33/0.66/1.0) is a reasonable, simple encoding but is itself a modeling choice with
   no independent validation yet (e.g. against known Berlin gentrification hotspots) — this is exactly
   what OA-B.2/B.3's data-driven pass and OA-C.1's three-way comparison exist to test.

---

## 5. Certification

The seed is structurally correct (exact-match grain against the existing taxonomy, unique keys, clean
deterministic tier→weight encoding, correctly-empty `data_corr` placeholder, zero-weight tier-0 nodes
structurally excluded from downstream weighting), introduces no new tool/library/source, and does not
contradict any locked spatial/method decision from OA-P0.1/ADR-0017. Verified on a live, green
`dbt build`.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "seed_poi_offering_relevance.csv is grain-exact against the existing 163-type taxonomy (seed_poi_mapping.csv), unique on (level, poi_domain_h, poi_category_h, poi_type_h) across all 231 rows, with a clean deterministic offering_tier{0,1,2,3} -> offering_weight{0.0,0.33,0.66,1.0} encoding enforced by dbt accepted_values tests. data_corr is correctly left null (owned by OA-B.2 #171), and tier-0 nodes carry offering_weight=0.0, structurally preventing a dropped node from contributing to any downstream weighted sum -- a double safeguard for the ADR-0017 D3 non-circularity rule beyond the empty data_corr placeholder alone. Vacancy is tiered at full weight but its causal_rationale explicitly flags it as the ADR-0017 D-2 opposite-pole disinvestment marker, not to be summed with amenity rows. No new tool/library/data source. Verified on a live dbt build: 642 pass / 0 errors / 6 pre-existing unrelated warnings; poe lint clean.",
  "risks": [
    "~140 non-overridden types rely on category-level tier inheritance rather than an individually-cited literature source -- acceptable default, but shifts more calibration weight onto OA-B.2's data-driven confirmation pass for those types",
    "The 0/0.33/0.66/1.0 tier-weight scale is an untested modeling choice pending OA-B.2/B.3 data confirmation and the OA-C.1 three-way comparison"
  ],
  "recommendations": [
    "OA-B.3 (#172): implement Vacancy's disinvestment signal as a structurally separate component from the amenity-offering weighted composite (not merely a documentation comment), per ADR-0017 D-2",
    "OA-B.2 (#171): prioritize data-driven confirmation coverage on the ~140 category-inherited (non-overridden) types, since they carry the least individually-cited theoretical support"
  ]
}
```

---

## Final Verdict

Verdict: PASS

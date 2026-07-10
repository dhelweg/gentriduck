# I15 (#232) — Offering-Advantage calculation review + subtype-value bug: geo-data-scientist sign-off

**Ticket:** `docs/epic-i/tickets/I15-oa-calculation-review.md`
**Branch:** `feature/232-i15-oa-review` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate, R-C1)
**Date:** 2026-07-10

## Verdict: PASS

The reported `04200311` symptom is correctly root-caused as a **page-query-only** defect (not a
mart-grain or formula defect); the OA location-quotient implementation is verified correct against
the thesis definition and ADR-0017/0018; and the changes in this ticket are documentation/citation
only. Independently reproduced — I did not rely on the DE's summary.

## What I verified independently

1. **Formula correctness (R-C2).** Read `int_poi_offering_advantage.sql` in full and checked its
   three LQ expressions against `reference/system/71_oa.sql` + `70_oa_helper.sql`. The reference form
   `(d_local / Σd_local) * (Σd_city / d_city)` is algebraically identical to the model's ratio-of-shares
   `(domain_local/all_domains_local)/(domain_city/all_domains_city)`. Denominators are parent-relative
   per ADR-0017 D1: category and type both divide by their **parent domain** total (not the grand total,
   and type does not nest under category); domain divides by the all-domains grand total. Confirmed in the
   window-function partition keys. Citations to `71_oa.sql`/`70_oa_helper.sql`, thesis pp. 55–56/91, and
   ADR-0017 D1/D2 are present inline next to each LQ expression — R-C2 satisfied.

2. **Root-cause diagnosis — page-query-only — confirmed by reproduction.** `mart_poi_offering_advantage`
   is leaf-grain (one row per domain×category×type). The page query in `web/pages/area/[code].md`
   (lines 126–149) selects `poi_domain_h, oa_domain` from that leaf-grain mart with **no GROUP BY /
   DISTINCT**, `order by poi_domain_h`. I queried the built DB: for `04200311`, Mobility has 8 leaf rows
   all with `count(distinct oa_domain)=1` (Retail 18/1, Public Service 10/1, etc.), so the radar renders
   N identical points per domain — exactly the "all values for a type with subtypes are identical" report.
   This is a display fan-out, not a mart or formula fault. Correctly routed to I14 (page rework), no `web/`
   change made here per the ticket's own scope note.

3. **Hand-reconciliation (spot-checked myself, not trusting the writeup).** Recomputed oa_domain from raw
   `fct_poi_development` counts for all 12 domains of `04200311` (latest year 2026): **max |hand − mart| =
   0.0** (Mobility=1.931000 exact). Recomputed oa_category for the Mobility domain: Individual=0.387465,
   Public Transport=2.347464 — **exact (0.0 diff)**. This confirms oa_category/oa_type genuinely vary at
   subtype grain and are not fanned-out copies of oa_domain.

4. **Value scale genuinely continuous, not binned.** For `04200311`: oa_type spans 0.044–12.065 with 67
   distinct values across 68 rows. The reported "coarse 0/1/2" perception is a display-layer artifact
   (radar/choropleth legend), correctly deferred to I14/I16 — no mart change needed; `pct_vs_baseline =
   (oa − 1)*100` is a display-layer transform.

5. **Causal-tiered selection (ADR-0018).** Model builds `methodology_variant='faithful'` only (all types,
   no curation) — correct per ADR-0017 D3's never-blend rule. The `improved` tiering seed
   (`seed_poi_offering_relevance`) exists but is not yet consumed (OA-B.3 #172, unbuilt); nothing to
   review at the tier-application level yet. Added ADR-0018 citations to the model and seed schema close a
   genuine R-C2 grounding gap (previously cited only ADR-0017 D3).

6. **dbt build green (ran it myself).** `uv run poe build` → `PASS=746 WARN=4 ERROR=0 SKIP=0`. The 4
   warnings are pre-existing non-OA data-quality warns (BRW coverage, Hamburg null-rate, C5 share spike),
   unrelated to this ticket. The C-1 mass-conservation invariance test passes.

## Risks / notes (non-blocking)

- The published headline OA currently rests on `gaussian_500m`, while ADR-0017 D2.3 recommends 1000 m.
  Pre-existing, tracked as OA-C.1 (#174); not introduced or affected by this ticket.
- Sparse-vs-dense golden reindexing (model header lines 44–50) remains an open item for the golden
  validation, already covered by the A3 sign-off (PASS WITH CONDITIONS); untouched here.
- D-3 low-POI-base instability flag remains deferred per ADR-0017 D5.

## Recommendations

- I14 must actually dedup to one point per domain (GROUP BY / DISTINCT, or read the domain-grain
  companion mart `mart_poi_offering_advantage_map`) — the fix this ticket diagnoses but does not apply.
- When I14 introduces the `% vs baseline` framing, keep it a pure display transform of the continuous
  column; do not round/bin at the mart.

```json
{
  "verdict": "pass",
  "rationale": "OA 3-level nested LQ is correctly implemented and cited (matches reference 71_oa.sql algebraically; parent-relative denominators per ADR-0017 D1). Reported 04200311 symptom independently reproduced as a page-query-only fan-out (leaf-grain select with no dedup), not a mart/formula defect. Hand-recomputed oa_domain (all 12 domains) and oa_category (Mobility) from raw fct_poi_development counts match the mart to 0.0. Value scale is continuous (0.044-12.065, 67/68 distinct). Changes are documentation/citation only; dbt build green PASS=746 ERROR=0.",
  "risks": [
    "Headline OA uses gaussian_500m vs ADR-0017 D2.3's 1000m recommendation (pre-existing, OA-C.1 #174).",
    "Sparse-vs-dense golden reindexing open item (covered by A3 sign-off).",
    "Display fix is deferred to I14 - until it dedups, the public radar still mis-renders."
  ],
  "recommendations": [
    "I14 must dedup to one point per domain (GROUP BY/DISTINCT or read mart_poi_offering_advantage_map).",
    "Keep any % vs baseline framing a pure display transform; no mart-layer rounding/binning."
  ]
}
```

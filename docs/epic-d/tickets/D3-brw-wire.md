# [D3-brw-wire] Wire `brw_trend` predictor into `int_gentrification_ts`

- **Tier:** 2 · **Epic:** d · **Labels:** `epic-d,dbt,methodology-bearing`
- **Filed:** 2026-07-16, follow-up from #263 (D3-brw-change)

---

**Why:** #263 built `int_berlin_brw_trend` (the BRW change/rent-gap-realisation signal) as a
standalone, staged-slice model with zero consumers, mirroring the pattern already used for the B1
displacement proxies (`int_berlin_rent_pressure_proxy`, `int_berlin_turnover_proxy`,
`int_berlin_milieuschutz_plr_flag`) before their own wiring ticket (#258). Both the #263 geo-DS and
domain sign-offs recommend a future wiring pass but explicitly defer it, since it raises its own
open questions (does `brw_trend` populate for the `lor_pre2021`/Hamburg branches of
`int_gentrification_ts`? BRW back-series depth and Hamburg BRW sourcing are both open).

**Goal:** Thread `brw_trend` through `int_gentrification_ts`'s branch structure (2021 / pre2021 /
Hamburg) as a predictor/lead-side field (ADR-0008), with explicit `NULL` casts where BRW data does
not exist, mirroring how `status_score_improved`/`dynamism_score_improved` were threaded through in
OA-B.3 (#172).

**Scope:**
- Add `brw_trend` (and optionally `brw_yoy_pct_change`) as predictor-side columns in
  `int_gentrification_ts`, Berlin lor_2021 only initially (BRW pre2021/Hamburg sourcing is a
  separate, unresolved question — do not silently assume coverage).
- Decide whether/how to surface this on `gentrification_index` (contract-enforced mart) or leave it
  at the `int_gentrification_ts` predictor layer only, per ADR-0008 placement guidance.
- Update `docs/methodology/index-definition.md`'s `brw_trend` row (added by #263) to reflect the
  new consumer.

**Acceptance:**
- `brw_trend` has a real consumer in `int_gentrification_ts`; predictor/lead-side placement and
  change-positive polarity preserved and documented; `uv run poe build` green.
- geo-DS + domain sign-off on the wiring (placement + any new NULL/coverage decisions).

**Gate:** methodology-bearing — geo-DS **and** domain-expert dual gate.

**Deps:** #263 (D3-brw-change, closed) — this is its wiring follow-up, same pattern as #258 for the
B1 proxies.

**Source:** `docs/methodology/D3-brw-trend-geo-signoff.md` Recommendation R2,
`docs/methodology/D3-brw-trend-domain-signoff.md` Recommendation D6.

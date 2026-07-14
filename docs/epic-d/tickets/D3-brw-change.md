# [D3-brw-change] BRW change / rent-gap-realisation signal

- **Issue:** [#263](https://github.com/dhelweg/gentriduck/issues/263)
- **Tier:** 2 · **Epic:** d · **Labels:** `epic-d,dbt,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07/README.md))

---

**Why:** D3 (#29) wired the Bodenrichtwert as a price *level*. Both D3 sign-offs (geo + domain) independently flag that a BRW *change* signal — `brw_yoy`/`brw_trend` — is "arguably the more valuable gentrification signal" (Smith's rent-gap *realisation*), but it "must be built and polarised as an explicit change indicator, distinct from the level", and was deferred. Now that the BRW back-series is ingested (multi-vintage staging landed via #112), building it is feasible and unblocked — but unfiled.

**Goal:** Add an explicit, separately-polarised BRW change/rent-gap-realisation indicator on the predictor/lead side of the index, distinct from the price level.

**Scope:**
- Intermediate computing `brw_yoy` / `brw_trend` per PLR across the available BRW vintages, with documented polarity (rising land value → upgrading pressure — the realisation of a rent gap).
- Place it on the predictor/lead side per ADR-0008; do not fold it into the D3 level dimension.
- Document the interpretation limits (land value ≠ realised rent; back-series depth).

**Acceptance:**
- `brw_trend` indicator built + tested; polarity/placement documented; `uv run poe build` green.
- geo-DS + domain sign-off on the change-signal construction and framing.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** domain-expert dual gate (this is a new index-affecting predictor).

**Deps:** #29 (D3 level, closed), #112 (BRW back-series, closed). Relates to D5-wire (both are predictor-side displacement/pressure signals).

**Source (why this is unfiled work):** `docs/epic-d/d3-price-rent-geo-signoff.md` (condition 14) and `docs/epic-d/d3-price-rent-domain-signoff.md` (D5: "BRW change is the theory-valuable, separately-built signal").

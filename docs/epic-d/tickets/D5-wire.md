# [D5-wire] Build & wire the displacement/affordability sub-index

- **Issue:** [#258](https://github.com/dhelweg/gentriduck/issues/258)
- **Tier:** 1 · **Epic:** d · **Labels:** `epic-d,dbt,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07/README.md))

---

**Why:** #70 ([B1] displacement & affordability) closed with its source data staged, but the *consuming* sub-index was never built. The three displacement intermediates — `int_berlin_milieuschutz_plr_flag`, `int_berlin_rent_pressure_proxy`, `int_berlin_turnover_proxy` — each carry "Zero consumers as of this model — not yet wired into any mart or the governed index". ADR-0008 reserved a "nullable/absent D5 dimension slot" and ADR-0019 explicitly deferred "integration into an intermediate sub-index or the governed `gentrification_index` … to a follow-up gated slice under #70" — but #70 is now closed, so that follow-up is tracked by nothing. Without D5 the public index reads as "nice amenities", not "neighbourhood change with social cost".

**Goal:** Build the displacement/affordability sub-index from the already-staged proxies and wire it into the governed model per the ADR-0008 typology (as the reserved D5 predictor dimension or a parallel published layer), with documented signs and limits.

**Scope:**
- Intermediate `int_berlin_displacement_subindex` (or equivalent) combining the Milieuschutz flag + rent-pressure proxy + turnover proxy, with documented polarity.
- Populate the ADR-0008 D5 slot in `gentrification_index.sql` (or publish alongside); leave Berlin-only, Hamburg parity deferred to H3 (#237).
- Cast `fl_ha` to numeric and resolve the other ADR-0019 Open Questions that were "deferred to the sub-index slice".
- Methodology note + G2 caveat: Milieuschutz is a *policy* marker, not a *measured* displacement outcome; the `improving` trajectory cannot be read as unambiguously positive without D5 (per R-A1/R-A8 sign-offs).

**Acceptance:**
- The three proxies have a real consumer; the D5 sub-index builds with tests; `uv run poe build` green.
- D5 wired per ADR-0008 with documented signs; index-identity/sensitivity note committed.
- `docs/methodology/index-definition.md` + the G2 page updated with the displacement caveats.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** gentrification-domain-expert dual gate (`Verdict: PASS`) before integration into `develop`. Strong displacement-framing/ethics involvement.

**Deps:** #70 (staged proxies, closed), ADR-0008 (D5 slot), ADR-0019 (Milieuschutz source). Feeds G2/O2.

**Source (why this is unfiled work):** `transform/models/intermediate/int_berlin_{milieuschutz_plr_flag,rent_pressure_proxy,turnover_proxy}.sql` headers; `docs/adr/0019-berlin-milieuschutz-displacement-source.md`; `docs/adr/0008-multi-dimensional-gentrification-model.md`; `docs/methodology/index-definition.md`.

# [I20-school-xcheck] Official-directory completeness cross-check for I20 amenity block

- **Issue:** [#270](https://github.com/dhelweg/gentriduck/issues/270)
- **Tier:** 3 · **Epic:** i · **Labels:** `epic-i,data`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07/README.md))

---

**Why:** I20 (#244) surfaces everyday-infrastructure amenity counts (schools, doctors, pharmacies, …) from OSM on area profile pages. OSM completeness for these categories is uneven; the I20 gate accepted this by rendering a caveat and noting "official-directory cross-check noted as future ticket". The I20 SPEC repeats: "official directories, e.g. the Berlin school registry, noted as a possible future cross-check ticket — not in scope." Not filed.

**Goal:** Cross-check the OSM-derived everyday-infrastructure counts (starting with schools) against an official open directory, to quantify and correct OSM under-registration for the amenity block.

**Scope:**
- Identify an open, login-free official directory (e.g. Berlin school registry) — architect confirms the source per the golden rule.
- Compare OSM counts vs the registry per area for at least schools; report coverage ratio.
- Either surface a completeness ratio next to the amenity block, or adjust the displayed counts, with the method documented. Display-only — not an index input.

**Acceptance:**
- Coverage comparison built for ≥1 category; completeness ratio/caveat rendered or counts corrected; source + method documented; `uv run poe build` green.

**Gate:** architect (new source) + geo-DS consulted on completeness framing; domain on any mover-facing wording (I20's "inform, never recommend" rule).

**Deps:** I20 (#244) + its slices (#252/#253/#254). New open data source → architect + maintainer OK.

**Source (why this is unfiled work):** `docs/epic-i/tickets/I20-amenity-insights-movers.md` ("official directories … noted as a possible future cross-check ticket — not in scope"); #244 body ("official-directory cross-check noted as future ticket").

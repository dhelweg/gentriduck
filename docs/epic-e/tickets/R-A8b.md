# [R-A8b] Full 7-edition (2008–2024) trajectory panel + clustering

- **Issue:** [#260](https://github.com/dhelweg/gentriduck/issues/260)
- **Tier:** 1 · **Epic:** e · **Labels:** `epic-e,ml,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07/README.md))

---

**Why:** R-A8 (#78) shipped the trajectory/stage model on **only 3 editions** of the outcome series. Its geo-signoff states: "the full 7-edition (2008–2024) trajectory intended by the project plan is deferred until the POI pipeline is extended to pre-2021 years", and "when 7 editions are available, revisit the classification rules … and add proper trajectory clustering (k-means/DTW)". With only 3 editions + an integer ordinal, the `mixed` trajectory category is "structurally vacuous". None of this is tracked.

**Goal:** Recompute `fct_gentrification_trajectory` over the full 2008–2024 panel once pre-2021 POIs exist, activate the `mixed` (V-/N-shape) category, and upgrade classification from threshold rules to proper trajectory clustering.

**Scope:**
- Extend the trajectory panel to the 7-edition range enabled by pre-2021 POI ingestion (dep below).
- Add k-means / DTW trajectory clustering; re-derive/validate classification rules; make the `mixed` category non-vacuous.
- Re-validate against MSS Dynamik and the R-B2 hotspot back-test; refresh plain-language stage descriptions.
- Carry the R-A8 "improving ≠ unambiguously positive without D5" caveat into any public copy.

**Acceptance:**
- 7-edition trajectory panel built; `mixed` populated where warranted; clustering method documented.
- Re-validated vs MSS/hotspots; `uv run poe build` green; sign-off notes recorded.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** domain-expert dual gate.

**Deps:** **blocked on #257 (pre-2021 POI ingestion)**; builds on R-A8 (#78), R-B2 (#71), MSS (#66) — all closed.

**Source (why this is unfiled work):** `docs/methodology/R-A8-geo-signoff.md` and `docs/methodology/index-definition.md` (`mixed` "structurally vacuous … until the full 7-edition panel (2013-2025) becomes available"); `docs/methodology/R-A8-domain-signoff.md`.

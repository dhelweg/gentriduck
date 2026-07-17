# [QA-winsor] Winsorize dynamism_score at ±3 SD

- **Issue:** [#268](https://github.com/dhelweg/gentriduck/issues/268)
- **Tier:** 3 · **Epic:** c · **Labels:** `epic-c,dbt,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07.md))

---

**Why:** Winsorizing `dynamism_score` at ±3 SD was raised as a non-blocking enhancement in the C4 geo-signoff, repeated in C5, made a (non-blocking) PASS condition in C6, and again noted in the G2 geo-signoff as "not yet implemented — noted for the next revision". It keeps being recommended and deferred across four sign-offs and is still not done — the dynamism series remains exposed to outlier tails on maps/narratives.

**Goal:** Winsorize `dynamism_score` at ±3 SD in the governed pipeline and note it on the methodology page.

**Scope:**
- Apply ±3 SD winsorization where `dynamism_score` is computed; keep the raw value available if any consumer needs it.
- Add/adjust the anomaly-jump data-quality test if affected; note the treatment on the G2 page.

**Acceptance:**
- Winsorization applied + tested; downstream maps/narratives consume the winsorized value; `uv run poe build` green; G2 note added.

**Gate:** ⚖️ methodology-bearing (normalization change) — geo-DS confirms; domain if any public reading changes.

**Deps:** C4/C5/C6 (#24/#25/#26, closed). Relates to G2-audit (this is one of the caveats that audit would otherwise have to document as "not done").

**Source (why this is unfiled work):** `docs/epic-c/C4-geo-signoff.md`, `docs/epic-c/C5-geo-signoff.md`, `docs/epic-c/C6-geo-signoff.md` (PASS condition 2, "still open"), `docs/epic-g/G2-geo-signoff.md`.

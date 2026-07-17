# [H-reg-SE] Re-home #129's Hamburg Stadtteil-clustered-SE requirement

- **Issue:** [#265](https://github.com/dhelweg/gentriduck/issues/265)
- **Tier:** 2 · **Epic:** h · **Labels:** `epic-h,ml`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07.md))

---

**Why:** #129 ([H2-SE]) was a **standing requirement**: any future Hamburg E1/E2-equivalent regression using the D4 (EWR-equivalent) composite must cluster standard errors at Stadtteil grain (effective N ≈ 104 Stadtteile, not ≈ 941 Gebiete — a change-of-support / MAUP issue, H1 geo-signoff Condition 2). Its own body says: "leave in Todo until a Hamburg regression/analysis ticket is scoped, then fold this AC into that ticket and close this one." It was **closed** anyway, without a Hamburg regression ticket existing — so the requirement now has no home and would be silently lost when a Hamburg regression is eventually written.

**Goal:** Re-home the standing requirement so it cannot be lost — either as a scoped Hamburg E1/E2-equivalent regression ticket that bakes the SE-clustering AC in, or (if no regression is wanted yet) a reinstated standing reminder.

**Scope:**
- Restate the requirement: for any Hamburg regression involving the D4 composite, cluster SEs at Stadtteil grain; report effective N honestly.
- Either scope the Hamburg regression itself (mirroring Berlin #30/#31), folding the AC in, or keep as an explicit standing requirement linked from the Epic H methodology page so it surfaces when that work is scoped.

**Acceptance:**
- The Stadtteil-clustered-SE requirement is durably captured against future Hamburg regression work (in a live ticket or the Epic H methodology page), with the H1 geo-signoff Condition 2 citation.

**Gate:** geo-DS confirms the requirement text; dual gate applies to any actual Hamburg regression.

**Deps:** #40 (H1, closed), #125 (H2, closed), #129 (closed), #237 (H3 publish, open). Relates to `int_ewr_socioeco_hamburg` D4.

**Source (why this is unfiled work):** #129 body ("leave in Todo until a Hamburg regression … is scoped … then close"); `docs/epic-h/H1-geo-signoff.md` (Condition 2); `docs/epic-h/E5-hamburg-lead-lag-findings.md`.

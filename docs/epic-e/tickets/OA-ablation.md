# [OA-ablation] Improved-OA extended to lor_pre2021 for a true ablation

- **Issue:** [#261](https://github.com/dhelweg/gentriduck/issues/261)
- **Tier:** 1 · **Epic:** e · **Labels:** `epic-e,ml,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07.md))

---

**Why:** The faithful-vs-improved Offering-Advantage three-way comparison (OA-C.1, #174) could only run an approximate ablation because the **improved** causal-tier seed + OA pipeline exist for `lor_2021` only. A *true* same-anchor ablation (faithful vs improved on the identical pre-2021/2018 sample) is repeatedly flagged as "a new methodology-bearing ticket, not mechanical — tracked, not scheduled". It is not filed.

**Goal:** Extend the improved-variant causal-tier seed and OA computation to the `lor_pre2021`/2018 vintage so a genuine head-to-head faithful-vs-improved ablation becomes publishable, then re-run the C1 three-way comparison on the common sample.

**Scope:**
- Extend `seed_poi_offering_relevance` tiering coverage / OA pipeline to pre-2021 (its own tier-weight review — not a mechanical crosswalk reuse, per B3 sign-off).
- Re-run the C1 three-way comparison (faithful vs improved vs 2018 golden) on the same-anchor pre-2021 sample; update `docs/epic-e/C1-three-way-comparison-findings.md` and the public methodology-comparison page.
- Respect the standing OA conditions: bandwidth-fragility publish gate (ADR-0017 C-4), minimum-POI-base suppression (D-3), descriptive-not-causal framing (D-1).

**Acceptance:**
- Improved OA available at pre-2021 grain; a true same-anchor ablation reported with the bandwidth/suppression/framing conditions applied.
- geo-DS + domain sign-off; findings + comparison page refreshed; `uv run poe build` green.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** domain-expert dual gate.

**Deps:** **blocked on #257 (pre-2021 POI ingestion)**; builds on OA-C.1 (#174), OA-B.3 (#172), ADR-0017/0018 — all closed. Feeds O2 (#82).

**Source (why this is unfiled work):** `docs/epic-e/C1-three-way-comparison-{findings,geo-signoff,domain-signoff}.md`; `docs/epic-c/B3-oa-weighted-index-geo-signoff.md` ("lor_pre2021/Hamburg extension needs its own tier-weight review"); `docs/epic-g/C2-methodology-comparison-geo-signoff.md`.

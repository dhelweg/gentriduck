# [R-B2b] Extend ground-truth back-test seed + dynamism back-test

- **Issue:** [#264](https://github.com/dhelweg/gentriduck/issues/264)
- **Tier:** 2 · **Epic:** e · **Labels:** `epic-e,ml,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](./README.md))

---

**Why:** The ground-truth back-test harness (R-B2, #71) shipped, and both sign-offs recommended two explicit follow-ups that were never filed: (1) extend the ground-truth seed beyond west-Berlin hotspots with 2–3 eastern-Berlin / Lichtenberg pressure-zone PLRs (the current seed under-represents eastern gentrification), and (2) add a `dynamism_index` (D2) back-test alongside the existing status back-test.

**Goal:** Broaden and deepen the back-test so agreement/hotspot-recall thresholds are evaluated on a more representative ground-truth set and against the dynamism dimension, not status alone.

**Scope:**
- Add 2–3 Lichtenberg / eastern-Berlin pressure-zone PLRs (and any non-MSS-labelled controls) to the R-B2 ground-truth seed, with cited rationale.
- Add a `dynamism_index` (D2) back-test to the harness (can sit alongside status; per geo-signoff "post-G2 or as part of C5/R-A6").
- Re-report agreement / hotspot-recall thresholds on the extended seed.

**Acceptance:**
- Extended seed committed with citations; dynamism back-test runs under the gate; thresholds re-reported; `uv run poe build` green.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** domain-expert dual gate (ground-truth selection is a domain call).

**Deps:** #71 (R-B2, closed), MSS (#66, closed).

**Source (why this is unfiled work):** `docs/methodology/R-B2-domain-signoff.md` ("Extend seed to include 2-3 Lichtenberg/eastern Berlin pressure-zone PLRs in a follow-up ticket"); `docs/methodology/R-B2-geo-signoff.md` ("Add a dynamism_index back-test as a follow-up ticket").

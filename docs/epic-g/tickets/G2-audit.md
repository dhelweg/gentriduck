# [G2-audit] Audit the public methodology page vs carry-forward caveats

- **Issue:** [#262](https://github.com/dhelweg/gentriduck/issues/262)
- **Tier:** 1 · **Epic:** g · **Labels:** `epic-g,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07.md))

---

**Why:** The public methodology page (G2, #38 / in-site #142) was published while a large stack of *binding* "carry this caveat onto the G2 page" conditions accumulated across dozens of geo-DS/domain sign-offs. There is no single ticket that verifies each one actually landed on the live page. For a public statistics product this is a trust risk: a caveat that was gated as mandatory but silently dropped in publication is exactly the failure the gate exists to prevent.

**Goal:** A one-pass audit that reconciles the published methodology/data-sources page(s) against every accumulated "carry-to-G2" condition, and closes any gaps.

**Scope — verify each of these is present (non-exhaustive, from the sign-offs):**
- EWR levels-vs-YoY-changes divergence; `migration_background_share` comparability restricted to ≥2017 (Mikrozensus break).
- MAUP / PLR-scale labelling; the 447↔542 PLR boundary break + crosswalk dependency; the 3→4 MSS index-indicator drift.
- OSM completeness/survivorship bias; `dynamism_score` not winsorized (if still true).
- OA "descriptive-not-causal" framing; isotropic-catchment + transit-structure simplification; bandwidth-sensitivity.
- `improving`/`improving-vulnerable` trajectory ambiguity (needs D5 before reading as positive).
- LISA/Gi* multiple-comparisons posture (permutations ≥999; FDR disclosure).
- Milieuschutz = policy marker, not measured outcome (once D5 lands).

**Acceptance:**
- A checklist doc mapping each carry-forward condition → the exact page section that satisfies it (or a fix PR where missing).
- Any missing mandatory caveats added to the live page; geo-DS + domain confirm the reconciliation.

**Gate:** ⚖️ methodology-bearing (touches the governed public methodology framing) — geo-DS + domain confirm.

**Deps:** G2 (#38, closed), #142 (closed), and every sign-off under `docs/methodology/**` and `docs/epic-*/**`.

**Source (why this is unfiled work):** recurring "carry to G2 / must be documented on the public methodology page" conditions in `docs/methodology/R-A1/R-A3/R-A4/R-A5/R-A7/R-A9-*-signoff.md`, `docs/epic-b/B6/B7/B9-*`, `docs/epic-c/C4/C6-*`, `docs/epic-h/H1-*` — none individually re-verified post-publication.

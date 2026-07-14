# [I-coarse-index] Coarse-grain gentrification index at BZR/PGR/Bezirk (MAUP)

- **Issue:** [#267](https://github.com/dhelweg/gentriduck/issues/267)
- **Tier:** 2 · **Epic:** i · **Labels:** `epic-i,dbt,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](./README.md))

---

**Why:** I18 (#242) built Bezirk/PGR/BZR profile pages that deliberately show **sums + child-stage distributions only, no re-scored index** — because "computing a gentrification-index value at BZR/PGR/Bezirk grain … is a spatial-aggregation methodology decision (MAUP) → its own methodology-bearing follow-up if ever wanted." That follow-up is not filed. Today coarse pages can't answer "how gentrified is this whole Bezirk?" with a headline value.

**Goal:** Decide and (if approved) implement a defensible coarse-grain gentrification-index value at BZR/PGR/Bezirk grain, with the MAUP treatment made explicit — or record a reasoned decision not to, so the gap stops being an implicit TODO.

**Scope:**
- geo-DS + domain decision on whether a coarse-grain index value is methodologically defensible, and if so how (re-score from coarse inputs vs population-weighted aggregate of PLR scores vs distributional summary), with a MAUP sensitivity note.
- If approved: an intermediate/mart emitting the coarse-grain value + the web wiring onto the I18 pages, clearly labelled with its aggregation method and limits.
- If declined: document the decision and the "distribution-only" rationale on the methodology page so it isn't re-litigated.

**Acceptance:**
- A signed-off decision doc (defensible method + MAUP note, or reasoned no-go). If built: coarse-grain value renders on I18 pages with method/limits labelled; `uv run poe build` green.

**Gate:** ⚖️ methodology-bearing — geo-DS **and** domain-expert dual gate.

**Deps:** I18 (#242, closed), I18-web (#247), the `dim_area_hierarchy` model.

**Source (why this is unfiled work):** `docs/epic-i/tickets/I18-geo-hierarchy-pages.md` ("Not in this ticket: computing a gentrification-index value at BZR/PGR/Bezirk grain … its own methodology-bearing follow-up if ever wanted").

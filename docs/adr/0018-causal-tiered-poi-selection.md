# ADR-0018: Causality-first-with-data-confirmation POI selection rule (Workstream 2 / improved OA)

- **Status:** Accepted (R-C1 dual sign-off recorded 2026-07-09 — geo-DS PASS, domain-expert PASS)
- **Date:** 2026-07-09
- **Deciders:** system-architect (author); geo-data-scientist + gentrification-domain-expert (R-C1 gate); maintainer (accept)
- **Issue:** #173 [OA-B.4]; part of the OA revival cluster #163–#175
- **Supersedes / amends:** none. Formalizes, as a standing decision, the selection rule already
  *practiced* by OA-B.1 (#170, `seed_poi_offering_relevance.csv`) and OA-B.2 (#171,
  `analysis/c_offering_relevance_validation.py`). Extends ADR-0017 D3 (the 2×2 firm rule was stated
  there as prose; this ADR is the standalone decision record the plan promised at D3/D5 and pins the
  rule's mechanics, its non-circularity proof, and its boundary against #80 [A10] causal inference).
- **Grounding (R-C2):** ADR-0017 D3/D5; `docs/planning/oa-revival-and-methodology-improvement.md`
  §"POI relevance model"; `transform/seeds/seed_poi_offering_relevance.csv`;
  `analysis/c_offering_relevance_validation.py`;
  `docs/epic-b/B1-oa-relevance-seed-{geo,domain}-signoff.md`;
  `docs/epic-c/B2-offering-relevance-validation-findings.md`;
  `docs/epic-c/B2-oa-relevance-validation-{geo,domain}-signoff.md`.

> This ADR is **methodology-bearing** per CLAUDE.md R-C1 (it touches `docs/adr/**` and fixes the
> selection rule for the improved OA variant's inputs). It therefore requires **both** a
> `geo-data-scientist` and a `gentrification-domain-expert` `Verdict: PASS` before it is integrated
> into `develop`. The system-architect authored it and does **not** sign off on it.

---

## Context

ADR-0017 (D3) split the OA revival into two workstreams that must never be blended: **faithful**
(Run 1, all POI types, no curation, thesis semantics) and **improved** (Run 2, curated *which* POI
types count toward the offering-advantage signal). D3 stated the improved-variant curation rule as a
firm prose rule — a 2×2 of causal plausibility × outcome correlation — and D5 pinned the ADR that
would formalize it to this ticket (OA-B.4, #173), to be authored only *after* the rule had actually
been exercised once (OA-B.1 tiering, OA-B.2 data confirmation), so the formalization documents a
rule that has already been proven workable rather than a speculative one.

That exercise is now complete: OA-B.1 (#170) tiered all 231 taxonomy nodes
(`offering_tier ∈ {0,1,2,3}` → `offering_weight ∈ {0.0, 0.33, 0.66, 1.0}`) from causal-plausibility
literature alone, with `data_corr` left deliberately blank; OA-B.2 (#171) then ran the confirmation
pass (Spearman rho of node-level OA vs. the 2018 thesis `status_index`, n≥10, α=0.05) and filled
`data_corr` **without ever touching a tier or weight**. The crosstab
(`docs/epic-c/B2-offering-relevance-validation-findings.md`) is the empirical proof the rule is
non-circular in practice, not merely in intent:

| offering_tier | correlated (p<0.05) | not correlated | n/a |
|---|---|---|---|
| 0 | 15 | 50 | 51 |
| 1 | 4 | 23 | 32 |
| 2 | 2 | 19 | 17 |
| 3 | 1 | 3 | 14 |

15 tier-0 nodes turned out to be significantly correlated with the outcome — and were **kept
dropped**, exactly as the rule requires (correlation alone never promotes a tier-0 node). Conversely,
45 causally-plausible (tier ≥ 1) nodes were **not** empirically confirmed this pass and were **kept at
their theory tier** (not demoted) — data can calibrate within a tier but the theory floor governs
inclusion. This ADR writes down that already-exercised rule as the standing decision so every future
Workstream-2 ticket (OA-C.1 #174, and any later re-run of B.1/B.2 on new data) is bound by it without
re-deriving it from prose each time.

It is a decision record, **not** an implementation ticket — no new tool, library, or data source; no
model is changed by this ADR itself (OA-B.1/B.2/B.3 already implement it; this ADR formalizes the
rule they already followed).

### Constraints this ADR must respect

- **Free + open only; local-first DuckDB; city-agnostic core (ADR-0005).** The rule is a taxonomy
  curation policy over `dim_area`-scoped POI stock, with no Berlin constant in the rule itself
  (Berlin's specific tier assignments are a seed/data artifact, not part of the rule).
- **Non-circularity is the load-bearing property.** The rule exists specifically to prevent the
  improved variant from becoming "whatever correlates with the outcome this year" — a criterion that
  would be circular (fitting to the very outcome being predicted) and would collapse Workstream 2 into
  a restatement of Workstream 1 plus overfitting.
- **Not causal inference.** "Causal" here means *theoretical causal-plausibility as a selection
  filter* (does an established urban-sociology mechanism connect this POI type to commercial
  gentrification), evaluated ex ante from literature — **not** causal inference in the DiD /
  event-study sense (#80 [A10]), which estimates a treatment effect from data and is explicitly
  deferred. **(Follow-up now tracked: #259 (A10-P2) — see `docs/planning/deferred-work-audit-2026-07.md`.)** Conflating the two would misrepresent the improved variant as causally validated when it
  is a theory-curated *descriptive* predictor (D-1, inherited from ADR-0017).

---

## Decision

### D1 — The selection rule is a strict two-step order, never reversible

**Step 1 (theory, first, blind to outcome data):** every taxonomy node (domain/category/type) is
assigned a causal-plausibility tier `∈ {0, 1, 2, 3}` from urban-sociology/retail-succession literature
alone (Zukin 2009; Ley 1996; Lees, Slater & Wyly 2008; Dangschat 1988; Smith 1979/1987; Florida 2002;
Gotham 2005), with a `causal_rationale` citation per node. No outcome variable (MSS trajectory, rent
level, 2018 golden, `status_index`) may be consulted at this step. This is OA-B.1's
`seed_poi_offering_relevance.csv`.

**Step 2 (data, second, confirmation/calibration only):** a data-driven correlation pass (node-level
OA vs. the outcome, Spearman rho, α=0.05) is run **after** Step 1 is locked, and may only:

1. **fill an advisory `data_corr` field** documenting whether/how strongly a node's theory tier is
   empirically confirmed;
2. **flag** (not silently correct) a direction mismatch between the theoretical prior and the
   empirical sign, for a human/domain review;
3. **never rewrite `offering_tier` or `offering_weight`** — confirmed by direct inspection: OA-B.2
   modifies only `data_corr`, no tier/weight cell changes value from Step 1 to after Step 2.

This ordering is structural, not aspirational — it is enforced by which ticket owns which column
(`OA-B.1` owns `offering_tier`/`offering_weight`; `OA-B.2` owns `data_corr` only) and by the seed's
own grain: `data_corr` is a distinct, separately-populated column, not a recomputed tier.

### D2 — The 2×2 outcome table and what each cell means

|                                  | correlated w/ outcome (p<0.05)        | not correlated / n/a                    |
|----------------------------------|----------------------------------------|------------------------------------------|
| **causally plausible** (tier≥1)  | **KEEP, full tier weight** — theory and data agree; strongest inclusion case. | **KEEP, theory tier weight, unchanged** — theory floor governs; absence of significance in one snapshot does not demote (small-n PLR-level tests are underpowered for rare types; §Risks). |
| **not causally plausible** (tier 0) | **DROP (spurious)** — correlation without a mechanism is treated as confounded/spurious (e.g. an unrelated correlate of general density), not evidence for inclusion. **Never promoted regardless of correlation strength.** | **DROP** — no mechanism, no correlation; unambiguous. |

The load-bearing asymmetry: **the top-left and top-right cells both keep the node** — data can
*never* demote a causally-plausible node below its theory tier within a single confirmation pass, and
the bottom-left cell (correlated-but-not-plausible) is the *only* cell where a positive empirical
signal is deliberately discarded. This asymmetry is what keeps the rule from degenerating into pure
correlation-mining: a naive "keep whatever correlates" rule would have wrongly kept all 15 spurious
tier-0 nodes found in the B.2 pass (transit stops, bike parking, recycling containers — general-density
correlates with no retail-succession mechanism).

### D3 — Non-circularity proof (why this rule is not "look at the answer, then justify it")

The rule is non-circular because the two inputs to Step 2's judgement are **temporally and
causally independent** of each other by construction:

1. Step 1's tier is fixed from **literature published independent of this project's own outcome data**
   (the cited sources predate and are external to the Berlin MSS/2018-golden outcome being predicted).
2. Step 2's correlation is computed **after** Step 1 is committed to a versioned seed
   (`seed_poi_offering_relevance.csv`, git-tracked) — there is no code path by which the correlation
   pass can feed back into the tier column; `analysis/c_offering_relevance_validation.py` is read-only
   with respect to the seed (writes only `data_corr` findings to a separate output).
3. The empirical proof (D2's asymmetric outcome, §Context table) demonstrates the independence was
   real, not merely procedural: 15 tier-0 nodes *did* correlate and were *still* dropped; 45
   tier-≥1 nodes *did not* correlate this pass and were *still* kept. If the rule were circular
   (tier secretly informed by a peek at the correlation), these two counts would trivially be near
   zero — instead they are the largest cells in the table, showing theory and data frequently
   disagreed and theory's floor held.

### D4 — Relationship to causal inference (#80 [A10]) — explicitly distinct, not a substitute

This rule answers *"which POI types are theoretically plausible descriptive correlates of commercial
gentrification, confirmed where the data permits?"* It does **not** answer *"does POI type X cause (or
is caused by) gentrification, and by how much?"* — that is the deferred causal-inference program (DiD
/ event-study designs, #80). Two concrete distinctions:

- This rule's "causal" step is a **qualitative literature screen** performed once per taxonomy node,
  not a statistical identification strategy (no instrument, no control group, no counterfactual
  estimate).
- This rule's "data" step is a **plain correlation** (Spearman rho, cross-sectional), which is
  explicitly *not* claimed as a causal effect estimate — it is used only to confirm/flag a
  pre-committed theoretical prior, never to establish a magnitude of causal impact.

Any future #80 work that wants to test causal claims about specific POI types should treat this ADR's
tiering as a **candidate list of theoretically plausible mechanisms to test**, not as a completed
causal analysis to build on directly.

### D5 — Binding requirements on downstream/future tickets

- **OA-C.1 (#174):** the three-way comparison may report the crosstab (D2) as a descriptive finding
  about theory/data (dis)agreement, but must not present tier-0-correlated nodes as "should have been
  included" or tier-≥1-unconfirmed nodes as "should have been dropped" — that would silently re-open
  Step 1 to Step 2 feedback, breaking D3's non-circularity.
- **Any future re-run of OA-B.1/B.2** (new city, new snapshot year, taxonomy update): must preserve the
  two-step order (tier locked before data consulted) and the same asymmetric keep/drop cells (D2); a
  new correlation pass on existing tiers may update `data_corr` but must not silently retier without a
  new, independently-authored `causal_rationale` citation (i.e., re-tiering requires re-doing Step 1,
  not just re-running Step 2).
- **`data_corr` remains advisory, not load-bearing in the weight formula**, unless a future ticket
  explicitly proposes and gates (as its own methodology-bearing change) a `data_corr`-based calibration
  shrink — carried forward from the B.2/B.3 sign-off advisory
  (`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.1); this ADR does not itself adopt that
  shrink.

---

## Consequences

**Positive**

- The improved variant's inclusion criterion is now a **named, standalone, citable decision** rather
  than prose embedded in ADR-0017 — future tickets (and the O2 whitepaper, #82) can cite ADR-0018
  directly for "why is this POI type in/out of the improved OA composite."
- The rule's non-circularity is now backed by an **empirical demonstration** (D3), not just a
  structural argument — the B.2 crosstab is preserved as the proof artifact.
- The boundary against #80 causal inference (D4) is made explicit, closing a plausible public-framing
  misread ("theory-tiered" could otherwise be mistaken for "causally validated").

**Negative / accepted trade-offs**

- The rule accepts a **known false-negative risk**: causally-plausible-but-unconfirmed nodes (45 of
  231) stay in the improved composite at full theory weight with no empirical support this pass — by
  design (theory floor), but this means the improved variant is not purely "data-validated."
- Small-n PLR-level correlation tests (114 of 231 nodes marked n/a) are **underpowered for rare
  types** — the confirmation step has limited reach for the taxonomy's long tail; this is a known,
  documented limitation, not silently smoothed over.
- No new tool/library/data source is introduced; this ADR is pure formalization of an already-run
  process, so there is no new operational cost.

**Follow-ups (owned by later tickets, not this ADR)**

- OA-C.1 (#174): three-way comparison, respecting D5's reporting boundary.
- Any future `data_corr`-based calibration shrink (B.3 advisory) would need its own methodology-bearing
  ticket and R-C1 gate — not authorized by this ADR.

---

## Sources

- ADR-0017 (OA revival, D3/D5); `docs/planning/oa-revival-and-methodology-improvement.md` §"POI
  relevance model".
- `transform/seeds/seed_poi_offering_relevance.csv`;
  `docs/epic-b/B1-oa-relevance-seed-geo-signoff.md`, `B1-oa-relevance-seed-domain-signoff.md`.
- `analysis/c_offering_relevance_validation.py`;
  `docs/epic-c/B2-offering-relevance-validation-findings.md`,
  `B2-oa-relevance-validation-geo-signoff.md`, `B2-oa-relevance-validation-domain-signoff.md`.
- `docs/epic-c/B3-oa-weighted-index-geo-signoff.md`, `B3-oa-weighted-index-domain-signoff.md`
  (`data_corr` calibration advisory, carried forward per D5).
- Zukin (2009), *Naked City*; Ley (1996), *The New Middle Class*; Lees, Slater & Wyly (2008),
  *Gentrification*; Dangschat (1988) invasion-succession; Smith (1979/1987) rent-gap; Florida (2002)
  creative class; Gotham (2005) tourism gentrification.
- Issue #80 [A10] (causal/early-warning design, DiD/event-study) — explicitly distinct, see D4.

---

## R-C1 sign-off (required before integration into `develop`)

- **geo-data-scientist:** PASS — `docs/epic-c/B4-adr-causal-tier-geo-signoff.md`.
- **gentrification-domain-expert:** PASS — `docs/epic-c/B4-adr-causal-tier-domain-signoff.md`.

*Both R-C1 verdicts are `PASS`; the PM integrated this ADR into `develop` per ADR-0011 self-integration
authority (no new tool/library/data-source introduced, so no separate maintainer approval is required
beyond the R-C1 gate). The system-architect authored this ADR and did not sign it off.*

# Domain decision — I-coarse-index (#267): coarse-grain gentrification-index value at BZR/PGR/Bezirk

- **Ticket:** `docs/epic-i/tickets/I-coarse-index.md` · **Issue:** #267
- **Branch:** `feature/267-coarse-index` (no code yet — decision precedes implementation, by design)
- **Author:** gentrification-domain-expert
- **Date:** 2026-07-17
- **Gate:** R-C1 methodology-bearing · dual gate; this doc is the **domain/theory-fidelity** lane only.
  The **geo-data-scientist** renders the parallel statistical/MAUP-aggregation-method verdict separately.
- **This lane's question:** Is the *construct itself* — a single "gentrification index value" for a
  Bezirk (12) / PGR (~58) / BZR (~140) — theoretically sound to present publicly at all? (Not: how to
  aggregate it correctly. That is the geo-DS lane.)

## Verdict: DECLINE (do not build a coarse-grain point-value index)

Endorse and formalize what I18 (#242) already ships: **sums + child-stage distributions, no re-scored
index**, at every grain coarser than PLR. A coarse-grain point-value gentrification index is **not
domain-defensible** and should be declined on theory-fidelity grounds independent of whatever aggregation
math the geo-DS lane finds. The gap #267 names is real and should be closed — but closed by **filling it
with a distributional summary**, documented on the methodology page so it is not re-litigated, not by
minting a borough-level headline number.

---

## Scope

In: whether a coarse "how gentrified is this whole Bezirk/PGR/BZR" **point value** is a theoretically
honest construct to publish. Out (geo-DS lane): the aggregation method (re-score from coarse inputs vs
population-weighted mean of PLR scores vs distributional), MAUP sensitivity, numeric cut-points. Also out:
the Phase-1 rollup rules I18 already gated (sum-then-recompute shares, stage distributions) — those stand.

## Theory-fidelity analysis

### 1. A coarse point-value index directly violates this project's own G-2 guardrail

`index-definition.md` §1.2 (**G-2, ecological-inference guard**) binds the stage to a **Planungsraum** —
*"a small-area aggregate of ~thousands of residents … not a statement about any individual or building …
inferring an individual's situation from a PLR stage is an ecological fallacy."* A Bezirk-level index does
the *same fallacy one rung up the ladder*: it invites a reader in one PLR to infer their neighbourhood's
state from a borough average. The whole reason G-2 stops at PLR is that PLR is the finest grain at which
the EWR/MSS inputs are published and the coarsest grain at which the aggregate is not yet actively
misleading. A single Bezirk number re-opens exactly the inference G-2 was written to close. Sanctioning it
would be internally incoherent with the methodology the dual gate exists to protect.

### 2. A point value erases the invasion-succession heterogeneity that is the project's whole thesis

The index operationalizes Dangschat's (1988; 2000) **double invasion-succession cycle** and the D1×D2
typology (`index-definition.md` §9): gentrification is a *frontier* phenomenon — pioneer invasion and
commercial/social succession advance **unevenly across space**, and the analytic payload is precisely
*where the frontier sits*. Friedrichshain-Kreuzberg, Mitte, and Neukölln each simultaneously contain
`active-gentrification` PLRs and `stable-established` / `pre-gentrification` / declining ones. Collapsing
that to one number does not summarize the heterogeneity — it **destroys the signal**. A Bezirk mean sitting
in some middle typology cell describes *no actual PLR* and misrepresents both the gentrifying frontier and
the stable interior. This is not a precision quibble; it is the construct measuring the opposite of what
the theory says matters. (Compare the thesis's own rejection, `int_gentrification_ts.sql` line 9, of an
earlier index that "conflated" the cycles — a coarse point value is that same category error spatially.)

### 3. The public-communication need is real but is *better* served without a point value

The pull in #267 is legitimate: readers think in districts and Kieze (I18 "Why"), land on a coarse page,
and want a headline. But a "how gentrified is Neukölln" **point value invites borough-level
stigmatization** — the blanket "Neukölln is gentrifying" claim that erases which specific PLRs carry
displacement pressure and which do not. That runs against both the project mission (documenting *fine-grained*
frontiers) and the Ethics/framing duty to avoid findings that could accelerate displacement or stereotype
whole boroughs. A **distributional** presentation serves the identical reader need while being more
theoretically honest: e.g. *"18 of 45 PLRs in this Bezirk are in `active-gentrification` typology,
concentrated in Ortsteile X/Y/Z; 20 remain `pre-gentrification`/`stable-established`."* That is a real
headline, it preserves the frontier structure central to the theory, and it points the reader *down* the
hierarchy to the PLRs that actually carry signal — exactly the walk I18 built the ladder to enable. The
official berlin.de BZR *Kurzprofile* I18 emulates likewise report distributions/counts, not a single
composite "gentrification score," so distribution-only also keeps Kurzprofil parity.

### Why not "point value with a heterogeneity disclaimer"?

Considered and rejected. A disclaimer does not cure a construct that is *measuring the wrong thing*: the
number would still be read as the headline and screenshotted without the caveat (the same reason G-2
prohibits, rather than merely footnotes, the `post-displacement` label). When the honest artefact (the
distribution) is strictly more informative and no harder to render, adding a misleading point value beside
it is a net loss.

## Recommendation

1. **Decline** the coarse-grain point-value gentrification index at BZR/PGR/Bezirk. No re-scored single
   index value at any grain coarser than PLR — extend the existing G-2 guard to say so explicitly.
2. **Close the #267 gap with a distributional headline**, not silence: a compact child-typology
   distribution (counts/share of child PLRs per typology stage + the concentrating Ortsteile/BZR names)
   as the coarse-page "how gentrified is this area" answer. This is an extension of the I18 Phase-1 rollup,
   not a new index construct — so if the geo-DS lane confirms the rollup arithmetic (sum-then-recompute;
   distribution presentation), it needs **no new index methodology**.
3. **Document on the methodology page** (feeds G2) the reasoned no-go: "gentrification is a PLR-grain
   frontier construct (G-2 + Dangschat double invasion-succession); coarser grains are reported as
   distributions of child PLRs, never as a re-scored point value" — so this stops being an implicit TODO.
4. **Framing constraints if the maintainer nonetheless wants a coarse scalar** (documented, not endorsed):
   it may only be an explicitly-labelled *dispersion/composition* statistic — e.g. "share of PLRs in
   active-gentrification typology" — never presented, coloured, or ordered as "the Bezirk's gentrification
   index." A central-tendency point value remains a domain FAIL.

## Coordination

Complementary to the geo-DS MAUP lane. If geo-DS also finds the point-value aggregation statistically
unsound under MAUP, the lanes agree and #267 declines cleanly. If geo-DS were to find a defensible
aggregation *method*, this domain decline still stands: a statistically-clean average of a frontier
process is still a theoretically dishonest public construct. Disagreement between the lanes escalates to
the maintainer per R-C1.

---

```json
{
  "verdict": "decline",
  "domain_rationale": "A single coarse-grain gentrification-index point value at Bezirk/PGR/BZR is not theory-defensible: it re-commits the ecological-inference fallacy the project's own G-2 guardrail closes at PLR grain, and it erases the invasion-succession frontier heterogeneity (Dangschat 1988/2000; D1xD2 typology) that is the entire analytic payload. The legitimate coarse-page headline need is better and more honestly served by a child-PLR typology distribution than by a point value, which invites borough-level stigmatization against the project mission and displacement-ethics duty.",
  "theory_risks": [
    "Ecological fallacy one rung up: readers infer their PLR's state from a Bezirk average (violates G-2, index-definition.md 1.2).",
    "Frontier-erasure: a central-tendency value describes no actual PLR and hides where succession is/ isn't advancing (Dangschat double invasion-succession, index-definition.md 9).",
    "Public misuse: 'Neukoelln is gentrifying' blanket stigma erases which PLRs carry displacement pressure; a disclaimer does not cure a mis-measuring construct (cf. prohibited 'post-displacement' label).",
    "Internal incoherence: minting a coarse index undercuts the methodology the dual gate exists to protect."
  ],
  "recommendations": [
    "Decline the coarse point-value index at all grains coarser than PLR; extend G-2 to state this explicitly.",
    "Close the #267 gap with a child-typology distribution headline (counts/shares per stage + concentrating Ortsteile), an extension of the I18 Phase-1 rollup, not a new index.",
    "Record the reasoned no-go on the methodology page (feeds G2) so it is not re-litigated.",
    "If a coarse scalar is still wanted, permit only an explicitly-labelled composition/dispersion statistic (e.g. share of PLRs in active-gentrification), never a central-tendency 'Bezirk gentrification index'."
  ]
}
```

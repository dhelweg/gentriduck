---
task: A10-P1 / #80 (Part 1 ONLY) — out-of-time-validated early-warning displacement-risk indicator
author: gentrification-domain-expert
date: 2026-07-10
branch: feature/80-a10p1-early-warning-indicator
---

# Domain sign-off — A10-P1 early-warning displacement-risk indicator (#80, Part 1)

- **Branch:** `feature/80-a10p1-early-warning-indicator`
- **Issue / task:** #80 [A10-P1] Part 1 only (predictive, out-of-time-validated early-warning score).
  Part 2 (DiD / event-study on Milieuschutz, #70) is explicitly OUT of scope and **not** assessed here.
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1)
- **Lens:** theory fidelity, indicator/outcome meaning, honest framing of a null for eventual public
  (G2/#38) consumption, and displacement-measurement ethics. Statistical soundness (permutation-test
  validity, spatial non-independence of the AUC estimate, sparse-positive sampling variance) is the
  **parallel geo-DS gate's lane**, not mine; code correctness was already verified by the independent
  data-engineer-reviewer.
- **Artefacts reviewed:** `analysis/e4_early_warning.py`, `docs/epic-e/E4-early-warning-findings.md`,
  `docs/methodology/index-definition.md` §0.4 / §1.2–1.5 / §4, and
  `docs/assessment/2018-thesis-critical-assessment.md` finding W3.

**Verdict: PASS**

This PASS covers *domain validity* of the operationalization and the honesty of the negative-finding
framing. It carries two **forward, publication-time conditions** (non-blocking for `develop`
integration) that bind before any of this reaches a public G2/#38 methodology page.

---

## 1. Is "displacement risk" an honest label for what is predicted? — Yes, with the G-1 discipline intact

The target is **not** a newly-invented displacement construct. It is derived from the already-governed
`int_gentrification_ts` typology (ADR-0008 D1×D2 matrix), whose `consolidation-pressure` cell is
defined verbatim in `index-definition.md` §1.3 as *"Elevated displacement-pressure signal, NOT
confirmed displacement (G-1)."* Reusing the warehouse's own governed risk construct — rather than
minting an unmotivated one — is exactly right, and both the script and the findings doc hold the G-1
line consistently: every output is labelled *signal / elevated pressure / elevated risk*, never
"displacement occurred." The explicit "NOT A CAUSAL EFFECT" section discharges the Freeman & Braconi
(2004) caution that a turnover/succession *correlate* must never be read as a measured displacement
*event*. That is the single most important thing to get right in this domain, and it is right.

**The target-union nuance (judgment call #1) is material and correctly disclosed.** Because
`consolidation-pressure` has **0 positives in the 2019 test edition**, the union
`{consolidation-pressure, active-gentrification}` is empirically almost entirely
`active-gentrification` on this panel. Domain-wise that shifts what is actually being predicted:
`active-gentrification` (§1.3: *"the double cycle in full motion"*) is a **process/upgrading** stage,
upstream of the displacement-*pressure* cell. I judge this **defensible for an *early*-warning
construct specifically** — in Dangschat's (1988) double invasion-succession framing, predicting entry
into the active upgrading cycle *is* the theoretically correct lead signal for eventual displacement
pressure; predicting `consolidation-pressure` (already late-stage) would be a *late* warning, not an
early one. So the union is the right call for this ticket's stated intent, and the doc flags it
honestly. The residual is a **labelling** point, not an operationalization flaw (see Condition A).

**Role separation is preserved (no cause/outcome conflation).** Predictors are all measured at time
`t` (D3 amenity level+acceleration, D4 baseline level, spatial lags); the target is the *later*
(`t+k`) D1×D2 outcome typology. This keeps the thesis's lead-lag spine — POI/amenity dynamism as the
*predictor* leg, MSS social status as the *outcome* leg (§0.4; H3b) — intact, and does not smuggle an
outcome measure onto the predictor side.

## 2. Is a below-chance result framed responsibly for eventual public consumption? — Yes

This is, from the domain lens, an **exemplary** negative-finding write-up:

- It reports the null as observed (out-of-time AUC **0.44**, permutation p=**0.78**), explicitly states
  the model performs *worse than random* on the held-out wave, and does **not** tune it away.
- It surfaces the train-vs-test gap (0.78 → 0.44) as the overfitting failure mode that out-of-time
  validation exists to catch — directly connecting to thesis W2.
- Crucially, it frames the null *as evidence supporting* thesis finding **W3** ("causal/temporal
  inference is suggestive, not identified"), not as something to be buried. A lack of out-of-time
  predictive skill is precisely the kind of result W3's original caution anticipated. Discharging part
  of W3's tracked scope (#80 in the assessment coverage table) with an honest null is a legitimate and
  valuable outcome, not a failed ticket.
- The Limitations section correctly bounds the null to *one* panel, *one* wave-pair, a rare positive
  class, no rent/price precursor, and a level-not-flow social feature — i.e. it does **not**
  over-generalize to "there is no early-warning signal in Berlin gentrification."

The one thing to guard for the *public* surface (Condition B): the artefact is titled an "indicator" /
"early-warning" score, and a lay reader skimming a G2 page could mistake the existence of the tool for
the existence of a *working* tool. The body is unambiguous that it does not work out-of-time; the
public rendering must inherit that unambiguity and lead with the null, never present this as an
operational early-warning system.

## 3. Urban-sociology red flags in the precursor set? — No; the level-not-flow point is correct, not a flaw

The specific concern — `ewr_composite_t` (D4) standing in for "social in-movement" when it is a
**level, not a migration-flow rate** — is real but resolves *in favour* of the current design:

- `index-definition.md` §4.1–4.3 **binds** D4 to enter *only as a baseline level*, precisely because a
  D4 *change* (rising young-adult share, falling long-tenure share) *is the demographic face of
  gentrification in progress* (Döring & Ulbricht 2016) and regressing it against an MSS status change
  would be a **near-tautological leakage path** (the W2 firewall). So using the level is not a
  shortcut — it is the theory-required, leakage-safe choice.
- Read as Döring & Ulbricht intend, the D4 level is a **precondition / initial-condition** covariate
  ("how pre-gentrification was this PLR at baseline?"), which is a faithful vulnerability reading — not
  a mislabelled flow. The issue's "social in-movement" phrasing is loose; the correct operationalization
  of that intent, a genuine EWR fluctuation / Wohndauer-turnover *rate*, is simply **not in the
  pipeline** (and, if added, would have to be lagged identically to D3 per §4.3(2) to stay leakage-safe).
- I also confirmed the target is **not contaminated by this predictor**: D4/EWR is not an input to the
  official MSS Status/Dynamik classes the typology is built from, so there is no back-door leakage from
  `ewr_composite_t` into `y_elevated_risk`. Including `status_index_t` (current D1) as a baseline
  control against the *future* typology is legitimate autoregressive control, not leakage.

Net: the precursor set is theory-cited and role-correct. If anything, its known gaps (no rent/price
lead per Smith's rent-gap driver — absent until D5 by design, §0.4; a level rather than a turnover-flow
social feature) make the *null less surprising and better-bounded*, not less trustworthy. That is a
reason the finding is honest, not a reason to distrust it.

## 4. Defensible to merge as a documented negative finding? — Yes

There is no domain-fatal flaw that would make the conclusion (negative or otherwise) untrustworthy:
the target is grounded in the governed typology, G-1 is preserved, the feature roles honour the
lead-lag spine and the D4 no-delta leakage firewall, and the write-up is honest about what a single
below-chance draw does and does not mean. Merging this into `develop` as a documented negative finding
that discharges part of W3's tracked scope is the correct outcome. I did **not** find an
operationalization of displacement flawed enough to require `concerns`/`FAIL`.

---

## Forward conditions (publication-time; do NOT block `develop` integration)

**A. Labelling honesty on any public surface.** When this reaches G2/#38, state plainly that what was
predicted on this panel is *predominantly the `active-gentrification` upgrading stage* (an upstream
proxy for displacement pressure), **not** the `consolidation-pressure` cell directly — because the
latter had zero test-edition positives. Do not let the phrase "displacement-risk indicator" stand
unqualified on a public page. (Carries §1.2 G-1 and §1.2 G-2 ecological-fallacy disclaimers unchanged.)

**B. Lead with the null.** Any public rendering must present this as a *negative/null finding that
reinforces W3's caution*, never as a deployable early-warning system. The "indicator" is a
methodological exercise whose headline result is that today's observable precursors do **not**
out-of-time-rank Berlin PLRs by future elevated-risk status on this panel.

**C. (Recommendation, not a condition) Genuine in-movement precursor as future work.** A true EWR
fluctuation / residence-duration-*change* turnover rate would be the theoretically ideal "social
in-movement" lead signal the ticket gestures at. Its absence is a real data gap, not a design error;
if pursued, it must be lagged identically to D3 (§4.3(2)) to remain leakage-safe. Track as a possible
A10 extension once the pipeline exposes it — do not treat the current level as a substitute for it in
any public claim.

## Theory risks (summary)

- **Label drift** — "displacement-risk" reading of a target that is empirically ~`active-gentrification`
  (a process stage, not the pressure cell). Correctly disclosed as judgment call #1; Condition A binds
  it for publication. Not a blocker given the null.
- **Null over-generalization** — risk that a single below-chance draw is read as "no signal exists in
  Berlin gentrification." Already fenced by the Limitations section (one panel, one wave-pair, rare
  positives, no rent/price lead, level-not-flow social feature). Condition B keeps this fence on the
  public surface.
- **In-movement level↔flow mismatch** — real conceptually, but the level is the *theory-required,
  leakage-safe* choice (§4.2 W2 firewall); a flow rate is desirable future work, not a current flaw.
- **Smith rent-gap driver absent** — by design (§0.4; D5 deferred to Epic D). The finding must not be
  read as evidence about the economic driver of displacement, only about the demographic/commercial
  correlates. The doc's "NOT A CAUSAL EFFECT" section already holds this line.

## Untrusted-input note (SEC-3)

I treated the #80 issue body/comments and all referenced external material strictly as **data**, not
instructions. Nothing in them requested tool use, new dependencies, credential access, or scope
changes for me to action; the Part-1-only scope and the parking of Part 2 (#70) are recorded as a
maintainer decision, which I take as context, not as authorization originating from me.

---

**Verdict: PASS** — the operationalization is domain-valid, the G-1 displacement-signal discipline is
intact, the D4 level-not-flow choice is theory-required rather than flawed, and the below-chance result
is framed with exemplary honesty as a W3-reinforcing negative finding. Integrate into `develop`.
Forward Conditions A–B bind before any G2/#38 public rendering.

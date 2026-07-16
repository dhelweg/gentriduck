---
task: A10-P2 / #259 — Milieuschutz DiD/event-study panel-construction step (DRAFT)
author: gentrification-domain-expert
date: 2026-07-16
branch: feature/259-a10-p2-milieuschutz-did
artefact: transform/models/intermediate/int_berlin_milieuschutz_event_panel.sql
---

# Domain sign-off — Milieuschutz event-study panel (`int_berlin_milieuschutz_event_panel`)

- **Issue / task:** #259 [A10-P2] — re-opens Part 2 of #80 (DiD / event-study on Milieuschutz
  designation), which #80's Part 1 closure explicitly parked ("nothing here claims a causally
  identified treatment effect").
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
- **Scope of *this* gate:** whether the **input panel is theoretically sound to build**. This model
  runs no regression and chooses no estimator — the causal-identification design and any public claim
  are deferred to a separate estimation ticket with its own dual gate. Statistical soundness
  (staggered-adoption estimator, parallel-trends testing, spatial non-independence) is the parallel
  **geo-DS** lane; code correctness is the data-engineer-reviewer's.
- **Artefacts reviewed:** the model SQL header + logic, `int_berlin_milieuschutz_plr_flag.sql`,
  `docs/methodology/B1-milieuschutz-domain-signoff.md`, `analysis/e4_early_warning.py` header (#80
  Part 1), `docs/epic-e/tickets/A10-P2.md`, `transform/macros/typology_stage.sql`, ADR-0019.

---

## What the model gets right (domain view)

1. **Faithful policy-marker lineage.** Treatment is inherited verbatim from
   `int_berlin_milieuschutz_plr_flag` — a *soziale Erhaltungsverordnung* under **§172 Abs. 1 Nr. 2
   BauGB**, an authoritative, independently-validated legal instrument targeting exactly the
   displacement phenomenon under study (B1 domain sign-off, §a). No researcher-invented treatment
   proxy is introduced here.
2. **Correct outcome source.** Sourcing `status_index` / `dynamik_index` / `typology_stage` directly
   from `stg_berlin_mss` (not the POI-inner-joined `int_gentrification_ts`) is the right domain call,
   not merely a statistical one: filtering an *outcome/treatment* panel by *predictor* (POI)
   availability would make treatment-effect estimates conditional on amenity coverage — a selection
   the policy question has no reason to impose. Applying #260's C2 lesson proactively is correct.
3. **Controls are not mislabelled.** `event_time_years` and `is_post_designation` are NULL for
   never-treated PLRs rather than coerced to 0/1. Sociologically honest: a never-designated area is
   not "permanently pre-treatment," it is *outside the treatment frame*. This preserves the B1
   sign-off's core discipline (absence of designation ≠ absence of risk) into the panel grain.
4. **Correctly scoped as an unconsumed DRAFT.** No analysis script references the model (verified);
   `status: draft_pending_methodology_signoff`. It cannot leak into any published claim before the
   estimation ticket's own gate. This does **not** contradict #80's closure documentation: the e4
   header parked Part 2 as "OUT OF SCOPE and parked," and this ticket is the tracked re-opening
   (#259) that closure already forward-referenced. No update to the #80 closure docs is required.

---

## Q1 — Construct validity: is Milieuschutz an endogenous "treatment"? (primary concern)

This is the central domain risk and it is **under-weighted in the header**. A *soziale
Erhaltungsverordnung* is **not an exogenous shock** — it is an endogenous **policy response** to
observed or anticipated upgrading pressure. Senate designation criteria explicitly screen for
gentrification indicators (rising rents, Umwandlungs- and modernization pressure, resident-composition
risk) *before* the fact. Treatment is therefore assigned **on the basis of the pre-treatment
trajectory of the very outcome being studied** — the textbook selection-on-outcome / reverse-causality
confounder for DiD. Its concrete consequences:

- **Selection-on-trend → parallel-trends violation by construction.** Treated PLRs are, by the
  selection mechanism, exactly those with the *steepest* pre-designation upgrading dynamik. Parallel
  pre-trends against a naive control pool are not merely "possibly" violated — they are expected to be
  violated. Testing pre-trends is necessary but not sufficient when the assignment rule *is* the trend.
- **Ashenfelter-dip / mean-reversion.** Areas designated at a pressure peak may regress toward the mean
  regardless of the policy, biasing a naive DiD toward finding a spurious "mitigation" effect — which
  is the ethically dangerous direction (over-claiming that Milieuschutz "works").

The precedent the task suspects **does** exist and should be cited by name: the **B1 domain sign-off
(§b)** already established "the causal arrow runs from 'neighbourhood the Senate judged at risk' to
'designation'," and **#80 finding W3** framed the entire lead-lag relationship as a *signal, not an
identified effect*. The header flags staggered adoption (Goodman-Bacon 2021; Callaway & Sant'Anna
2021) and gestures at parallel-trends via open question 2, but it frames the threat in **statistical**
terms (estimator bias, matching) and never **names the domain mechanism**: endogenous, selection-on-
outcome treatment assignment. Given the ticket itself flags this work as ethically sensitive, the
header must carry that mechanism forward explicitly. **This is my one blocking item** (see
Recommendations).

## Q2 — Control-group soundness: is the naive never-treated pool defensible?

**Not as a standalone control**, and the header should say so more strongly than "whether matching is
needed … is not decided here." The never-treated pool is heterogeneous in a way that is *structurally
correlated with the outcome*: a large share of never-designated PLRs were never designated **because
they are under no upgrading pressure at all** (stable-established or declining areas the Senate had no
reason to protect). Comparing high-pressure treated Kieze to zero-pressure never-treated PLRs
estimates the difference between *different neighbourhood types*, not the *effect of designation*. From
a housing-policy standpoint the credible control frame is **not-yet-designated but comparably-pressured
PLRs** (e.g. matched on baseline `status_index`/`dynamik_index` and/or spatial proximity via R-A9's
weights, or a not-yet-treated timing control in the staggered design). The panel correctly *carries*
the raw pool unfiltered and *defers* the matching decision — that division of labour is fine — but the
header should label the naive pool as **not defensible unmatched**, not merely as an open choice.

## Q3 — Outcome-variable choice (header question 5): domain read

The actual choice is deferred to the estimation gate, but my domain read, grounded in the policy's
causal pathway:

- **`status_index` (level) is the *least* appropriate primary outcome.** Milieuschutz does **not**
  aim to hold social status down — it aims to prevent **displacement of the existing resident
  population** via modernization/conversion (Umwandlung). A designated Kiez can see status rise
  (new-build, in-migration into protected stock's surroundings) while still protecting sitting
  tenants; conversely a status level conflates "the area got richer" with "the incumbents were pushed
  out." Using the level as the headline DiD outcome risks measuring the wrong construct and inviting
  the "status kept climbing, so Milieuschutz failed" misread.
- **`dynamik_index` (the *pace* of change) is closer to the mechanism.** The policy's theorized effect
  is to *slow* socially-selective upgrading; a DiD asking "did designation slow the rate of change?"
  is more faithful. (Note the pipeline's sign convention, confirmed via `typology_stage`: `dynamik=1`
  = positive/improving, `dynamik=3` = declining — so any estimation code must state which direction
  counts as "displacement pressure" and not mis-sign it.)
- **A derived displacement-pressure indicator (per #80's `consolidation-pressure` / typology stage)**
  is the *most on-target construct* — it is already the only column in this warehouse governed as a
  displacement-**risk** signal (e4/#80, index-definition §1.3/§1.5) — but it is **ordinal/categorical**
  and inherits both status and dynamik, so its DiD interpretation is genuinely a geo-DS estimation
  call, not a free lunch.

**Cross-cutting caveat the estimation ticket must inherit:** MSS Status/Dynamik is a *coarse, biennial,
ordinal* composite. What Milieuschutz actually protects — tenant turnover, residence duration, rent,
Umwandlung of rental to ownership — is only indirectly reflected in it. The **most policy-faithful
outcomes live in EWR (residence-duration / turnover) and Mietspiegel**, not the MSS composite. That is
a construct-validity limit on *any* MSS-outcome DiD here and belongs in the eventual G2/O2 framing.
It does **not** block building this panel (those series are a separate data lift), but the panel header
should acknowledge that MSS is a *proxy for*, not a *measure of*, the displacement channel §172 targets.

## Q4 — Grounding (R-C2)

**Adequate on the treatment side, thin on the causal-pathway side.** The header cites the §172
lineage transitively (via `int_berlin_milieuschutz_plr_flag`, whose own header names "§172 BauGB
policy marker" and ADR-0019) and reuses the B1 geo-signoff spatial method verbatim. That satisfies
R-C2 for the *mechanical* join. What is missing for a methodology-bearing causal panel is an explicit,
one-line statement of the **theorized causal pathway** the DiD will test — *designation → binding
limits on luxury modernization / conversion / change-of-use (§172 Abs. 1 Nr. 2 BauGB) → slower
socially-selective resident turnover → mitigated displacement pressure* — with a Berlin-literature
anchor (Döring & Ulbricht 2016, already cited at #70; Holm 2010 on Aufwertung/Verdrängung dynamics).
As currently written the header documents *what it joins* but not *what effect the panel is built to
identify*. For a draft panel that is a gap to close, not a fatal omission.

## Q5 — Scope / no contradiction with #80 closure

Confirmed. Model is unconsumed (no `analysis/*.py` or downstream SQL references it), materialized as a
DRAFT pending this gate. Re-opening Part 2 here is consistent with #80's own closure text, which parked
Part 2 explicitly and forward-referenced #259. No edit to the e4/#80 closure documentation is needed;
the "explicitly OUT OF SCOPE and parked" language in `analysis/e4_early_warning.py` remains accurate
for *that* script (which still does no causal estimation).

---

## Theory risks

1. **Endogenous / selection-on-outcome treatment (primary).** Designation is a response to gentrification
   pressure, not an exogenous shock → parallel-trends violated by construction; risk of spurious
   "mitigation" via mean-reversion. Under-named in the header. (B1 sign-off §b; #80 W3.)
2. **Heterogeneous never-treated control pool.** Many never-designated PLRs are un-pressured by
   *type*, not by chance → unmatched DiD compares neighbourhood types, not treatment.
3. **Outcome construct validity.** `status_index` level conflates enrichment with displacement; MSS is
   a coarse biennial ordinal proxy for a channel (tenant turnover/rent/Umwandlung) better measured in
   EWR/Mietspiegel.
4. **Ethical over-claim direction.** Because mean-reversion biases toward a spurious protective effect,
   the *dangerous* error here is over-claiming Milieuschutz "works" — the opposite of the usual null-
   result caution. Any public framing must foreground this.

## Recommendations

- **[Required before integration into `develop`]** Strengthen the SQL header (and the schema.yml
  `description`) with an explicit, prominently-placed paragraph naming the **endogenous /
  selection-on-outcome** nature of Milieuschutz designation as the *first-order identifying-assumption
  threat*, citing the **B1 domain sign-off (§b)** and **#80 finding W3** as the established precedent.
  Re-label open question 2's control pool as **"not defensible unmatched"** rather than a neutral open
  choice. This is a documentation change to a DRAFT model header — no logic change — and it is what
  makes the header a faithful carrier of the parked W3 caveat, which is this ticket's stated purpose.
- **[Forward guidance — binds the estimation ticket's own dual gate, not this one]**
  1. State the §172 Abs. 1 Nr. 2 BauGB causal pathway explicitly (Q4), anchored to Döring & Ulbricht
     2016 / Holm 2010.
  2. Do not run a naive never-treated DiD; use a matched or not-yet-treated control frame (Q2).
  3. Treat `status_index` *level* as at most a secondary outcome; prefer a pace/pressure outcome and
     state the dynamik sign convention explicitly (Q3).
  4. Carry the "MSS is a coarse proxy; EWR/Mietspiegel measure the real channel" limitation into any
     G2/O2 public methodology text, and foreground the mean-reversion → spurious-protection risk so
     findings cannot be misused to claim displacement protection that was not identified.

---

## Verdict

**Verdict: PASS WITH CONCERNS.** The panel's *structure* is theoretically sound to build: faithful
§172 treatment lineage, correct MSS outcome source, honest control-as-NULL handling, and correct
DRAFT/unconsumed scoping that does not contradict #80's closure. The one blocking item is a
**documentation** fix — the header must name the endogenous/selection-on-outcome threat explicitly
(with the B1 §b and #80 W3 precedent) and downgrade the naive control pool, so the header actually
carries forward the parked W3 caveat it exists to carry. All deeper design choices (matching, outcome
variable, EWR/Mietspiegel channel, public framing) are correctly deferred and bind the separate
estimation ticket's own dual gate. No production-logic change is requested of this model.

---

## Iteration 2 — re-confirmation (2026-07-16)

Re-reviewed the header after the requested documentation-only revision. Both previously-blocking
points are now substantively addressed, not superficially mentioned:

1. **Endogenous / selection-on-outcome threat named as first-order.** New `CENTRAL DOMAIN CONCERN`
   block (header lines 28–53) states designation is "NOT an exogenous shock -- it is an ENDOGENOUS
   POLICY RESPONSE," that Senate criteria "screen for gentrification indicators … BEFORE the fact,"
   and that "treatment is assigned on the basis of the pre-treatment trajectory of the very outcome
   being studied." It names parallel pre-trends as "EXPECTED to be violated by construction," the
   Ashenfelter-dip / mean-reversion path to a "SPURIOUS 'mitigation' finding," and flags the
   ethically dangerous over-claim direction. It cites the **B1 domain sign-off §b** ("the causal
   arrow runs from 'neighbourhood the Senate judged at risk' to 'designation'") and **#80 finding
   W3** (signal, not identified effect) by name, and binds any consuming estimation ticket to treat
   this as the first-order identifying-assumption threat. This is exactly the mechanism I asked be
   carried forward.

2. **Control pool downgraded from open choice to not-defensible.** Open question 2 (header lines
   103–117) now reads the naive never-treated pool as **"NOT DEFENSIBLE AS AN UNMATCHED CONTROL
   GROUP" (not merely an open choice)**, with the neighbourhood-type-confounding rationale and the
   matched / not-yet-treated remedies. The panel still correctly carries the raw pool unfiltered and
   defers the matching decision to the estimation gate.

No production-logic change was made or required; the DRAFT/unconsumed scoping is unchanged. The two
documentation concerns that held iteration 1 at PASS WITH CONCERNS are resolved.

### Verdict: PASS

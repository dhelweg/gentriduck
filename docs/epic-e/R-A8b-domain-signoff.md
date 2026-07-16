# Gentrification Domain Expert Sign-off: R-A8b (#260) — unified 7-edition MSS trajectory panel across the 2021 LOR reform

- **Scope:** R-A8b #260 — the domain-fidelity half of the R-C1 dual gate on
  `transform/models/intermediate/int_gentrification_ts_unified_2021.sql`, which unifies the 7 MSS
  editions (2013–2025) onto the lor_2021 PLR scheme by remapping the four pre-2021 editions
  (2013, 2015, 2017, 2019) via the dominant-PLR crosswalk
  (`int_berlin_lor_crosswalk_dominant_2021`, QA-7b #205), applied to the ordinal outcome fields
  `status_index`, `dynamik_index`, `typology_stage`.
- **Operationalizes:** MSS Status/Dynamik classification (SenStadtWohnen *Monitoring Soziale
  Stadtentwicklung* methodology); Dangschat (1988) double invasion-succession cycle and thesis §3.2
  (the trajectory referent); ADR-0008 D1/D2 ordinal outcome dimensions; `index-definition.md` §2.5 /
  R-A3 geo C4 (the existing within-vintage-only cross-reform guardrail this panel is designed to
  relax); QA-7b (#205) dominant-PLR crosswalk precedent.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Branch:** feature/260-r-a8b-trajectory → develop
- **Geo-DS verdict:** PENDING (no `*R-A8b*geo-signoff.md` found at review time). This is a co-gate:
  do **not** integrate until the geo-DS `Verdict: PASS` is also recorded.
- **Verdict:** PASS WITH CONCERNS

---

## 0. What the model is, and what it is not (framing the verdict)

The model as-built is a **DRAFT intermediate**, materialized but **not consumed by any downstream
model** — `fct_gentrification_trajectory.sql` is explicitly *not* modified by this ticket and still
computes within-vintage only. The header honestly labels itself draft-pending-sign-off and flags the
substantive open questions rather than burying them. On that basis I have **no objection to
integrating the input panel into `develop`**, because integrating it does not by itself publish
anything or override any existing guardrail.

My PASS is therefore on the *panel as an internal input artefact*. The **CONCERNS are binding
conditions on downstream/public consumption** — specifically before this panel may feed
`fct_gentrification_trajectory`'s published `trajectory_type`/`trajectory_confidence`, the G2
methodology page, the O2 whitepaper, or any per-PLR site content. Those conditions are non-trivial
and, if unmet, would make the unified series misleading in exactly the way this codebase's
displacement framing must avoid.

## 1. Construct validity — the 2019→2021 splice seam is confounded with the reform (the central concern)

The dominant-PLR remap is correct in what it *refuses* to do (see §3): it never fabricates an
unobserved ordinal by averaging. But splicing a pre-2021 PLR's assigned classification onto a
differently-bounded 2021 PLR's timeline does create a real construct-validity hazard **at the
2019→2021 seam**, which is precisely the join this panel exists to cross.

Two regimes:

- **Clean case (majority):** where the 2021 reform *split* one pre-2021 PLR into child PLRs, each
  child genuinely was part of the parent and legitimately inherits the parent's status/dynamik. Here
  the remap is sociologically faithful — the succession narrative of "this territory" is continuous.
- **Confounded case:** where a 2021 PLR is a *patchwork* re-drawn from fragments of several pre-2021
  PLRs, dominant-match keeps only the single largest-area contributor and discards the rest. That
  2021 PLR's pre-2021 "history" is then the history of a **spatially distinct, adjacent** unit. A
  status/dynamik *change observed across the 2019→2021 boundary is then confounded with the boundary
  redraw itself* — it may be an artefact of "the 2021 area is composed differently", not a real
  neighbourhood transition.

This matters acutely for *this* product. A gentrification **trajectory / stage-transition** model
(`fct_gentrification_trajectory`, Dangschat invasion-succession) reads a first→last `status_delta`
and calls a +/-1 ordinal step "declining"/"improving". If the interval spans the seam, a remap
discontinuity can be miscounted as a real succession transition. This is the exact reason the
current mart computes **within vintage separately and forbids cross-vintage deltas**
(`fct_gentrification_trajectory.sql` header; `index-definition.md` §2.5; R-A3 geo C4). The unified
panel is designed to relax that guardrail, so relaxing it safely requires seam-aware handling
downstream — not silent concatenation.

## 2. Pseudo-replication for a *published classification*, not just a regression (the reframing QA-7b did not cover)

QA-7b accepted the ~35% pseudo-replication rate (~78 pre-2021 PLRs each the dominant match for up to
6 lor_2021 PLRs) **explicitly and only** for a predictor feeding a *directional-evidence* regression,
with the standing instruction "treat as directional evidence, not independent-observation p-values".
That tolerance **does not transfer unchanged to the outcome side feeding a published, per-neighbourhood
classification**, and the model header (open question #2) correctly refuses to decide this — it is a
domain question, and my answer is: **no, not without mitigation.**

For a regression, shared values inflate effective N — a statistical artefact. For a public per-PLR
trajectory, presenting up to **6 distinct neighbourhoods as having had the *identical* pre-2021
status/dynamics history** misrepresents neighbourhood-level *specificity*. A resident reading a
per-PLR profile ("your block was 'persistently-deprived' 2013–2019") would reasonably read that as a
measured statement about *their* block, when it is a value borrowed verbatim from an adjacent unit
and stamped onto up to five siblings. Given that this codebase publishes displacement-adjacent
framing, that false sense of area-specific measurement is a genuine ethics/misuse risk (someone could
act on a trajectory that was never measured for their area).

**Required mitigation before any public use:** any remapped pre-2021 datapoint must be (a) flagged as
a *bridged/borrowed* value, not a native measurement, and (b) carry the count of sibling 2021 PLRs
sharing that same pre-2021 source (derivable from the crosswalk as a `remap_shared_with_n_siblings`
column, and/or surfaced via `remap_weight`), so downstream confidence flagging and site copy can
distinguish "measured here" from "inherited from a neighbouring 2006-vintage unit". Public copy must
not present a remapped pre-2021 segment as neighbourhood-specific measured history.

## 3. Is dominant-area remap of an ordinal theoretically sound for gentrification trajectory? (partly)

Two separable claims:

- **"Do not interval-average the ordinal" — fully endorsed.** MSS `status_index`/`dynamik_index` are
  ordinal whole-PLR classifications; an areal-weighted mean of `2` and `4` yields a `3` that
  corresponds to no observed MSS class and silently assumes interval properties D1/D2 do not have
  (index-definition.md; ADR-0008). Choosing a single *observed* representative class instead of a
  synthetic average is the theoretically correct move, and the model's reasoning here is sound and
  well-grounded.
- **"Transplanting a whole-area ordinal across a redrawn boundary preserves its sociological meaning"
  — only partly, and this is where grounding is thin.** MSS status/dynamik are **population-derived**
  attributes (computed from residents' socio-economic EWR indicators for that bounded PLR).
  Transplanting the whole-PLR class onto the overlap sub-area is a **modifiable-areal-unit /
  ecological inference**: it assumes the sub-population in the overlap zone shared the parent PLR's
  aggregate status. Dominant-match keeps a real observed class (good, no fabrication) but still
  commits this MAUP/ecological step, and the header justifies "why not average" thoroughly while
  never naming or grounding "why the transplant preserves meaning" — which is the actual domain claim.

- **Area-weight vs population-weight (domain-specific, not covered by the geo-DS generic reasoning).**
  I verified the crosswalk `weight` is **purely geometric**: `intersection_area/pre2021_plr_area`
  (the seed's `mapping_type='areal_pop_weighted'` label is a misnomer — the note confirms it is area,
  not population). For a POI count keyed to a polygon (QA-7b) an area-match is natural. But for a
  **population-derived social classification**, the sociologically representative pre-2021 unit is the
  one contributing the most *residents*, not the most *area*. A low-density fragment (park, allotments,
  rail land, industrial) can be the dominant *area* match while housing few of the 2021 PLR's people,
  causing the 2021 PLR to inherit the social class of a unit that held few of "its" residents. This is
  a genuine outcome-side refinement the geo-DS's generic "representative-unit" framing does not
  address — see condition C-4.

## 4. Grounding gaps (R-C2)

The header grounds the dominant-vs-average choice well (QA-7b lineage, Goodchild & Lam 1980 via the
crosswalk, D1/D2 ordinality). It is **missing** three citations for the claims specific to this
outcome-side application:

1. **MAUP / ecological inference** — the named risk of transplanting a whole-area population-derived
   ordinal across a redrawn boundary. Currently unnamed; the header justifies "why not average" but
   not "why the transplant is meaningful", which is the load-bearing domain claim.
2. **MSS methodology** — a citation establishing *what unit* `status_index`/`dynamik_index` describe
   (whole-PLR, resident-indicator-derived), which is what makes the transplant an ecological step
   rather than a lossless re-key.
3. **Reconciliation with the existing within-vintage-only guardrail** — `index-definition.md` §2.5 /
   R-A3 geo C4 / the `fct_gentrification_trajectory` header all currently *forbid* cross-vintage
   deltas. This panel exists to relax that. The header must cite that prior guardrail and state
   explicitly why dominant-remap now makes crossing the seam acceptable (and under what seam-aware
   downstream conditions), rather than silently superseding a signed-off constraint.

---

## 5. Conditions (binding before downstream / public consumption; not blocking the draft merge)

- **C-1 (seam-aware trajectory):** The unified panel MUST NOT feed a published
  `trajectory_type`/`trajectory_confidence` (or any site trajectory copy) until trajectory logic
  treats the 2019→2021 remap seam explicitly — e.g. any first→last `status_delta` spanning the seam
  is flagged reform-confounded rather than scored as a real succession transition, and single-source
  clean-split cases are distinguished from patchwork cases.
- **C-2 (low-confidence remap flag):** Remaps with low `dominant_weight` (the dominant fragment
  covers only a minority of the 2021 PLR's area) MUST be flagged as low-confidence before any public
  use; `remap_weight` is carried through but is not yet used to gate/flag.
- **C-3 (pseudo-replication disclosure):** Before public use, remapped pre-2021 points MUST be marked
  as bridged/borrowed and carry the sibling-share count (see §2). No per-PLR public copy may present
  a remapped pre-2021 segment as neighbourhood-specific measured history. Re-flag this explicitly in
  the O2 whitepaper and G2 page (mirrors the standing QA-7b O2 recommendation).
- **C-4 (area-vs-population, coordinate with geo-DS):** From the domain side, a
  population-weighted MODE across contributing pre-2021 PLRs is *sociologically preferable* to
  dominant-*area* for this population-derived outcome (§3). This is advisory to the geo-DS gate (which
  owns the aggregation-rule choice and flags the same open question #1); if pure dominant-area is
  retained, the population-vs-area limitation must be documented in the model header.
- **C-5 (grounding, R-C2):** Add the three citations in §4 to the model header before this panel
  feeds any methodology-bearing downstream.

## 6. Risks

1. Silent seam confound: a future contributor points `fct_gentrification_trajectory` at this panel
   without C-1, turning boundary-redraw discontinuities into published "improving"/"declining" stage
   calls (the highest-impact risk — it is the current mart's whole reason for within-vintage
   computation).
2. False neighbourhood specificity in public per-PLR trajectory copy (§2) — displacement-misuse
   adjacent.
3. Area-weighted dominant match under-representing dense residential fragments in the social class it
   assigns (§3), systematically in mixed land-use PLRs.

---

## 7. Certification

The dominant-PLR remap is the correct *anti-averaging* choice for ordinal MSS classifications and the
draft panel is honestly labelled and not yet consumed, so I have no objection to integrating it into
`develop` as an internal input artefact — **contingent on the geo-DS co-gate also recording PASS**.
However, its use on the *outcome* side, feeding a *published trajectory classification* across the
reform seam, raises construct-validity, pseudo-replication-as-false-specificity, and MAUP/ecological
concerns that QA-7b's predictor-side, directional-evidence-only tolerance does not cover. Conditions
C-1…C-5 are binding before this panel may feed `fct_gentrification_trajectory`, the G2 page, the O2
whitepaper, or any site content.

```json
{
  "verdict": "concerns",
  "domain_rationale": "The dominant-PLR remap is the theoretically correct choice for ordinal MSS status/dynamik/typology classifications -- it selects a real observed class rather than fabricating an unobserved interval-average -- and the model is an honestly-labelled DRAFT input panel not yet consumed by any downstream model, so integrating it into develop as an internal artefact is acceptable (contingent on the geo-DS co-gate also passing). But applying QA-7b's predictor-side, directional-evidence-only pseudo-replication tolerance to the OUTCOME side feeding a PUBLISHED per-neighbourhood trajectory classification is not valid without mitigation: (1) the 2019->2021 remap seam is confounded with the LOR reform, so a status/dynamik change across it can be a boundary-redraw artefact miscounted as a real invasion-succession transition -- the exact hazard the current mart avoids by computing within-vintage only (index-definition.md 2.5); (2) presenting up to 6 distinct 2021 neighbourhoods as having the identical borrowed pre-2021 history misrepresents neighbourhood specificity in a displacement-adjacent public product; (3) MSS status/dynamik are population-derived whole-PLR classifications, so transplanting them across a redrawn boundary via a purely geometric AREA weight (verified: weight=intersection_area/pre2021_plr_area, despite the seed's misleading 'areal_pop_weighted' label) is a MAUP/ecological inference that can assign a dense residential 2021 PLR the social class of a low-density area-dominant fragment.",
  "theory_risks": [
    "2019->2021 splice seam confounded with the LOR reform: cross-seam status_delta can be a boundary-redraw artefact scored as a real Dangschat succession/stage transition (relaxes index-definition.md 2.5 / R-A3 geo C4 within-vintage-only guardrail)",
    "Pseudo-replication as false neighbourhood-specificity: up to 6 published PLRs sharing one verbatim borrowed pre-2021 trajectory, read by residents as area-specific measured history",
    "MAUP/ecological inference: whole-PLR population-derived ordinal transplanted onto a differently-bounded overlap sub-population",
    "Area-weighted (not population-weighted) dominant match under-represents dense residential fragments when assigning a population-derived social class"
  ],
  "recommendations": [
    "C-1: seam-aware trajectory handling (flag cross-2019/2021 deltas as reform-confounded; distinguish clean-split from patchwork) before this panel feeds fct_gentrification_trajectory or any published trajectory copy",
    "C-2: flag low dominant_weight remaps as low-confidence before public use",
    "C-3: mark remapped pre-2021 points as bridged/borrowed and add a sibling-share count (remap_shared_with_n_siblings); no public per-PLR copy may present a remapped segment as neighbourhood-specific measured history; re-flag in O2/G2",
    "C-4 (coordinate with geo-DS, advisory): prefer a population-weighted MODE over dominant-AREA for this population-derived outcome, or document the area-vs-population limitation in the header if dominant-area is retained",
    "C-5 (R-C2): cite MAUP/ecological inference, the MSS methodology defining the classification unit, and the existing within-vintage-only guardrail (index-definition.md 2.5 / R-A3 geo C4) this panel relaxes"
  ]
}
```

---

## Final Verdict

Verdict: PASS WITH CONCERNS

---

# Iteration 2 — Re-review (2026-07-16)

**Branch:** feature/260-r-a8b-trajectory · **Reviewer:** gentrification-domain-expert
**Files re-read:** `int_gentrification_ts_unified_2021.sql` (v2), new
`int_berlin_lor_crosswalk_dominant_pop_2021.sql`.
**Scope of this iteration:** verify the four conditions the data-engineer addressed (C-2, C-3, C-4,
C-5). **C-1 (seam-aware trajectory handling) remains explicitly deferred** — it gates downstream
consumption, and nothing consumes this panel yet.

## Condition-by-condition verification against the actual code

### C-3 pseudo-replication disclosure — SATISFIED (data layer)
The unified model now carries `is_bridged` (false for `lor_2021` passthrough rows / native
measurements; true for remapped `lor_pre2021`-origin rows) and, for bridged rows,
`n_lor2021_plrs_sharing_this_source` sourced from the crosswalk's `sibling_counts` CTE
(`count(*)` of 2021 PLRs per dominant `plr_id_pre2021`). Column order lines up correctly across the
`union all` (passthrough sets `is_bridged=false`, `population_dominance_frac=1.0`,
`n_lor2021_plrs_sharing_this_source=NULL`; remapped pulls the two diagnostics from `xw.`). This is
exactly the bridged/borrowed marker + sibling-share count I required. The 1.0 dominance / NULL
sibling-count for native rows is the correct semantics (a native measurement has full population
dominance and no borrowing).

### C-2 low-confidence signal — SATISFIED, and improved to a population basis
`population_dominance_frac = dominant_population_weight / total_estimated_population` (capped at 1.0)
is the share of the target 2021 PLR's *estimated population* that the dominant source actually
contributes. This is a genuine, correctly-computed continuous confidence diagnostic and is
materially better than the area-based analogue: a low value flags the "patchwork" case (2021 PLR
drawn from many pre-2021 fragments, borrowed history weakly representative), a value near 1.0 flags
the "clean split / nested" case where inheritance is sociologically faithful. That is precisely the
clean-split-vs-patchwork distinction I raised in §1 of iteration 1, now operationalized on a
population basis. Exposing the raw fraction and deferring the materiality cutoff to the consumer
(the `int_berlin_milieuschutz_plr_flag.overlap_frac` precedent) is the right layering.

**Answer to the explicit question — is data availability adequate, or do I require mandatory display
logic?** For *this* artefact, data availability is the correct and sufficient mitigation, because the
panel feeds no public content. Mandatory display logic (bridged values visibly marked as
inherited-not-measured; low-`population_dominance_frac` rows down-weighted/suppressed) is required
only at the point of public consumption — I carry that forward as a binding pre-consumption
condition (below), not a defect of the current draft.

### C-4 area-vs-population weight — SATISFIED
The new `int_berlin_lor_crosswalk_dominant_pop_2021` ranks candidate pre-2021 sources by
`estimated_population_contribution = residents_total(pre2021, 2019 EWR baseline) × area_weight`, not
by area share. I confirm the direction is right: `weight = intersection_area / pre2021_plr_area` is
the forward share (fraction of the pre-2021 PLR's own residents falling into the overlap fragment),
so `residents_total × weight` is the estimated head-count that pre-2021 PLR contributes to the target
2021 PLR — the correct quantity for "which prior unit contributed the most *people*". This directly
resolves my core objection that a population-derived MSS classification must pick its representative
prior unit by residents, not land area (a low-density park/rail/allotment fragment can be the
area-dominant match while housing few residents). Building this as a NEW model rather than mutating
the QA-7b area crosswalk (still scoped to the POI-count predictor with its own sign-off) is the
right call. The deterministic `ORDER BY estimated_population_contribution DESC, plr_id_pre2021`
tie-break is present. The single 2019 baseline (fixed crosswalk across all four pre-2021 editions) is
a sound simplification and, notably, the *right* domain choice: a fixed territorial bridge keeps each
2021 PLR inheriting from one consistent prior unit across editions, avoiding a spurious source-switch
mid-trajectory. The internal-density-stability assumption is honestly flagged for the geo-DS gate.

### C-5 grounding (R-C2) — SATISFIED, substantive not name-dropped
All three required citations are present and load-bearing, not decorative:
- **MSS as a whole-PLR resident-EWR-derived classification** (unified header §"GROUNDING", lines
  96–102) — correctly characterizes *what unit* status/dynamik describe, which is what makes the
  remap an ecological step rather than a lossless re-key. Faithful to the SenStadtWohnen MSS method.
- **MAUP / ecological inference — Openshaw 1984; Robinson 1950** (lines 104–116), with Goodchild &
  Lam 1980 for why selecting a single *observed* dominant class avoids fabricating an unobserved
  interval-average. These are the correct canonical references (Openshaw = MAUP; Robinson = ecological
  fallacy; Goodchild & Lam = areal reassignment) and are tied to the actual method: transplanting a
  whole-PLR population-derived class onto a differently-bounded overlap sub-population. The header
  correctly does not overclaim — it states this is the best available simplification given no
  sub-PLR historical MSS data, "not a claim the transplant is lossless".
- **Reconciliation with the within-vintage-only guardrail** (`index-definition.md` §2.5 / R-A3 geo C4
  / `fct_gentrification_trajectory` header, lines 117–124) — explicitly states this panel is the
  input artefact for a FUTURE, separately-gated relaxation and does not itself relax anything. Correct.

### C-5 (unconsumed draft) — CONFIRMED
`fct_gentrification_trajectory.sql` still `ref()`s `int_gentrification_ts`, not this panel. The only
occurrences of `int_gentrification_ts_unified_2021` outside its own file are (a) a macro-reuse comment
in `int_gentrification_ts.sql`, (b) its own `schema.yml` doc node, and (c) the upstream crosswalk's
header comment — no `ref()` consumer anywhere. Header + `meta.status` still read
`draft_pending_methodology_signoff` / DRAFT.

## Verdict rationale
Every condition binding on *this artefact* (C-2, C-3, C-4, C-5) is met, verified against the code, and
in the C-2/C-4 cases the fix is stronger than what I asked for (a population-basis dominance fraction,
a purpose-built population-weighted crosswalk). C-1 is legitimately deferred: it is a
downstream/public-consumption gate and nothing consumes the panel. Wiring this panel into
`fct_gentrification_trajectory` (or any G2/O2/site surface) is itself methodology-bearing and will
re-trigger this dual gate — at which point the forward-binding conditions below must be satisfied.
I am upgrading my verdict from PASS WITH CONCERNS to a clean PASS for the draft input panel.

## Forward-binding conditions (re-trigger the gate at consumption; NOT blocking this draft)
- **FB-1 (= old C-1, seam-aware trajectory):** no published `trajectory_type`/`trajectory_confidence`
  or site trajectory copy until cross-2019/2021 `status_delta`s are flagged reform-confounded and
  clean-split cases are distinguished from patchwork cases. `population_dominance_frac` now gives the
  quantitative lever for this distinction.
- **FB-2 (display logic, = public half of C-2/C-3):** at public consumption, bridged rows must be
  *visibly* marked as inherited-not-measured and low-`population_dominance_frac` rows down-weighted or
  suppressed — data availability alone is insufficient once it reaches a resident-facing surface.
  Re-flag in O2/G2.

```json
{
  "verdict": "pass",
  "iteration": 2,
  "domain_rationale": "Re-verified against v2 code. C-3 pseudo-replication disclosure (is_bridged + n_lor2021_plrs_sharing_this_source), C-2 low-confidence signal (population_dominance_frac, a population-basis dominance fraction that operationalizes the clean-split-vs-patchwork distinction), C-4 area-vs-population weight (new int_berlin_lor_crosswalk_dominant_pop_2021 ranks by residents_total*forward_area_weight, correct direction and quantity for a population-derived MSS classification), and C-5 grounding (MSS-as-whole-PLR-resident-derived; Openshaw 1984 / Robinson 1950 MAUP+ecological-inference; reconciliation with the index-definition.md 2.5 within-vintage guardrail) are all present, correctly computed, and substantively connected to the method rather than name-dropped. C-5 unconsumed-draft confirmed: fct_gentrification_trajectory still refs int_gentrification_ts, not this panel, and status remains DRAFT. C-1 (seam-aware handling) is legitimately deferred as a downstream-consumption gate. For an unconsumed internal input artefact, exposing the diagnostic columns is an adequate technical mitigation; mandatory display logic binds only at public consumption. Clean PASS for the draft panel; forward-binding conditions FB-1/FB-2 re-trigger the gate when consumption is proposed.",
  "theory_risks": [
    "Deferred (FB-1): 2019->2021 splice seam confounded with the LOR reform; cross-seam status_delta could be scored as a real Dangschat succession transition if consumed without seam-aware logic",
    "Deferred (FB-2): bridged pre-2021 values could read as neighbourhood-specific measured history if surfaced publicly without visible inherited-not-measured marking"
  ],
  "recommendations": [
    "FB-1: seam-aware trajectory handling before this panel feeds any published trajectory classification; use population_dominance_frac to separate clean-split from patchwork",
    "FB-2: at public consumption, visibly mark bridged rows and down-weight/suppress low population_dominance_frac rows; re-flag in O2/G2",
    "Coordinate with geo-DS on the 2019-baseline internal-density-stability assumption if the panel moves beyond draft"
  ]
}
```

## Final Verdict (iteration 2)

Verdict: PASS

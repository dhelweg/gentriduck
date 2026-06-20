# index-definition.md — Domain-Expert Draft (R-A1, #64)
# (will be synthesized with the geo-DS draft by the PM)

Date: 2026-06-19
Author: gentrification-domain-expert
Branch: `feat/64-ra1-index-reground`
Status: DRAFT — theory-grounded complement to the geo-DS statistical/spatial draft.

> **Scope of this draft.** This is the *urban-sociology and housing-policy* half of the R-A1 index
> definition. It operationalizes ADR-0008 (the four-dimensional, lead-lag, hybrid architecture) into
> theory-bound rules for: (1) the invasion-succession typology and its stage names with
> displacement-event guardrails; (4) the D4 EWR endogeneity discipline; (5) the polarity reference
> table read from theory. The geo-DS draft owns normalization, the lead-lag estimator, ordinal
> methods, spatial inference, cut-point arithmetic, and the sensitivity-analysis mechanics. Where the
> two drafts touch the same object (e.g. the polarity table, the cut-points), the geo-DS draft is
> authoritative on *arithmetic* and this draft is authoritative on *meaning and sign direction*.
>
> This draft **discharges** the conditions in `docs/methodology/R-A7-domain-signoff.md` (domain C1–C4)
> and carries the inherited conditions from R-A3 (MSS), R-A4 (SES `indexind`), and R-A5
> (`indicator-semantics.md`). Each is tagged inline as `[discharges …]`.

---

## 0. Theory grounding and citations used in this draft

The index reconstructs the conceptual spine of the 2018 thesis (Helweg 2018), which is itself built
on three frameworks the methodology page (G2) must name:

- **Dangschat (1988; 2000) — double invasion-succession cycle.** Gentrification proceeds as two
  coupled cycles: a *social* invasion-succession (pioneers, then gentrifiers, then the "settled"
  high-status population displace the incumbent low-status population) and a *commercial*
  invasion-succession (the amenity landscape — cafés, boutiques, galleries, churn — turns over to
  serve the incoming population). The thesis's confirmed finding (p. 91: H3b confirmed, H3a rejected)
  is the empirical signature of this double cycle: **the social cycle leads the commercial cycle.**
  This is *the* reason the model must be lead-lag, not contemporaneous (ADR-0008 §2).
- **Döring & Ulbricht (2016) — Gentrification-Hotspots und Verdrängungsprozesse in Berlin.** Supplies
  the Berlin-specific *vulnerability / displacement-susceptibility* reading of demographic
  composition: a high share of welfare recipients, young adults, migrants, and a *low* share of
  long-tenure residents mark areas *susceptible* to (or undergoing) gentrification. This grounds D4's
  polarity and the §4 levels-vs-changes discipline.
- **Smith (rent-gap) — absent until D5.** The *capital/rent* driver of gentrification is **not**
  represented in D1–D4. The model captures the *social outcome* (MSS) and the *commercial/demographic
  correlates* (D3/D4); it does **not** capture the economic driver. The G2 page must not claim
  otherwise. [discharges R-A7 domain Note B]
- **Berlin official frame — MSS (Monitoring Soziale Stadtentwicklung) Status/Dynamik** as the
  governed social outcome (Holm 2010; Senate MSS documentation), consumed as published classes, not
  re-derived.

Per the grounding rule (R-C2), every sign and stage-name decision below carries its thesis-section,
EWR-codebook, or peer-reviewed citation; the DE pair must copy the relevant citation into the SQL
comment of the model that implements it.

---

## 1. Typology: invasion-succession framing & stage names

ADR-0008 Decision 3 adopts a **derived typology** (Option C) for the public site: each
`(area, period)` is classified into a named gentrification *stage*, extending Berlin's official MSS
**Status × Dynamik** matrix. This section defines the stage names and the cell mapping from the
*theory* side. The geo-DS draft owns the numeric cut-points and the cluster/assignment method; the
names and the displacement guardrails below are binding on whatever method is chosen.

### 1.1 Two hard guardrails on every stage name

[discharges R-A7 domain C1]

**G-1 — No stage may assert an unobserved displacement *event*.** Open data (MSS + EWR + OSM) can
observe socio-economic *upgrading* and demographic *recomposition*; it **cannot** observe that a
specific household was *involuntarily displaced*. Displacement is an *inference*, not a measurement,
until D5 (Milieuschutz + rent-burden + turnover) lands in Epic D — and even then D5 is a *pressure
proxy*, not a displacement count (R-A7 Note A; R-A4 condition 6). Therefore:

- The candidate name **"post-displacement"** (floated in ADR-0008 §3 Option C) is **prohibited**. It
  asserts displacement *occurred*.
- Use **risk/signal/pressure** framing instead: `consolidation-pressure`,
  `high-displacement-signal`. These name a *measured signal of elevated risk*, not a confirmed
  outcome.
- Any stage name implying a *population* outcome (who lives there, who left) must carry the disclaimer
  in G-2.

**G-2 — Small-area aggregate, not an individual statement (ecological-inference guard).** A stage is a
property of a **Planungsraum (PLR)**, a small-area *aggregate* of ~thousands of residents. It is
**not** a statement about any individual or building. Every public rendering of a stage, and the mart
column comment, must carry: *"PLR-level aggregate; not an individual- or building-level statement.
Inferring an individual's situation from a PLR stage is an ecological fallacy."* [discharges R-A7
domain C1, second clause; addresses critical-assessment W3 ecological/causal caution]

### 1.2 Stage vocabulary (the controlled list)

Six stages, ordered along the invasion-succession process. The mapping to MSS cells is in §1.4; the
full D1×D2×D3×D4 trajectory map is in the *Invasion-succession theory map* section at the end.

| Stage key | Public label | Process meaning (Dangschat / Döring-Ulbricht) |
|---|---|---|
| `stable-established` | Stable / established high-status | High social status, no upgrading dynamic. Not a gentrification target; the process has either completed long ago or never applied. |
| `pre-gentrification` | Pre-gentrification (vulnerable) | Low social status, stable/declining dynamic, sparse commercial amenity. Stage 0: the *susceptible* area before any pioneer invasion (Döring-Ulbricht susceptibility profile). |
| `pioneer-signal` | Pioneer / early-signal | Low status still, but first upgrading signals: a Dynamik uptick and/or a small commercial-amenity (D3) uptick. Stage 1: social *invasion* beginning; commercial *succession* not yet visible. |
| `active-gentrification` | Actively gentrifying | Status improving toward `hoch`, Dynamik positiv, commercial dynamism high. Stage 2: social *succession* underway with commercial *succession* now visible (the double cycle in full motion). |
| `consolidation-pressure` | Consolidation / displacement-pressure | Status reached high/upper-middle, Dynamik stable-positiv, amenity high or levelling, D4 demographics shifted (young-adult share up, transfer/long-tenure shares falling). Stage 3–4: upgrading consolidating; **elevated displacement-pressure signal**, NOT confirmed displacement (G-1). |
| `improving-vulnerable` | Improving vulnerable | Low status but positiv Dynamik with little/no commercial succession yet — a low-status area whose *social* indicators are improving. A coherent tension cell (see §1.4): could be incumbent-led improvement OR early gentrification; the model cannot yet distinguish (needs D5 / Döring-Ulbricht turnover signal). |

Notes on naming choices:
- We deliberately split the thesis's implicit "advanced" end-state into `consolidation-pressure`
  (a *signal*, G-1-compliant) rather than a single "advanced/post-displacement" terminus.
- `improving-vulnerable` is a *named tension cell*, not a process stage — it flags exactly the
  ambiguity (endogenous improvement vs. displacement-driven turnover) that R-A3 assessment b and R-A4
  assessment c warn MSS Dynamik alone cannot resolve. Naming it honestly is better than forcing it
  into `pioneer-signal`.

### 1.3 The displacement / Milieuschutz overlay is NOT a stage

[discharges R-A7 domain C1 + Note A; R-A4 condition 6]

**Milieuschutz (Soziale Erhaltungsgebiete) must appear as a separate "protected-zone" overlay
attribute, never as a typology stage.** Rationale (R-A7 domain assessment, "Deferred D5"):

- Designation is **simultaneously** (a) a *signal* that the Senate already identified upgrading /
  displacement pressure, and (b) an *intervention* that *suppresses* the very displacement it flags.
  Folding it into a stage would conflate a risk signal with its own treatment effect.
- It **under-covers** early-stage areas not yet designated and **over-marks** contested-but-protected
  ones — so it is a *biased* pressure proxy, never a displacement *measure*.
- Implementation seam: a nullable boolean/category overlay on the typology, populated in Epic D when
  D5 lands. R-A1 leaves the slot; it does **not** populate it (D5 deferred, ADR-0008 §1).

### 1.4 MSS Status × Dynamik cross-table (4 × 3 = 12 cells)

This is the *outcome-only* skeleton of the typology — the D1×D2 face the public site inherits from the
Senate's official model before D3/D4 refine it. **D1 (Status) and D2 (Dynamik) are orthogonal axes by
construction** (ADR-0008 §1; the Senate's own 4×3 matrix); a weak D1↔D2 correlation is the official
model working as intended, *not* a contradiction (R-A7 geo §2). The cells below are the *baseline*
stage assignment; D3/D4 then push borderline cells (e.g. promote `pre-gentrification` → `pioneer-signal`
when a D3 commercial uptick is present). The geo-DS draft owns how D3/D4 modulate the cell; this table
fixes the D1×D2 *theory anchor*.

Status code: **1 = hoch (highest) … 4 = sehr niedrig (lowest)**. Dynamik code: **1 = positiv,
2 = stabil, 3 = negativ** (mapped from WFS {1,3,5}; ordering confirmation is R-A1 geo guardrail, R-A7
geo C3 / R-A3 C1).

| Status \ Dynamik | **1 = positiv** (improving) | **2 = stabil** | **3 = negativ** (worsening) |
|---|---|---|---|
| **1 = hoch** | `consolidation-pressure` — high status still rising; classic late-stage upgrading | `stable-established` — settled high status | `stable-established`* — high status losing ground; *tension*: not gentrification, possibly the reverse |
| **2 = mittel** | `active-gentrification` — mid status rising = the heart of the upgrading process | `stable-established` | `pre-gentrification`* — mid status declining; *tension*: filtering-down, not gentrification |
| **3 = niedrig** | `pioneer-signal` / `improving-vulnerable` — low status improving = pioneer invasion OR incumbent-led improvement (D3/D5 disambiguate) | `pre-gentrification` — low, stable: susceptible, dormant | `pre-gentrification` — low and worsening: most vulnerable, displacement *exposure* high |
| **4 = sehr niedrig** | `improving-vulnerable` — lowest status improving: the canonical "low Status + positiv Dynamik" gentrification-relevant cell (R-A3 cond. 2) | `pre-gentrification` | `pre-gentrification` — lowest and worsening: maximal vulnerability |

`*` = **theoretical tension cells.** A *negativ* Dynamik in a *high/mid* status PLR is **not**
gentrification — it is the opposite trajectory (decline / filtering-down). The typology must not let
D3/D4 promote these cells into a gentrification stage: a flourishing café scene in a *declining*
high-status area is not "active gentrification." R-A1 must guard the sign so that an upgrading stage
requires **non-negativ Dynamik** (D2 ∈ {positiv, stabil}) as a necessary condition. [theory guard;
geo-DS owns the rule encoding]

**Theoretically coherent vs. tension cells, summarized:**
- *Most coherent gentrification cells:* (Status 3–4) × (Dynamik 1) — low status improving. This is the
  R-A3 condition-2 "low Status + positiv Dynamik" target and the Döring-Ulbricht upgrading signature.
- *Coherent non-gentrification cells:* (Status 1–2) × (Dynamik 2) — settled high/mid status.
- *Tension cells (`*`):* (Status 1–2) × (Dynamik 3) — high/mid status *declining*. Coherent as a
  *trajectory* but it is decline, not gentrification; the typology assigns a non-upgrading stage and
  must never read a D3 amenity signal here as gentrification.

### 1.5 D1 polarity vs. the 2018 thesis — the numeric inversion (document explicitly)

[discharges R-A7 domain C1(d), R-A3 condition 1; R-C2 grounding]

This is the single most error-prone sign in the whole model and it **must** be stated in the
`gentrification_index` / lead-lag model SQL comment verbatim:

> The 2018 thesis used `status_summe` (`reference/system/50_lor_mss_idx_bzr_idx.sql`), a **sum** where
> **higher = worse** social status (more pre-gentrification). The current MSS **Status-Index** uses the
> official Senate convention **1 = hoch (best) … 4 = sehr niedrig (worst)**, i.e. **lower code = higher
> status**. The numeric direction is therefore **INVERTED** relative to the thesis.

Consequence for the vulnerability-positive convention used across D1–D4 (see §5): **higher D1 numeric
(closer to 4) = lower social status = more pre-gentrification = more vulnerable = vulnerability-positive.**
A mis-sign here silently inverts the entire validation (R-A3 condition 1). The model must treat the
Status-Index as **ordinal**, never average the class codes as if metric (R-A3 geo C2; ADR-0008 §1), and
exclude uninhabited PLRs (gesamtindex IS NULL) from any fit/calibration (R-A3 geo C3).

### 1.6 MSS edition-comparability: 4-class vs. 2023+ 12-group Gesamtindex

[discharges R-A7 domain C1(e); R-A3 condition 4 / assessment d]

From the **2023 MSS edition** the Status classification moved from the **4-class Status-Index** to a
**12-group Gesamtindex**. For cross-edition comparability the model **groups the 12-group Gesamtindex
back to the 4-class scheme** and anchors D1 on that 4-class reading (ADR-0008 §1: 4-class is primary,
the 12-group is a secondary signal). Two structured breaks must be stated on G2 (not smoothed over):

1. **447 ↔ 542 PLR boundary break (2019→2021).** Any Status/Dynamik series crossing this boundary is
   not PLR-comparable without the ADR-0003 LOR crosswalk; absent the crosswalk, treat the pre-2021 and
   post-2021 schemes as separate panels. Epic B's directional revival anchors on the **pre-2021
   447-PLR** editions (R-A3 condition 4; ADR-0008 §2 vintage rule).
2. **3→4 index-indicator drift (single-parent-household children added 2023).** Pre-2023 and 2023+
   classes are *comparable in interpretation but not computed from an identical input set*; small
   cross-2023 movements must not be over-read as real social change (R-A3 assessment d).

---

## 4. D4 EWR endogeneity discipline — theory framing

[discharges R-A7 domain C2 — the most important theory condition; carries R-A5 `indicator-semantics.md`
§2, §8 condition 3, §9; R-A4 conditions 1–4]

This is the core circularity guard of the whole re-grounding. D4 (EWR socio-demographic composition)
is a **predictor**, and it must be specified so that it predicts the *outcome* (MSS social status)
rather than re-measuring it.

### 4.1 Why D4 *levels* are the safe choice (the defensible predictor)

D4 entered as a **cross-sectional baseline level** answers: *"how pre-gentrification was this PLR at the
study start?"* That is a legitimate predictor. Döring & Ulbricht (2016) establish that a PLR's
demographic *composition* — high share of welfare recipients, young adults, migrants; low share of
long-tenure residents — is a **precondition** of gentrification susceptibility, i.e. an *initial
condition*, not an ongoing outcome signal. A level snapshot at the baseline year describes those
initial conditions and can defensibly be regressed against a *later* social-status outcome
(status at T+k). This is the lead-lag spine the thesis used (R-A4 assessment b, role (i)).

### 4.2 Why D4 *changes* are dangerous (near-tautology)

A *change* in `young_adult_share` (rising) or `residence_duration_5y_share` (falling) **is the
demographic face of gentrification in progress** (Döring-Ulbricht; thesis index gives a *positive*
weight to a rising 18–35 share, `indicator-semantics.md` §2). Testing such a D4 *change* against an MSS
*status change* therefore risks a **near-tautological regression**: the model would "predict" the
outcome using a different measurement of the same construct. This is the same circularity firewall R-A4
condition 1 imposes on the `indexind` SES indicators (never regress same-edition MSS Status on the
indicators it is built from), applied here to the demographic block. [discharges R-A7 domain C2(b);
R-A4 condition 1 analogue; critical-assessment W2 leakage]

### 4.3 The levels-vs-changes rule (binding)

[discharges R-A7 domain C2(c); R-A5 §8 condition 3; R-A7 geo condition 1]

1. **D4 enters the model ONLY as a LEVEL** — a snapshot at the baseline year (or the earliest
   available year per indicator), used as a **cross-sectional baseline-vulnerability covariate.**
2. **D4 change features are NOT part of the vulnerability baseline.** If R-A1 includes D4 *change*
   features at all, they must be:
   - placed on the **predictor / early-warning** side, explicitly labelled as *youthification /
     turnover early-warning signals*, **not** folded into the same vulnerability composite that is
     tested against MSS status; and
   - **lagged identically to D3** (predictor delta at T vs. outcome delta at T+k), so the model cannot
     smuggle a contemporaneous demographic-outcome correlation in as a "prediction" (R-A7 domain C3;
     R-A7 geo condition 1: lead-lag operates on changes, both sides).
3. The index-definition.md **must state, per D4 variable, which role it plays** — permissible as a
   baseline *level*, or an *outcome-proxy change* requiring the lagged-early-warning treatment. The
   table in §5.4 below provides this per-variable classification.

### 4.4 Indicator-specific data-window limits

- **`migration_background_share`: available ≥ 2017 only** (Mikrozensus definition break,
  `seed_ewr_indicator_meta.csv`; R-A5 condition 3). Its use **restricts the analysis window** to ≥2017
  for any series or cross-year comparison involving it. [discharges R-A7 domain C2(d)]
- **`transferbezug` (SES) null in 2019/2021 MSS editions** is a **data gap, not a zero.** Treat as
  **MISSING** throughout — in both the D4/SES predictor block and the MSS outcome alignment. Never
  back-fill as zero (R-A4 condition 4; R-A7 domain C2(e)). The same MISSING-not-zero rule applies to
  the 2023+ single-parent-household indicator before 2023 (R-A4 condition 4).

### 4.5 Theory justification for D4-as-baseline (cite)

[discharges R-A7 domain C2(f)]

Döring & Ulbricht (2016): a high share of welfare recipients, young adults, and migrants marks a
**gentrification-susceptible** area — a *precondition*, not an ongoing outcome signal. The R-A5 audit
(`indicator-semantics.md` §9, Verdict PASS after PR #89) confirmed **all five EWR composite indicators
are vulnerability-positive** once the `mean_age_years` polarity was fixed (negation removed). So as a
*level* composite, D4 is a coherent, single-polarity baseline-vulnerability covariate — exactly the
"initial conditions" Döring-Ulbricht associate with susceptibility. The danger is entirely in the
*change* direction (§4.2), which §4.3 firewalls.

---

## 5. Polarity reference table — theory perspective

This is the narrative, sign-direction companion to the geo-DS technical polarity table. The geo-DS
draft owns the numeric normalization (z-scores, common-polarity arithmetic per OECD/JRC 2008); this
section fixes **what "more gentrified / more vulnerable" means** for each dimension so the signs cannot
drift. The governing convention across the whole model is **vulnerability-positive**: a higher value =
*more pre-gentrification / more vulnerable / less far along the upgrading process* (the same convention
R-A5 §1 established for `ewr_composite`).

### 5.1 What "more gentrified" means per dimension (invasion-succession direction)

| Dim | Construct | Role | "More gentrified / upgraded" is… | Vulnerability-positive direction (high = more vulnerable / pre-gentrification) |
|---|---|---|---|---|
| **D1** | MSS Status-Index (1=hoch…4=sehr niedrig) | Outcome (state) | **Lower** D1 code (toward 1 = hoch) = higher social status = more upgraded/gentrified | **Higher** D1 numeric (toward 4) = lower status = more pre-gentrification = **vulnerability-positive** |
| **D2** | MSS Dynamik (1=positiv,2=stabil,3=negativ) | Outcome (direction) | Dynamik **1 = positiv** = status *rising* = active upgrading | Dynamik **3 = negativ** = status *losing ground* = displacement/decline signal = **higher D2 numeric = vulnerability-positive** |
| **D3** | POI dynamism (C5-corrected), share-normalized | Predictor (feature) | **High** commercial dynamism / churn = commercial-succession signal = more gentrified | **Low** D3 (few amenities, pre-pioneer commercial landscape) = **vulnerability-positive** |
| **D4** | EWR demographic composite (5 indicators) | Predictor (feature) | **Low** vulnerability composite (young-adult share already high *as an outcome*, transfer/migration/long-tenure shares fallen) = more gentrified | **High** D4 (high transfer share, high migration-background share, high long-tenure share, high mean age, high child share) = pre-gentrification demographic profile = **vulnerability-positive** |

Reading the table as a trajectory: as a PLR gentrifies, **D1 falls** (status rises toward `hoch`),
**D2 sits at positiv then stabil**, **D3 rises** (commercial succession), and **D4 falls** (the
vulnerable demographic composition is recomposed). The vulnerability-positive convention makes D1, D2,
and D4 point the *same* way (higher = more vulnerable) and D3 the *opposite* (higher = more gentrified)
— so D3's sign must be **flipped** before it is pooled into any vulnerability-side composite, exactly
the common-polarity requirement (OECD/JRC 2008; geo-DS owns the flip arithmetic).

### 5.2 D1 vs. thesis polarity — explicit confirmation

[discharges R-A7 domain C1(d)/5(b); R-A3 condition 1]

The 2018 thesis `status_summe` was a **sum** with **higher = worse** (more pre-gentrification). The MSS
Status-Index is **1 = best, 4 = worst**, so the numeric direction is **INVERTED**. Therefore:

> **Higher D1 numeric (toward 4 = sehr niedrig) → lower social status → more pre-gentrification → more
> vulnerable → vulnerability-positive.** In plain terms for this model: **higher D1 numeric = "bad" =
> more gentrifiable.** Confirmed explicitly.

This is the *same* sign logic as the R-A4 SES finding: a high `indexind` disadvantage value
corresponds to a *high* Status-Index *code* (low status) — the level indicators are vulnerability-positive
and a high disadvantage level lines up with high D1 numeric (R-A4 assessment c).

### 5.3 D2 `indexind *_dynamik` vs. MSS Dynamik class — direction consistency

[discharges R-A7 domain C1(c)/5(c)]

Two things named "Dynamik" must be aligned, or the lead-lag sign silently flips:

- The **MSS Dynamik *class*** (D2): **3 = negativ = worsening** social status (vulnerability-positive at
  high numeric).
- The **`indexind *_dynamik` indicator *variables***: a **positive value = worsening** (the disadvantage
  rate moved the wrong way).

These are **consistent**: `indexind *_dynamik` positive (worsening) ↔ MSS Dynamik class toward 3
(negativ, worsening). Both encode "worsening = bad = vulnerability-positive." **Confirmed consistent.**
The DE pair must put this two-line confirmation in the model SQL comment, because the WFS Dynamik code
{1,3,5}→{1,2,3} mapping and the `indexind` sign are computed in different staging models and a reviewer
cannot otherwise see they agree (R-A7 geo C3 / R-A3 C1: a reversed Dynamik code inverts the whole
lead-lag).

> **Caveat (R-A4 condition 2):** the `indexind *_dynamik` *change* indicators carry the **opposite
> gentrification reading** from the *level* indicators: a *falling* disadvantage rate in a low-status
> PLR is the **upgrading** signal, not a vulnerability signal. They must be signed and interpreted
> **separately** from the levels and **never** pooled into a static vulnerability composite at the same
> polarity (R-A4 condition 2; this is the SES analogue of the D4 levels-vs-changes rule, §4.3).

### 5.4 Per-variable D4 role classification (levels vs. outcome-proxy)

[discharges R-A7 domain C2(c) requirement that the doc state which D4 variables are permissible as
levels vs. outcome-proxies]

| EWR indicator | Level role (baseline covariate) | As a *change* it is… | Treatment |
|---|---|---|---|
| `residence_duration_5y_share` | ✅ baseline vulnerability (high tenure = settled, pre-gentrification) — vuln-positive | a *fall* = displacement of long-tenure residents = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only (§4.3) |
| `foreigners_share` | ✅ baseline vulnerability — vuln-positive | a *fall* = recomposition = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only |
| `migration_background_share` | ✅ baseline vulnerability — vuln-positive (≥2017 only) | a *fall* = recomposition = gentrification-in-progress | Level: baseline (≥2017). Change: outcome-proxy → lagged early-warning only |
| `age_under18_share` | ✅ baseline vulnerability (families/social housing) — vuln-positive | ambiguous; weaker outcome signal | Level: baseline. Change: not recommended as predictor |
| `mean_age_years` | ✅ baseline vulnerability (ageing long-tenure pop) — vuln-positive (post PR #89) | a *fall* (youthification) = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only |

The three indicators whose *change* is a gentrification-in-progress signal
(`residence_duration_5y_share`, `foreigners_share`/`migration_background_share`, `mean_age_years`) are
exactly the youthification/turnover signals R-A7 domain C2(a) and C3 require to be kept on the
lagged-early-warning side, *outside* the baseline vulnerability composite.

---

## Invasion-succession theory map

How Dangschat's (1988) **double invasion-succession cycle** maps to the D1×D2 typology (with D3/D4
as the refining predictors). This is the process narrative behind §1's stage table, and it must be
consistent with Döring-Ulbricht (2016) and the 2018 thesis Chapter 3 (Gentrifizierung als Prozess).

- **Stage 0 — pre-gentrification (susceptible).** High Status *numeric* (4 = sehr niedrig, i.e. low
  social status), Dynamik stabil-or-negativ, low commercial amenity (D3 low), D4 vulnerability high
  (high transfer / long-tenure / migration shares). The area the social invasion has *not yet*
  reached. → `pre-gentrification`.
- **Stage 1 — pioneer invasion.** A slight Dynamik improvement (toward positiv), Status still low, a
  small D3 commercial uptick. The *social* invasion begins (pioneers move in); the *commercial*
  succession is barely visible. → `pioneer-signal` (or `improving-vulnerable` if D3 is still flat —
  the ambiguity cell, §1.4).
- **Stage 2 — active gentrification (social succession).** Status improving (moving toward 1 = hoch),
  Dynamik positiv, D3 dynamism high — the *commercial* succession is now underway. The double cycle is
  in full motion; this is where the thesis's lead-lag is observable (status change at T → amenity
  change at T+1…k, H3b). → `active-gentrification`.
- **Stage 3 — consolidation.** Status reached 1–2, Dynamik stable-positiv, D3 high or levelling; D4
  demographics now visibly shifted (young-adult share up, transfer/long-tenure shares down). The
  process is consolidating. → `consolidation-pressure`.
- **Stage 4 — consolidation-pressure zone.** Status 1 = hoch, Dynamik stabil, D4 showing a *strong*
  demographic shift. This is **NOT** "post-displacement" (an unobserved event, G-1) — it is a
  **high-displacement-signal** state: the measurable signals of displacement *pressure* are at their
  peak, but the model cannot assert displacement *occurred* without D5. → `consolidation-pressure`
  with the elevated-signal flag; protected-zone overlay (§1.3) applied if Milieuschutz is designated.

The **lead-lag direction is the through-line of this map**: the social cycle (D1/D2 movement) *leads*
the commercial cycle (D3 movement), Stage 1→2. A model that reads them contemporaneously would collapse
Stages 1–3 into one and lose the thesis's actual finding (ADR-0008 §2; H3b confirmed / H3a rejected,
thesis p. 91). The map's *vulnerability-positive* reading is internally consistent: across Stages 0→4,
**D1 numeric falls, D2 settles at positiv→stabil, D3 rises, D4 falls** — the trajectory in §5.1.

---

## Inherited-conditions checklist (enumerated for the gate — R-A7 domain C4)

[discharges R-A7 domain C4: "carry R-A3 C1–C4 and R-A5 condition 3 into the R-A1 note explicitly"]

- **R-A3 C1 — Status encoding sign-awareness:** §1.5, §5.2. 1=hoch…4=sehr niedrig, inverse of thesis
  `status_summe`; documented for the model SQL comment.
- **R-A3 C2 — trajectory not single-edition level:** §1.4 (the low-Status + positiv-Dynamik cell is the
  gentrification target); lead-lag uses Status *change* (geo-DS draft).
- **R-A3 C3 — do not bake MSS into the city-agnostic core:** D1/D2 are a parameterized outcome slot
  (ADR-0008 §1; ADR-0005). Cross-city outcome-construct difference flagged for G2 (R-A7 Note C).
- **R-A3 C4 / vintage break:** §1.6 (447↔542 boundary; pre-2021 anchor; crosswalk dependency) and the
  3→4 indicator drift.
- **R-A5 §8 condition 3 — levels-vs-changes:** §4.3 (binding rule). D4 enters as levels; changes are
  lagged early-warning only.
- **R-A5 §9 / PR #89 — all five EWR indicators vulnerability-positive:** §4.5, §5.4.
- **MSS ordinal treatment / uninhabited-PLR exclusion / Dynamik {1,3,5} ordering:** §1.5 (ordinal,
  exclude gesamtindex IS NULL), §5.3 + §1.4 (Dynamik ordering confirmation is an R-A1 guardrail).
- **R-A4 circularity firewall:** §4.2, §5.3 caveat (no same-edition self-prediction; levels vs.
  change roles kept distinct).

---

## Domain verdict on this draft's own scope

This draft fixes the *meaning and sign* contract for the typology, D4 endogeneity, and polarity. It
discharges R-A7 domain conditions C1 (typology naming + displacement guardrails + ecological-inference
disclaimer), C2 (D4 levels-vs-changes endogeneity discipline), C3 (lagged D4 changes), and C4
(inherited-condition enumeration), and carries R-A3 / R-A4 / R-A5 conditions forward. It does **not**
cover the statistical/spatial half (lead-lag estimator, ordinal methods, spatial-robust inference,
cut-point arithmetic, sensitivity mechanics) — that is the geo-DS draft, and the final
`index-definition.md` requires **both** a domain `Verdict: PASS` and a geo `Verdict: PASS` at the R-C1
gate before R-A1 coding starts.

# Gentriduck Index Definition — R-A1 (#64)

**Status:** Awaiting dual sign-off (geo-DS + domain-expert)
**Branch:** feat/64-ra1-index-reground
**Operationalizes:** ADR-0008 (multi-dimensional gentrification model, #77)
**Discharges:** R-A7 geo conditions 1–5; R-A7 domain conditions C1–C4; R-A3 C1–C4 + R4;
R-A4 C1–C4; R-A5 §8/§9 condition 3; R-C2 (grounding citations throughout)

---

## 0. Scope, conventions, and theory grounding

### 0.1 Purpose

This is the **governed index definition** that gates DE implementation of R-A1 (#64). It specifies
*what the model means and how its parameters are set*, not the SQL. Both the
geo-data-scientist (statistical/spatial half) and the gentrification-domain-expert (theory/sign half)
must record `Verdict: PASS` before the DE pair begins coding. The document was produced by synthesizing
parallel drafts from both methodology authorities.

### 0.2 Dimension overview

Per ADR-0008, the model has four active dimensions and one deferred slot:

| Dim | Construct | Role | Source (Berlin) | Native grain |
|---|---|---|---|---|
| **D1** | Social status | **Outcome (state)** | MSS Status-Index class (`stg_berlin_mss`) | (edition, PLR) |
| **D2** | Social change | **Outcome (direction)** | MSS Dynamik-Index class (`stg_berlin_mss`) | (edition, PLR) |
| **D3** | Commercial / amenity | **Predictor (feature)** | POI status + dynamism (`int_poi_status_dynamism`) | (year, PLR) |
| **D4** | Socio-demographic vulnerability | **Predictor/baseline covariate** | EWR composite (`int_ewr_socioeco`) | (year, PLR) |
| (D5) | Displacement / affordability | Predictor — **deferred (Epic D)** | reserved nullable slot | (year, PLR) |

### 0.3 Two cross-cutting conventions

- **Vulnerability-positive orientation.** Every feature is oriented so that *higher = more
  pre-gentrification vulnerability / more deprivation / more gentrifiable*. Signs are defined per
  dimension in §5. (OECD/JRC 2008: establish common polarity before aggregation.)
- **Analysis unit = PLR (Planungsraum).** All results are PLR-scale and must be labelled as such
  (MAUP; §8). The CRS for any geometric operation is **EPSG:25833** (ETRS89/UTM 33N); never compute
  distances or areas in EPSG:4326.

### 0.4 Theory grounding

The index reconstructs the conceptual spine of the 2018 thesis (Helweg 2018), built on three
frameworks the methodology page (G2) must name:

- **Dangschat (1988; 2000) — double invasion-succession cycle.** Gentrification proceeds as two
  coupled cycles: a *social* invasion-succession (pioneers → gentrifiers → settled high-status
  population displace incumbents) and a *commercial* invasion-succession (amenity landscape turns over
  to serve incoming population). The thesis confirmed (p. 91, H3b) that **the social cycle leads the
  commercial cycle.** This is the reason the model must be lead-lag, not contemporaneous (ADR-0008 §2).
- **Döring & Ulbricht (2016) — Gentrification-Hotspots und Verdrängungsprozesse in Berlin.** Supplies
  the Berlin-specific *vulnerability/displacement-susceptibility* reading of demographic composition: a
  high share of welfare recipients, young adults, migrants, and a *low* share of long-tenure residents
  marks areas susceptible to gentrification. This grounds D4's polarity and the §4 levels-vs-changes
  discipline.
- **Smith (rent-gap) — absent until D5.** The capital/rent driver of gentrification is **not**
  represented in D1–D4. The model captures the *social outcome* (MSS) and *commercial/demographic
  correlates* (D3/D4); it does **not** capture the economic driver. The G2 page must not claim
  otherwise (R-A7 domain Note B).
- **Berlin official frame — MSS (Monitoring Soziale Stadtentwicklung) Status/Dynamik** as the governed
  social outcome (Holm 2010; Senate MSS documentation), consumed as published classes, not re-derived.

Per the grounding rule (R-C2), every sign and stage-name decision below carries its thesis-section,
EWR-codebook, or peer-reviewed citation; the DE pair **must** copy the relevant citation into the SQL
comment of the implementing model.

---

## 1. Typology: stage names and cut-points

### 1.1 Construction principle

The typology is **derived from the separated dimension sub-scores** (ADR-0008 Decision 3.2), never
from a pre-collapsed composite. The *spine* of the typology is Berlin's official MSS **Status × Dynamik**
matrix — the invasion-succession reading the thesis (§3.2, *Gentrifizierung als Prozess*), Dangschat
(1988, double invasion-succession cycle) and Döring & Ulbricht (2016) all use. D3 (POI dynamism)
enters as a **secondary axis** that sub-divides ambiguous outcome cells; D4 does **not** define a
stage (it is a baseline covariate, §4).

### 1.2 Two hard guardrails on every stage name

[discharges R-A7 domain C1]

**G-1 — No stage may assert an unobserved displacement *event*.** Open data (MSS + EWR + OSM) can
observe socio-economic *upgrading* and demographic *recomposition*; it **cannot** observe that a
specific household was *involuntarily displaced*. Displacement is an *inference*, not a measurement,
until D5 (Milieuschutz + rent-burden + turnover) lands in Epic D. Therefore:

- The candidate name **"post-displacement"** is **prohibited** — it asserts displacement *occurred*.
- Use **risk/signal/pressure** framing: `consolidation-pressure`, `high-displacement-signal`. These
  name a *measured signal of elevated risk*, not a confirmed outcome.
- Any stage name implying a *population* outcome must carry the disclaimer in G-2.

**G-2 — Small-area aggregate, not an individual statement (ecological-inference guard).** A stage is
a property of a **Planungsraum (PLR)**, a small-area aggregate of ~thousands of residents. It is **not**
a statement about any individual or building. Every public rendering of a stage and the mart column
comment must carry: *"PLR-level aggregate; not an individual- or building-level statement. Inferring
an individual's situation from a PLR stage is an ecological fallacy."* [discharges R-A7 domain C1,
second clause]

### 1.3 Stage vocabulary — the controlled list

Six stages, ordered along the invasion-succession process. Stage names are **binding**; the geo-DS
draft owns the numeric cut-point assignment and the D3 within-cell split method.

| Stage key | Public label | Process meaning (Dangschat / Döring-Ulbricht) |
|---|---|---|
| `stable-established` | Stable / established | High social status, no upgrading dynamic. Not a gentrification target; process either completed or never applied. |
| `pre-gentrification` | Pre-gentrification (vulnerable) | Low status, stable/declining dynamic, sparse commercial amenity. Stage 0: susceptible area before any pioneer invasion. |
| `pioneer-signal` | Pioneer / early-signal | Low status still, but first upgrading signals: Dynamik uptick and/or small D3 commercial uptick. Social *invasion* beginning; commercial *succession* not yet visible. |
| `active-gentrification` | Actively gentrifying | Status improving toward `hoch`, Dynamik positiv, D3 dynamism high. Social *succession* underway with commercial *succession* visible — the double cycle in full motion. |
| `consolidation-pressure` | Consolidation / displacement-pressure | Status reached high/upper-middle, Dynamik stable-positiv, amenity high or levelling, D4 demographics shifted. **Elevated displacement-pressure signal, NOT confirmed displacement (G-1).** |
| `improving-vulnerable` | Improving (ambiguous) | Low status but positiv Dynamik with little/no commercial succession — a named tension cell. Could be incumbent-led improvement OR early gentrification; model cannot yet distinguish (needs D5). |

Notes:
- `improving-vulnerable` is a *named tension cell*, not a process stage — it flags the ambiguity that
  MSS Dynamik alone cannot resolve (R-A3 assessment b, R-A4 assessment c). Naming it honestly is
  better than forcing it into `pioneer-signal`.
- The Milieuschutz overlay is a **separate attribute, NOT a stage** (§1.5).

### 1.4 D1/D2 cell definitions and numeric directions

[R-A3 C1; R-A5 §8; R-A7 domain C1(d); R-A7 geo condition 3]

- **D1 Status** (`status_index`, `stg_berlin_mss`): `1=hoch` (high status), `2=mittel`, `3=niedrig`,
  `4=sehr_niedrig` (lowest status). **Lower numeric = higher status = less deprived = less vulnerable.**
  This is the **INVERSE numeric direction** of the 2018 thesis `status_summe`
  (`reference/system/50_lor_mss_idx_bzr_idx.sql`), where higher `status_summe` = worse status. The
  *meaning* is the same (both encode a deprivation gradient); only the numeric polarity differs. See §5
  for the worked sign example.
- **D2 Dynamik** (`dynamik_index`, `stg_berlin_mss`): `1=positiv` (improving social status),
  `2=stabil`, `3=negativ` (worsening). Mapped from WFS odd-step codes `{1,3,5}` (R-A3 §a).
  `1=positiv = improving`; `3=negativ = worsening = the gentrification-relevant upward-pressure end`.
  **This ordering MUST be confirmed against the published per-class distribution before consumption**
  (R-A3 C1; §3.4) — a reversed code silently inverts the entire typology and the lead-lag sign.

### 1.5 The MSS Status × Dynamik stage matrix (12 cells)

This is the *outcome-only* skeleton of the typology — the D1×D2 face the public site inherits from the
Senate's official model before D3/D4 refine it. D1 and D2 are **orthogonal by construction** (the
Senate's own 4×3 matrix); a weak D1↔D2 correlation is the model working as intended, not a
contradiction (ADR-0008; R-A7 geo §2).

Status code: **1 = hoch (highest) … 4 = sehr_niedrig (lowest)**.
Dynamik code: **1 = positiv (improving), 2 = stabil, 3 = negativ (worsening)**.

| Status \ Dynamik | **1 = positiv** (improving) | **2 = stabil** | **3 = negativ** (worsening) |
|---|---|---|---|
| **1 = hoch** | `consolidation-pressure` — high status still rising; late-stage upgrading consolidating | `stable-established` — settled high status | `stable-established`* — high status losing ground; *tension*: decline, not gentrification |
| **2 = mittel** | `active-gentrification` — mid status rising; the heart of the upgrading process | `stable-established` | `pre-gentrification`* — mid status declining; *tension*: filtering-down |
| **3 = niedrig** | `pioneer-signal` / `improving-vulnerable`† — low status improving (D3/D5 disambiguate) | `pre-gentrification` — low, stable: susceptible, dormant | `pre-gentrification` — low and worsening: most vulnerable |
| **4 = sehr_niedrig** | `improving-vulnerable`† — lowest status improving; canonical "low Status + positiv Dynamik" cell (R-A3 C2) | `pre-gentrification` | `pre-gentrification` — lowest and worsening: maximal vulnerability |

`*` = **Theoretical tension cells.** A *negativ* Dynamik in a *high/mid* status PLR is decline, not
gentrification. The typology must guard the sign so that an upgrading stage requires **non-negativ
Dynamik** (D2 ∈ {positiv, stabil}) as a necessary condition. A D3 commercial signal in a *declining*
high-status PLR does **not** promote it to an upgrading stage. [geo-DS owns the rule encoding]

`†` = **`improving-vulnerable` vs `pioneer-signal` disambiguation:** D3 (C5-corrected commercial
dynamism) decides — above the within-cell D3 split threshold → `pioneer-signal`; below → `improving-
vulnerable`. D5 (deferred) may further distinguish incumbent-led improvement from pioneer invasion.

### 1.6 D3 as a secondary typology axis

Within each Status×Dynamik cell, the **C5-corrected** D3 POI-dynamism sub-score (`dynamism_score`, §5)
splits each cell into `amenity-active` vs `amenity-quiet` by a within-cell median or terciles of the
corrected score. This surfaces the thesis signature — where commercial succession *follows* a social
invasion — without letting D3 (a predictor) redefine the social outcome. D3 enters the typology
**only after** the C5 completeness correction (§2.4, §7); an uncorrected D3 would tag late-mapped PLRs
as spuriously `amenity-active` (R-A7 geo condition 5a).

### 1.7 2021 MSS edition change → back-map to 4 classes

From the 2021 edition the MSS Status-Index is published as a **12-group "Status-Index Gesamtindex"**
(`gesamtindex` codes `{11,13,15,21,23,25,31,33,35,41,43,45}`). For cross-edition typology
comparability, **back-map to the 4 Status classes via the tens digit**: `status_class =
floor(gesamtindex / 10)`; the units digit `∈ {1,3,5}` is the Dynamik WFS code → D2 via
`{1→1, 3→2, 5→3}` (R-A3 §e). All cross-edition typology assignments use the 4-class Status and
3-class Dynamik back-map, never the raw 12-group code as if it were a 12-level ordinal.

Two structured breaks must be stated on G2, not smoothed over (R-A7 domain C1(e); R-A3 C4):
1. **447 ↔ 542 PLR boundary break (2019→2021).** Any Status/Dynamik series crossing this boundary
   is not PLR-comparable without the ADR-0003 LOR crosswalk.
2. **3→4 index-indicator drift (single-parent-household children added 2023).** Pre-2023 and 2023+
   classes are *comparable in interpretation but not computed from an identical input set*; small
   cross-2023 movements must not be over-read as real social change.

### 1.8 Milieuschutz overlay — NOT a stage

[discharges R-A7 domain C1 + Note A; R-A4 condition 6]

**Milieuschutz (Soziale Erhaltungsgebiete) must appear as a separate "protected-zone" overlay
attribute, never as a typology stage.** Rationale: designation is simultaneously (a) a *signal* that
the Senate identified upgrading/displacement pressure, and (b) an *intervention* that *suppresses* the
very displacement it flags. Folding it into a stage would conflate a risk signal with its own treatment
effect. Implementation seam: a nullable boolean/category overlay on the typology, populated in Epic D
when D5 lands. R-A1 leaves the slot; it does **not** populate it.

### 1.9 Cut-point governance

The cut-points are **the Senate's own quantile/expert class boundaries** (inherited, not invented) for
D1/D2, plus a single within-cell split for D3. R-A1 does **not** introduce new continuous cut-points
on D1/D2. The robustness of the few discretionary choices (the D3 within-cell split; the back-map) is
tested in §8 (cut-point perturbation).

---

## 2. Lead-lag specification

This is the single most important architectural fix (ADR-0008 Decision 2; R-A7 geo §3). A
contemporaneous mean **cannot** express the thesis's temporal-order finding (H3b confirmed, H3a
rejected; thesis p. 91) and does not satisfy the ADR.

### 2.1 Panel structure

For each PLR `i` and each year/edition `t`, we model **change→change** at temporal offset `k ∈ {1,2,3}`:

```
H3a (POI leads status — thesis REJECTED; test anyway):
    Δstatus_{i,t+k}  ~  Δamenity_{i,t}  + baseline_i + controls

H3b (status leads POI — thesis CONFIRMED; expected to dominate):
    Δamenity_{i,t+k} ~  Δstatus_{i,t}  + baseline_i + controls
```

Both directions are fit for every `k`. The **headline result is the directional dominance of H3b
(status→amenity)** — but that is a *reported test outcome*, never a hard-coded assumption (R-A7 geo
condition 1; domain condition 3). The thesis confirmed (p. 91) H3b and rejected H3a, making the social
cycle (D1/D2 movement) the *leading* cycle — exactly Dangschat's double invasion-succession.

### 2.2 BOTH sides must be deltas (geo condition 1, binding)

`Δstatus` and `Δamenity` are **changes**, not levels, on **both** sides of every regression. Comparing
a predictor *level* at T to an outcome *level* at T+k recovers a spatial cross-section, not temporal
precedence. Concretely:

- `Δamenity_{i,t}` = D3 within-vintage delta of the **C5-corrected** `share_yoy_change`-based
  `dynamism_score` (§2.4). For the POI density face, use the delta of `status_score`, not its level.
- `Δstatus_{i,t}` = change in the ordinal D1 Status class. Because D1 is ordinal (§3), express
  `Δstatus` as a **signed ordinal transition** (improved / stable / worsened, derived from the
  consecutive-edition class change) or consume D2 (Dynamik) which **already encodes the 2-year status
  change** (thesis p. 97). Using D2 as the ready-made `Δstatus` is preferred where the edition cadence
  aligns; otherwise compute the within-vintage class transition. Do **not** subtract raw class codes
  as if metric (§3; R-A3 C2).

### 2.3 Estimation method and inference

- **Method:** because the outcome is ordinal, use an **ordered-logit / proportional-odds panel model
  with lagged regressors**, or, for the binary simplification (§3.3), a logistic panel with AUC /
  F-weighted reporting. A **cross-correlation by offset** (correlate `Δpredictor_t` with
  `Δoutcome_{t+k}` across `k`) is the transparent first-pass diagnostic and the natural way to *show*
  which direction leads; it complements, and does not replace, the regression.
- **Spatial-robust inference (binding, geo condition 1).** PLR observations are **not independent**
  (Tobler's first law; adjacent Kieze co-move). Every lead-lag coefficient and significance claim must
  use spatial-autocorrelation-robust inference — either spatial-HAC / Conley standard errors, or an
  explicit spatial-lag/spatial-error term using a contiguity (queen) or k-nearest-neighbour weights
  matrix on PLR centroids in EPSG:25833. The formal spatial specification and Moran's-I diagnostics
  are routed to R-A9 (#79); R-A1 must (a) report naive and spatial-robust inference side by side and
  (b) not publish a lead-lag *significance* claim on naive SEs alone.

### 2.4 C5 completeness correction MUST precede the lead-lag (binding)

[R-A7 geo condition 5a — the most dangerous unaddressed interaction]

D3 is OSM POI data; raw POI counts rise partly because OSM **coverage** grew, not because the
neighbourhood changed (~40% completeness; ADR-0008 Decision 5). `int_poi_status_dynamism` already
applies the **C5 correction** (PLR-share normalization: `dynamism_score` is the z-score of
`share_yoy_change`, not of raw count deltas — see the model header and `docs/epic-c/C5-geo-signoff.md`).
**The lead-lag must consume the C5-corrected `dynamism_score` / share-based deltas, never raw counts.**
Feeding uncorrected coverage growth into H3b would bias the H3b test toward false confirmation (high
"dynamism" in every PLR OSM expanded coverage in, regardless of actual neighbourhood change).
PLRs with zero POIs across all years are excluded from the D3 predictor (§7).

### 2.5 LOR vintage discipline (binding)

No `Δ` may cross the 2019→2021 LOR boundary without the crosswalk (§6). Lead-lag is fit
**within-vintage**: the pre-2021 447-PLR series (Epic B reference) and the 2021+ 542-PLR series are
fit separately; `k`-year offsets must stay inside one vintage unless bridged via
`seed_lor_crosswalk_2006_to_2021.csv` (§6). D3 is already remapped to the 2021 scheme — §6 states
which side of the break each delta lives on and how to achieve coterminous PLR geometries.

---

## 3. D1 ordinal treatment

### 3.1 Why ordinal

D1 Status (1–4) and D2 Dynamik (1–3) are **ordered classes with non-interval, quantile/expert
cut-points** (R-A3 §c, C2). The gap between `hoch` and `mittel` is not guaranteed equal to the gap
between `niedrig` and `sehr_niedrig`. Treating the codes as metric (averaging them, taking a metric
mean across cells) is **forbidden** (R-A3 C2; ADR-0008 D1 binding).

### 3.2 Permitted methods for D1/D2

- **Ordered logit / proportional-odds models** for class-as-outcome regressions.
- **Rank correlation** — Spearman's ρ or Kendall's τ — for monotone association between D1 and any
  continuous predictor or between editions.
- **Ordinal transition** (improved/stable/worsened) for `Δstatus` in the lead-lag (§2.2).
- Class **frequency / contingency** tables for the typology and for the R-A3 C1 reconciliation.

Never: arithmetic mean of class codes, Pearson correlation on raw codes, OLS with the class code as a
metric response.

### 3.3 Binary simplification + metrics vs. the 2018 baseline

For the headline "did the 2018 finding hold?" test (Epic B directional revival), collapse D1 to a
**binary**: `high-status-loss = 1` if the PLR's Status class **worsened** (numeric class increased,
since lower numeric = higher status) over the window, else `0`. Report:

- **AUC** of the predictor block (C5-corrected D3 deltas, optionally lagged D4 changes) against this
  binary outcome.
- **F-weighted** (class-imbalance-aware F score) as the headline classification metric, mirroring the
  2018 baseline's metric expectation.

All AUC / F-weighted metrics are computed **within a single LOR vintage** (R-A3 C2, C4; §6). The Epic
B comparison is anchored on the pre-2021 447-PLR editions where MSS has its longest time series.

### 3.4 Confirm the Dynamik {1,3,5}→{1,2,3} ordering before consuming (binding, R-A3 C1)

Before any consumption, **reconcile the per-class PLR counts** against the published MSS report
distribution for at least one firm edition (2023 or 2025): count PLR per Dynamik class and per Status
class, compare to the report's published table. The cheap internal cross-check (R-A3 R2) —
`floor(gesamtindex/10) = status_index` and `(gesamtindex mod 10) ∈ {1,3,5}` consistent with
`dynamik_index` via `{1→1, 3→2, 5→3}` — should be added as a dbt test and run first. **A
reversed/permuted Dynamik code silently inverts the lead-lag sign** (R-A7 geo condition 3), so this
gate is non-negotiable.


### 3.5 Trajectory classification thresholds (R-A8; fct_gentrification_trajectory)

[R-A8 #78; Dangschat 1988 double invasion-succession; index-definition.md §3.1]

The `fct_gentrification_trajectory` mart classifies each PLR's D1 social-status trajectory
across the available MSS panel (currently 3 editions: 2021, 2023, 2025). The classification
uses rule-based thresholds on the ordinal `status_index`. The threshold rationale:

**Trend direction threshold (±1 ordinal step):**
The minimum meaningful change in a 4-level ordinal is a one-class step (e.g. sehr_niedrig → niedrig,
or hoch → mittel). A zero delta (same class at first and last edition) is classified as the
stable-end categories (stable-established or persistently-deprived) or mixed, never as improving or
declining. A ±1 step change is a real reclassification of the PLR by the official MSS methodology —
a meaningful social-status shift that required the Senate to move the area to a different class.

- `status_delta >= +1` -> **declining** (worsened by >= 1 ordinal step over the panel)
- `status_delta <= -1` -> **improving** (improved by >= 1 ordinal step over the panel)

**Mean boundary (2.5) for stable/deprived endpoints:**
The D1 scale midpoint is 2.5 (midpoint of the 1-4 range). A panel mean <= 2.0 (predominantly hoch
or mittel) combined with limited volatility (status_range <= 1) classifies an area as
**stable-established**. A panel mean >= 2.5 (predominantly mittel-to-niedrig or above) combined with
limited volatility classifies an area as **persistently-deprived**.

- `status_index_first <= 2 AND status_index_last <= 2 AND mean <= 2.5 AND range <= 1` -> **stable-established**
- `status_index_first >= 3 AND status_index_last >= 3 AND mean >= 2.5 AND range <= 1` -> **persistently-deprived**

**Range threshold (<=1) for stable endpoints:**
A within-panel range of <= 1 ordinal step means the PLR never crossed more than one class boundary
during the available editions. This prevents labelling as stable-established a PLR that was hoch in
one edition and niedrig in another (range = 2).

**Mixed:**
All remaining patterns are classified as **mixed**. With 3 editions and an integer ordinal, the
mixed category is structurally vacuous (all PLRs clear the thresholds), but it will capture
V-shapes and N-shapes when the full 7-edition panel (2013-2025) becomes available.

**Caveat — improving trajectory interpretation:**
A trajectory classified as `improving` (D1 status numerically decreased = less deprived) does NOT
unambiguously indicate positive social change. It may reflect completed gentrification with
displacement (original low-income residents replaced by higher-income arrivals), genuine social
mobility of incumbent residents, or early pioneer-stage succession. D5 displacement data
(Milieuschutzgebiete, rent-burden, turnover from R-B1 #70) is required for mechanism disambiguation.
The `improving` label should NOT be presented as unambiguously positive on the G2 methodology page.

---

## 4. D4 EWR baseline discipline

### 4.1 Theory: why D4 *levels* are the safe baseline predictor

[discharges R-A7 domain C2(a); R-A5 §2, §8 condition 3]

D4 entered as a **cross-sectional baseline level** answers: *"how pre-gentrification was this PLR at
the study start?"* Döring & Ulbricht (2016) establish that a PLR's demographic *composition* — high
share of welfare recipients, young adults, migrants; low share of long-tenure residents — is a
**precondition** of gentrification susceptibility, i.e. an *initial condition*, not an ongoing outcome
signal. A level snapshot at the baseline year describes those initial conditions and can defensibly be
regressed against a *later* social-status outcome (status at T+k) — exactly the lead-lag spine the
thesis used (R-A4 assessment b, role (i)).

### 4.2 Theory: why D4 *changes* are dangerous (near-tautology)

[discharges R-A7 domain C2(b); R-A4 condition 1 analogue; critical-assessment W2 leakage]

A *change* in `young_adult_share` (rising) or `residence_duration_5y_share` (falling) **is the
demographic face of gentrification in progress** (Döring-Ulbricht; thesis). Testing such a D4 *change*
against an MSS *status change* therefore risks a **near-tautological regression**: the model would
"predict" the outcome using a different measurement of the same construct. This is the same circularity
firewall R-A4 condition 1 imposes on the `indexind` SES indicators — applied here to the demographic
block.

### 4.3 The levels-vs-changes rule (binding)

[discharges R-A7 domain C2(c); R-A5 §8 condition 3; R-A7 geo condition 1; R-A4 C3]

1. **D4 enters the model ONLY as a LEVEL** — a snapshot at the baseline year (or the earliest
   available year per indicator), used as a **cross-sectional baseline-vulnerability covariate.**
2. **D4 change features are NOT part of the vulnerability baseline.** If R-A1 includes D4 *change*
   features at all, they must be placed on the **predictor / early-warning** side, explicitly labelled
   as *youthification / turnover early-warning signals*, and **lagged identically to D3** — so the
   model cannot smuggle a contemporaneous demographic-outcome correlation in as a "prediction"
   (R-A7 domain C3; R-A7 geo condition 1). The recommended default for R-A1 is **exclude D4 changes
   from the predictor block**; include only the D4 level baseline, and revisit D4-change-as-feature
   only with the §8 sensitivity analysis demonstrating no leakage.
3. The DE pair **must state, per D4 variable, which role it plays** (baseline level vs. outcome-proxy
   change). See §4.5 for the per-variable classification.

### 4.4 D4 indicator availability and missingness

[discharges R-A7 domain C2(d)/(e); R-A5 condition 3; R-A4 C3/C4]

- `migration_background_share`: available **≥2017 only** (Mikrozensus definition break; R-A5 §6
  condition 3). Restrict any cross-year D4 comparison involving it to ≥2017; do not back-fill.
- `transferbezug` (SES indicator, if folded into a future SES extension of D4): **null in 2019 and
  2021 editions** (suspended). Treat as **MISSING, not zero** — do not impute, do not include in any
  denominator (R-A4 C3). The populated cross-edition core of the MSS SES battery is just
  `arbeitslose_*` + `kinderarmut_*` (R-A4 §c); use the full 4-indicator set only for single-edition
  2023/2025 fits.
- The five `ewr_composite` inputs are all **vulnerability-positive** after PR #89 (R-A5 §9, Verdict
  PASS) — no per-indicator sign work remains for D4 levels; the composite enters the model with the
  documented common polarity (§5).

### 4.5 Per-variable D4 role classification

[discharges R-A7 domain C2(c); R-A5 §9]

| EWR indicator | Level role (baseline covariate) | As a *change* it is… | Treatment |
|---|---|---|---|
| `residence_duration_5y_share` | Baseline vulnerability (high tenure = settled, pre-gentrification) | A *fall* = displacement of long-tenure residents = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only |
| `foreigners_share` | Baseline vulnerability — vuln-positive | A *fall* = recomposition = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only |
| `migration_background_share` | Baseline vulnerability — vuln-positive (≥2017 only) | A *fall* = recomposition = gentrification-in-progress | Level: baseline (≥2017). Change: outcome-proxy → lagged early-warning only |
| `age_under18_share` | Baseline vulnerability (families/social housing) — vuln-positive | Ambiguous; weaker outcome signal | Level: baseline. Change: not recommended as predictor |
| `mean_age_years` | Baseline vulnerability (ageing settled pop) — vuln-positive (post PR #89, negation removed) | A *fall* (youthification) = gentrification-in-progress | Level: baseline. Change: outcome-proxy → lagged early-warning only |

### 4.6 Levels-vs-changes divergence from 2018 thesis (must be resolved here)

The 2018 thesis used YoY **changes** of the EWR indicators; D4 uses **levels** (R-A5 §2, §5, §8 C3;
domain condition 2). This R-A1 note **resolves** the divergence: **levels = baseline vulnerability
predictor; changes = early-outcome signal, lagged or excluded.** A change-based D4 reads "is it
gentrifying this year" and must **not** be used as a vulnerability measure in the lead-lag predictor
block. Document this resolution on the G2 page (R-A5 §8 condition 3 carry-forward).

---

## 5. Polarity reference table

All features are oriented **vulnerability-positive** (higher = more gentrifiable / more deprived /
more pre-gentrification). The geo-DS draft owns the z-score arithmetic (OECD/JRC 2008: common polarity
before aggregation); the domain draft fixes the *meaning and sign direction* per dimension. The table
integrates both.

| Dim | Variable | Raw measurement direction | Vulnerability-positive reading | z-score / orientation convention | Expected role | Note |
|---|---|---|---|---|---|---|
| **D1** | MSS Status-Index `status_index` | `1=hoch` … `4=sehr_niedrig`; **lower numeric = higher status = less deprived** | **Higher D1 numeric = lower status = more pre-gentrification = vulnerability-positive** | **FLIP required**: z = −(class − mean)/sd. Treat as **ordinal** — flip is for *orientation reasoning only*; never metric-average codes (§3). | **Outcome** (not a predictor term). `Δstatus` = ordinal worsening transition. | **INVERSE numeric vs 2018 thesis `status_summe`** (where higher=worse). Same meaning, opposite numeric scale. Must flip when comparing to 2018 baseline. |
| **D2** | MSS Dynamik-Index `dynamik_index` | `1=positiv` (improving), `2=stabil`, `3=negativ` (worsening) | **Higher D2 numeric = worsening = vulnerability-positive** | Already vulnerability-positive in numeric order (3=negativ=worsening). Ordinal; confirm ordering first (§3.4). | **Outcome direction** / ready-made `Δstatus` (thesis p. 97). | `indexind *_dynamik` positive value = worsening ↔ MSS Dynamik class 3 (negativ, worsening). **Confirmed consistent.** Never reuse the class "positiv=good" sign for the raw `*_dynamik` values (R-A4 C1/C2). |
| **D3** | POI `dynamism_score` (C5-corrected) | z-score of `share_yoy_change`; higher = faster relative amenity growth | **Lower D3 = fewer amenities, pre-pioneer commercial landscape = vulnerability-positive** | D3 sign must be **FLIPPED** before pooling into any vulnerability-side composite. Used as-published for the lead-lag predictor (it is a predictor, not a vulnerability measure). | **Predictor.** H3b: status change should *precede* amenity change. C5-corrected before entry (§2.4). | Higher D3 = commercial succession signal. Predictor, never relabelled "Status"/"Dynamism" outcome. |
| **D3** | POI `status_score` | z-score of `total_poi_count` per year | Lower = sparser POI landscape = more vulnerable | as published | Predictor (density face); use delta in lead-lag. | Cross-section of POI richness; vulnerable to coverage bias in *levels* — prefer the share-based dynamism for temporal claims. |
| **D4** | `ewr_composite` (mean of 5 z-scores) | Higher = more pre-gentrification demographic composition | **Higher D4 = more vulnerable = vulnerability-positive** | Already vulnerability-positive (all 5 inputs, R-A5 §9). **Levels only** as baseline covariate (§4). | **Baseline covariate**, *not* contemporaneous predictor. | The legacy `gentrification_score` outer negation is **not reused** — D4 enters with its native vulnerability-positive sign. |
| **D4 inputs** | `residence_duration_5y_share` | High = long-tenure stable pop | + (vulnerability-positive) | + | within baseline composite | Canonical Döring–Ulbricht vulnerability marker. |
| | `foreigners_share` | High = pre-gentrification pop | + | + | within baseline composite | Matches thesis `ea` level polarity. |
| | `migration_background_share` | High = pre-gentrification pop | + | + | within baseline composite | **≥2017 only** (Mikrozensus break). |
| | `age_under18_share` | High = families/social housing | + | + | within baseline composite | Vulnerability-positive. |
| | `mean_age_years` | High = ageing settled pop | + | + (negation removed, PR #89) | within baseline composite | Now agrees in sign with `residence_duration_5y_share`. |
| **D3-price** | `brw_weighted_avg_eur_m2` (`mart_price_rent_dimension`) | Higher = higher capitalised ground-rent level (land reference value, EUR/m²) | **AMBIGUOUS polarity** — high BRW is consistent with historic wealth, completed gentrification, or active pressure; the three states cannot be separated by the level alone (Smith 1979; domain D2) | If pooled into vulnerability composite: **FLIP required** (high BRW = consolidated = LOW residual headroom = low vulnerability). **But the honest role is a price-surface/consolidation CONTEXT COVARIATE, not a vulnerability score** — displacement-risk language attaches only to BRW CHANGE (`brw_trend`). Winsorized z-score + rank/percentile; rank is the headline (heavy-tailed). | **Structural-level baseline/context covariate** (D4-levels pattern, §4.6). NEVER blended into Status×Dynamik typology (ADR-0008 level-vs-change separation). | BRW LEVEL = one term of the Smith (1979) rent gap (capitalised potential ground rent). NOT "the rent gap" — the gap is a difference (potential minus actual), not a level. The rent-gap-realisation signal is BRW CHANGE (brw_trend, built separately as an explicit change indicator on the lead side). Source: `int_berlin_brw_plr` → `mart_price_rent_dimension`. |
| **D3-price** | `wohnlage_score` (ordinal mean gut=high) / `pct_einfach` (`mart_price_rent_dimension`) | `wohnlage_score` = pct_einfach×1 + pct_mittel×2 + pct_gut×3; higher = more desirable; `pct_einfach` = share of addresses in the einfach tier | `pct_einfach`: **vulnerability-positive** (high share = more upgrading headroom = more exposed to gentrification; Milieuschutz target profile; Holm 2010). `wohnlage_score`: **desirability-positive** (high = more desirable = consolidated = LOW remaining vulnerability headroom) — opposite polarity to `pct_einfach` | `pct_einfach`: as published (positive). `wohnlage_score`: **FLIP required** for vulnerability composite (high score = low vulnerability). Winsorized z-score. | **Structural-level context covariate** (D4-levels pattern, §4.6). Wohnlage LEVEL (cross-sectional) = vulnerability/headroom PRECONDITION (Blasius & Dangschat 1990 Aufwertung). The Aufwertung OUTCOME is the DECLINING einfach share over vintages — a change signal, built separately if used as such, never as a level. Context-condition on locational desirability: peripheral low quality ≠ gentrification pressure without co-inciding demand. | `wohnlage_score` is an ORDINAL-MEAN APPROXIMATION — tiers are ordered but not equidistant; do not treat as interval-scaled in regression without flagging. Source: `int_berlin_wohnlage_plr` → `mart_price_rent_dimension`. |
| **D3-price** | `est_rent_mid` / `est_rent_low` / `est_rent_high` (`mart_price_rent_dimension`) | Higher = higher modelled Mietspiegel reference rent per PLR (EUR/m²/month at fixed profile) | **Affordability-negative** — higher = less affordable = more cost pressure; relevant for displacement-susceptibility of existing residents (Holm 2010 ~84% rental Berlin) | As published (positive for affordability pressure). Winsorized z-score. | **Structural-level affordability context covariate** (D4-levels pattern, §4.6). NEVER blended into Status×Dynamik typology. | "modelled/estimated net cold rent at a fixed reference dwelling profile (60–90 m², 1950–1964 construction year) — NOT observed rent paid." Mietspiegel Bestandsmiete/ortsübliche Vergleichsmiete: **lagging, conservative** affordability level of the standing stock; understates leading-edge/new-letting pressure that drives displacement. Disclose on G2 (domain D7). Fixed profile is a modelling choice, not a measurement. Source: `mart_price_rent_dimension` (Wohnlage shares × Mietspiegel rent cells). |

**Worked sign example — D1 end-to-end (thesis → current model):**
A PLR with MSS `status_index = 4` (`sehr_niedrig`) is the **most deprived / most vulnerable**.
In vulnerability-positive orientation its D1 z is **most negative** after the flip `z = −(4 − mean)/sd`.
The *same* PLR in the 2018 thesis would have the **highest** `status_summe`. So:
`2018-high-status_summe` ↔ `status_index = 4` ↔ most-vulnerable — scales inverted, meaning identical.
Any cross-edition or vs-2018 comparison must apply this flip explicitly or the deprivation gradient
reverses silently. **The DE pair must put this note as a SQL comment in every model that touches D1.**

**Trajectory narrative (§0.4, Dangschat double cycle, as a sign check):**
As a PLR gentrifies across Stages 0→4: **D1 numeric falls** (status rises toward `hoch`),
**D2 sits at positiv then stabil**, **D3 rises** (commercial succession), **D4 falls** (the vulnerable
demographic composition recomposed). Vulnerability-positive orientation makes D1, D2, D4 point the
same way (higher = more vulnerable) and D3 the *opposite* (higher = more gentrified) — D3's sign must
be **flipped** before pooling into any vulnerability composite.

---

## 6. LOR vintage-break handling

### 6.1 Two LOR schemes

- **`lor_pre2021`**: 447 PLR, editions ≤2019 (the 2018 thesis universe; MSS series 2008–2019).
- **`lor_2021`**: 542 PLR, editions 2021+.

The 2017→2021 redistricting changed the PLR universe; **PLR keys are not the same entities across
the break** (R-A3 §b, C4; ADR-0003).

### 6.2 Primary approach — within-vintage deltas (default)

Restrict **all** deltas (D1, D2, D3, D4) to **within a single vintage**:

- **Pre-2021 series:** 2008–2019, `area_vintage = 'lor_pre2021'`.
- **Post-2021 series:** 2021+, `area_vintage = 'lor_2021'`.

No `Δ` (lead-lag, typology change-over-time, AUC/F metrics) crosses the boundary. The Epic B
directional revival is **anchored on the pre-2021 447-PLR series** (longest MSS time series, the
thesis's own units); 2021+ is the forward extension reported separately.

### 6.3 Which side of the break each delta lives on (geo condition 2, binding)

| Delta | Source model | Vintage handling |
|---|---|---|
| `Δstatus` / `Δdynamik` (D1/D2) | `stg_berlin_mss` | within-vintage; pre-2021 deltas on the 447 universe, 2021+ on the 542 universe |
| `Δamenity` (D3) | `int_poi_status_dynamism` | D3 is already remapped to the 2021 PLR scheme (`int_poi_share_base_2021`, feat/63). For the **pre-2021 outcome series**, D3 must be aggregated back to the 447 universe (via the crosswalk, §6.4) OR the pre-2021 lead-lag uses the matching pre-2021 D3 series. R-A1 must state, per fitted model, which D3 geometry the predictor lives in and ensure it is **coterminous with the D1/D2 outcome geometry** of the same fit. |
| `Δewr` (D4, if used) | `int_ewr_socioeco` | within-vintage; `migration_background_share` ≥2017 only |

The non-negotiable rule: **within any single lead-lag fit, predictor and outcome must be in the same
PLR geometry.** Mixing a 2021-geometry D3 predictor with a 447-geometry D1 outcome is invalid.

### 6.4 Alternative approach — crosswalk bridge

To bridge the break, use **`seed_lor_crosswalk_2006_to_2021.csv`**:

- **448 rows**, mapping old PLR codes (`plr_id_pre2021`) to 2021 codes (`plr_id_2021`) with
  **areal-population weights** (`weight = intersection_area / pre2021_plr_area`), computed from GDI
  Berlin WFS geometries in **EPSG:25833** (CC BY 3.0 DE).
- Dominant-mapping weights are **0.999–1.000** (most PLRs map ~1:1 with small sliver overlaps);
  validated to **±0.01 tolerance** (weights per source PLR sum to ~1).
- Areal weighting is acceptable for **counts/shares** at PLR scale; **questionable for the ordinal MSS
  class** (you cannot areally average an ordinal class). For D1/D2 the crosswalk can only carry the
  *dominant* (max-weight) source class, not a weighted blend. Therefore: prefer the crosswalk for
  **D3/D4 continuous** bridging; for **D1/D2 ordinal** bridging use the dominant-weight assignment and
  flag it as approximate.

The crosswalk is the **secondary** path; the within-vintage default (§6.2) is preferred for all Epic B
directional claims to avoid introducing crosswalk error into the headline result. The crosswalk run is
the vintage-break robustness check (§8.3).

---

## 7. Exclusion rules

Applied before any fit, calibration, lead-lag, AUC/F computation, or typology assignment:

1. **Uninhabited PLRs** — `gesamtindex IS NULL` in MSS (WFS sentinel −9999 → null across all three
   indices). **Exclude from ALL regression, calibration, lead-lag, and metric computation** (R-A3 C3).
   They have no outcome and no resident population; including them is a structural-missingness leak.
   **Report the excluded count per edition** in the methodology write-up.
2. **`transferbezug` NULL in 2019/2021** — treat as **MISSING, not zero**. Do not impute; do not
   include in any denominator (R-A4 C3). The cross-edition populated SES core is `arbeitslose_*` +
   `kinderarmut_*` only.
3. **Cross-vintage deltas without the crosswalk** — any `Δ` spanning 2019(pre2021) → 2021(lor2021)
   without the §6.4 crosswalk bridge is **EXCLUDED** from the lead-lag (§6.3).
4. **PLRs with zero POI count across all years** — **excluded from the D3 predictor** (C5 completeness
   guard; a PLR OSM never mapped contributes only coverage noise, not amenity signal).
5. **D4-change features in the vulnerability/baseline block** — excluded by design (§4.3); D4 changes
   may only appear as lagged early-warning features, never as a baseline vulnerability term.
6. **`migration_background_share` pre-2017** — excluded from any cross-year D4 comparison (R-A5 §6).

---

## 8. Sensitivity analysis plan (required by ADR-0008 Decision 4)

The sensitivity analysis is part of the governed definition, **not deferred**. Minimum required suite:

### 8.1 Weight perturbation
Perturb each dimension weight (D1/D2/D3/D4) by **±20%** around its baseline. Report
**typology-assignment stability**: the **% of `(area, period)` cells that change stage** under each
perturbation. An unstable typology is the primary public-facing risk; report the distribution of
flips, not just a single summary number.

### 8.2 Lag-offset robustness
Run the lead-lag at **k=1, k=2, k=3**. Report **sign stability** of the H3b (and H3a) coefficients
across `k`: does status→amenity dominate at every offset, and is the sign consistent? A direction that
flips sign across `k` is not a robust finding.

### 8.3 Vintage-break sensitivity
Compare **pre-2021-only (within-vintage)** results against **crosswalk-bridged** results (§6). Report
whether the headline lead-lag direction and the AUC/F metrics agree; quantify the crosswalk-induced
divergence. Epic B's headline uses the within-vintage result; the crosswalk run is the robustness check.

### 8.4 Drop-a-dimension test (anti-conflation guard, geo condition 4b)
Fit **outcome-only (D1+D2)** vs the **full predictor-inclusive** model. Demonstrate **numerically**
that the composite/typology does **not** re-mix predictor and outcome — i.e. that adding D3/D4 as
predictors does not feed back into the *outcome* sub-scores. This is the explicit guard that the
ADR-0008 Decision 3.3 separation holds (the legacy model's defect was averaging predictors and outcome
into one number). Also report the model **with vs without D4** (the endogeneity-sensitive dimension).

### 8.5 Typology cut-point perturbation
Shift the Status/Dynamik **back-map cut-points ±1 class** (and the D3 within-cell split) and report
**stage-assignment stability** (% of cells reassigned). Combined with §8.1 this bounds the typology's
robustness to its two discretionary choices.

### 8.6 Equal- vs derived-weights justification (OECD/JRC 2008)
Document **why the chosen weights** over an **equal-weights baseline**. Equal weights are an
acceptable transparent default (OECD/JRC 2008) **only if justified in writing against this analysis**,
never asserted silently (closes ADR-0008 §2.3 #5 asserted-weights defect). If derived weights (e.g.
regression coefficients or PCA loadings) are used, report them with their spatial-robust uncertainty
and show they are stable across the §8.3 vintage runs.

---

## 9. Invasion-succession theory map

How Dangschat's (1988) **double invasion-succession cycle** maps to the D1×D2 typology (with D3/D4
as refining predictors). This narrative is the process theory behind §1's stage table and must be
consistent with Döring-Ulbricht (2016) and 2018 thesis Chapter 3 (*Gentrifizierung als Prozess*).

- **Stage 0 — pre-gentrification (susceptible).** High D1 numeric (4 = sehr niedrig, i.e. low social
  status), Dynamik stabil-or-negativ, low D3 commercial amenity, D4 vulnerability high (high transfer
  / long-tenure / migration shares). The area the social invasion has *not yet* reached. →
  `pre-gentrification`.
- **Stage 1 — pioneer invasion.** A slight Dynamik improvement (toward positiv), Status still low,
  a small D3 commercial uptick. The *social* invasion begins (pioneers move in); the *commercial*
  succession is barely visible. → `pioneer-signal` (or `improving-vulnerable` if D3 is still flat).
- **Stage 2 — active gentrification (social succession).** Status improving (moving toward 1 = hoch),
  Dynamik positiv, D3 dynamism high — the *commercial* succession is now underway. The double cycle is
  in full motion; this is where the thesis's lead-lag is observable (status change at T → amenity
  change at T+1…k, H3b). → `active-gentrification`.
- **Stage 3 — consolidation.** Status reached 1–2, Dynamik stable-positiv, D3 high or levelling; D4
  demographics visibly shifted (young-adult share up, transfer/long-tenure shares down). The process
  is consolidating. → `consolidation-pressure`.
- **Stage 4 — consolidation-pressure zone.** Status 1 = hoch, Dynamik stabil, D4 showing a *strong*
  demographic shift. **NOT "post-displacement"** — it is a **high-displacement-signal** state: the
  measurable signals of displacement *pressure* are at their peak, but the model cannot assert
  displacement *occurred* without D5 (G-1). → `consolidation-pressure` with elevated-signal flag;
  Milieuschutz overlay (§1.8) applied if designated.

The **lead-lag direction is the through-line of this map**: the social cycle (D1/D2 movement) *leads*
the commercial cycle (D3 movement), Stage 1→2. A model that reads them contemporaneously would collapse
Stages 1–3 into one and lose the thesis's actual finding (ADR-0008 §2; H3b confirmed / H3a rejected,
thesis p. 91).

---

## 10. Condition-discharge checklist

| Condition | Discharged in |
|---|---|
| R-A7 geo 1 (deltas both sides, spatial-robust) | §2.1, §2.2, §2.3 |
| R-A7 geo 2 (vintage discipline on every delta incl. D3) | §2.5, §6.3 |
| R-A7 geo 3 (confirm Dynamik {1,3,5} ordering) | §1.4, §3.4 |
| R-A7 geo 4 (typology stability + anti-conflation) | §8.1, §8.4, §8.5 |
| R-A7 geo 5 (C5 before lead-lag; MAUP labelling; ordinal within-vintage metrics) | §2.4, §0.3, §3.3 |
| R-A7 domain C1 (no displacement-event stage names; small-area disclaimer; D1 polarity; Dynamik ordering) | §1.2, §1.3, §1.4, §1.5, §5 |
| R-A7 domain C2 (D4 not an outcome proxy; levels-vs-changes; per-variable classification; data limits) | §4.1–§4.6 |
| R-A7 domain C3 (outcome→predictor headline; no contemporaneous D4 leakage) | §2.1, §4.3 |
| R-A7 domain C4 (carry R-A3 C1–C4, R-A5 cond 3 explicitly) | §3.4, §1.4, §7.1, §6, §4.4 |
| R-A3 C1 (Status encoding sign-awareness) | §1.4, §5 |
| R-A3 C2 (trajectory not single-edition level; ordinal) | §3, §2.2 |
| R-A3 C3 (uninhabited PLR exclusion) | §7.1 |
| R-A3 C4 / vintage break | §6 |
| R-A3 R4 | §3.4 (dbt test for {1,3,5} ordering) |
| R-A4 C1 (no same-edition self-prediction) | §4.2, §5 (Dynamik caveat) |
| R-A4 C2 (change indicators distinct polarity from levels) | §4.5, §5 (D2/`indexind` note) |
| R-A4 C3 (transferbezug MISSING-not-zero) | §4.4, §7.2 |
| R-A4 C4 (2023+ indicator drift) | §1.7 |
| R-A5 §8/§9 condition 3 (levels-vs-changes; migration ≥2017) | §4.3, §4.4 |
| R-C2 (grounding citations) | §0.4, all sections carry thesis/literature citations |
| ADR-0008 Decision 3.3 (predictor/outcome separation) | §0.2, §8.4 |
| ADR-0008 Decision 4 (sensitivity analysis) | §8 |
| ADR-0008 Decision 5 (C5 completeness correction) | §2.4 |
| Smith rent-gap absent until D5 (domain Note B) | §0.4 |
| Milieuschutz not a stage (R-A7 domain Note A; R-A4 condition 6) | §1.8 |

---

## Sources

- ADR-0008 (`docs/adr/0008-multi-dimensional-gentrification-model.md`)
- Thesis (Helweg 2018): pp. 55–56 (hypotheses), p. 91 (H3b confirmed / H3a rejected), p. 97
  (Dynamik = change in benefit-recipient share vs. city average), §3.2 (*Gentrifizierung als Prozess*)
- Dangschat (1988) — double invasion-succession cycle
- Döring & Ulbricht (2016) — Gentrification-Hotspots und Verdrängungsprozesse in Berlin (mobility /
  population-structure indices; stage reading)
- Holm (2010) — MSS frame (Berlin Senate MSS documentation)
- OECD/JRC (2008), *Handbook on Constructing Composite Indicators* — common polarity before
  aggregation; equal-weight baseline as a transparent default to be justified, not asserted
- Prior Gentriduck methodology: `docs/methodology/indicator-semantics.md` (R-A5, D4 polarity),
  `docs/methodology/R-A3-geo-signoff.md` (MSS C1–C4, R4), `docs/methodology/R-A4-geo-signoff.md`
  (SES dynamik polarity C1/C2), `docs/methodology/R-A7-geo-signoff.md`,
  `docs/methodology/R-A7-domain-signoff.md`, `docs/epic-c/C5-geo-signoff.md` (C5 completeness
  correction)
- `transform/seeds/seed_lor_crosswalk_2006_to_2021.csv` (448-row areal-weighted LOR crosswalk,
  EPSG:25833, ±0.01 tolerance)
- `reference/system/50_lor_mss_idx_bzr_idx.sql` (2018 thesis `status_summe` definition — D1 inversion
  reference)

---

## Sign-off (R-C1 gate)

| Authority | Verdict | File |
|---|---|---|
| geo-data-scientist | PENDING | `docs/methodology/R-A1-geo-signoff.md` |
| gentrification-domain-expert | PENDING | `docs/methodology/R-A1-domain-signoff.md` |

*DE implementation must NOT begin until both verdicts are PASS.*

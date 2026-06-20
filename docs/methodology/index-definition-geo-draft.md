# index-definition.md — Geo-DS Draft (R-A1, #64)
# (will be synthesized with the domain-expert draft by the PM)

Date: 2026-06-19
Author: geo-data-scientist
Branch: feat/64-ra1-index-reground
Operationalizes: ADR-0008 (multi-dimensional gentrification model)
Discharges: R-A7 geo conditions 1–5, R-A7 domain conditions 1–4, R-A3 C1–C4 + R4, R-A4 C1–C4,
R-A5 §8/§9 condition 3.

---

## 0. Scope and conventions (read first)

This is the **technical specification** that gates DE implementation of R-A1. It defines *what the
model means and how its parameters are set*, not the SQL. Per ADR-0008 the model has four dimensions:

| Dim | Construct | Role | Source (Berlin) | Native grain |
|---|---|---|---|---|
| **D1** | Social status | **Outcome (state)** | MSS Status-Index class (`stg_berlin_mss`) | (edition, PLR) |
| **D2** | Social change | **Outcome (direction)** | MSS Dynamik-Index class (`stg_berlin_mss`) | (edition, PLR) |
| **D3** | Commercial / amenity | **Predictor (feature)** | POI status + dynamism (`int_poi_status_dynamism`) | (year, PLR) |
| **D4** | Socio-demographic vulnerability | **Predictor (feature)** | EWR composite (`int_ewr_socioeco`) | (year, PLR) |
| (D5) | Displacement / affordability | Predictor — **deferred (Epic D)** | reserved nullable slot | (year, PLR) |

Two cross-cutting conventions used throughout this document:

- **House orientation = vulnerability-positive** (established R-A5). Every feature is oriented so that
  *higher = more pre-gentrification vulnerability / more deprivation / more gentrifiable*. Signs are
  defined per dimension in §5.
- **Analysis unit = PLR (Planungsraum).** All results are PLR-scale and must be labelled as such
  (MAUP; §8, R-A7 geo condition 5b). The CRS for any geometric operation is **EPSG:25833** (ETRS89 /
  UTM 33N), the metric CRS the LOR crosswalk and Berlin WFS are published in; never compute distances
  or areas in EPSG:4326.

---

## 1. Typology stage names & cut-points

### 1.1 Construction principle

The typology is **derived from the separated dimension sub-scores** (ADR-0008 Decision 3.2), never
from a pre-collapsed composite. The *spine* of the typology is Berlin's own official MSS
**Status × Dynamik** matrix — the invasion-succession reading the thesis (§3.2,
*Gentrifizierung als Prozess*), Dangschat (1988, double invasion-succession cycle) and Döring &
Ulbricht (2016) all use. D3 (POI dynamism) enters as a **secondary axis** that sub-divides
ambiguous outcome cells; D4 does **not** define a stage (it is a baseline covariate, §4).

### 1.2 D1 / D2 cell definitions

D1 (Status-Index class) and D2 (Dynamik-Index class) are the published Senate classes, consumed as
**ordinal** (§3). They are **orthogonal by construction** (the Senate's 4×3 = 12-cell typology); a
weak D1↔D2 correlation is the model working as intended, not a contradiction (ADR-0008; R-A7 geo §2).

- **D1 Status** (`status_index`, `stg_berlin_mss`): `1=hoch` (high status), `2=mittel`,
  `3=niedrig`, `4=sehr_niedrig` (lowest status). **Lower numeric = lower status = more deprived =
  more vulnerable.** This is the **INVERSE numeric direction** of the 2018 thesis `status_summe`
  (`reference/system/50_lor_mss_idx_bzr_idx.sql`), where higher `status_summe` = worse status. The
  *meaning* is the same (both encode a deprivation gradient); only the numeric polarity differs. This
  inversion is documented again in the polarity table (§5) and **must** be honoured when comparing to
  the 2018 baseline — see §5 note.
- **D2 Dynamik** (`dynamik_index`, `stg_berlin_mss`): `1=positiv` (improving social status over the
  edition's 2-year window), `2=stabil`, `3=negativ` (worsening). Mapped from WFS odd-step codes
  `{1,3,5}` (R-A3 §a). `1=positiv = improving = less at-risk`; `3=negativ = worsening = the
  gentrification-relevant upward-pressure end`. **This ordering MUST be confirmed against the
  published per-class distribution before consumption** (R-A3 C1; §3.4 below) — a reversed code
  silently inverts the entire typology and the lead-lag sign.

### 1.3 The MSS Status × Dynamik stage matrix

Stage names follow invasion-succession framing and obey domain condition C1: **no stage asserts an
unobserved displacement event.** Any candidate "post-displacement" is renamed to a **signal/risk**
framing. The grid below is the primary typology spine; cell names are proposals for the PM to
finalize with the domain expert.

| | **D2 = positiv (1)** improving | **D2 = stabil (2)** | **D2 = negativ (3)** worsening |
|---|---|---|---|
| **D1 = hoch (1)** | `consolidated-high` (settled affluent) | `stable-high` | `high-status-erosion-signal` |
| **D1 = mittel (2)** | `upgrading` (status rising) | `stable-mixed` | `mid-status-decline-signal` |
| **D1 = niedrig (3)** | `early-upgrading-signal` (low but improving — the classic pre-gentrification cell) | `stable-deprived` | `deprivation-deepening-signal` |
| **D1 = sehr_niedrig (4)** | `incipient-turnaround-signal` | `stable-very-deprived` | `acute-deprivation-signal` |

Reading guide for the public product: the **gentrification-relevant cells are low/mid status that is
*improving*** (`early-upgrading-signal`, `upgrading`, `incipient-turnaround-signal`) — these are the
"invasion" cells where social status is climbing off a deprived base. They are *risk signals*, not
assertions that displacement happened (domain C1). The typology carries a small-area / no-individual
disclaimer (domain C1; §8).

### 1.4 D3 as a secondary typology axis

Within each Status×Dynamik cell, the **C5-corrected** D3 POI-dynamism sub-score (`dynamism_score`,
§5) splits each cell into `amenity-active` vs `amenity-quiet` by a within-cell median or terciles of
the corrected score. This surfaces the thesis signature — where commercial succession is *following*
a social invasion — without letting D3 (a predictor) redefine the social outcome. D3 enters the
typology **only after** the C5 completeness correction (§2.4, §7); an uncorrected D3 would tag
late-mapped PLRs as spuriously `amenity-active` (R-A7 geo condition 5a).

### 1.5 2021 MSS edition change → back-map to 4 classes

From the 2021 edition the MSS Status-Index is published as a **12-group "Status-Index Gesamtindex"**
(`gesamtindex` codes `{11,13,15,21,23,25,31,33,35,41,43,45}`). For cross-edition typology
comparability, **back-map to the 4 Status classes via the tens digit**: `status_class =
floor(gesamtindex / 10)`; the units digit `∈ {1,3,5}` is the Dynamik WFS code → D2 via `{1→1,3→2,
5→3}` (R-A3 §e). All cross-edition typology assignments use the 4-class Status and 3-class Dynamik
back-map, never the raw 12-group code as if it were a 12-level ordinal. Document the 3→4 index-input
drift (single-parent-household indicator added 2023; R-A3 R1) on the G2 page: 2023+ classes are
"comparable in spirit", not identically constructed.

### 1.6 Cut-point governance

The cut-points are **the Senate's own quantile/expert class boundaries** (inherited, not invented) for
D1/D2, plus a single within-cell split for D3. R-A1 does **not** introduce new continuous cut-points
on D1/D2. The robustness of the few choices we do make (the D3 within-cell split; the back-map) is
tested in §8 (cut-point perturbation).

---

## 2. Lead-lag specification

This is the single most important fix (ADR-0008 Decision 2; R-A7 geo §3). A contemporaneous mean
**cannot** express the thesis's temporal-order finding and does not satisfy the ADR.

### 2.1 Panel structure

For each PLR `i` and each year/edition `t`, we model **change→change** at temporal offset `k ∈ {1,2,3}`:

```
H3a (POI leads status, thesis REJECTED — test anyway):
    Δstatus_{i,t+k}  ~  Δamenity_{i,t}            + baseline_i + controls
H3b (status leads POI, thesis CONFIRMED — expected to dominate):
    Δamenity_{i,t+k} ~  Δstatus_{i,t}             + baseline_i + controls
```

Both directions are fit for every `k`. The **headline result is the directional dominance of H3b
(status→amenity)** — but that is a *reported test outcome*, never a hard-coded assumption (R-A7 geo
condition 1; domain condition 3).

### 2.2 BOTH sides must be deltas (geo condition 1, binding)

`Δstatus` and `Δamenity` are **changes**, not levels, on **both** sides of every regression. Comparing
a predictor *level* at `T` to an outcome *level* at `T+k` recovers a spatial cross-section (rich areas
sit next to rich amenities), **not** temporal precedence. Concretely:

- `Δamenity_{i,t}` = D3 within-vintage delta of the **C5-corrected** `share_yoy_change`-based
  `dynamism_score` (§2.4). For the POI density face, use the delta of `status_score`, not its level.
- `Δstatus_{i,t}` = change in the ordinal D1 Status class. Because D1 is ordinal (§3), express
  `Δstatus` as a **signed ordinal transition** (improved / stable / worsened, derived from the
  consecutive-edition class change) or, equivalently, consume D2 (Dynamik) which **already encodes the
  2-year status change** (thesis p. 97). Using D2 as the ready-made `Δstatus` is preferred where the
  edition cadence aligns; otherwise compute the within-vintage class transition. Do **not** subtract
  raw class codes as if metric (§3; R-A3 C2).

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
  matrix on PLR centroids in EPSG:25833. The **formal spatial specification and Moran's-I diagnostics
  are routed to R-A9 (#79)**; R-A1 must (a) report naive and spatial-robust inference side by side and
  (b) not publish a lead-lag *significance* claim on naive SEs alone.

### 2.4 C5 completeness correction MUST precede the lead-lag (binding)

D3 is OSM POI data; raw POI counts rise partly because OSM **coverage** grew, not because the
neighbourhood changed (~40% completeness; ADR-0008 Decision 5). `int_poi_status_dynamism` already
applies the **C5 correction** (PLR-share normalization: `dynamism_score` is the z-score of
`share_yoy_change`, not of raw count deltas — see the model header and `docs/epic-c/C5-geo-signoff.md`).
**The lead-lag must consume the C5-corrected `dynamism_score` / share-based deltas, never raw counts.**
Feeding uncorrected coverage growth into H3b would make amenity "dynamism" rise everywhere coverage
improved and **bias the H3b test toward false confirmation** (R-A7 geo condition 5a — the most
dangerous unaddressed interaction). PLRs with zero POIs across all years are excluded from the D3
predictor (§7).

### 2.5 LOR vintage discipline (binding)

No `Δ` may cross the 2019→2021 LOR boundary without the crosswalk (§6). Lead-lag is fit
**within-vintage**: the pre-2021 447-PLR series (Epic B reference) and the 2021+ 542-PLR series are
fit separately; `k`-year offsets must stay inside one vintage unless bridged via
`seed_lor_crosswalk_2006_to_2021.csv` (§6). D3 is already remapped to the 2021 scheme — §6 states
which side of the break each delta lives on.

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

### 3.3 Binary simplification + metrics vs the 2018 baseline

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
class, compare to the report's published table. If counts match, the ordering is confirmed. The cheap
internal cross-check (R-A3 R2) — `floor(gesamtindex/10) = status_index` and `(gesamtindex mod 10) ∈
{1,3,5}` consistent with `dynamik_index` via `{1→1,3→2,5→3}` — should be added as a dbt test and run
first. **A reversed/permuted Dynamik code silently inverts the lead-lag sign** (R-A7 geo condition 3),
so this gate is non-negotiable.

---

## 4. D4 EWR baseline discipline

### 4.1 D4 is a cross-sectional baseline covariate, NOT a contemporaneous predictor

D4 (`int_ewr_socioeco.ewr_composite`) is **demographic composition**. Demographic *change*
(youthification, falling long-tenure/foreigner share) **is itself the signature of gentrification in
progress** (R-A5 §2, §4; thesis; Döring–Ulbricht 2016). Regressing contemporaneous demographic
*change* on the MSS status outcome is **near-tautological** (it regresses a partial proxy of the
outcome on the outcome → outcome leakage; R-A7 domain condition 2). Therefore:

- **D4 enters the predictor block as LEVELS only**, as a **cross-sectional baseline-vulnerability
  covariate**: *what was the PLR's pre-gentrification demographic composition?* This is the defensible
  predictor reading ("how pre-gentrification is this PLR now"), per R-A5 §5/§8.
- **D4 changes** (Δyouthification, Δlong-tenure) are **early-outcome signals**, not vulnerability
  causes. They are **either** kept on the predictor/early-warning side **and lagged consistently with
  D3** (so the model cannot smuggle a contemporaneous demographic-outcome correlation in as a
  "prediction"; domain condition 3), **or** excluded from the predictor block entirely. They **must
  NOT** be fed into the lead-lag predictor block as a *vulnerability* measure (R-A5 §8 C3). The
  recommended default for R-A1 is **exclude D4 changes from the predictor block**; include only the
  D4 level baseline, and revisit D4-change-as-feature only with the §8 sensitivity analysis
  demonstrating no leakage (domain condition 2 option b).

### 4.2 D4 indicator availability and missingness

- `migration_background_share`: available **≥2017 only** (Mikrozensus definition break; R-A5 §6
  condition 3). Restrict any cross-year D4 comparison involving it to ≥2017; do not back-fill.
- `transferbezug` (MSS SES indicator, if folded into a future SES extension of D4): **null in 2019 and
  2021 editions** (suspended). Treat as **MISSING, not zero** — do not impute, do not include in any
  denominator (R-A4 C3; §7). The populated cross-edition core of the MSS SES battery is just
  `arbeitslose_*` + `kinderarmut_*` (R-A4 §c); use the full 4-indicator set only for single-edition
  2023/2025 fits.
- The five `ewr_composite` inputs are all **vulnerability-positive** after PR #89 (R-A5 §9, Verdict
  PASS) — no per-indicator sign work remains for D4 levels; the composite enters the model with the
  documented common polarity (§5).

### 4.3 Levels-vs-changes divergence (must be resolved here, not just noted)

The 2018 thesis used YoY **changes** of the EWR indicators; D4 uses **levels** (R-A5 §2, §5, §8 C3;
domain condition 2). This R-A1 note **resolves** the divergence by the rule in §4.1: **levels =
baseline vulnerability predictor; changes = early-outcome signal, lagged or excluded.** A change-based
D4 reads "is it gentrifying this year" and must **not** be used as a vulnerability measure in the
lead-lag predictor block. Document this resolution on the G2 page (R-A5 §8 condition 3 carry-forward).

---

## 5. Polarity reference table

All features are oriented **vulnerability-positive** (higher = more gentrifiable / more deprived /
more pre-gentrification). The z-score convention column states the sign applied so that the oriented
feature points the same way before any aggregation (OECD/JRC 2008: common polarity before
aggregation).

| Dim | Variable | Raw measurement direction | z-score / orientation convention | Expected lead-lag contribution | Note |
|---|---|---|---|---|---|
| **D1** | MSS Status-Index `status_index` | `1=hoch` … `4=sehr_niedrig`; **lower numeric = higher status = less deprived** | **FLIP required**: vulnerability-positive `z = −(class − mean)/sd`, i.e. *negative D1 z = more vulnerable*. Treat as **ordinal** — flip is for *orientation reasoning only*; do not metric-average codes (§3). | **Outcome** (not a predictor term). `Δstatus` = ordinal worsening transition. | **INVERSE numeric vs 2018 thesis `status_summe`** (where higher=worse). *Same meaning (deprivation gradient), opposite numeric scale.* Must flip when comparing to 2018 baseline. |
| **D2** | MSS Dynamik-Index `dynamik_index` | `1=positiv` (improving), `2=stabil`, `3=negativ` (worsening); **higher numeric = worsening = more upward-pressure end** | Already vulnerability-positive in numeric order (3=negativ=worsening). Ordinal; confirm ordering first (§3.4). | **Outcome direction** / ready-made `Δstatus` (thesis p. 97). | **Polarity CONTRAST vs raw `indexind *_dynamik`**: a positive raw `*_dynamik` value = rising deprivation rate = *worsening* = the **negativ** end of this class. So `positive *_dynamik` ⇔ `dynamik_index = 3`. Never reuse the `dynamik_index` "positiv=good" sign for the raw `*_dynamik` values (R-A4 C1/C2). |
| **D3** | POI `dynamism_score` (C5-corrected) | z-score of `share_yoy_change` (PLR share-of-city POI delta); higher = faster relative amenity growth | Used **as published** (already z-scored, C5-corrected). For lead-lag, take its **delta**. | **Predictor.** H3b: status change should *precede* this. Must be C5-corrected before entry (§2.4). | Higher D3 = commercial succession signal, the *amenity* face. Predictor, never relabelled "Status"/"Dynamism" outcome. |
| **D3** | POI `status_score` | z-score of `total_poi_count` per year | as published | Predictor (density face); use delta in lead-lag. | Cross-section of POI richness; vulnerable to coverage bias in *levels* — prefer the share-based dynamism for temporal claims. |
| **D4** | `ewr_composite` (mean of 5 z-scores) | higher = more pre-gentrification / vulnerable demographic composition | Already vulnerability-positive (all 5 inputs, R-A5 §9). **Levels only** as baseline covariate (§4). | **Baseline covariate**, *not* contemporaneous predictor. | The single outer negation that existed in the legacy `gentrification_score` is **not** reused here — D4 enters the predictor/baseline block with its native vulnerability-positive sign. |
| **D4 inputs** | `residence_duration_5y_share` | high = long-tenure stable pop | + (vulnerability-positive) | within baseline composite | Canonical Döring–Ulbricht vulnerability marker. |
| | `foreigners_share` | high = pre-gentrification pop | + | within baseline composite | Matches thesis `ea` level polarity. |
| | `migration_background_share` | high = pre-gentrification pop | + | within baseline composite | **≥2017 only** (Mikrozensus break). |
| | `age_under18_share` | high = families/social housing | + | within baseline composite | Vulnerability-positive. |
| | `mean_age_years` | high = ageing settled pop | + (negation removed, PR #89) | within baseline composite | Now agrees in sign with `residence_duration_5y_share`. |

**Worked sign example (D1 vs 2018 thesis):** A PLR with MSS `status_index = 4` (`sehr_niedrig`) is the
**most deprived / most vulnerable**. In vulnerability-positive orientation its D1 z is **most
negative** after the flip `z = −(4 − mean)/sd`. The *same* PLR in the 2018 thesis would have the
**highest** `status_summe`. So 2018-high-`status_summe` ↔ 2021-`status_index = 4` ↔ most-vulnerable —
the **scales are inverted but the meaning is identical**. Any cross-edition or vs-2018 comparison must
apply this flip explicitly or the deprivation gradient reverses silently.

---

## 6. LOR vintage-break handling

### 6.1 Two LOR schemes

- **`lor_pre2021`**: 447 PLR, editions ≤2019 (the 2018 thesis universe; the MSS series 2008–2019 here).
- **`lor_2021`**: 542 PLR, editions 2021+.

The 2017→2021 redistricting changed the PLR universe; **PLR keys are not the same entities across the
break** (R-A3 §b, C4).

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
| `Δamenity` (D3) | `int_poi_status_dynamism` | **D3 is already remapped to the 2021 PLR scheme** (`int_poi_share_base_2021`, feat/63-poi-plr2021-remap); its `share_yoy_change` LAG spans the 2020→2021 boundary *in the 2021 geometry*. For the **pre-2021 outcome series**, D3 must be aggregated back to the 447 universe (via the crosswalk, §6.4) OR the pre-2021 lead-lag uses the matching pre-2021 D3 series. R-A1 must state, per fitted model, which D3 geometry the predictor lives in and ensure it is **coterminous with the D1/D2 outcome geometry** of the same fit. |
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
- Areal weighting assumes within-PLR spatial uniformity of the aggregated quantity — acceptable for
  **counts/shares** at PLR scale, **questionable for the ordinal MSS class** (you cannot areally
  average an ordinal class; for D1/D2 the crosswalk can only carry the *dominant* (max-weight) source
  class, not a weighted blend). Therefore: prefer the crosswalk for **D3/D4 continuous** bridging;
  for **D1/D2 ordinal** bridging use the dominant-weight assignment and flag it as approximate.

The crosswalk is the **secondary** path; the within-vintage default (§6.2) is preferred for all Epic B
directional claims to avoid introducing crosswalk error into the headline result.

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
5. **D4-change features in the vulnerability/baseline block** — excluded by design (§4.1); D4 changes
   may only appear as lagged early-warning features, never as a baseline vulnerability term.
6. **`migration_background_share` pre-2017** — excluded from any cross-year D4 comparison (R-A5 §6).

---

## 8. Sensitivity analysis plan (required by ADR-0008 Decision 4)

The sensitivity analysis is part of the governed definition, **not deferred**. Minimum required suite:

### 8.1 Weight perturbation (geo condition 4a)
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
divergence. Epic B's headline uses the within-vintage result; the crosswalk run is the robustness
check.

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

## 9. Condition-discharge checklist (for the gate)

| Condition | Discharged in |
|---|---|
| R-A7 geo 1 (deltas both sides, spatial-robust) | §2.1, §2.2, §2.3 |
| R-A7 geo 2 (vintage discipline on every delta incl. D3) | §2.5, §6.3 |
| R-A7 geo 3 (confirm Dynamik {1,3,5} ordering) | §1.2, §3.4 |
| R-A7 geo 4 (typology stability + anti-conflation) | §8.1, §8.4, §8.5 |
| R-A7 geo 5 (C5 before lead-lag; MAUP labelling; ordinal within-vintage metrics) | §2.4, §0, §3.3 |
| R-A7 domain 1 (no displacement-event stage names; small-area disclaimer) | §1.3 |
| R-A7 domain 2 (D4 not an outcome proxy) | §4.1, §4.3 |
| R-A7 domain 3 (outcome→predictor headline; no contemporaneous D4 leakage) | §2.1, §4.1 |
| R-A7 domain 4 (carry R-A3 C1–C4, R-A5 cond 3) | §3.4, §3.3, §6, §7, §4.2 |
| R-A3 C1/C2/C3/C4 + R4 | §3.4, §3, §7.1, §6, §1.2 |
| R-A4 C1/C2/C3/C4 | §5 (Dynamik polarity), §4.2, §7.2 |
| R-A5 §8/§9 condition 3 (levels-vs-changes, migration ≥2017) | §4.3, §4.2 |

---

### Sources

- ADR-0008 (`docs/adr/0008-multi-dimensional-gentrification-model.md`).
- Thesis (Helweg 2018): pp. 55–56 (hypotheses), p. 91 (H3b confirmed / H3a rejected), p. 97 (Dynamik =
  change in benefit-recipient share vs. city average), §3.2 (*Gentrifizierung als Prozess*).
- Dangschat (1988) — double invasion-succession cycle.
- Döring & Ulbricht (2016) — Gentrification-Hotspots und Verdrängungsprozesse in Berlin (mobility /
  population-structure indices; stage reading).
- OECD/JRC (2008), *Handbook on Constructing Composite Indicators* — common polarity before
  aggregation; equal-weight baseline as a transparent default to be justified, not asserted.
- Prior Gentriduck methodology: `docs/methodology/indicator-semantics.md` (R-A5, D4 polarity),
  `docs/methodology/R-A3-geo-signoff.md` (MSS C1–C4, R4), `docs/methodology/R-A4-geo-signoff.md`
  (SES dynamik polarity C1/C2), `docs/methodology/R-A7-geo-signoff.md`,
  `docs/methodology/R-A7-domain-signoff.md`, `docs/epic-c/C5-geo-signoff.md` (C5 completeness
  correction).
- `transform/seeds/seed_lor_crosswalk_2006_to_2021.csv` (448-row areal-weighted LOR crosswalk,
  EPSG:25833, ±0.01 tolerance).

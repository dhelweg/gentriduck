# PM + Architect Deep Review — Gentriduck

- **Date:** 2026-06-19
- **Authors:** project-manager + system-architect (deep-thinking pass), with a gentrification-domain lens
- **Scope:** (1) current state, (2) vision & methodology vs. the 2018 thesis and current literature,
  (3) AI-agent orchestration flaws, (4) backlog white-spots, (5) proposed tickets.
- **Method:** read the live dbt models, the original thesis SQL (`reference/system/`), the committed
  E1/E2 analysis, and the thesis PDF directly (`data/raw/mt2018/…`, 197 pp.); cross-checked against
  current gentrification scholarship. Every claim below cites code `file:line` or thesis page.

> **Bottom line.** The engineering is in good shape and ~60 % through the roadmap. But the project has
> drifted from the *meaning* of the thesis it is reviving. The live index conflates "POI activity" with
> "social status", the committed "thesis validation" (E1/E2) tests hypotheses the thesis never made and
> declares them failed, and the single most authoritative open dataset for this exact problem — Berlin's
> **Monitoring Soziale Stadtentwicklung (MSS)**, which the thesis itself used as ground truth — is not
> ingested. These are fixable, and most are not yet on the board. Fix them **before** the public
> methodology page (G2) ships a wrong story.

---

## 1. Current state (confirmed)

- **Roadmap:** Epics A (foundations) and B (2018 revival) largely done; C (OSM POI time-series) mostly
  done incl. the C5 completeness-bias fix; D (price/rent) staged but not in the index; E (analysis)
  scripts committed; F (serving) and G (website) not started; H (multi-city) future.
- **Live index** — [int_gentrification_ts.sql:82-83](../../transform/models/intermediate/int_gentrification_ts.sql#L82-L83):
  `gentrification_score = (status_score + dynamism_score − ewr_composite) / 3.0`, one row per PLR per year.
  - `status_score` = z-score of **POI count** per PLR/year ([int_poi_status_dynamism.sql:94-95](../../transform/models/intermediate/int_poi_status_dynamism.sql#L94-L95)).
  - `dynamism_score` = z-score of **YoY change in the PLR's POI *share*** (C5-normalized) ([int_poi_status_dynamism.sql:99-100](../../transform/models/intermediate/int_poi_status_dynamism.sql#L99-L100)).
  - `ewr_composite` = mean of 5 z-scored **demographic** indicators (foreigners, under-18, migration
    background, mean age (neg.), residence-duration) ([int_ewr_socioeco.sql:159-169](../../transform/models/intermediate/int_ewr_socioeco.sql#L159-L169)), negated in the formula.
- **Quality engineering is genuinely good:** strict coder↔reviewer separation, geo-DS sign-offs on C4/C5,
  local pre-commit gate, city-agnostic `dim_city`/`dim_area`, all-open sourcing. The problems below are
  about *construct validity*, not code hygiene.

---

## 2. Gentrification-expert assessment — the vision & the methodology

### 2.1 What the 2018 thesis actually did (grounded in the PDF)

The thesis ("Untersuchung von Gentrifizierung am Beispiel Berlin mittels Big Data Analytics", Helweg
2018, Univ. Hamburg) is **not** a "POI index" study. Its design (thesis pp. 55-56, 76-77, 91):

- **Outcome variable = social status**, operationalized as Berlin's official **MSS Status-Index** and
  **MSS Dynamik-Index** — built on the **share of welfare/transfer recipients (Leistungsempfänger),
  unemployment (SGB II) and child poverty**. Dynamik is explicitly *"whether an area has a better or
  worse change in its share of benefit recipients than the Berlin average"* (p. 97). A secondary
  socio-economic index is the **Döring & Ulbricht (2016)** gentrification index (income `k11`,
  unemployment-change `dau`, plus *changes* in residence-duration, foreigners, migration background,
  young-adult shares — [reference/system/60_lor_own_idx.sql](../../reference/system/60_lor_own_idx.sql)).
- **POIs are the *predictors*, not the index.** OSM POI features (`stock`, `new`, `ytd`, distance-weighted
  "OA") are used to **predict** the MSS status/dynamik.
- **The real hypotheses (pp. 55-56) are about prediction and *temporal order*:**
  - **H1** current POIs ↔ current social status — **proven** (AUC 0.87); **H1b** fast-food negatively
    correlated with status — confirmed (p. 91).
  - **H2** current POIs → *future* status change — not clearly proven.
  - **H3a** POI change *leads* status change — **rejected**; **H3b** status change *leads* POI change —
    **confirmed**; **H3c** simultaneous — unclear.
  - **Headline finding (p. 91):** *"Die Änderung des sozialen Status scheint **vor** der Änderung der
    Angebotsstruktur stattzufinden"* — **social-status change comes first; the amenity/POI landscape
    follows** (Dangschat's double invasion-succession cycle; possible early-phase gentrification signal).

So the thesis's contribution is a **lead-lag relationship**: cheap OSM amenity data tracks — and lags —
the expensive official social index. Literature backs the design (Venerandi et al. 2015; Hristova et al.
2016 used OSM/Foursquare POIs to predict deprivation/displacement), and also its main caveat: OSM POI
coverage is incomplete and uneven (≈40 % fill vs. commercial ground truth), so completeness bias is real.

### 2.2 What the revival computes instead

The live index **rebuilds "status" and "dynamism" out of POIs** and adds a demographic composite:

| Concept | Thesis (2018) | Revival (live `int_gentrification_ts`) |
|---|---|---|
| **Status** | MSS *social* status = welfare-recipient/unemployment share | **POI count** z-score |
| **Dynamism** | MSS *social* dynamik = change in welfare share vs. city avg | **POI share-change** z-score |
| **Role of POIs** | *Predictors* of social status (with lead-lag testing) | *Are* the status/dynamism |
| **Socio-economic** | income, unemployment, transfer recipients | foreigners, migration, age, tenure (no income/unemployment) |
| **Temporal model** | explicit lead-lag (H3a/b/c) — the core result | none; contemporaneous equal-weight blend |
| **Rent/displacement** | IS24 offering rents as context; displacement framing | not in the index |

### 2.3 Five conceptual divergences (severity-ordered)

1. **Status/Dynamism are redefined from *social* to *POI*.** The revival's `status_score`/`dynamism_score`
   measure POI richness/churn, while the thesis's Status/Dynamik are welfare-based social indices. These
   are different constructs that happen to share names. Equal-weighting POI-status + POI-dynamism − demographics
   ([int_gentrification_ts.sql:82](../../transform/models/intermediate/int_gentrification_ts.sql#L82)) is a new,
   undocumented index, not the thesis's.
2. **The lead-lag structure — the thesis's actual finding — is gone.** A contemporaneous mean cannot express
   "social change precedes amenity change". This is the single biggest loss of fidelity.
3. **No real socio-economic-status variable.** `ewr_composite` is demographic *composition* (foreigners,
   migration background, age, tenure). The thesis's outcome was **welfare-recipient share / unemployment /
   income**, none of which are ingested. Worse, in Berlin several of these demographic variables are
   themselves *correlated with* gentrification (e.g. high foreign-born share in already-gentrified
   Kreuzberg/Neukölln; family in-migration to Prenzlauer Berg), so the composite's sign is not theory-clean.
4. **Indicator-semantics risk.** The revival maps **DAU5/DAU10 → "residence_duration"**
   ([ingest_ewr.py:40-41](../../ingestion/berlin/ewr/ingest_ewr.py#L40-L41)); in the thesis Döring-Ulbricht
   *status* index `dau5/dau10` are negated **alongside income** (treated as deprivation, unemployment-like)
   ([60_lor_own_idx.sql:101-107](../../reference/system/60_lor_own_idx.sql#L101-L107)). The `residence_duration_5y_share`
   sign (recent-arrivals vs. long-tenure) flips the entire indicator and is not pinned to the official EWR
   codebook. `age_under18_share` is used as "vulnerability", but the thesis used *young-adult* (18-45) shares.
5. **Equal 1/3 weighting is asserted, not derived.** The model header itself flags this as needing geo-DS
   confirmation ([int_gentrification_ts.sql:7-12](../../transform/models/intermediate/int_gentrification_ts.sql#L7-L12)); it is still `PENDING`.

### 2.4 The E1/E2 "thesis validation" is misframed (highest priority)

The committed E1/E2 artifacts conclude the thesis **did not** replicate ("1/4 hypotheses match", "3/4
opposite direction"). That conclusion is an artifact of how the test was written, not a finding:

- **Invented expectations.** `THESIS_DIRECTION` is hardcoded to all-"positive"
  ([e1_regressions.py:53-58](../../analysis/e1_regressions.py#L53-L58)) — not derived from the thesis.
- **Docstring ≠ implementation.** The docstring says the thesis tested "dynamism → rent levels" and
  "dynamism ~ foreigners share" ([e1_regressions.py:10-13](../../analysis/e1_regressions.py#L10-L13)); the
  code instead correlates `dynamism_index` with `own_idx` and with `status_index`.
- **No POI features are tested at all.** `status_index` and `dynamism_index` in the golden are the **MSS
  *social*** indices ([stg_thesis_2018_result_plr.sql:25,39](../../transform/models/staging/stg_thesis_2018_result_plr.sql#L25-L39)).
  So E1 correlates **MSS-Status vs. MSS-Dynamik vs. Döring-Ulbricht** — three *social* indices — and uses
  **zero** OSM/POI variables. It cannot validate a POI thesis.
- **The "failed" result is expected by design.** Status and Dynamik are **orthogonal axes** of the Berlin
  MSS model (4 status × 3 dynamik = 12-cell typology, by construction). A weak negative status↔dynamik
  correlation is not a contradiction of the thesis — it is the official model working as intended. And a
  negative dynamism↔current-status correlation is consistent with the rent-gap/frontier idea and with the
  thesis's own lead-lag finding (change concentrates where status is *currently low*).
- **E2** correctly flags its own Task-B leakage, but pegs the "thesis AUC ~0.72" as an *approximate value
  from the thesis narrative* ([E2-classification-findings.md:17](../../docs/epic-e/E2-classification-findings.md#L17));
  the thesis actually reports per-hypothesis AUCs (H1 0.87, H2 0.77, H3a 0.72, H3b 0.81, H3c 0.71, p. 91).

**Risk:** these artifacts are committed and slated to feed the public methodology page (G2, #38). Published
as-is they would tell readers "the 2018 findings don't hold" — the opposite of what a correct test shows.
The geo-DS sign-off on E1/E2 is still *pending*; it must reject the current framing.

### 2.6 Spatial method: distance weighting is *not* in the live pipeline (uncovered)

The thesis used POIs two ways: a hard point-in-polygon assignment **and** a **distance-weighted** variant
— each POI's count spread across nearby PLRs by a centroid-based inverse-distance "Gewichtungsfaktor"
(`sum(anz * dist_weighted)` over a from→to area matrix, [45_osm_poi_features_domain_piv_distcalc.sql:54-57](../../reference/system/45_osm_poi_features_domain_piv_distcalc.sql#L54-L57); thesis Abb. 5-14). It mattered:
the best H1 model (AUC 0.87) ran on distance-weighted data (thesis p. 91).

Status in the revival:
- **Reference (2018) variant:** present but **not recomputed** — `variant='distance_weighted'` is just the
  thesis's precomputed Java-UDF CSV loaded via [stg_thesis_2018_result_plr_distcalc.sql](../../transform/models/staging/stg_thesis_2018_result_plr_distcalc.sql).
- **Live time-series index (the thing we publish):** **not covered.** [int_osm_poi_plr.sql:23-34](../../transform/models/intermediate/int_osm_poi_plr.sql#L23-L34)
  is hard `ST_Within` point-in-polygon, "no buffer is applied"; each POI → exactly one PLR. No decay, no
  spillover, no smoothing. The schema says it "will be reproduced via DuckDB ST_Distance/ST_DWithin (Epic
  B3/C)" — **deferred in a comment, tracked by no open issue.** This is also an O1/O2 case: a methodology
  feature dropped silently rather than via a gated decision.

This sits on top of the **MAUP / edge-effect** problem: arbitrary PLR borders split a continuous amenity
landscape, so a café 10 m across a boundary counts zero for the neighbour. Best practice is to *smooth*
rather than rely on the borders, and to run a *sensitivity analysis* across spatial scales (the thesis's
PLR-and-BZR runs were a good instinct). Free/open options, strongest first:

1. **Do the thesis's idea, better** — the revival has exact POI lon/lat (the thesis only had area IDs), so
   compute point→polygon distance within a bandwidth (`ST_DWithin`), apply a Gaussian/exponential decay,
   and **normalise each POI's weights to sum 1** (conserve total POI mass). Pure DuckDB-spatial; no new dep.
2. **Getis-Ord Gi\*** hotspot detection (PySAL `esda`) — the canonical "hot/cold spot" statistic; far more
   interpretable for the public site and a direct match to Döring & Ulbricht's "Gentrification-Hotspots".
3. **Spatial weights + spatial lag** (`libpysal` kernel/contiguity) — clean neighbour-smoothing of the
   per-PLR amenity variable; integrates with ESDA (Moran's I / LISA).
4. **2SFCA / E2SFCA** if framed as *access to amenities* (accessibility literature standard, Gaussian decay).
5. **H3 hex binning** (DuckDB H3 community extension) as an equal-area unit to sidestep MAUP, then
   areal-interpolate to PLR with **`tobler`** (also reusable for the 2021 LOR crosswalk #51).

Related methods-soundness note: the thesis (and the current E1) use OLS/Weka that ignore **spatial
autocorrelation**, which violates independence and inflates significance. Whatever spatial aggregation we
pick, the validation (A2) should test Moran's I and use spatially-robust inference (`spreg`). New libs
(H3 extension, PySAL: `libpysal`/`esda`/`tobler`/`spreg`) are free/open but trip golden-rule #1/#2 → ADR.
CRS discipline is already correct: the live join projects to EPSG:25833 (ETRS89/UTM33N) for metric distance.

### 2.5 What a defensible modern index should add

- **Re-separate predictors from outcome**, and reinstate the **lead-lag** test (the thesis's core result).
- **Ingest the MSS Status/Dynamik index** (open, current to 2025) as ground-truth outcome **and** a
  back-test target — "does the live score flag the PLRs everyone agrees are gentrifying (Reuterkiez,
  nördl. Neukölln, Prenzlauer Berg)?".
- **Add the displacement/affordability dimension** — gentrification *is* displacement. Open signals:
  Milieuschutzgebiete (social-preservation areas), rent-burden from Mietspiegel, Wohndauer/turnover change.
  Epic D wires *prices*; displacement is still missing.
- **Justify or learn the weights**; document every indicator's definition and sign.

---

## 3. AI-agent orchestration — how the team operates, and where it leaks

The setup is strong: least-privilege tools, a reviewer with **no Edit/Write** (true independent review),
ADR tool-gate, all-open rule, an overnight `claude --print` runner that respects session limits. The
flaws are about **enforcement** — too much of the process is prose an agent "should" follow.

| # | Flaw | Evidence | Severity |
|---|---|---|---|
| O1 | **Methodology gate is advisory, and it leaked.** The geo-DS "gates the merge of methodology-bearing work", but E1/E2 (methodology-bearing) were implemented, written to findings docs, and merged in PR #62 with sign-off "pending" — carrying the §2.4 misframing. | [geo-data-scientist.md:3](../../.claude/agents/geo-data-scientist.md#L3) vs. PM loop "implement → review → (methodology sign-off) → merge" with sign-off **in parentheses** [project-manager.md:14](../../.claude/agents/project-manager.md#L14) | **High** |
| O2 | **No "grounding" requirement for methodology work.** Nothing forces an analysis to cite the thesis/literature section it operationalizes, so `THESIS_DIRECTION` got invented and the coder↔reviewer loop (which checks build/tests/lint/SPEC) had no basis to catch a conceptual error. | §2.4; de-review checks SPEC/gate, not construct validity | **High** |
| O3 | **The analysis layer runs outside the gate.** `analysis/*.py` (E1/E2/E3) are committed with their own `.md` outputs but are not part of `poe build`, have no tests, and write findings as a side effect of a manual run. Wrong results can't be caught by CI. | [e1_regressions.py](../../analysis/e1_regressions.py) writes `OUTPUT_MD`; not in dbt build | **Medium** |
| O4 | **Board/handoff drift.** Handoffs are narrative markdown; the PM relies on manual board moves (handoffs note "board still shows Todo"). No machine-readable state to resume from. | docs/handoff/ narrative files | **Medium** |
| O5 | **Minor hardening gaps.** `git push origin main` is neither in the allow-list nor in `deny` (blocked under `--print`, but promptable interactively); several agent prompts instruct `git -C …`, which is in `deny`. | [settings.local.json:83-97](../../.claude/settings.local.json#L83-L97) | **Low** |

What is **not** broken (correcting earlier impressions): the #51 follow-up **was** filed as **#63**; the
PM merge-only authority and reviewer no-edit rule are deliberate and good; capacity/disk checks exist
(just manual).

---

## 4. Backlog white-spots

Open issues (17) cover serving/website (#33-39), multi-city (#40), cross-vintage continuity (#51/#63),
price/rent (#28/#29/#53/#56), narratives (#32), and a generic temporal-validation/sign-off (#26). Gaps:

- **No issue addresses index *construct validity*** — the §2.3 conflation, the missing lead-lag, the
  weights. #26 is "temporal validation & sign-off" but presumes the current construct is right.
- **No issue to fix/re-run E1/E2** against the real hypotheses; the wrong artifacts just sit there.
- **No issue to ingest the MSS** Status/Dynamik index — the thesis's ground truth and the obvious
  validation target.
- **No real SES indicators** (income/unemployment/transfer-recipient share) — the thesis's outcome.
- **No EWR indicator-semantics audit** (DAU5/DAU10, residence-duration sign, age band).
- **No displacement/affordability dimension** (Milieuschutz, rent-burden, turnover) — distinct from #29's
  price wiring.
- **No back-test / ground-truth harness** for the live index.
- **Process:** no enforced methodology gate (O1), no grounding rule (O2), analysis layer ungated (O3),
  no structured handoff/board sync (O4).
- **Sequencing:** #29 (price into index), #38 (G2 methodology page) and #26 (temporal sign-off) should all
  **depend on** the index re-grounding below, or they will encode the current construct.

---

## 5. Proposed tickets (pitch — full SPECs on greenlight)

Grouped A (methodology/validity), B (data/product), C (agent process). Sizes are rough.

| ID | Title | Why it matters | Owner | Size | Relates to |
|---|---|---|---|---|---|
| **A1** | Re-ground the index spec: separate POI *predictors* from the *social* status/dynamik outcome; restore lead-lag; justify weights | Fixes the core construct drift (§2.1-2.3); keystone the others depend on | geo-DS authors spec → data-engineer | M (spec) | blocks #26,#29,#38 |
| **A2** | Fix & re-run E1/E2 against the real H1-H3c (lead-lag, POI→MSS); correct findings docs | Committed artifacts currently say "thesis failed" — wrong; feeds G2 | geo-DS + data-engineer | M | #30,#31,#38 |
| **A3** | Ingest Berlin MSS (Monitoring Soziale Stadtentwicklung) Status/Dynamik index | The thesis's ground truth & validation target; open, current to 2025 | architect (ADR) → data-engineer | M-L | new |
| **A4** | Add socio-economic-status indicators (transfer-recipient/SGB II / unemployment / income proxy) | The thesis's actual outcome; current composite has none | architect → data-engineer | M | A3, A1 |
| **A5** | EWR indicator-semantics & sign audit (DAU5/DAU10, residence-duration, age band) vs. official codebook | Prevents silent sign errors in `ewr_composite` | geo-DS | S | A1 |
| **A6** | Reproduce distance-weighting in the **live** pipeline + adopt modern spatial methods (distance-decay with mass conservation, Gi\* hotspots, MAUP scale-sensitivity) | §2.6 — dropped silently; the thesis's best model relied on it; "Gentrification-Hotspots" is the natural public output | architect (ADR: H3/PySAL) → data-engineer; geo-DS + domain-expert sign-off | M-L | A1, #51 |
| **B1** | Add displacement & affordability dimension (Milieuschutzgebiete, rent-burden, turnover) | Displacement is the heart of gentrification; absent today | architect → data-engineer | L | #29 |
| **B2** | Ground-truth back-test harness: validate live score vs. MSS classes & known hotspots | "Does the index actually work?" — currently unanswered | geo-DS + data-analyst | M | A3 |
| **C0** | Author a **gentrification-domain expert** agent (urban-sociology/housing-policy) paired with the geo-DS (domain-fidelity ↔ stats); owns theory & indicator choices, per-city data landscape, public methodology/ethics framing | The §2 failures were domain-theory gaps, not stats gaps; geo-DS is a quant-methods role at `effort: low`. Decided 2026-06-19. | architect | S-M | C1,C2,A1,A2,#38,#40 |
| **C1** | Enforce the methodology gate: no merge of index/regression/ML work with geo-DS / domain-expert verdict pending/concerns | O1 — the gate leaked in PR #62 | architect + PM | S-M | C0 |
| **C2** | Grounding rule: methodology work must cite the thesis/literature section it operationalizes; reviewer checks it | O2 — root cause of the E1 misframing | architect (skills) | S | C1 |
| **C3** | Bring `analysis/*.py` under the gate (deterministic, tested, run in `poe build`/CI) | O3 — wrong analysis can't be caught today | data-engineer | M | — |
| **C4** | Structured machine-readable handoff + PM board auto-sync at task close | O4 — drift between sessions | PM | S-M | — |

Quick wins to bundle anywhere: add `git push origin main` to `deny`; stop instructing agents to use the
denied `git -C` (O5).

**Suggested order:** C0 + C1 + C2 first (author the domain agent and make the gate binding — cheap,
prevent recurrence) → A1 → (A2, A5 in parallel) → A3 → A4 → B2 → B1; C3/C4 as capacity allows.
Hold #29/#38/#26 until A1 lands.

**Roster decision (2026-06-19):** keep the geo-data-scientist as the *quantitative-methods* authority
(spatial, leakage, metrics) and add a separate *gentrification-domain* expert (C0). The two pair like
coder↔reviewer — domain-fidelity ↔ statistical-soundness — and both gate methodology-bearing work via
C1. An agent supplies judgement but is not itself a gate, so C1/C2 are required regardless.

## 6. Created issues (2026-06-19)

All pitched tickets were created on the Gentriduck board with full agent-ready SPECs in
`docs/assessment/tickets/`. Mapping:

| ID | Issue | ID | Issue | ID | Issue |
|---|---|---|---|---|---|
| A1 | #64 | A6 | #69 | C1 | #73 |
| A2 | #65 | B1 | #70 | C2 | #74 |
| A3 | #66 | B2 | #71 | C3 | #75 |
| A4 | #67 | C0 | #72 | C4 | #76 |
| A5 | #68 | | | | |

**Focused conceptual upgrade (2026-06-19):** **A7 #77** (ADR-0008 multi-dimensional typology), **A8 #78**
(longitudinal trajectories/stages), **A9 #79** (spatial-dynamic diffusion + spatial inference). Existing
**#64 / #65 / #69** were tightened so the rigor findings — spatial autocorrelation, leakage/nested-CV, and
weight/category sensitivity — are first-class. The 2018 critical assessment is committed at
`docs/assessment/2018-thesis-critical-assessment.md` (no grade); its deferred finding (causal inference, W3)
is tracked as **A10 #80**.

Suggested start: **#72 (C0) + #73 (C1) + #74 (C2)** → **#77 (A7, ADR-0008)** → **#64 (A1)** →
**#65 (A2) + #68 (A5)** → **#66 (A3)** → **#67 (A4)** → **#79 (A9)** → **#78 (A8)** → **#71 (B2)** →
**#70 (B1)**; **#69 (A6)**, **#75 (C3)**, **#76 (C4)** as capacity allows.
Hold #29/#38/#26 until #64 (A1) lands.

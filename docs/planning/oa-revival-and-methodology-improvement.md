# OA (Offering Advantage) Revival + Methodology Improvement — Plan

**Status:** planned (2026-07-07). Working reference for the OA-revival ticket cluster
(Epics B/C/E/G). Grounding verified against `reference/` and the current pipeline during
the planning conversation. Link this doc from every ticket in the cluster.

## Why

The 2018 thesis built its hypotheses on **OA (Offering Advantage)** — a location quotient
measuring how over/under-represented a POI type is in a Planungsraum (PLR) relative to the
whole city (a "footprint"). See `reference/system/70_oa_helper.sql` + `71_oa.sql`:

```
OA(type X, PLR) = ( X_local / Σ all_local ) × ( Σ all_city / X_city )
               = local share of X ÷ city-wide share of X   (classic location quotient)
```

Computed at **3 nested levels**: domain → category → type. The thesis hypotheses use it
directly:

- **H1** (p.55): current OA (`oa_*` columns) ~ current social status.
- **H2** (p.55): lagged OA (`prev_oa_*` columns) → predicts future status change.
- **H3a–c** (p.91): OA-change vs status-change lead/lag.

### The gap in the current revival

- `int_poi_share_base` computes only an **aggregate** area-share of ALL pooled POIs
  (`total_poi_count / city_total`) — type-agnostic. No OA.
- `analysis/e1_regressions.py` re-tests H1–H3c using **raw POI category counts** as a proxy,
  not OA. So today's thesis-check tests a *simplified* construct, not the thesis's own.
- `seed_poi_canonical_category.csv` has a `gentrification_proxy` flag, but it is a 4-row
  stub, carried into `int_osm_poi_harmonized` as `canonical_gentrification_proxy` and then
  **never used downstream** — dead.

### Assets confirmed

- `reference/goldens/20180909_result_full_plr.csv` retains all **170 OA columns**
  (85 `oa_*` + 85 `prev_oa_*`) per PLR → we can validate recomputed OA **directly** against
  the thesis, not only the final index.
- The **3-level taxonomy already exists** (`poi_domain_h` / `poi_category_h` / `poi_type_h`)
  in `int_osm_poi_harmonized` + `int_osm_poi_plr`, but is **flattened to category-only** at
  `fct_poi_development` + `int_poi_features_pivot`. Reviving 3-level OA = re-plumbing dropped
  columns, not inventing a taxonomy (13 domains → 53 categories → types).

## Two workstreams — kept strictly separate

1. **FAITHFUL** — reproduce OA as the thesis defined it (all types, no curation) → redo the
   thesis-check with the real construct. Anchor = 2018 golden.
2. **IMPROVED** — curate *which* POIs count via tiered weights (theory/causality) ×
   data-driven selection (correlation), dropping non-causal correlates. Anchor = 2018
   outcome / MSS.

Merging them would confound "the world changed / OSM differs" vs "we changed the metric."

## POI relevance model (Workstream 2)

Causality-first 2×2:

|                       | correlated w/ outcome     | not correlated              |
|-----------------------|---------------------------|-----------------------------|
| causally plausible    | **KEEP, full tier weight**| keep, low weight, flag      |
| not causally plausible| **DROP (spurious)**       | DROP                        |

Theory sets the tier weight **before** looking at outcomes; data only confirms/calibrates
within tier and can **never** promote a tier-0 type. This is what keeps it non-circular.

> **Note:** "causal" here means *theoretical causal plausibility as a selection filter* —
> NOT causal inference (DiD / event-study). That is a different, deferred effort (issue
> #80, [A10]). Do not conflate.

## Experimental design — three separated result sets

Every mart/analysis row is tagged with a `methodology_variant` discriminator (mirroring the
existing `weight_variant` pattern) so results are **never blended**:

| Run | Methodology | Anchor | Question |
|-----|-------------|--------|----------|
| **1 — Faithful backtest** | OA, all types, thesis semantics, closest-possible | 2018 golden (`oa_*` + H1–H3) | Do the 2018 findings still hold? |
| **2 — Improved** | Curated tiered × data-driven offering signal | 2018 outcome / MSS | Does the refined methodology predict? |
| **3 — Comparison** | Run 1 vs Run 2 (ablation) | each other | How much does the improvement sharpen it? |

## Decisions locked

1. Revive OA at **3 levels** (domain → category → type).
2. **Full** H1–H3c rerun on OA.
3. Compute OA on **both** variants (hard + distance-weighted); geo-DS reassesses **how**,
   and whether the 500 m bandwidth is too narrow (current sweep 250/500/750 m never exceeds
   750 m — extend upward, e.g. 1000/1500 m).
4. **Three separated result sets**; the Evidence.dev site shows the detailed comparison.

## Phased tickets

Created on the board 2026-07-07 as issues **#163–#175**. Dependency spine:

```
P0.1 → P0.2 ──┬─→ A.1 → A.2 ─┬─→ A.3 → A.4 → A.5        (Run 1: faithful, Epic B)
              │              └─→ (A.2 feeds B.2)
              └─→ B.1 ─→ B.2 → B.3                        (Run 2: improved, Epic C)
                          └─→ B.4 (ADR)
                                   A.4 + B.3 → C.1 → C.2   (Run 3: comparison, Epic E/G)
```

| Ticket | Issue | Depends on |
|--------|-------|------------|
| P0.1 geo-DS spike: OA on both variants + bandwidth reassessment | #163 | — |
| P0.2 ADR: revive OA (3-level LQ) + faithful/improved split + `methodology_variant` | #164 | #163 |
| A.1 re-plumb `poi_domain_h` + `poi_type_h` through fact/pivot | #165 | #164 |
| A.2 `int_poi_offering_advantage` — 3-level LQ, both variants (thesis 70/71_oa) | #166 | #163, #164, #165 |
| A.3 carry golden `oa_*`/`prev_oa_*` into staging → direct OA validation | #167 | #166 |
| A.4 rework `e1_regressions.py` H1–H3c to OA / prev-OA predictors; full rerun | #168 | #166, #167 |
| A.5 refresh `web/pages/thesis-recheck.md` with faithful OA results (Run 1) | #169 | #168 |
| B.1 `seed_poi_offering_relevance` (3-level tiers, weights, rationale, `data_corr`) | #170 | #164 |
| B.2 data-driven validation; prune non-causal correlates (2×2); fill `data_corr` | #171 | #166, #170 |
| B.3 weighted offering-advantage → index; `methodology_variant='improved'` | #172 | #170, #171 |
| B.4 ADR: causality-first-with-data-confirmation rule | #173 | #171 |
| C.1 three-way comparison analysis; extend backtest; separated result sets | #174 | #168, #172 |
| C.2 Evidence.dev detailed comparison page | #175 | #174 |

## Gate

Methodology-bearing tickets (A.2, A.3, A.4, B.1, B.2, B.3, and the P0.2/B.4 ADRs) go through
the R-C1 geo-DS + domain-expert gate before integration into `develop`. Every methodology
choice cites the thesis section / source (R-C2) in the model SQL comment.

## Relations to existing open issues

- **#155** (public-framing review of thesis-recheck page): A.5 rewrites that page and C.2
  adds a new comparison page — both should inherit the #155 public-framing sign-off precedent.
- **#82** ([O2] methodology whitepaper): the OA methodology + three-way comparison feed it.
- **#80** ([A10] causal/early-warning, DiD): different sense of "causal" — see note above.
- **#160** ([H-C3] Hamburg annual lead-lag + H3a/H3b re-test): Berlin-first here; a future
  Hamburg OA revival would extend the city-agnostic core, not conflict.

## References

- `reference/system/70_oa_helper.sql`, `71_oa.sql` — OA definition, 3-level.
- `reference/system/80_result_h1_plr.sql`, `80_result_h2_plr.sql` — OA in the hypotheses.
- `reference/goldens/20180909_result_full_plr.csv` — 170 OA golden columns.
- `transform/models/intermediate/int_poi_share_base.sql`, `int_poi_status_dynamism.sql`.
- `transform/models/intermediate/int_poi_features_pivot.sql` — flattening point.
- `transform/models/intermediate/int_osm_poi_plr_weighted.sql` — bandwidth var/sweep.
- `analysis/e1_regressions.py` — current proxy-based re-test.
- `docs/methodology/spatial-methods.md`, `index-definition.md`.
- Thesis pp. 55–56, 91 (hypotheses).

# ADR-0017: POI Offering Advantage (OA) revival — 3-level location quotient, faithful/improved separation, `methodology_variant`

- **Status:** Accepted (R-C1 dual sign-off recorded 2026-07-09 — geo-DS PASS, domain-expert PASS)
- **Date:** 2026-07-09
- **Deciders:** system-architect (author); geo-data-scientist + gentrification-domain-expert (R-C1 gate); maintainer (accept)
- **Issue:** #164 [OA-P0.2]; part of the OA revival cluster #163–#175
- **Supersedes / amends:** none. Extends ADR-0008 (multi-dimensional model), ADR-0010 +
  `docs/methodology/spatial-methods.md` §11 (spatial weighting / OA method), ADR-0005 (city-agnostic
  core). Does **not** change any accepted ADR.
- **Grounding (R-C2):** 2018 thesis OA (`reference/system/70_oa_helper.sql`, `71_oa.sql`;
  thesis pp. 55–56, 91); `docs/planning/oa-revival-and-methodology-improvement.md`;
  `docs/methodology/spatial-methods.md` §11; `docs/epic-b/P0.1-oa-variant-geo-signoff.md`;
  `docs/epic-b/P0.1-oa-variant-domain-signoff.md`.

> This ADR is **methodology-bearing** per CLAUDE.md R-C1 (it touches `docs/adr/**` and fixes the OA
> construct and its experimental design). It therefore requires **both** a `geo-data-scientist` and a
> `gentrification-domain-expert` `Verdict: PASS` before it is integrated into `develop`. The
> system-architect authored it and does **not** sign off on it.

---

## Context

The 2018 thesis built its H1–H3c hypotheses on **Offering Advantage (OA)** — a location quotient (LQ)
measuring how over/under-represented a POI type is in a Planungsraum (PLR) relative to the whole city.
The current revival never reproduced OA: `int_poi_share_base` computes only a **type-agnostic**
aggregate area-share of all pooled POIs, and `analysis/e1_regressions.py` re-tests the hypotheses with
**raw category counts** as a proxy. The 3-level taxonomy exists in `int_osm_poi_harmonized` /
`int_osm_poi_plr` but is flattened to category-only at `int_poi_features_pivot`. So today's
thesis-check tests a *simplified* construct, not the thesis's own (`docs/planning/…` §"The gap").

The OA revival cluster (#163–#175) closes this gap in three separated workstreams. Issue #163 (OA-P0.1)
was a docs-only geo-DS spike that settled the two open **method** questions (how OA composes with the
mass-conserving kernel; whether 500 m is a wide enough catchment) and earned a **dual PASS WITH
CONDITIONS** — geo-DS (`P0.1-oa-variant-geo-signoff.md`, conditions C-1…C-5) and domain-expert
(`P0.1-oa-variant-domain-signoff.md`, conditions D-1…D-3). Those decisions live in
`spatial-methods.md` §11. This ADR (OA-P0.2, #164) is the **architectural decision record** that:

1. revives OA as a 3-level LQ grounded in the thesis SQL;
2. fixes the **faithful vs improved** two-workstream separation as a firm, non-negotiable rule;
3. establishes the `methodology_variant ∈ {faithful, improved}` discriminator, mirroring the existing
   `weight_variant` pattern;
4. incorporates the OA-P0.1 method decision by reference; and
5. records the binding P0.1 conditions (C-1…C-5, D-1…D-3) as requirements on the downstream build
   tickets OA-A.1…OA-C.2 (#165–#175).

It is a decision record, **not** an implementation ticket. It selects no new tool, library, or data
source — OA is computed in the existing DuckDB/dbt stack (ADR-0001) on POI stocks already produced by
ADR-0010's spatial layer. No golden/reference file is modified; the 2018 golden
(`reference/goldens/20180909_result_full_plr.csv`, 170 OA columns) is read-only.

### Constraints this ADR must respect

- **Free + open only; local-first DuckDB; city-agnostic core (ADR-0005).** OA is defined over
  `dim_area` with per-city parameters (taxonomy, bandwidth set, CRS); no Berlin constant enters a
  shared model. Berlin's German taxonomy labels (`d_gastronomie`, `t_kaffee`, …) are a Berlin
  *seed*/mapping detail, not a hard-coded model literal.
- **Epic B framing.** Run 1 is a **directional** revival — exact number-for-number reproduction is not
  required; divergences are documented (CLAUDE.md §Epic B framing).

---

## Decision

### D1 — OA is revived as a 3-level nested location quotient with a parent-relative base

OA is computed at **three nested taxonomy levels** — **domain → category → type** — exactly as in the
thesis (`71_oa.sql`, city reference in `70_oa_helper.sql`; thesis pp. 55–56). The reference base is the
**immediate parent aggregate**, *not* the grand city total at every level:

```
domain X:              OA(X, a) = ( X_a / Σ_d d_a )   / ( X_city / Σ_d d_city )
category c ⊂ domain D: OA(c, a) = ( c_a / D_a )       / ( c_city / D_city )
type t ⊂ domain D:     OA(t, a) = ( t_a / D_a )       / ( t_city / D_city )
```

where `_a` is the stock in PLR `a` and `_city` is the city-wide stock. Confirmed against `71_oa.sql`:
every category/type column divides by its **parent domain** stock (`c_cafe_stock / d_gastronomie_stock`,
`t_restaurant_italiener_stock / d_gastronomie_stock`), and the domain level divides by the all-domains
total; the `70_oa_helper` view supplies the reciprocal city-wide share per level. `OA = 1` means
"represented at exactly the city-wide compositional rate"; `> 1` = over-represented ("offering
advantage"), `< 1` = under-represented (standard LQ — Isard 1960; Miller, Gibson & Wright 1991).

Reviving 3-level OA is **re-plumbing dropped columns, not inventing a taxonomy**: `poi_domain_h` /
`poi_category_h` / `poi_type_h` already exist and are flattened at `int_poi_features_pivot`
(OA-A.1 #165 restores them; OA-A.2 #166 builds `int_poi_offering_advantage`).

### D2 — OA is computed on **both** POI variants; method fixed by `spatial-methods.md` §11

OA is computed on **both** the hard point-in-polygon variant (`int_osm_poi_plr`) and the mass-conserving
Gaussian distance-weighted variant (`int_osm_poi_plr_weighted`), per plan decision 3. The **method** for
composing the LQ with the kernel is fixed by the OA-P0.1 spike and lives in `spatial-methods.md` §11.
This ADR adopts it by reference and restates the load-bearing points (C-3):

1. **Weighted stock first, LQ last.** On the weighted variant, compute `weighted_count` (kernel +
   per-POI mass normalization, already done in `int_osm_poi_plr_weighted`), aggregate up the taxonomy
   within each PLR and city-wide, and form the LQ **last**. Forming per-POI shares before the kernel, or
   smoothing an already-formed ratio, is **prohibited** — `ratio-of-smoothed ≠ smooth-of-ratio`
   (§11.1).
2. **Same-variant weighted denominator, with a proof-carrying invariance.** The city reference
   (`70_oa_helper` analogue) is built from the **same `weighted_count` universe** as the numerator, per
   level and per snapshot year — never a hard-count denominator against a weighted numerator. Because
   the kernel weights `ŵ_ij` sum to 1 per POI and each POI keeps its taxonomy labels, the city-wide
   weighted total per level **equals** the hard-count city total per level. So the OA **denominator is
   invariant across variants**; the kernel smooths only the local numerator. This is an **enforceable
   dbt test** (`Σ_a weighted_count_level = hard city total_level` per year/level, to floating tolerance)
   and the correctness anchor for OA-A.2 (§11.1).
3. **Bandwidth: OA headline = 1000 m; sweep = {500, 1000, 1500} m; hard variant = bandwidth-free
   floor.** 500 m is a pedestrian density-gradient radius, wrong for a retail-offering catchment; OA's
   catchment is the ~1 km neighbourhood/Kiez comparison-goods scale (Reilly 1931; Huff 1964; Berry
   1967; Berlin Kiez form — domain sign-off §2). The {500, 1000, 1500} m sweep is the ADR-0008 §4
   mandatory sensitivity sweep for OA, reported with a 1000 m headline. Encode the bandwidth set as the
   per-city `poi_kernel_bandwidth_m` var (ADR-0005), tagged into `weight_variant`
   (`gaussian_1000m`, `gaussian_1500m`) so OA runs are never blended with the density-layer variants
   (§11.2). The hard `standard` variant is the bandwidth-free floor for the hard-vs-weighted OA
   comparison (§11.3).

`weight_variant` (kernel/bandwidth) and `methodology_variant` (faithful/improved, D4) are **orthogonal**
discriminators and both appear on OA-derived rows; neither is ever collapsed into the other.

### D3 — Faithful and improved are two strictly separate workstreams — never one blended score (firm rule)

The revival runs **two workstreams that must never be blended into a single OA score, index, or result
set**:

1. **FAITHFUL (Run 1, Epic B).** Reproduce OA as the thesis defined it — **all types, no curation**,
   thesis semantics, closest-possible. Anchor = the 2018 golden (`oa_*` + `prev_oa_*`, H1–H3c).
   Question: *do the 2018 findings still hold?*
2. **IMPROVED (Run 2, Epic C).** Curate *which* POI types count via a causality-first tiered weight ×
   data-driven confirmation (the 2×2: keep causally-plausible-and-correlated, drop non-causal
   correlates as spurious; theory sets the tier **before** looking at outcomes and data can never
   promote a tier-0 type). Anchor = the 2018 outcome / MSS. Question: *does the refined methodology
   predict?*
3. **COMPARISON (Run 3, Epic E/G).** Run 1 vs Run 2 ablation — how much the improvement sharpens the
   signal.

**Firm rule (non-negotiable):** the faithful and improved OA numbers are **never** merged into one
score, averaged, or displayed as a single figure. Merging them would confound *"the world changed / OSM
differs"* (Run 1's question) with *"we changed the metric"* (Run 2's question) — the exact confound the
separation exists to prevent (`docs/planning/…` §"Two workstreams"). The site shows the **comparison**
(Run 3), never a blend. The causal-tier curation of Run 2 (issues #170/#171, ADR to follow as OA-B.4
#173) is the **only** mechanism for dropping/weighting types and must not be short-circuited into Run 1
(domain condition D-2). "Causal" here means *theoretical causal-plausibility as a selection filter*, not
causal inference (DiD/event-study, #80 [A10]) — do not conflate.

### D4 — `methodology_variant ∈ {faithful, improved}` discriminator (mirrors `weight_variant`)

Every OA-derived mart / analysis output row carries a **`methodology_variant`** column with domain
`∈ {faithful, improved}`, mirroring the existing `weight_variant` discriminator pattern
(`int_osm_poi_plr_weighted`, `transform/models/intermediate/schema.yml` — `weight_variant`
`∈ {standard, gaussian_500m, gaussian_1000m, …}` tags each kernel/bandwidth run so MAUP-sweep variants
are never blended). `methodology_variant` does the same for the workstream split:

- it is part of the **grain** (a component of the unique key / `dbt_utils.unique_combination_of_columns`
  test) on every OA mart, exactly as `weight_variant` is on `int_osm_poi_plr_weighted`;
- it is **enumerated** and tested (`accepted_values: [faithful, improved]`);
- it is **orthogonal** to `weight_variant`; a fully-qualified OA observation is keyed on
  `(city_code, snapshot_year, area_code, area_vintage, poi_domain_h, poi_category_h, poi_type_h,
  weight_variant, methodology_variant)`;
- Run 3 (comparison) is a **derived** contrast of the `faithful` and `improved` rows, not a third
  enumerated value — no `combined`/`blended` value exists, which is the schema-level enforcement of D3.

This makes the "never blend" rule a **structural invariant** (a discriminator + accepted-values test),
not a convention a downstream author could forget.

### D5 — Binding P0.1 conditions carried onto the downstream build tickets

The dual P0.1 sign-off attached ten binding conditions. This ADR records them as **requirements on the
OA build/analysis/publication tickets** (the R-C1 gate re-checks each on its owning ticket before that
ticket integrates into `develop`):

| # | Condition | Binds | Requirement |
|---|-----------|-------|-------------|
| **C-1** | Mass-leakage guard + invariance test | OA-A.2 #166 (**blocking**) | Any POI with a zero in-bandwidth weight sum falls back to its hard home PLR (`hard_area_code`) at weight 1; ship the §11.1 invariance dbt test (`Σ_a weighted_count_level = hard city total_level`) as its proof. Blocking on **cross-time (H3) and cross-city (ADR-0005) comparability**, not only mass conservation (domain §3). |
| **C-2** | Category-differential OSM completeness / tag-schema-drift caveat | OA-A.4 #168, C.1 #174, G2 page | The lagged `prev_oa_*` predictors carry a tag-maturation caveat the cross-sectional `oa_*` do not; a `prev_oa_*` lead driven by tag maturation is a **false-positive gentrification lead**. Do not read an attenuated *or* an inflated lagged-OA effect at face value. |
| **C-3** | ADR records the locked decisions | **this ADR** | Discharged here: parent-relative nested LQ (D1), weight-first/LQ-last + same-variant weighted denominator + invariance (D2), {500,1000,1500} m sweep with 1000 m headline + hard floor (D2.3). |
| **C-4** | Bandwidth-fragility publish gate | OA-C.1 #174, G2 page | Report the cross-bandwidth OA rank correlation; if OA rankings are bandwidth-fragile the G2 page must flag OA as bandwidth-sensitive (mirrors the §7 r > 0.7 MAUP publish gate). Treat fragility as a **substantive finding** about the spatial grain of succession, not merely a caveat. |
| **C-5** | Domain co-sign on the P0.1 spike | — | **Satisfied** by `P0.1-oa-variant-domain-signoff.md` (PASS WITH CONDITIONS). |
| **D-1** | Ethics / framing | G2 methodology page, O2 whitepaper #82, A.5 #169 | OA is a **descriptive** indicator of commercial change consistent with *early* gentrification — **not** a causal displacement predictor or a "up-and-coming Kiez" targeting signal. Public framing states descriptive-vs-causal explicitly, foregrounds the resident-vs-investor power asymmetry (rent-gap logic; Smith 1979), and names the isotropic-catchment + OSM-completeness simplifications. Inherit the #155 public-framing precedent. |
| **D-2** | No summing raw OA / respect per-type sign | OA-A.4 #168, B.1/B.2 #170/#171, C.1 #174 | OA is a **multi-signed bundle**: amenity types, vacancy/rent-gap markers (`d_leerstand` — a *disinvestment* signal, opposite pole from amenity-OA), and incumbent-serving/sign-neutral types coexist. **No summing of raw OA columns into a single "how gentrified" score**; per-type sign is respected; the Workstream-2 causal-tier curation (D3) is the only place types are dropped/weighted. |
| **D-3** | Minimum-POI-base flag | OA-C.1/G2 (advisory) | The compositional LQ is unstable in low-POI PLRs (a single POI can swing a type's local share). Apply a minimum-POI-base flag/suppression for OA in thinly-mapped PLRs before any per-PLR public display. |

D5 does not re-litigate these — the R-C1 gate already accepted them at P0.1. This ADR pins them to their
owning tickets so the PM's pre-integration check has an authoritative reference.

---

## Consequences

**Positive**

- The thesis-check finally tests the **thesis's own construct** (OA), not a raw-count proxy, and can be
  validated **directly** against the 170 golden OA columns (`reference/goldens/…`) rather than only the
  final index.
- The faithful/improved separation is enforced **structurally** (a `methodology_variant` discriminator +
  accepted-values test with no blend value), so the two questions ("world changed" vs "metric changed")
  cannot be silently conflated.
- The mass-conservation invariance (D2.2) gives OA-A.2 a hard equality test and makes the hard-vs-weighted
  comparison a clean numerator-only contrast.
- OA is city-agnostic (ADR-0005): taxonomy and bandwidth set are per-city parameters, so a future Hamburg
  OA revival (#160) extends the core rather than forking it.
- No new tool, library, or data source; no golden modified. Pure DuckDB/dbt + the existing spatial layer.

**Negative / accepted trade-offs**

- OA is a **multi-signed bundle**, easy to misread as a monotone gentrification score; mitigated by D-2
  (no raw summing) and the deferred Workstream-2 curation.
- OA carries a **category-differential OSM completeness / tag-drift** caveat on the lagged predictors
  (C-2) that can manufacture a false-positive lead if ignored.
- Finite-bandwidth **mass leakage** in large low-density PLRs must be guarded (C-1) or OA there is biased
  and cross-time/cross-city comparability breaks.
- OA is **bandwidth-sensitive by construction** (widening washes the signal toward the city mean); the
  {500,1000,1500} m sweep + 1000 m headline + C-4 publish gate manage but do not remove this.
- OA has an **ethics/misuse surface** (D-1): an over/under-representation retail map can be misused for
  speculative targeting; public framing must be descriptive and power-aware.
- Reviving 3 levels re-plumbs columns dropped at `int_poi_features_pivot`, adding taxonomy-carrying
  complexity to the fact/pivot layer (OA-A.1 #165).

**Follow-ups (owned by later tickets, not this ADR)**

- OA-A.1…A.5 (#165–#169) — faithful Run 1 build, golden validation, H1–H3c rerun, site refresh.
- OA-B.1…B.4 (#170–#173) — improved Run 2: `seed_poi_offering_relevance`, data-driven pruning,
  weighted index, and the **causality-first-with-data-confirmation ADR (OA-B.4 #173)** that formalizes
  the Workstream-2 tier rule.
- OA-C.1…C.2 (#174–#175) — Run 3 three-way comparison + Evidence.dev page.
- Each methodology-bearing ticket re-enters the R-C1 gate on its own branch (plan §Gate).

---

## Sources

- 2018 thesis (Helweg 2018), pp. 55–56, 91; `reference/system/70_oa_helper.sql`, `71_oa.sql`,
  `80_result_h1_plr.sql`, `80_result_h2_plr.sql`; `reference/goldens/20180909_result_full_plr.csv`.
- `docs/planning/oa-revival-and-methodology-improvement.md` (workstream split, run matrix, ticket spine).
- `docs/methodology/spatial-methods.md` §11 (§11.1 method, §11.2 bandwidth, §11.3 leakage guard,
  §11.4 discharge); `docs/epic-b/P0.1-oa-variant-geo-signoff.md` (C-1…C-5);
  `docs/epic-b/P0.1-oa-variant-domain-signoff.md` (D-1…D-3).
- ADR-0005 (city-agnostic core), ADR-0008 §4–§5 (mandatory sensitivity; completeness correction),
  ADR-0010 + `int_osm_poi_plr_weighted` (`weight_variant` pattern this ADR mirrors).
- Isard (1960), *Methods of Regional Analysis*; Miller, Gibson & Wright (1991), *Location Quotient*
  — LQ definition/interpretation. Reilly (1931); Huff (1964); Berry (1967) — retail catchment scale.
  Smith (1979), rent-gap theory; Zukin (2009), *Naked City*; Lees/Slater/Wyly (2008), *Gentrification*;
  Dangschat (1988) invasion-succession — commercial/retail gentrification framing.

---

## R-C1 sign-off (required before integration into `develop`)

- **geo-data-scientist:** PASS — `docs/epic-b/P0.2-oa-adr-geo-signoff.md`.
- **gentrification-domain-expert:** PASS — `docs/epic-b/P0.2-oa-adr-domain-signoff.md`.

*Both R-C1 verdicts are `PASS`; the PM integrated this ADR into `develop` per ADR-0011 self-integration
authority (no new tool/library/data-source introduced, so no separate maintainer approval is required
beyond the R-C1 gate). The system-architect authored this ADR and did not sign it off.*

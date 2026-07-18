# OA calculation modes, area hierarchy & within-group dominance — research-fragment epic

- **Status:** In progress — D0-D6 implemented and merged to `develop` (see #240); D7 (methodology page +
  reference docs) is the remaining build item. Restored to `develop` 2026-07-17 (was previously only on
  the scoping branch `claude/oa-calculation-rbay9g`, leaving referencing links in ADR-0024 and the
  OA-D0/D2/D3/D4/D5 sign-offs dangling on `develop`) — no content changed from the original scoping pass.
- **Date:** 2026-07-11
- **Requested by:** maintainer (direct instruction — authoritative, not untrusted input)
- **Scoped by:** system-architect, geo-data-scientist, gentrification-domain-expert, data-engineer,
  data-analyst, web-engineer (expert inputs gathered 2026-07-11)
- **Extends:** ADR-0017 (OA revival), ADR-0018 (causal-tiered POI selection), ADR-0005 (city-agnostic
  core), `docs/methodology/spatial-methods.md` §7 (MAUP gate) + §11 (OA construct)
- **Precedent doc:** `docs/planning/oa-revival-and-methodology-improvement.md` (this is its sequel — that
  doc spawned the #163–175 revival cluster; this one scopes the "OA-D" methods cluster)

---

## Why (problem)

Today the Offering Advantage (OA) is computed exactly one way: a 3-level nested location quotient
(domain→category→type, each divided by its parent), at PLR grain (Berlin) / subarea_l2 (Hamburg), in
two `weight_variant`s (hard `standard` + `gaussian_*`) and one populated `methodology_variant`
(`faithful`). See `transform/models/intermediate/int_poi_offering_advantage.sql`.

But **OA is not one number — it is a family of measurements along independent axes**, and *the choice of
method changes the interpretation more than any parameter does*. A parent-relative LQ, a city-relative
LQ, a raw within-group share, and a within-group concentration index answer **different questions**, and
reading one as if it were another is a category error. The maintainer wants this made explicit,
implemented in full, compared as a study, and documented on a dedicated page — plus two capabilities we
don't have yet: **OA at multiple spatial scales** (the area hierarchy) and a **within-group dominance**
metric ("are restaurants or fast-food stores dominating *within* gastronomy?"). Both the POI taxonomy
and the area hierarchy also need first-class documentation.

This is a **research fragment in its own right**: the deliverable is not "one better OA" but a
characterised map of *which mode answers which question, how well, and where each breaks*.

## Goals (mapped to the maintainer's asks)

1. **Dedicated methodology page** — a standalone, cross-city page on OA modes, scales, and
   interpretation. *(→ OA-D7)*
2. **Step back: assess the different ways to calculate OA, with pros/cons.** *(→ this doc §"Method
   survey"; ADR OA-D0)*
3. **A study of which methods work well and why.** *(→ OA-D5 comparison study)*
4. **Explain which OA mode answers which question** — the interpretation guide. *(→ this doc
   §"Interpretation by question"; OA-D7)*
5. **Implement all modes + a comparison study.** *(→ OA-D2/D3/D4/D5)*
6. **Check reusability for Hamburg and other cities.** *(→ OA-D1b, D8; §"City reusability")*
7. **New dimension: within-group composition/dominance** (restaurants vs fast food within gastronomy).
   *(→ OA-D4)*
8. **Document the POI hierarchy and the area hierarchy** (both matter). *(→ OA-D7 reference pages;
   this doc §"The two hierarchies")*

## The mental model: four+ independent axes

Any OA figure is a point in this space; the page and the mart must always **label which point**:

| Axis | Values | Status |
|---|---|---|
| **Taxonomy level** | domain · category · type | exists (`oa_domain/category/type`) |
| **Spatial weighting** (`weight_variant`) | `standard` (hard) · `gaussian_{500,1000,1500}m` | exists |
| **Curation** (`methodology_variant`) | `faithful` · `improved` | `improved` reserved, not yet populated |
| **Spatial scale** (`area_level`) — **NEW** | Berlin: plr · bzr · pgr · bezirk · Hamburg: subarea_l2 · subarea_l1 · district | **to build** |
| **Calculation method** — **NEW** | nested-LQ (canonical) · global-LQ · log-LQ · share-diff · shrunk-LQ · raw within-group share | **to build** |
| **Within-group dominance** — **NEW, separate construct** | HHI · top-share · entropy · evenness | **to build (own model)** |

These axes are **orthogonal and must never be blended into one score** — the ADR-0017 D3 "never blend"
firm rule and the D-2 "multi-signed bundle, don't sum" rule both extend to every new axis here.

---

## Method survey — the different ways to calculate OA (pros / cons)

Notation: for a POI node `g` (with parent `P`) in area `a`: local within-parent share
`s_a = n(a,g)/n(a,P)`; city share `s_city = n(·,g)/n(·,P)`. All are functions of the *same* window-summed
stocks already computed in `int_poi_offering_advantage.sql`, so most are additive columns, not a new
pipeline.

| Method | Formula (per level) | Question it answers | Pros | Cons |
|---|---|---|---|---|
| **Nested LQ** *(current, canonical)* | `s_a / s_city` (÷ parent taxonomy branch) | Over/under-representation of a *form within its function* vs the city | Thesis-faithful (only mode backtestable against the 170 golden cols); unit-free, `=1` interpretable; **invariant to uniform OSM-coverage scaling** → most completeness-robust; composes with the kernel (C-1) | Multi-signed bundle (never sum); low-base unstable (D-3); no natural variance for significance |
| **Global / city LQ** | `(n_a/AllPOI_a)/(n_city/AllPOI_city)` (÷ grand total everywhere) | Type's weight in the *whole* local offering vs city (re-introduces density/centrality) | Textbook LQ; one consistent denominator → cross-level comparable; simple to explain | **Not** the thesis construct (no golden fidelity); confounds "lots of commerce here" with "café-skewed here"; correlates with centrality/tourism |
| **Raw within-group share** | `s_a = n_a/P_a` | Actual local composition ("40% of this Kiez's gastronomy is cafés") | Most directly legible; no city-reference instability; the input to dominance | **Not comparable over time / across cities** (a citywide café boom lifts every area); no "expected" baseline |
| **Within-group dominance** | HHI `Σ p_i²`, top-share `max p_i`, entropy `−Σ p_i ln p_i`, evenness `H/ln k` | Is the group a **monoculture or diverse**, and is that changing? (the maintainer's new axis) | Genuinely new axis, orthogonal to LQ; coarser grain → far more low-base robust; established indices (Shannon, Herfindahl-Hirschman, Simpson, Theil) | **Sign-blind** — can't tell up-market from down-market monoculture without the top-share type's sign; taxonomy-granularity/tag-drift sensitive |
| **Log-LQ** | `ln(nested LQ)` | Same as nested but **symmetric/additive** | Correct scale for averaging, mapping, regression (0.5 and 2.0 become ±ln2) | Undefined at 0 (use `log1p`/offset); not the golden-fidelity form |
| **Share-diff (shift-share)** | `s_a − s_city` (pp), or residual `(n_a−E_a)/√E_a` | **Absolute/magnitude-aware** compositional shift; "did local café growth beat the citywide trend?" | Additive; magnitude-aware (an LQ of 3 on 2 POIs ≠ on 200); √E stabilises variance; decomposable over time | Not unit-free/`=1`-centred; χ² independence only approximate under spatial autocorrelation |
| **Shrunk-LQ (empirical Bayes)** | EB-shrink `s_a` toward the citywide Beta prior, then ÷ `s_city` | Representation **corrected for small-sample noise** (operationalises D-3) | Principled cure for low-base instability; shrinks thin PLRs toward city mean by ∝1/base | Introduces a prior (must be transparent, fitted citywide-per-year); shifts values → never the golden mode |
| *(analysis-layer only)* z-score / binomial-SLQ, Getis-Ord Gi\* on OA, rank/percentile, density-per-area / per-capita | — | significance / spatial clustering / cross-city ranking / provision | base-aware, cluster-aware, scale-free | density re-opens MAUP hard; keep these in `analysis/*.py`, not the mart |

**Recommended implement set (core):** keep **nested-LQ canonical**; add **global-LQ, log-LQ, share-diff,
shrunk-LQ**, and the **raw within-group share** as columns; build the **dominance family** as a separate
model. Treat z-score / shift-share-decomposition / Getis-Ord / density as **analysis-layer** study
outputs, not published mart columns (they re-open MAUP or need EWR/population joins). *This set is a
maintainer decision — see Open decisions.*

### Which methods work well, and why

- **The uniform-coverage invariance is load-bearing.** It is why nested-LQ, global-LQ, log/EB-on-shares,
  and rank-of-LQ survive OSM completeness growth over time, and why **raw share and density do not**.
  This is the single most important discriminator for *temporal* validity.
- **Trustworthiness by comparison type:**
  - *Cross-area (one year):* nested-LQ, global-LQ, dominance (evenness), binomial-SLQ, rank — trustworthy.
    Raw share & density — fragile (no baseline / MAUP).
  - *Over-time:* nested-LQ (coverage-invariant), share-diff, log/EB, rank-of-LQ — trustworthy. Dominance
    — watch taxonomy/tag-drift. Raw share & density — **avoid** (coverage confounds directly, C-2).
  - *Cross-city:* rank/percentile, z/SLQ, evenness (k-normalised) — trustworthy. LQ — taxonomy-coverage
    caveats. Raw share & density — avoid (city-size/area-definition differences).
- **Low-POI-base (D-3) is the dominant fragility.** Most→least robust: dominance-at-parent-grain and
  base-encoding modes (share-diff, binomial-SLQ, EB) → nested/global LQ → naïve share. Ship share-diff /
  EB as the **base-hardened companions** of the canonical LQ, and a `min_parent_base` gate.
- **Every mode owes the publish gates:** the §7 MAUP r>0.7 rank check (now per mode *and* per area_level)
  and the C-4 bandwidth-fragility check (widening the kernel washes *every* mode toward the city mean).

---

## The area-hierarchy dimension (`area_level`)

Berlin LOR codes are strictly hierarchical — **8-digit PLR ⊃ 6-digit BZR ⊃ 4-digit PGR ⊃ 2-digit
Bezirk** — and coarser levels are **pure string-prefixes** of the PLR code (verified: `stg_berlin_lor`
filters `^\d{8}$`, `stg_berlin_lor_bzr` filters `^\d{6}$`). So OA at any coarser scale needs **no
geometry** — just aggregate child areas by `substr()`.

**Two hard correctness rules (blocking):**

1. **Roll up the *stocks*, then form the LQ last — never average child LQs.** A ratio/non-linear
   statistic is not the mean of its sub-area ratios (Simpson's paradox / Jensen's inequality). Sum the
   underlying `*_stock` columns up the prefix, then re-divide. The same rule governs HHI/entropy.
2. **City-wide denominators are level-invariant — compute them once from the finest level and broadcast
   (join), never re-window over the unioned roll-up.** Window-summing over rows that now exist at 4
   levels would count each POI 4× and silently break `OA=1 ⇒ average` and the C-1 invariance.

Roll up **within a single `area_vintage`** — prefix nesting holds inside `lor_pre2021` / `lor_2021`, not
across the 2021 reform; cross-vintage still goes through `int_berlin_lor_crosswalk_dominant_2021`.

**The seam (city-agnostic, ADR-0005):** do *not* put `substr()` in a shared model. This work finally
populates `dim_area.parent_area_code` (explicitly deferred today — see `dim_area.sql` line 30). Berlin's
prefix derivation lives in the Berlin adapter; the shared roll-up joins `parent_area_code` generically.

**Known gaps (must be disclosed, not papered over):**
- **PGR is a missing rung.** No PGR staging model, no PGR geometry, no PGR codes in `dim_area` today.
  OA *values* are prefix-derivable (`substr(...,1,4)`), but there is **no polygon** → no PGR choropleth
  and NULL `area_km2`/density until a separate ingestion lands.
- **Bezirk has no dissolved geometry.** OA values roll up fine; a Bezirk map needs a new
  `export_area_geojson.py` variant (dissolve PLR/BZR → 12 Bezirk polygons).
- **Hamburg does NOT prefix-nest** (confirmed: `statgebiet` has `parent_prop: None` in
  `ingest_hamburg_geo.py`; where a parent code exists it's a different code space, not a digit prefix).
  Hamburg needs its `parent_area_code` wired from a WFS attribute if one exists, else a
  `ST_Within(centroid, parent_geom)` spatial crosswalk — itself methodology-bearing (ADR-0005 addendum).

**Interpretation by scale** (domain-expert): PLR = Kiez succession front (but D-3 unstable, highest
misuse risk); **BZR = recommended public headline scale** (stabler, less identifying); PGR = coarse
planning aggregate; Bezirk = borough/policy context (but ecological-fallacy — a borough reading says
nothing about a Kiez within it). Report a **cross-scale rank correlation**; treat scale-rank flips as a
*substantive finding about the spatial grain of succession* (mirror the C-4 gate), not a footnote. Frame
`area_level` as an explicit **resolution-vs-stability dial** — which also partly answers the D-3 caveat.

---

## The within-group dominance dimension (NEW construct)

"Are restaurants vs fast food dominating *within* gastronomy" is an **intra-area, intra-parent
concentration** measure — a *different construct* from OA (which compares the area to the city). Bundling
it into `oa_*` invites exactly the D-2 confusion, so it gets its **own model**
(`int_poi_within_group_dominance.sql` + mart), at **parent grain** (one row per parent node per area),
carrying `hhi`, `top_share`, `entropy`, `evenness` (=entropy/ln k, normalises taxonomy size),
`top_child`, `n_children`.

**Correctness pitfall (DE):** category-within-domain dominance cannot be computed at leaf (type) grain —
each category has many type rows, so squaring at leaf multi-counts. Dedup to category grain first, then
compute shares/HHI/entropy, then broadcast. Type-within-domain is leaf-safe.

**Interpretation (domain-expert) — the "quality ladder":** within a function, forms sit on a
cultural/price ladder (Gastronomy: Imbiss/fast-food → sit-down → café/specialty-coffee). A mix shifting
**up** = up-market succession / "boutique-ification" (Zukin 2009) — early-to-mid commercial
gentrification. Shifting **down** is *not* symmetric: it can be **disinvestment** (rent-gap trough,
Smith) **or** **studentification** — direction alone is ambiguous and must be read with vacancy dynamics
and the social-status outcome.

**Rules baked into acceptance criteria:**
- Dominance is **sign-blind** → always report it **with the signed top-share type** (tier from
  `seed_poi_offering_relevance.csv`); never a cross-domain scalar; never folded into the LQ or a composite
  (D-2 at the dominance layer).
- Compute **only for domains with a meaningful internal signal**: Gastronomy, Retail (at category grain),
  Entertainment; partial Services (wellness only). **Exclude** Vacancy/Leerstand (single-category — its
  signal is the domain-level OA + Δ) and infrastructure domains (Mobility, Public Service, Religion,
  Office, Public Space).
- **Own ethics framing** — HHI carries an antitrust/market-concentration connotation distinct from OA's
  D-1/D-2; it needs its own descriptive-not-causal statement, not inherited language.

---

## Interpretation by question (the page's payoff)

| Research question | Mode(s) that answer it | Modes that CANNOT |
|---|---|---|
| "Is type g over/under-represented vs the citywide mix here?" (thesis H1–H3) | nested-LQ; global-LQ | raw share, dominance, density |
| "Do the 2018 findings still hold?" (Epic B directional) | **nested-LQ only** (golden-anchored) | all others (not the construct) |
| **"Are restaurants vs fast food dominating *within* gastronomy?"** | dominance (HHI/top-share/evenness) **paired with per-type LQ for direction** | LQ alone (says *whether* over-rep, not the internal mix) |
| "Did local café growth beat the citywide café trend?" (temporal, magnitude-aware) | share-diff; log-LQ change | nested-LQ alone (ratio hides magnitude); raw share, density (coverage-confounded) |
| "Is this over-representation real given a thin base?" | binomial-SLQ; EB-shrunk LQ | nested-LQ, raw share (no base-awareness) |
| "How does this Kiez rank vs all others / vs another city?" | rank/percentile; z-score | raw share, density (scale/size-dependent) |
| "How many cafés per resident / per km²?" (provision) | density / per-capita | LQ-family (compositional, not absolute) |
| "Where does café-dominance cluster spatially?" | Getis-Ord Gi\* on LQ or dominance | aspatial modes alone |
| "Monoculture or diverse street ecology, and maturing?" | dominance (entropy/evenness) + Δ | LQ (says representation, not concentration) |

Directional/sign meaning (amenity vs disinvestment `d_leerstand`; up- vs down-market monoculture) is the
domain expert's remit — dominance is sign-blind and must be paired, never read alone.

---

## The comparison study (which methods work well, and why — empirically)

**Design:** mode set × `area_level` {PLR, BZR (+PGR/Bezirk)} × `weight_variant` {standard, gaussian_1000m
headline, +500/1500 sweep} × `snapshot_year` (earliest + latest for the temporal read). Hold
`methodology_variant='faithful'` (never blend faithful/improved — D3).

**Agreement / sensitivity metrics (reuse the existing gate discipline):**
1. **Cross-mode Spearman ρ matrix** — expect nested-LQ ≈ global-LQ high at domain level, nested-LQ vs
   share-diff/EB high (same signal, base-hardened), and **nested-LQ vs dominance LOW** — a low
   correlation here is the *evidence the new axis adds information*, not noise.
2. **Sign-agreement rate** between LQ and its base-hardened variants — disagreements should concentrate
   in low-base areas (that *is* the D-3 diagnostic).
3. **MAUP rank correlation, r>0.7 gate** (§7) — PLR-derived vs BZR-derived ranking, **per mode**; flag
   sub-0.7 modes as scale-fragile on the page.
4. **Bandwidth rank correlation (C-4 gate)** — cross-{500,1000,1500}m Spearman per mode.
5. **Completeness-contamination test** — correlate each mode's per-area Δ(earliest→latest) with a
   coverage-growth proxy (Δ total POI count); modes whose temporal change tracks coverage are
   temporal-unsafe (expect raw share & density to fail, nested-LQ/log/EB/rank to pass). This turns the
   C-2 caveat into a *pass/fail test*.
6. **Low-base sensitivity curve** — stratify agreement/variance by parent-base decile; show share-diff /
   binomial-SLQ / EB flatten the variance-vs-base curve the naïve LQ/share exhibit.

**Golden validation:** **only nested-LQ** is validated against `reference/goldens/20180909_result_full_plr.csv`
(directional Spearman per the A3 finding, Epic-B framing; sparse-vs-dense reindex first). Modes b–h are
**new instruments** — validated by *orthogonality* (metric 1) and *robustness* (metrics 5–6), not by
golden agreement. Say this explicitly on the page.

**What "good" looks like:** nested-LQ clears its golden bar + C-1 at every level/variant; dominance shows
low ρ with LQ (adds a new axis) yet high internal coherence (HHI vs 1−Simpson perfectly anti-correlated);
base-hardened modes agree with LQ at high base and diverge exactly where base is low; coverage-contaminated
modes visibly fail metric 5; every published mode clears MAUP + bandwidth gates or is flagged.

---

## The two hierarchies (documentation deliverable)

**POI taxonomy — domain → category → type.** Worked example: Gastronomy → Restaurant → Italian. Source:
`seed_poi_thesis_taxonomy_crosswalk.csv` (note: the seed currently populates domain+category rows only;
the *type* level must be sourced from the OSM-tag mapping / `int_osm_poi_harmonized` labels — flag this
gap). Include the recorded translation caveat (`Handwerk`→Hardware, `Werkstatt`→Workshop). Remember: for
OA, **type nests under *domain*, not category** (ADR-0017 D1) — a genuine quirk the docs must state.

**Area hierarchy — Bezirk → PGR → BZR → PLR (Berlin) / District → Subarea L1 → Subarea L2 (Hamburg).**
Worked example: take one 8-digit PLR code and show the prefix-containment chain up to its 2-digit Bezirk.
State plainly which levels are **queryable today** (plr, bzr for Berlin; all three for Hamburg) vs
**prefix-derivable only** (pgr, bezirk for Berlin — no geometry yet).

**Presentation (data-analyst):** short "vocabulary" sections inline on the OA-modes page + full
drill-down on a reference page (e.g. `/reference/hierarchies`), mirroring the site's existing
"plain-language page + full versioned reference" split. Static tables/breadcrumbs suffice; an interactive
tree/treemap is a nice-to-have (treemap needs the ECharts escape hatch — already an in-use dependency,
so no new-tool ADR, but confirm with the architect before adding a bespoke component).

---

## City reusability

The LQ math is city-agnostic (ADR-0005); the **interpretation is only partly portable**:
- **Portable:** the nested-LQ construct, lead-lag logic, descriptive-not-causal framing, the OSM input
  side, and the mode×question table.
- **Not portable without per-city work:** the within-group **quality ladder is culturally specific**
  (Berlin's Imbiss/Späti↔café ordering ≠ Hamburg/Paris/US) → re-author the ADR-0018 Step-1 theory tiering
  per city, never port `seed_poi_offering_relevance.csv` verbatim; the **area hierarchy** (prefix trick is
  Berlin-LOR-specific — each city needs its own `parent_area_code` mapping); the **Vacancy signal** (OSM
  vacancy tagging is sparse/inconsistent across cities); the **outcome side** (Berlin EWR/MSS/Mietspiegel
  vs Hamburg Sozialmonitoring). Any new city must re-author its ladder, re-derive its hierarchy + recheck
  leakage, confirm a comparable open outcome exists, and re-run the ethics review.

The page ships **Berlin-first** with a city selector (the `/berlin/poi-map` pattern), Hamburg behind its
own sign-off — no rewrite needed later.

---

## Architecture & data-model decisions

- **Calculation methods = columns, not a new grain discriminator** (+ a thin long serving view
  `mart_poi_oa_methods` with an `oa_method` label for the site/study). Rationale: all methods are
  transforms of the same window-summed stocks (one pass, no re-aggregation); a row discriminator would
  ~5× the grain and mix incompatible units (a log, a ratio, a pp-difference) into one column — a D-2
  footgun. Keep `weight_variant` and `methodology_variant` as the existing two discriminators.
- **`area_level` = a new additive grain component**, built by stock roll-up (LQ-last) with city totals
  broadcast from the finest level (§ area hierarchy). New OA grain:
  `(city_code, snapshot_year, area_code, area_vintage, area_level, poi_domain_h, poi_category_h,
  poi_type_h, weight_variant, methodology_variant)`.
- **Dominance = a separate model** at parent grain (§ dominance).
- **Seam:** populate `dim_area.parent_area_code`; per-city config in a **seed**, not a var — extend
  `seed_dim_area_level.csv` with `(city_code, prefix_length, rollup_method ∈ {base,prefix,crosswalk},
  parent_level_code)` and add `pgr`/`bezirk` rows.
- **Tests:** extend `unique_combination_of_columns` + `accepted_values` (source the level list from the
  seed, not a hardcoded list) with `area_level`; new **blocking** singular test
  `test_c1b_oa_arealevel_mass_conservation_invariance.sql` (per-level `Σ local = city` for every
  taxonomy level); dominance range tests (`hhi/top_share ∈ [0,1]`, `entropy ≥ 0`). The per-level
  mass-conservation test is this feature's leakage guard (the R-C3 analogue for deterministic SQL).
- **Grain-explosion control:** OA grain could grow up to ~32× (4 levels × 4 weight × 2 methodology).
  Default the coarse levels (bzr/pgr/bezirk) to **domain-grain output** (mirroring
  `mart_poi_offering_advantage_map`'s slimming precedent) unless a consumer needs category/type there;
  keep Evidence parquet lean (the #210 payload lesson).
- **Back-compat (concrete risk):** the I15 bug (leaf-grain rows read without aggregation → repeated
  `oa_domain`) *will recur, 4× worse*, if `area_level` lands upstream without updating every downstream
  consumer to filter/group by it. Any PR that adds `area_level` updates all known consumers in the same PR.
- **Tool gate:** **none** — pure DuckDB/dbt (substr, window sums, HHI/entropy/log arithmetic). No new
  dependency, no new data source (coarser Berlin levels are prefixes of already-ingested codes). New ADR
  required (append-only): **next free number is ADR-0024** (0019–0023 are taken).

---

## Sub-ticket spine (the "OA-D" cluster)

Front-load the contested calls into the ADR so downstream tickets don't re-litigate. Dependency graph:
`D0 → D1 → {D2 → D3, D4} → {D5, D6} → D7`; D1b and D8 are the Hamburg track.

| Ticket | Size | Depends on | MB? | Scope |
|---|---|---|---|---|
| **OA-D0 — ADR-0024** | S | — | **Yes** | Lock: methods-as-columns + long view; area_level roll-up semantics (stock-first, city-broadcast, weighted-variant prefix-sum decision); dominance as separate model + formulas + grouping + ethics extension; the `parent_area_code` seam. One heavy gate up front. |
| **OA-D1 — area-hierarchy seam** | S | D0 | **Yes** | Populate `dim_area.parent_area_code` (Berlin prefix in adapter); extend `seed_dim_area_level.csv` (pgr, bezirk, prefix_length, rollup_method, parent_level_code). |
| **OA-D1b — Hamburg parent wiring** (spike-first) | S/M | D0 | **Yes** if crosswalk built | WFS-attribute check on `statgebiet`; else `ST_Within(centroid, parent_geom)` spatial crosswalk seed (spot-check boundary straddlers). |
| **OA-D2 — `area_level` in OA model** | M | D1 | **Yes** (gated model) | Roll-up CTEs (stock-first, LQ-last, city totals broadcast); + blocking C-1b per-level invariance test. |
| **OA-D3 — calculation-method columns** | M | D2 | **Yes** (gated model) | Add global-LQ, log-LQ, share-diff, shrunk-LQ + raw within-group share columns; `mart_poi_oa_methods` long view. Each column cites its source (R-C2). |
| **OA-D4 — within-group dominance model** | M | D1 | **Yes** (new indicator) | New `int_poi_within_group_dominance` + mart (HHI/top-share/entropy/evenness), parent grain, signal-domains only, signed top-share paired, tests. Architect adds it to the CLAUDE.md gated-file list. |
| **OA-D5 — comparison study** | M | D2–D4 | **Yes** (`analysis/*.py`) | `analysis/d_oa_mode_comparison.py`: cross-mode Spearman, per-mode MAUP + bandwidth gates, completeness-contamination test, low-base curve, nested-LQ golden validation; findings doc. |
| **OA-D6 — mart + geometry plumbing** | S/M | D2–D5 | Mostly No (plumbing); Bezirk geometry = methodology-adjacent | Add `area_level` to `mart_poi_offering_advantage(_map)` + km² join; new dominance mart; Bezirk dissolved-geometry export; **update all site consumers to filter `area_level`** (back-compat). |
| **OA-D7 — dedicated page + hierarchy refs** | S/M | D0/D4 sign-off (2-pass) | No (content) | Pass 1 (no data blocker): method survey, pros/cons, interpretation guide, PLR↔BZR switch, hierarchy docs. Pass 2 (after D2–D6): PGR/Bezirk, dominance visuals, cross-mode heatmap. |
| **OA-D8 — Hamburg reuse validation** | M | D1b, D2–D4 | **Yes** (widens city coverage) | Prove the seam end-to-end: HH `parent_area_code`, OA + dominance at HH area_levels. |
| *(follow-on, out of scope)* PGR/Bezirk polygon ingestion | M | — | Yes | Only needed for PGR/Bezirk choropleths + density; flag as a likely follow-on ask. |

Cap the coder↔reviewer loop at ~3 iterations then escalate (CLAUDE.md rule 3). D0 is the hard blocker —
no build starts until it PASSes the R-C1 gate.

---

## Open decisions for the maintainer

1. **Method set to implement** — the recommended core is nested (canonical) + global + log + share-diff +
   shrunk + raw-share as columns, dominance as its own model, and z-score/shift-share/Getis-Ord/density
   left in the analysis layer. Trim or expand?
2. **Modes as columns + long view (recommended) vs a true `oa_method` row discriminator** — recommend
   columns; confirm.
3. **Weighted-variant roll-up** — prefix-sum the already-mass-conserved PLR `weighted_count` up the
   hierarchy (cheap, keeps C-1) vs re-running the kernel against BZR/PGR geometries (truer, expensive).
   Recommend prefix-sum as a *documented simplification*; needs geo-DS sign-off in D0.
4. **PGR/Bezirk polygon ingestion in scope or follow-on?** — OA *values* work without it; choropleths +
   density need it. Recommend follow-on (keep this cluster geometry-light).
5. **Coarse-level output grain** — domain-grain only at bzr/pgr/bezirk (recommended, controls the 32×
   blow-up) vs full leaf everywhere.
6. **How to file** — turn this spine into GitHub issues (epic + sub-issues on the board) now, or iterate
   on this doc first?

## Methodology gate (R-C1)

Almost the whole cluster is methodology-bearing (touches `docs/adr/**`, `int_poi_offering_advantage.sql`,
a new gated indicator model, `analysis/*.py`, and spatial method). Each MB ticket re-enters the geo-DS +
gentrification-domain-expert dual gate on its own branch before integration into `develop` (ADR-0011).
Provisional pre-implementation posture from the scoping pass: geo-DS **concerns** until the ADR (D0)
locks (a) recompute-from-summed-counts at every level, (b) methods as an accepted-values-controlled
discriminator with no blend value, (c) the completeness-contamination gate for temporal reads, and (d)
the min-parent-base gate on the dominance family; domain-expert conditions D-1/D-2/D-3 carried onto D4/D5/D7.

## References

- `transform/models/intermediate/int_poi_offering_advantage.sql`,
  `transform/models/marts/mart_poi_offering_advantage.sql` (+ `_map`),
  `transform/models/intermediate/dim_area.sql` (line 30: deferred `parent_area_code` — the seam),
  `transform/seeds/seed_dim_area_level.csv`, `transform/seeds/seed_poi_thesis_taxonomy_crosswalk.csv`,
  `transform/seeds/seed_poi_offering_relevance.csv`,
  `transform/tests/test_c1_oa_weighted_mass_conservation_invariance.sql`.
- `docs/adr/0017-poi-offering-advantage-revival.md`, `docs/adr/0018-causal-tiered-poi-selection.md`,
  `docs/adr/0005-city-agnostic-data-model.md`, `docs/adr/0012-serving-and-hosting-stack.md`.
- `docs/methodology/spatial-methods.md` §7 (MAUP r>0.7 gate) + §11 (OA construct, leakage, bandwidth);
  `docs/planning/oa-revival-and-methodology-improvement.md`; `docs/epic-i/I15-oa-review-findings.md`.
- `reference/system/71_oa.sql`, `70_oa_helper.sql` (+ `_distcalc`, `_bzr`);
  `reference/goldens/20180909_result_full_plr.csv`.
- Method sources (R-C2): Isard 1960 / Miller-Gibson-Wright 1991 (LQ); Shannon 1948, Herfindahl-Hirschman,
  Simpson 1949, Theil 1972 (concentration); Dunn 1960 / Pearson residuals (shift-share); Clayton-Kaldor
  1987 / Marshall 1991 (empirical Bayes); Dangschat 1988, Smith 1979, Zukin 2009, Lees/Slater/Wyly 2008,
  Jacobs (interpretation).

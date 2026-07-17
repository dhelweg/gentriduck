# ADR-0024: OA calculation-method vocabulary, area-hierarchy roll-up, and within-group dominance

- **Status:** Proposed — **maintainer confirmed the D7 scope knobs (2026-07-17)** and the **R-C1 dual
  sign-off is recorded: both `PASS WITH CONDITIONS`** (`docs/methodology/OA-D0-geo-signoff.md`,
  `docs/methodology/OA-D0-domain-signoff.md`). The conditions do **not** block finalizing this ADR as the
  D0 decision record — they **bind the downstream build tickets** (D3/D4/D7 each re-enter the gate). See
  the *Maintainer scope confirmation + R-C1 outcome* block below.
- **Date:** 2026-07-11 (drafted); 2026-07-17 (scope confirmed + sign-off recorded)
- **Deciders:** system-architect (author); geo-data-scientist + gentrification-domain-expert (R-C1 gate —
  **both `PASS WITH CONDITIONS`, 2026-07-17**); maintainer (**D7 scope knobs confirmed 2026-07-17**)
- **Issue:** OA-D0 (to be filed); part of the "OA-D" methods cluster (OA-D0…D8)
- **Supersedes / amends:** none. **Extends** ADR-0017 (OA revival — adds a calculation-method axis
  orthogonal to its `weight_variant`/`methodology_variant`, plus `area_level`), ADR-0018 (causal-tiered
  curation interplay), ADR-0005 (city-agnostic core — finally populates `dim_area.parent_area_code`),
  and `docs/methodology/spatial-methods.md` §7/§11. Does **not** change any accepted ADR (ADRs are
  append-only).
- **Grounding (R-C2):** `docs/planning/oa-modes-hierarchy-dominance.md` (the epic this ADR discharges);
  ADR-0017 D1–D5; `reference/system/71_oa.sql` + `70_oa_helper.sql`; `docs/methodology/spatial-methods.md`
  §7 (MAUP r>0.7 gate), §11 (OA construct, leakage, bandwidth); method sources listed under Sources.

> This ADR is **methodology-bearing** per CLAUDE.md R-C1 (it touches `docs/adr/**` and fixes the OA
> calculation vocabulary, the area-hierarchy roll-up method, and a new indicator). It requires **both** a
> `geo-data-scientist` and a `gentrification-domain-expert` `Verdict: PASS` before integration into
> `develop`. The system-architect authored it and does not sign off on it.

---

## Maintainer scope confirmation + R-C1 outcome (2026-07-17)

This block is authoritative where it differs from the older D1/D2/D5/D7 prose below (kept for rationale).

### Confirmed D7 scope knobs (maintainer)
1. **Method set = EVERYTHING.** The D1 core (nested-LQ *canonical* + global-LQ + log-LQ + share-diff +
   shrunk-LQ + raw within-group share) **plus** z-score/binomial-SLQ, **Getis-Ord**, **density**, and
   **per-capita** — all promoted into the model/mart layer (the earlier D7 default kept the latter four in
   the analysis layer). See ⚠ below on Getis-Ord tooling.
2. **Weighted-variant roll-up = prefix-sum** the mass-conserved PLR `weighted_count` up the LOR-prefix
   hierarchy (confirmed C-1-safe by geo sign-off C1). NOT per-level re-kernel.
3. **Area-hierarchy geometry = reuse + dissolve.** The ADR's original "PGR/Bezirk have no geometry →
   follow-on" premise is **STALE**: #242 (I18) and #269 already ingested real WFS polygons for **PGR, BZR,
   and Ortsteil** into `dim_area_geometry`. The **only** missing level is **Bezirk (12 districts, 2-digit
   LOR prefix)**, now **derived by `ST_Union` dissolve of child PLR polygons** — no new data source, pure
   DuckDB (geo sign-off C8: dissolve in native EPSG:25833, reproject last, assert ΣArea(child)≈Area(dissolved)
   and 12-polygon output per vintage). Choropleths + density are therefore reachable at **all** area levels.
4. **Coarse-level grain = FULL category/type leaf grain** at every area level (overrides the D5 default of
   domain-grain-only), accepting the up-to-32× multiplier. Ecological-fallacy caveat: **BZR is the
   recommended public headline scale; Bezirk is context-only** (geo C-/domain-D conditions).

### R-C1 dual sign-off — both `PASS WITH CONDITIONS` (conditions bind D3/D4/D7 build tickets)
- **geo-data-scientist** (`docs/methodology/OA-D0-geo-signoff.md`), C1–C10 — key binding items:
  prefix-sum roll-up is correct and C-1-preserving (C1); **completeness-contamination gate** = per level ×
  mode Spearman ρ(temporal Δ, coverage-growth proxy), **fail at |ρ|≥0.3, p<0.05**, failing modes badged
  *temporal-unsafe* not deleted (C3); **`min_parent_base`** = keep LQ default **10**, dominance uses
  **`max(10, 5·n_children)`** (C4); new blocking test asserts Σ local = city per level **and** cross-level
  equality of city totals (C6); `ST_Union` Bezirk conditions (C8).
- **gentrification-domain-expert** (`docs/methodology/OA-D0-domain-signoff.md`) — key binding items:
  - **Dominance allow-list correction (A):** IN = Gastronomy (cat+type), Retail (category), Entertainment
    (category); **fitness/wellness signal lives under `Sports and Recreation`, not Services** — D4 must
    pool a *curated wellness group across both domains* (the ADR's "partial Services (wellness)" silently
    dropped half the Lees/Slater/Wyly signal); Services only as a curated wellness subset; Tourism &
    `Other>Hipster` given explicit dispositions (kept out, never blended); OUT = Vacancy (degenerate k=1)
    + infrastructure.
  - **Dominance ethics statement (B), four mandatory clauses:** (1) not an antitrust reading; (2)
    sign-blindness — up-market boutique-ification vs down-market disinvestment look identical, never a bare
    HHI; (3) **NEW anti-xenophobia clause** — cuisine/nationality-coded Restaurant *types* are an
    ethnic-stigma vector → **cuisine-typed dominance is barred from public surfaces (category grain only)**;
    (4) descriptive-not-causal + `min_parent_base` + Haklay anti-erasure.
  - **"Everything" set framing (C/D):** density & per-capita answer provision/centrality, **not**
    offering-advantage; per-capita's population denominator is **endogenous to displacement** (per-capita
    can rise *because* people were displaced) — both hard-labelled by question, **never share an axis/legend
    with the LQ family**; Getis-Ord hotspot maps default to BZR.

### ⚠ Open item requiring a maintainer decision (new-tool gate, golden rule 2)
Geo sign-off flags that **Getis-Ord (Gi\*) likely cannot be computed in pure DuckDB** — it needs a
spatial-weights library (e.g. `esda`/`libpysal`, Queen contiguity W), which would be a **new tool/library
adoption** and therefore needs its **own architect ADR + maintainer OK**. This strains ADR-0024's
"selects no new tool" claim. **Decision pending:** either (a) **drop Getis-Ord** from the confirmed
"everything" set (keeps ADR-0024 tool-free), or (b) **greenlight a follow-on new-tool ADR** for `esda`,
restricting Gi\* to PLR/BZR × domain grain (not full type leaf, not Bezirk). Until resolved, Getis-Ord is
**held out of the build** and the rest of the "everything" set proceeds.

---

## Context

Today OA is computed exactly one way (3-level nested LQ, PLR grain, hard + Gaussian variants, `faithful`
only — `int_poi_offering_advantage.sql`). The maintainer has asked for OA to be recognised as a **family
of measurements along independent axes** — because *the calculation method changes the interpretation
more than any parameter does* — and for two new capabilities: OA at **multiple spatial scales** (the
LOR/area hierarchy) and a **within-group dominance** metric ("are restaurants or fast-food stores
dominating within gastronomy?"). Full motivation, the method survey with pros/cons, the
interpretation-by-question matrix, the comparison-study design, and the OA-D0…D8 sub-ticket spine live in
`docs/planning/oa-modes-hierarchy-dominance.md`. This ADR records the **binding architecture decisions**
so the downstream build tickets do not re-litigate them.

It selects **no new tool, library, or data source** — pure DuckDB/dbt (substr, window sums,
HHI/entropy/log arithmetic) over stocks the existing spatial layer already produces. No golden file is
modified. Berlin's coarser area levels are prefixes of already-ingested PLR codes.

### Constraints

- **Free + open; local-first DuckDB; city-agnostic core (ADR-0005).** No Berlin literal enters a shared
  model; the prefix scheme lives in a per-city seed and `dim_area.parent_area_code`.
- **Epic B framing.** The `faithful` nested-LQ remains the directional 2018-golden anchor; new methods
  are new instruments, not re-definitions of the thesis construct.
- **The "never blend" firm rule (ADR-0017 D3) and "multi-signed bundle / don't sum" rule (D-2) extend to
  every new axis introduced here.**

---

## Decision

### D1 — Calculation methods are **columns** (+ a long serving view), not a new grain discriminator

The surveyed methods are all deterministic transforms of the *same* window-summed stocks, differing only
in reference base and functional form. They are therefore added as **additional output columns** on the
existing leaf row of `int_poi_offering_advantage`, not as a new row-multiplying discriminator:

| Column | Definition (per taxonomy level) | Reference base | Role |
|---|---|---|---|
| `oa_*` *(nested LQ, existing)* | `(n_a/parent_a)/(n_city/parent_city)` | immediate parent branch | **canonical / golden-faithful** |
| `oa_global_*` | `(n_a/AllPOI_a)/(n_city/AllPOI_city)` | grand all-POI total | density/centrality reading |
| `oa_log_*` | `ln(oa_*)` (offset for 0) | — | symmetric scale for averaging/mapping/regression |
| `share_diff_*` | `s_a − s_city` (percentage points) | parent branch | magnitude-aware absolute shift |
| `oa_shrunk_*` | empirical-Bayes-shrunk `s_a` ÷ `s_city` | parent branch + citywide Beta prior | low-base-hardened (D-3) |
| `local_share_*` | `n_a/parent_a` (raw within-group share) | — | descriptive composition (the LQ numerator, exposed) |

A thin **long/unpivoted serving mart** (`mart_poi_oa_methods`, `oa_method` label column) is provided for
the site and the comparison study. **Rationale for columns-over-rows:** one computation pass, no
re-aggregation; a row discriminator would ~5× the grain and mix incompatible units (a log, a ratio, a
pp-difference) into one column — a D-2 footgun. The existing `weight_variant` and `methodology_variant`
remain the only two grain discriminators. **No blended/averaged "consensus OA" column or value exists**
(schema-level enforcement of D3).

Every new method column carries an R-C2 source citation in the model SQL (see Sources).

### D2 — `area_level` roll-up: aggregate stocks, form the LQ last, broadcast the city denominator

`area_level` becomes a **new additive grain component**. Coarser Berlin levels are built by
**string-prefix roll-up** of the 8-digit PLR code (bzr=6, pgr=4, bezirk=2) — **no geometry**. Two rules
are **blocking**:

1. **Aggregate the stocks, then form the ratio last — never average child LQs** (ratio-of-sums ≠
   mean-of-ratios; Simpson/Jensen). Sum `*_stock` up the prefix, then divide. Same rule for HHI/entropy.
2. **City-wide denominators are level-invariant — compute them once from the finest level and broadcast
   (join), never re-window over the unioned multi-level rows** (which would count each POI once per level
   present). This makes level-invariance a structural guarantee and the correctness anchor for the new
   per-level mass-conservation test (D6).

Roll up **within a single `area_vintage`** (prefix nesting holds inside `lor_pre2021`/`lor_2021`, not
across the 2021 reform). **Weighted variant:** prefix-sum the already-mass-conserved PLR `weighted_count`
up the hierarchy (cheap, preserves C-1) rather than re-running the kernel against coarser geometries —
recorded as a **documented simplification** (geo-DS to confirm in the gate). New OA grain:
`(city_code, snapshot_year, area_code, area_vintage, area_level, poi_domain_h, poi_category_h,
poi_type_h, weight_variant, methodology_variant)`.

`area_level` is an explicit **resolution-vs-stability dial**: coarser = larger POI base = more stable but
lower resolution (and ecological-fallacy risk). Cross-scale rank correlation is reported and scale-rank
flips are treated as a substantive finding (mirror the C-4 gate), per the domain-expert's area-scale
guidance.

### D3 — Within-group dominance is a **separate model**, sign-blind, signal-domains only

Dominance ("monoculture vs diversity within a group") is a *different construct* from OA (area-vs-city)
and gets its own `int_poi_within_group_dominance.sql` (+ mart), at **parent grain** (one row per parent
node per area), columns `hhi` (`Σ p_i²`), `top_share` (`max p_i`), `entropy` (`−Σ p_i ln p_i`),
`evenness` (`entropy/ln k`, normalises taxonomy size), `top_child`, `n_children`.

- **Compute at the correct grain:** category-within-domain requires dedup to category grain before
  squaring (leaf-grain squaring multi-counts); type-within-domain is leaf-safe.
- **Sign-blind → always reported with the signed `top_child`** and its tier from
  `seed_poi_offering_relevance.csv`; never a cross-domain scalar; **never folded into the LQ or any
  composite** (D-2 at the dominance layer).
- **Only for domains with a meaningful internal signal** — Gastronomy, Retail (category grain),
  Entertainment; partial Services (wellness). **Excluded:** Vacancy/Leerstand (single-category — signal
  is domain-level OA + Δ) and infrastructure domains.
- **Own ethics framing** (HHI has an antitrust/market-concentration connotation distinct from OA's
  D-1/D-2 — a descriptive-not-causal statement is authored specifically for it, not inherited).

Added to the CLAUDE.md R-C1 methodology-gated file list.

### D4 — Area-hierarchy seam: populate `dim_area.parent_area_code`; config in a seed

The city-agnostic seam is `dim_area.parent_area_code` (deferred in `dim_area.sql`; this work is its first
consumer). Berlin's prefix derivation lives in the Berlin adapter, not a shared model; the shared roll-up
joins `parent_area_code` generically. Per-city config is a **seed**, not a var: extend
`seed_dim_area_level.csv` with `(city_code, prefix_length, rollup_method ∈ {base, prefix, crosswalk},
parent_level_code)` and add `pgr`/`bezirk` rows. **Hamburg does not prefix-nest** (`statgebiet`
`parent_prop: None`) → `rollup_method = crosswalk`: wire `parent_area_code` from a WFS attribute if one
exists, else a `ST_Within(centroid, parent_geom)` spatial crosswalk (itself methodology-bearing per the
ADR-0005 addendum; spot-check boundary straddlers).

### D5 — Grain, discriminators, and back-compat

Enumerated, `accepted_values`-tested `area_level` is part of the grain (sourced from the seed, not a
hardcoded list). Adding `area_level` upstream **requires updating every downstream consumer to
filter/group by it in the same change** — the I15 leaf-grain-without-aggregation bug will recur 4× worse
otherwise. Coarse levels (bzr/pgr/bezirk) default to **domain-grain output** (the
`mart_poi_offering_advantage_map` slimming precedent) to control the up-to-32× grain multiplier, unless a
consumer needs category/type there.

### D6 — Tests and publish gates

- **New blocking singular test** `test_c1b_oa_arealevel_mass_conservation_invariance.sql`: per
  `(city_code, snapshot_year, area_vintage, weight_variant, poi_domain_h, area_level)`,
  `Σ local_stock = city_stock` at every taxonomy level (the leakage guard / R-C3 analogue for
  deterministic SQL). Existing C-1 test unchanged (add `area_level` to its selects defensively).
- Dominance range tests (`hhi`, `top_share ∈ [0,1]`; `entropy ≥ 0`), `not_null`, and
  `unique_combination_of_columns` at the new grains.
- **Publish gates apply per mode AND per area_level:** the §7 MAUP r>0.7 rank check, the C-4
  bandwidth-fragility check, and a **completeness-contamination test** (temporal Δ vs coverage-growth
  proxy — turns the C-2 caveat into pass/fail). A `min_parent_base` gate suppresses/annotates thin-base
  dominance and LQ figures (D-3). Fragility is reported as a finding, never hidden.

### D7 — Scope knobs (maintainer-tunable; recommended defaults)

> **SUPERSEDED by the maintainer's 2026-07-17 confirmation** (see the *Maintainer scope confirmation*
> block near the top). The maintainer chose the **maximal-breadth** config: method set = **everything**,
> geometry = **reuse + dissolve Bezirk** (not follow-on), coarse grain = **full category/type** (not
> domain-only); weighted roll-up = prefix-sum. The recommended defaults below are retained only as the
> rationale for what was on the table.

These do not change the architecture; they set the build's breadth. **Recommended defaults**, overridable
by the maintainer:

1. **Method set:** the D1 core (nested + global + log + share-diff + shrunk + raw share) as columns;
   z-score/binomial-SLQ, Getis-Ord, and density/per-capita stay in the **analysis layer** (density
   re-opens MAUP; per-capita needs an EWR join).
2. **PGR/Bezirk polygon geometry:** **follow-on**, not this cluster — OA *values* roll up without
   geometry; choropleths + density need a separate ingestion ticket.
3. **Coarse-level grain:** domain-grain only at bzr/pgr/bezirk.

---

## Consequences

**Positive**
- OA is finally a *labelled* family: every figure declares its axis point, and the page can state which
  question each answers — the maintainer's core ask.
- The "never blend" rule is enforced structurally (no blended column/value; methods as typed columns;
  `oa_method` accepted-values-controlled in the long view).
- The area hierarchy is added geometry-free and city-agnostically (the seam finally lands); `area_level`
  doubles as a resolution-vs-stability control that partly mitigates the D-3 low-base fragility.
- The dominance construct adds a genuinely orthogonal axis (validated by *low* cross-mode correlation)
  without contaminating the LQ.
- No new tool/library/data source; no golden modified.

**Negative / accepted trade-offs**
- Up-to-32× grain growth on the OA model (mitigated by domain-grain coarse levels + slim marts).
- Weighted-variant roll-up is a documented simplification (prefix-sum, not per-level re-kernel).
- PGR/Bezirk have no geometry yet → NULL area_km²/density and no choropleth there until a follow-on.
- Hamburg needs a spatial crosswalk (own gate); Berlin's quality-ladder and hierarchy are not portable.
- Dominance is sign-blind and carries a fresh misuse surface (antitrust connotation) needing its own
  framing.

**Open questions for the R-C1 gate**
- geo-DS: confirm the prefix-sum weighted roll-up (vs per-level re-kernel) is acceptable; confirm the
  completeness-contamination test threshold and the `min_parent_base` cut.
- domain-expert: confirm the signal-domain allow-list for dominance and the dominance ethics framing.

---

## Sources

- `docs/planning/oa-modes-hierarchy-dominance.md`; ADR-0017, ADR-0018, ADR-0005, ADR-0012;
  `docs/methodology/spatial-methods.md` §7, §11; `reference/system/71_oa.sql`, `70_oa_helper.sql`;
  `reference/goldens/20180909_result_full_plr.csv`.
- LQ: Isard (1960); Miller, Gibson & Wright (1991). Concentration: Shannon (1948); Herfindahl (1950) /
  Hirschman (1945); Simpson (1949); Theil (1972). Shift-share: Dunn (1960) / Pearson residuals. Empirical
  Bayes: Clayton & Kaldor (1987); Marshall (1991). Interpretation: Dangschat (1988); Smith (1979); Zukin
  (2009); Lees/Slater/Wyly (2008); Jacobs.

---

## R-C1 sign-off (required before integration into `develop`)

- **geo-data-scientist:** ✅ **`PASS WITH CONDITIONS`** (2026-07-17) — `docs/methodology/OA-D0-geo-signoff.md`.
- **gentrification-domain-expert:** ✅ **`PASS WITH CONDITIONS`** (2026-07-17) — `docs/methodology/OA-D0-domain-signoff.md`.

Both verdicts and the confirmed D7 knobs are summarized in the *Maintainer scope confirmation + R-C1
outcome* block near the top; the numbered conditions there **bind the downstream build tickets** (D3/D4/D7
re-enter the gate). One open item — the Getis-Ord/`esda` new-tool decision — is flagged for the maintainer
(see ⚠ in that block) and is held out of the build until resolved.

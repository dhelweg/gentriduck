# OA-D7 (ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** OA-D7 pass 1 of 2 (web-only) — the dedicated Offering-Advantage
  methodology page and the two reference drill-down pages, on branch
  `feature/240-oa-d7-methodology-page`:
  `web/pages/methodology-oa-modes.md` (new),
  `web/pages/reference/index.md` (new),
  `web/pages/reference/poi-taxonomy.md` (new),
  `web/pages/reference/area-hierarchy.md` (new),
  plus small cross-link additions to `web/pages/methodology.md` and `web/pages/berlin/poi-map.md`.
- **Date:** 2026-07-17
- **Grounding (R-C2):** verified each page claim against the cited primary sources —
  ADR-0024, ADR-0017 (D1 type-⊂-domain nesting, D3 no-blend), ADR-0018;
  `docs/methodology/OA-D0-geo-signoff.md`, `OA-D0-domain-signoff.md` (Conditions A/B.1–B.4/C/D +
  Guardrail E), `OA-D2-domain-signoff.md`, `OA-D3b-zscore-domain-signoff.md`,
  `OA-D4-domain-signoff.md`, `OA-D5-mode-comparison-findings.md`;
  the shipped models/seeds `int_poi_offering_advantage_methods.sql`,
  `int_poi_within_group_dominance.sql`, `dim_area_hierarchy.sql`,
  `seed_poi_thesis_taxonomy_crosswalk.csv`, `seed_dim_area_level.csv`,
  `seed_oa_dominance_groups.csv`. Standard references as cited on the pages
  (Openshaw 1984 MAUP / Simpson's paradox, Haklay 2010, Zukin 2009, Smith 1979,
  Lees/Slater/Wyly 2008).

---

## Verdict: PASS

This is a faithful, plain-language restatement of already-governed methodology. It introduces no
new indicator, weight, normalization, method, or data source of its own, and where it disagrees
with a source it defers to the source. Every methodology-bearing claim I checked is accurate against
its cited primary artifact, and every binding forward-condition the prior sign-offs carried onto D7
is discharged in public copy. I found no spatial/statistical inaccuracy, no MAUP-gate misstatement,
and no overclaim beyond what is validated. Because pass 1 wires no live query or chart, the residual
disclosure obligations are display-time, not text-time, and are correctly deferred with the data to
pass 2 (see Carried-forward conditions below).

### What I verified

**Numbers match the OA-D5 findings doc exactly (§4/§7 of the page):**
- Nested-LQ vs. raw within-group share ρ ≈ 0.35 at category level — findings: 0.346. Correct.
- Log-LQ ρ = 1.000 rank-preserving rescaling of nested LQ — confirmed, correctly labelled a
  math check, not a finding.
- Completeness-contamination gate: 5 expected-safe + 2 expected-unsafe (raw share, z-score) all
  empirically temporal-safe, |ρ| < 0.06 in every case — matches §4 table (max 0.052);
  the "pre-registered prediction not confirmed" framing for raw-share/z-score is faithful.
- PLR-vs-BZR pooled Spearman ρ ≈ 0.66, below the 0.7 stability threshold "in every year 2009–2026"
  — accurate and *carefully* scoped: 2008 (0.727) is the one year above threshold and the page
  correctly excludes it; pooled ALL = 0.662. The MAUP instability is disclosed as a real finding,
  not buried.
- 2018 golden validation ρ = 0.148, p = 0.002, n = 435 — matches (findings p = 0.0019), and the
  page correctly restricts golden validation to nested LQ only.

**Binding conditions from prior sign-offs, discharged in public copy:**
- **Dominance sign-blindness pairing** (OA-D0 domain B.2): stated as the "central hazard,"
  boutique-ification vs. disinvestment producing identical HHI, always paired with signed
  `top_child` + tier. Correct, and matches `int_poi_within_group_dominance.sql`.
- **Anti-stigma cuisine-typed-dominance bar** (OA-D0 domain B.3, enforced per OA-D4): the page
  states cuisine/nationality-coded dominance is barred from every public displacement-adjacent
  surface including the page itself, public cut stops at category grain (Café/Restaurant/Fast Food),
  computed for internal study only. Verified technically enforced in the model
  (`gastronomy_restaurant_cuisine` group carries `is_public_safe = false`; consumers must filter
  `is_public_safe = true`).
- **HHI-not-antitrust** (B.1) and **min-base / anti-erasure "too thinly observed, not commercially
  dead"** (B.4) — both present and accurate.
- **Hipster/Vacancy documented-absence** (OA-D0 domain Conditions 6/7): both correctly explained as
  single-child (k=1) categories where a within-group mix measure is mathematically degenerate,
  tracked via their own OA figure/domain-level Δ instead. Correct.
- **z-score "significance ≠ gentrification importance"** (OA-D3b): the dedicated warning states
  |z| means "unlikely to be sampling noise given local sample size," not "significantly
  gentrifying," no multiple-comparison correction, must be read alongside its nested-LQ value, and
  correctly ties the base-size dependence to thin-mapping (lower-income Kiez) coverage bias.
- **BZR-headline / Bezirk-context-only ecological-fallacy framing** (OA-D0 domain D + OA-D2): stated
  on both the OA page (§4) and the area-hierarchy page, with the correct resolution-vs-stability
  "dial not a ladder" framing and the "borough number says nothing about any Kiez inside it" caveat.
- **Density/per-capita never share an axis with the LQ family; per-capita denominator endogeneity**
  (OA-D0 domain C): both alerts present and correct, including "falling per-capita is not by itself
  disinvestment."
- **Guardrail E** (nested-LQ alone is the 2018 construct; every other mode is a new instrument): the
  §2 table, §3 navigation table, and §6/§8 all state this repeatedly and correctly.

**Spatial-method claims verified against `dim_area_hierarchy.sql`:**
- Berlin LOR code-prefix nesting (8→6→4→2 digits, PLR⊃BZR⊃PGR⊃Bezirk) — matches the model's
  `substr()` derivations; the worked example (`01011101`→`010111`→`0101`→`01`) is correct.
- "Sum counts first, form the ratio last, never average" (Simpson's-paradox framing) and
  "citywide comparison computed once from the finest level, reused" — both match ADR-0024 D2 and are
  methodologically sound.
- Berlin Ortsteil non-nesting handled by a separate dominant-overlap spatial join (not code prefix),
  and Ortsteil→Bezirk stated as source-provided (not derived) — both match the model's #269 notes.
- Hamburg's non-nesting hierarchy: district←subarea_l1 source-provided, subarea_l1←subarea_l2
  unresolved (bare sequential Gebiet id, no prefix relation) and disclosed as a genuine current
  limitation ("Hamburg's OA figures do not currently roll up") — matches the model header exactly.
- Bezirk polygon disclosed as ST_Union-derived (dissolved from PLR shapes), not sourced — correct.

**Taxonomy claims verified:** 13 domains (confirmed against the seed), the type-⊂-domain (not
category) nesting "genuine quirk" cited to ADR-0017 D1 (confirmed: `OA(t,a)=(t_a/D_a)/(t_city/D_city)`),
the Handwerk→Hardware / Werkstatt→Workshop translation caveat (verbatim in the crosswalk seed), and
the `craft=*` non-adoption no-op (decision record present). All accurate.

**Overclaim guard:** §6 and §8 explicitly state "nine methods is not nine confirmations," only
nested LQ is 2018-anchored, none is a forward-looking targeting tool, and the area-hierarchy
roll-up is proven only for nested LQ so far — the other methods' MAUP behaviour is honestly flagged
as unknown, not assumed. Getis-Ord Gi* is correctly held out as gated behind ADR-0025 (proposed).
The underlying R-C1 gate is honestly represented as `PASS WITH CONDITIONS`, not overstated to a
clean pass.

### Carried-forward conditions (bind pass 2, not this web-only pass)

These are display-time obligations that this text-only pass cannot yet trigger and the page itself
correctly commits to. They do **not** hold up integration of pass 1, but the D7 remainder must
satisfy them before any live figure is surfaced:
1. Any live density/per-capita figure differenced over time must carry the per-cell
   completeness-contamination PASS badge (OA-D0 geo/domain C.2) — never a public temporal delta on
   a `temporal-unsafe` cell.
2. The `is_public_safe = true` filter must be applied at the query/render layer, not merely
   documented, so cuisine-typed dominance never reaches a public surface (OA-D4).
3. Coarse-level (PGR/Bezirk) OA choropleths must ship the ecological-fallacy + MAUP-instability
   caveat inline with the figure, and the PLR-vs-BZR ρ ≈ 0.66 instability must be surfaced at the
   point of any cross-scale comparison (spatial-methods.md §7).
4. Min-base suppression must render as "too thinly observed to characterize," never as absence.

None of these is a defect in pass 1; they are the standing pass-2 gate this page names itself.

### SEC-3 note

No untrusted (non-maintainer / web-fetched) input informed this review. All sources are
maintainer-authored repository artifacts.

---

**Verdict: PASS** — OK to integrate the OA-D7 pass-1 web pages into `develop`, subject to the
carried-forward conditions binding the data-backed pass 2.

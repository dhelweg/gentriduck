# OA-D7 pass 2 (ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** OA-D7 pass 2 of 2 (data-backed) — the live Evidence.dev queries,
  charts, and map wired into the OA methodology page, on branch
  `feature/240-oa-d7-pass2-data`:
  `web/pages/methodology-oa-modes.md` (live sections added to §2/§4/§5),
  `web/sources/gentriduck_marts/mart_poi_oa_methods.sql` (new source),
  `web/sources/gentriduck_marts/mart_poi_oa_arealevel.sql` (new source),
  `web/sources/gentriduck_marts/mart_poi_dominance.sql` (new source),
  `web/scripts/export_area_geojson.py` (new `export_oa_arealevel_geometry()`),
  new `web/static/geo/{bzr,pgr,bezirk}_lor2021.geojson` geometry exports,
  plus a cross-link update to `web/pages/reference/area-hierarchy.md`.
- **Date:** 2026-07-17
- **Grounding (R-C2):** verified the live wiring against the pass-1 sign-offs
  (`docs/methodology/OA-D7-geo-signoff.md` Carried-forward conditions 1–4,
  `docs/methodology/OA-D7-domain-signoff.md`), ADR-0024 (D2 roll-up, D3 no-blend, D4 dominance),
  the OA-D0/D2/D3b/D4 domain sign-offs (Conditions B.3/B.4/C/D), and
  `docs/methodology/OA-D5-mode-comparison-findings.md`. Every method/scale/dominance label surfaced
  live is copied verbatim from the already-governed §2/§4/§5 static tables.

---

## Verdict: PASS

Pass 2 surfaces already-governed OA figures live without introducing any new indicator, weight,
normalization, method, or interpretive claim. All four carried-forward pass-2 conditions the pass-1
gate named are genuinely discharged in the query/render layer (not merely documented), and each is
enforced at the strongest available point. The mart pre-filtering is presentational only and drops
nothing methodologically load-bearing from what is shown. I found no MAUP-gate misstatement, no
cross-family axis blending, and no anti-stigma leak.

### Carried-forward conditions — each verified in the SQL, not just the prose

1. **Completeness-contamination badge on differenced density/per-capita — discharged by
   avoidance (correct).** No live year-over-year delta for density/per-capita is wired; the §2 live
   table shows them as point-in-time stock only. This is the right call: no per-cell
   completeness/temporal-safety flag exists upstream (only `seed_oa_calculation_methods.csv`'s
   per-*method* `expected_temporal_safe`, and OA-D5's empirical gate study explicitly excluded
   density/per-capita). Showing a badged delta would require a new upstream column first — correctly
   scoped out and disclosed in the §2 warning Alert and §6/§8. No temporal artefact can leak because
   no temporal view is rendered.

2. **`is_public_safe = true` as an actual filter — airtight, source-layer.** Enforced in
   `web/sources/gentriduck_marts/mart_poi_dominance.sql` (`where is_public_safe = true`), which is
   the correct strongest point: Evidence bundles a source's full result to the client, so the
   cuisine-typed (`is_public_safe = false`) group never reaches the browser at all. The page's own
   `dominance_top`/`dom_suppressed_count` queries restate the filter (defence in depth), and the
   group Dropdown lists only the four public-safe groups — the cuisine-typed group is not an option
   by construction. Three independent barriers; no path exposes cuisine-typed dominance.

3. **BZR-headline / PGR+Bezirk-context-only + MAUP caveat inline — verified.** The §4 area-scale
   ButtonGroup defaults to `bzr` ("recommended headline scale"); PGR and Bezirk tabs are explicitly
   labelled "context only." An always-visible `status="warning"` Alert (not a hover tooltip)
   restates the PLR-vs-BZR pooled Spearman ρ ≈ 0.66 / 0.7-threshold instability verbatim from §4's
   static text, plus the "dial not a ladder" ecological-fallacy framing and the "~30–40
   neighbourhoods pooled into one number" Bezirk caveat. The map surfaces `maup_caveat_required` and
   `area_level_publish_tier` from the OA-D6 mart. Geometry vintage (`lor_2021`) matches the source's
   `area_vintage = 'lor_2021'` filter and the year Dropdown starting at 2021 — the #149 vintage-
   mismatch class of bug is avoided up front.

4. **Min-base suppression renders as "too thinly observed," never absence — verified both live
   surfaces.** The §4 map nulls `oa_domain` when `oa_domain_min_base_flag` is set (unshaded gap, the
   same convention `/berlin/poi-map` uses) with an inline explanation that a blank is not
   "commercially dead." The §5 dominance table filters `not is_thin_base` *and* discloses the
   suppressed count via `dom_suppressed_count` ("N of M Planungsräume … suppressed"), never a silent
   drop. The §2 methods table honestly discloses that `mart_poi_oa_methods` carries no min-base flag,
   so it suppresses nothing and instead repeats the read-cautiously caveat — an accurate limitation
   statement, not a gap papered over.

### Additional checks from the review brief

- **Choropleth does not invite a coarse-grain misread as the primary signal.** Default tab is BZR;
  PGR/Bezirk are tab-gated and labelled context-only; the map plots only the canonical nested LQ
  (never the eight new instruments at coarse grain); and §7's note is updated to state the roll-up is
  proven only for nested LQ. PLR remains the finest published signal (on `/berlin/poi-map`). No
  overclaim.
- **No cross-family axis blending.** The §2 BarChart (`methods_ratio_family`) plots only
  `nested_lq`/`global_lq`/`shrunk_lq` — the three genuinely sharing "ratio, centred on 1." log_lq
  (centred on 0), share_diff, raw_share, zscore_slq, density, and percapita are excluded from the
  chart and appear only in the DataTable with explicit unit/family labels, honouring OA-D0 domain
  Condition C / geo C7 no-blend.
- **Dominance table never exposes cuisine-typed dominance.** With the cuisine group filtered out at
  three layers, `top_child` for the four public-safe groups is form/composition on the governed
  offering-tier ladder (Imbiss/sit-down/café), not cuisine or national origin; tier labels are copied
  verbatim from ADR-0018 / `seed_poi_offering_relevance.csv`. Compliant with OA-D4 / OA-D0 B.3.
- **Mart pre-filtering is presentational only.** The three source files cut to `taxonomy_level =
  'domain'`, `area_level in ('bzr','pgr','bezirk')` (dropping PLR — already live at finer grain on
  `/berlin/poi-map`), `area_vintage = 'lor_2021'`, `city_code = 'BER'`, and a single
  `weight_variant='standard'`/`methodology_variant='faithful'` combination, with `select distinct`
  removing category/type duplicate rows. Each is a documented client-bundle-size cut (the unfiltered
  `mart_poi_oa_arealevel` OOM'd `evidence sources` at 535,977 rows). No value is altered, aggregated,
  or re-derived; the dropped rows are either published elsewhere (PLR) or exact duplicates of a
  retained value. Methodologically nothing shown is silently altered.
- **`|ρ| < 0.06` wording fix is cosmetic.** Pass-1's `|ρ| < 0.06 in every case` became `|ρ| stayed
  under 0.06 in every case` — a bare `<` that broke the Evidence/MDX build, reworded to prose. The
  numeric claim (max 0.052, matching OA-D5 §4) is unchanged; no methodology claim altered.

### Note on the `city_code` anomaly (for escalation, not blocking)

The implementing agent flagged non-canonical `city_code` values (`'berlin'`, `'HH'`) alongside
`'BER'` in `mart_poi_oa_methods` at category/type grain and worked around them with `city_code =
'BER'`. This is a genuine upstream data-quality issue worth the separate data-engineer follow-up
ticket: at the domain grain this page reads, the `'BER'` filter is sufficient and safe, but the
stray values indicate a `dim_city`/canonicalization gap (ADR-0005 city-agnostic core) that should be
fixed at the model layer rather than masked at every consumer. It does not affect what this page
displays and does not hold up this sign-off.

### SEC-3 note

No untrusted (non-maintainer / web-fetched) input informed this review. All sources are
maintainer-authored repository artifacts. The flagged `city_code` anomaly is noted for the
project-manager to file as a data-engineer follow-up; it is not acted on here.

---

**Verdict: PASS** — OK to integrate OA-D7 pass 2 into `develop`. All four carried-forward pass-1
conditions are discharged in the query/render layer, the public-safe and min-base guards are
airtight at the source layer, and the coarse-scale choropleth is correctly framed with the MAUP
caveat inline.

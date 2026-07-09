# Gentrification Domain Expert Sign-off: OA-A.3 (#167) — Direct OA validation vs the 2018 thesis

- **Scope:** OA-A.3 #167 — domain-fidelity half of the R-C1 dual gate on the direct OA
  validation (analysis, staging model, crosswalk seed, findings). Spatial-statistical
  soundness covered separately by `docs/epic-b/A3-oa-validation-geo-signoff.md`.
- **Operationalizes:** does the recomputed Offering Advantage still directionally reproduce
  the thesis's own OA at the coarse (domain) grain — i.e. does the commercial/retail
  succession signal the thesis measured in 2016 still hold when recomputed on today's OSM
  data with today's pipeline? `docs/planning/oa-revival-and-methodology-improvement.md`
  Run 1 (faithful backtest, anchor = 2018 golden).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/167-oa-a3-golden-validation → develop
- **Geo-DS verdict:** PASS WITH CONDITIONS (C-1..C-3, non-blocking)
- **Verdict:** PASS WITH CONDITIONS (D-1, non-blocking)

## 1. Does this answer the Epic B question?

Epic B asks a directional question, not a numerical-equality one (CLAUDE.md "Epic B
framing"): do the 2018 paper's OA-based findings still hold on a rebuilt pipeline and newer
data? The domain-level headline answers this cleanly: **all 13 domains show positive,
statistically significant rank agreement** between the recomputed and thesis OA across both
comparison periods (2016 current, 2014 lagged) and both weight variants (standard,
gaussian_500m) — rho ranging 0.15-0.91, with 11 of 13 domains at rho > 0.5 in every
configuration. This is a genuinely strong directional confirmation: a PLR the thesis found
over-represented in, say, Gastronomie or Vergnügung in 2016 is still very likely to rank as
over-represented on the same domain today, on independently-rebuilt OSM data years later.
That is exactly the kind of retail-succession persistence the invasion-succession /
"boutiquing" literature (Dangschat 1988; Zukin 2009; Lees/Slater/Wyly 2008) would predict for
a commercial-composition signal with real spatial inertia (retail clustering is sticky — once
a Kiez tips toward a café/bar-heavy mix it tends to stay there for years, not flip randomly).

## 2. The Office/Büro domain outlier is real and worth flagging, not hiding

`total_d_buero_stock` is the one domain that is materially weaker (rho 0.15-0.31 across all
four configurations, vs. 0.5-0.91 for every other domain) and is the *only* domain whose rho
drops below 0.4 anywhere. From a domain-theory standpoint this is plausible rather than
alarming: office/workspace POI tagging in OSM is comparatively sparse and inconsistent (coworking
tagging conventions have shifted substantially since 2016 — `int_osm_poi_harmonized.sql`'s own
own drift-remap notes flag `office=coworking` as a post-2018 tag that barely existed in the
thesis era), and office location decisions are driven far more by commercial real-estate
cycles and transit access than by neighbourhood-level gentrification dynamics, so weaker
persistence in *this* domain specifically does not undermine the OA construct's validity for
the domains gentrification theory actually cares about (retail, gastronomy, entertainment,
services). **Condition D-1 (non-blocking):** flag Büro/Office as a lower-confidence OA
predictor if/when OA-A.4 builds H1-H3c regressions — don't silently drop it, but don't lean on
it as a headline finding either.

## 3. Category/type-level noise does not undermine the construct

The weaker category/type-level agreement (median ~0.4-0.6 category, often <0.3 for rare sport
types) is exactly what the D-3 caveat already on record for OA-A.2 predicted (LQ instability
in low-POI-base PLRs) — this is a known, pre-flagged limitation of the *finest*-grain reading,
not new information that changes the interpretation of OA as a construct. The domain-level
headline is the correct level at which to make the "does the 2018 finding still hold"
judgment, and it holds well.

## 4. The Biergarten crosswalk divergence is handled correctly, and is itself a small
   finding worth keeping on record

The thesis's placement of Biergarten under Vergnügung (Entertainment/leisure) rather than
Gastronomie is a defensible period-specific classification choice (a Berlin beer garden reads
as much as a leisure destination as a food venue) that the current OSM-derived taxonomy
happens to classify differently. This is a genuine, small taxonomy-drift finding in its own
right — not a bug to silently paper over — and the crosswalk documents it transparently
rather than either (a) forcing a taxonomy change to `seed_poi_mapping.csv` (out of scope, and
would perturb other downstream models) or (b) dropping the leaf. Correct handling.

## 5. Framing discipline maintained (D-1/D-2 from OA-A.2, still binding)

Nothing in this ticket's findings file, crosswalk, or analysis script frames OA as a causal
displacement predictor or sums raw OA across types into a composite score — the reporting
stays at the descriptive, per-leaf level consistent with the OA-A.2 domain-expert conditions.
Good discipline carried forward.

## Verdict

**PASS WITH CONDITIONS.** The domain-level direct validation supports the Epic B directional
claim: the thesis's OA-based retail-succession signal persists on independently rebuilt data.
Condition D-1 (flag Office/Büro as lower-confidence) is forward-looking guidance for OA-A.4,
not a blocker for integrating this ticket into `develop`.

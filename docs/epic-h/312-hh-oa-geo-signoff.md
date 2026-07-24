---
task: H-C5-OA / #312 — Re-fit C5 OSM-completeness-bias correction for Hamburg `mart_poi_offering_advantage`
author: geo-data-scientist
date: 2026-07-24
branch: feature/312-hh-oa-completeness-bias-refit
---

# Geo-DS methodology sign-off — Hamburg C5 completeness-bias re-fit for Offering Advantage

- **Branch:** `feature/312-hh-oa-completeness-bias-refit` (two commits ahead of `develop`).
- **Issue / task:** #312 [H-C5-OA] — re-fit the C5 OSM-completeness-bias correction for the OA mart
  family before treating Hamburg's already-computed `mart_poi_offering_advantage` rows (and the
  already-live `/hamburg/poi-map` page they feed) as methodologically cleared.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1). Independent of the coder/reviewer
  discussion — verdict formed from the SQL, the analysis script, the seed, and my own warehouse
  re-run, not from the investigation doc alone.
- **Artefacts reviewed:**
  - `docs/epic-h/312-oa-c5-geo-spike.md` (the data-engineer's investigation — treated as a claim to
    be tested, not accepted).
  - `transform/models/intermediate/int_poi_offering_advantage.sql` (LQ construct + header re-fit note).
  - `transform/models/intermediate/int_poi_offering_advantage_methods.sql` (nine-method definitions).
  - `analysis/d_oa_mode_comparison.py` (`run_contamination_gate`, deliverable 4).
  - `transform/seeds/seed_oa_calculation_methods.csv` (`expected_temporal_safe` classing).
  - `transform/models/marts/schema.yml` diff (the `accepted_values:["BER","HH"]` additions).
  - Cross-reference: `docs/epic-h/158-hc1-geo-spike.md`/`158-hc1-geo-signoff.md` (the dynamism C5
    precedent), `docs/methodology/OA-D5-mode-comparison-findings.md` (the Berlin-only gate).

`int_poi_offering_advantage.sql` and `int_poi_offering_advantage_methods.sql` are methodology-bearing
per CLAUDE.md's gate list, so this change requires a formal geo-DS `PASS` before PM integration into
`develop` (R-C1), even though it changes no math.

## a. Is the algebraic same-year-invariance argument correct?

**Yes, for the class of bias it actually addresses — and I confirmed it against the SQL, not the
prose.** Reading `int_poi_offering_advantage.sql`, all six reference bases (`type/category/domain/
all_domains _local` and `_city`) are window `SUM`s over the *same* `combined_base` CTE, every one
partitioned by `snapshot_year` (and `area_vintage`, `weight_variant`). There is **no cross-year
join** and **no asymmetric completeness exposure**: `oa_domain = (domain_local/all_domains_local) /
(domain_city/all_domains_city)`, and a scalar per-year multiplier `c(year)` applied uniformly to
every count within a year multiplies numerator and denominator of each single-year share identically
and cancels exactly. This is genuinely a **stronger** structural footing than `dynamism_score`'s
YoY-delta construct (#158), which needs cross-year comparability; the LQ ratio needs none. `log_lq`
(monotone transform) and `share_diff` (difference of two individually-invariant shares) inherit the
same exact invariance.

**Two honest qualifications the doc's "all LQ family" framing under-states (not blockers):**

1. **`shrunk_lq` is only *approximately* invariant**, not exactly: its pseudo-count `k`
   (`oa_min_poi_base_n`, default 10) is a fixed constant *not* scaled by `c(year)`, so
   `(c·local + k·city_share)/(c·local_base + k)` does not cancel `c` cleanly; the residual vanishes
   as base → ∞. Empirically negligible (my re-run: HH rho = -0.007, n.s.), but it is the empirical
   gate, not the algebra, that clears it.
2. **The scalar-multiplier premise is the *weak* threat model.** `raw_share` (local/local_base,
   same year) is *also* algebraically invariant to a uniform `c(year)` — yet the seed correctly flags
   it `expected_temporal_safe=false`. That is the tell: the realistic completeness bias is **not** a
   uniform scalar. It is **compositional** (some POI types/tags are mapped earlier and faster than
   others) and **geographically clustered** (Haklay 2010 — poorer/peripheral areas under-mapped),
   and a same-year scalar-cancellation argument protects against **neither** per-type nor per-area
   non-uniform growth. So the algebra is correct as far as it reaches, but the **load-bearing**
   protection for Hamburg — for every method, not just the four flagged ones — is the *empirical*
   contamination gate below, not the invariance proof. The spike's §2 over-weights the algebra and
   its risks section under-weights this; I record it here so the public methodology page (G2) frames
   the guarantee accurately rather than overclaiming structural immunity.

## b. Does the empirical Hamburg gate re-run hold up? (independent reproduction)

**Yes — reproduced from scratch.** I did not trust the doc's table; I re-implemented
`run_contamination_gate`'s exact query shape (same join grain, same domain-level coverage proxy
`all_domains_stock_city`, same YoY-delta-vs-coverage-delta Spearman, same |rho|≥0.3 & p<0.05 fail
rule, same `standard`/`faithful` scope) with the city filter swapped to `HH`, and re-verified Berlin
in the same pass. Result (my run, current warehouse):

| Method | BER rho (mine) | HH rho (mine) | HH doc | HH pass? |
|---|---|---|---|---|
| nested_lq | +0.062 | -0.026 | -0.032 | yes |
| global_lq | +0.062 | -0.026 | -0.032 | yes |
| log_lq | +0.057 | -0.027 | -0.033 | yes |
| share_diff | +0.073 | -0.041 | -0.041 | yes |
| shrunk_lq | +0.035 | -0.007 | -0.013 | yes |
| raw_share | +0.050 | -0.036 | -0.035 | yes |
| zscore_slq | +0.036 | -0.015 (p=0.055) | -0.019 | yes |
| density | +0.004 | +0.039 | +0.033 | yes |
| percapita | indeterminate (n=540) | **+0.023 (n=9340, determinate)** | +0.015 | yes |

All nine pass for Hamburg, |rho| ≤ 0.041, far under the 0.3 threshold — including the four
non-invariant methods (`raw_share`, `zscore_slq`, `density`, `percapita`) that rely *entirely* on
this empirical check. HH row count (n=15962 on the relative+density family; percapita n=9340) matches
the doc exactly; Hamburg's `percapita` is genuinely **determinate** (multiple EWR reference-year
transitions) where Berlin's is indeterminate — confirmed, and it too passes. Third-decimal drift vs
the doc is ordinary warehouse-refresh noise, and does not move any pass/fail call.

## c. Is the completeness proxy Hamburg-appropriate?

**Yes.** The proxy is `all_domains_stock_city` — the *city-wide* all-domains POI stock, which
`int_poi_offering_advantage.sql` computes per `city_code` partition. When filtered to `HH` it is
**Hamburg's own** city-wide OSM POI-count growth series, not a Berlin constant leaking in. The
mapper-growth curve pulled directly from `fct_poi_development` (OA's own source table) shows Hamburg's
2008–2026 coverage has the same cold-start-then-stabilize-~2014/2015 shape #158 already validated for
Hamburg; nothing in the proxy construction is silently Berlin-specific. The gate is therefore
meaningful for Hamburg, not a re-labelled Berlin run.

## d. Grounding (R-C2)

Satisfied. Both intermediate models' new `#312` header blocks cite the spike doc, #158, and the
OA-D0 geo sign-off Condition C3 lineage; the schema.yml `accepted_values` descriptions cite the spike
and name the specific columns (oa_domain/poi_density_per_km2) the gate covers. The underlying LQ,
shrinkage, z-score, density and per-capita constructs remain cited to Isard (1960), Efron & Morris
(1975), Agresti (2013), Isserman (1977), Wilson (1927), Openshaw (1984) and Haklay (2010) as before.

## e. `accepted_values:["BER","HH"]` scope correctness

**Correct and safe to publish.** The addition on `mart_poi_offering_advantage_map.city_code` (which
was `not_null`-only despite already feeding the live `/hamburg/poi-map` YoY-delta toggle) is exactly
the right place to close a real gate gap; the LQ columns are structurally invariant and
`poi_density_per_km2`/`oa_domain` pass the empirical gate for Hamburg at the citywide level. The
descriptions on `mart_poi_offering_advantage` and `mart_poi_oa_methods` are documentation-only
re-validations of a test already present. No math, partition, or normalization changed — confirmed
against the full diff (docs + two header blocks + schema.yml only; zero change to any `select` list,
window partition, or formula).

## Conditions (all non-blocking; do before/at publish, not gating this merge)

1. **Frame the guarantee honestly on the G2 methodology page.** State that the *structural*
   invariance covers only an area-uniform per-year scalar; protection against the realistic
   compositional / geographically-clustered completeness bias rests on the **empirical** citywide
   gate (this run), for every method — do not present the algebra as blanket structural immunity.
2. **The citywide gate is supportive evidence, not a live per-cell YoY-delta authorization.** This is
   unchanged from Berlin and correctly carried in the doc/headers; the OA-D7 per-cell completeness
   flag remains unbuilt for both cities. The `/hamburg/poi-map` YoY toggle ships under the identical
   standing caveat Berlin's already does — acceptable, but the per-cell flag stays an open follow-up.
3. **R4 (make `run_contamination_gate` city-agnostic) should be tracked.** The committed script is
   still hardcoded to Berlin; the Hamburg numbers (mine and the doc's) come from an ad-hoc filter
   swap, so the Hamburg gate is not yet reproducible from committed code. The doc's caution about
   `area_code` collision if `city_code` is dropped from the delta partition is correct and must be
   honored when that refactor lands.

## Independent-review status

The `data-engineer-reviewer`'s review is separate; my reproduction was blind to it. No
code-correctness concerns are outstanding from the methodology side. The paired
`gentrification-domain-expert` sign-off (D-1/D-2/D-3 interpretation guardrails for Hamburg's Gebiet
grain) is required in addition to this one before PM integration (R-C1) and is being produced
independently.

## Scope / residual notes

- Untrusted-input note (SEC-3): every figure here derives from the local warehouse
  (`data/gentriduck.duckdb`), the repo diff, and repo files; no external/web content informed this
  assessment.
- The D-3 min-base-flag finer-grain interaction (Hamburg's ~945-Gebiet grain trips the advisory flag
  more often than Berlin's ~542-PLR grain) is a grain consequence, not a C5/completeness defect, and
  is a domain-narrative question for the paired sign-off — not a normalization issue for this gate.

## Verdict

The OA location-quotient family is a same-year local-share/city-share ratio, structurally invariant
to an area-uniform per-year OSM completeness multiplier (verified against the SQL's window
partitions), and — more importantly for the realistic non-scalar bias — **all nine registered OA
methods empirically pass the extended completeness-contamination gate for Hamburg** (|rho| ≤ 0.041 vs
the 0.3 threshold), which I independently reproduced from the warehouse, including the four
non-invariant methods and Hamburg's now-determinate `percapita`. No governed math changed; the
`accepted_values:["BER","HH"]` additions are methodologically justified. Conditions above are
documentation/framing and follow-up items, not merge blockers.

```json
{
  "verdict": "pass",
  "rationale": "OA LQ family (nested/global/log/share_diff/shrunk) is a same-year local/city share ratio, invariant to an area-uniform per-year completeness multiplier -- verified against int_poi_offering_advantage.sql's per-year window partitions (no cross-year join, no asymmetric exposure). More decisively, I independently re-ran the OA-D0 C3 completeness-contamination gate for Hamburg from the warehouse: all nine methods pass (|rho|<=0.041 << 0.3), matching the spike's table within refresh drift, including raw_share/zscore_slq/density/percapita (the four expected_temporal_safe=false methods that rely solely on this empirical check) and Hamburg's determinate percapita. Proxy (all_domains_stock_city) is Hamburg's own city-wide series, not Berlin-specific. No governed math/partition/normalization changed; accepted_values=['BER','HH'] additions (incl. the previously-untested mart_poi_offering_advantage_map feeding the live /hamburg/poi-map page) are justified.",
  "risks": [
    "The structural invariance proof covers only a uniform per-year scalar; realistic completeness bias is compositional/geographically-clustered (raw_share is algebraically scalar-invariant yet flagged unsafe) -- protection there rests on the empirical gate, not the algebra. Spike's framing over-weights the algebra; G2 page must frame this honestly.",
    "shrunk_lq is only approximately scalar-invariant (fixed pseudo-count k not scaled by c); empirically negligible (rho=-0.007) but cleared by the gate, not the proof.",
    "Citywide gate is supportive evidence only, not a live per-cell YoY-delta authorization; the OA-D7 per-cell completeness flag is still unbuilt for both cities, yet /hamburg/poi-map already ships the YoY toggle (under Berlin's identical standing caveat).",
    "run_contamination_gate is still hardcoded to Berlin; Hamburg numbers come from an ad-hoc filter swap and are not yet reproducible from committed code (R4)."
  ],
  "recommendations": [
    "Integrate into develop once the paired gentrification-domain-expert sign-off also records PASS.",
    "On the G2 methodology page, distinguish structural (scalar-only) invariance from the empirical gate that carries the real protection, for all nine methods.",
    "Track R4 (city-agnostic contamination gate) with the documented area_code-collision caution so future Hamburg re-runs are code-reproducible.",
    "Keep the per-cell completeness flag (OA-D7 carried condition) as the standing prerequisite for any method-specific live YoY delta, both cities."
  ]
}
```

**Verdict: PASS WITH CONDITIONS**

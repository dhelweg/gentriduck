---
task: H-OA / #318 — Make the OA completeness-contamination gate city-reproducible (closes #312 R4)
author: geo-data-scientist
date: 2026-07-25
branch: feature/318-hh-oa-gate-reproducible
---

# Geo-DS methodology sign-off — #318 city-parametrized OA completeness-contamination gate

- **Branch:** `feature/318-hh-oa-gate-reproducible` (off `develop`, uncommitted working tree).
- **Issue / task:** #318 — parametrize `run_contamination_gate` / `load_methods_level` in
  `analysis/d_oa_mode_comparison.py` by `city_code` (new `_city_filter_sql` helper + `--city-code`
  CLI flag) and commit a reproducible Hamburg run (`docs/methodology/OA-D5-hamburg-addendum.md`).
  This directly closes **Condition R4** of my #312 sign-off (`docs/epic-h/312-hh-oa-geo-signoff.md`),
  which flagged the Hamburg gate numbers as an uncommitted ad hoc filter swap.
- **Why gated:** `analysis/*.py` is unconditionally methodology-bearing per CLAUDE.md's R-C1 list, so
  this needs a geo-DS `PASS` before PM integration into `develop` — even though the change's own
  scope is narrow (city filter + doc reorg; no threshold/weight/normalization/join-grain change).
- **Independence:** verdict formed from the diff, the source, the two docs, and my own warehouse
  re-run, not from the investigation prose.

## a. Is the gate logic itself unchanged?

**Yes — confirmed line by line.** The load-bearing statistics are byte-for-byte identical:

- `CONTAMINATION_THRESHOLD = 0.3` (OA-D0 C3), `ALPHA = 0.05`, `MIN_N = 10` — all unchanged.
- The fail rule is still `temporal_unsafe = abs(rho) >= CONTAMINATION_THRESHOLD and p < ALPHA`.
- The correlation is still `scipy.stats.spearmanr` on year-over-year **deltas** (method delta vs
  `all_domains_stock_city` coverage delta) — the rank-based, temporal-safe construct, with the
  `#285` constant-input / single-transition guards (`n_transitions < 2` → indeterminate, NaN →
  indeterminate) intact and unmodified.
- The join grain is untouched: the `ON` clause (`poi_type_h`/…/`weight_variant`/
  `methodology_variant`) and the `weight_variant='standard' AND methodology_variant='faithful'`
  scope are unchanged. Only the `WHERE` city filter and the `GROUP BY` key changed.

`_city_filter_sql('BER')` (the default) reproduces the original filter string
`(lower(city_code)='berlin' OR city_code='BER')` exactly — verbatim, with an empty param list — so
the default Berlin path is preserved byte-for-byte. Non-Berlin codes are matched case-insensitively
and parameter-bound (precautionary; the value is CLI/internal, never untrusted text — consistent
with SEC-3).

## b. Is the `(city_code, area_code)` groupby what R4 asked for, and inert for single-city calls?

**Yes on both counts — and I verified the inertness empirically rather than trusting the comment.**
My #312 R4 caution was precisely that dropping/parametrizing the city filter without carrying
`city_code` through the delta partition would be a latent trap if `area_code` ever collides across
cities (Berlin PLR vs Hamburg Gebiet codes). The change adds `m.city_code` to the SELECT and moves
the delta partition from `groupby("area_code")` to `groupby(["city_code","area_code"])` and the sort
key to match — exactly the defensive fix I asked for.

Inertness check: `int_poi_offering_advantage_methods` stores a **single** spelling per city
(`BER` 611,433 rows; `HH` 245,031 rows) — the dual `'berlin'`/`'BER'` filter is defensive but only
`BER` is present. Therefore any single-city filtered result set has exactly one distinct
`city_code`, so adding it to the groupby splits nothing and changes no numbers today. It becomes
load-bearing only if a future caller unions multiple cities before calling this function — the exact
scenario R4 wanted guarded. Correctly inert now, correct later.

I also confirmed the Berlin §4 table drift in the regenerated findings doc (e.g. `nested_lq`
0.053 → 0.046, `zscore_slq` 0.033 → 0.014) is **not** an artifact of the groupby change (it can't be —
Berlin is single-spelling, so the key is inert) but ordinary warehouse-refresh noise between the
2026-07-22 and 2026-07-24 runs. No pass/fail call moves; all Berlin methods remain temporal-safe.

## c. Hamburg result sanity-check vs #312's ad hoc finding

**Consistent — within refresh noise, nothing off.** My independent re-run just now
(`--city-code HH`):

| Method | rho (my run) | addendum | #312 signoff | pass? |
|---|---|---|---|---|
| nested_lq | -0.023 | -0.025 | -0.026 | yes |
| global_lq | -0.023 | -0.025 | -0.026 | yes |
| log_lq | -0.025 | -0.027 | -0.027 | yes |
| share_diff | -0.046 | -0.038 | -0.041 | yes |
| shrunk_lq | -0.004 | -0.008 | -0.007 | yes |
| raw_share | -0.039 | -0.028 | -0.036 | yes |
| zscore_slq | -0.015 | -0.016 | -0.015 | yes |
| density | 0.033 | 0.043 | 0.039 | yes |
| percapita | 0.014 | 0.001 | 0.023 | yes |

**9/9 PASS**, `|rho| <= 0.046` (my run), all far under 0.3; `n=15962` for the relative+density
family and `n=9340` for the determinate `percapita` — row counts match #312 and the addendum
exactly. The third-decimal spread across the three runs is ordinary warehouse-refresh drift (interim
OSM/EWR ingestion); no method approaches the threshold and no pass/fail call is sensitive to it.
Hamburg's `percapita` is genuinely determinate (multiple EWR reference-year transitions) where
Berlin's is indeterminate — as established in #312. The addendum's reported figures and claims are a
faithful, honest record; its |rho|<=0.043 sits inside the run-to-run band my own |rho|<=0.046 also
falls in.

## d. Doc reorg (Hamburg addendum as a separate file)

Sound. The Hamburg record lives in `OA-D5-hamburg-addendum.md`, hand-maintained and never opened by
the Berlin code path, precisely because `OA-D5-mode-comparison-findings.md` is fully overwritten by
every default run — a hand-added Hamburg section inside it would be silently destroyed on the next
refresh. The addendum correctly restates the standing caveats (citywide gate is supportive evidence,
not a per-cell live-YoY-delta authorization; OA-D7 per-cell flag still unbuilt for both cities) and
does not overclaim.

## e. Grounding (R-C2)

Satisfied. The new helper and CLI text cite #312's R4, the OA-D0 C3 lineage, and the findings-doc
§4; no methodology citation was removed. The threshold/method citations (Openshaw 1984; the C3
sign-off) are unchanged.

## Untrusted input (SEC-3)

Every figure here derives from the local warehouse (`data/gentriduck.duckdb`), the repo diff, and
repo files. No external/web content informed this assessment.

## Verdict

The change does exactly what #312 R4 required and nothing more: it makes the Hamburg completeness-
contamination gate reproducible from a single committed command, with the gate's threshold, Spearman
delta-vs-coverage construct, join grain, and scope all unchanged; the default Berlin path is
preserved byte-for-byte; and the `(city_code, area_code)` groupby is the defensive collision guard I
asked for, verified inert for today's single-spelling single-city result sets and correct for a
future multi-city union. I independently reproduced the Hamburg 9/9 PASS from the warehouse. No
governed math, partition, or normalization changed.

```json
{
  "verdict": "pass",
  "rationale": "#318 parametrizes the OA completeness-contamination gate by city_code (new _city_filter_sql helper + --city-code CLI) and commits a reproducible Hamburg run, closing my #312 sign-off Condition R4. Verified line-by-line that the gate math is unchanged: CONTAMINATION_THRESHOLD=0.3, ALPHA=0.05, MIN_N=10, the abs(rho)>=0.3 & p<0.05 fail rule, the scipy spearmanr YoY-delta-vs-coverage-delta construct, and the #285 constant-input/single-transition guards are all identical; only the WHERE city filter and the delta GROUP BY key changed, and the join ON/scope is untouched. _city_filter_sql('BER') reproduces the original filter byte-for-byte. The (city_code, area_code) groupby is exactly the R4 collision guard I requested; I confirmed it is inert for numbers today because int_poi_offering_advantage_methods stores one spelling per city (BER only under the Berlin filter, HH separately), so a single-city result has one distinct city_code -- Berlin's §4 drift is warehouse-refresh noise, not a groupby artifact. I independently re-ran --city-code HH: 9/9 pass, |rho|<=0.046, n=15962 (family)/9340 (determinate percapita), matching the addendum and #312 within third-decimal refresh drift; no method nears 0.3.",
  "risks": [
    "The gate remains a citywide, per-method check -- supportive evidence, not a live per-cell YoY-delta authorization; the OA-D7 per-cell completeness flag stays unbuilt for both cities (carried standing condition, unchanged by #318).",
    "Run-to-run third-decimal rho drift from warehouse refreshes is expected; the addendum is hand-maintained, so a future materially different result (a pass/fail flip, not drift) must be re-recorded by hand -- the doc already instructs this.",
    "The single-spelling-per-city inertness holds for the current warehouse; if int_poi_offering_advantage_methods ever admits dual spellings for one city, the (city_code, area_code) key would split them -- but that would be a data-model defect, and the key is the correct guard regardless."
  ],
  "recommendations": [
    "Integrate into develop (pass); the paired gentrification-domain-expert sign-off is not additionally required here since #318 changes no indicator/interpretation, only tooling reproducibility -- confirm with PM per R-C1 whether the domain gate re-binds for a tooling-only analysis change.",
    "Mark #312 Condition R4 as closed by this ticket.",
    "Keep the OA-D7 per-cell completeness flag as the standing prerequisite for any method-specific live YoY delta, both cities (unchanged)."
  ]
}
```

Verdict: PASS

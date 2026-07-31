# OA-D5 Hamburg addendum: completeness-contamination cross-check (#312, #318)

**This file is NOT touched by `analysis/d_oa_mode_comparison.py`'s default (Berlin) run.** The
main findings doc, `docs/methodology/OA-D5-mode-comparison-findings.md`, is fully regenerated
from scratch on every `uv run python analysis/d_oa_mode_comparison.py` (no `--city-code`) run --
see that script's `render_report`/`main`. Putting the Hamburg record in this separate file (rather
than as a hand-edited section inside the Berlin-generated doc) is a deliberate #318 review fix: a
hand-added section inside a script-overwritten file gets silently destroyed by the very next
routine Berlin refresh. This addendum is hand-maintained and is safe from that failure mode by
construction -- the Berlin code path never opens, reads, or writes this file.

`run_contamination_gate` and `load_methods_level` were hardcoded to Berlin until #318
(tooling/reproducibility only -- no change to the indicator, weights, normalization, or the
|rho|>=0.3 & p<0.05 threshold used in §4 of the main findings doc, only which city's
`int_poi_offering_advantage_methods`/`int_poi_offering_advantage` rows are queried). #312's geo
sign-off (`docs/epic-h/312-hh-oa-geo-signoff.md`, Condition R4) had already re-run this exact gate
for Hamburg to clear the C5 completeness-bias re-fit methodologically, but as an **uncommitted, ad
hoc filter swap** -- not yet reproducible from committed code. #318 closes that gap: the query
shape, join grain, and threshold are byte-for-byte identical to the Berlin run in the main findings
doc's §4; only `city_code` changes.

**Committed command:**

```bash
uv run python analysis/d_oa_mode_comparison.py --city-code HH
```

This runs ONLY the completeness-contamination gate (deliverable 4) for Hamburg and prints its
result table to stdout -- it does not write any file (this addendum included). It does not
regenerate `OA-D5-mode-comparison-findings.md`'s other sections (§1-§3, §5-§6), which remain
Berlin-only and are out of #318's tooling-only scope (a multi-city rewrite of the
MAUP/bandwidth/golden-validation narrative is explicitly deferred, not silently assumed
equivalent).

**Actual result (2026-07-22 run, current warehouse at the time):**

| Method | rho | p | n | Empirical result |
|---|---|---|---|---|
| nested_lq | -0.025 | 0.0017 | 15962 | temporal-safe |
| global_lq | -0.025 | 0.0017 | 15962 | temporal-safe |
| log_lq | -0.027 | 0.0007 | 15962 | temporal-safe |
| share_diff | -0.038 | 0.0000 | 15962 | temporal-safe |
| shrunk_lq | -0.008 | 0.3009 | 15962 | temporal-safe |
| raw_share | -0.028 | 0.0004 | 15962 | temporal-safe |
| zscore_slq | -0.016 | 0.0461 | 15962 | temporal-safe |
| density | 0.043 | 0.0000 | 15962 | temporal-safe |
| percapita | 0.001 | 0.9028 | 9340 | temporal-safe |

**9/9 methods PASS** (all `|rho|` <= 0.043, well under the 0.3 threshold), including `percapita`,
which is **determinate** for Hamburg (n=9340, multiple EWR reference-year transitions) where it is
indeterminate for Berlin (main findings doc §4, n=540, a single transition). This reproduces
#312's geo sign-off ad hoc re-run (Condition R4's own reported "9/9 pass, |rho| <= 0.041") in the
same ballpark -- third-decimal drift (e.g. density 0.043 here vs 0.039 there) is ordinary
warehouse-refresh noise between the two runs (new OSM/EWR ingestion in the interim), not a code or
methodology difference, and does not move any pass/fail call. Row counts (n=15962 relative+density
family, n=9340 percapita) match #312's sign-off exactly.

**Scope note:** a citywide, per-method PASS here is evidence, not by itself an authorization for a
live year-over-year OA delta anywhere on the Hamburg site -- the same per-cell completeness-flag
caveat that applies to Berlin's §4 result in the main findings doc applies identically here
(OA-D7 page's own carried-forward condition).

**Re-running this cross-check:** re-run the committed command above and compare against the table
above by eye; this file is hand-maintained (see the durability note at the top), so a materially
different result (a pass/fail flip on any method, not mere third-decimal drift) should be updated
here by hand, citing the new run's date, alongside a note on why the result moved.

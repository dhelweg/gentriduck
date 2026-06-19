---
task: R-A5 / #68 — EWR indicator-semantics audit + #85 mean_age_years sign fix
author: geo-data-scientist
date: 2026-06-19
pr: 89 (fix/85-mean-age-sign)
---

# Geo-DS sign-off — R-A5 + #85 mean_age_years sign correction

Full audit and reasoning: `docs/methodology/indicator-semantics.md`.

## Summary

The `mean_age_years` negation (`-1.0 *`) in `int_ewr_socioeco.sql` was identified in the R-A5 audit
(§4, §8) as the single sign in `ewr_composite` that was not defensible. The fix in PR #89 removes that
negation, making all five composite inputs vulnerability-positive and resolving the internal inconsistency.

The build passes at PASS=277 WARN=1 ERROR=0 with the fix applied.

```
Verdict: PASS
Ref: docs/methodology/indicator-semantics.md §9 (post-fix re-signoff)
Conditions cleared: sign fix applied (§8 condition #1), comments aligned (§8 condition #2)
Remaining (non-blocking): G2 page levels-vs-changes note (§8 condition #3)
```

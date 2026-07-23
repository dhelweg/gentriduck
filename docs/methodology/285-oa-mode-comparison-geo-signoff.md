# 285 (OA-D5b) — Cross-Mode Comparison Extension (density / per-capita) — Geo-DS Sign-off

**Gate:** R-C1 methodology gate, geo half (`geo-data-scientist`).
**Scope:** issue #285, branch `feature/285-oa-mode-comparison-extend`, commits `c8899b22`
(analysis extension) + `7fd9bce9` (OA-D7 page update). Not yet merged into `develop`.
**Reviewer note:** This is a **fresh, independent turn.** I worked from the primary artefacts only
(the two diffs, `seed_oa_calculation_methods.csv`, the regenerated
`docs/methodology/OA-D5-mode-comparison-findings.md`, and `web/pages/methodology-oa-modes.md`). I did
**not** read any pre-existing PM-authored analysis of this change.

## Verdict: PASS

The extension is methodologically sound. The never-blend discipline is enforced structurally (not
merely asserted), the completeness-gate extension reuses the established proxy/threshold without
reinvention, the "indeterminate" handling of per-capita is the correct call from first principles,
the latent NaN-mislabel bug is fixed correctly and generally, density's citywide PASS is not
over-read anywhere, and Getis-Ord is genuinely absent and honestly placeheld. No conditions.

---

## Findings against the five requested checks

### 1. Never-blend enforcement (ADR-0017/ADR-0024 D3) — verified in code, PASS
The classing is **query-driven** from the seed's own `reference_point` column
(`_load_method_registry`), not a hand-maintained method list — this removes the main drift risk. The
absolute methods are correlated against the relative family in a **separate deliverable (§1b)** with
its own heading, an HTML `NEVER BLEND` comment in the emitted markdown, and prose that a correlation
here is "a coincidence of geography, not a validation of either construct against the other." The
script emits **markdown tables only** — no chart, no shared axis, no shared colour scale can arise
from it. On the OA-D7 page, the bar chart "only ever plots the three methods that genuinely share a
unit"; density/per-capita appear stock-only in a table with their own `reference_point` column, never
on a shared numeric axis.

On the statistical question — **is rank-correlating absolute vs relative for information safe?** Yes.
Spearman ρ is a rank statistic, scale- and unit-invariant, so it does not blend the incompatible
units (POIs/km², POIs/1000 residents, ratio-centred-on-1) into any common metric — the exact hazard
never-blend guards against. The residual risk (a reader seeing density↔percapita ρ≈0.7–0.8 and
inferring interchangeability) is disarmed explicitly: the text attributes that correlation to the
shared local-POI-count numerator and states it is not agreement between constructs. Presenting it as a
number in a table, not a plotted relationship, is the right containment. **Appropriate and safe.**

### 2. "Indeterminate" for per-capita — statistically defensible, PASS
Berlin's exact-year EWR-to-POI join yields a single usable year-over-year transition (2024→2025),
making `coverage_delta` constant across the panel; Spearman against a constant is mathematically
undefined (SciPy returns NaN). With **n=1 transition there is no evidence either for or against
contamination** — the correlation the gate needs cannot be estimated at all. Reporting this as
**indeterminate** is the correct first-principles call:
- It is *not* "safe" — there is no PASS evidence, and the code correctly treats it as temporal-unsafe
  in effect (no delta is published; the OA-D7 page stays stock-only).
- It is also *not* a hard empirical "FAIL/unsafe" — that would assert a contamination finding the
  data cannot support, which would be as much an overclaim as a false PASS.
- It correctly does **not** block publishing everything else: the honest, bounded disclosure ("this
  one test cannot run yet; here is exactly why and what would fix it — closing the 2021–2023 EWR
  reference-year gap") is superior to withholding the whole study.

The distinction the code draws between `insufficient data (n < MIN_N)` and `indeterminate (Spearman
undefined against a constant)` is a real and useful one, not cosmetic. Correct.

### 3. The NaN-guard fix — statistically correct as a general rule, PASS
The pre-existing `bool(abs(rho) >= 0.3 and p < ALPHA)` had no NaN guard, and `abs(nan) >= 0.3`
evaluates `False` in Python — so a NaN correlation would have been silently labelled temporal-**safe**
(the dangerous direction: a false clean bill of health). The fix adds **two guards before the
threshold ever sees rho**: (a) an explicit `coverage_delta.nunique() < 2` check that catches the
constant-input case up front with an informative note, and (b) a `pd.isna(rho)` fallback after
`spearmanr`. The threshold comparison is only reached on a finite rho.

This is the **correct general fix**, not a per-percapita patch: undefinedness is intercepted and
routed to "indeterminate → not safe" rather than being allowed to fall through the boolean as a false
PASS. Because it now governs every future method added to the comparison, the fail-closed default (no
evidence ⇒ not treated as safe) is exactly the right invariant. Two small robustness notes, **neither
a condition**: guard (a) keys on `coverage_delta` specifically (valid today because the coverage proxy
is a citywide constant per year); a future method whose *own* delta side is constant while coverage
varies is still caught by guard (b), so the pair is belt-and-suspenders complete. Nothing to change.

### 4. Density's citywide PASS — not over-read anywhere, PASS
This was the check most likely to surface a problem, and it holds. Every place the citywide PASS
appears, it is immediately fenced against the stricter bar:
- The module docstring, the findings §4 narrative, and the summary table all state the PASS "does not,
  by itself, authorize a live year-over-year delta" because **OA-D0 domain sign-off Condition C.2
  requires a per-cell (per-area, per-year) PASS**, which is materially stronger than a citywide,
  per-method aggregate.
- The OA-D7 page repeats this in the carried-forward-condition block, the live-table caveat, the §6
  "does not" list, and §7. I found **no** statement anywhere claiming density is "safe to difference at
  the individual-area level." The page remains stock-only for both absolute methods.
The citywide PASS is correctly framed as *supportive evidence a future per-cell-badge ticket may
cite*, never a substitute for it. Correctly scoped.

### 5. Getis-Ord placeholder — genuinely absent and accurately placeheld, PASS
`seed_oa_calculation_methods.csv` has exactly nine rows and **no `getis_ord` row** (verified directly).
`GETIS_ORD_REGISTERED` is computed from the seed, deliverable §6 is a note (no fabricated numbers), and
the text correctly states ADR-0025 is status **Proposed** and that the slot is "gated on that slice
existing." The placeholder is honest — it cannot mislead a reader into thinking Gi* is available. The
observation that Gi* is a spatial-clustering statistic and may not even be a Spearman-comparable column
(left to the future ticket, not pre-judged) is methodologically astute. Correct.

## Additional spatial/statistical checks
- **Query-driven classing** eliminates the hardcoded-method-list drift risk (#280 R1/F2 precedent) and
  preserves seed row order, so the seven-method §1a output stays code-path-identical to the original
  run (numeric drift correctly disclosed as ordinary warehouse refresh, not a methodology change).
- **Scope honesty** on the deliverables density/percapita are *excluded* from (MAUP roll-up, bandwidth
  sweep, golden validation) is accurate and consistent with the reasons the other non-canonical
  methods are excluded — no silent equivalence assumed.
- **Grounding (R-C2):** citations to Openshaw (1984), Isard (1960), OA-D0 geo Conditions C5/C8/C10 and
  domain Condition C, and ADR-0017/0024 are present in the module docstring and seed grounding column.

## Recommendations (non-blocking)
1. When the EWR 2021–2023 reference-year gap is later ingested, **re-run the gate for per-capita** and
   update the findings/page from "indeterminate" to whatever the multi-transition result supports.
2. When a future method with a genuinely varying per-area coverage side is added, keep guard (b)
   (`pd.isna(rho)`) as the backstop — it is what makes the fix general; do not drop it if guard (a) is
   ever refactored.
3. If Gi* lands via ADR-0025, decide deliberately whether a rank correlation against LQ methods is even
   meaningful for a hotspot-significance statistic before wiring it into §1b.

---
Signed off (geo half): `geo-data-scientist` — fresh independent turn, 2026-07-23.
Domain half (`gentrification-domain-expert`) required separately before PM integration into `develop`.

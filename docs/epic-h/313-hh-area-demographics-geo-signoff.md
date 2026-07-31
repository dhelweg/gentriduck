---
task: H / #313 — Widen mart_area_demographics to Hamburg (individual EWR indicators)
author: geo-data-scientist
date: 2026-07-31
branch: feature/313-hamburg-area-demographics
supersedes: prior revision of this same file (Verdict CONCERNS, 2026-07-31)
---

# Geo-DS methodology sign-off — Hamburg admission into `mart_area_demographics` (re-review)

- **Branch:** `feature/313-hamburg-area-demographics`, HEAD `a98e06aa`, **plus the current
  uncommitted working tree**, which is what this pass assesses.
- **Reviewer:** `geo-data-scientist` (methodology gate, R-C1).
- **Scope:** whether the wiring is spatially and statistically faithful and the disclosures honest.
  Not re-litigating #40/H1 ingestion, H3/#237's composite decision, or #329.

## This revision supersedes the previous one — and why

The prior revision of this file recorded **CONCERNS**, blocking on F1: it reviewed a
`hh_l1_merged_to_district` crosswalk CTE that **did not actually exist in the tree**. Only comments
in `mart_area_demographics.sql` referenced it, and the completeness guard F1 demanded had not been
written. That doc diagnosed its own situation correctly ("the completeness guard required by F1
does not exist… nothing is committed"), so its CONCERNS verdict was **right at the time**.

The tree has since changed: a `data-engineer` implemented the CTE and the completeness test, and a
`data-engineer-reviewer` code-reviewed it. This revision is a **fresh, independent pass**. Every
empirical claim below was re-verified by me directly against the current source files and the built
warehouse (`data/gentriduck.duckdb`, read-only session, 2026-07-31). Nothing is inherited on trust
from the prior doc or from the code-reviewer's report.

**Method note:** `dbt test` could not be invoked (the warehouse file was held by a concurrent
writer's lock). Instead I executed the **relevant tests' SQL inlined, read-only, verbatim**. This is
equivalent for pass/fail and stronger for this gate's purpose, because it forced a line-by-line read
of the test logic rather than trusting a green summary line.

---

## Artefacts reviewed (fresh read)

Full `git diff` of the working tree: `dim_area_hierarchy.sql`, `mart_area_demographics.sql`,
`mart_area_rollup_stage_mix.sql`, `transform/models/{intermediate,marts}/schema.yml`,
`stg_hamburg_ewr_stadtteil.sql`, `ingest_hamburg_ewr_stadtteil.py`,
`test_mart_area_demographics_hh_district_reconciliation.sql`; plus the new untracked
`transform/tests/test_mart_area_demographics_hh_district_completeness.sql`.

---

## 1. `hh_l1_merged_to_district` — VERIFIED CORRECT AND COMPLETE

The CTE now genuinely exists in `dim_area_hierarchy.sql` as a hardcoded 4-row `VALUES` list and is
`union all`-ed into the model's output. Present in the built warehouse:

| area_code | parent_area_level | parent_area_code |
|---|---|---|
| `02117/118` | district | `1` |
| `02119/120` | district | `1` |
| `02702/703` | district | `7` |
| `02711/712` | district | `7` |

**The district assignment is not a judgement call, and I verified that independently** rather than
reading the comment. For each of the 8 constituent individual codes, `dim_area_hierarchy`'s
WFS-sourced parent already says:

`02117` Kleiner Grasbrook → 1 · `02118` Steinwerder → 1 · `02119` Waltershof → 1 ·
`02120` Finkenwerder → 1 · `02702` Neuland → 7 · `02703` Gut Moor → 7 · `02711` Moorburg → 7 ·
`02712` Altenwerder → 7

Both halves of every pair share a Bezirk, so **no population is being allocated across districts** —
this is a lookup of an unambiguous source fact, not an imputation. Names match the documented pairs.

Join-key format checks out: `dim_area`'s HH `district` rows are `'1'`…`'7'` (un-padded single-digit
strings), matching the CTE literals — no silent key mismatch. HH `subarea_l1 → district` edges now
number **108** (104 WFS-digitized individual Stadtteile + 4 composites), all distinct, so no fan-out
risk in the mart's inner join.

**Completeness of the crosswalk:** the EWR series contains exactly **99 distinct `area_code`s in
every one of the 12 years (2013–2024), of which exactly 4 are slash-bearing** — so the 4-row
crosswalk is complete, not a partial patch, and the composite set is stable over time (no
year-varying disclosure pattern to chase).

**Hardcoded `VALUES` over a `substr()` derivation — I endorse and would have required this.**
`'02117/118'` is a two-fragment composite with no well-formed prefix position. A `substr()` rule
that happened to return `'1'` / `'7'` here would be reading a *Stadtteil* digit and coincidentally
landing on the right Bezirk — a disguised hardcode wearing a false air of generality that would
break on the next merged pair. Four explicit, individually source-grounded facts are the honest and
auditable encoding. The grounding comment satisfies R-C2.

## 2. Completeness test — genuinely independent, passes, and demonstrably fails without the fix

`test_mart_area_demographics_hh_district_completeness.sql` compares the mart's **own** `subarea_l1`
`residents_total` sum against its **own** `district` sum, per (`city_code`, `area_vintage`,
`reference_year`). Read line by line: it contains **no `ref("dim_area_hierarchy")`**.

That is the property that matters. The failure mode being guarded — a Stadtteil that fails to
resolve to a district parent — is structurally invisible to the *reconciliation* test, because that
test re-derives its expected values through the same join, so a dropped area cancels on both sides
and the test stays green. The completeness test breaks that circularity by construction. This is
exactly the right fix for the prior pass's F1, and it is the right shape of fix (independent
derivation, not a second copy of the same query).

- **Currently passes:** inlined execution returns **0 rows**.
- **Would fail pre-fix:** simulated by excluding the 4 composite codes from the district side —
  returns **12 rows, one per `reference_year` 2013–2024**, with gaps 15,164 (2013) … **15,310
  (2024)**, matching the test header's claim exactly. The header's assertion is accurate, not
  aspirational — which matters given that the *previous* iteration of this ticket failed precisely
  by asserting verification that had not been performed.

Minor (non-blocking): the `left join` direction means a wholly missing district-level partition also
surfaces as a gap (good), but a spurious *extra* district partition with no subarea counterpart
would not. Not a realistic failure mode for this mart's construction.

## 3. `residents_total` identity Σ subarea_l1 == Σ district — HOLDS, all 12 years

Exact zero difference every year, 1,782,217 (2013) … 1,968,531 (2024). Row counts consistent:
99 × 12 = 1,188 `subarea_l1` rows and 7 × 12 = 84 `district` rows, one `area_vintage` (`current`).

The **reconciliation** test — now including the new `unemployment_share` leg — also returns **0
failing rows** when inlined, so the intensive rollups reproduce exactly under the summed-numerator
rule.

**Materiality of the fix, re-derived independently (2024):** merged-pair population 15,310 = 0.78%
of Hamburg; 12,760 of it in Hamburg-Mitte (**4.12%** of that district) and 2,550 in Harburg
(**1.43%**). All three figures asserted in the model comments are correct. This was a materially
biased district series before the fix, not a rounding nuisance — and Hamburg-Mitte is exactly where
port/industrial-fringe areas matter most to any gentrification reading.

## 4. `mart_area_rollup_stage_mix` `area_name` not-null exception — SOUND, exactly scoped

Exception: `where: "area_level != 'bezirk' and area_code not like '%/%'"`.

Warehouse check of NULL `area_name`: 368 rows at `bezirk` level (pre-existing, documented) and
**52 at `subarea_l1`**, which decompose as exactly the 4 composite codes × 13 periods and
**nothing else**. The exception excuses 52 of 52 non-bezirk NULLs and masks no other row. Scope is
exact, not over-broad — I checked for precisely the "does this hide an unrelated defect" hazard and
found none.

**Methodologically, NULL is correct and a synthesized name would be wrong.** The composite code is
an artefact of the *statistical* publication's disclosure control; it has no WFS feature, no
geometry, and no official toponym. Fabricating `"Kleiner Grasbrook / Steinwerder"` in the warehouse
would invent an authority that does not exist and would smuggle a presentation decision into a data
model. This is the same discipline already applied to the `bezirk` case and to
`export_area_geojson.py`'s `BEZIRK_NAMES` precedent: friendly labels belong in the presentation
layer. No new exception class is introduced.

Consequence for Epic G2 (presentation, not data): these 4 rows will render nameless in any UI keyed
on `area_name`. Handle with an explicit display map plus a footnote explaining the merge — do not
backfill the mart.

## 5. Re-check of F2–F6 and of the prior conditions

### F2 — RESOLVED, and better than "defensible-but-approximate"

The prior pass assumed a working-age denominator and therefore called the `residents_total` weight
approximate. The current diff documents the opposite, and I judge the reading correct:
`arb_arbeitslose_ingesamt_proz` is an "Arbeitslose je 100 Einwohner" (per-total-population) measure.
The arithmetic reproduced in the ingestor docstring — implied citywide registered-unemployed stocks
of ~70.6k (2013), 61.3k (2018), an 81.7k COVID spike (2020), 87.5k (2024) — is only plausible
against total residents; a working-age denominator would imply counts roughly a third lower and a
labour-force denominator lower still, neither reconciling with Hamburg's known registered-unemployed
stock. The 2020 spike behaving as a COVID signature is a further consistency check.

**Consequence: the `residents_total` rollup weight is now exactly correct, not a proxy** — the
weight equals the indicator's own denominator, so the summed-numerator recompute is algebraically
exact. The model header and both `schema.yml` entries say so. F2 as previously written no longer
applies.

The docs also state the **epistemic status honestly** — "population-denominator, consistent with the
internal arithmetic; NOT independently confirmed from a Statistikamt Nord variable definition
document". That is the right register, and I would have insisted on it rather than letting an
inference harden into an asserted fact. The explicit **non-comparability to Berlin's MSS
`arbeitslose_anteil`** (different numerator — all registered unemployed vs. SGB II recipients — *and*
different denominator) is correct, consequential, and correctly located on the column rather than in
a document nobody reads. The warning that this is **not** the German *Arbeitslosenquote* is likewise
right and prevents a very common misreading.

Residual (non-blocking): a Statistikamt Nord variable definition would upgrade this from "strongly
inferred" to "verified". Obtain before Epic G2 publication.

### F3 (NULL-share downward bias) — unchanged, now regression-pinned. Non-blocking.

NULL `unemployment_share` appears from 2018 (5–7 Stadtteile/year; 6 in 2024) and is unmistakably
small-count suppression: the 2024 NULL set is exactly the smallest areas — `02608` (n=497),
`02613` (537), `02612` (560), `02711/712` (729), `02715` (749), `02717` (858).

Rollup behaviour: a NULL-share area's residents stay in the denominator while its share leaves the
numerator, biasing district values **downward**. Quantified for 2024:

| district | mart value | NULLs excluded from denominator | suppressed pop share |
|---|---|---|---|
| 6 Bergedorf | 0.03716 | 0.03761 | 1.19% |
| 7 Harburg | 0.04842 | 0.04907 | 1.31% |
| 1–5 | — | identical | 0% |

≈0.05 pp absolute / ~1.3% relative, confined to two districts. Same magnitude class and same
treatment as the Berlin `foreigners_share` precedent, so cross-city/indicator consistency is
preserved and this is not a regression. The new `unemployment_share` leg of the reconciliation test
now **pins this behaviour** so it cannot drift silently — which is what I asked for. Acceptable;
must appear on the G2 methodology page.

### F4 (small-N reliability) — unchanged, non-blocking

Several Stadtteile sit in the hundreds of residents (min 497 in 2024). Shares are volatile at that N
and year-on-year movement must not be narrated as trend. The source's own suppression already
removes the worst cases for `unemployment_share`. Recommendation stands: a display-time N threshold
(suppress or de-emphasise), and no small-N Stadtteil share into any trend/model without an explicit
N guard.

### F5 (coverage asymmetry) — unchanged, handled correctly in the data

Hamburg 2013–2024 vs. Berlin 2008–2025; Hamburg has `unemployment_share` and Berlin does not; Berlin
has several indicators Hamburg does not; 99 EWR units vs. 104 hierarchy Stadtteile. All absences are
explicit `cast(null as double)` — never fabricated, never cross-imputed. Correct call. The asymmetry
does rule out naive cross-city panel comparison on this mart and must be surfaced in G2.

### F6 (`n_plr` label) — unchanged; slightly *refined* by the fix. Non-blocking doc nit.

`n_plr` for HH districts is `count(*)` over EWR **units**: 16/14/9/13/18/14/15, summing to 99. So
Hamburg-Mitte's `n_plr = 16` now covers **18 actual Stadtteile** (two units are merged pairs), and
Harburg's 15 covers 17. The documented semantics ("number of constituent finer-grain areas") is
therefore marginally imprecise for those two districts. One added line noting that for Hamburg it
counts **published EWR units**, of which 4 are merged pairs, would close it. Aggregation itself is
unaffected; not blocking.

### Prior conditions C-1…C-4

- **C-1 (was blocking) — SATISFIED.** The crosswalk exists in the tree, is correct and complete, is
  grounded per R-C2, and is guarded by a test that is structurally capable of catching its removal —
  demonstrated, not asserted (12 failing rows under simulated removal). The false forward reference
  to a non-existent test file is resolved: the file now exists and does what the comment claims.
- **C-2 — LABEL COLLISION; substance satisfied, one documentation line still open (non-blocking).**
  The prior doc's C-2 was: *"`schema.yml` must state that this mart's exposure of
  `unemployment_share` is **not** clearance for D4 predictor use; #329 remains the ADR-0008
  authority."* The current diff reuses the label "C-2" for the **denominator** condition instead
  (as does the domain sign-off). The denominator condition is fully met (see F2). The original
  ADR-0008 non-clearance sentence is **not literally present** in the `unemployment_share`
  description — I grepped for it. I am **not blocking on this**, because the substantive hazard is
  structurally absent (see C-4 below): nothing can leak from a mart no index reads. It is a
  signposting nicety, and I record it as a recommendation so the relabelling does not quietly retire
  it.
- **C-3 (stigmatization/misuse framing on `unemployment_share`, mirroring `foreigners_share`) —
  SATISFIED.** Present in the model header and both `schema.yml` entries, citing the
  `docs/epic-i/I19-domain-signoff.md` precedent.
- **C-4 (ADR-0008 predictor/outcome separation) — SATISFIED, structurally.** Verified by grep:
  `gentrification_index.sql` explicitly lists `mart_area_demographics` among the marts "explicitly
  NOT admitted". Exposing `unemployment_share` in a display mart therefore opens no leakage path
  into the index. This remains the correct boundary; any future proposal to move the indicator into
  the index needs its own ADR and its own sign-off.

## 6. Standing methodology questions — re-verified

- **Stadtteil grain only (never Gebiet):** still correct and structurally enforced — the mart reads
  `stg_hamburg_ewr_stadtteil`/`int_ewr_demographics_wide_hamburg`, and the warehouse contains no
  Hamburg `subarea_l2` rows. Publishing Hamburg's Gebiet-level values would present ~945 apparently
  independent observations that are really 99 (within-Stadtteil variance is zero by construction) —
  false precision and a textbook MAUP / ecological-inference trap. The diff additionally **corrects
  the grain claim itself** from the false "~104–105 areas" to the true 99 units in the staging model
  and ingestor headers; I confirmed 99 (4 composite) in all 12 years. That is a genuine accuracy
  gain, not just wording.
- **District rollup mechanism and aggregation formulas:** join-based via `dim_area_hierarchy`, not
  `substr()` — necessary, since Hamburg's Schlüssel do not nest into Bezirk codes as Berlin's LOR
  codes do — and matching the Berlin Ortsteil→Bezirk precedent for a non-prefix parent lookup.
  Extensive = `sum`; intensive = `sum(share × residents_total) / nullif(sum(residents_total), 0)`,
  the population-weighted mean, the only defensible ratio rollup, with no unweighted mean anywhere;
  suppression = `bool_or`. Identical rule family to the existing Berlin CTEs — no new aggregation
  semantics. Reconciliation returns 0 failing rows across all indicators and years. The MAUP caveat
  is inherent to any districting and unchanged: Bezirk values are not substitutes for Stadtteil
  values.
- **Hybrid ruling / individual indicators only:** satisfied. This mart builds **no composite**, so
  no weighting decision is taken and there is nothing for a shared-core boundary to regulate; the
  NULL discipline *is* the structural distinction, and it is honest in both directions. My prior
  position stands: define shared-core once in #329 / the D4 composite work, where it actually bites;
  an `is_shared_core` flag here would imply a cross-city blending semantics this mart deliberately
  lacks.
- **Untrusted input (SEC-3):** every figure here derives from the local warehouse, the repo diff and
  repo files. No external or fetched web content informed this assessment, and nothing in the diff
  originates from non-maintainer issue text requiring escalation.

---

## Residual risks (all non-blocking; carried to G2 / follow-ups)

1. Unemployment denominator is **inferred, not confirmed by the source authority** — obtain a
   Statistikamt Nord variable definition before public methodology publication.
2. NULL-share downward bias (~0.05 pp) in Bergedorf and Harburg `unemployment_share`.
3. Small-N volatility in Stadtteile below ~1,000 residents.
4. Berlin/Hamburg coverage asymmetry (years and indicator sets) precludes naive cross-city
   comparison on this mart.
5. `n_plr` counts EWR units, not official Stadtteile, for Hamburg-Mitte and Harburg.
6. The 4 composite codes carry NULL `area_name` and will render nameless downstream until the
   presentation layer supplies a label plus a merge footnote.
7. The prior C-2 ADR-0008 non-clearance sentence was displaced by a label collision and is not
   literally in `schema.yml`; substance is covered structurally.

## Verdict: PASS

The design was already right; what was missing last time was that the fix existed only in prose.
It now exists in the tree, it is correct on every fact I re-derived myself, and — the part I care
about most — it is guarded by a test that is *structurally capable* of catching its own removal and
was *demonstrated* to do so, rather than merely asserted to. That closes both halves of the earlier
failure: the undercount and the false-grounding habit that let it survive.

```json
{
  "verdict": "pass",
  "rationale": "Fresh independent re-verification against the current tree and the built warehouse; nothing inherited from the prior sign-off or the code review. The hh_l1_merged_to_district crosswalk now genuinely exists in dim_area_hierarchy.sql and is unioned into the model output, giving 108 distinct HH subarea_l1->district edges (104 WFS + 4 composite, no fan-out). Its district assignments are correct and involve no allocation judgement: for all 8 constituent Stadtteile the WFS-sourced parent already in dim_area_hierarchy places both halves of every pair in the same Bezirk (02117/02118/02119/02120 -> 1; 02702/02703/02711/02712 -> 7), and join-key format matches dim_area's un-padded single-digit HH district codes. The crosswalk is complete: the EWR series has exactly 99 distinct area_codes in each of the 12 years 2013-2024, exactly 4 of them slash-bearing. The hardcoded VALUES encoding is the methodologically honest choice for slash-composite codes with no well-formed prefix position. The new completeness test contains no dim_area_hierarchy reference, so it is structurally independent of the join it guards, returns 0 rows today, and returns 12 rows (gaps 15,164-15,310, one per year) when the fix is simulated away -- so it demonstrably detects the regression the reconciliation test is blind to by construction. The residents_total identity Sigma subarea_l1 == Sigma district holds exactly for all 12 years, and the reconciliation test including its new unemployment_share leg returns 0 failing rows. The mart_area_rollup_stage_mix not-null exception excuses exactly 52 of 52 non-bezirk NULL area_name rows (4 composite codes x 13 periods) and masks nothing else; NULL is correct and a synthesized name would fabricate an authority that does not exist -- same discipline as the bezirk case, labels belong in the presentation layer. Prior F2 is resolved and improved: the total-population denominator makes the residents_total rollup weight exactly correct rather than a proxy, and the documentation states the inference's epistemic status honestly plus the Berlin MSS non-comparability and the not-Arbeitslosenquote warning. C-1 and C-3 are satisfied in committed-ready form, C-4 (ADR-0008 separation) is satisfied structurally since gentrification_index explicitly does not admit this mart, and the denominator condition now labelled C-2 is fully met. F3-F6 are unchanged, quantified, documented and non-blocking.",
  "supersedes": "Prior revision of docs/epic-h/313-hh-area-demographics-geo-signoff.md (Verdict CONCERNS, 2026-07-31). Its verdict was correct at the time -- the crosswalk it reviewed did not exist in the tree and the completeness guard was unwritten (its own finding F1). None of its conclusions are relied upon here.",
  "risks": [
    "unemployment_share's total-population denominator is strongly inferred from internal arithmetic and column naming, not confirmed by a Statistikamt Nord variable definition document",
    "NULL-share suppression biases district unemployment_share downward by ~0.05pp (~1.3% relative) in Bergedorf and Harburg; suppressed residents remain in the denominator (same behaviour as the Berlin foreigners_share precedent, not a regression)",
    "Small-N volatility: several Stadtteile have under 1,000 residents (min 497 in 2024); shares there are noise-dominated and stigmatization-sensitive",
    "Berlin/Hamburg coverage asymmetry in year range (2008-2025 vs 2013-2024) and indicator set precludes naive cross-city comparison on this mart",
    "n_plr for Hamburg counts published EWR units, not official Stadtteile -- undercounts by 2 in Hamburg-Mitte and 2 in Harburg",
    "The 4 composite codes carry NULL area_name and will render nameless in any UI keyed on area_name until the presentation layer supplies a label",
    "Label collision: the prior sign-off's C-2 (an ADR-0008 'not clearance for D4 predictor use' sentence in schema.yml) was relabelled to the denominator condition and the original sentence is not literally present; the substantive hazard is structurally absent since gentrification_index does not read this mart",
    "MAUP: Bezirk-level values are not substitutes for Stadtteil-level values (inherent, unchanged)"
  ],
  "recommendations": [
    "Seek and cite a Statistikamt Nord variable definition for arb_arbeitslose_ingesamt_proz before the indicator appears on the public methodology page (Epic G2); until then keep the 'inferred, not independently confirmed' wording verbatim and do not let it harden into an asserted fact",
    "Document the NULL-share downward bias and its quantified magnitude on the Epic G2 methodology page",
    "Add a display-time small-N guard (suppress or de-emphasise shares below a residents_total threshold) and never feed small-N Stadtteil shares into a trend model without an explicit N guard",
    "Add one line to the n_plr description stating that for Hamburg it counts published EWR units, of which 4 are merged pairs (doc nit)",
    "Restore the displaced ADR-0008 line: state in unemployment_share's schema.yml description that its presence in this descriptive mart is not clearance for D4 predictor use, with #329 remaining the authority (non-blocking)",
    "Handle display names for the 4 composite codes in the presentation layer with an explicit map plus a merge footnote -- do not backfill area_name in the warehouse",
    "State the Berlin/Hamburg non-comparability of unemployment_share prominently wherever both cities appear together in the site UI, not only in schema.yml"
  ]
}
```

**Verdict: PASS**

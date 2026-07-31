---
task: "#325 — R-310-6/7/8/9 non-blocking follow-ups from #310 (docs + copy only)"
author: geo-data-scientist
date: 2026-07-31
branch: docs/325-map-granularity-followup-copy
---

# Geo-DS sign-off — #325 map-granularity follow-up copy / decision write-up

- **Scope reviewed:** `git diff develop...docs/325-map-granularity-followup-copy` — the new
  `docs/methodology/310-rollup-typology-colour-decision.md` (R-310-6) plus copy edits in
  `web/pages/berlin/maps.md`, `web/pages/hamburg/maps.md`, `web/pages/methodology.md`.
- **Why gated:** path trigger only (`docs/methodology/**`, R-C1). No dbt model, mart, seed,
  weight, normalization, or spatial method is touched by this diff — confirmed by reading the
  full diff, not the PR description.
- **Review posture:** proportionate. This is a restatement of an already dual-gated decision
  (#310), so I checked *fidelity to the cited sources* and *absence of new claims*, not the
  #310 substance again.
- **Independence:** every claim below was checked against the cited source file
  (`docs/epic-e/310-map-granularity-geo-signoff.md`, `docs/epic-e/310-map-granularity-domain-signoff.md`,
  `docs/epic-i/I-coarse-index-domain-decision.md`, `mart_area_rollup_stage_mix.sql`), not against
  the new doc's own prose.

## 1. Fidelity of the geo/spatial claims in `310-rollup-typology-colour-decision.md`

Faithful. Each restated geo claim maps onto a verbatim finding in the #310 geo sign-off:

| Claim in the new doc | Source in `310-map-granularity-geo-signoff.md` | Verdict |
|---|---|---|
| `<Dropdown name="indicator">` rendered only when `!isRollup`; scalar options absent from the UI, not relabelled | §"C4 — RESOLVED", first bullet | accurate |
| `effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value` closes the stale-input-store leak across map fill, legend, palette, title, tooltip | §"C4 — RESOLVED", second/third bullets (incl. the line-by-line grep of remaining `inputs.indicator.*` refs) | accurate |
| Both rollup `DataTable`s dropped `order by dynamism_index desc` for `order by area_name` | §"C1 — RESOLVED" (Berlin `dynamism_index desc`, Hamburg `dynamism_index_weighted_mean desc`) | accurate |
| Scalars survive only as unsorted, plainly-labelled "mean ordinal class (mean rank)" diagnostic columns | §"C1 — RESOLVED"; matches the current column titles in both pages | accurate |
| `acute_stage_share` is a page-side sum over already-published `stage_population_share` rows — no mart change, no new index, no ordinal averaging, no re-categorization | §"New material added in this commit", incl. my own re-derivation (shares sum to 1.000 for all 278 areas; NULL/orphan guard) | accurate |
| Plurality label always paired with `dominant_share` and `is_dominant_fragile` (`< 3` real children), full mix one click away | §2, §3 | accurate |
| Coarse grain is *directionally* biased toward the modal, least-acute stage (not neutrally noisy) | §"New material…", final paragraph ("plurality voting on a skewed categorical distribution is directionally, not symmetrically, biased") | accurate |
| Neukölln/Spandau 30.0% vs 14.2% acute share | domain sign-off round-3 table (0.3000 / 0.1416); consistent with my own bezirk max acute share 0.30 | accurate |
| No amendment to #267 was required, because remedy (a) does not narrow the prohibition | consistent with both sign-offs; #267's decline is untouched | accurate |

Two things the new doc gets *right* that a looser write-up would have fudged, and which I want on
the record: (i) it states plainly that a coarse-grain central-tendency value is still **published**
(as a caveated table column) rather than claiming it was removed; (ii) it does not claim the #310
remedy resolved my C3 (weak plurality, `dominant_share < 0.5`) or the leaf-grain auto-scaling legend
residual — those correctly remain open, as recorded in the #310 sign-off's carried-forward list.

## 2. Does anything in the diff introduce a *new* spatial/statistical claim?

No new construct, weight, threshold, CRS, distance measure, crosswalk, or aggregation rule appears
anywhere in the diff. The maps.md edits are: one factual correction of a review-history statement
(the `18dfeda3` round was `CONCERNS (blocking — D2 only)`, not a pass — I confirmed this is a
*correction toward* the record, not away from it), two stage-name label expansions in `<Column
title=>` (`active-gentrification` → `Active gentrification`, etc. — presentation only, same three
stages, same sum), and the "where possible" weighting hedges. None of these changes a computed value.

**One finding, and it is in my lane.** The new bullet added to `web/pages/methodology.md` §6 asserts,
without qualification, that at rollup grain the map colours by *"each area's population-weighted
plurality ('most widespread') gentrification stage"* — for **both** Berlin *and* Hamburg, which the
bullet names explicitly. Per §4 / Concern C2 of the #310 geo sign-off, Hamburg is currently
**100% equal-weighted at Bezirk level and 97% at Stadtteil level** (`gentrification_index.population`
is NULL for every Hamburg 202512 row; see the mart's WEIGHTING NOTE and the MEDIUM-C whole-area
equal-weight fallback). `web/pages/methodology.md` contains no "equal-weight" qualifier anywhere, so
this is a newly-introduced, unhedged public claim that is factually wrong for one of the two published
cities. It is the *same* overclaim that R-310-7 corrects two files over in this very diff
(`hamburg/maps.md`: "population-weighted rollups" → "population-weighted rollups, **where possible**"),
so the branch is internally inconsistent about it. The new decision doc repeats the same unqualified
phrasing in its §"The extension that *is* newly permitted" opener, though it is partly cured there by
the Sources entry citing the WEIGHTING NOTE's "documented equal-weight fallback".

This is a one-clause fix, not a methodology problem — but it is a weighting claim on the public
methodology page, which is exactly what R-C1 exists to catch, so I am not waving it through.

## Concerns

- **G-325-1 (must fix — one clause, blocking):** in the new `web/pages/methodology.md` §6 bullet,
  qualify the weighting exactly as the maps pages now do — e.g. "population-weighted (or
  equal-weighted, flagged, where population data is incomplete — currently the case for all of
  Hamburg)". Apply the same hedge to the corresponding sentence in
  `docs/methodology/310-rollup-typology-colour-decision.md`. No other change requested; I will
  re-sign on sight of that edit.

## Notes (non-blocking)

- **Domain-side wording nit, flagged not gated (web-engineer-reviewer's "Verified consistency"
  finding):** the new doc paraphrases #267 Recommendation 4 as permitting "an explicitly-labelled
  dispersion/composition statistic … *is acceptable*". The source
  (`docs/epic-i/I-coarse-index-domain-decision.md` §Recommendation 4) is more grudging — "Framing
  constraints **if the maintainer nonetheless wants** a coarse scalar (**documented, not endorsed**)
  … never presented, coloured, or ordered as 'the Bezirk's gentrification index'". The
  *substance* is unaffected (`acute_stage_share` is a composition statistic, is explicitly labelled,
  is not coloured and not ordered — so it clears Rec 4 on either reading), but "acceptable" reads as
  an endorsement the source withholds. This is the `gentrification-domain-expert`'s call, not mine.
- The doc's characterization of remedy (a) vs (b) and of the D1 blocking condition is domain-lane
  framing; I checked it is not *contradicted* by the geo record, and it is not.
- #310's carried-forward geo residuals are unchanged by this diff and remain open: C3 weak-plurality
  signal, leaf-grain scalar legend auto-scaling, and the pre-2021 × Ortsteil empty combination.

## Verification performed

- Read the complete branch diff; read `docs/epic-e/310-map-granularity-geo-signoff.md` end to end and
  cross-checked every geo claim in the new doc against it (table above).
- Cross-checked the Neukölln/Spandau figures and the D1 remedy framing against
  `docs/epic-e/310-map-granularity-domain-signoff.md`, and Recommendation 4 against
  `docs/epic-i/I-coarse-index-domain-decision.md`.
- Confirmed the mart's WEIGHTING NOTE / MEDIUM-C equal-weight fallback in
  `transform/models/marts/mart_area_rollup_stage_mix.sql` (lines ~109–120, ~453–485).
- Confirmed `web/pages/methodology.md` contains no equal-weighting qualifier (`grep -n
  "equal-weight"` → no match).
- No dbt run needed: no `transform/` file is in the diff. No production file edited by me.

```json
{
  "verdict": "concerns",
  "rationale": "The R-310-6 write-up is a faithful, well-sourced restatement of the already dual-gated #310 decision -- every geo/spatial claim checks out verbatim against docs/epic-e/310-map-granularity-geo-signoff.md, and no new spatial or statistical construct is introduced anywhere in the diff. One newly-added public claim is wrong, though: the methodology.md §6 bullet asserts unqualified population-weighting at rollup grain for both cities, while Hamburg is currently ~100% equal-weighted (geo sign-off C2 / the mart's MEDIUM-C fallback) -- and this same diff hedges that exact claim on hamburg/maps.md, so the branch contradicts itself.",
  "risks": [
    "Public methodology page overstates the weighting scheme for Hamburg (equal-weighted today, described as population-weighted).",
    "The decision doc repeats the same unqualified weighting phrasing, partly cured by its Sources citation of the mart WEIGHTING NOTE.",
    "Loose paraphrase of #267 Recommendation 4 ('is acceptable' vs 'documented, not endorsed') -- domain lane, substance unaffected."
  ],
  "recommendations": [
    "G-325-1 (blocking, one clause): hedge the weighting claim in the new web/pages/methodology.md §6 bullet and in docs/methodology/310-rollup-typology-colour-decision.md to match the maps pages' 'population-weighted, where possible / equal-weighted flagged fallback' wording.",
    "Refer the Recommendation-4 paraphrase to gentrification-domain-expert for a wording call.",
    "No re-run or model change required; re-sign is a read of the corrected two sentences."
  ]
}
```

Verdict: CONCERNS

## Re-review (2026-07-31)

G-325-1 remedy applied in the working tree and verified by reading the diff of the two flagged files:

- `web/pages/methodology.md` §6 bullet now reads "…*plurality* ("most widespread") gentrification
  stage among its constituent PLRs/Gebiete — population-weighted where an area's population data is
  complete, equal-weighted as a flagged fallback otherwise". Matches the hedge already used on
  `web/pages/hamburg/maps.md` in this same branch; the self-contradiction is gone and the sentence is
  now true for Hamburg (MEDIUM-C equal-weight fallback).
- `docs/methodology/310-rollup-typology-colour-decision.md` carries the parallel hedge ("weighted by
  population where an area's population data is complete, equal-weighted as a flagged fallback
  otherwise").

Bonus (non-blocking recommendation 2): the #267 Recommendation 4 paraphrase was also tightened to the
"documented, not endorsed" framing with the "never presented, coloured, or ordered" constraint quoted
— that closes my third listed risk as well. Still a domain-lane wording call, no geo objection.

No other change in the diff; no `transform/` file touched, so no re-run needed. Everything else from
the original review stands.

```json
{
  "verdict": "pass",
  "rationale": "G-325-1 fixed faithfully and completely in both flagged locations with wording equivalent to the existing hamburg/maps.md hedge; the Recommendation-4 paraphrase was tightened too. No new spatial or statistical construct; all remaining geo claims already verified against the #310 geo sign-off.",
  "risks": [
    "Wording must be revisited if Hamburg population coverage later becomes complete (the hedge stays correct either way, but the 'flagged fallback' framing would then describe an empty case)."
  ],
  "recommendations": [
    "None blocking. Domain expert may still confirm the Recommendation-4 paraphrase wording."
  ]
}
```

Verdict: PASS

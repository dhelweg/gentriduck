# #358 domain sign-off: numbered stages, neutral status trend, no "pressure" ordering

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-06
- **Reviewed:** branch `feat/358-status-trend-stages`:
  - dbt: 17ede3229, c444d604a, 33f11b2f6;
  - web: c9dc1e070 (27 files);
  - the rendered `web/build` (searched for "pressure" in the visible text of every HTML page).
- **Measured against:** `docs/epic-g/358-spec.md` (Revision 1, incl. geo-DS C1–C5).

Verdict: CONCERNS

The implementation is faithful to the spec, and several of the DE's own calls improve on it. Four
text fixes remain (R1–R4), three on pages and one in a methodology doc. If they are adopted
verbatim, this is PASS without a re-check.

```json
{
  "verdict": "concerns",
  "domain_rationale": "Labels, cycle numbers, status-trend values and both legends match the spec verbatim, from one dbt source (typology_stage_display, gentrification_index). The browse order and spotlight are neutral, the home-page counts are per city and live_data only, and the maps' Dynamik direction is now correct. Four places still carry the old logic: two methodology sentences on land value still say 'pressure' (the rendered build's only in-scope hits); methodology §3 calls stage 6 'settled' only; the home-page 'What to notice' paragraph keeps a watch-list framing and miscalls middle-status areas 'deprived' and the trend 'fast'; and index-definition §9's process stages 0–4 sit unexplained next to the public 1–6 and contradict the §1.5 matrix for one cell.",
  "theory_risks": ["two numbering systems in index-definition read as one", "'neighbourhoods to watch' re-introduces an urgency ranking by stage"],
  "required_changes": ["R1", "R2", "R3", "R4"]
}
```

## 1. Spec conformance

| Item | Status |
|---|---|
| Seven stage labels, exact (§1) | **Met.** `transform/macros/typology_stage_display.sql`; keys unchanged; "No stage on record" for NULL and `'uninhabited / no data'` (C2). |
| Status trend values, `live_data` only (§2, C3) | **Met.** `gentrification_index.sql` ("Improving" / "Stable" / "Worsening" / "No trend on record"), with a test that it is NULL on thesis rows. |
| `StageNumberLegend` (§5 + C5 sentence) | **Met, verbatim.** |
| `StatusTrendLegend` (§5) | **Met, verbatim.** |
| Ordering paragraph, lede, spotlight sentence, hub blurbs, maps alerts | **Met.** |
| Default sort `stage_number`, name, code; user-sortable; spotlight is the reader's pick | **Met** (both area-detail pages, OA-modes demo). |
| Home: top-10 removed; trend counts per city, `live_data` only, never summed (C4) | **Met.** The Hamburg paragraph says the counts are "not comparable with Berlin's and are never added to them". |
| Palette keyed on `stage_number`, no alarm colour | **Met** (`stageColorByNumber`). |
| `schema.yml` (C3) and `index-definition.md` §1.2–§1.4 | **Met.** The thesis-model lines keep their construct, and §1.4 carries the spec text. |
| No in-scope "pressure" in rendered text | **Not met** in `methodology.md` l. 122 and 124 (R1). The other rendered hits are the out-of-scope B1 rent-pressure proxy and the §172 "measurement of displacement pressure" sentence. |

## 2. The DE's own calls

- **Pioneer sentence "…sometimes precedes wider gentrification": accepted.** It is hedged
  ("sometimes"), and dropping "pressure" loses nothing.
- **Dynamism direction on both maps pages: accepted, and an important correction.** The old text
  ("higher = improving faster") inverted the official class. "1 = improving, 2 = stable,
  3 = worsening … higher shading means a worsening trend" matches the geo-confirmed coding.
- **Status-trend BigValue plus both legends on the PLR/Gebiet profiles, and columns on the child
  tables: accepted.** Each shows the trend next to its legend.
- **Berlin area-detail lists only PLRs with a current stage, with a caveat bullet: accepted.** It
  matches Hamburg, and the excluded areas keep their own pages. The "uninhabited" tooltip is shown
  only where the population is 0 (C2).
- **Hub blurbs: accepted.** They are neutral, and the spotlight is described as a choice.
- **Maps Hero ledes: accepted.** They are the spec §5 parenthesis.
- **Berlin PLR Offering Advantage sentence (`berlin/area/[code].md:653`): accepted, no
  over-claim.** "…not a 'more OA means more gentrification' reading" is a negation: it tells
  readers not to read OA that way, which is correct (OA is a compositional predictor, not a
  gentrification measure). See optional O1 for a clearer sentence.
- **Methodology §1 l. 67 "displacement risk": accepted.**
- **Methodology §3 "settled areas (after the cycle or outside it)": partly accepted.** It omits the
  C5 point that stage 6 also holds high-status areas whose status is worsening (R2).

## 3. The reviewer's info item: index-definition §9

**Yes, a note is needed (R4).** §9 numbers Dangschat's *process* stages 0–4, while §1.3 now carries
the public numbers 1–6. A reader will take them for one scale. Worse, §9's "Stage 4 —
consolidation-pressure zone" (Status 1 = hoch, Dynamik stabil) is coded **6 · Stable / established**
by the §1.5 matrix (cell 1×2), not `consolidation-pressure`. That inconsistency predates #358, but
the new numbering makes it visible. §9 also still says "displacement *pressure*".

## 4. Required changes

- **R1: `web/pages/methodology.md` l. 121–124 (land-value paragraph).** This is the same sentence
  family that was already changed on `berlin/poi-map.md:500`. Replace:

  > "…completed gentrification, or active upward pressure, and the level alone cannot distinguish
  > between those. The *level* is treated as a baseline/context covariate; only the *change* in these
  > values over time carries any displacement-pressure reading, and even then…"

  with:

  > "…completed gentrification, or active upgrading, and the level alone cannot distinguish between
  > those. The *level* is treated as a baseline/context covariate; only the *change* in these values
  > over time carries any displacement-risk reading, and even then…"

- **R2: `web/pages/methodology.md` l. 178–179 (§3 item 1).** Replace:

  > "…with 6 · Stable / established for settled areas (after the cycle or outside it) and…"

  with:

  > "…with 6 · Stable / established for settled areas (after the cycle or outside it, including
  > high-status areas whose status is worsening) and…"

- **R3: `web/pages/index.md` l. 250–253 ("What to notice").** Active gentrification is a
  *middle*-status cell, the class measures *direction* relative to the city rather than speed, and
  "neighbourhoods to watch" re-creates the urgency ranking that #358 removes. Replace:

  > "The neighbourhoods to watch are the smaller 3 · Pioneer signal and 4 · Active gentrification
  > bars: those are areas where status is currently deprived *and* the official trend is moving
  > fast, the two-part signature this project's typology is built to catch."

  with:

  > "The smaller 3 · Pioneer signal and 4 · Active gentrification bars are areas whose status is low
  > or middle *and* whose official trend is improving relative to the city, the two-part signature
  > this project's typology is built to pick up."

  The following "2 · Improving from very low status is deliberately ambiguous…" sentence stays.

- **R4: `docs/methodology/index-definition.md` §9.**
  - Insert directly under the "## 9. Invasion-succession theory map" heading paragraph:

    > "**Numbering note (#358).** The 'Stage 0–4' labels below are the *process* stages of
    > Dangschat's narrative, not the public stage numbers 1–6 of §1.3. Correspondence: process
    > stage 0 → 1 · Pre-gentrification; process stage 1 → 3 · Pioneer signal (or 2 · Improving from
    > very low status); process stage 2 → 4 · Active gentrification; process stage 3 →
    > 5 · Consolidation. Process stage 4 (Status 1 = hoch, Dynamik stabil) is coded **6 · Stable /
    > established** by the §1.5 matrix (cell 1×2). The matrix, not this narrative, decides the
    > stage."

  - In the "Stage 4" bullet, replace "the measurable signals of displacement *pressure* are at their
    peak" with "the measurable signals of displacement *risk* are at their peak". Replace
    "→ `consolidation-pressure` with elevated-signal flag" with "→ coded `stable-established`
    (6 · Stable / established) by the §1.5 matrix; no elevated-signal flag is implemented".

## 5. Optional

- **O1** `berlin/area/[code].md:651–653`. The sentence is clearer split in two: "…and vacancy (if
  shown) marks the *opposite* pole from the others, a pre-reinvestment signal. A higher Offering
  Advantage value is not, on its own, a sign of more gentrification."
- **O2** Outside #358: the home caveat "A **low** status class means **lower** deprivation (a
  wealthier area)" refers to the thesis-variant `status_class`. With the live-data default it may
  confuse readers next to the MSS scale (1 = least deprived). Consider scoping it to the thesis
  variant in a later wording pass.

Verdict: CONCERNS

---

## Re-check (2026-11-07, `feat/358-status-trend-stages` @ 5c7f04cd3)

| Item | Status |
|---|---|
| R1 `methodology.md` land-value sentences | **Met**, verbatim ("active upgrading", "displacement-risk reading"). |
| R2 `methodology.md` §3, stage 6 | **Met**, verbatim. |
| R3 `index.md` "What to notice" | **Met**, verbatim. |
| R4 `index-definition.md` §9 numbering note, "displacement *risk*", Stage 4 coding line | **Met**, verbatim. |
| O1 `berlin/area/[code].md` Offering Advantage sentence | Adopted, verbatim. |
| Web review follow-ups in the same commit (stage-mix charts in cycle order, `stage_note` "not scored by the Sozialmonitoring", wrapped Stage columns) | No domain issue. The cycle order and the C2 tooltip text match the spec. |

**The Stage 4 heading in §9 also needs changing (R5).** "Stage 4 — consolidation-pressure zone"
now contradicts its own bullet, which says the cell is coded `stable-established`, and it keeps the
"pressure" wording #358 removes. Replace the bullet's bold heading:

> "**Stage 4 — consolidation-pressure zone.**"

with:

> "**Stage 4 — settled high status (process stage; coded 6 · Stable / established).**"

The rest of the bullet stays as it is in 5c7f04cd3.

Verdict: PASS (conditional on R5 being applied verbatim; no further re-check needed)

# #353: domain spot-check of the Hamburg/Berlin parity wording

**Reviewer:** gentrification-domain-expert. **Date:** 2026-10-28. **Branch:** `feat/353-hamburg-parity`
(diff `develop...feat/353-hamburg-parity -- web/ docs/`). **Scope:** public wording that reuses
Berlin-reviewed copy for Hamburg data. Not a formal R-C1 gate (no model, weight or method change).

Verdict: CONCERNS

Three wording fixes are needed before this goes into `develop`: R1, R2 and R3 below. All are text
changes. None needs a new figure, mart or sign-off. Everything else checks out.

## What passes

- **G17 (OA radar text).** Replacing the sentence "OA is one input … into the governed index" is
  correct. Hamburg's stage is the Sozialmonitoring D1×D2 outcome only (H3 domain §1), so "OA is
  commercial-side context only" is true. It matches the #312 framing ("commercial-side signal, not the
  outcome variable"). The page keeps a Hamburg-only baseline, the I14 "compositional, not a count"
  framing, min-base suppression, the "never commercially dead" text and the dagger. The commercial-mix
  alert above the radar gives the direction of the OSM bias inline (Haklay 2010), as #312 R-D1 asks.
  Leaving out the district-average line is correct.
- **G23 (stage mix).** "No stage on record" is the right label. 856 of the 943 Gebiete have a stage
  and the rest have no Sozialmonitoring classification, so "uninhabited" would be false (#313 D-7).
  The I18-web takeaway, the "not directly equivalent" label and the #302 crosswalk-provenance note are
  all there. Stage counts work at this grain because D1/D2 have full Gebiet resolution (H3 §1). Nothing
  is inherited from Stadtteil level.
- **G14 (stage label).** The "not directly equivalent" clause meets H3 condition 1(iv). The stage
  labels match `/hamburg/maps` exactly. Not carrying over the Berlin portrait dictionary is correct:
  I14 says its scope is `/berlin/area/[code]` only. **But** see R1 on the pressure-trend clause in the
  same sentence.
- **`/hamburg/time-series` vs #314 §5.** Both binding disclosures are at the top of the page through
  `HamburgTrajectoryNote` and repeated in the caveats: (1) the recent ~6-year window (2019–2025), not
  the 13-edition history, and (2) status only, never a displacement verdict. No long-run series is
  built from the 2019–2025 labels, as §5 requires. Ranking stays within Hamburg (H3 condition 2). The
  sign of the movers is correct (Δ<0 means less deprived). The "rose is not good news" caveat is
  kept. Listing every Gebiet that changed, instead of a top 12, is the more honest choice given the
  ties.
- **The "not possible" reasons.** I checked each against its source:
  - G5/G15: `fct_gentrification_change` is filtered to `city_code='BER'`, with H3 condition 4 cited
    in its header. Long run: #314 §5.
  - G18: the source filters to `BER`. The OA-D0 dominance conditions were written for Berlin.
  - G19: #313 C-5..C-8 "bind at the Hamburg web slice's own gate". The page's summary ("wording, no
    ranking, merged Stadtteile and missing values") is accurate.
  - G20: #303 Condition 2 is literally "must precede any public surfacing of Hamburg price/rent".
  - G22: I20 condition 5 is the re-consult on new copy.
  - G25: Berlin-only source plus the MAUP disclosure. All stated accurately.

  One nuance, optional fix O2: H3 condition 4 is a conditional scope guard, not a "by design" ruling.
- The I14 wording on Berlin's PLR page is unchanged by B1 (rendering fix only).

## Required fixes

### R1: G14, the pressure-trend clause contradicts the stage (`web/pages/hamburg/area/[code].md:285`)

The site's convention is that a negative pressure trend means higher pressure (G4 and I1 domain
sign-offs). Under the typology macro, all four gentrification-signal stages (active-gentrification,
pioneer-signal, improving-vulnerable, consolidation-pressure) require Dynamik = 1, which is
`positive`. Live data: all 41 such Gebiete are `positive`. So every Gebiet in a gentrification stage
would read "Active gentrification, with a **positive** pressure trend". The page's own legend tells
readers that means *lower* pressure. Berlin's PLR portrait sentence has no pressure clause.

- **Current:** `… this Gebiet is in the stage <b>${cur.stage_label}</b>, with a <b>${cur.pressure_trend}</b> pressure trend. This is a Hamburg-coded stage: it is <b>not directly equivalent</b> to a Berlin stage of the same name (Hamburg's Dynamik window is 3 years, Berlin's 2; see <a href="/methodology">methodology §6</a>).`
- **Proposed:** `… this Gebiet is classified in the stage <b>${cur.stage_label}</b>. This is a Hamburg-coded stage: it is <b>not directly equivalent</b> to a Berlin stage of the same name (Hamburg measures Dynamik over 3 years, Berlin over 2, so the same name can mark a different speed of change; see <a href="/methodology">methodology §6</a>).`

This drops the pressure clause. "Classified in" follows storytelling rule 5 (name a stage, don't
assert it). The window clause becomes the qualitative reading that H3 condition 1(i) asks for.

### R2: G6, "highest gentrification pressure" claims more than the ordering supports (`web/pages/hamburg/area-detail.md`)

The ordering copies Berlin's rule, `(dynamism_class_bi='negative') desc, dynamism_index desc`, and
applies it within one district. That is allowed under H3 condition 2. But the key has only 3 values.
Live data: each district has 3–13 Gebiete tied at `negative`, and all of them are
`pre-gentrification`. The spotlight is the first of these alphabetically, but the page calls it "the
highest gentrification-pressure Gebiet". Also, every active-gentrification or pioneer-signal Gebiet
has a `positive` reading, so it sorts to the bottom of a list headed "highest gentrification pressure
first". A reader will see that as a contradiction. The wording has to say what the order actually is.

| Line | Current | Proposed |
|---|---|---|
| 34 (Hero lede) | "…then see a headline snapshot of the one currently under the most gentrification pressure, with a link to its full profile." | "…then see a headline snapshot of one Gebiet with the district's strongest pressure reading, with a link to its full profile." |
| 92 | "Every Gebiet with a current stage in the selected district, highest gentrification pressure first." | "Every Gebiet with a current stage in the selected district, ordered by its Sozialmonitoring Dynamik reading: negative first (the reading this site treats as higher pressure), then neutral, then positive. Gebiete with the same reading are listed alphabetically, so order within a group means nothing. This order uses the Dynamik reading alone, not the stage: Gebiete in a gentrification stage (active-gentrification, pioneer-signal, improving-vulnerable, consolidation-pressure) all have a positive reading by definition, so they appear further down." |
| 156–157 | "{name} is currently the highest gentrification-pressure Gebiet in the selected district." | "{name} is listed first: it is one of the Gebiete in this district with a negative Dynamik reading (this site's higher-pressure reading) and comes first alphabetically among them, which does not mean it is under more pressure than the others in that group." |
| 160 | "Pick a district above to see its highest-pressure Gebiete…" | "Pick a district above to see a snapshot of its first-listed Gebiet…" |

Follow-on, same meaning on other pages:

- `web/pages/hamburg/index.md:153-154`: change "a headline spotlight on that district's
  highest-pressure Gebiet" to "a headline spotlight on one Gebiet with that district's strongest
  pressure reading".
- `web/pages/hamburg/area/district/[code].md:472`: change "ranked by pressure" to "ordered by their
  pressure reading".

`/berlin/area-detail` has the same defect, and worse, since it has no tie-break at all. Apply the
same wording there, either here or in a follow-up (PM's call). It is pre-existing and does not block
the Hamburg side once that side is fixed.

### R3: false scale equivalence in the Gebiet lede (`web/pages/hamburg/area/[code].md:377`)

The #302 domain sign-off already flagged "same scale as Berlin's Planungsraum" as overstating
equivalence. A Gebiet is finer than a PLR: about 940 for Hamburg against 542 for Berlin, a city
twice the size. #353 rewrote this lede and kept the claim, so fix it now.

- **Current:** "…for one Hamburg statistisches Gebiet — Hamburg's finest published small-area grain, the same scale as a Berlin Planungsraum."
- **Proposed:** "…for one Hamburg statistisches Gebiet — Hamburg's finest published small-area grain. It plays the role a Planungsraum plays for Berlin on this site, but a Gebiet is typically smaller."

## Optional (non-blocking)

- **O1.** `subarea_l1/[code].md:217` and `district/[code].md:203`: change "of <b>${nTotal}</b>
  Gebiete here" to "of <b>${nTotal}</b> Gebiete with a current stage here". `n_total` excludes
  Gebiete with no stage, but the chart next to it shows them.
- **O2.** `[code].md:440`, `time-series.md:52` and `hamburg/index.md:135`: change "Berlin-only by
  design (H3 … condition 4)" to "kept Berlin-only until Hamburg has its own sign-off for it (H3 …
  condition 4)". The condition is conditional, not a design ruling.
- **O3.** `web/pages/index.md:146`: change "the same set of views as Berlin" to "the same kinds of
  views as Berlin". Several Hamburg views are deliberately thinner.
- **O4.** `HamburgTrajectoryNote.svelte`: change "don't read it with the same long-run framing
  Berlin's own multi-decade biennial figures might imply" to "don't read it as a long-run verdict".
  Berlin's trajectory uses the same bounded window, so the comparison misleads. The note's two #314
  disclosures are correct.

## Theory risks to track (not for this ticket)

1. **"Negative Dynamik = higher gentrification pressure" conflicts with the D1×D2 typology.** In the
   typology, *positive* Dynamik in low or mid status areas is the gentrification signal (Dangschat
   1988). Negative Dynamik means filtering-down, which is at most a rent-gap precondition (Smith
   1979). The convention was signed off site-wide (G4, I1) and is now in both cities' browse
   ordering. Recommend a separate dual-gated ticket to reconsider the "Pressure trend" label and the
   browse ordering for both cities, building on 327 scoping row 10.
2. OA-D1b condition 3: Gebiete 90001/106001 (fallback parents) now feed the Stadtteil stage counts
   and mapped-place sums. The risk is low (sums only, bounded blast radius). Re-check when G25
   publishes a Hamburg OA roll-up.

## Untrusted input (SEC-3)

Findings come from repo files on this branch, the committed sign-offs, and a read-only query of
`data/serving/*.parquet`. No web content was used and nothing was treated as an instruction.

```json
{ "verdict": "concerns",
  "domain_rationale": "Sign-off-condition citations, the #314 trajectory disclosure, G17 and G23 are faithful. Three wording defects: the G14 sentence pairs gentrification stages with a 'positive pressure trend' the site's legend reads as low pressure; G6 calls an alphabetical pick among 3-13 tied Gebiete 'the highest gentrification pressure' and sorts every gentrification-stage Gebiet last under that heading; the Gebiet lede keeps the PLR scale-equivalence claim #302 flagged.",
  "theory_risks": ["negative-Dynamik-as-pressure convention vs D1xD2 typology (site-wide)", "fallback-parented Gebiete in Stadtteil sums"],
  "recommendations": ["apply R1-R3", "same R2 wording on /berlin/area-detail", "separate ticket on the pressure-trend convention"] }
```

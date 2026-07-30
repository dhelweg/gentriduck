---
task: "#310 — Granularity selector for /berlin/maps and /hamburg/maps (population-weighted stage mix + dominant stage at rollup grain)"
author: gentrification-domain-expert
date: 2026-07-30
branch: feature/310-map-granularity-selector
---

# Domain sign-off — #310 map granularity selector (`mart_area_rollup_stage_mix` + rollup map surfaces)

- **Branch:** `feature/310-map-granularity-selector` (off `develop`; 4 commits, clean tree).
- **Issue / task:** #310 — a new spatial rollup/aggregation of the D1×D2 gentrification typology from
  the finest live grain (Berlin PLR, Hamburg `subarea_l2`) up to Berlin `bezirk`/`pgr`/`ortsteil` and
  Hamburg `subarea_l1`/`district`, surfaced as an "Area level" selector on both public maps pages.
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
  This is the **domain half** of the dual gate; the geo-data-scientist verdict on statistical
  soundness is produced independently.
- **Artefacts reviewed:** the full `git diff develop...HEAD`; `transform/models/marts/mart_area_rollup_stage_mix.sql`
  in full (710 lines incl. the R-C2 grounding header); the `area_rollup_stage_mix` block of
  `transform/models/marts/schema.yml` (lines 1793–2047); the four new custom tests; both public
  surfaces `web/pages/berlin/maps.md` and `web/pages/hamburg/maps.md` in full; the sibling
  precedents `mart_ortsteil_plr_stage_mix.sql` (#269) and `mart_mss_area_aggregate.sql` (#249); the
  standing decisions this ticket sits on top of — `docs/epic-i/I-coarse-index-domain-decision.md`
  (#267), `docs/epic-i/I249-web-b-domain-signoff.md`, ADR-0008 — and the site's own published
  commitment in `web/pages/methodology.md` §6 (lines 345–356) and §5 (ecological fallacy, lines
  253–257).
- **Empirical checks:** I re-derived the built mart against the local warehouse
  (`data/gentriduck.duckdb`, `main.mart_area_rollup_stage_mix`, latest period 202512) rather than
  reasoning from the docstring alone. All numbers cited below are from that re-derivation.

---

## What I affirm (the core design is domain-sound)

These are not perfunctory — each was a real risk and each is handled correctly:

1. **The stage-MIX distribution as the primary artefact is exactly what the standing #267 domain
   decision asked for.** That decision's Recommendation 2 was to "close the #267 gap with a
   distributional headline … a compact child-typology distribution (counts/share of child PLRs per
   typology stage)". `mart_area_rollup_stage_mix` is that, generalized across five rollup levels and
   two cities. This is the right construct: gentrification is a *frontier* phenomenon (Dangschat
   1988/2000 double invasion–succession cycle), and a distribution preserves where the frontier sits
   whereas a point value destroys it.

2. **Population weighting over area weighting is the correct choice for a displacement-relevant
   indicator, and the diff's own data proves it.** The unit of normative concern is *residents
   exposed*, not hectares. Area weighting would let Berlin's forest/water PLRs and Hamburg's
   non-residential port polygons dominate a borough's reading — and those are literally the orphan
   set the MEDIUM-B fix had to special-case (Hamburg Steinwerder 02118, Waltershof 02119, Neuwerk
   02121, Gut Moor 02703, Altenwerder 02712). Population weighting is defensible; area weighting
   would not have been.

3. **The `uninhabited / no data` bucket is handled correctly.** Visible as its own mix row (never
   silently dropped or zero-filled) but excluded from the weighted-mean and vote denominators. An
   uninhabited PLR has no residents to displace; including it in the denominator would dilute every
   share by an amount that varies with how much forest or port a borough happens to contain. Correct.

4. **The MEDIUM-B fix (orphan areas drawn-but-blank, never vanished) is an anti-erasure improvement,
   not just a bug fix.** Silently omitting an area from a map is the worst available failure mode:
   the reader cannot distinguish "no data" from "nothing happening". The placeholder-row design
   preserves the site's existing "a blank area is missing data, not a 'zero pressure' reading"
   convention, which both pages state.

5. **The MEDIUM-C fix (equal-weight the *whole area*, not just the children missing population) is
   domain-correct and matters more than it looks.** The pre-fix per-child `coalesce(population, 1)`
   would have assigned weight ≈ 0 to exactly the children we know least about. Under-documented
   small areas are not randomly distributed — they skew toward new/irregular, institutional, and
   port/industrial-adjacent tracts, and in the general case toward less-surveyed populations. A rule
   that near-zero-weights the unknown is a rule that systematically silences them. Fixing this to
   honest all-or-nothing equal weighting, with `has_incomplete_population` /
   `n_children_without_population` / `population_coverage_frac` exposed, is the right call.

6. **No new stigmatizing indicator, no causal language, no pooled cross-city comparison.** The
   typology vocabulary is the six already-approved ADR-0008 stage names; no `foreigners_share` /
   `migration_background_share` is surfaced here (the I19-web conditions stay closed); the Hamburg
   page keeps its H3 structural guard (own route, own `<AreaMap>` instance, own colour-scale
   computation, explicit "never combined with, or compared numerically against, Berlin's map").

7. **The test contract covers the invariants I would have asked for**: shares sum to 1 over habitable
   children, `dominant_share` reconciles against the matching mix row, and leaf coverage reconciles
   542/542 (Berlin) and 857/857 (Hamburg) with placeholder rows contributing zero.

---

## a. Does the mix-plus-caveated-dominant presentation actually avoid erasing sub-area heterogeneity?

**The mart does. The published map does not — and the live data shows it inverting the frontier.**

The docstring flags the Dangschat double invasion–succession erasure risk correctly, and the *mart*
answers it. But the **map colours by `dominant_stage` alone**, and a choropleth fill is not read as
"the modal category among this area's children" — it is read as "this area's value". At the latest
period (202512) that produces the following, which I re-derived directly:

| Berlin Bezirk (202512) | dominant stage (colour) | dominant share | share of residents in the three most acute stages |
|---|---|---|---|
| Neukölln (08) | stable-established → **blue** | **0.49** (a plurality, not a majority) | **0.301** |
| Mitte (01) | stable-established → blue | 0.57 | 0.211 |
| Friedrichshain-Kreuzberg (02) | stable-established → blue | 0.65 | 0.206 |
| **Spandau (05)** | **pre-gentrification → pale (the only non-blue borough)** | 0.47 | **0.141** |
| Steglitz-Zehlendorf (06) | stable-established → blue | 0.91 | 0.000 |

11 of 12 Berlin Bezirke and **7 of 7** Hamburg Bezirke resolve to `stable-established`. The
consequence is that Berlin's Bezirk map is a near-monochrome blue field whose one highlighted
borough is **Spandau** — while Neukölln, Mitte and Friedrichshain-Kreuzberg, the boroughs the
literature treats as Berlin's actual gentrification front (Holm 2010; Bernt & Holm on
Nord-Neukölln/Prenzlauer Berg), are painted "most stable". By the domain-relevant quantity — share
of residents living in `active-gentrification`, `pioneer-signal` or `improving-vulnerable` PLRs —
Neukölln (30.1%) is more than double Spandau (14.1%). **The coarse map does not merely blur the
frontier; it rank-inverts it.**

This is not a defect of the mart's arithmetic (the plurality is computed correctly, and the mix rows
carry the full truth). It is a defect of the *encoding*: the plurality rule discards the ordinal
severity structure entirely, and `stable-established` is by construction the residual, most-common
category — so aggregation is **directionally biased toward calm**, not symmetrically noisy. Hamburg
shows the same pattern in a sharper form: Hamburg-Mitte's colour is decided by a 0.496 vs 0.457
near-tie between `stable-established` and `pre-gentrification`, and nothing in the map's visual
encoding registers that it was a coin flip.

The current guards (Alert, `dominant_share` in the tooltip, `is_dominant_fragile`, the "Stage mix"
table, the Honest-caveats bullets) are **procedurally** honest — they explain the *method*
accurately — but they never state the **substantive interpretive consequence**, which is the thing a
general reader needs: *a "Stable, established" borough can and does contain acutely gentrifying
neighbourhoods, and this map cannot show you which*. The one place that consequence is legible (the
Stage-mix table) is below the fold, capped at `rows=10` — with 12 Bezirke × ~5–6 stages ≈ 59 rows
ordered by `area_name`, the default view shows roughly the first two boroughs — and it is the only
table on the page that renders raw machine codes (`active-gentrification`) instead of the
de-jargoned labels used everywhere else.

## b. Is the population-weighted mean of `status_index` / `dynamism_index` defensible?

**The weighting is. Publishing the mean as a coloured, rank-ordered coarse-grain indicator is not —
it contradicts this project's own standing, dual-gated, publicly-stated decision.**

At leaf grain these are strictly discrete ordinal class codes (verified: `status_index` ∈ {1,2,3,4},
`dynamism_index` ∈ {1,2,3}; MSS Status *hoch/mittel/niedrig/sehr niedrig*, Dynamik likewise). The
mart takes their population-weighted mean and both pages then (i) render it as a **choropleth
indicator** across the whole city at rollup grain, (ii) label it identically to the PLR-level
indicator ("Social status — how deprived or affluent (current snapshot)"), (iii) title the map
"Berlin Bezirk — Social status …" as though the borough *has* that status, and (iv) **rank** the
DataTable by it (`order by dynamism_index desc`).

`docs/epic-i/I-coarse-index-domain-decision.md` (#267, my own role's standing decision, dual-gated,
restated verbatim for the public in `web/pages/methodology.md` §6) says:

> "**Framing constraints if the maintainer nonetheless wants a coarse scalar** (documented, not
> endorsed): it may only be an explicitly-labelled *dispersion/composition* statistic — e.g. 'share
> of PLRs in active-gentrification typology' — never presented, **coloured, or ordered** as 'the
> Bezirk's gentrification index.' **A central-tendency point value remains a domain FAIL.**"

and, on the public methodology page:

> "averaging the ordinal Status/Dynamik class codes across PLRs into one coarse-grain value would
> violate the same 'don't average ordinal codes as if metric' rule this page states in §4"

`status_index_weighted_mean` / `dynamism_index_weighted_mean`, presented as coloured and ordered map
indicators, are precisely the construct that text forbids. #267 also **considered and explicitly
rejected** the mitigation this ticket relies on: *"Why not 'point value with a heterogeneity
disclaimer'? Considered and rejected. A disclaimer does not cure a construct that is measuring the
wrong thing."*

The mart header's design point 1 reads the prohibition narrowly — "never publish a single re-derived
typology *label* alone" — and treats the ordinal mean as outside it because no typology cell is
re-derived. That reading does not survive the actual wording of either the decision doc or the
public page, both of which name the *averaging of the Status/Dynamik class codes into a coarse-grain
value* as the prohibited act.

The one existing loosening precedent, I249-web-b (`mart_mss_area_aggregate` at BZR/Bezirk grain), is
**narrower than what #310 does**, and its conditions are not met here. That sign-off's bar was:
"Approximate … estimate" in the section heading itself; every value label prefixed "Estimated"; a
visible Alert stating it is *not* the Senate's own classification and is "directional, not
authoritative"; and it lives on a **per-area profile page**, not as a citywide choropleth. #310
carries none of those hedges in the indicator label, map title or column header, and escalates the
surface from a profile-page diagnostic to the city's headline map.

Two further consequences of averaging ordinals, both visible in the built data and both currently
unstated:

- **Variance compression → spurious contrast.** Berlin `status_index` SD collapses from 0.778 (PLR)
  to 0.268 (Bezirk); range 1.0–4.0 → 1.62–2.53. Hamburg's `dynamism_index` at Bezirk grain spans
  **1.955–2.054** — 0.1 of one ordinal step across all seven boroughs. Evidence's scalar scale
  auto-scales to the range actually present, so that ~0.1 spread will render as a full light-to-dark
  ramp: a reader sees Hamburg-Mitte as dramatically more "dynamic" than Bergedorf when the two are
  indistinguishable.
- **Reference-frame shift.** The MSS class is defined *relative to the city's PLR distribution*. A
  borough mean of PLR-relative classes is not a borough-level relative status; Hamburg-Mitte's 2.60
  does not mean Hamburg-Mitte would be classified *niedrig* if Hamburg's Sozialmonitoring classified
  Bezirke directly. The column header "Social status (1=least deprived … 4=most deprived,
  population-weighted mean where available)" invites exactly that misreading.

## c. Is the public framing honest for a general audience?

Mostly yes, with **one label that is currently factually false on the Hamburg page.**

Verified: at 202512, `has_incomplete_population` is TRUE for **7 of 7** Hamburg districts and **99 of
104** Stadtteile — i.e. Hamburg's entire live rollup surface is equal-weighted, and every displayed
"share" is a share of *constituent Gebiete*, not of residents (checked: Altona 102/125 = 0.816 =
the displayed `stage_population_share`). Berlin's latest period is genuinely population-weighted (0
of 12 Bezirke incomplete), so this is Hamburg-specific today — but the labels are unconditional:

- tooltip line **"Population share of dominant stage"**
- table column **"Dominant stage's population share"** and mix column **"Population share"**
- the prose **"this table is the full population-weighted stage distribution behind every area
  above"**

The `population_note` caveat and the Hamburg Alert *do* disclose the fallback in prose — that part is
good and I credit it — but a caveat elsewhere on the page does not license a false label on the
value itself. This is cheap to fix and should be fixed.

Other framing observations (all smaller):

- The Stage-mix intro promises "including the `uninhabited / no data` share where relevant", but that
  bucket's `stage_population_share` is NULL **by design** (correctly excluded from the denominator).
  The page promises a number it never shows.
- The **Ortsteil** level rests on the #269 *dominant-overlap* PLR→Ortsteil assignment (PLRs do not
  nest into Ortsteile; straddling PLRs are assigned wholly to one). The Ortsteil *profile* page
  already discloses low-confidence assignments (`overlap_frac_of_plr < 0.8`, 24/542 PLRs); the new
  citywide Ortsteil choropleth carries no such hedge, and 32 of 97 Ortsteile are additionally
  `is_dominant_fragile` (<3 PLRs). The dropdown reads simply "Ortsteil — ~97 traditional
  neighbourhoods".
- "**Dominant**" is a loaded word for a lay reader: it reads as "characteristic of the whole area"
  rather than "the plurality". "Most widespread stage (share of residents)" would be more accurate
  for the same string length.

## d. Could this be misread as whole-Bezirk uniform gentrification — and is that guarded?

The risk here runs the **opposite** way from the one the docstring anticipates, and that inversion is
itself the finding. Because plurality voting collapses onto the modal *and least acute* category,
the coarse map does not overstate borough-wide gentrification — it **understates it**, uniformly.
The public message a reader takes from an all-blue Bezirk map is "Berlin/Hamburg is stable", not
"Neukölln is gentrifying".

That direction of error is not benign. On the ethics ledger this project keeps, "coarse map shows
calm" is exactly the artefact that gets cited *against* Milieuschutz / Soziale-Erhaltungsgebiet
designations and against small-area protective measures — a borough-level "stable" reading is a
ready-made argument that a neighbourhood-level intervention is unwarranted. #267's stigmatization
concern (a coarse value inviting "Neukölln is gentrifying") is real and correctly guarded here; the
mirror-image complacency risk is not guarded at all, and it is the one the live data actually
produces.

The guard that would work is not more prose about method but a **composition counterweight in the
same visual unit as the colour** — the share of residents in the acute stages, which is precisely
the "share of PLRs in active-gentrification typology" statistic #267 Recommendation 4 explicitly
*permits* (and which is a plain sum over already-published mix rows, not a new index).

---

## Blocking conditions

All four are **presentation-layer changes**; none requires re-deriving the mart, and none re-opens
the aggregation arithmetic the geo-DS lane owns.

- **D1 — Do not publish `status_index` / `dynamism_index` as coloured, ranked coarse-grain
  indicators.** Taken alone this sub-feature is a domain FAIL under the standing #267 decision
  ("A central-tendency point value remains a domain FAIL … never presented, coloured, or ordered").
  Acceptable remedies, in my order of preference:
  (a) **restrict the Indicator dropdown at rollup levels to "Gentrification stage"** (the mix/dominant
      surface), leaving the scalar options at leaf grain only — cheapest, fully compliant, keeps the
      mart columns available for diagnostics; or
  (b) keep them but meet the I249-web-b bar *verbatim* — "Estimated"/"approximate" in the dropdown
      label, the map title and the column header; a visible "directional, not authoritative" Alert;
      no `order by` on them — **and** amend both `web/pages/methodology.md` §6 and
      `docs/epic-i/I-coarse-index-domain-decision.md` with a dated, co-signed note recording that
      #310 narrows the #267 prohibition and why. Option (b) also re-opens the ordinal-mean question
      and therefore needs the geo-data-scientist's explicit co-sign, not just mine.
  Silently superseding a published, dual-gated commitment is the one outcome I cannot sign.

- **D2 — Stop labelling equal-weighted shares as "population" shares.** Hamburg's entire current
  rollup surface (7/7 districts, 99/104 Stadtteile) is equal-weighted, so "Population share of
  dominant stage" / "Dominant stage's population share" / "Population share" / "the full
  population-weighted stage distribution" are false as displayed. Make the label conditional on
  `has_incomplete_population`, or use a neutral form throughout (e.g. "Share of the area (residents
  where population data exists, otherwise constituent areas)"). The prose caveat stays; it is not a
  substitute for a correct label on the number.

- **D3 — State the *direction* of the aggregation artefact, not only the method.** Both rollup
  Alerts and both "Honest caveats" sections must say, in plain language, that coarser levels resolve
  systematically toward the most common and least acute stage; that an area shown as "Stable,
  established" can still contain neighbourhoods under acute pressure; that this map therefore
  **cannot** be read as evidence that pressure is absent; and that the Planungsraum / statistisches
  Gebiet level is where pressure is actually locatable. Keep the wording data-independent (no
  hard-coded borough example that goes stale on refresh).

- **D4 — Put a composition counterweight next to the colour.** Surface, in the rollup tooltip and
  the rollup table, the combined share in `active-gentrification` + `pioneer-signal` +
  `improving-vulnerable` (Dangschat's invasion phase plus the Döring/Ulbricht vulnerability case) —
  a sum over already-published `stage_population_share` rows, computable in the page query with no
  mart change. This is the permitted composition statistic under #267 Rec 4, and it is what stops a
  reader concluding "Spandau is Berlin's gentrifying borough, Neukölln is stable". An equivalent
  that places the non-dominant composition in the same visual unit as the fill colour is acceptable;
  a caveat sentence alone is not, since D3 already covers prose.

## Recommendations (non-blocking)

- **R-310-1.** The "Stage mix" table is the anti-erasure artefact the whole design leans on, yet it
  is the least legible surface on the page: raw machine codes (`active-gentrification`) where every
  other table is de-jargoned, and `rows=10` shows ~2 of 12 boroughs. De-jargon it with the same
  `stage_label` mapping and raise the row count (or group by area).
- **R-310-2.** Reword the Stage-mix intro: the `uninhabited / no data` bucket is shown as a *count of
  constituent areas*, not a share, because it is deliberately excluded from the share denominator.
- **R-310-3.** Give the Ortsteil level the hedge its own profile page already carries: membership is
  a dominant-overlap approximation (PLRs do not nest into Ortsteile; 24/542 assigned below 80%
  overlap), and 32/97 Ortsteile have fewer than 3 contributing PLRs.
- **R-310-4.** If D1 remedy (b) is chosen, disclose the compression explicitly: Berlin `status_index`
  SD 0.778 (PLR) → 0.268 (Bezirk); Hamburg Bezirk `dynamism_index` spans 1.955–2.054 on a 1–3 scale,
  and the colour ramp auto-scales to whatever range is present, so a 0.1-of-one-step spread renders
  as full contrast.
- **R-310-5.** Consider "most widespread stage" over "dominant stage" in reader-facing copy;
  "dominant" reads as a property of the whole area rather than as a plurality.
- **R-310-6.** Whichever D1 remedy is chosen, record it in `docs/methodology/` and feed it to the G2
  methodology page: #310 is the first time a rollup typology label is **coloured citywide**, which
  goes beyond the I249 per-area-profile precedent even for the categorical surface, and that
  extension deserves to be documented rather than inferred from a mart header.

## Scope / residual notes

- SEC-3 untrusted input: this assessment derives solely from the repo diff, repo documents, and the
  local warehouse. No external or web content informed it.
- I take the aggregation arithmetic, MAUP sensitivity, and the statistical status of the
  ordinal-mean on trust per my remit; the paired geo-data-scientist sign-off covers statistical
  soundness and must also record PASS before PM integration into `develop` (R-C1). **Note for that
  lane:** D1 remedy (b), if chosen, needs their explicit co-sign, since it narrows a prohibition
  their #267 counterpart decision also grounds.
- Nothing here reopens the #269 Ortsteil crosswalk, the OA-D1b `subarea_l2→subarea_l1` edge, or
  `mart_area_hierarchy` — all previously gated and reused unmodified, correctly.
- I edited no production code. All remedies above are described in prose for the web-engineer to
  implement.

---

## Original verdict (first pass, 2026-07-30) — superseded by the re-review below

```json
{
  "verdict": "concerns",
  "domain_rationale": "The mart itself is domain-sound and is, in fact, exactly the distributional artefact the standing #267 domain decision asked for: a population-weighted child-stage MIX at coarser grain, with the uninhabited bucket visible but excluded from denominators, orphan areas drawn-but-blank rather than dropped, and an honest all-or-nothing equal-weight fallback that avoids near-zero-weighting the children we know least about. Population weighting (not area weighting) is the right choice for a resident-centred displacement construct -- the diff's own orphan set (Hamburg's port Stadtteile, Berlin's never-dominant enclaves) proves why. What I cannot sign is the public presentation. (1) status_index_weighted_mean / dynamism_index_weighted_mean are population-weighted means of discrete ordinal MSS Status/Dynamik class codes (verified: values in {1,2,3,4} and {1,2,3}), published as CHOROPLETH-COLOURED and RANK-ORDERED coarse-grain indicators -- verbatim what docs/epic-i/I-coarse-index-domain-decision.md Rec 4 and web/pages/methodology.md section 6 forbid ('never presented, coloured, or ordered ... A central-tendency point value remains a domain FAIL'), and that decision explicitly considered and rejected the 'point value with a heterogeneity disclaimer' mitigation this ticket relies on. The one loosening precedent (I249-web-b) is narrower -- per-area profile page, 'Approximate/Estimated' in the heading and every value label, 'directional, not authoritative' alert -- and none of its conditions are met here. (2) The dominant-stage map colouring inverts the frontier against the live data: at 202512, 11/12 Berlin and 7/7 Hamburg Bezirke read 'stable-established', so the only non-blue Berlin borough is Spandau (14.1% of residents in the three acute stages) while Neukoelln (30.1%), Mitte (21.1%) and Friedrichshain-Kreuzberg (20.6%) read 'most stable'. Plurality voting collapses onto the modal AND least-acute category, so aggregation is directionally biased toward calm, not symmetrically noisy -- and the copy states the method honestly but never the interpretive consequence. (3) 'Population share' is a factually false label on the Hamburg page today: 7/7 districts and 99/104 Stadtteile are equal-weighted, so every displayed share is a share of constituent Gebiete (verified: Altona 102/125 = 0.816). All four remedies are presentation-layer only; no mart change is required.",
  "theory_risks": [
    "Coarse-grain central-tendency point value: population-weighted mean of ordinal MSS Status/Dynamik codes, coloured and ranked at Bezirk/PGR/Ortsteil/Stadtteil/district grain -- directly contradicts the standing dual-gated #267 decision and the site's own published methodology section 6, without an amendment.",
    "Frontier inversion via plurality voting: Neukoelln (30.1% of residents in active-gentrification/pioneer-signal/improving-vulnerable) renders 'Stable, established' blue while Spandau (14.1%) is the single highlighted borough -- the coarse map rank-inverts the domain-established Berlin gentrification front (Holm 2010; Bernt & Holm).",
    "Directional understatement, not overstatement: the modal category is the least acute one, so coarser grain systematically reads 'calm'. On the ethics ledger this is the artefact that gets cited AGAINST Milieuschutz / Soziale-Erhaltungsgebiet designations -- a complacency risk the current copy does not guard, mirror-image to the stigmatization risk it does guard.",
    "Near-tie colouring with no visual signal: Hamburg-Mitte's fill is decided by 0.496 vs 0.457 between two different stages; Berlin Neukoelln's dominant share is 0.49, a plurality and not a majority.",
    "False 'population share' labelling wherever the equal-weight fallback fired -- currently the whole Hamburg rollup surface.",
    "Variance compression plus auto-scaled sequential ramp: Berlin status_index SD 0.778 (PLR) -> 0.268 (Bezirk); Hamburg Bezirk dynamism spans 1.955-2.054 on a 1-3 scale, rendered as a full light-to-dark contrast.",
    "Reference-frame shift: a borough mean of PLR-relative MSS classes is not a borough-level relative status, but the column header reads as though it were.",
    "Ortsteil rollups inherit the #269 non-nesting dominant-overlap approximation (24/542 PLRs below 80% overlap) plus 32/97 fragile areas, with none of the confidence disclosure the Ortsteil profile page already carries."
  ],
  "recommendations": [
    "D1 (blocking): restrict the Indicator dropdown at rollup levels to 'Gentrification stage', OR keep the scalars only under the I249-web-b framing bar verbatim plus a dated, co-signed amendment to methodology section 6 and the #267 decision doc -- option (b) also requires the geo-data-scientist's explicit co-sign.",
    "D2 (blocking): make the 'population share' labels conditional on has_incomplete_population, or neutral throughout; the prose caveat is not a substitute for a correct label on the value.",
    "D3 (blocking): state the direction of the aggregation artefact in both rollup Alerts and both Honest-caveats sections -- coarser levels resolve toward the most common and least acute stage; a 'Stable, established' area can contain neighbourhoods under acute pressure; this map is not evidence pressure is absent; use the finest level to locate it. Keep it data-independent so it does not go stale.",
    "D4 (blocking): surface the combined active-gentrification + pioneer-signal + improving-vulnerable share next to the dominant stage in the rollup tooltip and table -- a sum over already-published mix rows, the composition statistic #267 Rec 4 explicitly permits, and the thing that prevents the Spandau/Neukoelln misread.",
    "R-310-1: de-jargon the Stage-mix table's stage codes and raise its row cap -- it is the anti-erasure artefact the design leans on and is currently the least legible surface on the page.",
    "R-310-2: reword the Stage-mix intro -- the uninhabited bucket is shown as a count, not a share, by design.",
    "R-310-3: give the citywide Ortsteil level the dominant-overlap hedge its own profile page already carries.",
    "R-310-4: if D1 remedy (b) is chosen, disclose the variance compression and the auto-scaling colour ramp explicitly.",
    "R-310-5: prefer 'most widespread stage' to 'dominant stage' in reader-facing copy.",
    "R-310-6: document whichever D1 remedy is chosen in docs/methodology/ for the G2 page -- #310 is the first citywide-coloured rollup typology label, beyond the I249 per-area precedent."
  ]
}
```

_(First-pass verdict line, now superseded — see the re-review section and the single final
verdict line at the end of this document.)_

---

# Re-review after fix commit `18dfeda3` (2026-07-30)

- **Commit re-reviewed:** `18dfeda3` "fix(web): #310 -- address geo+domain sign-off concerns
  D1-D4/C1/C5", diffed against `da3bcfd4` (the tree my first pass assessed).
- **Scope of the fix:** presentation layer only — `web/pages/berlin/maps.md` (+284/-46) and
  `web/pages/hamburg/maps.md` (+329/-79). **No mart, schema, seed or test change**, which is what
  I asked for: all four blocking conditions were presentation-layer by construction, so the
  aggregation arithmetic the geo-DS lane owns is untouched. Confirmed via `--stat`: exactly two
  files.
- **Method:** I read both diffs in full and re-derived every number below directly against
  `data/gentriduck.duckdb` (`main.mart_area_rollup_stage_mix`, latest period `202512`, all five
  rollup levels) rather than accepting the commit message. I did not edit any `web/` or
  `transform/` file.

## D1 — scalar ordinal means as coloured/ranked coarse-grain indicators — **RESOLVED**

Remedy (a) was chosen, and it is genuinely implemented rather than relabelled:

- The `<Dropdown name="indicator">` is now inside `{#if !isRollup}`, so at Bezirk/PGR/Ortsteil and
  Stadtteil/Bezirk grain the two scalar `<DropdownOption>`s are **not rendered at all** — they are
  gone from the UI, not renamed. The `{:else}` branch replaces them with a short note explaining
  why.
- **The stale-value leak I would have looked for is explicitly closed.** Evidence's input store
  persists a value across `area_level` changes, so `inputs.indicator.value` can still hold
  `'status_index'` from a previous leaf-grain visit while the dropdown is hidden. The fix
  introduces `effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value` and routes
  **every** render path through it. I verified by grep that `inputs.indicator.*` now appears in
  exactly two places per page — the two ternaries themselves — and nowhere else:
  `<AreaMap value=/legendType=/colorPalette=/title=` all read `effectiveIndicator` /
  `effectiveIndicatorLabel`, and the rollup tooltip branch no longer branches on the indicator at
  all (it hard-codes `stage_label`). A stale scalar therefore cannot reach the fill, the legend,
  the palette, the map title or the tooltip at rollup grain.
- Both rollup `area_table_rollup` queries dropped `order by dynamism_index desc` in favour of
  `order by area_name`, closing the "**ordered**" half of the #267 prohibition, which I had listed
  separately and which is easy to forget.
- No amendment to `web/pages/methodology.md` §6 or to `docs/epic-i/I-coarse-index-domain-decision.md`
  is needed under remedy (a), and none was made — correct. The published commitment is now
  honoured rather than silently narrowed, which was my actual red line.

**Residual (non-blocking, recorded not required):** `status_index` / `dynamism_index` remain as two
*columns* in the public rollup DataTable, relabelled "population-weighted mean ordinal class (mean
rank)" per the geo-DS's C1. My remedy (a) wording ("keeps the mart columns available for
diagnostics") is fairly read as permitting this, they are neither coloured nor ordered, and "mean
rank" is a more honest self-description than I249-web-b's "Estimated". I accept it. Note for the
record that this is the outer edge of remedy (a): a coarse-grain central-tendency value is still
*published*, just demoted from headline to caveated column — and R-310-4's variance-compression
figures (Berlin `status_index` SD 0.778 → 0.268; Hamburg Bezirk `dynamism_index` spanning
1.955–2.054) are no longer load-bearing only because the auto-scaling colour ramp is gone.

## D3 — directional statement of the aggregation artefact — **RESOLVED**

I checked the actual wording rather than the presence of an Alert. It is not "levels are
approximate" boilerplate; it names the direction, the mechanism and the interpretive consequence,
in that order:

> "**A 'Stable, established' reading at this grain is not evidence that pressure is absent.**
> Plurality voting resolves an area to whichever stage is most widespread among its constituent
> PLRs — and because 'Stable, established' is, by construction, the most common and **least acute**
> stage citywide, coarser levels are systematically biased toward reading as calm, not toward
> neutral noise. An area whose map colour reads 'Stable, established' can still contain
> neighbourhoods under active gentrification pressure; this map alone cannot show you whether it
> does. … the Planungsraum (PLR) level — the finest grain this site publishes — [is] where that
> pressure is actually locatable."

That covers all four things D3 asked for (direction, "can still contain", "not evidence of
absence", "go to the finest grain"), and the mirroring Honest-caveats bullet adds the mechanism in
one line ("systematically understate pressure rather than randomly blurring it"). It is
data-independent — no borough is named, so it cannot go stale on refresh — which is what I asked
for. Present on both pages, inside `{#if isRollup}`, so it does not fire at leaf grain where it
would be wrong. This is a better piece of writing than my own condition specified.

## D4 — composition counterweight — **RESOLVED, numbers re-derived and exact**

I re-ran the page's own `acute` CTE construction against the warehouse. Berlin Bezirk, 202512:

| Bezirk | most widespread stage (colour) | `dominant_share` | `acute_stage_share` (re-derived) |
|---|---|---|---|
| Neukölln (08) | stable-established → blue | 0.485 | **0.3000** |
| Mitte (01) | stable-established | 0.567 | 0.2109 |
| Friedrichshain-Kreuzberg (02) | stable-established | 0.649 | 0.2062 |
| Spandau (05) | pre-gentrification (only non-blue) | 0.465 | **0.1416** |
| Steglitz-Zehlendorf (06) | stable-established | 0.908 | 0.0000 |

These match the web-engineer's claimed figures to the digit and reproduce my first-pass numbers
(0.301/0.141 there were my own rounding of 0.3000/0.1416). **The frontier inversion is now legible
on the page itself**: a reader hovering Neukölln sees "Stable, established" *and* 30% in an
acute-pressure stage, against Spandau's 14% — the misread D4 existed to prevent is closed, in the
same visual unit as the fill colour, in both the tooltip and the table, on both pages. Hamburg's
equivalent ranks Bergedorf 0.0896 top and Eimsbüttel 0.0165 bottom, which is a materially different
ordering from the near-uniform `stable-established` fill.

Construction check: the sum is over the mart's own already-published `stage_population_share` rows
filtered to `active-gentrification` + `pioneer-signal` + `improving-vulnerable` — a plain
composition statistic, exactly what #267 Recommendation 4 explicitly permits, with no new index and
no mart change. The `(city, level, period, variant)` filter plus `group by area_code` cannot
double-count, since that combination plus `typology_stage` is the mart's natural key. I confirmed
`stage_population_share` is never NULL on an acute-stage row (0 rows warehouse-wide), so the sum is
never silently partial.

**The NULL-vs-zero edge case is handled correctly in the query, not only in prose.** The mart is
sparse (not padded to six stages per area), so a filtered `SUM` over zero matching rows returns
NULL, not 0. Verified counts at 202512:

| city / level | areas | orphans (`n_habitable_children = 0`) | NULL→0 coalesced (real children, no acute stage) | orphans wrongly non-NULL | final NULLs |
|---|---|---|---|---|---|
| BER bezirk | 12 | 0 | 1 | 0 | 0 |
| BER pgr | 58 | 0 | 29 | 0 | 0 |
| BER ortsteil | 97 | 2 | 65 | 0 | 2 |
| HH district | 7 | 0 | 0 | 0 | 0 |
| HH subarea_l1 | 104 | 5 | 70 | 0 | 5 |

The two Berlin orphans are exactly `1106` Malchow and `0608` Schlachtensee, and both keep a genuine
NULL (rendered "–") rather than a fabricated 0% — matching `dominant_share`'s own convention and
preserving the anti-erasure property I credited in point 4 of my first pass. Conversely the 65
Ortsteile / 29 PGRs with real children but no acute-stage child correctly show **0%**, not blank:
that distinction — "no residents in an acute stage" vs "we cannot say" — is the whole point, and it
is implemented in SQL (`case when n_habitable_children = 0 then null else coalesce(..., 0) end`),
not asserted in a comment.

## D2 — "population share" labels — **PARTIALLY RESOLVED; the same defect is reintroduced in two
new places (this is what still blocks)**

The three labels I named are genuinely fixed, and not by a blanket rename that merely relocates the
problem: `dominant_share` is now "Most widespread stage's share" in the tooltip and "Most
widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data
column)" in the table; the Stage-mix column is "Share (population-weighted, or equal-weighted — see
last column)"; the "full population-weighted stage distribution" prose is now "full stage-mix
distribution … population-weighted where an area's population data is complete, equal-weighted as a
flagged fallback otherwise"; and `has_incomplete_population` is now surfaced **per row** in the
Stage-mix table, which is a real improvement over the one-row-per-area table because a single mix
table spans areas with different weighting status. That is the neutral-form remedy D2 offered, done
properly.

But the fix's own new copy re-commits the error it was fixing. I re-verified the underlying
prevalence at 202512: Hamburg is **7/7 districts** and **99/104 Stadtteile** `has_incomplete_population
= true`; Berlin is **0/12, 0/58, 0/97**. So Hamburg's entire rollup surface remains equal-weighted,
and on that surface:

- **D2-R1 — the D4 counterweight is labelled as a residents statistic.** "Residents in an
  acute-pressure stage" appears as the tooltip line, as the DataTable column title, inside the new
  D3 Alert ("The share of residents in an acute-pressure stage …") and in the new Honest-caveats
  bullet — four places per page, on both pages. On Hamburg every one of those numbers is a share of
  *constituent Gebiete*, not of residents (Hamburg-Mitte's 0.0388 is ~5 of 129 Gebiete). This is a
  **stronger** claim than the "population share" label D2 struck out, and it is attached to the one
  figure whose entire purpose is to be the honest corrective. Note the inconsistency is internal to
  the commit: `dominant_share` got the "(population-weighted, or equal-weighted — see the
  incomplete-data column)" hedge in the very same table row-set; `acute_stage_share` did not.
- **D2-R2 — the scalar column titles lost their existing hedge.** Before: "Social status (1=least
  deprived … 4=most deprived, **population-weighted mean where available**)". After: "Social status
  — **population-weighted mean ordinal class** (mean rank; 1=least deprived … 4=most deprived)".
  The "where available" qualifier was dropped, so the label now asserts population weighting
  unconditionally on a surface that is 100% equal-weighted in Hamburg. Same for "Speed of change",
  for the `{:else}` Indicator note ("clearly labelled as a population-weighted mean ordinal class")
  and for the new Honest-caveats bullet. The C1 relabelling is otherwise an improvement; this is an
  unintended regression riding along with it.

On Berlin these two are true *today* (0/12 incomplete at every rollup level) but they are
unconditional strings, so they become false the first period Berlin's population coverage gaps —
which is precisely the failure mode D2 was raised about. My first-pass condition was explicit that
"a caveat elsewhere on the page does not license a false label on the value itself", and the page's
prominent Hamburg Alert plus per-row `population_note` / `has_incomplete_population` were already
present when I wrote that. I have to hold the same line for the new strings.

**Remedy — one wording pass, ~10 strings across two files, no query, mart or schema change.**
Suggested (any equivalent is fine):
- tooltip + column: `Residents in an acute-pressure stage` → `Share in an acute-pressure stage`
  (table column additionally: `… (active-gentrification + pioneer-signal + improving-vulnerable;
  population-weighted, or equal-weighted — see the incomplete-data column)`), i.e. the same hedge
  already applied to `dominant_share` two columns to its left;
- D3 Alert + Honest-caveats bullet: "The share of residents in an acute-pressure stage" → "The
  share of the area in an acute-pressure stage (residents where population data exists, otherwise
  constituent areas)";
- scalar columns / Indicator note / caveats bullet: restore the qualifier — "mean ordinal class
  (mean rank), population-weighted where population data is complete and equal-weighted otherwise".

## Non-blocking recommendations — status

| # | Status | Note |
|---|---|---|
| R-310-1 (de-jargon Stage-mix + row cap) | **Done** | `stage_label` `case` mapping added on both pages with the same six labels used elsewhere; `uninhabited / no data` passes through unchanged (correct — it is already plain language); `rows=10` → `rows=50` with `search=true` retained. 12 Bezirke × ~5–6 stages ≈ 59 rows still spills one page, but this is now a usable surface rather than a two-borough window. |
| R-310-2 (uninhabited bucket is a count, not a share) | **Done** | Intro now reads "including the `uninhabited / no data` bucket, shown as a count of constituent areas, not a share (it is excluded from the share calculation by design)". The page no longer promises a number it never shows. |
| R-310-3 (Ortsteil dominant-overlap hedge) | **Done in substance** | Dropdown option now "(approximate assignment, see caveats)" plus a new caveats bullet: PLRs "do not nest cleanly into Ortsteile … the drawn polygon is the true Ortsteil boundary, but the value describes that assigned-PLR set". The specific counts (24/542 PLRs below 80% overlap; 32/97 fragile) are not carried over, but omitting refreshable numbers from static copy is a defensible call and I asked for data-independent wording elsewhere. Closed from my side. |
| R-310-4 (variance-compression disclosure) | **N/A** | Conditional on D1 remedy (b); remedy (a) was chosen and the auto-scaling ramp is gone. |
| R-310-5 ("most widespread" over "dominant") | **Done** | Applied in tooltips, column titles, both Alerts, both caveats sections and the two `fragile_note` strings; internal keys (`dominant_stage`/`dominant_share`/`is_dominant_fragile`) untouched, which is right — a copy-only rename, no schema churn. |
| R-310-6 (document the D1 remedy in `docs/methodology/` for G2) | **Open** | `--stat` confirms no `docs/` change in this commit. Still non-blocking, but it should not be dropped: #310 is the first time a rollup typology label is *coloured citywide*, beyond the I249 per-area-profile precedent, and that extension deserves a methodology note rather than being inferable only from a mart header and two page comments. Carry it as a follow-up issue. |

## New problems introduced by the fix — assessment

Other than D2-R1/D2-R2 above, I found none in my lane:

- No change to any indicator definition, weight, normalization or spatial method.
- No new stigmatizing indicator; the acute-stage grouping reuses three already-published ADR-0008
  stage names and adds no new vocabulary.
- No cross-city pooling: the two `acute` CTEs are city-scoped (`'BER'` / `'HH'`), each page keeps
  its own `<AreaMap>` instance and its own colour-scale computation, so the H3 structural guard
  holds.
- The stale-dropdown concern I would raise about a conditionally-rendered Evidence input is not a
  new failure mode here: the `$:` block in `<script>` already evaluated `inputs.indicator.*` before
  the markup's `<Dropdown>` mounted on every page load pre-fix, so that path was already exercised.
  Whether Evidence's input proxy tolerates the unmounted case is a web-lane question, flagged for
  `web-engineer-reviewer`, not a domain gate item.
- Reader-fatigue note (cosmetic, not a finding): Hamburg's rollup view now stacks three Alerts above
  the map. If one gets skipped it will be the middle one; consider merging the equal-weighting
  sentence into the D3 warning at some point.

## Note for the PM on the gate check

`Verdict: PASS WITH CONCERNS` contains `Verdict: PASS` as a substring, so a naive grep for
`Verdict: PASS` would have false-passed my first-pass sign-off. I have therefore used an
unambiguous token below and removed the second verdict line from this file. Recommend the R-C1
pre-integration check match on the full line (e.g. `^Verdict: PASS$`).

---

```json
{
  "verdict": "concerns",
  "domain_rationale": "Re-review of fix commit 18dfeda3 against the two pages and the live warehouse. THREE OF FOUR blocking conditions are genuinely resolved on their own merits, not just per the commit message. D1: remedy (a) is really implemented -- the two scalar DropdownOptions are not rendered at rollup grain at all (removed, not relabelled), and the stale-value leak is explicitly closed via effectiveIndicator/effectiveIndicatorLabel, which I verified by grep is the sole consumer of inputs.indicator.* on both pages, so a persisted 'status_index' from a prior leaf-grain visit cannot reach the fill, legend, palette, title or tooltip; both rollup tables also dropped 'order by dynamism_index desc', closing the 'ordered' half of the #267 prohibition. D3: the new warning Alert states the DIRECTION (plurality voting resolves toward the most common AND least acute stage, so coarse grain is biased toward calm, not neutral noise), that a 'Stable, established' area can still contain neighbourhoods under acute pressure, that the map is not evidence pressure is absent, and that the finest grain is where pressure is locatable -- data-independent, no borough named, present on both pages inside the isRollup branch. D4: I re-derived acute_stage_share from the mart myself at 202512 -- Neukoelln 0.3000, Mitte 0.2109, Friedrichshain-Kreuzberg 0.2062, Spandau 0.1416, Steglitz-Zehlendorf 0.0000 -- exact, and the frontier inversion is now legible on the page in the same visual unit as the fill colour. The NULL-vs-zero edge case is handled in SQL, not prose: orphans (n_habitable_children = 0; Berlin Ortsteile 1106 Malchow and 0608 Schlachtensee, plus 5 Hamburg Stadtteile) keep a genuine NULL, while 65/97 Ortsteile and 29/58 PGRs with real children but no acute-stage child correctly show 0% -- the 'no acute residents' vs 'we cannot say' distinction is preserved. What still blocks is narrow and entirely self-inflicted by the fix: D2 was resolved for the three labels I named, but the SAME defect is reintroduced in two new places on a surface I re-verified is 7/7 Hamburg districts and 99/104 Stadtteile equal-weighted. (D2-R1) The D4 counterweight is labelled 'Residents in an acute-pressure stage' in the tooltip, the table column, the new D3 Alert and the new caveats bullet -- a stronger residents claim than the 'population share' label D2 struck out, false today for every Hamburg rollup area, and inconsistent within the same commit since dominant_share two columns to its left did get the '(population-weighted, or equal-weighted)' hedge. (D2-R2) The scalar column titles dropped their pre-existing 'where available' qualifier and now assert 'population-weighted mean ordinal class' unconditionally, likewise on a 100% equal-weighted Hamburg surface. My first-pass condition was explicit that a prose caveat elsewhere does not license a false label on the value itself, and the Hamburg Alert and per-row population_note were already present when I wrote it, so I hold the same line. The remedy is a single wording pass, roughly ten strings across the two files, with no query, mart or schema change.",
  "theory_risks": [
    "RESOLVED -- coarse-grain ordinal mean as a coloured/ranked indicator: removed from the rollup UI entirely; the residual is two unsorted, explicitly 'mean rank'-labelled diagnostic table columns, which sits at the outer edge of my own remedy (a) wording and which I accept.",
    "RESOLVED -- frontier inversion: acute_stage_share now sits next to the fill colour in tooltip and table on both pages, verified to reproduce Neukoelln 0.300 vs Spandau 0.142 exactly.",
    "RESOLVED -- unguarded complacency/direction risk: the new warning Alert and caveats bullet name the direction of the artefact, not just the method, in data-independent language.",
    "OPEN (blocking, narrow) -- false residents/population labelling on Hamburg's wholly equal-weighted rollup surface, reintroduced by the fix in the acute_stage_share label (4 places per page) and by the loss of the 'where available' qualifier on the two scalar column titles.",
    "OPEN (non-blocking) -- a coarse-grain central-tendency point value is still published, demoted from headline choropleth to caveated table column; the #267 decision doc and methodology section 6 remain unamended, which is correct under remedy (a) but leaves the boundary of what remedy (a) permits documented only in page comments (see R-310-6)."
  ],
  "recommendations": [
    "D2-R1 (blocking): relabel acute_stage_share from 'Residents in an acute-pressure stage' to 'Share in an acute-pressure stage', with the same '(population-weighted, or equal-weighted -- see the incomplete-data column)' hedge already applied to dominant_share; update the matching sentence in the D3 Alert and the Honest-caveats bullet on both pages.",
    "D2-R2 (blocking): restore the dropped qualifier on the scalar column titles, the Indicator note and the caveats bullet -- 'mean ordinal class (mean rank), population-weighted where population data is complete and equal-weighted otherwise'.",
    "R-310-6 (non-blocking, still open): record the chosen D1 remedy and the citywide-coloured rollup typology extension in docs/methodology/ for the G2 page; carry as a follow-up issue rather than blocking #310.",
    "Cosmetic (non-blocking): Hamburg's rollup view now stacks three Alerts; consider folding the equal-weighting sentence into the D3 warning.",
    "Process (non-blocking): the R-C1 pre-integration grep should match '^Verdict: PASS$' -- 'PASS WITH CONCERNS' contains 'Verdict: PASS' as a substring."
  ]
}
```

Verdict: CONCERNS (blocking — D2 only, narrow: two label strings reintroduce the false
population/residents claim on Hamburg's equal-weighted rollup surface. D1, D3 and D4 are
resolved and re-verified against the warehouse; no other new problem introduced. Remedy is a
wording pass with no query, mart or schema change — expect a one-iteration turnaround.)

---

# Re-review after fix commit `dadcb721` (2026-07-30, third round — supersedes both verdict lines above)

> **Operative verdict for this branch:** the single `Verdict:` line at the **end of this document**
> is the only one that applies to the current branch head (`dadcb721`). The first-pass and
> second-round verdict lines above are retained for the audit trail and describe superseded trees
> (`da3bcfd4` and `18dfeda3` respectively).

- **Commit re-reviewed:** `dadcb721` "fix(web): #310 -- D2-R1/D2-R2 make acute-stage-share and
  scalar-mean labels conditional on population-weighting availability", diffed against `18dfeda3`
  (the tree my second-round pass assessed).
- **Method:** I read `git diff 18dfeda3 dadcb721` in full, then read both pages in context around
  every changed region (not just the hunks), grepped both files exhaustively for every remaining
  occurrence of "resident"/"population", and re-derived the underlying weighting prevalence and the
  `acute_stage_share` construction against `data/gentriduck.duckdb`. I did **not** take the commit
  message's word for anything, and I edited no `web/` or `transform/` file.

## Scope confirmation — no methodology surface moved

`git diff --stat 18dfeda3 dadcb721 -- transform/ ingestion/ analysis/ docs/` returns **empty**. Only
`web/pages/berlin/maps.md` (+/-63) and `web/pages/hamburg/maps.md` (+/-57) changed. Inside those
files, the changes to the ```sql``` blocks are **comment lines only** — no `select` list, CTE,
filter, `coalesce`, `group by` or `order by` expression was touched. So the arithmetic the geo-DS
lane signed off on is untouched, and the warehouse figures I cited in round two remain load-bearing.
Re-derived at 202512 to confirm they have not moved:

| city / level | areas | `has_incomplete_population = true` |
|---|---|---|
| BER bezirk | 12 | 0 |
| BER pgr | 58 | 0 |
| BER ortsteil | 97 | 0 |
| HH district | 7 | **7** |
| HH subarea_l1 | 104 | **99** |

Unchanged from round two. Hamburg's entire rollup surface is still equal-weighted, so the D2 label
question is still live and still Hamburg-decisive.

## D2-R1 — `acute_stage_share` labelled as a residents statistic — **RESOLVED (all 4 sites × both pages)**

Verified by grep that the string `Residents in an acute-pressure stage` survives **only** inside
`<!-- -->` / `//` provenance comments that quote the old wording; it appears in **zero** rendered
strings on either page. The four reader-facing sites per page now read:

| site | Berlin | Hamburg |
|---|---|---|
| map tooltip (`areaTooltip`) | `Share in an acute-pressure stage` (L240) | same (L183) |
| rollup DataTable column | `Share in an acute-pressure stage (active-gentrification + pioneer-signal + improving-vulnerable; population-weighted, or equal-weighted — see the incomplete-data column)` (L732) | same (L568) |
| D3 warning Alert | "The share **of the area** in an acute-pressure stage (residents where population data exists, otherwise constituent areas …)" (L320–321) | same (L266–267) |
| Honest-caveats bullet | same conditional phrasing (L832–834) | same (L660–662) |

This is the remedy I specified, essentially verbatim, and the *distribution* of hedging is right
rather than mechanical: the space-constrained tooltip carries the neutral short form — matching
`dominant_share`'s own tooltip title two lines above it — and is backed per-row by the
`population_note` line, which I re-checked emits the equal-weighting sentence whenever
`has_incomplete_population` is true and `''` otherwise (`case when m.has_incomplete_population then
'Population data incomplete for this area — equal-weighted, not population-weighted' else '' end`,
Berlin L568–572 / Hamburg L431–435). The table column, where there is room, carries the **identical
hedge string** already used by `dominant_share`. The within-commit inconsistency I flagged in round
two — `dominant_share` hedged, `acute_stage_share` not — is closed.

**Empirically, the old label really was false and the new one really is correct.** I re-derived
Hamburg district `acute_stage_share` and compared it against the pure count ratio
`n_acute_children / n_habitable_children`:

| Hamburg Bezirk | `acute_stage_share` | acute Gebiete / habitable Gebiete | equal |
|---|---|---|---|
| Bergedorf | 0.0896 | 6 / 67 = 0.0896 | ✓ |
| Hamburg-Nord | 0.0685 | 10 / 146 = 0.0685 | ✓ |
| Altona | 0.0480 | 6 / 125 = 0.0480 | ✓ |
| Harburg | 0.0395 | 3 / 76 = 0.0395 | ✓ |
| Hamburg-Mitte | 0.0388 | 5 / 129 = 0.0388 | ✓ |
| Wandsbek | 0.0311 | 6 / 193 = 0.0311 | ✓ |
| Eimsbüttel | 0.0165 | 2 / 121 = 0.0165 | ✓ |

Exact identity in all 7 cases — the displayed figure is arithmetically a share of *constituent
Gebiete*, with no residential content whatsoever. That is precisely what "Residents in an
acute-pressure stage" asserted it was, and precisely what "Share in an acute-pressure stage
(… residents where population data exists, otherwise constituent areas)" now correctly describes.
It also confirms my round-two citation (Hamburg-Mitte ≈ 5/129) to the digit.

## D2-R2 — scalar column titles / Indicator note / caveats bullet — **RESOLVED (all 4 sites × both pages)**

The dropped qualifier is restored, in the exact form I asked for ("mean ordinal class (mean rank),
population-weighted where population data is complete and equal-weighted otherwise"), at all four
sites on each page: the `status_index` column title, the `dynamism_index` column title, the
`{:else}` Indicator note, and the "rollup Social status/Speed of change" Honest-caveats bullet.
Berlin L728/L729/L339–341/L836–838; Hamburg L564/L565/L285–287/L664–667. Hamburg correctly keeps its
"(3-year window)" Dynamik qualifier inside the rewritten title — that is a real
Berlin-vs-Hamburg construct difference (2-year vs 3-year window) and losing it in a reword would
have been a quiet regression; it survived.

The geo-DS's C1 "mean rank, not a score" framing is preserved intact, so this restoration did not
undo the other lane's fix — I checked that specifically, since the two edits touch the same strings.

## New problems introduced — none blocking

I looked for the failure mode this commit was most likely to cause: a wording pass that fixes the
named strings while leaving a semantically identical claim somewhere else, or that weakens an
already-correct hedge. Exhaustive grep of both files for `resident` and `population`:

- Every remaining reader-facing "residents" occurrence is inside the new **conditional** parenthetical
  ("residents where population data exists, otherwise constituent areas"). Correct.
- The `{:else}` Indicator note's opening clause still says "A population-weighted *mean* of the Social
  status / Dynamism ordinals is **not offered** as a coloured, ranked map indicator". This is a
  negative statement about a construct the page deliberately does *not* publish, so it attaches no
  false property to any displayed number. Accepted, not a finding.
- The `population_note`, `has_incomplete_population` column, Stage-mix per-row disclosure, and the
  Hamburg equal-weighting Alert are all unchanged and still present. No hedge was weakened.
- No indicator definition, weight, normalization, spatial method, or stage vocabulary changed; no new
  stigmatizing indicator; no cross-city pooling (the H3 structural guard is untouched); the D1 remedy
  (a) implementation, the D3 directional Alert and the D4 counterweight query are all byte-identical
  to the versions I verified in round two.

## Non-blocking items (recorded, not gating)

- **R-310-7 (new, documentation accuracy — please fix, but do not hold #310 for it).**
  `web/pages/berlin/maps.md` L78 records my second-round verdict as "*PASS WITH CONCERNS* on the D1
  fix commit". It was **`Verdict: CONCERNS (blocking …)`** — not a pass. A future reader of that
  comment would conclude `18dfeda3` cleared the domain gate, which it did not. The authoritative
  record in this file is correct, so this is a derivative-comment error only; correct it on the next
  touch of the file. In the same pass, Berlin L69 still describes `acute_stage_share` as "the
  combined **population share** of active-gentrification + …" — the same overreach as D2-R1, in a
  comment rather than a rendered string, and now inconsistent with the label two hunks below it.
- **R-310-8 (new, minor).** Hamburg's rollup Alert lede (L244) and Honest-caveats bullet (L650) still
  open with the bold unconditional "**Stadtteil / Bezirk are population-weighted rollups**", which the
  same block then negates four lines later for 100% of the current surface. These are *method-name*
  claims rather than value labels — outside D2's scope as I drew it, and pre-existing, so I do not
  block — but on Hamburg specifically "population-weighted **where possible** rollups" would be the
  honest lede. Berlin's equivalent is true today (0/12 incomplete) and hedged in-paragraph.
- **R-310-9 (new, cosmetic).** After R-310-1's de-jargoning, the `acute_stage_share` column title is
  now the only rendered string on either page still showing raw machine stage codes
  (`active-gentrification + pioneer-signal + improving-vulnerable`). Consider the plain-language
  triple ("Active gentrification + Early pioneer signal + Improving, vulnerable area") for
  consistency. Pre-existing since `18dfeda3`, not introduced here.
- **R-310-6 (still open).** No `docs/` change in this commit either. The methodology note for G2
  recording the D1 remedy and the citywide-coloured-rollup extension should be carried as a
  follow-up issue, not as a #310 blocker.
- **Cosmetic (still open).** Hamburg's rollup view still stacks three Alerts; the scalar column titles
  are now long enough to wrap heavily in a `DataTable` header. Both are honesty-over-brevity
  trade-offs I asked for, so I accept them as-is; a shorter "— see the incomplete-data column" form
  would carry the same content if legibility becomes a complaint.

## Standing of the whole ticket from my lane

| Condition | Status |
|---|---|
| D1 — no coloured/ranked coarse-grain ordinal mean | Resolved in `18dfeda3` (remedy (a), re-verified) |
| D2 — no false population/residents labels | **Resolved** — original three labels in `18dfeda3`, the two reintroductions here |
| D3 — direction of the aggregation artefact stated | Resolved in `18dfeda3` |
| D4 — composition counterweight next to the colour | Resolved in `18dfeda3`, numbers re-derived exact |

All four blocking domain conditions are now met. Nothing outstanding in my lane is gating.

## Scope / residual notes

- SEC-3 untrusted input: this assessment derives solely from the repo diff, repo documents, and the
  local warehouse. No external or web content informed it.
- The paired `docs/epic-e/310-map-granularity-geo-signoff.md` records `Verdict: PASS` at its end; with
  this document that completes both halves of the R-C1 dual gate for `dadcb721`.
- Process reminder for the PM: the pre-integration check should match `^Verdict: PASS$` on a full
  line. This document contains superseded `Verdict: CONCERNS` lines by design (audit trail) and the
  operative verdict is the final line.

---

```json
{
  "verdict": "pass",
  "domain_rationale": "Independent re-review of fix commit dadcb721 against both pages in context and against the live warehouse, not against the commit message. Both remaining blocking conditions are genuinely closed. D2-R1: 'Residents in an acute-pressure stage' now survives only inside provenance comments and appears in zero rendered strings on either page; all four reader-facing sites per page (map tooltip, rollup DataTable column, D3 warning Alert, Honest-caveats bullet) carry either the neutral 'Share in an acute-pressure stage' short form -- matching dominant_share's own tooltip title and backed per-row by population_note, which I re-checked emits only when has_incomplete_population is true -- or the full '(population-weighted, or equal-weighted -- see the incomplete-data column)' hedge already used by dominant_share, or the conditional prose form '(residents where population data exists, otherwise constituent areas)'. The within-commit inconsistency I flagged in round two is closed. I confirmed empirically that the old label was false and the new one is correct: for all 7 Hamburg Bezirke acute_stage_share equals n_acute_children / n_habitable_children exactly (Bergedorf 6/67 = 0.0896, Hamburg-Mitte 5/129 = 0.0388, Eimsbuettel 2/121 = 0.0165), i.e. the displayed figure has no residential content at all on that surface. D2-R2: the dropped qualifier is restored verbatim as 'mean ordinal class (mean rank), population-weighted where population data is complete and equal-weighted otherwise' at all four sites per page (status_index title, dynamism_index title, the {:else} Indicator note, the caveats bullet), with Hamburg's '(3-year window)' Dynamik qualifier correctly surviving the reword and the geo-DS's C1 'mean rank, not a score' framing preserved. No new problem: git diff --stat over transform/, ingestion/, analysis/ and docs/ is empty, and inside the two pages the SQL-block changes are comment-only -- no select list, CTE, filter, coalesce, group by or order by expression moved, so the D1/D3/D4 implementations and the aggregation arithmetic the geo lane signed off are byte-identical to what I verified in round two. Re-derived weighting prevalence is unchanged (HH 7/7 districts and 99/104 Stadtteile equal-weighted; BER 0/12, 0/58, 0/97). Exhaustive grep for 'resident'/'population' found no surviving unconditional claim on a displayed value and no weakened hedge. All four original blocking domain conditions D1-D4 are now met; the residual items are documentation-accuracy and cosmetic only.",
  "theory_risks": [
    "RESOLVED -- false residents/population labelling on Hamburg's wholly equal-weighted rollup surface: closed at all four acute_stage_share sites and all four scalar-mean sites per page, verified by grep and by arithmetic identity against the warehouse.",
    "RESOLVED (round two, re-confirmed unchanged here) -- coarse-grain ordinal mean as a coloured/ranked indicator; frontier inversion; unguarded complacency/direction risk.",
    "OPEN (non-blocking) -- a coarse-grain central-tendency value is still published as a caveated, unsorted diagnostic table column; the #267 decision doc and methodology section 6 remain unamended, which is correct under remedy (a) but leaves the boundary of what remedy (a) permits documented only in page comments (R-310-6).",
    "OPEN (non-blocking) -- Hamburg's rollup Alert lede and caveats bullet still open with an unconditional 'population-weighted rollups' method claim that the same block negates four lines later for 100% of the current surface; a method-name claim rather than a value label, and pre-existing (R-310-8).",
    "OPEN (non-blocking, provenance) -- berlin/maps.md L78 misrecords my second-round verdict as 'PASS WITH CONCERNS' when it was blocking CONCERNS, and L69 still calls acute_stage_share a 'population share' in a comment (R-310-7)."
  ],
  "recommendations": [
    "R-310-7 (non-blocking, fix on next touch): correct berlin/maps.md L78 to record the second-round domain verdict as CONCERNS (blocking), not 'PASS WITH CONCERNS', and drop the stale 'combined population share' phrasing at L69.",
    "R-310-8 (non-blocking): on the Hamburg page, soften the bold lede to 'population-weighted where possible rollups' in the rollup Alert and the matching caveats bullet.",
    "R-310-9 (non-blocking, cosmetic): de-jargon the raw stage codes remaining in the acute_stage_share column title, the last rendered machine-code string after R-310-1.",
    "R-310-6 (non-blocking, still open): record the chosen D1 remedy and the citywide-coloured rollup typology extension in docs/methodology/ for the G2 page; carry as a follow-up issue.",
    "Process (non-blocking): the R-C1 pre-integration grep should match '^Verdict: PASS$' on a full line -- this document deliberately retains superseded 'Verdict: CONCERNS' lines as an audit trail, and only the final line is operative."
  ]
}
```

Verdict: PASS

---
task: I / #327 — Rethink public presentation toward maximum plain-descriptive clarity
author: data-analyst (scoping pass; joint with gentrification-domain-expert per the ticket's gate —
  that agent's independent review/sign-off is a separate step, not authored here)
date: 2026-07-31
branch: epic-i/327-presentation-scoping
status: SCOPING RECOMMENDATION — for maintainer review before any display change is implemented.
  This document changes no web page content itself (the one exception, the takeaways.md wording
  fix, is called out explicitly in the ticket as safe to land directly with domain sign-off and is
  tracked separately, not part of this inventory).
---

# Scoping — public-presentation philosophy (#327, spun off #313)

## 1. Question and method

The maintainer asked, via #313, whether Gentriduck should try to *predict* gentrification or stick
to description/correlation. The domain expert's standing verdict (recorded on #313, restated in
this ticket): nothing published should read as a forecast — the one real forecasting attempt in the
repo, the E4 early-warning classifier, failed out-of-time (AUC 0.4445, **below chance**, on a
held-out later wave — see `docs/epic-e/E4-early-warning-findings.md`, "Out-of-time result"). That
verdict is settled at the *model* level already (ADR-0008 separated predictor from outcome
specifically to end the 2018 thesis's score-blending). This ticket asks whether the **display
layer** fully carries that commitment through, or whether some surface still compresses several
indicators into one number/score/class in a way that *reads* more prediction-flavoured or more
authoritative than the underlying computation actually is.

Method: every page under `web/pages/**` was grepped for score/composite/index/typology/blend
display logic, then each hit was read against its SQL query and the mart/model it sources from
(`transform/models/marts/*.sql`) to check what is actually rendered — not just what the prose says
is rendered. Findings below are grounded in the current committed code
(`epic-i/327-presentation-scoping`, HEAD `3dfef7d9` — `develop`'s tip after #329's D4-composite
de-conflation and #330's dependent E5 regeneration were both merged), verified by direct grep/read,
not assumed from page comments.

## 2. Headline finding: the risk the ticket worried about is largely already resolved

Before going surface-by-surface, the single most important finding from this inventory: **no live
web page currently renders a single blended predictor+outcome number.** `transform/models/marts/gentrification_index.sql`
retains `legacy_gentrification_score` at the `int_gentrification_ts` intermediate layer (per
ADR-0008 §3 Option A, "retained as one output" for 2018-comparison backward-compatibility), but:

- `fct_gentrification_change.sql` aliases it to `gentrification_score`/`gentrification_delta`
  internally, but **no `web/pages/**` query selects those columns** (verified by grep across
  `web/pages/`; only `status_index`/`status_delta`/`dynamism_index`/`trajectory_type` are queried).
- Even the `standard` variant (2018 thesis reproduction, shown on the home page's data-selector and
  on `/thesis-recheck`'s fixed BZR map) surfaces `status_index`/`dynamism_index`/`status_class`
  individually — the same shape as `live_data` — not the legacy blended score, per
  `gentrification_index.sql`'s own `union all` (the `int_thesis_2018_area_index` branch selects
  `status_index`/`status_class`/`dynamism_index`, never `legacy_gentrification_score`).

So the compressed artefact ADR-0008 explicitly named as a risk ("a single number conflates
predictor and outcome, hides which dimension drives a score") exists in the model layer for
internal comparison, but was never wired into a public display. This narrows the scope of what this
ticket actually needs to decide.

One documentation-precision gap follows from this and is flagged in §4 below (not a display change,
a wording clarification): `web/pages/methodology.md` §3 point 4 and §5 describe the retained single
score as "kept... as one backward-compatible output variant... labelled `standard`" in a way a
careful reader could take to mean the site displays it under that label. It doesn't — worth a small
copy fix so the prose matches what §5's own next paragraph already says ("`standard`'s single
score" is itself a slight overstatement of what `standard` shows on this site).

## 3. Inventory: every surface that compresses multiple indicators into one displayed artefact

| # | Surface | What's compressed | Currently shown compressed, or components shown too? | Assessment |
|---|---|---|---|---|
| 1 | Six-stage typology (`status_class`/typology_stage) — home `stage_distribution`/`top_pressure`, `/berlin/maps` and `/hamburg/maps` "Gentrification stage" option, every area-detail page's portrait sentence | D1 (status) × D2 (dynamism) matrix → one of six named stages | **Both.** Every place the stage label appears, `status_index` and `dynamism_index` are either shown alongside it in the same table/tooltip, or one click away on the area's own page. | Keep compressed **and** paired. This is Option C of ADR-0008's explicit A/B/C architecture decision, chosen specifically because "a single score... cannot represent that ambiguity; a two-axis typology can" (methodology.md §3, takeaway 3). It is categorical, not a blended number, and the deliberately-ambiguous `improving-vulnerable` cell is the model's own answer to the "don't force a clean verdict" problem. No change recommended. |
| 2 | Rollup "dominant stage" (Bezirk/PGR/Ortsteil on `/berlin/maps`; District/Stadtteil on `/hamburg/maps`) | Population-weighted plurality vote over constituent PLR/Gebiet stages | **Both, and then some.** Every tooltip/table carries `dominant_share`, `acute_stage_share` (composition counterweight), `n_habitable_children`, and fragile/incomplete-population flags next to the dominant-stage colour — never a standalone label. A raw `status_index`/`dynamism_index` mean is explicitly **not offered** as a rollup map colour at all. | Keep as-is. This exact compression-vs-clarity question was already litigated through a dedicated dual sign-off (`docs/epic-e/310-map-granularity-{geo,domain}-signoff.md`, both PASS WITH CONCERNS resolved) and the standing `docs/epic-i/I-coarse-index-{geo,domain}-decision.md` (#267), which forbids a re-scored coarse-grain index outright. This ticket's philosophy is not new information here — it is the ruling already applied. |
| 3 | `standard` variant (2018 thesis reproduction) | N/A at display time — see §2 above; the mart's `standard` branch never carries the legacy blended score to the page layer | Components only, always | No display change needed. Documentation-precision fix only (§4). |
| 4 | Hamburg D4 predictor composite (`ewr_composite`, `foreigners_share` + `age_under18_share`) | Two demographic-composition indicators averaged into one predictor feature | **Never shown publicly, at all — and neither is anything else from Hamburg demographics.** Confirmed by grep: `ewr_composite` appears in zero `web/pages/**` files. `mart_area_demographics` (#313) sources `int_ewr_demographics_wide_hamburg` and is built to show each indicator (including `unemployment_share`) individually at the model layer, but the display layer is not live — every Hamburg demographics section (`web/pages/hamburg/area/[code].md:280`, `hamburg/area/district/[code].md:217`, `hamburg/area/subarea_l1/[code].md:215`) still renders `<NotYetPublished>`, and `timeline.md:140` confirms the demographics/change composite "stays placeholder... still an open maintainer ruling." #313's PASS sign-off is a mart-layer (data pipeline) precedent, not evidence the page is live. | Keep the composite hidden / do not add a public composite display — that part of this ticket's recommendation holds regardless. But correct the framing: Hamburg demographics display is not a closed precedent to cite approvingly here — it is the one genuinely **open** display decision on the site, and #327's philosophy (show components, never a blended number) should *inform how it gets built* rather than be illustrated by it as already-resolved. The composite exists only as an internal lead-lag regression feature (`analysis/e5_hamburg_lead_lag.py`), never a public artefact. See §5 for one adjacent, already-tracked labelling risk (not a compression risk) that a future Hamburg-copy edit should mind. |
| 5 | Offering Advantage (OA) — `/berlin/poi-map`, `/hamburg/poi-map`, `/methodology-oa-modes` | Raw POI counts within one business domain/area/year, compressed into a location-quotient ratio | Shown as a single ratio, but **the site's own governing rule is "never blend further"**: method × spatial scale × within-group dominance are three independent axes, each surfaced separately, each with its own caveats (thin-PLR suppression, bandwidth sensitivity) — `methodology-oa-modes.md`'s own lede: *"Offering Advantage (OA) is not one number... these measurements are never blended into one composite score"* (ADR-0024 D1/D3). | Keep as-is. This is a within-dimension transformation (D3 predictor only), not a cross-dimension blend of predictor and outcome, and it is already the clearest existing articulation of this ticket's target philosophy anywhere on the site. Recommend citing it as house style for future compression calls (§6). |
| 6 | Within-group dominance (cuisine-typed, gastronomy, etc.) | Concentration/evenness of POI sub-types within a category | Public cut stops at category level; cuisine-typed dominance is explicitly barred from any public, displacement-adjacent surface for anti-stigma reasons (`methodology-oa-modes.md` §5) | Keep as-is — already the most conservative surface on the site; not a candidate for this ticket. |
| 7 | Milieuschutz flag / rent-pressure proxy / turnover proxy | Rent-pressure proxy specifically = relative Mietspiegel level + MSS transfer-receipt share, one composite | **Computed and disclosed in prose (`methodology.md` §2) but not wired into any live page query at all** (verified by grep — zero hits for `rent_pressure_proxy`/`turnover_proxy`/`milieuschutz_overlap_frac`/`under_milieuschutz` in `web/pages/`). | Not yet a live display — nothing to change today. Forward-looking recommendation only (§4): when this does get built, follow the OA/demographics precedent (show the two inputs individually, or pair any composite with its components) rather than introduce the site's first genuinely predictor+outcome-blended public number. This is model/display work for a future ticket and should route through the normal methodology gate, per this ticket's own instruction — not decided here. |
| 8 | Price/rent reference figures (Bodenrichtwert, Mietspiegel-derived estimated rent) — `/berlin/poi-map`, area-detail | N/A — shown individually | Individual figures only (`avg_est_rent_low/mid/high`, `avg_brw_eur_m2`), explicitly captioned "not observed transaction prices" | Keep as-is. Already individually shown; not a compression surface. |
| 9 | Trajectory type / confidence (`fct_gentrification_trajectory`) — area-detail spotlight `BigValue`s, `/berlin/time-series` movers table | A categorical label derived from the sequence of status-delta transitions across editions | Categorical, paired with `status_delta` (the numeric change) wherever it appears | Keep as-is. Same shape as the six-stage typology (#1) — a named category alongside its numeric driver, not a blended score. |
| 10 | Home-page headline BigValues (`index.md:119–130`, "High gentrification pressure" / "Low gentrification pressure") | A single D2 (dynamism) ordinal (`count(*) filter (where dynamism_class_bi = 'negative'/'positive')`) presented under language that names the site's full two-axis construct | **Under-compressed, not over-compressed — the inverse of this inventory's usual pattern.** The BigValue itself carries no D1 (status) component at all; "gentrification pressure" implies the combined status×dynamism read that only the six-stage typology (row 1) actually delivers. The caption immediately below the BigValues and `top_pressure` elsewhere on the page do pair both axes, so context partially decodes it, but the number itself does not. | Flagging only, not resolving here (maintainer call). One indicator (D2 alone) is over-generalised to sound like the multi-dimensional construct its label invokes — the mirror image of rows 1–2, where multiple indicators are compressed into one label but the components are shown alongside. Recommend the maintainer consider either (a) renaming the BigValue titles to be indicator-specific (e.g. "Areas trending down" / "Areas trending up", avoiding "gentrification pressure" language for a D2-only figure), or (b) adding a D1 figure alongside in the same BigValue row. This is a recommendation only — no page content is changed by this document. |

No surface in this inventory both (a) blends predictor and outcome dimensions, or unlike
indicators, into one number, and (b) is currently displayed without its components alongside it.
The two genuinely compressed public artefacts (rows 1 and 2) already carry their components next to
them, by deliberate prior design (ADR-0008, #310). Row 10 is a distinct, lower-severity issue in the
opposite direction — a single indicator over-generalised under multi-dimensional-sounding language —
caught only because the domain review looked past the compression frame this inventory was
originally scoped around.

## 4. Recommendations

Ranked by how much they'd actually change what a reader sees:

1. **No display change recommended for the site's two live compressed surfaces** (the six-stage
   typology and the rollup dominant-stage). Both were designed, and separately gated, specifically
   to answer this ticket's own question — "does compressing this help a lay user, or does showing
   components plainly communicate more honestly?" — and both already resolved it by pairing the
   compressed label with its components in the same UI element, never as a standalone number. This
   is this scoping pass's central conclusion: the site's working practice on `develop` already
   matches the philosophy #327 asks for; there is no backlog of surfaces waiting to be decompressed.

2. **Low-severity, real today: the home-page "gentrification pressure" BigValues (row 10).**
   `index.md:119–130` labels a single D2 (dynamism-only) count with language that names the site's
   full two-axis construct, with no D1 alongside in the BigValue itself. The caption below and
   `top_pressure` elsewhere on the page partially mitigate this, which is why it is not ranked above
   the two settled compression surfaces — but it is a live, public mislabelling risk today, not a
   forward-looking one. Recommend (maintainer's call, not implemented here) either renaming the
   BigValue titles away from "gentrification pressure" toward D2-specific language (e.g. "Areas
   trending down" / "Areas trending up"), or adding a paired D1 figure to the same BigValue row, so
   the label matches what is actually computed.

3. **Small, text-only copy-precision fix on `web/pages/methodology.md`** (not a display change, no
   mart touched): soften §3 point 4 and §5's description of the retained legacy score so it doesn't
   read as if the live site shows a single blended number under the `standard` label — it shows
   `status_index`/`dynamism_index`/`status_class` there too, same shape as `live_data`. Suggested
   language direction: *"...kept in the model layer as one backward-compatible internal comparison
   point (not itself displayed on this site under any label) — the `standard` variant you can select
   above shows the same decomposed status/dynamism figures as `live_data`, just anchored to the 2018
   snapshot."* This is small enough it could plausibly land the same way as the takeaways.md fix
   (domain sign-off only), but it touches `methodology.md`, which is on the methodology-gate file
   list (CLAUDE.md) — recommend the maintainer decide whether to fold it into this ticket's gate or
   file it as its own tiny follow-up.

4. **Forward-looking, not actionable today:** when the disclosed-but-unwired Milieuschutz/rent-
   pressure/turnover signals (methodology.md §2) eventually get a public display (tracked
   separately, "planned integration" per methodology.md's own dimension table), that display design
   should follow the OA/demographics precedent (rows 4–5 above) rather than introduce this site's
   first live predictor+outcome-blended number. This is explicitly a "route through the normal
   methodology gate separately" item, not a decision made here.

5. **One adjacent, already-tracked item worth flagging for whoever builds the Hamburg demographics
   display** (not a compression issue — nothing is compressed here — but close enough to this
   ticket's "does the display honestly represent the method" spirit to note, and directly relevant
   now that §3 row 4 establishes this display is still open, not shipped):
   `docs/epic-h/329-hh-d4-conflation-domain-signoff.md`'s D-C3/D-C4 conditions are already binding at
   "the G2 methodology page / any Hamburg public narrative" and require that, whenever this display
   does go live, it state that (a) Hamburg's `unemployment_share` figure — once shown individually,
   per the mart's own "descriptive, non-composited display" ruling — is descriptive-only and feeds no
   index, and (b) Hamburg's actual D4 predictor composite (invisible to readers) rests on origin- and
   age-composition, not unemployment — otherwise a reader could reasonably but wrongly assume the one
   economic figure they can see is what drives the typology. This is already scoped and gated by
   #329, not new work from this ticket; flagged here only because it is the one place on the site
   where *not* showing something (the composite) creates a legibility risk symmetrical to the one
   this ticket is about (showing something compressed that shouldn't be) — and because #327's own
   philosophy should govern this build, per the §3 row 4 correction above.

## 5. Grounding this scoping pass draws on

- **#313's own EWR-composite reasoning** (`docs/epic-h/313-hh-area-demographics-domain-signoff.md`,
  `docs/epic-h/329-hh-d4-conflation-domain-signoff.md`): the precedent that a demographics mart
  should show individual indicators, never a composite, is directly on point and is already
  implemented at the mart layer — cited throughout §3 row 4 above. It is a mart-layer (data
  pipeline) precedent only; the corresponding display is not yet live (§3 row 4).
- **ADR-0008's predictor/outcome separation** (`docs/adr/0008-multi-dimensional-gentrification-model.md`
  §3, "Index architecture — hybrid"): the governing decision that rejected a pure single-composite
  model (Option A) in favour of separated sub-scores (B) plus a derived typology (C), retaining A
  only as a labelled, non-authoritative comparison output. This is the architectural basis for why
  rows 1–2 in §3 are built the way they are, and for why row 3's finding (the retained score never
  reaches a public page) is unsurprising rather than an oversight.
- **`docs/epic-e/E4-early-warning-findings.md`'s failed forecast** (out-of-time AUC 0.4445, below
  chance): the empirical case that this project's own attempt at prediction did not work is the
  strongest available argument, independent of any display-layer decision, for keeping every public
  artefact — compressed or not — framed as descriptive/typological rather than predictive. Takeaway
  4 on `web/pages/takeaways.md` already carries this into public copy; nothing in this inventory
  found a surface that contradicts it.
- **`docs/epic-i/I-coarse-index-{geo,domain}-decision.md` (#267) and `docs/epic-e/310-map-granularity-{geo,domain}-signoff.md` (#310)**:
  the standing rule against ever re-scoring/averaging ordinal indices at a coarser grain, and the
  concrete resolution of "how much context must a compressed rollup label carry," both already
  operationalize this ticket's question for the map surfaces.
- **`web/pages/methodology-oa-modes.md` / ADR-0024**: cited as the site's clearest existing
  statement of the target philosophy ("OA is not one number... never blended into one composite
  score") — recommended as house style for any future compression decision (§4 point 3).

## 6. What this scoping pass explicitly does not do

- It does not change any web page content, except the takeaways.md wording fix the ticket
  authorizes to land directly (tracked separately from this document — see the PM's task summary
  for before/after text).
- It does not touch any dbt model, mart, weight, or methodology definition. Every recommendation
  above that would require a computation change (row 7, the future rent-pressure display) is
  explicitly deferred to "route through the normal methodology gate separately," per the ticket's
  own instruction.
- It does not constitute a sign-off. This is the `data-analyst` half of the ticket's stated joint
  authorship; a `gentrification-domain-expert` review of this document is a separate, independent
  step and is not represented here.

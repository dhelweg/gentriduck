# #358 implementation spec: neutral status trend, numbered stages, no "pressure" ordering

- **Author:** gentrification-domain-expert
- **Date:** 2026-11-06
- **Issue:** #358 (methodology-bearing; dual geo-DS + domain sign-off before integration)
- **Binding input:** maintainer decision of 2026-11-02 (issue comment), option A plus a leading
  stage number:
  - replace "Pressure trend" with a neutral **status trend** (improving / stable / worsening);
  - prefix every stage label with its cycle position, so that an alphabetical sort is cycle order;
  - remove every "highest pressure first" ordering and every Dynamik/stage-related "pressure"
    wording, in both cities;
  - wording must not imply a deterministic progression.
- **No statistic changes.** The D1×D2 matrix (`transform/macros/typology_stage.sql`), the stage
  keys and every threshold stay exactly as they are.
- **Gate:** methodology-bearing under R-C1 (it changes `gentrification_index.sql` and
  `docs/methodology/index-definition.md`, and the cycle numbering is an interpretive ordering).
  Dual geo-DS + domain sign-off is needed before integration. The geo-DS confirmed the trend-sign
  mapping in both cities (`docs/epic-g/358-spec-geo-review.md` §1).
- **Revision 1 (2026-11-06):** folds in the geo-DS review C1–C5 (see the revision log at the end).
  None is rebutted.

---

## 0. Why (one paragraph for the PR)

The site convention "negative Dynamik = higher gentrification pressure" contradicts the typology
the stages are built from. In the D1×D2 matrix (index-definition §1.5), **positive** Dynamik in
low- or mid-status areas is the upgrading signal: invasion–succession, Dangschat 1988. Negative
Dynamik is filtering-down, at most a rent-gap precondition (Smith 1979). So every area in a
gentrification stage sorted to the bottom of a list headed "highest pressure". The fix:

- report the official Dynamik for what it is, a relative **status trend**;
- order areas by their **position in the typology**;
- make no pressure claim from either.

## 1. Stage list, cycle numbers and new labels

**Source of truth for keys:** `transform/macros/typology_stage.sql` and index-definition §1.3/§1.5
(six keys). The web currently de-jargons them with a CASE repeated about 30 times
(`berlin/maps.md`, `hamburg/maps.md`, `hamburg/area/[code].md`), with a `stage_sort` that orders by
"pressure severity" (active-gentrification = 1 … stable-established = 6). That sort is replaced.

| # | Stage key (unchanged) | MSS cells (Status × Dynamik) | **New public label (exact)** | Theory position |
|---|---|---|---|---|
| 1 | `pre-gentrification` | 2×3, 3×2, 3×3, 4×2, 4×3 | **1 · Pre-gentrification** | Dangschat stage 0: low or middle status, stable or worsening. It includes filtering-down (middle status worsening), i.e. the rent-gap precondition (Smith 1979), not an upgrading signal. |
| 2 | `improving-vulnerable` | 4×1 | **2 · Improving from very low status (ambiguous)** | The lowest status rung with an improving trend. A named tension cell, not a process stage (index-definition §1.3): it could be improvement for incumbent residents or the very first upgrading. It is placed before 3 because it sits one status rung lower on the same ascent. |
| 3 | `pioneer-signal` | 3×1 | **3 · Pioneer signal** | Dangschat stage 1: social invasion beginning in a low-status area (Clay 1979 "pioneer" phase). |
| 4 | `active-gentrification` | 2×1 | **4 · Active gentrification** | Dangschat stage 2: middle status still improving; social succession, with commercial succession visible. |
| 5 | `consolidation-pressure` | 1×1 | **5 · Consolidation** | Dangschat stage 3: high status still improving; the upgrading is consolidating (Clay 1979 "maturing" phase). **The public label drops "pressure" / "still intensifying".** |
| 6 | `stable-established` | 1×2, 1×3, 2×2 | **6 · Stable / established** | Settled middle or high status without an upgrading trend: either after the cycle, or never part of it. This includes the high-status-worsening tension cell (decline, not gentrification). |
| — | NULL | uninhabited / no MSS value / not scored | **No stage on record** (no number) | Sorts last. Use the same text in both cities. It replaces Berlin's "uninhabited / no data". |
| — | `'uninhabited / no data'` (roll-up marts: `mart_area_rollup_stage_mix`, `mart_ortsteil_plr_stage_mix`, incl. `dominant_stage`) | — | **No stage on record** (no number) | Same as NULL. Tooltip for Berlin: "(uninhabited)", only where the population is 0. Tooltip for Hamburg: "not scored by the Sozialmonitoring". (C2) |

**Why this order.** It follows the status ascent of the double invasion–succession cycle
(Dangschat 1988; index-definition §9): first the precondition (1), then improvement from the lowest
rung (2), then from low status (3), then from middle status (4), then from high status (5), then
the settled end (6). Clay's (1979) pioneer → expanding → maturing phases map onto 3 → 4 → 5.

**Typography.** Use the middle dot with spaces ("1 · "). Single digits keep lexicographic order
equal to cycle order. "No stage on record" sorts after every digit in both ASCII and locale
collation, so it goes last without a number.

**Stage keys stay unchanged**, including `consolidation-pressure`. They are a data contract: dbt
`accepted_values` tests, seeds, published CSVs, sign-off documents. **The raw key must never be
shown to users**: every user-facing table, tooltip and legend shows the new label. The key may stay
in code, CSV downloads and docs.

**Single source of truth (implementation requirement; C1).** Add a macro
`typology_stage_display(stage_col)` next to `typology_stage`. It returns `stage_number` (1–6,
NULL otherwise) and `stage_label` (the seven exact strings above, with "No stage on record" for
NULL and `'uninhabited / no data'`).

- **`gentrification_index`.** Add, for `variant = 'live_data'` rows (NULL for the thesis
  variants):
  - `typology_stage` = `typology_stage(status_index, dynamism_index)`, the existing macro and the
    same logic as `int_gentrification_ts`;
  - `stage_number` and `stage_label`;
  - `status_trend` (§2).
- **Stage marts.** Apply the display macro to `typology_stage` and `dominant_stage` in
  `mart_area_rollup_stage_mix`, `mart_ortsteil_plr_stage_mix`, `fct_gentrification_change` and
  `mart_mss_area_aggregate`, and in `fct_gentrification_trajectory` if it is shown.
- **Test.** Add a dbt test that `gentrification_index.typology_stage` equals
  `int_gentrification_ts.typology_stage` for the same area and period.
- **The area-detail "Stage" column reads `stage_label`, never `status_class`.** Today
  `/berlin/area-detail` (l. 95, 145) shows `status_class` (high/medium/low) under the heading
  "Stage", which is mislabelled.
- The web reads these columns instead of its 30 CASE copies.

This is the **dbt** part of the change. A macro rather than a seed keeps the mapping next to the
classification and is testable with `accepted_values`. It is keyed only on the stage key, so it
is city-agnostic (ADR-0005). The 2- vs 3-year window belongs in the page legend, not in the
values.

**Colours.** The current palette encodes severity ("red = highest pressure"). Replace it with a
palette keyed on `stage_number`, ordered along the cycle, with no alarm colour for any stage, for
example a sequential ramp 1 → 5 plus a neutral grey for 6 and a hatched or light grey for no stage.
The exact palette is the web-engineer's choice, under the WCAG rules already in use.

## 2. Status trend: mapping (geo-DS to confirm)

Both cities use the same coding after staging. In `int_hamburg_sozialmonitoring_index` and
`stg_berlin_mss`, `dynamik_index` is 1 = positiv, 2 = stabil, 3 = negativ (index-definition §1.4,
§3.4). `gentrification_index.dynamism_class` relabels this as positive / neutral / negative.

| `dynamik_index` | `dynamism_class` | **Status trend (exact public value)** | Meaning |
|---|---|---|---|
| 1 (positiv) | positive | **Improving** | the area's social situation improved relative to the city as a whole |
| 2 (stabil) | neutral | **Stable** | no marked change relative to the city |
| 3 (negativ) | negative | **Worsening** | the area's social situation worsened relative to the city as a whole |
| NULL | NULL | **No trend on record** | — |

- **Berlin.** MSS Dynamik is the official 2-year change class, relative to the Berlin-wide change.
- **Hamburg.** The Sozialmonitoring Dynamikindex is the official 3-year change class, relative to
  the Hamburg-wide change. The indicator sets differ (Hamburg includes S1, S2, S6 and S7).
- **"Improving" means the official status indicators improved.** It is not a judgement that
  residents are better off, and not a gentrification measure (see the wording in §5).
- **Implementation.** Add `status_trend` (the exact strings above) in dbt next to `dynamism_class`,
  or map it in one shared web query. The column title is **"Status trend"** everywhere.
  `dynamism_class` / `dynamism_class_bi` stay unchanged as data.
- **`status_trend` is defined only for `variant = 'live_data'` (C3).** It is NULL for the thesis
  variants (`standard`, `distance_weighted`, `improved`), whose `dynamism_class` is the 2018
  POI-dynamism projection, not the official Dynamik.

**Geo-DS check: done** (`358-spec-geo-review.md` §1).
- **Berlin.** Class 1 has the most favourable published indicator change in every edition and
  class 3 the least.
- **Hamburg.** positiv → 1 comes from the publisher's own label.
- **`live_data`.** `dynamism_class` equals `dynamism_index` 1/2/3 exactly.

`index.md`'s `top_pressure` query, which orders by `dynamism_index desc`, is removed in §3/§4.

## 3. Browse ordering (`/berlin/area-detail`, `/hamburg/area-detail` and every area table)

- **Default sort:** `stage_number` ascending, NULLs last, then `area_name` ascending, then
  `area_code` ascending as a deterministic tie-break. This replaces the Dynamik-reading order and
  fixes Berlin's missing tie-break.
- **The user can re-sort** by any column: stage, status trend, area name, code. Status trend sorts
  alphabetically (Improving, No trend on record, Stable, Worsening). That is acceptable because no
  order is presented as a ranking.
- **Spotlight:**
  - Remove the "highest-pressure / strongest pressure reading" spotlight logic.
  - Replace it with a user choice (a dropdown of the district's areas) that defaults to the first
    row of the table.
  - The spotlight sentence becomes neutral (see §5). It never implies that the first area matters
    more.
- **Home page:**
  - Remove the "Highest-pressure neighbourhoods" top-10 (`index.md` `top_pressure`). Do not
    replace it with another ranked list of named areas; the existing stage-distribution chart
    already gives the overview.
  - Replace the two "High / Low gentrification pressure" BigValues with status-trend counts: three
    BigValues, "Status improving", "Status stable" and "Status worsening". They count
    `status_trend` for `variant = 'live_data'` at each city's latest edition, shown **per city**.
    They are never summed across cities, because the classes cover 2 vs 3 years and different
    indicators (C4).

## 4. Every place that must change

The grep was run on 2026-11-06 over `web/pages`, `web/components`, `transform/models`,
`transform/macros`, `transform/seeds` and `docs/methodology/index-definition.md`, for "pressure"
(rent-pressure excluded), `pressure_trend`, "Pressure trend" and the stage CASE/label strings. Line
numbers are as of `develop` @ this date.

**[web], user-facing (must change):**

| File | Lines | What |
|---|---|---|
| `web/pages/berlin/area-detail.md` | 59, 96, 111, 114, 121, 146, 172, 188–189 (+ comments 8, 20) | lede, `pressure_trend` alias, ordering paragraph, column/BigValue title, spotlight sentence, ORDER BY |
| `web/pages/hamburg/area-detail.md` | 39, 50–51, 88, 98, 101, 108, 140, 159, 167–168 (+ comments 9, 13, 33) | same as Berlin |
| `web/pages/berlin/area/[code].md` | 165, 235, 237–239, 624 (+ comments 34, 132, 226) | `pressure_trend`; stage sentences "upward-status pressure", "under **consolidation pressure**" |
| `web/pages/hamburg/area/[code].md` | 173, 176–181, 410–411 (+ comments 84, 167, 281, 283) | `pressure_trend`; stage CASE; "negative pressure trend … higher pressure" |
| `web/pages/berlin/area/index.md` | 37, 52 | `pressure_trend` column |
| `web/pages/berlin/area/bzr/[code].md` | 582, 599 (+ stage `coalesce` at 97, 116, 581) | column; no-stage text |
| `web/pages/berlin/area/ortsteil/[code].md` | 189, 525 (+ stage at 155, 188, 369) | column |
| `web/pages/berlin/area/bezirk/[code].md`, `pgr/[code].md` | bezirk 180, 200; pgr 90, 109 | "uninhabited / no data" → "No stage on record" |
| `web/pages/hamburg/area/index.md` | 52, 87, 118 | column |
| `web/pages/hamburg/area/subarea_l1/[code].md` | 108, 575 (+ 107, 135, 158) | column |
| `web/pages/hamburg/area/district/[code].md` | 472 (+ 119, 143) | "ordered by their pressure reading" |
| `web/pages/berlin/maps.md` | 2, 279, 288, 294–295, 326, 331–334, 741, 828–829, 839–844, 862, 874; label CASE + `stage_sort` at 381–396, 549–564, 632–637, 709–714, 772–777; colour map 119–153; `acute_stage_share` title 252, 741 | title, lede, legend, alerts, CASE/sort/palette, column title |
| `web/pages/hamburg/maps.md` | 2, 218, 222, 269, 274–277, 595, 689–694, 722; CASE + sort at 318–333, 418–433, 502–507, 558–563, 623–628; palette 79–115; 190, 595 | same as Berlin |
| `web/pages/index.md` | 39, 126–127, 136–137, 140, 160, 197–226, 232, 250, 264–265, 276, 309, 314 | lede, BigValues, top-10, legend sentence, caveats |
| `web/pages/berlin/index.md` | 86 | "strongest pressure reading" |
| `web/pages/hamburg/index.md` | 159 | same |
| `web/pages/methodology.md` | 38, 55, 60, 62, 67, 178, 274, 379 (122, 124, 138: see the out-of-scope note below) | §1 heading and definition, stage list, "risk/pressure language" |
| `web/pages/takeaways.md` | 90, 106, 132–133, 143 | stage keys and pressure framing |
| `web/pages/methodology-oa-modes.md` | 239, 300 | "currently-highest-gentrification-pressure" district pick and its query |
| `web/pages/how-its-built.md` | 143 | "gentrification pressure" |
| `web/pages/berlin/poi-map.md`, `hamburg/poi-map.md` | 546; 371 (and 500 for "displacement-pressure") | link text "gentrification-pressure map" |
| `web/pages/timeline.md` | 59 | thesis entry "analyzes gentrification pressure" |
| `web/components/LinkCard.svelte` | 17 | 'What "gentrification pressure" means here' |

**[dbt], data and docs:**

| File | Lines | Change |
|---|---|---|
| new macro `typology_stage_display` (`transform/macros/`) | — | stage number + label (§1, C1) |
| `transform/models/marts/gentrification_index.sql` | — | add `typology_stage`, `stage_number`, `stage_label`, `status_trend` for `live_data` (§1, §2, C1) |
| `mart_area_rollup_stage_mix`, `mart_ortsteil_plr_stage_mix` (incl. `dominant_stage`), `fct_gentrification_change`, `mart_mss_area_aggregate` (+ `fct_gentrification_trajectory` if shown) | — | apply the display macro; `'uninhabited / no data'` → "No stage on record" (C1, C2) |
| new singular test | — | `gentrification_index.typology_stage` = `int_gentrification_ts.typology_stage` per area-period (C1) |
| `transform/models/marts/schema.yml` | 159–161 (`gentrification_index.dynamism_class`) | Replace the polarity note with: "live_data: official Dynamik class, positive = status indicators improved relative to the city (Berlin MSS, 2 years; Hamburg Sozialmonitoring, 3 years). Thesis variants: 2018 POI-dynamism class (B5-findings-check.md). Not a pressure measure." (C3) |
| `transform/models/marts/schema.yml` | 19 (model description) | Replace "dynamism_class 'negative' = high gentrification pressure. See B5-findings-check.md." with "dynamism_class: live_data = official Dynamik class (status trend); thesis variants = 2018 POI-dynamism class, polarity per B5-findings-check.md. Not a pressure measure." |
| `transform/models/marts/schema.yml` | 121, 295, 2009 | tests and descriptions for the new columns |
| `transform/models/staging/schema.yml` 68–69 (`stg_thesis_2018_result_bzr`), `transform/models/intermediate/schema.yml` 74–75 (`int_thesis_2018_area_index`) | — | **Thesis 2018 models, a different construct.** Remove "high/low gentrification pressure" and write: "Thesis 2018 projected POI-dynamism class (not the official MSS Dynamik); polarity as documented in B5-findings-check.md." **Do not relabel as status trend** (C3). |
| `transform/models/marts/fct_gentrification_trajectory.sql` | 20, 28, 34 (comments) | "higher pressure" → "more deprived / more vulnerable" |
| `docs/methodology/index-definition.md` | 120, 141 (and 94, 98 for the guardrail text) | §1.3 public label; §1.4 "upward-pressure end" phrase (§5) |

**Not in scope; keep as is:**

- **The B1 rent-pressure proxy** (`int_berlin_rent_pressure_proxy`, `displacement_subindex`, the
  methodology "affordability / rent-pressure" wording). It is a distinct, signed-off affordability
  construct (Mietbelastung), not the Dynamik convention.
- **Literal references** to the Senate's own designation criteria ("Verdrängungsdruck" in
  §172 BauGB studies, `methodology.md:138`).
- **Internal SQL comments** in other intermediate models that use "upgrading pressure" as theory
  shorthand (`int_berlin_brw_trend`, `int_berlin_milieuschutz_event_panel`, `int_gentrification_ts`).
  They are optional to clean up and do not block.
- **`thesis-recheck.md:40`** ("review-fix time pressure"), which is unrelated.

## 5. Exact replacement wording

**Column, BigValue and tooltip titles.**
- "Pressure trend" → "Status trend"
- "Stage / classification" → "Stage"
- "Share in an acute-pressure stage (Active gentrification + Early pioneer signal + Improving,
  vulnerable area; …)" → "Share in stages 2–4 (improving from very low, low or middle status; …)".
  Keep the existing weighting suffix unchanged.

**Status-trend legend.** Use this once per page wherever the trend is shown, replacing every
"negative = higher pressure" sentence:

> "**Status trend** is the city's own official change class (Berlin: MSS Dynamik over 2 years;
> Hamburg: Sozialmonitoring Dynamik over 3 years). It says whether an area's social-status
> indicators **improved**, stayed **stable** or **worsened** relative to the city as a whole. An
> improving trend can mean better conditions for the people who live there, or a change in who lives
> there; the official data cannot tell which. It is not a measure of gentrification on its own."

**Stage-number legend.** Use this on maps, area tables and area-detail pages, next to the stage
column or legend:

> "The number before each stage gives its position in the gentrification cycle this site uses
> (after Dangschat 1988), from 1 (before any upgrading) to 6 (settled or outside the cycle). It is a
> position, not a timetable: areas can stay in one stage for many years, skip stages or move back,
> and many never pass through the whole cycle. Stage 6 also includes settled areas that were never
> part of it, and high-status areas whose status is worsening. Stage 2 is deliberately ambiguous."
> (C5)

**Area-detail ordering paragraph** (replaces Berlin 111–114 and Hamburg 98–101):

> "Every neighbourhood [HH: Gebiet] with a current stage in the selected district, ordered by stage
> number (1 to 6), then alphabetically. The order shows where each area sits in the cycle, not how
> urgent it is. Click a column header to sort differently."

**Area-detail lede** (Berlin 59 / Hamburg 39; keep the rest of each lede):

> "…then see a headline snapshot of any one of them, with a link to its full profile."

**Spotlight sentence** (Berlin 188–189 / Hamburg 167–168):

> "{name} is shown because you selected it (or because it is first in the list). Its full profile —
> …" (keep the existing continuation).

**Hub blurbs** (`berlin/index.md:86`, `hamburg/index.md:159`): "…with that district's strongest
pressure reading…" → "…with a snapshot of any one of them…".

**District page** (`hamburg/area/district/[code].md:472`): "ordered by their pressure reading" →
"ordered by stage".

**Berlin PLR stage sentences** (`berlin/area/[code].md` 235–239):
- active-gentrification: "in **4 · Active gentrification**: a middle-status area whose official
  status is still improving, the core of the upgrading process this site tracks"
- consolidation-pressure: "in **5 · Consolidation**: status is already comparatively high and still
  improving, consistent with a later stage of the cycle"
- pioneer-signal: keep the existing sentence; only the label changes.

**Maps.**
- Title "Maps — gentrification pressure by area" → "Maps — gentrification stages by area".
- Lede/legend "(red = highest pressure / earliest displacement risk, blue = …)" → "(numbered 1–6 by
  position in the cycle; see the legend)".
- "A negative pressure trend … means higher gentrification pressure" → the status-trend legend
  above.
- Alert "A 'Stable, established' reading at this grain is not evidence that pressure is absent." →
  "A '6 · Stable / established' reading at this grain does not mean that no part of the area is
  changing."
- Follow-up sentences "neighbourhoods under active gentrification pressure … where that pressure
  is actually locatable" → "smaller neighbourhoods in stages 2–4 … where such change can actually
  be located".
- "systematically understate pressure" → "systematically understate local change".
- "not a 'zero pressure' reading" → "not a 'no change' reading".

**Home page (`index.md`).**
- Lede: "tracking gentrification pressure across neighbourhoods" → "tracking signs of
  gentrification across neighbourhoods".
- BigValues (§3): "Status improving" / "Status stable" / "Status worsening".
- Line 140: the status-trend legend.
- Line 160: the stage keys in prose → the numbered labels ("from 1 · Pre-gentrification through
  3 · Pioneer signal and 4 · Active gentrification to 5 · Consolidation, plus 6 · Stable /
  established and the deliberately ambiguous 2 · Improving from very low status").
- Delete 197–227 (the top-10 and its "What to notice").
- Line 232: "under gentrification pressure" → "as gentrifying".
- Line 250: "upgrading and displacement pressure" → "upgrading and displacement risk".
- Lines 264–265: "A **negative** trend … **lower** pressure." → the first two sentences of the
  status-trend legend. Keep "A low status class means…".
- Line 276: "uses risk/pressure language" → "uses risk and signal language".
- Lines 309 and 314: "gentrification pressure" → "gentrification signals"; and 'What "gentrification
  pressure" means here' → 'What the gentrification stages mean here' (same text for
  `LinkCard.svelte:17`).

**Methodology (`methodology.md`).**
- §1 heading: 'What "gentrification pressure" means here' → "What the gentrification stages mean
  here".
- Line 55: '"Gentrification pressure," in this …' → '"Gentrification signal," in this …'.
- Lines 60/178: stage keys → numbered labels.
- Line 62: "displacement-*pressure* signal" → "displacement-*risk* signal".
- Line 274: ("pressure", …) → ("risk", "signal", …).
- Line 379: "acute-pressure stage" → "stages 2–4".

**Takeaways.**
- Line 90: keys → numbered labels.
- Line 106: "elevated-pressure stages" → "stages 2–4".
- Lines 132–133: "risk/pressure/signal language … (`consolidation-pressure`, not
  'post-displacement')" → "risk and signal language … ('5 · Consolidation', not
  'post-displacement')".
- Line 143: "where pressure currently sits" → "where each area currently sits in the cycle".

**Other pages.**
- `how-its-built.md:143`, `timeline.md:59`: "gentrification pressure" → "gentrification". The
  thesis title is "Untersuchung von Gentrifizierung …".
- `methodology-oa-modes.md:239/300`: "the district's currently-highest-gentrification-pressure"
  area → "a selected area of the district" (default: first by stage number, then name); remove the
  "negative dynamism first" ORDER BY.
- POI-map link texts: "gentrification-pressure map" → "gentrification-stage map";
  `berlin/poi-map.md:500` "displacement-pressure reading" → "displacement-risk reading".

**`docs/methodology/index-definition.md`.**
- §1.3 row `consolidation-pressure`, public label: "Consolidation / displacement-pressure" →
  "5 · Consolidation". Keep the process-meaning text, with "displacement-pressure signal" →
  "displacement-risk signal".
- Add a "#" column to the §1.3 table with the numbers from §1 here.
- §1.4: replace "`1=positiv = improving`; `3=negativ = worsening = the gentrification-relevant
  upward-pressure end`." with "`1=positiv = improving`; `3=negativ = worsening`. Worsening is
  filtering-down: at most a rent-gap precondition (Smith 1979), not a gentrification signal. In the
  typology, the upgrading signal is `positiv` Dynamik in low- or middle-status areas (§1.5)."
- §1.2 guardrail: "Use **risk/signal/pressure** framing" → "Use **risk/signal** framing". Keep the
  key `consolidation-pressure` as a stable identifier, but never show it publicly.

## 6. Hamburg Gebiete 90001 and 106001: follow-up, not in scope

- **Why it is outside #358.** #358 changes labels and ordering only, with no data change. The two
  fallback Gebiete are a hierarchy (data) question.
- **Neither Gebiet is scored by the Sozialmonitoring.** Neither appears in the annex in any edition
  (under 300 residents). So neither carries a stage or a trend. They enter Stadtteil stage-mix
  tables only as "No stage on record", and the Stadtteil OA roll-ups through their POIs.
- **The 106001 assignment looks wrong on domain grounds.** Hamburg's Gebiet codes carry the
  Stadtteil number as a prefix: Schnelsen's Gebiete are 41001–41012. `dim_area_hierarchy` assigns
  106001 to Schnelsen by nearest centroid, 6.5 km away. 90001 → Gut Moor is consistent with its
  prefix.
- **Recommended follow-up ticket (DE + geo-DS, methodology-bearing):** assign the two fallback
  Gebiete by the publisher's code prefix, or by an official Gebiet → Stadtteil key, instead of the
  nearest-centroid fallback. Re-check the Schnelsen OA roll-up after that. Until then, the
  Stadtteil pages need no extra wording, because neither Gebiet is scored.

## 7. Acceptance checks (for DE / web reviewer)

1. `grep -rni "pressure" web/pages web/components` returns only the out-of-scope hits listed in §4
   (B1 rent pressure, the §172 Senate criteria, `thesis-recheck.md:40`) and HTML/SQL comments that
   explicitly document this change.
2. No user-visible cell, legend or tooltip shows a raw stage key (`consolidation-pressure` etc.).
3. Every stage label on every page is one of the seven exact strings in §1, from the dbt columns.
   The 30 CASE copies are gone.
4. The area-detail pages, in both cities, open sorted by `stage_number`, then name, then code, and
   are user-sortable. There is no "highest/strongest pressure" text and no spotlight logic based on
   Dynamik.
5. `index.md` has no top-10 named-area ranking, and the BigValues read "Status improving / stable /
   worsening".
6. Data marts are unchanged except for the added columns (row counts and existing columns
   byte-identical). The C1 equality test passes, and `stage_label` / `status_trend` pass
   `accepted_values` on the exact strings. `status_trend` is NULL on every thesis-variant row.
7. Dual sign-off (geo-DS + domain) on the branch, because the work is methodology-bearing under
   R-C1, plus a domain page-wording check of the rendered pages.
8. The home-page status-trend counts are per city and drawn from `live_data` only (C4).

---

## Revision log

**Revision 1 (2026-11-06): geo-DS review C1–C5** (`docs/epic-g/358-spec-geo-review.md`). All are
adopted; none is rebutted.

| Item | Change |
|---|---|
| C1 | `gentrification_index` gets `typology_stage` (existing macro, `live_data` only), `stage_number`, `stage_label` and `status_trend`. New macro `typology_stage_display` for the stage marts. New equality test against `int_gentrification_ts`. The area-detail "Stage" column reads `stage_label`, not `status_class`. #358 is confirmed methodology-bearing (R-C1). |
| C2 | `'uninhabited / no data'` in the roll-up marts (incl. `dominant_stage`) maps to "No stage on record". |
| C3 | My claim that `staging/schema.yml` "says the opposite" was a misreading and is withdrawn. Those lines (and `intermediate/schema.yml` 74–75) document the 2018 thesis POI-dynamism class, a different construct. Only their pressure wording goes, with a pointer to B5. `status_trend` is `live_data`-only. The B5 polarity inconsistency (l. 85 vs l. 110) is a separate follow-up. |
| C4 | Home-page trend counts come from `live_data` only, per city, and are never summed across cities. |
| C5 | The stage-number legend says stage 6 also holds areas never in the cycle and high-status areas that are worsening. |

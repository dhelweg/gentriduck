# #358 spec: geo-DS review

- **Date:** 2026-11-06.
- **Reviewed:** `docs/epic-g/358-spec.md` (domain expert, uncommitted).
- **Evidence:** warehouse `data/gentriduck.duckdb`, opened read-only. I also read
  `transform/macros/typology_stage.sql`, `stg_berlin_mss`, `int_hamburg_sozialmonitoring_index`,
  `gentrification_index.sql` and the three `schema.yml` files.

## 1. Status-trend sign mapping: confirmed for live data

**Berlin.** `dynamik_index` 1 = positiv comes from WFS `di_n` 1 (`ingest_mss.py`). I checked it
against the published per-indicator Dynamik values in `stg_berlin_mss_indicators`. In every MSS
edition, class 1 has the most favourable change and class 3 the least, monotonically:

| Edition | Kinderarmut change, class 1 / 2 / 3 (pp) | Transferbezug change, class 1 / 2 / 3 (pp) |
|---|---|---|
| 2021 | −7.40 / −1.08 / +5.10 | −3.08 / −0.91 / +0.68 |
| 2023 | −7.69 / −1.95 / +3.76 | −2.23 / −0.39 / +1.74 |
| 2025 | −5.73 / −1.52 / +2.13 | −2.01 / −0.58 / +0.68 |

So 1 = Improving and 3 = Worsening holds.

**Hamburg.** `dynamik_index` is mapped from the publisher's own text label: positiv → 1 (683),
stabil → 2 (9,613), negativ → 3 (734). The header documents that positiv = the lowest Dynamik sum,
i.e. falling disadvantage. So 1 = Improving holds.

**`gentrification_index`, `variant = 'live_data'`.** `dynamism_class` positive / neutral /
negative equals `dynamism_index` 1 / 2 / 3 exactly, in both cities:
- BER: 384 / 2,628 / 336, plus 63 NULL;
- HH: 681 / 9,589 / 732.

**But the spec's claim about `staging/schema.yml` is a misreading.**
- `transform/models/staging/schema.yml:68–69` documents `stg_thesis_2018_result_bzr`.
- `intermediate/schema.yml:74–75` documents `int_thesis_2018_area_index`.

Both describe the **2018 thesis's projected POI-dynamism class**, which is a different construct
from the official MSS Dynamik. That is a continuous z-score, carried in `gentrification_index`
under the thesis variants `standard`, `distance_weighted` and `improved`. These lines do not
contradict the MSS mapping, and they must **not** be rewritten to the status-trend meaning. A side
note, not blocking #358: `docs/epic-b/B5-findings-check.md` is itself inconsistent about the thesis
polarity (l. 85 vs l. 110). That needs its own follow-up.

## 2. Stage numbering: consistent with the D1×D2 cells, with one unmapped value

- **Cells match.** The spec's cell list matches `typology_stage.sql` exactly:
  - pre-gentrification = 2×3, 3×2, 3×3, 4×2, 4×3;
  - improving-vulnerable = 4×1;
  - pioneer = 3×1;
  - active = 2×1;
  - consolidation = 1×1;
  - stable-established = 1×2, 1×3, 2×2.
- **Order is consistent.** Stages 2→5 are the dynamik = 1 column, ascending in status rung
  (4, 3, 2, 1), which matches the stated cycle logic.
- **Unmapped value.** `int_gentrification_ts`, `_unified_2021`, `fct_gentrification_change` and
  `mart_mss_area_aggregate` carry only the six keys plus NULL. However, **`mart_area_rollup_stage_mix`
  and `mart_ortsteil_plr_stage_mix` carry a literal seventh value, `'uninhabited / no data'`**
  (241 and 16 rows). It is not in the spec's mapping. `mart_area_rollup_stage_mix.dominant_stage`
  also carries stage keys and NULL, and needs the same label.

## 3. Proposed dbt columns: owner, gate, ADR-0005

- **`gentrification_index` has no stage column.** Its columns end at `own_idx_class_bi`.
  `/berlin/area-detail` currently shows `status_class` (high/medium/low) under the title
  **"Stage"** (l. 95, 145). So "order by `stage_number`" on the area-detail pages has nothing to
  read, and today's "Stage" column is mislabelled. The spec must say where the stage comes from
  (C1).
- **Owner.**
  - `gentrification_index` should own `typology_stage`, `stage_number`, `stage_label` and
    `status_trend` for `variant = 'live_data'` rows. `typology_stage` is computed with the
    existing `typology_stage(status_index, dynamism_index)` macro, the same logic as
    `int_gentrification_ts`.
  - A new macro next to it, `typology_stage_display(stage_col)`, returns number and label. It is
    applied to every emitted stage key in the stage marts.
  - I recommend a macro over a seed: it keeps the mapping beside the classification and is
    testable with `accepted_values`.
- **R-C1: yes, methodology-bearing.** `gentrification_index.sql` is on the CLAUDE.md list, the
  change edits `docs/methodology/index-definition.md`, and the cycle numbering is an interpretive
  ordering. Dual sign-off applies, even though no statistic changes.
- **ADR-0005: no concern if done as specified.** The macro is keyed only on the stage key and the
  ordinals and applies to both cities unchanged. The city-specific windows (2 vs 3 years) belong in
  the page legend, not in the `status_trend` value.

## 4. Statistical over-claims in the replacement wording

- **Stage-number legend.** "from 1 (before any upgrading) to 6 (settled)" presents 6 as the end
  of the cycle. Stage 6 also holds middle-status stable areas (2×2) that were never in it, and
  high-status worsening areas (1×3). See C5.
- **Home-page BigValues.** These would count `dynamism_class_bi`. Pooled across cities or variants,
  the counts would mix 2-year and 3-year classes and thesis POI-dynamism rows. See C4.
- **Everything else is neutral and accurate.** That covers the status-trend legend, "stages 2–4",
  the map alerts and the ordering paragraph. "Relative to the city as a whole" is right for both
  monitors.

## Required changes

**C1 (§1 "Single source of truth").** Replace the sentence beginning "Expose `stage_number` …" with:

> "Add a macro `typology_stage_display(stage_col)` next to `typology_stage`. It returns
> `stage_number` (1–6, NULL otherwise) and `stage_label` (the seven exact strings above). In
> `gentrification_index`, add `typology_stage` = `typology_stage(status_index, dynamism_index)` for
> `variant = 'live_data'` rows (NULL for thesis variants), plus `stage_number`, `stage_label` and
> `status_trend`. Apply the display macro to `typology_stage` and `dominant_stage` in
> `mart_area_rollup_stage_mix`, `mart_ortsteil_plr_stage_mix`, `fct_gentrification_change` and
> `mart_mss_area_aggregate` (and `fct_gentrification_trajectory` if shown). Add a dbt test that
> `gentrification_index.typology_stage` equals `int_gentrification_ts.typology_stage` for the same
> area and period. The area-detail 'Stage' column reads `stage_label`, never `status_class`."

**C2 (§1 table).** Add a row:

> "| — | `'uninhabited / no data'` (roll-up marts) | — | **No stage on record** (no number) | Same
> as NULL. Berlin tooltip '(uninhabited)' only where the population is 0; Hamburg 'not scored by
> the Sozialmonitoring'. |"

**C3 (§2 and §4 [dbt] table).**
- In §2, add: "`status_trend` is defined only for `variant = 'live_data'`. It is NULL for the thesis
  variants, whose `dynamism_class` is the 2018 POI-dynamism projection, not the official Dynamik."
- In the §4 [dbt] table, replace the `staging/schema.yml` and `intermediate/schema.yml` rows with:

  > "`staging/schema.yml` 68–69, `intermediate/schema.yml` 74–75 (thesis 2018 models): remove
  > 'high/low gentrification pressure' and write 'Thesis 2018 projected POI-dynamism class (not the
  > official MSS Dynamik); polarity as documented in B5-findings-check.md.' Do not relabel as status
  > trend."

- Replace the `marts/schema.yml` 159–161 text with:

  > "live_data: official Dynamik class, positive = status indicators improved relative to the city
  > (Berlin MSS, 2 years; Hamburg Sozialmonitoring, 3 years). Thesis variants: 2018 POI-dynamism
  > class (B5-findings-check.md). Not a pressure measure."

**C4 (§3 Home page).** Replace "counting `dynamism_class_bi` positive / neutral / negative" with:

> "counting `status_trend` for `variant = 'live_data'` at each city's latest edition, shown **per
> city** (never summed across cities, whose classes cover 2 vs 3 years and different indicators)."

**C5 (§5 stage-number legend).** Replace the second sentence with:

> "It is a position, not a timetable: areas can stay in one stage for many years, skip stages or
> move back, and many never pass through the whole cycle. Stage 6 also includes settled areas that
> were never part of it, and high-status areas whose status is worsening. Stage 2 is deliberately
> ambiguous."

With C1–C5 the spec is sound. The sign mapping it depends on is confirmed.

Verdict: CONCERNS

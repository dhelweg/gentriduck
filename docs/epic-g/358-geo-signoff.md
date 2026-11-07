# #358 status trend and numbered stages: geo-DS sign-off (R-C1)

- **Date:** 2026-11-06.
- **Branch:** `feat/358-status-trend-stages`.
  - dbt: 17ede3229, c444d604a, 33f11b2f6 (DE review APPROVE).
  - web: c9dc1e070.
- **Checked against:** `docs/epic-g/358-spec-geo-review.md` C1–C5. The sign mapping was confirmed
  on the warehouse in that review.
- **How checked:** I read the committed files on the branch. I did not rebuild the warehouse; the
  DE review reports existing columns identical up to float noise ≤ 5e-14.

## Checks

- **Stage numbers and labels: correct.**
  - `typology_stage_display` maps the six keys to 1–6 and to the exact spec strings.
  - NULL and `'uninhabited / no data'` both map to "No stage on record" with a NULL number (C2).
  - Any other value yields NULL, which is caught by `not_null` and
    `test_358_stage_display_mapped`.
  - The order matches the D1×D2 Dynamik = 1 column (status rung 4 → 1).
- **`gentrification_index` (C1): correct.**
  - `typology_stage` uses the existing `typology_stage(status_index, dynamik_index)` macro for
    `live_data` only, with NULL for the thesis variants.
  - `test_358_gentrification_index_stage_matches_ts` pins it to `int_gentrification_ts`.
  - The display macro is applied in the stage marts, including `dominant_stage`.
- **`status_trend` (C3): correct.** Dynamik 1/2/3 maps to Improving / Stable / Worsening, and NULL
  to "No trend on record". It is `live_data` only, enforced by
  `test_358_status_trend_live_data_only`.
- **Home counts (C4): correct.** They use `live_data`, Berlin's own latest edition and
  `city_code = 'BER'`, with the status-trend legend, and are never pooled with Hamburg. Showing
  Berlin only on the Berlin-focused home section satisfies "per city, never summed".
- **C5 legend: correct.** `StageNumberLegend.svelte` carries the stage-6 sentence verbatim, and
  "6 (settled or outside the cycle)" is a fair tightening. `index-definition.md` §1.3 says the same.
- **(a) Maps Dynamism wording: confirmed.** In both maps pages, "1 = improving, 2 = stable,
  3 = worsening relative to the city, so higher shading means a worsening trend" is correct for the
  ordinal `dynamism_index`, which I verified monotone against the published indicator changes. The
  old "higher = faster upward change" text was inverted.
- **(b) Palette and stage share: accepted.**
  - Viridis for stages 1–5, grey for 6 and light grey for no stage is keyed on `stage_number`, has
    no alarm colour, and is perceptually ordered along the cycle position.
  - "Share in stages 2–4" from `stage_number` 2–4 is the same three keys as the former composition
    share (improving-vulnerable, pioneer, active). This is a relabel, not a new statistic.
- **ADR-0005: no concern.** The macro is keyed on the stage key only, and the legends name both
  cities' windows in the text, not in the data.

No fixes required.

Verdict (first round): PASS (superseded below)

**Re-check (5c7f04cd3, 2026-11-07):** The §9 numbering note is consistent with the §1.5 matrix: process stage 0 → 1, stage 1 → 3 (low status, 3×1) or 2 (very low, 4×1), stage 2 → 4 (2×1), stage 3 → 5 (1×1), and stage 4 (hoch, stabil) is cell 1×2 → 6 · Stable / established. "No elevated-signal flag is implemented" is true: no such flag exists in `transform/`. The home-page sentence "status is low or middle and the official trend is improving relative to the city" correctly describes 3 (3×1) and 4 (2×1). Replacing "pressure" with "risk" or "upgrading" adds no claim. Correct.

Verdict: PASS

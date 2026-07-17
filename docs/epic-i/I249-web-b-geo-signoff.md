# I18-web-b (#249) — MSS status/Dynamik at BZR/Bezirk grain: geo-data-scientist sign-off

**Ticket:** #249 (I18-web-b, follow-on to #247's deferred MSS-at-BZR content)
**Branch:** `feature/249-i18-web-b-mss-mart` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
**Date:** 2026-07-12

## Scope of this pass

`I18-web-geo-signoff.md` (#247) explicitly deferred rendering `int_mss_bzr_aggregate` (B10, #120)
on any public page, both because it wasn't yet exposed as a `gentriduck_marts.*` mart and because
its own header caveats it as *"fit for the directional MAUP probe but may mis-stage boundary
BZRs/Bezirke"* — approved for a research comparison, not asserted fit for public display. This
pass is specifically that display-fitness check. **It is not a re-review of the aggregation
formula itself** — the population-weighted-mean-of-ordinals rollup, the ordinal clamp, and the
D1xD2 typology re-derivation were already reviewed and approved under B10/#120; I re-read that
model's SQL header to confirm no formula changed and none did (`mart_mss_area_aggregate.sql` is a
byte-for-byte column pass-through/rename of `int_mss_bzr_aggregate`, confirmed by diff).

## What I checked

1. **The new mart is a pure pass-through, not a re-derivation.** `mart_mss_area_aggregate.sql`
   selects `city_code, area_level, area_code, area_vintage, snapshot_year AS reference_year,
   status_index, dynamik_index, typology_stage, n_plr` directly from `int_mss_bzr_aggregate` with
   only a `city_code = 'BER'` filter and a column rename (`snapshot_year` → `reference_year`, to
   match `mart_area_demographics`'s naming convention). No new `sum`/`avg`/weighting logic is
   introduced. Confirmed via `git diff` against the intermediate model and a row-count spot check
   (984 BZR + 84 Bezirk rows in the mart vs. the same counts filtered to `city_code = 'BER'` in the
   upstream intermediate model — exact match).
2. **Confidence-framing caveat survives into the web copy, not just the SQL comment.** Both new
   sections ("Approximate status & change") open with an `<Alert status="info">` that states, in
   plain language: this is an *approximation*, not the Senate's own classification; it's a
   population-weighted average of neighbourhood ordinals, rounded; the Senate's own method
   re-combines and re-classifies raw indicators at district/BZR grain, which "can shift borderline
   districts/BZRs into a different class than this estimate shows." This is the exact caveat
   `I18-web-domain-signoff.md`'s recommendation asked for ("that caveat needs to survive into any
   public-facing copy, not just the model comment") — confirmed present on both the Bezirk and BZR
   page templates, not just one.
3. **Boundary-mismatch risk correctly framed as grain-dependent, not uniformly hedged.** The BZR
   page's alert adds a BZR-specific sentence ("boundary effects are more likely to bite at this
   finer grain than at the district level") rather than reusing identical copy verbatim across both
   grains — correct, since BZR boundaries (143 units) are far more numerous and finer-grained than
   Bezirk boundaries (12 units), so a population-weighted-mean-of-ordinals approximation has more
   opportunities to mis-stage a borderline unit at BZR grain. No objection.
4. **Field labels avoid false precision.** The `BigValue` titles read "Estimated stage
   (BZR/district-level)", "Estimated status index," "Estimated Dynamik index" — the word
   "Estimated" is present on every rendered value, not just in the surrounding prose, so a reader
   scanning only the big numbers (not the alert text) still sees the hedge.
5. **Vintage handling matches the rest of the I18-web slice.** Both new sections filter
   `area_vintage = 'lor_2021'`, the same convention `I18-web-geo-signoff.md` (#247) established for
   these Berlin-current pages (PGR/BZR/Bezirk code *values* differ across LOR vintages; mixing them
   would silently misattribute rows). Verified `mart_mss_area_aggregate` carries both `lor_2021`
   (429 BZR / 36 Bezirk rows, most-recent `reference_year` up to 2025) and `lor_pre2021` rows
   (thesis-vintage codes, used elsewhere for MAUP research comparisons only) — the web query
   correctly picks the `lor_2021` slice only, consistent with every other route on these page
   templates.
6. **No new re-scored index is introduced alongside `gentrification_index`.** `status_score`,
   `dynamism_score`, and `ewr_composite` (the underlying z-scores) are deliberately NOT re-exposed
   in the new mart — only the already-classified ordinal outputs (`status_index`, `dynamik_index`,
   `typology_stage`) are surfaced. This avoids inviting a second, uncurated "index" reading
   alongside the PLR-only `gentrification_index` mart (`I18-web-geo-signoff.md` item 2's
   constraint) — correct scoping choice.
7. **Build verification.** `uv run poe build --select mart_mss_area_aggregate` passes all 8 new
   dbt schema tests (not-null, accepted_values, unique-combination-of-columns). `npm run sources`
   picks up the new parquet export (1,061 rows) via a new `web/sources/gentriduck_marts/
   mart_mss_area_aggregate.sql` source file (the missing piece — parquet export alone does not
   register with Evidence without this file, confirmed by first running `sources` without it and
   observing the model absent from the processed list, then present after adding it). `npm run
   build` (Evidence static build) completed with zero SQL/parser/binder errors across all Bezirk
   and BZR pages.

## Recommendation

Approve. The display-fitness caveat this slice was gated on is present, worded per the domain
recommendation's ask, and correctly differentiated by grain (BZR vs. Bezirk). No new spatial/
statistical method is introduced; the underlying formula's B10/#120 approval is unchanged and
untouched by this diff.

```json
{
  "verdict": "pass",
  "rationale": "mart_mss_area_aggregate is a byte-for-byte pass-through/rename of int_mss_bzr_aggregate (B10/#120, already approved) -- no new aggregation, weighting, or spatial method is introduced. The confidence-framing caveat I18-web-domain-signoff.md required to survive into public copy is present on both new page sections, worded per grain (BZR boundary risk called out more strongly than Bezirk), and reinforced in every rendered BigValue label via the word 'Estimated'. Vintage handling (lor_2021 only) matches the rest of the I18-web slice's established convention. The underlying z-scores (status_score/dynamism_score/ewr_composite) are deliberately not re-exposed, avoiding a second uncurated index reading alongside gentrification_index. Build and dbt tests verified green.",
  "risks": [
    "None new. The pre-existing B10/#120 MAUP caveat (population-weighted-mean-of-ordinals differs from the Senate's re-z-score-then-reclassify method) remains the residual risk this display carries; it is now surfaced to lay readers rather than only in the SQL comment, which is the mitigation this ticket exists to add."
  ],
  "recommendations": [
    "If a future ticket adds PGR-level MSS display, derive it explicitly (int_mss_bzr_aggregate does not currently produce a pgr grain) and give it its own geo-DS pass rather than assuming this sign-off covers a grain that doesn't exist yet in the mart.",
    "If a future methodology change ever touches int_mss_bzr_aggregate's formula (not just this display mart), that change needs its own R-C1 gate -- this sign-off does not extend to formula changes."
  ]
}
```

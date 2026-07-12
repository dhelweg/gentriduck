# I19 (#243) — area data inventory (slice 1 scope note)

**Ticket:** `docs/epic-i/tickets/I19-area-demographics-kurzprofil.md`
**Slice:** slice 1 (data: `int_ewr_demographics_wide` + `mart_area_demographics`) — the "People &
structure" web block and the wider other-data curation pass are follow-up slices, matching the I17/
I18 precedent of landing the data layer first (see `I18-geo-signoff.md`'s "slice 1/slice 2" framing).

## What this slice surfaces

All 13 `seed_ewr_indicator_meta` EWR descriptive indicators, at PLR grain and rolled up to
BZR/PGR/Bezirk (I18 levels), via `mart_area_demographics`:

| Indicator | Kind | Rollup |
|---|---|---|
| `residents_total` | extensive (count) | sum |
| `residents_male_share` / `residents_female_share` | intensive (share) | summed-numerator recompute |
| `age_under18_share` … `age_65plus_share` (5 bands) | intensive (share) | summed-numerator recompute |
| `mean_age_years` | intensive (continuous) | population-weighted mean |
| `foreigners_share` | intensive (share) — **domain-gated framing** | summed-numerator recompute |
| `migration_background_share` | intensive (share) — **domain-gated framing**, stable only 2017+ | summed-numerator recompute |
| `residence_duration_5y_share` / `residence_duration_10y_share` | intensive (share) | summed-numerator recompute |

Previously only `foreigners_share`, `age_under18_share`, `migration_background_share`,
`mean_age_years`, `residence_duration_5y_share` (+ 3 extras) fed `int_ewr_socioeco`'s index
composite and were never shown descriptively. This mart adds the remaining 5 (both sex shares, 3
more age bands, `residence_duration_10y_share`) and exposes all 13 for display, read-only,
completely separate from the index-gated pivot.

## Other held data — inventory + slice-1 disposition

Per the ticket's "detail where it matters, no stat spam" principle, decisions on *which* of these
earn a place on the rendered page are deferred to the web slice (data-analyst-led curation pass,
same as I20's curation-rules doc). Recorded here so the follow-up slice starts from a complete
inventory rather than re-discovering what exists:

| Data | Model | Status this slice |
|---|---|---|
| EWR demographics (above) | `mart_area_demographics` | **Built this slice** |
| MSS status/Dynamik at BZR/Bezirk | `int_mss_bzr_aggregate` | Exists (B10/#120); not re-touched — web slice reads it directly |
| Wohnlage | `int_berlin_wohnlage_plr` | Exists; PLR grain only today — rollup to I18 levels is a web-slice follow-up if wanted |
| BRW (land values) | (mart TBD — check `transform/models/marts/mart_price_rent_dimension*.sql`) | Not touched this slice |
| Mietspiegel | `seed_mietspiegel*` (check current seed name) | Not touched this slice |
| Milieuschutz/displacement flags | (check `int_*milieuschutz*` if present) | Not touched this slice |
| POI density | `mart_poi_offering_advantage*` | Exists; already area-keyed |

## Follow-up (web slice)

- Render the "People & structure" block on the I14 template at every I18 level, with district/
  citywide comparison and explicit vintage labels (`#197` EWR-refresh caveat surfaced, not
  blocking).
- data-analyst curation pass on the "other data" table above — which rows earn a page slot at
  which level.
- Re-consult domain-expert specifically on the rendered *wording* around `foreigners_share` /
  `migration_background_share` before that copy ships (this slice's sign-off covers the
  data-layer framing decision — *whether and how these indicators are computed/rolled up* — not
  final page copy, same split I18's domain sign-off drew for its own slice 2).

## References

`docs/epic-i/tickets/I19-area-demographics-kurzprofil.md` · `transform/seeds/seed_ewr_indicator_meta.csv`
· `transform/models/intermediate/int_ewr_demographics_wide.sql` ·
`transform/models/marts/mart_area_demographics.sql` · I18 slice-1/slice-2 precedent
(`docs/epic-i/I18-geo-signoff.md`).

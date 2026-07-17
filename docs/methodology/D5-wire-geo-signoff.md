---
task: D5-wire / #258 — displacement/affordability sub-index, build & wire
author: geo-data-scientist
date: 2026-07-16
branch: feature/258-d5-wire
---

# Geo-DS methodology sign-off — D5-wire (`int_berlin_displacement_subindex`)

- **Branch:** `feature/258-d5-wire`
- **Issue / task:** #258 [D5-wire] — build the ADR-0008 D5 displacement/affordability predictor
  from the three proxies staged under #70 [B1] (`int_berlin_turnover_proxy`,
  `int_berlin_rent_pressure_proxy`, `int_berlin_milieuschutz_plr_flag`) and wire it into
  `int_gentrification_ts` as a predictor/lead-side field.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_displacement_subindex.sql` (new)
  - `transform/models/intermediate/int_gentrification_ts.sql` (D5-wire additions, Branch A join +
    NULL casts in Branches B/C)
  - `transform/models/intermediate/schema.yml` (new model block + `int_gentrification_ts` column
    additions)
  - `docs/methodology/index-definition.md` (D5 dimension-table row, polarity-table rows, §1.8
    Milieuschutz-overlay update)
  - Cross-reference: `docs/methodology/B1-turnover-geo-signoff.md`,
    `docs/methodology/B1-rent-pressure-geo-signoff.md`, `docs/methodology/B1-milieuschutz-geo-signoff.md`,
    `docs/methodology/D3-brw-trend-geo-signoff.md` (recommendation R1/R2, the wiring pattern this
    ticket follows)
  - Independently queried the built tables (`data/gentriduck.duckdb`): full coverage cross-tab of
    `int_berlin_displacement_subindex` by `reference_year` (turnover_proxy vs rent_pressure_proxy
    non-null counts), and the resulting `int_gentrification_ts` Branch A (`city_code='BER'`,
    `area_vintage='lor_2021'`) `displacement_subindex` non-null counts per `snapshot_year`.

This model is methodology-bearing under R-C1 (a new normalized predictor-side composite, and a
change to `int_gentrification_ts`, a gated file). It is NOT wired into the contract-enforced
`gentrification_index` mart (a separate, larger contract-change decision, correctly left alone).

## a. Coverage finding — is the "strict both-required" composite actually viable, and is the fallback design sound?

**This is the central finding of this review, and I verified it independently rather than take the
PR's claim on faith.** I queried `int_berlin_turnover_proxy` and `int_berlin_rent_pressure_proxy`
(lor_2021 rows only) directly:

- `turnover_proxy` has non-null rows only for `reference_year` 2009–2020. There are **zero** rows
  for 2021 onward — confirmed against `int_ewr_socioeco`: reference years 2021–2023 are entirely
  absent from that table (not merely null), and 2024/2025 have `residence_duration_5y_share`
  entirely NULL. This is the known EWR ingestion gap (#197), not a defect introduced here.
- `rent_pressure_proxy`'s lor_2021 rows exist only for Wohnlage `snapshot_year` 2023 and 2026 (2017
  is tagged `lor_pre2021` — a different, geometrically incompatible PLR system; correctly excluded
  by the model's `where area_vintage = 'lor_2021'` filter).

These two ranges (2009–2020 vs 2023/2026) **do not overlap at all**. I confirmed a first draft of
this model (turnover-proxy-as-mandatory-spine, strict all-or-nothing composite, matching the
`int_ewr_socioeco` fixed-tier discipline) built successfully but produced **zero** non-null
`displacement_subindex` rows anywhere, and consequently zero non-null rows in
`int_gentrification_ts` for any MSS edition (2021, 2023, 2025) — i.e. the wiring would have been a
silent no-op that only *looked* complete because `uv run poe build` stayed green. The current design
correctly catches and fixes this: the model was revised to (1) build the row spine as a **union** of
every year either proxy covers, not just `turnover_proxy`'s, and (2) use a
**partial-availability mean** (average of whichever component is non-null; NULL only when both are
null), exposing `n_components_available`/`is_partial_availability` so a consumer can filter to
full-coverage rows if they want the stricter cut. I re-queried the corrected build: Branch A now has
536/542 non-null `displacement_subindex` rows for `snapshot_year=2023` and 536/542 for
`snapshot_year=2025` (both entirely from `rent_pressure_proxy`, since `turnover_proxy` still has no
2021+ rows); `snapshot_year=2021` remains 0/542 (no rent_pressure snapshot ≤2021 exists in the
lor_2021 space, and no turnover rows exist there either) — an honest, correctly-propagated gap, not
a defect.

**Verdict on this point: the partial-availability design is the right call, and I add one binding
condition (C1 below) about the distinction from `int_ewr_socioeco`'s composite pattern, because a
future reader could otherwise assume this is "the same pattern" when it is not.** `int_ewr_socioeco`'s
full/partial composites are each a **fixed, mutually-exclusive indicator set for a given era**
(pre-2014 gets exactly 3 indicators, 2014+ gets exactly 5 — never a subset chosen per-row).
`displacement_subindex` is different: it is a **flexible per-row average of 0, 1, or 2** structurally
independent single proxies with disjoint native year-grains. Averaging "whichever is present" is
defensible here specifically because it never invents a missing value — it only ever reports the
signal(s) that genuinely exist for that row — but this is a materially different averaging
discipline from the fixed-tier pattern and must not be silently generalised elsewhere without its
own review.

## b. Is the rent_pressure_proxy nearest-<=-vintage match correctly implemented and grounded?

**Yes.** The correlated subquery (`max(snapshot_year) where snapshot_year <= spine year`, partitioned
by `city_code`/`area_vintage`) is the identical pattern already approved inside
`int_berlin_rent_pressure_proxy` itself (matching MSS editions to Wohnlage years) — reused, not
reinvented. I verified `matched_rent_pressure_snapshot_year` in the built table: for spine years
2009–2020 it is NULL (no Wohnlage snapshot ≤ those years exists in the lor_2021 space — 2017's
lor_2021 counterpart doesn't exist, only 2023/2026 do), and for 2023 it resolves to 2023, for 2025 it
resolves to 2023 (2025 < 2026, so 2023 is the nearest ≤ match — correct), and for 2026 (a
rent-pressure-only spine year with no turnover counterpart) it resolves to 2026 itself. All as
expected from the nearest-<= rule.

## c. Is turnover_proxy's exact-year match (vs. rent_pressure's fuzzy match) the right asymmetry?

**Yes.** `turnover_proxy` is already an annual EWR-derived series (one row per real calendar
reference_year), so an exact join is correct and requires no fuzzy-matching logic — fuzzy-matching an
already-annual series would risk silently pulling in a stale prior-year value. Only
`rent_pressure_proxy` (an irregular, multi-year-gap Wohnlage WFS edition series) needs the nearest-<=
treatment. This asymmetry is correctly reflected in the SQL (exact equality join for turnover vs. the
correlated-subquery match for rent_pressure).

## d. Is the Milieuschutz disclosure-only (never-blended) decision correctly justified and implemented?

**Yes, and this is the correct call, not merely the cautious one.** `int_berlin_milieuschutz_plr_flag`
itself already documents that the WFS exposes only the CURRENT designation set (ADR-0019 Open
Question #2) — there is no per-year edition endpoint, so there is no genuine time-variation to feed
into an annual composite. I confirm the model does NOT z-score or average
`under_milieuschutz`/`milieuschutz_overlap_frac` into `displacement_subindex` anywhere, and instead
carries them through as separate, explicitly time-invariant columns (`coalesce(...under_milieuschutz,
false)` on a plain, year-less join key). This matches — and correctly executes — the design
Milieuschutz's own model header already called for ("intended to be read directly by a future
G2/web disclosure layer"). I independently verified: `under_milieuschutz` is TRUE for 233/542 PLRs
(lor_2021) at every spine year (correctly identical count across years, confirming the
time-invariance is faithfully propagated, not silently varying).

## e. Is the `int_gentrification_ts` wiring correctly scoped (predictor side, Branch A only, graceful NULL degradation)?

**Yes.** `displacement_subindex`, `displacement_subindex_is_partial`, `under_milieuschutz`,
`milieuschutz_overlap_frac` are joined only into `joined_2021` (Branch A), on
`(area_code, area_vintage, edition=reference_year)` — the identical join-key shape already used for
`brw_2021` (#273). Branches B (`lor_pre2021`) and C (Hamburg) correctly `cast(null as ...)` every one
of the four new columns, with header comments explaining why (no lor_pre2021 turnover/rent-pressure
computation exists; Milieuschutz/EWR/Mietspiegel sourcing is Berlin-only). I confirm none of the four
columns are placed on the D1/D2 outcome side or blended with `ewr_composite` — they sit alongside
`brw_trend`/`brw_yoy_pct_change` as pure predictor/lead-side additions, matching ADR-0008's
predictor/outcome separation.

## f. Any spatial-method (CRS/MAUP) concern?

None new. `int_berlin_displacement_subindex` performs no new geometric operation — it is a purely
tabular composite over three already-audited intermediates (each with its own prior geo-signoff for
any spatial join it performs). The `where area_vintage = 'lor_2021'` filter on the rent_pressure CTE
correctly prevents a cross-vintage PLR mismatch (lor_pre2021's ~447-PLR system uses different
`area_code` values than lor_2021's 542-PLR system; joining across them without the ADR-0003 crosswalk
would silently produce wrong matches).

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The ticket's three source proxies now have a genuine, verified consumer:
`displacement_subindex` populates non-trivially (536/542 PLRs) for the 2023 and 2025 MSS editions
that matter most to the live panel, via a partial-availability composite whose necessity was
independently confirmed (a strict all-or-nothing rule would have been permanently empty given
today's real data — I verified this by re-running the first-draft design and observing 0 non-null
rows end-to-end). The rent_pressure nearest-<= match reuses an already-approved pattern rather than
inventing a new alignment rule. Milieuschutz is correctly kept disclosure-only and time-invariant,
never blended into the numeric composite, matching its own model's stated design intent. The
`int_gentrification_ts` wiring is correctly scoped to the predictor/lead side, Branch A only, with
graceful NULL degradation in Branches B/C. No defect found; one binding condition below to keep the
partial-availability pattern from being over-generalised, and one on public framing.

### Conditions (must be satisfied before this signal is promoted further, e.g. into a published mart)

- **C1 — The partial-availability averaging pattern used here is NOT the same discipline as
  `int_ewr_socioeco`'s fixed-tier composites** (see finding a. above) and must not be cited as
  precedent for a future composite without its own review — any future ticket wanting to average
  "whichever inputs are present" out of a variable-membership set needs its own sign-off, not a
  citation of this one.
- **C2 — Any public/G2 framing of `displacement_subindex` must state plainly that most currently
  populated rows (2023/2025 editions) are a single-component signal (`rent_pressure_proxy` alone,
  via `displacement_subindex_is_partial=true`), not the full two-component blend** — the model
  correctly exposes this via `n_components_available`/`is_partial_availability`, but a G2 page that
  quietly drops that column would overstate the signal's richness.
- **C3 — `under_milieuschutz`/`milieuschutz_overlap_frac` must never be treated as a fourth annual
  input** to any future extension of `displacement_subindex` — their time-invariance is a structural
  property of the WFS source (ADR-0019 Open Question #2), not a modelling simplification that could
  later be "upgraded" to vary by year without new source data.
- **C4 — This finding should update #197's own tracking**: once the EWR ingestion gap (#197) is
  fixed and `turnover_proxy` gains 2021+ rows, re-verify whether `n_components_available=2` rows
  start appearing (today there are zero, since the two proxies' year ranges are disjoint) — that
  will be the first real test of the two-component blend this design anticipates but cannot yet
  exercise.

### Recommendations (non-blocking)

- **R1 — `brw_trend` (#273) was explicitly flagged by its own geo-signoff (recommendation R1) as a
  possible fourth D5 input.** This ticket did not add it (scope discipline — the ticket's three named
  proxies were Milieuschutz/rent-pressure/turnover only); a future ticket could reconsider, but note
  `brw_trend` sits conceptually closer to the D3-price predictor family (land-value realisation) than
  to B1's outcome-adjacent displacement proxies, so this remains a placement question for that future
  ticket's own gate.
- **R2 — Once #197 is fixed**, re-run the coverage cross-tab this review performed and consider
  whether `matched_rent_pressure_snapshot_year`'s nearest-<= window (currently spanning up to 6+
  years, e.g. 2020→2017 vs 2025→2023) should be bounded by a maximum gap — not decided here, since
  today's actual matches are all reasonably close (≤3 years), but a future, sparser edition schedule
  could widen that gap unnoticed.

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A `gentrification-domain-expert`
domain sign-off is also required before the PM may integrate into `develop`.*

## Sources

- `transform/models/intermediate/int_berlin_displacement_subindex.sql` (this ticket's new model)
- `transform/models/intermediate/int_berlin_turnover_proxy.sql` +
  `docs/methodology/B1-turnover-geo-signoff.md`
- `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql` +
  `docs/methodology/B1-rent-pressure-geo-signoff.md`
- `transform/models/intermediate/int_berlin_milieuschutz_plr_flag.sql` +
  `docs/methodology/B1-milieuschutz-geo-signoff.md`
- `docs/methodology/D3-brw-trend-geo-signoff.md` (recommendation R1/R2, the wiring pattern this
  ticket follows)
- `docs/adr/0019-berlin-milieuschutz-displacement-source.md` (Open Question #2, current-state-only
  WFS)
- `docs/adr/0008-multi-dimensional-gentrification-model.md` (D5 reserved slot, predictor/outcome
  separation)
- Independent query of `data/gentriduck.duckdb` (`main.int_berlin_displacement_subindex`,
  `main.int_gentrification_ts`) performed during this review, 2026-07-16.

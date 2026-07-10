# [H-C2] #159 — Geo-DS scoping spike: re-derive trajectory thresholds for Hamburg's annual cadence

- **Type:** Investigation spike (NOT a sign-off). Final dual sign-off happens after implementation.
- **Author:** geo-data-scientist
- **Date:** 2026-07-10
- **Issue:** #159 (blocks any "publish Hamburg trajectory" work; sibling of #158)
- **Warehouse queried:** `data/gentriduck.duckdb` (built 2026-07-10), model `int_gentrification_ts`;
  classification logic transcribed from `transform/models/marts/fct_gentrification_trajectory.sql`.

---

## TL;DR / verdict for the follow-up

The Berlin-calibrated **thresholds themselves transfer fine** (`status_delta`, `status_range`,
`status_index_mean` cutoffs), but the **classification *input window* does not**: applied to
Hamburg's full 13-edition annual panel (2013–2025, 12-year span) the rules compare a **12-year**
first-to-last change against a threshold that on Berlin means a **4–6-year** change. That conflates
*panel length* with *rate of change* and inflates Hamburg's trend classifications
(`improving`+`declining`: **21.5%** on the full panel vs **~14–16%** on a Berlin-length window).

**Recommended fix = option (a), refined: restrict the classification input to a matched year-span
window** — `snapshot_year >= (max snapshot_year for that city+vintage) − 6`. This is **provably a
no-op for Berlin** (both Berlin vintages already span ≤6 years, so every edition is retained and the
published Berlin output is byte-identical), so it needs **no** R-B2 re-calibration and does **not**
disturb the governed Berlin mart. For Hamburg it trims the input to 2019–2025 (a ≤6-year span,
Berlin-comparable) and removes the panel-length inflation. Thresholds stay unchanged.

Two of the issue's a-priori worries are **not empirically borne out** and do not need fixing:

- The `range <= 1` "stability" check does **not** become mechanically harder over 13 annual
  observations — Hamburg's `status_index` is extremely **sticky** (64% of areas never move across
  13 years; only 4% ever exceed a range of 1). The "more editions → more noise wobble" mechanism
  does not fire (evidence §2).
- Editions *count* (annual vs biennial) is therefore not the problem; the *span* (elapsed years the
  endpoint-delta integrates over) is. That is what the window fix targets.

This fix can and should land **without** widening the mart's `["BER"]` `accepted_values` (§5).

---

## Evidence

### 1. The panel shapes (confirmed)

| city / vintage | span | editions | cadence | areas |
|---|---|---|---|---|
| BER `lor_pre2021` | 2013–2019 (6 yr) | 4 | biennial | 436 |
| BER `lor_2021` | 2021–2025 (4 yr) | 3 | biennial | 536 |
| **HH `current`** | **2013–2025 (12 yr)** | **13** | **annual** | **862** |

Hamburg is a single `current` vintage (ADR-0014), one row per area per year, 2013–2025 inclusive.
Note Berlin is **already not internally span-consistent** (6-yr vs 4-yr vintages sharing one
threshold), so a ≤6-year window is squarely within the method's existing tolerance.

### 2. `status_index` is sticky — the `range <= 1` worry does not materialize (issue Q2)

`status_range` (max − min within panel) distribution, Hamburg full 13-year panel:

| status_range | # areas | share |
|---|---|---|
| 0 (never moves) | 555 | 64.4% |
| 1 | 270 | 31.3% |
| 2 | 36 | 4.2% |
| 3 | 1 | 0.1% |

Even with **13 chances to wobble**, only **4.3%** of Hamburg areas exceed `range <= 1`. The D1
`status_index` is an ordinal (1–4) derived from a smoothed Sozialmonitoring classification, not a
noisy continuous measure, so it does not accumulate ±1 ordinal jitter across editions. Consequently
`stable-established` share is comparable across window lengths (68.7% full → 72–76% on short
windows). The delta between them is driven by **trend reclassification (§3), not by the range test
failing**. Conclusion: **no cadence adjustment to the `range <= 1` tolerance is warranted.** Scaling
the range tolerance by edition count (a candidate under issue option (b)) would be a solution to a
non-problem and is **not** recommended.

### 3. First-to-last `status_delta` conflates span with rate (issue Q3) — this IS the real issue

Trajectory mix under different input windows (same rules, Hamburg only):

| window (HH) | span | obs | stable-est | persist-deprived | improving | declining | trend total |
|---|---|---|---|---|---|---|---|
| **full 2013–2025** | 12 yr | 13 | 68.7% | 8.8% | **13.5%** | **8.0%** | **21.5%** |
| 6-yr window 2019–2025 | 6 yr | 7 | 73.0% | 10.8% | 9.8% | 5.7% | 15.5% |
| annual 2021–2025 | 4 yr | 5 | 74.4% | 12.4% | 8.7% | 4.1% | 12.8% |
| biennial 2013–2019 (Berlin-shaped) | 6 yr | 4 | 72.2% | 12.6% | 7.7% | 6.2% | 13.9% |

The full 12-year panel produces **~1.5× the trend classifications** of any Berlin-length window,
because `status_delta = last − first` integrates over 12 years and has more time to accumulate a
full ordinal step. The **same `delta >= 1` threshold encodes a different rate**: ≈0.083 ordinal/yr
for Hamburg's 12-yr span vs 0.25/yr for Berlin `lor_2021` (4-yr) and 0.167/yr for `lor_pre2021`
(6-yr). A matched ≤6-yr span brings Hamburg's rate meaning back in line with Berlin.

### 4. Endpoint-only delta is also fragile (secondary, cadence-independent)

`status_delta` reads only the first and last single editions and ignores the 11 interior years. On
the full HH panel, replacing the raw endpoints with **3-edition smoothed endpoints**:

- 17 of 69 `declining` (25%) and 22 of 116 `improving` (19%) — **~21% of all trend calls** — flip to
  flat, i.e. the classification hangs on a single endpoint edition that a proper trend would reject.
- A regression slope over the panel (`regr_slope(status_index, year)·12`) flags only 96 areas with
  |slope|·span ≥ 1 (45 declining, 51 improving) vs 185 by raw endpoint delta.

This is a real robustness weakness, but fixing it (smoothed endpoints or a slope) **would change
Berlin's output** and reopen the R-B2 back-test. It is therefore called out as a **caveat, not part
of the recommended fix** — see R2. The matched-window fix already halves the excess without touching
Berlin.

---

## Answering the task's questions

1. **Behavior over the annual panel:** `status_index` is sticky (64% never move; only 4.3% exceed
   range 1 over 13 years). Trend classifications (improving/declining) rise from ~14% on a
   Berlin-length window to 21.5% on the full 12-year panel.
2. **Does `range <= 1` get mechanically harder? — No.** The ordinal is smoothed/sticky, so more
   editions do not accumulate wobble. No fix needed for the stability checks.
3. **Does `status_delta >= 1` conflate panel length with rate? — Yes.** The full 12-year span
   inflates trend classifications ~1.5× and encodes a ~3× slower per-year rate than Berlin's window
   for the identical threshold. This is the core defect.
4. **Fix:** option (a), refined to a **year-span-matched window** (details below). Reject option (b)
   range-scaling (solves a non-problem) and treat delta-rate-normalization/slope as a separate,
   Berlin-affecting change out of scope here.
5. **Publication scope:** do **not** widen `["BER"]`; the fix is Berlin-preserving and lands
   independently (below).

---

## Concrete recommendation for the data-engineer

### R1 — Restrict trajectory input to a matched ≤6-year span window (the fix)

In `fct_gentrification_trajectory.sql`, filter the `ts` CTE input to the most recent 6 years
**within each `(city_code, area_vintage)`** before the `per_plr_agg` aggregation:

```sql
-- in the ts CTE, add (window bound computed per city_code+area_vintage):
where is_uninhabited = false
  and {{ published_cities_filter('city_code') }}
  and snapshot_year >= (
        max(snapshot_year) over (partition by city_code, area_vintage)
      ) - {{ var('trajectory_window_years', 6) }}
```

- **Provable Berlin no-op (verified in-warehouse):** `lor_pre2021` max=2019 → keeps ≥2013 = all 4
  editions; `lor_2021` max=2025 → keeps ≥2019 = all 3 editions. Berlin output is unchanged, so
  **R-B2 stays valid and the published Berlin mart is untouched.**
- **Hamburg effect:** `current` max=2025 → keeps 2019–2025 (7 annual obs, 6-yr span), Berlin-
  comparable. Trend share drops 21.5% → 15.5%; `stable-established` 68.7% → 73.0%.
- Choose a **year-span** window (`- 6`), **not** an edition-count (`last N editions`) window: the
  stickiness evidence (§2) shows edition count is not the driver, and a span window is cadence-
  agnostic and correct for any future city regardless of annual/biennial cadence.
- **6** is recommended because it equals Berlin's longest single-vintage span (`lor_pre2021`, 6 yr),
  making the no-op property exact. Expose it as a named var `trajectory_window_years` (default 6)
  and cite this spike (`-- see docs/epic-h/159-hc2-geo-spike.md`) per the R-C2 grounding rule.
- Keep all rule thresholds (`status_delta >= 1`, `status_range <= 1`, `status_index_mean` cutoffs)
  **unchanged** — within a matched span they mean the same thing across cities.
- `first_edition` / `last_edition` in the output should reflect the *windowed* endpoints; add/keep a
  note (or a `panel_span_years` column) so consumers see the trajectory covers a bounded recent span,
  not the full ingested history.

### R2 — Do NOT bundle endpoint-smoothing / slope changes

The endpoint fragility (§4) and any move to a slope- or rate-normalized trend are **Berlin-affecting**
methodology changes that would reopen the R-B2 calibration and back-test. Keep them out of this fix to
preserve the Berlin no-op. Record §4 as a known limitation in the model header and defer to a future
issue if a robustness upgrade is desired (it would then need its own fresh dual sign-off for *both*
cities).

### R3 — Documentation deliverable

Update the `fct_gentrification_trajectory.sql` header to: (i) state that the trajectory is classified
over a **bounded, city-matched ≤6-year recent window** (cite this spike) rather than the full ingested
panel, explaining that this holds panel *span* — and hence the meaning of the `status_delta`/`range`
thresholds — constant across cities of differing cadence; (ii) record that Hamburg's `status_index`
was found sticky (range ≤1 for 96% of areas over 13 years) so the range tolerance needs no cadence
scaling; (iii) note the endpoint-fragility caveat (§4) as out-of-scope. Feed a short version into the
Epic G2 public methodology page.

### R4 — Publication gate (governance, unchanged from #158 precedent)

Do **not** widen the mart's `accepted_values` from `["BER"]` or change `published_cities_filter` in
this work. The window fix is Berlin-output-preserving and is groundwork that **pre-clears** the H-C2
methodological blocker; it does not itself publish Hamburg. Sequence: land R1–R3 (Berlin no-op) →
fresh geo-DS + domain dual sign-off referencing this spike → separate publication-gate PR that widens
`accepted_values` to `["BER","HH"]`. This mirrors #158/#125.

---

## Risks / caveats for reviewers

- The window fix reduces but does not eliminate Hamburg's extra editions (7 vs Berlin's 3–4 in the
  window). The stickiness evidence (§2) says the extra editions are benign for the range/stability
  rules, but the domain expert should confirm a 6-year recent window is the right analytical horizon
  for the Hamburg gentrification *narrative* (a 12-year view may be desirable as a separate,
  clearly-labelled long-run product — not through these span-calibrated thresholds).
- `trajectory_window_years = 6` is an empirical, Berlin-anchored constant; document it and revisit if
  a future city's longest vintage span differs.
- Endpoint fragility (§4) remains in the shipped method for both cities; it is pre-existing Berlin
  behavior, not introduced here.
- Untrusted-input note (SEC-3): all findings derive from the local warehouse and repo files; no
  external/web content informed this methodology.

---

## Suggested sign-off JSON (for the eventual post-implementation dual sign-off, not yet in force)

```json
{
  "verdict": "concerns",
  "rationale": "The Berlin trajectory thresholds transfer, but applying them to Hamburg's full 13-edition/12-year annual panel conflates panel length with rate of change: first-to-last status_delta integrates over 12 years vs Berlin's 4-6, inflating improving+declining from ~14% to 21.5%. status_index is sticky (only 4.3% of HH areas exceed range 1 over 13 years), so the range<=1 stability worry does not materialize and needs no cadence scaling. Fix by restricting classification input to a matched <=6-year span window, which is a provable no-op for both Berlin vintages and thus needs no R-B2 recalibration.",
  "risks": [
    "Full-panel first-to-last delta conflates span with rate; inflates HH trend classifications ~1.5x",
    "Endpoint-only delta is fragile (~21% of HH trend calls flip under 3-edition smoothing) - pre-existing, left in scope-preserving",
    "6-year window constant is Berlin-anchored; revisit for future cities with longer vintage spans",
    "Whether a 6-year recent horizon fits the HH gentrification narrative is a domain-expert call"
  ],
  "recommendations": [
    "R1: restrict ts input to snapshot_year >= max(snapshot_year) over (city_code, area_vintage) - var('trajectory_window_years', 6); no-op for BER, trims HH to 2019-2025; keep all thresholds unchanged",
    "R2: do NOT bundle endpoint-smoothing/slope changes (Berlin-affecting, reopens R-B2)",
    "R3: document the bounded matched-span window + HH stickiness finding in the model header and G2 page",
    "R4: keep accepted_values=['BER']; widening to include HH needs a separate fresh dual sign-off (per #125/#158)"
  ]
}
```

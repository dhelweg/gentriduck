---
task: A10-P2 / #259 — Milieuschutz DiD/event-study panel construction (Part 2 of #80/#70)
author: geo-data-scientist
date: 2026-07-16
branch: feature/259-a10-p2-milieuschutz-did
---

# Geo-DS methodology sign-off — Milieuschutz event-study panel (`int_berlin_milieuschutz_event_panel`)

- **Branch:** `feature/259-a10-p2-milieuschutz-did`
- **Issue / task:** #259 [A10-P2] — mechanical treatment/control panel assembly for a future
  DiD/event-study on Milieuschutz (§172 BauGB soziale Erhaltungsverordnung) designation. Part 2 of
  #80, which explicitly parked DiD as out of scope.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1). Pairs with the
  `gentrification-domain-expert` sign-off; both must PASS before PM integrates into `develop`.
- **Scope of THIS gate:** panel-construction mechanics only. No estimator, control-matching, or
  outcome-variable decision is made in this model; those are explicitly deferred to a future
  estimation-script ticket and are answered below **for the record only**, not as approvals.
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_milieuschutz_event_panel.sql` (read in full)
  - `transform/models/intermediate/int_berlin_milieuschutz_plr_flag.sql` (reused upstream, unmodified)
  - `docs/methodology/B1-milieuschutz-geo-signoff.md` (the prior spatial-join sign-off being reused)
  - Direct DuckDB queries against the built `int_berlin_milieuschutz_event_panel` table.

---

## Mechanical verification (what this ticket actually gates)

1. **Date parsing — CORRECT.** `strptime(earliest_in_force_date, '%d.%m.%Y')` matches Berlin GDI
   WFS's DD.MM.YYYY convention. Verified directly: `'30.10.2021' → 2021`, `'22.07.2017' → 2017`,
   `'26.02.2023' → 2023`, etc. No misparsed rows.
2. **Reused spatial join — UNMODIFIED and correctly consumed.** `int_berlin_milieuschutz_plr_flag`'s
   `ST_Intersects` join, `earliest_in_force_date` (MIN across overlapping designations), and overlap
   fields are read verbatim via `ref()`. The file is not touched on this branch, so the B1
   geo-signoff (ST_Intersects predicate, EPSG:25833 CRS, any-overlap flag) still binds. Using the
   MIN in-force date as the treatment onset is the correct "first exposure" definition for a
   staggered design. Good.
3. **Outcome source — CORRECT and defect-avoiding.** `status_index`/`dynamik_index`/`typology_stage`
   are sourced directly from `stg_berlin_mss`, NOT from the POI-inner-joined `int_gentrification_ts`.
   This proactively avoids the #260 C2 contamination defect (filtering an outcome panel by predictor
   availability biases which PLR-years get an observation). `typology_stage` via the shared
   `typology_stage.sql` macro, `is_uninhabited` via `gesamtindex is null`. Confirmed the mss columns
   used all exist. This is the right call and I want it on record as good practice.
4. **Panel grain & control/treated coding — CORRECT.** Grain
   `(city_code, area_code, area_vintage, snapshot_year)`; 3,414 PLR-years (1,415 treated / 1,999
   control), 989 distinct PLRs. `event_time_years` and `is_post_designation` are NULL for
   never-treated controls (not a spurious 0), which is the correct event-study encoding — controls
   are never "post". Left join preserves all outcome rows.

The panel-construction mechanics are sound. The concerns below are (a) documentation accuracy and
(b) methodological guidance for the deferred estimator.

---

## Answers to the five open questions (on record; estimator decisions deferred)

**Q1 — Staggered-adoption estimator. Citation ACCURATE; recommendation recorded.**
Goodman-Bacon (2021) and Callaway & Sant'Anna (2021) are cited correctly: canonical TWFE DiD is
biased under staggered timing with heterogeneous/dynamic effects, because already-treated units act
as "forbidden controls." When estimation code is written I recommend a **Callaway & Sant'Anna (2021)
doubly-robust group-time ATT** (`did` R pkg / `differences`/`pydid` in Python), aggregated to an
event-study, using the **never-treated pool as the clean comparison group** (not-yet-treated is thin
here). Equivalent acceptable alternatives: Sun & Abraham (2021) interaction-weighted event study, or
de Chaisemartin & D'Haultfœuille (2020). **Critical caveat this panel surfaces (see Q-concern
below): `designation_year` spans 1999–2026, so many treated PLRs were designated *before* the
2013–2025 outcome window (event_time up to +26).** These are **"always-treated"** units with no
in-panel pre-period — CS cannot estimate an ATT(g,t) for cohorts whose g precedes the first observed
period, and they must NOT be recycled as controls. The estimation script will need to explicitly
partition: (i) never-treated → controls, (ii) in-window-treated (g ∈ observed years) → estimable
cohorts, (iii) pre-window/always-treated → dropped from both roles (or used only as a robustness
sensitivity). The panel correctly keeps (iii) out of the control pool already (they carry
`under_milieuschutz = true`), which is the right default.

**Q2 — Control group. Unmatched is ACCEPTABLE for this draft as a documented limitation, but flag
for estimation.** Milieuschutz is deliberately targeted at high-pressure inner-city Kieze, so the raw
never-treated pool includes structurally dissimilar peripheral PLRs; unconditional parallel trends is
implausible. For a credible design I recommend either CS **with covariates (doubly-robust on baseline
status_index / D4)** or restricting/weighting controls to comparable inner-city PLRs (e.g. baseline
status matching, or R-A9 spatial-proximity weights from `analysis/a9_spatial_dynamic.py`). Deferring
this to the estimation ticket is fine; the panel does not need to bake a matching rule in.

**Q3 — Event-time resolution. Adequate for a DIRECTIONAL event study; document the boundary risk.**
The biennial MSS cadence (lor_pre2021: 2013–2019; lor_2021: 2021–2025 — verified) yields event_time
in ~2-year steps, which is coarse but standard for administrative outcome panels and sufficient for a
directional revival claim (Epic B framing). The real risk is `event_time = 0` / boundary
misclassification: `is_post_designation := snapshot_year >= designation_year` codes a designation
that came into force late in its calendar year (e.g. 30.10.2021) as "post" for that same-year
snapshot even if the MSS reference date precedes the in-force date. Recommendation for estimation:
treat **event_time = 0 as an ambiguous/transition bin** (or drop it) rather than as a clean post
period, and normalize on event_time = -1 as the reference. Not a panel defect — a documented
estimation caveat.

**Q4 — Cross-vintage handling. CORRECT call.** Keeping `area_vintage` separated (matching
`int_gentrification_ts`'s grain) rather than depending on the still-gated #260 unified crosswalk is
the right decision: it keeps this review scope independent and avoids importing an ungated
dependency. Note for the estimation ticket: the 2019→2021 vintage break coincides with the LOR
boundary redefinition, so a PLR's identity is not continuous across it — estimation should run
within-vintage, or adopt the #260 crosswalk *once that model is itself signed off*. Flag, not a
blocker.

**Q5 — Outcome variable. Read on record; final choice deferred.** `status_index` (composite social
status level) is the most defensible primary DiD outcome for displacement/gentrification pressure —
it is a level, so a DiD is interpretable as a shift in status trajectory. `dynamik_index` is already
a change/dynamics construct, so a DiD on it is a difference-of-a-difference and harder to interpret
(secondary/robustness at most). `typology_stage` is ordinal/categorical and would require an ordered
model, not linear DiD, so it is unsuitable as the primary continuous outcome. Recommendation:
**primary = `status_index`**, secondary = `dynamik_index`; decide finally at the estimation
sign-off. Passing all three through unfiltered here is correct.

---

## Concerns (must be addressed before integration into `develop`)

- **C1 (doc accuracy, material).** The SQL header (line ~57) states designations "span 2016–2023 per
  a live query." The built panel actually spans **1999–2026**. This is not cosmetic: it understates
  the always-treated / pre-window problem that drives the Q1 estimator choice. Correct the header to
  the true span and add a one-line note that pre-window (pre-2013) designations exist and must be
  handled as always-treated (dropped from both cohorts and controls) at estimation time.
- **C2 (doc/code drift, minor but R-C2-relevant).** The header still describes the outcome as coming
  from `int_gentrification_ts` in several places (lines ~12, ~76, ~82) while the model correctly
  sources from `stg_berlin_mss`. Since the whole point of this model is to *avoid* the
  gentrification_ts POI contamination, leaving those stale references is confusing and weakens the
  R-C2 grounding trail. Align the header comments with the actual `from stg_berlin_mss`.

Both are documentation-only fixes (no logic change, no rebuild-behavior change). They are cheap and
should land before the PM integrates. No re-review of mechanics is required after the fix — a
maintainer/PM eyeball of the corrected header suffices.

## Risks (informational, for the future estimation ticket — not blockers now)

- Current-state-only designation set (upstream B1 limitation): the panel cannot see designations that
  were lifted, and codes current status onto historical years. Milieuschutz is rarely rescinded, so
  low impact, but it should be disclosed in the eventual findings.
- Never-treated control pool is compositionally unlike treated inner-city PLRs (Q2).
- Small number of time periods per vintage (3–4) limits power for long-horizon dynamic effects.

---

**Verdict: PASS WITH CONCERNS** — the panel-construction mechanics (date parse, reused spatial join,
POI-contamination-avoiding outcome source, control/treated encoding, vintage-separated grain) are
correct and correctly scoped. Two documentation-only concerns (C1 designation-span inaccuracy that
understates the always-treated problem; C2 stale `int_gentrification_ts` references) must be
corrected in the header before integration into `develop`. All estimator/control/outcome design
decisions remain correctly deferred to a future estimation-script ticket, with guidance recorded
above.

---

## Iteration 2 — re-confirmation (2026-07-16)

Re-read the current model header after the requested documentation-only fixes. No logic changes were
requested or made; the SQL body (`from stg_berlin_mss`, `ref(int_berlin_milieuschutz_plr_flag)`,
left join, event-time/is_post encoding) is byte-for-byte the same mechanics already gated in
iteration 1.

- **C1 — RESOLVED.** The header no longer claims a "2016–2023" designation span. It now states the
  true `earliest_in_force_date` range **1999–2026** (verified against the built table, explicitly
  contrasted with the incorrect narrow window), and the always-treated problem is spelled out: PLRs
  designated before the 2013–2025 outcome window are "always-treated" units with no in-panel
  pre-period and must be excluded from both the treated-cohort and control roles at estimation time
  (open-question 1, lines ~84–102). This correctly surfaces, rather than hides, the driver of the
  Q1 staggered-adoption estimator choice.
- **C2 — RESOLVED.** The outcome is now consistently described as sourced from `stg_berlin_mss`
  (header lines ~13–14 and the OUTCOME SOURCE block ~63–76). The remaining `int_gentrification_ts`
  mentions are the deliberate explanation of the POI-inner-join contamination this model *avoids*
  ("this model never joins to int_gentrification_ts or any POI-derived table at all") — not stale
  source claims. The R-C2 grounding trail is now internally consistent with the SQL.

`uv run poe build` green status (835 PASS / 4 WARN / 0 ERROR at commit) trusted — this revision is
documentation-only and cannot change build behaviour.

**Verdict: PASS** — both prior concerns corrected, mechanics unchanged and already verified. Clear
for PM integration into `develop` (pending the paired `gentrification-domain-expert` PASS per R-C1).

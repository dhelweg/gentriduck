# OA-D5b — Extend the OA mode-comparison analysis + page to the full method family

**Issue:** #285 · **Epic:** C (Offering Advantage) · **Gate:** methodology-bearing → R-C1 dual
(geo-data-scientist + gentrification-domain-expert) · **Status:** backlog (devmode to pick up)

> In-repo SPEC for #285 so devmode agents that cannot read the GitHub issue body (confirmed this
> session: the data-analyst and web-engineer both had no GitHub API access) have the full context.
> If this file and the #285 issue body ever diverge, this file is the working reference; reconcile
> against the issue when GitHub access is available.

**Maintainer request (2026-07-18):** "I want an analysis and page that compares the different OAs."

## What already exists (this ticket extends, does not duplicate)

A comparison analysis **and** a comparison page already exist — they just predate the two newest OA
methods:

- **Analysis — OA-D5** (`analysis/d_oa_mode_comparison.py` →
  `docs/methodology/OA-D5-mode-comparison-findings.md`): cross-mode **Spearman rank correlation**,
  **PLR-vs-BZR MAUP rank-stability**, **bandwidth robustness**, and the **completeness-contamination
  gate**. Covers **7 methods** (`nested_lq`, `global_lq`, `log_lq`, `share_diff`, `shrunk_lq`,
  `raw_share`, `zscore_slq`) and **explicitly excludes** `density`/`percapita` ("added after the
  study ran").
- **Page — OA-D7** (`web/pages/methodology-oa-modes.md`, "Offering Advantage — modes, scales &
  dominance"): live Evidence.dev choropleths/decoder for the modes, area-level scales (OA-D6), and
  dominance (OA-D4), with the ecological-fallacy/MAUP caveats wired in. For `density`/`percapita` it
  currently shows **point-in-time stock only, never a year-over-year delta**, precisely because those
  two were outside the D5 completeness study.

## The gap

The OA method family grew in #280 (OA-D3b) and grows again once ADR-0025's Getis-Ord slice lands.
Neither the D5 study nor the D7 page has caught up:

1. **`density` + `percapita`** (both `reference_point='absolute'`, both `expected_temporal_safe=false`
   — see `transform/seeds/seed_oa_calculation_methods.csv`) are absent from the D5 cross-mode study
   and are stock-only on the D7 page.
2. **Getis-Ord Gi\*** (ADR-0025, accepted 2026-07-18) will be a hotspot/significance method on yet
   another footing — the comparison must carry a slot for it once it is built.

## Scope

### Analysis (`analysis/*.py`, extend D5)

Add `density`, `percapita` (and a Getis-Ord slot, gated on that slice existing) to the cross-mode
comparison. **Respect the binding never-blend conditions** — this is the crux, not an afterthought:

- `density`/`percapita` are **absolute** and **temporally-unsafe**, so they form a **separate class**
  from the parent-relative LQ family. Rank-correlate across classes for information, but **never
  present on a shared axis/legend/colour scale** with the LQ family, and **never year-over-year
  difference** density/per-capita without a D6 completeness-gate PASS (OA-D0 domain Condition C /
  #280 domain Condition DP).
- `zscore_slq` significance must **never** be presented as gentrification-*importance* (its own #280
  z-score domain condition).
- Surface `reference_point` + `expected_temporal_safe` in the analysis inputs so the classing is
  **query-driven, not hand-maintained** (the R1/F2 recommendation from #280).

### Page (refresh D7, or a dedicated comparison view)

Present *which method answers which question, how well, and where each diverges* — the "characterised
map of modes," **not "one best OA"** (ADR-0017 D3 / never-blend). Update the density/per-capita
treatment per whatever the extended D5 completeness result actually supports. **Coordinate with
#284** (the IA restructure): the `/methodology-oa-modes` widgets are reactive Evidence `Dropdown`/
`inputs`, and relocating them is real rework — don't build a page #284 then has to move; decide with
the `system-architect` whether this stays a methodology/reference page or moves under the new IA.

## Acceptance

- D5 comparison extended to `density`/`percapita` (+ Getis-Ord slot), with the absolute-vs-relative
  classing and never-blend/temporal-safety rules **enforced in the analysis, not just noted**.
- `docs/methodology/OA-D5-mode-comparison-findings.md` updated; the D7 page (or a comparison view)
  reflects the full family with the correct caveats; `uv run poe build` / the analysis run green.
- Fresh **R-C1 dual gate** (geo-DS + gentrification-domain-expert) — methodology-bearing
  (`analysis/*.py` + methodology-page interpretive framing).

## Deps / links

- #280 (OA-D3b density/per-capita — gate-remediated 2026-07-18) · ADR-0025 (Getis-Ord, accepted) ·
  ADR-0024 (OA method vocabulary) · ADR-0017 (never-blend) · OA-D5
  (`analysis/d_oa_mode_comparison.py`, `docs/methodology/OA-D5-mode-comparison-findings.md`) · OA-D7
  (`web/pages/methodology-oa-modes.md`) · #284 (IA restructure — page-placement coordination) ·
  `transform/seeds/seed_oa_calculation_methods.csv` (`reference_point` / `expected_temporal_safe`
  per method).

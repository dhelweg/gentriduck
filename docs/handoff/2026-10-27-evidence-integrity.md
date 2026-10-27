# Session handoff — 2026-10-25/27 — OSM refresh, Hamburg parity, evidence-integrity fixes

Maintainer-driven session (not the autonomous PM loop). Branches `infra/osm-cuisine-backfill` →
`fix/methodology-evidence-integrity` (stacked), integrated into `develop` 2026-10-27, then the
weekly `develop → main` PR opened (maintainer merges in the GitHub UI). Previous note:
`archive/2026-10-26.md`.

## What changed

**Data and ingestion**
- All 17 non-OSM raw sources re-ingested. Berlin and Hamburg OSM (2008–2026) re-extracted with
  `cuisine` from fresh full-history files. `verify-data` ok.
- **OSM extractor bugs fixed (`13fb28ef`)**: (a) deleted nodes were kept alive in every later
  snapshot (up to ~21% ghost POIs in Berlin, ~17% Hamburg); (b) #252 had silently switched
  multi-tag POIs to last-match classification — first-match restored (100% agreement with June).
  Single-pass multi-year extraction. Evidence: `docs/epic-c/OSM-extractor-fixes-2026-10-evidence.md`.
  A3 agreement with the thesis's OA values improved (domain ρ 0.76 → 0.84).
- Ingest driver decides source freshness once per source (MSS 2013 had been silently dropped).
  EWR soft-404 guard (portal URLs are dead — #346). `poe ingest` runs Berlin Milieuschutz.
- Hamburg POIs no longer leak into the Berlin PLR model; `mart_area_amenities` is city-agnostic and
  Hamburg area pages show amenities and the most common cuisine (I20 domain sign-off).

**Methodology (dual sign-off PASS, conditions closed —
`docs/methodology/2026-10-evidence-integrity-{geo,domain}-signoff.md`)**
- H3a/H3b now use a real cross-lagged design (`analysis/directional_inference.py`): ordered windows,
  own-lag + D4 control, Bezirksregion cluster-bootstrap CI. The old test computed the same
  correlation for both directions and counted sign-only "passes".
- Thesis verdicts corrected to Tabelle 6-16 (H3b only "eher bestätigt"; H2/H3c inconclusive; H3a
  rejected).
- Back-test reframed: Tests A–D are pipeline-integrity / label-consistency checks (ρ = 1 by
  construction); new Test F (Milieuschutz) is the one partially independent check — weak support
  (OR 1.84, CI [1.02, 3.41], Fisher p 0.0525), non-gating.
- BRW stacked/overlapping zones no longer double-counted; coverage from the union.
- EWR correctly described as the resident register (population composition), not a welfare register
  and not the thesis's outcome (MSS Status/Dynamik 2013–2017).

**Current findings (E1/E5)**: H1b robust; H1 not reproduced by single-number proxies; H3b supported
only on MSS 2021–2025 (single pivot, no D4, H3a borderline opposite); MSS 2013–2019 (the thesis's
editions; lower-powered) all n.s.; EWR both directions; Hamburg n.s. E4 early warning AUC 0.459.

## Build

`dbt build`: PASS=1068, WARN=3, ERROR=0 (warns include the by-design Ortsteil overlap and the C5
spike check at its documented baseline of 115 = BER 56 + HH 59). pytest 94 passed.

## Open

- **#337** node→way migration (OSM counts are node-only; a redrawn shop reads as a closure).
- **#338–#349** follow-ups from the sign-offs and reviews: H3b with MSS Dynamik (#338), fallback
  level control (#339), cross-lag constructs (#340), EWR cluster inference (#341), BZR loader MSS
  2013 (#342), Test F stage pattern (#343), BRW residuals (#344), manifest last-writer (#345), EWR
  URLs (#346), Hamburg Gebiet clip (#347), cuisine ties (#348), H1a/H1c (#349).
- Maintainer-blocked items unchanged (#230 launch/noindex, #229, #270, #283, #327, #328, #333).
- On hold: switch `community-triage` agent to a cheaper model (proposed, not applied).

## Next step

Merge the weekly `develop → main` PR in the GitHub UI. Then pick from #338 (most faithful H3b
re-test) or #337.

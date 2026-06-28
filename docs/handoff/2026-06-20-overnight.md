# Session handoff — 2026-06-20 overnight (R-A1 re-grounding)

## TL;DR

R-A1 (#64) is implemented, tested, and ready for PR merge. The keystone issue — the
gentrification index conflating POI predictors with social outcomes — is fixed. Three
secondary tasks (D2, D1b, R-A6) also complete. Branch `feat/64-ra1-index-reground`
needs push + PR open.

Build gate: **PASS=344 WARN=1 ERROR=0** (baseline was PASS=264).

---

## What completed this session

### R-A1 (#64) — Index re-grounding [IMPLEMENTATION COMPLETE, PR READY]

**STEP 1 — Governed index definition authored and signed off:**
- `docs/methodology/index-definition.md` — synthesized from two parallel expert drafts,
  addresses all 8 required items (typology, lead-lag, ordinal treatment, D4 discipline,
  polarity table, vintage-break, exclusion rules, sensitivity plan)
- `docs/methodology/R-A1-geo-signoff.md` — Verdict: **PASS WITH CONDITIONS** (5 DE-
  actionable conditions, none blocking)
- `docs/methodology/R-A1-domain-signoff.md` — Verdict: **PASS WITH CONDITIONS** (4 DE-
  actionable conditions, none blocking)

**STEP 2 — DE implementation:**
- `int_gentrification_ts.sql` refactored: MSS D1/D2 (social outcome) inner-joined onto
  POI D3 (predictor) + EWR D4 (baseline covariate); `gentrification_score` renamed to
  `legacy_gentrification_score`; new columns: `status_index`, `dynamik_index`,
  `typology_stage` (D1×D2 matrix per §1.5 of index-definition.md), `is_uninhabited`,
  `mss_edition`
- `int_mss_lead_lag.sql` NEW: change→change panel at k={1,2,3} MSS edition offsets
  within vintage; uninhabited PLRs excluded; C5-corrected D3; D4 as levels only
- `test_dynamik_ordering_guard.sql` NEW (severity:error): confirms WFS {1,3,5}→{1,2,3}
  Dynamik mapping direction — a permutation silently inverts all lead-lag signs
- `gentrification_index.sql` mart updated: live_data variant now carries MSS status
  (D1 ordinal), dynamik (D2 ordinal), typology stage; NOT POI z-scores
- `fct_gentrification_change.sql` updated: MSS outcome columns + status_transition
- All 6 stage names with G-1 displacement guardrail embedded in CASE WHEN (dynamik=3
  can never yield an upgrading stage)

**STEP 3 — Review + fixes:**
- DE-reviewer verdict: **APPROVE WITH FIXES** (0 high, 3 medium, 3 low)
- PM applied all 3 medium fixes: (M-1) geo-ds-sign-off metadata updated from PENDING,
  (M-2) Dynamik mapping-direction check added to test, (M-3) Dangschat/Döring-Ulbricht
  citations added to gentrification_index.sql header
- Final build: **PASS=344 WARN=1 ERROR=0**

### #53 D1b — Kauffälle WFS discovery [COMPLETE]
- `docs/data/kaufFaelle-discovery.md` written
- **FOUND**: `gdi.berlin.de/services/wfs/kauffaelle_<YEAR>` (2024+, dl-de-zero-2.0)
  Condominium (Wohnungs- und Teileigentum) submarket most relevant
- ADR-0003 amended with P-D entry (Adopted conditional — caveats: price attribute
  presence in public WFS TBD; block→PLR interpolation needs geo-DS sign-off)
- **Next:** verify price attributes present in public WFS; if yes, DE pair builds
  ingestion; geo-DS signs off on block→PLR areal interpolation method

### #28 D2 — Price/rent source completeness [COMPLETE]
- `docs/data/price-rent-coverage.md` written
- Mietspiegel table: city-wide only (no PLR variation in current warehouse)
- Wohnlagen address-point spatial join missing for 4/6 vintages
- Bodenrichtwerte: not yet ingested (WFS confirmed 2020–2024 on GDI Berlin)
- **PLR-level D2 coverage currently zero** — blocked on D1c spatial join + BRW ingestion
- Naming collision flagged: #28's "D2 (price/rent)" vs index "D2 = MSS Dynamik"

### #69 R-A6 — Spatial methods ADR [COMPLETE, PROPOSED]
- `docs/adr/0010-spatial-distance-weighting.md` — Status: Proposed
- Decision: two-tier split — DuckDB spatial for distance-decay POI weighting;
  PySAL (libpysal+esda) for Moran's I/LISA/Gi* in analysis/; H3 analysis-only
  (DuckDB H3 community extension rejected — not guaranteed on MotherDuck)
- **Maintainer must accept ADR-0010 before R-A9 spatial inference implementation**

---

## Branch and PR state

Branch: `feat/64-ra1-index-reground`

Two commits added this session:
- `64f8708` feat(#64): R-A1 re-ground index — MSS D1/D2 as outcome, POI D3 as predictor, lead-lag model
- `0bda9fc` docs(#53,#28,#69): secondary tasks — Kauffälle discovery, price-rent coverage, ADR-0010 spatial

**Branch NOT yet pushed. Push and open PR:**

```bash
git push -u origin feat/64-ra1-index-reground

gh pr create \
  --title "feat(#64): R-A1 index re-grounding — MSS social outcome, POI predictor, lead-lag" \
  --body "$(cat <<'EOF'
Closes #64.
Secondary: #53 (D1b discovery + ADR-0003 amendment), #28 (price-rent coverage note), #69 (ADR-0010 spatial methods, Proposed).

## Summary
- **Core fix:** the legacy gentrification_score conflated POI z-scores with social outcomes. D1/D2 (MSS Status/Dynamik) are now the social outcome; D3 (POI) is the predictor; D4 (EWR) is the baseline covariate; the lead-lag relationship is first-class.
- New \`int_mss_lead_lag\` model implements H3a/H3b panel at k=1,2,3 edition offsets within vintage.
- New Dynamik mapping-direction test (severity:error) guards the sign that would otherwise silently invert all lead-lag results.
- 6-stage typology (invasion-succession framing) embedded in the D1×D2 matrix CASE WHEN; tension-cell guard ensures dynamik=3 can never yield an upgrading stage.
- Secondary: Kauffälle WFS found (open data, ADR-0003 amended); ADR-0010 spatial methods Proposed; price-rent coverage gaps documented.

## Methodology gate
- \`docs/methodology/R-A1-geo-signoff.md\`: Verdict: PASS WITH CONDITIONS
- \`docs/methodology/R-A1-domain-signoff.md\`: Verdict: PASS WITH CONDITIONS

## Build gate
PASS=344 WARN=1 ERROR=0 (baseline was PASS=264; net +80 tests)

## Open conditions (non-blocking, DE-actionable)
- Geo C-2: Dynamik {1,3,5} reconciliation dbt test is now in place (new test_dynamik_ordering_guard); confirm against published MSS report once data is ingested
- Geo C-4: per-fit D3 geometry coterminous with D1/D2 documented in int_mss_lead_lag; crosswalk bridge is robustness path
- Domain D-2: tension-cell sign guard (dynamik=3 never → upgrading stage) is in the CASE WHEN; reviewer confirmed
EOF
)"
```

---

## Low-severity findings carried as open conditions

- **L-1:** `test_dynamik_ordering_guard.sql` overlaps with `test_mss_gesamtindex_consistency.sql`;
  the new test is now the superset (has mapping-direction check); consider retiring the older test
- **L-2:** INNER JOIN to POI in `int_gentrification_ts` silently drops MSS PLRs with no POI
  snapshot; add a warn-severity row-count test
- **L-3:** `gentrification_index.sql` live_data includes uninhabited PLRs as NULL rows without
  an `is_uninhabited` flag; downstream consumers filter on `status_index IS NULL`

---

## Next steps (in priority order)

### Immediately (push + PR)
```bash
git push -u origin feat/64-ra1-index-reground
```
Then open PR per template above.

### After #64 PR merges

**1. #65 R-A2 — Fix and re-run E1/E2 against real hypotheses** (unblocked by R-A1)
- The previous E1/E2 used the wrong model (POI z-score as "status"); now `int_mss_lead_lag`
  provides the correct panel
- Rewrite `analysis/e1_regressions.py` and `analysis/e2_classification.py` to use the
  lead-lag model; update findings docs
- Needs geo-DS + domain sign-off on findings
- Spawn: data-engineer implements scripts; geo-DS co-signs findings

**2. #71 B2 — Ground-truth back-test harness**
- Validate live typology stages vs known hotspots (Reuterkiez, Prenzlauer Berg)
- Spawn: data-analyst + geo-DS
- Depends on: R-A1 ✓, int_mss_lead_lag ✓

**3. #78 R-A8 — Longitudinal trajectory model (2008–2024)**
- Build `fct_gentrification_trajectory` with per-year stage classification
- Depends on: R-A7 ✓, R-A1 ✓
- Spawn: data-engineer pair

**4. ADR-0010 acceptance** (#69) — maintainer decision needed before R-A9 spatial
   inference implementation

**5. C6 temporal validation** (#26) — was on hold; now unblocked since R-A1 lands

### Board updates needed (manual)
- Close #64 once PR merged
- Move #65, #71, #78 to In Progress (now unblocked)
- Add #53 follow-up (Kauffälle ingestion) as new issue
- Accept/reject ADR-0010 (#69)

---

## Key files on this branch

| File | Purpose |
|---|---|
| `docs/methodology/index-definition.md` | Governed index definition (the spec for R-A1) |
| `docs/methodology/R-A1-geo-signoff.md` | Geo-DS PASS WITH CONDITIONS |
| `docs/methodology/R-A1-domain-signoff.md` | Domain-expert PASS WITH CONDITIONS |
| `transform/models/intermediate/int_gentrification_ts.sql` | Core refactor (D1/D2 social outcome) |
| `transform/models/intermediate/int_mss_lead_lag.sql` | NEW: lead-lag panel k=1,2,3 |
| `transform/tests/test_dynamik_ordering_guard.sql` | NEW: Dynamik sign guard (severity:error) |
| `transform/models/marts/gentrification_index.sql` | Updated: MSS social outcome |
| `transform/models/marts/fct_gentrification_change.sql` | Updated: MSS + status_transition |
| `docs/adr/0010-spatial-distance-weighting.md` | NEW: spatial methods ADR (Proposed) |
| `docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md` | Amended: P-D Kauffälle |
| `docs/data/kaufFaelle-discovery.md` | D1b: Kauffälle WFS found |
| `docs/data/price-rent-coverage.md` | D2: price/rent PLR coverage zero |

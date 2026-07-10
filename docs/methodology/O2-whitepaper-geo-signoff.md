# Geo-Data-Scientist Sign-off: O2 Whitepaper Content Population

- **Scope:** #82 (O2) — `docs/whitepaper/whitepaper.qmd`, `docs/whitepaper/references.bib` content
  population (Data Sources, Methods, Validation, Limitations sections; the spatial/statistical
  content of Ethics)
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Verdict:** PASS

---

## Scope of review

This sign-off covers whether the whitepaper's *restatement* of the already-governed spatial and
statistical methodology is faithful to its canonical sources, and whether the live-executed
Validation table is methodologically sound and correctly wired to the governed marts. It does
**not** re-review the underlying methodology itself (index-definition.md, spatial-methods.md,
backtest.md), which already carry their own PASS verdicts — only the whitepaper's restatement of
it and the one new artefact (the live Quarto Python chunk).

## Assessment

### 1. Methods section — faithfulness to source

Checked claim-by-claim against `docs/methodology/index-definition.md` and
`docs/methodology/spatial-methods.md`:

- Dimension table (D1-D5), vulnerability-positive polarity convention, and the D1 numeric-inverse
  note vs. the 2018 thesis `status_summe` — **accurate** (index-definition.md §0.2, §0.3, §5).
- Six-stage typology, the two guardrails (no displacement-event stage names; PLR-aggregate
  ecological-inference disclaimer), and the Milieuschutz-as-overlay-not-stage rule — **accurate**
  (§1.2, §1.3, §1.8), including the "post-displacement" prohibited-name example.
- Lead-lag spec (H3a/H3b, both-sides-deltas rule, spatial-robust inference requirement, C5-before-
  lead-lag ordering, LOR-vintage discipline) — **accurate** (§2.1-§2.5). The whitepaper correctly
  states the headline (H3b dominance) as a *reported test outcome*, not a hard assumption — this
  is the single most important framing point in the source document and it is preserved.
- Spatial methods: Gaussian kernel default (b=500m, EPSG:25833), mass-conservation, Gi* on Queen
  contiguity with the public-labelling hedge requirement, Anselin-Florax LM decision rule for the
  OLS→spatial upgrade, MAUP PLR-vs-BZR check (r>0.7 publish gate), and the fixed
  `permutations=999, seed=42` reproducibility requirement — **all accurate** and correctly
  attributed (spatial-methods.md §1-§8).
- OA section: nested nested-LQ formula, kernel-before-ratio ordering, and the widened
  {500,1000,1500}m sweep with 1000m headline — **accurate** (§11.1-§11.2), including the correct
  rationale (retail-catchment vs. walkable-amenity-catchment distinction).
- Ordinal-treatment rules (D1/D2 never averaged; permitted methods list; binary collapse for the
  Epic B headline test) — **accurate** (§3.1-§3.3).

No methodological claim in the Methods section introduces a new decision, weakens a stated
guardrail, or drops a citation the source document requires. All citations trace to a specific
subsection of the canonical document, satisfying R-C2.

### 2. Validation section — live-executed chunk

I independently re-derived the chunk's query logic against `analysis/backtest_index.py`
(the R-B2-signed-off reference implementation) rather than taking the first draft on faith — the
initial draft used an incorrect join (`period_yyyymm` on `int_gentrification_ts`, which does not
carry that column; it uses `snapshot_year`/`mss_edition`) and an incorrect schema reference
(`seed_gentrification_ground_truth` lives in `main_seeds`, not `main`). This was caught and fixed
during this review before the chunk was verified to execute.

Verified by direct execution (`uv run poe whitepaper`, both HTML and Typst/PDF targets):

- The chunk mirrors `backtest_index.py`'s `load_data()` / `test_mss_agreement()` /
  `test_hotspot_recall()` / `test_coldspot_recall()` exactly: same table/schema, same join keys
  (`area_code` ↔ `area_code`/`plr_id`), same edition-selection logic (`MAX(mss_edition)` on
  `area_vintage='lor_2021'`), same decile thresholds (`quantile(0.9)`/`quantile(0.1)` on the
  `live_data` variant's `status_index`), same pass thresholds (rho>0.3 & p<0.05; recall>=0.5).
- Live re-execution against the currently ingested local DuckDB reproduces the exact numbers
  recorded in `docs/methodology/backtest.md` (2026-06-29): rho=1.0000 (p=0.0000, n=535), hotspot
  recall 1.00 (8/8), coldspot recall 1.00 (6/6) — confirming the table is genuinely wired to the
  governed marts, not a static copy, and that the pipeline's current state agrees with the last
  recorded static run.
- The chunk degrades gracefully (a note, not an error) when no local DuckDB is populated, so the
  document still builds standalone reproducibly (ADR-0013 requirement) in an environment without
  ingested data.
- No new statistical method is introduced; the chunk is a direct restatement/re-execution of an
  already-approved (R-B2, `docs/methodology/R-B2-geo-signoff.md`) test suite.

### 3. Limitations section

Cross-checked each bullet against its cited source: displacement-inference guard (G-1),
ecological-inference guard (G-2), MAUP/vintage-break discontinuity, OSM completeness bias and the
C5 correction's residual scope, spatial-autocorrelation caveat, and the absent Smith rent-gap
dimension. All are accurate restatements with correct section pointers; none overstate or
understate the caveat relative to its source. The Epic B "directional revival, not exact
reproduction" framing correctly cites CLAUDE.md rather than asserting a stronger claim.

### 4. Data Sources & Licences

Licence-family claims (`dl-de-zero-2.0`, `dl-de/by-2.0`, ODbL) and the source→ADR mapping were
checked against ADR-0003, ADR-0006, ADR-0007, ADR-0014, ADR-0019 and are correct. No paid or
proprietary source appears (Golden rule 1).

## Conditions on integration (non-blocking)

None. This is a restatement of already-governed methodology with one correctly-verified new
artefact (the live validation chunk); no new spatial/statistical decision requires a fresh
condition.

## Verdict: PASS

# #354/#355 phase A — architect note: Sozialmonitoring annex XLSX

- **Date:** 2026-10-31
- **Author:** system-architect
- **Re:** `docs/epic-e/354-phase-a-data-prerequisites.md` §4–5, §8 O4

## (a) Seed `seed_hh_sozialmonitoring_published_class_counts.csv` — covered by ADR-0014, no amendment

ADR-0014 §2 already approves the Sozialmonitoring product (BSW, Transparenzportal, `dl-de/by-2.0`)
and explicitly sanctions using its published report material for class-distribution reconciliation
as a hard correctness gate. The annex XLSX files are the same publisher, product, licence and host
(`transparenz.hamburg.de`, already on `docs/method/egress-hosts.md`). Only the file format differs,
and ADR-0014 lists XLSX as an accepted format. Re-tabulating published counts into a small seed
follows the ADR-0003/0014 Mietspiegel precedent. Conditions:

1. The seed header comment or `seeds/*.yml` description records the source (edition, annex file
   name/URL) and the attribution *"Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und
   Wohnen"* (`dl-de/by-2.0`).
2. Do not commit the raw XLSX files. Only the 70-row derived seed is committed.
3. The seed is used only as a test fixture. No model may select from it.

## (b) S1–S7 / D1–D6 indicator z-scores for a continuous composite — gated, not yet approved

Before ingestion, all of the following are required:

1. **ADR-0014 amendment** (dated, append-only). ADR-0014 approves the Sozialmonitoring *classes*
   (Status/Dynamik/Gesamtindex) as the outcome, not per-indicator z-scores as an ingested dataset.
   The amendment must record: the annex XLSX as the source of continuous values, which editions are
   covered, a new staging table (proposed `stg_hamburg_sozialmonitoring_indicators`, long format
   `(edition_year, gebiet_id, indicator, z_score)`), and the role rule. The z-scores are
   **outcome components, never predictors** (ADR-0014 §2 / ADR-0006 R-A1 leakage rule). The
   architect writes the amendment and the maintainer approves it (golden rules 1–2).
2. **Licence/attribution:** `dl-de/by-2.0` with the BSW attribution string above. The existing
   Sozialmonitoring G3 attribution row covers it. Add a row only if the annex names a different
   originator.
3. **Egress:** no change. `transparenz.hamburg.de` / `suche.transparenz.hamburg.de` are already
   listed. If the files actually download from another host (for example `hamburg.de/resource/blob`),
   add that host to `egress-hosts.md` in the same change.
4. **Ingestion pattern:** a pure-Python HTTP download into `ingestion/hamburg/sozialmonitoring/`
   with an XLSX reader that is already a dependency (check `pyproject.toml`; a new library needs
   architect sign-off). Use a pinned per-edition URL manifest, write the raw files to gitignored
   `data/`, and read them in long format. Budget for header/sheet drift across 2016–2025 (EWR
   lessons #50/#57/#58). Add dbt tests that reconcile against the WFS classes and the seed from (a).
5. **Methodology gate:** a continuous composite is methodology-bearing (R-C1). It needs a
   geo-DS PASS and a domain-expert PASS, plus an R-C2 citation (Sozialmonitoring Bericht method
   chapter), before it is integrated into `develop`.

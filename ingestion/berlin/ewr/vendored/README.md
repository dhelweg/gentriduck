# Vendored EWR source CSVs (ADR-0023)

These are **unmodified copies** of the upstream Berlin EWR (Einwohnerregister) per-PLR CSVs used
by `ingestion/berlin/ewr/ingest_ewr.py`, committed here as a **last-resort reproducibility
fallback** under ADR-0023 (`docs/adr/0023-vendored-cc-by-ewr-fallback.md`).

## Why these are here

`data/raw/` is normally gitignored — raw data is expected to be rebuilt from source on a fresh
checkout. For the EWR source that no longer holds: the Amt-für-Statistik-Berlin-Brandenburg
opendata site now serves an HTML SPA shell instead of CSV for the old direct-download URLs
(2015-2020, 2024), and CKAN discovery 404s for 2021-2023 (never published there). See #197 for the
full breakage record. ADR-0023 carves a narrow, scoped exception (genuinely small + proven
unfetchable + redistributable licence) to vendor these bytes so a fresh checkout can still rebuild
the EWR pipeline without a live network dependency or a manual download.

## What's here

The main `12E` matrix (total population + age/sex/duration breakdowns) plus the companion series
that supply indicators absent from the main matrix:

- `EWR{YYYY}12E_Matrix.csv` / `EWR_L21_{YYYY}12E_Matrix.csv` — main matrix (post-2021-reform years
  use the `EWR_L21_` prefix, matching upstream naming).
- `EWR{YYYY}12A_Matrix.csv` / `EWR_L21_{YYYY}12A_Matrix.csv` — Ausländische Einwohner (foreigners)
  companion, supplies `E_A`.
- `EWRMIGRA{YYYY}12E_Matrix.csv` — Migrationshintergrund companion, supplies `MH_E`.
- `WHNDAUER{YYYY}_Matrix.csv` — Wohndauer (residence duration) companion, supplies `PDAU5`/`PDAU10`.

Filenames are kept in their upstream form so the existing loader functions in `ingest_ewr.py`
(`load_local_csv`, `load_companion_local_csv`, `load_migra_local_csv`, `load_whndauer_local_csv`)
recognise them unchanged — no vendored-specific parsing logic.

## Years on hand

| Series | Years |
|---|---|
| Main 12E | 2008-2020, 2024, 2025 |
| 12A (foreigners) | 2014-2020, 2025 |
| EWRMIGRA (migration background) | 2014-2020 |
| WHNDAUER (residence duration) | 2008-2020 |

**2021-2023 main-matrix years are absent** — upstream never published a CKAN-discoverable or
direct-download CSV for that window (#197 tracks sourcing these; this vendoring mechanism is not
blocked on that and lands with whatever partial set is on hand, per ADR-0023 Consequences).

## Provenance / staleness audit

- **Retrieved:** 2026-06-18 (see `ingestion/manifest/berlin__ewr.json` → `upstream.retrieved_at:
  "2026-06-18T21:47:03Z"` for the exact timestamp of the ingestion run that these bytes fed).
- **Source:** live HTTP fetch from `www.statistik-berlin-brandenburg.de/opendata/` (12E fast-path
  URLs) and manual browser download for the companion series (12A/EWRMIGRA/WHNDAUER — the site
  blocks programmatic access to these), per the maintainer's manual rebuild.
- **Bytes are redistributed unmodified** — no reformatting, re-encoding, or value changes. If
  upstream later republishes corrected numbers for any of these years, this committed copy is
  stale until refreshed; re-run the ingestion script with a live/local source and re-copy into this
  directory to update.

## Licence / attribution

See `ATTRIBUTION.md` in this directory. CC BY 3.0 DE — Amt für Statistik Berlin-Brandenburg.

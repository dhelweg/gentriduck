# Session handoff — 2026-06-17 — C3b EWR socio-economic time series

## TL;DR

C3b is **complete, reviewed (1 round of fixes), and committed** on branch
`overnight/2026-06-17-c3b-c2-d1`. Gate: PASS=130, WARN=0, ERROR=0.

## What was done

1. Geo-data-scientist sign-off obtained on the indicator set — ADR-0003's
   starter list was missing **DAU5/DAU10 (residence_duration_*_share)**,
   the single most discriminating socio-economic signal in the 2018 index.
   Added. Approved indicator set: 13 indicators.
2. Schema extended vs ADR-0003 proposal: added `area_vintage` (mandatory
   for the 2021 LOR boundary break) and `reference_date` (DATE).
3. Data-engineer implemented; reviewer found 3 required changes; all fixed:
   - Range tests [0,1] for share indicators added to both schema.yml files
   - `parse_years()` heuristic replaced with proper structural check
   - `pyarrow>=14` added as direct dependency in pyproject.toml

## Commit on branch

```
dc8f13a feat(c3b): EWR multi-year socio-economic time series
```
Branch: `overnight/2026-06-17-c3b-c2-d1`

## New files

| File | Purpose |
|---|---|
| `ingestion/berlin/ewr/__init__.py` | Package marker |
| `ingestion/berlin/ewr/ingest_ewr.py` | Ingestion script (~390 lines) |
| `transform/seeds/seed_ewr_indicator_meta.csv` | 13-row indicator metadata |
| `transform/models/intermediate/int_ewr_series.sql` | Real intermediate model |

## Modified files

| File | Change |
|---|---|
| `transform/models/staging/stg_berlin_ewr.sql` | Stub → graceful-degradation real model |
| `transform/models/staging/schema.yml` | Full column docs + tests for stg_berlin_ewr |
| `transform/models/intermediate/schema.yml` | int_ewr_series entry |
| `transform/seeds/schema.yml` | seed_ewr_indicator_meta entry |
| `pyproject.toml` / `uv.lock` | pyarrow>=14 direct dependency |

## Approved indicator set (13 indicators)

| indicator | source | unit | caveat |
|---|---|---|---|
| residents_total | E_E | count | — |
| residents_male_share | E_EM/E_E | share | — |
| residents_female_share | E_EW/E_E | share | — |
| age_under18_share | age cohorts | share | — |
| age_18_27_share | age cohorts | share | — |
| age_27_45_share | age cohorts | share | — |
| age_45_65_share | age cohorts | share | — |
| age_65plus_share | age cohorts | share | — |
| mean_age_years | midpoint-weighted | years | — |
| foreigners_share | E_A/E_E | share | — |
| migration_background_share | MH_E/E_E | share | Definition changed ~2020 (Mikrozensus reform) |
| residence_duration_5y_share | DAU5 | share | May be in separate CSV; handle gracefully |
| residence_duration_10y_share | DAU10 | share | May be in separate CSV; handle gracefully |

## EWR ingestion — completed findings (updated 2026-06-18)

**Parquet files written:** 14 years, 0 errors.

| Years | PLR rows | Note |
|-------|----------|------|
| 2008–2018 | 447 | Old LOR scheme (pre-2021) |
| 2019–2020 | 448 | Old LOR scheme (minor boundary change) |
| 2024 | 542 | New LOR 2021 scheme |
| 2021–2023 | — | Not published on any open portal |
| 2014 | 447 | Was thought missing; actually available from statistik-berlin-brandenburg.de |

**Known infrastructure issues (fixed in commit `3976908`):**

1. **macOS SSL cert failure** — Python's `urllib` ships no CA certs on macOS. Fix: `certifi` bundle injected via `ssl.create_default_context(cafile=certifi.where())`. Applied to both CKAN API and CSV download calls.

2. **statistik-berlin-brandenburg.de blocks programmatic downloads** — The server returns an HTML page (200 OK, Content-Type: text/html) for all `.csv` URLs when accessed by Python/urllib, regardless of User-Agent or Referer headers. Browser downloads work fine.

3. **daten.berlin.de CKAN API returns 404** — The `/api/3/action/package_search` endpoint no longer exists. Dataset pages (`/datensaetze/...`) only exist for 2015–2020 and 2024.

**Workaround (now in script):** `--local-csv-dir` flag. Download CSVs manually from browser, place in `data/raw/berlin/ewr/csv/`, then run:

```bash
uv run python ingestion/berlin/ewr/ingest_ewr.py \
    --out-dir data/raw/berlin/ewr \
    --local-csv-dir data/raw/berlin/ewr/csv \
    --years 2008-2024
```

**Browser download pages (2015–2020, 2024):**
`https://daten.berlin.de/datensaetze/einwohnerinnen-und-einwohner-in-berlin-in-lor-planungsraumen-am-31-12-{YYYY}`

**Direct CSV URLs (2008–2013, 2014 — browser only):**
`https://www.statistik-berlin-brandenburg.de/opendata/EWR{YYYY}12E_Matrix.csv`

**`VINTAGE_URLS`** in `ingest_ewr.py` is now populated for 2008–2020 and 2024 (used as URL reference only; actual download requires browser due to server blocking).

## Reviewer note (DAU5/DAU10 semantics) — resolved

DAU5/DAU10 in the raw CSVs are fractional shares (0–1 range), confirmed from 2008–2024 data. The auto-detect logic in `compute_indicators()` (`if max > 1.5 → divide by E_E`) correctly handled all vintages. No manual fix needed.

## Gate status

- `uv run poe build`: PASS=179, WARN=0, ERROR=0
- `uv run poe lint`: clean
- Branch: `overnight/2026-06-17-c3b-c2-d1` — pushed, PR #49 open
- Parquet files: `data/raw/berlin/ewr/{2008..2020,2024}.parquet` (gitignored, 14 files)

## Next task: D1 — Open price/rent sources (issue #27)

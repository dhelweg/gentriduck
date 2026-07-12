# ADR-0023: Vendor small CC-BY EWR source CSVs as a committed reproducibility fallback

- **Status:** Accepted (2026-07-11)
- **Relates to:** #197 (EWR re-fetchability gap — the tracking ticket), ADR-0003 (approves the EWR
  source itself), ADR-0016 (ingested-data manifest / `source_class`), CLAUDE.md Golden rule #1
  (free + open only) and the "raw data is gitignored, rebuilt from open sources" Layout/Quality-gate
  convention this ADR carves a narrow exception to.
- **Methodology gate:** not applicable — this is a **data-provenance / reproducibility** decision. It
  touches none of the R-C1 substantive paths (no indicator set, weights, normalization, or spatial
  method; the computed 13 indicators in `ingest_ewr.py` are unchanged). Per precedent for
  process/infra ADRs (0009, 0011, 0012, 0015, 0016), no geo-DS / domain-expert sign-off is required.

## Context

The Berlin EWR (Einwohnerregister) per-PLR socio-economic CSVs are the ingestion source behind
`ingestion/berlin/ewr/ingest_ewr.py` — the input to `stg_berlin_ewr` and the whole
`int_berlin_ewr_plr2021 → int_ewr_socioeco → gentrification_index` chain. Per the CLAUDE.md
convention, `data/raw/` is **gitignored and rebuilt from open sources**, so a fresh checkout is
expected to reconstruct these parquets by (re-)fetching upstream.

**#197 documents that this rebuild is no longer reliable:**

- The Amt-für-Statistik-Berlin-Brandenburg opendata site now serves an **HTML SPA shell instead of
  CSV** for the old direct-download URLs (affects 2015-2020 and 2024 — the `VINTAGE_URLS` /
  `VINTAGE_A_URLS` fast-path entries in `ingest_ewr.py`). The script already documents that the
  server "blocks programmatic HTTP access (returns text/html for CSV requests)".
- **CKAN discovery 404s for 2021-2023** — upstream never published that window, so neither the
  `VINTAGE_URLS` fast path nor `discover_url_via_ckan()` can recover it.

The net effect: on a fresh clone the EWR pipeline **cannot reliably rebuild itself** for those years,
which breaks the local-first reproducibility guarantee for a load-bearing input. The script's existing
`--local-csv-dir` escape hatch works, but it points at `data/raw/**` (gitignored) — so the
pre-downloaded CSVs live only on whichever machine happened to fetch them and never reach a fresh
checkout.

**What changed since #197 was filed.** The EWR data's licence is confirmed **CC BY 3.0 DE**
(Creative Commons Attribution, Amt für Statistik Berlin-Brandenburg) — verified in `ingest_ewr.py`'s
docstring and the `SOURCE_ATTRIBUTION` constant. CC BY 3.0 DE **permits copying and redistribution
(including commercially) with attribution only**. The files are tiny: ~55-65 KB/year, ~1 MB total
across all 18 years (2008-2025) counting the main `12E` matrices and the `12A` / `EWRMIGRA` /
`WHNDAUER` companions. The maintainer has approved committing them into the repo as a licensed
fallback.

### Why this needs an ADR (Golden rule #2)

This is not a new tool or data source — the source (Amt für Statistik Berlin-Brandenburg EWR) is
already approved via ADR-0003. What needs recording is a **narrow, explicit exception to the
"gitignored raw data, rebuilt from source" convention**: normally raw bytes are never committed. The
exception must be scoped so it does not silently become "commit raw data whenever convenient".

## Decision

Commit a **small, licensed set of upstream EWR source CSVs into the repo** as a last-resort
reproducibility fallback, under a tightly-scoped exception to the gitignore-raw convention.

### 1. Scope of the exception (deliberately narrow)

Vendoring raw upstream bytes is permitted **only** when **all** of the following hold:

1. **Genuinely small** — order ~1 MB total for the source, not the "large raw data" the CLAUDE.md
   convention targets (the OSM `.osh.pbf` is ~11 GB; that stays gitignored, always).
2. **Upstream re-fetchability has proven unreliable** — a live, documented breakage (SPA shell,
   unpublished window, dead endpoint), not mere convenience or speed.
3. **Licence permits redistribution** — open licence explicitly allowing copying/redistribution
   (here CC BY 3.0 DE); attribution obligations are met (see §4).

This **does not reverse** the general convention. Large/rebuildable raw data stays gitignored and
rebuilt from source. Any future use of this exception for another source is a fresh judgement against
these three tests (and, if non-obvious, its own ADR note).

### 2. Where the vendored files live

A small committed directory alongside the ingestion script:

```
ingestion/berlin/ewr/vendored/
  README.md            # what these are, why committed, provenance
  LICENSE-CC-BY-3.0-DE # or ATTRIBUTION.md — see §4
  EWR2015...12E_Matrix.csv
  EWR2015...12A_Matrix.csv
  EWRMIGRA2015...       # companions as available
  WHNDAUER2015...
  ...
```

Rationale for co-locating with the script (rather than under `data/`): `data/**` is gitignored by
design and semantically "rebuildable artefacts"; these committed source files are the opposite — a
**checked-in provenance artefact** that must survive a `data/` wipe. Keeping them next to
`ingest_ewr.py` (like a fixture) makes the exception visible and self-documenting. The filenames keep
their upstream form so the existing `load_local_csv` / `load_companion_local_csv` /
`load_migra_local_csv` / `load_whndauer_local_csv` name-matching in `ingest_ewr.py` recognises them
unchanged.

### 3. Fallback wiring in `ingest_ewr.py` (last resort, after live URL)

The vendored directory is wired as the **final** source tier, preserving live-first behaviour:

1. explicit `--local-csv-dir` (if the operator passed one) — unchanged, highest priority;
2. live URL (`VINTAGE_URLS` fast path → `--url-override` → CKAN discovery) — unchanged;
3. **new:** the committed `ingestion/berlin/ewr/vendored/` directory as an implicit last resort,
   used only when (1) and (2) yielded nothing, **before** the year is skipped/failed.

Concretely, define a module-level `VENDORED_DIR = Path(__file__).resolve().parent / "vendored"` and
consult it via the *existing* `load_local_csv` / companion loaders when the live path returns `None`.
Implementation should reuse the current loader functions (do not duplicate parsing) and log at INFO
that a vendored fallback was used (so a run that quietly falls back is visible in logs). The operator
must be able to see whether a year came from live upstream or the vendored copy. Whether the vendored
tier can be disabled (e.g. `--no-vendored-fallback` for a strict "prove upstream still works" run) is
an implementation nicety left to the ticket, not mandated here.

### 4. Attribution / licence obligation (CC BY 3.0 DE)

CC BY 3.0 DE requires attribution on redistribution. Alongside the vendored files commit an
**`ATTRIBUTION.md`** (and/or the CC BY 3.0 DE licence text/link) stating, per the existing
`SOURCE_ATTRIBUTION` constant:

> Amt für Statistik Berlin-Brandenburg / Einwohnerregister Berlin-Brandenburg (EWR), CC BY 3.0 DE —
> https://www.statistik-berlin-brandenburg.de/ · Licence:
> https://creativecommons.org/licenses/by/3.0/de/ · Redistributed unmodified in this repository as a
> reproducibility fallback (ADR-0023).

This is in addition to — not a replacement for — the per-row `source_attribution` the pipeline already
carries into `stg_berlin_ewr` and the public attribution page (Epic G3). No modification of the CSV
bytes: they are redistributed as retrieved, so attribution alone satisfies the licence.

### 5. Manifest / `source_class` — keep "pinned", do **not** add a third class

`ingestion/manifest.py` currently allows `source_class ∈ {"pinned", "rolling"}` (ADR-0016). EWR is
already recorded as `"pinned"` in `_write_manifest`. **We keep `"pinned"` and do not add a
`"vendored-fallback"` class.**

Rationale: `source_class` in ADR-0016 is a **drift-tolerance semantic** — it decides whether a
row-count delta is a hard failure (`pinned`) or a tolerated warn (`rolling`). Vendoring changes
*where the bytes come from*, not *how much drift is tolerated*: a pinned source is still pinned
whether its bytes arrived via live HTTP or from the committed copy. Overloading `source_class` with
provenance would conflate two orthogonal axes and churn the manifest schema for no behavioural gain.
If provenance ever needs to be machine-recorded, the right home is the manifest `upstream` block (a
`retrieved_from: "vendored" | "live"` field) or the vendored `README.md` — not a new `source_class`.
The ticket may note this option but is not required to implement it.

## Consequences

- **Positive:** a fresh checkout can rebuild the EWR pipeline for the affected years with **no manual
  download and no live upstream dependency** — the local-first reproducibility guarantee is restored
  for a load-bearing input. Live upstream is still tried first, so the fallback is transparent when
  upstream recovers.
- **Positive:** ~1 MB of committed CSVs is negligible repo weight and diffs cleanly (text CSV).
- **Trade-off (accepted):** a narrow hole in the "raw data is never committed" convention. Bounded by
  the three §1 tests and this ADR; not a general licence to commit raw data. Reviewers should push
  back on any future vendoring that fails a §1 test.
- **Trade-off (accepted):** vendored bytes are a **point-in-time snapshot**. If upstream re-publishes
  corrected numbers, the committed copy is stale until refreshed — the same staleness ADR-0016's
  manifest is designed to surface (content hash / vintage). The vendored `README.md` must record the
  `retrieved_at` date so staleness is auditable.
- **Neutral:** #197 remains the tracking ticket for **sourcing** the still-missing 2021-2023 years and
  any manual re-downloads; this ADR only sanctions the **mechanism** and can land with any partial set
  of files already on hand.

## Relations

#197 (EWR re-fetchability tracking ticket) · ADR-0003 (EWR source approval) · ADR-0016 (manifest /
`source_class` semantics) · CLAUDE.md Golden rule #1 (free + open), Golden rule #2 (architect/tool
gate), Layout/Quality-gate "gitignored raw data" convention (the exception carved here).

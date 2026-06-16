# ADR-0005: City-agnostic data model

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

The product will cover **Berlin first, then other cities**. The 2018 thesis is hard-wired to Berlin
concepts (BZR / PLR / LOR administrative areas, the EWR population register). If we model those
directly, adding a second city later means a costly rewrite. We want expansion to be *configuration,
not re-engineering* — while only building and populating Berlin now.

## Decision

Introduce a **city-agnostic core** from day one:

- **`dim_city`** — one row per city (Berlin = the first), with metadata (country, CRS, etc.).
- **`dim_area`** — a generic, self-referential administrative hierarchy:
  `area_id, city_id, level, parent_area_id, name, geometry`, where `level` is a generic rank
  (e.g. `city > district > subarea`). Berlin's BZR/PLR/LOR map onto these generic levels.
- **Source adapters** — per-city, per-source ingestion lives under `ingestion/<city>/…` and lands
  data conformed to `dim_city` / `dim_area`. City-specific quirks stay in the adapter; the core
  models stay generic.
- **Parameterized index** — the gentrification index is defined over the conformed dimensions with
  per-city parameters (indicator weights, thresholds), not Berlin constants baked into SQL.

Only Berlin is populated now; the seam is built and proven, not exercised with a second city until
Epic H.

## Consequences

- Core marts reference `dim_area`/`dim_city`, never Berlin-specific tables directly.
- Adding a city = a new `dim_city` row + adapters + index params; no core-model changes (validated by
  Epic H).
- Small upfront modelling cost and one indirection layer, accepted as cheap insurance given the
  committed multi-city goal.
- The governed index definition (ADR-0004) must be expressed in city-parameterized terms.

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


## Addendum (2026-07-10, #161 / H-C4): city-onboarding checklist — boundary-reform crosswalk

Onboarding Hamburg (#125, ADR-0014) validated the city-agnostic seam for a **single-vintage** city
(one `area_vintage` tag across its whole ingested time series, no mid-series boundary reform). That
is *not yet* a validated pattern for a city that, like Berlin's own 2021 LOR reform, changes its
administrative-area boundaries partway through the series. Record the requirement here so the next
city's onboarding does not silently assume passthrough is always correct.

**Checklist item — before onboarding any future city with a mid-series boundary reform:**

1. Build a dedicated areal crosswalk seed for that city (mirroring
   `seed_lor_crosswalk_2006_to_2021`), mapping pre-reform area codes to post-reform area codes with
   apportionment weights. Do **not** rely on `int_poi_share_base_2021`'s passthrough branch — that
   branch is exact only when a city has one vintage across its whole series (see the model's SQL
   header and `docs/epic-h/125-multi-city-lineage-geo-signoff.md` Condition C4).
2. The enforced tripwire is `int_poi_share_base_2021.area_vintage`'s `accepted_values` schema test
   (`transform/models/intermediate/schema.yml`): widening that list to admit a new vintage tag
   *without* first deciding whether it needs a crosswalk is the exact failure mode this checklist
   guards against. Treat a red build on that test as "stop and answer question 1", not "just add the
   value".
3. Widening any governed mart's `city_code` `accepted_values` beyond its current set is itself
   methodology-bearing (R-C1) and needs a fresh geo-DS + domain dual sign-off regardless of whether a
   boundary reform is involved (per the #125 sign-offs' Condition D) — the crosswalk question is a
   precondition check for that gate, not a substitute for it.

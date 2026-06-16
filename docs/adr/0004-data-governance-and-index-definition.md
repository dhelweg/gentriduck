# ADR-0004: Data governance & governed index definition

- **Status:** Accepted (enforcement lands as marts are built)
- **Date:** 2026-06-17

## Context

Gentriduck publishes statistics to the public. The biggest failure mode for data products is weak
foundations — unclear definitions, no lineage, undocumented assumptions. The **gentrification index
is the core contribution**; "what the number means" must live in exactly one governed place and feed
both the warehouse and the public methodology page.

## Decision

- **One governed index definition.** A single semantic/metric spec (`docs/` + dbt model docs)
  defines the gentrification index: inputs, formula, the OSM completeness-bias correction, per-city
  parameters, and limitations. Marts implement that spec; the public methodology page renders it.
  No second, divergent definition is allowed.
- **dbt contracts** on mart models (enforced column names/types) so the published schema is stable.
- **Tests & freshness.** dbt tests on keys/relationships/accepted values; `source freshness` on
  ingested sources; data-quality tests for anomalies (e.g. implausible POI jumps, see Epic C5).
- **Lineage & docs.** `dbt docs generate` (via `poe docs`) produces the lineage graph; ADRs capture
  the "why".
- **Enforcement** runs in the local push-stage gate (`dbt build` includes contract + test checks).

## Consequences

- Mart schema changes are deliberate (contract edits), protecting the website and any consumers.
- The methodology page is generated from the same governed definition — no drift between site and
  warehouse.
- Slightly more upfront rigor on mart definitions; accepted because the index *is* the product.
- Contracts/tests are added incrementally as the corresponding marts appear (B4 onward), not before.

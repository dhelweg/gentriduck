# Architecture Decision Records

Short, append-only records of significant decisions. Each agent **must consult the relevant
ADR before adopting a new tool, library, or data source** (no "first tool that works").

| ADR | Title | Status |
|---|---|---|
| [0001](0001-stack-and-monorepo-architecture.md) | Stack & monorepo architecture | Accepted |
| [0002](0002-osm-poi-history-sourcing.md) | OSM POI history sourcing | Proposed |
| [0003](0003-berlin-geographies-and-open-price-rent-sources.md) | Berlin geographies + open price/rent sources | Proposed |
| [0004](0004-data-governance-and-index-definition.md) | Data governance & governed index definition | Accepted |
| [0005](0005-city-agnostic-data-model.md) | City-agnostic data model | Accepted |
| 0006 | Serving & hosting stack | Proposed (task F1) |
| 0007 | Data refresh / orchestration | Proposed (task F3) |

Format: each ADR has **Status**, **Context**, **Decision**, **Consequences**. Supersede rather
than edit accepted ADRs.

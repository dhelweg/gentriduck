# Architecture Decision Records

Short, append-only records of significant decisions. Each agent **must consult the relevant
ADR before adopting a new tool, library, or data source** (no "first tool that works").

| ADR | Title | Status |
|---|---|---|
| [0001](0001-stack-and-monorepo-architecture.md) | Stack & monorepo architecture | Accepted |
| [0002](0002-osm-poi-history-sourcing.md) | OSM POI history sourcing | Accepted |
| [0003](0003-berlin-geographies-and-open-price-rent-sources.md) | Berlin geographies + open price/rent sources | Accepted |
| [0004](0004-data-governance-and-index-definition.md) | Data governance & governed index definition | Accepted |
| [0005](0005-city-agnostic-data-model.md) | City-agnostic data model | Accepted |
| [0006](0006-berlin-mss-data-source.md) | Berlin MSS (Monitoring Soziale Stadtentwicklung) data source | Accepted |
| [0007](0007-berlin-ses-indicators.md) | Berlin per-PLR socio-economic status (SES) indicators | Accepted |
| [0008](0008-multi-dimensional-gentrification-model.md) | Multi-dimensional gentrification model (conceptual architecture) | Proposed (R-A7 #77) |
| [0009](0009-agent-skill-tooling-superpowers.md) | Agent-skill tooling — selectively adopt Superpowers | Accepted |
| — | Serving & hosting stack | Deferred (task F1) |
| — | Data refresh / orchestration | Deferred (task F3) |

Format: each ADR has **Status**, **Context**, **Decision**, **Consequences**. Supersede rather
than edit accepted ADRs.

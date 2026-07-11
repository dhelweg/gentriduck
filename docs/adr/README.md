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
| [0008](0008-multi-dimensional-gentrification-model.md) | Multi-dimensional gentrification model (conceptual architecture) | Accepted |
| [0009](0009-agent-skill-tooling-superpowers.md) | Agent-skill tooling — selectively adopt Superpowers | Accepted |
| [0010](0010-spatial-distance-weighting.md) | Spatial distance weighting | Accepted |
| [0011](0011-autonomous-merge-develop-branch.md) | Autonomous merge via a `develop` integration branch | Accepted |
| [0012](0012-serving-and-hosting-stack.md) | Serving & hosting stack | Accepted |
| [0013](0013-whitepaper-authoring-tool.md) | Whitepaper authoring tool (Quarto + Typst) | Accepted (2026-07-09) |
| [0014](0014-hamburg-data-sources.md) | Hamburg data sources (second city) | Accepted |
| [0015](0015-data-refresh-orchestration.md) | Data refresh / orchestration (`uv run poe refresh`) | Accepted |
| [0016](0016-ingested-data-drift-detection.md) | Ingested-data drift detection across local instances | Accepted (2026-07-06) |
| [0017](0017-poi-offering-advantage-revival.md) | POI offering-advantage (OA) revival — 3-level LQ, faithful/improved separation, `methodology_variant` | Accepted |
| [0018](0018-causal-tiered-poi-selection.md) | Causality-first-with-data-confirmation POI selection rule (Workstream 2 / improved OA) | Accepted |
| [0019](0019-berlin-milieuschutz-displacement-source.md) | Berlin displacement/affordability dimension — Milieuschutz source + rent-pressure proxy scope | Accepted |
| [0020](0020-community-contribution-governance-voting-board.md) | Community-contribution governance — voting board (GitHub Discussions) & autonomous triage | Accepted |
| [0021](0021-public-communication-surface-channel-policy.md) | Public communication surface & channel policy | Accepted (2026-07-11) |
| [0022](0022-scoped-gh-api-graphql-allow-exception.md) | Scoped `gh api graphql` allow exception for community-triage (SEC-2 amendment) | Accepted (2026-07-11) |

Format: each ADR has **Status**, **Context**, **Decision**, **Consequences**. Supersede rather
than edit accepted ADRs.

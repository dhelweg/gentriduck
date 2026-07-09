# 2026-07-07 structural review — architecture, code health, backlog (QA cluster)

**Scope:** full-repo structural review (dbt project, Python ingestion + analysis, web/ops/docs,
board + backlog) run as a one-off deep pass, independent of the devmode loop. Deliverable is
tickets and plan updates only — **no code was changed** in this review.

**Outcome:** nine tickets filed as the **QA cluster (#176–#184)**, four existing tickets
amended (#160, #165, #146, #129), one board gap fixed (#146 added to the board). Verdict:
the project is architecturally sound — the methodology gate, ADR trail, sign-off discipline,
ADR-0016 drift guard, and ops scripts are genuinely well built. The debts are concentrated in
**test coverage, duplication, and lineage**, all of which get more expensive once the OA
cluster (#163–#175) and the Hamburg publish wave (#158–#161) start touching the same files.

## Findings → tickets

| Area | Finding (severity) | Ticket |
|---|---|---|
| Python | Zero pytest coverage on ~17k lines; riskiest: crosswalk math, ADR-0016 severity lattice, PDF parsers, schema fingerprinting (high) | **#176** QA-1 |
| Python | 15× duplicated SSL/HTTP plumbing, no retries anywhere, non-atomic parquet writes, duplicated source registry, `sys.path` hacks (high) | **#177** QA-2 |
| dbt | `int_ewr_socioeco` (**R-C1 gate model**) + `int_poi_features_pivot` undocumented, zero tests; 12 models lack grain tests incl. `dim_area` (high) | **#178** QA-3 |
| dbt | City-code `'berlin'→'BER'` patched inline in 3 places; contradictory casing comments; `city_code='BER'` publication filters hard-coded in 3 marts; zero macros (high) | **#179** QA-4 |
| dbt | 0 `source()` calls despite declared sources; no freshness; lineage broken at the root; 19× path boilerplate (medium) | **#180** QA-5 |
| dbt | Dead `int_ewr_series`; misfiled orphan `stg_berlin_mietspiegel_address_plr`; no exposures for analysis/web consumers; deprecated `tests:` keys; naming drift; 616-line price/rent mart (medium) | **#181** QA-6 |
| analysis | cwd-dependent paths in 5 scripts; e1's dominant-PLR crosswalk bridge = methodology SQL outside the gated dbt surface; e3 scripts in no poe task (medium) | **#182** QA-7 |
| deps | `h3` + `quackosm` declared but never imported; geopandas used as a transitive dep against ADR-0010 Amendment 1; ruff runs default rules only, dead `noqa: S310` (low, needs architect ruling) | **#183** QA-8 |
| docs/ops | ADR index: broken 0013 link + stale 0016 status (file says Accepted 2026-07-06); 139 handoff files; ops deploy script undocumented; inert `_headers`; `docs/process/` vs `docs/methodology/` confusable; no web-build smoke signal (medium) | **#184** QA-9 |
| web/infra | `wrangler.toml` (Cloudflare) contradicts `web/evidence.config.yaml` basePath (GitHub Pages) | folded into **#146** |
| board | #129's standing clustered-SE requirement now has its target ticket | written into **#160**; #129 commented |
| dbt/OA | `int_poi_features_pivot` → `fct_poi_development` layering inversion (intermediate reads a mart) | folded into **#165** (OA-A.1) |

Not ticketed (fine as-is): ops devmode loop + watchdog (robust), deploy-gh-pages.sh (clean),
no committed build artifacts or large-file risks (goldens are intentional, pack 56 MiB),
determinism/seeding in analysis (good, one docstring nit → QA-7), no secrets anywhere,
epic sign-off pairs complete.

## Priority recommendation (next-best ordering for future sessions)

1. **#149** — live map renders empty on the default view: user-facing bug on the launched
   site, small, unblocked. Do before or alongside the OA spike.
2. **#163** — OA-P0.1 geo-DS spike: gates the entire #164–#175 cluster.
3. **#178** (QA-3) — a methodology-gated model with zero tests is a governance hole; quick win.
4. **#176 → #177** (QA-1 then QA-2) — tests, then the shared-framework refactor they protect.
   Land before the next ingestion-heavy wave.
5. **#179** (QA-4) — land before the Hamburg publish wave (#158–#161) turns three hard-coded
   filters into three parallel edits.
6. Remaining QA tickets (#180–#184) as capacity fillers between OA-cluster gates.

## Corrections to stale session state

- **#126 (Geofabrik) is resolved**, not blocked: the full-history PBF landed 2026-07-05,
  Hamburg OSM 2008–2026 is ingested, and release **PR #162** (develop → main) is open awaiting
  the maintainer's UI merge. `docs/handoff/state.json` (devmode-136) and the body of
  handoff-139 predate this; the "backlog fully blocked" picture no longer holds — 27 of 33
  open issues are unblocked.
- Still genuinely maintainer-blocked: #70, #80, #82 (replies/approvals) and the #146
  Cloudflare re-assessment (post-soft-launch, non-urgent).

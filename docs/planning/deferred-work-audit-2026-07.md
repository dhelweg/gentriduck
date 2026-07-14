# Deferred-work audit — 2026-07-14

A one-off sweep of the tickets **and** the docs/code for work the project explicitly said it would
do "later / once unblocked / in a follow-up / out of scope for now / parked / deferred", plus
remainders of **closed** tickets that were only partly delivered — i.e. gaps that no open issue was
tracking. Each surviving gap was filed as a new ticket (**#257–#271**) and added to the Gentriduck
board (Todo). This doc is the index; the per-ticket SPECs live under each epic's `tickets/`
directory (linked in **SPEC files** below).

**Why this doc exists:** so a future audit does not re-discover the same gaps. Every source location
that flagged one of these deferrals has been **back-linked** to its new ticket (search the repo for
`now tracked: #`), and the table below is the canonical gap → ticket map.

## Method

Five parallel doc-scan agents + a code grep, cross-referenced against the full open/closed issue list:

- `docs/adr/*.md` (all 23 ADRs)
- `docs/methodology/*.md`, `docs/epic-b/*.md`, `docs/epic-c/*.md`
- `docs/epic-d/*.md`, `docs/epic-e/*.md`, `docs/epic-g/*.md`, `docs/epic-h/*.md`
- `docs/epic-i/**/*.md`, `docs/assessment/tickets/*.md`
- `docs/assessment/*.md`, `docs/planning/*.md`, `docs/milestone/*.md`, `docs/process/*.md`,
  `docs/lessons/*.md`, `docs/method/*.md`, `docs/data/*.md`, `docs/handoff/**`
- `grep` of `transform/`, `ingestion/`, `analysis/`, `web/`, `ops/` for TODO/deferred/follow-up markers

## Filed tickets

| # | Handle | Tier | Epic | ⚖️ | Gap (why it wasn't tracked) |
|---|---|---|---|---|---|
| 257 | C-pre2021-poi | 1 | c | | Enabler: POI series only goes back to lor_2021; deferred "in a comment, tracked by no issue" |
| 258 | D5-wire | 1 | d | ⚖️ | #70's displacement proxies built but **zero-consumer**; ADR-0008/0019 slot never populated |
| 259 | A10-P2 | 1 | e | ⚖️ | #80 closed with only Part 1; DiD/event-study "parked on #70" (also closed) → orphaned |
| 260 | R-A8b | 1 | e | ⚖️ | R-A8 shipped 3 editions; full 7-edition panel deferred pending pre-2021 POIs (blocked on #257) |
| 261 | OA-ablation | 1 | e | ⚖️ | True same-anchor OA ablation "tracked, not scheduled" (blocked on #257) |
| 262 | G2-audit | 1 | g | ⚖️ | Dozens of binding "carry-to-G2" caveats accumulated; none re-verified post-publication |
| 263 | D3-brw-change | 2 | d | ⚖️ | BRW change/rent-gap signal called "the more valuable signal, build separately later" |
| 264 | R-B2b | 2 | e | ⚖️ | R-B2 recommended eastern-Berlin seed + dynamism back-test follow-ups; never filed |
| 265 | H-reg-SE | 2 | h | | #129 (standing Hamburg SE-clustering requirement) closed without a home |
| 266 | QA-raumid | 2 | — | | #200 fixed one un-padded raum_id join; repo-wide audit + source fix left for "a future ticket" |
| 267 | I-coarse-index | 2 | i | ⚖️ | Coarse-grain (BZR/PGR/Bezirk) index deferred as "its own methodology-bearing follow-up if wanted" |
| 268 | QA-winsor | 3 | c | ⚖️ | dynamism_score ±3 SD winsorization recommended/deferred across C4/C5/C6/G2; never done |
| 269 | I-ortsteile | 3 | i | | Berlin Ortsteile (96 Stadtteile) hierarchy pages "explicitly out of scope v1" |
| 270 | I20-school-xcheck | 3 | i | | Official-directory completeness cross-check "noted as a possible future ticket — not in scope" |
| 271 | C-craft-taxonomy | 3 | c | ⚖️ | `int_osm_poi_harmonized` TODO: "craft=* namespace … flag PM for a follow-up ticket" |

⚖️ = `methodology-bearing` (geo-DS + domain dual gate). #260/#261 are **blocked on #257**.

## Deliberately NOT filed

- **O3** (policy-relevance/ethics stance re-prioritization) — the PM already judged a ticket here
  "process theatre"; the substance is encoded in ADR-0008 / ADR-0021 / `docs/epic-g/G3-privacy-ethics.md`.
- **GoatCounter account setup / first-post publication** — maintainer-only actions, tracked on
  #194 (ADR-0012 Amendment B) and I13.
- **2027-MSS-edition re-runs** (k=3 lead-lag, longer early-warning panel) — time-gated; the data does
  not exist yet. Re-open when the 2027 edition is ingested.
- **Stale `docs/data/price-rent-coverage.md` items** (Bodenrichtwerte/Wohnlagen "not ingested",
  Mietspiegel parser bug) — superseded by the closed #112 / #113 / #55.

## Known coverage caveat

`docs/handoff/archive/*.md` was grep-skimmed, not read line-by-line (large, mostly restating already
-tracked blocked items). Every hit there pointed back to an already-tracked issue.

## SPEC files

Per-ticket SPECs live under each epic's `tickets/` directory:

- **epic-c:** [C-pre2021-poi](../epic-c/tickets/C-pre2021-poi.md) · [C-craft-taxonomy](../epic-c/tickets/C-craft-taxonomy.md) · [QA-winsor](../epic-c/tickets/QA-winsor.md) · [QA-raumid](../epic-c/tickets/QA-raumid.md) *(no epic label; filed under epic-c as it fixes the Epic-C `int_thesis_2018_area_index` / `dim_area` models)*
- **epic-d:** [D5-wire](../epic-d/tickets/D5-wire.md) · [D3-brw-change](../epic-d/tickets/D3-brw-change.md)
- **epic-e:** [A10-P2](../epic-e/tickets/A10-P2.md) · [R-A8b](../epic-e/tickets/R-A8b.md) · [OA-ablation](../epic-e/tickets/OA-ablation.md) · [R-B2b](../epic-e/tickets/R-B2b.md)
- **epic-g:** [G2-audit](../epic-g/tickets/G2-audit.md)
- **epic-h:** [H-reg-SE](../epic-h/tickets/H-reg-SE.md)
- **epic-i:** [I-coarse-index](../epic-i/tickets/I-coarse-index.md) · [I-ortsteile](../epic-i/tickets/I-ortsteile.md) · [I20-school-xcheck](../epic-i/tickets/I20-school-xcheck.md)

## R-C1 sign-off (the back-link commit)

The commit that added the back-link annotations touches `docs/adr/**` + `docs/methodology/**`, so it went
through the methodology gate as a traceability-only change. Both verdicts: **PASS**.

- geo-DS: [`docs/methodology/deferred-work-audit-backlink-geo-signoff.md`](../methodology/deferred-work-audit-backlink-geo-signoff.md)
- domain: [`docs/methodology/deferred-work-audit-backlink-domain-signoff.md`](../methodology/deferred-work-audit-backlink-domain-signoff.md)

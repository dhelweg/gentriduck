# Gentriduck — Reviving the 2018 Berlin Gentrification Thesis

## Context

In 2018 you wrote a master thesis at Uni Hamburg: **"Measurement of Gentrification in
Berlin via Big Data Analytics"** ([dhelweg/masterthesis2018_gentrification](https://github.com/dhelweg/masterthesis2018_gentrification)).
It measured gentrification across Berlin's administrative areas (BZR / PLR / LOR) by
combining OpenStreetMap POIs with population-register (EWR) socio-economic data, built a
gentrification index, tested hypotheses H1–H3c via regression, and classified areas with
ML — on a now-dated stack: **Hadoop + Hive SQL, Java UDFs (incl. distance calcs), R, Weka**.

**Gentriduck** revives this on a modern, local-first stack and **grows into a public data product**:
a website offering **gentrification & social-development statistics for Berlin first, then other
cities**. The thesis reproduction is phase one; the website is the eventual core. The original repo
stays **untouched** (thesis of record). New project lives at `~/git_private/gentriduck` (sibling to
your work checkouts in `~/git/`). It is **public, free, and open-data/open-source only** — every tool
and data source must be free, and no proprietary/internal data is used. Tasks tracked in **GitHub
Projects**. Work is executed by a **team of specialised agents** (below) across many sessions.

### Goals
1. **Revive the concept:** re-implement the 2018 approach on dbt + DuckDB and check the paper's
   **findings still hold** — directional agreement (same hypotheses supported, similar rankings/
   correlations), *not* an exact number-for-number reproduction.
2. **Longitudinal OSM POI DB:** build a full **time-series of Berlin POI development** (not one
   snapshot) so gentrification is measured as *change over time*.
3. **Property & rent dimension (open sources only):** add price/rent signals from **public/open
   data** — Bodenrichtwerte/Gutachterausschuss, Mietspiegel, Wohnungsmarktbericht, and similar.
   (Open data only — no proprietary or internal data.)
4. **Public stats website (the product):** a free public site presenting the index, time-series and
   maps — **Berlin first**, designed so **other cities** can be added later.
5. **Multi-city by design:** model the data **city-agnostically from day one** (build Berlin only now)
   so expansion is configuration, not a rewrite.

### Stack mapping (old → new)

| 2018 | Gentriduck |
|---|---|
| Hive SQL pipeline (`10_*` → `47_*` → `81_*`) | **dbt** models (staging → intermediate → marts) |
| Hadoop / HDFS | **DuckDB** (local file) now, **MotherDuck** later |
| Java distance UDFs | DuckDB **`spatial`** extension (`ST_Distance`, `ST_DWithin`) |
| POI category pivots | dbt `PIVOT` / conditional aggregation |
| R rank correlation | **Python** (scipy/pandas) |
| Weka ARFF classification | **Python scikit-learn** |
| one-shot 2018 data | **+ full OSM history**, Berlin Open Data, price/rent, time-series |
| (none — thesis only) | **+ public website** (Evidence.dev static site, free hosting, MotherDuck backend) |
| Berlin-only schema | **city-agnostic model** (`dim_city`, generic `dim_area` hierarchy, per-city adapters) |

## Decisions (confirmed)
- **Trajectory:** thesis reproduction → extended Berlin dataset → **public, multi-city stats website**.
- **Name:** Gentriduck → repo `gentriduck`, folder `~/git_private/gentriduck`, GH Project "Gentriduck".
  Working/codename; **public product branding revisited at the website phase** (scope now spans
  gentrification *and* social development, multi-city).
- **Scope:** Modernize + extend + full OSM POI history + property/rent dimension (**open sources only**)
- **Multi-city:** **Berlin-first, city-agnostic schema from day one** — `dim_city`, a generic
  `dim_area` hierarchy (city › district › subarea, mapping Berlin BZR/PLR/LOR onto generic levels),
  per-city source adapters, and a **parameterized index**. Only Berlin is populated now.
- **Repo:** **public** (open-data/open-source ethos), **everything free** (no paid tools/data), a
  **monorepo** with clear domains — `transform/` (dbt), `ingestion/` (Python), `web/` (site, later),
  `docs/`, `.claude/` (agents/skills). License chosen at bootstrap (e.g. MIT for code; data under
  source licences, OSM = **ODbL with attribution**).
- **Tasks:** GitHub Projects (issues + board via `gh` CLI) = the live backlog
- **Plan/docs home:** this plan becomes `docs/PROJECT_PLAN.md`, alongside `docs/adr/` (ADRs);
  linked from `README.md`. The plan is versioned with the code and evolves via PRs.
- **CI:** **local git hooks only** (pre-commit + pre-push) — no cloud runners, zero cost
- **Warehouse:** Local DuckDB now; MotherDuck (free tier) only later for hosting the UI
- **Python env:** **dedicated, isolated `uv`-managed venv** (`.venv` in the repo). Nothing global;
  `dbt-duckdb` lives only inside it; everything runs via `uv run`; `uv.lock` (cross-platform
  resolution) + `.python-version` committed. Global `dbt`/`dbt-bigquery` untouched. `DBT_PROFILES_DIR=.`
  keeps the profile repo-local.
- **Portable across macOS / Windows / Linux:** the repo is checked out and run on all three. So —
  **no OS-specific paths** in committed files (paths relative to the repo; `~/git_private/gentriduck`
  is only *this* machine's location); **cross-platform tooling only** (`uv`, `duckdb`, `gh` exist on
  all three; prefer pure-Python / HTTP data tools over OS-specific CLIs); a **`.gitattributes`**
  normalizes line endings (`* text=auto eol=lf`); commands run through a **cross-platform task
  runner** (`poethepoet`, invoked as `uv run poe <task>`) instead of a `Makefile`; hooks use the
  **`pre-commit` framework** (not raw shell). Data is never synced via git — each machine rebuilds
  it from open sources via the documented Python ingestion.

---

## Agent team (operating model)

Defined as Claude Code **subagents** in `gentriduck/.claude/agents/*.md` and **skills** in
`gentriduck/.claude/skills/`. Best-practice principles applied throughout: single clear
responsibility per agent, **least-privilege tool grants**, model tier matched to the work,
action-oriented descriptions for delegation, and **independent review context** (the reviewer
never shares the coder's context, so it verifies rather than rubber-stamps).

| Agent | Responsibility | Model | Tools (least privilege) |
|---|---|---|---|
| **project-manager** | **Steers the whole process.** Owns the GitHub Projects backlog & task list, picks the **next-best task** (respecting dependencies/blockers), assigns it to the right agent, runs the coder↔reviewer↔scientist loop, and tracks **capacity** — a maintainer-set **budget** + a loop-count/elapsed-turn **proxy** for Claude usage (it can't read subscription limits directly), and disk GB (DuckDB file + OSM extracts can be many GB). Defers/splits work when capacity is tight and reports status. | sonnet | Read, Grep, Bash (read-only `gh`; **cross-platform disk check via `uv run python -c "shutil.disk_usage"`**, not `df`/`du`), `gh` for issue/board updates, Write (status/plan notes). No code edits. |
| **system-architect** | Owns overall architecture & **tool selection**. Writes ADRs. **Every other agent must consult it (read the relevant ADR / ask) before adopting a new tool, library, or data source** — no "first tool that works". | opus | Read, Grep/Glob, Web search/fetch, Write (docs/ADRs only). No code edits. |
| **data-engineer** *(coder)* | Implements ingestion, dbt models, DuckDB/spatial, tests. | sonnet (opus for hard tasks) | Read, Grep, Edit, Write, Bash, dbt MCP. |
| **data-engineer-reviewer** | **Checks the coder's work** in a fresh context: reviews the diff, runs `dbt build`/tests, checks reconciliation, reports pass/fail + required changes. Does **not** edit — the coder fixes. | opus | Read, Grep, Bash (run tests/git diff). **No Edit/Write.** |
| **geo-data-scientist** | Expert sign-off on **quantitative methodology**: gentrification index validity, spatial methods, OSM temporal pitfalls (tag drift, survivorship, completeness bias), regression/ML soundness (leakage, metrics). | opus | Read, Web search/fetch, Bash (read-only analysis), Write (methodology notes). |
| **gentrification-domain expert** *(added via R-C0 / #72)* | **Urban-sociology / housing-policy authority**: gentrification *theory* fidelity (Dangschat invasion-succession, Döring-Ulbricht, rent-gap, displacement), indicator/outcome selection, the per-city open-data landscape (MSS/EWR/Milieuschutz/Mietspiegel; future cities), and public methodology & **ethics** framing. **Pairs with the geo-data-scientist** (domain-fidelity ↔ statistical-soundness) and co-gates methodology-bearing work. | opus (effort high, thinking) | Read, Grep/Glob, Bash (read-only), Web search/fetch, Write (methodology notes). No production-code edits. |
| **data-analyst** | Consumes marts to produce analyses, maps, narratives, comparisons over time. Owns **website content & UX** (which stats, how framed). | sonnet | Read, Bash (python/duckdb), Write, NotebookEdit. |
| **web-engineer** *(coder, activates Epic G)* | **Builds the frontend/website** per the architect's serving/web ADR (F1): pages, components, maps, theming, build & deploy. | sonnet | Read, Grep, Edit, Write, Bash (node/npm, dev server, build/deploy). |
| **web-engineer-reviewer** *(activates Epic G)* | Independently reviews the web-engineer's diff, runs the build/dev server, checks it renders; reports pass/fail. Mirrors the DE reviewer — **no edits**. | opus | Read, Grep, Bash (build/run). **No Edit/Write.** |

**Two data-engineer skills** (the "2 skills" of the DE role): `de-implement` (coding workflow:
plan → write models/tests → self-check → run) and `de-review` (review workflow: diff read →
test run → reconciliation → structured verdict). The coder uses `de-implement`; the reviewer
uses `de-review`.

**Frontend ownership:** the **web-engineer pair** (coder + reviewer, above) builds the site; the
**data-analyst** owns content/UX; the **architect** gates the framework (F1/ADR-0006). The split
flexes with that choice — with **Evidence.dev** the analyst authors most pages (SQL + markdown) and
the web-engineer does components/theming/deploy; with a **custom web app** the web-engineer pair does
the bulk. These two web agents are defined now but **activate at Epic G** (no frontend work before).

### How a session runs (PM-driven; the coder ↔ reviewer loop)
0. **PM selects work** — `project-manager` reads the board, picks the next-best unblocked task
   (deps satisfied, not ⛔), checks capacity (usage budget + cross-platform disk headroom), and
   moves the issue to *In Progress*. If capacity is tight it defers/splits and says so.
1. **Consult architect** — if the task introduces any new tool/lib/source, read the relevant ADR
   (or request one) first.
2. **Implement** — `data-engineer` does the work on a feature branch.
3. **Review** — `data-engineer-reviewer` independently reviews the diff + runs `uv run dbt build`
   and tests; emits a structured verdict (approve / changes-required with specifics).
4. **Loop** — coder addresses changes; reviewer re-checks until approved.
5. **Methodology gate (binding)** — for methodology-bearing tasks the `geo-data-scientist` **and** (once
   #72 lands) the `gentrification-domain expert` must record a `pass` before merge. The gate is
   **enforced**, not advisory (R-C1/#73): work may not merge with a verdict pending or `concerns`.
6. **Merge & close** — open PR, link the GitHub issue; PM merges once green, updates the board,
   records capacity used, and selects the next task.

**Capacity awareness (PM):** before/after each task the PM logs disk headroom via a cross-platform
check (`shutil.disk_usage`, works on mac/Windows/Linux — DuckDB file + OSM extracts can reach many
GB), estimates remaining Claude usage for the session, and caps how many agent loops run
back-to-back — pausing with a clear status rather than blowing a limit.

### Guardrails & gates (2026 agentic-SWE patterns)
- **Spec before code (lightweight state machine):** each issue carries a short **SPEC** —
  acceptance criteria + **non-goals** + risk flags — agreed before the coder starts. Flow per task:
  `SPEC → IMPLEMENT → VERIFY (CI) → REVIEW → DOCS → MERGE`; an agent may only advance a state when
  the prior gate passes.
- **Auto-format + deterministic verification gate (local, free, cross-platform):** the **`pre-commit`
  framework** —
  - *commit stage (auto-format + lint):* **`sqlfmt`** auto-formats dbt SQL (opinionated, dbt/Jinja-aware),
    **`sqlfluff lint`** enforces lint rules (layout rules disabled so the two don't conflict),
    **`ruff format`** + **`ruff check`** for Python;
  - *push stage (correctness):* `uv run dbt build` + dbt tests.

  Managed by pre-commit so it runs identically on mac/Windows/Linux (no raw bash hook). Auto-format
  means the coder agent never debates style with the reviewer. A gate the coding agent can't talk
  its way past (independent of its own reasoning), with no cloud runner; the reviewer agent (fresh
  context) is the second, human-style layer. *Trade-off accepted:* we forgo a clean-checkout cloud
  CI to stay fully local/free; the push-stage gate + `uv.lock` pinning mitigate "works on my machine" drift.
- **Failure handling:** the coder↔reviewer loop has a **max-iteration cap (e.g. 3)**; on exhaustion
  the PM **escalates to the maintainer (or the scientist)** instead of looping forever. Retries use backoff.
- **Structured hand-offs:** agents exchange JSON, not prose — reviewer *verdict* (`approve|changes`,
  findings[]), scientist *sign-off* (`pass|concerns`, rationale), PM *assignment*. Logged per task.
- **Human-in-the-loop policy:** explicit approval from the maintainer required for — adding any **new
  data source or tool** (must also be free + open), anything published/external, and any unusually
  cost/disk-heavy run flagged by the PM.
- **Parallelism (opt-in):** when epics run concurrently, isolate agents in **git worktrees** to avoid
  file conflicts; default to serial otherwise.

---

## Detailed backlog (each task = one session)

Format: `ID` — title · **owner(s)** · deps · acceptance. Seed each as a GitHub issue with the
epic label. ⛔ = blocked.

**Starting from zero — guided execution.** Nothing exists yet: no repo, and `gh`/`duckdb`/`uv` are
not installed on this machine. Execution is **interactive and step-by-step** — I provide exact
commands and explain each; the maintainer runs/authorizes them. Steps that need your account or a
browser (`gh auth login`, creating the GitHub repo + Project) are done by you with my commands. We
confirm each step worked before moving to the next, so you stay in control and nothing runs unseen.

> **2026-06-19 update — methodology remediation wave.** A PM+architect deep review
> (`docs/assessment/2026-06-19-pm-architect-review.md`) found the live index drifted from the thesis's
> construct (POI activity is treated *as* social status rather than as its *predictor*; the lead-lag —
> the thesis's core finding — was lost), the committed E1/E2 "thesis validation" tests invented
> hypotheses, and Berlin's official **MSS** ground-truth dataset is not ingested. The fixes are tracked
> as **Remediation wave R (#64–#76)** at the end of this backlog and are the **current priority**: hold
> index-dependent work — **D3 (#29), G2 (#38), C6 (#26)** — until **R-A1 (#64)** lands.

### Epic A — Architecture & foundations
- **A1** ADR-0001: stack & **monorepo** architecture (dbt/DuckDB/MotherDuck layering; uv venv;
  profiles; domains `transform/`,`ingestion/`,`web/`,`docs/`,`.claude/`) — designed to host both the
  data platform and the future website. · *architect* · — · layout decision agreed (the ADR *file*
  lands in `docs/adr/` once the repo exists — A4/A10; same for A1b/A2/A3).
- **A1b** ADR-0005: **city-agnostic data model** — `dim_city`, generic `dim_area` hierarchy (Berlin
  BZR/PLR/LOR → generic levels), per-city **source-adapter** pattern, and a **parameterized index**.
  Build Berlin only; prove the seam exists. · *architect (+ geo-data-scientist)* · A1 · ADR +
  conformed-dimension spec committed.
- **A2** ADR-0002: **OSM POI history sourcing** — evaluate **ohsome API** (HeiGIT, purpose-built
  for OSM history aggregates, pure-HTTP → fully cross-platform) vs **full-history PBF** (`.osh.pbf` +
  `osmium time-filter`) vs monthly Geofabrik extract archive; pick the approach for the longitudinal
  POI DB and the time grain (e.g. yearly snapshots). **Weight cross-platform availability** —
  prefer HTTP/pure-Python tools (ohsome, `quackosm`) over OS-specific CLIs so it runs on
  mac/Windows/Linux. · *architect (+ geo-data-scientist consult)* · A1 · ADR with chosen source,
  grain, ingestion approach, and cross-platform note.
- **A3** ADR-0003: Berlin geographies + socio-economic + **open price/rent source strategy** —
  LOR/PLR/BZR geometries & EWR (daten.berlin.de / FIS-Broker WFS); **open** price/rent sources only
  (Bodenrichtwerte/Gutachterausschuss, Mietspiegel, Wohnungsmarktbericht). Every source must be free
  + openly licensed; record licences. · *architect* · A1 · ADR with source list + licences.
- **A4** Bootstrap (first executable step; this machine, macOS): install `gh duckdb uv` (Homebrew
  here; standalone `uv` installer / winget / package managers documented for other OSes in A11);
  `gh auth login`; `mkdir -p ~/git_private`; scaffold the monorepo per A1's layout decision + choose
  a LICENSE; `gh repo create gentriduck --public`; create GitHub Project "Gentriduck" + labels
  (`epic-a`…`epic-h`, `infra`,`data`,`dbt`,`ml`,`ui`); seed this backlog as issues. · *data-engineer
  pair* · A1 (layout decision) · `gh repo view` + `gh project list` show repo & board with backlog.
- **A5** Dedicated env + dbt scaffold: `uv init`/`uv venv`/`uv sync` (deps: `dbt-duckdb`, `duckdb`,
  `pandas`, `scikit-learn`, `scipy`, `quackosm`, optional `geopandas`) at repo root; the dbt project
  lives in **`transform/`** (`dbt_project.yml`, repo-local `profiles.yml` with duckdb +
  `extensions:[spatial]`, `packages.yml` → `dbt_utils`); `poe` tasks invoke dbt with
  `--project-dir transform`. · *data-engineer pair* · A4 · `uv run poe build` (= `dbt debug/build`) passes.
- **A6** Stand up the **agent team**: write `.claude/agents/*.md` (project-manager, system-architect,
  data-engineer, data-engineer-reviewer, geo-data-scientist, data-analyst; **web-engineer + reviewer
  added at Epic G**) with scoped tools +
  pinned models, the two DE skills (`de-implement`, `de-review`) in `.claude/skills/`, structured
  hand-off schemas (reviewer verdict, scientist sign-off), and a `CLAUDE.md` encoding the
  conventions (consult-architect-before-new-tools, coder↔reviewer loop + iteration cap/escalation,
  PM owns board & capacity). · *architect (design) + data-engineer pair (author)* · A4 ·
  agents/skills load and the PM can run one end-to-end loop on a trivial task.
- **A7** **Auto-format gate & code quality (free, no cloud, cross-platform):** add dev deps
  (`sqlfmt`, `sqlfluff`, `ruff`, `pre-commit`) to a `dev` group; `pre-commit` config — commit stage
  **auto-formats** (`sqlfmt` for SQL, `ruff format` for Python) + lints (`sqlfluff lint` with layout
  rules off, `ruff check`), push stage (`uv run dbt build` + dbt tests); `sqlfluff`/`sqlfmt` config
  in `pyproject.toml`/`.sqlfluff`; plus **`.gitattributes`** (`* text=auto eol=lf`) so line endings
  are identical on all OSes. · *data-engineer pair* · A5 · committing reformats SQL/Python
  automatically; a failing build/lint blocks the push on mac/Windows/Linux alike.
- **A8** **Secrets & data-storage policy:** `.env` (gitignored) for any future tokens (e.g. later
  `motherduck_token`); **large/raw** artefacts (OSM PBF/history, `.duckdb`) **gitignored** with a
  documented download + manifest/hash for reproducibility (DVC optional). **Small golden/reference
  files** (`result_full_*` CSVs, `poi_mapping`) **are committed** (under `seeds/`/`reference/`) so the
  reconciliation test is reproducible. Since the repo is public, the gate + `.gitignore` must
  guarantee **no large/binary/secret files are ever committed**. · *architect (policy) + DE pair* · A5
  · no secrets/large files tracked; goldens committed; `README` documents how to rebuild data from open sources.
- **A9** ADR-0004 **data governance**: enable **dbt contracts** on marts, **source freshness**,
  `dbt docs`/lineage, and a **single governed definition of the gentrification index** (semantic/
  metric spec) — the core thesis definition lives in one place. · *architect (+ geo-data-scientist)* ·
  A1 · ADR + index spec committed; contracts enforced in the local gate.
- **A10** **Project docs home:** port this plan to `docs/PROJECT_PLAN.md`, create `docs/adr/`
  (ADR-0001+ land here), and link both from `README.md`; the GitHub Project board stays the live
  backlog. · *data-engineer pair* · A4 · plan + ADR index visible in the repo and linked from README.
- **A11** **Cross-platform setup:** a `poethepoet` task set in `pyproject.toml` (`setup`, `ingest`,
  `build`, `test`, `fmt` = sqlfmt + ruff format, `lint`, `docs`) run as `uv run poe <task>` —
  identical commands on every OS;
  a README **"Setup on macOS / Windows / Linux"** section (per-OS install of `uv`/`gh`/`duckdb`;
  on Windows the venv activates the same via `uv run`). · *architect (choices) + DE pair (author)* ·
  A5 · a fresh clone bootstraps and runs `uv run poe build` on any of the three OSes from the README.

### Epic B — Revive the concept & check the 2018 findings still hold
*Goal: directional revival, not exact reproduction. Rebuild the index/hypotheses with available open
data and see whether the paper's conclusions reproduce; exact 2018 inputs are not required.*
- **B0** **Artifact inventory & pragmatic input sourcing** (do first): catalogue what the thesis repo
  provides (pipeline SQL `system/*.sql`, `poi_mapping`, outputs `result_full_*`, `ready_4_ML`) vs
  what's missing (raw OSM/EWR). Decide inputs **pragmatically** — current/available open data is fine;
  reconstructing exact 2018 vintages is optional. · *architect + DE pair* · B1 · input map + chosen approach.
- **B1** Clone original repo read-only to `/tmp`; copy `data/**` → `data/raw/`, `system/*.sql` →
  `reference/`; commit `result_full_*` + `poi_mapping` as **reference** (to compare findings against). · *DE pair* · A5.
- **B2** Staging models: `stg_osm_poi`, `stg_lor` (BZR/PLR), `stg_ewr` (inputs per B0); map Berlin
  areas onto the conformed `dim_city`/`dim_area` from ADR-0005 (Berlin = first `city`). · *DE pair* · B0,A1b.
- **B3** Intermediate: `int_poi_mapping` (poi_mapping seed), `int_poi_pivot` (`PIVOT`),
  `int_poi_distance` (replace Java UDF with `ST_Distance`/`ST_DWithin`). · *DE pair* · B2.
- **B4** Marts: `gentrification_index_bzr|plr`, hypotheses `h1`…`h3c`. · *DE pair* · B3.
- **B5** **Findings check (directional):** do H1–H3c and key rankings/correlations agree with the
  paper? Compare against the reference outputs qualitatively — exact match not required; document
  agreement and divergences. · *DE pair (+ scientist)* · B4.
- **B6** Methodology sign-off: **do the original findings still hold?** Note what reproduced, what
  diverged, and likely reasons (data vintage, methods). · *geo-data-scientist* · B5.

### Epic C — Longitudinal OSM POI development database (the "full history")
- **C1** Implement OSM history ingestion per ADR-0002 → time-sliced POI snapshots into DuckDB.
  · *DE pair* · A2,A5 · snapshots land for the agreed time range.
- **C2** Staging + **harmonize POI taxonomy across time** (OSM tag-schema drift). · *DE pair (+ scientist consult)* · C1.
- **C3** Fact `poi_development` (POI counts/categories per area per time). · *DE pair* · C2.
  *Pre-requisite — LOR geometry ingestion + dual-vintage spatial join (issue #22):*
  OSM parquets have `area_code = NULL`; POIs must be spatially assigned to PLR before aggregation.
  **Geometry source (fully programmatic — no manual download):** GDI Berlin OGC WFS, CC BY 3.0 DE.
  - Pre-2021: `https://gdi.berlin.de/services/wfs/lor_2019` · feature type `lor_2019:a_lor_plr_2019` · 448 PLRs
  - LOR 2021: `https://gdi.berlin.de/services/wfs/lor_2021` · feature type `lor_2021:a_lor_plr_2021` · 542 PLRs
  - Both serve `outputFormat=application/json`; `plr_id` attribute = `area_code` (direct match); default CRS EPSG:25833 → transform to WGS84 for join.
  Three sub-steps: **(C3-geo)** fetch both vintages via WFS GeoJSON → write to
  `data/raw/berlin/lor/{pre2021,2021}.parquet`; **(C3-join)** `ST_Within(ST_Point(lon, lat), plr_geometry)`
  per snapshot year against the correct vintage (snapshots ≤2020 → pre-2021; ≥2021 → LOR 2021) —
  avoids a count discontinuity at the 2021 reform; **(C3-fact)** aggregate to
  `fct_poi_development(area_code, area_vintage, poi_category, snapshot_year, poi_count)`.
- **C3b** **Socio-economic time series:** ingest multi-year **EWR** (and later price/rent) per area,
  conformed to `dim_area`/`dim_city` + a `year` grain — so the over-time index reflects social change,
  not just POIs. (Berlin publishes EWR by LOR annually.) · *DE pair (+ scientist on indicator choice)* · C1.
- **C3b-fix** *(bug #50)* Fix EWR ingestion data-quality issues before C4 can use the series:
  (1) German decimal separator (`,`) in 2012/2013/2015 CSVs corrupts all numeric parsing → 0.0;
  (2) `E_A` (foreigners) and `MH_E` (migration background) are absent from the Matrix CSV —
  they live in a companion publication (`EWR<YYYY>12H_Matrix.csv`); needs separate ingestion;
  (3) grouped under-18 bins renamed `E_U1` → `E_EU1` in 2012+, breaking `age_under18_share`
  and `mean_age_years`. · *DE pair* · C3b.
- **C3-dedup** *(bug #59)* Fix `int_osm_poi_plr`: `ST_Within` spatial join has no deduplication —
  POIs that fall on PLR boundaries fan-out into multiple rows and break the unique test on the model.
  Add a `QUALIFY ROW_NUMBER() OVER (PARTITION BY poi_id ORDER BY plr_id)` (or equivalent) dedup step
  so each POI maps to at most one PLR. **Must be resolved before C4** — `fct_poi_development`
  aggregation double-counts boundary POIs without this fix. · *DE pair* · C3,C3b-fix.
- **C3-ref** *(refactor #60)* `int_osm_poi_plr` reads LOR geometry via raw parquet file paths instead of
  `ref('stg_berlin_lor')`. Swap to the dbt ref so lineage is captured and the model is portable.
  Lower-priority structural cleanup; can follow C3-dedup as it touches the same model. · *DE pair* · C3-dedup.
- **C4** Time-series index + `gentrification_change` (delta + rank movement over time), combining POI
  development **and** the socio-economic series. · *DE pair* · C3,C3b,C3b-fix,C3-dedup,D1-ewr-fix1,D1-ewr-fix2,B4.
- **C5** **OSM completeness-bias control:** POI counts rise partly because OSM *coverage* grew, not
   the neighborhood — normalize (e.g. POI category share, or counts against an overall-coverage
   denominator from ohsome) so growth reflects real change. Add data-quality tests for anomalous
   jumps. · *DE pair (+ geo-data-scientist designs the correction)* · C3.
- **C6** Temporal methodology validation & sign-off (tag drift, survivorship, completeness after C5;
   spot-check a known gentrifying Kiez e.g. Reuterkiez). · *geo-data-scientist* · C4,C5.

### Epic D — Property & rent dimension (open sources only)
- **D1** Integrate **open** price/rent sources (Bodenrichtwerte/Gutachterausschuss, Mietspiegel,
  Wohnungsmarktbericht) as staging→mart dimensions, each with recorded licence. · *DE pair* · A3.
- **D1b** Discover and ingest Kauffälle (property transaction) WFS endpoint (#53). · *DE pair* · A3.
- **D1c** Strassenverzeichnis → PLR geocoding: parse Mietspiegel street-index PDFs (2017–2026),
  join to LOR PLR polygons, build address→PLR crosswalk for area-level rent lookups (#56).
  · *DE pair (+ geo-data-scientist)* · D1.
- **D1-ewr-fix1** *(bug #57)* Fix `_col_sum_numeric fillna(0)` in EWR ingestion: applying `fillna(0)`
  before the column sum runs corrupts suppression logic — suppressed cells (sentinel values) are zeroed
  before the numerator/denominator are computed, producing wrong indicator shares instead of NaN.
  Fix: propagate NaN through the sum; only fill after the share is computed (or leave suppressed
  rows as NaN). **Must be fixed before D2 and C4** — both consume `int_ewr_series` derived
  indicator shares. · *DE pair* · C3b-fix.
- **D1-ewr-fix2** *(bug #58)* Fix `residents_total` stored as `0.0` instead of `NaN` for suppressed
  PLRs in the EWR ingestion. Suppressed PLRs should carry `NaN` (not zero) for `residents_total`
  so they are excluded from aggregations rather than dragging means and totals down. Fix alongside
  D1-ewr-fix1 (same ingestion module). · *DE pair* · C3b-fix.
- **D2** Source-completeness/coverage check on the price/rent data (years/areas available, gaps). ·
  *DE pair (+ geo-data-scientist)* · D1.
- **D3** Extend index with the price/rent dimension. · *DE pair (+ scientist sign-off)* · D1,D2.

### Epic E — Analysis & ML (replace R + Weka)
- **E1** H1–H3c regressions in Python (scipy/statsmodels), compare to thesis. · *data-analyst (+ scientist)* · B4.
- **E2** scikit-learn classification replacing Weka; report AUC / F-weighted vs original logs. · *data-analyst (+ scientist)* · B4.
- **E3** Analytical narratives + maps + over-time comparisons. · *data-analyst* · C4 (D3 if available).

### Epic F — Serving layer + MotherDuck (later)
- **F1** ADR-0006 **serving & hosting stack**: how marts reach the web — static parquet/JSON vs
  MotherDuck-backed queries — and free hosting (GitHub/Cloudflare Pages). · *architect* · A9.
- **F2** Switch dbt target to MotherDuck (`md:` profile, `motherduck_token` from `.env`); models run
  unchanged; publish the serving artefacts per F1. · *DE pair* · F1.
- **F3** ADR-0007 **data refresh / orchestration**: `uv run poe refresh` (manual end-to-end rebuild)
  now; a free scheduler path noted for later (the site is a *living* dataset). · *architect* · F1.

### Epic G — Public website (the product)
- **G0** Author the **web-engineer + web-engineer-reviewer** agent definitions (scoped tools, pinned
  models) per the F1 stack. · *architect (design) + data-engineer pair (author)* · F1.
- **G1** Build the Berlin stats **website** (Evidence.dev per F1): index, time-series, maps, area
  drill-down. · *web-engineer pair (+ data-analyst for UX)* · F2,G0.
- **G2** Public **methodology page** — transparent, versioned write-up of the governed index (A9):
  inputs, the OSM completeness-bias correction (C5), limitations. · *geo-data-scientist + data-analyst* · A9,C5.
- **G3** **Attribution & licensing** page (OSM ODbL, Berlin data licenses) shown on the site, and a
  **privacy/ethics** statement (aggregate-only, no PII; socially sensitive topic). · *architect + data-analyst* · G1.

### Epic H — Multi-city expansion (future)
- **H1** Onboard a **second city** purely via the ADR-0005 adapter pattern (new `dim_city` row +
  source adapters + index params; no model rewrite) — validates the city-agnostic seam. · *DE pair
  (+ scientist for local methodology)* · A1b, mature Berlin pipeline.

### Remediation wave R — Methodology re-grounding & process hardening (2026-06-19 review)
*Triggered by the PM+architect deep review (`docs/assessment/2026-06-19-pm-architect-review.md`; full
SPECs in `docs/assessment/tickets/`). The review found the live index conflates POI activity with social
status, the E1/E2 validation tests invented hypotheses, the official **MSS** ground truth is missing, and
the methodology gate is advisory (it leaked in PR #62). This wave re-grounds the methodology and makes the
gate binding, and **upgrades the conceptual model** beyond 2018 (multi-dimensional typology, longitudinal
stages, spatial diffusion + proper spatial inference). **Order:** R-C0 + R-C1 + R-C2 → R-A7 (ADR-0008) →
R-A1 → R-A2 + R-A5 → R-A3 → R-A4 → R-A9 → R-A8 → R-B2 → R-B1; R-A6, R-C3, R-C4 as capacity allows. Hold
D3(#29)/G2(#38)/C6(#26) until R-A1 lands.*

**R-A — Methodology / index validity**
- **R-A1** Re-ground the index: separate POI **predictors** from the **social** status/dynamik outcome;
  restore the lead-lag (thesis core finding); justify weights. · *geo-data-scientist + gentrification-domain
  expert (spec) → DE pair* · C4, R-A3, R-A4 · governed `docs/methodology/index-definition.md` signed off
  (POI = features, outcome = social status; lead-lag exposed; weights justified). · **#64** *(keystone)*
- **R-A2** Fix & re-run E1/E2 against the real H1–H3c (lead-lag, POI→MSS); rewrite the findings docs. ·
  *DE pair + geo-DS + domain expert* · R-A1 (or golden), R-C2 · directions cited from the thesis; POI
  features used; lead-lag + spatial-autocorrelation caveat reported. · **#65**
- **R-A3** Ingest Berlin **MSS** (Monitoring Soziale Stadtentwicklung) Status/Dynamik index — ground truth
  + social outcome. · *architect (ADR) → DE pair* · A3 · `stg_berlin_mss` builds with tests; editions
  ~2013–2025; reconciles to published counts. · **#66**
- **R-A4** Add socio-economic-status indicators (transfer recipients / SGB II / unemployment / income). ·
  *architect (ADR) → DE pair* · R-A3 · per-PLR SES series staged; wired to the R-A1 outcome with documented
  signs. · **#67**
- **R-A5** EWR indicator-semantics & sign audit (DAU5/DAU10, residence-duration, age band) vs. the official
  codebook. · *geo-data-scientist* · C3b · `docs/methodology/indicator-semantics.md`; sign corrections
  applied. · **#68** *(quick win)*
- **R-A6** Reproduce distance-weighting in the **live** pipeline + modern spatial methods (distance-decay
  with mass conservation, Getis-Ord Gi* hotspots, MAUP scale-sensitivity). · *architect (ADR: H3/PySAL) →
  DE pair; geo-DS + domain sign-off* · C3, R-A1, #51 · live `distance_weighted` variant + Gi* hotspots +
  MAUP doc. · **#69**
- **R-A7** **ADR-0008 — multi-dimensional conceptual model:** gentrification as a **typology** over four
  dimensions (social status & change, commercial/amenity, real-estate/rent, displacement), not a single
  z-score blend; mandates a sensitivity analysis. · *architect + domain expert + geo-DS* · A9 (ADR-0004),
  R-A3, R-A4 · ADR-0008 merged; R-A1 implements its first cut. · **#77** *(conceptual keystone)*
- **R-A8** **Longitudinal trajectory & stage model (2008–2024):** classify each PLR's path into
  invasion-succession stages (realizes the thesis's "phase one" hint). · *geo-DS + domain (spec) →
  DE/analyst* · R-A7, R-A1, R-A3, R-B2 · `fct_gentrification_trajectory` + per-year stage, validated vs
  MSS/hotspots. · **#78**
- **R-A9** **Spatial-dynamic diffusion + spatial-econometric inference:** spatial weights, Moran's I/LISA,
  spatial-lag/error models (`spreg`), neighbour-diffusion feature — fixes the ignored spatial autocorrelation
  *and* adds the frontier mechanism. · *geo-DS (+ domain)* · R-A6, R-A2, R-A8 · spatial inference used for
  all claims; diffusion feature available. · **#79**
- **R-A10** *(deferred — tracked)* Causal / early-warning design (DiD on Milieuschutz designation,
  event-study, out-of-time validation) — formalizes the thesis's lead-lag (finding W3). Scheduled after
  R-A8/R-A9. · *geo-DS + domain expert* · R-A8, R-A9, R-B1 · early-warning score + ≥1 quasi-experiment with
  documented identifying assumptions. · **#80**

**R-B — Data / product white-spots**
- **R-B1** Displacement & affordability dimension (Milieuschutzgebiete, rent-burden, turnover). ·
  *architect (ADR) → DE pair (+ domain expert)* · D1/D3, R-A4 · displacement sub-index wired per R-A1;
  limits documented. · **#70**
- **R-B2** Ground-truth back-test harness: validate the live index vs. MSS classes & known hotspots
  (Reuterkiez, Prenzlauer Berg). · *geo-DS + data-analyst* · R-A1, R-A3 · ground-truth seed; agreement /
  hotspot-recall thresholds; runs under the gate. · **#71**

**R-C — Agent process hardening** *(extends Epic A foundations)*
- **R-C0** Author the **gentrification-domain expert** agent (urban-sociology/housing-policy), paired with
  the geo-DS. · *architect* · A6 · agent merged (opus, effort high, no code edits); CLAUDE.md/PROJECT_PLAN
  roster + dual gate updated. · **#72**
- **R-C1** Enforce the methodology gate — no merge of methodology-bearing work with a geo-DS/domain verdict
  pending or `concerns`. · *architect + PM* · R-C0 · "methodology-bearing" defined (label + path globs);
  mechanical pre-merge check blocks a missing `pass`; PM step de-parenthesised. · **#73**
- **R-C2** Grounding rule — methodology choices must cite the thesis/literature they operationalize;
  reviewer checks it. · *architect* · A6 · `de-implement`/`de-review` + CLAUDE.md updated; demonstrated on
  R-A2. · **#74**
- **R-C3** Bring `analysis/*.py` under the gate — deterministic, tested, run in `poe build`/CI (incl. a
  leakage guard). · *DE pair* · A7 · `uv run poe analysis` reproducible; analysis tests in the gate. · **#75**
- **R-C4** Structured machine-readable handoff + PM board auto-sync at task close. · *project-manager* · A6
  · `docs/handoff/state.json` schema; PM reads at start / updates board + state at close. · **#76**

**Thesis critical-assessment coverage.** The honest critical read of the 2018 work lives in
`docs/assessment/2018-thesis-critical-assessment.md` (a critical assessment only — **no grade**). Every
weakness maps to a ticket: **W1** spatial autocorrelation → #79/#65 · **W2** overfitting/leakage → #65/#75 ·
**W3** causal/temporal → #78/#64 + #80 (deferred) · **W4** OSM completeness bias → C5 (done)/#69 ·
**W5** ad-hoc weights/categories (no sensitivity) → #77/#64/#69 · **conceptual flatness** → #77/#78.

---

## Verification
- **A:** ADRs (incl. governance) committed; `uv run dbt debug` passes; the **push-stage gate blocks a
  failing build/lint**; no secrets/large files tracked; public repo + GitHub Project show the backlog;
  a fresh clone runs `uv run poe build` per the README on **mac/Windows/Linux**.
- **B:** `uv run dbt build` green; the index + H1–H3c **behave as the paper reports (directional
  agreement)**; agreement and divergences documented (exact match not required).
- **C:** `poi_development` populated across the time range; `gentrification_change` non-empty;
  known gentrifying Kiez trends as expected; scientist sign-off recorded.
- **D:** open price/rent dimensions build; coverage/gaps documented; index extends cleanly.
- **E:** regression + classifier metrics produced and comparable to the 2018 logs.
- **F:** `dbt build --target md` succeeds; serving artefacts published; `poe refresh` rebuilds end-to-end.
- **G:** public website renders the Berlin index/time-series/maps, with methodology + attribution +
  privacy pages live; hosted free.
- **H (future):** a second city appears on the site via adapters only — no changes to core models.
- **R (2026-06-19 review):** governed index definition signed off (POI = predictors, social-status outcome,
  lead-lag restored); MSS ingested and the live index back-tests against it; E1/E2 re-run with cited
  hypotheses; the methodology gate mechanically blocks un-signed-off methodology work; and the conceptual
  model is multi-dimensional (ADR-0008) with longitudinal stages and spatially-robust inference.

## Notes / open items
- Original thesis repo is **read-only** — only cloned, never modified.
- **B is a concept-revival check, not a strict gate.** The aim is whether the 2018 findings still
  hold *directionally* — don't block on exact numbers. The thesis repo ships pipeline SQL + outputs,
  not raw inputs, so use available open data (B0) and document divergences (data vintage / methods),
  then move on to the extension (C) — which is where the interesting "what changed over time" lives.
- **OSM history grain & source** is an explicit architect decision (A2), not pre-committed here.
- **Free + open only:** every tool and data source must be free and openly licensed; no proprietary
  or internal data anywhere. New sources/tools need the maintainer's OK (and must be free).
- On approval the order is: **A1 layout decision → A4 (repo + LICENSE + board) → A5 (dedicated env)**,
  commit the **A1/A1b ADRs**, then **A6–A11** (agent team, local gate, secrets/data policy with
  goldens, governance, docs home, cross-platform setup) so the guarded coder↔reviewer loop is usable
  before any feature work. A2/A3 ADRs are written just-in-time before Epics C/D.
- **Portability is a first-class constraint:** checked out and run on macOS, Windows, and Linux —
  cross-platform tooling only, `.gitattributes` for line endings, `poe` task runner instead of Make,
  `pre-commit` instead of shell hooks, and data rebuilt per-machine from open sources (never git-synced).
- **Product trajectory:** thesis reproduction (B) → extended Berlin data (C–E) → serving + website
  (F–G) → multi-city (H). **Design for the future, build Berlin first** — the city-agnostic seam
  (A1b) and monorepo (A1) are the only up-front investments; everything else stays Berlin-scoped
  until the website is solid.
- **Public-product trust:** because statistics are published, the methodology (G2), attribution/
  licensing (G3) and privacy/ethics stance are first-class deliverables, not afterthoughts.
- **Right-sizing:** this is a personal project, so we adopt the high-value 2026 practices (CI,
  contracts, spec-gates, structured hand-offs, completeness control) but skip enterprise overhead
  (A2A protocols, Monte-Carlo-grade observability, mandatory worktrees). Worktrees stay opt-in.

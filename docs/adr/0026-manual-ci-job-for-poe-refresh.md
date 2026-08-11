# ADR-0026: Manually-triggered CI job (`workflow_dispatch`) for `poe refresh`

- **Status:** **Proposed (2026-08-01).** *Not accepted.* This is a **new-infrastructure/policy
  decision** under CLAUDE.md golden rule 2 and requires the **maintainer's explicit sign-off**
  before it may move to Accepted or be implemented. The architect does **not** self-accept it: it
  is a narrow but real exception to ADR-0001's deliberate local-gate / no-cloud-CI posture, and it
  spends a shared (if free) resource — GitHub Actions runners on a public repo. See
  *Maintainer decision needed* at the end.
- **Date:** 2026-08-01 (drafted)
- **Deciders:** system-architect (author); **maintainer (accepts/rejects)**. If accepted,
  `data-engineer` implements the workflow file per this ADR and `data-engineer-reviewer` verifies.
- **Issue:** #283 (split out of #248's architect review, item 4).
- **Extends:** ADR-0015 §3 (which recorded a GitHub Actions path as the future cadence mechanism
  but deliberately left the runner-budget and the "how does output reach `develop`" questions out
  of scope, and whose 2026-07-12 amendment explicitly deferred exactly this decision to its own
  ADR + maintainer approval). **Narrow exception to** ADR-0001 (local-only quality gate).
  **Bounded by** ADR-0002 (login-gated OSM stays out), ADR-0011 (human-gated `main`,
  reviewed integration into `develop`), ADR-0012 + Amendment A (manual, maintainer-run deploy).
  Changes no accepted ADR — ADRs are append-only.
- **Grounding (R-C2):** not methodology-bearing. This is a process/ops decision; it touches no
  R-C1 path (no indicator weights, normalization, or spatial method), so no dual methodology
  sign-off is required. It does *not* change what `poe refresh` computes — only *where* it may run.

---

## Context

`poe refresh` (ADR-0015) is the one-command end-to-end data rebuild:

```
verify-data → deps → ingest → build → oa-getis-ord → materialize-oa-getis-ord
            → export-serving → export-area-geojson
```

Measured on the weekly release path (#248), a full run costs **~90 minutes**, dominated by
`ingest`'s network fetches from external open-data endpoints (Berlin WFS layers with hundreds of
thousands of features, Hamburg sources), not by `dbt build` (~5 min). #251 cut the waste
(per-source failure isolation, skip-if-fresh, WFS circuit breaker), but a genuine
new-vintage refresh still occupies a **live devmode PM session** for well over an hour, during
which the PM does no board work and the maintainer's machine is tied up. That is the pain #283
proposes to relieve: run the long, boring, deterministic, network-bound part on a runner.

The tension is that ADR-0001 chose a **local-only quality gate** on purpose ("Local-only (no cloud
runners): the `pre-commit` framework auto-formats + lints at commit … and runs `dbt build` + tests
at push"), accepting the consequence "No cloud CI means we rely on the push-stage gate + `uv.lock`
pinning to catch drift; accepted to stay fully free/local." That posture is about **where the
correctness gate lives** and about not acquiring a paid/opaque dependency. It is not a prohibition
on ever touching GitHub Actions: the repo already lives on GitHub, Actions is free for public
repos, and ADR-0015 §3 already named a GitHub Actions workflow as the *accepted future mechanism*
for cadence — it just declined to wire one without answering budget + publication questions. This
ADR answers those questions for the **manual** case only.

Two facts constrain the design sharply:

1. **Every artefact `poe refresh` produces is gitignored.** `.gitignore` excludes `data/raw/`,
   `data/cache/`, `data/analysis/`, `*.parquet`, `*.duckdb`, and `web/static/geo/`. ADR-0001's
   "Large/raw data and the `.duckdb` file are never committed; each machine rebuilds from open
   sources" is a load-bearing rule. So a CI refresh job **has nothing legitimate to commit**.
2. **Nothing in the repo is deployed from CI.** ADR-0012 Amendment A: the public site is
   redeployed **by the maintainer**, locally, right after each weekly `develop → main` merge, via
   `ops/deploy-gh-pages.sh`. There is no auto-deploy anywhere and this ADR does not create one.

## Decision

### 1. Add exactly one workflow, triggered **only** by `workflow_dispatch`

- Trigger: **`on: workflow_dispatch:` and nothing else.** No `schedule`/cron, no `push`, no
  `pull_request`, no `repository_dispatch`, no `workflow_call`. A human (maintainer, or the PM
  acting on the maintainer's instruction) kicks it off from the Actions tab or `gh workflow run`.
  If a *scheduled* cadence is ever wanted, that is a separate decision requiring a new ADR — the
  open-data sources here move on annual-to-biennial cycles, so no schedule is justified (ADR-0015 §3).
- Runner: **`ubuntu-latest`** (GitHub-hosted, standard). Setup is `astral-sh/setup-uv` (or plain
  `pip install uv`) + `uv sync`, then `uv run poe refresh`. No custom images, no Docker, no
  third-party action beyond the pinned-by-SHA official/`astral-sh` setup actions.
- Optional inputs (nice-to-have, not required): a `--only SOURCE_ID` passthrough and a `force`
  boolean mapping to `FORCE_REFRESH=1`, both already supported by `ingestion/run_ingest.py` (#251).

### 2. Scope: **run `poe refresh`, publish the artefacts for human review, nothing else**

The job **does**:

- run `uv run poe refresh` (which begins with the ADR-0016 non-strict `verify-data` pre-flight);
- print the `run_ingest.py` per-source summary table and the drift summary into the job log;
- upload the refreshed artefacts (`data/serving/**` parquet, `web/static/geo/**` GeoJSON, and the
  ingest/drift summary) as a **workflow artifact** via `actions/upload-artifact`;
- fail the job iff `poe refresh` exits non-zero (i.e. iff a #251 `BLOCKING_SOURCE_IDS` source
  failed, or `dbt build` failed) — so a flaky leaf source degrades gracefully exactly as it does
  locally.

The job **does not**:

- **commit anything** to any branch (see §3);
- run the **web build / Evidence / npm** (ADR-0015 §2 keeps `refresh` Node-free; ADR-0012 A keeps
  deploy manual and maintainer-run) — the site build/deploy pipeline stays **completely separate**
  from this job and is unchanged by this ADR;
- run `ingest-osm-berlin` / `ingest-osm-hamburg` (ADR-0002: login-gated Geofabrik internal
  download; already excluded from `poe ingest`, and the reason no secret is needed — see §4);
- run `poe analysis` / `poe backtest` (ADR-0015 §2: one-off validation, not site-serving);
- become the correctness gate. **ADR-0001's local push-stage `dbt build` + pre-commit remain the
  authoritative quality gate.** This job is a *convenience compute lane*, not CI-as-gatekeeper, and
  a green run here is never a substitute for the local gate or for the R-C1 methodology gate.

### 3. How output reaches a human: **artifact download, never a commit** (ADR-0011-safe)

Because every refresh output is gitignored (ADR-0001), the job **must not** push a branch, must not
open a PR, must not commit to `develop`, and must not touch `main`. The publication path is:

1. Job uploads a **workflow artifact** (retention: 7 days; well inside free-tier storage since the
   published marts are single-digit MB per ADR-0012 §5 — do **not** upload `data/raw/`, which is
   large and re-fetchable).
2. A human (maintainer or PM) **downloads** the artifact locally, unzips into `data/serving/` +
   `web/static/geo/`, eyeballs the drift summary, and proceeds with the normal local release
   routine (`poe web-build`, weekly `develop → main` PR, `ops/deploy-gh-pages.sh`).
3. Nothing enters git as a result of the job. Therefore ADR-0011's model is untouched: the only way
   code or docs reach `develop` is still a reviewed feature branch integrated by the PM, and the
   only way anything reaches `main` is still the weekly maintainer-merged PR.

**Explicitly rejected sub-option:** having the job commit a "serving snapshot" to a
`ci/refresh-YYYY-MM-DD` branch and open a PR. This would (a) contradict ADR-0001's never-commit-data
rule, (b) put multi-MB binaries into git history permanently, and (c) create a bot-authored branch
in a repo whose whole governance model is human/agent-authored, reviewed branches. If the maintainer
later wants a git-visible trail, the **only** thing worth committing is the small ADR-0016
**drift manifest** — and that should come via a normal `data-engineer` feature branch, not from CI.

### 4. Secrets and permission footprint: **zero secrets, read-only token**

- **No repository secrets are configured or referenced.** This is a direct consequence of keeping
  ADR-0002's login-gated Geofabrik OSM ingestion out of scope: everything `poe refresh` fetches is
  public open data over plain HTTPS (the hosts enumerated in `docs/method/egress-hosts.md`).
- **`permissions: contents: read`** at workflow level (the least the job truly needs: checkout the
  repo). `poe refresh` writes only to gitignored paths and pushes nothing, so no `contents: write`,
  no `pull-requests: write`, no `packages`, no `id-token`. `actions/upload-artifact` works under
  the default read token.
- No environment, no deployment target, no OIDC federation, no third-party service.
- Pin all actions by commit SHA (supply-chain hygiene; the runner has network access to open-data
  hosts by design, so the action set should be small and pinned).

### 5. Runner-minutes budget: free, with named caveats

- **GitHub Actions is free with unlimited minutes for public repositories on standard
  GitHub-hosted runners.** Gentriduck is a public repo, so a ~90-minute `ubuntu-latest` run costs
  **no money and consumes no included-minutes quota**. This is the factual basis for calling the
  proposal golden-rule-1-compliant. State it explicitly rather than assuming it.
- Caveats to accept knowingly:
  - **Job timeout:** a single job is capped at **6 hours**; set an explicit
    `timeout-minutes: 180` so a hung WFS fetch can't idle for hours.
  - **Concurrency:** free-tier accounts have a modest cap on concurrent jobs (order of ~20 on
    standard runners). One manual job is immaterial, but add
    `concurrency: { group: poe-refresh, cancel-in-progress: false }` so two humans can't launch
    overlapping refreshes.
  - **Artifact storage:** artifacts count against storage, not minutes; keep retention short (7
    days) and upload only `data/serving/` + `web/static/geo/` (single-digit MB), never `data/raw/`.
  - **Policy risk:** "unlimited for public repos" is GitHub's policy, not a contract; if it ever
    changes, the job is deleted and we fall back to the status quo at zero cost. Nothing depends
    on it.
  - **Cross-platform:** the job runs Linux only. That is fine because the **authoritative** way to
    run `poe refresh` remains the local, cross-platform `uv run poe refresh` on macOS/Windows/Linux.
    CI must never become the only place the pipeline is known to work.

## Consequences

**If accepted:**

- A 90-minute refresh stops consuming a live devmode PM session and stops occupying the
  maintainer's machine; the PM keeps working the board while the runner grinds.
- The repo gains its **first** cloud-CI surface — a real, if narrow, softening of ADR-0001's
  "no cloud runners" posture. Mitigated by scope: it is a *compute lane*, not a gate, and deleting
  the workflow file restores the ADR-0001 status quo exactly, with no data or history to unwind.
- A refresh becomes reproducible **from a clean machine** on every run, which is a genuine
  correctness benefit: it continuously proves a fresh checkout can rebuild from open sources
  (ADR-0001's core claim), catching "works only on the maintainer's laptop" drift.
- Fetch traffic to public open-data endpoints now originates from GitHub IPs. Volume is unchanged
  (manual trigger, skip-if-fresh), but be a good citizen: manual-only, no schedule, no matrix.
- Slight duplication of environment knowledge (`uv sync` steps) between `ops/` docs and a workflow
  file; kept minimal by shelling out to the existing `poe` tasks rather than re-listing steps.

**If rejected:** nothing changes — `poe refresh` keeps running locally / in the devmode session, at
the cost documented in #248. Nothing else in the roadmap is blocked by this ADR either way.

## Alternatives considered

1. **Status quo — run `poe refresh` in the devmode PM session (rejected).** Zero new surface, and
   #251 already removed the worst waste. But it structurally burns 90+ minutes of a supervised
   session on work that is deterministic, network-bound, and needs no judgement, and it couples the
   release cadence to the maintainer's machine being on. This is precisely the pain #248/#283
   identified; rejecting it is the reason this ADR exists. (Retained as the automatic fallback if
   this ADR is rejected or if the workflow is ever removed.)
2. **Self-hosted runner on the Linux automation host (rejected).** Would technically avoid GitHub's
   hosted infrastructure and re-use the machine that already runs devmode. Rejected because: it
   *adds* infrastructure to maintain (runner service, updates, disk) rather than removing it; a
   self-hosted runner attached to a **public** repo is a well-known security footgun (fork PRs can
   execute on your hardware, and hardening it is ongoing work); it re-couples the pipeline to one
   physical machine, which is the coupling we are trying to break; and it offers no cost advantage
   over hosted runners, which are free here. Strictly worse on every axis that matters.
3. **Scheduled (`on: schedule`) refresh (rejected — out of scope by construction).** ADR-0015 §3's
   own reasoning holds: sources update annually/biennially, so a cron adds unattended network
   traffic and unattended failure modes for no freshness benefit, and it would collide with
   ADR-0012's manual-deploy discipline. Any future schedule needs its own ADR.
4. **CI job that commits a serving snapshot / opens a PR (rejected).** See §3 — contradicts
   ADR-0001's never-commit-data rule and ADR-0011's human-authored-branch model.
5. **Move the whole release (build + deploy) into CI (rejected — scope creep).** ADR-0012
   Amendment A deliberately keeps deploy a maintainer-run local step off `main`. Not reopened here.

---

## ⚠ Maintainer decision needed

**This ADR is `Proposed` and may not be implemented until the maintainer accepts it** (CLAUDE.md
golden rule 2; ADR-0011 keeps human gates human). The architect's recommendation is **accept, as
scoped** — the cost is zero, the blast radius is one deletable workflow file with a read-only token
and no secrets, and the ADR-0001 exception is narrow and explicitly non-gate-bearing.

The maintainer is asked to confirm, specifically:

1. **The ADR-0001 exception is acceptable** — cloud CI may be used as a *compute lane* for
   `poe refresh`, while the local pre-commit/push-stage `dbt build` remains the authoritative gate.
2. **The publication path is artifact-download-only** — the job never commits, never opens a PR,
   never touches `develop` or `main` (§3).
3. **Manual trigger only, forever-until-a-new-ADR** — `workflow_dispatch` only; no `schedule`, no
   `push`; site build/deploy stays fully separate and maintainer-run (§1, ADR-0012 A).
4. **Zero secrets, `contents: read`** — ADR-0002's login-gated OSM ingestion stays out of scope (§4).

On acceptance: flip Status to **Accepted (date)** with the maintainer named as acceptor, then
`data-engineer` implements the single workflow file per §1–§5 and `data-engineer-reviewer` verifies
(no methodology gate — not R-C1 work). On rejection: flip Status to **Rejected (date)** with the
reason, close #283, and the status-quo alternative 1 stands.

## References

- #283 (this ticket), #248 (architect review, item 4 — origin), #251 (refresh hardening).
- ADR-0001 (stack + monorepo — local-only quality gate, never-commit-data), ADR-0002 (OSM sourcing —
  login-gated exclusion), ADR-0011 (autonomous `develop` merge, human-gated `main`), ADR-0012 +
  Amendment A (serving/hosting, maintainer-run deploy), ADR-0015 + Amendment (refresh orchestration;
  deferred this decision), ADR-0016 (ingested-data drift detection — the `verify-data` pre-flight).
- `docs/method/egress-hosts.md` (the public open-data hosts a refresh contacts).

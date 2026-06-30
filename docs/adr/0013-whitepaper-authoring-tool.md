# ADR-0013: Whitepaper / preprint authoring tool

- **Status:** Proposed (pending maintainer approval — new tool, golden rule #1/#2)
- **Date:** 2026-06-30

## Context

Issue #82 ([O2]) calls for a **reproducible methodology whitepaper / preprint** that documents the
Gentriduck gentrification methodology for academic and external scrutiny. Requirements:

1. Builds from the repo with a **single command**.
2. **Regenerates figures and tables from the dbt marts** — the `analysis/*.py` scripts already
   produce these from DuckDB.
3. Produces a **citable PDF and/or HTML** output.
4. Suitable for **academic / external scrutiny** (citations, cross-references, bibliography).
5. Uses **only free, open tools** (golden rule #1).

No publishing/document ADR exists (ADRs 0001–0011). `CITATION.cff` is already in the repo. The stack
is dbt (DuckDB) + Python (`uv`/`pyproject`) with `poethepoet` tasks (ADR-0001); there is **no
Node/npm** ecosystem (Evidence.dev is a separate, website-only adoption under ADR-0012, pending).

Candidates from the issue: **Quarto**, **LaTeX**, **markdown → PDF (pandoc)**.

## Decision

**Adopt [Quarto](https://quarto.org/) (MIT) as the whitepaper authoring tool, with the Typst PDF
engine as the default**, installed into the existing `uv`-managed `.venv` via the `quarto-cli` PyPI
wheel and fronted by a `poe` task (e.g. `uv run poe whitepaper`).

Rationale against the constraints:

- **Executable documents (decisive).** Quarto embeds executable Python chunks that query the dbt
  marts (DuckDB) and emit figures/tables **inline at render time**, reusing the existing
  `analysis/*.py` logic. This collapses requirements (1) and (2) into one `quarto render`. pandoc and
  LaTeX treat figures as pre-built static inputs, requiring a separate "run scripts → save assets →
  reference them" orchestration layer we would have to build and maintain.
- **One source → PDF and HTML.** Quarto emits both a citable PDF and HTML from a single document;
  pandoc can do both only via two diverging toolchains, and LaTeX has no good HTML story.
- **Academic fit.** Native BibTeX/CSL citations, cross-references, figure/table numbering, and journal
  templates; integrates with the existing `CITATION.cff`.
- **Free + open + cross-platform.** Quarto is MIT-licensed (built on pandoc, BSD-3). It is a
  self-contained binary that **bundles its own pandoc and Deno — no Node/npm dependency for us** — and
  ships as a `quarto-cli` wheel installable into our `.venv`, consistent with ADR-0001's isolation
  rule. Using the **Typst** engine for PDF avoids a multi-GB TeX Live install across
  macOS/Windows/Linux.

## Alternatives considered

- **pandoc + markdown → PDF** — rejected: no execution layer, so figures/tables from the marts must be
  pre-generated and wired in by a bespoke build script, and PDF+HTML need two toolchains. More glue,
  weaker reproducibility guarantee. (pandoc is still used — *inside* Quarto.)
- **LaTeX** — rejected: strongest typesetting but heaviest, most OS-specific install (TeX Live on
  Windows is painful), no clean HTML output, and the same missing execution layer as pandoc.
- **Evidence.dev (ADR-0012)** — rejected for this use: it is a SQL-first **website** builder, not a
  paginated/citable preprint tool, and pulls in the Node/npm ecosystem we otherwise avoid.

## Consequences

- One new pinned tool (`quarto-cli`) in `pyproject`/`uv.lock`; the Typst engine ships with Quarto.
  Bumps are deliberate. This requires **maintainer approval before adoption** (golden rule #1/#2) —
  hence Status: Proposed.
- The whitepaper lives in the repo (e.g. `docs/whitepaper/`), builds via a `poe` task, and is
  regenerable from the marts, so external readers can reproduce every figure/table.
- O2 content (methodology claims, figures) is **methodology-bearing**: it touches
  `docs/methodology/**`-equivalent material and must pass the R-C1 gate (geo + domain sign-off) before
  integration into `develop`, and obey the R-C2 grounding rule (cite thesis §/EWR codebook/peer source).
- Reversible: the tool is just a renderer over markdown + Python; abandoning Quarto leaves plain `.qmd`
  (markdown) and the `analysis/*.py` intact.

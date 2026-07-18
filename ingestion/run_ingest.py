#!/usr/bin/env python
"""
ingestion/run_ingest.py  ("poe ingest")
=========================================
#251 — per-source failure isolation + skip-if-fresh driver for the `poe ingest`
sequence (ADR-0015 amendment 2026-07-12).

Root cause this replaces (#248 architect review): `poe ingest` was a poe
`sequence`/`cmd` list, which poe aborts on the first non-zero exit. One flaky
external source (`gdi.berlin.de` WFS, via `ingest_wohnlage`) killed the
remaining ~7 sources *and* the downstream `build`/`export-serving`/
`export-area-geojson`/deploy steps in the same `poe refresh` run, even when
none of that week's tickets touched Wohnlage.

This driver (stdlib `subprocess` only — no new dependency, per CLAUDE.md
golden rule #1/#2) runs each ingestion source as an **isolated subprocess**:

- A source's failure is caught and reported, not propagated — the remaining
  sources still run.
- The driver's own exit code is derived from a small, explicit
  **release-blocking allowlist** (`BLOCKING_SOURCE_IDS` below), not "any
  failure aborts everything." Downstream steps (`build`/`export-serving`/
  `export-area-geojson`) only need to worry about genuinely structural
  sources; a non-blocking source's failure means dbt/build fall back to
  whatever last-good parquet is already on disk (ADR-0016 already keeps
  last-good artefacts around; this driver does not delete anything on
  failure).
- **Skip-if-fresh:** before running a source, the driver reuses
  `verify_data.classify()` (ADR-0016) against that source's manifest entry.
  If the source's on-disk outputs already match the committed manifest exactly
  (status "ok") the source is skipped — its data is byte-identical to what a
  full re-ingest would produce, so re-fetching is pure wasted wall-clock.
  `--force` (or `FORCE_REFRESH=1`) disables skipping for this run.
  **Guardrail:** this reuses the *same* classify() that already gates
  `poe verify-data --strict` for pinned-source drift — a genuinely new
  upstream vintage (schema/row-count/hash mismatch, or the ingest script
  itself having changed) always shows as non-"ok" and is never skipped.

Not methodology-bearing (touches no R-C1 path) — data-engineer +
data-engineer-reviewer gate only, per #251's scope.

Usage:
  uv run poe ingest
  uv run poe ingest -- --force            # re-ingest every source regardless of freshness
  uv run python ingestion/run_ingest.py --only berlin__wohnlage
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# run_ingest.py lives directly in ingestion/, so its siblings are importable
# without sys.path surgery (same convention as verify_data.py).
from manifest import REPO_ROOT, load_manifest
from verify_data import classify

# ---------------------------------------------------------------------------
# Step declarations
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class IngestStep:
    label: str
    argv: list[str]
    source_id: Optional[str] = None
    blocking: bool = False


# Release-blocking allowlist (#248 architect review, item 1): a source's
# failure fails the whole `poe ingest` driver's exit code (and therefore a
# `poe refresh` chain) only if it is in this set. Kept small and explicit,
# per the architect's "tiny and documented" recommendation, rather than
# reusing `source_class` (pinned/rolling), which answers a different question
# (drift-detection semantics, not release-blocking-ness).
#
# Rationale for what's in/out:
#   - Berlin LOR geometries + crosswalk: structural — `dim_area`/`dim_city`
#     and every spatial join in the project depend on these (ADR-0005).
#   - Berlin EWR + MSS (+ MSS indicators): the socio-economic/outcome gate
#     models the governed gentrification index is built from (R-C1 paths).
#   - Everything else here is a **leaf dimension** whose own mart is the only
#     thing affected by its absence (price/rent, Mietspiegel, Wohnlage,
#     Milieuschutz) — a stale/missing leaf dimension degrades one dimension
#     of the site, it does not break the core index or the dbt build.
#   - All Hamburg sources are treated as non-blocking here: Hamburg is a
#     second city (ADR-0014) layered on top of the Berlin-first core: a
#     Hamburg-source outage should not block a Berlin-only release. Hamburg's
#     own publication gate (H1/H2/H3) already requires its sources to be
#     genuinely present before anything is published — that's a separate,
#     later check, not this driver's job.
BLOCKING_SOURCE_IDS = frozenset(
    {
        "berlin__lor_geometries",
        "berlin__lor_crosswalk",
        "berlin__ewr",
        "berlin__mss",
        "berlin__mss_indicators",
    }
)


def _py(*args: str) -> list[str]:
    return [sys.executable, *args]


def _uv_pdfplumber(*args: str) -> list[str]:
    # Mirrors the existing poe `ingest` sequence: pdfplumber is deliberately
    # not a core dependency (heavy, PDF-parsing-only) — invoked via
    # `uv run --with pdfplumber` at call time, same as before this driver.
    return ["uv", "run", "--with", "pdfplumber", "python", *args]


def build_steps(repo_root: Path) -> list[IngestStep]:
    """The same sources `poe ingest` ran before #251, in the same order,
    now with per-source manifest identity + blocking classification attached.
    """
    return [
        # Berlin — geographies (crosswalk depends on the geometries step's output)
        IngestStep(
            "Berlin LOR geometries",
            _py(
                "ingestion/berlin/lor/ingest_lor_geometries.py", "--out-dir", "data/raw/berlin/lor"
            ),
            source_id="berlin__lor_geometries",
            blocking=True,
        ),
        IngestStep(
            "Berlin LOR crosswalk",
            _py("ingestion/berlin/lor/ingest_lor_crosswalk.py", "--lor-dir", "data/raw/berlin/lor"),
            source_id="berlin__lor_crosswalk",
            blocking=True,
        ),
        # #269 (I-ortsteile): Ortsteil boundary geometry (ALKIS Berlin Ortsteile WFS,
        # same gdi.berlin.de infrastructure as LOR). Non-blocking: Ortsteil is a
        # leaf geography dimension (dim_area rows + its own crosswalk/rollup marts)
        # that does not feed the core PLR-grain gentrification_index -- its absence
        # degrades only the Ortsteil profile pages, not the index/build.
        IngestStep(
            "Berlin Ortsteile",
            _py(
                "ingestion/berlin/ortsteile/ingest_ortsteil_geometries.py",
                "--out-dir",
                "data/raw/berlin/ortsteile",
            ),
            source_id="berlin__ortsteile",
            blocking=False,
        ),
        # Berlin — MSS (Monitoring Soziale Stadtentwicklung) outcome + indicator layers
        IngestStep(
            "Berlin MSS",
            _py("ingestion/berlin/mss/ingest_mss.py", "--out-dir", "data/raw/berlin/mss"),
            source_id="berlin__mss",
            blocking=True,
        ),
        IngestStep(
            "Berlin MSS 2013 (Excel)",
            _py(
                "ingestion/berlin/mss/ingest_mss_2013_excel.py", "--out-dir", "data/raw/berlin/mss"
            ),
            # Shares a manifest source_id with ingest_mss.py above (existing,
            # pre-#251 quirk — both write "berlin__mss"). Skip-if-fresh treats
            # this conservatively: the shared entry only reads "ok" once both
            # scripts' outputs are on disk and unchanged, so neither is ever
            # skipped on the strength of the *other's* manifest write alone
            # unless a full run already confirmed both are fresh.
            source_id="berlin__mss",
            blocking=True,
        ),
        IngestStep(
            "Berlin MSS indicators",
            _py(
                "ingestion/berlin/mss/ingest_mss_indicators.py", "--out-dir", "data/raw/berlin/mss"
            ),
            source_id="berlin__mss_indicators",
            blocking=True,
        ),
        # Berlin — EWR (Einwohnerregister) socio-economic time series
        IngestStep(
            "Berlin EWR",
            _py("ingestion/berlin/ewr/ingest_ewr.py", "--out-dir", "data/raw/berlin/ewr"),
            source_id="berlin__ewr",
            blocking=True,
        ),
        # Berlin — price/rent dimension (D1/D1a/D1b/D1c) — leaf dimensions, non-blocking
        IngestStep(
            "Berlin Bodenrichtwerte",
            _py(
                "ingestion/berlin/price_rent/ingest_bodenrichtwerte.py",
                "--out-dir",
                "data/raw/berlin/price_rent",
            ),
            source_id="berlin__bodenrichtwerte",
            blocking=False,
        ),
        IngestStep(
            "Berlin Kauffaelle",
            _py(
                "ingestion/berlin/price_rent/ingest_kauffaelle.py",
                "--out-dir",
                "data/raw/berlin/price_rent",
            ),
            source_id="berlin__kauffaelle",
            blocking=False,
        ),
        IngestStep(
            "Berlin Wohnlage",
            _py(
                "ingestion/berlin/price_rent/ingest_wohnlage.py",
                "--out-dir",
                "data/raw/berlin/price_rent",
            ),
            source_id="berlin__wohnlage",
            blocking=False,
        ),
        IngestStep(
            "Berlin Strassenverzeichnis",
            _uv_pdfplumber(
                "ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py",
                "--out-dir",
                "data/raw/berlin/mietspiegel",
            ),
            source_id="berlin__strassenverzeichnis",
            blocking=False,
        ),
        IngestStep(
            "Berlin Mietspiegel",
            _uv_pdfplumber(
                "ingestion/berlin/mietspiegel/ingest_mietspiegel.py",
                "--out-dir",
                "data/raw/berlin/mietspiegel",
            ),
            source_id="berlin__mietspiegel",
            blocking=False,
        ),
        # Hamburg — second-city adapters (ADR-0014); OSM (Pillar 6) excluded, see ingest-osm-hamburg.
        # All non-blocking here (see BLOCKING_SOURCE_IDS rationale above).
        IngestStep(
            "Hamburg geo",
            _py("ingestion/hamburg/geo/ingest_hamburg_geo.py", "--out-dir", "data/raw/hamburg/geo"),
            source_id="hamburg__geo",
            blocking=False,
        ),
        IngestStep(
            "Hamburg Sozialmonitoring",
            _py(
                "ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring.py",
                "--out-dir",
                "data/raw/hamburg/sozialmonitoring",
            ),
            source_id="hamburg__sozialmonitoring",
            blocking=False,
        ),
        IngestStep(
            "Hamburg displacement",
            _py(
                "ingestion/hamburg/displacement/ingest_hamburg_displacement.py",
                "--out-dir",
                "data/raw/hamburg/displacement",
            ),
            source_id="hamburg__displacement",
            blocking=False,
        ),
        IngestStep(
            "Hamburg EWR (Stadtteil)",
            _py(
                "ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py",
                "--out-dir",
                "data/raw/hamburg/ewr_stadtteil",
            ),
            source_id="hamburg__ewr_stadtteil",
            blocking=False,
        ),
        IngestStep(
            "Hamburg rent",
            _py(
                "ingestion/hamburg/rent/ingest_hamburg_rent.py",
                "--out-dir",
                "data/raw/hamburg/rent",
            ),
            source_id="hamburg__rent",
            blocking=False,
        ),
    ]


# ---------------------------------------------------------------------------
# Skip-if-fresh
# ---------------------------------------------------------------------------


def is_fresh(source_id: str, repo_root: Path) -> tuple[bool, str]:
    """Return (fresh, reason) using the same classify() verify-data already uses.

    "fresh" means: a manifest entry exists for source_id AND classify() reports
    status "ok" (exact match — same row counts, schema, content hash, and the
    ingest script itself hasn't moved on since the manifest was written).
    """
    entries = load_manifest(repo_root / "ingestion" / "manifest")
    entry = entries.get(source_id)
    if entry is None:
        return False, "no manifest entry yet"
    result = classify(entry, repo_root)
    if result.status == "ok":
        return True, "matches manifest (verify-data: ok)"
    return False, f"verify-data: {result.display_status} ({result.detail})"


# ---------------------------------------------------------------------------
# Execution
# ---------------------------------------------------------------------------


@dataclass
class StepResult:
    step: IngestStep
    outcome: str  # "skipped" | "ok" | "failed"
    detail: str = ""
    elapsed_s: float = 0.0
    findings: list[str] = field(default_factory=list)


def run_step(step: IngestStep, repo_root: Path, force: bool) -> StepResult:
    if step.source_id and not force:
        fresh, reason = is_fresh(step.source_id, repo_root)
        if fresh:
            return StepResult(step, "skipped", detail=reason)

    start = time.monotonic()
    try:
        proc = subprocess.run(  # noqa: S603 -- fixed argv built from build_steps(), not user input
            step.argv,
            cwd=repo_root,
            check=False,
        )
        elapsed = time.monotonic() - start
        if proc.returncode == 0:
            return StepResult(step, "ok", elapsed_s=elapsed)
        return StepResult(step, "failed", detail=f"exit code {proc.returncode}", elapsed_s=elapsed)
    except Exception as exc:  # noqa: BLE001 -- isolate this source's failure from the rest
        elapsed = time.monotonic() - start
        return StepResult(step, "failed", detail=str(exc), elapsed_s=elapsed)


def render_summary(results: list[StepResult]) -> str:
    # #248: surface each source's elapsed_s (already captured in run_step, previously
    # unused) so a slow/wasted run is self-diagnosing from `poe ingest` output alone,
    # without the manual session-log reconstruction #248's timing breakdown required.
    label_width = max(len(r.step.label) for r in results) + 2
    lines = [f"{'source':<{label_width}}{'blocking':<10}{'outcome':<10}{'elapsed':<10}detail"]
    lines.append("-" * (label_width + 10 + 10 + 10 + 6))
    for r in results:
        blocking = "yes" if r.step.blocking else "no"
        elapsed = f"{r.elapsed_s:.1f}s"
        lines.append(
            f"{r.step.label:<{label_width}}{blocking:<10}{r.outcome:<10}{elapsed:<10}{r.detail}"
        )
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "#251: per-source failure-isolated, skip-if-fresh driver for `poe ingest`. "
            "Runs each ingestion source as an isolated subprocess; a non-blocking "
            "source's failure is reported but does not abort the rest."
        )
    )
    p.add_argument(
        "--force",
        action="store_true",
        help="Re-run every source regardless of freshness (same as FORCE_REFRESH=1).",
    )
    p.add_argument(
        "--only",
        action="append",
        default=None,
        metavar="SOURCE_ID",
        help="Restrict this run to one or more source_id values (repeatable).",
    )
    p.add_argument(
        "--repo-root",
        type=Path,
        default=None,
        help="Override the repo root (default: autodetected).",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    repo_root = args.repo_root.resolve() if args.repo_root else REPO_ROOT
    force = args.force or os.environ.get("FORCE_REFRESH", "").lower() in {"1", "true", "yes"}

    steps = build_steps(repo_root)
    if args.only:
        wanted = set(args.only)
        steps = [s for s in steps if s.source_id in wanted]
        if not steps:
            print(
                f"run_ingest: no known source_id matched --only {sorted(wanted)}", file=sys.stderr
            )
            return 2

    results = [run_step(step, repo_root, force) for step in steps]

    print()
    print(render_summary(results))
    print()

    n_skipped = sum(1 for r in results if r.outcome == "skipped")
    n_ok = sum(1 for r in results if r.outcome == "ok")
    n_failed = sum(1 for r in results if r.outcome == "failed")
    blocking_failed = [r for r in results if r.outcome == "failed" and r.step.blocking]

    print(
        f"run_ingest summary: {n_ok} ok, {n_skipped} skipped (fresh), {n_failed} failed "
        f"({len(blocking_failed)} release-blocking)"
    )
    if blocking_failed:
        print(
            "run_ingest: FAILING — release-blocking source(s) failed: "
            + ", ".join(r.step.label for r in blocking_failed),
            file=sys.stderr,
        )
        return 1
    if n_failed:
        print(
            "run_ingest: non-blocking source(s) failed — build/export will fall back to "
            "last-good parquet on disk for those sources (ADR-0016).",
            file=sys.stderr,
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python
"""
ingestion/verify_data.py  ("poe verify-data")
==============================================
ADR-0016 — fast, local drift check between the committed manifest
(`ingestion/manifest/*.json`) and this machine's actual `data/` contents.

Runs in seconds, does no `dbt build`, and (default mode) never fails the process —
it is meant to be safe as a `poe refresh` pre-flight (ADR-0015 graceful degradation).

What it checks, per manifest entry (see ADR-0016 Decision §3 for the full table):
  - Are the declared output files present?                        -> missing
  - Does row_count / schema_fingerprint match the manifest?        -> wrong-shape
  - Does content_hash match (same shape, different bytes)?         -> stale
  - Has the ingest script's own source file changed since the
    manifest's recorded git_sha (`git log <sha>..HEAD -- <path>`)? -> stale
  - Rolling-historical row_count delta beyond ROLLING_HIST_TOLERANCE -> warn
  - Rolling partial-year outputs (filename contains "partial")      -> always ok,
    purely informational — never compared.

Exit-code contract (ADR-0016):
  - Default: always exit 0 (informational — prints the table + summary regardless
    of findings). Safe to call unconditionally, e.g. from `poe refresh`.
  - `--strict`: exit 1 if any **pinned** source is stale/wrong-shape/missing.
    Rolling sources NEVER move --strict to non-zero (constraint honored below).

Usage:
  uv run poe verify-data
  uv run poe verify-data --strict
  uv run python ingestion/verify_data.py --manifest-dir ingestion/manifest
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# verify_data.py lives directly in ingestion/, so ingestion/manifest.py is importable
# as a plain sibling module without any sys.path surgery (unlike the nested
# ingestion/<city>/<source>/ingest_*.py scripts — see those files' own import
# comment for the parents[2] sys.path pattern this mirrors).
from manifest import (
    REPO_ROOT,
    ROLLING_HIST_TOLERANCE,
    content_hash,
    describe_file,
    load_manifest,
    module_to_relpath,
)

# Status severity, most to least severe — used to combine several per-output
# findings for one source into a single overall status.
_SEVERITY = {"ok": 0, "warn": 1, "stale": 2, "wrong-shape": 3, "missing": 4}


def _worse(a: str, b: str) -> str:
    return a if _SEVERITY[a] >= _SEVERITY[b] else b


@dataclass
class Result:
    source_id: str
    source_class: str  # "pinned" | "rolling"
    status: str  # ok | stale | wrong-shape | missing | warn
    details: list[str] = field(default_factory=list)

    @property
    def display_status(self) -> str:
        if self.source_class == "rolling" and self.status == "ok":
            return "ok (rolling)"
        return self.status

    @property
    def detail(self) -> str:
        return "; ".join(self.details) if self.details else "matches manifest"


# ---------------------------------------------------------------------------
# Local-git staleness check
# ---------------------------------------------------------------------------


def _script_changed_since(sha: str, script_relpath: str, repo_root: Path) -> Optional[bool]:
    """Has script_relpath had any commits between `sha` (exclusive) and HEAD?

    Returns None (undeterminable — never treated as drift) when git is unavailable,
    the recorded sha is 'unknown', or the sha is not reachable (e.g. shallow clone).
    """
    if not sha or sha == "unknown":
        return None
    try:
        result = subprocess.run(  # noqa: S603 -- fixed "git" argv, not user input
            ["git", "log", "--oneline", f"{sha}..HEAD", "--", script_relpath],  # noqa: S607
            cwd=repo_root,
            capture_output=True,
            text=True,
            timeout=5,
        )
    except Exception:  # noqa: BLE001
        return None
    if result.returncode != 0:
        return None
    return bool(result.stdout.strip())


# ---------------------------------------------------------------------------
# Per-source classification
# ---------------------------------------------------------------------------


def _describe_current(path: Path) -> tuple[int, str]:
    return describe_file(path)


def classify_pinned(entry: dict, repo_root: Path) -> Result:
    status = "ok"
    details: list[str] = []

    for output in entry["outputs"]:
        path = repo_root / output["path"]
        if not path.exists():
            status = _worse(status, "missing")
            details.append(f"{output['path']}: file not found")
            continue

        try:
            row_count, schema_fp = _describe_current(path)
        except Exception as exc:  # noqa: BLE001
            status = _worse(status, "missing")
            details.append(f"{output['path']}: unreadable ({exc})")
            continue

        shape_issues = []
        if row_count != output["row_count"]:
            shape_issues.append(f"row_count {row_count} != manifest {output['row_count']}")
        if schema_fp != output["schema_fingerprint"]:
            shape_issues.append("schema_fingerprint differs")
        if shape_issues:
            status = _worse(status, "wrong-shape")
            details.append(f"{output['path']}: " + ", ".join(shape_issues))
            continue

        if content_hash(path) != output["content_hash"]:
            status = _worse(status, "stale")
            details.append(f"{output['path']}: content_hash differs (re-published?)")

    sha = entry["ingest_script"]["git_sha"]
    script_relpath = module_to_relpath(entry["ingest_script"]["module"])
    changed = _script_changed_since(sha, script_relpath, repo_root)
    if changed:
        status = _worse(status, "stale")
        details.append(f"{script_relpath} changed since ingest (git_sha {sha[:12]})")

    return Result(entry["source_id"], "pinned", status, details)


def classify_rolling(entry: dict, repo_root: Path) -> Result:
    status = "ok"
    details: list[str] = []

    for output in entry["outputs"]:
        path = repo_root / output["path"]
        is_partial = "partial" in Path(output["path"]).stem.lower()

        if not path.exists():
            # A truly-absent rolling artefact is still worth reporting (ADR-0016
            # table: missing = yes for rolling too), but never gates --strict.
            status = _worse(status, "missing")
            details.append(f"{output['path']}: file not found")
            continue

        if is_partial:
            # Current partial-year snapshot: expected to differ between
            # instances; never compared (ADR-0016 Decision §2).
            continue

        try:
            row_count, schema_fp = _describe_current(path)
        except Exception as exc:  # noqa: BLE001
            status = _worse(status, "missing")
            details.append(f"{output['path']}: unreadable ({exc})")
            continue

        manifest_rc = max(output["row_count"], 1)
        delta_pct = abs(row_count - output["row_count"]) / manifest_rc
        if delta_pct > ROLLING_HIST_TOLERANCE:
            status = _worse(status, "warn")
            details.append(
                f"{output['path']}: row_count delta {delta_pct:.2%} exceeds "
                f"{ROLLING_HIST_TOLERANCE:.1%} tolerance ({row_count} vs {output['row_count']})"
            )
        if schema_fp != output["schema_fingerprint"]:
            status = _worse(status, "warn")
            details.append(f"{output['path']}: schema_fingerprint differs (informational)")

    # Rolling sources never go stale/wrong-shape on git_sha or vintage — only
    # missing/warn/ok are reachable here (ADR-0016 Decision §2 constraint).
    return Result(entry["source_id"], "rolling", status, details)


def classify(entry: dict, repo_root: Path = REPO_ROOT) -> Result:
    if entry["source_class"] == "rolling":
        return classify_rolling(entry, repo_root)
    return classify_pinned(entry, repo_root)


# ---------------------------------------------------------------------------
# Output rendering
# ---------------------------------------------------------------------------

_DISPLAY_ORDER = ["ok", "ok (rolling)", "warn", "stale", "wrong-shape", "missing"]


def render_table(results: list[Result]) -> str:
    if not results:
        return (
            "verify-data: no manifest entries found under ingestion/manifest/ — nothing to check."
        )

    id_width = max(len(r.source_id) for r in results) + 2
    lines = [f"{'source_id':<{id_width}}{'class':<10}{'status':<14}detail"]
    lines.append("-" * (id_width + 10 + 14 + 6))
    for r in sorted(results, key=lambda r: r.source_id):
        lines.append(
            f"{r.source_id:<{id_width}}{r.source_class:<10}{r.display_status:<14}{r.detail}"
        )
    return "\n".join(lines)


def render_summary(results: list[Result]) -> str:
    counts = Counter(r.display_status for r in results)
    ordered = [f"{counts[s]} {s}" for s in _DISPLAY_ORDER if s in counts]
    # Any unexpected status label still shows up (defensive; should not happen).
    ordered += [f"{n} {s}" for s, n in counts.items() if s not in _DISPLAY_ORDER]
    return " · ".join(ordered) if ordered else "no sources"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "ADR-0016: compare local data/ contents against the committed ingestion "
            "manifest (ingestion/manifest/*.json). Fast, no dbt build."
        )
    )
    p.add_argument(
        "--manifest-dir",
        type=Path,
        default=None,
        help="Override the manifest directory (default: ingestion/manifest).",
    )
    p.add_argument(
        "--repo-root",
        type=Path,
        default=None,
        help="Override the repo root used to resolve manifest paths (default: autodetected).",
    )
    p.add_argument(
        "--strict",
        action="store_true",
        help=(
            "Exit non-zero if any PINNED source is stale/wrong-shape/missing. "
            "Rolling sources never trigger a non-zero exit, even with --strict."
        ),
    )
    p.add_argument(
        "--quiet",
        action="store_true",
        help="Print only the summary line, not the per-source table.",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    repo_root = args.repo_root.resolve() if args.repo_root else REPO_ROOT
    manifest_dir = (
        args.manifest_dir.resolve() if args.manifest_dir else (repo_root / "ingestion" / "manifest")
    )

    entries = load_manifest(manifest_dir)
    results = [classify(entry, repo_root) for entry in entries.values()]

    if not args.quiet:
        print(render_table(results))
        print()
    print(f"verify-data summary: {render_summary(results)}")

    if args.strict:
        pinned_bad = any(
            r.source_class == "pinned" and r.status in {"stale", "wrong-shape", "missing"}
            for r in results
        )
        if pinned_bad:
            print("verify-data --strict: FAIL (pinned source drift found above)", file=sys.stderr)
            return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python
"""
ingestion/manifest_backfill.py  ("poe manifest-backfill")
============================================================
ADR-0016 phased-plan step 2/initial-baseline generation — populate the committed
manifest (`ingestion/manifest/*.json`) from artefacts **already on disk**, without
re-running any ingestion (in particular, without the ~20 h / ~11 GB OSM history
extraction, ADR-0002).

This is the one-time tool used to generate the *initial* committed manifest
baseline on a machine that already holds complete, current ingested data for a
source. Going forward, each `ingestion/**/ingest_*.py` writes/refreshes its own
entry on every successful run (ADR-0016 Decision §1) — this script exists for:
  - generating the very first baseline (this session), and
  - the one static-file exception: the dbt seeds (`transform/seeds/*.csv`), which
    have no `ingest_*.py` of their own (see `ingestion/manifest/README.md`).

Best-effort fields (documented per source below, not hidden):
  - `upstream.retrieved_at` is backfilled from the newest output file's mtime —
    an approximation, not the true original fetch time (which the file itself
    doesn't carry and this script cannot recover after the fact).
  - `upstream.vintage` is derived from the on-disk filenames where the vintage is
    literally the year/edition embedded in the name (EWR, MSS, price/rent,
    Mietspiegel); for sources with a single "current live WFS edition" concept
    (Hamburg geo/displacement/rent, LOR/MSS "editions" already covered by
    filename), the docstring-documented probe date is used instead.
  - OSM (`berlin__osm`, `hamburg__osm`): `upstream.vintage` is recorded as
    "unknown (PBF vintage not captured by the ingestor)" — the ingestor does not
    itself record which Geofabrik PBF publish-date it read (a possible future
    small enhancement to `ingest_osm_history.py`, out of scope here). Per
    ADR-0016's maintainer decision, the PBF is never hashed and drift is assessed
    via the extracted yearly snapshot parquets regardless, so this does not
    weaken the drift signal.

Sources with no artefact currently on disk (e.g. `berlin__kauffaelle`,
`berlin__strassenverzeichnis`, the 2013 MSS excel edition) are skipped and
reported — they will get a manifest entry the next time their ingest script
succeeds.

Usage:
  uv run poe manifest-backfill
  uv run python ingestion/manifest_backfill.py --dry-run
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

from manifest import REPO_ROOT, existing_outputs, write_manifest_entry

YEAR_RE = re.compile(r"(\d{4})")


def _years_from_filenames(paths: list[Path]) -> list[int]:
    years = set()
    for p in paths:
        for m in YEAR_RE.finditer(p.stem):
            y = int(m.group(1))
            if 1990 <= y <= 2100:
                years.add(y)
    return sorted(years)


def _compress_years(years: list[int]) -> str:
    """[2008,2009,2010,2015] -> '2008-2010,2015'."""
    if not years:
        return "n/a"
    ranges: list[str] = []
    start = prev = years[0]
    for y in years[1:]:
        if y == prev + 1:
            prev = y
            continue
        ranges.append(f"{start}-{prev}" if start != prev else str(start))
        start = prev = y
    ranges.append(f"{start}-{prev}" if start != prev else str(start))
    return ",".join(ranges)


def _best_effort_retrieved_at(paths: list[Path]) -> str:
    """Newest output file's mtime, UTC ISO-8601 — an approximation (see module docstring)."""
    if not paths:
        return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    newest = max(p.stat().st_mtime for p in paths)
    return datetime.fromtimestamp(newest, tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


@dataclass
class SourceDef:
    source_id: str
    source_class: str  # "pinned" | "rolling"
    city: str
    out_dir: str  # relative to repo root
    patterns: list[str]
    ingest_script_module: str
    upstream_url: str
    # If set, used verbatim as upstream.vintage. Otherwise derived from filenames
    # found in out_dir via _years_from_filenames/_compress_years.
    upstream_vintage: str | None = None
    exclude_patterns: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Source definitions — one row per ADR-0016 source_id.
#
# Berlin pinned sources first, then Hamburg, then OSM classified `rolling` last,
# mirroring the phased-plan's own ordering (ADR-0016 step 2).
# ---------------------------------------------------------------------------

SOURCE_DEFS: list[SourceDef] = [
    # --- Berlin, pinned -----------------------------------------------------
    SourceDef(
        source_id="berlin__lor_geometries",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/lor",
        patterns=[
            "pre2021_plr.parquet",
            "pre2021_bzr.parquet",
            "lor_2021_plr.parquet",
            "lor_2021_bzr.parquet",
        ],
        ingest_script_module="ingestion.berlin.lor.ingest_lor_geometries",
        upstream_url="https://gdi.berlin.de/services/wfs/lor_2019 (pre2021) ; https://gdi.berlin.de/services/wfs/lor_2021",
        upstream_vintage="lor_pre2021 (2019 WFS edition) + lor_2021 (2021 WFS edition)",
    ),
    SourceDef(
        source_id="berlin__lor_crosswalk",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/lor",
        patterns=["lor_crosswalk.parquet"],
        ingest_script_module="ingestion.berlin.lor.ingest_lor_crosswalk",
        upstream_url="derived (areal-weighted intersection of pre2021/2021 LOR geometries; GDI Berlin WFS upstream)",
        upstream_vintage="derived from lor_pre2021 + lor_2021",
    ),
    SourceDef(
        source_id="berlin__ewr",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/ewr",
        patterns=["*.parquet"],
        ingest_script_module="ingestion.berlin.ewr.ingest_ewr",
        upstream_url="https://daten.berlin.de/api/3/action/package_search (CKAN) ; https://www.statistik-berlin-brandenburg.de/opendata/",
    ),
    SourceDef(
        source_id="berlin__mss",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/mss",
        patterns=["mss_*.parquet"],
        exclude_patterns=["mss_*_indicators.parquet"],
        ingest_script_module="ingestion.berlin.mss.ingest_mss",
        upstream_url="https://gdi.berlin.de/services/wfs/mss_<year> (mss<year>_indizes_<n> feature type)",
    ),
    SourceDef(
        source_id="berlin__mss_indicators",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/mss",
        patterns=["mss_*_indicators.parquet"],
        ingest_script_module="ingestion.berlin.mss.ingest_mss_indicators",
        upstream_url="https://gdi.berlin.de/services/wfs/mss_<year> (mss<year>_indexind_<n> feature type)",
    ),
    SourceDef(
        source_id="berlin__bodenrichtwerte",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/price_rent",
        patterns=["bodenrichtwert_*.parquet"],
        ingest_script_module="ingestion.berlin.price_rent.ingest_bodenrichtwerte",
        upstream_url="https://gdi.berlin.de/services/wfs/brw{year} (brw_{year}_vector feature type)",
    ),
    # berlin__kauffaelle: SKIPPED — ingest_kauffaelle.py has no output on this
    # machine's data/raw/berlin/price_rent/ yet (kauffaelle_*.parquet absent).
    # Will get a manifest entry the next time it succeeds.
    SourceDef(
        source_id="berlin__wohnlage",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/price_rent",
        patterns=["wohnlage_*.parquet"],
        ingest_script_module="ingestion.berlin.price_rent.ingest_wohnlage",
        upstream_url="https://gdi.berlin.de/services/wfs/wohnlagenadr{year}",
    ),
    SourceDef(
        source_id="berlin__mietspiegel",
        source_class="pinned",
        city="berlin",
        out_dir="data/raw/berlin/mietspiegel",
        patterns=["mietspiegel_*.parquet"],
        ingest_script_module="ingestion.berlin.mietspiegel.ingest_mietspiegel",
        upstream_url="https://mietspiegel.berlin.de/wp-content/uploads/.../mietspiegeltabelle{year}.pdf",
    ),
    # berlin__strassenverzeichnis: SKIPPED — ingest_strassenverzeichnis.py has no
    # output on this machine yet (strassenverzeichnis_*.parquet absent).
    # --- Hamburg, pinned ------------------------------------------------------
    SourceDef(
        source_id="hamburg__geo",
        source_class="pinned",
        city="hamburg",
        out_dir="data/raw/hamburg/geo",
        patterns=["bezirk.parquet", "stadtteil.parquet", "statgebiet.parquet"],
        ingest_script_module="ingestion.hamburg.geo.ingest_hamburg_geo",
        upstream_url="https://geodienste.hamburg.de/HH_WFS_Statistische_Gebiete ; HH_WFS_Verwaltungsgrenzen",
        upstream_vintage="current (live WFS edition; confirmed 2026-07-01)",
    ),
    SourceDef(
        source_id="hamburg__sozialmonitoring",
        source_class="pinned",
        city="hamburg",
        out_dir="data/raw/hamburg/sozialmonitoring",
        patterns=["sozialmonitoring.parquet"],
        ingest_script_module="ingestion.hamburg.sozialmonitoring.ingest_hamburg_sozialmonitoring",
        upstream_url="https://geodienste.hamburg.de/wfs_sozialmonitoring (de.hh.up:sozialmonitoring)",
        upstream_vintage="editions 2013-2025 (annual; embedded per-row in the output)",
    ),
    SourceDef(
        source_id="hamburg__displacement",
        source_class="pinned",
        city="hamburg",
        out_dir="data/raw/hamburg/displacement",
        patterns=["erhaltungsverordnung.parquet"],
        ingest_script_module="ingestion.hamburg.displacement.ingest_hamburg_displacement",
        upstream_url="https://geodienste.hamburg.de/HH_WFS_SozErhVO",
        upstream_vintage="current (live WFS edition; confirmed 2026-07-01)",
    ),
    SourceDef(
        source_id="hamburg__ewr_stadtteil",
        source_class="pinned",
        city="hamburg",
        out_dir="data/raw/hamburg/ewr_stadtteil",
        patterns=["stadtteile.parquet"],
        ingest_script_module="ingestion.hamburg.ewr.ingest_hamburg_ewr_stadtteil",
        upstream_url="Transparenzportal — 'Regionalstatistische Daten der Stadtteile Hamburgs' (CKAN)",
        upstream_vintage="multi-year CSV series (see reference_year column for the exact range)",
    ),
    SourceDef(
        source_id="hamburg__rent",
        source_class="pinned",
        city="hamburg",
        out_dir="data/raw/hamburg/rent",
        patterns=["mietenspiegel.parquet", "wohnlage.parquet"],
        ingest_script_module="ingestion.hamburg.rent.ingest_hamburg_rent",
        upstream_url="https://geodienste.hamburg.de/HH_WFS_Wohnlagen ; Mietenspiegel WFS",
        upstream_vintage="current (erhebungsstand 2025-04-01; confirmed live 2026-07-01)",
    ),
    # --- Shared / static (no ingest script) ------------------------------------
    SourceDef(
        source_id="shared__seeds",
        source_class="pinned",
        city="shared",
        out_dir="transform/seeds",
        patterns=["*.csv"],
        ingest_script_module="transform.seeds",  # not an importable module — see manifest/README.md
        upstream_url="n/a (committed to git; not fetched from an external endpoint)",
        upstream_vintage="n/a (git-committed reference data, versioned by git itself)",
    ),
    # --- OSM, rolling (never re-fetched here; extracted snapshots only) --------
    SourceDef(
        source_id="berlin__osm",
        source_class="rolling",
        city="berlin",
        out_dir="data/raw/osm/berlin",
        patterns=["*.parquet"],
        ingest_script_module="ingestion.berlin.osm.ingest_osm_history",
        upstream_url="https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf (login-gated, ADR-0002)",
        upstream_vintage="unknown (PBF publish-date not captured by the ingestor; PBF itself is never hashed, ADR-0016)",
    ),
    SourceDef(
        source_id="hamburg__osm",
        source_class="rolling",
        city="hamburg",
        out_dir="data/raw/osm/hamburg",
        patterns=["*.parquet"],
        ingest_script_module="ingestion.hamburg.osm.ingest_hamburg_osm",
        upstream_url="https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf (login-gated, ADR-0002)",
        upstream_vintage="unknown (PBF publish-date not captured by the ingestor; PBF itself is never hashed, ADR-0016)",
    ),
]


def backfill(
    repo_root: Path = REPO_ROOT, dry_run: bool = False, only: set[str] | None = None
) -> int:
    """Populate manifest entries from on-disk artefacts.

    `only`, when given, restricts the run to those source_ids — for surgically
    refreshing a handful of entries (e.g. git_sha/retrieved_at after an
    ingest-script-only change with no data change) without touching every other
    source's manifest file. Default (None) processes every SOURCE_DEFS entry.
    """
    skipped = 0
    written = 0
    for sd in SOURCE_DEFS:
        if only is not None and sd.source_id not in only:
            continue
        out_dir = repo_root / sd.out_dir
        found = existing_outputs(out_dir, sd.patterns)
        if sd.exclude_patterns:
            excluded = {p for pat in sd.exclude_patterns for p in out_dir.glob(pat)}
            found = [p for p in found if p not in excluded]

        if not found:
            print(f"[skip] {sd.source_id}: no matching artefacts found under {sd.out_dir}/")
            skipped += 1
            continue

        vintage = sd.upstream_vintage or _compress_years(_years_from_filenames(found))
        retrieved_at = _best_effort_retrieved_at(found)

        if dry_run:
            print(
                f"[dry-run] {sd.source_id} ({sd.source_class}, {sd.city}): "
                f"{len(found)} output(s), vintage={vintage!r}, retrieved_at={retrieved_at}"
            )
            written += 1
            continue

        write_manifest_entry(
            source_id=sd.source_id,
            source_class=sd.source_class,
            city=sd.city,
            upstream_url=sd.upstream_url,
            upstream_vintage=vintage,
            output_paths=found,
            ingest_script_module=sd.ingest_script_module,
            retrieved_at=retrieved_at,
            repo_root=repo_root,
        )
        written += 1

    print(
        f"\nBackfill summary: {written} entr{'y' if written == 1 else 'ies'} written, {skipped} skipped (no artefact yet)."
    )
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    p.add_argument(
        "--dry-run", action="store_true", help="Report what would be written without writing."
    )
    p.add_argument(
        "--only",
        action="append",
        default=None,
        metavar="SOURCE_ID",
        help=(
            "Restrict the run to this source_id (repeatable). Use to surgically refresh "
            "specific entries (e.g. git_sha/retrieved_at after an ingest-script-only change "
            "with no data change) without touching every other source's manifest file. "
            "Default: process every defined source."
        ),
    )
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    only = set(args.only) if args.only else None
    return backfill(dry_run=args.dry_run, only=only)


if __name__ == "__main__":
    sys.exit(main())

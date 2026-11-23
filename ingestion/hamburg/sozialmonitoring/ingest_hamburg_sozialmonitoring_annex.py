"""
ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py
===========================================================================
#371 (ADR-0014 Amendment 2026-11-02): Hamburg Sozialmonitoring report-annex
indicator z-scores, editions 2016-2025.

What it does
------------
1. Downloads the ten pinned annex workbooks ("Sozialmonitoring Integrierte
   Stadtteilentwicklung, Bericht <E> - Anhang", "Anhang-Tabelle" / from 2021
   "Ergebnistabellen") from ``daten.transparenz.hamburg.de`` (Dataport
   ``GetRessource100``). The URLs are the ones recorded in the
   ``seed_hh_sozialmonitoring_published_class_counts`` description in
   ``transform/seeds/schema.yml``. No portal scraping, no run-time URL
   discovery (ADR-0014 amendment, "Ingestion pattern").
2. Reads sheet II ("Indikatoren") of each workbook with ``openpyxl`` (an
   existing direct dependency; no new library) using an **explicit per-edition
   map** (`EDITION_SPECS`). An edition without a map entry raises. Every header
   the map relies on is checked against the sheet text before any value is
   read: the S1-S7 / D1-D6 code row, the "Mittelwert" / "SD" rows and the long
   indicator labels. The core indicators S3/S4/S5 are matched on their **full
   label text** per edition (the #360 lesson: map by header, never by
   position). A mismatch raises; headers are never guessed.
3. Writes one long parquet (one row per edition x Gebiet x indicator, S1-S7 and
   D1-D6) to ``data/raw/hamburg/sozialmonitoring_annex/annex_indicators.parquet``
   (gitignored). The raw workbooks stay in
   ``data/raw/hamburg/sozialmonitoring_annex/xlsx/`` (gitignored).

The parquet carries the values **as published**: the z-score, the edition's
"Mittelwert" and "SD" row for that indicator, the Gebiet's Status-/Dynamik-summe
and population. Share recovery (mean + z * SD), the S7 exclusion code and every
other interpretation happen in the dbt staging model
``stg_hamburg_sozialmonitoring_indicators``, so they are visible in SQL and
covered by dbt tests.

Directory note: the annex lives in its own ``sozialmonitoring_annex/``
directory because ``stg_hamburg_sozialmonitoring`` globs
``data/raw/hamburg/sozialmonitoring/*.parquet`` (union_by_name); a second
parquet there would be unioned into the WFS class table.

Role rule (R-A1): these indicators are OUTCOME components only and must never
enter a model as predictors (ADR-0014 amendment; same boundary as Berlin MSS,
ADR-0006 / R-C3).

Licence: dl-de/by-2.0. Attribution: "Freie und Hansestadt Hamburg, Behörde für
Stadtentwicklung und Wohnen".

Untrusted input (SEC-3): workbook cells are data only. Text cells are compared
against the expected labels; nothing in a workbook is executed or followed.

Usage::

    uv run python ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py
    # reuse already-downloaded workbooks (no HTTP):
    uv run python ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py --offline
"""

from __future__ import annotations

import argparse
import hashlib
import logging
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import pyarrow as pa

_INGESTION_ROOT = Path(__file__).resolve().parents[2]
if str(_INGESTION_ROOT) not in sys.path:
    sys.path.insert(0, str(_INGESTION_ROOT))
from manifest import existing_outputs, write_manifest_entry  # noqa: E402

from common.http import DEFAULT_USER_AGENT, FetchError, fetch_bytes  # noqa: E402
from common.io import atomic_write_bytes, atomic_write_parquet  # noqa: E402

log = logging.getLogger("hamburg_sozialmonitoring_annex_ingest")

CITY_CODE = "HH"
SOURCE_ATTRIBUTION = (
    "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen "
    "— Sozialmonitoring Integrierte Stadtteilentwicklung, Bericht <E> - Anhang, "
    "dl-de/by-2.0 — https://transparenz.hamburg.de/"
)

_GETRESSOURCE = (
    "https://daten.transparenz.hamburg.de/Dataport.HmbTG.ZS.Webservice.GetRessource100/"
    "GetRessource100.svc"
)

STATUS_CODES = ("S1", "S2", "S3", "S4", "S5", "S6", "S7")
DYNAMIK_CODES = ("D1", "D2", "D3", "D4", "D5", "D6")
INDICATOR_CODES = STATUS_CODES + DYNAMIK_CODES

# Sheet-II column layout (verified 2026-11-04 for all ten editions):
# A Stadtteil, B Stat. Gebiet, C Bevoelkerung, D-J S1-S7, K Status-summe,
# L-Q D1-D6, R Dynamik-summe. Kept as data, re-checked against the header
# text of every edition before use.
_LAYOUT_2016_2025: dict[str, str] = {
    "stadtteil": "A",
    "gebiet": "B",
    "population": "C",
    "S1": "D",
    "S2": "E",
    "S3": "F",
    "S4": "G",
    "S5": "H",
    "S6": "I",
    "S7": "J",
    "status_summe": "K",
    "D1": "L",
    "D2": "M",
    "D3": "N",
    "D4": "O",
    "D5": "P",
    "D6": "Q",
    "dynamik_summe": "R",
}

# Keywords every long label must contain (all editions). The core S3/S4/S5
# labels are additionally matched on their full per-edition text.
_LABEL_KEYWORDS: dict[str, str] = {
    "S1": "Migrationshintergrund",
    "S2": "Alleinerziehenden",
    "S3": "SGB-II",
    "S4": "Arbeitslose",
    "S5": "Mindestsicherung",
    "S6": "Mindestsicherung im Alter",
    "S7": "Schulabschl",
    "D1": "Migrationshintergrund",
    "D2": "Alleinerziehenden",
    "D3": "SGB-II",
    "D4": "Arbeitslose",
    "D5": "Mindestsicherung",
    "D6": "Mindestsicherung im Alter",
}

_S3_PRE2019 = "S3 SGB-II-Empfänger/-innen"
_S3_FROM2019 = "S3 SGB-II- und AsylbLG-Empfänger/-innen"
_S4_PLAIN = "S4 Arbeitslose"
_S4_SGB2 = "S4 Arbeitslose (SGB II)"
_S5_PLAIN = "S5 Kinder (unter 15 Jahren) in Mindestsicherung"
_S5_SGB2 = "S5 Kinder (unter 15 Jahren) in Mindestsicherung (SGB II)"


@dataclass(frozen=True)
class AnnexSpec:
    """Explicit per-edition map of one annex workbook (sheet II)."""

    edition: int
    url: str
    filename: str
    sheet: str
    header_row: int  # row with the S1..S7 / D1..D6 codes
    mean_row: int  # "Mittelwert"
    sd_row: int  # "SD"
    first_data_row: int
    expected_n_gebiete: int  # = seed_hh_sozialmonitoring_published_class_counts
    core_labels: dict[str, str]  # full expected label text for S3, S4, S5
    columns: dict[str, str] = field(default_factory=lambda: dict(_LAYOUT_2016_2025))


def _spec(
    edition: int,
    resource_id: str,
    filename: str,
    sheet: str,
    header_row: int,
    n: int,
    s3: str,
    s4: str,
    s5: str,
) -> AnnexSpec:
    return AnnexSpec(
        edition=edition,
        url=f"{_GETRESSOURCE}/{resource_id}/{filename}",
        filename=filename,
        sheet=sheet,
        header_row=header_row,
        mean_row=header_row + 2,
        sd_row=header_row + 3,
        first_data_row=header_row + 4,
        expected_n_gebiete=n,
        core_labels={"S3": s3, "S4": s4, "S5": s5},
    )


# Pinned URLs: transform/seeds/schema.yml, seed_hh_sozialmonitoring_published_class_counts.
# n = published scored-Gebiet count per edition (same seed; phase-A doc §4).
EDITION_SPECS: dict[int, AnnexSpec] = {
    s.edition: s
    for s in (
        _spec(
            2016,
            "945dfd03-8c0e-47f8-9f16-d4847b04554e",
            "Upload__sozialmonitoring-bericht-2016_anhang-tabelle.xlsx",
            "II Indikatoren2",
            8,
            847,
            _S3_PRE2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2017,
            "608cd59c-8f4e-4100-a438-c5e1cb308f69",
            "Upload__sozialmonitoring-bericht-2017_anhang-tabelle.xlsx",
            "II Indikatoren",
            8,
            846,
            _S3_PRE2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2018,
            "05f30395-0793-4652-8862-e997103f5aca",
            "Upload__sozialmonitoring-bericht_2018_anhang-tabelle_korrigiert.xlsx",
            "II Indikatoren",
            8,
            848,
            _S3_PRE2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2019,
            "35025574-c6e5-4d8e-98b6-5da18ef46637",
            "Upload__Sozialmonitoring-Bericht_2019_Anhang_Tabelle.xlsx",
            "II_Indikatoren",
            9,
            852,
            _S3_FROM2019,
            _S4_SGB2,
            _S5_SGB2,
        ),
        _spec(
            2020,
            "51ede4f2-b8ec-4126-90de-b864d1617c23",
            "Upload__Sozialmonitoring-Bericht_2020_Anhang_Tabelle.xlsx",
            "II_Indikatoren",
            8,
            850,
            _S3_FROM2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2021,
            "23c6a735-eed0-415e-9a81-04d4d8bf774b",
            "Upload__Sozialmonitoring-Bericht_2021_Ergebnistabellen.xlsx",
            "II_Indikatoren",
            8,
            853,
            _S3_FROM2019,
            _S4_SGB2,
            _S5_PLAIN,
        ),
        _spec(
            2022,
            "5d652062-7958-4fcc-86f9-988e5f8b06c4",
            "Upload__Sozialmonitoring-Bericht_2022_Ergebnistabellen.XLSX",
            "II_Indikatoren",
            8,
            853,
            _S3_FROM2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2023,
            "eb081372-202f-4429-8a2a-7989c46c17d6",
            "Upload__Sozialmonitoring-Bericht_2023_Ergebnistabellen.XLSX",
            "II_Indikatoren",
            8,
            856,
            _S3_FROM2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2024,
            "04b0dceb-d27f-42ff-8790-8856ce89a004",
            "Upload__Sozialmonitoring-Bericht_2024_Ergebnistabellen.XLSX",
            "II_Indikatoren",
            8,
            857,
            _S3_FROM2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
        _spec(
            2025,
            "ee0ecec9-c569-43ca-bc90-fc3f560ff1a9",
            "Upload__Sozialmonitoring-Bericht_2025_Ergebnistabellen.XLSX",
            "II_Indikatoren",
            8,
            857,
            _S3_FROM2019,
            _S4_PLAIN,
            _S5_PLAIN,
        ),
    )
}

ANNEX_PARQUET_SCHEMA = pa.schema(
    [
        pa.field("city_code", pa.string()),
        pa.field("edition", pa.int32()),
        pa.field("gebiet_id", pa.string()),
        pa.field("stadtteil_name", pa.string()),
        pa.field("population", pa.int64()),
        pa.field("indicator", pa.string()),
        pa.field("indicator_label_de", pa.string()),
        pa.field("z_published", pa.float64()),
        pa.field("edition_mean", pa.float64()),
        pa.field("edition_sd", pa.float64()),
        pa.field("status_summe", pa.float64()),
        pa.field("dynamik_summe", pa.float64()),
        pa.field("source_file", pa.string()),
        pa.field("source_sha256", pa.string()),
        pa.field("source_attribution", pa.string()),
    ]
)


class AnnexLayoutError(RuntimeError):
    """The workbook does not match its explicit per-edition map."""


def _norm(text: object) -> str:
    """Collapse whitespace; the label text is otherwise compared verbatim."""
    return re.sub(r"\s+", " ", str(text)).strip()


def spec_for(edition: int) -> AnnexSpec:
    """Return the explicit map for `edition`; fail loudly if there is none."""
    try:
        return EDITION_SPECS[edition]
    except KeyError:
        raise AnnexLayoutError(
            f"No column map for Sozialmonitoring annex edition {edition}. "
            "Add an explicit EDITION_SPECS entry after inspecting the workbook; "
            "headers are never guessed (ADR-0014 amendment 2026-11-02)."
        ) from None


def _cell(ws, col: str, row: int):
    return ws[f"{col}{row}"].value


def _labels(ws, spec: AnnexSpec) -> dict[str, str]:
    """Long indicator labels from the rows above the code row (cols of S1 / D1)."""
    labels: dict[str, str] = {}
    for col in (spec.columns["S1"], spec.columns["D1"]):
        for row in range(1, spec.header_row):
            value = _cell(ws, col, row)
            if not isinstance(value, str):
                continue
            text = _norm(value)
            code = text[:2]
            if code in INDICATOR_CODES and (len(text) == 2 or text[2] == " "):
                labels[code] = text
    return labels


def validate_layout(ws, spec: AnnexSpec) -> dict[str, str]:
    """Check every header the map relies on. Returns the long label per code."""
    problems: list[str] = []
    cols = spec.columns
    for code in INDICATOR_CODES:
        got = _cell(ws, cols[code], spec.header_row)
        if _norm(got) != code:
            problems.append(f"{cols[code]}{spec.header_row}: expected {code!r}, got {got!r}")
    dyn = _cell(ws, cols["dynamik_summe"], spec.header_row)
    if _norm(dyn) != "Dynamik-summe":
        problems.append(f"{cols['dynamik_summe']}{spec.header_row}: expected 'Dynamik-summe'")
    stadtteil = _norm(_cell(ws, cols["stadtteil"], spec.header_row))
    if not stadtteil.startswith("Stadtteil"):
        problems.append(f"{cols['stadtteil']}{spec.header_row}: expected 'Stadtteil*'")
    if _norm(_cell(ws, cols["population"], spec.mean_row)) != "Mittelwert":
        problems.append(f"{cols['population']}{spec.mean_row}: expected 'Mittelwert'")
    if _norm(_cell(ws, cols["population"], spec.sd_row)) != "SD":
        problems.append(f"{cols['population']}{spec.sd_row}: expected 'SD'")

    labels = _labels(ws, spec)
    for code, keyword in _LABEL_KEYWORDS.items():
        label = labels.get(code)
        if label is None:
            problems.append(f"no long label for {code}")
        elif keyword not in label:
            problems.append(f"label for {code} lacks {keyword!r}: {label!r}")
    for code, expected in spec.core_labels.items():
        if labels.get(code) != expected:
            problems.append(f"core label {code}: expected {expected!r}, got {labels.get(code)!r}")
    if problems:
        raise AnnexLayoutError(
            f"Annex edition {spec.edition} ({spec.filename}, sheet {spec.sheet!r}) does not "
            "match its column map:\n  " + "\n  ".join(problems)
        )
    return labels


def _as_float(value: object, where: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise AnnexLayoutError(f"{where}: expected a number, got {value!r}")
    return float(value)


def parse_workbook(path: Path, spec: AnnexSpec, sha256: str = "") -> list[dict]:
    """Parse sheet II of one annex workbook into long rows (values as published)."""
    import openpyxl  # local import keeps module import cheap for --help / tests

    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    try:
        if spec.sheet not in wb.sheetnames:
            raise AnnexLayoutError(
                f"Annex edition {spec.edition}: sheet {spec.sheet!r} not found "
                f"(sheets: {wb.sheetnames})"
            )
        ws = wb[spec.sheet]
        # read_only worksheets do not support random access by coordinate on
        # every openpyxl version; materialise the needed rows once.
        grid = _materialise(ws)
        labels = validate_layout(_GridView(grid), spec)
        view = _GridView(grid)
        cols = spec.columns
        means = {
            c: _as_float(view[f"{cols[c]}{spec.mean_row}"].value, f"mean {c}")
            for c in INDICATOR_CODES
        }
        sds = {
            c: _as_float(view[f"{cols[c]}{spec.sd_row}"].value, f"sd {c}") for c in INDICATOR_CODES
        }

        rows: list[dict] = []
        seen: set[str] = set()
        r = spec.first_data_row
        while True:
            gebiet = view[f"{cols['gebiet']}{r}"].value
            if gebiet is None or (isinstance(gebiet, str) and not gebiet.strip()):
                break
            if isinstance(gebiet, float) and gebiet.is_integer():
                gebiet = int(gebiet)
            gebiet_id = str(gebiet).strip()
            if not gebiet_id.isdigit():
                raise AnnexLayoutError(f"row {r}: Gebiet id {gebiet!r} is not numeric")
            if gebiet_id in seen:
                raise AnnexLayoutError(f"row {r}: duplicate Gebiet id {gebiet_id}")
            seen.add(gebiet_id)
            population = int(_as_float(view[f"{cols['population']}{r}"].value, f"pop r{r}"))
            stadtteil = _norm(view[f"{cols['stadtteil']}{r}"].value)
            status_summe = _as_float(view[f"{cols['status_summe']}{r}"].value, f"Ssum r{r}")
            dynamik_summe = _as_float(view[f"{cols['dynamik_summe']}{r}"].value, f"Dsum r{r}")
            for code in INDICATOR_CODES:
                z = _as_float(view[f"{cols[code]}{r}"].value, f"{code} r{r}")
                rows.append(
                    {
                        "city_code": CITY_CODE,
                        "edition": spec.edition,
                        "gebiet_id": gebiet_id,
                        "stadtteil_name": stadtteil,
                        "population": population,
                        "indicator": code,
                        "indicator_label_de": labels[code],
                        "z_published": z,
                        "edition_mean": means[code],
                        "edition_sd": sds[code],
                        "status_summe": status_summe,
                        "dynamik_summe": dynamik_summe,
                        "source_file": spec.filename,
                        "source_sha256": sha256,
                        "source_attribution": SOURCE_ATTRIBUTION.replace("<E>", str(spec.edition)),
                    }
                )
            r += 1
    finally:
        wb.close()

    n = len(seen)
    if n != spec.expected_n_gebiete:
        raise AnnexLayoutError(
            f"Annex edition {spec.edition}: {n} Gebiete parsed, expected "
            f"{spec.expected_n_gebiete} (seed_hh_sozialmonitoring_published_class_counts)"
        )
    log.info("Edition %d: %d Gebiete, %d rows", spec.edition, n, len(rows))
    return rows


def _materialise(ws) -> dict[tuple[int, int], object]:
    grid: dict[tuple[int, int], object] = {}
    for row in ws.iter_rows():
        for c in row:
            if getattr(c, "value", None) is not None and hasattr(c, "row"):
                grid[(c.row, c.column)] = c.value
    return grid


class _Cell:
    __slots__ = ("value",)

    def __init__(self, value: object) -> None:
        self.value = value


class _GridView:
    """Minimal ``ws["B12"].value`` accessor over a materialised sheet."""

    def __init__(self, grid: dict[tuple[int, int], object]) -> None:
        self._grid = grid

    def __getitem__(self, coord: str) -> _Cell:
        from openpyxl.utils.cell import coordinate_from_string, column_index_from_string

        col, row = coordinate_from_string(coord)
        return _Cell(self._grid.get((row, column_index_from_string(col))))


def write_parquet(rows: list[dict], out_path: Path) -> None:
    columns = {f.name: [r[f.name] for r in rows] for f in ANNEX_PARQUET_SCHEMA}
    table = pa.table(
        {
            name: pa.array(vals, type=ANNEX_PARQUET_SCHEMA.field(name).type)
            for name, vals in columns.items()
        },
        schema=ANNEX_PARQUET_SCHEMA,
    )
    atomic_write_parquet(table, out_path)


def _sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Ingest the Hamburg Sozialmonitoring annex indicator z-scores (#371)."
    )
    p.add_argument(
        "--out-dir",
        type=Path,
        default=_INGESTION_ROOT.parent / "data" / "raw" / "hamburg" / "sozialmonitoring_annex",
    )
    p.add_argument(
        "--offline",
        action="store_true",
        help="Use the workbooks already in <out-dir>/xlsx; never download.",
    )
    p.add_argument("--refresh", action="store_true", help="Re-download even if present.")
    p.add_argument("--editions", type=int, nargs="*", default=sorted(EDITION_SPECS))
    return p


def main(argv: Optional[list[str]] = None) -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    )
    args = build_parser().parse_args(argv)
    out_dir: Path = args.out_dir.resolve()
    xlsx_dir = out_dir / "xlsx"
    xlsx_dir.mkdir(parents=True, exist_ok=True)

    rows: list[dict] = []
    for edition in args.editions:
        spec = spec_for(edition)
        local = xlsx_dir / f"annex_{edition}.xlsx"
        if args.refresh or not local.exists():
            if args.offline:
                log.error("Edition %d: %s missing and --offline set", edition, local)
                return 1
            try:
                data = fetch_bytes(
                    spec.url, timeout=180, headers={"User-Agent": DEFAULT_USER_AGENT}
                )
            except FetchError as exc:
                log.error("Edition %d: download failed: %s", edition, exc)
                return 1
            atomic_write_bytes(data, local)
            log.info("Edition %d: downloaded %d bytes -> %s", edition, len(data), local)
        try:
            rows.extend(parse_workbook(local, spec, sha256=_sha256(local)))
        except AnnexLayoutError as exc:
            log.error("%s", exc)
            return 1

    out_path = out_dir / "annex_indicators.parquet"
    write_parquet(rows, out_path)
    log.info("Wrote %d rows (%d editions) -> %s", len(rows), len(args.editions), out_path)

    found = existing_outputs(out_dir, ["annex_indicators.parquet"])
    if found:
        write_manifest_entry(
            source_id="hamburg__sozialmonitoring_annex",
            source_class="pinned",
            city="hamburg",
            upstream_url=(
                "https://daten.transparenz.hamburg.de/ (GetRessource100; per-edition pinned "
                "annex XLSX, see EDITION_SPECS)"
            ),
            upstream_vintage="Sozialmonitoring report annexes, editions 2016-2025",
            output_paths=found,
            ingest_script_module=(
                "ingestion.hamburg.sozialmonitoring.ingest_hamburg_sozialmonitoring_annex"
            ),
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())

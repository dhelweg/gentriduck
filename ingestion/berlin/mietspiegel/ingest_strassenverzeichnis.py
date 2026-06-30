"""
ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py
===========================================================
D1c — Berliner Mietspiegel Strassenverzeichnis multi-vintage PDF ingestion.

Downloads the official Strassenverzeichnis PDF for each known vintage, extracts
the street-level wohnlage assignments with pdfplumber (text extraction, not table
parsing — the PDFs use a two-column text layout, not a pdfplumber-detectable table
structure), and writes one Parquet per vintage to --out-dir.

PDF sources (all confirmed live, 2026-06-30, from mietspiegel.berlin.de/berliner-mietspiegel/archiv/):
  2017: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2017_.pdf
  2019: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2019_.pdf
  2021: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2021.pdf
  2023: https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2023.pdf
  2024: https://mietspiegel.berlin.de/wp-content/uploads/2024/11/strassenverzeichnis-zum-mietspiegel-2024-1.pdf
  2026: https://mietspiegel.berlin.de/wp-content/uploads/2026/05/strassenverzeichnis-zum-mietspiegel-2026.pdf

Source: Senatsverwaltung fuer Stadtentwicklung und Wohnen Berlin
  License: © Land Berlin — not freely redistributable in automated form (ADR-0003
  item 11).  Only extracted wohnlage assignments are committed; raw PDFs are gitignored.

Layout (all vintages):
  Two-column text layout per page.  Each half-line represents one street segment:
    <street_name> <district_abbrev> <orientation> <house_no_range> <parity> <wohnlage> [<old_wohnlage>]
  Where:
    orientation  W (West) or O (Ost)
    house_no_range  e.g. "1 - 31", "63 - 100", or "K" (alle Hausnummern)
    parity  F (all), U (ungerade/odd), G (gerade/even)
    wohnlage  einfach | mittel | gut
    old_wohnlage  optional (WL7 column present in 2017 only; dropped from output)

  The 2017 PDF has an additional trailing column (WL7 = former wohnlage designation)
  which is ignored.  2019+ use 6 columns.

Output Parquet schema (data/raw/berlin/mietspiegel/strassenverzeichnis_{year}.parquet):
  vintage              (int32):   Edition year (2017, 2019, 2021, 2023, 2024, 2026)
  street_name          (string):  Street name as printed in the Strassenverzeichnis
  house_no_from        (string):  Lower bound of the house number range (or '' for K)
  house_no_to          (string):  Upper bound of the house number range (or '' for K)
  house_no_parity      (string):  F / U / G (all / odd / even)
  house_no_all         (boolean): True when the record applies to all house numbers (K)
  wohnlage             (string):  Wohnlage classification (einfach/mittel/gut)
  source_attribution   (string):  Full source citation

Usage:
  # All vintages:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py \\
      --out-dir data/raw/berlin/mietspiegel

  # Specific vintages:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py \\
      --out-dir data/raw/berlin/mietspiegel --years 2024,2026

  # Dry run (no network calls, no output):
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py \\
      --out-dir data/raw/berlin/mietspiegel --dry-run

  # Verbose logging:
  uv run --with pdfplumber python ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py \\
      --out-dir data/raw/berlin/mietspiegel --years 2026 --verbose

Note: pdfplumber is intentionally NOT added to pyproject.toml — use
  `uv run --with pdfplumber` to avoid adding a heavy PDF dependency to the
  core environment that does not otherwise require it.
"""

from __future__ import annotations

import argparse
import logging
import re
import ssl
import sys
import urllib.request
from pathlib import Path
from typing import Optional

# macOS Python does not ship CA certs; use certifi's bundle when available.
try:
    import certifi as _certifi

    _SSL_CONTEXT = ssl.create_default_context(cafile=_certifi.where())
except ImportError:
    _SSL_CONTEXT = ssl.create_default_context()

try:
    import pdfplumber  # noqa: F401 — checked at import time; used in parse functions
except ImportError as exc:
    raise ImportError(
        "pdfplumber is required for Strassenverzeichnis ingestion.  "
        "Run with: uv run --with pdfplumber python "
        "ingestion/berlin/mietspiegel/ingest_strassenverzeichnis.py"
    ) from exc

import pyarrow as pa
import pyarrow.parquet as pq

# ---------------------------------------------------------------------------
# Known vintages and PDF URLs (confirmed live 2026-06-30 from archive page)
# ---------------------------------------------------------------------------

VINTAGE_URLS: dict[int, str] = {
    2017: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2017_.pdf",
    2019: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2019_.pdf",
    2021: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2021.pdf",
    2023: "https://mietspiegel.berlin.de/wp-content/uploads/2026/01/strassenverzeichnis2023.pdf",
    2024: "https://mietspiegel.berlin.de/wp-content/uploads/2024/11/strassenverzeichnis-zum-mietspiegel-2024-1.pdf",
    2026: "https://mietspiegel.berlin.de/wp-content/uploads/2026/05/strassenverzeichnis-zum-mietspiegel-2026.pdf",
}

_STICHTAG: dict[int, str] = {
    2017: "01.09.2016",
    2019: "01.09.2018",
    2021: "01.09.2020",
    2023: "01.09.2022",
    2024: "01.09.2023",
    2026: "01.09.2025",
}

_ATTRIBUTION_TEMPLATE = (
    "Strassenverzeichnis zum Berliner Mietspiegel {year}; "
    "Senatsverwaltung fuer Stadtentwicklung und Wohnen Berlin; "
    "Stichtag {stichtag}"
)


def _attribution(year: int) -> str:
    stichtag = _STICHTAG.get(year, "unknown")
    return _ATTRIBUTION_TEMPLATE.format(year=year, stichtag=stichtag)


# ---------------------------------------------------------------------------
# Parquet schema
# ---------------------------------------------------------------------------

STRASSENVERZEICHNIS_SCHEMA = pa.schema(
    [
        pa.field("vintage", pa.int32()),
        pa.field("street_name", pa.string()),
        pa.field("house_no_from", pa.string()),
        pa.field("house_no_to", pa.string()),
        pa.field("house_no_parity", pa.string()),
        pa.field("house_no_all", pa.bool_()),
        pa.field("wohnlage", pa.string()),
        pa.field("source_attribution", pa.string()),
    ]
)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s -- %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
log = logging.getLogger("strassenverzeichnis_ingest")

# ---------------------------------------------------------------------------
# PDF download
# ---------------------------------------------------------------------------


def download_pdf(url: str, dest: Path, timeout: int = 60) -> None:
    """Download a PDF to dest (atomic write via temp file)."""
    tmp = dest.with_suffix(".tmp.pdf")
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "gentriduck-ingest/1.0"})
    log.info("Downloading %s -> %s", url, dest)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CONTEXT) as resp:  # noqa: S310
            data = resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Network error downloading {url}: {exc}") from exc
    tmp.write_bytes(data)
    tmp.rename(dest)
    log.info("Saved %d bytes -> %s", len(data), dest)


# ---------------------------------------------------------------------------
# Text-line parsing
# ---------------------------------------------------------------------------

# The Strassenverzeichnis uses a two-column text layout.  pdfplumber's text
# extraction returns both columns concatenated into a single line, e.g.:
#
#  "Albrechtstraße TSch W 63 - 100 F einfach Alt-Friedrichsfelde Lich O 26 - 40 F mittel"
#
# We split each text line at the column midpoint by tokenising and looking for
# the wohnlage token.
#
# Column format (6-token per entry for 2019+, 7-token for 2017):
#   <name...> <bezirk> <orient> <hn_from> - <hn_to> <parity> <wl> [<wl_old>]
#
# Or for "K" (all house numbers):
#   <name...> <bezirk> <orient> K <parity> <wl> [<wl_old>]
#
# Parsing strategy:
#   1. Scan tokens right-to-left for the first token in {einfach, mittel, gut}.
#   2. That is WL6 (current wohnlage).
#   3. The token before WL6 is the parity (F/U/G/A or similar).
#   4. Tokens before parity are the house-number range:
#      - "K" => all numbers
#      - "<n> - <m>" => range
#      - single token => single number
#   5. Before the house-number section is orientation (W/O).
#   6. Before orientation is the district abbreviation (2-5 chars, all alpha or mixed).
#   7. Everything before district abbreviation is the street name.
#
# This approach is robust to multi-word street names and district abbreviations.

_WOHNLAGE_TOKENS = {"einfach", "mittel", "gut"}
_ORIENTATION_TOKENS = {"W", "O"}
_PARITY_TOKENS = {"F", "U", "G"}

# Regex for a standalone house-number token: digits optionally followed by
# letters/dots (e.g. "35", "35A", "35 A" is two tokens, "3.", "17 A").
_HN_TOKEN_RE = re.compile(r"^\d+[A-Za-z./]*$")

# Header / section-title markers to skip
_SKIP_PATTERNS = [
    re.compile(r"(?i)stra[sß]enverzeichnis"),
    re.compile(r"(?i)stra[sß]enname"),
    re.compile(r"(?i)berliner mietspiegel"),
    re.compile(r"(?i)www\.berlin\.de"),
    re.compile(r"(?i)hausnr"),
    re.compile(r"(?i)bezirk"),
    re.compile(r"(?i)seite"),
]


def _is_hn_token(tok: str) -> bool:
    """Return True if tok looks like a house-number fragment."""
    return bool(_HN_TOKEN_RE.match(tok)) or tok in ("-", "–")


def _parse_entry(tokens: list[str]) -> Optional[dict]:
    """
    Parse one street-entry token list into a structured dict.

    Returns None if the token list does not match the expected pattern.
    Tolerates ligature and encoding artefacts in street names (e.g. pdfplumber
    may emit 'A昀昀ensteinweg' for 'Affentsteinweg').
    """
    # Must have at least 4 tokens: <name> <bezirk> <orient> <wl>
    if len(tokens) < 4:
        return None

    # Step 1: find wohnlage (last occurrence of an einfach/mittel/gut token,
    # scanning right-to-left — because 2017 has an optional trailing WL7 token
    # that must be ignored).
    wl_idx = None
    for i in range(len(tokens) - 1, -1, -1):
        cleaned = tokens[i].rstrip("*")
        if cleaned in _WOHNLAGE_TOKENS:
            wl_idx = i
            break
    if wl_idx is None:
        return None

    wohnlage = tokens[wl_idx].rstrip("*")

    # Tokens after wl_idx are ignored (e.g. WL7 in 2017 or page artefacts).
    # Tokens before wl_idx:
    pre_wl = tokens[:wl_idx]
    if not pre_wl:
        return None

    # Step 2: parity token (immediately before WL6).
    parity_idx = len(pre_wl) - 1
    parity = pre_wl[parity_idx].rstrip("*")
    # Accept F/U/G; also allow single letter with suffix (e.g. 'F*')
    if parity not in _PARITY_TOKENS:
        log.debug("Unexpected parity token %r; trying to continue", parity)
        # Best effort: fall back to 'F' rather than dropping the row
        parity = "F"
        # Don't consume a token since it was not a valid parity
        pre_hn = pre_wl
    else:
        pre_hn = pre_wl[:parity_idx]

    if not pre_hn:
        return None

    # Step 3: house-number range.
    # Scan back from the last token of pre_hn collecting consecutive HN-like tokens.
    hn_tokens: list[str] = []
    hn_end = len(pre_hn) - 1
    # Collect from hn_end leftward while tokens look like house numbers or '-'.
    idx = hn_end
    while idx >= 0 and _is_hn_token(pre_hn[idx]):
        hn_tokens.insert(0, pre_hn[idx])
        idx -= 1

    # Special case: single 'K' means all house numbers.
    if hn_tokens == ["K"] or (not hn_tokens and idx >= 0 and pre_hn[idx] == "K"):
        if not hn_tokens:
            hn_tokens = ["K"]
            idx -= 1
        house_no_all = True
        house_no_from = ""
        house_no_to = ""
    elif hn_tokens:
        house_no_all = False
        # Normalize: "35 - 100" or "35" or "35 A - 100"
        # Flatten collected tokens into a range string, then split on '-'.
        raw_range = " ".join(hn_tokens)
        # Split on dash (en-dash or hyphen) to get from/to.
        parts = re.split(r"\s*[-–]\s*", raw_range, maxsplit=1)
        house_no_from = parts[0].strip()
        house_no_to = parts[1].strip() if len(parts) > 1 else house_no_from
    else:
        # No house number tokens found and no 'K' — treat as whole street
        house_no_all = True
        house_no_from = ""
        house_no_to = ""

    # Remaining tokens: street_name + district + orientation
    remaining = pre_hn[: idx + 1]
    if len(remaining) < 3:
        return None

    # Orientation is the last remaining token (W/O).
    orient_idx = len(remaining) - 1
    orientation = remaining[orient_idx]
    if orientation not in _ORIENTATION_TOKENS:
        log.debug("Unexpected orientation %r in tokens %s", orientation, tokens)
        return None

    # District abbreviation: second to last remaining token.
    district_idx = orient_idx - 1
    if district_idx < 1:
        return None

    # Street name: everything before district.
    street_tokens = remaining[:district_idx]
    if not street_tokens:
        return None

    street_name = " ".join(street_tokens)

    # Strip alphabet-section prefix: a single uppercase letter at the start of
    # the street name is a pdfplumber artefact from the section divider printed
    # at the beginning of each alphabet group.  E.g. 'A Abcstraße' → 'Abcstraße'.
    # Pattern: first token is exactly one uppercase letter; second token is a word
    # starting with the same letter (or is the actual street name).
    if len(street_tokens) >= 2 and re.match(r"^[A-Z]$", street_tokens[0]):
        street_name = " ".join(street_tokens[1:])

    return {
        "street_name": street_name,
        "house_no_from": house_no_from,
        "house_no_to": house_no_to,
        "house_no_parity": parity,
        "house_no_all": house_no_all,
        "wohnlage": wohnlage,
    }


def _should_skip_line(line: str) -> bool:
    """Return True for header/footer/section-title lines that should not be parsed."""
    if not line.strip():
        return True
    for pat in _SKIP_PATTERNS:
        if pat.search(line):
            return True
    return False


def _split_two_column_line(line: str) -> list[str]:
    """
    Split a two-column text line into one or two raw text segments.

    The Strassenverzeichnis PDFs lay out data in two columns.  pdfplumber
    concatenates both columns into a single text line.  We need to split at the
    column boundary.

    Strategy:
      1. Find the first wohnlage token (WL6 of the first entry).
      2. In the 2017 PDFs, WL6 is immediately followed by a one-letter old-wohnlage
         code (WL7: Z or D), which is NOT a wohnlage token.  Skip it if present.
      3. Everything after the WL6 (and optional WL7) is the second entry.

    2017 per-line format:
      <entry1> <wl6_1> <wl7_1> <entry2> <wl6_2> <wl7_2>
    2019+ format:
      <entry1> <wl6_1> <entry2> <wl6_2>
    """
    # Tokenise the whole line.
    tokens = line.split()

    # Find all positions of wohnlage tokens.
    wl_positions = [i for i, t in enumerate(tokens) if t.rstrip("*") in _WOHNLAGE_TOKENS]

    if not wl_positions:
        return []  # No wohnlage → not a data line

    if len(wl_positions) == 1:
        # Only one wohnlage in the line → single entry.
        return [line]

    # Two (or more) wohnlage positions → two entries.
    # The first entry ends at wl_positions[0].
    # After it there may be a WL7 token (a single letter Z or D in 2017 format).
    # The second entry starts right after WL6 (or WL7 if present).
    wl1 = wl_positions[0]
    # Check if the token immediately after wl1 is a single-letter WL7 code (Z/D).
    second_start = wl1 + 1
    if second_start < len(tokens) and tokens[second_start] in ("Z", "D"):
        second_start += 1  # skip WL7

    first_tokens = tokens[: wl1 + 1]
    second_tokens = tokens[second_start:]

    parts = []
    if first_tokens:
        parts.append(" ".join(first_tokens))
    if second_tokens:
        parts.append(" ".join(second_tokens))
    return parts


# ---------------------------------------------------------------------------
# Per-PDF extraction
# ---------------------------------------------------------------------------


def _extract_from_pdf(pdf_path: Path, vintage: int) -> list[dict]:
    """
    Extract street-level wohnlage rows from a Strassenverzeichnis PDF.

    Uses pdfplumber text extraction (not table extraction — the PDFs use a
    columnar text layout that pdfplumber cannot parse as tables).

    Returns a list of dicts with keys:
      street_name, house_no_from, house_no_to, house_no_parity,
      house_no_all, wohnlage
    """
    import pdfplumber  # noqa: PLC0415

    rows: list[dict] = []
    total_pages = 0
    skipped_pages = 0

    with pdfplumber.open(str(pdf_path)) as pdf:
        total_pages = len(pdf.pages)
        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            for raw_line in text.splitlines():
                line = raw_line.strip()
                if _should_skip_line(line):
                    continue

                segments = _split_two_column_line(line)
                for seg in segments:
                    entry = _parse_entry(seg.split())
                    if entry is not None:
                        rows.append(entry)
                    else:
                        log.debug(
                            "vintage=%d page=%d: could not parse segment %r", vintage, page_num, seg
                        )

    log.info(
        "vintage=%d: extracted %d rows from %d pages (%d skipped)",
        vintage,
        len(rows),
        total_pages,
        skipped_pages,
    )
    return rows


# ---------------------------------------------------------------------------
# Write Parquet
# ---------------------------------------------------------------------------


def write_parquet(rows: list[dict], out_path: Path, vintage: int, attribution: str) -> None:
    """Write extracted rows to Parquet using the Strassenverzeichnis schema."""
    n = len(rows)
    tmp_path = out_path.with_suffix(".tmp.parquet")
    table = pa.table(
        {
            "vintage": pa.array([vintage] * n, type=pa.int32()),
            "street_name": pa.array([r["street_name"] for r in rows], type=pa.string()),
            "house_no_from": pa.array([r["house_no_from"] for r in rows], type=pa.string()),
            "house_no_to": pa.array([r["house_no_to"] for r in rows], type=pa.string()),
            "house_no_parity": pa.array([r["house_no_parity"] for r in rows], type=pa.string()),
            "house_no_all": pa.array([r["house_no_all"] for r in rows], type=pa.bool_()),
            "wohnlage": pa.array([r["wohnlage"] for r in rows], type=pa.string()),
            "source_attribution": pa.array([attribution] * n, type=pa.string()),
        },
        schema=STRASSENVERZEICHNIS_SCHEMA,
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pq.write_table(table, tmp_path, compression="snappy")
    tmp_path.rename(out_path)
    log.info("Wrote %d rows -> %s", n, out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description=(
            "Download Berliner Mietspiegel Strassenverzeichnis PDFs and extract "
            "street-level wohnlage assignments to Parquet "
            "(data/raw/berlin/mietspiegel/strassenverzeichnis_{year}.parquet). "
            "Requires pdfplumber: run with 'uv run --with pdfplumber python ...'."
        )
    )
    p.add_argument(
        "--out-dir",
        default="data/raw/berlin/mietspiegel",
        type=Path,
        help="Output directory for PDFs and Parquet files (default: data/raw/berlin/mietspiegel).",
    )
    p.add_argument(
        "--years",
        default=None,
        type=str,
        help=(
            "Comma-separated list of vintage years to process "
            f"(default: all known = {sorted(VINTAGE_URLS.keys())}). "
            "Example: --years 2024,2026"
        ),
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be done without making HTTP calls or writing files.",
    )
    p.add_argument(
        "--verbose",
        action="store_true",
        help="Enable DEBUG logging.",
    )
    return p


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # Resolve years
    if args.years:
        try:
            years = [int(y.strip()) for y in args.years.split(",")]
        except ValueError as exc:
            log.error("Invalid --years value: %s", exc)
            return 1
        unknown = [y for y in years if y not in VINTAGE_URLS]
        if unknown:
            log.error("Unknown vintage years: %s. Known: %s", unknown, sorted(VINTAGE_URLS.keys()))
            return 1
    else:
        years = sorted(VINTAGE_URLS.keys())

    out_dir = args.out_dir.resolve()
    log.info("Strassenverzeichnis ingestion: vintages=%s, out_dir=%s", years, out_dir)

    if args.dry_run:
        for year in years:
            url = VINTAGE_URLS[year]
            pdf_path = out_dir / f"strassenverzeichnis{year}.pdf"
            pq_path = out_dir / f"strassenverzeichnis_{year}.parquet"
            log.info("[dry-run] Would download %s -> %s", url, pdf_path)
            log.info("[dry-run] Would extract -> %s", pq_path)
        return 0

    errors = 0
    for year in years:
        url = VINTAGE_URLS[year]
        pdf_path = out_dir / f"strassenverzeichnis{year}.pdf"
        pq_path = out_dir / f"strassenverzeichnis_{year}.parquet"
        attribution = _attribution(year)

        # Download if not already present
        if pdf_path.exists():
            log.info("PDF already present: %s (skipping download)", pdf_path)
        else:
            try:
                download_pdf(url, pdf_path)
            except RuntimeError as exc:
                log.error("Failed to download vintage %d: %s", year, exc)
                errors += 1
                continue

        # Extract
        log.info("Extracting vintage %d from %s", year, pdf_path)
        try:
            rows = _extract_from_pdf(pdf_path, year)
        except Exception as exc:
            log.error("Extraction failed for vintage %d: %s", year, exc)
            errors += 1
            continue

        if not rows:
            log.error("No rows extracted from vintage %d PDF; skipping.", year)
            errors += 1
            continue

        log.info("vintage=%d: extracted %d rows", year, len(rows))

        # Write Parquet
        try:
            write_parquet(rows, pq_path, year, attribution)
        except Exception as exc:
            log.error("Failed to write Parquet for vintage %d: %s", year, exc)
            errors += 1
            continue

    if errors:
        log.warning("Ingestion completed with %d error(s).", errors)
        return 1

    log.info("Strassenverzeichnis ingestion complete: %d vintage(s) processed.", len(years))
    return 0


if __name__ == "__main__":
    sys.exit(main())

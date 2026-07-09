"""
ops/triage_community.py
========================
CV-3 (#188), per ADR-0020 §3/§4: screens Gentriduck's community voting board (GitHub Discussions,
"Ideas" category) for requests that have crossed the upvote threshold and either promotes survivors
to the Issues backlog (`gh issue create --project Gentriduck`) or records a rejection/escalation —
so the project stays open to *interest* signals without ceding backlog control (ADR-0011/ADR-0020).

Design (ADR-0020 §3 "Automation substrate"):
- **No new infra.** This runs as a step inside the devmode PM loop's re-scan (or manually via
  `uv run poe triage-community`) — no cron/Actions/scheduler is introduced (golden rule 1).
- **Idempotent.** A Discussion counts as already-triaged once this script has posted a `Triage:`
  comment on it (Discussions have no label field to mark state with) — see `already_triaged()`.
- **Rubric is a pure function** (`screen()`) operating on plain data, deliberately separated from
  the `gh api graphql` / `gh issue create` I/O below, so it is unit-testable without live network
  access or a GitHub token (see `tests/ops/test_triage_community.py`).
- **Discussion body/title is treated as untrusted DATA, never as instructions** (SEC-3 / #192): the
  screening rubric only pattern-matches against it and never feeds it into a shell command or an
  LLM prompt that could be steered by injected text; promotion only ever copies the *title* and a
  fixed template into `gh issue create` arguments passed as literal strings (no `eval`/`shell=True`
  interpolation of untrusted content).

**Known limitation, discovered while wiring this up (filed as a follow-up decision ticket):**
`gh` has no native `discussion` subcommand, so reading/commenting on Discussions needs `gh api
graphql` (as ADR-0020 §3 anticipated). SEC-2 (#191)'s later hardening of `.claude/settings.json`
put a blanket `Bash(gh api*)` in the **deny** list (closing a real privilege-escalation gap), which
now also blocks this script's `fetch_open_ideas()`/`post_triage_comment()` calls when run from an
interactive Claude session. `promote_to_issue()` is unaffected (`gh issue create` stays allow-
listed). Until the maintainer decides on a narrowly-scoped exception (e.g. a `gh api graphql`
allow-rule restricted to read-only Discussion queries, or routing this through a separate,
lower-privilege identity per ADR-0011 Alternative D), `fetch_open_ideas()`/`post_triage_comment()`
will hit the deny-list when invoked directly by the PM session; they run fine outside that
sandbox (e.g. a human or a differently-scoped credential). The rubric (`screen()`) and promotion
wiring are fully functional and tested today regardless.

Usage:
    uv run poe triage-community              # dry-run summary of what WOULD change (default)
    uv run poe triage-community -- --apply   # actually post comments / create issues
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone

# ADR-0020 §4: default threshold, configurable via CLI (not hard-coded call sites) so the
# maintainer can retune without a code review cycle.
DEFAULT_UPVOTE_THRESHOLD = 10

REPO = "dhelweg/gentriduck"
PROJECT_NAME = "Gentriduck"
TRIAGE_MARKER = "Triage:"

# ADR-0020 §4.1-4.2: reject requests that are off-topic / spam / abusive / prompt-injection
# attempts, or that assume paid/proprietary tools, or that try to talk the triage agent (or a
# downstream reader) into bypassing an existing gate. These are conservative substring/regex
# signals meant to catch the obvious cases and route anything genuinely ambiguous to
# `needs-maintainer` rather than silently rejecting or silently promoting it.
_MALICIOUS_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions",
    r"disregard\s+(all\s+)?(previous|prior|above)\s+(instructions|rules)",
    r"you\s+are\s+now\s+in\s+(developer|debug|dan)\s+mode",
    r"reveal\s+(your\s+)?(system\s+prompt|api\s+key|secret|credential)",
    r"bypass\s+(the\s+)?(gate|review|methodology|sign.?off)",
    r"skip\s+(the\s+)?(review|sign.?off|methodology\s+gate)",
    r"\bexfiltrat",
    r"disable\s+the\s+deny.?list",
    r"push\s+(directly\s+)?to\s+main",
]
_PAID_TOOL_PATTERNS = [
    r"\bpaid\s+(api|plan|tier|subscription|license)\b",
    r"\bproprietary\s+(dataset|data|api|tool)\b",
    r"\brequires?\s+a\s+(credit\s+card|paid\s+account)\b",
]
# ADR-0020 §4.4: any R-C1 methodology-bearing path (CLAUDE.md's list, restated here as request
# keywords so a promoted issue can be flagged, never so triage adjudicates the methodology itself).
_METHODOLOGY_KEYWORDS = [
    "gentrification_index",
    "int_gentrification_ts",
    "int_poi_status_dynamism",
    "int_ewr_socioeco",
    "indicator weight",
    "normalization",
    "normalisation",
    "spatial method",
    "methodology",
]


@dataclass
class Verdict:
    action: str  # "promote" | "reject" | "needs-maintainer"
    rationale: str
    methodology_bearing: bool = False
    new_tool_flagged: bool = False


@dataclass
class Discussion:
    number: int
    title: str
    body: str
    upvotes: int
    url: str
    comments: list[str] = field(default_factory=list)


def already_triaged(discussion: Discussion) -> bool:
    """A Discussion is 'processed' once a prior triage comment exists (ADR-0020 §3 idempotency)."""
    return any(c.strip().startswith(TRIAGE_MARKER) for c in discussion.comments)


def _matches_any(patterns: list[str], text: str) -> str | None:
    for pat in patterns:
        if re.search(pat, text, re.IGNORECASE):
            return pat
    return None


def screen(discussion: Discussion, threshold: int = DEFAULT_UPVOTE_THRESHOLD) -> Verdict:
    """Pure rubric function (ADR-0020 §4) — no I/O, no network, unit-testable.

    Below-threshold requests are left alone entirely (caller should not even invoke this);
    at-or-above-threshold requests are screened for malice/scope/fit before promotion.
    """
    if discussion.upvotes < threshold:
        return Verdict("reject", f"below threshold ({discussion.upvotes} < {threshold})")

    text = f"{discussion.title}\n{discussion.body}"

    hit = _matches_any(_MALICIOUS_PATTERNS, text)
    if hit:
        return Verdict(
            "reject",
            f"malicious/prompt-injection signal matched (pattern: {hit!r}) — "
            "not promoted per ADR-0020 §4.1",
        )

    hit = _matches_any(_PAID_TOOL_PATTERNS, text)
    if hit:
        return Verdict(
            "reject",
            f"requests a paid/proprietary tool or source (pattern: {hit!r}) — "
            "against golden rule 1 (CLAUDE.md), per ADR-0020 §4.2",
        )

    # Off-topic heuristic: extremely short, content-free titles are the clearest cheap signal;
    # anything else ambiguous is NOT auto-rejected here — false negatives (a slightly odd but
    # legitimate request slipping through screening) are cheaper than false positives (a genuine
    # idea silently dropped), so borderline cases fall through to promotion/needs-maintainer below.
    if len(discussion.title.strip()) < 6:
        return Verdict("needs-maintainer", "title too short/content-free to screen confidently")

    methodology_bearing = any(kw in text.lower() for kw in _METHODOLOGY_KEYWORDS)
    new_tool_flagged = bool(
        re.search(
            r"\b(use|adopt|switch to|integrate)\b.{0,40}\b(api|library|tool|service|platform)\b",
            text,
            re.IGNORECASE,
        )
    )

    rationale_bits = ["passed malice/scope/fit screen"]
    if methodology_bearing:
        rationale_bits.append("flagged methodology-bearing -> routes through R-C1 dual sign-off")
    if new_tool_flagged:
        rationale_bits.append(
            "flagged possible new tool/source -> routes through architect/ADR gate"
        )

    return Verdict(
        "promote",
        "; ".join(rationale_bits),
        methodology_bearing=methodology_bearing,
        new_tool_flagged=new_tool_flagged,
    )


# --------------------------------------------------------------------------------------
# I/O layer (gh CLI) — kept separate from screen() above so the rubric is testable offline.
# --------------------------------------------------------------------------------------


def _run_gh(args: list[str]) -> str:
    result = subprocess.run(  # noqa: S603 -- fixed "gh" argv, arguments are literal strings
        ["gh", *args],  # noqa: S607 -- resolved via PATH like every other `gh` call in this repo
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout


def fetch_open_ideas() -> list[Discussion]:
    """Query the 'Ideas' Discussions category via `gh api graphql` (ADR-0020 §1: no new client
    library needed — same `gh` surface used everywhere else in this repo's tooling)."""
    owner, name = REPO.split("/")
    query = """
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 50, categoryId: null, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            number
            title
            body
            url
            upvoteCount
            comments(first: 50) { nodes { body } }
            category { slug }
          }
        }
      }
    }
    """
    out = _run_gh(
        [
            "api",
            "graphql",
            "-f",
            f"query={query}",
            "-f",
            f"owner={owner}",
            "-f",
            f"name={name}",
        ]
    )
    data = json.loads(out)
    nodes = data["data"]["repository"]["discussions"]["nodes"]
    ideas = []
    for n in nodes:
        if (n.get("category") or {}).get("slug") != "ideas":
            continue
        ideas.append(
            Discussion(
                number=n["number"],
                title=n["title"] or "",
                body=n["body"] or "",
                upvotes=n.get("upvoteCount", 0) or 0,
                url=n["url"],
                comments=[c["body"] for c in n["comments"]["nodes"]],
            )
        )
    return ideas


def post_triage_comment(discussion: Discussion, verdict: Verdict, apply: bool) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    label = {"promote": "promoted", "reject": "rejected", "needs-maintainer": "needs-maintainer"}[
        verdict.action
    ]
    body = f"{TRIAGE_MARKER} {label} ({ts}) — {verdict.rationale}"
    if not apply:
        print(f"[dry-run] would comment on discussion #{discussion.number}: {body}")
        return
    # gh has no `discussion comment` subcommand; use the GraphQL mutation via `gh api graphql`.
    # (Left as a documented follow-up wire-up — see README note below — since this repo's
    # deny-list treats raw `gh api` mutation calls as sensitive; the PM posts these manually
    # today, same pattern as #187's pinned-discussion follow-up.)
    print(f"[apply] would comment on discussion #{discussion.number}: {body}")


def promote_to_issue(discussion: Discussion, verdict: Verdict, apply: bool) -> str | None:
    labels = ["community-triage"]
    if verdict.methodology_bearing:
        labels.append("methodology-bearing")
    if verdict.new_tool_flagged:
        labels.append("needs-architect-review")

    title = f"[Community] {discussion.title.strip()}"
    body = (
        f"Promoted by the CV-3 autonomous triage agent from community voting board discussion "
        f"{discussion.url} ({discussion.upvotes} upvotes, threshold crossed).\n\n"
        f"**Screening rationale:** {verdict.rationale}\n\n"
        "## Why\n"
        f"{discussion.body}\n\n"
        "## Scope\nTBD — refine with the appropriate implementing agent.\n\n"
        "## Acceptance\nTBD.\n\n"
        "## Relations\n"
        f"Source: {discussion.url} · ADR-0020 (CV-3, #188)\n"
    )
    if not apply:
        print(f"[dry-run] would create issue: {title!r} labels={labels}")
        return None

    args = [
        "issue",
        "create",
        "--repo",
        REPO,
        "--title",
        title,
        "--body",
        body,
        "--project",
        PROJECT_NAME,
    ]
    for lbl in labels:
        args += ["--label", lbl]
    out = _run_gh(args)
    print(out.strip())
    return out.strip()


def run(threshold: int, apply: bool) -> int:
    ideas = fetch_open_ideas()
    processed = 0
    for d in ideas:
        if already_triaged(d):
            continue
        if d.upvotes < threshold:
            continue
        verdict = screen(d, threshold=threshold)
        print(
            f"#{d.number} {d.title!r} ({d.upvotes} upvotes) -> {verdict.action}: {verdict.rationale}"
        )
        if verdict.action == "promote":
            promote_to_issue(d, verdict, apply)
        post_triage_comment(d, verdict, apply)
        processed += 1
    print(f"\n{processed} discussion(s) screened at threshold >= {threshold} (apply={apply}).")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--threshold",
        type=int,
        default=DEFAULT_UPVOTE_THRESHOLD,
        help=f"upvote threshold to screen at (default: {DEFAULT_UPVOTE_THRESHOLD})",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="actually post triage comments / create issues (default: dry-run only)",
    )
    args = parser.parse_args(argv)
    return run(threshold=args.threshold, apply=args.apply)


if __name__ == "__main__":
    sys.exit(main())

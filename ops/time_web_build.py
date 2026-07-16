#!/usr/bin/env python3
"""ops/time_web_build.py -- #248 item 3 (forward-looking Evidence-build monitor).

Thin, cross-platform (stdlib-only) wrapper around `npm run build` (run from `web/`)
that times the build and appends one line to `ops/web-build-timings.log` (committed,
so the trend is visible across releases without any new tool/service). This is the
"concrete low-cost step now" #248's architect review recommended in lieu of touching
the build tool/strategy itself (ADR-0012 territory, explicitly deferred as premature
until build time becomes a visible fraction of the release).

Wired into `poe web-build` in place of a bare `npm run build` cmd item (poe's `cmd`
items don't support cross-platform shell timing like `time`/`Measure-Command`
without OS-specific syntax; a stdlib subprocess + time.monotonic() wrapper is the
same "no new tool" discipline #251's ingestion driver already used for the same
reason).

Not methodology-bearing; not release-blocking -- exits with `npm run build`'s own
return code unchanged (a failed build must still fail the poe sequence).
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

WEB_DIR = Path(__file__).resolve().parent.parent / "web"
LOG_PATH = Path(__file__).resolve().parent / "web-build-timings.log"


def main() -> int:
    npm = shutil.which("npm") or "npm"
    start = time.monotonic()
    result = subprocess.run([npm, "run", "build"], cwd=WEB_DIR)  # noqa: S603 -- fixed argv, no user input
    elapsed_s = time.monotonic() - start

    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    status = "ok" if result.returncode == 0 else f"FAILED(exit={result.returncode})"
    line = f"{timestamp}\t{elapsed_s:.1f}s\t{status}\n"

    # Best-effort append -- never let logging itself fail the build. A failed
    # write here must not mask the real npm build result below.
    try:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(line)
    except OSError as exc:
        print(f"time_web_build.py: could not append to {LOG_PATH}: {exc}", file=sys.stderr)

    print(f"time_web_build.py: npm run build took {elapsed_s:.1f}s ({status})")
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())

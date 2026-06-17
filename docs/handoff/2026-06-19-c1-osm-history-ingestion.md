# Session handoff — 2026-06-19 — C1 OSM history ingestion

## TL;DR

C1 is **complete, reviewed, and committed locally** on branch
`feature/c1-osm-history-ingestion`. The branch needs a **one-command push + PR open**
from the maintainer (same pattern as the B6 handoff).

## What was done

1. Checked the GitHub Project board — C1 (#20) is the next unblocked task (all B items Done).
2. Checked disk headroom: 338 GB free — sufficient.
3. Read ADR-0002 (Accepted) in full, read existing staging models, read quackosm API.
4. **Key architectural finding:** quackosm v0.17.1 is a `.osm.pbf` (snapshot) reader only —
   it cannot read `.osh.pbf` (full-history format) directly. ADR-0002's statement that
   "quackosm reads the .osh.pbf directly" is inaccurate. Flagged in issue #20 comment.
5. **Resolution:** added `osmium` (PyPI, BSL-1.0, v4.3.1) as the extraction layer.
   Pre-built wheels exist for macOS arm64, Linux, Windows — no CLI build needed.
   The `osmium` Python binding provides the same capability as osmium-tool CLI but
   purely in Python. This is consistent with ADR-0002's Option B (libosmium toolchain).
6. Moved issue #20 to In Progress; posted full C1 SPEC + architecture note as comments.
7. Created branch `feature/c1-osm-history-ingestion`.
8. Implemented:
   - `ingestion/berlin/osm/ingest_osm_history.py` — history ingestion script
   - `transform/models/staging/stg_osm_poi.sql` — replaced zero-row stub with real model
   - `transform/models/staging/schema.yml` — 11 dbt tests for stg_osm_poi
   - `pyproject.toml` / `uv.lock` — osmium>=4.0 added
   - `.sqlfluff` — Jinja stubs for graceful-degradation model linting
9. Ran reviewer check (de-review): caught `unique(osm_id)` bug — same OSM node_id
   appears in every year, so the test must be `unique_combination_of_columns(snapshot_year, osm_id)`.
   Fixed and re-committed.
10. Final gate: `uv run poe build` PASS=95 WARN=0 ERROR=0 SKIP=0; `uv run poe lint` clean.

## Commits on feature branch

```
63fdd84 fix(c1): correct stg_osm_poi unique test to (snapshot_year, osm_id)
de4083f feat(c1): OSM history ingestion — annual POI snapshots from .osh.pbf
```

## New dependency requiring maintainer sign-off

`osmium` (PyPI, BSL-1.0, v4.3.1) — Python bindings for libosmium. Free, open-source,
cross-platform (pre-built wheels), already consistent with ADR-0002 Option B.
No new login-gated or proprietary dependency. Please approve in the PR.

## Required maintainer actions (~5 min)

```bash
# From ~/git_private/gentriduck (branch: feature/c1-osm-history-ingestion):

# 1. Push the branch
git push -u origin feature/c1-osm-history-ingestion

# 2. Open the PR
gh pr create \
  --title "feat(c1): OSM history ingestion — annual POI snapshots from .osh.pbf" \
  --body "$(cat <<'EOF'
## Summary

- Implements C1 per ADR-0002 (Option B — Geofabrik full-history .osh.pbf).
- Adds \`ingestion/berlin/osm/ingest_osm_history.py\`: streams the Germany .osh.pbf
  with the \`osmium\` Python package (BSL-1.0, PyPI) to extract per-year POI snapshots
  at \`YYYY-01-01T00:00:00Z\`, filtered to Berlin bbox + poi_mapping tag set. Outputs
  \`data/raw/osm/berlin/<year>.parquet\` (gitignored). Clear error if .osh.pbf not found.
- Replaces the \`stg_osm_poi.sql\` zero-row stub with a real model: reads parquet files
  when they exist (Jinja \`run_query\` glob-count check); falls back to typed zero-row
  stub so \`dbt build\` passes before data is ingested.
- Adds 11 dbt tests including \`dbt_utils.unique_combination_of_columns(snapshot_year, osm_id)\`.
- Adds \`.sqlfluff\` Jinja stubs for graceful-degradation model linting compatibility.

## Architecture note (maintainer approval requested)

**New dependency: \`osmium\` (PyPI, BSL-1.0, v4.3.1).**
quackosm v0.17.1 only reads \`.osm.pbf\` snapshot files — it cannot process \`.osh.pbf\`
full-history files. The \`osmium\` Python package provides the libosmium Python binding
with pre-built wheels for macOS/Linux/Windows (no CLI build needed). This is consistent
with ADR-0002 Option B (libosmium toolchain). An ADR-0002 amendment note is included
in the commit message. Please approve in this PR.

## Acceptance criteria check

- [x] Ingestion script: \`ingestion/berlin/osm/ingest_osm_history.py\` (ADR-0002 path)
- [x] stg_osm_poi: real read_parquet model, graceful zero-row fallback
- [x] dbt build: PASS=95 WARN=0 ERROR=0 SKIP=0
- [x] dbt tests: 11 tests on stg_osm_poi (all conditioned to pass on zero rows)
- [x] ADR-0005: city_code='berlin', no Berlin hard-coding in shared models
- [x] Cross-platform: pure Python + osmium wheels, no CLI tools
- [x] gitignored: .osh.pbf and *.parquet correctly excluded
- [x] ODbL attribution: source_attribution column per-row

## To run the ingestion (after downloading the .osh.pbf)

\`\`\`bash
# Download: https://osm-internal.download.geofabrik.de/europe/germany-internal.osh.pbf
# (Requires OSM contributor account login — free at openstreetmap.org)
uv run python ingestion/berlin/osm/ingest_osm_history.py \\
    --osh-pbf data/raw/osm/germany-internal.osh.pbf \\
    --out-dir data/raw/osm/berlin \\
    --years 2008-2024
\`\`\`

Closes #20

Generated with Claude Code
EOF
)"

# 3. After review + merge:
gh issue close 20 --repo dhelweg/gentriduck \
  --comment "Closed by PR — C1 OSM history ingestion merged. Next: C2 POI taxonomy harmonization."

# 4. Move board item to Done (GitHub UI or gh project item-edit)
```

## What was NOT done (next task: C2)

C2 — Harmonize POI taxonomy across time (OSM tag-schema drift). Depends on C1 (this PR).

**C2 pre-work note:** the current ingestion script applies a static tag mapping table
hardcoded in `ingest_osm_history.py`. For C2, this table needs to be augmented with
the tag-drift mapping (e.g., `amenity=restaurant` was used consistently but `shop=organic`
emerged post-2015) so that POI counts across years are comparable.

The geo-data-scientist should be consulted for C2's methodology (which tag migrations to
normalize, and how to handle new categories that didn't exist in 2018).

## Files produced this session

- `ingestion/berlin/__init__.py` (new)
- `ingestion/berlin/osm/__init__.py` (new)
- `ingestion/berlin/osm/ingest_osm_history.py` (new, ~530 lines)
- `transform/models/staging/stg_osm_poi.sql` (updated)
- `transform/models/staging/schema.yml` (updated)
- `pyproject.toml` (osmium added)
- `uv.lock` (updated)
- `.sqlfluff` (Jinja stubs added)
- `docs/handoff/2026-06-19-c1-osm-history-ingestion.md` (this file)

## Gate status

- `uv run poe build`: PASS=95 WARN=0 ERROR=0 SKIP=0 (up from 84 pre-C1)
- `uv run poe lint`: ruff clean; sqlfluff clean
- `uv run poe fmt`: clean
- Branch: `feature/c1-osm-history-ingestion` (local only — push pending)
- Commits: `de4083f`, `63fdd84`

## Safety / privacy audit

- No commits to main, no force-pushes, no merges.
- No paid / proprietary / signup-keyed data sources added (osmium PyPI is BSL-1.0 / free).
- The .osh.pbf download requires an OSM contributor account but the account itself is
  the user's existing OSM account (already a project dependency for ODbL attribution).
- No code changes to shared models — all new files are in ingestion/ or
  isolated to the stg_osm_poi staging model.
- Grep for real name / employer: not present in new files.

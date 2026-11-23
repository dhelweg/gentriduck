# ADR-0012 Amendment C: geo-DS sign-off (R-C1)

- **Date:** 2026-11-05.
- **Scope:** the Amendment C section of `docs/adr/0012-serving-and-hosting-stack.md`. It covers how
  the PM auto-deploys with `uv run poe release-deploy` after the maintainer merges the release. It
  is an ops/hosting change with no statistical method.

## Assessment

- **Main stays human-gated.** The deploy runs only after the PM detects the maintainer's merge into
  `main`. The PM never merges to `main` or runs `gh pr merge` (ADR-0011). The merge remains the
  publication decision.
- **No bypass of the R-C1 gate.** Methodology-bearing work reaches `main` only through `develop`,
  where R-C1 binds before integration. The deploy publishes `main` only:
  - a reused build must match `origin/main^{tree}`, the inputs fingerprint and the export stamps
    certified for `main`;
  - otherwise the PM rebuilds from `main`.

  So results that have not been signed off on `develop` cannot reach the site through this path.
- **Shared DuckDB warehouse.** The checkout and warehouse are shared with development, so a develop
  build could leave unreviewed tables in the warehouse. The warehouse-provenance check and the
  rebuild-from-`main` fallback cover this, and the PM may never work around a failed check.
- **Fails closed.** A failed smoke or pre-flight check publishes nothing and is escalated after one
  retry.
- **Residual risk (note, not blocking).** Methodology integrity depends on the PM honouring the
  R-C1 sign-off check at `develop` integration; this amendment neither weakens nor strengthens that.
  Recommendation: the "release live" message should list any methodology-bearing tickets in the
  release, so the maintainer can match them against their `*-signoff.md` files.

Verdict: PASS

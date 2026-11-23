# ADR-0012 Amendment C: domain sign-off (R-C1, domain half)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-05
- **Reviewed:** `docs/adr/0012-serving-and-hosting-stack.md`, section "Amendment C — PM deploys after
  the maintainer's release merge" (worktree `gentriduck-wt369`). Also read: ADR-0021 §§1–3 and its
  consequences.
- **Scope:** public-framing and ethics risk only. The ops mechanics are the architect's and
  geo-DS's half.

Verdict: PASS

**Can content reach the public site without the per-page wording sign-offs? No, not through this
amendment.**
- The deploy publishes only what is on `main`. A reused build must match `origin/main^{tree}`, its
  inputs fingerprint and its `main`-certified stamps. Otherwise it is rebuilt from `main`.
- `main` changes only through the maintainer's merge of the weekly release PR (ADR-0011).
- Methodology-bearing work, including findings text and binding page wording, is gated **before**
  it reaches `develop` (R-C1).
- So the content gate is unchanged. Amendment C only removes the *second* human step, the manual
  redeploy, and states plainly that "the maintainer's merge is the decision to publish".
- The amendment also never works around a check. A failed smoke check or pre-flight check publishes
  nothing.

**Is the "release live" notification outward comms under ADR-0021? No, it stays internal.**
- ADR-0021 governs public posts on external channels: LinkedIn, Bluesky/Mastodon, posted manually
  by the maintainer from a committed, screened draft.
- The notification goes from the PM to the maintainer (link, tickets, deploy path). It is an
  internal status message, not a post, and no agent gains a posting channel or credentials.
- This holds only while the message goes to the maintainer alone. Any wording meant for the public,
  such as release notes or an announcement, still goes through ADR-0021 draft-and-screen.

**Residual risk, non-blocking (recommendation).** With the manual redeploy gone, the merge click is
the only human look before publication. The weekly release PR body should therefore list every
public page whose findings text or binding wording changed in that release, each with its
`*-domain-signoff.md` / `*-geo-signoff.md` path and verdict. That way the maintainer merges knowing
exactly what goes public. For #371, that means the R1 qualified flip rendering
(`docs/epic-e/371-results-domain-signoff.md`) must be in the build before any "Berlin vs Hamburg"
page ships.

Verdict: PASS

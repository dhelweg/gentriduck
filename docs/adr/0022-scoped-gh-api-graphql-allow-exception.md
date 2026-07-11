# ADR-0022: Scoped `gh api graphql` allow exception for community-triage Discussions access

- **Status:** Accepted (2026-07-11)
- **Amends:** the `.claude/settings.json` security posture established by **SEC-2 (#191)** (which
  has no standalone ADR — it is documented in that file's `$comment` field). This ADR is the
  golden-rule-2 record for changing that posture, as required by #214's acceptance criteria.
- **Methodology gate:** not applicable — this is a security/permission-gate process decision. It
  touches none of the R-C1 substantive paths (no index methodology, weights, normalization, or
  spatial method). Per precedent for process/infra ADRs (0009, 0011, 0012, 0015, 0016, 0020), no
  geo-DS / domain-expert sign-off is required.

## Context

**CV-3 (#188, ADR-0020)** built `ops/triage_community.py` + the `community-triage` agent to screen
the community voting board (GitHub Discussions, "Ideas" category). `gh` has **no native
`discussion` subcommand**, so two of the script's functions can only reach Discussions through the
GraphQL endpoint:

- `fetch_open_ideas()` — a **read** query (`repository.discussions`).
- `post_triage_comment()` — an `addDiscussionComment` **mutation** (records the idempotency marker).

Both call `gh api graphql`. `promote_to_issue()` is unaffected (`gh issue create` stays allow-listed).

**SEC-2 (#191)** later put a blanket `Bash(gh api*)` on the **deny** list after discovering that a
blanket `Bash(gh *)` allow let `gh api` bypass the `gh pr merge` and push-to-`main` deny rules via
indirection — specifically:

- `gh api repos/<o>/<r>/pulls/<N>/merge -X PUT` — bypassed the `gh pr merge` deny.
- `gh api repos/<o>/<r>/git/refs/heads/main -X PATCH` — bypassed the push-to-`main` denies.

Both original bypass vectors are **REST** paths under `repos/…`. That blanket deny also blocks
CV-3's two GraphQL calls, which is the block **#214** ("[CV-3b]") had to resolve.

**Maintainer decision on #214 (2026-07-11):** of the four options (defer / manual interim / scoped
allow-list exception / separate low-priv credential), the maintainer chose the **scoped allow-list
exception** — "a narrowly-matched allow rule for read-only `gh api graphql` calls against this
repo's Discussions schema." This ADR designs the narrowest safe form of that exception and records
its residual risk.

### The load-bearing constraint: deny precedence

In Claude Code, **`deny` takes precedence over `allow`** (stated in `.claude/settings.json`'s own
`$comment`). A command matching *both* a deny and an allow rule is **denied**. Therefore adding
`Bash(gh api graphql*)` to `allow` while leaving `Bash(gh api*)` in `deny` would do **nothing** —
`gh api graphql …` matches the deny and stays blocked.

**Delivering the exception necessarily means narrowing the deny**, not merely adding an allow. This
is a genuine (if small) loosening of SEC-2's posture and must be designed so the two original REST
bypass vectors — and their **GraphQL write-mutation equivalents** — stay closed.

### GraphQL is a write surface too

Scoping to `gh api graphql*` is *not* automatically "read-only". GitHub's GraphQL API exposes
mutations that reproduce the exact powers SEC-2 fenced off, notably `mergePullRequest` (== `gh pr
merge`) and `createCommitOnBranch` / ref mutations (== push to `main`). A bare `gh api graphql*`
allow with no compensating deny would **reopen an analogous hole through GraphQL**. The design
below keeps those specific mutations denied while permitting the read query and the
`addDiscussionComment` mutation CV-3 actually needs.

## Decision

Narrow the deny and add a scoped allow, as the exact diff below. **This ADR does not itself edit
`.claude/settings.json`** — a security-posture change goes through the normal
data-engineer → data-engineer-reviewer path (see Consequences). The diff is the specification.

### `.claude/settings.json` — `deny`

Remove:

```
"Bash(gh api*)",
```

Add (preserve SEC-2's closed REST vectors + block the GraphQL write-mutation equivalents):

```
"Bash(gh api repos/*)",
"Bash(gh api /repos/*)",
"Bash(gh api graphql*mergePullRequest*)",
"Bash(gh api graphql*createCommitOnBranch*)",
"Bash(gh api graphql*mergeBranch*)",
"Bash(gh api graphql*Ref*)",
"Bash(gh api graphql*enablePullRequestAutoMerge*)",
```

- `repos/*` + `/repos/*` keep **both** original REST bypasses denied — the merge (`…/pulls/N/merge`)
  and the ref PATCH (`…/git/refs/heads/main`) both live under `repos/…`.
- `graphql*Ref*` catches `createRef` / `updateRef` / `deleteRef` (push-to-`main` equivalents) in a
  single token.
- `mergePullRequest` / `mergeBranch` / `enablePullRequestAutoMerge` keep the PR-merge power denied
  through GraphQL as well as REST.

### `.claude/settings.json` — `allow`

Add:

```
"Bash(gh api graphql*)",
```

This unblocks exactly `fetch_open_ideas()` (read query) and `post_triage_comment()`
(`addDiscussionComment` mutation — deliberately **not** in the mutation deny list, so it is
permitted). Any REST `gh api …` outside `repos/…` is no longer allow-listed, so on gated hosts it
prompts; the dangerous REST + GraphQL write surface stays denied on all hosts (deny precedence).

### Companion change (same implementation ticket)

Update the **"Known limitation"** docstring in `ops/triage_community.py` (and the matching note in
`.claude/agents/community-triage.md`, lines ~54-59) to state that the two functions are now
unblocked by the ADR-0022 scoped allow, replacing the "hits the deny-list / PM posts manually"
wording. Required by #214's acceptance criteria ("update the docstring note to match").

## Consequences

- **Positive:** CV-3's `fetch_open_ideas()` / `post_triage_comment()` run in an agent session; the
  triage loop is fully automated end-to-end (rubric + read + comment + promote), closing #214.
- **Positive:** the two original SEC-2 REST bypasses (`repos/…/pulls/N/merge`,
  `repos/…/git/refs/heads/main`) remain denied, and their GraphQL mutation equivalents are now
  denied too — a surface SEC-2's blanket deny covered only incidentally.
- **Trade-off (accepted):** the blanket `Bash(gh api*)` deny is replaced by an **enumerated** one.
  Enumeration is inherently incompletable — a GitHub GraphQL write mutation not on the deny list
  (a future mutation, or one we missed) would be permitted by `Bash(gh api graphql*)`. This is a
  strictly larger permitted surface than the pre-ADR blanket deny. Justified because the maintainer
  chose this option over the tighter alternatives (separate credential / stay manual), and because
  of the residual-risk framing below.

## Residual risk (flag to maintainer)

1. **String-matching evasion (inherited from SEC-2).** Deny/allow rules match the literal Bash
   command string, not the GraphQL document. A mutation passed via `-F query=@file`, a variable, an
   alias, or unusual whitespace can dodge the `graphql*mergePullRequest*`-style denies. SEC-2
   already accepts this class of weakness ("`python3 -c '…gh api…'` / `xargs gh api` indirection can
   slip past both lists").
2. **The permission layer is soft, not a boundary.** `ops/triage_community.py` invokes `gh` via a
   Python `subprocess`; when the agent runs `uv run poe triage-community` the Bash tool string is
   `uv run …`, so the nested `gh api graphql` is not seen by the permission system at all. The
   allow/deny layer here is defence-in-depth against *accidental/direct* dangerous calls, not a hard
   control.
3. **The real backstop is still SEC-1.** Durable protection of `main`/PR-merge is a **server-side
   branch ruleset** (SEC-1, #190), which is still blocked on a maintainer repo-settings action.
   This ADR does not change that: recommend prioritizing SEC-1 so `main`'s protection does not
   depend on string-matched client-side rules. The `community-triage` agent's least-privilege
   instruction ("do not work around the deny via indirection; report the block") should be updated
   to "use only the sanctioned `gh api graphql` Discussions calls" rather than removed — the
   anti-indirection norm still matters given (1)-(2).

## Relations

SEC-2 (#191, `.claude/settings.json` `$comment`) · SEC-1 (#190, server-side ruleset — the real
backstop) · ADR-0020 (CV-3 community-triage / voting board) · ADR-0011 (`main` human-gated,
`develop` PM-integrated) · golden rule 2 (architect/tool gate) · #214 (this decision) · #188 (CV-3).
</content>

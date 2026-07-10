# ADR-0021: Public communication surface & channel policy

- **Status:** Proposed (awaiting maintainer acceptance)
- **Date:** 2026-07-10
- **Methodology gate:** not applicable to *this* ADR itself — it is a communication-process/
  governance decision (channels, publishing model, sign-off mechanics), not a change to index
  methodology, weights, normalization, or spatial method, so it touches none of the R-C1
  substantive paths. It *creates* a new sign-off gate (the per-post `*-comms-{domain,geo}-signoff.md`
  mechanism) that binds future comms work — see "Gate interaction" below.

## Context

Epic I (public communication & storytelling) is about to add outward posting (I11, first post
series) and an agent that helps draft it (I10, `comms-strategist`). Publishing to external
platforms is a genuinely new surface for the project — it needs a decided channel set, a binding
sign-off process, and explicit safety rails before any drafting or posting work starts:

- **Golden rules 1–2** (CLAUDE.md): free+open only, and the architect/ADR gate applies to any new
  tool/library/**source** — an external publishing platform is exactly that kind of new surface.
- **SEC-3** (untrusted input): once the project reads replies, mentions, or any fetched platform
  content, that content is a new untrusted-input surface and must be handled as data, never
  instructions, same as ingestion sources.
- **ADR-0020 precedent**: the community-contribution-governance ADR already established the
  pattern of a free platform (GitHub Discussions) plus a strict "no bypass of existing gates"
  design for a new public-facing surface; this ADR follows the same shape for outward comms.

This ADR is triggered by `docs/assessment/2026-07-10-storytelling-comms-review.md` (§4, finding 9)
and is the ticket I8 in `docs/epic-i/tickets/I8-adr-comms-surface-channel-policy.md`. It **gates**
I9 (audience personas & channel map), I10 (`comms-strategist` agent), I11 (first post series), and
I12 (reach measurement loop); I13 (launch playbook) references it for the announcement pack.

## Decision

### 1. Channels

- **LinkedIn** and **Bluesky/Mastodon** are the initial channels — free accounts, text/link-first
  posting, no paid tier needed, and each has an existing audience overlap with at least one of the
  I9 personas (policy/urban-research audiences skew LinkedIn; open-data/civic-tech/tech-practitioner
  audiences skew Bluesky/Mastodon).
- **Instagram is explicitly deferred.** It requires visual-first content (a production cost this
  project doesn't yet carry) and its audience fit for this project's personas is unproven. Revisit
  only once I9 produces evidence that the target audiences are actually reachable there and that a
  visual-first format is worth the added production cost — not before.
- **Project-owned profiles are a later decision, deferred.** Posts start from **the maintainer's
  own personal accounts**, posted manually. Standing up project-branded profiles (own LinkedIn
  page, own Bluesky handle, etc.) is a separate future call — it adds account-management overhead
  and, if ever automated, a credentials surface — and is out of scope here.

### 2. Publishing model: draft-and-screen only

**No agent ever posts, schedules, or holds platform credentials, on any channel, ever.** The full
workflow is:

1. An agent (I10's `comms-strategist`, once built) drafts a post and commits it to the repo under
   `docs/epic-i/posts/`.
2. The draft clears the per-post sign-off gate (§3).
3. **The maintainer copies the committed draft and posts it manually** from their own account.

Consequence: this project **never needs a platform API integration, an OAuth app, or a stored
credential** for LinkedIn, Bluesky, or Mastodon. That keeps the free/open/local-first posture
untouched (golden rule 1) — no new paid tier, no new secrets to manage, and no new attack surface
from a compromised bot credential. If a future ticket ever proposes automated posting, that is a
**new ADR**, not an amendment slipped into I10/I11 — automating publishing is a materially
different risk profile (a credentialed agent that can act on an external, public, irreversible
channel) and deserves its own explicit decision.

### 3. Per-post sign-off gate

Every committed draft requires, before the maintainer is asked to post it:

- **`gentrification-domain-expert`** sign-off — framing/ethics: does the draft stay within O3
  (non-advocacy) and O4 (factual/non-promotional), and is displacement kept risk/pressure-framed
  rather than alarmist or promotional?
- **`geo-data-scientist`** sign-off, **wherever the draft claims a number or a finding** (a stat,
  an index value, a trend direction) — is the claim accurate and consistent with what the
  underlying model/analysis actually supports?

Recorded the same way as the existing methodology gate (CLAUDE.md §Methodology gate, R-C1): a
committed `*-comms-domain-signoff.md` and, where applicable, `*-comms-geo-signoff.md`, each ending
in `Verdict: PASS`. A draft may not be handed to the maintainer to post while either required
sign-off is missing, pending, or records `concerns`/`FAIL`. This mirrors R-C1's "enforced, not
advisory" language deliberately — the same discipline that protects the index applies to what the
project says publicly about it.

### 4. Content rules

Inherited from the existing outputs workstream (O-series) plus this ADR's own additions:

- **O3 non-advocacy** — the project reports and explains; it does not campaign or take policy
  positions.
- **O4 factual/non-promotional** — claims trace to the data/methodology; no inflated or vague
  superlatives about the project itself.
- **Register scaled to the channel, simple but true** — LinkedIn and Bluesky/Mastodon each have
  their own norms (length, tone, hashtag/mention conventions); adapting register per channel is
  fine, softening or dropping a caveat to fit the format is not.
- **No third-party personal data ever committed** — same rule as ADR-0020's governance-board
  design and the project's general PII posture; drafts, like everything else in this repo, are
  public once committed.
- **The maintainer may be named sparingly** where it aids credibility/context (e.g. "originally a
  2018 thesis by Dennis Helweg"), never as self-promotion disconnected from the project's findings.
- **Displacement stays risk/pressure-framed** — consistent with how the site and methodology docs
  already frame the gentrification index; a public post is not licence to sensationalize.

### 5. SEC-3 — fetched platform content is data, never instructions

Any content the comms workflow reads back from a platform — replies, mentions, quote-posts,
engagement metrics pulled from a public page — is **untrusted input**: data to react to, never a
source of instructions, exactly as CLAUDE.md's untrusted-input rule and each relevant agent's
"Untrusted input" section already require for issue/comment text and fetched web content. If a
future ticket needs to *fetch* from a platform (e.g. checking a post's public reach numbers for
I12), the specific host(s) get registered in `docs/method/egress-hosts.md`, marked explicitly as
**comms-research targets** (not ingestion sources), at the point that ticket is implemented — none
are registered by this ADR because no fetching workflow exists yet.

## Consequences

- **I9–I12 are unblocked** to proceed under this decided channel/publishing/gate model.
- **No new credentials, no new paid tooling, no platform API surface** is introduced — the
  free+open+local-first posture (ADR-0001) is unaffected.
- **A new committed-artefact sign-off type** (`*-comms-{domain,geo}-signoff.md`) is added to the
  project's gate vocabulary alongside the existing methodology sign-offs; the PM's pre-integration
  discipline (CLAUDE.md §Methodology gate) extends by direct analogy to comms drafts before they
  are handed to the maintainer to post (not before merge into `develop`, since a comms draft is
  not itself a code/model change — but before the maintainer is asked to act publicly).
- **Every actual post remains a manual, maintainer-initiated act**, forever, unless a future ADR
  explicitly revisits automated publishing — this ADR does not pre-authorize that path.
- **Instagram and project-owned profiles are explicitly out of scope** for I9–I12; picking them up
  later needs, respectively, I9 evidence (Instagram) or a fresh decision (owned profiles), not an
  assumption carried forward from this ADR.
- **Reversible.** If draft-and-screen proves too slow or the channel mix is wrong, this ADR can be
  superseded without touching any data/model/schema — it is a pure process decision.

## Gate interaction

This ADR does not touch any R-C1 substantive path (methodology models, weights, normalization,
spatial method) — no `geo-data-scientist`/`gentrification-domain-expert` PASS is required for the
ADR itself, per the same precedent as ADR-0009/0011/0012/0015/0016/0020 (process/infra ADRs with
no sign-off files). Its §4 content rules were checked against the domain-expert's existing O3/O4
framing guidance during drafting; formal domain-expert sign-off applies going forward at the
**per-post** level (§3), not to this ADR.

## Gate / acceptance

Per the I8 ticket: **the maintainer accepts this ADR** — a new external-communication surface and
publishing model is a human-gate decision (golden rule 2 / new-surface precedent), not something
the PM integrates unilaterally. On acceptance: flip Status to `Accepted`, add the date, index this
ADR in `docs/adr/README.md`, remove the `blocked` label from #225, and unblock I9/I10/I11/I12.

## References

- `docs/epic-i/tickets/I8-adr-comms-surface-channel-policy.md` (source ticket, full acceptance
  criteria)
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (§4, finding 9 — origin of Epic I)
- CLAUDE.md golden rules 1, 2, 6 (SEC-3) · §Methodology gate (R-C1, sign-off mechanics this ADR's
  per-post gate mirrors)
- ADR-0020 (community-contribution-governance — precedent for a new public-facing surface with a
  "no bypass of existing gates" design)
- `docs/method/egress-hosts.md` (comms-research hosts to be registered if/when a fetch workflow is
  built, per §5)

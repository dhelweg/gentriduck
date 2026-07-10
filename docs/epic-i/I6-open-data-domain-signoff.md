# I6 open-data page — domain-expert framing check

**Ticket:** I6 (#223), branch `feature/223-i6-open-data-page`
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-10
**Scope:** Narrow, single-gate framing check per the I6 SPEC's Gate section (NOT the full dual
R-C1 methodology gate — this page introduces no indicator, weight, normalization, or spatial
method). Checks (a) the non-advocacy bar for the whole page and (b) specifically the
IFG-adjacent closing paragraph, against `docs/epic-i/storytelling-guide.md` §3 (tone rules,
esp. rules 2 and 6) and the O3 "non-advocacy/transparency" editorial stance in
`docs/PROJECT_PLAN.md`.

Artifact reviewed: `web/pages/open-data.md` (new page, #223).

---

## Verdict: PASS

The page reads as an experience report, not campaigning: it states what happened, cites the repo
artifact behind every friction claim, and stops short of drawing a policy conclusion. It clears
the non-advocacy bar and the grounding requirement (every claim is traceable).

## What I checked and why it holds

1. **Every friction claim is traceable to a repo artifact**, as the SPEC's acceptance criteria
   require. I checked each one against its citation: OSM login-gate → ADR-0002 +
   `ingestion/README.md`'s "manual precondition" section (accurate — the doc does say a
   contributor-account login is a one-off manual step); EWR format drift/suppressed-value bugs →
   #50/#57/#58 (closed bugs, correctly summarized, no invented severity); CKAN 404s → #197 (open
   issue, correctly described as unresolved, not silently claimed fixed); LOR filename drift →
   #134/ADR-0016 (matches the ADR's own incident narrative); Wohnlage `ohne`-tier dilution → #212
   (closed bug, correctly described); Mietspiegel PDF-only → ADR-0003 §G-E (matches the ADR's
   stated rationale for re-tabulating rather than redistributing). No claim overstates its source.

2. **Non-promotional register (tone rule 2).** The page never claims the project itself is
   impressive — it states facts about the pipeline's friction and lets the reader draw
   conclusions, matching the site's house voice ("state the finding as a genuine, open question,"
   not "our cutting-edge pipeline"). "Hard" is explicitly scoped to *engineering friction*, not a
   complaint about licence terms — the Honest caveats section states this directly ("'Hard' here
   means engineering friction, not that the licences were wrong"), which pre-empts a plausible
   misreading and keeps the page in experience-report register rather than grievance register.

3. **The IFG-adjacent paragraph is the sensitive part, and it holds the line.** "What this means
   for the open-data debate" is the one paragraph that touches an active political debate
   (Informationsfreiheitsgesetz). It:
   - States only what the project itself demonstrates ("every result on this site... was built
     entirely from data that German public bodies already publish under free licences") — a
     factual claim about this project, not a claim about IFG scope, coverage, or any specific
     legislative provision.
   - Separates the observation from any legislative conclusion explicitly: "better publishing
     practice, not more openness in principle, would remove [the friction]" distinguishes a
     *publishing-quality* ask (concrete, in the wishlist above it) from an *access-scope* ask
     (which the page does not make).
   - Closes with an explicit disclaimer of further conclusion: "This page states what the project
     observed; it draws no further conclusion about legislation or policy." This is the same
     "state what the gate did, not adjectives of quality" discipline the I3 sign-off found
     load-bearing for the AI-process caveats — here it is load-bearing for the political-adjacency
     boundary instead. It should be kept verbatim if this paragraph is ever revised.
   - No campaigning language ("we need," "it is essential," "policymakers must") appears anywhere
     in the paragraph or the page.

4. **The standardization wishlist is specific and actionable, not a vague call to action** — each
   of the 6 items names the concrete mechanism (versioned schemas, redirects, published
   crosswalks, documented categorical semantics, no login gate on bulk historical extracts,
   machine-readable formats over PDF) and ties back to a cited incident. This matches the SPEC's
   "recommendations concrete enough for a data publisher to act on" bar and keeps the register as
   engineering feedback rather than advocacy.

5. **Displacement/gentrification framing guardrails are not engaged** — this page makes no
   gentrification, displacement, or status/dynamism claim of any kind; it is entirely about data
   sourcing and pipeline engineering, so rules 4/5/7 (improving-is-not-good-news,
   risk/pressure-only language, numeric decoders) do not apply here. Confirmed by re-reading the
   full page: no stage name, no status/dynamism number, no displacement-adjacent word appears.

## Theory / framing risks

- None material. The one watch item (the IFG paragraph) is handled correctly per §3 above.

## Recommendations (non-blocking)

- If this paragraph is ever shortened for a social post (I11), the "it draws no further
  conclusion about legislation or policy" clause is the one that must survive intact — it is doing
  the same work the I3 sign-off flagged for the AI-process caveat: without it, a shortened version
  could read as taking a side in the IFG debate.

**Verdict: PASS**

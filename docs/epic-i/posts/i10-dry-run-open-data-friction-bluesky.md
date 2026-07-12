# I10 dry-run draft — open-data friction (P6), Bluesky/Mastodon

**Status:** DRY RUN — produced to satisfy I10's acceptance criterion ("one sample draft produced
end-to-end: draft → sign-off request, on an already signed-off finding"). This is a workflow
demonstration, not a publication-ready post: it exercises the `comms-draft` skill's steps 1–6 and
stops at the sign-off *request* the way the acceptance criterion asks. **It is not handed to the
maintainer to post** until an actual `gentrification-domain-expert` review records `Verdict: PASS`
in a companion `i10-dry-run-open-data-friction-comms-domain-signoff.md` — that file is
intentionally not created here, so this draft cannot be mistaken for a cleared one.

## Step 1 — grounding

**Source finding:** `web/pages/open-data.md` (I6, #223), specifically the OSM-login-gate and
CKAN-404 friction points, both already domain-signed-off as accurate and non-advocacy-compliant in
`docs/epic-i/I6-open-data-domain-signoff.md` (**Verdict: PASS**, see that file's point 1: every
friction claim traced to a repo artifact — ADR-0002/`ingestion/README.md` for the OSM login gate,
#197 for the CKAN 404s). No new claim is made here beyond what that page and sign-off already
cover.

## Step 2 — audience/channel

Persona: **P6 — open-data & civic-tech community (incl. data publishers)**, per
`docs/epic-i/audience-channel-map.md` §2. Channel fit: **Bluesky/Mastodon primary**. No area-level
lead-lag claim is present (this is a pipeline-friction story, not an index finding), so the
standard single-order sign-off path applies (domain-expert, then geo-DS only if a number/trend is
claimed — see step 6).

## Step 3 — draft (Bluesky/Mastodon variant)

> An upstream CSV format changed on us three separate times across five years of Berlin resident
> registration (EWR) data — different delimiters, different columns present, one silent
> corruption of a suppressed-value field. Each one broke the pipeline in a slightly different way
> before we caught it.
>
> None of this is a complaint about the licence — every source behind this project's numbers is
> freely available under an open licence, which is exactly what let a small project rebuild a 2018
> thesis from scratch. The friction was engineering, not access: no versioned schema, some bulk
> extracts sit behind a one-off contributor-login gate, one endpoint has been returning 404s for
> three years running with no clear replacement announced.
>
> Full write-up, one incident per bullet, each cited back to the actual bug/issue that caught it:
> [link to /open-data]

(120 words in the visible post body; link is the required destination per ADR-0021 §2 — no
project-owned profile posts this, the maintainer would from their personal account.)

## Step 4 — self-check (ADR-0021 §4)

- O3 non-advocacy: no policy claim, no "the law should..." language — matches the open-data page's
  own IFG-adjacency boundary (I6 sign-off point 3).
- O4 factual/non-promotional: every incident traces to a cited artifact (#50/#57/#58, #197, #134,
  #212 — see the open-data page and its sign-off); no superlative about the project itself beyond
  the plain fact that it was rebuilt from open sources.
- No third-party personal data: none present (no named individual or organization).
- Maintainer not named in this draft (not needed for this finding).
- Displacement framing: not applicable to this draft (pipeline-friction content, not an index
  finding).

Self-check: **passes** all five ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`, is that commit.

## Step 6 — sign-off request (dry run stops here)

This draft makes no numeric/trend claim about the gentrification index itself (it is about
ingestion pipeline friction), so per the `comms-draft` skill only the
**`gentrification-domain-expert`** framing/ethics sign-off is required (no `geo-data-scientist`
sign-off needed — no number or model claim is made). **Requesting**:
`gentrification-domain-expert`, please review this draft against O3/O4 and the I6 sign-off's own
non-advocacy bar and record `Verdict: PASS` (or conditions/FAIL) in a companion
`i10-dry-run-open-data-friction-comms-domain-signoff.md` file, following the existing
`*-domain-signoff.md` format.

**This dry run does not proceed to step 7 (maintainer hand-off).** It exists to demonstrate the
workflow end-to-end for I10's acceptance criterion, and intentionally stops at the request rather
than fabricating a sign-off. A real I11 draft on this same finding (or another) would continue
past this point once an actual sign-off is recorded.

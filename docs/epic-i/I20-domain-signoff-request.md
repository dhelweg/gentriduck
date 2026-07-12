# I20 (#244/#252/#253) — Amenity/mover-framing sign-off request for `gentrification-domain-expert`

**Status: PENDING** — this is a **request packet**, not the sign-off itself. The actual
`I20-domain-signoff.md` (with `Verdict: PASS`/`FAIL`/`concerns`) must be authored by the
`gentrification-domain-expert` agent/reviewer before #254 (web slice) integrates into `develop`,
per CLAUDE.md's R-C1-adjacent hard gate named explicitly in the I20 SPEC ("domain-expert gates
the mover framing"). PM has assembled the material below so that review can happen without
re-deriving scope from scratch — **no verdict is asserted here**.

**Ticket:** `docs/epic-i/tickets/I20-amenity-insights-movers.md` (parent #244).
**Branches under review:** `feature/252-i20-amenity-mart` (data), `feature/253-i20-domain-curation`
(curation rules + P7 persona).
**Prepared by:** PM, 2026-07-12.

## 1. What needs a verdict

The I20 SPEC's hard gate: *"a gentrification observatory that advises movers can become a
gentrification accelerant... the site informs, it never recommends or ranks areas to move to; no
real-estate-portal language."* Two concrete artifacts embody this framing decision and need review:

1. **`docs/epic-i/audience-channel-map.md` §2, P7** — the "prospective mover" persona description
   itself, specifically whether its "what convinces them" / "what alienates them" framing correctly
   states the never-recommend/never-rank boundary as binding rather than aspirational.
2. **`docs/epic-i/I20-poi-curation-rules.md`** — the display rules that will become #254's actual
   page copy. In particular: does presenting a "dominant cuisine" and infrastructure counts, even
   without ranking areas against each other, risk being read as an implicit endorsement ("this area
   has good food/schools") rather than a neutral inventory?

## 2. Illustrative mock copy (NOT yet real page copy — for review of register only)

To make the framing question concrete rather than abstract, here is the kind of sentence #254 would
plausibly render under the curation rules as currently drafted. **Please review these for tone/
register**, not for factual accuracy (these are placeholder numbers):

> "This area (Prenzlauer Berg Nord, PLR 03200104) has 3 schools, 2 kindergartens, 1 doctor's
> office, 4 pharmacies, 2 supermarkets, 5 playgrounds, and 12 transit stops. Among 40 restaurants/
> cafes with cuisine data, Italian is the most common (28%). Compared to the district average of
> ... [district figures]. Note: these figures come from OpenStreetMap tagging, not an official
> registry — see caveat below."

Open questions for domain-expert review:
- Does "the most common [cuisine]" read neutrally, or does it imply a value judgment ("this is a
  desirable food scene")? Should the wording be more clinical (e.g. "cuisine breakdown: Italian
  28%, [next], [next]" rather than a prose "dominant" framing)?
- Does presenting district comparison numbers side-by-side create an implicit "better/worse"
  reading even without any explicit ranking language or sort order?
- Is "everyday infrastructure" itself a neutral frame, or does listing schools/doctors/supermarkets
  together read as an implicit livability score even when presented as raw counts with no weighting
  or aggregate index?

## 3. What is explicitly NOT in scope for this gate

- Data correctness / mart design (`mart_area_amenities.sql`) — that is the data-engineer↔reviewer
  gate, already run separately; not on the R-C1 gated-file list per CLAUDE.md, so no methodology
  sign-off applies to the data layer itself.
- OSM completeness bias (schools/doctors under-mapped vs over-mapped areas) — that is a geo-DS
  consult (see `I20-poi-curation-rules.md` §3), not this domain-expert gate.
- Reach/persona-channel questions for P7 beyond the framing text itself — deferred with #229
  (currently `blocked`), not part of this request.

## 4. Recommended reviewer questions to answer explicitly in the eventual sign-off

1. Does the P7 persona description (§2 of the audience map) state the never-recommend/never-rank
   boundary clearly enough to bind #254's actual copy, or does it need stronger/more specific
   wording?
2. Do the curation rules' §1 default-display rules (infrastructure counts + dominant cuisine +
   district comparison) risk an implicit-recommendation reading as currently scoped, and if so,
   what concrete wording change would resolve it (see illustrative mock copy, §2 above)?
3. Any additional "must never appear" phrases to add to the curation-rules doc as an explicit
   denylist (mirroring how other I-epic domain sign-offs have named specific forbidden phrasings)?

## References

- `docs/epic-i/tickets/I20-amenity-insights-movers.md` (source SPEC, "Gate (hard)" section)
- `docs/epic-i/I20-poi-curation-rules.md` (#253 — the rules this request reviews)
- `docs/epic-i/audience-channel-map.md` §2 P7 (#253 — the persona this request reviews)
- `docs/epic-i/I19-domain-signoff.md` (precedent format for the eventual sign-off document)

[I14] PLR area deep-dive — from chart stack to neighbourhood profile

## Why (problem)
`/area/[code]` is the site's richest data view (status line, trajectory, POI mix, OA radar, land
value/rent) and its weakest story: nothing tells a lay reader what these numbers *mean for this
neighbourhood*. There is no descriptive profile, no district context, the OA radar needs the
methodology page open in a second tab, OA values read as opaque numbers, and the POI-mix stacked
bar is unordered.

## Goal
Each PLR page reads as a compact neighbourhood **profile** — a plain-language portrait derived
from the data, followed by the evidence — recognisable to readers who know Berlin's official
small-area profiles.

## Scope & approach
- **Portrait block (top of page, generated from the marts):** a descriptive characterization
  composed from the OA mix + status/trajectory/price data — what kind of commercial landscape,
  which stage the area is in (in words, not a label), how fast it is moving, and how it compares
  to its district and the city. Deterministic template + data, not free-generated text; wording
  patterns defined with the data-analyst and framing-gated.
- **Format inspiration (References):** Berlin's official small-area profiles — the district
  Sozialraum region pages on berlin.de (e.g. Friedrichshain-Kreuzberg, region Boxhagener Platz)
  and the BZR *Kurzprofil* PDFs (e.g. `bzr_092007_adlershof_kurzprofil_2025-03-31.pdf`): compact
  narrative portrait + key indicators + context, a structure Berlin administration and policy
  readers already know. This page should feel like the living, data-backed version of a Kurzprofil.
- **Context everywhere:** district + citywide comparison lines/values on every chart; the area's
  stage explained in one sentence next to the stage value.
- **OA made readable:** an accessible explanation beside the radar (what OA is, in one paragraph,
  no second tab); **OA displayed as a percentage relative to the citywide baseline** (e.g.
  "+30% vs Berlin") instead of raw quotient/0-1-2-style values.
- **POI-mix stacked bar ordered by type count** (largest first) so it can actually be read.
- Lives under the I2 `/berlin/` folder; template per I1.

## Acceptance criteria
- Portrait block renders for all 542 PLRs with sensible wording at the extremes (empty/sparse
  areas degrade gracefully); district/citywide context on every chart.
- OA shown as % vs citywide with in-place explanation; stacked bar sorted by count; page follows
  the I1 template.
- Spot-check vs the official Kurzprofil structure documented in the PR.

## Gate / sign-off
domain-expert framing sign-off on the portrait wording patterns (`I14-plr-profile-domain-signoff.md`,
Verdict: PASS) — small-area characterizations are the highest-misuse-risk text on the site.
web-engineer-reviewer for build/render. **OA-derived wording and the % display land only after the
I15 sign-offs** (a profile built on a wrong number is worse than no profile).

## Dependencies / relations
After I1, I2; OA content holds on I15. Relates to I16 (map click-through lands here) and I5
(takeaways link to example profiles).

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 7)
- berlin.de district Sozialraum region profiles (e.g. Friedrichshain-Kreuzberg / Boxhagener Platz)
  and BZR Kurzprofil PDFs (e.g. `bzr_092007_adlershof_kurzprofil_2025-03-31.pdf`) — format models
- ADR-0017/0018 (OA) · `web/pages/area/[code].md` (current page)

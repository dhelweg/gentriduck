---
name: comms-draft
description: The comms-strategist drafting workflow for Gentriduck — ground a draft in a signed-off finding, pick audience/channel from the I9 map, write per-channel variants, self-check against ADR-0021's content rules, commit under docs/epic-i/posts/, and request the per-post sign-off gate before handing off to the maintainer. Use for I11 (first post series), I12 (reach-loop framing posts), and I13 (launch pack) drafting work.
---

# comms-draft — comms-strategist drafting workflow

1. **Ground in the finding.** Pick a genuinely signed-off, closed piece of work: a closed issue, a
   shipped site page, a domain/geo sign-off file (`docs/epic-*/`), or the whitepaper (O2). Read the
   sign-off itself, not just a summary of it — the draft's claims may not exceed what the sign-off
   actually supports. If the finding depends on a still-open ticket (e.g. an OA claim before I15
   passes), stop — it is not ready to draft.

2. **Pick audience/channel from the I9 map.** Read `docs/epic-i/audience-channel-map.md`, match the
   finding to the persona(s) it best serves, and use that persona's stated channel fit and format
   guidance. If the finding is an area-level lead-lag claim (P1/P2), note the §4 dual-use gating
   now — it changes the sign-off order in step 5.

3. **Draft per-channel variants.** For each channel the persona maps to: hook first (the concrete
   finding, not a generic intro), simple but true (no jargon the persona's "what alienates them"
   flags), one honest caveat kept in (never softened or dropped to fit length), a link back to the
   source page/whitepaper. Match each channel's register (LinkedIn: 120–200 words, professional;
   Bluesky/Mastodon: can run longer, thread-friendly, more technical) per the I9 map §3 summary
   table.

4. **Self-check against ADR-0021 §4 content rules** before drafting is "done": O3 non-advocacy (no
   campaigning language), O4 factual/non-promotional (no inflated superlatives), no third-party
   personal data, maintainer named sparingly if at all, displacement kept risk/pressure-framed.
   Reject your own draft and revise if any rule fails — do not hand off a draft you know fails a
   rule and flag it as "needs review" instead.

5. **Commit under `docs/epic-i/posts/`.** File name pattern: `<ticket>-<slug>-<channel>.md` (e.g.
   `i11-open-data-friction-bluesky.md`). Include: the source finding/citation, the target
   persona(s), the draft text itself, and a note on whether it contains an area-level lead-lag
   claim (governs sign-off order in step 6).

6. **Request sign-off(s).** Always request `gentrification-domain-expert` (framing/ethics:
   `*-comms-domain-signoff.md`). Additionally request `geo-data-scientist`
   (`*-comms-geo-signoff.md`) wherever the draft states a number, index value, or trend — accuracy
   against the underlying model. For P1/P2 area-level lead-lag drafts, domain-expert sign-off is
   requested and must PASS **before** geo-DS is asked (I9 map §4). A draft may not proceed to step 7
   while either required sign-off is missing, pending, or records `concerns`/`FAIL`.

7. **Hand off to the maintainer.** Once all required sign-offs record `Verdict: PASS`, report the
   committed draft path(s) and sign-off path(s) to the PM/maintainer for manual posting. **You do
   not post, schedule, or hold any platform credential at any step of this workflow** — handing off
   is the last action, always.

Guardrails: draft-and-screen only, forever (no posting tooling, ever, without a fresh ADR); every
claim traces to a signed-off source; O3/O4 register; no third-party personal data; area-level
lead-lag claims get the domain-first dual sign-off, not geo-DS alone.

---
task: B1 / #70 — Berlin Milieuschutz PLR-flag (fourth slice, first integration slice)
author: gentrification-domain-expert
date: 2026-07-09
branch: feature/70-b1-milieuschutz-plr-flag
---

# Domain sign-off — Milieuschutz PLR flag (`int_berlin_milieuschutz_plr_flag`)

- **Branch:** `feature/70-b1-milieuschutz-plr-flag`
- **Issue / task:** #70 [B1], fourth slice.
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Artefacts reviewed:** `int_berlin_milieuschutz_plr_flag.sql` header/columns, ADR-0019, issue
  #70's framing (Döring & Ulbricht 2016).

## a. Is a Milieuschutz designation a legitimate, well-grounded displacement-risk marker?

**Yes.** A *soziale Erhaltungsverordnung* under §172 Abs. 1 Nr. 2 BauGB is not a researcher-invented
proxy — it is the City of Berlin's own legal instrument specifically enacted to prevent the
displacement of an existing resident population through luxury modernization, and Senate
designation criteria for these areas already incorporate indicators of gentrification pressure
(rising rents, resident-composition change risk) before the fact. Using the designation itself as a
displacement-risk marker is therefore citing an authoritative, independently-validated judgment
rather than re-deriving one — this is a stronger grounding than most proxies in this pipeline, not a
weaker one. This directly operationalizes issue #70's own framing (Döring & Ulbricht 2016's
"Gentrification-Hotspots und Verdrängungsprozesse") without requiring any new theoretical
justification beyond what ADR-0019 already documented.

## b. Is the framing in the column description (policy marker, not measured outcome) sociologically honest?

**Yes, and this is the single most important thing to get right here.** The column description
states: "PLRs without the flag are not thereby 'safe from displacement,' only 'not (yet) formally
protected.'" This is the correct caveat. A Milieuschutz designation is a *policy response* to
recognized risk, not a *measurement* of displacement pressure — the causal arrow runs from
"neighbourhood the Senate judged at risk" to "designation," and a PLR can face real displacement
pressure (rent increases, resident turnover) without ever having been formally designated, whether
because the administrative process hasn't caught up, the area falls just outside a drawn boundary,
or political/budgetary constraints limited how many areas could be protected in a given year. The
model correctly avoids the inverse-inference trap (absence of designation = absence of risk) both in
its own documentation and by exposing `milieuschutz_overlap_frac` as a continuous signal rather than
forcing everything into a binary "protected/not" reading.

## c. Is publishing this as a standalone disclosure layer (rather than blending into the index) the right ethical/framing call?

**Yes.** Blending a binary/policy-response variable into the continuous D1/D2 gentrification index
without a grounded weighting rule would risk exactly the kind of "measured outcome" misreading this
sign-off flags in (b) — a reader seeing Milieuschutz silently move the headline index score would
reasonably (and incorrectly) infer it was being treated as equivalent evidence to the MSS
Status/Dynamik indicators, which are actual measured social-status/dynamism outcomes. Keeping it as
an independently queryable, clearly-labelled disclosure layer is more transparent, not less useful —
it lets a future G2 page present "this area is home to below-median MSS status AND has a Milieuschutz
designation" as two separately-sourced facts, which is the honest way to describe policy response
alongside measured outcome.

## d. Ethics/framing note for the eventual G2 disclosure (non-blocking, forward guidance)

When this lands on a public page: state explicitly that Milieuschutz coverage reflects *administrative
capacity and political prioritization* as well as underlying risk — some genuinely at-risk
neighbourhoods may lack a designation for reasons unrelated to actual displacement pressure. Avoid
language implying the flag is a complete inventory of "gentrifying areas." This is guidance for the
G2 slice, not a blocker on this data-layer slice.

## Verdict

**Verdict: PASS.** The theoretical grounding (an authoritative policy instrument targeting exactly
the phenomenon #70 asks about), the honest policy-marker-not-outcome framing, and the
disclosure-layer (not index-blend) scoping are all sound. No changes requested.

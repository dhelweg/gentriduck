# I21-f (#300) — domain-theory spot-check: removal of the coarse-grain "Approximate status & change" BigValue section

**Ticket:** #300 (I21-f, canonical per-level template consolidation)
**Commit:** `41e717cd` · **Branch:** `feature/300-i21f-template-consolidation` · **Diff base:** `develop`
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-23
**Nature:** Narrow independent spot-check, **not** a full R-C1 sign-off. I21-f is a structural
template reorder and is **not** on the methodology-bearing file list (it touches only
`web/pages/**`, not the gated dbt models / analysis scripts / `docs/methodology|adr/**`). The
single reason it warrants a domain look at all is that it **removes** a previously-shipped,
previously domain-approved reader-facing section. This note answers only that question.

## Verdict: PASS

Removing the population-weighted-mean-of-ordinals BigValue section from the Bezirk and BZR
templates, and replacing it with a child-PLR stage **distribution + modal/heterogeneity-flag**
display, is the **correct** call. It brings both pages into line with the later, more specific
#267 ruling and reverses a section whose earlier approval that ruling supersedes. The replacement
faithfully operationalizes what both #267 lanes *prescribed* as the honest coarse-grain answer, and
no residual wording re-asserts a single re-scored stage/status claim for the district/Bezirksregion.

---

## Q(a) — Does the #267 ruling in fact cover Bezirk AND BZR grain explicitly (not just PGR / "coarse grain" in the abstract)? — YES

Both #267 decision documents name Bezirk and BZR **by grain, explicitly**, not merely "coarse":

- **Domain lane** (`docs/epic-i/I-coarse-index-domain-decision.md`): title line 1 ("at BZR/PGR/Bezirk");
  scope lines 26–27 ("a coarse 'how gentrified is this whole **Bezirk/PGR/BZR**' point value");
  Verdict lines 13–20 and Recommendation 1 lines 82–83 ("Decline the coarse-grain point-value
  gentrification index **at BZR/PGR/Bezirk**. No re-scored single index value at any grain coarser
  than PLR"). §2 (lines 44–55) names Friedrichshain-Kreuzberg / Mitte / Neukölln (Bezirk grain) as
  the frontier-erasure example. Bezirk and BZR are both squarely in scope.
- **Geo lane** (`docs/epic-i/I-coarse-index-geo-decision.md`): title line 1; §2 lines 22–26 identify
  the *exact* upstream model behind the removed render — `int_mss_bzr_aggregate` (B10/#120), which
  computes "**population-weighted mean of PLR ordinal status/dynamik codes, rounded and clamped**"
  and is "an internal diagnostic, deliberately **not** published." §3 line 37 rejects "Option (b) …
  mean of the *codes*" for **any published value**; §4 lines 72–74 order that
  `int_mss_bzr_aggregate` "stays an **internal MAUP diagnostic only** … and must **not** be surfaced
  as a headline value." The geo doc enumerates the grains as "BZR (~143) / PGR (~58) / Bezirk (12)"
  (line 47).

The removed section rendered `mart_mss_area_aggregate` — the thin display mart over exactly that
`int_mss_bzr_aggregate` — as three BigValues (`typology_stage` / `status_index` / `dynamik_index`)
for the Bezirk (`bezirk/[code].md`) and the BZR (`bzr/[code].md`). That is precisely, and by name,
the point-value construct both #267 lanes declined for these exact grains. The commit's supersession
claim is factually correct: `I249-web-b-domain-signoff.md` (2026-07-12) approved this section on a
narrow *display-fitness / caveat-wording* question **five days before** #267 (2026-07-17) examined
the prior question — whether the value should exist at these grains **at all** — and answered
DECLINE on both lanes. A later, more specific ruling on the superordinate question governs. (The
2026-07-12 sign-off itself, item 1 lines 10–19 and its residual-risk note lines 64–65, only ever
claimed to check that the approximation *caveat reached lay copy* — it explicitly did **not**
adjudicate construct validity, which is what #267 later did.)

## Q(b) — Is the distribution + modal/heterogeneity-flag replacement the correct operationalization — i.e. does it avoid erasing the invasion-succession frontier heterogeneity #267 is concerned about? — YES

The replacement matches, almost line-for-line, what the #267 geo lane **prescribed** as the honest
substitute (§4 lines 66–70): *"a distributional summary of child-PLR typology stages … enriched with
a modal/median stage + a dispersion indicator (share of child PLRs in the two most
gentrification-advanced stages, and an explicit 'mixed/heterogeneous' flag when no stage holds a
majority)."* The new "Social status & trajectory" section delivers exactly this:

- **Distribution** — the `stage_mix` bar chart (child PLRs bucketed across the six ADR-0008 stages),
  moved up, unchanged. This is a *count* per stage, not a central tendency.
- **Advanced-stage dispersion indicator** — `stage_mix_summary` computes `n_advanced` = PLRs in
  `active-gentrification` + `pioneer-signal`, plus their share.
- **Heterogeneity flag** — the reactive `<script>` renders "no single stage holds a majority" unless
  one stage exceeds 50% (`top_stage_share > 0.5`), in which case it names that stage with its
  percentage. This is a majority-gated modal, which is *more* conservative than a bare modal (it
  refuses to name a plurality stage as "the" stage) — a good, honest choice.

Because the display **counts PLRs per stage** rather than collapsing them to one re-scored value, it
directly answers the domain lane's core theory objection (§2 lines 44–55): a central-tendency value
"describes no actual PLR" and "destroys the signal" of *where the invasion-succession frontier sits*
(Dangschat 1988/2000 double invasion-succession; D1×D2 typology). A stage histogram + advanced-share
+ mixed-flag **preserves** that frontier structure and points the reader down the hierarchy to the
PLRs that carry the signal — exactly the domain-lane Recommendation 2 (lines 84–88) and the
"explicitly-labelled composition/dispersion statistic … never a central-tendency point value"
carve-out in Recommendation 4 (lines 92–95). The construct now measures *the heterogeneity*, not its
average — the sign of the whole objection is corrected.

**Minor note (non-blocking):** operationalizing "the two most gentrification-advanced stages" as
`active-gentrification` + `pioneer-signal` is a defensible but not self-evident choice — the six-stage
typology is a hybrid D1×D2 space, not a strict linear order, so "most advanced" is a judgment call
(one could argue `consolidation-pressure` belongs in an "advanced" pair). Two things make this safe
here: (1) the takeaway sentence **names both stages explicitly** ("classified active-gentrification
or pioneer-signal") rather than hiding them behind a vague "advanced" ranking, so there is no
concealed ordering claim; and (2) it is presented as a labelled composition count, which
Recommendation 4 permits. I'd recommend the canonical "advanced set" be pinned once on the G2
methodology page so every coarse page uses the identical definition — a consistency item for the
next methodology-page pass, **not** a blocker for this reorder.

## Q(c) — Any leftover wording implying a single re-scored stage/status claim for the area itself? — NO

Every reader-facing surface on both pages now *actively negates* a single coarse value, in four
independent places:

1. Section intro: "**never a single re-scored index value for the [district/Bezirksregion] itself**,
   since averaging ordinal stage codes … would mask exactly the … heterogeneity gentrification
   tracking depends on."
2. The takeaway sentence itself ends "… **never a single re-scored gentrification-index value for the
   [area] itself**."
3. Honest-caveats bullet 1: "**This page never shows a single re-scored gentrification-index value**
   … A population-weighted average of ordinal stage/Dynamik classes would violate this project's own
   'never average ordinal class codes' rule … while masking exactly the frontier heterogeneity …
   (see [both #267 decision docs], both **decline** the coarse-grain point value)."
4. Further reading: "… why coarser grains are reported as **distributions rather than a re-scored
   value**."

No live `BigValue` of `typology_stage` / `status_index` / `dynamik_index` survives, and the `mss`
query against `mart_mss_area_aggregate` is fully deleted from both templates. I confirmed by grep
that every residual mention of `mart_mss_area_aggregate` / "Estimated stage" / "Estimated status
index" / "Estimated Dynamik" in `web/pages/berlin/area/**` is now inside **HTML comments** (header
provenance / the I21-f rationale block), never in rendered markup. The upstream models
(`mart_mss_area_aggregate` / `int_mss_bzr_aggregate`) are correctly left untouched — they remain
valid as the internal MAUP diagnostic the geo lane sanctioned (§4 lines 72–74); only their *public
render* is withdrawn, which is exactly the scope #267 required. PGR and Ortsteil are consistent:
PGR never had the section (its header comment notes PGR was never wired to `mart_mss_area_aggregate`)
and gets the same distribution display for canonical-order parity; Ortsteil is non-LOR and out of
the mart's coverage.

**Minor housekeeping (non-blocking):** the top-of-page provenance changelog comment still carries the
original #249 line ("adds an 'Approximate status & change' section reading … `mart_mss_area_aggregate`")
at `bezirk/[code].md:22` and `bzr/[code].md:19`, describing a section that no longer exists. It is a
non-rendered comment and the new I21-f header block immediately below documents the removal, so
provenance stays traceable — but that #249 line would ideally get a "(removed by I21-f #300)"
annotation to avoid confusing a future reader of the source. Cosmetic only.

## Coordination

This is the domain lane of a spot-check, not a dual R-C1 gate (I21-f is not methodology-bearing). The
substantive methodology decision it enforces — #267 — was already dual-gated (geo CONCERNS→decline
the value + domain DECLINE, both 2026-07-17). This change *implements* that already-agreed decline in
the web layer; it introduces no new index weight, indicator, normalization, or spatial method. If the
PM wants belt-and-suspenders, a one-line geo confirmation that the replacement query surfaces no new
statistic (it reads only already-published `gentrification_index` PLR rows and counts them) would
close the loop, but I do not consider it required to integrate this reorder.

```json
{
  "verdict": "pass",
  "scope": "#300 I21-f template consolidation — narrow spot-check on the removal of the Bezirk/BZR 'Approximate status & change' population-weighted-mean-of-ordinals BigValue section and its replacement with a child-PLR distribution + modal/heterogeneity-flag display. Not a full R-C1 sign-off (I21-f is not methodology-bearing).",
  "domain_rationale": "The removed section rendered mart_mss_area_aggregate (thin mart over int_mss_bzr_aggregate) as a single re-scored typology_stage/status_index/dynamik_index point value at Bezirk and BZR grain — precisely the construct #267 declined by name on BOTH the geo lane (mean of ordinal codes violates ADR-0008/R-A3-C2; int_mss_bzr_aggregate must stay an internal MAUP diagnostic, never a headline) and the domain lane (a central-tendency value describes no actual PLR and erases the Dangschat double invasion-succession frontier heterogeneity that is the analytic payload). #267 (2026-07-17) postdates and supersedes the narrower I249-web-b display-fitness approval (2026-07-12). The replacement is the exact distributional answer #267 prescribed: a child-PLR stage histogram + advanced-stage share + an explicit 'no single stage holds a majority' heterogeneity flag, which preserves rather than erases the frontier structure and re-asserts no single value. Removal is correct.",
  "theory_risks": [
    "'Two most gentrification-advanced stages' operationalized as active-gentrification + pioneer-signal is a defensible but not self-evident cut in a hybrid D1xD2 typology; safe here because both stages are named explicitly (no hidden ranking) and presented as a labelled composition count, but the canonical 'advanced set' should be pinned once on the G2 methodology page for cross-page consistency.",
    "Cosmetic: the stale #249 provenance comment (bezirk:22 / bzr:19) still describes the now-removed section; non-rendered, and the I21-f header block below it documents the removal, so provenance is traceable."
  ],
  "recommendations": [
    "Integrate: the change correctly implements the already-dual-gated #267 decline in the web layer and introduces no new statistic (reads only already-published gentrification_index PLR rows and counts them).",
    "Follow-up (methodology-page pass, not this ticket): pin the canonical 'gentrification-advanced stage set' used by the advanced-share sentence so every coarse page uses the identical definition.",
    "Housekeeping (optional): annotate the #249 provenance line with '(removed by I21-f #300)'."
  ]
}
```

**Verdict: PASS**

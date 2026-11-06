# #368 site-wide page update: wording spot-check (domain)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-06
- **Reviewed:** `git diff develop...feat/368-site-pages -- web/pages`, specifically `timeline.md`,
  `how-its-organised.md` and `about.md`. I also checked `web/pages/methodology.md` ~325–340 as an
  advisory item.

Verdict: CONCERNS

There are no result sentences and nothing from the #371 must-NOT list. Two process sentences in
`how-its-organised.md` need tightening (R1, R2). If both are adopted verbatim, this is PASS without a
re-check.

## 1. `timeline.md`

- **Evidence-integrity (2026-10-27): accurate.** The source sign-off says "thesis verdicts now match
  Tabelle 6-16, H3a/H3b are finally separable … the back-test no longer calls a circular check
  validation". The entry says the same, and dating it by its sign-offs is disclosed in the comment.
- **#360: accurate.** The evidence doc confirms that the warehouse labels for slots S2–S4 were
  shifted by one, and that "every label from S2 to S4 was wrong". The entry's "were indeed
  mislabelled" and "the domain expert noticed" both match the doc.
- **#354: process only.** The source's status line ("written before any code exists") supports
  "Before any code was written". The year ranges match P354: thesis era MSS 2013–2019, modern
  windows from 2019.
- **#355: process only.** "An out-of-sample transfer test, not a replication" is my #355 framing.
  2013–2025 and 2019–2025 match `HH/full` and `HH/modern`. "Replaces … E5" is a process statement.
- **#371: process only.** Nothing from the must-NOT list appears. "Each hypothesis tested for a
  difference between the cities" uses the neutral wording from the #371c page review. "Two
  clarifications added afterwards are disclosed as an amendment" is honest about Amendment 5. "What
  it found is on the comparison page" points to the result rather than stating it.
- **#357 and the infrastructure entries:** no domain issue. #357 uses the "nothing of that kind is
  mapped" reading.

## 2. `how-its-organised.md`, "How an analysis gets onto the site"

The section is accurate in substance: pre-registration before results, domain review of the plan,
amendments, dual results sign-off with binding wording, and a page check. Two sentences need fixing.

- **R1: "after the results were seen" sets the bar too low.** Amendment 5 shows the real rule:
  an amendment written after the results were *computed* is marked post-results, even where no one
  had looked at them. Replace:

  > "If the work has to deviate from the plan, the change is recorded as a numbered amendment, and
  > an amendment made after the results were seen is marked as such."

  with:

  > "If the work has to deviate from the plan, the change is recorded as a numbered amendment, and
  > an amendment made after the results were computed is marked as such."

- **R2: "linked from the pages that use them" over-claims.** The `/berlin-vs-hamburg` page, for
  example, links the pre-registration, data checks and findings, but not the sign-off files.
  Replace:

  > "Each of these documents is public in the repository, linked from the pages that use them."

  with:

  > "Each of these documents is public in the repository, and the pages link to the plan and the
  > findings behind them."

## 3. `about.md`: no issue

- The multi-city status lines are accurate and neutral.
- The Hamburg thesis re-check is correctly called "a transfer test on a different city, not a
  replication".
- "Only after that merge does the project manager publish the site, built from exactly what was
  merged" matches ADR-0012 Amendment C.

## 4. Advisory: `web/pages/methodology.md` ~333 (C3/#160)

This text is **stale, though not contradictory**. It presents C3/#160 as current evidence and does
not tell readers that it has been superseded. The pre-registered #355 re-test is now the reference
for Hamburg hypothesis tests, and its results do not need restating here. Suggested replacement for
the C3 parenthesis:

> "[C3/#160](https://github.com/dhelweg/gentriduck/issues/160) (an early re-run of the lead-lag
> hypotheses on Hamburg's own annual panel, since superseded by the pre-registered Hamburg re-test
> of all eight thesis hypotheses, [#355](https://github.com/dhelweg/gentriduck/issues/355), reported
> on the [Hamburg thesis re-check](/hamburg/thesis-recheck)),"

It is the PM's call whether this goes into #368 or a follow-up. It is not a condition of this
review.

Verdict: CONCERNS

---

## Re-check (2026-11-06, `feat/368-site-pages` @ 1e953cd37)

- **R1, R2 and the §4 C3/#160 text are in verbatim:** `how-its-organised.md` lines 121 and 129;
  `methodology.md` around line 334.
- **"No signup" fix (4 places).** This is accurate: every source is openly licensed and free, and
  the OSM full-history login is disclosed consistently, linked to the open-data page each time.
  No domain issue.
- **`how-its-built.md`, the Hamburg EWR line ("at the coarser Stadtteil level only, not per
  statistisches Gebiet").** This is accurate (`stg_hamburg_ewr_stadtteil`). It also usefully
  stops readers from assuming Gebiet-level demographics.
- **`how-its-built.md`, "the outcome the analyses model (the variable they test against)".** This is
  better than "explain", which implied a causal account. It is not over-claiming.
- **`berlin/poi-map.md`, the line on Hamburg's own map and unpooled baselines.** It replaces a stale
  "not signed off yet" with a statement that matches `/hamburg/poi-map` and the methodology §6 rule
  against pooling. Consistent between the cities.

Verdict: PASS

# #354 phase C — public page wording, domain sign-off

- **Reviewer:** gentrification-domain-expert (R-C1 domain half; I5 SPEC public-claims gate for `takeaways.md`)
- **Date:** 2026-11-01
- **Branch / commit:** `feat/354c-thesis-recheck-page` @ 9c34e592 (`git show 9c34e592 -- web/pages/`)
- **Checked against:** `docs/epic-e/354-domain-signoff.md` §4 (corrections) and §5 (table, per-row
  sentences, differences from geo-DS), and pre-registration §9 (must-not-claim). I did not open the DB.
- **Pages:** `web/pages/thesis-recheck.md`, `index.md`, `takeaways.md`, `methodology.md`,
  `methodology-oa-modes.md` (`berlin/maps.md` changes a comment only).

Verdict: CONCERNS

Four one-sentence edits (P1–P4 below). Almost everything else follows the sign-off verbatim. Once
P1–P4 are applied as proposed, or in equivalent wording, the page passes on my side without
another full review.

```json
{
  "verdict": "concerns",
  "domain_rationale": "The verdict table is read from the CSV's primary rows and never selects the raw verdict. The CASE maps every 'holds' value to the §5 plain-word labels. Estimates appear only on 'Holds' rows, and the thesis column has words only, with no AUC. The footnote on era plus method, the 'what status means' paragraph, all eight per-row sentences, the H1c §1.3 text and the corrections block are verbatim §4/§5. There is no 'pressure' wording for Dynamik, no causal or displacement wording, no ethnic wording, and H1b says 'share of the gastronomy mix' everywhere. Four sentences remain. Two summaries (Alert, home page) say none of the thesis's timing claims holds, but its rejection of H3a does hold, and the table itself says 'Rejected, as in 2018'. Takeaway 1 says current status predicts change better than the 'commercial mix', but H2 is tested on the mix of shops, services and public facilities. The methods paragraph calls the H1/H2 predictor a quotient of 'a business category'.",
  "theory_risks": [
    "Pre-existing, outside this commit: the live-index copy on index.md (lines 139, 261) still reads negative Dynamik as 'higher gentrification pressure' (#358). It now sits a scroll away from a page that forbids that reading for the suite. Track it under #358, not here.",
    "Pre-existing: methodology.md §1 describes the thesis's H3b outcome as 'social composition'. The thesis measured MSS social status (recommendation R2)."
  ],
  "recommendations": ["P1-P4 required", "R1-R4 optional"]
}
```

## Required edits (file:line, current, proposed)

**P1 — `web/pages/thesis-recheck.md:73–75` (Alert).** "None of its timing claims holds up" is
inaccurate. The thesis *rejected* H3a, and that holds; the table says "Rejected, as in 2018". Only
its tentative H3b support is not reproduced.
- Current: `None of its timing claims holds up: we find no detectable ordering between commercial change and change in officially measured disadvantage, in either direction (H3a–c).`
- Proposed: `On timing, we find no detectable ordering between commercial change and change in officially measured disadvantage, in either direction (H3a–c): the thesis's tentative finding that a fall in disadvantage comes first (H3b) is not reproduced, and its rejection of "commerce first" (H3a) holds.`

**P2 — `web/pages/index.md:86–88`.** The same issue in the home-page summary.
- Current: `Its timing claims do not: we find no detectable ordering between commercial change and change in officially measured disadvantage, in either direction.`
- Proposed: `Its tentative timing finding, that a fall in disadvantage comes before commercial change, is not reproduced: we find no detectable ordering between commercial change and change in officially measured disadvantage, in either direction.`

**P3 — `web/pages/takeaways.md:57–58` (takeaway 1).** This is the H2 result, and H2 is tested on
category OA across all domains. Its largest coefficients are public transport, benches, phones and
recycling. The "commercial" wording is licensed for H1 only (domain §5, difference 1).
- Current: `an area's current status level predicts its next change better than its commercial mix does.`
- Proposed: `an area's current status level predicts its next change better than its mix of shops, services and public facilities does, and adding that mix adds nothing.`

**P4 — `web/pages/thesis-recheck.md:96–99` (methods paragraph).** The H1/H2 predictor covers every
category, public facilities included. "Business category" carries the same slippage as P3.
- Current: `…the **Offering Advantage**, a location quotient of how over- or under-represented a business category is in a given area, as the thesis computed it…`
- Proposed: `…the **Offering Advantage**, a location quotient of how over- or under-represented a category of shops, services or public facilities is in a given area, as the thesis computed it…`

## Takeaway 1 (I5 SPEC public-claims gate): approved, conditional on P3

The new title, "The local commercial mix goes with social status — but it does not signal where an
area is heading", is a fair public summary.
- The first half is H1 with the businesses licence: the commercial-only row holds in both periods.
- The second half is my own §5 H1 phrase, and it is backed by H2 (no increment over status level)
  and H3 (no detectable ordering).

The H1b sentences (share of the gastronomy mix, per-resident count shows no clear link, "not a
statement about any business or its owners") and the "Read as" line ("one description of an area's
current situation … not a predictor of change") are correct. Removing the E5 Hamburg sentence
pending #355 is right. With P3 applied, I approve the takeaway change. The I5 domain sign-off is
superseded for takeaway 1 only.

## Checked and correct (no change)

- **Table mechanics (`thesis-recheck.md:121–191`, source SQL):** primary rows only, `verdict` not
  selected, `city = 'BER'`. An unknown `holds` value gives a blank cell. The labels match §5
  exactly. H1 shows AUC 0.68/0.74 and H1b shows ρ 0.47/0.44, only on "Holds" rows. The thesis
  column has words only. The column titles are as in §5. A regenerated CSV flows through, so the
  page cannot drift from the signed-off numbers.
- **Footnote (193–197), "What status means" (115–119), BH sentence (107–110):** verbatim or
  faithful. The tie-ceiling sentence is the §3 public form.
- **Per-row sentences (207–267):** H1, H1a, H1b, H1c (§1.3 binding text plus the composition line),
  H2 and H3 are the §5 text, with all five geo-DS differences applied (H2 "mix of shops, services
  and public facilities", "change in officially measured disadvantage", the "one area in ten" class
  contrast, the attributed "spurious correlation", and the refugee/SGB II line in the shock
  sentence).
- **Columns section (269–279):** a correct summary of findings §9. The thesis AUCs are not shown.
  The Hamburg placeholder makes no claim.
- **Corrections block (281–307):** verbatim §4, including the symmetric H1 and H2 reversals and the
  October entries kept as history.
- **"What still matters" and caveats (~388–427):** H1b is area-level and deprivation-framed. H3
  carries "rules out a strong ordering, not a small one". The exploratory-row chance count and the
  explicit "associations … not causes … nobody shown displaced" line are there. #337 and the
  refugee-accommodation limitation are disclosed. EWR is pointed to, not restated.
- **`methodology.md:54–55`, `methodology-oa-modes.md:708–714`:** the new sentences are accurate (H3b
  not reproduced in either era; the single-number proxy is wrong-signed, while the multi-feature
  H1 holds).
- **§9 scan of all five pages:** no "pressure" wording for Dynamik in any changed text, no
  displacement or causal claim, no döner, kebab, migrant or ethnic wording, and no "fast-food
  density".

## Optional (R1–R4)

- **R1** `thesis-recheck.md:199–203`: add a legend entry: *Still unclear: explained by the current
  status level*: "a weak link that disappears once the area's current status is known, as the
  thesis itself suspected."
- **R2** `methodology.md:51–53` (pre-existing): "a neighbourhood's social composition tends to
  change *before*" should become "a neighbourhood's officially measured social status tends to
  change *before*". The thesis outcome was MSS status, not composition.
- **R3** `thesis-recheck.md:224` (H1b): "about half of all planning areas" is right for 2019–2025
  (260/535). For the thesis era it is 188/436 (43%). "roughly half" or "43–49%" would cover both.
- **R4** `takeaways.md` timing sentence: add "which rules out a strong ordering, not a small one",
  matching the recheck page.

---

## Re-check (applied edits), 2026-11-01

Scope: `git show 90ed9aae -- web/pages/`. I did not open the DB.

| Item | Where | Status |
|---|---|---|
| **P1** | `thesis-recheck.md:73–76`, Alert | **Met**, verbatim. It names H3b as not reproduced and the H3a rejection as holding. |
| **P2** | `index.md:86–89` | **Met**, verbatim. |
| **P3** | `takeaways.md:57–58` | **Met**, verbatim, including "adding that mix adds nothing". Takeaway 1 is therefore **approved** (I5 public-claims gate). |
| **P4** | `thesis-recheck.md:98–99` | **Met.** My P4 called this the "methods paragraph". It is the "Two studies" paragraph, and that is the right place for the change. |

**H1c join: acceptable.** "In OpenStreetMap this category is mostly public playgrounds and
table-tennis tables, which are provided where many families live, including large estates." It
keeps the meaning of the binding §1.3 sentence (composition: playgrounds and table tennis, not
gyms) and adds my §5 sentence. All of the mixed-sign, polarity-slip and "verdict unaffected" text
before it is still verbatim. There is one small nuance, which is optional and not blocking. "Public"
now also qualifies the playgrounds. Many OSM playgrounds sit in housing-company courtyards, so the
§1.3 order ("mostly playgrounds and public table-tennis tables, which are provided …") is slightly
more exact. Either form passes.

**Other changes in the same commit, checked for domain meaning:**
- The geo C1 validity sentence (`thesis-recheck.md:120–124`) agrees with domain §3 (95–100% of the
  tie ceiling; the 0.8 threshold could not be reached; both are reported where they disagree).
- The geo C2 H3 sentence (`:265–270`) names the thesis-era H3b class row with its chance framing
  ("we do not read it as a finding"). That is consistent with "list, don't interpret".
- The `run_sha` string_agg change is not a wording change.

Neither introduces pressure, causal, displacement or ethnic wording.

Verdict: PASS

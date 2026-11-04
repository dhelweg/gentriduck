# #355 page — Hamburg thesis re-check, domain wording sign-off

- **Reviewer:** gentrification-domain-expert (R-C1 domain half; I5 public-claims gate for the `takeaways.md` pointer)
- **Date:** 2026-11-02
- **Branch / commit:** `feat/355c-hamburg-recheck-page` @ 8f6142e6 (`git show 8f6142e6 -- web/pages/`)
- **Checked against:** the Addendum reconciliation table in `docs/epic-h/355-domain-signoff.md`
  (with §5), pre-registration §9 / findings §13 (must-not-claim), and the geo-DS §7 text.
  I did not open the DB.
- **Pages:** `web/pages/hamburg/thesis-recheck.md` (new), plus pointers in `hamburg/index.md`,
  `thesis-recheck.md` and `takeaways.md`.

Verdict: CONCERNS

There is one required edit: one clause, in two places (P1). Everything else follows the Addendum.
With P1 applied as proposed, or in equivalent wording, the page passes without another full review.

```json
{
  "verdict": "concerns",
  "domain_rationale": "The table, labels and per-row sentences are the Addendum text. H1/H2 lead with 'Not comparable' and their sub-lines are tied to the signed-off CSV value. H1a is 'Stronger than thesis (tentative)' with the geo-DS text and my §4.5 clause. H1b names the composite as a whole and adds the untestable-outlet sentence. H3 uses 'change in officially measured disadvantage (… Dynamik class)' and carries the shock line. The E5 note is verbatim, and the 'classed as improving' secondary is absent. The page has no pressure, displacement, ethnic or 'confirms' wording. One condition of the Addendum is not met: 'as in Berlin' in H1b and H1c was acceptable only with the 'agreement is not proof of the same mechanism' line directly under the table. It sits above the table, in a paragraph readers pass before reaching the Details blocks.",
  "theory_risks": [],
  "recommendations": ["P1 required", "R1-R2 optional"]
}
```

## The four flagged wording calls

1. **H2 sub-line without tourist facilities: correct.** The H2 feature list is Mobility and Public
   Space only (findings §4 and §11), so "transport and public facilities" is the accurate construct.
   Accepted.
2. **H1b and H1c name the composite as a whole, and H1c gained a construct clause: correct and
   welcome.** It meets D8(e) (every Hamburg H1a–c sentence names the construct) and the Addendum's
   H1b rule. Accepted.
3. **"Agreement is not proof" appears once, above the table: not sufficient for "as in Berlin".**
   My Addendum allowed "as in Berlin" in H1b only on the condition that the line sits directly under
   the table. As built, the line is in "Read this first" (line 79). The H1b and H1c Details blocks
   are about 190 lines further down, and a reader who opens one block in isolation sees only "as in
   Berlin". That reads as "Hamburg confirms Berlin", which is on the must-not-appear list. The fix
   is a short clause in place (P1). Moving the line would also work, but the clause is more robust,
   because it travels with the sentence.
4. **"≈ 7,000" planning-area residents: correct here.** It is the §4.5 binding figure, and it
   matches the current data (Berlin PLR median 7,224 residents, 31.12.2024, from the #371 grain
   inventory). The Berlin page's study table ("Planungsraum (≈2,000–5,000 residents)",
   `web/pages/thesis-recheck.md:95`) is the stale one (R1).

## Required edit

**P1 — "as in Berlin" without the §4.5 qualifier (`web/pages/hamburg/thesis-recheck.md:274–275`
and `:285`).**

- H1b, current: `… where the Sozialmonitoring status is worse (ρ 0.42, moderate), as in Berlin. Status here is …`
- H1b, proposed: `… where the Sozialmonitoring status is worse (ρ 0.42, moderate), as in Berlin; a matching result is not evidence that the same process is at work. Status here is …`
- H1c, current: `Opposite direction, small, as in Berlin: more sport and leisure facilities go slightly with a worse Sozialmonitoring status …`
- H1c, proposed: `Opposite direction, small, as in Berlin (a matching result, not evidence of the same process): more sport and leisure facilities go slightly with a worse Sozialmonitoring status …`

## Checked and correct (no change)

- **Construct paragraph (74–82)** is my binding §5 text verbatim, including "not with any one
  indicator or group", transfer test, and "a matching result is not evidence … and a different result
  is not evidence that it isn't".
- **Table (86–220):**
  - H1/H2 cells are hard-coded "Not comparable", with the sub-line shown only while the CSV `holds`
    value matches. A regenerated CSV blanks the sub-line instead of leaving it stale. Good.
  - The H1 family is shown once ("Same test … one 2025 cross-section"), and only while both panels
    agree.
  - Both Hamburg column headers carry "Matches Berlin 2018?".
  - The thesis column has words only. The raw verdict is never selected, and an unknown `holds`
    value gives a blank cell.
  - The legend defines "Not comparable" and "Same test".
- **"Not like-for-like" (237–248)** is a faithful summary of the five §4.5 caveats.
- **Per-row Details:**
  - H1 and H2 are the Addendum text. The H2 full-chain sentence is "no usable signal, not an opposite
    effect".
  - H1a is the geo-DS text verbatim, with my clause "which is not evidence that the two cities
    differ".
  - H1b is area-level, with "not a statement about any group or business", the untestable-outlet
    sentence, and "counts once".
  - H3 uses the agreed edits (outcome name and shock line).
- **Corrections (311–315):** the E5 note verbatim.
- **Caveats (317–332):** BH per column with "not a second confirmation", the ecological-fallacy
  line, "associations … not causes … nobody shown displaced", "improvement ≠ gentrification" with
  its pathways, and the OSM point-mapping limitation.
- **§9 scan:** no "pressure" for Dynamik. No displacement, causal, döner, kebab, migrant-economy or
  ethnic wording. No "shops/services/businesses" for Hamburg H1/H2, except in the construct paragraph,
  which says they are too sparse to measure. No thesis AUC, and no "confirms" or "replicates" claim.
  The "classed as improving" secondary is absent.
- **Pointers.** `hamburg/index.md` (card and caveat), `thesis-recheck.md` (the placeholder becomes a
  pointer, plus further reading) and `takeaways.md` are neutral, state no Hamburg result, and say
  "transfer test, not a replication". **The takeaways pointer is approved** under the I5 gate: it
  adds no claim, and takeaway 1 is unchanged.

## Optional

- **R1** `web/pages/thesis-recheck.md:95` (Berlin page, pre-existing): "Planungsraum (≈2,000–5,000
  residents)" should become "Planungsraum (about 7,000 residents on average)", so that the two pages
  agree. A separate copy fix.
- **R2** Construct paragraph (line 81–82): "so Hamburg's H1 and H2 use transport, public facilities
  and tourist facilities instead" could add "(H2: transport and public facilities only)", matching
  call 1. This is my own binding text, so the clarification is permitted.

---

## Re-check (applied edits), 2026-11-02

Commit 34745816 checked. P1 (H1b "; a matching result is not evidence that the same process is at work", H1c "as in Berlin (a matching result, not evidence of the same process):"), R1 (Berlin grain "about 7,000 residents on average"), R2 ("(H2: transport and public facilities only)") and the Berlin-today H1 cell "Holds (businesses, AUC 0.74)" are applied as proposed. The geo-DS C1 rewording of the H2 line ("each of the five held-out groups of districts and in every time window") and the run_sha gate on the per-row sentences are accurate and add no claim. I did not open the DB.

Verdict: PASS

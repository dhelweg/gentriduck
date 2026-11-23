# #371 page `/berlin-vs-hamburg`: page wording sign-off (domain)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-05
- **Reviewed:**
  - `web/pages/berlin-vs-hamburg.md` at c36eca05c, and the rendered desktop screenshot;
  - the four link additions in `web/pages/index.md`, `web/pages/thesis-recheck.md`,
    `web/pages/hamburg/index.md` and `web/pages/hamburg/thesis-recheck.md` (`git show c36eca05c`).
- **Measured against:** `docs/epic-e/371-results-domain-signoff.md` §3 (headline, supporting
  sentences, must-NOT list), R1, O2, and the binding R7/E9/E3/O3/D7 wording.

Verdict: CONCERNS

Two sentences on the page are factually inaccurate. Exact replacements are in §2. If both are
adopted verbatim, this becomes PASS without a re-check. Everything else is met.

## 1. Checklist

| Item | Status |
|---|---|
| Headline sentence (Hero lede), verbatim | **Met.** It is guarded, with a neutral fallback lede. |
| Five supporting sentences, verbatim | **Met.** All five match §3 word for word, and each is guarded by the verdicts it describes. |
| Berlin H2 caveat next to its verdict (O2) | **Met.** It is in the Berlin H2 cell (screenshot confirms) and also in the bullet list. |
| R7, E9 and R1 scale caveat, verbatim | **Met** ("Read this first"). |
| No level comparison (E8) | **Met.** No U/T/C/K levels are shown, and the page says "this page does not compare the cities' levels". |
| R1: no bare flip tokens | **Met.** The checks render as "(sign unstable around zero)", "(unadjusted significance change)" or "(grain-dependent, MAUP)" with plain-language check names, and the legend explains them (screenshot confirms). |
| N1 "could not be tested at this grain"; "the more disadvantaged half of neighbourhoods"; "not about gentrifying areas" (O3, D7) | **Met.** |
| H1c note | **Met**: about the mix of mapped places, "not about sports provision as such". |
| R19 note in the methods box: no Gebiet, no accommodation link | **Met.** It names only the counting change and the Bericht 2021. |
| Anti-stigmatisation (P354 R3) | **Met.** Supporting sentence 1 ("does not mean … fast-food outlets signal a problem … incomes, rents and passing trade"). The H1b hypothesis label is the thesis's wording. The caveat "Nothing here says anything about an individual person, household, business or building" is present. |
| Must-NOT list | **Met.** No same or different cities claim, no ranking, no forecasting or investment framing, no "ordering refuted", no Gebiet named, no Dynamik claim, no S1/S7, no protection zones, no count of exploratory rows. The W2-only note reads the D6 way ("not a city difference … below chance"). |
| Statement-rule line (O1) | **Met.** It is an accurate plain-language summary of D8/D10/A5.2 and is generated from the rows. |
| Four link texts | **Met.** None states a result. O2 below suggests one wording tweak. |

## 2. Required changes

- **P1: "Fixed in advance" (methods box) overstates the pre-registration.** Amendment 5 (the flip
  definition A5.1 and the ≥ 5,000 condition of the statement rule A5.2) was written after the
  results were computed, as Amendment 5 itself discloses. The page says the checks and the statement
  rule "were registered before the results were computed". That is not fully true. Replace:

  > "**Fixed in advance.** The design, the checks and this page's statement rule were registered
  > before the results were computed:"

  with:

  > "**Fixed in advance.** The design, the checks and this page's statement rule were registered
  > before the results were computed. Two clarifications (how a check is marked as moving a result,
  > and how the 5,000-resident condition of the statement rule is tested) were added after the
  > results were computed and are disclosed in Amendment 5 of the pre-registration:"

- **P2: "Reading the checks" misstates the uncorrected Berlin indicator.** Berlin's uncorrected
  welfare indicator (core-3M) does **not** count unemployment twice. It *leaves out* unemployed
  recipients. It is Hamburg's indicator that includes them, so under core-3M the two cities' scores
  weigh unemployment differently (construct gap 5). Replace:

  > "Berlin's uncorrected welfare indicator, for example, counts unemployment twice in the
  > disadvantage score, which is why the corrected one is used for every verdict."

  with:

  > "Berlin's uncorrected welfare indicator, for example, leaves out recipients who are unemployed,
  > while Hamburg's includes them, so the two cities' scores would weigh unemployment differently.
  > That is why the corrected one is used for every verdict."

## 3. Optional

- **O1** Make the H1a and H1b hypothesis labels symmetric, since both are measured as a share within
  gastronomy. Change "Areas with many cafés have higher status" to "Areas where cafés make up more
  of the gastronomy mix have higher status".
- **O2** Link texts: "with a tested city difference for each hypothesis" could be read as "a
  difference was found". In `index.md`, `thesis-recheck.md` and the `/berlin-vs-hamburg` link card,
  change it to "with each hypothesis tested for a difference between the cities".
- **O3** "Reading the checks": "A check is listed under a result only where it moved that result"
  sits awkwardly next to "sign unstable … not a substantive change". Change it to "A check is
  listed under a result only where it changed that result's sign or its significance before
  correction."

Verdict: CONCERNS

---

## Re-check (2026-11-05, commit 83434904d)

Both replacements are on the page verbatim:
- **P1**, the methods box "Fixed in advance … disclosed in Amendment 5 of the pre-registration:", at lines 404–407;
- **P2**, the gap-5 sentence "leaves out recipients who are unemployed, while Hamburg's includes them …", at lines 508–510.

O1–O3 are adopted. The phrase "before the results were interpreted" appears only in the page's header comment and is not shown on the page.

Verdict: PASS

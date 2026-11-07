# #357 copy review (domain): zero-POI areas as density 0

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-06
- **Reviewed:** `git show c538aa126 -- web/pages/berlin/poi-map.md web/pages/hamburg/poi-map.md`
  (branch `feat/357-zero-poi-density`). This covers the #274 D-3 thin-mapping and anti-erasure
  disclosure in the warning alerts, the Haklay coverage caveat and the Honest-caveats bullets.

Verdict: CONCERNS

The change is sound and the anti-erasure substance is kept. One wording fix is needed in each
city's Honest-caveats bullet (R1). If R1 is adopted verbatim, this is PASS without a re-check.

## Assessment

- **Anti-erasure substance: kept, and extended to the new 0.**
  - Both alerts now say what a 0 means: no mapped place of the selected domain. They also say the
    Haklay coverage gradient applies to a 0 as well ("a low or zero mapped-place count … can
    reflect an OSM coverage gap … please don't read such a PLR / it as evidence that nothing is
    happening there").
  - Berlin's bold line, "nothing of this kind is **mapped** here … never 'commercially dead'",
    says *mapped*, not *exists*. That is exactly the right distinction.
- **Prominence.** The caveat sits in the warning alert directly above the map, and again in the
  Honest caveats. That is adequate.
  - Drawing a 0 in the scale's lowest colour, rather than hatching it, is defensible. Density is a
    count of mapped places, not a ratio, so the D-3 instability argument does not apply to it, and
    the coverage-gap reading is now stated for 0 explicitly.
  - The OA view still suppresses both the no-domain case and the thinly-mapped case. So the
    stigma-prone ratio is never shown on a thin base.
- **No stigmatising framing is introduced.** "Commercially dead" appears only in negation. The
  Hamburg sentence about the "deprived eastern/southern periphery" pre-dates this commit, and it is
  used to explain *under-mapping*, not to characterise residents. Acceptable.
- **Consistency between the cities.** The two alerts now carry the same two-case explanation of the
  hatching and the same 0 explanation. Two inconsistencies remain in the Honest-caveats bullets.
  - Berlin says a "**blank/low** cell" means "too thinly observed". But a *low* value is neither
    suppressed nor unreliable by that rule, and the map hatches rather than blanks.
  - Both bullets give only the thin-mapping reason for the hatching, while the alerts give two.

## Required change

- **R1: Honest-caveats bullets, both cities.**
  - Berlin (`web/pages/berlin/poi-map.md`). Replace:

    > "**A blank/low cell means "too thinly observed to compute a stable ratio," never "commercially
    > dead."** The same holds for a 0 on the density view, which only means no place of that domain
    > is mapped there."

    with:

    > "**A hatched cell means "no place of this kind is mapped here" or "too thinly observed to
    > compute a stable ratio," never "commercially dead."** The same holds for a 0 on the density
    > view, which only means no place of that domain is mapped there."
  - Hamburg (`web/pages/hamburg/poi-map.md`). Replace:

    > "a blank cell means "too thinly observed," never "commercially dead.""

    with:

    > "a hatched cell means "no place of this kind is mapped here" or "too thinly observed," never
    > "commercially dead.""

## Optional

- **O1** For parity with Berlin, add the bold closing line to the Hamburg alert, after "…the raw
  mapped-place count is always visible in the tooltip.": "<b>A 0 or a hatched area means only
  "nothing of this kind is mapped here" or "too thinly observed to compute a stable ratio" -- never
  "commercially dead."</b>"

Verdict: CONCERNS

---

## Re-check (2026-11-06, `feat/357-zero-poi-density` @ 4dbee78ff)

R1 is in both Honest-caveats bullets verbatim; only the line wrapping differs:
- Berlin: `web/pages/berlin/poi-map.md` lines 511–514;
- Hamburg: `web/pages/hamburg/poi-map.md` lines 359–364.

Verdict: PASS

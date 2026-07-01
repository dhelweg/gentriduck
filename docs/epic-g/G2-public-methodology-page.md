# Gentriduck — Public Methodology Page (G2, #38)

**Status:** Content draft, awaiting geo-DS + domain-expert sign-off (R-C1 gate)
**Audience:** the public site visitor — non-specialist, but wants to trust the numbers
**Depends on / synthesizes:** `docs/methodology/index-definition.md` (A9, governed index),
`docs/epic-c/C5-geo-signoff.md` (OSM completeness-bias correction), `docs/methodology/spatial-methods.md`
(A9 spatial methods), `docs/methodology/backtest.md` (B2 ground-truth back-test),
`docs/epic-e/E3-findings.md` (Epic B/C directional findings), `docs/epic-g/O4-milestone-B-narrative.md`
(public tone precedent)
**Grounding (R-C2):** every claim below cites the governed methodology doc or literature it restates;
no new methodology is introduced on this page — it is a public restatement of already-signed-off
decisions (index-definition.md `Verdict: PASS`, R-A7/R-A8/R-A9 signoffs, C5 signoff, backtest.md).

This is the **content** deliverable for G2. It will be rendered as the site's "Methodology" page once
the serving stack (F1, #33) is chosen; until then it lives here as the governed source-of-truth text.

---

## 1. What Gentriduck measures

Gentriduck tracks **gentrification signals** for small statistical areas (currently Berlin's
Planungsräume, PLR — roughly 2,000–5,000 residents each) using only free, openly licensed data:
OpenStreetMap commercial points of interest, Berlin's official social-monitoring index (MSS), and
Berlin's population register (EWR). It revives a 2018 university thesis that asked whether the mix of
businesses in a neighbourhood tracks its social trajectory, and extends the question with 15+ years of
data, modern statistical methods, and (from Epic H) a second city.

**What the index is not:** a predictor of any individual's or household's situation, a claim that
displacement *occurred* in a given area, or a policy recommendation. Every number on this site is a
**small-area aggregate** — a property of a PLR, not of any resident or building
(`index-definition.md` §1.2, guard G-2). Inferring an individual's circumstances from an area-level
statistic is a textbook ecological fallacy, and we do not make that inference.

## 2. The four dimensions (and the one we don't have yet)

The index separates **what changed (predictors)** from **what we are trying to explain (the social
outcome)** — the opposite of the 2018 thesis's single blended score, and the single most important
methodological upgrade in this revival (`index-definition.md` §0.2, ADR-0008 Decision 3.3):

| Dimension | What it measures | Role | Source |
|---|---|---|---|
| **D1 — Social status** | Berlin's official Status-Index class (highest to lowest) | Outcome (state) | MSS |
| **D2 — Social change** | Berlin's official Dynamik-Index class (improving/stable/worsening) | Outcome (direction) | MSS |
| **D3 — Commercial / amenity mix** | Commercial POI density and its year-over-year change | Predictor | OpenStreetMap |
| **D4 — Socio-demographic baseline** | Composite of welfare-register shares (tenure, age, migration background) at a fixed baseline year | Baseline covariate | EWR |
| **D5 — Displacement / affordability** | *Not yet built.* Milieuschutz zoning, rent burden, tenant turnover | Predictor (planned, Epic D) | — |

We report D1/D2 as the outcome that D3 and D4 are tested *against* — never averaged into one number.
D5 (an explicit displacement/affordability signal) is the biggest current gap: without it, the model
can observe socio-economic upgrading but **cannot distinguish** genuine incumbent-led improvement from
gentrification-driven displacement (`index-definition.md` §1.3, tension cell `improving-vulnerable`).

## 3. Why "lead-lag", not a snapshot

The core theoretical claim this project tests — drawn from Dangschat's (1988) double
invasion-succession model and confirmed for Berlin by Döring & Ulbricht (2016) — is that social change
and commercial change are a **process with an order**: incoming higher-status residents (the *social*
cycle) tend to precede the shops, cafés, and restaurants that serve them (the *commercial* cycle), not
the other way around. The 2018 thesis found the same pattern for Berlin (p. 91): social status change
led commercial change, not vice versa.

To test an ordering claim you need **change compared across time**, not a single snapshot. Gentriduck
fits both directions — "does commercial change predict later social change?" and "does social change
predict later commercial change?" — at multiple time offsets, and reports which direction actually wins
as a *result*, never as an assumption (`index-definition.md` §2.1–§2.3). All comparisons stay within a
single administrative-boundary vintage (Berlin's PLR boundaries changed in 2021) so that a neighbourhood
is compared to its own earlier self, not to a differently-drawn area (`index-definition.md` §2.5, §6).

## 4. The OpenStreetMap completeness problem, and how we correct for it

OpenStreetMap is crowd-mapped: its historical coverage of any city has *grown* over time as more
volunteers mapped more places, independent of whether the real world changed. A neighbourhood can show
a rising point-of-interest count simply because it got mapped more thoroughly this year — not because a
single new business opened. Left uncorrected, this would make every part of the city look like it was
"gentrifying," because everywhere's OSM coverage has grown since 2008.

Gentriduck corrects for this (the C5 fix, `docs/epic-c/C5-geo-signoff.md`) by working with each area's
**share** of the city's total point-of-interest count in a given year, rather than its raw count. If
citywide mapping coverage improves roughly evenly, every area's share stays put and the correction
cancels the noise; only a neighbourhood that gains points of interest *faster than the rest of the city*
registers a real commercial-change signal. This is not a perfect fix — mapping coverage does not grow
perfectly evenly, and inner-city, already-popular areas were typically mapped earlier than peripheral
ones (a documented limitation, C5 signoff §2) — but it removes the dominant source of bias and requires
no new data source.

## 5. Spatial methods

Points of interest are assigned to areas using distance-weighted aggregation with a bounded Gaussian
kernel, computed from exact coordinates in Berlin's native metric coordinate system (EPSG:25833), so
that a business a few metres across a boundary line is not scored as belonging entirely to one side and
not the other (the classic small-area boundary/MAUP problem). Weights are normalised so total citywide
counts are conserved — a border-adjacent point of interest can only ever contribute a total weight of
1 across the areas it reaches, never be double-counted (`docs/methodology/spatial-methods.md` §1–§2).
The 2018 thesis's own (unnormalised) distance-spread variant is retained as a documented reproduction
comparison, not as the current default.

## 6. Ordinal data, honestly

Berlin's official Status and Dynamik classes are **ordered categories** (highest to lowest, improving
to worsening), not evenly spaced numbers — the gap between "high" and "medium" status is not
guaranteed to equal the gap between "low" and "lowest." Gentriduck never averages these class codes as
if they were a metric scale; it uses rank-based statistics (ordered-logit models, Spearman rank
correlation, and named ordinal transitions such as "improved / stable / worsened") throughout
(`index-definition.md` §3). This is a deliberate, and correctable, divergence from the 2018 thesis,
which averaged class codes directly.

## 7. How we validate the index

Two independent checks anchor the index to reality, documented in full in
`docs/methodology/backtest.md`:

1. **Agreement with Berlin's own official social-monitoring classes** — a cross-validation between
   two independent paths through the pipeline that both encode the same official MSS class.
2. **A curated set of ~20 Berlin areas with literature-documented gentrification status** (drawn from
   Döring & Ulbricht 2016, Holm & Schulz 2016, and the 2018 thesis), checked against where the index
   places them in the citywide distribution.

Both checks currently pass. We also ran a **directional revival** of the 2018 thesis's five original
hypotheses against three different eras and data combinations; results are summarised honestly in
§9 below, including where the original findings did **not** replicate.

## 8. Robustness checks

Because a few methodological choices are inherently discretionary (dimension weights, the boundary
between "low-status improving" and "pioneer-signal" areas, the size of the time lag tested), the
governed index definition requires — and we run — a documented sensitivity-analysis suite before
publication (`index-definition.md` §8): perturbing weights ±20% and reporting how many areas would
change category; re-running the lead-lag test at multiple time offsets and reporting whether the
direction of the result is stable; and comparing results computed within a single boundary vintage
against results bridged across the 2021 boundary change. An index whose category assignments flip
under small, defensible changes to these choices is flagged as unstable, not published as if certain.

## 9. What we found (Epic B/C directional revival)

*(Full write-up: `docs/epic-e/E3-findings.md`, `docs/epic-g/O4-milestone-B-narrative.md`.)*

- **Same-era data the thesis used (EWR welfare register, 2014–2020): strong agreement.** All five
  thesis hypotheses point in the predicted direction; the thesis's strongest finding (social status
  change precedes commercial change) replicates cleanly.
- **Berlin's official social index (MSS), same era: direction right, too weak to confirm.** Only 2 of
  8 directional tests reach statistical significance.
- **MSS, modern era (2021–2025): the lead-lag finding weakens sharply.** One hypothesis (fast-food
  presence signalling lower status) still holds; the thesis's core lead-lag finding effectively
  disappears in this shorter, more recent window. We cannot tell, from this data alone, whether that
  reflects a genuinely changed Berlin, a short observation window, or a real difference between the
  two social indices used.
- **Coarser spatial scales:** the fast-food signal is robust across all three scales tested
  (Planungsraum, Bezirksregion, Bezirk); the lead-lag signal does not get stronger with aggregation,
  which argues against "it's just spatial noise" as the explanation for its weakening.

**Bottom line:** the relationship between commercial activity and neighbourhood social change is real
but *fragile* — sensitive to which official social-status measure is used, the length of the time
window available, and possibly the historical period. We report this plainly rather than picking the
result that best confirms the original thesis.

## 10. Known limitations (stated, not hidden)

1. **No displacement measurement (yet).** The index can observe socio-economic upgrading; it cannot
   observe that a specific household was involuntarily displaced. We use risk/signal language
   ("displacement-pressure signal") deliberately, never "post-displacement," until the D5 dimension
   (Milieuschutz zoning, rent burden, tenant turnover — Epic D) is built (`index-definition.md` §1.2).
2. **The rent-gap driver is not yet represented.** Smith's (1979) capital/rent-gap theory of *why*
   gentrification happens economically is outside D1–D4; we measure the *social outcome* and its
   *commercial/demographic correlates*, not the underlying land/capital mechanism.
3. **OpenStreetMap completeness bias is corrected, not eliminated** (§4). The correction assumes
   roughly uniform citywide mapping growth, which is only an approximation.
4. **No multiple-comparison correction** has been applied across the battery of directional tests;
   results should be read as directional indicators, not confirmatory hypothesis tests.
5. **Administrative-boundary changes.** Berlin's PLR boundaries changed in 2021 (447 → 542 areas); any
   comparison across that boundary requires an explicit area crosswalk and carries extra uncertainty.
6. **Aggregate, not individual, statistics.** Every figure on this site describes a small-area
   aggregate of thousands of residents. It says nothing about any specific person, household, or
   building (§1).
7. **Administrative data availability.** Berlin's welfare-register (EWR) data used for validation is
   not itself publicly downloadable; OpenStreetMap data is open under the Open Database Licence and
   requires attribution; Berlin's MSS data is published under Berlin's open-data licence. Full
   attribution is on the [Attribution & Licensing page](../adr/) *(G3, #39, pending)*.

## 11. Sources

- `docs/methodology/index-definition.md` — the governed index definition (R-A1, #64; `Verdict: PASS`)
- `docs/epic-c/C5-geo-signoff.md` — OSM completeness-bias correction (`Verdict: PASS`)
- `docs/methodology/spatial-methods.md` — spatial aggregation methodology (`Verdict: PASS`)
- `docs/methodology/backtest.md` — B2 ground-truth back-test harness
- `docs/epic-e/E3-findings.md`, `docs/epic-g/O4-milestone-B-narrative.md` — Epic B/C directional
  findings write-ups
- Dangschat (1988) — double invasion-succession cycle
- Döring & Ulbricht (2016) — *Gentrification-Hotspots und Verdrängungsprozesse in Berlin*
- Holm (2010); Holm & Schulz (2016) — MSS frame and Berlin ground-truth labels
- Helweg (2018) — the original thesis this project revives
- OECD/JRC (2008), *Handbook on Constructing Composite Indicators*
- Smith (1979) — rent-gap theory (cited as an explicit current gap, §10.2)

---

## Sign-off (R-C1 gate)

This page restates already-approved methodology (index-definition.md, C5, spatial-methods.md,
backtest.md, E3-findings.md all carry their own prior `Verdict: PASS`) for a public, non-specialist
audience. It introduces **no new methodological decision** — no new weight, normalization, spatial
method, or indicator. Per CLAUDE.md's methodology gate, any file under `docs/methodology/**` is
methodology-bearing by definition regardless of content type, so a fresh dual sign-off is still
recorded here (lighter-weight than a de-novo methodology review, consistent with the disposition
precedent at `docs/epic-h/H1-condition1-closeout.md`): confirming the public restatement is faithful
to the governed sources and does not overstate certainty or hide limitations.

| Authority | Verdict | File |
|---|---|---|
| geo-data-scientist | PASS | `docs/epic-g/G2-geo-signoff.md` |
| gentrification-domain-expert | PASS | `docs/epic-g/G2-domain-signoff.md` |

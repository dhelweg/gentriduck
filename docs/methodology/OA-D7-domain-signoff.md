# OA-D7 (#240, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with `OA-D7-geo-signoff.md`).
- **Artifact under review:** the OA-D7 PASS-1 (web-only) page cluster on branch
  `feature/240-oa-d7-methodology-page`:
  - `web/pages/methodology-oa-modes.md` (new — dedicated OA modes/scales/dominance methodology page)
  - `web/pages/reference/index.md` (new — reference folder hub)
  - `web/pages/reference/poi-taxonomy.md` (new — POI taxonomy drill-down)
  - `web/pages/reference/area-hierarchy.md` (new — area-hierarchy drill-down, Berlin + Hamburg)
  - `web/pages/methodology.md`, `web/pages/berlin/poi-map.md` (cross-link additions only)
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.
- **Scope reviewed against:** this ticket re-enters the R-C1 gate as a **conformance review** of
  public-facing copy against binding forward conditions I (and the OA-D3b review) already set —
  per each prior sign-off's own "carried onto D7" language (OA-D0 Conditions B/C/D + Guardrail E;
  OA-D2 point 2; OA-D3b's labelling condition; OA-D4's forward note on the D7 page). It is **not** a
  fresh open methodology question: the page introduces no new indicator, weight, normalization,
  method, or data source of its own, and no live query/chart is wired (deferred to pass 2).
- **Grounding (R-C2):** `docs/methodology/OA-D0-domain-signoff.md` (Conditions A/B/C/D, Guardrail E);
  `docs/methodology/OA-D2-domain-signoff.md`; `docs/methodology/OA-D3b-zscore-domain-signoff.md`;
  `docs/methodology/OA-D4-domain-signoff.md`; `docs/methodology/OA-D5-mode-comparison-findings.md`;
  `docs/methodology/index-definition.md` §1.2 (ecological-inference), `docs/methodology/spatial-methods.md`
  §7 (MAUP r>0.7 publish gate); Dangschat 1988 (invasion-succession); Smith 1979/1987 (rent-gap /
  disinvestment); Zukin 2009 (*Naked City*, artisanal/third-wave); Ley 1996 (new cultural middle
  class); Lees/Slater/Wyly 2008 (retail + fitness/wellness succession); Döring/Ulbricht (displacement
  typologies); Haklay 2010 (VGI coverage non-neutrality); ADR-0017 D1, ADR-0024, ADR-0025 (Gi*,
  proposed).

---

## Summary judgement

This is a faithful, unusually careful plain-language restatement of the already-gated OA-D0…D6
build. Every binding domain condition carried onto D7 is **actually discharged in the published
copy**, not merely gestured at — and in several cases the copy reproduces the *reasoning* behind a
condition, not just its conclusion (e.g. the sign-blindness alert names the two opposite processes,
Zukin 2009 boutique-ification vs. Smith 1979 disinvestment, that produce an identical reading). The
tone is consistently descriptive-not-causal, anti-targeting, and anti-stigma. No new theoretical
claim is introduced, and the page repeatedly and prominently reasserts that **only the canonical
nested-LQ is the 2018 construct** — the single most important framing guardrail in the whole cluster.
I confirm the direction and record **PASS**. The one item I flag (a colloquial reuse of the word
"category") is a non-blocking clarity recommendation, not a discharge failure or a sign error.

## Discharge of the binding forward conditions (the operative check for this ticket)

Each condition below was set as a binding acceptance criterion on D7 by an earlier sign-off. I verify
each is present in the public copy, with the correct reasoning and citation:

- **Dominance sign-blindness pairing — OA-D0 Condition B.2 — DISCHARGED.**
  `methodology-oa-modes.md` §5 states dominance "is sign-blind, and that is its central hazard,"
  names boutique-ification (up-market, Zukin 2009) and disinvestment (down-market rent-gap trough,
  Smith 1979) — and studentification — as producing an **identical** HHI/top-share reading, commits
  that the project "never shows a bare dominance figure," pairs every figure with the leading type's
  name + causal-relevance tier, and requires reading alongside the status/dynamism trajectory. This
  matches B.2 in both substance and mechanism.

- **Anti-stigma / anti-xenophobia cuisine-typed-dominance bar — OA-D0 Condition B.3 — DISCHARGED
  (the sharpest, non-negotiable clause).** §5 carries a dedicated warning alert: cuisine-typed
  dominance is "barred from any public, displacement-adjacent surface — including this page," named
  as "a concrete vector for ethnic stigmatization," computed "only for internal methodological study,
  never for publication," with the public cut stopping at category grain (Café / Restaurant / Fast
  Food), and the explicit clause that these indices describe "form composition on a cultural/price
  ladder … never the cultural or national origin of proprietors, cuisine, or clientele." It correctly
  credits OA-D4 for making this **technically enforced** (`is_public_safe`), not merely documented.
  This is the exact resolution B.3 required.

- **B.1 (not antitrust/market-power) and B.4 (descriptive-not-causal + low-base + anti-erasure) —
  DISCHARGED** (not explicitly requested in the task but part of the four-clause ethics statement):
  §5's second and third alerts state HHI carries "no implication about market power, business
  viability, or economic 'health'," and that a suppressed thin cell means "too thinly observed to
  characterize," never "commercially dead" — the Haklay 2010 anti-erasure framing intact.

- **Hipster/Coworking and Vacancy documented-absence — OA-D0 Conditions A.6 / A.7 — DISCHARGED.**
  §5's allow-list table states Coworking/"Hipster" is "Out of dominance, deliberately" because a
  within-group mix over a single-member category is mathematically degenerate, and that its signal is
  still tracked via its own OA figure (A.6); and Vacancy/Leerstand is "Out" as a single category whose
  signal is the domain-level OA and its change over time (A.7, the Smith 1979 disinvestment marker).
  Both absences are framed as documented choices, not oversights — exactly what A.6/A.7 asked D7 to do.
  (The load-bearing A.4/A.5 wellness-curation correction and the A.9 touristification-is-distinct
  exclusion are also correctly restated in the same table.)

- **z-score "significance ≠ gentrification importance" labelling — OA-D3b binding condition —
  DISCHARGED, all three sub-parts.** §2's z-score alert (a) never uses a bare "significant" — it says
  a high |z| means "unlikely to be sampling noise given the local sample size," explicitly **not**
  "this area is significantly gentrifying"; (b) requires the score always be read **alongside its
  nested-LQ value, never alone**; and (c) discloses that it "is not a hypothesis test with any
  multiple-comparison correction applied." It also correctly reproduces the anti-erasure corollary
  (a thinly-mapped, often lower-income Kiez produces a smaller |z| at an equally extreme true ratio).
  This satisfies all three limbs of the OA-D3b condition.

- **BZR-headline / Bezirk-context-only ecological-fallacy framing — OA-D0 Condition D / OA-D2 point 2
  — DISCHARGED, in both places it must appear.** `methodology-oa-modes.md` §4 and
  `reference/area-hierarchy.md` both state BZR is the recommended public headline scale, PLR is the
  Kiez succession front but the most data-thin/highest-misuse scale, and Bezirk-level figures are
  "context only, never a Kiez-level claim," explicitly tying it to the same ecological-fallacy
  discipline the site applies to the MSS Status/Dynamik classes (index-definition.md §1.2). The
  cross-scale rank-flip (Condition D.2) is surfaced as a substantive finding, not a footnote.

- **Density / per-capita never share an axis with the LQ family + per-capita denominator endogeneity
  — OA-D0 Condition C — DISCHARGED.** §2's density/per-capita alert states they "are not location
  quotients and must never share an axis, legend, or colour scale with the ratio-family methods,"
  warns that a dense central district is not thereby "gentrified" (the centrality confound), and
  carries the denominator-endogeneity caveat verbatim in spirit: a rising per-capita figure "can mean
  new businesses arrived, or that residents left … A falling per-capita figure is not, by itself,
  evidence of disinvestment." Matches Conditions C.1/C.2.

- **Epic-B nested-LQ-only guardrail — OA-D0 Guardrail E — DISCHARGED, prominently.** §2, §3, §6, §7
  and §8 each reassert that only the canonical nested-LQ is 2018-golden-anchored and every other mode
  is a **new instrument** answering an adjacent question, never a redefinition of the thesis construct
  — including the explicit "nine methods does not mean nine confirmations" framing. Guardrail E asked
  for exactly this prominence given the "textbook-looking" modes (global-LQ, density) in the set.

## Other domain checks

- **Tool-gate respect (Getis-Ord held out).** §8 correctly states Gi* hotspot clustering is **not**
  on this page because it needs a statistical-tooling adoption the project has not accepted
  (ADR-0025, proposed). Publishing the single highest displacement-misuse surface (OA-D0 Condition
  C.3) before its ADR clears the gate would have been a real problem; holding it out is correct.

- **Empirical claims are faithful to the source.** I independently cross-checked every OA-D5 number
  restated in §4/§7 against `OA-D5-mode-comparison-findings.md`: pooled nested-LQ PLR-vs-BZR Spearman
  ρ ≈ 0.66 (0.662) and "below 0.7 in every year 2009–2026" (2008 = 0.727 is correctly *excluded* from
  that span); category-level nested-LQ vs. raw-share ρ ≈ 0.35 (0.346); log-LQ ρ = 1.000 (monotonic
  transform); five-of-seven contamination-gate |ρ| < 0.06 with raw-share/z-score as the two
  contradicted pre-registered predictions; and golden ρ = 0.148, p = 0.002, n = 435. All accurate,
  including the honest disclosure that the roll-up is proven only for nested-LQ so far.

- **Taxonomy page.** `poi-taxonomy.md` faithfully restates the ADR-0017 D1 "type nests under domain,
  not category" quirk (correctly flagged as a deliberate, documented choice), the Handwerk→Hardware /
  Werkstatt→Workshop translation caveat, the deliberate `craft=*` non-adoption, and the
  Berlin-first / not-auto-portable cultural-ladder caveat. No quality-judgement or stigmatizing
  framing; the "classification scheme, not a quality judgement" disclaimer is present.

- **No over-claiming / determinism.** §6 ("What this does NOT do") and §8 ("Honest caveats") are
  explicit that nothing here predicts which neighbourhood gentrifies next, nothing speaks to any
  individual business/household/building (ecological-fallacy discipline), and "more methods" is not
  "more proof." Hamburg is framed respectfully as structurally different, not "behind."

## Non-blocking recommendation (does not gate integration)

- **"Category" is used in two senses on the same page cluster.** `methodology-oa-modes.md` §1/§2
  describe the nested-LQ as representation "within its own parent **category**," while
  `poi-taxonomy.md` correctly and prominently states the nested-LQ actually nests **type within
  domain, skipping the intermediate Category level** (ADR-0017 D1). Read in isolation, §1/§2's
  colloquial "category" (= "its own kind/parent group") could be misread against the formal Category
  taxonomy level defined a few sections later. This is a clarity nit, not a sign error or a
  cause/outcome conflation, and the authoritative precise statement already lives on the linked
  taxonomy reference page. **Recommendation (for a copy pass or pass 2):** in §1/§2 use "parent group"
  or "parent domain" rather than "category" when describing the nesting, to remove the collision with
  the formal Category level. Recorded for the author's discretion; it does **not** hold up `develop`
  integration.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0/D2/D3b/D4/D5 sign-off and findings docs, the
governed methodology docs, and the ADRs — no web-fetched or non-maintainer issue text was treated as
instructions.

---

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — the OA-D7 PASS-1 web-only page cluster faithfully restates the already-gated
methodology and **discharges every binding forward condition** carried onto D7 (dominance
sign-blindness B.2; anti-stigma cuisine bar B.3; B.1/B.4 ethics; Hipster/Vacancy documented-absence
A.6/A.7; z-score significance labelling per OA-D3b; BZR-headline / Bezirk-context-only
ecological-fallacy framing per Condition D / OA-D2; density/per-capita axis-separation and
per-capita endogeneity per Condition C; nested-LQ-only Guardrail E). It introduces no new indicator,
weight, normalization, method, or data source; Getis-Ord is correctly held out pending ADR-0025; and
the restated OA-D5 statistics are accurate. One non-blocking clarity recommendation (the dual use of
"category") is recorded for the author's discretion. Ready for `develop` integration.

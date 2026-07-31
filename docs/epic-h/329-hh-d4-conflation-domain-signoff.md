---
task: H / #329 — Drop `unemployment_share` from Hamburg's D4 `ewr_composite` (predictor/outcome conflation)
author: gentrification-domain-expert
date: 2026-07-31
branch: fix/329-hamburg-d4-composite-conflation
---

# Domain sign-off — #329 Hamburg D4 composite de-conflation

- **Branch:** `fix/329-hamburg-d4-composite-conflation`, HEAD `2c8f8cd9`; diff baseline is develop's
  pre-#329 tip `a284ce80`.
- **Reviewer:** `gentrification-domain-expert` (urban-sociology / housing-policy theory gate, R-C1).
- **Paired gate:** `geo-data-scientist`, `docs/epic-h/329-hh-d4-conflation-geo-signoff.md`
  (**PASS WITH CONDITIONS**). I completed my own reading of the model, both ADRs and the addenda
  **before** opening that document. Where we converge I say so; §4 and §6 below go beyond it, and §3
  reaches the same conclusion by a different and, I think, stronger route.
- **Scope:** is the *narrowed* Hamburg D4 predictor composite theoretically faithful; is the removed
  indicator's continued display defensible; are the addenda honest. Not re-litigating #40/H1's
  two-grain reconciliation, #313's mart wiring, or ADR-0014's ingestion decisions.
- **SEC-3:** every empirical claim below is derived from this repo's files at the stated commit. No
  `WebFetch`/`WebSearch` content informed this review. Background knowledge of German urban-policy
  statistics (what *Migrationshintergrund* covers vs. *Ausländeranteil*; what an
  *Aufmerksamkeitsindikator* is) is flagged as inference where load-bearing.

---

## 1. Is the diagnosed conflation real? — Yes, verified at source

`docs/adr/0014-hamburg-data-sources.md` §2 ("Social outcome (MSS-equivalent)"), lines 81–84, states
verbatim that Hamburg's Statusindex × Dynamikindex → Gesamtindex is *"computed from **seven**
attention indicators (migration-background youth, single-parent children, SGB-II share,
**unemployment**, Mindestsicherung for children and for elderly, Schulabschluss)."* I read this in
the ADR, not in the commit message. Unemployment is a **constituent input** of Hamburg's D1
outcome, not merely a correlate of it.

The consequence is not hypothetical. `int_hamburg_lead_lag.sql:234` carries `ewr_composite` forward
as `ewr_composite_t`, and `analysis/e5_hamburg_lead_lag.py` (`test_h3_with_d4_control`, lines
459–533) puts it on the right-hand side of regressions whose dependent variable is
`delta_status_ordinal` — i.e. change in the very index unemployment helps construct. Controlling for
a component of the outcome does not merely add noise; it absorbs outcome variance and biases the D3
coefficient of interest. **The diagnosis is correct and the fix was necessary.**

## 2. The fix is right for a stronger reason than it states — ADR-0008 names unemployment explicitly

The model header argues the case via ADR-0008's D1/D4 role table and the ADR-0014 §2 overlap. Both
hold. But ADR-0008's **D4 bullet itself** (lines 96–103) settles it more directly, and the header
does not cite it:

> **D4 is *demographic composition*, not a socio-economic-status (income / unemployment /
> transfer-recipient) measure**; R-A4 (#67, SES indicators) may later add a true SES feature or fold
> it into D4.

ADR-0008 therefore **names unemployment as something D4 explicitly is not**. Placing
`unemployment_share` inside `ewr_composite` was a *dimension-membership* violation of the literal
text of the conceptual model, independently of the circularity argument — the circularity is what
made it *harmful*, but it was already out of place. This is the cleanest available grounding and,
per R-C2, it belongs in the header. See **D-C1(b)**.

## 3. Does removing unemployment gut the D4 construct? — **No. The construct was over-broad before, not under-broad now.**

This was the question I most expected to answer against the fix, since unemployment is a canonical
displacement-vulnerability marker (Döring & Ulbricht 2016's vulnerability framing explicitly
includes labour-market status; the rent-gap literature after Smith 1979 treats labour-market
disadvantage as the mechanism through which a devalorized population is priced out; Thesis §4.2). My
own H1 §2 endorsed it on exactly those grounds. I now judge that reasoning to have been
**dimension-blind**: it argued that unemployment is a good *vulnerability* indicator, which is true,
without asking whether it is a D4-shaped one, which per §2 above it is not.

Reading the two survivors against Berlin's own composite settles the "is it still a composite"
question empirically. `int_ewr_socioeco.sql`'s header enumerates Berlin's five inputs —
`foreigners_share`, `age_under18_share`, `mean_age_years`, `migration_background_share`,
`residence_duration_5y_share`. All five are population-composition shares; none is a labour-market
or benefit-receipt measure. Hamburg's post-#329 composite is a **strict 2-of-5 subset of Berlin's
validated set**, and both survivors were formally sign-audited vulnerability-positive in
`docs/methodology/indicator-semantics.md` §3 (line 100 `age_under18_share` **+**, "Correct… high
child share → families, social-housing, lower-income households → higher displacement vulnerability";
line 102 `foreigners_share` **+**, "Correct"). So the narrowed composite is **polarity-clean and
construct-homogeneous**, which the pre-#329 three-indicator version was not: it mixed a
status/benefit-receipt rate into a set of composition shares and then averaged them as if they were
commensurable.

That reframes the thinness worry. Two indicators is genuinely thin — there is no redundancy, so any
definitional drift in one source column moves 50 % of the composite, and the two survivors are
strongly mutually correlated at small-area grain in German cities (areas with high foreign-national
share also have high under-18 share; both track family-household, lower-income neighbourhoods), so
the "composite" is close to a single latent dimension, *migrant-and-family household composition*.
But that latent dimension is a legitimate and theoretically central one: it is precisely the
pre-succession resident population in Dangschat's invasion–succession model, and it is what Berlin's
D4 measures too. **2-of-5 from a homogeneous family beats 3 with one alien, circular member.**
Precision is recoverable (ADR-0014's Statistikamt-Nord "Stadtteil-Profile" XLSX fallback would widen
the set toward Berlin's five); circularity is not. **No objection to the narrowing.** I converge
with geo-DS §3(a) here, by a different argument.

## 4. Residual circularity in the two survivors — **a real finding, and #329 makes its *weight* worse even as it makes the total better**

Checking the survivors against the same seven attention indicators (ADR-0014 §2, line 83):

- **"migration-background youth"** is the Statusindex's own origin-composition indicator, and it is
  concept-adjacent to `foreigners_share`. They are not the same measure — under German official
  definitions *Migrationshintergrund* is strictly broader than foreign nationality (it counts
  naturalized citizens and German-born second-generation residents; flagged as inference from
  background knowledge, not from a document in this repo), and the Hamburg indicator is additionally
  conditioned on under-18s. But at area level they are strongly ecologically correlated.
- **"single-parent children"** and **"Mindestsicherung for children"** are under-18-conditioned
  populations, so their area-level values covary with `age_under18_share`.

I agree with the geo-DS that this overlap is **categorically weaker** than the unemployment case —
the Statusindex indicators are *rates within* subpopulations (deprivation intensity), whereas D4's
survivors are plain *composition* shares of the whole population (who lives here); an area can have
many under-18s and few of them in Mindestsicherung. It is induced ecological correlation, not the
definitional identity unemployment had, and it does **not** justify further exclusions — dropping
`foreigners_share` would leave a one-indicator "composite", which is not a composite.

Two things I add that the geo-DS's C1 does not say, and which change what the disclosure has to
cover:

1. **The Berlin parallel is not symmetric, and the header presents it as if it were.** ADR-0006
   (lines 20–22) records Berlin's MSS **index** indicators as unemployment, transfer-benefit
   receipt, child poverty, and — from 2023 — children/youth in single-parent households. Berlin's
   D1 contains **no origin/nationality indicator at all** (migration background sits among Berlin's
   ~17–20 *context* indicators, outside the index). Hamburg's D1 **does**. So Berlin's D4 is fully
   disjoint from Berlin's D1 by construction, whereas Hamburg's post-#329 D4 is only *substantially*
   disjoint. The header's claim that the two survivors are *"genuinely independent D4 predictors"*
   (lines 94–95) is accurate for `age_under18_share` and **overstated for `foreigners_share`**.
2. **#329 raises `foreigners_share`'s weight from 1/3 to 1/2.** The change removes the definitional
   overlap and roughly halves the total contamination — clearly net-positive — but it concentrates
   the *residual* partial overlap in a single, now double-weighted term. That is fine on the merits
   and is not an argument against the fix; it is an argument that this is exactly the wrong moment
   for the header to have become *more* confident about independence than it was before.

This is **D-C1**, and it converges with geo-DS C1 on the remedy.

## 5. Is `unemployment_share`'s continued display defensible? — Yes, but #329 creates a *new* framing risk

**The non-circularity holds.** I re-verified by grep rather than assuming:
`mart_area_demographics` sources Hamburg via `int_ewr_demographics_wide_hamburg →
stg_hamburg_ewr_stadtteil` and never reads `ewr_composite` or `int_ewr_socioeco_hamburg[_disagg]`.
My #313 sign-off's reasoning stands unchanged: registered unemployment is a **status/outcome**
measure, so a descriptive demographics mart places it on the correct side of the ADR-0008
lead-predictor / lag-outcome divide. Showing it standalone is the *right* place for it.

I also checked whether the composite reaches any published surface, because the H3 addendum and the
geo-DS §4 both rest on it not doing so. It does not, and I confirmed each link myself:
`fct_gentrification_change.sql:70` filters on a literal `city_code = 'BER'`, so Hamburg's
`legacy_gentrification_score` (the only mart-bound consumer of `ewr_composite`, via
`int_gentrification_ts.sql:398`) never leaves the intermediate layer; neither
`gentrification_index` nor `fct_gentrification_trajectory` reads the composite or the legacy score
at all. **No published Hamburg number changes.** The sole live consumer is the lead-lag chain
(§6, D-C2).

**The new risk is a visibility asymmetry, and it is a communication problem, not a pipeline one.**
After #329, the Hamburg indicator a lay reader most readily interprets as *"this area is
struggling"* — unemployment — is the one shown on the public demographics surface, while the
indicators that actually drive Hamburg's D4 predictor (foreign-national share, under-18 share) are
the ones a reader never sees in that role. A visitor who views a Hamburg unemployment map and a
Hamburg typology/index map on the same site will reasonably assume the former feeds the latter. It
explicitly does not. Unstated, that is a quiet misrepresentation of the method in the direction that
flatters it (it makes the index look more economically grounded than it is). **D-C4.**

There is a second, inverse framing hazard specific to *this* ticket. The exclusion must never be
presented publicly as a substantive finding — "unemployment doesn't matter for gentrification in
Hamburg". It is a **role** decision taken to keep a hypothesis test honest, and the underlying
literature says the opposite of the misreading: labour-market disadvantage is central to the rent
gap (Smith 1979) and to Döring & Ulbricht's vulnerability construct. A methodology page that says
"we removed unemployment" without saying "because it is already inside the outcome we are trying to
predict, not because it is irrelevant" would convert a methodological safeguard into a false
substantive claim. **D-C3.**

## 6. Honesty of the addenda — accurate, with one understatement

**`H1-domain-signoff.md` addendum (my predecessor's §2, retracted).** I read this adversarially,
since it is a retraction of my own prior position. It is a **fair and appropriately narrow**
characterization. §2 made two claims: (a) unemployment is a literature-consistent vulnerability
indicator (Döring & Ulbricht), and (b) Hamburg's own Sozialmonitoring already treats unemployment as
a status marker — offered as *corroboration*. The addendum retracts (b)'s use, correctly, as "exactly
what #329 subsequently identified as the problem, not a point in favour", and leaves (a) standing,
which is right: (a) remains literature-correct and is not what was wrong. It also correctly scopes
the retraction to composite membership and preserves §2's migration-background discussion. Nothing
is overclaimed and nothing is quietly rewritten — the original text is left in place with the
addendum below it, which is the right form.

One **understatement**, worth a clause (**D-C5**): §2 framed `unemployment_share` as *substituting
for* Berlin's absent `migration_background_share` + `residence_duration_5y_share`. Post-#329 there
is no substitute at all — Hamburg's composite is now a bare 2-of-5 subset with nothing standing in
for the two missing Berlin indicators. The addendum says §2's migration-background discussion "is
unaffected and still stands"; in fact H1's own **Condition 2** (G2 must disclose the
migration-background/residence-duration omission) is now *more* binding, because the omission is
uncompensated. That strengthens rather than weakens the case for the fix, but it should be on record.

**`H1-geo-signoff.md` / `H3-geo-signoff.md` addenda.** Both accurate. Both label the older text as a
historical record and amend by addendum rather than by silent edit — the right practice. H3's
reasoning that its conclusion survives verbatim ("moot for this specific mart", now 2-vs-5 rather
than 3-vs-5) is sound, and I verified its premise independently above: the composite genuinely does
not reach `gentrification_index`. Neither addendum surfaces the residual overlap of §4 — covered by
D-C1.

**One documentation gap the sweep missed** (§4 of the commit message claims stale "3-indicator"
references were swept through downstream models and docs): `docs/epic-h/E5-hamburg-lead-lag-findings.md`
Section 2 reports `ewr_composite_t` coefficients and p-values (`-2.75e-04`, `-0.0023`, `-0.0081`,
`-0.0130`, `-0.0168`, `-0.0056`) computed under the **old 3-indicator** composite, and was not
touched by this branch. Those are the only recorded Hamburg D4→D1 results in the repo, and they are
precisely the numbers #329 says were contaminated. **D-C2** — I reached this independently and it
converges with geo-DS C2, but I attach a stronger condition to the *regeneration*, below.

---

## Conditions

**In-ticket (cheap, comment-block only, no SQL change):**

- **D-C1.** In `int_ewr_socioeco_hamburg.sql`'s #329 header block:
  (a) soften or qualify the claim at lines 94–95 that the two survivors are *"genuinely independent
  D4 predictors"* — accurate for `age_under18_share`, overstated for `foreigners_share` — and add a
  short paragraph disclosing the **residual partial overlap** with the Statusindex attention
  indicators *migration-background youth*, *single-parent children* and *Mindestsicherung for
  children* (ADR-0014 §2, line 83), stating that the overlap is **compositional rather than
  definitional**, that it does not justify further exclusions, that `foreigners_share` now carries
  1/2 rather than 1/3 of the composite weight, and that the Berlin parallel is **asymmetric**
  (ADR-0006 lines 20–22: Berlin's D1 index indicators contain no origin/nationality measure;
  Hamburg's do). Hamburg D4→D1 findings are *substantially*, not *fully*, independent.
  (b) cite ADR-0008's D4 bullet verbatim ("D4 is *demographic composition*, **not** a
  socio-economic-status (income / unemployment / transfer-recipient) measure") — this is the
  strongest grounding for the exclusion and per R-C2 belongs in the model comment.

**Blocking for citation/publication of any Hamburg D4 result (not for `develop` integration):**

- **D-C2.** Regenerate `docs/epic-h/E5-hamburg-lead-lag-findings.md` (`uv run poe analysis`) before
  any Hamburg D4-controlled result is cited anywhere. **Do not silently overwrite the table:** the
  regenerated document must state that the pre-#329 coefficients were computed with a composite
  containing a constituent of the dependent variable and were therefore partly self-predicting. A
  quiet number swap would erase the one piece of evidence that this project caught and corrected its
  own circularity, which is exactly the kind of self-correction the whitepaper (O2) should be able
  to point at. Re-verify the 95-cluster narrative (line 71) at the same time, since the D4 NULL mask
  drives it.

**Forward, bind at the G2 methodology page / any Hamburg public narrative:**

- **D-C3.** Frame the exclusion as a **role** decision, never a substantive one. Required sense:
  *"unemployment is excluded from the predictor side because Hamburg's own social index is built
  partly from it — not because labour-market disadvantage is irrelevant to displacement, which the
  literature (Smith 1979; Döring & Ulbricht 2016; Thesis §4.2) says it emphatically is not."*
  Without the second clause the safeguard reads as a finding, and a false one.
- **D-C4.** State the visibility asymmetry: the Hamburg unemployment figure shown on the
  demographics surface (#313) is **descriptive only and feeds no index**, while Hamburg's predictor
  composite rests on origin and age composition. Readers will otherwise assume the visible economic
  indicator drives the index.
- **D-C5.** Amend H1's Condition 2 to note the omission of `migration_background_share` /
  `residence_duration_5y_share` is now **uncompensated** — Hamburg's D4 is a bare 2-of-5 subset of
  Berlin's, not a substituted variant.
- **D-C6.** Prefer ADR-0008's own vocabulary — **demographic composition / demographic
  vulnerability** — over "socio-economic" when describing D4 publicly. Post-#329 Hamburg's D4
  contains no income, labour-market or transfer-receipt content whatsoever. (This is a project-wide
  imprecision inherited from the `int_ewr_socioeco*` model names and applies to Berlin too; #329
  merely makes it sharper for Hamburg. Wording only — do **not** rename models for this.)

None of these argues against the change. If the PM's gate treats "PASS WITH CONDITIONS" as blocking,
the single in-ticket item is **D-C1** — a comment-block edit to the file this ticket already
touches, with no SQL change and no rebuild required. D-C2 blocks citation, not integration; D-C3–D-C6
bind at G2.

---

## Verdict

The conflation is real, verified verbatim at ADR-0014 §2 rather than taken from the commit message,
and it was materially consequential: `ewr_composite_t` sits on the right-hand side of regressions
whose dependent variable is built partly from the excluded indicator. The fix is correct, correctly
scaled (divisor matches term count), and — as §2 shows — justified by a stronger citation than it
currently invokes: ADR-0008's D4 bullet names *unemployment* among the things D4 explicitly is not,
so this was a dimension-membership violation as well as a circularity.

The narrowed composite does **not** gut the construct. My prior session's endorsement of
`unemployment_share` was dimension-blind — right that unemployment is a canonical vulnerability
marker, wrong that D4 is where vulnerability of that kind belongs — and the addendum's retraction of
it is fair, narrow and honestly scoped. What remains is a strict 2-of-5 subset of Berlin's own
R-A5-sign-audited composite: thin, but polarity-clean, construct-homogeneous, and measuring exactly
the pre-succession household composition Dangschat's model is about. Thin-and-clean beats
thick-and-circular, and thinness is recoverable from ADR-0014's XLSX fallback while circularity is
not.

My one substantive new finding is that the survivors carry a **residual, weaker, compositional**
overlap with the Statusindex's origin- and child-conditioned attention indicators, that #329 raises
`foreigners_share`'s share of the composite from 1/3 to 1/2, and that the Berlin parallel the header
draws is **asymmetric** — Berlin's D1 has no origin indicator, Hamburg's does — so the header's
"genuinely independent D4 predictors" is overstated at precisely the moment it should have become
more careful. That is a disclosure defect, not a design one. Beyond it, the two framing risks are
mine to name and are not in either geo-DS document: the exclusion must not be published as a claim
that unemployment is irrelevant to displacement, and the public surface must not let a visible,
descriptive unemployment figure be mistaken for the driver of an index it does not enter.

No published Hamburg number is corrupted — I traced every consumer myself
(`fct_gentrification_change` is literal-`'BER'`-filtered; `gentrification_index` and
`fct_gentrification_trajectory` never read the composite) — so the only stale artefact is the E5
findings document, which must be regenerated with an explicit note about *why* its old coefficients
were wrong rather than quietly overwritten.

**Verdict: PASS WITH CONDITIONS**

```json
{
  "verdict": "concerns",
  "verdict_line": "PASS WITH CONDITIONS",
  "scope": "fix/329-hamburg-d4-composite-conflation at 2c8f8cd9, diffed against a284ce80. Covers the narrowing of int_ewr_socioeco_hamburg.ewr_composite, the continued display use of unemployment_share, and the H1/H3 addenda. Does not re-litigate H1's two-grain reconciliation, #313's mart wiring, or ADR-0014's ingestion decisions.",
  "domain_rationale": "The diagnosed predictor/outcome conflation is real and verified verbatim at ADR-0014 §2 lines 81-84: unemployment is one of the seven Aufmerksamkeitsindikatoren constituting Hamburg's Sozialmonitoring Statusindex, i.e. the D1 outcome. It was materially consequential, not cosmetic: int_hamburg_lead_lag:234 carries ewr_composite into analysis/e5_hamburg_lead_lag.py's test_h3_with_d4_control, whose dependent variable is delta_status_ordinal. The fix is additionally justified by a stronger citation than it invokes -- ADR-0008's D4 bullet (lines 96-103) states verbatim that 'D4 is demographic composition, not a socio-economic-status (income / unemployment / transfer-recipient) measure', so unemployment's presence was a dimension-membership violation independent of the circularity. Removing it does not gut the construct: the surviving pair is a strict 2-of-5 subset of Berlin's five-input composite (int_ewr_socioeco header), both survivors were sign-audited vulnerability-positive in indicator-semantics.md §3 (lines 100, 102), and the resulting latent dimension -- migrant-and-family household composition -- is precisely the pre-succession resident population in Dangschat's invasion-succession model. Thin but polarity-clean and construct-homogeneous beats thicker-but-circular; thinness is recoverable via ADR-0014's Statistikamt-Nord XLSX fallback, circularity is not. Display use of unemployment_share is non-circular (verified by grep: mart_area_demographics sources int_ewr_demographics_wide_hamburg -> stg_hamburg_ewr_stadtteil, never the composite) and places a status/outcome measure on the correct side of the ADR-0008 lead/lag divide, consistent with my #313 sign-off. No published number changes: fct_gentrification_change.sql:70 filters literal city_code='BER', and neither gentrification_index nor fct_gentrification_trajectory reads ewr_composite or legacy_gentrification_score. The H1 addendum's retraction of my predecessor's §2 endorsement is a fair, narrow characterization -- it retracts the use of 'Hamburg's own methodology treats unemployment as a status marker' as corroboration (which was the disqualifying fact) while correctly leaving standing the separate, still-true claim that unemployment is a literature-consistent vulnerability indicator.",
  "theory_risks": [
    "NEW: residual partial conflation in the two survivors. ADR-0014 §2's attention-indicator set includes 'migration-background youth' (origin composition, concept-adjacent to foreigners_share; Migrationshintergrund is strictly broader than foreign nationality -- inference) and two under-18-conditioned indicators ('single-parent children', 'Mindestsicherung for children') whose denominators covary with age_under18_share. Weaker than the unemployment case (compositional shares vs. deprivation rates within subpopulations) and not grounds for further exclusion, but the model header does not disclose it and instead asserts both survivors are 'genuinely independent D4 predictors' (lines 94-95).",
    "NEW: the Berlin parallel drawn in the header is asymmetric. ADR-0006 lines 20-22 record Berlin's MSS index indicators as unemployment, transfer-benefit receipt, child poverty (+2023 single-parent-household children) -- no origin/nationality measure; migration background sits among Berlin's context indicators, outside the index. Berlin's D4 is therefore fully disjoint from D1; Hamburg's post-#329 D4 is only substantially disjoint.",
    "NEW: #329 raises foreigners_share's weight in the composite from 1/3 to 1/2, concentrating the residual overlap in a single now-double-weighted term. Net contamination still falls sharply, but the header becomes more confident about independence at exactly the moment it should become more careful.",
    "NEW (framing): the exclusion must not be published as a substantive claim that unemployment is irrelevant to Hamburg gentrification. It is a role decision; the literature (Smith 1979 rent gap; Döring & Ulbricht 2016 vulnerability construct; Thesis §4.2) holds the opposite.",
    "NEW (framing): visibility asymmetry. Post-#329 the Hamburg indicator a lay reader most readily reads as 'this area is struggling' (unemployment) is the one publicly displayed via mart_area_demographics (#313), while the indicators that actually drive D4 (foreigners_share, age_under18_share) are invisible in that role. Readers will assume the visible economic indicator feeds the index; it explicitly does not.",
    "Thinness: k=2 leaves no redundancy -- definitional drift in one source column moves 50% of the composite -- and the two survivors are strongly mutually correlated at small-area grain, so the composite is close to a single latent dimension rather than a broad index.",
    "H1's original Condition 2 is now MORE binding, not merely 'unaffected': unemployment_share was framed in H1 §2 as substituting for Berlin's absent migration_background_share + residence_duration_5y_share, so post-#329 that omission is uncompensated.",
    "Terminology: ADR-0008 calls D4 'demographic composition, not socio-economic-status'. The model is named int_ewr_socioeco_hamburg and its header calls the composite a 'socio-economic score' / 'socio-economically vulnerable'. Post-#329 Hamburg's D4 contains zero income, labour-market or transfer-receipt content. Project-wide imprecision (Berlin too), sharpened here; wording issue only.",
    "docs/epic-h/E5-hamburg-lead-lag-findings.md Section 2 reports ewr_composite_t coefficients computed under the old 3-indicator composite and was not regenerated on this branch -- the only recorded Hamburg D4->D1 results in the repo are the contaminated ones."
  ],
  "recommendations": [
    "D-C1 (in-ticket, comment-block only): qualify the 'genuinely independent D4 predictors' claim at int_ewr_socioeco_hamburg.sql lines 94-95; add a paragraph disclosing the residual compositional overlap with ADR-0014 §2's migration-background-youth / single-parent-children / Mindestsicherung-for-children indicators, the 1/3->1/2 weight shift, and the asymmetry of the Berlin parallel (ADR-0006 lines 20-22); and cite ADR-0008's D4 bullet verbatim as the primary grounding (R-C2).",
    "D-C2 (blocking for citation, not integration): regenerate docs/epic-h/E5-hamburg-lead-lag-findings.md via `uv run poe analysis`, and state explicitly in the regenerated document that the pre-#329 coefficients were computed with a composite containing a constituent of the dependent variable. Do not silently overwrite the table -- the correction is itself evidence worth keeping for O2. Re-verify the 95-cluster narrative at line 71.",
    "D-C3 (G2): frame the exclusion as a role decision -- 'excluded because Hamburg's own social index is built partly from it, not because labour-market disadvantage is irrelevant to displacement'. The second clause is required or the safeguard reads as a false finding.",
    "D-C4 (G2 / Hamburg web slice): state that the displayed Hamburg unemployment figure is descriptive only and feeds no index, and that Hamburg's predictor composite rests on origin and age composition. Pairs with #313's C-5 labelling conditions ('registered unemployed per 100 residents', never 'unemployment rate').",
    "D-C5: amend H1 Condition 2 to record that the migration_background_share / residence_duration_5y_share omission is now uncompensated -- Hamburg's D4 is a bare 2-of-5 subset of Berlin's, not a substituted variant.",
    "D-C6 (G2 wording): use ADR-0008's 'demographic composition / demographic vulnerability' rather than 'socio-economic' for D4. Do not rename models for this.",
    "Forward (not this ticket): pulling ADR-0014's Statistikamt-Nord 'Hamburger Stadtteil-Profile' XLSX fallback would restore migration-background and possibly age-band breadth to Hamburg's D4, converting the current 2-indicator floor into something closer to Berlin's five. That is the clean route out of the thinness concern and should be scoped as its own ticket rather than pressed into #329."
  ]
}
```

---

## Addendum — D-C1 verification (2026-07-31, `gentrification-domain-expert`)

Narrow scope: does the uncommitted header edit to
`transform/models/intermediate/int_ewr_socioeco_hamburg.sql` satisfy **D-C1**? The review above
stands unchanged; D-C2–D-C6 are untouched by this addendum.

**Comment-only — confirmed.** `git diff -U0` on the file yields **zero** added or removed lines that
are not `--` comment lines; the only other working-tree change is this document's companion H1
addendum. The `ewr_composite` expression, its divisor and the SELECT list are untouched: no rebuild,
no number movement.

**D-C1(a) — satisfied.** *"genuinely independent D4 predictors"* → *"the best available D4
predictors"*, followed by an explicit statement that the independence claim holds for
`age_under18_share` and is **OVERSTATED** for `foreigners_share`. The new *RESIDUAL OVERLAP
DISCLOSURE* block carries every element I required: the three overlapping Statusindex attention
indicators cited to ADR-0014 §2 line 83; the overlap characterized as **compositional** (rates
*within* subpopulations vs. whole-population composition shares) rather than definitional; the
statement that it justifies **no further exclusion** (a one-indicator "composite" is not a
composite); the **1/3 → 1/2** weight concentration; and the **asymmetry** of the Berlin parallel per
ADR-0006 lines 20–22 — which I re-verified at source: Berlin's index indicators are unemployment,
transfer-benefit receipt, child poverty and (2023) single-parent-household children, with **no**
origin/nationality measure, whereas Hamburg's D1 includes *migration-background youth*. It closes
with the required reading instruction: Hamburg D4→D1 findings are *substantially, not fully,*
independent of D1.

**D-C1(b) — satisfied.** ADR-0008's D4 bullet is quoted verbatim and checked correct against
`docs/adr/0008-multi-dimensional-gentrification-model.md` (D4 bullet, ~line 99). It is placed as
*"Primary grounding (R-C2)"* **ahead of** the circularity argument, with the logical ordering I
argued in §2: the dimension mismatch is why it was already out of place, the circularity is what
made it harmful.

**No contradiction or weakening.** Nothing in the new text overclaims; the disclosure is marginally
more explicit than I asked. The residual "socio-economic" vocabulary in the model name and header is
deliberately untouched — that is **D-C6**, wording-only, binding at G2.

No integration blocker remains. **D-C2** still blocks *citation* of any Hamburg D4 result;
**D-C3–D-C6** bind at G2/publication.

```json
{
  "verdict": "pass",
  "scope": "D-C1 re-check only: comment-only header edit to int_ewr_socioeco_hamburg.sql (uncommitted working tree, on top of 2c8f8cd9).",
  "domain_rationale": "D-C1(a) and D-C1(b) are both fully satisfied: the independence claim is qualified and correctly attributed to foreigners_share alone; the residual-overlap disclosure covers compositional-vs-definitional character, no-further-exclusion, the 1/3->1/2 weight shift, and the ADR-0006 lines 20-22 Berlin asymmetry; and ADR-0008's D4 bullet is cited verbatim as primary R-C2 grounding, verified against the ADR. Diff is comment-only (no non-comment lines changed), so no rebuild and no published number is affected.",
  "remaining_conditions": ["D-C2 blocks citation of Hamburg D4 results, not develop integration", "D-C3-D-C6 bind at the G2 methodology page / public narrative"]
}
```

**Verdict: PASS**

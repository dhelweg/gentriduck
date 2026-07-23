# #285 (OA-D5b — extend cross-mode comparison to density/per-capita) — gentrification-domain-expert R-C1 sign-off

**Verdict: PASS WITH CONDITIONS**

> **Fresh independent turn.** This sign-off did **not** rely on any pre-existing PM-authored draft
> or analysis of #285. I worked from the primary artefacts only: `gh issue view 285`, the two actual
> diffs (`git show c8899b22` — the analysis-script extension; `git show 7fd9bce9` — the OA-D7 page),
> the regenerated `docs/methodology/OA-D5-mode-comparison-findings.md`, the current page prose in
> `web/pages/methodology-oa-modes.md`, `transform/seeds/seed_oa_calculation_methods.csv`, and the
> two binding prior sign-offs this change must not weaken (`OA-D0-domain-signoff.md` Condition C,
> `OA-D3b-zscore-domain-signoff.md` #280 condition). Where a claim was checkable (which page lines
> the diff touched, whether the §2 caveats were regressed) I re-verified it directly against the
> hunk headers rather than trusting the commit message.

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the independent
  geo-data-scientist statistical-soundness review of the same change; I do not adjudicate the
  Spearman/NaN-handling mechanics — that is the geo lane's call).
- **Artifact under review:** branch `feature/285-oa-mode-comparison-extend`, commits `c8899b22`
  (`analysis/d_oa_mode_comparison.py`), `7fd9bce9` (`web/pages/methodology-oa-modes.md`), and the
  regenerated findings doc. Not yet merged into `develop`.
- **Reviewer:** gentrification-domain-expert (independent). **Date:** 2026-07-23.
- **Grounding (R-C2):** Openshaw (1984) MAUP (density's absolute-count / centrality confound, the
  exact confound the nested-LQ removes); Isard (1960) / Isserman (1977) on location quotients vs.
  raw magnitudes; OA-D0 domain sign-off **Condition C** (density = provision/centrality not OA;
  per-capita's denominator endogenous to displacement; never blend absolute with the LQ family);
  OA-D3b zscore domain sign-off #280 condition (statistical "significance" ≠ gentrification
  importance); Smith (1979/1987) rent-gap and Dangschat (1988) invasion-succession — a dense central
  district is not thereby *gentrifying*, which is precisely why an absolute count and a relative
  ratio cannot share an axis.

---

## Scope of the domain half

The four tasking questions map to four constructs: (1) the absolute-vs-relative class boundary and
whether the never-blend rule is legible to a lay reader; (2) whether per-capita's
denominator-endogeneity danger survives the extension; (3) whether "indeterminate" is the right
public label; (4) whether adding two absolute methods to a nine-way comparison smuggles in a
"these are equally-valid gentrification lenses" implication. I also re-checked the #280 `zscore_slq`
condition for regression. Findings below.

---

## Q1 — Absolute (density/per-capita) as a separate, non-blendable class: defensible, and clearly communicated. PASS.

**Sociologically the class boundary is correct, not a bookkeeping nicety.** Density and per-capita
are `reference_point='absolute'` (seed CSV): they measure absolute magnitude — commerce per km², or
per 1,000 residents. The seven LQ-family methods measure *relative-to-city-share* over/under-
representation (a ratio centred on 1). These answer different questions, and — decisively for the
never-blend rule — they live in incommensurable units, so a density figure and an LQ figure cannot
be meaningfully placed on one axis at all. This is the Openshaw-MAUP / centrality confound the whole
OA construct exists to remove: a dense central district reads "high" on density purely from
agglomeration/centrality, not from gentrification (Dangschat's invasion-succession and Smith's
rent-gap both keep centrality analytically distinct from the gentrification process). Treating the
two absolute methods as a separate class is therefore faithful to OA-D0 Condition C, not an
over-cautious convention.

**The never-blend rule is communicated to a lay reader in terms they can act on, not merely
asserted.** The §2 warning Alert (page lines 165–175) gives the *reason* in plain language —
"plotting them on the same scale as a location quotient invites reading a dense, central district as
'gentrified' when it may simply be busy" — which is exactly the absolute-count-vs-relative-share
distinction rendered without jargon. The §2.5 live-table caveat reinforces it *mechanically*: the
table is "deliberately a table, not a chart," because a shared axis "would misrepresent every
value's real magnitude relative to the others," and the one bar chart on the page "only ever plots
the three methods that genuinely share a unit." So the reader is told both *why* not to compare a
density number to an LQ number and *how* the page structurally prevents it. That is stronger than an
assertion. PASS.

## Q2 — Per-capita's denominator-endogeneity danger: carried forward and not regressed, but the completeness-gate framing needs a fence. PASS with binding-adjacent Condition D-1.

**The binding caveat is present and untouched.** OA-D0 Condition C.1 requires per-capita to carry a
denominator-endogeneity caveat (a rising per-capita figure can mean businesses arrived *or* that
residents were displaced; a falling one is not, by itself, disinvestment). The §2 Alert states this
verbatim (page lines 172–174). I verified against the `7fd9bce9` hunk headers (@@ 17, 101, 328, 779,
830) that **the diff never touches lines 165–187** — so this caveat, and the #280 zscore caveat
below it, are preserved exactly, not regressed. On the literal question the task poses — "does the
extended page still correctly flag that the population denominator can itself shift because of
gentrification-driven displacement" — the answer is **yes**.

**But there is a real framing risk this extension introduces, and it is specifically dangerous for a
gentrification site.** The #285 work is built around the *completeness-contamination* gate, which
tests one thing: would a year-over-year delta just reflect OSM getting more complete (a **numerator**
artefact)? Denominator endogeneity is a **different and independent** danger: even a per-capita
series that passed the completeness gate cleanly would *still* conflate commercial change (numerator)
with displacement-driven population change (denominator). Crucially, the completeness gate does not
test for, and cannot clear, the endogeneity confound — and, unlike the data-coverage gap, endogeneity
is **not fixed by ingesting more EWR years**. The page's discussion of "what stands between us and a
live per-capita delta" (top-of-page carried-forward condition #1; §4; §6; §7) frames that barrier
*purely* as the per-cell completeness flag plus the data-coverage gap. A future-ticket author who
reads only §6/§7 — "per-capita is indeterminate; a future EWR ingestion covering 2021–2023 would let
this run" — could reasonably infer that closing the data gap is the *only* thing between us and a
temporal per-capita view. It is not. The endogeneity confound is a second, non-data-fixable barrier,
and for a gentrification-focused site it is the more dangerous of the two. The §2 caveat is present,
but it sits far from the completeness narrative and is never reconnected to it at the point where the
misreading would occur. **Condition D-1 (below)** closes that gap. Because the binding OA-D0 C.1
caveat itself is present and unregressed, this does not block integration — but it must be discharged.

## Q3 — "Per-capita: indeterminate" is the right public-page choice, and it is concrete, not evasive. PASS.

Picking a side (pass *or* fail) off a single 2024→2025 transition would be statistically
indefensible and a worse trust violation the moment a second year reversed it. "Indeterminate" is
the honest call. It reads as evasive *only if left bare* — and here it is not: both the findings doc
(§4) and the page name the concrete root cause (Berlin's exact-year EWR-to-POI join currently yields
one usable year-over-year transition, 2024→2025; a Spearman correlation is mathematically undefined
against a single transition), name the specific fix (a future EWR ingestion closing the 2021–2023
reference-year gap), and gloss it in lay terms ("too few years of exact-matched population data to
test at all yet … a data-coverage gap, not a failure"). That specificity converts "indeterminate"
from hedging into genuine information. I also credit the conservative default the code enforces:
indeterminate is treated as temporal-**unsafe** (no evidence of safety), never silently as a pass —
the correct domain-safe default for a displacement-sensitive measure. PASS. One optional polish is
noted as D-3.

## Q4 — No new "which OA method is gentrification-relevant" ranking, and no interchangeability implication. PASS.

The extension actively resists the risk that a nine-way comparison implies nine equivalent lenses.
The correlations are split into §1a (relative family) and §1b (absolute-vs-relative, labelled
"informational only"), and §1b states outright that a high or low rho "does not mean the methods
'agree' or 'disagree' … not a validation of either construct against the other" — a correlation can
arise merely because busy, populous areas also happen to have typical location quotients ("a
coincidence of geography," driven by the shared POI-count numerator). The notably high
per-capita↔raw_share rho (≈0.90 at domain level) is exactly where a reader might infer "so per-capita
is LQ-like after all"; the shared-numerator explanation defuses that without elevating it to an
agreement claim. The summary table keeps density/per-capita as "provision/centrality/exposure —
**NOT** a location quotient" and flags their `reference_point` as **absolute** in bold, and the
never-blend footer names them "a genuinely separate class." No composite or ranking is computed
anywhere. PASS — subject to the minor summary-table nit in D-2.

## #280 zscore_slq condition — checked for regression, not regressed. PASS.

The #280 condition (statistical "significance" must never be read as gentrification importance,
always pair `zscore_slq` with its nested-LQ, note the absence of multiple-comparison correction) is
carried by the §2 second Alert (page lines 177–187) and §3 table ("binomial z-score, always paired
with the LQ"). Both are outside every `7fd9bce9` diff hunk — confirmed untouched. The findings-doc
summary row for `zscore_slq` remains "is the representation big relative to sample size?", i.e. a
descriptive question, never an importance claim. Not regressed.

---

## Conditions and recommendations

**No integration-blocking conditions.** The binding OA-D0 Condition C requirements (never-blend
communicated conceptually *and* structurally; per-capita denominator-endogeneity caveat present;
density centrality/MAUP caveat present) are all satisfied, and the #280 `zscore_slq` condition is
not regressed. The R-C1 domain half is met for integration into `develop`. The conditions below are
documentation/framing refinements to discharge in this page or a fast follow.

- **Condition D-1 (must discharge; not integration-blocking).** In the completeness-gate discussion
  of per-capita (top-of-page carried-forward condition #1, and §6/§7 of the page and findings doc),
  add a one-line cross-reference to the §2 denominator-endogeneity caveat, stating explicitly that
  **closing the EWR data-coverage gap would let the completeness gate run, but would *not* clear the
  denominator-endogeneity confound** — the two barriers are independent, and the endogeneity one is
  intrinsic to the measure, not fixable by more data. This also fixes an asymmetry the page currently
  flattens by discussing "density/per-capita" together: density's temporal barrier is essentially the
  completeness/per-cell flag (data-fixable); per-capita carries *that plus* the non-data-fixable
  endogeneity confound. Rationale: OA-D0 Condition C.1; this is the flagship displacement-misuse
  surface on the page, and the extension's completeness-first framing is where a future author would
  most plausibly lose it.

- **Condition D-2 (should discharge; not integration-blocking).** In the findings-doc "Summary —
  which mode answers which question" table, density's "Empirically temporal-safe" cell reads a bare
  **"yes"**, sitting next to the genuinely temporal-safe LQ methods. That "yes" reflects only the
  citywide-aggregate gate, not the per-cell PASS the page's own binding condition requires before a
  live delta. Annotate it (e.g. `yes (citywide only — not a per-cell PASS)`) so the most-scanned,
  least-read-in-full artefact on the page is not read in isolation as full temporal-safety clearance.
  The surrounding prose already says this; the table cell should not contradict it at a glance.

- **Recommendation D-3 (optional polish).** On the most reader-facing surface (the §2.5 live-table
  caveat), lead with the plain-language gloss ("too few years of matched population data to test yet")
  *before* the word "indeterminate," so a lay reader meets the reason before the jargon. Minor.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, in-repo methodology docs and prior sign-offs, and the `#285`
issue text (authored by the maintainer `dhelweg`). No web-fetched or non-maintainer content was
treated as instructions; nothing reviewed requested tool use, new dependencies, credential access,
or scope changes. No untrusted-input escalation is warranted.

---

**Verdict: PASS WITH CONDITIONS.** Treating density/per-capita as a separate, non-blendable absolute
class is sociologically faithful (Openshaw MAUP / centrality confound; OA-D0 Condition C), and the
never-blend rule is communicated to a lay reader both conceptually ("busy ≠ gentrified") and
structurally (table-not-chart, single shared-unit bar chart). Per-capita's denominator-endogeneity
caveat is present and, verified against the diff hunks, unregressed — as is the #280 `zscore_slq`
"significance ≠ importance" condition. "Indeterminate" is the correct, concrete, conservatively-
defaulted public label. Adding two absolute methods to the comparison introduces no ranking or
interchangeability claim. The one genuine domain risk — that the completeness-first framing of this
extension could let a future reader mistake the data-coverage gap for the *only* barrier to a
temporal per-capita view, when denominator endogeneity is a second, non-data-fixable barrier — is
attached as non-blocking Condition D-1, with a summary-table nit (D-2) and an optional polish (D-3).

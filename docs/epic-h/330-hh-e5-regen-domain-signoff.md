# #330 — Hamburg E5 lead-lag regeneration: domain sign-off

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-31
- **Branch:** `fix/330-hamburg-e5-regen` (doc-only: `docs/epic-h/E5-hamburg-lead-lag-findings.md`)
- **Scope:** honesty/framing of the regeneration as a self-correction record. The #329 composite
  decision itself is settled and **not** reopened here.

## 1. Does the Correction note explain the contamination non-euphemistically? — Yes

It names the mechanism (`unemployment_share` is a direct constituent of Hamburg's Sozialmonitoring
Statusindex, ADR-0014 §2), uses the words "partly self-predicting" and "contaminated by shared
construction with D1", and refuses the softer "changed methodology" register. This satisfies the
intent of D-C2 (`329-hh-d4-conflation-domain-signoff.md`).

**Understated in one respect (D330-C3):** the prose scopes contamination to "the Section 2
`ewr_composite_t` coefficients/p-values". Partialling out a control that shares construction with the
outcome also biases the **primary** change-predictor coefficients. The evidence is in the doc's own
tables: H3b k=1 primary coefficient moves −0.1165 → −0.0477 (59% smaller), H3a k=1 p-value 0.0964 →
0.3081. The whole stale Section 2 row is unusable, not just its last column.

## 2. Are stale numbers preserved and marked DO NOT CITE? — Yes, but not durably

Present in a `<details>` block whose `<summary>` carries "DO NOT CITE" even when collapsed. Good.

**But the record is one command away from deletion (D330-C1, blocking).** `analysis/e5_hamburg_lead_lag.py`
rewrites this exact file wholesale (`OUTPUT_MD`, `open(OUTPUT_MD, "w")` at line 634), and the branch
changes no Python. The strings "contaminat", "DO NOT CITE", "#330" and "Re-verified" appear **nowhere**
in the generator. The next `uv run poe analysis` therefore silently erases the correction note, the
stale table, and the re-verified 95-cluster narrative — reproducing precisely the failure D-C2 was
written to prevent. The note's own claim that it "must not be deleted or silently overwritten by a
future regeneration" is currently unenforceable.

## 3. "What changed and what didn't" framing — contains a factual error (D330-C2, blocking)

The stale block states Section 1 numbers "are unchanged between the stale and corrected runs". They
are not: N 9285 → 9293, ρ −0.0215 → −0.0202, and H3a/H3b k=1 flips from p=0.0384 (Sig **Yes**) to
p=0.0514 (Sig **No**). Consequently the parenthetical attributing the 5/15 → 3/15 significance drop
to "the Section 2 … downstream significant-count" is wrong: Section 2 is 0/6 in **both** runs, so the
entire delta is Section 1 — which does not touch `ewr_composite` at all and cannot have been caused
by #329 (that commit changed only comments in `int_hamburg_lead_lag.sql`; the likely cause is #313's
merged-Stadtteil crosswalk fix). Hamburg's only nominally significant H3a/H3b co-movement result
disappeared, unremarked and unattributed, inside a section asserting nothing changed.

Separately, "the point estimates and p-values shift modestly" is fair for the composite column but
not for the primary coefficients (see §1). And the paragraph stops one sentence short of the
validity argument: identical conclusions from an invalid and a valid specification is a property of
this dataset, not a retrospective licence for the old one.

## 4. Residual mis-framing risk for G2/O2 — real (D330-C4)

"Total directional agreement: 12/15" is the most quotable line in the doc and silently mixes 9
symmetric bivariate co-movement tests (which the doc elsewhere correctly says **cannot** distinguish
H3a from H3b) with 6 genuinely directional D4-controlled tests. The stale block repeats "12/15, 5/15",
so a scraped or partially-quoted version can circulate the contaminated scorecard without its warning.

## Conditions

**Integration-blocking (cheap; this is a docs-only branch):**

- **D330-C1.** Make the self-correction record durable against `uv run poe analysis`. Either move the
  Correction note + stale table + `#330` limitation addendum into the generator's markdown emitter,
  or relocate the record to a separate non-generated doc that the generated file links to. Do not
  integrate a note that claims permanence it does not have. (Implementation is data-engineer's;
  I do not touch `analysis/*.py`.)
- **D330-C2.** Correct the false "Section 1 … unchanged between the stale and corrected runs" claim
  and re-attribute the 5/15 → 3/15 significance drop to Section 1, stating plainly that it is
  **unrelated to #329** (most likely #313's crosswalk fix) and that H3a/H3b k=1 lost nominal
  significance (p=0.0384 → 0.0514, a knife-edge result that survives no multiple-comparison
  correction either way).

**Citation/publication-only (bind at G2/O2, not at `develop`):**

- **D330-C3.** Broaden the contamination scope sentence: all stale Section 2 coefficients are
  affected, not only the `ewr_composite_t` column; cite the H3b k=1 −0.1165 → −0.0477 shift. Replace
  "shift modestly".
- **D330-C4.** Add a composition caveat to "Overall scorecard": 9 of 15 are symmetric co-movement
  tests, 6 are directional; do not cite 12/15 as 15 lead-lag tests.
- **D330-C5.** Add the validity sentence: the correction was required because the pre-#329
  specification was not a valid test of H3a/H3b, irrespective of whether its numbers happened to
  agree with the corrected ones.

## Verdict

```json
{
  "verdict": "concerns",
  "domain_rationale": "The regeneration's core honesty move is right and matches D-C2's intent: it names unemployment_share's dual role as a Statusindex constituent, calls the old numbers partly self-predicting rather than merely superseded, preserves them visibly under a collapsed DO-NOT-CITE header, and re-verifies the 95-cluster narrative. Two defects block integration. First, the record is not durable: analysis/e5_hamburg_lead_lag.py rewrites this file wholesale and contains none of the correction text, so the next `uv run poe analysis` erases exactly the self-correction evidence D-C2 exists to preserve. Second, the correction note contains a factual error that inverts its own audit value -- it asserts Section 1 is unchanged when Section 1's N, rho and k=1 significance all moved, and misattributes the resulting 5/15 -> 3/15 significance drop to Section 2, which was 0/6 both before and after. That change cannot come from #329 and is most plausibly #313's crosswalk fix; recording it as a #329 effect (or as no effect) is the same category of error the ticket is correcting. Framing risk on 'what changed and what didn't' is real but secondary: it understates the shift in the primary coefficients (H3b k=1 -0.1165 -> -0.0477) and omits the validity-not-magnitude argument. The 12/15 scorecard remains quotable out of context. All five conditions are documentation/plumbing fixes on a docs-only branch; none reopens #329.",
  "theory_risks": [
    "Self-correction record erasable by the routine regeneration command it warns against (D-C2 intent defeated silently).",
    "Internal factual contradiction inside the correction note damages the credibility the note is meant to establish -- an O2 reader who checks the tables finds the prose wrong.",
    "Change unrelated to #329 (Section 1 significance flip) folded into a #329 narrative, misattributing cause.",
    "Contamination framed as confined to the control's own coefficient, understating that an endogenous control biases the primary lead-lag estimates.",
    "'Directional agreement 6/6, significance 0/6 before and after' readable as 'the fix did not matter', obscuring that the pre-#329 specification was invalid regardless of its output.",
    "'12/15' headline conflates symmetric co-movement tests with directional D4-controlled tests; citable without its caveat."
  ],
  "recommendations": [
    "D330-C1 (blocking): make the correction note survive `uv run poe analysis` -- emit it from the generator or relocate it to a non-generated doc.",
    "D330-C2 (blocking): fix the 'Section 1 unchanged' claim; attribute the 5/15 -> 3/15 drop to Section 1 and to a non-#329 cause; disclose the k=1 significance flip.",
    "D330-C3 (publication): state that all stale Section 2 coefficients are affected, not just ewr_composite_t; drop 'modestly'.",
    "D330-C4 (publication): caveat the 12/15 scorecard's mixed composition.",
    "D330-C5 (publication): add the validity-not-magnitude sentence for the O2 narrative."
  ]
}
```

**Verdict: PASS WITH CONDITIONS** — D330-C1 and D330-C2 are **integration-blocking** (must be
resolved before merge into `develop`); D330-C3/C4/C5 are **citation/publication-only** and bind at
G2/O2. Re-review on request once C1/C2 land; the #329 decision is unaffected either way.

---

## Addendum — re-review after data-engineer response (2026-07-31)

**D330-C1 — resolved (verified, not merely claimed).** The record now lives in
`CORRECTION_330_NOTE_MD` in `analysis/e5_hamburg_lead_lag.py` and is written by `write_findings()`
between Section 2 and the scorecard. I confirmed programmatically that the constant's 6,507-char
body appears **verbatim** in the generated `E5-hamburg-lead-lag-findings.md`, and that
"DO NOT CITE", "contaminat", "#330" and "Re-verified" now all exist in the generator. `uv run poe
analysis` therefore reproduces the record rather than erasing it. Content is what §2/§3 required,
and the hardcoded corrected figures it quotes (H3a k=1 p=0.3081, coef 0.0017/p=0.6544; H3b k=1
−0.0477; N 9293/p=0.0514; 5/15 → 3/15) all agree with the live tables above them.

**D330-C2 — resolved.** "unchanged between the stale and corrected runs" no longer appears anywhere
(grep: zero hits). It is replaced by a note attributing the full 5/15 → 3/15 drop to Section 1,
stating Section 2 was 0/6 in both runs, that Spearman structurally cannot depend on #329, and naming
#313/#307 as the likely cause — also satisfying geo-DS E-C1's combined-run framing.

**D330-C3/C4/C5 — all addressed.** Contamination scope broadened to the whole stale row incl.
primary coefficients (with the −0.1165 → −0.0477 cite; "modestly" replaced); composition caveat
(9 symmetric vs 6 directional) emitted after the scorecard; validity-not-magnitude sentence present.

**Residual, non-blocking (future ticket):** durability converted an erasure risk into a *drift*
risk — the corrected-side figures are static prose beside live-computed tables. Partly mitigated by
the explicit 2026-07-10 / 2026-07-31 datestamps.

**Verdict: PASS**

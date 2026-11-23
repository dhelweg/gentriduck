# Pre-registration #371, Amendment 5: Domain Review (R-C1, domain half)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-05
- **Reviewed:**
  - Amendment 5 (A5.1, A5.2) at the end of
    `docs/methodology/371-matched-comparison-preregistration.md` (working tree, branch
    `feat/371-matched-comparison`);
  - the geo-DS rulings `docs/epic-e/371-implementation-readings-geo.md`.
- **Blindness.** I did **not** open `docs/epic-e/matched-comparison-results.csv`, the findings file,
  the run metadata or any verdict summary. I read `analysis/thesis_matched_panel.py` (code only) to
  check how the flags, the AUC sign and the N-row city differences are built. I did not open the DB.
- **Status of A5:** post-results-generation. The binding run (B = 1999) exists, and the PM has seen
  a verdict summary. Every judgement below is made from the pre-registration text and the code, not
  from outcomes.

Verdict: CONCERNS

A5.2 is exactly what I intended in D8/D10. A5.1 fixes a real asymmetry in the old flip rule, and for
most flags it is neutral. Two things need to change. Two flags are defined by sign in the
pre-registration, and criterion (b) would trip them because of sample size rather than instability.
And the post-results disclosure understates what was known when A5 was written. Both changes are
text-level (§5).

```json
{
  "verdict": "concerns",
  "domain_rationale": "A5.2 reads 'X8 gives DIFFERS in the >= 5,000 panel' as the X8 procedure (BH over the 8 rows) run in that panel. That is what D1/D8/D10 meant: the >= 5,000 condition replicates the primary decision on the trimmed panel, while only the T-free condition was relaxed to an unadjusted CI, and explicitly so. A5.2 makes public city-difference statements harder, not easier. A5.1 removes a one-directional bias: the old rule compared a BH-adjusted primary with an uncorrected sensitivity, so a BH-only non-significance flagged a row as unstable. Comparing like with like on the unadjusted scale is neutral where the primary and the sensitivity have similar n. It is not neutral for maup_flip and the R5/mapping diagnostics. The pre-registration defines those flags by sign (§6.5, §5), and fine grain has about 4-9 times the units of the matched grain, so criterion (b) would flag power differences as MAUP. The A5 header says 'pre-interpretation' and 'no rule chosen in response to a result', but the readings doc names a specific row pattern (BER H2 small_units/core2), and the PM has seen verdicts. The disclosure has to say this, and the pre-A5 flags must stay recoverable.",
  "theory_risks": [
    "A 'grain-dependent (MAUP)' label on rows whose direction does not change would misreport the scale question that matters most for gentrification (Kiez vs Bezirksregion).",
    "A rule change prompted by a known row, even a correct one, needs the before/after to be visible, or the robustness claims on the page cannot be audited."
  ],
  "recommendations": ["F1-F2 required (§5)", "O1-O3 optional (§6)"]
}
```

## 1. Is the A5.1 flip definition neutral?

**The old rule was not neutral.** It compared the primary's BH-adjusted verdict with a sensitivity's
uncorrected verdict. The sensitivity is always judged on the more lenient scale, so the rule flags in
one direction: a primary that misses only because of BH, with a sensitivity that passes unadjusted,
is labelled "depends on …" even when the two have the same sign and nearly the same p. The labels
then say something false. For example, "depends on the transfer indicator" (§3.2) would appear on a
row where core-2 agrees with the primary.

**A5.1 is neutral for flags that compare like-sized designs.** These are `small_units_flip`,
`core3m_flip`, `core2_flip`, `core1u_flip`, `w24_weight_sensitive` and `r19_revision_sensitive`.

- **Both directions are treated alike.** (a) a sign change, or (b) the unadjusted p crossing 0.05,
  flags in either direction. A loss of significance and a gain are treated the same.
- **The verdict is unchanged.** The primary stays BH-adjusted, so no claim is loosened.
- **It does not hide instability.** It removes flags only where the data agree on the same scale. A
  sensitivity that turns a significant primary non-significant, or reverses its sign, is still
  flagged.
- **It may add some flags.** A sign change between two near-zero, non-significant estimates is now
  flagged. That is conservative. O1 makes the label read right.
- **It matches the pre-registered wording** for these flags: "a verdict that flips" (§2.2, §3.2),
  "a verdict … that changes" (A4.1), "a verdict or X8 sign that changes" (A4.4, rev. 1).
- **AUC rows.** The code takes the sign of AUC − 0.5 (`_sign`, `oof_auc_logit`), and the sign of Δ
  for X8 rows. That is the right reference under Amendment 3 and D6. A5.1 should say so (F1b).

**A5.1 is not neutral for `maup_flip` or the R5/mapping diagnostics.**

- **The pre-registration defines these flags by sign only.**
  - §6.5: "A matched-grain verdict whose **sign reverses** at the fine grain is flagged
    'grain-dependent (MAUP)'".
  - §5: "A verdict whose **sign reverses** when the units in the top decile … are dropped",
    i.e. `mapping_driven` and `popgrowth_driven`.
  - The code implements exactly that today.
- **Criterion (b) brings in sample size.** At fine grain, n is about 540 PLR against 143 BZR and
  849 Gebiete against 99 Stadtteile. A same-sign estimate that is not significant at matched grain
  will often be significant at fine grain from power alone. Under A5.1 it would be labelled
  "grain-dependent (MAUP)".
- **That systematically creates false instability**, and in the place where the label is most
  read. Whether the association holds at Kiez scale or only at Bezirksregion scale is the scale
  question gentrification research cares about (my R1 scale caveat). A MAUP label must mean that
  the *direction* depends on the grain, not that the fine grain has more units.
- **The diagnostics are affected less.** They lose 10 % of units. But they too are defined by sign,
  and widening them would change a pre-registered definition after results exist.

Hence **F1**: A5.1(b) does not apply to `maup_flip`, `mapping_driven` and `popgrowth_driven`. They
stay sign-only, as written in §6.5 and §5. This is justified from the pre-registration text alone.

## 2. Does A5.2 match the Revision 3 rule (D8/D10)?

**Yes.**

- **What "X8 gives DIFFERS" means.** In §6.3, DIFFERS is defined as p_BH < 0.05 over the X8 family.
  "X8 gives DIFFERS … in the ≥ 5,000 panel" therefore means running the X8 procedure in that panel.
- **Where it comes from.** The ≥ 5,000 condition was carried over unchanged from D1 (Revision 1) as
  a replication of the primary decision on the trimmed panel.
- **What D8 relaxed, and only that.** D8 relaxed the **T-free** condition to "same sign and
  unadjusted 95 % CI excludes 0 (sensitivity criterion, no BH)". The words "no BH" were attached
  to that clause alone, deliberately.
- **What D10 restored.** D10 restored core-3M as **sign only**.

So the four conditions are, in descending strictness:

| Condition | Standard |
|---|---|
| Primary | BH |
| ≥ 5,000 panel | BH within that panel |
| T-free construct | Unadjusted CI excludes 0, same sign |
| Core-3M | Same sign only |

That is what I meant.

A5.2 makes public statements **harder**. It was not chosen to rescue a claim, and the direction of
the change does not depend on the results.

One clarification, optional (O2): "BH over the 8 X8 rows" should treat NO DATA rows in that panel
exactly as the primary X8 does (m = the tested rows).

## 3. Is the post-results disclosure sufficient?

**Not yet (F2).** The A5 header says "post-implementation, pre-interpretation … no rule below was
chosen in response to a result". The readings doc says "No result was read to make these rulings".
Three facts are missing:

1. **The binding B = 1999 run existed** when A5 was written. The header names the commits but
   does not use the term post-results.
2. **The DE's readings were raised from the outputs.** Reading 3 describes a specific row pattern:
   "the BER H2 `small_units_flip`/`core2_flip` case", a primary that is not significant after BH
   while its sensitivities are significant unadjusted. A5.1 is right on the pre-registration text
   alone (§1). But it was **prompted** by a known row, and it removes flags from that row.
3. **The PM had seen a verdict summary** before ratification.

Also needed: the outputs as they stood before A5 must stay recoverable, and the findings' deviations
section (§9.2 item 7) must list which rows changed because of A5. Otherwise a reader cannot check
that the change was neutral in practice.

## 4. The accepted readings

All are accepted on domain grounds, with these notes.

- **Berlin N1 = NO DATA under the 20-block floor.** Correct. Lowering the floor after seeing NO DATA
  would be a forking path. The code builds the N1 city-difference row with the same floor
  (`x8_row(..., kind="xN")`, default `MIN_BLOCKS`). That row therefore inherits NO DATA, as §6.3
  requires ("NO DATA if either city's primary is NO DATA"). No Berlin–Hamburg N1 difference can be
  read off it. The reading-1 request "check it is excluded from the X8 BH count" is moot, but
  harmless. Wording, optional (O3): N1 "could not be tested in Berlin at this grain", never "no
  support". This is my D7 hypothesis, and NO DATA is not evidence against the
  invasion–succession reading.
- **Berlin N-family BH with m = 1 (N2 alone):** accepted. The findings say so.
- **Coarse-cluster floor 5:** accepted. These runs cannot change a verdict and carry "too few clusters
  for reliable coverage".
- **R19-pub in pp:** accepted. It is the as-published contrast that A4 rev. 1 E1 asked for.
- **M3 2020-only, weights only:** accepted, labelled as narrower than W24.
- **535 balanced Berlin PLRs:** accepted. The §2.3 definition binds, and "541" was a #354
  parenthetical. List the 6 by ID.
- **Summed X8 n, per-city n in `notes`:** accepted. On public pages, show per-city n with the §6.4
  power statement, never the sum.
- **Diagnostics over the full span, N1 median per pivot, N3 lag over the full panel, ≥ 5,000 dated
  31.12.2024 / edition 2025, HH low-power rule not applied, D4 rows dropped, exact f fractions:**
  accepted. Dropping the D4 rows is what my D4 required.
- **Low-B debug runs:** accepted with the disclosure the geo-DS specifies (B values, dates, the two
  fixes, evidence that `estimate`/`n` did not change).

## 5. Required changes

- **F1: Scope of A5.1 (b).**
  - (a) In A5.1, replace the list "(`small_units_flip`, `core3m_flip`, `core2_flip`,
    `core1u_flip`, `maup_flip`, W24, R19-pub, and the diagnostics)" with "(`small_units_flip`,
    `core3m_flip`, `core2_flip`, `core1u_flip`, `w24_weight_sensitive`,
    `r19_revision_sensitive`)".
  - Add: "`maup_flip`, `mapping_driven` and `popgrowth_driven` stay **sign-only**, as defined in
    §6.5 and §5. The fine grain and the top-decile drops change n substantially, so a change in
    significance there reflects power, not grain or composition."
  - (b) Add to A5.1(a): "For AUC rows the sign is that of AUC − 0.5; for X8 rows that of Δ."
- **F2: Post-results disclosure.**
  - Replace the A5 header sentence "Matched-panel outputs exist (commits 0fb5fb00..13d9f3ff), but no
    result has been interpreted, and no rule below was chosen in response to a result." with:
    "**Post-results-generation.** The binding matched run (B = 1999, commits 0fb5fb00..13d9f3ff)
    existed when this amendment was written. The geo-DS did not open the outputs. The DE's
    implementation readings were raised while producing that run. One of them (reading 3)
    described a specific row pattern (BER H2: primary not significant after BH, sensitivities
    significant unadjusted). The PM had seen a verdict summary. The domain ratification was done
    without opening the outputs. Each change is justified from the pre-registration text alone
    (§0, §5, §6.3, §6.5, §7.5). A5.2 makes the statement rule stricter."
  - Add: "The result CSV as of commit 13d9f3ff is the pre-A5 reference. The findings' deviations
    section (§9.2 item 7) lists A5 as a post-results-generation deviation, with every row whose flags
    or statement-rule outcome changed under A5 (before → after)."
  - In `371-implementation-readings-geo.md`, change "No result was read to make these rulings" to
    "No output file was opened to make these rulings. Reading 3 was raised by the DE from an
    observed row pattern (see Amendment 5)."

## 6. Optional

- **O1** When an A5.1 flag is set only by a sign change between two estimates that are both not
  significant (unadjusted), the flag text reads "sign unstable around zero". It should not read
  as "depends on …", which implies a finding exists.
- **O2** A5.2: "m = the X8 rows tested in that panel (NO DATA rows excluded), as in the primary".
- **O3** Berlin N1 public wording: "could not be tested in Berlin at this grain (too few spatial
  blocks in the more disadvantaged half)", never "not supported".

Verdict: CONCERNS

---

## Re-check (2026-11-05)

Scope: the revised Amendment 5 block in `docs/methodology/371-matched-comparison-preregistration.md`
and the header of `docs/epic-e/371-implementation-readings-geo.md` (working tree). I am still
blind: I did not open the result CSV, the findings, the run metadata or any verdict summary.

| Item | Status |
|---|---|
| **F1a** A5.1 (b) limited to `small_units_flip`, `core3m_flip`, `core2_flip`, `core1u_flip`, `w24_weight_sensitive`, `r19_revision_sensitive`; `maup_flip`, `mapping_driven`, `popgrowth_driven` stay sign-only, with the power rationale | **Met**, verbatim. |
| **F1b** Sign reference: AUC − 0.5 for AUC rows, Δ for X8 rows | **Met**, verbatim. |
| **F2** Header states post-results-generation, the B = 1999 run, the reading-3 row pattern (BER H2), the PM's verdict summary and blind ratification; pre-A5 reference CSV at 13d9f3ff; before → after list in §9.2 item 7; readings-doc wording corrected | **Met**. The readings doc goes beyond what I asked: it says the geo-DS saw only the DE's description of the pattern. A5 also states openly that A5.1 removes flags from the triggering row. That is the disclosure that matters. |
| **O1** "sign unstable around zero" | Adopted. |
| **O2** NO DATA rows do not count toward m in the ≥ 5,000 X8 BH | Adopted, consistent with the primary families. |
| **O3** Berlin N1 "could not be tested at this grain", never "not supported" | Adopted. |

**Editorial, non-blocking.** The A5 header now says "post-results-generation, pre-interpretation" and
then repeats "**Post-results-generation.**" Further on it says "Both changes resolve text that was
ambiguous before implementation." None of this is wrong, because both labels are accurate. The
duplicated label could be removed when the PM next touches the file.

**Domain judgement.**

- **The changes are justified from the pre-registration text alone.**
  - A5.1 compares like with like on the unadjusted scale. It applies only to flags that the
    pre-registration defines by verdict.
  - The flags defined by sign stay sign-only.
  - A5.2 reads "X8 gives DIFFERS" exactly as §6.3 defines it, which is what D8/D10 intended.
- **Neither change loosens a public claim.** A5.2 tightens the statement rule. A5.1 changes labels,
  never verdicts.
- **The trigger and its effect are disclosed.** The pre-A5 state stays recoverable, and the
  before → after list makes the change auditable.

**Results sign-off still pending.** This verdict ratifies Amendment 5 only. It is not the
results sign-off. That still waits on:

- the geo-DS readings 2, 3, 7, 8 and 9 being implemented;
- the DE code review;
- E4 from Amendment 4 rev. 1 (the S3 back-revision evidence in `371-data-checks.md`, including
  the corrected "no effect on the design" sentence), as recorded in
  `371-amendment4-domain-review.md`.

Verdict: PASS

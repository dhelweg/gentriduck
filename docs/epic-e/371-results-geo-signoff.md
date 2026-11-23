# #371 matched comparison: results sign-off (geo-DS, R-C1 statistical/spatial half)

- **Date:** 2026-11-05.
- **Scope:** `matched-comparison-results.csv`, `matched-comparison-metadata.json` and
  `E1c-matched-comparison-findings.md` at `run_sha` 14d20548b5be (B = 1999), plus
  `analysis/thesis_matched_panel.py`. Checked against the pre-registration (PR) with Revisions 1–3,
  D10, A4 and its revision 1, and A5 with its correction note.
- **What this sign-off covers:** statistical and spatial correctness, and whether the generated text
  is faithful to the CSV. It does not cover substantive interpretation.

## Checks

**1. Estimators, families and floors: PASS.**
- **BH:** I recomputed BH from `p_boot` for every family (BER/HH T8, BER/HH N, X8, X8_ge5000). All
  `p_bh` values match to 1e-4.
- **Berlin N-family:** m = 1, because N1 is NO DATA (A5.2/O2 convention).
- **Floors:** no primary row with fewer than 20 blocks carries a verdict. HH H1a/H1b have 21 blocks,
  and HH N1 has 20. G = 36 and iid keep the floor of 20; G = 16 and Bezirk use 5, labelled
  (ruling 4).
- **X8:**
  - All 8 rows are NO DIFFERENCE DETECTED, and each prints its MDD (2.8 × SE).
  - The "too imprecise" logic is correct: it is set for H1 and H2 (AUC, MDD > 0.10) and for H1a,
    H1b, H1c, H3a and H3b (ρ, MDD > 0.30). It is not set for H3c (0.213).
  - The robust-DIFFERS rule is never triggered.
- **Holm:** reported for transparency only.

**2. Flags, MAUP and Moran: PASS on logic, wording fixes needed (R2).**
- **A5.1 flags:** the six flags use sign (AUC − 0.5; Δ) or unadjusted significance, with both sides
  unadjusted, and are not evaluated when either side is NO DATA.
- **MAUP flags:** `maup_flip` is sign-only. The three MAUP flips (BER H3c, HH H3b, HH H3c) match
  the §6.5 table. H1/H2 at fine grain are "not comparable", as §6.5 anticipated.
- **Moran and G = 16 promotion:** Berlin's block-mean Moran's I for H3c in W2 (p 0.027) triggers the
  G = 16 promotion. The table compares both on the unadjusted scale. Promotion on any of the 7 tests
  is the conservative reading of §6.2, and it adds text only.

**3. M3 in `PERMITTED_PREREG_INPUTS`: CONFIRMED.**
- M3 (2026-11-02) pre-registered linear interpolation between 31.12.2020 and 31.12.2024, so 2024
  data in the 2022 bands and weights is by design.
- These are weights and age structure, not outcomes. The M3 "2020 only" sensitivity bounds the
  effect.
- A4 rev. 1's "no other exemption exists" was an omission. A dated clarification is appended to the
  PR (no rule changed).

**4. B = 29 provenance: CONFIRMED as recorded, not reproducible.**
- `run/disclosures/debug_runs` records two B = 29 runs on an uncommitted working tree.
- At B = 29 the p floor is 1/30 ≈ 0.033, so "BER H2 not significant after BH" is arithmetically
  plausible.
- The outputs were not kept, so the statement rests on the DE's record. The wording must say so
  (R4).

**5. Faithfulness and over-claiming: mostly faithful; three fixes needed.**
- §2 cells, notes and §7.8 match the CSV values I checked: estimates, CIs, p, verdicts, flags and
  per-city n.
- Over-claims are listed in R1–R3.

## Required changes (generated text; no estimate changes)

**R1. "Too imprecise" in the side-by-side cell.**
- In §2, every X8 cell whose note contains "too imprecise to say the cities agree" must render
  `**NO DIFFERENCE DETECTED** (too imprecise to say the cities agree: MDD <mdd> > <0.10|0.30>)`
  instead of the bare verdict.
- Rationale: the cell is what gets quoted. PR §0/§6.3 forbids showing agreement unless MDD ≤ the
  threshold.

**R2. Sign-only flags rendered with their meaning.** This makes the reviewer's nit 2 required.
- In §2 cells and in the §5 flag columns, a flag whose note says "sign unstable around zero" renders
  as `<flag> (sign unstable around zero)`.
- `maup_flip` applies the same O1 label when both the matched and the fine-grain estimate are
  non-significant (unadjusted). Otherwise it renders `maup_flip (grain-dependent, MAUP)` (§6.5).
- This applies to the BER H3c, HH H3b and HH H3c `maup_flip` flags. All three are sign changes
  between non-significant estimates, so a bare flag over-states grain dependence.

**R3. X8 H2 note (D6/W2 text on a NO DIFFERENCE DETECTED row).** Replace "coincides with the
Rechtskreiswechsel asymmetry (W2 only, PR §4.4), and in W2 Hamburg shows no transferable
discrimination: it differs in transferable discrimination only (Amendment 3, D6)" with:

> "w2_only: the W2-only exploratory Δ (2021–2023, uncorrected) is DIFFERS. It coincides with the
> Rechtskreiswechsel asymmetry (PR §4.4), and in W2 Hamburg shows no transferable discrimination,
> so that window differs in transferable discrimination only (Amendment 3, D6). The primary X8 row
> (W1–W3 pooled) is NO DIFFERENCE DETECTED."

**R4. Provenance wording (findings header and §7.8).**
- In the header "Binding design" bullet, replace "(Revisions 1–3, Amendment 4 and Amendment 4
  revision 1)" with "(Revisions 1–3, Amendment 4 with revision 1, Amendment 5 with its correction
  note)".
- In the §7.8 reading-3 disclosure, replace "Raised with the PM and the geo-DS for the results
  sign-off." with:

  > "Corrected in the Amendment 5 correction note (2026-11-05): A5.1 is unchanged and both flags
  > stand. The B = 29 outputs were not retained; the description rests on the DE's record (metadata
  > `run/disclosures/debug_runs`)."

## Reviewer nits

- **Nit 1** (the `a5_changes` key is missing `hypothesis`): fix with the next regeneration. Not
  blocking.
- **Nit 2:** required, as R2.
- **Nit 3** (`git show 13d9f3ff` dependency): not blocking. Recommendation: write the SHA-256 of the
  reference CSV into the metadata, so the before → after table can be verified without git history.

## Re-check

After R1–R4, the DE regenerates the findings. Estimates, CIs, p and verdicts must stay
byte-identical; I verify with `rows_differing`. The geo-DS then re-checks only the rendered cells
and the two §7.8 sentences.

Verdict (first round): CONCERNS (superseded by the re-check below)

## Re-check (2026-11-05, `run_sha` 635166279667, commits ffc5f358, 63516627, b4ec7777)

Scope: only the rendered §2 cells, the §7.8 sentences and the header. The coordinator reports that,
against 46732ba4, every estimate, CI, p, verdict and flag is identical; only `run_sha` changed, plus
`notes` on the X8 H2 row. `reference_sha256` is now in the metadata (nit 3 resolved).

- **R1: met.** Every X8 cell with MDD above its threshold (H1, H1a, H1b, H1c, H2, H3a, H3b, and the
  exploratory N2) reads "(too imprecise to say the cities agree: MDD x > t)". H3c (0.213) and N3
  (0.280) are correctly unqualified.
- **R2: partly met.** Every sign-only flip renders "(sign unstable around zero)", including all
  `maup_flip`s, which are both non-significant. Five tokens in the side-by-side tables still render
  bare, although they are genuine unadjusted-significance changes:
  - BER H2: `small_units_flip`, `core2_flip`;
  - X8 H2: `core3m_flip`, `w24_weight_sensitive`.

  This fails the domain R2 condition ("no bare flip tokens in the side-by-side table").
- **R3: met verbatim** (§2 notes, X8 H2). Cosmetic: a stray "." before ";" in "… NO DIFFERENCE
  DETECTED.; too imprecise …". Fix it with R5.
- **R4: met.** The header lists Amendment 5 with its correction note (4b3551bf) and the M3
  clarification. The §7.8 sentence is verbatim, with the B = 29 provenance.
- **Domain O1 statement-rule line:** "no city difference is stated; none of the 8 X8 rows gives
  DIFFERS under core-3H". This is faithful to the CSV (all 8 rows are NO DIFFERENCE DETECTED).

**R5 (required, wording only).** In the side-by-side tables, a flip flag whose note reads
"unadjusted significance change" renders as `<flag> (unadjusted significance change)`. Example:
`small_units_flip (unadjusted significance change); core2_flip (unadjusted significance change);
ewr_2022_interpolated`. Applies to: BER H2 `small_units_flip` and `core2_flip`; X8 H2 `core3m_flip`
and `w24_weight_sensitive`. Also remove the ".;" in the X8 H2 note. No estimate may change.

Once R5 lands with byte-identical estimates, I will move to PASS on a cell-only check; no further
statistical review is needed.

Verdict (re-check round): CONCERNS (superseded below)

## Final check (R5; `run_sha` af2312b5c72c, commits af2312b5, 2e818492)

In the side-by-side tables every flip token now carries its meaning. BER H2 `small_units_flip` and `core2_flip`, and X8 H2 `core3m_flip` and `w24_weight_sensitive`, read "(unadjusted significance change)"; every other flip reads "(sign unstable around zero)". No bare flip token remains, and the X8 H2 ".;" is gone. The coordinator reports that only `run_sha` and the X8 H2 `notes` changed against b4ec7777. R1–R5 are met.

Verdict: PASS

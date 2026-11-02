# #355 geo-DS methodology sign-off — Hamburg thesis hypothesis suite

- **Reviewer:** geo-data-scientist (R-C1 gate, ADR-0011)
- **Date:** 2026-11-01
- **Branch:** `feat/355-hamburg-suite` (ddc9edb2, 4e44c452, a75cccd9, b4e56487, a86fdd34, 52fd1036 vs `develop`; run_sha a86fdd34b10e)
- **Inputs:** `docs/epic-h/H-thesis-hypothesis-suite-findings.md`; the HH rows of
  `docs/epic-e/thesis-hypothesis-suite-results.csv`; `h2_oof_diagnostics` in the metadata JSON;
  pre-registration §4, §10 and Amendments 1–3. The DB was not opened (every value comes from committed outputs).

Verdict: PASS

This verdict holds if: (a) the domain expert independently ratifies **Amendment 3** (added to the
pre-registration with this sign-off, post-results, disclosed as such); (b) the data-engineer-reviewer's
re-check passes; (c) the public Hamburg page follows §4 below. Condition (c) binds the page work,
not this branch.

```json
{
  "verdict": "pass",
  "rationale": "Hamburg implements the pre-registered §4 mapping with the #354 machinery unchanged (Stadtteil cluster bootstrap, BH per 8-primary family with HH/full primary, grouped-CV OOF AUC, A1.1 feature rule). The H2 below-chance AUC is correctly NOT SIGNIFICANT under the non-directional design; Amendment 3 records this post-results, codifying a rule already in develop before Hamburg results. Construct limits (no commercial category passes A1.1 at Gebiet grain; status composite includes migration background) are disclosed in the findings and bind the public wording.",
  "risks": [
    "Hamburg H1/H2 test a transport / public-facility / tourism mix, not the thesis's commercial offering structure; they cannot confirm or refute H1/H2 as the thesis meant them.",
    "H2 full-chain OOF AUC 0.440 is systematically below 0.5 (5/5 folds, 4/4 windows): read as no transferable prediction, possibly a grouped-CV null artefact (Parker et al. 2007); the bootstrap centred on 0.5 does not model it.",
    "H1a rests on 100 of 857 Gebiete (12%) in 40 Stadtteile and is significant under BH but not Holm.",
    "H1-family estimates are shared by both panels (same 2025 cross-section); the era split adds no independent evidence for H1-H1c.",
    "Status classes are coarse (4 levels), and Dynamik is about 85% 'stabil'; tie ceilings 0.49-0.69 for Dynamik limit attainable rho."
  ],
  "recommendations": [
    "Public page: present Hamburg H1/H2 as 'not a test of the business mix' and not as 'not reproduced'.",
    "Public page: H1a as tentative (FDR-only, 12% of Gebiete, per-resident row null).",
    "Future suite revision (pre-registered): label-permutation null for OOF AUC rows.",
    "Domain expert to co-ratify Amendment 3."
  ]
}
```

## 1. H2 below-chance labelling: ratified (Amendment 3)

`HH/full` H2 has AUC 0.440 [0.397, 0.481], p_BH 0.021, and is shown as NOT SIGNIFICANT. **Ratified.**
- H2 is pre-registered as **non-directional** (§1.1, §5.1 "Non-directional"). The fitted logit
  picks its direction from the training folds, so there is no hypothesised direction to contradict.
  The words "CONTRADICTED impossible" appear only on the H1 row of §5.1, but they follow from
  the non-directional form and apply to H2 equally. The code rule ("CONTRADICTED is undefined for the
  non-directional H1/H2 AUC tests") was in `develop` with #354, before any Hamburg statistic existed.
- The diagnostics show the shortfall is systematic: within-fold AUC is 0.38–0.48 in 5/5 folds, and per-window
  AUC is 0.40–0.47 in 4/4 windows. This means the training relation fails to carry over to held-out Stadtteile.
  It does not mean an inverse signal. Below-chance out-of-fold AUC under a null is a known
  grouped/stratified-CV artefact (Parker, Günter & Bedo 2007). The percentile bootstrap resamples fixed
  OOF scores around 0.5, so it cannot separate this artefact from a real signal.
- Mixing the verdict rule with a two-sided p is acceptable. The two-sided p is the pre-registered
  test statistic (§5.3). Under a rule where only AUC > 0.5 can support, it is conservative. The
  pre-registration text did not spell this out, so **Amendment 3 (post-results clarification,
  2026-11-01)** writes it down and states plainly that it was recorded after the results.
- Required display (already met in findings §1 and §6): the H2 cell must carry the below-0.5 flag next
  to NOT SIGNIFICANT. A bare "NOT SIGNIFICANT, p_BH 0.021" without the flag would be misleading.

## 2. Alternative readings: rejected, the two-sided p stands

- (a) **Full H2 as CONTRADICTED: rejected.** A non-directional AUC test has no "opposite"; see §1.
- (b) **One-sided AUC p: rejected.** §5.3 pre-registers the two-sided bootstrap p. Switching after
  seeing H1 at AUC 0.559 (p_BH 0.070 / 0.088) would be a post-results analytic choice that turns a
  null into a finding. Even then H1 would be SUPPORTED-negligible, which maps to "weaker than thesis"
  under N3, not "holds". H1 stays NOT SIGNIFICANT ("nominally significant") in both panels.
- I am also **not** applying a permutation null after the fact. It is recommended only for a future
  pre-registered revision (Amendment 3, follow-up).

## 3. Construct validity of Hamburg H1/H2

At Gebiet grain (about 2,200 residents) no shop, service or gastronomy category clears the A1.1 ≥ 20%
unflagged rule. The H1 list is 12 features (Mobility, Public Space, Tourism) and the H2 list is
9 (Mobility, Public Space). The commercial-only H1 row is NO DATA. This is the pre-registered rule
applied as written, and it was not altered after results. **That is correct procedure**, but
the resulting test is **not an operationalisation of the thesis's H1/H2 construct** (the
*Angebotsstruktur* of commerce). Street furniture and transit nodes are campaign-mapped, which is
where C5's uniform-coverage assumption is least credible (domain D2; pre-registration §5.1 basket
rationale).

Ruling:
- Keep the computed rows and verdicts. Re-labelling them NO DATA now would be a post-results deviation.
- They are an **acceptable** test of a different, narrower question: "does the mix of transport,
  public facilities and tourist facilities separate status classes / predict worsening?" They are
  **not acceptable** as evidence about the thesis's H1/H2.
- Public wording (binding): Hamburg H1 and H2 must be labelled **"not comparable: no business
  category is measurable at this grain"**, with the computed result as a sub-line. Do not use
  "not reproduced", and never "the business mix does not predict status in Hamburg". The findings'
  "What H1/H2 measures" paragraphs already say this, and the page must lead with it.

## 4. H1a wording (BH-significant, not Holm; 12% of Gebiete)

ρ −0.272 [−0.451, −0.057], n = 100 Gebiete in 40 Stadtteile. Retained and dropped Gebiete have similar
status mixes (17% vs 18% in classes 3–4), so range restriction is unlikely to drive it. The
per-resident café row is null (−0.054 [−0.144, 0.045]).

Public wording (binding): "Among the roughly one in eight Hamburg statistical areas with at least ten
gastronomy outlets, cafés make up a larger share of the gastronomy mix where the Sozialmonitoring
status is better (ρ −0.27, a small effect). This is significant under the false-discovery-rate
correction used for all headline tests, but not under the stricter family-wise correction. The number of
cafés per resident shows no clear link. Treat it as tentative. Status here is Hamburg's
composite index, which includes migration background and school-leaving outcomes." The
"Matches Berlin 2018?" label "stronger than thesis" may stand, with "(tentative)". Berlin's own
re-test found no café link.

## 5. BER side effect: no effect on the #354 sign-off

I compared the 116 BER rows on `develop` and on this branch key by key. The row set is identical,
and only `notes` differs, on 6 BER/modern rows (H3a/H3b sensitivity and the stratified exploratory rows: the shock notes, E1b §12 item 16).
No estimate, CI, p, verdict or `holds` value changed. The #354 geo sign-off and the 354c page sign-off stand.

## 6. Other checks

- **Families / BH:** `HH/full` is the primary family, and `HH/modern` is its own 8-family era-split comparison,
  as set by the §10.3 maintainer decision. Both H1a rows are flagged "FDR not FWER", and both H1 rows are flagged
  "nominally significant". This is correct.
- **Cluster unit:** Stadtteil (99 ≥ 20). Repeated Gebiete across windows stay in one cluster. H1a/b
  have 40 clusters, which is adequate but at the low end, and the CI width reflects it.
- **Shared H1 family across panels:** the H1 family uses the same 2025 cross-section in both panels.
  The findings disclose this. The page must not count the era split as a second confirmation of H1b.
- **H3a–c:** n.s. in both panels, with ρ between −0.05 and 0.03. They read as "no detectable ordering", with the same wording rules as Berlin
  (`docs/epic-e/354-geo-signoff.md` §4). The Dynamik tie ceilings (0.49–0.69) further limit
  attainable ρ, and this is disclosed in findings §8.
- **Comparability:** the §4.5 binding text is present (construct, window, status measure, grain).

## 7. Public-wording guidance for the Hamburg page (binding)

- **Column header:** "Matches Berlin 2018?" (a transfer test), never "replicates".
- **H1, H2:** "Not comparable: no business category can be measured at Hamburg's small-area grain.
  A test on transport, public and tourist facilities found [no clear link / no transferable
  prediction]." For H2 full chain, add: "Prediction was worse than chance in every held-out
  district. We read this as no usable signal, not as an opposite effect."
- **H1a:** the §4 text above (tentative).
- **H1b:** "Among the roughly one in eight areas with at least ten gastronomy outlets, fast food makes
  up a larger share of the gastronomy mix where the Sozialmonitoring status is worse (ρ 0.42,
  moderate), as in Berlin." Name the construct (it includes migration background; an area-level pattern, not a
  statement about any group or business). It is one 2025 cross-section, so do not count it twice.
- **H1c:** opposite direction, small, as in Berlin. Mostly playgrounds and public table tennis.
- **H3a–c:** "No detectable ordering between commercial change and change in the Sozialmonitoring
  Dynamik, in either direction, over 2013–2025 or since 2022. Three-year windows and a measure where most
  areas are 'stable' rule out a strong ordering, not a small one."
- **Always:** Hamburg and Berlin use different monitors, grains and windows. Agreement is not proof
  of the same mechanism (§4.5).

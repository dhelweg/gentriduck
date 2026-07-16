# Geo-Data-Scientist Sign-off: R-B2c (emerging-east ground-truth label + Test E)

- **Scope:** R-B2c #278 — branch `feature/278-r-b2c-emerging-east` (commits `5b0c37d7`, `494283f7`)
  - `emerging-east` label added to `transform/seeds/seed_gentrification_ground_truth.csv` (4 Lichtenberg PLRs)
  - Test E (dynamism-aware recall) added to `analysis/backtest_index.py`; write-up in `docs/methodology/backtest.md`; `transform/seeds/schema.yml`
- **Reviewer:** geo-data-scientist (statistical / spatial-methodology gate, R-C1)
- **Date:** 2026-07-16
- **Verdict:** PASS with conditions

---

## What I independently verified against the live warehouse

Queried `int_gentrification_ts` (`area_vintage='lor_2021'`, latest `mss_edition`, `is_uninhabited=false`, `status_index` not null). All quantitative claims in the code/docs reproduce:

| Claim | Code/doc states | Reproduced |
|---|---|---|
| Inhabited PLR universe | 535 (docstrings also say "542") | **535** inhabited (542 incl. uninhabited) |
| Strict criterion D1=2 ∧ D2=1 ∧ Milieuschutz | 22 citywide | **22** ✓ |
| Loose criterion D1=2 ∧ D2≤2 ∧ Milieuschutz | 169 citywide | **169** ✓ |
| Roedeliusplatz `11300724` | D1=2, D2=1, `active-gentrification` | ✓ |
| Other three (`11400927`, `11400929`, `11300826`) | D1=2, D2=2, `stable-established` | ✓ |

The base-rate framing is correctly computed and the criterion is applied identically over the whole
inhabited universe (not just the labelled set) — the same discipline Test B uses for its decile
threshold. Good.

## Methodology assessment

**1. D2==1 (strict "improving") is the correct operationalization — the tightening was right.**
The `dynamik_index` convention established in #259/#264 and `stg_berlin_mss` is
`1 = positiv/improving, 2 = stabil, 3 = negativ/declining`. "Improving dynamism" maps to `== 1`,
full stop. The iteration-1 loose reading (`<= 2`) conflated *stabil* with *improving*, which is not
faithful to the construct and — as the numbers confirm — is near-vacuous as an eastern-frontier
discriminator: it admits 169/535 (32%) of the inhabited universe, removing only ~10 PLRs from the
mittel-status+Milieuschutz pool and concentrating in the classic west/inner-city bezirke already
covered by `hotspot`/`mixed`. The strict reading is the statistically and semantically defensible
choice. I endorse it.

**2. The base-rate/citywide framing is sound** and independently reproduced (above). Keeping Test E
as a *separate test path* from Test B (rather than folding `emerging-east` into `hotspot`), plus the
non-gating merged-recall diagnostic that quantifies the dilution the domain sign-off predicted, is
the correct design — it preserves what Test B's recall denominator measures.

**3. The problem: a 0.5-recall gate at n=4 is not a statistically meaningful test, and the FAIL it
produces is a label artifact, not an index deficiency.** Two independent issues:

   - **No power at this n.** With n=4, recall is granular to {0, 0.25, 0.5, 0.75, 1.0}; the 0.5
     threshold falls *between* achievable values, no confidence interval is meaningful, and the
     pass/fail flips on a single row. This is a case-study/existence check, not a powered recall
     metric. The threshold-rationale text moreover imports Tests B/C's justification ("chance
     performance at the 10% decile = 10% recall"), which **does not apply** to Test E: Test E is a
     criterion-based test, not a decile test. Its true citywide base rate is 22/535 = 4.1%, so the
     decile-chance argument is inapposite as written.

   - **The FAIL is driven by label↔criterion incoherence, not by the index.** Three of the four
     seed rows carry `D2=2 (stabil)` in the seed's own `notes` and in the warehouse. A criterion
     that requires `D2=1 (improving)` *structurally cannot* be met by a row the seed itself labels
     stabil. So the 0.25 "recall" is measuring the mismatch between the label set and the criterion,
     not whether the index correctly surfaces eastern frontiers. Publishing that as a headline
     gating FAIL in `backtest.md` misrepresents index quality. Notably, the R-B2b domain sign-off's
     own turnkey table already separated Roedeliusplatz ("hotspot-by-dynamism", archetype) from the
     other three ("emerging-east / **control**") — the incoherence was introduced when iteration-1
     folded all four into one uniformly-tested label.

## Ruling on Open Question 1 (strict vs. loose; accept-FAIL vs. relabel)

I rule **against** both of the two framed options as-stated. Neither "accept the n=4 FAIL as a
headline gate" (Option 1 — reports a misleading gating failure) nor "relabel and let n=1 pass at
recall 1.0" (Option 2 as-stated — a single-point 1.0 is a trivially-passing non-test that gives false
comfort) is statistically defensible. The correct resolution combines Option 2's *relabeling* with a
*demotion of Test E to non-gating* at this n:

**Required (conditions for PASS — coordinate with the domain-expert, whose lane the label semantics
share):**

- **C1 — Align labels with the criterion (Option 2 relabel).** Move the three stabil PLRs
  (`11400927` Victoriastadt/Kaskelkiez, `11400929` Weitlingkiez, `11300826` Frankfurter Allee Süd)
  out of the Test-E-gated `emerging-east` class into a separate, explicitly **non-gating**
  descriptive/watchlist class (e.g. `emerging-east-watch` or `frontier-watch`), matching the domain
  sign-off's own "control" designation for exactly these three. Keep all cited rows in the seed
  (descriptive tracking is correct and ethically framed); only the *label*, hence the test
  membership, changes. This requires the gentrification-domain-expert's concurrence (parallel gate)
  since label semantics are jointly owned.

- **C2 — Demote Test E to a non-gating descriptive archetype anchor at this n.** With only
  Roedeliusplatz remaining, Test E is n=1 and cannot support a powered pass/fail gate. Report its
  result (Roedeliusplatz meets the strict criterion) but **exclude it from the OVERALL ALL-PASS/FAIL
  computation**, exactly as the merged-hotspot diagnostic is already excluded. Document that Test E
  is promoted to a *gating* recall test only once the `emerging-east` seed reaches a defensible n
  (the 22 citywide strict-criterion matches, subset to literature-documented eastern frontiers, are
  the candidate pool for growing it — file as a follow-up).

- **C3 — Fix the Test E threshold rationale.** Remove/replace the copied "chance at the 10% decile =
  10% recall" justification for Test E; it is a criterion-based (4.1% base-rate) test, not a decile
  test. State the honest rationale: at current n this is a descriptive archetype confirmation, not a
  powered recall gate.

- **C4 — Reconcile the denominator.** Docstrings and `backtest.md` quote "22/542" and "169/542";
  the criterion is computed over the **535 inhabited** PLRs (542 includes uninhabited). Use 535
  consistently (rates 4.1% / 31.6%). Minor, but the grounding rule (R-C2) wants the reported base
  rate to match the computed one.

Conditions C1–C2 are build changes, so per R-C1 the PM may **not** integrate until they are made and
re-reviewed (a short confirmation, not a full re-gate). C3–C4 are documentation fixes bundled into
the same change.

## Open Question 2 (Milieuschutz-as-Altbau proxy) — spatial-stats note, defer to domain

This is the domain-expert's call. From a measurement standpoint: substituting `under_milieuschutz`
for the ungated "Altbau" criterion introduces an unquantified false-positive risk (a
Soziale-Erhaltungsgebiet need not be Gründerzeit stock). But Milieuschutz is *independently* gated,
the seed is hand-curated and per-row cited (R-C2), and the substitution is now disclosed in code,
`backtest.md`, and `schema.yml` rather than silent. That is acceptable as a documented limitation on
the statistical side. I defer the substantive correlation claim to the domain-expert and do not block
on it.

## Untrusted-input note (SEC-3)

This review relied only on maintainer-authored SPEC, repo code, and the live warehouse. No
web-fetched or non-maintainer content informed any methodology decision here.

---

## Verdict

```json
{
  "verdict": "PASS with conditions",
  "scope": "R-B2c #278 — emerging-east ground-truth label + Test E dynamism-aware recall, branch feature/278-r-b2c-emerging-east",
  "rationale": "The strict D2==1 operationalization of 'improving dynamism' is the correct and faithful reading of the dynamik_index convention (1=positiv, 2=stabil, 3=negativ) used in #259/#264; the iteration-1 loose reading was rightly rejected as unfaithful and near-vacuous (independently reproduced: 22 vs 169 of 535 inhabited PLRs). The base-rate framing and separate-test-path design are sound. However, a 0.5-recall pass/fail gate at n=4 has no statistical power, and the resulting FAIL is a label<->criterion artifact (3 of 4 seed rows are labelled stabil and cannot meet an 'improving' criterion), not an index deficiency; publishing it as a headline gating FAIL misrepresents index quality.",
  "risks": [
    "n=4 (effectively n=1 archetype) recall gate at 0.5 is a case-study check, not a powered metric; pass/fail flips on a single label decision.",
    "Test E's FAIL currently contributes to OVERALL and reads as an index deficiency when it is a label/criterion mismatch introduced by folding archetype + 3 controls into one uniformly-tested label.",
    "Threshold rationale copied from decile-based Tests B/C does not apply to the criterion-based (4.1% base-rate) Test E.",
    "Milieuschutz-as-Altbau proxy is an untested substitution (deferred to domain-expert); unquantified false-positive risk, but independently gated and now disclosed."
  ],
  "recommendations": [
    "C1: relabel the 3 stabil PLRs (11400927, 11400929, 11300826) into a separate non-gating watch/control class (domain-expert concurrence required); keep all cited rows in the seed.",
    "C2: demote Test E to a non-gating descriptive archetype anchor at current n (exclude from OVERALL, like the merged diagnostic); promote to a gating recall test only after growing the emerging-east seed to a defensible n from the 22 citywide strict-criterion matches.",
    "C3: replace the decile-based threshold rationale for Test E with the honest 'descriptive archetype confirmation at n=1' framing.",
    "C4: reconcile the 542 vs 535 denominator; report rates over the 535 inhabited universe.",
    "Defer Open Question 2 (Altbau) to the gentrification-domain-expert; acceptable as a disclosed limitation on the statistical side."
  ]
}
```

**Verdict: PASS with conditions** (C1–C4 above; C1–C2 are build changes requiring re-confirmation
before the PM integrates into `develop`, and C1 requires the gentrification-domain-expert's parallel
concurrence on the relabel).

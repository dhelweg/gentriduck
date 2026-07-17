# Geo-Data-Scientist Sign-off: R-B2c (emerging-east ground-truth label + Test E) — ROUND 2

- **Scope:** R-B2c #278 — branch `feature/278-r-b2c-emerging-east`
  (round-1 commits `5b0c37d7`, `494283f7`; round-2 fix commit `8a2e8a8a`)
  - `emerging-east` / `emerging-east-watch` labels in `transform/seeds/seed_gentrification_ground_truth.csv`
  - Test E (dynamism-aware recall) in `analysis/backtest_index.py`; write-up in `docs/methodology/backtest.md`; `transform/seeds/schema.yml`
- **Reviewer:** geo-data-scientist (statistical / spatial-methodology gate, R-C1)
- **Date:** 2026-07-16
- **Supersedes:** the round-1 "PASS with conditions" sign-off of the same date (conditions C1–C4).
- **Verdict:** PASS

---

## Independent round-2 re-verification (live warehouse + actual diff — not trusting prior reviews)

I re-checked commit `8a2e8a8a` directly (git diff + grep of the live code) and re-ran the harness
against the live warehouse (`uv run python analysis/backtest_index.py`). I did **not** rely on the
data-engineer or data-engineer-reviewer conclusions; the checks below are my own.

| Condition | Requirement | What I verified | Status |
|---|---|---|---|
| **C1** | Relabel the 3 D2=2 stabil PLRs out of the gated `emerging-east` set into a non-gating class (with domain concurrence). | Seed now labels `11400927`, `11400929`, `11300826` as **`emerging-east-watch`**; only `11300724` Roedeliusplatz (D1=2, D2=1) remains `emerging-east`. Test E's gated set is built from `label == "emerging-east"` only (n=1 confirmed live: seed composition `{'emerging-east-watch': 3, 'emerging-east': 1}`). Per-row grounding citations (Dangschat 1988; Holm & Schulz 2016; R-B2b sign-off) retained on all relabeled rows (R-C2 satisfied). Domain-expert `Verdict: PASS` present in `R-B2c-emerging-east-domain-signoff.md`. | **Satisfied** |
| **C2** | Demote Test E to non-gating (exclude from OVERALL) at n=1. | In **both** `print_results` (L969) and `write_backtest_md` (L993) `overall_tests = [res_a, res_b, res_c]` and appends **only** `res_d` — `res_e` is never appended. Grep-confirmed no `overall_tests.append(res_e...)`. Live run: Test E `PASS (non-gating -- excluded from OVERALL)`, and `OVERALL: ALL PASS`. | **Satisfied** |
| **C3** | Fix the threshold rationale — drop the decile-chance framing for Test E, use honest criterion-based 4.1% base-rate framing. | Test E docstring and `backtest.md` now state explicitly it is **not** a decile test, the "chance at the 10% decile" rationale does not transfer, and the true citywide base rate is `22/535 = 4.1%` — reframed as a descriptive archetype confirmation at n=1 with a documented promote-to-gating follow-up. The residual decile-chance wording remaining in the file is scoped correctly to Tests B/C only. | **Satisfied** |
| **C4** | Reconcile 542 vs 535; report over 535 inhabited PLRs. | `grep "542"` over `backtest_index.py` and `backtest.md` returns **no matches**; all citywide rates now read `22/535 = 4.1%` (strict) and `169/535 = 31.6%` (loose). | **Satisfied** |

The strict `D2 == 1` operationalization of "improving dynamism" — the substantive methodological call
both round-1 sign-offs endorsed — was **not** touched (git diff confirms), which is correct.

## Methodology assessment (unchanged from round 1, now with conditions discharged)

The strict reading faithfully maps the `dynamik_index` convention (`1=positiv/improving, 2=stabil,
3=negativ`) established in #259/#264 and `stg_berlin_mss`. The label↔criterion incoherence that
produced the round-1 artifact FAIL is now resolved structurally: a criterion requiring `D2==1` is only
applied to rows the seed labels as improving, and the three stabil control PLRs are tracked
descriptively in a non-gating watch class rather than scored as recall misses. The n=1 archetype
confirmation is honestly framed as such — not a powered gate — and the promotion path (grow the
`emerging-east` seed toward the 22 citywide strict-criterion matches) is documented as a follow-up.
The merged-recall diagnostic (dilution 1.00 → 0.67) remains non-gating and correctly quantifies why
keeping Test E on its own path is the right design.

## Open Question 2 (Milieuschutz-as-Altbau proxy)

Round-2 wording now states Altbau/Gründerzeit stock is domain-confirmed per-PLR for these four
specific Lichtenberg Soziale-Erhaltungsgebiete and that Milieuschutz is used as the computational gate
only for lack of a warehouse building-era column, not assumed to generalize. Acceptable as a disclosed
limitation on the statistical side; the substantive claim was the domain-expert's to rule on and their
sign-off is PASS.

## Untrusted-input note (SEC-3)

This review relied only on maintainer-authored SPEC, repo code/diff, and the live warehouse. No
web-fetched or non-maintainer content informed any methodology decision.

---

## Verdict

```json
{
  "verdict": "pass",
  "scope": "R-B2c #278 round 2 — emerging-east ground-truth label + Test E dynamism-aware recall, branch feature/278-r-b2c-emerging-east, fix commit 8a2e8a8a",
  "rationale": "All four round-1 conditions (C1 relabel the 3 stabil PLRs to non-gating emerging-east-watch; C2 exclude Test E from OVERALL at n=1; C3 replace the decile-chance rationale with honest 22/535=4.1% criterion-based framing; C4 report over the 535 inhabited denominator) are independently verified against the live warehouse and the actual code/diff. The strict D2==1 criterion both sign-offs endorsed is untouched; OVERALL is ALL PASS with Test E a non-gating n=1 archetype confirmation; the label<->criterion artifact that drove the round-1 FAIL is structurally resolved; grounding citations (R-C2) are retained; the domain-expert gate is PASS.",
  "risks": [
    "Test E remains an n=1 case-study anchor, not a powered recall gate — correctly non-gating now; must not be re-promoted to gating without growing the emerging-east seed to a defensible n.",
    "Milieuschutz-as-Altbau remains a documented proxy (no warehouse building-era column); disclosed per-PLR and independently gated, acceptable on the statistical side."
  ],
  "recommendations": [
    "Follow-up (non-blocking): grow the emerging-east seed from the 22 citywide strict-criterion matches, subset to literature-documented eastern frontiers, then promote Test E to a gating recall test at a powered n.",
    "Add a warehouse building-era / Altbau indicator when a free open source is available, to replace the Milieuschutz proxy in the emerging-east criterion."
  ]
}
```

**Verdict: PASS** — conditions C1–C4 discharged and independently re-verified. Clean sign-off; R-B2c
#278 may be integrated into `develop` (domain-expert gate also PASS).

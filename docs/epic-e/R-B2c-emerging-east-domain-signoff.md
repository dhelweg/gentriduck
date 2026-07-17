# Gentrification Domain Expert Sign-off: R-B2c (emerging-east ground-truth label + Test E) — Round 2

- **Scope:** R-B2c #278 — branch `feature/278-r-b2c-emerging-east`
  - Round-1 work (commits `5b0c37d7`, `494283f7`): `emerging-east` label + Test E (dynamism-aware recall)
  - **Round-2 fix under review (commit `8a2e8a8a`):** implements the round-1 blocking conditions
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-16 (round 2)
- **Gate:** R-C1 methodology-bearing; dual gate with geo-data-scientist
- **Supersedes:** the round-1 "PASS with conditions" (verdict: concerns) sign-off of the same date.

## Verdict: PASS

All blocking domain conditions from round 1 are satisfied. I re-verified this independently against
the current seed CSV rows, `transform/seeds/schema.yml`, `docs/methodology/backtest.md`, and the
`analysis/backtest_index.py` docstrings — not against the fix summary. This is now a clean
`Verdict: PASS` from the domain/theory-fidelity gate.

---

## Condition 1 (blocking, round 1) — archetype/control separation — SATISFIED

**Verified in the live seed.** `seed_gentrification_ground_truth.csv` now carries two distinct labels:

- `11300724` Roedeliusplatz → **`emerging-east`** — D1=2 (mittel), **D2=1 (improving)**, typology
  `active-gentrification`. The single true active-frontier archetype.
- `11400927` Victoriastadt/Kaskelkiez, `11400929` Weitlingkiez, `11300826` Frankfurter Allee Süd →
  **`emerging-east-watch`** — D1=2, **D2=2 (stabil)**, typology `stable-established`. Explicitly
  non-gating, "tracked descriptively only — not scored for recall".

This is **not a cosmetic relabel.** The split is grounded in a real MSS Dynamik distinction —
D2=1 *positiv* vs. D2=2 *stabil* — which ADR-0008's D1×D2 matrix already encodes as two different
typology stages (`active-gentrification` vs. `stable-established`). An *active* frontier (pioneer
signal registering on the dynamism axis, per Dangschat 1988's invasion–succession model) and a
*watched* frontier at stable dynamism are genuinely different theoretical states, and the pipeline now
treats them as such: Test E scores only `emerging-east` (n=1, `backtest.md` line 135 confirms "n
emerging-east PLRs in seed: 1"), and the three watch PLRs cannot count as recall misses because they
are outside the scored set entirely. The `accepted_values` list now includes both labels. The three
watch rows retain their full literature citations (Holm & Schulz 2016) and per-row Gründerzeit-Altbau
Soziale-Erhaltungsgebiet notes — nothing was deleted, only the scoring membership changed. This is
exactly SPEC design Option 2 and my round-1 "archetype vs. control" candidate table.

## Condition 3 (blocking, round 1) — Milieuschutz-implies-Altbau general claim — SATISFIED

**Verified across all three surfaces.** The universal assertion is gone. Every remaining occurrence of
the phrase now sits *inside an explicit negation*:

- `backtest_index.py` (lines 89–99, 699–707): "used as the computational gate only because the
  warehouse has no PLR-level building-era column — NOT because Milieuschutz implies Altbau as a general
  rule. §172 BauGB Soziale-Erhaltungsrecht protects the social composition of the resident population
  against displacement, not building era; a Soziale-Erhaltungsgebiet can, and some do, include
  non-Altbau stock."
- `schema.yml` (lines 483–491): general claim named as "domain-incorrect … and has been removed";
  replaced with the per-PLR domain-confirmed statement + non-generalization caveat.
- `backtest.md` (lines 179–183, "Resolution 2"): the general claim is stated as removed; per-PLR Altbau
  confirmation for the four specific Lichtenberg Soziale-Erhaltungsgebiete retained.

The per-PLR substance is domain-correct: I confirm from R-B2b research that Roedeliusplatz,
Victoriastadt/Kaskelkiez, Weitlingkiez, and Frankfurter Allee Süd are each independently documented
Gründerzeit-Altbau quarters, so Milieuschutz genuinely coincides with Altbau *for this corpus only*.
The §172 BauGB caveat that this does not generalize (breaks on extension to other PLRs or Epic H
cities) is present and correctly stated.

## Condition 2 (non-blocking; geo-DS gate) — Test E demoted to non-gating — CONFIRMED PRESENT

Test E is excluded from OVERALL and reported as a descriptive archetype confirmation at n=1 (recall
1.00), with the honest base-rate framing (22/535 = 4.1% citywide criterion match) replacing the copied
decile-chance rationale. The statistical treatment is the geo-DS's gate; from the domain side my only
requirement — that neither a 1/1 PASS nor the old 0.25 be presented as evidence about the construct's
validity — is met (`backtest.md` lines 37, 133, 191).

## Condition 4 (already met, round 1) — descriptive-not-destined framing — PRESERVED

The framing survived intact. `backtest.md` line 193 preserves verbatim: *"This is NOT an assertion that
any of these areas are causally destined to displace or complete gentrification -- it documents a
currently observed pressure signal per the cited literature."* The passage now correctly extends the
distinction to both the archetype and the watch class, and instructs that any G2/O2 public surface must
preserve it and must not overstate Test E's recall. `schema.yml` carries the matching descriptive guard.

---

## Verdict block

```json
{
  "verdict": "pass",
  "verdict_label": "PASS (clean)",
  "scope": "R-B2c #278 round 2 — emerging-east ground-truth label + Test E, branch feature/278-r-b2c-emerging-east, fix commit 8a2e8a8a",
  "domain_rationale": "All round-1 blocking domain conditions are satisfied and independently re-verified against the live seed CSV, schema.yml, backtest.md and backtest_index.py. Condition 1: the archetype/control split is theoretically substantive, not cosmetic -- Roedeliusplatz (emerging-east, D2=1 positiv, active-gentrification) and the three watch PLRs (emerging-east-watch, D2=2 stabil, stable-established) are distinct MSS Dynamik states encoded as different ADR-0008 typology stages; Test E now scores only the n=1 archetype and the three watch PLRs cannot count as recall misses. Condition 3: the universal 'Milieuschutz implies Altbau' claim is removed from all three surfaces and survives only inside explicit negations, replaced by a per-PLR domain-confirmed statement plus the Sec 172 BauGB 'social composition, not building era' caveat. Condition 4: the descriptive-not-causally-destined framing is preserved verbatim. Condition 2 (geo-DS gate) is present.",
  "theory_risks": [],
  "recommendations": [
    "Carry the descriptive-not-destined framing and the archetype-vs-watch distinction verbatim into the G2 methodology page and O2 whitepaper; do not present Test E's n=1 recall (1.00) as a validated pass.",
    "When the emerging-east seed grows (candidate pool: the 22 citywide strict-criterion matches, subset to literature-documented eastern frontiers), re-open the domain gate to promote Test E to a powered recall test.",
    "If a PLR-level building-era column later lands in the warehouse, replace the Milieuschutz computational proxy with the real Altbau gate -- do not carry the coincidence forward as an assumption."
  ]
}
```

**Verdict: PASS** — the domain/theory-fidelity gate is clean. R-B2c #278 may be integrated into
`develop` once the geo-data-scientist's parallel round-2 gate is also clean.

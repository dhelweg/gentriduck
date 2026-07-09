# Gentrification Domain Expert Sign-off: QA-7b (#205) — e1 dominant-PLR crosswalk-bridge extraction

- **Scope:** QA-7b #205 — the domain-fidelity half of the R-C1 dual gate on extracting
  `analysis/e1_regressions.py`'s inline dominant-PLR crosswalk CTE into a gated dbt intermediate
  (`int_berlin_lor_crosswalk_dominant_2021`). Validates that the pseudo-replication caveat this
  bridge creates is honestly and prominently disclosed, that the extraction does not quietly change
  or launder the substantive interpretation of the EWR-based H2/H3 same-era findings that depend on
  it, and that no new causal or descriptive claim is smuggled in by the relocation.
- **Operationalizes:** `index-definition.md`'s general discipline of disclosing spatial-aggregation
  caveats alongside any finding that depends on them; the pre-existing H2/H3 EWR same-era comparison
  (`e1_regressions.py`, docs/epic-e/E1-regression-findings.md) whose numerical outputs this ticket
  must leave untouched.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/205-qa7b-e1-crosswalk-bridge-extraction → develop
- **Geo-DS verdict:** PASS (`docs/epic-c/QA-7b-crosswalk-bridge-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. This is a relocation, not a re-interpretation — the substantive claims are unchanged

I read this ticket primarily as a governance question, not a sociological one: is anything about
*what the EWR same-era H2/H3 findings mean* changing as a side effect of moving where the bridging
SQL lives? The geo-DS sign-off's before/after diff (byte-for-byte identical stdout, including every
N, rho, p-value, and directional-match flag across all five scale panels) is the decisive evidence
here — if the numbers are unchanged, the domain interpretation attached to those numbers (documented
in `docs/epic-e/E1-regression-findings.md`, which I confirm has zero diff against `develop`) cannot
have changed either. My review therefore focuses on whether the *caveat* that qualifies those
findings survived the move intact, since that caveat is the one piece of domain-relevant context a
careless refactor could most plausibly have dropped.

## 2. The pseudo-replication caveat is carried forward honestly and is not softened

The most domain-relevant fact about this crosswalk is that ~35% of lor_2021 PLRs share their bridged
`poi_count` with at least one sibling PLR (up to 6 sharing a single dominant pre-2021 match). This
matters sociologically, not just statistically: it means the EWR same-era H2/H3 "15/15 directional
agreement, 15/15 significant at p<0.05" headline result (`E1-regression-findings.md`) rests on fewer
truly independent spatial observations than its raw N suggests, which is exactly the kind of
inflated-precision risk that has produced overstated gentrification claims in weaker studies. I
checked all three places this caveat now lives (the new model's SQL header, the `schema.yml`
description, and the `e1_regressions.py` docstring) and confirm the "treat as directional evidence,
not independent-observation p-values" instruction is present, worded consistently, and not
diluted relative to the pre-extraction docstring — if anything the new model header is more explicit
because it is now cross-referenced against the *different* (and correct) treatment used for EWR
indicators themselves in `int_berlin_ewr_plr2021`, which reduces the risk of a future contributor
copy-pasting the wrong crosswalk pattern into a genuinely divisible-quantity context.

## 3. No new descriptive-vs-causal framing risk is introduced

The EWR same-era H2/H3 results already carry the project's standard framing discipline (directional
agreement language, not causal claims) in `E1-regression-findings.md`, and this ticket does not touch
that document's prose (confirmed: no diff). The new dbt-model documentation is written for an
internal audience (dbt docs / schema.yml, `docs/epic-c/`) and does not introduce any public-facing
language that would need the descriptive-not-causal guardrail applied — it is infrastructure
documentation, not a findings narrative.

## 4. The representative-unit (max-weight) simplification is sociologically defensible for this use

Independent of the geo-DS review's technical justification, I confirm the domain framing holds up:
picking a single "most similar" historical PLR to stand in for a modern PLR when bridging POI counts
does not introduce a new substantive claim about *which* historical neighbourhood a modern PLR
resembles beyond what the pre-2021→2021 boundary-reform crosswalk already encodes (the underlying
`seed_lor_crosswalk_2006_to_2021` weights, geo-DS approved 2026-06-19). This ticket does not change
which historical PLR is picked for any of the 542 modern PLRs — it only changes where the
already-decided pick is computed.

---

## 5. Conditions

None blocking. No new conditions — the one relevant advisory from the geo-DS sign-off (using the new
`dominant_weight` column for a future low-confidence-match sensitivity check) is a geo-DS-owned
follow-up, not a domain-fidelity condition.

---

## 6. Risks

1. The ~35% pseudo-replication rate remains a standing risk that any future consumer of the EWR
   same-era H2/H3 results could over-read the "15/15 significant" headline as stronger evidence than
   it is if they read the regression table without also reading the caveat — unchanged by this
   ticket, but worth re-flagging for the O2 whitepaper (#82) writeup, which should state the
   pseudo-replication caveat alongside the EWR same-era headline number, not only in the source code
   comments.

---

## 7. Certification

This extraction is a verified no-op relocation of an already-implemented, already-domain-reviewed
(by virtue of being live in production since #114/#115) crosswalk bridge. The pseudo-replication
caveat — the one fact a domain reviewer most needs preserved — is carried forward accurately and is,
if anything, more clearly cross-referenced than before. No new sociological claim, causal framing
risk, or public-facing language is introduced. I have no domain-fidelity objection to integrating
this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The dominant-PLR crosswalk-bridge extraction is a verified no-op relocation: the geo-DS sign-off's before/after diff shows byte-for-byte identical e1_regressions.py output, and docs/epic-e/E1-regression-findings.md (the findings narrative depending on this bridge) has zero diff, so no domain interpretation attached to the EWR same-era H2/H3 results has changed. The pseudo-replication caveat (~35% of lor_2021 PLRs share a dominant pre-2021 match) is carried forward honestly across the new model's SQL header, schema.yml description, and the e1_regressions.py docstring, with wording unchanged in substance and now more explicitly cross-referenced against int_berlin_ewr_plr2021's different (correct) areal-weighted-apportionment treatment for divisible EWR quantities. No new causal or descriptive-framing risk is introduced -- the new documentation is internal dbt-model documentation, not public-facing narrative, and the underlying representative-unit crosswalk choice does not change which historical PLR stands in for any modern PLR, only where that already-decided pick is computed.",
  "risks": [
    "The ~35% pseudo-replication rate remains a standing risk that a future reader could over-read the EWR same-era '15/15 significant' headline as stronger evidence than it is if the caveat is not read alongside the regression table -- unchanged by this ticket but worth re-flagging explicitly in the O2 whitepaper (#82) writeup"
  ],
  "recommendations": [
    "O2 whitepaper (#82): state the pseudo-replication caveat directly alongside the EWR same-era H2/H3 headline result, not only in source-code/model-documentation comments"
  ]
}
```

---

## Final Verdict

Verdict: PASS

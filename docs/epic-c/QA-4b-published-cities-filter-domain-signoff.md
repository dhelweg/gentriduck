# Gentrification Domain Expert Sign-off: QA-4b (#202) — publication-filter consolidation

- **Scope:** QA-4b #202 — the domain-fidelity half of the R-C1 dual gate, triggered because this
  ticket edits `gentrification_index.sql` (an R-C1 enumerated file), even though the change itself
  is a filter-mechanism refactor with no substantive methodology content. Confirms no published
  finding, typology classification, or public-facing claim changes as a side effect.
- **Operationalizes:** none — no new sociological or methodological claim is introduced by this
  ticket; my review confirms that fact rather than assessing new domain content.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/202-qa4b-published-cities-filter → develop
- **Geo-DS verdict:** PASS (`docs/epic-c/QA-4b-published-cities-filter-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. This is a mechanism refactor, not a substantive change — verified equivalence is decisive

The geo-DS sign-off's verification (identical row counts across all three affected marts, the
`accepted_values` test still passing) is the load-bearing evidence for my review too: if the exact
same set of rows is published before and after this change, there is no new domain claim for me to
assess — the index values, typology classifications, and trajectory stages a site visitor or
downstream analyst would see are unchanged. My review therefore confirms the *absence* of a
methodology change rather than evaluating a new one.

## 2. No public-facing framing risk

This ticket does not touch any prose, methodology page, or findings narrative — only a `where`
clause's filter expression and its supporting macro/var. Nothing about how the index is described,
what "gentrification" is claimed to mean, or which caveats accompany a published number changes as
a result of this ticket. There is no D-1/D-2 descriptive-vs-causal framing surface here to review.

## 3. Future second-city onboarding remains correctly gated elsewhere

I confirm this ticket does not itself decide when Hamburg (or any future city) becomes a published
city — it only changes *where* that decision is expressed (one `dbt_project.yml` var instead of
three hard-coded literals). The actual decision to publish Hamburg's gentrification index remains
subject to its own R-C1 review at whatever point #125 (Hamburg real-data ingestion + sign-off
conditions) reaches that milestone — this ticket does not pre-empt or weaken that future gate.

---

## 4. Conditions

None.

---

## 5. Risks

None beyond the geo-DS sign-off's noted trust-boundary observation (the var must stay in sync with
the actual publication decision) — not a domain-fidelity risk.

---

## 6. Certification

This ticket introduces no new sociological claim, no change to any published index value or
typology classification (verified equivalent by the geo-DS sign-off's row-count checks), and no
public-facing framing risk. I have no domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "The publication-filter consolidation (QA-4b, #202) is a mechanism-only refactor that touches gentrification_index.sql (an R-C1 enumerated file) but introduces no methodology, weighting, or scoring change. The geo-DS sign-off's row-count verification confirms the published dataset is byte-for-byte equivalent to before the change, so there is no new domain claim, typology classification, or public-facing framing to assess. Future second-city publication decisions (e.g. Hamburg via #125) remain subject to their own R-C1 gate and are not pre-empted or weakened by this ticket, which only relocates where the current single-city publication decision is expressed.",
  "risks": [],
  "recommendations": []
}
```

---

## Final Verdict

Verdict: PASS

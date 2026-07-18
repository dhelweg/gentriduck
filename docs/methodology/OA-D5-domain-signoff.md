# OA-D5 (#240, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, urban-sociology/housing-policy-framing half (pairs with
  `OA-D5-geo-signoff.md`).
- **Artifact under review:** `analysis/d_oa_mode_comparison.py`,
  `docs/methodology/OA-D5-mode-comparison-findings.md`.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.

## Summary judgement

Conforms to the #240 research-fragment framing ("a characterised map of which mode answers which
question, how well, and where each breaks... not 'one better OA'"). The findings doc's closing
"which mode answers which question" table is genuinely descriptive, not a disguised ranking — each
method is labelled by the QUESTION it answers, matching the OA-D0 domain sign-off's own
never-blend framing extended to this new axis.

## Checks performed

1. **No implicit ranking/recommendation:** confirmed the summary table and every correlation table
   present methods symmetrically (alphabetical/definition order, not sorted by correlation strength
   or "how well it validates"), and the closing paragraph explicitly disclaims the table as a
   navigation aid. This matters for a domain-framing reason beyond ADR-0024's technical never-blend
   rule: presenting, say, `zscore_slq` as "better" because it is base-aware would implicitly demote
   `raw_share`'s legitimate use (composition/provision questions, not representation questions) —
   the doc avoids this trap.
2. **Golden-anchor framing (Epic B directional revival):** correctly limits golden validation to
   `nested_lq` and explicitly states the other six methods have NO thesis-era precedent, rather than
   implying (as a careless report might) that a low golden-correlation for, e.g., `raw_share` is a
   "failure" of that method. `raw_share` was never claimed to reproduce the 2018 golden — it answers
   a different, non-representational question (bare composition) that the thesis never measured.
3. **Completeness-contamination result, read honestly:** the empirical finding that `raw_share` and
   `zscore_slq` turned out temporal-SAFE (contrary to their pre-registered `expected_temporal_safe`
   theoretical prediction) is reported as a genuine empirical surprise, not silently used to
   retroactively justify a preferred narrative either direction. Domain framing note: this single
   Berlin, single-window (2008–2026) empirical pass should NOT be read as overturning the underlying
   theoretical concern that a bare proportion is not, in principle, invariant to uniform mapping-
   coverage growth (`raw_share`'s own seed-row grounding: "OA-D0 geo sign-off C3 (expected to fail
   the completeness-contamination gate)") — Berlin's OSM coverage growth happens to have been
   largely uniform post-2015 (per `int_poi_status_dynamism.sql`'s own C5 premise, independently
   re-confirmed for Hamburg in H-C1 #158), so this empirical pass, while genuine, is conditional on
   that premise holding, not a permanent guarantee that would transfer to a city with a less-uniform
   mapping-growth history. The findings doc's own five-column table format (empirical result +
   pre-registered expectation + confirmed?) already surfaces this tension for a careful reader; no
   additional caveat text was required in this pass, but any future consumer that treats
   `raw_share`/`zscore_slq` as unconditionally temporal-safe based on this single result would be
   over-claiming — flagged here for the record, not requested as a blocking change.
4. **MAUP-fragility finding — ethical/framing weight:** the domain sign-off treats the newly-surfaced
   nested_lq PLR-vs-BZR MAUP fragility (rho=0.662) as a substantive finding about the SPATIAL GRAIN
   of neighbourhood succession dynamics, consistent with the domain-expert framing precedent already
   established at OA-D4 ("treat fragility as a substantive finding about the spatial grain of
   succession, not merely a caveat"). A gentrification signal that reorders substantially between
   PLR and BZR scale is not a data-quality defect to be explained away — it may reflect a genuine
   fact about Berlin's urban fabric (gentrification pressure is locally heterogeneous even within a
   single Bezirksregion), which is itself worth surfacing to a public reader rather than only
   burying in a methodology footnote. Concurs with the geo sign-off's binding forward condition on
   D6/D7.
5. **No new ethical-framing gaps introduced:** this ticket introduces no new taxonomy, no new
   dominance grouping, and no new public-facing figure — it is a comparison study over
   already-reviewed (D3/D3b/D4) columns. The prior OA-D4 anti-stigma condition (cuisine-typed
   dominance barred from public surfaces) is untouched by this ticket and not re-litigated here.

## Grounding (R-C2)

CLAUDE.md Epic B framing (directional revival, divergences documented not forced); OA-D0 domain
sign-off (never-blend, Condition E golden-anchor scope); OA-D4 domain sign-off precedent
("fragility as substantive finding" framing, extended here from within-group dominance to
areal-scale MAUP); `docs/epic-c/C5-geo-signoff.md` / H-C1 #158 (uniform-coverage-growth premise this
ticket's contamination-gate proxy depends on).

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — no implicit ranking, no over-claimed golden validation, MAUP-fragility and
contamination-gate findings framed with appropriate epistemic caution and forward-binding
conditions. Ready for `develop` integration.

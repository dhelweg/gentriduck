---
task: H-C1 / #158 — Re-fit C5 completeness-bias correction for Hamburg
author: geo-data-scientist
date: 2026-07-10
branch: feature/158-hc1-hamburg-dynamism-refit
---

# Geo-DS methodology sign-off — Hamburg C5 completeness-bias re-fit

- **Branch:** `feature/158-hc1-hamburg-dynamism-refit`
- **Issue / task:** #158 [H-C1] — re-fit the C5 OSM completeness-bias correction for Hamburg
  (blocks any "publish Hamburg dynamism/index" work).
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Nature of this pass:** Light-touch confirmation, **not** a re-do of the methodology review. The
  substantive methodology assessment was completed in the scoping spike
  `docs/epic-h/158-hc1-geo-spike.md` (which queried the live warehouse and established that the C5
  mechanism transfers to Hamburg unchanged). This sign-off confirms the **landed implementation
  matches that spike's recommendations with no scope creep and no math change**, and formally
  records the R-C1 verdict now that implementation + independent code review are complete.
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_poi_status_dynamism.sql` (header documentation only)
  - `transform/tests/test_c5_poi_share_spike.sql` (material-count floor)
  - Cross-reference: `docs/epic-h/158-hc1-geo-spike.md` (the substantive review this confirms),
    `transform/models/marts/schema.yml` (verified `gentrification_index` scope unchanged).

`int_poi_status_dynamism.sql` is one of CLAUDE.md's explicitly-listed methodology-bearing models,
so this change requires a formal geo-DS `PASS` before PM integration into `develop` (R-C1), even
though the spike already carried the analytical weight.

## a. Does the landed diff match the spike's recommendations exactly?

**Yes.** The diff implements precisely R1 and R3, and correctly leaves R2 and R4 alone:

- **R1 (test floor):** `test_c5_poi_share_spike.sql` gains `total_poi_count >= 30` in the final
  `WHERE`, plus the `total_poi_count` passthrough column needed to reference it, and a header note
  citing the spike (R-C2 grounding satisfied). The constant is a single global `30`, exactly as
  recommended — **not** a per-city parameter — so it hardens the DQ test against grain for every
  city, not just Hamburg. Severity remains **warn** (this stays a data-quality tripwire, not a hard
  gate), as recommended.
- **R2 (no normalization change):** `int_poi_status_dynamism.sql` has **zero** changes to its math,
  cutoff year, partition keys, or z-score logic. The only edit is an added documentation block.
  Confirmed by reading the full diff: the `(city_code, snapshot_year)` partition — the actual
  re-fit mechanism — is untouched. No optional winsorization was added (correctly deferred as
  non-blocking).
- **R3 (documentation re-fit artifact):** The new header block states that the C5 uniform-coverage
  premise and the ~2015 stabilization point were **re-validated on Hamburg's own 2008–2026 curve**
  (not assumed to transfer), cites the spike, records the small-N-artifact diagnosis, and notes the
  finer-grain caveat lives in the ratio *test*, not the score. This matches R3's intent.
- **R4 (publication-gate widening) NOT done — correct.** I verified `transform/models/marts/schema.yml`
  still constrains `gentrification_index.city_code` `accepted_values` to `["BER"]` (lines 42, 230,
  502). Widening to include `"HH"` is a separate governance step requiring its own fresh dual
  sign-off (per #125); this branch correctly does not touch it.

## b. Is the `30` floor still the right, defensible constant?

**Yes — unchanged from the spike's reasoning.** 30 sits roughly at Hamburg's stable-era median
POI/area and comfortably above the small-N noise band; the spike measured that it brings the two
cities into line (BER 75→47, HH 77→45) and equalizes the post-2016 tail, whereas floor=20 under-
corrects and floor=50 over-suppresses. The header documents it as an empirical, city-agnostic
constant to revisit if a future city has a materially different POI-density profile — the honest
framing. No new evidence in this pass changes that judgement.

## c. Is the dynamism score itself still safe to publish for Hamburg at the normalization level?

**Yes** — established in the spike and unchanged here: scores are z-scores partitioned per
`city_code`, Hamburg is scored on its own distribution, the smallest-POI areas contribute zero >3SD
extreme scores, and per-row extreme-value rates are comparable across cities (~1.9% both). The C5
completeness-bias control transfers because it is share-based and per-city-partitioned. No
structural re-fit was needed, and none was made.

## Independent-review status

An independent `data-engineer-reviewer` verified the diff matches the spike, re-ran the build fresh,
and independently reproduced BER 75→47 / HH 77→45 (approve, no findings). I confirmed the same
numbers against the spike and the current diff. No code-correctness concerns are outstanding.

## Scope / residual notes

- This sign-off clears the **methodological** blocker for Hamburg dynamism. It does **not** authorize
  widening `gentrification_index` to publish Hamburg — that R4 publication-gate step needs its own
  fresh dual (geo-DS + domain) sign-off referencing this work.
- Score-level transfer is validated; whether Hamburg's Gebiet grain is the right *narrative* analysis
  unit remains a `gentrification-domain-expert` question for the paired sign-off (unchanged from the
  spike's caveat).
- Untrusted-input note (SEC-3): findings derive solely from the local warehouse, the repo diff, and
  repo files; no external/web content informed this assessment.

## Verdict

The landed implementation matches the spike's R1 + R3 exactly, changes no governed index math,
introduces no scope creep, correctly defers R4, and carries clean R-C2 citations. The substantive
methodology (established in the spike) holds.

```json
{
  "verdict": "pass",
  "rationale": "Landed diff implements exactly R1 (city-agnostic total_poi_count>=30 floor on the warn-severity C5 spike test) and R3 (Hamburg re-validation header on int_poi_status_dynamism), with zero change to the model's normalization math, cutoff year, or (city_code, snapshot_year) partition. R2 (no math change) and R4 (no gentrification_index accepted_values widening beyond ['BER']) correctly honored. Independent code review reproduced BER 75->47 / HH 77->45. The C5 share-based, per-city-partitioned completeness-bias control transfers to Hamburg unchanged, as the spike established.",
  "risks": [
    "The 30 floor is an empirical city-agnostic constant; documented as revisit-on-new-city, not a permanent invariant",
    "Score-level transfer validated; Gebiet-grain narrative appropriateness is a domain-expert call for the paired sign-off",
    "Publishing Hamburg in gentrification_index still requires a separate R4 dual sign-off (per #125) not granted here"
  ],
  "recommendations": [
    "Integrate into develop once the paired gentrification-domain-expert sign-off also records PASS",
    "Track R4 (accepted_values widening to ['BER','HH']) as the follow-up publication-gate ticket with its own fresh dual sign-off",
    "Revisit the 30 floor when onboarding any future city with a materially different POI-density profile"
  ]
}
```

**Verdict: PASS**

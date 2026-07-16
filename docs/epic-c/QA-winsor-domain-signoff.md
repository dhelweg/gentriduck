---
task: QA-winsor / #268 — Winsorize dynamism_score at ±3 SD
author: gentrification-domain-expert
date: 2026-07-16
branch: feature/268-qa-winsor
---

# Domain sign-off — QA-winsor dynamism_score winsorization

- **Branch:** `feature/268-qa-winsor`
- **Issue / task:** #268 [QA-winsor].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Paired gate:** geo-data-scientist (statistical-soundness) — see `docs/epic-c/QA-winsor-geo-signoff.md`
  (verdict PASS). This is the domain half of the R-C1 dual sign-off.
- **Artefacts reviewed:** `transform/macros/winsorize.sql`; the diffs to
  `int_poi_status_dynamism.sql` and `int_poi_status_dynamism_pre2021.sql`; the four prior sign-offs
  this ticket closes (`C4-geo-signoff.md`, `C5-geo-signoff.md`, `C6-geo-signoff.md`,
  `G2-geo-signoff.md`); `docs/methodology/index-definition.md` §2.4 (D3 dynamism definition).

## What actually changed (scoping the review)

`dynamism_score` continues to mean exactly what it meant before: a within-year cross-sectional
z-score of a PLR's year-over-year change in its share of city-wide POI count (the C5-approved
completeness-bias control). Nothing about **what the indicator measures, what it is a proxy for,
or how it is interpreted in prose** has changed. The only change is that the numeric value is now
clipped to `[-3, 3]` before it reaches any downstream consumer, with the unclipped value retained
as `dynamism_score_raw` for diagnostics only.

## Does bounding the tail of a statistical proxy change or weaken its meaning as a gentrification-precursor signal?

**No — if anything it strengthens the indicator's fitness for public-facing use.** The theoretical
claim `dynamism_score` operationalizes (Thesis §3.2; Zukin's commercial "boutique-ification" as a
precursor; Lees/Slater/Wyly's retail-upgrading literature) is an *ordinal, relative* one: does this
area's commercial-amenity composition change faster than the city-wide average, in which direction,
and by roughly how much. A handful of PLR-years sitting at +13 to +21 SD (per C6's count and the
geo-DS sign-off's rebuilt-warehouse figures) do not represent a stronger or more meaningful signal
than a PLR at +3 SD in this framework — they are near-certainly artefacts of a small POI denominator
(a PLR with very few mapped POIs where one new café changes its share disproportionately), not
evidence of 4-7x more "real" gentrification pressure than an already-extreme +3 SD case. Presenting
an unbounded +21 SD figure on a map legend or in a composite sum risks the opposite of the intended
communication: it visually swamps genuinely high-but-bounded signals elsewhere in the city and
invites a reader to over-interpret a statistical artefact as an extraordinary event. Winsorizing
removes exactly this false precision without changing the sign or the qualitative
above/below/at-average reading for any PLR-year.

## Does this affect the "improving ≠ unambiguously positive" framing, or any mover-facing / public copy?

**No live public copy makes a claim that depends on an unbounded dynamism_score value.** I checked
the E-series findings docs (`docs/epic-e/*-findings.md`) that consume `dynamism_score`: their
classification/typology narratives are threshold- and sign-based (`positive`/`neutral`/`negative`
dynamism class, or ordinal `dynamik_index`/typology-stage buckets), not magnitude-quoting. The I20
mover-facing "inform, never recommend" framing (#244) is untouched — this ticket does not touch any
amenity-count display logic. The G2 public methodology page note this ticket lands
("winsorization implemented") is a factual correction of the page's own prior "pending" caveat, not
a new claim.

## Any concern about suppressing a genuine extreme event (e.g. a real, fast displacement-adjacent commercial turnover in one PLR)?

**Addressed by the raw column, and not a live risk for descriptive/typology use.** Because
`dynamism_score_raw` is retained unclipped, no information is discarded — an analyst investigating a
specific PLR can always recover the pre-winsorization magnitude. For the index's actual current
use (typology classification via sign/threshold rules in `int_gentrification_ts`, and cross-sectional
comparison across PLRs), a winsorized value is the theoretically *more* correct one: the classification
rules were never designed to distinguish "very fast" from "extremely fast" — they only need the
correct side of a threshold, which winsorizing preserves (clipping never flips a sign or crosses a
threshold boundary inward from where the raw value already was, since real threshold cuts documented
in `index-definition.md` sit well inside ±3).

## Verdict

**PASS.** No domain-theory concern. The change is a statistical robustness treatment on top of an
already-approved indicator definition; it does not alter what the indicator claims to measure, does
not affect any currently-published public-facing narrative or mover-facing framing, and retains full
information (via `dynamism_score_raw`) for any future analysis that might need the unclipped value.

```json
{
  "verdict": "pass",
  "rationale": "Winsorizing dynamism_score at +/-3 SD is a statistical robustness treatment, not a redefinition of the D3 dynamism proxy or its theoretical grounding (Thesis Sec3.2; Zukin/Lees-Slater-Wyly commercial-upgrading literature). No currently-published finding or mover-facing copy quotes an unbounded dynamism_score magnitude; typology classification is threshold/sign-based and unaffected since documented cut points sit well inside +/-3. The raw value is retained for diagnostics, so no information is lost.",
  "risks": [
    "None identified specific to domain framing; the geo-DS sign-off's downstream-composite risk (dynamism_score-derived sums will differ for previously-extreme PLR-years) is a statistical, not theoretical, consideration"
  ],
  "recommendations": [
    "If a future ticket investigates a specific extreme PLR-year narratively (e.g. a case-study writeup), cite dynamism_score_raw explicitly rather than the winsorized value, and flag the small-POI-denominator caveat"
  ]
}
```

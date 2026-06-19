# R-A3 Geo-Data-Scientist Methodology Sign-off

- **PR:** #90 (`feat/66-mss-ingestion`)
- **Issue / task:** #66 / R-A3 — Berlin MSS (Monitoring Soziale Stadtentwicklung) Status/Dynamik ingestion
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Date:** 2026-06-19
- **Artefacts reviewed:**
  - `ingestion/berlin/mss/ingest_mss.py`
  - `transform/models/staging/stg_berlin_mss.sql`
  - `transform/models/staging/schema.yml` (`stg_berlin_mss` block)
  - `transform/tests/test_mss_plr_row_count.sql`
  - `transform/seeds/seed_mss_expected_counts.csv`
  - `docs/adr/0006-berlin-mss-data-source.md`

This is methodology-bearing work: `stg_berlin_mss` becomes the **primary ground-truth outcome
variable** for R-A1 (the keystone re-grounding task). The assessment below weights *meaning*
(directional correctness, comparability, exclusion rules) over code style.

---

## Assessment of the five methodology questions

### a. Dynamik code mapping {1→1, 3→2, 5→3} (positiv / stabil / negativ) — semantically correct?

**Yes, with one verifiability condition.** The official MSS reports confirm the Dynamik-Index has
exactly **three classes in the order positiv → stabil → negativ** (SenSBW MSS 2023/2025 report
text: "drei Klassen des Dynamik-Index: positiv, stabil, negativ"). The mapping is *order-preserving
and monotone*: WFS odd-step codes {1,3,5} collapse to the dense, ordinal {1,2,3} that the model
documents as 1=positiv / 2=stabil / 3=negativ. The direction (positiv is "best", negativ is "worst"
for social status, and is the gentrification-relevant upward-pressure end) is preserved. The one gap:
the *odd-step {1,3,5} ordering itself* (that di_n=1 is specifically positiv, not negativ) is **not
enumerated in any public MSS technical description I could retrieve** — it rests on the ingestion
author's inspection of live WFS attribute values. See Condition C1.

### b. Boundary-vintage handling (`lor_pre2021` for ≤2019, `lor_2021` for ≥2021) — sound for a longitudinal series?

**Yes, methodologically sound and correctly implemented.** The 2017→2021 LOR redistricting changed
the PLR universe from 447 to 542 polygons; tagging each edition with its contemporaneous vintage and
joining to the matching `stg_berlin_lor` snapshot is the correct way to avoid silently comparing
non-coterminous units. The `lor_vintage` column, the per-vintage `seed_mss_expected_counts`, and the
447/542 row-count test all align with the published schemes. **Caveat to document for R-A1 and the G2
methodology page:** any PLR-level **cross-edition delta spanning the 2019→2021 break is not
unit-stable** — the PLR keys are not identical entities across the boundary. Such comparisons must go
through the LOR 2017↔2021 crosswalk (ADR-0003 open question #3 / ADR-0006 open question #3), or be
restricted to within-vintage windows (≤2019 *or* ≥2021). Because the 2018 thesis sits on the pre-2021
scheme, Epic B's directional revival should use the 447-PLR editions (2013–2019) for its reference
comparison and treat 2021+ as the forward extension.

### c. Using the published Status/Dynamik *classes* (not raw indicators) as the R-A1 outcome — defensible?

**Yes — and it is the methodologically preferable choice.** Three reasons. (1) **Authority:** the
classes are the Senate's own official classification; grounding the index on them makes the outcome
citable and governed (ADR-0004 governed-index story) rather than an ad-hoc reconstruction. (2)
**Thesis fidelity:** the 2018 thesis used the MSS social-status measure as its main gentrification
proxy, so the published class is the like-for-like outcome. (3) **Robustness to indicator drift:** the
index-indicator *input set changed* (3 indicators ≤2021, 4 from 2023 — single-parent-household
children added). Consuming the *published classes* rather than re-deriving from raw indicators means
R-A1 inherits the Senate's intended cross-edition comparability and does not have to re-solve the
incomparable-inputs problem. The trade-off — class boundaries are quantile/expert cut-points, so the
outcome is **ordinal, not interval** — is acceptable but constrains downstream modelling (see C2).

### d. Uninhabited PLR rows (null indices) — handled correctly?

**Yes.** Uninhabited Planungsräume carry the WFS sentinel −9999, which the adapter maps to `null`
across all three indices while *preserving the PLR key row* (good — it keeps the area universe
complete for joins). Downstream tests are correctly guarded: `not_null` on status/dynamik uses
`where area_code is not null and gesamtindex is not null`, and `accepted_values` uses
`where <col> is not null`, so uninhabited rows do not spuriously fail. **For R-A1 these rows must be
excluded from regression/calibration** — they have no outcome and no resident population, so including
them would be a structural-missingness leak. They should be filtered (`where gesamtindex is not null`,
equivalently all three indices non-null) before any fit, and their count reported in the methodology
write-up for transparency. This is a *consume-side* rule, correctly enabled by the staging design.

### e. Gesamtindex two-digit encoding (11,13,…,45) — correctly interpreted?

**Yes, interpretation is correct; internal-consistency is asserted only by convention, not by test.**
The 12 valid codes {11,13,15,21,23,25,31,33,35,41,43,45} factor cleanly as **tens digit = Status
class (1–4)** and **units digit = Dynamik WFS code (1,3,5)** — e.g. 23 = Status mittel + Dynamik
stabil. This is the faithful preservation of the official MSS group code and is the right call over an
invented 1–12 ordinal (the SPEC's "1–12" is a simplification, correctly noted in the adapter
docstring). The interpretation depends on the same {1,3,5}=positiv/stabil/negativ ordering as (a), so
it shares Condition C1. Note there is currently **no test asserting `floor(gesamtindex/10) ==
status_index` and `gesamtindex mod 10 ∈ {1,3,5}` consistent with `dynamik_index`** — see
Recommendation R2; such a test would simultaneously close most of C1 at zero marginal data cost.

---

## Verdict

```
Verdict: PASS WITH CONDITIONS
```

**Rationale.** The ingestion and staging design is methodologically sound: directionality of the
Dynamik mapping is monotone and matches the official three-class ordering; the boundary-vintage seam
is handled correctly with the right longitudinal caveat; using the official published classes as the
R-A1 outcome is the preferable, citable choice; uninhabited rows are preserved-but-nulled and
correctly excludable; and the Gesamtindex code is faithfully retained. The conditions below are not
defects in *meaning* but **verification and consumption guardrails** required because (i) the exact
WFS {1,3,5} code ordering is not confirmable from public documentation, and (ii) the outcome is
ordinal and carries a vintage break that R-A1 must respect.

### Conditions (must be satisfied before / as part of R-A1 consumption)

- **C1 — Confirm the {1,3,5} Dynamik (and units-digit) ordering against the published class
  distribution.** ADR-0006 Decision 6 promised reconciliation of per-class *counts* against the
  official MSS report; the implemented test (`test_mss_plr_row_count.sql`) currently checks **total
  PLR row count only**, which cannot catch a reversed or permuted Dynamik mapping. Add a
  per-edition **class-distribution reconciliation** (count of PLR per Dynamik class, per Status
  class) against the report's published distribution table, at least for one firm edition (2023 or
  2025). If the positiv/stabil/negativ counts match, C1 is fully discharged. Until then, treat the
  Dynamik *direction* as inspection-confirmed, not source-documented.

- **C2 — Treat the outcome as ordinal in R-A1.** Status (1–4) and Dynamik (1–3) are ordered classes
  with non-interval cut-points. R-A1 must use ordinal-appropriate methods (ordered logit, or
  binary/AUC framing such as "high-status-loss vs not"), or justify any cardinal treatment. Do not
  average the class codes as if metric. Metrics vs the 2018 baseline (AUC / F-weighted) should be
  computed within a single LOR vintage.

- **C3 — Exclude uninhabited PLRs from any fit/calibration** (`where gesamtindex is not null`), and
  report the excluded count per edition in the methodology write-up.

- **C4 — Do not compute PLR-level deltas across the 2019→2021 boundary** without the LOR crosswalk.
  Restrict directional Epic-B revival comparisons to the pre-2021 (447-PLR) editions; treat 2021+ as
  the forward extension. Flag this discontinuity on the G2 methodology page.

### Recommendations (non-blocking)

- **R1 — Document indicator-definition drift** (3→4 index indicators from 2023) in the G2
  methodology page as a known, non-smoothed discontinuity, per ADR-0006 Consequences. The published
  classes remain "comparable in spirit"; do not silently treat the 2023+ series as identically
  constructed to ≤2021.
- **R2 — Add a cheap internal-consistency dbt test** on inhabited rows:
  `floor(gesamtindex/10) = status_index` and `(gesamtindex % 10) ∈ {1,3,5}` with the units digit
  consistent with `dynamik_index` via {1→1,3→2,5→3}. This catches mis-coded editions and largely
  closes C1 without any external data.
- **R3 — Capture per-edition WFS attribute-name mappings** (ADR-0006 open question #2) where older
  editions diverge from `si_n/di_n/sdi_n`, so best-effort 2013/2015/2017 ingestion is auditable.
- **R4 — Record the R-A1 grounding-target decision** (ADR-0006 open question #4: 4-class Status vs
  12-group Gesamtindex as the primary target). My recommendation: ground on the **Status-Index** as
  the primary social-status outcome (it is the thesis's gentrification proxy) and use the **Dynamik**
  class as a secondary directional/validation signal — keep both available, decide in R-A1's own
  methodology note.

---

*Methodology gate (R-C1): this is the geo-data-scientist sign-off. A
`gentrification-domain-expert` domain sign-off is also required before the PM may merge.*

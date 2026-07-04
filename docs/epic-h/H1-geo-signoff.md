# H1 Geo-Data-Scientist Sign-Off

- **Task:** H1 #40 — Hamburg methodology-gated integration slice (ADR-0014 open question #5:
  two-grain reconciliation) + POI/index wiring.
- **Date:** 2026-07-01
- **Verdict: PASS WITH CONDITIONS**

The two-grain reconciliation approach (uniform Stadtteil→Gebiet inheritance via a name-matched
crosswalk) is a defensible, honestly-documented, and — critically — **correctly labelled**
simplification relative to ADR-0014's stated preference for "a defensible areal/proportional
method." It is not the ideal method, but given the actual data available in the ingested source
set (no Gebiet-level population weight), it is close to the best achievable without inventing an
unsupported weight. I approve integration on the conditions below, all of which are either already
satisfied in the SQL/schema or are documentation-only follow-ups that do not block `develop`
integration but do block **publication** (G2 methodology page).

---

## Spatial-method assessment

### 1. Name-matched crosswalk (Gebiet → Stadtteil)

**Sound as an administrative-nesting fact, not a statistical estimate.** A statistisches Gebiet is
by German municipal-statistics convention always wholly contained within exactly one Stadtteil —
this is a hierarchical containment relationship, not something requiring geometric inference. Using
`stg_hamburg_sozialmonitoring.stadtteil_name` (an informational field already correctly excluded
from Sozialmonitoring's own outcome-variable join key, per ADR-0014 Pillar-2 role discipline) as the
crosswalk source is a reasonable reuse of already-ingested data rather than requesting a new source.

**Risk — inner join silently drops unmatched names.** `gebiet_to_stadtteil_code` in
`int_ewr_socioeco_hamburg_disagg.sql` is an `INNER JOIN` on
`lower(trim(stadtteil_name)) = lower(trim(area_name))`. If Sozialmonitoring's free-text Stadtteil
name and the geometry pillar's official Stadtteil `area_name` diverge even slightly (abbreviation,
alternate historical name, a hyphenation difference — common in German municipal naming, e.g.
"St. Pauli" vs "St.Pauli", "Hamburg-Altstadt" vs "Altstadt"), that Gebiet's EWR indicators will be
silently NULL rather than erroring. **Condition 1 (blocking real-data ingestion, not `develop`
integration):** when real Sozialmonitoring + geometry data is ingested, run a coverage check
(matched Gebiete / total Gebiete) and log/fail loudly if match rate is materially below 100%. This is
a straightforward assertion the data-engineer should add as a dbt test once real parquet exists — I
would want to see actual name strings before specifying the exact normalization rule (e.g. whether
`replace(name, '.', '')` or a Levenshtein-distance fallback is warranted), so I am not blocking this
slice on it, but it must land before the Hamburg composite is used in any published analysis.

### 2. Uniform inheritance (no proportional/areal split)

This is the one point where I differ from ADR-0014's stated preference ("joining EWR-style Stadtteil
fields down to statistische Gebiete only where a defensible areal/proportional method applies") —
but I agree with the data-engineer's documented reasoning that a proportional split would require
inventing a weight (e.g. borrowing Sozialmonitoring's own population column) that the role-discipline
rule (outcome/predictor separation, ADR-0014 Pillar 2, mirrors ADR-0006 decision 6) correctly forbids
using here. Given the actual constraint, **uniform inheritance is the honest choice: it makes no
claim about within-Stadtteil variance it cannot support, rather than fabricating false precision from
a borrowed weight.**

**This does introduce a real, asymmetric MAUP cost that must be surfaced, not just mentioned in a SQL
comment:** ~104-105 Stadtteile → ~941-945 Gebiete means every Gebiet-level EWR composite is a
9x-coarsened copy of its Stadtteil, while the **outcome variable** (Sozialmonitoring) and the **POI
predictor** (OSM, once real data lands) both retain full Gebiet resolution. This creates a structural
resolution mismatch *between predictors of the same model*: D3 (POI) varies at Gebiet grain, D4 (EWR)
is constant within a Stadtteil. In any regression that includes both D3 and D4 as covariates
(mirroring Berlin's E1/E2 framework), D4's coefficient will be estimated off only ~104-105 independent
values, not ~941-945 — **effective degrees of freedom for D4 is Stadtteil count, not Gebiet count.**
This is a standard change-of-support problem (Gotway & Young 2002) and is not a defect in this slice,
but any downstream E1/E2-equivalent Hamburg regression MUST cluster standard errors at the Stadtteil
level for D4-involving specifications, or the model will understate D4's standard errors by
~sqrt(9)≈3x. **Condition 2 (blocking any future E1/E2 Hamburg regression, not this integration
slice):** whoever builds the Hamburg equivalent of E1/E2 must either cluster SEs at Stadtteil grain
for D4 terms or aggregate the whole regression to Stadtteil grain for any specification involving D4.
Flag this in the model's own header too (see recommendation below) so it is not lost between now and
that future ticket.

### 3. Composite construction (3-indicator z-score mean)

Z-score methodology is unchanged from `int_ewr_socioeco`'s approved approach (mean of
per-indicator z-scores, NULLIF(stddev,0) degenerate-year guard) — sound, no new statistical
technique introduced. Restricting to the 3 indicators that are actually available
(`age_under18_share`, `foreigners_share`, `unemployment_share`) rather than fabricating the missing
2 is correct data discipline.

**Cross-city magnitude non-comparability is correctly and thoroughly documented** in the SQL header
and schema.yml — this is exactly the caveat that must survive to the G2 methodology page. I want to
be explicit for the record: **do not let a future ticket compute a naive Berlin+Hamburg pooled
z-score or pooled regression coefficient on `ewr_composite` without re-deriving it from a common
indicator subset.** The pipeline currently keeps the two composites in separate, clearly-labelled
columns per city — good; keep it that way.

### 4. CRS / spatial join reuse (int_osm_poi_hamburg, unchanged this slice)

Not re-reviewed here — already approved (EPSG:25832 native, ST_Within predicate reused from Berlin's
C3-join, prior slice). No new spatial-join code in this integration slice.

### 5. Ordinal mapping (Sozialmonitoring Status/Dynamik → numeric)

Label-for-label correspondence (hoch→1...sehr niedrig→4; positiv→1, stabil→2, negativ→3) is the
correct, minimal-assumption mapping — it makes no claim about interval-scale equivalence beyond what
Berlin's own MSS numeric encoding already assumes (both are ordinal, and the model comments correctly
say so). I defer the *theoretical* fidelity of applying Berlin's exact D1×D2 typology matrix
(`typology_case`) to Hamburg's differently-constructed Status/Dynamik pair to the domain-expert
review — my read is that reusing the matrix mechanically is statistically consistent (same numeric
domain in, same case logic out) but whether the *substantive* stage labels ("active-gentrification"
etc.) mean the same thing given Hamburg's 3-year Dynamik window is a domain question, not a spatial-
method one.

### 6. Graceful degradation / build verification

Verified: `uv run poe build` reported 568/574 PASS, 6 warnings (all pre-existing/expected —
Hamburg empty-stub warnings from this no-network environment, plus 2 unrelated pre-existing
warnings), 0 errors, 0 new warnings introduced by this slice. The zero-row graceful-degradation
path was exercised for real in this review (no live Hamburg data available in this environment) and
the models correctly return typed empty results throughout the new chain rather than erroring.

---

## Conditions (do not block `develop` integration; DO block real-data ingestion / publication)

1. Add a Gebiet↔Stadtteil crosswalk match-rate assertion once real Sozialmonitoring + geometry
   parquet exist (target: ≥98% match; investigate and fix normalization for any residual mismatch
   before trusting the composite).
2. Document the Stadtteil-grain effective-N / clustering requirement for D4 in any future Hamburg
   E1/E2-equivalent regression ticket (add to that ticket's acceptance criteria when filed).
3. Carry the 3-indicator-vs-5-indicator and uniform-inheritance MAUP-cost caveats verbatim into the
   G2 methodology page when Epic G lands (already well-documented in SQL comments — this is a
   "don't lose it" note, not new work).

None of these require code changes to integrate this slice into `develop` — they are real-data and
publication-time gates, consistent with how B7/B9/C5's own signoffs handled synthetic/no-network-data
review cycles.

**Verdict: PASS**

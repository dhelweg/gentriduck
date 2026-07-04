# Gentrification Domain Expert Sign-off: B9b (#119) — EWR Pre-2014 Panel Extension

- **Scope:** B9 #119 — `int_ewr_socioeco` partial composite + `int_ewr_lead_lag` backward
  extension using 3-indicator reduced composite (no foreigners_share / migration_background_share)
  for reference_year 2008-2013.
- **Operationalizes:** Thesis §4.2 (EWR composite vulnerability index), Döring-Ulbricht
  vulnerability indicator set, Dangschat invasion-succession theory (social cycle leads amenity).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-30
- **Branch:** b119-ewr-pre2014-ingestion → develop
- **Geo-DS verdict:** PASS WITH CONDITIONS (conditions C-1, C-2, C-3 noted)
- **Verdict:** PASS WITH CONDITIONS

---

## 1. Theory-fidelity assessment

### Indicator selection for partial composite

The thesis (§4.2) constructed the EWR composite from five vulnerability indicators based on the
Döring-Ulbricht operationalization of social susceptibility to gentrification:

| Indicator | Thesis code | Available pre-2014? |
|---|---|---|
| foreigners_share | k11 = E_A / E_E | NO — 12A series starts 2014 |
| age_under18_share | D_U5/dau5 proxy | YES |
| mean_age_years | ea (midpoint-weighted) | YES |
| migration_background_share | mh = MH_E / E_E | NO — EWRMIGRA starts 2014 |
| residence_duration_5y_share | d2 = DAU5 | YES |

The three available indicators (age_under18, mean_age, residence_5y) are all defensible markers
of socio-economic vulnerability in the Dangschat/Döring-Ulbricht sense: younger populations
(more children), older populations (lower residential mobility), and long-residence populations
(stabilized, lower-turnover neighborhoods) are each associated with areas that have NOT yet
experienced gentrification pressures. Their combination as a reduced vulnerability composite is
theoretically coherent.

The two missing indicators — foreigners_share and migration_background_share — are, however,
the most directly tied to the gentrification *displacement* mechanism in the Berlin context
(Döring-Ulbricht, Holm). The thesis's own findings identified E_A (foreigners) as the strongest
predictor in the cross-sectional index. Their absence substantially weakens the partial
composite's ability to discriminate gentrified from non-gentrified areas. This is unavoidable
given the data situation, but must be clearly communicated.

### The pre-2014 EWR panel in the Berlin gentrification chronology

The 2008-2013 period in Berlin was characterized by the beginning of gentrification pressure in
inner-city neighborhoods (Mitte, Prenzlauer Berg late-stage completion, early Neukölln/Kreuzberg
pressure). MSS data is available from 2013 onward for this era via the thesis-era pre-2021 LOR
scheme. Extending the EWR panel to 2008 allows weak-signal precursor analysis but the partial
composite should not be used to claim directional findings about foreigners displacement or
migration-background change, as those indicators are absent.

**Condition D-1 (no foreigners/migration claims from partial composite):** No finding from the
partial composite (any_endpoint_partial=TRUE rows) should be interpreted as evidence about
foreigners displacement or migration-background change pre-2014. The only valid claims are about
age structure and residential duration patterns.

**Condition D-2 (public framing):** If the pre-2014 extension is surfaced in any public output
(G2 methodology page, E3 narratives), it must be labeled "reduced-indicator baseline (2008-2013):
age and residential-stability only; displacement indicators not available before 2014."

### Cross-era pooling prohibition

The `any_endpoint_partial` exclusion filter in `int_ewr_lead_lag` is the correct mechanism for
preventing cross-era pooling in H2/H3 regressions. The partial composite omits the thesis's
strongest predictor (foreigners_share, k11). Any H2/H3 coefficient estimated from partial-
composite pairs would not be comparable to the 2014-2020 thesis-era coefficients, as the
composite definition changes at the boundary. The exclusion filter must remain in the E1 analysis
and must be documented in regression output tables.

**Condition D-3 (E1 analysis filter explicit):** The E1 regression script must explicitly apply
`WHERE any_endpoint_partial = FALSE` for all main H2/H3 models. If sensitivity analysis includes
partial-composite rows, it must be reported in a clearly labelled supplementary table with the
indicator-absence caveat.

---

## 2. Data sourcing assessment

EWR 2008-2013 editions are from the Amt für Statistik Berlin-Brandenburg open-data portal
(CC BY 3.0 DE). The same source as 2014-2020 editions. No new data source introduced. The
absence of E_A (12A Matrix) pre-2014 is confirmed by the Statistik Berlin-Brandenburg
publication catalog — the Ausländer series is explicitly documented as starting 2014. This is
an inherent data gap, not an ingestion error.

---

## 3. Ethics and framing

The partial composite should not be used to make claims about vulnerability or gentrification
risk for specific neighborhoods in the pre-2014 period on the public website (Epic G) without
the missing-indicator caveat being prominently displayed. The EWR series is person-register
data aggregated at PLR level — no individual privacy risk, but the partial composite gives a
systematically incomplete picture of vulnerability (misses the foreigners dimension most
associated with displacement in Berlin literature).

---

## 4. Conditions summary

**D-1:** No findings from partial-composite pairs should be interpreted as evidence about
foreigners displacement or migration-background change pre-2014.

**D-2:** Public output must label pre-2014 composite "reduced-indicator baseline (2008-2013):
age and residential-stability only."

**D-3:** E1 regression script must apply `any_endpoint_partial = FALSE` filter for all H2/H3
main models; supplementary tables if sensitivity analysis used.

Conditions C-1, C-2 from geo-DS sign-off are also carried forward.

---

## 5. Verdict

**Verdict: PASS WITH CONDITIONS**

The B9b implementation is theoretically coherent for an exploratory backward extension. The
partial composite is clearly flagged, the regression exclusion logic is correct, and the
implementation does not introduce any unsound cross-era pooling. Conditions D-1 through D-3
must be carried to E1 analysis and the G2 methodology page before any public output uses the
pre-2014 panel. Integration into `develop` is cleared.

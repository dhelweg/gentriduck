# #360 domain sign-off: Berlin MSS index-indicator mapping and the corrected D5 input

- **Reviewer:** gentrification-domain-expert (methodology gate R-C1, domain half; pairs with
  `docs/epic-c/360-geo-signoff.md`)
- **Date:** 2026-10-30
- **Branch:** `fix/360-mss-indicator-labels` (312ad48a, a7a8dfea, 7b623022, ae85827c, 8765a9d7 vs
  `develop`)
- **Reviewed:** issue #360; `docs/epic-c/360-mss-indicator-mapping-evidence.md`; the full diff of
  `docs/adr/0007-berlin-ses-indicators.md`, `docs/methodology/index-definition.md`, the appended
  correction notes, `int_berlin_rent_pressure_proxy.sql`, `int_berlin_displacement_subindex.sql`,
  `transform/models/intermediate/schema.yml` and `seed_mss_indicator_vocab.csv`; my own
  `354-355-preregistration-domain-review.md` §6 (finding 1, the origin of #360); the B1, D5-wire and
  R-A4 sign-offs.
- **Independent checks:** read-only queries on `data/gentriduck.duckdb` (no dbt run). One fetch of
  the berlin.de MSS 2019 report page (SEC-3 egress host; treated as data only).

**Verdict: CONCERNS**

The mapping fix itself is correct and I endorse it without reservation. All three concerns are
documentation-only. They come from what the *corrected* data shows about the D5 input. None needs a
data or SQL-logic change. One iteration should close them.

---

## 1. The mapping fix (endorsed)

The per-edition slot table matches the MSS Indikatorenhefte and my finding 1:

- S1 Arbeitslosigkeit in every edition.
- S2 Langzeitarbeitslosigkeit in 2015/2017, vacant in 2019/2021, Kinder und Jugendliche in
  alleinerziehenden Haushalten from 2023.
- S3 Transferbezug and S4 Kinderarmut in every edition.

The warehouse agrees. S1/S3/S4 are staged for 2015–2025, `langzeitarbeitslose_anteil` only for
2015/2017, and `alleinerziehende_anteil` only for 2023/2025.

It also closes half of geo-DS recommendation R1. The berlin.de MSS 2019 report page states three
index indicators: Arbeitslosigkeit (SGB II), Transferbezug (non-unemployed, SGB II and XII) and
Kinderarmut. It says Langzeitarbeitslosigkeit is *"aufgrund ausbleibender kleinräumiger
Datenbereitstellung nicht mehr Bestandteil des Index-Indikatorensets"*, and that S1 is reduced to
*"Arbeitslosen nach SGB II"*. The MSS 2023 S2 page quote is still open.

Mapping by `(edition, raw_attr)` through a seeded, page-cited vocabulary is the right design for
theory fidelity. The *meaning* of every column is now traceable to the official definition (R-C2).
That traceability is what failed before.

## 2. Decisions on the four questions

### Q1. New 2019/2021 coverage: accepted

The earlier NULLs were an artefact. The vacant S2 slot was read under the Transferbezug label. They
were not a real reporting gap. Verified read-only:

- `rent_pressure_proxy` is populated for 436 PLRs (2019, `lor_pre2021`) and 536 PLRs (2021,
  `lor_2021`).
- `displacement_subindex` gains reference year 2021: 536 PLRs, all `is_partial_availability`.

This reverses my B1 §d reading, which called the gap a "genuine reporting-window suspension". That
reading was wrong, and the B1 correction note says so correctly.

Conditions on the acceptance:

- The 2021 rows stay flagged partial (rent-pressure-only). They are not pooled with the 2009–2020
  turnover-only rows as one series. This agrees with geo-DS decision 1.
- The new 2021 row sits in the same `int_gentrification_ts` row as the MSS 2021 Status outcome.
  That makes the circularity disclosure in required change RC-1 more pressing.

### Q2. S3 alone, not S1 + S3

**Keep S3 Transferbezug alone as the "transfer stress" input.**

Theory first. Displacement pressure on benefit households in Berlin runs through the
*Kosten der Unterkunft* regime. Housing costs of SGB II/XII households are covered only up to the
AV-Wohnen ceilings. Above them comes a cost-reduction procedure, and in practice a forced move into
a shrinking low-rent stock (Holm 2010, 2014). In principle, all SGB II/XII recipients are therefore
in the target population, including registered unemployed SGB II recipients (S1). So S1 + S3 is not
absurd. I still reject it for four reasons:

1. **It is not a clean count.** S1 uses residents aged 15 to under 65 (to under the
   Regelaltersgrenze from 2021) as its denominator. S3 uses all residents. Adding or averaging them
   mixes bases.
2. **It would bring in the wrong population for 2017.** Before MSS 2019, S1 includes SGB III
   (Arbeitslosengeld I) recipients. Their benefit is insurance-based, not means-tested, and they are
   not bound by KdU ceilings. The 2017 Wohnlage snapshot is matched to MSS 2017, so S1 + S3 would
   carry a definition break into D5.
3. **S3 is the stronger construct for displacement vulnerability.** It covers pensioners on
   Grundsicherung (SGB XII), people with reduced earning capacity, Aufstocker (working poor) and
   children in Bedarfsgemeinschaften. These are the structurally low-income, low-mobility groups at
   the centre of the vulnerability literature (Döring & Ulbricht 2016). Older long-tenure tenants
   in particular face the largest gap between their old contract rent and the re-letting market.
   S1 is the more cyclical, labour-market signal.
4. **Adding S1 changes almost nothing.** Read-only check over matched PLRs:

   | Snapshot | n | ρ(S1, S3) | ρ(z_S3, mean(z_S1, z_S3)) | ρ(proxy as built, proxy with S1+S3) |
   |---|---|---|---|---|
   | 2017 | 436 | 0.960 | 0.988 | 0.987 |
   | 2019 | 436 | 0.966 | 0.990 | 0.983 |
   | 2021 | 536 | 0.958 | 0.989 | 0.985 |
   | 2023 | 536 | 0.955 | 0.987 | 0.984 |
   | 2026 | 535 | 0.954 | 0.987 | 0.975 |

   S1 would also add a second MSS-Status input to a predictor, which makes the circularity problem
   (RC-1) worse.

This agrees with geo-DS decision 2. The exclusion of the registered unemployed must be stated
wherever the input is described. The new `int_berlin_rent_pressure_proxy` header and schema.yml do
this.

### Q3. Theory framing of the corrected D5: the input framing is sound, the composite framing is not

The framing of the *input* is sound: S3 as an ability-to-pay / transfer-dependence signal,
vulnerability-positive, with no sign flip. The corrected data shows two problems with how the
*composite* is described. Both were hidden while the input was the wrong indicator.

**(a) Circularity with the MSS outcome is now explicit and undisclosed.** S3 is a direct input of
the MSS Status index. ADR-0007 says so itself: "The Senate computes Status/Dynamik *from* these
indicators". Read-only:

- ρ(`z_transfer_stress`, same-edition MSS `status_index`) = 0.84 / 0.84 / 0.82 / 0.80 / 0.80 for
  snapshots 2017 / 2019 / 2021 / 2023 / 2026.
- ρ(`rent_pressure_proxy`, `status_index`) = 0.34–0.41.

D5 is a predictor-side column (ADR-0008). Under the binding R-A4 condition 1 firewall, a predictor
that contains a same-edition Status input must never predict the same-edition Status or Dynamik
class. I find no circularity note in `int_berlin_rent_pressure_proxy.sql`,
`int_berlin_displacement_subindex.sql`, `int_gentrification_ts.sql`, index-definition §5 (D5 row),
ADR-0019, or the B1/D5-wire sign-offs.

The old input (S2) was also a Status input in 2015/2017 and 2023+, so the risk is not new. But #360
now puts an MSS Status indicator into every populated D5 year, including the new 2021 year.

**(b) The documented meaning of a high `rent_pressure_proxy` no longer holds.** The docs say:
"high = above-median modelled rent combined with above-median transfer-dependency". This is in the
intermediate schema.yml `rent_pressure_proxy` description, in the polarity comment of
`int_berlin_displacement_subindex.sql` (a line this PR edited), and in the index-definition §5 D5
row. My B1 §a/§b endorsed the same *co-location* reading. It assumes the two components are not
strongly anti-correlated. With the correct S3 input they are:

| Snapshot | ρ(z_rent_rel, z_transfer_stress) | Share of PLRs with both z > 0 | Share of top-20 % proxy PLRs with both z > 0 | Old (mis-mapped) input: ρ / top-20 % both > 0 |
|---|---|---|---|---|
| 2017 | −0.51 | 7.6 % | 21.6 % | −0.44 / 31.8 % (Langzeitarbeitslosigkeit) |
| 2019 | −0.63 | 8.0 % | 13.6 % | – (was NULL) |
| 2021 | −0.65 | 9.9 % | 15.7 % | – (was NULL) |
| 2023 | −0.63 | 9.9 % | 18.5 % | −0.23 / 56.5 % (single-parent share) |
| 2026 | −0.72 | 6.0 % | 8.4 % | −0.37 / 45.8 % (single-parent share) |

An equal-weight mean of z-scores is *compensatory*. When the two terms are anti-correlated, a high
value mostly means "very high on one term". After #360, the top quintile is a mix of two distinct
groups: high-rent, low-transfer PLRs (about 55–60 PLRs in MSS Status class 2) and low-rent,
high-transfer PLRs (about 25–35 in class 4). Only 8–22 % of the top quintile shows the co-location
that the documentation and the theory (rent pressure meeting a vulnerable resident base; Smith 1979,
Holm 2010) describe. The D5 values the D5-wire sign-off reviewed were built on the single-parent
share. They happened to be much closer to the documented reading (46–57 %) for the wrong reason.

This is a construct-validity finding about the aggregation rule, not about the #360 fix. The fix
belongs in a separate methodology-bearing ticket (RC-3). But this PR re-states the co-location
wording on corrected data, so the wording has to change here (RC-2).

**(c) Non-blocking framing refinements** (see N2): the KdU mechanism, Wohngeld, the 2023 Bürgergeld
Karenzzeit, and refugee entry into SGB II from June 2022.

### Q4. Correction notes: accurate; one gap left by Q3

I checked each appended note against the evidence doc and the warehouse.

- **ADR-0007:** accurate. "No decision changed" is right. The three-indicator core
  (unemployment, transfer receipt, child poverty) was always the right set of constructs; only the
  column binding was wrong.
  - Nit: in the Consequences bullet, "Editions through 2021 publish **3** index indicators … 2023+
    add a 4th" is not struck through. An inline correction follows it, but the other three
    corrected passages use strikethrough. See N1.
- **index-definition** §1.7, §4.4, §7.2 and the traceability row: accurate. The rule "never treat
  the two S2 constructs as one series" is the right addition.
- **R-A4 geo/domain, R-A1 geo/domain:** accurate. They correctly move the MISSING-not-zero rule
  from "transferbezug" to the vacant S2 slot and name the S1 + S3 + S4 core.
- **B1 geo/domain:** accurate on coverage and on what the input was at review time. The B1 domain
  note correctly leaves the S3-vs-S1+S3 question to this sign-off (answered in Q2).
- **D5-wire geo/domain:** accurate. The figures match evidence §5.3 (ρ 0.564 / 0.455; 316–347
  quintile changes; 2021 gains 536 partial rows).
- **H1 domain:** accurate. The conclusion about D1/D4 construct separation is unaffected.

**Gap:** the B1-domain and D5-wire-domain notes are accurate about the *input*. They do not record
that the co-location reading those reviews endorsed (B1 §a/§b; D5-wire D-2, "rent increases
translate directly into displacement pressure for transfer-dependent households") does not describe
the corrected composite. Covered in RC-2.

---

## 3. Required changes (to reach PASS)

All are documentation or SQL-comment changes. No data, logic or test change is required.

- **RC-1: circularity firewall disclosure.** State the following in the
  `int_berlin_rent_pressure_proxy.sql` header, the D5 comment block of
  `int_berlin_displacement_subindex.sql` (or `int_gentrification_ts.sql`), and the index-definition
  §5 D5 row, in equivalent words:
  - `z_transfer_stress` is MSS index indicator S3, a direct input of the MSS Status index (the D1
    outcome). ρ with the same-edition `status_index` is 0.80–0.84.
  - Under R-A4 condition 1, `rent_pressure_proxy` / `displacement_subindex` must not predict the
    same-edition MSS Status or Dynamik class, or a Dynamik window that contains the matched MSS
    edition.
  - Any lead-lag use must lag D5 by at least one non-overlapping edition and control for baseline
    Status level.
- **RC-2: correct the "co-location" reading.** Replace "high = above-median rent combined with
  above-median transfer-dependency" (or equivalent) in three places: the intermediate schema.yml
  `rent_pressure_proxy` description, the polarity comment in `int_berlin_displacement_subindex.sql`,
  and the index-definition §5 D5 row. The new text must say three things:
  - the composite is an equal-weight *compensatory* mean;
  - its two terms are strongly anti-correlated after #360 (ρ −0.51 to −0.72);
  - a high value therefore means high on either term or both, and is not evidence that high rent
    and high transfer dependence occur in the same PLR (only 8–22 % of the top quintile are above
    average on both).

  Also append one bullet each to the existing #360 correction notes in
  `B1-rent-pressure-domain-signoff.md` and `D5-wire-domain-signoff.md`. Each bullet says that the
  co-location reading endorsed there (B1 §a/§b; D5-wire D-2) does not describe the corrected
  composite, and points to this sign-off, §2 Q3(b).
- **RC-3: follow-up ticket.** Open a methodology-bearing issue: "D5 rent_pressure_proxy
  aggregation does not operationalize co-location (anti-correlated components after #360)". Link
  it from the model header. Options to assess with geo-DS:
  - a conjunctive rule, e.g. the minimum of the two z-scores, or gating on both being positive;
  - rent level conditional on S3, a residual "rent above what the social composition predicts",
    which is closest to rent-gap realization;
  - a KdU / AV-Wohnen ceiling-exceedance measure. This is the most directly grounded in the Berlin
    displacement mechanism, but it needs a new open source, so it needs an ADR.

  Until that issue is resolved, no mart, `analysis/*.py` script (including the #354 suite) or G2
  page may consume `rent_pressure_proxy` or `displacement_subindex`. Today nothing does (evidence
  §5.1, re-checked by grep). The integration of #360 itself is not blocked by the redesign.

## 4. Non-blocking recommendations

- **N1:** In the ADR-0007 Consequences bullet, strike through "Editions through 2021 publish **3**
  … 2023+ add a 4th" for consistency with the other corrected passages. Also add to Consequences
  the index-definition rule that the two S2 constructs (Langzeitarbeitslosigkeit ≤2017 and
  single-parent children 2023+) must never be spliced into one series.
- **N2:** Refine the "least capacity to absorb rent increases" wording (B1 §a, model header) when
  RC-3 is worked:
  - For SGB II/XII households, rent increases are paid by the state up to the AV-Wohnen ceiling.
    Their vulnerability is constrained housing choice and the risk of exceeding the ceiling, more
    than direct rent burden (Holm 2014).
  - Since 1 January 2023 the Bürgergeld one-year Karenzzeit covers actual housing costs for new
    recipients. This weakens that mechanism in the 2023/2025 editions.
  - Wohngeld households are low-income and directly rent-burdened, but they are not in S3. The
    group grew substantially with Wohngeld-Plus in 2023. This is a disclosed construct gap.
  - Ukrainian refugees moved into SGB II from June 2022. S3 in 2023/2025 therefore partly reflects
    refugee settlement geography, not only the long-tenure incumbent population the displacement
    literature centres on.
- **N3:** Geo-DS R1 is half closed by this review (MSS 2019, quoted in §1). The MSS 2023 S2 page
  (Indikatorenblätter S. 23) is still to be quoted into evidence §2.
- **N4:** For #354: build S composites from S1 + S3 + S4 only, as geo-DS R3 says. Do not use D5 as
  an H-suite predictor until RC-3 is resolved.

---

```json
{
  "verdict": "concerns",
  "domain_rationale": "The per-edition MSS slot mapping is correct, matches the Indikatorenhefte and my #354/#355 finding 1, and is now traceable through a page-cited seed. The new 2019/2021 coverage is accepted: the old NULLs were an artefact. S3 Transferbezug alone is the right transfer-stress construct, not S1+S3, because of the denominator mismatch, the non-means-tested SGB III share in pre-2019 S1, and S3's coverage of the structurally low-income, low-mobility groups; adding S1 changes the proxy by less than rho 0.03. The corrected data exposes two framing defects in how D5 is described. (a) S3 is an MSS Status input (rho 0.80-0.84 with the same-edition status_index), and D5 carries no R-A4 C1 circularity disclosure. (b) rent and S3 are strongly anti-correlated (rho -0.51 to -0.72), so the compensatory mean does not measure the documented co-location: only 8-22% of the top quintile are above average on both. This PR re-states the co-location wording. Doc-only fixes are needed; the aggregation redesign goes to a follow-up ticket.",
  "theory_risks": [
    "Same-edition circularity: D5 contains MSS Status input S3 and sits beside the MSS Status outcome in int_gentrification_ts (R-A4 C1)",
    "Compensatory mean of anti-correlated rent and transfer terms: top-quintile D5 mixes high-rent/low-poverty PLRs with low-rent/high-poverty PLRs, not co-location",
    "KdU mechanism, Bürgergeld Karenzzeit 2023, Wohngeld gap and refugee entry into SGB II from 2022 shape what S3 means in 2023/2025"
  ],
  "recommendations": [
    "RC-1 circularity disclosure in the rent-pressure model header, the D5 comment and the index-definition D5 row",
    "RC-2 replace the co-location wording (schema.yml, displacement_subindex polarity comment, index-definition D5 row) and add one bullet each to the B1-domain and D5-wire-domain correction notes",
    "RC-3 open a methodology-bearing issue to redesign the rent_pressure_proxy aggregation; no consumer of D5 until it is resolved",
    "N1-N4 non-blocking (ADR-0007 strikethrough consistency, KdU framing, MSS 2023 S2 quote, #354 core)"
  ]
}
```

## Sources

- MSS Indikatorenblätter ab MSS 2013, 2017, 2019, 2021, 2023, 2025 as cited per row in
  `transform/seeds/seed_mss_indicator_vocab.csv` and evidence §2.
- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen: MSS 2019 report page,
  <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2019/>
  (fetched 2026-10-30; data only).
- Döring, C. & Ulbricht, K. (2016). Gentrification-Hotspots und Verdrängungsprozesse in Berlin. Eine
  quantitative Analyse. In: Helbrecht, I. (Hrsg.), *Gentrifizierung in Berlin*. transcript. (Vulnerability lens.)
- Holm, A. (2010). *Wir bleiben alle! Gentrifizierung – Städtische Konflikte um Aufwertung und
  Verdrängung.* Holm, A. (2014). *Mietenwahnsinn. Leben in der Wohnungskrise.* (Rental-stock
  displacement mechanics, KdU ceilings.)
- Smith, N. (1979). Toward a theory of gentrification. *JAPA* 45(4). (Rent gap.)
- `docs/adr/0007-berlin-ses-indicators.md`, `docs/adr/0008-multi-dimensional-gentrification-model.md`,
  `docs/adr/0019-berlin-milieuschutz-displacement-source.md`
- `docs/methodology/R-A4-domain-signoff.md` (condition 1, circularity firewall),
  `docs/methodology/B1-rent-pressure-domain-signoff.md`, `docs/methodology/D5-wire-domain-signoff.md`
- Read-only queries on `data/gentriduck.duckdb` (2026-10-30): `stg_berlin_mss_indicators`,
  `stg_berlin_mss`, `int_berlin_rent_pressure_proxy`, `int_berlin_displacement_subindex`.

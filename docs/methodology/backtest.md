# B2 Back-Test Harness: Live Index vs Ground Truth

**Last run:** 2026-07-16
**Overall result:** ALL PASS

---

## Overview

This document records the results of the B2 ground-truth back-test harness, which validates the live gentrification index (`gentrification_index`, `live_data` variant, latest period) against two independent references:

1. **MSS Status/Dynamik classes** (official Berlin ground truth): the Senate's Monitoring Soziale Stadtentwicklung (MSS) provides biennial D1 Status and D2 Dynamik ordinals for every PLR (Planungsraum). The live index's `status_index` column directly encodes the MSS D1 ordinal (1=hoch/best … 4=sehr_niedrig/worst). Test A cross-validates `gentrification_index.status_index` (live_data variant) against `int_gentrification_ts.status_index` — the same MSS D1 class flowing through two independent model paths — using Spearman rank correlation.

2. **Known hotspot/coldspot/emerging-east PLRs** (`seed_gentrification_ground_truth`): a curated seed of Berlin PLRs with literature-based labels drawn from Döring & Ulbricht (2016), Holm & Schulz (2016), Dangschat (1988), the 2018 thesis (Helweg 2018), and direct MSS 2023/2025 class assignments. Tests B and C check whether labelled 'hotspot' and 'coldspot' PLRs appear in the expected tail of the status_index distribution. Test E (R-B2c, #278) checks whether labelled 'emerging-east' PLRs -- eastern-Berlin frontiers that do NOT fit the top-decile-deprived 'hotspot' shape -- meet a separate, dynamism-aware criterion instead.

## Methodology

### Data sources

- `gentrification_index` mart, `live_data` variant, latest available period
- `seed_gentrification_ground_truth` seed (LOR 2021 vintage PLR IDs)

### Polarity convention

The `status_index` in the `live_data` variant of `gentrification_index` is the MSS D1 ordinal cast to DOUBLE: `1.0 = hoch` (high status, least deprived) to `4.0 = sehr_niedrig` (lowest status, most deprived). **Higher `status_index` = more deprived = more pre-gentrification vulnerability.** This is the vulnerability-positive orientation defined in `docs/methodology/index-definition.md §5`.

This polarity is **inverse** relative to the 2018 thesis `status_summe` (where higher = better status). The `live_data` variant uses the native MSS numeric encoding without flipping. Cross-comparison with the 2018 thesis requires an explicit sign flip (index-definition.md §5 worked example).

### Pass thresholds and rationale

| Test | Threshold | Rationale |
|---|---|---|
| A: MSS agreement (rho) | rho > 0.3, p < 0.05 | Cross-validates gentrification_index.status_index against int_gentrification_ts.status_index. Both encode the same MSS D1 ordinal via different model paths; expected rho ~ 1.0. A threshold of 0.3 is conservative — any real pipeline alignment gives rho >> 0.3. A lower rho would indicate a vintage mismatch or polarity reversal. |
| B: Hotspot recall | >= 50% | Recall of 50% at the top decile is the minimum for a useful discriminator; chance performance at the 10% decile = 10% recall. A 50% threshold leaves room for completed-gentrification PLRs (now stable/established, not in top decile) without failing the test. |
| C: Coldspot recall | >= 50% | Same rationale as Test B. Stable outer-city PLRs should overwhelmingly appear at the low end of the status_index distribution. |
| D: Dynamism (D2) agreement (rho) | rho > 0.3, p < 0.05 | Cross-validates gentrification_index.dynamism_index against int_gentrification_ts.dynamik_index, mirroring Test A for the D2 dimension (R-B2b, #264). |
| E: Emerging-east recall (R-B2c, #278; STRICT criterion; NON-GATING as of round-2) | N/A -- reported, not gated | Applies the STRICT dynamism-aware criterion (D1=2 AND D2==1 'improving' AND under_milieuschutz) rather than the top-decile status_index criterion, matching the R-B2b domain sign-off's literal wording. Round-2 (condition C2, geo-DS + domain-expert sign-off): with the gated `emerging-east` positive set at n=1 (after the round-2 relabel, see below), a recall >= 50% pass/fail carries no statistical power. Unlike Tests B/C, this is NOT a decile test, so the "chance at the 10% decile" rationale does not transfer -- Test E's true citywide base rate is 22/535 = 4.1%. At this n, Test E is a descriptive archetype confirmation, not a powered recall gate; it is reported below but excluded from OVERALL. Promote to a gating test once the seed grows a defensible n (candidate pool: the 22 citywide strict-criterion matches). |

### Label semantics

- **hotspot**: PLR under active gentrification pressure or with documented high vulnerability (typically D1 status 3–4 = niedrig/sehr_niedrig). These areas are expected to appear in the top decile (most deprived = highest status_index). West-Berlin-shaped: deprivation and pressure coincide. Tested by Test B.
- **coldspot**: Stable, affluent outer-city PLR (typically D1 status 1 = hoch). Expected in the bottom decile (least deprived = lowest status_index).
- **mixed**: Transitional area or completed-gentrification PLR. Not expected to fall clearly in either decile; used for narrative context only.
- **emerging-east** (R-B2c, #278; scope tightened at round-2, condition C1): eastern-Berlin (Lichtenberg) gentrification **archetype** frontier at mittel status (D1=2), STRICTLY improving (D2==1) dynamism, under Milieuschutz protection -- currently only Roedeliusplatz. Deprivation and pressure do NOT coincide here (the R-B2b domain sign-off found no Lichtenberg PLR is both a documented frontier and top-decile deprived) -- this PLR is **not** expected in Test B's top decile, and is tested instead by the separate, dynamism-aware Test E (non-gating as of round-2; see the Pass thresholds table above).
- **emerging-east-watch** (R-B2c round-2, #278, condition C1): the three Lichtenberg PLRs (Victoriastadt/Kaskelkiez, Weitlingkiez, Frankfurter Allee Süd) originally folded into `emerging-east` but carrying D2=2 ('stabil') -- the R-B2b domain sign-off's own candidate table had already called these three "control", not archetype. Documented, Milieuschutz-protected mittel-status watch PLRs that structurally cannot meet an 'improving dynamism' criterion by design; tracked descriptively, **not** scored by Test E or any gate.

---

## Latest Results

**Run date:** 2026-07-16
**Index period:** latest available `live_data` PLR period
**PLRs in index:** 535 (status_index not null: 535)

### Test A — MSS agreement

Spearman rank correlation between `gentrification_index.status_index` (live_data variant) and `int_gentrification_ts.status_index` at the latest MSS edition. Both carry the MSS D1 ordinal via different model paths; a high positive rho confirms pipeline alignment.

- MSS edition used for cross-validation: 2025
- n (cross-validated pairs): 535
- status_index range: (1.0, 4.0)
- Distinct status classes: 4
- Spearman rho = **1.0000**, p = 0.0000
- Threshold: rho > 0.3, p < 0.05
- **Result: PASS**

*Spearman(gentrification_index.status_index, int_gentrification_ts.status_index) at MSS edition 2025. Cross-validates that the mart and the intermediate model agree on the MSS D1 ordinal. n_paired=535. Threshold: rho > 0.3, p < 0.05.*

### Test D — Dynamism (D2) agreement (R-B2b, #264)

Spearman rank correlation between `gentrification_index.dynamism_index` (live_data variant) and `int_gentrification_ts.dynamik_index` at the latest MSS edition. Mirrors Test A's design for the D2 (Dynamik) dimension: both columns carry the same MSS D2 ordinal via different model paths. Design confirmed by both geo-DS and gentrification-domain-expert (docs/methodology/R-B2b-geo-signoff.md, R-B2b-domain-signoff.md, both Verdict: PASS, #264).

- MSS edition used for cross-validation: 2025
- n (cross-validated pairs): 535
- dynamism_index range: (1.0, 3.0)
- Distinct dynamism classes: 3
- Spearman rho = **1.0000**, p = 0.0000
- Threshold: rho > 0.3, p < 0.05
- **Result: PASS**

*Spearman(gentrification_index.dynamism_index, int_gentrification_ts.dynamik_index) at MSS edition 2025. Cross-validates that the mart and the intermediate model agree on the MSS D2 ordinal (mirrors Test A's design for D1). n_paired=535. Threshold: rho > 0.3, p < 0.05 (design confirmed by geo-DS + domain-expert sign-off, docs/methodology/R-B2b-geo-signoff.md, R-B2b-domain-signoff.md).*

### Test B — Hotspot recall @ top 10%

Fraction of labelled `hotspot` PLRs from `seed_gentrification_ground_truth` that appear in the top decile (90th percentile and above) of `status_index`.

- n hotspot PLRs in seed: 8
- n found in gentrification_index: 8
- Top-decile threshold (status_index): 3.0
- n in top decile: 8
- Recall = **1.00** (8/8)
- Threshold: recall >= 0.5
- **Result: PASS**

#### Hotspot PLR details

| PLR ID | Name | status_index | status_class | In top decile | Source |
|---|---|---|---|---|---|
| 01300731 | Koloniestraße | 4.0 | pre-gentrification | Yes | Döring & Ulbricht 2016 |
| 01300732 | Soldiner Straße | 4.0 | improving-vulnerable | Yes | Döring & Ulbricht 2016 |
| 02100105 | Prinzenstraße | 4.0 | improving-vulnerable | Yes | MSS 2023 Status=4 |
| 02100106 | Wassertorplatz | 4.0 | pre-gentrification | Yes | MSS 2023 Status=4 |
| 08100104 | Wartheplatz | 4.0 | pre-gentrification | Yes | Döring & Ulbricht 2016 |
| 08100105 | Silbersteinstraße | 3.0 | pioneer-signal | Yes | Holm & Schulz 2016 |
| 08100207 | Rollberg | 4.0 | improving-vulnerable | Yes | Döring & Ulbricht 2016 |
| 08100521 | Schulenburgpark | 4.0 | pre-gentrification | Yes | Holm & Schulz 2016 |

### Test C — Coldspot recall @ bottom 10%

Fraction of labelled `coldspot` PLRs from `seed_gentrification_ground_truth` that appear in the bottom decile (10th percentile and below) of `status_index`.

- n coldspot PLRs in seed: 6
- n found in gentrification_index: 6
- Bottom-decile threshold (status_index): 1.0
- n in bottom decile: 6
- Recall = **1.00** (6/6)
- Threshold: recall >= 0.5
- **Result: PASS**

#### Coldspot PLR details

| PLR ID | Name | status_index | status_class | In bottom decile | Source |
|---|---|---|---|---|---|
| 05400942 | Alt-Gatow | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 05400944 | Kladower Damm | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400735 | Wannsee | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400737 | Nikolassee | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 06400844 | Dahlem | 1.0 | stable-established | Yes | MSS 2023 Status=1 |
| 11100101 | Dörfer Malchow-Wartenberg | 1.0 | stable-established | Yes | MSS 2023 Status=1 |

### Test E — Emerging-east recall (dynamism-aware, STRICT, NON-GATING) (R-B2c, #278)

Fraction of labelled `emerging-east` PLRs from `seed_gentrification_ground_truth` that meet the STRICT dynamism-aware criterion: mittel status (`status_index == 2`) AND IMPROVING dynamism only (`dynamik_index == 1`) AND under active Milieuschutz protection (`under_milieuschutz = true`). This **replaces** Test B's top-decile `status_index` criterion for this label -- run as its own test path, not merged into Test B's recall (see the diagnostic below for why). Design Option 1 of the R-B2b domain sign-off's follow-up recommendation (docs/methodology/R-B2b-domain-signoff.md), with the criterion **tightened at iteration-2 review** to the SPEC's literal "D2 (improving dynamism)" wording. **Round-2 (condition C2, geo-DS + gentrification-domain-expert dual sign-off, docs/epic-e/R-B2c-emerging-east-{geo,domain}-signoff.md): Test E is non-gating** -- its result is reported here but excluded from the OVERALL result above (see "Methodology resolution" below for the full rationale).

- n emerging-east PLRs in seed: 1
- n found in warehouse: 1
- n meeting criterion: 1
- Recall = **1.00** (1/1)
- Threshold: recall >= 0.5 (informational only; non-gating)
- **Result: PASS** (non-gating -- excluded from OVERALL, see condition C2)

#### Emerging-east PLR details

| PLR ID | Name | D1 status | D2 dynamik | Typology stage | Under Milieuschutz | Meets criterion | Source |
|---|---|---|---|---|---|---|---|
| 11300724 | Roedeliusplatz | 2.0 | 1.0 | active-gentrification | True | Yes | Dangschat 1988; R-B2b domain sign-off |

#### Diagnostic (non-gating): hotspot recall if merged with the eastern-Berlin frontier PLRs

This diagnostic is **not** a pass/fail gate and does **not** count toward the overall result above -- it exists only to make the R-B2b domain sign-off's prediction empirically checkable: does folding the eastern-Berlin frontier PLRs (`emerging-east` archetype + `emerging-east-watch` control, all 4 Lichtenberg PLRs) into `hotspot` and testing them against Test B's *unchanged* top-decile `status_index` criterion inflate or dilute recall?

- Top-decile threshold (status_index): 3.0
- Hotspot-only recall (current Test B, unchanged): **1.00** (8/8)
- Hotspot+eastern-frontier merged recall (hypothetical, NOT implemented): **0.67** (8/12)

*Diagnostic only (not a gate): if 'emerging-east' PLRs were folded into 'hotspot' and tested against Test B's unchanged top-decile status_index criterion, recall would move from 1.00 (8/8) to 0.67 (8/12) -- a dilution, not an inflation, confirming the R-B2b domain sign-off's prediction and the R-B2c decision to keep Test E as its own path rather than merge the labels.*

---

## Methodology resolution (R-B2c round-2, #278)

The iteration-2 independent review surfaced two open questions, both resolved at the round-2 geo-DS + gentrification-domain-expert dual sign-off (docs/epic-e/R-B2c-emerging-east-geo-signoff.md, docs/epic-e/R-B2c-emerging-east-domain-signoff.md, both Verdict: PASS with conditions). Neither was resolved unilaterally by the coder.

### Resolution 1 — strict D2 criterion kept; label split into archetype vs. watch (condition C1)

The R-B2b domain sign-off's literal recommendation (Item 2, recommendation 1) reads: *"D2 (improving dynamism) + Milieuschutz + Altbau"*. The first implementation (iteration 1) read this as "non-declining" (`dynamik_index` in {1, 2}), which an independent reviewer flagged as a silent, unilateral loosening with two quantified problems, verified against the live warehouse (MSS 2025, the 535 inhabited Berlin PLRs):

| Reading | Citywide match count | Match rate | Seed recall (iteration-2, pre-relabel) |
|---|---|---|---|
| STRICT (`dynamik_index == 1`, implemented) | 22 / 535 | 4.1% | 0.25 (1/4) |
| LOOSE (`dynamik_index <= 2`, iteration-1 implementation) | 169 / 535 | 31.6% | 1.00 (4/4) |

Under the loose reading, the 169 citywide matches concentrate in the classic west/inner-city bezirke already covered by the `hotspot`/`mixed` labels (per the reviewer's bezirk breakdown: Mitte 27, Pankow 26, Friedrichshain-Kreuzberg 24, Neukölln 23, Tempelhof-Schöneberg 20, Charlottenburg-Wilmersdorf 20), with only 9 of 169 in Lichtenberg — i.e. the loose criterion is nearly vacuous as an eastern-frontier-specific discriminator (it removes only 10 of the 179 mittel-status+Milieuschutz PLRs from consideration). Both sign-offs endorsed keeping the **STRICT** reading; the loose reading was rightly rejected as unfaithful to the "improving dynamism" wording and near-vacuous as a discriminator.

Under the strict reading, only `11300724` Roedeliusplatz (D1=2, D2=1, `typology_stage`='active-gentrification') meets the criterion; the other three PLRs originally folded into `emerging-east` (`11400927` Victoriastadt/Kaskelkiez, `11400929` Weitlingkiez, `11300826` Frankfurter Allee Süd) are all D2=2 ('stabil') / `typology_stage`='stable-established' (ADR-0008 D1xD2 matrix, `transform/macros/typology_stage.sql`). The R-B2b domain sign-off's own candidate table had already called Roedeliusplatz the "emerging-east (hotspot-by-dynamism)" archetype and the other three "emerging-east / control" -- testing all four uniformly against an "improving dynamism" criterion treated three deliberately-chosen controls as positives and reported the resulting mismatch as a 0.25 recall FAIL, which both sign-offs ruled was a label/criterion artifact, not an index deficiency.

**Resolution implemented:** the three D2=2 PLRs are now labelled `emerging-east-watch` in the seed -- an explicitly non-gating descriptive class (all cited rows retained; only the label, and hence Test E's scoring membership, changed). Test E now scores only the true active-frontier archetype, `emerging-east` (currently n=1, Roedeliusplatz). **Test E is additionally demoted to non-gating** at this n (condition C2): a recall >= 0.5 pass/fail has no statistical power at n=1, and the decile-based threshold rationale used for Tests B/C ("chance at the 10% decile = 10% recall") does not apply to Test E, which is criterion-based (true citywide base rate 22/535 = 4.1%). Test E is reported above as a descriptive archetype confirmation, not a powered recall gate. **Follow-up (not implemented here):** promote Test E to a gating recall test once the `emerging-east` seed grows to a defensible n, drawing from the 22 citywide strict-criterion matches (subset to literature-documented eastern frontiers) as the candidate pool.

### Resolution 2 — Milieuschutz-as-Altbau proxy: per-PLR, not general (condition C3)

The SPEC's Option 1 design lists three criteria: D2 (improving dynamism) + Milieuschutz + **Altbau** (pre-1919/Gründerzeit building stock). The live warehouse has no Altbau/building-vintage column at the PLR level, so this implementation only computationally gates two of the three criteria (D2 + Milieuschutz). An earlier code comment asserted, as a general rule, that "Milieuschutz designation implies Altbau" -- the gentrification-domain-expert ruled this **domain-incorrect as a universal claim**: §172 BauGB Soziale-Erhaltungsrecht protects the **social composition** of the resident population against displacement, **not building era**; a Soziale-Erhaltungsgebiet can, and some do, include non-Altbau stock (interwar Siedlungen, mixed, or postwar stock). Generalizing "Milieuschutz ⇒ Altbau" would break the moment this label extends to other Berlin PLRs or another city (Epic H).

**Resolution implemented:** the general claim is removed. In its place: Altbau/Gründerzeit stock is **domain-confirmed per-PLR** for these four specific Lichtenberg Soziale-Erhaltungsgebiete (cited per-row in the seed notes, from R-B2b research) -- Roedeliusplatz, Victoriastadt/Kaskelkiez, Weitlingkiez, and Frankfurter Allee Süd are each independently documented as Gründerzeit-Altbau quarters. Milieuschutz is used as the computational gate only because the warehouse has no PLR-level building-era column, and for these four specific PLRs the two happen to coincide. **This coincidence is NOT assumed to generalize** to other Berlin PLRs or to another city.

---

## Narrative summary

All gating tests passed. The live index shows structural consistency between D1 status and D2 dynamism (Tests A/D), correctly identifies known hotspot/coldspot PLRs at the expected tail of the status_index distribution (Tests B and C). Test E (R-B2c, non-gating as of round-2) is reported below as a descriptive archetype confirmation. This confirms the B2 back-test harness is working as intended.

**Test E (non-gating archetype confirmation, R-B2c round-2, #278):** Roedeliusplatz currently meets the strict improving-dynamism criterion (recall 1.00 at n=1). At this n, Test E is a descriptive confirmation, not a powered recall gate, and does not contribute to OVERALL -- see "Methodology resolution" above (condition C2).

**Eastern-Berlin framing note (R-B2c, #278):** the `emerging-east` archetype (Roedeliusplatz) and the `emerging-east-watch` control PLRs (Victoriastadt/Kaskelkiez, Weitlingkiez, Frankfurter Allee Süd) are all tracked **descriptively** at mittel MSS status (D1=2) under documented Milieuschutz protection; only Roedeliusplatz shows strictly improving (D2=1) dynamism under Test E's criterion, the three `emerging-east-watch` PLRs show stabil (D2=2) dynamism by design -- they are not tested for improving dynamism (condition C1). This is NOT an assertion that any of these areas are causally destined to displace or complete gentrification -- it documents a currently observed pressure signal per the cited literature (Dangschat 1988; Holm & Schulz 2016) and the R-B2b domain sign-off. Any published-facing (G2/O2) framing of this class must preserve that distinction and must not overstate Test E's recall (see "Methodology resolution" above).

## Sources

- Döring, T. & Ulbricht, K. (2016): *Gentrification-Hotspots und Verdrängungsprozesse in Berlin*. Stadtforschung und Statistik 1/2016.
- Holm, A. & Schulz, M. (2016): Gentrification in Berlin: Neighbourhood indices and typologies.
- Dangschat, J. (1988): Gentrification: Der Verlauf sozialräumlicher Veränderungsprozesse in Großstädten (double invasion-succession cycle; R-B2c Test E emerging-east criterion).
- Helweg, D. (2018): *Gentrifizierung in Berlin* (unpublished thesis).
- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen (2023/2025): Monitoring Soziale Stadtentwicklung (MSS), Berlin.
- `docs/methodology/index-definition.md` — D1 polarity, ordinal treatment, vulnerability-positive orientation.
- `transform/seeds/seed_gentrification_ground_truth.csv` — curated PLR labels.

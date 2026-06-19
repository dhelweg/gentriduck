# R-A3 Domain Sign-off — Berlin MSS Status/Dynamik ingestion (#66 / PR #90)

- **Author:** gentrification-domain-expert
- **Date:** 2026-06-19
- **Scope:** domain-theory validity of adopting the official Berlin MSS (Monitoring Soziale
  Stadtentwicklung) Status-Index, Dynamik-Index, and Gesamtindex per PLR (editions 2013–2025)
  as the **primary ground-truth outcome variable** for the gentrification index re-grounding (R-A1).
- **Artefacts reviewed:** `docs/adr/0006-berlin-mss-data-source.md`,
  `transform/models/staging/stg_berlin_mss.sql`, `transform/seeds/seed_mss_expected_counts.csv`,
  `transform/tests/test_mss_plr_row_count.sql`, and the thesis reference
  `reference/system/50_lor_mss_idx_bzr_idx.sql` (original MSS reproduction).
- **Companion gate:** geo-data-scientist statistical sign-off (R-A3) — required before merge.

## Assessment

### a. Is the MSS Status index a suitable ground-truth for gentrification?

A high MSS Status class does **not** measure gentrification directly — it measures the *current
socio-economic standing* of a Planungsraum, derived from unemployment, transfer-benefit receipt,
and child poverty (plus single-parent-household children from 2023). It is a *level* of
disadvantage, not a *process*. This is exactly why it is a defensible ground-truth: gentrification
in the invasion-succession tradition (Dangschat 1988/2000) and in the rent-gap framing (Smith) is
the *socio-economic upgrading of a previously low-status area*, so an official, independently
governed measure of where each area sits on the status ladder — and, via successive editions, how
it *moves up* that ladder — is the correct outcome to validate against. The 2018 thesis used MSS
social status as its main proxy, so this preserves theory continuity; for a 2026 revival it is
arguably *stronger* than the thesis's own reproduction, because we now consume the Senate's
published, citable classification rather than a self-recomputed z-score banding. **Caveat carried
to R-A1:** Status alone is a *level*; gentrification is a *trajectory*, so re-grounding must use
the Status series across editions (Δ Status) or pair Status with Dynamik — a single-edition Status
class is necessary but not sufficient evidence of gentrification.

### b. Is the Dynamik class (positiv/stabil/negativ) a valid proxy for direction-of-change?

Yes, with one framing nuance. The Dynamik index is computed over the biennial observation window
(e.g. MSS 2021 spans 31.12.2018–31.12.2020), so each edition already encodes a 2-year change
signal in exactly the way the thesis's `dynamik_klasse` did (`reference/system/50_lor_mss_idx_bzr_idx.sql`).
A *positiv* Dynamik in a *low-Status* area is the canonical socio-economic-upgrading signature that
gentrification theory predicts — i.e. the Status×Dynamik interaction, not Dynamik alone, is the
gentrification-relevant cell. The nuance is that MSS Dynamik captures change *toward better social
indicators* (falling unemployment / child poverty), which is a *necessary* but not *sufficient*
marker of gentrification: it cannot by itself distinguish endogenous improvement of incumbents from
displacement-driven turnover. That distinction (Döring–Ulbricht displacement typologies) must come
from the EWR vulnerability block (residence duration, age structure), not from MSS — so MSS Dynamik
is a valid *direction* proxy but must not be read as a *displacement* measure on its own.

### c. Is edition-to-edition comparability acceptable across the 447↔542 PLR boundary change?

Comparability is acceptable **only through the LOR crosswalk**, and the implementation handles this
correctly. `stg_berlin_mss` carries an `area_vintage` tag (`lor_pre2021` ≤2019, `lor_2021` ≥2021)
and the seed/row-count test enforces 447 PLR pre-2021 and 542 from 2021, so the discontinuity is
explicit, not silently smoothed. Any longitudinal Status/Dynamik series crossing the 2019→2021
boundary is **not** directly comparable at the PLR level and must route through the ADR-0003 LOR
crosswalk; absent that, the two regimes should be treated as separate panels. Because the 2018
thesis sits on the pre-2021 scheme, Epic B's directional revival correctly anchors on the 447-PLR
editions. This does not break longitudinal interpretation provided the methodology page (G2) states
the boundary break and the crosswalk dependency plainly.

### d. Should the indicator-definition drift (3→4 index indicators) be flagged for website users?

Yes — this must be a stated caveat on the public methodology page (G2), but it is **not**
merge-blocking. R-A1 consumes the Senate's *published, derived classes* as ground truth, not the
raw index indicators, and the Senate itself maintains class continuity in spirit across the
definition change; the addition of single-parent-household children from 2023 broadens but does not
reorient the construct (it remains a child-poverty / household-precarity axis). The honest framing
for users is: pre-2023 and 2023+ Status/Dynamik classes are *comparable in interpretation but not
computed from an identical input set*, so small cross-2021/2023 movements should not be
over-read as real social change. This belongs alongside the boundary-break caveat as a structured
break note, consistent with the project's "document divergences, don't smooth over" rule.

## Conditions for R-A1 (carry-forward)

1. **Sign-awareness of the Status encoding.** `stg_berlin_mss.status_index` follows the official
   Senate convention `1=hoch … 4=sehr niedrig`, i.e. **lower code = higher social status**. This is
   the *inverse* numeric direction of the thesis's `status_summe` (high sum = low status, per
   `reference/system/50_lor_mss_idx_bzr_idx.sql`). R-A1 must treat this polarity explicitly when
   correlating MSS against the gentrification index, and document the chosen direction in the model
   SQL comment (R-C2). A mis-sign here would invert the entire validation.
2. **Use trajectory, not single-edition level.** Re-grounding must validate against Status *change*
   across editions and/or the Status×Dynamik interaction, not a one-edition Status snapshot
   (see assessment a/b). The "low Status + positiv Dynamik" cell is the gentrification-relevant target.
3. **Do not bake MSS into the city-agnostic core.** Per ADR-0006 Consequences, R-A1 must treat MSS
   as Berlin's *validation/grounding* source, not a mandatory model input — a second city must be
   able to ground (or go ungrounded) without an MSS-shaped column. Domain framing concurs.
4. **G2 methodology page must state two structured breaks:** (i) the 447↔542 PLR boundary break and
   crosswalk dependency, (ii) the 3→4 index-indicator drift. Both as honest limitations of a
   *descriptive* tracking measure, not a causal claim of displacement.
5. **Ethics framing (carry to G2/O2):** MSS marks low-status areas with positive dynamics — exactly
   the neighbourhoods most exposed to displacement pressure. Public presentation must frame this as
   descriptive monitoring of *risk*, never as a targeting tool, consistent with the project's
   misuse-avoidance stance.

## Verdict

```
Verdict: PASS WITH CONDITIONS
Ref: docs/adr/0006-berlin-mss-data-source.md; reference/system/50_lor_mss_idx_bzr_idx.sql
```

The conditions above are **R-A1 carry-forwards**, not defects in this ingestion PR. The MSS
Status/Dynamik index is a theoretically sound, official, citable ground-truth for a 2026 Berlin
gentrification revival; the staging model handles the boundary vintage and indicator-drift
discontinuities honestly. R-A3 ingestion is domain-valid to merge once the geo-DS statistical
sign-off also records PASS.

# EWR Indicator Semantics Audit (R-A5)

- **Task:** Issue #68 / R-A5 — audit the EWR (Einwohnerregisterauswertung) indicators that feed the
  gentrification index against the official EWR documentation and the 2018 thesis index definition.
- **Author:** geo-data-scientist
- **Date:** 2026-06-19
- **Scope:** indicator *meaning* and *sign convention* in `int_ewr_socioeco.ewr_composite` and its
  use (negated) in `int_gentrification_ts.gentrification_score`. Methodology only — no model edits.
- **Inputs read:** `transform/seeds/seed_ewr_indicator_meta.csv`,
  `transform/models/intermediate/int_ewr_socioeco.sql`,
  `transform/models/intermediate/int_gentrification_ts.sql`,
  `transform/models/intermediate/int_ewr_series.sql`,
  `reference/system/50_lor_ewr_data.sql`, `reference/system/51_lor_ewr_einwohnergewichtet.sql`,
  `reference/system/60_lor_own_idx.sql`, `reference/system/50_lor_mss_idx_bzr_idx.sql`,
  `docs/epic-c/C4-geo-signoff.md`.

This audit closes the open **C4 sign-off condition**: *"fix EWR composite sign convention; make code,
comments, and the intended gentrification direction agree (resolve the `mean_age_years` comment/code
mismatch)."* Since C4, the DE pair has (a) switched `ewr_composite` from a sum to a **mean** of 5
z-scores (scale-parity fix, lines 159–169) and (b) **negated** `mean_age_years` (line 129). This
audit evaluates whether the *resulting* per-indicator signs are correct.

---

## 1. What the composite is supposed to mean

`int_ewr_socioeco.ewr_composite` = mean of five per-PLR, per-year z-scores. The model header and
`int_gentrification_ts` describe a **high `ewr_composite` as "more socio-economically vulnerable /
pre-gentrification population."** It then enters the gentrification score **negated**:

```
gentrification_score = (status_score + dynamism_score - ewr_composite) / 3
```

So the design intent is: *more vulnerable / un-gentrified population → lower gentrification score*.
For that to be coherent, **every** indicator inside `ewr_composite` must point the *same* way — high
z must mean "more pre-gentrification / more vulnerable." If even one indicator points the other way,
the composite mixes signals and the single negation in `gentrification_score` is wrong for that term.

This is the standard composite-indicator requirement: **all sub-indicators must share a common
polarity before aggregation** (OECD/JRC, *Handbook on Constructing Composite Indicators*, 2008, §"Normalisation"
— "indicators must be oriented in the same direction").

---

## 2. Ground truth: how the 2018 thesis signed each indicator

The thesis built a Döring–Ulbricht-style index (`reference/system/60_lor_own_idx.sql`,
`sum_idx_value`). Two facts are decisive:

1. **The thesis EWR terms are year-over-year *changes* (`_ytd`), not levels.** See
   `lor_ewr_calc_base` (`curr.dau5 - prev.dau5 as dau5_ytd`, etc.). The current pipeline uses
   **levels** (share of 5+ year residents *this year*). This is a legitimate revival simplification
   (Epic B is directional), but it changes how some signs must be read — see §4.
2. **The thesis index direction:** a **high** index = **more gentrification process / displacement
   pressure**. The Döring–Ulbricht mobility index explicitly scores "areas with the **lowest**
   proportion of 5+ year residents **highest**" and "areas with the most register churn highest"
   (Döring & Ulbricht 2016/2018).

The thesis sign vector in `sum_idx_value` (z-score `_msr`, then sign), reading high = more
gentrification:

| Thesis term | Indicator | Level/Change | Sign applied | Reading (high index = gentrifying) |
|---|---|---|---|---|
| `dau5_msr * -1`   | residence duration 5y  | change | **negated** | DAU5 *falling* → gentrifying |
| `dau10_msr * -1`  | residence duration 10y | change | **negated** | DAU10 *falling* → gentrifying |
| `ea_msr * -1`     | foreigners share (E_A) | change | **negated** | foreigners share *falling* → gentrifying |
| `mh_msr * -1`     | migration background   | change | **negated** | MH share *falling* → gentrifying |
| `ee_18u35_msr`    | age 18–35 share        | change | **positive** | young-adult share *rising* → gentrifying |
| `ee_35u45_msr`    | age 35–45 share        | change | **positive** | 35–45 share *rising* → gentrifying |
| `k11_msr`         | foreigners share level (status side) | level | **positive** | (status index, separate domain) |

Note the thesis has **no `mean_age` term** in the index at all. Mean age is computed in the EWR data
(`E_EALTER`) but is **not** one of the index inputs. So there is no thesis precedent for a `mean_age`
sign — the current pipeline's `mean_age_years` is a *new* indicator choice and must be justified on
theory, not reproduction.

The crucial polarity lesson from the thesis: **gentrification = young adults moving IN and
long-term residents / foreigners / migration-background residents being displaced OUT.** So in a
*pre-gentrification / vulnerability* composite (high = NOT yet gentrified), the correct level signs are:

- long-term residents (DAU5/DAU10 level): **high → vulnerable → positive**
- foreigners share level: **high → vulnerable → positive**
- migration-background level: **high → vulnerable → positive**
- young-adult (18–35) share level: **high → already/incoming gentrifier → negative**
- children (under-18) share level: **high → families, social housing → vulnerable → positive**
- mean age level: **ambiguous** (see §4).

---

## 3. Sign findings table

Current state of `int_ewr_socioeco.sql` (the five composite inputs). "Current sign" = the sign with
which the indicator's z-score enters `ewr_composite` (where high `ewr_composite` is *meant* to be
"more vulnerable / pre-gentrification").

| Indicator | Source col | Current sign in ewr_composite | Correct sign | Assessment |
|---|---|---|---|---|
| `foreigners_share` | `E_A / E_E` | **+** (line 100–106) | **+** | **Correct.** High foreigner share marks the pre-gentrification population the thesis treats as displaced. Matches thesis `ea` polarity (thesis negates the *change*; for a *level* "high = vulnerable" is +). |
| `age_under18_share` | `E_U1+E_1U6+E_6U15+E_15U18 / E_E` | **+** (line 107–114) | **+** | **Correct.** High child share → families, social-housing, lower-income households → higher displacement vulnerability. No direct thesis term, but consistent with the thesis polarity and gentrification theory (young single professionals, not families, are the in-movers). |
| `migration_background_share` | `MH_E / E_E` | **+** (line 115–125) | **+** | **Correct** (with the documented ~2017 Mikrozensus break caveat). Matches thesis `mh` polarity. Restrict cross-year comparisons to ≥2017. |
| `mean_age_years` | midpoint-weighted age cohorts | **− (negated)** (line 129–135) | **CONCERN — should most likely be `+`, not `−`** | **Sign is not defensible as written.** See §4. The negation encodes "older area = less vulnerable," which contradicts both the thesis displacement framing (older long-term residents are a classic displacement-risk group) and the polarity of the other four indicators. At minimum the negation is unjustified; the better-supported choice is **positive** (high mean age → ageing long-term population → vulnerable). |
| `residence_duration_5y_share` | `DAU5` | **+** (line 136–146) | **+** | **Correct, and this is the single most important sign.** High share of 5+ year residents = stable, long-tenure, *not-yet-gentrified* population at risk of displacement. This is the canonical Döring–Ulbricht vulnerability marker. (Thesis negates the *change*; for the *level*, "high tenure = vulnerable" is +. Sign is right.) |

Indicators carried but **not** in the composite (no sign issue, informational only):
`residents_total`, `residents_male_share`, `age_65plus_share`. Note `age_65plus_share` is a cleaner,
less-ambiguous proxy for the "ageing vulnerable" signal than `mean_age_years` (see §4 recommendation).

---

## 4. The `mean_age_years` sign — detailed assessment (the one real problem)

**Current code negates `mean_age_years`** (`-1.0 * (z-score)`, line 129). The inline comment justifies
it as *"higher mean age → lower vulnerability."* This rationale is **weak and most likely backwards**
for a *pre-gentrification vulnerability* composite:

1. **Displacement framing (thesis + literature).** Gentrification displaces *older, long-tenure*
   residents and replaces them with *young adults* (18–35). The thesis index gives a **positive**
   weight to a *rising* 18–35 share (`ee_18u35_msr`, positive) — i.e. youthification is the
   gentrification signal, not the vulnerability signal. By symmetry, a **high mean age** is associated
   with the *settled, ageing, pre-gentrification* population — i.e. **vulnerable → positive**, not
   negative.

2. **Internal consistency.** The composite's other four indicators all encode "high = pre-gentrification /
   vulnerable." `residence_duration_5y_share` (long tenure) is positive. Long tenure and high mean age
   are strongly positively correlated (older people have lived somewhere longer). Negating `mean_age`
   while keeping `residence_duration_5y_share` positive makes two correlated facets of the *same*
   underlying "settled older population" pull in **opposite** directions inside one composite — they
   partially cancel. That is a methodological defect, not a feature.

3. **The "young professionals lower the mean age" argument cuts the other way.** The model comment
   implicitly reasons: gentrified areas have young in-movers → low mean age → so low mean age should
   *raise* the gentrification score → so high mean age should *lower* it → negate. But the composite
   is explicitly defined as a **vulnerability / pre-gentrification** measure that is **then negated**
   in `gentrification_score`. Folding a *second* negation in at the indicator level double-counts the
   inversion for this one term and desynchronises it from the other four. The post-gentrification "young
   = low mean age" effect is already captured on the **gentrifier side** by the POI status/dynamism
   scores and would, in a thesis-faithful design, be captured by an 18–35 *share* term — not by
   inverting mean age inside the vulnerability block.

**Recommended fix (preferred):** remove the negation — enter `mean_age_years` **positively**, so it
agrees with `residence_duration_5y_share` and the thesis displacement framing.

**Alternative (cleaner) fix:** drop `mean_age_years` from the composite entirely and, if an
ageing-vulnerability signal is wanted, use **`age_65plus_share` (positive)** instead. `age_65plus_share`
is already carried in the model, is unambiguous in direction, avoids the midpoint-weighting assumptions
baked into `mean_age_years`, and does not double-count tenure. This is my first-choice recommendation;
the "negate mean_age" status quo is the only option I consider **not** defensible.

Either way, **the current negation must change.** Keeping it leaves the composite internally
inconsistent and contradicts the thesis it is reviving.

---

## 5. The composite-level negation in `gentrification_score` — is the logic sound?

`gentrification_score = (status + dynamism − ewr_composite) / 3`.

**The single composite-level negation is sound *in principle*** and is the right place to flip the
vulnerability block so that high gentrification = (high POI status) + (high POI dynamism) + (low
vulnerability). It correctly encodes "gentrified areas have displaced their vulnerable population."

**But it is only correct if every indicator inside `ewr_composite` shares one polarity** (§1). Today
four of five do (vulnerability-positive) and **one (`mean_age_years`) is inverted**, so the negation
applies the *wrong* sign to the mean-age term specifically. Concretely, with the current code a PLR
with an **older** population pushes `ewr_composite` *down* (negated term), which after the outer
negation pushes `gentrification_score` *up* — i.e. **older neighbourhoods are scored as more
gentrified**, the opposite of the displacement logic. Fixing §4 resolves this; the outer
`− ewr_composite` should stay.

Two further notes on the composite design (not blocking R-A5, already raised in C4 and addressed):

- **Scale parity (resolved):** `ewr_composite` is now a *mean* of 5 z-scores (line 169, `/ 5.0`), so
  it is back on unit-ish variance and the 1/3 weighting is honest. Good — this clears the C4 scale
  condition.
- **Levels vs. changes (divergence to document, not fix):** the thesis used YoY *changes* of these
  EWR indicators; the pipeline uses *levels*. A level composite measures "how pre-gentrification is
  this PLR *now*"; a change composite measures "is it gentrifying *this year*." Both are valid; the
  level choice is the cleaner cross-sectional vulnerability signal and is appropriate for the C4 index.
  Flag this divergence on the G2 methodology page (it is a documented Epic-B divergence, acceptable).

---

## 6. Other semantic checks (DAU, age bands, foreigners) — pass

- **DAU5 / DAU10 (residence duration).** `seed_ewr_indicator_meta` defines these correctly as "share
  of residents with 5+ / 10+ years continuous residence at current address," sourced from `DAU5` /
  `DAU10`. Only `residence_duration_5y_share` enters the composite; its **positive** sign is correct
  (high long-term-resident share = stable pre-gentrification population = vulnerable). DAU10 is
  available but unused in the composite — fine; adding it would be redundant with DAU5 (highly
  collinear) and is not required.
- **Age bands.** The under-18 grouping (`E_U1+E_1U6+E_6U15+E_15U18`) and the cohort midpoints used for
  `mean_age_years` match the thesis `E_EALTER` construction (`reference/system/50_lor_ewr_data.sql`).
  The *groupings* are correct and reproducible; only the `mean_age_years` **sign** is in question (§4).
- **Foreigners vs. migration background.** Correctly distinguished: `foreigners_share = E_A/E_E`
  (nationality) vs. `migration_background_share = MH_E/E_E` (Mikrozensus definition, ~2017 break).
  Both **positive** in the composite, both correct. The ~2017 break is documented in the seed and the
  model; keep the ≥2017 restriction for any cross-year migration comparison.

---

## 7. Recommended sign corrections (for the DE pair — separate task, do not bundle into R-A5)

Exactly **one** change is required to clear this audit:

- **`mean_age_years` in `int_ewr_socioeco.sql` (lines 126–135).**
  - **Before:** `-1.0 * ( (mean_age_years − avg) / nullif(stddev,0) )`  →  enters composite **negated**.
  - **After (preferred):** drop `mean_age_years` from the composite and substitute **`age_65plus_share`
    positively** (no negation), matching the vulnerability polarity of the other indicators.
  - **After (acceptable alternative):** keep `mean_age_years` but **remove the `-1.0 *`** so it enters
    **positively**.
  - **Also update** the inline comment (lines 126–128) and the model header to state the chosen
    polarity, and update `int_gentrification_ts.sql` comments (lines 74–81) to confirm all five
    composite inputs are vulnerability-positive and the single outer negation is the only sign flip.

No other indicator sign needs to change. The outer `− ewr_composite` in `gentrification_score` stays.

---

## 8. Verdict

```
Verdict: PASS WITH CONDITIONS
Conditions:
  1. [BLOCKING for R-A1] Correct the mean_age_years sign in int_ewr_socioeco.sql:
     either drop it in favour of age_65plus_share (positive) — preferred — or remove
     the -1.0 negation so mean_age_years enters the composite POSITIVELY. The current
     negation is the only sign in the composite that is not defensible and it contradicts
     both the 2018 thesis displacement framing and the polarity of the other four
     indicators (it currently scores OLDER neighbourhoods as MORE gentrified).
  2. [DOC] Update the int_ewr_socioeco.sql + int_gentrification_ts.sql comments so code,
     comments, and the documented gentrification direction agree (closes the open C4
     sign-off condition). Confirm in-comment that all 5 composite inputs are
     vulnerability-positive and the single outer "- ewr_composite" is the only negation.
  3. [DOC, non-blocking] On the G2 methodology page, document that the composite uses
     LEVELS where the 2018 thesis used YoY CHANGES (an accepted Epic-B directional
     divergence), and restrict migration_background_share comparisons to >= 2017.
```

**Rationale.** Four of the five composite indicators (`foreigners_share`, `age_under18_share`,
`migration_background_share`, `residence_duration_5y_share`) carry the **correct** vulnerability-positive
sign and are consistent with the 2018 thesis polarity and gentrification theory. The composite-level
negation in `gentrification_score` is the right design. The scale-parity fix (mean, not sum) from C4
has landed correctly. The one remaining defect is the **`mean_age_years` negation**, which is internally
inconsistent (it fights the positively-signed, strongly-correlated `residence_duration_5y_share`) and
directionally backwards for a pre-gentrification vulnerability measure. It must be corrected (preferably
by switching to `age_65plus_share`) before R-A1 proceeds. With that single correction, the EWR composite
and its use in the gentrification score are methodologically sound.

---

### Sources

- Döring, C. & Ulbricht, K. — *Gentrification-Hotspots und Verdrängungsprozesse in Berlin. Eine
  quantitative Analyse*, in Helbrecht (ed.), *Gentrifizierung in Berlin* (transcript, 2016/2018).
  [Springer chapter](https://link.springer.com/chapter/10.1007/978-3-658-20388-7_2) ·
  [de Gruyter](https://www.degruyterbrill.com/document/doi/10.1515/9783839436462-003/html?lang=en)
  — mobility index scores areas with the *lowest* 5+ year residence share *highest*; population-structure
  index measures change *toward* gentrification (young in-movers, long-term residents displaced).
- 2018 thesis index definition: `reference/system/60_lor_own_idx.sql` (sign vector of `sum_idx_value`),
  `reference/system/50_lor_ewr_data.sql` (age-cohort midpoints, indicator derivations),
  `reference/system/50_lor_mss_idx_bzr_idx.sql` (MSS status-index polarity: high status_summe = low status).
- OECD/JRC, *Handbook on Constructing Composite Indicators: Methodology and User Guide* (2008) —
  common-polarity requirement before aggregation; equal-weight default as transparent baseline.
- Prior Gentriduck sign-offs: `docs/epic-c/C4-geo-signoff.md` (the open sign condition this audit closes).
```

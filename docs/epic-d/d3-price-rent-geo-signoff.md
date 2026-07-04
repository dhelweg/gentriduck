# D3 Price/Rent Dimension — Geo-Data-Scientist Sign-Off

Date: 2026-06-29
Reviewer: geo-data-scientist
Ticket: #29

Scope: methodology for extending the gentrification index with a **price/rent dimension** built
from three D1-staged sources — Bodenrichtwerte (BRW) land values, Wohnlage WFS residential-quality
points, and the non-spatial Mietspiegel rent table — joined to the LOR 2021 PLR grid
(`int_berlin_ewr_plr2021` geometry lineage) and integrated into `gentrification_index.sql`.
This sign-off covers spatial-method and aggregation correctness; it gates D3 integration into
`develop` jointly with the `gentrification-domain-expert` sign-off (R-C1).

Grounding read: `gentrification_index.sql`, `int_gentrification_ts.sql`,
`int_berlin_ewr_plr2021.sql`, `docs/methodology/spatial-methods.md`,
`docs/methodology/index-definition.md` §4 (levels-vs-changes), §5 (polarity table),
`docs/epic-d/d1b-kauffaelle-geo-signoff.md`.

## Verdict: PASS WITH CONDITIONS

The methodology is sound and defensible. Each of the four sub-questions has a correct, standard
answer; none requires a black-box method. The conditions below are binding implementation
constraints, not blockers. The single most important methodological framing — carried from the
D1b Kauffälle precedent and the index-definition §4 levels-vs-changes architecture — is that
**BRW land value is a structural LEVEL signal, not a dynamic change/outcome signal**, and it
must enter the index the way D4 `ewr_composite` does: as a cross-sectional baseline covariate,
never silently averaged into the dynamic MSS/POI signal (see §4 and condition 10).

---

## 1. BRW → PLR methodology

**Assessment.** BRW zones are areal polygons and PLRs are areal polygons in an **incompatible
tessellation** (1,621 BRW zones vs 542 PLRs, deliberately *not* aligned). This is a genuine
**areal interpolation** problem — unlike the Kauffälle case (D1b §1), which was point-in-polygon
containment. The correct operation is therefore the heavier areal-interpolation machinery, and
`ST_Intersects` + **area-weighted mean** is the right approach.

- **Correct formula (intensive variable).** Land value in EUR/m² is an **intensive** quantity
  (a density/rate, not a count), so it must be **area-weighted-averaged, never summed**:
  ```
  brw_plr_i = SUM_z( brw_value_z * area(intersection(zone_z, plr_i)) )
              / SUM_z( area(intersection(zone_z, plr_i)) )
  ```
  This is exactly the intensive-indicator areal-weighting already approved for
  `int_berlin_ewr_plr2021` (its "intensive vs extensive indicator note", geo-DS approved
  2026-06-19) and for the crosswalk (C3 sign-off). The denominator is the **realised overlap
  area**, not the full PLR area — so PLRs only partly covered by residential BRW are normalised
  honestly over the covered part.
- **Reject the alternatives.** *Centroid-in-zone* throws away the multi-zone structure of large
  PLRs and is biased when a PLR straddles a value gradient (Openshaw 1984 MAUP; this is precisely
  the failure mode area-weighting fixes). *Largest-overlap-wins* is a defensible coarse fallback
  for QA only, but it discards the value blend and is rejected as the primary method. Use
  area-weighted mean.
- **Land-use filter.** Filter to **residential land use** (`nutzung LIKE 'W%'`, i.e. the *W…*
  Baunutzung classes) for the headline rent/price dimension. Mixing in commercial/industrial
  (G/I) Richtwerte would contaminate a residential-affordability reading with non-comparable
  land economics. Persist the **all-use** area-weighted mean as a documented secondary column for
  QA/coverage diagnostics, but the index consumes the **`W%`-filtered** value. Cite the
  Baunutzung class semantics in the SQL comment (R-C2).
- **Sliver threshold.** Apply a minimum overlap guard to suppress topological slivers from
  imperfect polygon edges: drop any (zone, PLR) intersection whose **overlap area < 1 m²**
  *and* whose **overlap fraction < 0.5% of the smaller polygon**. Slivers carry near-zero weight
  in the area-weighted mean anyway, but excluding them keeps the weight denominator clean and
  avoids degenerate geometries crashing `ST_Area`. Use `ST_MakeValid` on inputs before
  intersection.
- **Zero-residential-BRW PLRs.** A PLR with no intersecting `W%` BRW zone (pure park, water,
  industrial, airport) must yield **`brw_plr = NULL`, not 0** — there is no residential land
  value there, and 0 EUR/m² is a false statement that would corrupt any downstream z-score.
  This mirrors the index-definition §7 "exclude, don't zero-impute" rule and the `is_uninhabited`
  treatment in `int_gentrification_ts`. Carry a `brw_residential_coverage_frac` (share of PLR
  area covered by `W%` BRW) so consumers and the G2 page can see where the signal is thin and the
  uninhabited/non-residential PLRs are transparently NULL rather than silently zero.

**CRS.** BRW and PLR are both native **EPSG:25833** — do the intersection in 25833 directly, **no
`ST_Transform`** (spatial-methods §3). Add the Berlin axis-order sanity assert (x∈~[3.7e5,4.2e5],
y∈~[5.79e6,5.84e6]) as in D1b condition 2.

## 2. Wohnlage → PLR methodology

**Assessment.** Wohnlage is **address-level point** data, so the join is **point-in-polygon** —
`ST_Within(point, plr_geom)` / `ST_Contains(plr_geom, point)` — exactly the gate-approved pattern
from D1b §1 and `int_osm_poi_plr`. No buffer, no areal interpolation. Native 25833 both sides, no
transform; deterministic boundary tie-break
`QUALIFY ROW_NUMBER() OVER (PARTITION BY address_id ORDER BY area_code) = 1`.

- **Composition, not modal class.** Persist the **count per tier per PLR** (n_einfach, n_mittel,
  n_gut) **and the tier shares** — *not* a single dominant/modal tier. The modal class destroys
  the heterogeneity that is the whole gentrification signal: a PLR transitioning from
  60% einfach → 40% einfach is invisible to a modal label until it flips, but the share captures
  it continuously. The estimated-rent aggregation (§3) also needs the full composition, not a
  single tier. Carry a derived `wohnlage_score` = share-weighted ordinal
  (einfach=1, mittel=2, gut=3) as a convenient scalar, **clearly labelled as an ordinal-mean
  approximation** (the three tiers are ordered but not equidistant — flag this; do not treat the
  scalar as interval-scaled in regression without noting it).
- **Small-N PLRs.** A PLR with **< 10 address points** yields an unstable composition. Compute
  the shares but set a **`wohnlage_low_n` flag** (n < 10) and **NULL the derived scalar**
  `wohnlage_score`/estimated rent for those PLRs rather than publishing a noisy point estimate.
  Do not zero-fill. Most such PLRs will be the non-residential/uninhabited ones already NULL on
  BRW — the flags should largely coincide; verify they do as a QA cross-check.
- **Vintage / longitudinal.** For a **cross-sectional** D3 price/rent snapshot the **single
  nearest-vintage** Wohnlage layer is sufficient and is the right scope for the first iteration.
  But because the index is a **panel** (`int_gentrification_ts` joins same-year MSS/POI/EWR), the
  binding rule is: **match the Wohnlage vintage to the panel snapshot year**, nearest-available.
  The five vintages (2017/2019/2021/2023/2026) map cleanly onto the biennial MSS editions
  (2017→2017, 2019→2019, 2021→2021, 2023→2023, 2025→2026-nearest); the 2026 vintage stands in for
  the 2025 MSS edition with that approximation **documented** (condition 8). Do **not** apply a
  single vintage (e.g. 2023) to all panel years — that would inject a fixed cross-section as if it
  were time-varying and bias any change reading. A single cross-section is acceptable **only** if
  D3 price/rent is materialised as a static level mart not entering the panel; if it enters
  `int_gentrification_ts`, it must be vintage-matched.

## 3. Estimated rent aggregation

**Assessment.** The estimated-rent-per-PLR construction is sound as a **modelled, composition-
weighted estimate** — and must be labelled as such (estimate, not observed rent). The right
aggregation is a **Wohnlage-composition-weighted average over the relevant Mietspiegel cells**,
holding the non-spatial dimensions (year-built bucket, size bucket) **fixed at a single declared
representative profile**:

```
est_rent_plr_i,vintage = SUM_tier( wohnlage_share_i,tier
                                    * rent_mid(vintage, tier, FIXED_yearbuilt, FIXED_size) )
```
where `rent_mid = (rent_low + rent_high)/2` for the chosen cell.

- **Weighted average over tiers, single representative cell on the other axes.** Do **not** pick a
  single representative tier — weight across einfach/mittel/gut by the PLR's Wohnlage shares (§2),
  because the tier *mix* is the area signal. **Do** fix the year-built and size dimensions to one
  declared profile, because we have **no PLR-level building-age or dwelling-size distribution** to
  weight them with; inventing weights there would be unfounded. Recommended fixed profile:
  **mid-size bucket (the 60–90 m² band) and a mid/representative construction-year bucket**, held
  **constant across all PLRs and vintages** so the estimate isolates the Wohnlage-and-vintage
  signal. State the chosen profile explicitly in the SQL comment and on the G2 page; it is a
  modelling choice, not a measurement.
- **Use the midpoint, and carry the band.** Persist `est_rent_low`, `est_rent_high` (same
  composition-weighting applied to the bracket ends) alongside `est_rent_mid`, so the inherent
  Spanne (range) uncertainty of the Mietspiegel is visible and not collapsed prematurely.
- **Schema drift across vintages (known complication — flagged).** The Mietspiegel
  construction-year-bucket boundaries **change between vintages** (bucket splits over the six
  editions). This is a real comparability break analogous to the Migrationshintergrund 2017 break
  (index-definition §4) and the LOR-2021 reform. **Required handling:** define a **stable
  crosswalk of construction-year buckets to a common coarse set** that is consistent across all six
  vintages, and select the FIXED representative bucket from that *harmonised* set — never from the
  raw per-vintage bucket, which would make the chosen cell mean different things in different
  years. Where a vintage cannot be mapped to the harmonised bucket, NULL that vintage's estimate
  rather than silently substituting a non-comparable cell. Document the crosswalk and any
  unmappable vintage on G2.
- **Predictor/affordability framing.** Estimated rent is a **modelled cross-sectional level**, not
  an observed transaction and not a displacement outcome. Same hedging discipline as D1b condition
  6: never label it "rent paid" or read a rise as realised displacement.

## 4. Index integration

**Assessment.** The price/rent dimension is **structural / slow-moving level** data and must be
integrated with the same level-vs-change discipline that governs D4 `ewr_composite`
(index-definition §4.6). The cleanest architecture:

- **Where.** Build the three signals in **dedicated intermediate models**
  (`int_berlin_brw_plr`, `int_berlin_wohnlage_plr`, and an `int_berlin_est_rent_plr` that joins
  Wohnlage composition to the Mietspiegel seed), then surface them as **new, additively-contracted
  columns** — *not* a silent rewrite of the existing index. Two acceptable shapes; **separate
  mart preferred** for the first iteration: materialise `mart_price_rent_dimension` (or a
  `dim='price_rent'` block) keyed on (city_code, area_code, period), and only fold selected
  columns into `gentrification_index.sql` once domain + geo confirm polarity and weighting. This
  keeps the governed ADR-0004 contract of `gentrification_index.sql` stable and avoids
  contaminating the established MSS/POI/EWR columns during D3 bring-up. If columns are added to
  `gentrification_index.sql` directly, it is a **deliberate contract edit** requiring the ADR-0004
  contract change + reviewer sign-off (per its header), and the new columns must be additive
  (existing variants unchanged, NULL for the 2018-thesis and non-Berlin rows).
- **Polarity (vulnerability-positive convention, index-definition §5).** Resolve each signal
  before any pooling:
  - **BRW land value:** Higher land value = more *expensive / already-upgraded* area. As a
    **level**, high BRW = **low residual gentrification headroom** (already gentrified / consolidated),
    which on the *vulnerability-positive* axis is **LOW vulnerability** → the level enters with a
    **flipped sign** if pooled into a vulnerability composite. But its more defensible role is as a
    **rent-gap / pressure context covariate**, not a vulnerability score (see next bullet).
  - **Estimated rent:** Higher estimated rent = **less affordable**. Affordability-pressure is
    vulnerability-relevant but is an *outcome/level of the housing market*, not a demographic
    vulnerability — keep it as a **covariate/context layer**, flip-sign documented, never summed
    naively with D1.
  - **Wohnlage tier:** Higher tier (gut) = higher quality = already-desirable = lower remaining
    headroom; same polarity logic as BRW.
  - Record all three in the §5 polarity reference table before integration (domain-expert co-owns
    the *meaning*; geo owns the z-score arithmetic).
- **Normalization.** **Per-city, per-vintage z-score** as the default (consistent with D3/D4
  z-scoring and OECD/JRC 2008 common-polarity-before-aggregation), computed **only over non-NULL,
  inhabited, residential PLRs** (exclude the NULL/low-N/uninhabited set from the mean and SD so
  they don't deflate the distribution). Carry the **rank/percentile** alongside as the robust,
  outlier-insensitive presentation default for G2 — land value is **heavy-tailed** (a few
  super-prime PLRs), so a raw z-score is skew-sensitive; **winsorize at 1/99% before z-scoring**,
  or prefer the rank for public display. State which is headline.
- **Known pitfall — mixing a structural level with dynamic signals (binding).** This is the
  central risk. The existing live index carries **dynamic** signals: MSS Status/Dynamik (D1/D2,
  the *direction* of change) and C5-corrected POI **dynamism** (share-change). BRW/Wohnlage/rent
  are **structural levels** that move slowly. Averaging a slow level into a change-oriented score
  reproduces exactly the architectural error ADR-0008 corrected (the legacy
  `gentrification_score` that averaged predictors and outcomes and "lost the lead-lag
  relationship"). **Therefore:** the price/rent level enters as a **baseline/context covariate**
  (like D4 levels, index-definition §4.6), **never** as a contemporaneous term blended into the
  Status×Dynamik typology, and **never** as a change unless a genuine BRW *time-difference* is
  computed (BRW is 8-year, so a defensible `brw_yoy`/`brw_trend` change signal is *possible* and
  is arguably the more valuable gentrification signal — rising land value = realised rent gap,
  Smith 1979 — but it must be built and polarised as an explicit *change* indicator, distinct from
  the level, exactly as D4 separates levels from changes). Do not let the BRW *level* leak into a
  change reading or vice-versa.

---

## Binding conditions for D3 implementation

1. **BRW aggregation = intensive area-weighted mean** over `ST_Intersects` overlaps:
   `SUM(value*overlap_area)/SUM(overlap_area)`. Never SUM the EUR/m² values. Centroid and
   largest-overlap are rejected as primary (largest-overlap allowed as a documented QA column).
   Cite intensive-indicator areal-weighting (mirrors `int_berlin_ewr_plr2021` note; Openshaw 1984).
2. **Filter BRW to residential** `nutzung LIKE 'W%'` for the headline signal; persist all-use mean
   only as a QA/coverage diagnostic. Cite Baunutzung class semantics in the SQL comment (R-C2).
3. **Sliver guard:** `ST_MakeValid` inputs; drop intersections with overlap area < 1 m² AND
   overlap fraction < 0.5% of the smaller polygon, before computing weights.
4. **Zero-residential-BRW and low-coverage PLRs → NULL, not 0.** Persist
   `brw_residential_coverage_frac`. Exclude NULL/uninhabited PLRs from all z-score moments.
5. **Wohnlage join = `ST_Within` point-in-polygon**, native EPSG:25833, **no `ST_Transform`**,
   with the deterministic boundary tie-break `QUALIFY ROW_NUMBER() … ORDER BY area_code = 1` and a
   `geometry IS NOT NULL` guard. Add the Berlin axis-order sanity assert.
6. **Persist Wohnlage composition (tier counts + shares), not a modal class.** Derived
   `wohnlage_score` is an ordinal-mean *approximation* — label it as such; do not treat the three
   tiers as equidistant-interval without flagging.
7. **Small-N (< 10 addresses) and zero-address PLRs:** set `wohnlage_low_n` flag, NULL the derived
   scalar and estimated rent; never zero-fill. Cross-check that low-N PLRs largely coincide with
   the BRW-NULL/uninhabited set.
8. **Vintage-matching:** if D3 price/rent enters the `int_gentrification_ts` panel, match Wohnlage
   (and Mietspiegel) vintage to the panel snapshot year, nearest-available; document the
   2026→2025 approximation. A single fixed cross-section is permitted only for a static
   (non-panel) price/rent mart.
9. **Estimated rent = Wohnlage-composition-weighted average of Mietspiegel `rent_mid`** over the
   tier mix, with year-built and size **fixed to one declared representative profile**
   (recommended: 60–90 m² band, mid construction-year bucket from the harmonised bucket set),
   constant across all PLRs and vintages. Persist `est_rent_low/mid/high`. Label as a **modelled
   estimate**, never observed rent.
10. **Mietspiegel construction-year-bucket schema drift:** build and document a stable harmonised
    construction-year-bucket crosswalk across all six vintages; select the fixed representative
    bucket from the harmonised set; NULL any vintage that cannot be mapped. Disclose on G2
    (analogous to the Migrationshintergrund-2017 and LOR-2021 breaks).
11. **Integration shape:** prefer a **separate `mart_price_rent_dimension`** for the first
    iteration. Adding columns to `gentrification_index.sql` is a deliberate ADR-0004 **contract
    edit** (additive only; NULL for 2018-thesis and non-Berlin rows) requiring reviewer sign-off.
12. **Polarity recorded in index-definition §5** for all three signals (BRW, Wohnlage, est-rent)
    before integration; vulnerability-positive convention; domain-expert co-signs the *meaning*.
13. **Normalization = winsorized (1/99%) per-city per-vintage z-score over inhabited residential
    PLRs only**, with rank/percentile carried alongside (rank preferred for heavy-tailed land-value
    public display). State the headline choice.
14. **Structural-level vs dynamic-signal separation (central pitfall):** BRW/Wohnlage/est-rent
    **levels enter as baseline/context covariates** (the D4-levels pattern, index-definition §4.6),
    **never blended contemporaneously into the MSS Status×Dynamik typology**, never silently
    averaged into a single score (the ADR-0008 legacy error). Any BRW *change* signal
    (`brw_trend`, rent-gap reading, Smith 1979) must be built and polarised as an **explicit,
    separate change indicator**, distinct from the level.
15. **R-C2 grounding** in every model header: thesis section, EWR/Mietspiegel codebook, Baunutzung
    class doc, Openshaw (1984) MAUP, Smith (1979) rent gap, OECD/JRC (2008) composite-indicator
    polarity, and this sign-off.
16. **MAUP:** the price/rent dimension rides the existing **PLR-vs-BZR r>0.7** robustness check
    (spatial-methods §7) when it enters the index; no bespoke sweep. PLR is the floor — no sub-PLR
    grain (BRW zones are coarse and must not be presented finer than PLR).

## Note on the dual gate

This is methodology-bearing index input (R-C1). It requires a `gentrification-domain-expert` PASS
— polarity *meaning* (conditions 12, 14), the affordability-vs-vulnerability reading of estimated
rent, and the rent-gap interpretation of BRW change are squarely in their lane — before the PM
integrates D3 into `develop`. This geo sign-off covers spatial-join correctness, areal-
interpolation arithmetic, normalization, and the level-vs-change architecture only.

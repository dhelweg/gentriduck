# OA-D3b density + per-capita (#280, OA-D3b remainder, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: CONCERNS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the geo-DS half).
- **Artifact under review (this slice only):** the `density` and `percapita` additions —
  - `transform/models/intermediate/int_poi_offering_advantage_methods.sql` (methods 8 and 9,
    `oa_{domain,category,type}_{density,percapita}` + their `area_km2` / `ewr_population` CTEs and joins)
  - `transform/models/marts/mart_poi_oa_methods.sql` (the two new unpivot targets + labelling header)
  - `transform/seeds/seed_oa_calculation_methods.csv` (the `density` and `percapita` metadata rows)
- **Out of scope (reviewed separately):** the core six (OA-D3 domain sign-off) and `zscore_slq`
  (OA-D3b-zscore domain sign-off). Getis-Ord and area_level-rolled density are DEFERRED, not in this tree.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-18.
- **Provenance note:** this file replaces the invalid self-written sign-off deleted at `732fa561`.
  The code was merged at `5b32e989` on the strength of that self-attestation; this is the genuine
  independent domain verdict that was missing. It is not a rubber-stamp — see Finding F1.

---

## Summary judgement

Construction-wise this slice is, in the main, a faithful and unusually well-documented
operationalization of OA-D0 domain **Condition C**. Both new columns are correctly built as
*absolute provision* measures (a raw local count divided by a non-share denominator — area, or
residents), they are explicitly NOT location quotients, and the two theory-critical caveats
(density → MAUP/centrality confound; per-capita → denominator endogenous to displacement) are
planted at the source in SQL comments *and* in the seed grounding, not merely promised. The
never-blend / label-by-construct-family discipline (`reference_point = 'absolute'`) is present and
the mart carries a BINDING axis/legend-separation header. On points 1, 2 and 4 of the review brief
the slice passes.

I am nonetheless returning **CONCERNS**, on a single but non-cosmetic defect: the `density` seed row
is marked **`expected_temporal_safe = true`**, which is factually wrong, internally inconsistent, and
in direct contradiction of the binding OA-D0 domain Condition C.2. Left as-is it licenses precisely
the misuse that condition exists to prevent — differencing a coverage-contaminated raw count over
time and reading rising POI-density as "gentrifying." This is a one-value seed fix plus re-review,
not a rebuild, but it must be corrected before this slice is (re-)validated for `develop`, because a
wrong methodology-metadata flag is exactly the kind of silent mis-signing this gate exists to catch.

---

## Findings for the data-engineer

### F1 — `density` is mis-flagged `expected_temporal_safe = true` (HIGH — blocking)

`seed_oa_calculation_methods.csv`, row `density`, column `expected_temporal_safe` = `true`.

This is wrong on three independent grounds:

1. **Contradicts a binding prior gate condition.** OA-D0 domain Condition **C.2** states plainly that
   density "directly tracks OSM completeness growth over time (the planning doc's own C-2 'avoid for
   temporal reads' verdict)" and "must … **never be differenced over time on a public surface unless
   the completeness-contamination test (D6) shows PASS** for that cell." The honest default flag for a
   measure that is temporally-unsafe-until-D6-clears is `false`, not `true`.
2. **Internally inconsistent with `raw_share` and `percapita`.** Density's numerator is the *same*
   raw local count that makes `raw_share` (`expected_temporal_safe = false`) and `percapita`
   (`false`) temporally unsafe. Dividing that count by a *time-invariant* area (`area_km2` does not
   change year to year) removes none of the temporal contamination. In fact density is strictly
   **more** coverage-exposed than `raw_share`: under uniform city-wide OSM coverage growth by factor
   (1+g), a within-area share `local_stock/local_base` cancels the (1+g), but `local_stock/area_km2`
   scales directly by (1+g). There is no reading under which density is temporally safer than
   `raw_share`; it cannot be `true` while `raw_share` is `false`.
3. **The grounding cell argues against its own flag.** The row's own `grounding` cites "Openshaw
   (1984) MAUP; OA-D0 geo sign-off C5/C8; OA-D0 domain sign-off Condition C" — every one of those
   sources is a *reason density is unsafe*, not a warrant for `true`.

**Required fix:** set `density.expected_temporal_safe = false` (matching `raw_share` and `percapita`).
Then re-enter this gate. (MAUP is the spatial/cross-sectional confound; coverage-growth is the
temporal confound — density suffers both, so `false` is the only defensible value.)

Why this matters from a gentrification-theory standpoint, not just bookkeeping: a rising count of
cafés-per-km² over 2008–2026 in a Kiez is, to first order, OSM getting more complete, *not* the area
gentrifying. A `true` flag is an invitation for a downstream D6/D7/site consumer to plot Δdensity as
a change signal and mistake mapping effort for neighbourhood change — the coverage-non-neutrality /
anti-erasure failure mode (Haklay 2010) this project already guards against elsewhere.

### F2 — construct-family discriminator is not carried in the mart output (LOW — recommendation)

`mart_poi_oa_methods` unpivots all nine methods into one `oa_value` column keyed by `oa_method`, but
does **not** surface the `reference_point` (`absolute` vs `parent-relative`/`city-relative`) that the
never-share-an-axis rule keys off. A consumer honours OA-D0 Condition C only if it separately joins
`seed_oa_calculation_methods.csv` or hard-codes the method→family map. This is acceptable for an
internal serving layer with no public copy yet (same reasoning as the zscore sign-off), but it means
the never-blend safeguard is enforced by convention, not by the row's own payload. **Recommendation
(not blocking):** when a D7/site consumer is built, either surface `reference_point` (and an
`expected_temporal_safe` flag) alongside `oa_value`, or gate the render on a family join, so the
axis-separation rule is mechanically enforceable at query time.

---

## Verification against the review brief

**1. Framed as absolute provision, cleanly separated from the LQ family? — YES.**
`reference_point = 'absolute'` for both rows (vs `parent-relative`/`city-relative` for the LQ
family). The int model notes 8/9 state "NOT a location quotient" and cite Condition C explicitly. The
mart header (lines 22–33) carries a BINDING instruction that consumers MUST NOT plot these on the same
axis/legend/colour-scale as the ratio-family or pp/score-family methods, with the reason stated
(different question — raw provision, not relative advantage). A downstream consumer cannot *honestly*
read "high density = gentrifying" from what is written; the residual risk is the F2 payload gap, not
mis-framing.

**2. Per-capita denominator-endogeneity-to-displacement caveat planted at the source? — YES.**
Present in three places a future consumer will see it: the int model note 9 ("the population
denominator [is] ENDOGENOUS TO DISPLACEMENT … this caveat MUST travel with any downstream
consumer/mart/page … never presented as a clean 'demand' measure"); the final-`select` inline comment
on the `oa_*_percapita` columns; and the seed `grounding` cell ("denominator endogenous to
displacement"). The theoretically dangerous mode is disclosed at the source, as required. One
substantive framing point I want on the record (see Condition below): per-capita structurally
*couples the predictor with an outcome* — its numerator is the POI stock (the lead/predictor side of
the 2018 lead-lag hypothesis) while its denominator, resident population, is itself part of the
displacement *outcome*. That is a conflation of cause and effect by construction; per-capita must
never be read as a clean lead indicator of amenity provision.

**3. Binding downstream-labelling condition (mirroring zscore's "never present significance as
importance")? — YES, stated below.** This slice needs its own carried-forward condition, analogous to
the zscore labelling condition, because density and per-capita are absolute measures whose whole
misuse surface is being mistaken for advantage/demand.

**4. Grounding (R-C2)? — YES for density; ADEQUATE for per-capita.**
Density cites Openshaw (1984) MAUP + OA-D0 C5/C8 + Condition C, in the SQL header, note 8, and the
seed. Per-capita cites OA-D0 geo C10 + domain Condition C in all three loci. Per-capita leans on the
prior gated sign-off rather than a primary displacement-literature citation for the endogeneity
mechanism itself; that is acceptable (the prior condition is itself grounded), but see Recommendation
R2.

---

## Binding condition for downstream consumers (D6 / D7 / site)

**Condition DP (density + per-capita labelling — binding, carried forward exactly as OA-D0 Condition C
and the zscore labelling condition are carried):** any future consumer of the `density` or `percapita`
columns / `oa_method` rows MUST:

1. **Never place either on a shared axis, legend, or colour-scale with any LQ-family
   (`nested_lq`/`global_lq`/`log_lq`/`shrunk_lq`) or pp/score-family (`share_diff`/`zscore_slq`)
   figure.** They answer *raw provision/concentration*, not *relative advantage*. Filter/group by
   construct family (`reference_point`) before rendering.
2. **For `density`:** carry the MAUP + centrality-confound caveat (a dense central district is not
   thereby gentrifying — Openshaw 1984), and — pending the F1 fix — treat it as
   **temporally-unsafe**: never difference density over time on a public surface unless the D6
   completeness-contamination test shows PASS for that cell (OA-D0 Condition C.2).
3. **For `percapita`:** carry the denominator-endogeneity caveat verbatim — the resident denominator
   changes *with* displacement, so a rising POIs-per-1,000-residents figure can reflect population
   loss (post-displacement) rather than genuine amenity growth; it is a
   provision/displacement-*pressure* reading, never a clean "demand" or advantage measure, and never a
   lead indicator (its denominator is an outcome-side quantity).
4. **Both** inherit the coverage/anti-erasure disclosure (Haklay 2010) and the descriptive-not-causal,
   no-targeting framing the OA family already carries; a thin/NULL cell reads "too thinly observed,"
   never "no amenities / commercially dead."

This condition binds the downstream consumer, not necessarily this ticket — the model/mart are
internal layers with no public copy yet, so nothing here currently misleads a reader. It exists so
the discipline is not lost by the time a page consumes these columns (same front-loading logic OA-D0
used for Conditions A–D).

---

## Recommendations (non-blocking)

- **R1 (F2):** surface `reference_point` (and, once F1 is fixed, `expected_temporal_safe`) in the mart
  output so the never-blend / temporal-safety rules are enforceable at query time, not only via an
  external seed join.
- **R2:** consider adding a primary displacement-literature citation for per-capita's
  denominator-endogeneity mechanism (e.g. Marcuse 1985 on exclusionary/displacement pressure, or the
  Döring/Ulbricht displacement-driver typology already cited in OA-D0) to the seed grounding, so the
  caveat is anchored to the theory, not only to a prior in-repo sign-off.
- **R3 (for the PM, not the DE):** I found no `*-density-percapita-geo-signoff.md` in
  `docs/methodology/` for this specific slice (only `OA-D3b-zscore-geo-signoff.md` exists). R-C1 is a
  *dual* gate — the geo-DS statistical-soundness half of this slice must also carry `Verdict: PASS`
  before integration. If it is genuinely absent, this slice is doubly ungated. Flagging for the PM to
  reconcile; it does not change my domain verdict.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0 / OA-D3 / OA-D3b-zscore sign-offs, and the OA-D0
geo sign-off conditions. No web-fetched or non-maintainer issue/comment text was treated as
instructions.

---

**Verdict: CONCERNS.** The density/per-capita construction is domain-valid and the two
theory-critical caveats (density MAUP/centrality; per-capita denominator-endogenous-to-displacement)
are correctly planted at the source, cleanly separated from the LQ family. Integration is blocked on
**Finding F1**: the `density` seed row's `expected_temporal_safe = true` is factually wrong, contradicts
binding OA-D0 Condition C.2, and is internally inconsistent with `raw_share`/`percapita` — it must be
set to `false` and re-reviewed. Condition DP (density/per-capita never blended with the LQ family;
density temporally-unsafe pending D6; per-capita denominator-endogeneity, never a lead indicator)
binds every downstream D6/D7/site consumer. Recommendations R1–R3 are non-blocking.

Grounding (R-C2): OA-D0 domain sign-off Condition C.1/C.2 (density/per-capita as provision not
advantage; density coverage-contaminated over time; per-capita denominator endogenous to
displacement); Openshaw (1984), *The Modifiable Areal Unit Problem* (density area-dependence);
Haklay (2010) VGI coverage non-neutrality (anti-erasure); Smith (1979/1987) rent-gap (disinvestment
vs up-market provision are sign-blind); Marcuse (1985) / Döring-Ulbricht displacement-driver
typologies (population change as displacement outcome); ADR-0024 method vocabulary;
`docs/methodology/OA-D0-geo-signoff.md` C5/C8/C10.

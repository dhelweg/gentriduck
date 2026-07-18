# OA-D3b density + per-capita (#280, OA-D3b remainder, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS WITH CONDITIONS**

> **Re-review update (2026-07-18, after F1 fix).** Original verdict was **CONCERNS**, blocked on
> Finding F1 (`density` mis-flagged `expected_temporal_safe = true`). The data-engineer applied the
> fix; I re-verified both files (see "F1 re-verification" below) and F1 is **RESOLVED**. Verdict
> moves to **PASS WITH CONDITIONS**, carrying only the binding downstream **Condition DP** (which was
> always going to bind D6/D7/site regardless of F1). Non-blocking recommendations R1–R3 stand.
> Note: a spatial-enabled `dbt build` could not run in this environment (spatial-extension egress is
> blocked); the geo-DS half carries that as its residual condition — it is not a domain-gate item and
> does not affect this domain verdict.

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the geo-DS half).
- **Artifact under review (this slice only):** the `density` and `percapita` additions —
  - `transform/models/intermediate/int_poi_offering_advantage_methods.sql` (methods 8 and 9,
    `oa_{domain,category,type}_{density,percapita}` + their `area_km2` / `ewr_population` CTEs and joins)
  - `transform/models/marts/mart_poi_oa_methods.sql` (the two new unpivot targets + labelling header)
  - `transform/seeds/seed_oa_calculation_methods.csv` (the `density` and `percapita` metadata rows)
- **Out of scope (reviewed separately):** the core six (OA-D3 domain sign-off) and `zscore_slq`
  (OA-D3b-zscore domain sign-off). Getis-Ord and area_level-rolled density are DEFERRED, not in this tree.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-18 (initial review + F1 re-review same day).
- **Provenance note:** this file replaces the invalid self-written sign-off deleted at `732fa561`.
  The code was merged at `5b32e989` on the strength of that self-attestation; this is the genuine
  independent domain verdict that was missing. It is not a rubber-stamp — the first pass returned
  CONCERNS on a real defect (F1), which the DE then fixed.

---

## Summary judgement

Construction-wise this slice is a faithful and unusually well-documented operationalization of OA-D0
domain **Condition C**. Both new columns are correctly built as *absolute provision* measures (a raw
local count divided by a non-share denominator — area, or residents), they are explicitly NOT
location quotients, and the two theory-critical caveats (density → MAUP/centrality confound;
per-capita → denominator endogenous to displacement) are planted at the source in SQL comments *and*
in the seed grounding, not merely promised. The never-blend / label-by-construct-family discipline
(`reference_point = 'absolute'`) is present and the mart carries a BINDING axis/legend-separation
header. On points 1, 2 and 4 of the review brief the slice passes.

The first pass returned **CONCERNS** on a single non-cosmetic defect (F1): the `density` seed row was
marked `expected_temporal_safe = true`, which was factually wrong, internally inconsistent, and in
direct contradiction of the binding OA-D0 domain Condition C.2. **That defect is now fixed and
re-verified** (see below), so the verdict moves to **PASS WITH CONDITIONS** — the only remaining
obligation is the binding downstream labelling **Condition DP**, which mirrors how OA-D0 Conditions
A–D and the zscore labelling condition were front-loaded onto their downstream consumers rather than
re-litigated at each step.

---

## F1 re-verification (RESOLVED)

**Finding F1 (was HIGH, blocking): `density` mis-flagged `expected_temporal_safe = true`.**
Re-verified both touched artifacts against the fix report:

1. **`seed_oa_calculation_methods.csv`** — the `density` row now reads
   `...,POIs per km2,absolute,false,false,"Openshaw (1984) MAUP; ..."` — i.e.
   `expected_temporal_safe = false`, now identical to `raw_share` and `percapita`. Correct: density's
   raw-count numerator over a time-invariant `area_km2` denominator carries the same OSM
   completeness-growth contamination as `raw_share`, so `false` is the only defensible value. ✔
2. **`int_poi_offering_advantage_methods.sql` note 8 (prose block)** — a `TEMPORAL-UNSAFE (#280 F1
   fix)` clause was added stating that `area_km2` is a time-invariant denominator, density is therefore
   proportional to the raw `local_stock` numerator and inherits the same completeness-growth
   contamination as `raw_share` (note 6), that OA-D0 geo C3 expects it to FAIL the
   completeness-contamination gate, and that OA-D0 domain Condition C.2 bars time-differencing without
   a D6 PASS. Reasoning is correct and styled consistently with `raw_share`'s note 6. ✔
3. **`int_poi_offering_advantage_methods.sql` inline column comment (the `oa_*_density` select)** —
   now carries the matching `TEMPORAL-UNSAFE` caveat citing geo C3 + domain C.2. ✔

The fix is exactly what F1 required — the correct value, the correct cross-references (geo C3 / domain
C.2), and the caveat propagated to both the prose and the inline comment where a future consumer will
see it. **F1 is closed; no residual concern.**

---

## Remaining findings for the data-engineer

### F2 — construct-family discriminator is not carried in the mart output (LOW — recommendation, non-blocking)

`mart_poi_oa_methods` unpivots all nine methods into one `oa_value` column keyed by `oa_method`, but
does **not** surface the `reference_point` (`absolute` vs `parent-relative`/`city-relative`) or the
now-corrected `expected_temporal_safe` flag that the never-blend and temporal-safety rules key off. A
consumer honours OA-D0 Condition C only if it separately joins `seed_oa_calculation_methods.csv` or
hard-codes the method→family map. This is acceptable for an internal serving layer with no public copy
yet (same reasoning as the zscore sign-off), but it means the safeguards are enforced by convention,
not by the row's own payload. **Recommendation (not blocking):** when a D7/site consumer is built,
either surface `reference_point` and `expected_temporal_safe` alongside `oa_value`, or gate the render
on a family join, so the axis-separation and temporal-safety rules are mechanically enforceable at
query time.

---

## Verification against the review brief

**1. Framed as absolute provision, cleanly separated from the LQ family? — YES.**
`reference_point = 'absolute'` for both rows (vs `parent-relative`/`city-relative` for the LQ
family). The int model notes 8/9 state "NOT a location quotient" and cite Condition C explicitly. The
mart header carries a BINDING instruction that consumers MUST NOT plot these on the same
axis/legend/colour-scale as the ratio-family or pp/score-family methods, with the reason stated
(different question — raw provision, not relative advantage). A downstream consumer cannot *honestly*
read "high density = gentrifying" from what is written; the residual risk is the F2 payload gap, not
mis-framing.

**2. Per-capita denominator-endogeneity-to-displacement caveat planted at the source? — YES.**
Present in three places a future consumer will see it: int model note 9 ("the population denominator
[is] ENDOGENOUS TO DISPLACEMENT … this caveat MUST travel with any downstream consumer/mart/page …
never presented as a clean 'demand' measure"); the final-`select` inline comment on the
`oa_*_percapita` columns; and the seed `grounding` cell. One substantive framing point on the record
(see Condition DP): per-capita structurally *couples the predictor with an outcome* — its numerator is
the POI stock (the lead/predictor side of the 2018 lead-lag hypothesis) while its denominator,
resident population, is itself part of the displacement *outcome*. It must never be read as a clean
lead indicator.

**3. Binding downstream-labelling condition (mirroring zscore's "never present significance as
importance")? — YES,** stated as Condition DP below.

**4. Grounding (R-C2)? — YES for density; ADEQUATE for per-capita.**
Density cites Openshaw (1984) MAUP + OA-D0 C5/C8 + Condition C (now also C.2/geo C3 for the temporal
caveat), in the SQL header, note 8, the inline comment, and the seed. Per-capita cites OA-D0 geo C10 +
domain Condition C in all three loci. See Recommendation R2 for a minor per-capita grounding
enhancement.

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
   thereby gentrifying — Openshaw 1984), and treat it as **temporally-unsafe** (now correctly flagged
   `expected_temporal_safe = false`): never difference density over time on a public surface unless the
   D6 completeness-contamination test shows PASS for that cell (OA-D0 Condition C.2 / geo C3).
3. **For `percapita`:** carry the denominator-endogeneity caveat verbatim — the resident denominator
   changes *with* displacement, so a rising POIs-per-1,000-residents figure can reflect population
   loss (post-displacement) rather than genuine amenity growth; it is a
   provision/displacement-*pressure* reading, never a clean "demand" or advantage measure, and never a
   lead indicator (its denominator is an outcome-side quantity).
4. **Both** inherit the coverage/anti-erasure disclosure (Haklay 2010) and the descriptive-not-causal,
   no-targeting framing the OA family already carries; a thin/NULL cell reads "too thinly observed,"
   never "no amenities / commercially dead."

This condition binds the downstream consumer, not this ticket — the model/mart are internal layers
with no public copy yet, so nothing here currently misleads a reader. It exists so the discipline is
not lost by the time a page consumes these columns (same front-loading logic OA-D0 used for
Conditions A–D).

---

## Recommendations (non-blocking)

- **R1 (F2):** surface `reference_point` and `expected_temporal_safe` in the mart output so the
  never-blend / temporal-safety rules are enforceable at query time, not only via an external seed join.
- **R2:** consider adding a primary displacement-literature citation for per-capita's
  denominator-endogeneity mechanism (e.g. Marcuse 1985 on exclusionary/displacement pressure, or the
  Döring/Ulbricht displacement-driver typology already cited in OA-D0) to the seed grounding, so the
  caveat is anchored to the theory, not only to a prior in-repo sign-off.
- **R3 (for the PM, not the DE):** I found no `*-density-percapita-geo-signoff.md` for this specific
  slice (only `OA-D3b-zscore-geo-signoff.md` exists). R-C1 is a *dual* gate — the geo-DS
  statistical-soundness half of this slice must also carry `Verdict: PASS` (the coordinator notes it
  is carrying a residual condition for the spatial-blocked build) before integration. Flagging for the
  PM to reconcile; it does not change my domain verdict.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0 / OA-D3 / OA-D3b-zscore sign-offs, the OA-D0 geo
sign-off conditions, and the coordinator's fix report. No web-fetched or non-maintainer issue/comment
text was treated as instructions.

---

**Verdict: PASS WITH CONDITIONS.** The density/per-capita construction is domain-valid; both
theory-critical caveats (density MAUP/centrality + temporal-unsafe; per-capita
denominator-endogenous-to-displacement) are correctly planted at the source and cleanly separated from
the LQ family. The blocking Finding F1 (`density.expected_temporal_safe` mis-flagged `true`) is
**RESOLVED** — the seed now reads `false` (matching `raw_share`/`percapita`) and the temporal-unsafe
caveat is added to both note 8 and the inline column comment, correctly citing OA-D0 geo C3 / domain
Condition C.2. Integration into `develop` is supported from the domain half of the gate, subject to
the binding downstream **Condition DP** (density/per-capita never blended with the LQ family; density
temporally-unsafe pending a per-cell D6 PASS; per-capita denominator-endogeneity, never a lead
indicator), which binds every D6/D7/site consumer. Recommendations R1–R3 are non-blocking; R3 is a
PM reconciliation item (the geo half of this slice must also record PASS).

Grounding (R-C2): OA-D0 domain sign-off Condition C.1/C.2 (density/per-capita as provision not
advantage; density coverage-contaminated over time; per-capita denominator endogenous to
displacement); Openshaw (1984), *The Modifiable Areal Unit Problem* (density area-dependence);
Haklay (2010) VGI coverage non-neutrality (anti-erasure); Smith (1979/1987) rent-gap (disinvestment
vs up-market provision are sign-blind); Marcuse (1985) / Döring-Ulbricht displacement-driver
typologies (population change as displacement outcome); ADR-0024 method vocabulary;
`docs/methodology/OA-D0-geo-signoff.md` C3/C5/C8/C10.

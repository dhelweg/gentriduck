# I15 — Offering-Advantage calculation review + subtype-value bug: findings

Ticket: `docs/epic-i/tickets/I15-oa-calculation-review.md` (#232). Data-engineer investigation
ahead of the R-C1 methodology gate (geo-data-scientist + gentrification-domain-expert sign-off).

## 1. Root cause of the `04200311` symptom

**Reported:** on `/gentriduck/area/04200311/`, all OA values for a POI type with subtypes look
identical.

**Reproduced and traced.** Querying `mart_poi_offering_advantage` directly for `area_code =
'04200311'`, latest `snapshot_year`, `weight_variant = 'standard'`, `methodology_variant =
'faithful'` returns 68 leaf rows (one per `poi_domain_h` x `poi_category_h` x `poi_type_h`
combination present in that PLR). `oa_category` and `oa_type` vary substantially within a
domain — e.g. under `Mobility` > `Individual`, `oa_type` ranges from 0.044 (Parking Ticket
Machine) to 4.18 (Taxi Stand); under `Public Service` > `Health`, from 0.51 (Doctor) to 6.02
(Clinic). `oa_domain` is, by construction, the **same value for every leaf row sharing that
domain** (it is a domain-level LQ, computed once per (city, year, area, vintage, weight_variant,
methodology_variant, domain) partition and repeated on every sibling category/type row —
ADR-0017 D1: category and type LQs are parent-domain-relative, not nested under
`oa_domain` itself). This is correct LQ semantics, not a bug — `mart_poi_offering_advantage_map`
(the domain-grain companion mart, #210) already documents and exploits exactly this fact
(`any_value(oa_domain)` is lossless there because `COUNT(DISTINCT oa_domain) = 1` per domain
group).

**The defect is in the page query, not the mart.** `web/pages/area/[code].md`'s "Offering
Advantage profile" radar chart runs:

```sql
select poi_domain_h, oa_domain
from gentriduck_marts.mart_poi_offering_advantage
where city_code = 'BER' and area_vintage = 'lor_2021' and weight_variant = 'standard'
  and methodology_variant = 'faithful' and area_code = '${params.code}'
  and snapshot_year = (...)
order by poi_domain_h
```

`mart_poi_offering_advantage` is **leaf-grain** (one row per domain/category/type triple), so
this query returns every leaf row, not one row per domain — for PLR `04200311` that is 68 rows
across 12 distinct domains. The `<script>` block then maps `poi_oa_radar` straight into the
radar's indicator/value arrays with no `GROUP BY`/`DISTINCT`, so a domain like `Mobility` (8
leaf rows: 7 `Individual` subtypes + 1 `Public Transport` stop) appears **8 times** on the
radar, every one at the same `oa_domain = 1.931` value — which is exactly what a viewer would
describe as "all OA values for a type with subtypes are identical." The identical values are
real (`oa_domain` genuinely is one number per domain); the bug is that the page renders one
point *per leaf row* instead of *per domain*, so the single correct domain value is duplicated
onto multiple redundant radar axes rather than being deduplicated first.

**Classification (per the ticket's decision tree): (c) page-query-only.** Not (a) mart grain —
`oa_category`/`oa_type` are independently computed and vary correctly (see §2 reconciliation
below). Not (b) a join — the mart's joins to `fct_poi_development`/area geometry are
unaffected; the radar query does not even use `oa_category`/`oa_type`.

**Fix and scope routing.** The correct fix is for the page to read from the already-existing
domain-grain companion mart (`mart_poi_offering_advantage_map`, built in #210 for exactly this
"per-domain, not per-leaf" access pattern used by `/poi-map`) instead of raw-selecting from the
leaf-grain `mart_poi_offering_advantage`, or to `GROUP BY poi_domain_h` / `DISTINCT` before
charting. Per this ticket's scope ("if it is page-query only, the fix routes to the
web-engineer pair as a small follow-up"), **no `web/` file was changed under this ticket.**
`docs/epic-i/tickets/I14-plr-deepdive-profile.md` already owns a full rework of this exact page
section (OA radar + % display) and is already gated to hold until I15 signs off — that ticket
is the natural landing spot for this fix; flagging it here so the implementer doesn't need to
re-diagnose it. No mart or model change was required for this symptom.

## 2. Reconciliation — hand-computed OA vs. the mart (sample PLRs)

Independently recomputed the domain-level and category-level LQ directly from raw
`fct_poi_development` counts (i.e. re-deriving the formula from scratch in a separate query,
not re-reading the model's own SQL) and compared to `mart_poi_offering_advantage`'s
`oa_domain`/`oa_category`, for `weight_variant='standard'`, `methodology_variant='faithful'`,
`snapshot_year=2026` (latest ingested), `area_vintage='lor_2021'`:

| PLR | domain leaves | max \|hand − mart\| (oa_domain) | max \|hand − mart\| (oa_category, Mobility) |
|---|---|---|---|
| `04200311` (bug-report PLR) | 12 | 0.0 | 0.0 |
| `04200309` | 10 | 0.0 | — |
| `05200418` | 5 | 0.0 | — |
| `12500926` | 10 | 0.0 | — |
| `11200514` | 11 | 0.0 | — |
| `02300316` | 10 | 0.0 | — |

Hand formula used (domain level): `(domain_local / all_domains_local) / (domain_city /
all_domains_city)`, aggregated straight from `fct_poi_development.poi_count`, independent of
`int_poi_offering_advantage`'s window-function implementation. All six PLRs match to
floating-point exactness (`0.0` diff). Category level checked for `04200311`'s `Mobility`
domain (`Individual` 0.387465, `Public Transport` 2.347464 — both exact). This directly
confirms: (a) the 3-level nested LQ formula in `int_poi_offering_advantage.sql` is implemented
correctly per ADR-0017 D1, and (b) `oa_category`/`oa_type` genuinely vary within a domain (they
are not silently copied from `oa_domain`), which is what makes §1's page-query explanation the
complete account of the reported symptom.

This complements the existing, already R-C1-signed-off golden validation
(`docs/epic-b/A3-oa-validation-findings.md`, `A3-oa-validation-{geo,domain}-signoff.md`, PASS
WITH CONDITIONS): domain-level Spearman rank agreement vs. the 2018 thesis's own OA columns
ranges rho 0.27–0.89 across all 13 domains (standard variant, current period), which this
ticket did not need to rerun (no formula/denominator change was made).

## 3. Full review against the thesis definition (R-C2)

- **Formula.** `int_poi_offering_advantage.sql`'s domain/category/type LQ expressions were
  checked column-by-column against `reference/system/71_oa.sql` / `70_oa_helper.sql`. Confirmed
  algebraically identical: thesis computes `(leaf_local / parent_local) *
  (parent_city / leaf_city)`; the model computes `(leaf_local / parent_local) / (leaf_city /
  parent_city)` — the same ratio, rearranged. Citations to `71_oa.sql`/`70_oa_helper.sql` and
  thesis pp. 55–56, 91 are already present in the model's header and inline next to each of the
  three LQ expressions (pre-existing from OA-A.2 #166); this ticket added an explicit ADR-0018
  cross-reference (see §5) since ADR-0018 postdates that ticket and formalizes the
  `methodology_variant='improved'` selection rule this model's `methodology_variant` column
  anticipates.
- **Denominators.** Parent-relative, per ADR-0017 D1 (category and type both divide by their
  parent **domain** total, never the grand all-domains total, and type does not nest under
  category) — confirmed both in the SQL's window-function partitions and in the thesis SQL's
  own column list (e.g. `t_restaurant_italiener_stock / d_gastronomie_stock`, not
  `.../c_restaurant_stock`).
- **Causal-tiered POI selection (ADR-0018).** `int_poi_offering_advantage.sql` builds only the
  **faithful** Run 1 (`methodology_variant='faithful'`, all types, no curation) — correct, per
  ADR-0017 D3's firm never-blend rule. The **improved** Run 2 tiering already exists as data
  (`seed_poi_offering_relevance.csv`, OA-B.1/B.2, ADR-0018 D1/D2) but is **not yet consumed** by
  any model that emits `methodology_variant='improved'` rows (that build is OA-B.3 #172,
  unbuilt) — so there is nothing to review at the "improved" tier-application level yet; this
  is expected, not a gap this ticket needed to close. Added an explicit ADR-0018 citation to
  both `int_poi_offering_advantage.sql` and `seed_poi_offering_relevance`'s `schema.yml` (they
  previously cited only "ADR-0017 D3" for the causal-tier rule, which ADR-0018 now formalizes as
  its own standing decision — R-C2 grounding gap, now closed).
- **Temporal handling / vintages.** `int_poi_offering_advantage` partitions every window sum by
  `area_vintage` as well as `weight_variant` (so `lor_pre2021`/`lor_2021` stocks, and
  `standard`/`gaussian_*` stocks, are never summed together across an incompatible boundary) —
  consistent with the vintage-bridging convention used elsewhere in the pipeline
  (`int_poi_share_base_2021`). No temporal-handling defect found.
- **Value scale.** Confirmed empirically continuous, not binned/rounded: sampled 68 leaf rows
  for `04200311` span 0.044–12.065 with no rounding to integers or bucket boundaries at the mart
  layer. The "coarse 0/1/2-style" *perception* reported in the comms review
  (`docs/assessment/2026-07-10-storytelling-comms-review.md` finding 7) traces to the **display**
  layer, not the data: `/poi-map`'s choropleth legend (`legendType="scalar"`) and the `/area`
  radar chart both show the raw LQ (e.g. `1.93`) without a `%`-vs-baseline framing or a
  purpose-built legend, which reads as coarse to a lay viewer even though the underlying number
  is a continuous float. This display-layer fix is explicitly owned by I14 (`% vs citywide
  baseline`) and I16 (map color-scale/legend rework), both of which are gated to land only
  after this ticket's sign-off (per the tickets' own dependency notes). **No mart change was
  needed to support a percentage display**: `pct_vs_baseline = (oa_domain - 1) * 100` (or the
  `oa_category`/`oa_type` equivalent) is a direct linear transform of the existing continuous
  columns, computable entirely in the display layer without a new mart column. This is recorded
  here so I14 does not need to re-derive it.

## 4. Divergences / open items (documented, not fixed by this ticket)

- The weighted (`gaussian_%`) variant currently built in this warehouse is
  `gaussian_500m`; ADR-0017 D2.3's OA headline recommendation is 1000 m. This was already
  flagged as a follow-up in `analysis/b_oa_validation.py`'s header comment before this ticket
  and is unchanged by it — rebuilding `int_osm_poi_plr_weighted` at 1000 m for the headline OA
  run remains a separate, already-tracked follow-up (OA-C.1 #174 scope), not a defect in the
  formula itself.
- D-3 (minimum-POI-base flag for low-POI PLRs) remains deferred per ADR-0017 D5, as already
  documented in `int_poi_offering_advantage.sql`'s header.

## 5. Model changes made by this ticket

Documentation-only (no formula/logic change — the calculation was already correct):

- `transform/models/intermediate/int_poi_offering_advantage.sql`: added an explicit ADR-0018
  citation in the `methodology_variant` section (previously cited only ADR-0017 D3 for the
  future improved-variant selection rule) and a review note recording this ticket's
  root-cause finding and reconciliation (§1–§2 above), so a future reader of this file sees the
  `04200311` investigation without re-deriving it.
- `transform/seeds/schema.yml` (`seed_poi_offering_relevance`): added explicit ADR-0018
  citations alongside the existing ADR-0017 D3 references for the tier-setting/non-circularity
  rule, since ADR-0018 is the standalone decision record that formalizes exactly this mechanic
  and postdates the seed's original authoring.

## 6. Verification run

- `uv run poe build` (dbt build, all layers) — see commit for result.
- `uv run poe test` — dbt tests including `test_c1_oa_weighted_mass_conservation_invariance`
  and the `mart_poi_offering_advantage`/`mart_poi_offering_advantage_map` grain/accepted-values
  tests.
- `uv run poe lint`.
- Reconciliation queries in §2 run against the built `data/gentriduck.duckdb` (not part of the
  dbt DAG; ad hoc verification for this write-up).

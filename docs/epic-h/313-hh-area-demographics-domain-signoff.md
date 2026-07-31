---
task: H / #313 — Widen `mart_area_demographics` to Hamburg (individual indicators only)
author: gentrification-domain-expert
date: 2026-07-31
branch: feature/313-hamburg-area-demographics
revision: 2 (re-review; supersedes revision 1 of this same file)
supersedes: prior revision of this file (Verdict PASS *conditional on uncommitted remedies*, 2026-07-31)
---

# Domain sign-off — #313 Hamburg area demographics in `mart_area_demographics` (re-review)

## This revision supersedes the previous one — and why

Revision 1 of this file recorded **PASS, conditional on C-1/C-2 being "committed to the branch"**,
and stated in §b that it had *verified* the `hh_l1_merged_to_district` crosswalk's four
Stadtteil→Bezirk assignments against Hamburg's Bezirk structure.

**That verification was of code that did not exist.** At the time revision 1 was written,
`transform/models/intermediate/dim_area_hierarchy.sql` was **completely unmodified** —
`git diff` on it was empty. The only trace of a crosswalk anywhere in the tree was a set of
*comments in other files* referring to a CTE nobody had written. Revision 1's own
*Integration precondition* section anticipated the risk in the weaker form ("if the remedies are
not committed, treat this sign-off as FAIL and re-request"); the actual situation was worse than
the form it anticipated — the remedy was not merely uncommitted, it was **absent**.

That condition is therefore **triggered**, and revision 1 is withdrawn in full. **None of revision
1's conclusions are relied upon in this document.** Every empirical and domain claim below has been
re-derived from scratch against the code that is actually in the tree today and against the built
local warehouse. Where I reach the same conclusion revision 1 reached, it is because I re-derived
it, not because I carried it forward.

Since revision 1, a data-engineer has implemented the `hh_l1_merged_to_district` CTE as a hardcoded
`VALUES` crosswalk and a data-engineer-reviewer has approved it. I have **not** taken either of
those on trust; the reviewer's approval is not evidence for this gate.

## Scope and artefacts

- **Branch:** `feature/313-hamburg-area-demographics`, HEAD `a98e06aa`, **plus an uncommitted
  working tree** carrying the C-1/C-2 remediation. This document reviews the **working-tree
  state**, pinned by content hash below — not `a98e06aa`, and not "whatever the tree contains at
  integration time".
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
- **Paired gate:** geo-data-scientist, revision 2 of
  `docs/epic-h/313-hh-area-demographics-geo-signoff.md` (**PASS**). I read it *after* completing my
  own verification; §4 there and §D-7 here reach compatible conclusions on the composite-code
  `area_name` question by different routes, and I go further than it does on the live-surface
  consequence.
- **Artefacts reviewed (fresh read of the full current diff + new file):**
  `dim_area_hierarchy.sql`, `mart_area_demographics.sql`, `mart_area_rollup_stage_mix.sql`,
  `transform/models/marts/schema.yml`, `transform/models/intermediate/schema.yml`,
  `stg_hamburg_ewr_stadtteil.sql`, `ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py`,
  `test_mart_area_demographics_hh_district_reconciliation.sql`, and the new untracked
  `test_mart_area_demographics_hh_district_completeness.sql`. Plus, for context:
  `web/pages/hamburg/maps.md`, `web/pages/hamburg/index.md`,
  `web/scripts/export_area_geojson.py`, `ingestion/berlin/mss/ingest_mss_indicators.py`.
- **Warehouse queried directly** (`data/gentriduck.duckdb`, read-only, `spatial` loaded):
  `dim_area_hierarchy`, `dim_area`, `stg_hamburg_geo`, `stg_hamburg_ewr_stadtteil`,
  `mart_area_demographics`, `mart_area_rollup_stage_mix`.

### Verdict is pinned to these exact file contents

To prevent a repeat of the revision-1 failure mode, this verdict applies **only** to the tree whose
reviewed files hash as follows (`git hash-object`). If any of these differ at integration time, the
verdict does not apply and must be re-requested:

| blob sha1 | file |
|---|---|
| `2d1ad4e43b17c7c2edb1b37a034adfa6dcfcd274` | `transform/models/intermediate/dim_area_hierarchy.sql` |
| `13c518f8bed4f935b95caa70e818d609d5a7ee93` | `transform/models/marts/mart_area_demographics.sql` |
| `1786976a2f668952e171e7d7bbfa4151cc471c78` | `transform/models/marts/mart_area_rollup_stage_mix.sql` |
| `341adb43326fefc7c866a10d51f8ee38c482e1c2` | `transform/models/marts/schema.yml` |
| `4a96d09ba0fc8e8dea491582f99038d8d986d899` | `transform/models/intermediate/schema.yml` |
| `8e218cfb5e2fe97d076abaa82723d8f3a726d138` | `transform/models/staging/stg_hamburg_ewr_stadtteil.sql` |
| `77dd3f99bed86515226a87c3cdf4ece36cfcd36e` | `ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py` |
| `f1981f00768c61bb425016d5b67ff9d1a67bc889` | `.../test_mart_area_demographics_hh_district_reconciliation.sql` |
| `e1e9b9764c176d30c40d578976e380dd722f1f47` | `.../test_mart_area_demographics_hh_district_completeness.sql` |

**SEC-3:** every empirical claim is derived from the local repo and local warehouse. No
`WebFetch`/`WebSearch` content informed this review. Background knowledge of German official
statistics (what a Melderegister can produce; what an *Arbeitslosenquote* is) is flagged as
inference where used.

---

## 1. D-1 (merged-unit deletion) — **RESOLVED. Verified against the implemented code, not the comments.**

### The crosswalk exists and is correct

`dim_area_hierarchy.sql` now carries a real `hh_l1_merged_to_district` CTE — a five-column
`VALUES` list, unioned into `unioned` between `hh_l1_to_district` and `ber_ortsteil_to_bezirk`,
emitting exactly four rows. I confirmed it materialises: querying the built warehouse,
`dim_area_hierarchy` contains

| `area_code` | `parent_area_level` | `parent_area_code` |
|---|---|---|
| `02117/118` | district | `1` |
| `02119/120` | district | `1` |
| `02702/703` | district | `7` |
| `02711/712` | district | `7` |

**I re-derived the Bezirk assignments independently** rather than reading them off the CTE's own
comment — by querying the WFS-sourced `stg_hamburg_geo` for each *constituent individual* Stadtteil
code and reading its source-provided `parent_area_code`:

| code | name (WFS) | parent |
|---|---|---|
| 02117 | Kleiner Grasbrook | `1` |
| 02118 | Steinwerder | `1` |
| 02119 | Waltershof | `1` |
| 02120 | Finkenwerder | `1` |
| 02702 | Neuland | `7` |
| 02703 | Gut Moor | `7` |
| 02711 | Moorburg | `7` |
| 02712 | Altenwerder | `7` |

Both halves of every pair share a Bezirk, from an independent source. `02117/118` and `02119/120`
→ Hamburg-Mitte (`1`); `02702/703` and `02711/712` → Harburg (`7`). **The crosswalk is correct, and
— domain-critically — no allocation judgement is being smuggled in.** Had a pair straddled two
Bezirke, resolving it would have required an apportionment rule, which would have been
methodology-bearing in its own right. It does not, so this is a lookup of an unambiguous fact.
`dim_area` independently confirms the district code format: HH districts are `1`–`7`
(`1` = Hamburg-Mitte, `7` = Harburg), un-padded — matching the crosswalk's `'1'`/`'7'` literals.

### It is a hardcoded crosswalk, not a fragile derivation — and that is the right call

The implementation is an explicit `VALUES` list of four source-confirmed facts. I endorse this over
any `substr()`/prefix derivation. A slash-joined composite (`'02117/118'`) has no well-formed
parent-digit position; a derivation would be a disguised hardcode with an extra failure mode. Four
facts, stated once, auditable in one place, with the grounding written next to them, is the honest
construction. The comment block also names the *source* of each assignment (the constituent codes'
WFS parents), which satisfies R-C2 grounding for a structural edge.

Robustness checks I ran myself:

- **No fan-out:** zero `subarea_l1` codes have more than one district parent.
- **Edge count:** 108 HH `subarea_l1 → district` edges = 104 individual WFS Stadtteile + 4
  composites. Consistent, no duplication.
- **No unresolved units:** left-joining all 99 distinct EWR `area_code`s against the hierarchy
  returns **0** rows without a parent. Every published EWR unit now resolves.
- **No double-count:** the individual constituents (`02117`, `02118`, …) do **not** appear in
  `stg_hamburg_ewr_stadtteil` at all — the EWR publishes the merged pair *instead of*, not *in
  addition to*, its halves. So adding the composite edge cannot double-count residents. I checked
  this explicitly because it is the obvious way a completeness fix could go wrong.

### The undercount is closed, and I re-measured it

Directly from `mart_area_demographics`, Σ`subarea_l1` `residents_total` vs Σ`district`
`residents_total`, **all 12 years: gap = 0.0**. (2024: 1,968,531 both sides.)

Re-measured magnitude of what was previously deleted, from the 2024 merged rows:

| unit | residents 2024 |
|---|---|
| `02117/118` | 1,098 |
| `02119/120` | 11,662 |
| `02702/703` | 1,821 |
| `02711/712` | 729 |
| **total** | **15,310** |

→ Hamburg-Mitte **12,760 of 309,432 = 4.12 %**; Harburg **2,550 of 178,341 = 1.43 %**; city-wide
**15,310 of 1,968,531 = 0.78 %**. These match the figures the code comments now assert, which I
verified rather than assumed.

### The domain-weight concern is addressed

My concern was never the 0.78 % arithmetic; it was **where** the error fell. Hamburg-Mitte is the
Bezirk this project has the most reason to measure carefully — HafenCity, Veddel, Wilhelmsburg,
St. Pauli — and the deleted units were port/industrial and peripheral areas whose demographic
profile diverges sharply from the Bezirk mean, so the deletion did not merely shrink a denominator,
it **shifted every intensive share** for two of seven Bezirke while the row reported itself as a
complete Bezirk. With the crosswalk in place, Hamburg-Mitte's rollup is now built from all 16
published EWR units, and the district row is what it claims to be. **Concern addressed.**

### Residual (carried, non-blocking) — these four rows are artefacts, not neighbourhoods

Unchanged from my earlier reading and re-confirmed: `02117/118` fuses **Kleiner Grasbrook** — the
Grasbrook development site, one of Hamburg's most consequential current new-build/upgrading
projects — with a near-unpopulated port district, permanently masking exactly the change signal a
gentrification product wants to see. `02119/120` is, demographically, **Finkenwerder** with a port
area attached. Fixing the *rollup* does not fix the *masking*; nothing can, at this source's grain.
Condition **C-4** carries this. Related: the geo-DS's observation that Hamburg `n_plr` counts
*published EWR units* (99), not official Stadtteile (104), is correct — I confirmed the district
`n_plr` values sum to 99, so Hamburg-Mitte reads 16 and Harburg 15 where the official Stadtteil
counts are 18 and 17. That is a labelling nit (**C-4d**), not an error.

---

## 2. D-2 (`unemployment_share` denominator) — **present, and unchanged in substance. Re-verified.**

I re-read all three locations rather than diffing against my memory of revision 1.

**Present and correct:**

- `ingest_hamburg_ewr_stadtteil.py` module docstring: states the denominator is **total resident
  population**, states explicitly that no `package_show`/`dialect.json` metadata and no linked
  Statistikamt Nord variable-definition document supplies it, gives the reproduced arithmetic, and
  says in terms: *"NOT independently confirmed from an authoritative Statistikamt Nord source
  document — state it as such (not as verified fact) in any downstream description."*
- `transform/models/intermediate/schema.yml`: denominator = total resident population, **not** the
  *Arbeitslosenquote*, **not** comparable to Berlin's MSS `arbeitslose_anteil` — with the
  double-mismatch named correctly (numerator SGB II vs. all registered unemployed; denominator
  working-age vs. total population) — and the "not independently confirmed" hedge intact.
- `transform/models/marts/schema.yml`: same three claims, plus *"do not present the two indicators
  side by side as if they measured the same thing"*, plus the note that because the denominator IS
  total population the `residents_total` rollup weight is **exact** rather than approximate.
- `mart_area_demographics.sql` header: the same, in condensed form, pointing at the schema entries.

**The epistemic hedging I asked to be preserved verbatim is preserved.** This matters more than it
looks: an inferred denominator asserted as fact would be exactly the kind of quiet
construct-validity failure that makes a published indicator unfalsifiable. It is stated as
inference, in all three places.

**I re-derived the arithmetic myself** (not carried over). Σ(`unemployment_share` ×
`residents_total`) across Stadtteile, per year:

| year | implied registered-unemployed stock | population | % of pop |
|---|---|---|---|
| 2013 | 70,577 | 1,782,217 | 3.96 |
| 2018 | 61,278 | 1,885,373 | 3.25 |
| 2020 | 81,718 | 1,898,420 | 4.30 |
| 2024 | 87,516 | 1,968,531 | 4.45 |

Those headcounts track Hamburg's actual registered-unemployed stock and the 2020 COVID spike; a
working-age denominator would imply a stock materially too low. **The total-population reading
holds.** And the practical consequence stands: Hamburg 2024 reads **4.45 %** here against an
official *Arbeitslosenquote* in the high-7s — a reader importing the familiar number misjudges by
roughly 1.7×, **in the flattering direction**. Labelling this column "unemployment rate" anywhere
public would be a factual error, and the repo now says so in three places.

Also verified: the Berlin construct claim is sourced, not asserted — `ingest_mss_indicators.py`
does map `s1 -> arbeitslose_anteil (Arbeitslosigkeit SGB II)`, so the "different numerator AND
different denominator" statement is grounded in this repo's own ingestor.

**Nothing in the new diff weakened any of this.** Confirmed unchanged. The reconciliation test was
additionally extended to pin `unemployment_share`'s rollup behaviour — a genuine improvement, and I
verified the pinned behaviour is the one documented (suppressed Stadtteil stays in the denominator;
see D-3).

---

## 3. NEW — D-7: the `mart_area_rollup_stage_mix` fallout. **NULL-not-fabricated is right. The row existing at all is the real question.**

This is the item that did not exist at revision 1, and it needs a fuller answer than the not-null
exception itself.

### What actually happens (verified, not inferred)

`mart_area_rollup_stage_mix` builds its area universe (`all_rollup_areas`) from **both sides of
`mart_area_hierarchy`**. Adding four child edges to the shared hierarchy therefore admitted four
new `subarea_l1` codes into that mart's universe. They have **zero leaf children** — no
statistisches Gebiet ever maps to a *composite* code, since the `subarea_l2 → subarea_l1` spatial
crosswalk only ever resolves to individual Stadtteile — so they fall into the MEDIUM-B
"structural orphan" branch and receive **13 placeholder rows each (52 total)**:
`area_name` NULL, `n_children` 0, `stage_weight` 0, every index NULL, `dominant_stage` NULL,
`typology_stage = 'uninhabited / no data'`. No composite code ever appears on the *parent* side
(verified: 0 rows), so nothing rolls into them, and district-level values are numerically
untouched — I confirmed the HH district rows and their `n_children` are unaffected.

### Is NULL right, or should we synthesize "Kleiner Grasbrook / Steinwerder"? — **NULL is right.**

Three domain reasons, and they are stronger than the "mirrors the `bezirk` precedent" argument the
code gives:

1. **A synthesized label would assert an entity that does not exist.** There is no Stadtteil called
   "Kleiner Grasbrook / Steinwerder". It has no boundary, no official name, no statistical office
   publishes it as a place. Writing that string into a warehouse column called `area_name` converts
   a *disclosure-control artefact* into an apparent *neighbourhood* — which is precisely the misread
   my D-1 residual warns against. Fabricating the name would make the artefact **more** convincing,
   not less.
2. **It would collide with the real areas, which are already present.** This is the fact that
   settles the erasure question. In `mart_area_rollup_stage_mix`, the constituent Stadtteile exist
   **under their own names, with real data**: `02117` Kleiner Grasbrook (13 leaf children, stages
   ranging *improving-vulnerable* → *pre-gentrification*), `02120` Finkenwerder (175 children),
   `02702` Neuland (81), `02711` Moorburg (13); `02118` Steinwerder, `02703` Gut Moor and `02712`
   Altenwerder are already-existing named uninhabited placeholders. A synthesized composite label
   would put a second, overlapping "area" into the same table alongside them — the same ground
   counted under two names, one of them invented.
3. **This mart is not the demographics mart.** The composite code carries *no information here*.
   Its entire content is "a code from a different source's unit universe". A label would imply
   there is something to look at.

### Does NULL re-create an erasure problem? — **No, and the reason is specific.**

My D-1/C-4 anti-erasure concern is about *people and places disappearing from counts and views*.
Here, nobody disappears:

- In `mart_area_demographics`, the 15,310 residents are present at `subarea_l1` **and** now correctly
  included at `district` — that is exactly what this ticket fixed.
- In `mart_area_rollup_stage_mix`, the *neighbourhoods* are present under their own names with their
  own POI-typology signal. Kleiner Grasbrook is visible and classified.

So this is the **inverse** of erasure: an information-free artefact row has been made *visible*
without a label, not a real place made invisible. `NULL`-not-fabricated is the correct posture, and
it is the same posture the geo-DS reaches (§4: "do not backfill `area_name` in the warehouse").

### But there is a real residual, and it is not the missing name — it is the label that *is* there

The four rows carry `typology_stage = 'uninhabited / no data'` on a **live published surface**.
`web/pages/hamburg/maps.md` is not a placeholder: its `areas_rollup` / `area_table_rollup` /
`area_mix_table` blocks query `mart_area_rollup_stage_mix` directly at `subarea_l1` grain with
**no filter that would exclude orphan rows**. The choropleth itself is safe — it joins client-side
to a geojson built from `dim_area_geometry`, which has no composite features, so the rows simply do
not paint. The **tables** will show four nameless rows tagged *"uninhabited / no data"*.

From a domain standpoint that label is **factually wrong about those units**: `02117/118` has 1,098
residents, `02119/120` has 11,662 (it is essentially Finkenwerder, an inhabited Stadtteil),
`02702/703` 1,821, `02711/712` 729 — 15,310 people declared "uninhabited" on a public page. In this
mart the string means "no habitable leaf children mapped", which no reader can be expected to
infer, least of all from a row with no name. This repo already treated exactly this defect class —
a label that is unconditionally true-sounding but false for some rows — as **blocking** at the #310
domain gate (findings D2 and D2-R1). The incremental harm here is much smaller (4 information-free
rows, no numeric contamination, an existing precedent of 5 named placeholder rows on the same
page), which is why I do not block; but it is the same defect, introduced by this ticket, onto a
live surface.

**My recommendation (C-9), in preference order:** exclude codes with no geometry from this mart's
rollup universe (a one-predicate change in `all_rollup_areas`), since the POI-typology universe is
legitimately the *WFS geometry* universe (104 Stadtteile) while the demographics universe is the
*EWR publication* universe (99 units) — these are different unit universes for good reasons, and
this mart should carry its own. Failing that, give the four rows an explicit artefact marker rather
than the false "uninhabited" bucket. Excluding them is not erasure by my own standard: they contain
no information, their constituents are fully represented, and the exclusion would be documented.

### And a stale-claim cluster the fix left behind (D-8)

The same side-effect invalidated three written claims that were **not** updated:

1. `transform/models/intermediate/schema.yml`, `dim_area_hierarchy.area_code` description:
   *"Every row here is itself sourced from a `dim_area` (or, for Hamburg, `stg_hamburg_geo`) row,
   so a dedicated FK test would be redundant … not null is sufficient here."* This is now **false**
   — the four composite codes come from a hardcoded `VALUES` list and have **no `dim_area` row**
   (I verified: `dim_area` contains no slash-bearing code). The stated *justification for omitting
   the FK test* is therefore void. This is the invariant whose breach caused the `area_name` gap in
   the first place, and it is exactly the R-C2 grounding discipline that the description now
   misstates.
2. `mart_area_rollup_stage_mix.sql`, `area_orphans` comment: *"Confirmed empirically (2026-07-30):
   exactly BER ortsteil 0608/1106 and HH subarea_l1 02118/02119/02121/02703/02712"* — the orphan set
   now also contains the four composites. Stale.
3. `web/pages/hamburg/maps.md` (~line 346): *"Hamburg's subarea_l1/district `area_name` is real (no
   Berlin-Bezirk-style blank-name gap …), so unlike /berlin/maps this page has no name-fallback
   lookup"* — now false, on the page that renders the gap.

None of these is a numeric error; all three are accuracy defects in load-bearing documentation, in
a repo whose gate rests on written grounding. Condition **C-10**.

### Minor: the test exception is shape-scoped, not city-scoped

`where: "area_level != 'bezirk' and area_code not like '%/%'"` exempts *any* slash-bearing code in
*any* city, present or future, from the `area_name` not-null check. Today that is exactly the four
known codes (verified: no other slash-bearing code exists anywhere in `dim_area` or
`dim_area_hierarchy`), so it is correct now. But it is a **pattern-shaped** exemption where a
**fact-shaped** one (`city_code = 'HH' and area_code in (...)`) would fail loudly when a new city
brings its own composite codes, instead of silently absorbing them. Non-blocking; **C-10b**.

---

## 4. Re-affirmation of the other findings and forward conditions

All re-checked against the current tree; **nothing in the new diff invalidates any of them.**

- **D-3 (suppression bias direction) — re-derived, still holds, and the C-1 fix marginally
  increases it in Harburg.** `sum(share × residents) / sum(residents)` keeps a suppressed
  Stadtteil's residents in the denominator while its NULL share drops from the numerator → district
  values biased **downward**. Re-measured for 2024 against the *fixed* tree: Bergedorf **3.7159 %
  as built vs 3.7606 % corrected** (−0.045 pp, −1.19 % relative, 3 suppressed units / 1,594
  residents); Harburg **4.8422 % vs 4.9065 %** (−0.064 pp, −1.31 % relative, 3 units / 2,336
  residents). Suppression is confined to `unemployment_share` and to Bergedorf/Harburg, 0 units
  2013–2017 then 5–7 per year 2018–2024 — and `any_indicator_suppressed` fires on exactly those
  rows. **New nuance:** `02711/712` is itself suppressed, so the C-1 fix adds 729 residents to
  Harburg's suppressed pool (1,607 → 2,336), very slightly *increasing* the downward bias there.
  Right trade — completeness of the denominator beats a 0.06 pp intensive-share bias — but it should
  be stated. **C-3b** stands, with these refreshed numbers.
- **D-4 (provenance) — unchanged.** A Melderegister cannot produce unemployment counts (inference,
  not a checked citation); that column necessarily originates from a labour-market administrative
  source compiled by Statistikamt Nord, yet `source_attribution` carries one string for all seven
  indicators and the models call the set "EWR-equivalent". The new ingestor docstring improves this
  (it now names the source column and its metadata gap) but does not close it. **C-4b** stands.
- **D-5 (`bezirk` vs `district` level-name asymmetry) — unchanged and re-confirmed.** Berlin's
  Bezirk tier is `bezirk`, Hamburg's is `district`; a cross-city consumer must special-case both,
  and the likely failure mode is a chart that *silently omits one city*. Architect matter
  (ADR-0005), not a #313 blocker.
- **D-6 (stale published claim) — still stale.** `web/pages/hamburg/index.md:24` still reads
  "`fct_gentrification_change` / `mart_area_demographics`: still BER-only". #313 makes the second
  half false. Process-honesty copy; fix here or in the immediate web follow-up. **C-4c** stands.
- **R1/R2/R3 (cross-city construct validity) — unchanged.** NULL remains overloaded ("not published"
  vs "suppressed"); the mart description now names `mart_mss_area_aggregate` so R2 is resolved; and
  the grain asymmetry re-measured today is **Hamburg Stadtteil n=99, median 15,633, max 95,836 vs
  Berlin PLR n=540, median 7,224, max 16,901** — **2.16× coarser at the median, 5.67× at the
  maximum**, sitting between Berlin's PLR and BZR (n=143, median 26,387). District ↔ Bezirk is well
  matched (7 × median 280,987 vs 12 × median 312,796). **C-6** stands.
- **ADR-0008 / #329 non-precedent clause — re-affirmed verbatim.** Registered unemployment is a
  **status/outcome** measure (an MSS D1 *Statusindex* input in the Berlin system this project
  references), so a descriptive demographics mart places it on the **correct side** of the
  lead-predictor / lag-outcome divide. I re-verified the separation empirically: this mart reads
  `int_ewr_demographics_wide_hamburg → stg_hamburg_ewr_stadtteil` only; it never touches
  `int_ewr_socioeco_hamburg[_disagg]`; `gentrification_index`, `int_ewr_socioeco*` and
  `fct_gentrification_change` are untouched by this branch. **This PASS is scoped to descriptive,
  non-composited display. It must not be cited in #329 as evidence that `unemployment_share` is
  acceptable as a D4 predictor input.** I note the geo-DS's observation that the original ADR-0008
  sentence was displaced from `schema.yml` during the C-2 rewrite; I agree it should be restored
  (**C-4e**), and record here that its absence from the SQL does not weaken the clause — this
  document is its authority.
- **Stigmatization increment (unemployment ≠ `foreigners_share`) — unchanged.** Parity of caveat is
  necessary, not sufficient: unemployment carries an explicit deficit valence in German urban policy
  (it is the canonical MSS deprivation marker, the vocabulary of *Gebiete mit besonderem
  Aufmerksamkeitsbedarf*), it maps the rent gap (Smith 1979) more directly than any other column
  here, and it is uniquely liable to be misread as a different official statistic. **C-5** carries
  the increment to the web slice.
- **Design conditions from the earlier consultation — all four still honoured.** No blended Hamburg
  composite (I re-enumerated the final `union all`: 22 columns, all individual indicators plus
  `n_plr` and `any_indicator_suppressed`); Stadtteil grain only, `subarea_l2` structurally excluded;
  framing caveat present at the data layer; nothing fabricated (Berlin-only indicators
  `cast(null as double)` for Hamburg and vice versa).
- **Test quality — verified, not taken on trust.** The new completeness test compares the mart's own
  `subarea_l1` total against its own `district` total with **no** `dim_area_hierarchy` join, so it is
  not blind in the way the reconciliation test structurally is. I reproduced its logic directly
  against the warehouse: gap = 0 for all 12 years. The reconciliation test's new scope note honestly
  documents its own blindness, which is the right correction to make in place.

---

## Conditions

**Blocking (must hold at integration):**

- **C-0 (process, replaces revision 1's C-1/C-2).** The PM must verify the nine files hash as
  listed in *Verdict is pinned to these exact file contents* **and are committed to the branch**
  before integrating into `develop`. Revision 1 failed precisely because a sign-off was issued
  against described-but-absent code; a hash check is cheap and closes that hole. If any hash
  differs, this verdict does not apply.

**In-ticket, non-blocking (do here if cheap, otherwise an immediately-filed follow-up):**

- **C-9 (D-7).** Resolve the four nameless `'uninhabited / no data'` rows in
  `mart_area_rollup_stage_mix` **before `/hamburg/maps` next deploys**. Preferred: exclude
  geometry-less composite codes from that mart's rollup universe. Acceptable: an explicit
  artefact marker replacing the false "uninhabited" bucket. Not acceptable: synthesizing an
  `area_name`.
- **C-10 (D-8).** Correct the three stale claims: `dim_area_hierarchy.area_code`'s "every row is
  sourced from `dim_area`/`stg_hamburg_geo`" description (and revisit whether the FK test it
  waives should now exist, scoped); `mart_area_rollup_stage_mix`'s `area_orphans` "exactly …" list;
  and `web/pages/hamburg/maps.md`'s "no blank-name gap" comment.
- **C-10b.** Prefer a fact-scoped not-null exception (`city_code = 'HH' and area_code in (…)`) over
  the shape-scoped `area_code not like '%/%'`.
- **C-3.** Publish a per-city **indicator-availability matrix** (Hamburg analogue of
  `docs/epic-i/I19-area-data-inventory.md`). This — not a "shared core" schema tier — is what the
  maintainer's hybrid ruling needs to be operationally real. A shared-core tier would encode
  Berlin-normativity and invite lowest-common-denominator erasure (Robinson, *ordinary cities*;
  Lees on comparative gentrification).
- **C-3b (D-3).** State in `unemployment_share`'s description that a district value with
  `any_indicator_suppressed = TRUE` is biased **downward**, with the measured magnitude
  (≈1.2–1.3 % relative, ≤0.07 pp; Bergedorf and Harburg, 2018 onward).
- **C-4 (D-1 residual).** Note that the four merged codes are **disclosure-control artefacts, not
  neighbourhoods**, and specifically that `02117/118` masks Kleiner Grasbrook (the Grasbrook
  development site). Partially done in the staging/ingestor headers; make sure it survives into any
  reader-facing description.
- **C-4b (D-4).** One clause noting `unemployment_share` originates from a labour-market
  administrative source, not the resident register (flagged as inference), and that
  "EWR-equivalent" denotes the compiled Stadtteil table, not a single register.
- **C-4c (D-6).** Correct the now-false "`mart_area_demographics`: still BER-only" claim in
  `web/pages/hamburg/index.md`.
- **C-4d.** One line stating Hamburg's `n_plr` counts **published EWR units** (99), of which 4 are
  merged pairs — so it undercounts official Stadtteile by 2 in Hamburg-Mitte and 2 in Harburg.
- **C-4e.** Restore the displaced ADR-0008 sentence to `unemployment_share`'s `schema.yml`
  description: presence in this descriptive mart is **not** clearance for D4 predictor use; #329
  remains the authority.

**Forward conditions for the Hamburg web slice (record now, bind at that ticket's gate):**

- **C-5.** `unemployment_share` inherits the full I19 web condition set — no ranking/sorting
  affordance, always co-presented with structural context, purely descriptive dated/sourced
  language — **plus**: (i) label it "registered unemployed per 100 residents", never "unemployment
  rate"/*Arbeitslosenquote*, with the ~4.45 % vs ~7.6 % divergence explained wherever the number
  appears; (ii) no cross-city league table, no Berlin MSS juxtaposition; (iii) no forward-looking,
  risk-scoring or "watch this area" framing.
- **C-6.** No visual placing Berlin PLR and Hamburg Stadtteil values on a shared scale, ranking or
  "most/least" list without stating the ~2.2× median grain difference. The comparable pairings are
  Berlin Bezirk ↔ Hamburg district, or Berlin BZR ↔ Hamburg Stadtteil with the caveat stated.
- **C-7 (G2 methodology page).** State that NULL means "this city's source does not publish this
  indicator" or "disclosure-suppressed" — never zero, never "low" — and that a partially-populated
  cross-city table is a statement about **data landscapes**, not about the cities. Also carry the
  D-2 denominator caveat and the D-3 bias direction there, and do not let the inferred denominator
  harden into an asserted fact without a Statistikamt Nord definition.
- **C-8 (routing hazard).** The four merged `area_code`s contain a `/`. Any Evidence dynamic route
  or URL built from `area_code` must handle that, or those four units will 404 — silently
  disappearing from the site and re-creating D-1 at the presentation layer. Handle display names for
  them in the presentation layer with an explicit map plus a merge footnote (never by backfilling
  `area_name`).

---

## Verdict

Both findings that were genuinely blocking are now **actually implemented in the tree**, and I
verified them from first principles rather than from the comments describing them. The
`hh_l1_merged_to_district` crosswalk exists as real SQL, materialises four correct edges, and its
Bezirk assignments reproduce independently from the WFS-sourced `stg_hamburg_geo` parents of each
constituent Stadtteil — with both halves of every pair sharing a Bezirk, so no apportionment
judgement is hidden in it. The hardcoded `VALUES` construction is the honest one for four
source-confirmed facts on codes that have no derivable structure. Σ`subarea_l1` = Σ`district` in
all 12 years, no double-count is possible (the EWR publishes the pair *instead of* its halves), and
Hamburg-Mitte — HafenCity, Veddel, Wilhelmsburg, St. Pauli, the Bezirk this project most needs to
get right — is no longer 4.1 % short while reporting itself complete. **D-1 is resolved and my
domain-weight concern is addressed.** The D-2 denominator language is present, unchanged in
substance, and — critically — still states the total-population reading as *inference from the
arithmetic*, not as a confirmed Statistikamt Nord definition; I reproduced that arithmetic myself
and it holds.

On the new `mart_area_rollup_stage_mix` fallout: **NULL-not-fabricated is the correct posture**, and
more firmly than the `bezirk` precedent alone would justify — a synthesized "Kleiner Grasbrook /
Steinwerder" would invent an entity that no statistical office publishes and would sit in the same
table as the *real* Kleiner Grasbrook, which is present there under its own name with its own POI
typology. There is no erasure: in this mart the neighbourhoods are visible and the composite codes
carry no information at all. The genuine residual is the opposite of erasure and it is not the
missing name — it is that four information-free rows now appear on a **live** page labelled
*"uninhabited / no data"* for units housing 15,310 people, together with three now-false written
claims the fix left behind. Those are documentation-and-presentation defects with cheap remedies
(**C-9**, **C-10**), not methodology errors, and they are far outweighed by the 15,310-person
silent deletion this ticket closes.

My remaining findings (D-3 suppression-bias direction, re-measured; D-4 provenance; D-5 level-name
asymmetry; D-6 stale published claim) are documentation-grade, and the stigmatization increment
specific to unemployment lands where I19's precedent puts it — as forward conditions on the web
slice. The ADR-0008 non-precedent clause is re-affirmed: this is a **descriptive** publication of a
**status/outcome** indicator and must not be laundered into #329 as clearance for D4 predictor use.

This verdict applies to the exact working-tree contents hashed above, and to nothing else.

**Verdict: PASS**

```json
{
  "verdict": "pass",
  "scope": "Working-tree state of feature/313-hamburg-area-demographics on top of a98e06aa, pinned by the nine blob hashes listed in this document. Does NOT apply to a98e06aa alone, nor to any tree whose reviewed files differ.",
  "supersedes": "Revision 1 of docs/epic-h/313-hh-area-demographics-domain-signoff.md (Verdict PASS conditional on uncommitted remedies, 2026-07-31). That revision stated it had verified a hh_l1_merged_to_district crosswalk that did not exist anywhere in the tree; its own integration precondition is thereby triggered and it is withdrawn in full. None of its conclusions are relied upon here.",
  "domain_rationale": "The D-1 merged-unit deletion is genuinely fixed: the hh_l1_merged_to_district CTE exists as real SQL, materialises four correct edges, and its Bezirk assignments (02117/118, 02119/120 -> Hamburg-Mitte '1'; 02702/703, 02711/712 -> Harburg '7') were re-derived independently from stg_hamburg_geo's WFS-sourced parent of each constituent Stadtteil. Both halves of every pair share a Bezirk, so no apportionment judgement is concealed. Hardcoded VALUES is the right construction for four source-confirmed facts on slash-joined codes with no derivable structure. Sum(subarea_l1) == sum(district) residents for all 12 years; double-counting is structurally impossible because the EWR publishes the merged pair instead of its halves; the 15,310-resident / 4.12%-of-Hamburg-Mitte / 1.43%-of-Harburg undercount is closed, which matters because those port/peripheral units diverge sharply from the Bezirk mean and their deletion shifted every intensive share for two of seven Bezirke while the row claimed completeness. D-2 documentation is present and unchanged in all three locations, retaining the essential 'inferred from arithmetic, not confirmed from a Statistikamt Nord definition' hedge; the arithmetic was reproduced independently (implied registered-unemployed stock 70.6k/2013, 61.3k/2018, 81.7k/2020, 87.5k/2024) and confirms a total-resident-population denominator, hence not the Arbeitslosenquote (4.45% vs ~7.6%) and not comparable to Berlin's MSS arbeitslose_anteil (different numerator AND denominator). Unemployment is a status/outcome measure, so descriptive publication places it on the correct side of the ADR-0008 lead/lag divide; separation from int_ewr_socioeco_hamburg and gentrification_index verified empirically.",
  "theory_risks": [
    "The four merged codes are disclosure-control artefacts, not neighbourhoods; 02117/118 permanently fuses Kleiner Grasbrook (the Grasbrook development site) with a near-unpopulated port district, masking exactly the change signal this product exists to detect. Fixing the rollup does not fix the masking, and nothing can at this source's grain.",
    "NEW (D-7): the fix admitted four geometry-less composite codes into mart_area_rollup_stage_mix as 52 information-free placeholder rows labelled 'uninhabited / no data' with NULL area_name, on the LIVE /hamburg/maps page whose tables query that mart with no orphan filter. That label is factually false about 15,310 residents. Numerically harmless (weight 0, no double-count, district values unaffected) but it is the same 'unconditional label false for some rows' defect the #310 domain gate treated as blocking, at much smaller scale.",
    "NEW (D-8): the fix invalidated three written claims left uncorrected -- dim_area_hierarchy.area_code's schema.yml description still asserts every row is sourced from dim_area/stg_hamburg_geo (false; the composites come from a VALUES list and have no dim_area row), which is also the stated justification for omitting an FK test; mart_area_rollup_stage_mix's area_orphans 'exactly ...' list is now incomplete; and web/pages/hamburg/maps.md still asserts Hamburg has no blank-name gap.",
    "D-3: district unemployment_share is biased downward wherever any_indicator_suppressed is TRUE (suppressed Stadtteile stay in the denominator). Re-measured 2024: Bergedorf 3.7159% vs 3.7606% corrected, Harburg 4.8422% vs 4.9065%. The C-1 fix marginally increases this in Harburg because 02711/712 is itself suppressed (suppressed pool 1,607 -> 2,336 residents) -- the right trade, but it should be stated.",
    "D-4: unemployment_share cannot originate from a Melderegister; it is a labour-market administrative series compiled into the Stadtteil table, yet a single source_attribution string covers all seven indicators and the models call the set 'EWR-equivalent'.",
    "D-5: Berlin 'bezirk' vs Hamburg 'district' name the same administrative tier; the likely consumer failure mode is a chart that silently omits one city.",
    "D-6: web/pages/hamburg/index.md still claims mart_area_demographics is BER-only.",
    "R3 / MAUP: Hamburg Stadtteile (n=99, median 15,633, max 95,836) are 2.16x coarser at the median and 5.67x at the maximum than Berlin PLR (n=540, median 7,224, max 16,901); 'Hamburg looks calmer' would be a geography artefact.",
    "Stigmatization: unemployment is the canonical MSS deprivation marker and maps the rent gap (Smith 1979) more directly than any other column here; parity with foreigners_share's caveat is the floor, not the ceiling.",
    "NULL remains overloaded across cities ('not published' vs 'disclosure-suppressed'), and any_indicator_suppressed cannot say which column was suppressed.",
    "n_plr counts published EWR units (99), not official Stadtteile (104) -- undercounts by 2 in Hamburg-Mitte and 2 in Harburg."
  ],
  "recommendations": [
    "C-0 (blocking, process): PM verifies the nine listed blob hashes and that the files are COMMITTED before integrating into develop. This closes the exact hole that invalidated revision 1 -- do not accept a described-but-absent remedy again.",
    "C-9: resolve the four nameless 'uninhabited / no data' rows in mart_area_rollup_stage_mix before /hamburg/maps next deploys. Preferred: exclude geometry-less composite codes from that mart's rollup universe (the POI-typology universe is legitimately the 104-Stadtteil WFS universe, distinct from the 99-unit EWR publication universe). Acceptable: an explicit artefact marker instead of the false 'uninhabited' bucket. Never: synthesize an area_name.",
    "C-10: correct the three stale claims (dim_area_hierarchy.area_code description plus a re-think of the FK test it waives; area_orphans comment; hamburg/maps.md 'no blank-name gap').",
    "C-10b: prefer a fact-scoped not-null exception (city_code = 'HH' and area_code in (...)) over the shape-scoped area_code not like '%/%', so a future city's composite codes fail loudly instead of being silently absorbed.",
    "C-3: publish a per-city indicator-availability matrix (Hamburg analogue of docs/epic-i/I19-area-data-inventory.md) rather than a shared-core schema tier, which would encode Berlin-normativity.",
    "C-3b: document the suppression-driven downward bias and its magnitude on the column description and later on the G2 methodology page.",
    "C-4/C-4b/C-4c/C-4d/C-4e: keep the 'artefacts, not neighbourhoods' note reader-facing; add the labour-market-provenance clause; fix the stale BER-only claim; state that Hamburg n_plr counts EWR units; restore the ADR-0008 'not clearance for D4 predictor use' sentence to schema.yml.",
    "C-5/C-6/C-7/C-8 bind at the Hamburg web slice's own gate: label it 'registered unemployed per 100 residents' never 'unemployment rate', no ranking or cross-city league table, no risk-scoring framing, no shared Berlin-PLR/Hamburg-Stadtteil scale without the 2.2x grain caveat, NULL explained as data-landscape not deficiency, and slash-bearing area_codes handled in routing with presentation-layer display names plus a merge footnote.",
    "Non-precedent clause: this PASS is scoped to descriptive, non-composited display of unemployment_share. It must not be cited in #329 as evidence that the indicator is acceptable as a D4 predictor input."
  ]
}
```

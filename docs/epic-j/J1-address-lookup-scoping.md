# J1 — Address-level lookup: architecture scoping (#328)

- **Author:** `system-architect` (architecture/sizing half only)
- **Date:** 2026-07-31
- **Status:** Scoping — **not an ADR**. No tool is adopted here. An ADR follows *after* the
  maintainer's gated decisions (geocoder, NL generation, monetization) land, per #328's
  "explicit gate, not delegated" framing.
- **Ticket:** #328 (`epic-j/328-address-lookup-scoping`)
- **Companion section:** the methodology-framing questions (distance-decay, edge-of-coverage,
  MAUP, uncertainty communication) are the `geo-data-scientist`'s and are answered in
  [§4](#4-methodology-framing-geo-data-scientist) below by the `geo-data-scientist` — not by me.

---

## 0. Top-line answers

| Question | Answer |
|---|---|
| Is a client-side-only approach feasible at Berlin+Hamburg scale? | **Conditional YES** — feasible if the point exports are restricted to (a) the **latest snapshot year only** for POIs and (b) the **latest vintage only** for address points, and are shipped as **spatially-partitioned parquet** rather than one blob. Shipping the full 2008–2024 POI history point-level is **not** feasible client-side. |
| Does geocoding force a thin server component? | **NO — not for Berlin+Hamburg**, and this is the interesting finding. Both cities publish **open, licensed address-point datasets** (Berlin GDI Wohnlagen/Hauskoordinaten, Hamburg ALKIS-Adressen, dl-de). A local, in-bundle **address index gives exact German address matching without Nominatim at all** — no rate limit, no usage-policy conflict, no server. Nominatim only becomes necessary if the product must accept *free-form, worldwide, fuzzy* input; that is a product-scope choice, not an architectural necessity. |
| Recommended phasing (Phase 1–4)? | **Endorsed with one refinement**: swap the geocoding assumption in Phase 1 (local address index, not an external geocoder) and split Phase 2 into 2a (export) / 2b (UI). See [§3](#3-phasing). |

---

## 1. Client-side feasibility & sizing

### 1.1 What ADR-0012 already commits us to

[`docs/adr/0012-serving-and-hosting-stack.md`](../adr/0012-serving-and-hosting-stack.md) decided
**Option A (static export + in-browser DuckDB-WASM over bundled parquet)** and explicitly rejected
MotherDuck-backed serving (decision 2: MotherDuck is *"never on the path between a visitor and the
website"*). It also names the escape hatch (decision 5): *"If a future dataset genuinely outgrows a
client-side bundle (e.g. the full longitudinal OSM POI history exposed raw to the browser), revisit
with a hybrid … behind its own ADR"*. #328 lands almost exactly on that sentence, so the sizing
question is: **does address-level lookup need the raw longitudinal history, or only a thin
present-day point layer?** It needs only the latter — which keeps us inside Option A.

Two hard constraints carry over: Amendment A pins hosting to **GitHub Pages** (Cloudflare rejected
over the 25-MiB/file wasm limit), so there is no per-file cap in practice but a soft ~1 GB
site / ~100 GB-month bandwidth envelope; and golden rule #5 (local-first, previewable with no
account) must survive whatever we add.

### 1.2 POI points — `stg_osm_poi`

[`transform/models/staging/stg_osm_poi.sql`](../../transform/models/staging/stg_osm_poi.sql) already
carries `lon`/`lat` per POI per `snapshot_year` (2008–2024, both cities), with
`osm_id, poi_domain, poi_category, poi_type, cuisine, area_code, source_attribution`. **The point
geometry is not lost at ingestion** — #328's framing ("POI lat/lon gets discarded after
point-in-polygon joins") is true of the *published* marts, not of staging. That is a big deal: the
Phase-2 export is a **new export of data we already hold**, not new ingestion.

Sizing (order-of-magnitude; I could not run DuckDB in this session — see *Sizing caveat* below):

- The taxonomy in `ingestion/berlin/osm/ingest_osm_history.py` is broad — it includes high-count
  street furniture (`bench`, `waste_basket`, `bicycle_parking`, `parking`, `post_box`,
  `vending_machine`) alongside the analytically interesting Gastronomy/Retail/Entertainment classes.
  A realistic latest-year Berlin figure is **~200–300k mapped points**, Hamburg roughly half at
  **~100–150k**. Call it **~400k points for the latest year, both cities**.
- Per-row parquet cost with dictionary-encoded category strings + two doubles ≈ **20–30 bytes/row
  compressed** (drop `osm_id` to a 32-bit surrogate and it is nearer 20). → **~8–12 MB** for a
  latest-year, both-city POI point export. **Comfortably shippable.**
- The *full history* is ~17 years × ~400k ≈ **6–7M point-rows ≈ 120–200 MB**. That is the thing
  ADR-0012 said not to ship. **Do not export point-level history.** Longitudinal context in the
  address result must come from the **existing aggregate marts** (`fct_poi_development`,
  `mart_area_rollup_stage_mix.sql`, `int_ewr_socioeco_hamburg_disagg.sql`), which are already
  bundled and already methodology-gated.
- **Trim lever, if needed:** restricting the export to the analytically-used domains (Gastronomy,
  Retail, Entertainment, Public Service) drops the street-furniture bulk and likely halves it. This
  is also the *right* product call — "300 m from you there is a supermarket" does not want to be
  competing with 4,000 nearby waste baskets.

### 1.3 Address points — Wohnlage

[`ingestion/berlin/price_rent/ingest_wohnlage.py`](../../ingestion/berlin/price_rent/ingest_wohnlage.py)
documents **~397k features per vintage**, 5 vintages (2017/2019/2021/2023/2026), schema
`vintage, city_code, geometry_wkb (MultiPoint, EPSG:25833), wohnlage, address_id,
source_attribution`.

- **Latest vintage only** (2026): ~397k rows. As a lookup index we need
  `address_id + lon/lat + wohnlage` (+ a normalized search string, see §2) — roughly
  **25–40 bytes/row** → **~10–16 MB** for Berlin, of which the searchable text dominates. Hamburg's
  ALKIS-Adressen is a comparable order (~300–400k addresses) → **~10–15 MB**.
- **All 5 vintages point-level = ~2M rows** — unnecessary for lookup; the Wohnlage *time series*
  belongs in aggregate marts as today.
- Note the ingested parquet **drops `strasse`/`hnr`** (they exist in the WFS source but are not in
  `WOHNLAGE_PARQUET_SCHEMA`). A searchable address index therefore needs a **schema widening of the
  existing ingestion**, not a new source. Cheap, but it is real work and must be named in Phase 1.

### 1.4 Bundle verdict

| Layer | Rows | Est. size | Ship client-side? |
|---|---|---|---|
| POI points, latest year, BER+HH, all domains | ~400k | ~8–12 MB | Yes |
| POI points, latest year, analytic domains only | ~150–200k | ~4–6 MB | Yes (preferred) |
| POI points, full 2008–2024 history | ~6–7M | ~120–200 MB | **No** |
| Address index, latest vintage, BER+HH | ~700–800k | ~20–30 MB | Yes, **if partitioned** |
| Address index, all vintages | ~2M+ | ~60 MB+ | No (and pointless) |

**Total realistic addition: ~25–40 MB**, against a current bundle already dominated by Evidence's
two self-hosted DuckDB-WASM binaries (~37.5 + ~32.6 MiB, per Amendment A). So the *marginal*
download cost is the same order as what the site already ships — but only **if it is not downloaded
eagerly**. Two conditions make this a yes rather than a no:

1. **Partition by a coarse spatial key** (city × district/`area_code`, or a geohash/H3-style
   prefix) into many small parquet files. DuckDB-WASM over HTTP does **range requests**, so a radius
   query touches a handful of partitions — the browser fetches ~1–3 MB, not 40 MB. GitHub Pages'
   20k-file-ish comfort zone and byte-range support are fine for a few hundred partitions.
2. **Lazy-load on the address page only.** The existing index/time-series/map pages must not pay for
   this. This is a build-config discipline point for the web-engineer pair, and it is the single
   biggest risk to "the site is still fast".

**Conclusion: client-side-only is feasible — conditionally.** No MotherDuck "deep query" backend is
required for Phases 1–3 as scoped. The escape hatch stays closed. If a later phase wants *raw
longitudinal point history* exposed interactively, that is exactly ADR-0012 decision 5's hybrid case
and needs its own ADR — but nothing in #328's stated product need requires it.

> **Sizing caveat (honesty note):** this session had no shell/DuckDB access, so the row counts above
> are derived from the documented figures (`~397k` per Wohnlage vintage, stated in the ingestion
> module docstring) and from the taxonomy breadth, **not** from querying `data/gentriduck.duckdb`.
> Before Phase 2 is greenlit, the `data-engineer` should run a five-minute confirmation:
> `select city_code, snapshot_year, count(*) from stg_osm_poi group by 1,2 order by 2 desc` and the
> equivalent Wohnlage count, and record the actuals here. The **decision** is robust to a 2–3×
> error in either direction (the latest-year layer stays shippable, the full history stays
> unshippable); only the partitioning granularity would change.

---

## 2. Geocoding: does it force a server component?

### 2.1 The Nominatim problem, stated fairly

Public OSM Nominatim (`nominatim.openstreetmap.org`) is free and open, but its Usage Policy is
restrictive in exactly the ways #328 fears: **max ~1 request/second**, a required identifying
User-Agent/Referer, **no heavy/bulk use**, and an explicit expectation that the service is a
courtesy for low-volume/dev use — with the operators reserving the right to block. A public,
user-facing search box calling it **from every visitor's browser** is precisely the pattern the
policy discourages (each visitor is a distinct client, so we cannot even self-throttle
meaningfully), and the maintainer's stated *"potential data product that we generate money with"*
framing makes reliance on a donated community service ethically and practically wrong regardless of
whether it is technically permitted. **So: public Nominatim is not usable as the geocoder for this
feature.**

The usual answers to that are (a) self-host Nominatim (free + open, but a heavyweight always-on
server — a database import of a country extract, GBs of RAM; violates the local-first, zero-infra
posture of ADR-0012), or (b) a hosted third-party geocoder (paid or freemium — golden rule #1
conflict). Both are bad fits.

### 2.2 Why neither is necessary here

The product is **city-scoped, not worldwide**. We only ever need to resolve *Berlin and Hamburg*
addresses. Both cities publish authoritative, openly-licensed **address point** datasets:

- **Berlin:** GDI Berlin WFS, `dl-de/zero-2.0` — already consumed by `ingest_wohnlage.py`, which
  fetches `strasse`, `hnr`, `plz`, `bezname`, `plr_name` and a point geometry for ~397k addresses.
  We are *already downloading a full Berlin address gazetteer*; we simply throw the street/house
  number away at parquet-write time.
- **Hamburg:** ALKIS-Adressen / INSPIRE Adressen-Hauskoordinaten via the Transparenzportal, WFS,
  `dl-de/by-2.0` (attribution: LGV Hamburg). Same shape, same mechanics as every other adapter we
  have.

That makes geocoding a **table lookup against bundled data**, not a network service call: normalize
the user's input (street + house number + optional PLZ), match against an in-browser DuckDB-WASM
index, return the point. Exact-match German addressing is a well-bounded string-normalization
problem (`str.`/`straße`/`strasse`, umlauts, `12a` vs `12 A`), not an NLP problem. Prefix search and
"did you mean" can be done client-side with the same index.

**Answer: NO, geocoding does not force a server component for Berlin+Hamburg.** It is a data
question, and it resolves in favour of one more open-data adapter — which is squarely inside our
existing patterns, licensing, and golden rules.

### 2.3 What a local address index does *not* give you

Stated plainly so nobody discovers it later:

- **No fuzzy / free-form parsing.** "the corner of Kotti near the döner place" will not resolve.
  Structured-ish input, autocomplete, and a map-click fallback cover this well in practice.
- **No coverage outside ingested cities.** Correct-by-construction (ADR-0005 city-agnostic core:
  each city brings its own address adapter), but the UI must fail gracefully for "Munich".
- **Vintage lag.** New-build addresses appear at the source's refresh cadence. Immaterial here.
- **~20–30 MB of address index** must be partitioned/lazy-loaded (§1.4 condition 1). A PLZ- or
  street-prefix partitioning makes typeahead cheap.
- **A one-time ingestion cost**: widening the Berlin Wohnlage schema, plus a new Hamburg address
  adapter.

If the maintainer later wants worldwide/fuzzy input, *that* — and only that — reopens the geocoder
question, and it would then be a genuine ADR with a thin-server option on the table. See
OPEN QUESTION A.

---

## 3. Phasing

I **endorse the ticket's Phase 1–4 structure** — it is correctly ordered by risk (methodology-free
first, gated methodology late, maintainer-gated tooling last) and it matches the standing preference
for the simplest thing that fits. Two refinements:

**Phase 1 (MVP) — refined.** The ticket assumes geocode-then-point-in-polygon. Per §2, replace
"geocode (external service)" with **"resolve against a bundled address index"**, and make the
address-index build an explicit Phase-1 deliverable:

- 1a. Widen `ingest_wohnlage.py`'s parquet schema to retain `strasse`, `hnr`, `plz` (+ lon/lat as
  doubles alongside/instead of `geometry_wkb`, so the browser needn't parse WKB).
- 1b. New Hamburg ALKIS-Adressen adapter (same WFS/paginate/manifest mechanics as existing
  adapters; ADR-0016 manifest entry; dl-de/by-2.0 attribution surfaced on the G3 page).
- 1c. `dim_address_point`-style conformed staging + a published, partitioned address-index export.
- 1d. UI: search box → resolve → point-in-polygon against the existing area geometries → **redirect
  to / embed the existing area page**. Zero new methodology, zero new statistics, R-C1 untouched.

Phase 1 is genuinely shippable value on its own ("what does the site say about *my* block?") and it
de-risks everything after it.

**Phase 2 — split.** 2a: the POI-point export (latest snapshot year, analytic domains, partitioned)
plus its size/latency verification. 2b: the "300 m from you there is a supermarket" listing UI —
straight distance ranking, **no weighting, no index**, so still methodology-free (a distance
*listing* is a fact; a distance-*weighted score* is a method). Keeping the boundary at exactly that
line is what lets 2 ship without the R-C1 gate.

**Phase 3 — unchanged, and correctly R-C1-gated.** Distance-weighted blending of neighbouring areas
touches spatial method → geo-DS **and** domain expert `pass` required before integration into
`develop`. Architecturally it is still client-side SQL over already-bundled data; it adds no
infrastructure. Its cost is methodological, not architectural.

**Phase 4 — unchanged, and hard-gated.** See OPEN QUESTION B; it should not be designed before
Phases 1–3 exist, and any tooling call is the maintainer's.

**Monetization — unchanged.** See OPEN QUESTION C.

**Architectural stop-line across all phases:** no phase as scoped requires a backend, an account, or
a credential in the browser. If any phase's design starts requiring one, that is the signal to stop
and write the ADR-0012 hybrid ADR rather than to quietly add infrastructure.

---

## 4. Methodology framing (`geo-data-scientist`)

### geo-data-scientist consulted section: spatial methodology framing for the eventual R-C1 gate

**Scope.** #328 asks what the eventual R-C1-gated implementation ticket (the Phase 3
distance-weighted nearby-area blend) must investigate. This section specifies the questions that
ticket must answer and the evidence its dual sign-off will demand. **It approves nothing** — no
bandwidth, no kernel, no publish decision is settled here, and no verdict is issued. Nothing in
§1–§3 above pre-empts these choices; conversely, nothing here should be read as endorsing the
architecture.

#### 4.0 Correction to the ticket's premise: distance-decay precedent *does* exist

The ticket states there is "no distance-based weighting precedent" in the repo, citing
`mart_area_rollup_stage_mix.sql` and `int_ewr_socioeco_hamburg_disagg.sql`. That is right about
*those two models* — both are containment/hierarchy operations (population-weighted rollup over
`mart_area_hierarchy`; uniform Stadtteil→Gebiet inheritance over a name-matched crosswalk) and
neither uses distance. But it understates what the project already has:

- **ADR-0010** (`docs/adr/0010-spatial-distance-weighting.md`, Accepted 2026-06-28) is *the*
  distance-weighting decision record: mass-conserving Gaussian kernel within a fixed bandwidth,
  computed in DuckDB `spatial` SQL, metric CRS as a per-city `dim_city` attribute.
- **`docs/methodology/spatial-methods.md`** §1–§5, §7, §11 is the gated methodology fixing the
  parameters: `w_ij = exp(-d_ij²/(2b²))` truncated at `b` via `ST_DWithin`, per-POI normalization
  to `Σ_i ŵ_ij = 1`, EPSG:25833, `b = 500 m` default for density layers, an OA-specific sweep of
  {500, 1000, 1500} m with a 1000 m headline, a ±50% bandwidth sweep, a PLR-vs-BZR MAUP check with
  an `r > 0.7` publish gate, and a mass-leakage guard (§11.3).

**Consequence:** the address-lookup blend is **not** greenfield methodology and must not be
designed as if it were. It is a *new direction of the same operator* and inherits ADR-0010 /
`spatial-methods.md` by default. The genuine novelty is the direction, made precise next.

#### 4.1 The actual novelty: point→area *interpolation*, not POI→area *spread*

Every existing use of the kernel spreads a **point mass (a POI) onto polygons**, with mass
conservation over the *POI*: each POI's weights sum to 1, so the city total is invariant
(`spatial-methods.md` §2, and the §11.1 invariance test
`Σ_a weighted_count_level = hard city total_level`).

The address lookup runs the operator the other way: given **one query point**, blend the
**already-computed area-level values** of nearby areas into a single point estimate. That is areal
interpolation / spatial prediction at a point, not mass allocation. Three consequences:

1. **Nothing is conserved, so the §2 invariance test does not transfer.** There is no city-total
   check to fall back on. The ticket must state the replacement correctness property. Minimum
   defensible: **weights sum to 1 over contributing areas** (a convex combination), so the blend is
   bounded by the min/max of its inputs and stays on the same scale as the published area values.
   Convexity is also what makes the result interpretable as "a weighted average of the areas around
   you" rather than a new statistic.
2. **A degenerate-case anchor is required.** For a query point deep inside a large area, the blend
   must converge on that area's published value; otherwise the address lookup contradicts the
   published area page for the same location — a credibility problem far worse than any bandwidth
   choice. Specify and test: *for a point at an area's representative point,
   |blend − published value| below a stated tolerance.*
3. **Distance to *what*?** `spatial-methods.md` §1 uses distance from the POI to a PLR
   "representative point (boundary or centroid)". In the point→area direction this matters far
   more, because it becomes the *only* geometry input. Centroid distance systematically
   under-weights large areas and mis-ranks non-convex/L-shaped polygons (Berlin has several;
   Hamburg's harbour-adjacent Stadtteile are worse). `ST_Distance` to the **polygon boundary**
   (0 when inside) is better-behaved but ties every containing area at 0. The ticket must pick one,
   justify it, and show the ranking difference on a worked set of awkward geometries — not adopt
   §1's wording by inertia.

#### 4.2 Distance-decay function choice — what the ticket must investigate

**Default position (to be confirmed or overturned, not assumed):** inherit the ADR-0010 §4 /
`spatial-methods.md` §4 **mass-conserving Gaussian**, `w = exp(-d²/(2b²))` truncated at `b`,
renormalized to sum 1 over contributing areas. Divergence from the project default requires an
argument, not the reverse — a user comparing the address result to the map should not be seeing two
different smoothers.

Candidates to evaluate, with the loser's reason recorded:

- **Hard radius cutoff (uniform / top-hat).** Already rejected as a project default (ADR-0010
  "Decay form": discards the decay signal, hard edge at the bandwidth). Worse for a *live
  per-address* query than in the batch case, because a user can move one house number and watch a
  whole area drop out of the blend. **Recommend rejecting again, but on the record.**
- **Inverse distance (the 2018 thesis form).** Singular at `d→0` and un-normalized in its original
  use (ADR-0010 Context; `reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57`). In
  this direction the singularity is *guaranteed*, not merely possible: a query address is usually
  inside a polygon, so boundary distance is exactly 0. If investigated at all, only in a stabilized
  form (`1/(d+ε)^p`, `ε` and `p` justified not tuned), with reported sensitivity to `ε` — usually
  enough to disqualify it.
- **Gaussian / kernel decay (recommended default).** Smooth, bounded, no singularity, already gated
  and already cited (Fotheringham, Brunsdon & Charlton 2002; Silverman 1986).
- **Exponential `w = exp(-d/b)`** — already the documented alternative in `spatial-methods.md` §4
  for a heavier near-field weight. Worth testing here specifically, because the address use case
  *wants* strong near-field dominance (see 4.1.2's anchor requirement).
- **k-nearest-areas, distance-decayed.** Not currently in the repo's toolkit but a natural fit for
  this direction, and it bounds the blend's cardinality (good for a UI that must name its inputs).
  Would need justification against the bandwidth approach; k-NN already exists in the project
  vocabulary as the `spatial-methods.md` §6 fallback.

**On the data's character (the ticket asked specifically).** Two properties constrain the choice
harder than the kernel-shape literature does:

- **Ordinal outcomes.** `typology_stage`, `status_class` and the D1/D2 MSS codes are ordinal, and
  ADR-0008 forbids averaging ordinal codes as a metric — a constraint
  `mart_area_rollup_stage_mix.sql` already implements by publishing a **population-weighted stage
  *mix*** plus a *paired* plurality label, never a lone re-derived label. **This is binding
  precedent for the address blend and is arguably the single most important thing the eventual
  ticket must get right.** A distance-weighted address result must be a *distribution* over stages
  ("your 500 m neighbourhood: 55% consolidation-pressure, 30% …"), not a smoothed ordinal scalar.
  Continuous sub-scores (`status_index`, `dynamism_index`, OA/LQ values) can be blended as weighted
  means, exactly as that mart already does with population weights.
- **Small N.** A 500 m radius in Berlin pulls in a handful of PLRs (median PLR ≈0.6–1 km²), often
  2–5, sometimes 1. At that N the kernel *shape* is nearly irrelevant next to the *membership*
  decision — which is why the stability work in §4.4 matters far more than the functional-form
  debate, and why the ticket should not spend its budget optimizing a kernel.
- **Fragility precedent.** `mart_area_rollup_stage_mix.sql`'s `is_dominant_fragile` suppresses the
  dominant label below 3 real (non-uninhabited) contributing children. The address blend needs the
  direct analogue — an effective-N flag (§4.5).

**Weight composition.** The rollup mart weights by **population**, not geometry. A pure distance
blend implicitly weights an empty area (Tempelhofer Feld, Grunewald, a harbour basin) equally with
a dense residential block at the same distance. The ticket must decide whether the address weight is
`distance-decay × population` (or × households), and must handle the uninhabited-area class
explicitly — the rollup mart's convention is an explicit "uninhabited / no data" bucket that is
*visible* in the mix but *excluded* from the weighted-mean denominator. Silently including a
zero-population park in an address blend would be a defect.

#### 4.3 Edge-of-city and edge-of-coverage

Three distinct edges, not to be conflated:

1. **Administrative edge (address near the city boundary).** Near Brandenburg, or near
   Schleswig-Holstein / Niedersachsen, the in-bandwidth set is **truncated on one side**.
   Renormalizing weights to sum 1 over only the in-city areas does not fix this — it silently
   *up-weights* the survivors and yields a confidently wrong estimate. Specify a **coverage
   fraction**: the share of the query disc (or of kernel mass) falling inside areas with data.
   Below a stated threshold the result must be caveated or refused, not quietly renormalized. Same
   failure mode as `spatial-methods.md` §11.3's mass leakage arriving from the other direction, and
   it deserves the same explicit guard.
2. **Cross-city edge.** Berlin and Hamburg indices use per-city parameters and per-city
   z-score/normalization bases (ADR-0005; `spatial-methods.md` §3). **Blending across a city
   boundary is prohibited** absent a separately-gated comparability argument — z-scores standardized
   within different populations are not on a common scale. The blend must be city-scoped and the
   implementation must enforce it (blend within `city_id`).
3. **Edge of OSM coverage / thinning mapping completeness.** ADR-0008 §5 and `spatial-methods.md`
   §5 bind: distance weights apply to **C5-corrected POI shares**, never raw counts, because
   weighting raw counts spatially smears coverage growth. For this feature the rule applies twice
   over, plus a sharper problem the batch pipeline does not have: **the nearby-POI listing itself
   ("300 m from you there is a supermarket") is a raw-presence artefact with no share normalization
   available.** An absent POI is genuinely ambiguous — not there, or not mapped — and at address
   resolution a user will read absence as fact. The ticket must decide how the listing is caveated
   and whether per-area mapping completeness (already estimated for C5) is surfaced as a confidence
   signal on it. Note that the listing and the blended index would then rest on *different*
   normalizations, which the UI must not blur together. This interacts directly with §1.2's
   "analytic domains only" trim: trimming street furniture changes what "nothing near you" means.

Also in scope: **uninhabited / NULL-area zones** (water bodies, airport perimeters, harbour) — the
`area_code = NULL` class in `int_osm_poi_plr.sql:47-52` and the `is_uninhabited` handling in
`int_gentrification_ts` / `mart_area_rollup_stage_mix.sql`. An address by the Tempelhofer Feld or on
the Hamburg harbour fringe is the realistic worst case and should be a named test fixture, not a
discovered bug.

#### 4.4 MAUP-style stability under small radius changes

The ticket's framing is right and should become a **hard acceptance criterion, not a report
appendix**. The pattern exists: `spatial-methods.md` §4 sweeps bandwidth at ±50%; §7 requires
PLR-vs-BZR rank correlation with an explicit **`r > 0.7` publish gate** and mandates that the G2
methodology page say so prominently when the threshold is missed (Openshaw 1984). The address
feature needs its own version because its failure mode is more visible: two neighbours on the same
street getting different answers is immediately legible in a way a map tile is not.

What the ticket must test and report:

- **Bandwidth sweep** over at least {250, 500, 750} m — the existing density-layer points
  (`spatial-methods.md` §4) — plus 1000 m if the OA layer feeds the address result (§11.2's OA
  headline is 1000 m; mixing 500 m density and 1000 m OA inputs in one answer must be stated, not
  accidental).
- **Metric: how often does the headline conclusion flip?** For ordinal output, the share of a
  sampled address set whose *plurality stage* changes between adjacent radii. For continuous
  sub-scores, rank correlation across radii, benchmarked against the same `r > 0.7` bar §7 already
  uses, so the project keeps one consistent robustness standard.
- **Spatial-jitter stability (the address-specific test, no existing analogue).** Perturb the query
  point by ±25 m / ±50 m — roughly geocoder precision, and note that §2's bundled address index
  returns *address points*, whose rooftop-vs-parcel-vs-street-centroid convention differs between
  the Berlin GDI and Hamburg ALKIS sources, so this noise is real and cross-city-inhomogeneous.
  Measure how often the answer changes. **A result unstable under geocoder-level noise must not be
  published as an address-level result at all**; it should fall back to the Phase 1 containing-area
  answer. This is the cleanest single go/no-go criterion available and it directly tests the
  feature's core claim (that a point estimate carries more information than the containing area's
  published value).
- **Kernel-shape comparison** (Gaussian vs exponential vs stabilized IDW), reported alongside the
  bandwidth sweep — jointly discharging ADR-0008 §4's mandatory sensitivity requirement for this
  layer, as §4/§7 do for the batch layer.
- **A sampled-address test set, not cherry-picked examples.** Stratified: city-core, periphery,
  city-boundary-adjacent, large-uninhabited-area-adjacent, cross-district. Committed as a small
  golden fixture (repo convention: small reference files committed, bulk data gitignored).

**Failure mode to report, not hide:** if the blend proves highly stable, that is *also* a finding —
it means distance weighting adds little over the Phase 1 point-in-polygon answer and the added
methodology risk may not be worth the marginal information. The ticket should be honest that
**Phase 1 may be the right permanent answer**, and should state in advance what result would lead
to that conclusion (pre-registering the decision rule rather than deciding after seeing the
numbers).

#### 4.5 Uncertainty communication — one-off point estimate vs. reviewed published aggregate

This is the largest gap between what the project does today and what the feature needs, and the
eventual gate should weight it accordingly.

**What exists today.** Published area-level results carry standing, reviewed caveats:
`index-definition.md` §1.2 **G-1** (no stage may assert an unobserved displacement *event*;
risk/signal/pressure framing only; "post-displacement" prohibited) and **G-2** (the
ecological-inference guard — *"PLR-level aggregate; not an individual- or building-level statement.
Inferring an individual's situation from a PLR stage is an ecological fallacy."*, required on
**every public rendering and the mart column comment**). `spatial-methods.md` §6 adds the binding
public-labelling convention that Gi\* output renders as "amenity-change hotspot" /
"social-change-pressure cluster" — a bare "gentrification hotspot" label is **prohibited**.

**Why this feature strains exactly that guardrail.** G-2 exists because a stage is a small-area
aggregate over thousands of residents. An address lookup is a **direct invitation to commit the
ecological fallacy G-2 forbids** — the user types *their own address* and reads the answer as a
statement about *their* home. The interpolation adds no information about the address; it only
re-weights the same area-level aggregates. The eventual dual gate (geo-DS **and**
`gentrification-domain-expert`, who owns the G-1/G-2 framing) should treat this as the primary
question of the ticket, ahead of the kernel choice. Concretely, the ticket must specify:

- **A strengthened, not merely inherited, G-2 disclaimer** for point output, stating that the result
  is a distance-weighted blend of surrounding small-area aggregates and says nothing about this
  address, this building, or its residents. The domain expert should own the wording.
- **G-1 compliance in generated prose.** Phase 4's NL description is where risk/signal/pressure
  framing is most likely to erode into an asserted outcome. Generated text must be checked against
  the G-1 controlled vocabulary and the `index-definition.md` §1.3 binding stage names. This is
  also where #327's plain-descriptive-over-predictive conclusion binds. Methodologically this is a
  strong argument for §5 OPEN QUESTION B's **B1 (template/rule-based)**: a template's claims are
  enumerable and reviewable against G-1/G-2, whereas B2/B3 output cannot be gate-verified in
  advance — an unverified-claims surface on an otherwise fully method-gated site. (The tooling call
  remains the maintainer's; this is the methodology consideration feeding it.)
- **Named, inspectable inputs.** Show *which* areas contributed and with what weight, each linking
  to its published area page. This turns an opaque point estimate into a traceable derivation,
  matches the project's transparent-methods-over-black-boxes principle, and is the cheapest
  uncertainty communication available.
- **An effective-N / fragility flag**, the direct analogue of `is_dominant_fragile`. Below
  threshold, suppress the point-level headline and fall back to the containing area's published
  value. Carry over the rollup mart's convention — *suppress the dominant label, never the mix*:
  suppress the single headline number, keep the distribution.
- **A vintage / freshness statement.** Inputs have snapshot years (MSS editions 2021 / 2023 / 2025;
  OSM snapshots). A live-feeling query implies currency it does not have; state the vintage of each
  contributing input. Note this interacts with §1.2's latest-snapshot-only export: the POI listing
  and the index inputs may carry *different* vintages, which must be stated rather than merged into
  one implied "now".
- **The stability result surfaced to the user**, not just to the reviewer: if §4.4's jitter test
  shows the address sits in an unstable zone, say so on that specific result.

**Standard to hold the line on:** a per-address result is a *derived view* of reviewed aggregates,
not a new measurement, and must never be presented with *more* confidence than the area page it
derives from. If the point estimate cannot be shown to be more informative than the containing
area's published value (§4.4), the honest product is the containing area's value.

#### 4.6 Constraints the eventual ticket inherits (non-negotiable without an amendment)

1. **CRS.** All distances in the city's metric CRS (Berlin EPSG:25833), a per-city `dim_city`
   attribute, never hard-coded in shared models (ADR-0005; ADR-0010; `spatial-methods.md` §3).
   Degree-space distance is a defect — and a client-side/WASM implementation is exactly where this
   gets got wrong, since address/geocode output is WGS84 and the transform must be explicit.
2. **C5 before weighting.** Distance weights apply to C5-corrected POI shares, never raw counts
   (ADR-0008 §5; `spatial-methods.md` §5).
3. **Ratios last.** Never kernel-smooth an already-formed ratio; form LQ/OA-style ratios *after*
   aggregation (`spatial-methods.md` §11.1 — a ratio of smoothed quantities is not the smooth of the
   ratio). Directly applicable if OA values feed the address answer.
4. **No averaging of ordinal codes as a metric** (ADR-0008; `mart_area_rollup_stage_mix.sql`) —
   publish a mix/distribution, with any single label paired and fragility-flagged.
5. **G-1 / G-2 public-framing guardrails** (`index-definition.md` §1.2) and the §6 hedged-label
   convention apply to every public rendering, including generated prose.
6. **Methodology parity across implementations.** If the blend runs client-side in DuckDB-WASM while
   the batch marts run in dbt (§1), the same kernel must be specified once and be verifiably
   identical in both. A per-address answer disagreeing with the published mart for the same location
   is a correctness bug. The ticket needs a conformance test asserting parity — a methodology risk
   *created by* the architecture choice, so §1 and §4 should be read together on it.
7. **Free + open only** (golden rule 1) and **R-C2 grounding** — every methodology choice cited in
   the model/script comment.

#### 4.7 Recommended shape of the eventual R-C1 ticket

Split investigation from implementation — the pattern ADR-0010 → `spatial-methods.md` already
established (tooling/defaults in the ADR, parameters in the gated methodology doc):

- **P3.0 — methodology spike (geo-DS-led, no production code).** Answer §4.1–§4.5 against real
  Berlin + Hamburg data; produce the sweep and jitter tables; recommend kernel, bandwidth,
  distance-to-what, weight composition, thresholds, and the fallback rule. Output: a new section in
  `docs/methodology/spatial-methods.md` (not a parallel doc — one spatial-methods authority), plus
  the geo + domain sign-offs.
- **P3.1 — implementation** against the frozen parameters, with the golden address fixture and the
  dbt/WASM parity conformance test from §4.6.6.

**Pre-registered stop condition (recommended):** if P3.0's jitter test shows the point estimate is
unstable at geocoder precision, or the sweep shows it is not materially more informative than the
containing area's published value, **the recommendation should be to stop at Phase 1/2** — ship the
containing-area answer plus the nearby-POI listing, and not ship the blend. Naming that outcome in
advance protects the decision from the sunk cost of having built the spike.

#### 4.8 Status

**No verdict is issued here** — nothing is implemented and nothing is proposed for integration.
This section specifies *what the future gate will examine*. The R-C1 dual sign-off
(`geo-data-scientist` + `gentrification-domain-expert`) is required at P3.0, before any
distance-weighted address blend reaches `develop`.

#### 4.9 Methodology sources

- `docs/adr/0010-spatial-distance-weighting.md` — mass-conserving Gaussian, DuckDB `spatial`,
  per-city metric CRS, decay-form alternatives considered.
- `docs/methodology/spatial-methods.md` §1–§5 (kernel, mass conservation, CRS, bandwidth, C5
  ordering), §6 (Gi\* + public labelling convention), §7 (MAUP sweep, `r > 0.7` publish gate),
  §11.1–§11.3 (ratios last, bandwidth-by-construct, mass-leakage guard).
- `docs/methodology/index-definition.md` §1.2 G-1 / G-2, §1.3 (binding stage vocabulary),
  §2.3–§2.4, §7.
- ADR-0008 §4 (mandatory sensitivity), §5 (OSM completeness bias); ADR-0005 (city-agnostic core).
- `transform/models/marts/mart_area_rollup_stage_mix.sql` — population-weighted stage *mix* over a
  single label, `is_dominant_fragile`, explicit uninhabited bucket excluded from the denominator.
- `transform/models/intermediate/int_ewr_socioeco_hamburg_disagg.sql` — uniform (non-weighted)
  hierarchical inheritance; the contrasting containment-based precedent.
- `transform/models/intermediate/int_osm_poi_plr.sql:23-52` — hard point-in-polygon, "no buffer",
  `area_code = NULL` zones.
- Openshaw (1984), *The Modifiable Areal Unit Problem*, CATMOG 38 — MAUP framing (§4.4).
- Fotheringham, Brunsdon & Charlton (2002), *Geographically Weighted Regression*, Wiley;
  Silverman (1986), *Density Estimation for Statistics and Data Analysis* — kernel/bandwidth choice.
- Tobler (1970), *A computer movie simulating urban growth in the Detroit region*, *Economic
  Geography* 46(2) — first law of geography, the premise of any distance decay.
- Robinson (1950), *Ecological Correlations and the Behavior of Individuals*, *American
  Sociological Review* 15(3) — the ecological fallacy G-2 guards against (§4.5).

---

## 5. OPEN QUESTIONS for the maintainer

These are **explicit gates, not recommendations**. I am deliberately not choosing.

### A. Geocoding scope — city-scoped local index vs. a real geocoder

- **Option A1 — bundled address index (BER+HH only).** Free, open, no server, no rate limit, no
  usage policy to violate, works offline, commercially unencumbered (dl-de licences permit
  commercial use with attribution). Cost: exact-ish structured input only; per-city ingestion work;
  ~20–30 MB partitioned bundle; no coverage outside ingested cities.
- **Option A2 — public Nominatim.** Zero build cost. But ~1 req/s, bulk/commercial use discouraged,
  a courtesy service we would be free-riding on from every visitor's browser, and directly at odds
  with the monetization framing. My sizing says we do not need it; the call on whether "free-form
  worldwide search" is a product requirement is yours.
- **Option A3 — self-hosted Nominatim / Photon.** Free + open software, but an always-on server with
  real RAM/disk needs. Breaks ADR-0012's zero-backend, no-account posture and adds hosting cost
  (money or a machine). Only justified if A1's coverage limits prove unacceptable.
- **Option A4 — hosted commercial geocoder.** Rejected on golden rule #1 unless you decide
  otherwise; listed for completeness only.

**What I need from you:** is "type any address anywhere, fuzzily" a product requirement, or is
"type your Berlin/Hamburg address" sufficient? A1 is the only option that needs no rule bent.

### B. NL description generation

- **B1 — template/rule-based generation** (no LLM). Deterministic, free, reviewable, testable,
  translatable by writing per-language templates, and auditable for the statistical claims it makes.
  Cost: reads as generated prose; expressiveness ceiling; a real authoring effort per language.
- **B2 — hosted LLM API.** Fluent, multilingual for free, near-zero authoring. Costs: money per
  request (golden rule #1), a credential in the request path (so a **backend becomes mandatory** —
  this is the one thing in the whole ticket that would force a server), a third-party dependency in
  the user path, and an **unverified-claims risk** on a statistics site that is otherwise fully
  method-gated.
- **B3 — local/open-weights model.** Open-licensed, no per-request cost, but needs a GPU-ish host or
  an impractically large in-browser model; same hallucination-governance problem as B2.

**What I need from you:** note that B2/B3 change the *architecture* (backend, credentials), whereas
B1 does not. If B1 is acceptable, Phase 4 stays inside ADR-0012 unchanged.

### C. Monetization

Out of my remit to recommend. I only record the architectural implications so the decision is made
with them visible:

- Our **inputs** are compatible: OSM is ODbL (commercial use permitted; **share-alike on derived
  databases** and attribution mandatory — a paid data product built on it has real ODbL obligations
  worth legal-reading before committing), and the German open-data licences (`dl-de/zero-2.0`,
  `dl-de/by-2.0`) permit commercial use with attribution.
- Our **stated project identity** ("free + open only", golden rule #1) is about the *tools and data
  we consume*, not literally about what the output may be — but a paid tier would put pressure on
  that identity, on the free-tier/donated services we lean on (public Nominatim being the clearest
  example, cf. OPEN QUESTION A), and on the noindex/soft-launch posture in ADR-0012 Amendment A.
- **Practical:** a paid product implies accounts, billing, and a backend — the exact three things
  ADR-0012 designed out. That is a much larger architectural change than anything in Phases 1–4, and
  it should be its own ADR, not a rider on this one.

**What I need from you:** a yes/no/defer. Phases 1–3 are worth building either way; nothing in them
forecloses monetization, and nothing in them assumes it.

---

## 6. References

- [`docs/adr/0012-serving-and-hosting-stack.md`](../adr/0012-serving-and-hosting-stack.md) — static
  export + DuckDB-WASM decision; MotherDuck excluded from the serving path; decision 5's hybrid
  escape hatch; Amendment A (GitHub Pages, wasm file sizes).
- ADR-0005 (city-agnostic core), ADR-0001 (data rebuilt + gitignored), ADR-0011 (integration gate),
  ADR-0016 (ingestion manifest / drift detection).
- [`transform/models/staging/stg_osm_poi.sql`](../../transform/models/staging/stg_osm_poi.sql) —
  POI `lon`/`lat` retained at staging for both cities, 2008–2024.
- [`ingestion/berlin/price_rent/ingest_wohnlage.py`](../../ingestion/berlin/price_rent/ingest_wohnlage.py)
  — ~397k address features/vintage; WFS attributes incl. `strasse`/`hnr`/`plz` (currently dropped).
- `transform/models/marts/mart_area_rollup_stage_mix.sql`,
  `transform/models/intermediate/int_ewr_socioeco_hamburg_disagg.sql` — the existing aggregate
  outputs a Phase-1 address lookup would surface unchanged.
- Hamburg ALKIS-Adressen / INSPIRE Adressen-Hauskoordinaten, Transparenzportal Hamburg (LGV),
  dl-de/by-2.0 — candidate Hamburg address source (**web-sourced, treated as data per SEC-3;
  needs first-party verification by the `data-engineer` before adoption**).
- OSM Nominatim Usage Policy (rate limit, bulk/commercial restrictions) — **web-sourced, data not
  instruction**; re-verify at implementation time.

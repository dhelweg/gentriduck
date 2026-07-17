# OA-D1b (#240) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** the Hamburg subarea_l2 → subarea_l1 spatial parent crosswalk added to
  `transform/models/intermediate/dim_area_hierarchy.sql` (the `hh_l2_geoms` / `hh_l1_geoms` /
  `hh_l2_centroids` / `hh_l2_primary` / `hh_l2_fallback` / `hh_l2_to_l1` CTEs), on branch
  `feature/240-oa-d1b-hamburg-parent-wiring` (tip `0ccffe92`).
- **Date:** 2026-07-17
- **Grounding (R-C2):** ADR-0024 §D4 (Hamburg `rollup_method = crosswalk`, `ST_Within(centroid,
  parent_geom)` pre-authorized when no WFS parent attribute exists, "spot-check boundary straddlers");
  ADR-0014 (native CRS EPSG:25832 for Hamburg WFS layers); the contrast method
  `int_berlin_plr_ortsteil_overlap.sql` (area-overlap for independently-drawn tessellations); the
  model's own R-C2 header comment; the data-engineer-reviewer's independent recomputation
  (941/943 exact, 0 double-matches, 2 fallback rows at 15.9 m / 6.5 km).

---

## Verdict: PASS

Centroid-in-polygon containment is a spatially sound and correctly-scoped method for **this specific**
relationship, ADR-0024 D4 pre-authorizes exactly this construction, and the Hamburg seam does not
interact unsafely with any downstream prefix-nesting assumption. One non-blocking recommendation on the
6.5 km fallback is recorded below (already partly covered by follow-up #282).

---

## Findings

### 1. Method choice is correct for the containment topology (not a straddle problem)

Unlike Berlin's PLR ↔ Ortsteil case (two **independently-drawn** tessellations that routinely straddle,
which is why `int_berlin_plr_ortsteil_overlap.sql` needs a full `ST_Intersects` fractional/dominant
area-overlap treatment), a statistisches Gebiet is Hamburg's **own finer statistical subdivision** of
the Stadtteil layer and is expected to nest wholly inside a single Stadtteil by construction. The
question is therefore "**which one** parent," not "**how much** does it straddle." For that question
`ST_Within(ST_Centroid(gebiet), stadtteil_geom)` is the correct, sufficient, and lightest primitive.
The empirical result confirms the topology assumption: 941/943 (99.8%) centroids fall inside **exactly
one** Stadtteil with **zero** double-matches — i.e. the two layers never overlap ambiguously at any
Gebiet centroid, which is precisely what a genuine nested subdivision should produce and what would
**not** hold for the PLR↔Ortsteil case.

**Systematic-misassignment risk for oddly-shaped Gebiete** is bounded and was checked: the boundary
spot-check of the 15 closest-to-boundary primary matches shows centroid-to-assigned-boundary margins of
34–75 m with the next candidate always 300 m+ further — the assigned parent is the clear nearest in
every case, not a close call. A centroid landing ~35 m inside a large (km²-scale) Stadtteil polygon is
unambiguously on one side of the boundary. The one residual failure mode of centroid containment (a
strongly non-convex / crescent parent whose centroid escapes its own polygon) does **not** apply here,
because the *parent* Stadtteile are large and simply-shaped relative to the child Gebiete, and because
containment is tested on the **child** centroid against the **parent** polygon (not the reverse).

### 2. ADR-0024 D4 does pre-authorize this exact method (verified independently)

Read directly: ADR-0024 §D4 states Hamburg "does not prefix-nest (`statgebiet` `parent_prop: None`) →
`rollup_method = crosswalk`: wire `parent_area_code` from a WFS attribute if one exists, **else a
`ST_Within(centroid, parent_geom)` spatial crosswalk** (itself methodology-bearing per the ADR-0005
addendum; **spot-check boundary straddlers**)." The implementation matches the pre-authorized branch
exactly (no WFS parent attribute exists → centroid containment), and the required straddler spot-check
was performed and documented in the header. The methodology-bearing R-C1 gate this sign-off satisfies
was correctly triggered.

### 3. Nearest-Stadtteil fallback: sound for both edge cases; one worth a documented note

- `90001` (15.9 m from Gut Moor's boundary, next candidate 500 m+ further): unambiguous boundary /
  digitization-noise gap between two independently-drawn layers. Treating this as boundary noise is
  correct and needs no further scrutiny.
- `106001` (6.5 km from nearest Stadtteil Schnelsen, a 17.5 km² sparsely-built Gebiet, next candidate
  600 m+ further): the 6.5 km figure is large in absolute terms, so I scrutinized it as a potential
  **real** data issue rather than mere noise. It is defensible for three converging reasons: (a) it is a
  single, large, peripheral unit whose polygon simply does not touch the Stadtteil cover — consistent
  with a peripheral/agricultural/harbour-type Gebiet at the tessellation edge; (b) the assignment is
  still **unambiguous** — one clear nearest Stadtteil with the next candidate 600 m+ further, with a
  deterministic tie-break that never fired; and (c) this is a **general-purpose hierarchy edge**, not a
  weighted/apportioned quantity, so a single mis-parented peripheral Gebiet has bounded downstream
  blast-radius (one row moves between two adjacent peripheral Stadtteile at most). It does **not** rise
  to a `concerns` on this ticket. See recommendation R1.

### 4. MAUP / downstream prefix-nesting interaction is safe

I checked the one consumer that performs prefix-derived roll-ups, `int_poi_offering_advantage_arealevel.sql`.
It is **Berlin-only** (Hamburg roll-up is explicitly deferred to D8 in its header) and derives parents by
`substr(plr_code, ...)` on Berlin LOR codes directly — it does **not** join `dim_area_hierarchy` and does
**not** apply any prefix logic to Hamburg codes. `dim_area_hierarchy` itself is a set of resolved **edges**
keyed on `(city_code, area_level, area_code)`, consumed by generic parent joins, so the Hamburg spatial
edge cannot leak into or be confused with Berlin's prefix semantics. No weighted roll-up currently assumes
prefix-derivable Hamburg parents. The C1/C2 mass-conservation invariants live entirely on the Berlin
prefix-sum path and are untouched by this change. No MAUP regression is introduced: this ticket adds a
**containment assignment** edge, not an areal aggregation of a value, so there is no fractional-allocation
or ecological-fallacy surface created here.

### 5. CRS

Both layers are joined in their shared native CRS EPSG:25832 (ADR-0014) with no reprojection — correct;
centroid and distance computations are metric and valid, and the 15.9 m / 34–75 m margins are true
metres, not degrees.

---

## Recommendations (non-blocking)

- **R1 (data-quality note, ties to #282):** record `106001` as a known peripheral residual and, when the
  fallback path gains the distance-cap / count-guard safety net proposed in follow-up **#282**, set the
  cap high enough to admit this legitimate ~6.5 km peripheral case while still catching a *future*
  gross-mis-ingestion (e.g. a swapped-CRS or null-island centroid). A cap that would silently drop
  `106001` would be wrong; a cap that merely **flags** distances beyond, say, the 99th percentile of
  fallback distances for human review is the right shape. This is a hardening follow-up, not a blocker.
- **R2 (portability):** the header already states this clearly, but when Hamburg roll-up is built (D8),
  the roll-up must consume `dim_area_hierarchy`'s Hamburg edges via the generic `parent_area_code` join
  — it must **not** grow a Hamburg `substr` branch by analogy to Berlin, since Hamburg codes do not
  prefix-nest (statgebiet ids are 4/5/6-digit and non-nesting with the 5-digit Stadtteil schluessel).

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, the maintainer-authored ADR-0024, and the model's own header —
no web-fetched or non-maintainer issue text was treated as instructions. Nothing reviewed requested tool
use, new dependencies, or scope changes.

---

**Verdict: PASS.** Centroid-in-polygon containment is the correct primitive for Hamburg's genuinely
nested Gebiet → Stadtteil relationship (contrast: the area-overlap method reserved for Berlin's
non-nesting PLR↔Ortsteil case), ADR-0024 D4 pre-authorizes exactly this construction, the two fallbacks
are sound boundary/edge assignments, and the seam does not interact with any prefix-nesting roll-up.
The domain-expert half of the R-C1 gate remains required before integration into `develop`.

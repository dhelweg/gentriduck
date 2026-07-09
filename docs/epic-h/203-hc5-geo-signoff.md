---
task: H-C5 / #203 — Hamburg Wohnlage tier composition + displacement-zone integration slice
author: geo-data-scientist
date: 2026-07-09
branch: feature/203-hc5-hamburg-rent-wohnlage-displacement
---

# Geo-DS methodology sign-off — Hamburg Wohnlage + displacement-zone slice

- **Branch:** `feature/203-hc5-hamburg-rent-wohnlage-displacement`
- **Issue / task:** #203 [H-C5] — wires `stg_hamburg_wohnlage`, `stg_hamburg_mietenspiegel`, and
  `stg_hamburg_displacement_zones` (staged-ahead with zero consumers per QA-6 #181) into the DAG.
  Scoped down, mirroring #70 [B1]'s de-risking call: tier composition + displacement flag only, no
  rent-VALUE join (Berlin D1 analogue deferred — see model header).
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_hamburg_wohnlage_stadtteil.sql`
  - `transform/models/intermediate/int_hamburg_displacement_zone_flag.sql`
  - `transform/models/staging/stg_hamburg_wohnlage.sql` (added `stadtteil` passthrough column)
  - `transform/tests/test_hamburg_wohnlage_stadtteil_match_rate.sql`
  - `transform/models/intermediate/schema.yml` / `transform/models/staging/schema.yml` (new/updated
    test blocks)
  - Cross-reference: `docs/adr/0014-hamburg-data-sources.md` (source decision, open questions #2/#5),
    `transform/models/intermediate/int_berlin_wohnlage_plr.sql` and
    `int_berlin_milieuschutz_plr_flag.sql` (Berlin precedent patterns being mirrored),
    `docs/methodology/B1-milieuschutz-geo-signoff.md` (ST_Intersects reasoning reused for the
    displacement-zone flag)

Both models are methodology-bearing under R-C1: `int_hamburg_wohnlage_stadtteil` introduces a new
cross-source name-match join (grain reconciliation), and `int_hamburg_displacement_zone_flag`
introduces a new polygon-to-polygon spatial join at a different CRS (EPSG:25832) than any prior
model in the codebase. Neither touches `gentrification_index` (contract-enforced mart) — the blast
radius is two new intermediate models plus one staging-column addition.

## a. Is the publisher-supplied `stadtteil` name-match a defensible substitute for a spatial join?

**Yes.** I verified this directly against the live data rather than taking the source schema's word
for it: `stg_hamburg_wohnlage`'s `stadtteil` column is a raw attribute the publisher stamps on each
address record (not something this pipeline computes), and I ran the join independently against the
built parquet — **100% of 283,801 live address rows** match a Stadtteil `area_name` in
`stg_hamburg_geo` (`area_level='subarea_l1'`) on exact string equality, with **zero** unmatched
values (checked via set difference, not just an aggregate rate). This is a stronger result than the
EWR pillar's own Gebiet↔Stadtteil name-match crosswalk (98.6%, #125), which required investigating
residual mismatches before trusting it — no such investigation was needed here. I still added
`test_hamburg_wohnlage_stadtteil_match_rate` enforcing a ≥98% floor (mirroring
`test_hamburg_gebiet_stadtteil_crosswalk_match_rate`'s threshold and denominator/numerator
structure) rather than hard-coding "100% observed" as a permanent assumption — a future WFS/CSV
edition could introduce a naming drift (abbreviation, hyphenation) this floor would catch before it
silently degrades the composition shares.

## b. Is skipping a spatial join for Wohnlage (unlike Berlin's `ST_Within` point-in-polygon) correct, not a shortcut?

**Yes.** Berlin's `int_berlin_wohnlage_plr` needs `ST_Within` because Berlin's Wohnlage source is
address *points* with no administrative-area attribute attached — the spatial join is the only way
to know which PLR an address falls in. Hamburg's source is different in kind, not just in
convenience: the publisher already performed and published the Stadtteil assignment as a data
attribute. Re-deriving it via `ST_Within` against `stg_hamburg_geo`'s Stadtteil polygons would be
strictly redundant work that could only ever match or diverge from the publisher's own
already-authoritative assignment — and if it diverged, the publisher's assignment (not a
re-derivation from a separately-sourced geometry layer, which could itself have vintage or
digitization differences) is the more trustworthy one for "which Stadtteil is this Wohnlagenverzeichnis
entry filed under." Using the attribute directly is the methodologically correct choice, not a
corner cut.

## c. Is `ST_Intersects` (not `ST_Within`) the correct predicate for the displacement-zone flag?

**Yes, for the same reason established in `docs/methodology/B1-milieuschutz-geo-signoff.md` §a**,
which I re-verified applies here rather than assuming transfer: Erhaltungsverordnung designations are
bespoke Kiez-level polygons independent of Stadtteil administrative boundaries (same §172 BauGB legal
basis, same non-alignment property as Berlin's Milieuschutz-vs-PLR case). I confirmed this
empirically against the live data: of 103 Stadtteile, **27 (26%)** intersect at least one of the 16
in-force designations, with overlap fractions ranging from near-zero (0.000012, a boundary sliver) to
0.93 (near-total coverage) — a spread consistent with genuine partial-overlap geometry, not an
artifact of a wrong predicate. `ST_Within` would systematically miss designations that straddle a
Stadtteil boundary, understating protection coverage exactly as B1's sign-off found for Berlin.

## d. Is the CRS handling correct (EPSG:25832, not silently reusing Berlin's EPSG:25833)?

**Yes.** This is the first model in the codebase to run a Hamburg spatial join at scale (prior Hamburg
models are either non-spatial or single-source), so I checked this carefully rather than assuming the
Berlin pattern transfers. Both `stg_hamburg_geo` and `stg_hamburg_displacement_zones` are documented
and confirmed native EPSG:25832 (ADR-0014); no `ST_Transform` is applied, which is correct. I added a
y-axis sanity guard (`between 5.90e6 and 5.97e6`, derived via pyproj from Hamburg's WGS84 bounding
box) mirroring `int_berlin_wohnlage_plr`'s own EPSG:25833 guard (`[5.79e6, 5.84e6]`) — running it
against the live geometry confirms all 103 Stadtteil centroids fall inside this range, so the guard is
correctly calibrated and not silently excluding valid data.

## e. Is deferring the Mietenspiegel rent-VALUE join (Berlin D1 analogue) the right scoping call for this slice?

**Yes.** I inspected `mietenspiegel.parquet` directly and found it carries an `ausstattung`
(fitting-standard) dimension not present in `wohnlage.parquet` and not documented in
`stg_hamburg_mietenspiegel`'s current column list — joining rent values to Wohnlage tiers would
require deciding how (or whether) to collapse across `ausstattung`, which is an unreviewed
methodology choice this slice was not scoped to make (mirrors #70's own "don't invent an alignment
rule not yet grounded anywhere" precedent). Filing this as an explicit follow-up rather than
guessing is the correct call — see the model header and the PM's tracking note.

## f. Is keeping both new models out of `gentrification_index` and not compositing them together the right scoping call?

**Yes, for this slice**, for the same reasoning as B1 (d): `gentrification_index` is contract-enforced
(ADR-0004), and blending a binary policy marker (`under_displacement_protection`) with continuous
tier-share data (`pct_wohnlage`) would require inventing an unreviewed weighting rule. Publishing both
as independently queryable, Stadtteil-grain disclosure layers — deliberately given the *same* grain so
a future G2/web layer can join them without a further cross-grain step — is the honest, smaller step.

## Verdict

**Verdict: PASS.** The name-match join is verified at 100% coverage with an appropriate regression
test, the spatial-join predicate and CRS handling for the displacement-zone flag are correctly
reasoned and empirically checked against live data, and the scoping decisions (deferred rent-value
join, disclosure-only layers, matched grain) are all sound. No changes requested.

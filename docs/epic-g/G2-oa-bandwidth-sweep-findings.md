# G2-OA bandwidth-sweep findings (#274, ADR-0017 D5 C-4 discharge)

**Status:** implementation finding, corrected (iteration 2 review fixes below), pending geo-DS +
domain-expert R-C1 sign-off (methodology-bearing, CLAUDE.md Methodology gate).

**Source:** `analysis/oa_bandwidth_sweep.py`; raw output `data/analysis/oa_bandwidth_sweep.csv`
(gitignored, regenerate with `uv run python analysis/oa_bandwidth_sweep.py`).

**Grounding (R-C2):** `docs/adr/0017-poi-offering-advantage-revival.md` D5 condition C-4 ("Report the
cross-bandwidth OA rank correlation; if OA rankings are bandwidth-fragile the G2 page must flag OA
as bandwidth-sensitive. Treat fragility as a substantive finding about the spatial grain of
succession, not merely a caveat."); `docs/methodology/spatial-methods.md` §7 (r > 0.7 MAUP publish-gate
threshold, mirrored here) and §11.2 (the OA-specific {500, 1000, 1500} m sweep spec, 1000 m headline).

---

## Correction (iteration 2 review, both findings below are `high`-severity fixes)

An earlier draft of this document reported Spearman r values computed by
`analysis/oa_bandwidth_sweep.py`'s `load_oa_domain()` **without deduplicating**
`int_poi_offering_advantage`'s leaf grain first. That model's grain includes
`poi_category_h`/`poi_type_h`, so a domain-level `oa_domain` value repeats once per
category/type leaf under that domain (verified: raw_rows=321,092 vs distinct
`(area_code, snapshot_year, poi_domain_h)` triples=76,731 at `gaussian_500m` alone —
some keys repeat 33–34x). The subsequent merge-on-matching-keys in `compare_pair()`
then performed a many-to-many cross-product on top of that duplication, which is why
the previously-reported pooled `n_units` were in the millions instead of the true
~76k–87k universe, and implicitly over-weighted domains with more category/type leaves
(e.g. Retail). **Fixed**: `load_oa_domain()` now `GROUP BY (area_code, snapshot_year,
poi_domain_h)` with `any_value(oa_domain)`, mirroring the same lossless collapse already
used in `transform/models/marts/mart_poi_offering_advantage_map.sql` (`oa_domain` is
constant across a domain's category/type leaves by construction). The corrected numbers
are below — the qualitative verdict (fragile only at the full 500–1500 m span, stable at
both bandwidths adjacent to the 1000 m headline) is **unchanged**, but every r/n figure
is different from the original draft; **use only the numbers in this document.**

Separately, this document's original "What was run" / "Publish-gate disposition" sections
overstated what the sweep characterizes — see **"What this sweep does NOT characterize"**
below, added in this same correction pass.

## What was run

`oa_domain` under `weight_variant='gaussian_<bw>m'` was recomputed at each of the three sweep
bandwidths (`gaussian_500m`, `gaussian_1000m`, `gaussian_1500m` — `int_osm_poi_plr_weighted` rebuilt
per bandwidth via the `poi_kernel_bandwidth_m` dbt var, then `int_poi_offering_advantage` rebuilt on
top of each), for Berlin, `methodology_variant='faithful'`, every ingested year (2008–2026). For each
pair of bandwidths, the Spearman rank correlation of `oa_domain` was computed across all
(deduplicated) `(area_code, snapshot_year, poi_domain_h)` triples — both **pooled** across all years
(the single headline figure) and **per year** (robustness detail).

## Result (corrected)

| Bandwidth pair | Pooled Spearman r (all years, n) | Per-year range | Verdict (r > 0.7) |
|---|---|---|---|
| 500 m vs 1000 m | **0.795** (n=76,231) | 0.749 – 0.812 | **Stable** (every year 2008–2026 clears 0.7) |
| 1000 m vs 1500 m | **0.851** (n=87,121) | 0.814 – 0.866 | **Stable** (every year 2008–2026 clears 0.7) |
| 500 m vs 1500 m | **0.683** (n=76,418) | 0.614 – 0.701 | **Fragile** (below 0.7 in 17 of 19 years — only 2018 [0.700] and 2019 [0.701] clear it, and just barely) |

**Finding: the gaussian-weighted OA construct is bandwidth-sensitive at the extremes of its sweep,
but stable around its 1000 m headline.** Both bandwidths adjacent to the 1000 m headline (500↔1000
and 1000↔1500) clear the 0.7 threshold comfortably and consistently across the full 2008–2026
history. The full-sweep endpoint comparison (500 m vs 1500 m — a 3x widening of the catchment) falls
below 0.7 in the pooled figure and in 17 of 19 individual years. Per C-4, this is treated as a
substantive methodological finding, not a mere caveat: **widening the OA catchment from the
pedestrian/block scale (500 m) to a 1.5 km retail-catchment scale measurably re-ranks which PLRs read
as commercially over/under-represented**, consistent with the retail-gravitation literature's own
framing (Reilly 1931; Huff 1964; Berry 1967, cited in `spatial-methods.md` §11.2) that catchment scale
is not a neutral implementation detail for a compositional retail-mix construct — it changes *which*
neighbourhood-scale "offering mix" is being measured. The 1000 m headline (ADR-0017 D2.3) sits at the
stable centre of the sweep; the fragility is concentrated at the sweep's own outer bound, which is
itself only ever a sensitivity-check bandwidth, never a candidate headline (spatial-methods.md §11.2:
"500 m is too narrow ... 1500 m is acceptable only as the sweep's upper bound").

**Temper (domain sign-off #274 advisory R2): this is a measurement claim about the metric first, a
succession-process claim only speculatively.** A rank-correlation sweep characterizes how the
**metric's** PLR ordering moves with bandwidth; it cannot by itself isolate whether that movement is
telling us something about the real-world **succession process**. In particular, `oa_domain` is a
compositional location quotient (a local share relative to the citywide share), and the domain
sign-off for the P0.1 spike (`docs/epic-b/P0.1-oa-variant-domain-signoff.md` §2) already establishes
that this class of metric **mechanically washes toward 1 as the catchment widens** — pulling the local
mix toward the city mean and attenuating the very contrast the metric is built to detect, independent
of anything happening in the underlying commercial-succession dynamics. That means a meaningful share
of the observed 500↔1500 m re-ranking above is plausibly just this known, expected scale-attenuation
property of a share-relative-to-city construct, not a discovery about how succession is spatially
organized. The "spatial grain of succession" framing (C-4-mandated, ADR-0017 D5) is not withdrawn —
the sweep is still legitimate evidence that PLR ordering is scale-contingent, which is itself
domain-relevant — but it should be read as a property of the compositional construct's known scale
behaviour first, and only speculatively as a property of the succession process a rank sweep alone
cannot isolate.

## What this sweep does NOT characterize (iteration 2 correction)

This sweep tested `oa_domain` under `weight_variant='gaussian_{500,1000,1500}m'` — the
Gaussian-kernel distance-weighted variant. **It did not test `weight_variant='standard'`**, the
hard point-in-polygon variant, which is:

- the **only** `weight_variant` actually queried by
  [`web/pages/berlin/poi-map.md`](../../web/pages/berlin/poi-map.md) (its `poi_map_data` query
  filters `weight_variant = 'standard'`, pre-existing and unchanged by this ticket); and
- the **only** `weight_variant` read by every analysis script behind
  `web/pages/methodology.md` §7's headline correlation (`c_three_way_comparison.py`,
  `c_offering_relevance_validation.py`, `e1_regressions.py`, `e4_early_warning.py` all hardcode
  `weight_variant='standard'`).

`standard` has no bandwidth parameter at all — it is a point-in-polygon count, not a kernel — so
there is no "standard at 500 m" vs. "standard at 1500 m" to compare. **This sweep therefore says
nothing about whether the figures actually published today are bandwidth-sensitive**, because none
of the currently-published OA figures use a bandwidth-parameterized variant in the first place. The
gap between "OA headline should use `gaussian_1000m` per ADR-0017 D2.3" and "OA headline actually
uses `standard`" is a **pre-existing, separately-tracked** open question (OA-C.1, #174; referenced in
`docs/epic-i/I15-oa-review-geo-signoff.md` and `docs/epic-b/A3-oa-validation-findings.md`) — this
sweep does not close that gap, and should not be read as having done so.

## Publish-gate disposition (C-4) — corrected

Per ADR-0017 D5 C-4 ("if OA rankings are bandwidth-fragile the G2 page must flag OA as
bandwidth-sensitive"): the honest disclosure, now on `web/pages/methodology.md` §7 and
`web/pages/berlin/poi-map.md`, is that **the gaussian-weighted variant is bandwidth-fragile at wide
spans** (this sweep's finding, above) **while the variant currently displayed on these pages
(`standard` / effectively `gaussian_500m`-adjacent at the point-count end, but literally
bandwidth-free) is bandwidth-invariant by construction** — there is no bandwidth choice being made
for it today, so it cannot re-rank across bandwidths the way the gaussian variant does. C-4 as
originally scoped ("report the cross-bandwidth OA rank correlation... the G2 page must flag OA as
bandwidth-sensitive") is discharged **for the gaussian-weighted construct**; whether it needs to be
revisited **for the published `standard` headline** is contingent on OA-C.1 #174's separate,
still-open question of whether the published headline should move from `standard` to
`gaussian_1000m`. If/when #174 resolves that way, this sweep's finding (fragile at the full
500–1500 m span, stable near the 1000 m headline) becomes directly load-bearing for that variant's
publish-readiness; until then, it is disclosed as relevant context, not as a characterization of
today's published numbers.

## Reproducing this result

```bash
uv run poe build   # ensure the warehouse is built at the project default bandwidth first
uv run python analysis/oa_bandwidth_sweep.py
```

The script rebuilds `int_osm_poi_plr_weighted` + `int_poi_offering_advantage` at each sweep bandwidth
in turn (fast: ~10–12s per bandwidth on the full Berlin 2008–2026 history), reads the resulting
`oa_domain` rows (deduplicated to one row per `(area_code, snapshot_year, poi_domain_h)` — see the
correction note above), and **restores the warehouse to its default-bandwidth build** (plus the two
downstream OA marts) before exiting — see the script's module docstring for why it invokes `dbt run`
directly (a narrowly-scoped, documented exception to the analysis-scripts-only-read convention) rather
than reimplementing the kernel math in Python.

## Caveats

- This sweep compares `oa_domain` only (the coarsest OA taxonomy level), not `oa_category`/`oa_type`
  — the finer taxonomy levels were not swept (out of scope for this ticket; a future follow-up could
  extend the sweep to those levels if a finer-grained fragility read is wanted).
- The comparison is Berlin-only (`int_osm_poi_plr_weighted` is Berlin-only; Hamburg's index isn't
  signed off yet, #125).
- This is a **rank** (Spearman) comparison, matching the §7 MAUP publish-gate convention — it says
  nothing about the magnitude of OA value changes across bandwidths, only about re-ranking.
- **This sweep only tested the gaussian-weighted variant, not the `standard` variant actually
  displayed on the live public pages** — see "What this sweep does NOT characterize" above. This is
  the most important caveat in this document; it was missing from the original draft.
- **The D-3 min-POI-base threshold (`oa_min_poi_base_n`, default 10) is a conventional
  small-sample-size floor, not empirically fit** (domain sign-off #274, advisory R3) — it was chosen
  because the P0.1 domain sign-off left the exact number advisory/unspecified, and it errs on the
  permissive/anti-stigma side: at the domain level it suppresses only ~0.4% of PLR-years in the
  current (2025) snapshot, so it is not over-suppressing legitimately-thin-but-real areas. A future
  review may revisit whether it is *high* enough to reliably catch compositional instability without
  tipping into over-suppression — see `int_poi_offering_advantage.sql`'s D-3 header for the full
  threshold rationale.

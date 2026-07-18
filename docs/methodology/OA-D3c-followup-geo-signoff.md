# OA-D3c-followup (#287) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** branch `feature/287-getis-ord-followup`, implementation commit
  `6c141517` (merged to `develop` at `7f2318b3`) — CC1/CC2/CC3 remediation of the OA-D3c #280
  Getis-Ord Gi\* handoff: `analysis/f_oa_getis_ord.py`,
  `transform/models/marts/mart_poi_oa_hotspots.sql`, `transform/models/marts/schema.yml`,
  `transform/models/staging/stg_oa_getis_ord.sql`.
- **Date:** 2026-07-18
- **Grounding (R-C2):** original OA-D3c geo sign-off (`docs/methodology/OA-D3c-getis-ord-geo-signoff.md`)
  conditions CC1/CC2/CC3; OA-D0 geo sign-off C9; ADR-0025; ADR-0010; Getis & Ord (1992); Ord &
  Getis (1995); Benjamini & Hochberg (1995); Caldas de Castro & Singer (2006) "Controlling the
  False Discovery Rate: an application to local statistics" (Geographical Analysis 38); Haklay
  (2010) on OSM completeness non-neutrality.

> **Re-issued sign-off (replaces an invalid self-authored one).** Per
> `docs/lessons/self-authored-methodology-signoff.md`, the prior version of this file (commit
> `6712b7d7`) was written by the same automated session that implemented the change — an R-C1
> independence violation regardless of content quality. This document is a genuine, independent
> re-review of the real `feature/287-getis-ord-followup` diff, overwriting that invalid file. I
> re-ran the pipeline and queried outputs myself; I did not rely on the prior document's claims.

---

## Verdict: PASS WITH CONDITIONS

The CC1/CC2/CC3 remediation is statistically sound, correctly implemented, and empirically
reproducible. The published mart surface is clean and all dbt tests pass. My PASS carries one
**new non-blocking data-hygiene condition (NZ1)** I discovered during independent verification,
plus the two **carried-forward disclosure conditions** (CC2/CC3 documentation) that bind any future
G2 consumer. None block integration; the change is already merged and the published surface is
correct today.

---

## What I verified empirically

I re-ran `analysis/f_oa_getis_ord.py` (deterministic, `seed=42`; four parquets regenerated
identically), targeted-built `stg_oa_getis_ord+` (19/19 tests PASS), and queried both the parquet
and the materialized `mart_poi_oa_hotspots`.

1. **CC1 — per-domain-per-map FDR as PRIMARY, pooled as labelled SECONDARY.** Confirmed in code
   (`f_oa_getis_ord.py` note 5, lines 572–605): `gi_star_p_fdr`/`gi_star_fdr_significant` are batched
   per `poi_domain_h` within each `(city, vintage, level, year)` map; `gi_star_cluster_label` is
   derived from that primary flag only; the #280 pooled correction survives as clearly-labelled
   `*_pooled_alldomains` columns. Raw `gi_star_p` also carried. **PASS.**

2. **CC2 — lor_2021 significance.** Reproduced exactly at the parquet level: lor_2021 primary =
   **108 PLR** (72 hot / 36 cold) and **376 BZR** (261 hot / 115 cold); pooled-secondary = **0** at
   both levels; lor_pre2021 pooled ≫ 0. The published *mart* surfaces 107 PLR / 373 BZR (a handful
   of literally-zero-stock labelled cells are dropped by the mart's join to the sparse stock table —
   cosmetic, and arguably the cleaner number). The "zero under pooled" for lor_2021 is genuine, not
   mis-scoping. **PASS.**

3. **CC3 — self-weight convention.** The esda row-max Gi\* self-weight (`transform='r'` + `star=True`)
   is now documented in the module docstring (lines 83–89). **PASS.**

## Statistical assessment of the approach on its own merits

- **"One map = one family" is the correct call.** Caldas de Castro & Singer (2006) is the standard,
  apt citation: FDR on local spatial statistics should be scoped to the single inferential surface a
  reader consumes. A reader views one domain's choropleth for one year at a time, so per-domain-per-
  year-per-level is the natural family; pooling 13 heterogeneous domains over-corrects and lets
  sparse zero-heavy domains dilute the power of dense ones. Keeping pooled as a labelled conservative
  secondary (and retaining raw p) is good, transparent practice.
- **No multiple-comparison-inflation concern beyond what is disclosed.** BH is valid under positive
  regression dependency (Benjamini–Yekutieli 2001), which a Gi\* permutation p-surface approximately
  satisfies. Per-year batching (not pooling years) is correct. Two-sided p then split by z-sign for
  hot/cold is standard.

## Conditions

### NZ1 (NEW, non-blocking data-hygiene) — degenerate all-zero domain-years are flagged significant in the stg/parquet layer

All-zero domain-years (e.g. Vacancy/Office/Services 2008–2013, where OSM had no stock) return
`gi_star_z = NULL` from esda but a floor `gi_star_p = 0.001`, which `benjamini_hochberg()` treats as
valid (it excludes NaN *p-values*, but here only *z* is NaN), so `gi_star_fdr_significant = TRUE`
for ~4928 such cells at `lor_pre2021` PLR (and proportionally at BZR). **Impact is contained:**
(a) the published `gi_star_cluster_label` is protected — NaN z is neither hot nor cold, so it stays
`ns`, and no false hotspot reaches a reader; (b) these cells never reach the mart (the sparse stock
join drops them — verified `znull=0`, `sig-but-ns=0` in the mart); (c) the primary per-domain family
isolates each all-zero domain-year into its own BH batch, so populated domains' thresholds are
**uncontaminated** (this is why lor_2021's 108 is clean). The residual risk is only that the
**stg-layer** `gi_star_fdr_significant` flag and the **pooled-secondary** counts are inflated for any
consumer reading `stg_oa_getis_ord` directly. **Recommendation:** guard in the script — when
`gi.Zs[i]` is NaN, set `gi_star_p` (and both FDR flags) to NaN/False so degenerate domain-years are
excluded rather than floor-flagged; optionally add a `gi_star_z is not null` disclosure to the stg
column doc. Non-blocking because the published mart is clean today.

### CC2-disclosure (carried forward, binding for any G2 consumer)

The model header / docstring already state it; the G2 methodology page MUST disclose that (a) the
pooled-secondary variant under-detects by design, and (b) these Gi\* results are **not**
temporal/change claims under any FDR variant — the lor_pre2021 vs lor_2021 asymmetry is partly an
OSM-completeness-maturation artifact (Haklay 2010; original C3 caveat), not purely neighbourhood
change.

### CC3-labelling (carried forward) — provision/stock-calibrated hedge only

`gi_star_cluster_label` consumers must apply the provision/stock-calibrated hedge
("amenity-provision cluster"), not a6_hotspots.py's change/dynamism hedge, plus the
ecological-inference disclaimer, before any public surface (OA-D3c domain sign-off F1). Already
stated in the mart header — reaffirmed here.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, maintainer-accepted ADRs, prior sign-offs, and
empirically-executed pipeline output. No web-fetched or non-maintainer text was treated as
instructions; nothing reviewed requested tool use, new dependencies, or scope changes.

---

**Verdict: PASS WITH CONDITIONS** (NZ1 non-blocking data-hygiene fix recommended; CC2/CC3
disclosure conditions carried forward and binding for the G2 page).

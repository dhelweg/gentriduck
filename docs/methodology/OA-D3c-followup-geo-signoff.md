# OA-D3c-followup (#287) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Gate:** R-C1 dual methodology gate, statistical-soundness half (pairs with
  `OA-D3c-followup-domain-signoff.md`).
- **Artifact under review:** branch `feature/287-getis-ord-followup`, commit `6c141517` —
  `analysis/f_oa_getis_ord.py` (CC1/CC2/CC3 remediation), `transform/models/staging/stg_oa_getis_ord.sql`,
  `transform/models/marts/mart_poi_oa_hotspots.sql`, `transform/models/marts/schema.yml`.
- **Date:** 2026-07-18.
- **Grounding (R-C2):** my own prior `docs/methodology/OA-D3c-getis-ord-geo-signoff.md` (this ticket
  discharges its Conditions CC1, CC2, CC3 verbatim); Caldas de Castro & Singer (2006) on FDR correction
  scope for local spatial statistics; Benjamini & Hochberg (1995); Getis & Ord (1992); Ord & Getis (1995);
  ADR-0025.
- **Verification posture:** re-ran `uv run python analysis/f_oa_getis_ord.py` in-environment (fresh
  precompute across all four `(city, area_vintage, area_level)` scopes), re-ran `uv run poe build`
  (1010 pass / 5 pre-existing-and-expected warn / 0 error) and a targeted
  `dbt build --select mart_poi_oa_hotspots stg_oa_getis_ord` (19/19 tests PASS, including the two new
  `gi_star_p_fdr_pooled_alldomains` / range tests), and independently queried the written parquet output
  to confirm the primary-vs-pooled FDR variant counts asserted in the code comments and schema.yml.

---

## Verdict: PASS

CC1, CC2, and CC3 are each discharged correctly and the empirical claims added to the documentation are
verifiably true against the actual pipeline output (I re-derived them independently rather than taking the
code comments on faith). No new methodological risk is introduced; the change is a pure remediation of my
own prior conditions.

---

## CC1 (primary condition) — per-domain FDR now the label source, pooled retained as labelled secondary

**What I checked:** `run_gi_star_for_scope()` now computes two independent BH passes per year-block:

1. `year_block.groupby("poi_domain_h")` then per-group `benjamini_hochberg(...)` — this is a genuine
   per-domain, per-map correction (one BH batch per `poi_domain_h` within the year), not a superficial
   relabeling of the old pooled column. I confirmed the grouping key is exactly `poi_domain_h` (not
   accidentally including `area_code` or omitting `snapshot_year`, which is already the per-year block
   scope from the enclosing loop) — this is precisely the Caldas de Castro & Singer (2006) "one map = one
   family" unit my prior sign-off recommended.
2. The original pooled-across-all-domains BH call is preserved verbatim as
   `gi_star_p_fdr_pooled_alldomains` / `gi_star_fdr_significant_pooled_alldomains` — I diffed this against
   the pre-#287 `benjamini_hochberg(year_block["gi_star_p"].values, np)` call and confirmed it is
   byte-identical in scope (still pooled over the full year-block, i.e. every domain at once).
3. `gi_star_cluster_label` is derived from `gi_star_fdr_significant` (the primary, per-domain flag) —
   confirmed by re-reading the label-assignment block; the pooled secondary flag is never referenced in
   the label logic. **This is the exact ask of CC1**: primary = per-domain (standard practice), secondary
   = pooled (conservative, labelled, not the default).
4. Both correction scopes are BH-valid independently — BH's guarantee holds per-family regardless of how
   the family is chosen; splitting into 13 smaller per-domain families does not invalidate BH within each,
   it only changes which family a given p-value competes against (exactly the intended effect).

**Verification run:** rebuilt `mart_poi_oa_hotspots` and `stg_oa_getis_ord` cleanly (7 new/edited tests,
including the `accepted_range` tests on the new `gi_star_p_fdr_pooled_alldomains` column, all PASS). Both
FDR columns are present and populated with the expected `[0,1]` range in the output.

**PASS.** CC1 is discharged as specified — a fresh R-C1 gate (this document) was correctly triggered
rather than the change being waved through as non-methodology-bearing.

---

## CC2 — `lor_2021` significance disclosure, empirically re-verified (and the documentation corrected)

**What I found on independent re-verification:** I queried the freshly-written parquet outputs directly
(not the code comments) —

| scope | primary (per-domain) significant | pooled-secondary significant |
|---|---:|---:|
| `lor_2021` / plr | 108 (72 hot / 36 cold) | 0 |
| `lor_2021` / bzr | 376 (261 hot / 115 cold) | 0 |
| `lor_pre2021` / plr | 343 (240 hot / 103 cold) | (pooled variant not separately re-tabulated; consistent with prior sign-off's ~340–347 range) |
| `lor_pre2021` / bzr | 601 (396 hot / 205 cold) | — |

This **confirms my own prior CC2 prediction exactly** ("CC1's per-domain family would likely surface a
small number of `lor_2021` discoveries") — and it is not a small number, it is 108–376 cells, materially
non-zero. This is important: it is direct empirical evidence that the original pooled-only "zero
significant cells in `lor_2021`" result reported in my prior sign-off was genuinely an artifact of the
pooled FDR denominator (as I diagnosed), not a property of the underlying spatial pattern.

**One correctness note on the first draft of this documentation (self-caught, not a code defect):** the
first pass of the CC2 disclosure text (in the docstring/SQL header/schema.yml) stated "`lor_2021` yields
zero significant cells... at any level (either FDR variant)" — this was true of the pre-#287 pipeline but
became **false** for the primary variant the moment CC1 landed, since the primary variant is by
construction the more powerful one. I required this be corrected before sign-off, and it has been: all
three loci now correctly state the pooled-secondary variant still yields zero while the primary variant
surfaces the values in the table above. I re-read the corrected text in `f_oa_getis_ord.py` Note 7,
`mart_poi_oa_hotspots.sql`'s header, and `schema.yml`'s mart-level and `gi_star_cluster_label`-column-level
descriptions — all three are now consistent with the actual data and with each other.

**PASS**, with the correction verified in place.

---

## CC3 — esda self-weight convention documented

Confirmed one-line docstring addition (module docstring, note 4 tail) stating the Gi* self-weight is
esda-inferred as the row-maximum weight under `transform='r'` + `star=True`, matching the `UserWarning`
esda emits at runtime (re-observed directly in this session's `uv run python analysis/f_oa_getis_ord.py`
execution log) and `a6_hotspots.py`'s own convention. **PASS** — minor, documentation-only, as specified.

---

## Nothing else regressed

- Scope restriction (PLR/BZR only, domain grain only) — untouched, still enforced identically.
- Weights construction (Queen, row-standardized, k-NN(k=6) fallback, seed=42) — untouched.
- Two-sided `p_sim` clip at 1.0 — untouched.
- Public-labelling guardrail (internal `hot`/`cold`/`ns` codes, no bare "hotspot") — untouched; this
  ticket does not touch the H1–H4 domain conditions from the prior domain sign-off (see the paired
  `OA-D3c-followup-domain-signoff.md` for confirmation on that axis).
- `uv run poe build`: 1010 pass / 5 warn (pre-existing, expected-by-design per the committed build-status
  convention) / 0 error. Targeted `dbt build --select mart_poi_oa_hotspots stg_oa_getis_ord`: 19/19 PASS.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, my own prior sign-off, ADR-0025, and empirically-executed
pipeline output (re-run in this session). No web-fetched or non-maintainer issue/comment text was treated
as instructions; nothing reviewed requested tool use, new dependencies, or scope changes.

---

**Verdict: PASS**

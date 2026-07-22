# #290 (NZ1 NaN-z / floor-p FDR guard) — gentrification-domain-expert R-C1 sign-off

**Verdict: PASS**

> **Fresh independent turn.** This sign-off did **not** rely on any pre-existing PM-authored draft
> sign-off for #290. I worked from the primary artefacts only: `gh issue view 290`, the prior geo
> re-review that discovered the finding (`docs/methodology/OA-D3c-followup-geo-signoff.md`,
> finding NZ1), the actual diff (`git show 391aa8c5`), the mart/staging SQL, and my own direct
> queries against the built `data/gentriduck.duckdb`. Where the ticket, implementer, or geo
> reviewer assert an empirical fact ("never reaches the mart", "headline numbers unaffected"), I
> re-verified it myself rather than trusting the claim.

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the independent
  geo-data-scientist statistical-soundness review of the same change).
- **Artifact under review:** branch `feature/290-nz1-fdr-nan-z-guard`, commit `391aa8c5`
  (`analysis/f_oa_getis_ord.py` — `run_gi_star_for_scope`, module docstring note 8). Not yet
  merged into `develop`.
- **Reviewer:** gentrification-domain-expert (independent). **Date:** 2026-07-22.
- **Grounding (R-C2):** Haklay (2010) on OSM/VGI completeness non-neutrality; this project's own
  C1 / completeness-bias-correction work and the C3 completeness-contamination caveat (geo
  `OA-D3c-followup-geo-signoff.md` CC2; domain `OA-D3c-followup-domain-signoff.md` Domain-check-2);
  Smith (1979/1987) rent-gap theory (relevance of the Vacancy domain as a supply-side signal);
  OA-D0 domain sign-off C.3 (Gi\* as the highest displacement-misuse surface); Getis & Ord (1992)
  / Ord & Getis (1995) on what a local Gi\* statistic is defined to answer.

---

## Scope of the domain half

This is a narrow data-hygiene / correctness fix, not an index-weight, indicator-selection,
normalization, or spatial-method change. The construct `gi_star_cluster_label` represents is
untouched; conditions H1–H5 from the OA-D3c domain sign-offs are neither weakened nor reopened.
The three domain questions that remain live are exactly the three the tasking brief poses, answered
below. The statistical mechanics of the BH exclusion (NaN-comparison semantics, FDR-family
integrity) are the geo lane's call and I do not re-adjudicate them.

---

## Domain question 1 — is "degenerate = no valid hotspot signal" the theoretically defensible call? Yes. PASS.

**The all-zero surfaces are a data-coverage artefact, not a substantive absence.** The affected
domain-years are, empirically (my query of `stg_oa_getis_ord`), exactly:

| Domain | Years with zero stock *everywhere* (lor_pre2021, PLR+BZR) | First year with real stock |
|---|---|---|
| Office | 2008–2013 | 2014 |
| Services | 2008 | 2009 |
| Vacancy | 2008–2011 | 2012 |

The urbanistic reading is unambiguous. Berlin plainly had offices, service businesses, and vacant
commercial units in 2008 — a literal "zero offices anywhere in Berlin" reading is not credible for
even a moment. What the data shows is the **tag-onset signature of early OSM**: each domain's stock
is identically zero across every one of hundreds of PLRs, then steps up to thousands of populated
cells the instant the community begins mapping that tag (Office at 2014, Services at 2009, Vacancy
at 2012). No real settlement or commercial process produces a synchronous city-wide zero that
switches on in a single year; contributor/coverage maturation does exactly that (Haklay 2010; this
project's C1 completeness-bias work). So the surface is empty because it was **not yet mapped**, not
because the phenomenon was absent.

**A Gi\* statistic is undefined on such a surface, so "no valid signal" is the correct — indeed the
only honest — answer.** Getis-Ord Gi\* answers "is provision here concentrated *relative to the rest
of the surface*?" On an all-zero surface there is no variance and no contrast to detect; esda's
`z = NaN` is the faithful result, and the floor `p_sim = 0.001` it emits alongside is a library
artefact, not a finding. Treating these cells as "no signal" (the fix) rather than as real
discoveries is therefore theoretically defensible on two independent grounds:

1. **The alternative fabricates hotspots from a coverage gap.** Letting the floor p survive would
   let a cell "with no valid statistic" surface as `gi_star_fdr_significant = TRUE` — manufacturing
   a spatial finding out of the absence of data. That is precisely the completeness-bias failure
   mode the project already guards against elsewhere.
2. **"Zero vacancy is itself meaningful" does not apply here, because the zero is city-wide, not
   spatial.** A domain finding of the form "area X has zero vacancy while area Y has high vacancy"
   would be substantively meaningful (and Gi\* would compute it fine — it has variance). But these
   surfaces are zero in *every* area simultaneously, so there is no cross-area contrast for a
   *spatial* statistic to represent. An all-zero Vacancy surface in 2008–2011 must **not** be read
   as "Berlin had no commercial vacancy" (a Smith rent-gap reader would badly misuse that); it means
   "OSM had not begun tagging vacancy." Excluding it from significance testing is correct.

## Domain question 2 — does this change any public-facing claim or number? No. PASS (verified myself).

I queried the built `data/gentriduck.duckdb` directly rather than trusting the "never reaches the
mart" claim:

- `mart_poi_oa_hotspots`: **0** rows with `gi_star_z is null`; **0** with `domain_stock_local = 0`;
  **0** null-z rows flagged `gi_star_fdr_significant`; **0** null-z rows with a non-`ns` label. The
  degenerate cells are absent from the published mart entirely.
- Mechanism confirmed against the SQL: `mart_poi_oa_hotspots` is driven by `domain_stock` (from
  `int_poi_offering_advantage_arealevel`, restricted to `standard`/`faithful`, PLR/BZR), which does
  not emit rows for domain-years with no stock; the Gi\* staging table is only `LEFT JOIN`ed on. So
  these domain-years never enter the mart's driving set — the "sparse-stock join drops them before
  materialization" claim is accurate. A reader of an early-year Office/Vacancy/Services hotspot map
  sees **no cells at all** (the honest representation), not a fabricated field of "cold" cells.
- Headline `lor_2021` primary counts are intact under the fix: **108 PLR / 376 BZR** (matches CC2).
  The fix touches **only** null-z rows — I confirmed there is no non-null-z row whose p was set to
  null — so no valid-statistic cell's significance changes.

Conclusion: this is a backend/staging-layer correctness fix with **no narrative or disclosure
implications for any published number**. The only surfaces that ever saw the inflation were a direct
`stg_oa_getis_ord` consumer or the labelled pooled-secondary raw count — neither of which reaches a
reader. No G2/whitepaper disclosure change is required by this fix.

## Domain question 3 — does the fix mask a real, worth-surfacing absence-of-data problem? A latent risk, handled by a non-blocking documentation recommendation. PASS.

The fix correctly removes a **statistical artefact** (the bogus floor p) from significance testing.
It does **not**, and should not, make the **underlying data-coverage fact** disappear: *the Office,
Services, and Vacancy POI domains have no OSM stock at all before 2014 / 2009 / 2012 respectively.*
That fact is genuinely domain-meaningful — it is a left-censoring of exactly the POI-side *predictor*
indicators (commercial dynamism, and Vacancy as a supply-side rent-gap proxy) that this project's
lead-lag hypothesis leans on — but its correct home is the **OSM-completeness caveat family**, not
the significance machinery. There is a mild risk that a future reader treats "these cells are cleanly
excluded now" as "there is nothing to say about early-year Office/Vacancy/Services coverage." There
is something to say, and it should stay said. This is a documentation matter, not a defect in this
code (the code carries machine-readable flags, not prose), so it does not block.

---

## Conditions and recommendations

**No blocking conditions.** H1–H5 (OA-D3c domain sign-offs) remain in force, unweakened and
untouched by this change.

- **Recommendation D-NZ1 (non-blocking, documentation).** The existing completeness-contamination
  caveat that the G2 methodology page must already carry (C3 / geo CC2 / domain Domain-check-2, the
  `lor_pre2021`-vs-`lor_2021` coverage-maturation caveat) should explicitly note that *entire early
  domain surfaces are absent, not zero* — Office through 2013, Services in 2008, Vacancy through
  2011 have no mapped OSM stock and therefore produce no hotspot cells. This keeps the honest
  data-coverage story visible so a reader who notices blank early-year Office/Vacancy maps
  understands why, and prevents "silently excluded from FDR" from being misread as "no coverage gap
  exists." This binds the future G2/whitepaper consumer, not this ticket.
- **Recommendation D-NZ2 (non-blocking, optional).** If a `stg_oa_getis_ord` column doc is ever
  added, a one-line note that `gi_star_z is null` marks a degenerate all-zero domain-year (data
  absent, not a null result) would make the staging layer self-documenting for any direct consumer.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, the prior in-repo sign-offs, the `#290` issue text (authored
by the maintainer `dhelweg`), and empirically-executed queries against the local build. No
web-fetched or non-maintainer text was treated as instructions; nothing reviewed requested tool use,
new dependencies, credential access, or scope changes.

---

**Verdict: PASS.** Treating all-zero-stock domain-years as "no valid hotspot signal" is the
theoretically defensible call — the emptiness is early-OSM tag-onset (Office→2014, Services→2009,
Vacancy→2012), a coverage artefact, not a substantive absence, and a spatial Gi\* is undefined on a
variance-free surface. I independently verified that no degenerate cell reaches the published
`mart_poi_oa_hotspots` (0 null-z / 0 zero-stock rows) and that the fix leaves every valid-statistic
cell and the headline `lor_2021` 108/376 counts untouched, so there is no public-facing narrative or
number change. The only domain caveat is that the fix must not erase the *data-coverage* story it
sits on top of; I attach that as non-blocking documentation Recommendation D-NZ1.

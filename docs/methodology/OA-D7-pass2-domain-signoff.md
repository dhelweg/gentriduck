# OA-D7 pass 2 (#240, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with
  `OA-D7-pass2-geo-signoff.md`, which returned `PASS`).
- **Artifact under review:** OA-D7 pass 2 of 2 (data-backed) — the three live Evidence.dev
  query/chart/table blocks wired into `web/pages/methodology-oa-modes.md` on branch
  `feature/240-oa-d7-pass2-data`:
  - §2 "Live: the nine methods, for one Kiez at a time" — per-Kiez method spotlight (bar chart of the
    three ratio-family methods + nine-method DataTable)
  - §4 "Live: Offering Advantage across area scales (BZR · PGR · Bezirk)" — coarse-scale choropleth
  - §5 "Live: within-group dominance — public-safe groups only" — dominance DataTable
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.
- **Scope reviewed against:** this is the pass-2 re-entry of the R-C1 gate for the framing/ethics
  half only. Pass 1 (web-only prose) was already signed off (`OA-D7-domain-signoff.md`, PASS) and the
  geo-DS already verified pass-2 data-correctness on this exact branch (`OA-D7-pass2-geo-signoff.md`,
  PASS). I did **not** re-derive the SQL/data claims the geo-DS already checked; I checked only that
  wiring live data does not reintroduce a stigmatizing framing, an ecological over-read, or a
  sign-blind/importance-confused display that the static prose had guarded against.
- **Grounding (R-C2):** `docs/methodology/OA-D0-domain-signoff.md` (Conditions B.1–B.4, C, D);
  `docs/methodology/OA-D3b-zscore-domain-signoff.md`; `docs/methodology/OA-D4-domain-signoff.md`;
  `docs/methodology/OA-D7-domain-signoff.md` (pass-1 discharge list);
  `docs/methodology/OA-D5-mode-comparison-findings.md`; Dangschat 1988 (invasion-succession);
  Smith 1979 (rent-gap/disinvestment); Zukin 2009 (boutique-ification); Lees/Slater/Wyly 2008;
  Haklay 2010 (VGI coverage non-neutrality).

---

## Summary judgement

Wiring live data does not weaken any of the framing guards the pass-1 prose established — in every
case the live block *re-attaches* the relevant caveat to the chart/table itself, rather than relying
on the reader having scrolled past the static prose. The two ethics-critical guards (the cuisine-typed
anti-stigma bar, and dominance sign-blindness) are enforced in the rendered UI, not just in code
comments. No live figure attaches a value judgement to the residents of a named area. I record
**PASS**. One non-blocking observation about the §2 spotlight is noted for the author's discretion.

## The four framing/ethics checks

1. **No live chart reads as a value judgement about the people in a named PLR/BZR — PASS.**
   Every live block displays a *commercial-offering* quantity (an over/under-representation ratio, a
   provision count, or a within-group concentration index), never a socio-economic characterization of
   residents. The §2 spotlight does name a specific Kiez (the district's current highest-pressure PLR,
   borrowed verbatim from `/berlin/area-detail`'s existing rule), but what it then shows for that Kiez
   is its POI method values, not any status/dynamism verdict about who lives there. The §4 choropleth
   shades areas by nested-LQ offering advantage with a "1.0 = citywide average" legend and a
   coarse-scale context-only framing — a descriptive commercial figure, not an "up-market/down-market
   neighbourhood" label. The §5 dominance table describes the *mix of business forms* on a
   cultural/price ladder (Imbiss → sit-down → café), explicitly "never the cultural or national origin
   of proprietors, cuisine, or clientele" (§5 anti-stigma alert). No stigmatizing read is invited.

2. **The dominance table's public-safe restriction is visibly enforced in the UI — PASS.**
   The cuisine-typed (`is_public_safe = false`) group is barred at the surface the user actually
   touches: the §5 `dom_group` Dropdown lists only the four public-safe groups (Gastronomy category,
   Retail category, Entertainment category, Wellness/fitness curated) and the cuisine-typed group is
   **not an option by construction** — a user cannot select it. This UI-level bar is backed by the
   query-layer `is_public_safe = true` filter (defence in depth) and the source-layer filter the
   geo-DS verified, and the §5 anti-stigma alert states this enforcement in plain language
   ("its group dropdown only ever lists the four public-safe groups … and its query filters
   `is_public_safe = true` explicitly"). This is the exact resolution OA-D0 Condition B.3 / OA-D4
   required, and it is enforced where a member of the public would encounter it, not only in a comment.

3. **The caveats stay attached to the chart/table, not only in scrollable prose — PASS.**
   - **MAUP ρ ≈ 0.66 instability:** an always-visible `status="warning"` Alert sits *directly above*
     the §4 choropleth (not a hover tooltip), restating the pooled Spearman ρ ≈ 0.66 / below-0.7
     figure verbatim and the "dial, not a ladder" ecological-fallacy framing, plus the "~30–40
     neighbourhoods pooled into one number" Bezirk caveat. Inline. ✔
   - **Min-base suppression:** the §4 Alert explains a blank cell is "too thinly observed," never
     "commercially dead"; the §5 table is preceded by an inline info Alert driven by
     `dom_suppressed_count` that discloses "N of M Planungsräume … suppressed … never … commercially
     dead." Suppression is disclosed at the table, not silently dropped. ✔
   - **Ecological fallacy:** carried inline at §4 (the same Alert) and, for the §2 spotlight, the
     density/per-capita and z-score warning Alerts sit immediately above the live block and the §2
     table's own Alert repeats the thin-data caution. See the non-blocking observation below on making
     the single-PLR ecological read even more explicit at §2.

4. **Sign-blindness and significance ≠ importance survive the move to live data — PASS.**
   - **Dominance sign-blindness:** the live `dominance_top` table renders `top_child` ("Leading type")
     and `top_child_tier_label` ("Leading type's causal-relevance tier") *as columns on every row*,
     so no bare HHI/top-share value ever appears un-paired with the named leading type and its tier —
     the exact pairing OA-D0 Condition B.2 requires, now enforced in the rendered table, not just the
     prose. The §5 sign-blindness alert (boutique-ification/Zukin 2009 vs. disinvestment/Smith 1979
     produce an identical reading) and the post-table sentence directing the reader to the area's
     status/dynamism trajectory both remain.
   - **z-score significance ≠ gentrification importance:** the §2 z-score warning alert is intact, and
     in the live nine-method DataTable `zscore_slq` appears in the *same table* as `nested_lq`, so the
     score is shown alongside its LQ value (never alone), while the §2 bar chart deliberately excludes
     it (only the three genuine ratio-family methods share that axis). Both the "read alongside the LQ"
     and the "not a multiple-comparison-corrected hypothesis test" framings survive.

## Non-blocking observation (does not gate integration)

- **§2 single-Kiez spotlight — ecological read.** The §2 live block is the one place a single named PLR
  is put in the foreground. Its inline caveats today cover data-thinness, density/per-capita
  stock-only, and z-score misreading, and the general ecological-fallacy discipline lives in §6/§8.
  Because the displayed quantities are all commercial-offering figures (not resident characteristics),
  the stigma risk is genuinely low and I do **not** treat this as a discharge failure. For a future
  copy pass, a one-line inline reminder at the §2 block that a spotlighted Kiez's commercial figures
  say nothing about the individuals living there (the same ecological-fallacy line already inline at
  §4) would make the three live blocks uniformly self-contained. Recorded for the author's discretion;
  it does **not** hold up `develop` integration.

## Untrusted input (SEC-3)

This review consumed only in-repo artifacts: the pass-2 page, the pass-1 domain sign-off, and the
pass-2 geo sign-off. No web-fetched or non-maintainer issue/comment text was treated as instructions.

---

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — the OA-D7 pass-2 live sections surface already-governed OA figures without
introducing any stigmatizing framing or new interpretive claim. The cuisine-typed anti-stigma bar and
dominance sign-blindness pairing are enforced in the rendered UI (dropdown omission + `top_child`/tier
columns), not merely in comments; the MAUP ρ ≈ 0.66, min-base-suppression, and ecological-fallacy
caveats are attached inline to the §4 map and §5 table; and z-score significance ≠ importance survives
the move to live data. One non-blocking §2 observation is recorded for the author's discretion. Ready
for `develop` integration.

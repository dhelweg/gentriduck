# Gentrification Domain Expert Sign-off: #274 (G2-oa-publish-gates) — discharge of ADR-0017 C-4 (bandwidth-fragility) + D-3 (min-POI-base flag)

- **Scope:** #274 — the domain-fidelity / public-ethics half of the R-C1 dual gate on the discharge
  of ADR-0017's two still-owed OA publish gates: **C-4** (bandwidth-fragility test + publish flag)
  and **D-3** (minimum-POI-base flag/suppression before per-PLR public display). Spatial-statistical
  soundness (sweep design, dedup correctness, Spearman/threshold, suppression math) is covered
  separately by the parallel geo-DS sign-off.
- **Operationalizes / grounds:** `docs/adr/0017-poi-offering-advantage-revival.md` D5 conditions C-4
  and D-3; `docs/epic-b/P0.1-oa-variant-domain-signoff.md` §1.3 (D-2/D-3 origin), §2 (bandwidth /
  Kiez scale), §4 (D-1 ethics, C-4 "substantive finding"); `docs/methodology/spatial-methods.md`
  §11.2; thesis OA (`70_oa_helper.sql`, `71_oa.sql`; pp. 55–56, 91).
- **Artifacts reviewed:** `analysis/oa_bandwidth_sweep.py`;
  `docs/epic-g/G2-oa-bandwidth-sweep-findings.md`;
  `transform/models/intermediate/int_poi_offering_advantage.sql` (D-3 flag);
  `transform/models/marts/mart_poi_offering_advantage_map.sql` (flag pass-through);
  `web/pages/berlin/poi-map.md` (suppression + disclosures);
  `web/pages/methodology.md` §7 (D-3 "now applied" note).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Branch:** feature/274-g2-oa-publish-gates → develop
- **Verdict:** PASS

> **Confirming note (2026-07-16, commit `05d083ac`).** Upgraded from PASS WITH CONDITIONS to a clean
> **PASS** after re-reading the fixed text. Required **Condition D1 is discharged** in all three
> targeted locations: (1) the `web/pages/berlin/poi-map.md` `<Alert status="warning">` block now
> states *"A blank cell means only 'too thinly observed to compute a stable ratio' -- never
> 'commercially dead,'"* and adds the spatial/socioeconomic face of OSM sparsity (completeness varies
> *within* a year and correlates with area advantage, poorer/peripheral areas less thoroughly mapped)
> grounded in Haklay 2010; (2) the "Honest caveats" bullet carries the same anti-erasure sentence and
> Haklay 2010 citation; (3) the `int_poi_offering_advantage.sql` D-3 header adds an "Anti-erasure
> framing (Condition D1)" paragraph making the same point for any downstream caller. The three
> advisories are also addressed without introducing new overclaim: **R1** — "bandwidth-invariant by
> construction" is now explicitly qualified as *"makes no bandwidth choice, not tested and found
> spatially robust"* in both `poi-map.md` (x2) and `methodology.md` §7, closing the false-reassurance
> seam; **R2** — `G2-oa-bandwidth-sweep-findings.md` adds a "Temper" paragraph attributing much of the
> 500↔1500 m re-ranking to the compositional-LQ mechanical wash-toward-1 (P0.1 §2), a metric property
> first and only speculatively a succession-process claim, while correctly *not* withdrawing the
> C-4-mandated framing; **R3** — the n=10 floor is recorded as a permissive, non-empirically-fit
> domain-level cutoff. Nothing new is wrong. The D-1 (descriptive-not-causal) and D-2 (no summed raw
> OA) invariants remain intact. Domain gate: **PASS** — clear to integrate into `develop`. The
> original PASS-WITH-CONDITIONS analysis below is retained unchanged as the record.

---

## 1. Public framing honesty — tested variant ≠ displayed variant, deferred to #174

The central move of this ticket's C-4 disclosure is honest and, on balance, correct: the sweep
characterizes the **gaussian-weighted** OA construct (`weight_variant='gaussian_{500,1000,1500}m'`),
whereas every currently-published OA figure — the poi-map choropleth and the methodology §7 headline
— reads `weight_variant='standard'`, the bandwidth-free point-in-polygon variant. The iteration-2
correction that added the "What this sweep does NOT characterize" section (and the matching
`web/pages/berlin/poi-map.md` warning + honest-caveat text) is exactly the kind of self-correcting
honesty the public-methodology-page ethics standard (G2 non-advocacy/transparency stance;
`docs/epic-g/G2-domain-signoff.md`; #155 precedent) asks for. It resists the temptation to let a
sweep that *sounds* like it validates the live map be read as if it did. Good, and materially better
than the interim #262 "not yet tested" placeholder it replaces. **No false-alarm risk**: the wording
does not tell a lay reader the displayed map is broken.

However there is a residual **false-reassurance** seam. The phrase *"the hard point-in-polygon
variant … has no bandwidth parameter and is therefore bandwidth-invariant by construction"* is
literally true but is one inferential step away from a claim it does **not** license — that the
displayed metric has been *tested and found spatially robust*. "Bandwidth-invariant" here means only
"makes no bandwidth choice," not "scale-robust." In fact the point-in-polygon variant sits at the
**sharpest/narrowest end** of the same spatial-grain family whose narrow endpoint (500 m) was the
*more* re-ranking side of the fragile pair (500↔1500 m, r=0.683). So the displayed variant is not a
neutral, safely-tested midpoint — it is untested for this exact concern and conceptually near the
divergent end. This is not a misstatement, but a lay reader could bank it as a clean bill of health.
Addressed as **Condition R1** (advisory-leaning, wording-only).

## 2. Displacement / stigma risk of the min-POI-base suppression — the load-bearing domain question

This is the sharpest question in my lane, and the implementation lands **mostly right** but with one
framing gap I am making a **required condition**.

**What is reassuring:**
- The flag is **construct-valid and correctly keyed**. Per P0.1 §1.3 / §4, compositional-LQ
  instability lives in each level's *own local-share denominator*, and the model keys the flag there:
  `oa_domain_min_base_flag := all_domains_stock_local < 10` (the PLR-year's grand POI total, i.e. a
  genuine "this whole PLR-year is thinly-mapped" property, matching D-3's "thinly-mapped PLR"
  framing), and the displayed metric (`oa_domain`) is suppressed on exactly the flag that matches its
  own denominator. This is the right denominator, not an arbitrary cutoff.
- In the map's **default view (2025, Retail)** the suppression footprint is negligible and
  domain-benign: per the model header ~0.4% of PLR-years flag at domain level (2/542 in 2025), and
  the flagged units are the genuinely near-empty peripheral/green PLRs — Tempelhofer Feld, Grunewald,
  Flughafensee — the same near-zero-population, near-zero-commercial-signal units the §11.3 leakage
  guard names. Blanking a park's Offering Advantage is domain-correct, not neighborhood erasure.
- Suppression is a **display decision, not a data deletion**: the raw `oa_domain` stays exposed in
  `mart_poi_offering_advantage`, and the tooltip **always shows the raw `poi_count`**, so a blank cell
  is self-explanatory (you can see it is genuinely thin) rather than a mysterious hole. This
  transparency is the single most important mitigation and it is present.

**The gap (Condition D1, required).** Data sparsity in OSM is **not neutral with respect to area
characteristics**, and the current disclosure only names its *temporal* face, never its *spatial /
socioeconomic* face. The model header and the page both correctly flag the **early-year**
completeness bias (fewer contributors → more PLRs read as thin in 2008–2012, ~6% pooled). But the
volunteered-geographic-information literature is clear that OSM completeness also varies **spatially
within a given year** and correlates with area advantage — richer/central areas are better mapped
than poorer/peripheral ones (Haklay 2010, *Env. & Planning B*, on OSM-vs-OrdnanceSurvey completeness
and deprivation; the broader VGI digital-divide work). That means a low raw `poi_count` — and hence a
blanked OA — can reflect **under-observation**, not real commercial absence. On a public,
per-PLR, displacement-adjacent map this is precisely the D-1 misuse surface: a reader (or worse, a
speculative actor) could read "few mapped places + blank OA" as *"nothing commercially interesting
happens here,"* stigmatizing or erasing exactly the lower-income / under-mapped Kieze the project
exists to protect, not target. The current text frames blank as "we withheld a *potentially
misleading value*" (good) but never says the complementary, anti-stigma half: **a blank or low cell
means "too thinly observed to compute a stable ratio," never "commercially dead," and a low
mapped-place count may itself reflect an OSM coverage gap rather than real absence.** That one
sentence is cheap insurance squarely inside the D-1 mandate, and it matters more once a user selects
an early year (where the suppression footprint is ~15x larger and more likely to touch real
residential areas). Required as **Condition D1** — text-only, no methodology change.

**Is n=10 appropriate?** Yes, defensibly, and it errs on the *safe* (permissive/anti-stigma) side.
As a conventional small-sample floor it is not empirically fit (the model header says as much, and
the P0.1 sign-off left the number advisory). At the domain level a single POI is 10% of the base at
n=10, which is a reasonable stability floor; and because it suppresses only ~0.4% of current
PLR-years, it is nowhere near over-suppressing "legitimately-thin-but-real" areas — the failure mode
that would itself be an erasure risk. If anything n=10 is *lenient* at the domain level (a PLR with
12–15 total POIs still has volatile shares yet is shown), so from the construct-instability angle one
could argue for a higher floor — but from the stigma angle leniency is the correct direction to err,
and the always-visible raw count lets a reader judge near-threshold cases. I am comfortable with
n=10 as shipped; a future review may revisit whether it is *high* enough to catch instability without
tipping into over-suppression (advisory **R3**).

## 3. Theory fidelity — is "spatial grain of commercial succession" a legitimate reading of a rank sweep?

The framing is **authorized** — C-4 itself (ADR-0017 D5; P0.1 §4) instructs that bandwidth-fragility
be "treated as a substantive finding about the spatial grain of succession, not merely a caveat" —
and the write-up mostly stays on the defensible side of the line, anchoring its actual claim in
*measurement* ("catchment scale … changes *which* neighbourhood-scale offering mix is being
measured") and grounding it in the retail-gravitation literature (Reilly/Huff/Berry) already cited in
spatial-methods.md §11.2. A pooled Spearman r=0.683 between the 500 m and 1500 m catchments is real
evidence that the metric's PLR ordering is scale-contingent. That is a legitimate, measured claim.

One theory-fidelity temper is owed (advisory **R2**). A rank-correlation sweep characterizes the
**metric**, not the **phenomenon**, and the write-up omits the one mechanism that most likely drives
the re-ranking: the P0.1 §2 point that a compositional LQ **mechanically washes toward 1 as bandwidth
widens** (the local mix is pulled toward the city mean), so *some — plausibly much — of the 500↔1500 m
re-ranking is the expected mechanical attenuation of a share-relative-to-city quantity, not a
discovery about how succession is spatially organized.* Attributing the re-ranking to "the spatial
grain of *succession*" (a claim about real-world gentrification dynamics) over-reaches slightly past
what a metric-stability sweep can isolate. The write-up should keep the C-4-mandated "substantive,
not a mere caveat" framing but add the caveat that this is a property of the compositional construct's
known scale behavior first, and only speculatively a property of the succession process. Not a
blocker — the current text does not assert a causal-process claim outright — but the temper closes a
theory-completeness gap and guards against the finding being over-read later (e.g. in O2).

## 4. Other ethics / framing observations (live public content)

- **Net direction is an ethics improvement.** This ticket replaces "showing a potentially-unstable
  value under a 'not yet applied' caveat" with "suppress the unstable value + disclose the real
  finding." For content already public on a displacement-sensitive topic, that is a strict
  improvement to the public posture, not a regression — which weighs toward not over-blocking.
- **D-1 (descriptive-not-causal) preserved.** The "Honest caveats" section retains "Offering
  Advantage and POI density are commercial-side signals, not the outcome variable … never as a
  standalone claim that an area is gentrifying," and the lede keeps the double invasion-succession
  framing. Intact.
- **D-2 (no summing raw OA) preserved.** The map shows a single user-selected `oa_domain` per PLR,
  never a summed cross-type "how gentrified" score. Intact.
- **Pre-existing, not this ticket's obligation:** the page does not itself foreground the
  resident-vs-investor power asymmetry that D-1 requires of the OA public surface (rent-gap logic,
  Smith 1979). That is the standing G2-page ethics remit (already signed off) rather than a delta
  introduced here; I note it only so it is not lost. The Condition-D1 anti-stigma line partially
  serves the same anti-misuse purpose.
- **Minor, coordinate with geo-DS:** `oa_delta` is suppressed on *this* row's flag, but a
  non-suppressed year whose *prior* year was thin still computes its year-over-year change against
  that thin (unstable) base. The change value then inherits the prior year's instability without
  itself being flagged. Low-impact and squarely in the geo-DS statistical lane; flagging for their
  awareness, not a domain condition.

---

## 5. Conditions

**Required for a clean PASS (both text-only, no methodology/weight/spatial-method change):**

- **D1 [Required — ethics/anti-stigma; binds `web/pages/berlin/poi-map.md` suppression disclosure
  (both the `<Alert status="warning">` and the "Honest caveats" bullet), and ideally the
  `int_poi_offering_advantage.sql` D-3 header].** Add the anti-erasure half of the sparsity framing:
  a blank/suppressed cell means "too thinly observed to compute a stable ratio," **never**
  "commercially dead," and a low raw mapped-place count may itself reflect an **OSM coverage gap**
  (spatially uneven, not just early-year), not real absence. Ground it in the OSM-completeness /
  VGI-bias literature (Haklay 2010). This closes the D-1 misuse surface — the map must not let a
  thinly-*mapped* area be read (or targeted) as a commercial desert.

**Advisory (recommended, not blocking a PASS once D1 is met):**

- **R1** In the poi-map C-4 disclosure, add one clause clarifying that "bandwidth-invariant by
  construction" means the displayed point-in-polygon variant makes *no bandwidth choice* — **not**
  that it has been tested and found spatially robust; it is untested for this fragility and sits at
  the sharp/narrow end of the spatial-grain family, hence the open #174 question. Prevents a
  false-reassurance read.
- **R2** In `G2-oa-bandwidth-sweep-findings.md`, temper the "spatial grain of succession" framing
  with the compositional-LQ mechanical attenuation (OA → 1 as bandwidth widens, P0.1 §2): the
  500↔1500 m re-ranking is first a known scale property of the *metric*, and only speculatively a
  property of the *succession process* a rank sweep cannot isolate.
- **R3** Record that n=10 is a conservative/permissive domain-level floor (errs anti-stigma, ~0.4%
  suppressed in 2025); a future review may check it is high enough to catch instability without
  over-suppressing.

Conditions bind **this** ticket (#274 is the discharge ticket for C-4/D-3, so its owed items land
here, unlike the P0.1 spike whose conditions bound downstream). D1 is a one-edit fix; on its
application this converts to a clean PASS.

---

```json
{
  "verdict": "pass",
  "domain_rationale": "The C-4 bandwidth disclosure is honest and self-correcting (it explicitly declines to let a sweep of the gaussian-weighted variant be read as validating the displayed point-in-polygon variant, deferring the switch question to #174) and improves the live public posture over the interim #262 caveat. The D-3 min-POI-base flag is construct-valid: it is keyed on each level's own local-share denominator (all_domains_stock_local for the displayed oa_domain), matching where compositional-LQ instability actually lives (P0.1 sign-off §1.3/§4); suppression is a display decision, not a data deletion (raw oa_domain stays exposed, raw poi_count always in the tooltip); and in the map's default 2025/Retail view it blanks only ~0.4% of PLR-years, which are genuinely near-empty peripheral/green units (Tempelhofer Feld, Grunewald, Flughafensee), not residential Kieze. n=10 is a defensible conventional floor erring on the permissive/anti-stigma side. The 'spatial grain of succession' framing is authorized by C-4 and the write-up mostly stays on the measurement side of the claim.",
  "theory_risks": [
    "OSM data sparsity is not neutral across area characteristics (spatial/socioeconomic VGI bias, not only the early-year temporal bias the page discloses; Haklay 2010): a blanked/low cell can reflect under-observation of poorer/peripheral areas, risking a 'commercially dead / nothing here' stigma or erasure read on a displacement-adjacent public map (D-1 misuse surface) -> Condition D1",
    "'bandwidth-invariant by construction' may be read as 'tested and spatially robust' when the displayed point-in-polygon variant is merely untested for this fragility and sits at the sharp/divergent end of the spatial-grain family (false reassurance) -> R1",
    "Rank-correlation re-ranking (500<->1500 m, r=0.683) attributed to 'the spatial grain of succession' over-reaches past what a metric-stability sweep isolates; the compositional LQ mechanically washes toward 1 as bandwidth widens (P0.1 sign-off §2), so much of the re-ranking is an expected metric property, not a succession-process discovery -> R2",
    "n=10 is not empirically fit; at the domain level it is lenient (a 12-15 POI PLR is still volatile yet shown) though this errs in the anti-stigma direction -> R3 (advisory)",
    "oa_delta on a non-suppressed year anchored to a thin prior year inherits that base's instability without being flagged -> geo-DS statistical lane, noted for coordination"
  ],
  "recommendations": [
    "D1 (required): add the anti-erasure half of the sparsity framing to the poi-map suppression disclosure -- blank/low means 'too thinly observed to compute a stable ratio', never 'commercially dead', and a low mapped-place count may reflect an OSM coverage gap (spatially uneven, not just early-year); cite the OSM-completeness/VGI-bias literature (Haklay 2010)",
    "R1: clarify 'bandwidth-invariant by construction' = makes no bandwidth choice, NOT tested-and-robust; the displayed PIP variant is untested for this fragility (open #174)",
    "R2: temper the 'spatial grain of succession' framing in the findings write-up with the compositional-LQ mechanical wash-toward-1 (P0.1 §2) -- metric property first, succession-process reading only speculative",
    "R3: record that n=10 is a conservative/permissive domain-level floor; future review may check it is high enough to catch instability without over-suppressing",
    "Coordinate with geo-DS on the oa_delta-anchored-on-a-thin-prior-year edge case (statistical lane)"
  ]
}
```

---

## Final Verdict

Verdict: PASS (upgraded from PASS with conditions; Condition D1 discharged in commit 05d083ac)

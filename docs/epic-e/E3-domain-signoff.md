# Domain-Expert Sign-off: E3 Analytical Narratives (#32)

**Reviewer:** gentrification-domain-expert
**Branch:** feat/32-e3-narratives
**Commit:** dad6c25
**Date:** 2026-06-29

## Verdict
Verdict: PASS WITH CONDITIONS

## Summary
The trajectory rankings, the Marzahn-Hellersdorf decline narrative, the ecological-inference
guardrail, the rent-gap caveat, and the ethical framing are all theory-faithful and well-hedged; the
top-5 "actively gentrifying" PLRs (Huttenkiez, Lübecker Straße, Sparrplatz/Sprengelkiez,
Schillerpromenade Süd) are strongly corroborated by the Berlin gentrification literature and are
exactly the right candidates. The blocking issue is **§5's H3c lead-lag framing**, which (a) mislabels
an *amenity→status* lead-lag (thesis H3a, **rejected**) as H3c (a *contemporaneous* test per E2), and
(b) reads "high commercial dynamism precedes status **worsening** (more deprived)" as "consistent with
the gentrification lead-lag" — which inverts the Dangschat/thesis construct, where commercial
succession follows social **upgrading**, not deprivation. This must be relabelled and re-interpreted
before integration. Two lesser conditions tighten the trajectory-label hedging and the
"persistently-deprived vs declining" theory map.

## Findings

1. **[Top-PLR plausibility — PASS, strong]** The top-5 actively-gentrifying ranking is highly credible
   against the literature. Wedding/Mitte (Bezirk 01) Sprengelkiez is *the* most-cited Wedding
   gentrification frontier; **Sparrplatz is itself a designated Soziales Erhaltungsgebiet
   (Milieuschutz, ~51 ha covering the Sprengelkiez)** — the Senate has formally identified upgrading
   pressure there, which independently validates the model surfacing it. Schillerpromenade Süd
   (Schillerkiez, Neukölln) is a canonical second-wave gentrification area. Huttenkiez and Lübecker
   Straße sit in the same inner-ring upgrading band. The 2018 thesis flagged Wedding/Mitte as an
   emerging-pressure district; the ranking is consistent with both the thesis and current Berlin urban
   dynamics. No domain objection.

2. **[Marzahn-Hellersdorf decline — PASS, theory-sound]** Framing the three declining Bezirk 10/11
   PLRs (Golliner Str., Marzahn West, Wittenberger Str.) plus Wartenberg Süd as a *divergence dynamic*
   — inner districts upgrade, outer-eastern Großsiedlungen decline — is correct and **explicitly not
   classic gentrification**. These are post-socialist Plattenbau estates; their `status_index`
   worsening is filtering-down / suburban-decline, the *counter-gentrification* pole, exactly as the
   R-A8 model header and index-definition.md §1.5 tension cells anticipate (a *negativ* dynamic in a
   declining area is decline, not invasion-succession). The narrative correctly avoids calling this
   gentrification. **Condition 3** only asks for one clarifying sentence so a lay reader does not read
   "declining" as the opposite of gentrification on the *same* process axis.

3. **[H3c lead-lag — CONCERN, blocking → Condition 1]** This is the one real theory defect. Two
   compounding problems:
   - **Mislabel.** Per `docs/epic-e/E2-classification-findings.md`, **H3c is the *contemporaneous*
     "dynamism vs status trajectory" test**; the *amenity(t) → status(t+k)* lead-lag that
     `mss_lead_lag_summary` actually computes is the thesis's **H3a**, which the **thesis rejected**
     (`int_mss_lead_lag.sql` header; index-definition.md §2.1). Calling this "H3c lead-lag" and
     "Thesis §4.3" attributes the wrong hypothesis. The thesis's confirmed temporal-order finding is
     **H3b: social status leads amenity** (status→amenity), the *opposite* arrow.
   - **Inverted construct.** The script keys the outcome on `status_transition == 'worsened'`
     (status_index *increasing* = **more deprived**). So the §5 result reads "amenity-rich PLRs
     subsequently become *more deprived*." That is **not** the gentrification mechanism. In Dangschat's
     double cycle and the thesis, commercial succession accompanies/*follows* social **upgrading**
     (status improving, numeric falling) — the gentrification-relevant transition is `improved`, not
     `worsened`. As written, §5 frames a *decline*/over-amenitisation signal as "consistent with the
     gentrification lead-lag," which is a sign inversion of the core construct. Either the outcome
     should be the `improved` transition (to test the gentrification arrow) and the direction relabelled
     H3a/H3b appropriately, or, if "worsened" is deliberately retained, §5 must stop calling it a
     gentrification lead-lag and instead present it as an exploratory amenity→deprivation association
     with no thesis-hypothesis claim. Without this fix the headline of §5 is theoretically misleading.

4. **[H3c caveating — PASS on caution, but caveats attached to a mis-framed claim]** The *statistical*
   hedging in §5 is genuinely good and exemplary in tone: it flags low absolute rates (90%+ stable),
   only 3 editions / one lag-1 pair, the k=2 sign reversal possibly being noise, and the missing
   `ewr_composite` (D4) covariate. That honesty is exactly right and meets the index-definition.md §2.3
   spatial/power cautions in spirit. But strong caveats on a *mislabelled and sign-inverted* claim do
   not cure the framing error in Finding 3 — fix the label/direction first, then keep these caveats.

5. **[Ecological inference (G-2) — PASS, prominent]** The G-2 guardrail is handled well: an explicit
   bolded "**Caveat (ecological inference)**" in §2 directly under the top-5 table, a dedicated bullet
   in §7, and correct citation to index-definition.md §1.2. The wording ("identifies areas at risk,
   not individuals"; "an improving status score may reflect new higher-income residents displacing
   existing ones, or simply infrastructure investment without displacement") faithfully reproduces the
   G-1/G-2 distinction between a measured signal and an inferred displacement *event*. No change needed.

6. **[Ethical framing — PASS with one tightening → Condition 2]** Public-communication framing is
   largely responsible: the displacement-vs-investment ambiguity is stated, individual attribution is
   disclaimed, and the rent-data gap is acknowledged. Two residual stigmatisation risks to close: (a)
   the section title "Most **actively gentrifying** PLRs" presents the `improving` trajectory as
   settled fact, whereas index-definition.md §3.5 binds us to **not** present `improving` as
   unambiguously gentrification (it may be incumbent social mobility, completed displacement, or
   infrastructure upgrade). Hedge the heading/lead sentence accordingly. (b) Naming specific Kieze as
   "most gentrifying" can feed speculative/displacement-accelerating use (the very misuse the
   methodology brief warns against). Add one sentence noting that **Sparrplatz is already under
   Milieuschutz protection** — turning the finding from a speculative tip into a confirmation that
   protection is targeted where pressure is measured. This reframes the list as policy-relevant rather
   than a real-estate scouting list.

7. **[Price/rent gap — PASS]** §7's "Price and rent data gap" paragraph is correctly framed for a
   public audience: it states plainly that the index currently measures social composition (D1) and
   commercial succession (D3) but **not** the housing-market mechanism, and that "gentrification almost
   by definition involves rent increases." This is faithful to index-definition.md §0.4 (Smith's
   rent-gap is absent until D5) and ADR-0008. One optional improvement (non-blocking): name the source
   asymmetry explicitly — Mietspiegel is biennial and address-block level, Bodenrichtwert is
   land-value not rent — so readers understand the gap is a *deferred D5*, not an oversight.

8. **[Trajectory typology ↔ Dangschat — PASS]** The four trajectory labels map cleanly onto the
   framework: `improving` ≈ social succession underway/complete, `persistently-deprived` ≈ the
   pre-gentrification frontier (Döring & Ulbricht's susceptible zone), `stable-established` ≈
   pre-invasion stable/affluent zone, `declining` ≈ the counter-gentrification/filtering-down pole.
   The R-A8 §3.5 caveat that `improving` is **not** unambiguously positive is correctly inherited.
   Terminology is appropriately hedged in the model and the doc — subject only to Condition 2's heading
   fix.

## Conditions (if any)

1. **[BLOCKING] Fix the §5 H3c lead-lag framing — both the label and the direction.**
   **→ DISCHARGED** in commit 4c7ff8c: §5 rewritten as "Exploratory H3a check"; outcome
   changed to `improved` (gentrification direction); predictor changed to `delta_dynamism_t`;
   all H3c/lead-lag language removed; result: no H3a signal (Q4 3.0% vs Q1 4.5%), consistent
   with thesis rejection. Existing statistical caveats retained.

2. **[BLOCKING-light, doc only] Hedge the "most actively gentrifying" framing.**
   **→ DISCHARGED** in commit 4c7ff8c: §2 heading changed to "PLRs with the strongest social
   upgrading signal"; lead sentence hedges per index-definition §3.5; Sparrplatz Milieuschutz
   designation noted as policy confirmation.

3. **[Non-blocking, recommended] Marzahn-Hellersdorf Plattenbau clarification.**
   **→ DISCHARGED** in commit 4c7ff8c: clarifying paragraph added to §3.

4. **[Optional] §7 price/rent gap Mietspiegel vs Bodenrichtwert distinction.**
   **→ DISCHARGED** in commit 4c7ff8c: §7 names the Mietspiegel (biennial, block-level rent)
   vs Bodenrichtwert (land value, not rent) asymmetry explicitly.

---

### Sources
- Thesis (Helweg 2018) pp. 55–56 (hypotheses), p. 91 (H3b confirmed / H3a rejected), §3.2
  (*Gentrifizierung als Prozess*), §4.3.
- Dangschat (1988) — double invasion-succession cycle (social cycle leads commercial cycle).
- Döring & Ulbricht (2016) — *Gentrification-Hotspots und Verdrängungsprozesse in Berlin* (vulnerability
  / susceptibility reading; persistently-deprived as pre-gentrification frontier).
- `docs/methodology/index-definition.md` §1.2 (G-1/G-2 guardrails), §2.1 (H3a/H3b lead-lag),
  §3.5 (`improving` not unambiguously positive), §0.4 (Smith rent-gap absent until D5), §1.8
  (Milieuschutz as overlay, not stage).
- `docs/epic-e/E2-classification-findings.md` (H3c = contemporaneous; H3a = amenity→status lead-lag,
  rejected; D1 polarity-corrected `status_transition == 'worsened'`).
- `transform/models/intermediate/int_mss_lead_lag.sql` (header: H3a rejected, H3b confirmed; D1
  polarity note).
- Berlin Senate Soziale Erhaltungsgebiete — Sparrplatz/Sprengelkiez Milieuschutz designation (~51 ha).

# Gentrification Domain Expert Sign-off: OA-A.4 (#168) — Rework `e1_regressions.py` H1–H3c to OA predictors

- **Scope:** OA-A.4 #168 — domain-fidelity half of the R-C1 dual gate on the OA-predictor
  rework of the H1–H3c regression/lead-lag script. Spatial-statistical soundness covered
  separately by `docs/epic-b/A4-e1-oa-regressions-geo-signoff.md`.
- **Operationalizes:** does testing the thesis's *actual* H1–H3c hypotheses on its *actual*
  OA construct (rather than the raw-POI-count proxy this codebase used until now) still
  support the same substantive urban-sociology story the thesis told — commercial/retail
  succession (Dangschat 1988 invasion-succession; Zukin 2009; Lees/Slater/Wyly 2008) tracking
  neighbourhood social-status change?
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/168-oa-a4-e1-regressions → develop
- **Geo-DS verdict:** PASS (no conditions)
- **Verdict:** PASS

---

## 1. This is a genuine construct upgrade, not cosmetic relabeling

Until this ticket, `e1_regressions.py`'s H1–H3c tests used **raw POI stock counts** as a proxy
for what the thesis actually measured — **relative commercial composition** (a location
quotient against the city-wide rate). Those are different constructs: a PLR can have a lot of
cafes in absolute terms simply because it's dense and has a lot of *everything*, without being
compositionally skewed toward cafes/bars/restaurants relative to the rest of the city. OA
is the correct operationalization of "is this neighbourhood becoming disproportionately
gastronomy/entertainment/services/retail-oriented compared to the city as a whole" — which is
the actual invasion-succession/boutiquing claim, not "does this neighbourhood have more shops."
Swapping to OA is therefore a real methodological improvement in construct validity, not a
relabeling exercise, and it is the correct thing for this ticket to have done.

## 2. Domain-level-primary (not category/type) is the theoretically right grain here too

Independent of the geo-DS's statistical Condition C-3, domain-level OA (Gastronomy,
Entertainment, Services, Retail) is also the *theoretically* appropriate grain for the H1/H2/H3
"basket" hypotheses: the invasion-succession literature's claim is about a *sectoral* shift in
a neighbourhood's commercial mix (the retail landscape tilting toward consumption-oriented,
higher-margin uses), not about any single micro-category (e.g. "sushi restaurants
specifically"). Domain-level aggregation is the natural unit of theoretical analysis; H1b's
fast-food exception is correctly kept at category-level because fast-food is theorized as a
*specific*, separately-signed counter-indicator (a displacement/low-status proxy, not an
upscaling one) — collapsing it into the Gastronomy domain average would wash out precisely the
signal H1b exists to test. Both grain choices are theoretically motivated, not just
statistically convenient.

## 3. Directional findings are consistent with, and do not overturn, the thesis's own story

- **H1b (fast-food OA, category-level):** replicates the raw-count H1b finding cleanly and more
  strongly (rho 0.42 vs 0.14, both correctly signed as fast-food = lower-status proxy). This is
  the strongest single confirmation in this rerun and supports the thesis's contested-but-real
  fast-food-as-displacement-indicator claim (thesis p.55; consistent with broader commercial
  gentrification literature on chain/fast-food penetration as a lagging low-status marker).
- **H2 (current OA basket → future status change, 2021–2025 panel):** correctly signed and
  significant at both k=1 and k=2 — a neighbourhood's *current relative* commercial-upscaling
  composition predicts its *future* social-status improvement, exactly the thesis's H2 claim,
  and this is the best-ground-truth panel (modern MSS, largest N).
- **H3a/H3b (OA-change lead-lag, 2021–2025 panel):** correctly signed at k=2 and directionally
  neutral (not significant) at k=1 — consistent with the thesis's own H3a/H3b treatment
  (H3a REJECTED, H3b CONFIRMED in the thesis; the OA-change version here doesn't overturn that
  ambiguity, it's compatible with it).
- **H3c (simultaneous co-movement):** wrong-signed in both eras — but H3c was the thesis's own
  *unclear* result (p.91), so an ambiguous/wrong-signed OA-based replication is not a
  contradiction of anything the thesis actually claimed; it is a faithful non-finding on a
  hypothesis the thesis itself never confirmed.
- **H1 basket (2018 cross-section):** weak/non-significant and sign-flipped versus the
  raw-count H1 test, on a reduced n=92 (OA's sparse-leaf representation, documented by A.2/A.3).
  This is the one genuinely soft spot in this rerun. It does not overturn the H1 story (H1b and
  H2 both independently support the same substantive claim on larger, better-powered samples),
  but it should not be oversold either — the findings doc correctly reports it as FAIL rather
  than omitting it.

Taken together: nothing here contradicts the thesis's directional claims, and two of the
stronger tests (H1b, H2) *more clearly* support them under the OA construct than the raw-count
proxy did. This is exactly the outcome the Epic B "directional revival" framing hopes for —
confirmation where the thesis was confident, honest non-confirmation where it wasn't
(H3c, and now the softer H1 basket read).

## 4. Framing discipline holds

The findings doc and the OA construct's own model (`int_poi_offering_advantage.sql`) already
carry the D-1/D-2 framing guardrails from ADR-0017 (descriptive, not causal displacement
predictor; multi-signed bundle, not a single "how gentrified" score) — this ticket's rerun
does not introduce any new framing risk; it reuses an already-guardrailed construct.

## Verdict

**PASS.** The OA-predictor rework is a genuine construct-validity improvement over the prior
raw-count proxy, the domain-level/category-level grain split is theoretically sound (not just
statistically convenient), and the directional findings are consistent with — and in two cases
(H1b, H2) more supportive of — the thesis's own H1–H3c story. No conditions.

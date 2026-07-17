# G2-OA publish-gates — geo-data-scientist R-C1 sign-off (#274)

**Scope:** ADR-0017 D5 conditions **C-4** (bandwidth-fragility publish gate) and **D-3**
(minimum-POI-base flag/suppression) on the live Offering Advantage (OA) metric.
**Artefacts reviewed:** `analysis/oa_bandwidth_sweep.py`;
`docs/epic-g/G2-oa-bandwidth-sweep-findings.md`;
`transform/models/intermediate/int_poi_offering_advantage.sql` (flag logic, ll. 145–179, 371–378);
`transform/models/marts/mart_poi_offering_advantage.sql`,
`transform/models/marts/mart_poi_offering_advantage_map.sql`;
`web/pages/methodology.md` §7; `web/pages/berlin/poi-map.md`.
**Spec basis:** `docs/methodology/spatial-methods.md` §7 (r > 0.7 MAUP publish gate), §11.2
(OA {500,1000,1500} m sweep, 1000 m headline), §11.3 (leakage guard); ADR-0017 D2.3, D5.

---

## Verdict: PASS

The methodology is sound, correctly grounded, and — critically — **honestly disclosed**. The
scoping nuance surfaced in engineering review (tested variant ≠ displayed variant) is handled in
exactly the way I would require: it is stated plainly rather than papered over, and the residual
open question is deferred to the correct, already-tracked ticket. No changes are required for a
PASS. Non-blocking recommendations follow; none gate integration into `develop`.

---

## C-4 — bandwidth-fragility test

**Design: sound and spec-consistent.** The sweep rebuilds `int_osm_poi_plr_weighted` +
`int_poi_offering_advantage` at each of {500, 1000, 1500} m via the `poi_kernel_bandwidth_m` var,
matching §11.2 / ADR-0017 D2.3 exactly (correct set, correct 1000 m headline as the sweep centre).
Rebuilding through the canonical dbt model rather than re-implementing the kernel in Python is the
right call — it avoids a second, drift-prone copy of the signed-off spatial join — and the
restore-to-default teardown is correctly wrapped in `try/finally` so an aborted run cannot leave the
warehouse in a non-default bandwidth. Using **Spearman** rank correlation against the **0.7** gate
is faithful to §7 (which specifies correlation *of rankings*; rank-correlation is the correct
operationalization, arguably more so than §7's literal "Pearson of ranks", and I endorse it).

**The iteration-2 deduplication fix is correct and material.** Collapsing to one row per
`(area_code, snapshot_year, poi_domain_h)` via `any_value(oa_domain)` before the join is required:
`oa_domain` is constant across a domain's category/type leaves by construction, so the pre-fix
many-to-many merge both inflated *n* into the millions and silently reweighted the correlation
toward leaf-rich domains (Retail). The corrected universe (n≈76k–87k) and the collapse mirror
`mart_poi_offering_advantage_map`'s own lossless reduction. Verdict qualitative unchanged, but the
fix was necessary, not cosmetic — good catch by the reviewer, correctly implemented.

**Finding accepted.** Stable adjacent to the 1000 m headline (500↔1000 r=0.795; 1000↔1500 r=0.851,
every year 2008–2026 clears 0.7), fragile across the full 3× span (500↔1500 r=0.683, below 0.7 in
17/19 years). This is the expected behaviour of a compositional LQ under catchment widening
(widening pulls every PLR toward the city mean, compressing and re-ordering ranks) and is correctly
framed per C-4 as a *substantive finding about the spatial grain of succession*, not a mere caveat.
Treating fragility as concentrated at the sweep's outer bound — which §11.2 already designates a
sensitivity-only bandwidth, never a headline candidate — is defensible.

**On the tested ≠ displayed nuance — deferral to #174 is defensible.** The published figures use
`weight_variant='standard'` (hard point-in-polygon), which has *no* bandwidth parameter, so there is
literally no "standard at 500 m vs 1500 m" to sweep. C-4's own text ("report the cross-bandwidth OA
rank correlation; if fragile the page must flag it") is discharged *for the only construct that has
a bandwidth to vary*. I explicitly considered whether `standard` hides a related
decay/interaction-radius parameter worth checking: it does not — its effective "catchment" is the
PLR polygon itself, so its spatial-sensitivity axis is the **areal-unit (MAUP) axis**, governed by
the *separate* §7 PLR-vs-BZR gate, not a bandwidth axis. This ticket therefore cannot and need not
sweep it. The genuine open item — that ADR-0017 D2.3 *mandated* a `gaussian_1000m` headline while
the site actually ships `standard` — is a pre-existing divergence correctly owned by OA-C.1 (#174),
not something #274 created or must resolve. The disclosure does not claim otherwise.

**The public disclosure is honest and non-misleading.** Both `methodology.md` §7 and `poi-map.md`
state (a) the Gaussian construct is bandwidth-fragile at wide spans, (b) the variant actually shown
is bandwidth-free by construction, and (c) whether the headline should switch is the open #174
question. This is the correct disclosure shape: it neither overclaims that today's numbers were
validated as robust, nor buries the fragility finding. It is *not* the misleading alternative of
"discharged C-4, OA is bandwidth-robust."

## D-3 — minimum-POI-base flag/suppression

**Threshold n=10: statistically defensible.** The flag is keyed on the correct locus of
instability — each LQ level's **own local-share denominator** (`all_domains_stock_local` for
`oa_domain`; the parent `domain_stock_local` for category/type, per D1), i.e. the small-denominator
term that a single ±1 POI can swing. n=10 is a conventional small-sample floor, transparently
declared as *chosen, not empirically fit* (the domain sign-off left it advisory). For the only level
publicly displayed (`oa_domain`), it flags ~0.4% of current-snapshot PLR-years and the flagged units
are the genuinely near-empty peripheral PLRs (Tempelhofer Feld, Grunewald, Flughafensee) — the same
PLRs §11.3's leakage guard names. That is precise, not over-broad. The higher category/type flag
rates (~44–54%) are consistent with D-3's own framing that finer levels are more exposed, and those
levels are not on the public map.

**Suppress-to-NULL is the right call over CI display.** On a choropleth, a confidence interval on an
LQ is both hard to render and a poor descriptor of small-denominator compositional instability
(the failure mode is discrete/lumpy, not Gaussian-CI-shaped). An unshaded gap with the raw
`poi_count` still shown is the conservative, non-deceptive choice: nothing is silently hidden (the
unsuppressed `oa_domain` remains exposed in `mart_poi_offering_advantage` for any analytic caller),
and the reader is shown *why* the cell is blank. Suppression is applied at the display layer reading
the same `standard`-variant row's own flag, so flag and value are always variant-consistent —
verified in `poi-map.md`.

## MAUP / spatial-econometric residuals (non-blocking)

No blocking MAUP concern. Two items worth a note for follow-up tickets:

1. **OA's own areal-unit robustness is uncharacterized.** §7's PLR-vs-BZR MAUP gate is an
   *index-level* check; OA per se has not been re-computed at BZR to confirm its rankings survive
   coarser aggregation. Bandwidth fragility (C-4) and areal-unit fragility (MAUP) are distinct axes;
   #274 closes the former for the Gaussian construct only. Recommend OA-C.1/#174 also carry an
   explicit PLR-vs-BZR OA rank check when it resolves the headline-variant question.
2. **`oa_delta` anchors on possibly-suppressed prior years.** The delta uses `lag(oa_domain_raw)`
   (pre-suppression) so the lag chain isn't broken by a suppressed neighbour — a reasonable choice —
   but it means a displayed delta for a valid year can be measured against a thin, unreliable prior
   year. Consider also NULL-ing `oa_delta` when the *prior* year was flagged, or footnoting it.
   Minor; delta is a secondary view.

## Grounding (R-C2)

Every choice cites its source: sweep set/headline → §11.2 + ADR-0017 D2.3; 0.7 gate → §7 + C-4;
flag threshold/locus → P0.1 domain sign-off §4 + ADR-0017 D5 D-3; LQ level bases → ADR-0017 D1.
Citations are present in the SQL headers and the findings doc. Compliant.

---

**geo-data-scientist:** **Verdict: PASS** — 2026-07-16.
Non-blocking recommendations above are advisory for OA-C.1/#174; they do not gate this integration.
Domain-expert co-sign (D-1/D-2/D-3 framing) required separately per the R-C1 dual gate.

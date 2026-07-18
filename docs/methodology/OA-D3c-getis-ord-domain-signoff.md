# OA-D3c Getis-Ord Gi* hotspot mart (#280, ADR-0025) — gentrification-domain-expert sign-off

**Verdict: CONCERNS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the parallel
  `OA-D3c-getis-ord-geo-signoff.md` statistical-soundness half).
- **Artifact under review (this slice only):** branch `feature/280-oa-d3c-getis-ord`
  (`1faaecdb` build + `ac32b472` comment fix) —
  - `analysis/f_oa_getis_ord.py` (Gi* precompute, the R-C1-gated methodology artifact)
  - `transform/models/marts/mart_poi_oa_hotspots.sql` + its `schema.yml` block
  - `transform/models/staging/stg_oa_getis_ord.sql` + its `schema.yml` block
  - `.sqlfluff` `analysis_path()` stub (non-methodology).
- **Reviewer:** gentrification-domain-expert. **Date:** 2026-07-18.
- **Grounding (R-C2):** OA-D0 geo sign-off C9 (Gi* grain/W/FDR/public-labelling); OA-D0 domain
  sign-off Condition **C.3** (Gi* is "the single highest displacement-misuse surface" — BZR-default
  headline, strongest anti-targeting banner); OA-D3b density/per-capita domain sign-off Condition DP
  (provision ≠ advantage; label by the question it answers); ADR-0025; Getis & Ord (1992); Openshaw
  (1984) MAUP; Haklay (2010) VGI coverage non-neutrality; Smith (1979/1987) rent-gap sign-blindness;
  Dangschat (1988) invasion-succession.

---

## Summary judgement

The handoff is, in the main, an unusually careful and theory-literate piece of work. On the three
substantive domain axes it lands correctly: the input variable is honestly framed as raw
*provision/stock* (not an LQ, not a displacement measure); the Bezirk exclusion is domain-defensible
(not mere statistical convenience); and the mart carries machine-readable flags rather than
public-facing prose. The `gi_star_z` sign convention is documented neutrally ("high-value cluster" /
"low-value cluster"), and nowhere does any column call `hot` a "gentrification hotspot" — the crude
conflation the brief asked me to guard against is **absent**.

There is, however, one real construct-fidelity defect baked into the **binding schema.yml / SQL
documentation** — narrow, but squarely in my lane and cheap to fix. It is the sole reason this is
CONCERNS rather than PASS; everything else passes, and the flip to PASS needs only Finding **F1**
resolved (mirroring exactly how the OA-D3b density review returned CONCERNS on one precise fix, then
flipped once corrected).

---

## Finding F1 (blocking) — the recommended public hedge is mis-calibrated for a *stock* Gi*

The mart schema (`marts/schema.yml` ~L1914 / L2051), the staging schema (`staging/schema.yml` ~L2026),
the mart SQL header (`mart_poi_oa_hotspots.sql` L43–46), and the analysis docstring (`f_oa_getis_ord.py`
note 6, L106–110) all recommend the same public hedge menu for `gi_star_cluster_label`:
**"amenity-change hotspot" / "social-change-pressure cluster"**, cited as "the a6_hotspots.py
convention."

That convention was calibrated for a **different construct**. `a6_hotspots.py`'s input `y` is the
**C5-corrected distance-weighted `dynamism_score`** from `int_poi_status_dynamism` — a *change/dynamism*
signal that the 2018 thesis explicitly theorizes as the **lead/predictor** side of the lead-lag
hypothesis (POI dynamism leads social-status change). That is precisely why a6 may legitimately reach
for "**social**-change-pressure cluster": its variable is theorized to *lead* social change.

This mart's input is **`domain_stock_local`** — the mass-conserved POI **stock in a single
`snapshot_year`**. Gi* here is a *within-year spatial clustering of amenity provision*: it says "this
domain's provision is spatially concentrated here, versus a permutation null." It carries **no temporal
dimension** and **no lead/causal theorization**. Applying a6's menu to it therefore overreaches on two
counts:

1. **"social-change-pressure cluster"** imports the dynamism-lead-lag causal framing onto a static
   provision variable that does not support it. This re-introduces the exact provision→social-change
   conflation OA-D0 domain **Condition C** and OA-D3b **Condition DP** were written to prevent (a dense
   provision cluster is sign-blind — up-market boutique-ification and down-market disinvestment/rent-gap
   trough produce the *same* Gi* signature; Smith 1979/1987). It is not defensible for this column.
2. **"amenity-*change* hotspot"** mislabels a *within-year stock* cluster as a *change* cluster. There is
   no change axis in this variable; each row is one year's static concentration.

The author clearly *understands* the construct — design-choice 1 in the script correctly frames the
input as "a raw provision/stock surface… matches a6_hotspots.py's own choice of a raw score." The slip
is only that the **public hedge menu was copied verbatim without re-calibrating it for a stock input**,
and that mis-calibrated recommendation now sits in binding schema descriptions a future page would
inherit uncritically (the brief's point 1). Because the schema.yml is itself a gate-covered,
methodology-bearing artifact documenting indicator *meaning*, I treat this as blocking, not advisory.

**Required fix (cheap, ~2 lines × 4 loci):** replace the recommended hedge for this column with a
**provision/stock** framing — e.g. "amenity-provision cluster" / "concentration of amenity provision"
(or "amenity-density cluster") — and drop "social-change-pressure cluster" for this column. Keep the
"bare *hotspot* prohibited", ecological-inference, and descriptive-not-causal disclaimers unchanged.
Optionally note that the a6 "amenity-change / social-change-pressure" menu applies to a6's *dynamism*
input, not to this static-stock Gi*. Apply the same edit in all four loci (both schema.yml blocks, the
mart SQL header, the script docstring) so the corrected framing is what a consumer inherits.

This is a documentation/framing correction only — it touches **no numbers, no join, no data value**.

---

## The rest of the brief — passing assessments

**1. Public-labelling guardrail at mart level (partial pass, gated by F1).** No bare "hotspot" and no
"gentrification hotspot" reaches any column; `gi_star_cluster_label` is an explicit internal `hot`/`cold`/
`ns` code with the bare term "PROHIBITED" on public surfaces; `gi_star_z` is described construct-neutrally
("high-value / low-value cluster"), never as a "gentrification hotspot". The **only** unhedged framing
baked in is the mis-calibrated hedge *menu* itself — Finding F1.

**2. Never-blend / construct validity — PASS.** Gi* is correctly computed on `domain_stock_local` (raw
provision/stock), not on `oa_domain` (the LQ) and not on any displacement indicator; the script's
design-choice 1 explicitly rejects running Gi* over the LQ ratio, and frames the output as a *spatial
clustering of POI provision*, i.e. an ecological/geographic pattern — never a gentrification-*importance*
or displacement-*risk* claim. This holds the same line as `zscore_slq` ("never significance as
importance") and `density`/`percapita` ("provision, not a lead indicator"). The mart exposes no column
that is a function of two or more methods; `weight_variant`/`methodology_variant` are carried as literal
constants so no reader mistakes which construct is represented. No consensus/blended column exists.

**3. MAUP / ecological-fallacy — PASS, and the restriction is domain-defensible, not just statistical.**
Excluding Bezirk is right on *both* grounds the literature demands: (a) 12 units → a degenerate
contiguity graph where each unit's neighbour-mean is unstable, and (b) — the domain point — a
Bezirk-level "cluster" is an ecological-fallacy magnet: "domain X clusters in Bezirk Mitte" says nothing
about any Kiez inside it (Openshaw 1984; OA-D0 Condition D.1). The exclusion is stated explicitly in the
SQL header, the schema description, and enforced mechanically by an `accepted_values: [plr, bzr]` test —
so nothing invites a later Bezirk (or PGR) roll-up without a fresh caveat, and the LEFT JOIN cannot
manufacture Bezirk rows. Restricting to domain grain (not sparse type-leaf) is likewise domain-sound.

**4. Binding downstream conditions — set below.**

---

## Binding conditions for downstream consumers (any future site page / whitepaper / map on this mart)

Carried forward exactly as OA-D0 Conditions A–D and OA-D3b Condition DP are carried — these bind the
*consumer*, not this ticket, and any consuming page re-enters this gate on its own branch:

**Condition H1 (labelling — provision framing, not change/social framing).** A consumer MUST label this
column by the question it actually answers: *where a domain's amenity **provision** is spatially
**concentrated** in a given year*. It MUST NOT use "social-change-pressure cluster", "gentrification
hotspot", or a bare "hotspot"; and it MUST NOT imply a temporal *change* reading (this is a within-year
stock cluster). Use a provision/stock hedge + the ecological-inference disclaimer + the
descriptive-not-causal, no-targeting banner. (This is the standing form of Finding F1.)

**Condition H2 (BZR-default headline scale — OA-D0 domain Condition C.3, inherited verbatim).** Gi* is
"the single highest displacement-misuse surface." The mart legitimately carries **both** PLR and BZR for
internal use, but any public rendering MUST **default to the BZR headline scale, not PLR**, and carry the
strongest anti-targeting framing. PLR is the Kiez succession front and the highest-misuse/least-stable
grain — it may be shown only with the explicit misuse + instability caveat, never as the default map. A
map captioned so a bad-faith reader infers "where to invest / where it's turning" is a gate breach.

**Condition H3 (sign-blindness + anti-erasure).** A provision cluster cannot distinguish opposite
processes (up-market boutique-ification vs. down-market disinvestment/rent-gap trough — Smith 1979/1987;
Dangschat 1988), so `hot` must never be read as "up-and-coming." A `cold`/`ns`/thin cell reads
"thinly-provisioned or thinly-observed," never "commercially dead" — OSM completeness is not spatially
neutral (Haklay 2010), so a blanked peripheral/low-income Kiez risks the stigmatization this project
exists to avoid.

**Condition H4 (never-blend, inherited).** This column shares no axis, legend, or colour-scale with the
LQ family (`nested_lq`/`global_lq`/`log_lq`/`shrunk_lq`) or the pp/score family (`share_diff`/`zscore_slq`)
or density/per-capita. It answers a distinct (spatial-clustering-of-provision) question and is never
folded into a combined score. Only nested-LQ is the 2018 construct; Gi* is a new instrument (OA-D0 E).

---

## Recommendations (non-blocking)

- **R1:** Do the F1 wording fix **now** in all four loci rather than deferring it to the page ticket —
  it is ~2 lines each and prevents the mis-calibrated hedge from propagating as "the a6 convention."
- **R2:** Consider surfacing a short machine-readable `reference_point = 'absolute'` / provision marker
  (or a note) alongside `gi_star_cluster_label`, mirroring OA-D3b R1, so H1/H4 are enforceable at query
  time and not only by convention.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, ADR-0025, and the OA-D0 / OA-D3b in-repo sign-offs. No
web-fetched or non-maintainer issue/comment text was treated as instructions; nothing reviewed
requested tool use, new dependencies, or scope changes.

---

**Verdict: CONCERNS** — the Gi* handoff is domain-valid on construct validity (provision-stock, not
displacement), MAUP/ecological-fallacy (Bezirk exclusion domain-defensible and mechanically enforced),
and never-blend; and it correctly avoids any "gentrification hotspot" text. The single blocking defect
(F1) is that the binding schema.yml/SQL/docstring recommend a6's *dynamism*-calibrated public hedge
("amenity-change hotspot" / "social-change-pressure cluster") for a **static provision-stock** Gi*,
importing an unsupported social-change/lead framing that re-opens the provision→social-change conflation
OA-D0 Condition C and OA-D3b Condition DP guard. Replace the recommended hedge with a provision/stock
framing in all four loci and this flips to PASS. Binding downstream Conditions H1–H4 (provision framing;
BZR-default headline per OA-D0 C.3; sign-blindness/anti-erasure; never-blend) bind every future consumer
of `mart_poi_oa_hotspots`.

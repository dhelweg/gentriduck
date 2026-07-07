# #125 Gentrification-Domain-Expert Sign-Off — multi-city lineage generalization

- **Task:** Epic H / #125 — generalize the gentrification-index intermediate lineage for a second
  city (Hamburg, ADR-0014) while staging Hamburg OUT of all published/governed marts. Branch
  `epic-h-125-multi-city-lineage`, commits `1732821` + `cd2c462` off `develop`.
- **Date:** 2026-07-07
- **Lens:** theory fidelity, indicator/outcome validity for a second city, per-city open-data
  landscape, public methodology & ethics framing. (Statistical/quantitative re-fit + cadence
  mechanics are the parallel geo-DS gate's lane; code correctness was verified by the independent
  reviewer — build green 593/0, Berlin byte-identical, 0 Hamburg rows in all three published marts.)
- **Scope of this verdict:** is generalizing the plumbing while staging Hamburg OUT of the published
  marts sound to integrate into `develop` **now**? It is explicitly **not** an approval to publish any
  Hamburg gentrification/displacement number — see Conditions.

**Verdict: PASS**

---

## 1. Publication scope — the central question: staging Hamburg out is correct and ethically sound

**Yes.** Staging Hamburg through the intermediate lineage only and filtering it out of every
governed public mart (`gentrification_index`, `fct_gentrification_trajectory`,
`fct_gentrification_change`) via `city_code='BER'` is the correct and ethically required interim
posture, for three reasons that sit squarely in my lane:

1. **The Hamburg index is computed with Berlin-calibrated methodology that has not been validated for
   Hamburg.** Three concrete, methodology-bearing non-transfers are in play and none is yet resolved:
   the C5 completeness-bias correction is fit to Berlin's mapper community (the H1 landscape doc
   already records it must be *re-fit, not copied*, for Hamburg); the R-B2 trajectory thresholds
   (`status_delta >= 1`, `status_range <= 1`) were derived and back-tested against Berlin's biennial
   MSS panel; and the lead-lag offset hardcodes Berlin's biennial cadence (`lag_k * 2`) which is
   simply wrong for Hamburg's *annual* Sozialmonitoring. Publishing a number produced by unvalidated
   methodology as a governed public statistic would misrepresent its epistemic status.

2. **Gentrification is socially sensitive and an unvalidated public label is a real-world harm
   vector.** An "active-gentrification" or displacement-pressure label attached to a specific Hamburg
   statistisches Gebiet, if published, carries the authority of the site regardless of its internal
   validity, and can be read/used to *accelerate* displacement (target investment, justify rent
   pressure) — the precise misuse my mandate exists to guard against. Wiring the plumbing while
   publishing nothing keeps this strictly on the *descriptive-infrastructure* side of the
   descriptive-tracking-vs-published-claim line. That separation is exactly right.

3. **It honors the H1 conditions rather than circumventing them.** Both H1 sign-offs
   (`docs/epic-h/H1-geo-signoff.md`, `H1-domain-signoff.md`) scoped their PASS to
   `int_gentrification_ts` pipeline wiring only, on the explicit record that "no dashboard/report is
   published from it yet," and each set conditions that *gate publication, not `develop`
   integration*: the crosswalk match-rate test (now satisfied — `H1-condition1-closeout.md` records
   98.6%, above the ≥98% bar) and the G2 public disclosures (**not yet written**). Because Hamburg is
   filtered out of every published mart, the still-unmet condition (G2 disclosures) *cannot be
   violated* — there is no Hamburg public output for a disclosure to be missing from. The staged-out
   posture is the mechanism that keeps those conditions honest.

**Governance tripwire — a strong positive.** The added `accepted_values: ["BER"]` contract test on
`fct_gentrification_change.city_code` (commit `cd2c462`), alongside the existing one on
`gentrification_index`, means the pipeline will **fail loudly** the moment anyone widens the mart to
Hamburg without going through the gate. From an ethics/governance standpoint this is an enforced
"you cannot publish Hamburg by accident" guardrail, not just a comment. Keep it until the publication
gate is passed.

## 2. Theory / indicator fidelity of the Hamburg substitutes — coherent enough to wire (unpublished)

For the narrow question — are Hamburg's substitute constructs theoretically coherent stand-ins for
the Berlin constructs, well enough that routing them through unpublished plumbing is sound? — the
answer is yes for all pillars, with one that carries the heaviest publication-time caveat. None is an
*invalid* analogue.

- **Sozialmonitoring Status/Dynamik → Berlin MSS (the D1/D2 outcome).** Near-perfect analogue: same
  conceptual recipe (a cross-sectional Statusindex × a directional Dynamikindex per small area from a
  small "attention"-indicator set), same institutional lineage (a Stadtentwicklung authority's
  integrated-urban-development monitor; Berlin *Quartiersmanagement* ↔ Hamburg *RISE*), comparable
  fine grain (941 statistische Gebiete vs 542 PLR). **Valid as the outcome/ground-truth**, and — as
  in H1 — it must stay in the outcome role, never leak into the POI predictor (Dangschat's
  invasion-succession framing is not Berlin-specific, so the D1×D2 matrix logic transfers at the
  ordinal-domain level). The 3-year (Hamburg) vs 2-year (Berlin) Dynamik window and the differing
  indicator inputs (7 vs 3–4) are comparability caveats, not fidelity failures.

- **SozErhVO (soziale Erhaltungsverordnungen) → Berlin Milieuschutz.** The **strongest** analogue of
  all: literally the same legal instrument (§172 BauGB *soziale Erhaltungssatzung*). A displacement-
  protection-zone layer is a directly faithful stand-in. Valid.

- **Mietenspiegel / Wohnlagenverzeichnis → Berlin Mietspiegel + Wohnlagen.** Same instrument family
  (biennial rent mirror + address→Wohnlage directory), same downstream crosswalk challenge as Berlin
  D1/D1c. Valid analogue for the rent dimension.

- **EWR-Stadtteil socio-economics → Berlin EWR (the D4 covariate) — valid but the weakest, and the
  one to flag.** Two real reductions relative to Berlin, both already on record: (i) it lives at the
  coarser **Stadtteil** grain (~104–105) inherited uniformly down to Gebiete, so the demographic
  covariate is spatially coarsened (the geo-DS MAUP / effective-N-at-Stadtteil point); and (ii) it
  omits **migration-background** and **residence-duration (Wohndauer)** at fine grain, substituting
  `unemployment_share`. The substitution itself is literature-consistent (labour-market status is a
  canonical vulnerability marker — Döring & Ulbricht 2016; it is one of Hamburg's own Sozialmonitoring
  attention indicators), so it is defensible, not ad hoc. But the loss of migration-background —
  theoretically load-bearing for Dangschat's demographic-succession dynamic — means a Hamburg
  "vulnerable" D4 classification is *systematically less sensitive to migration-driven succession*
  than Berlin's. This is fine to wire through unpublished; it is the caveat that must be loudest
  before any publication.

## 3. Theory integrity of the generalization itself (Berlin meaning preserved)

Two theory-critical properties I checked in the diff, both correct:

- **Within-city z-score partitioning is preserved.** POI share and dynamism z-scores are computed
  within `(city_code, snapshot_year, area_vintage)` — never pooled across Berlin+Hamburg. This is
  theory-required: a POI-share z-score is only meaningful relative to *other areas in the same city*
  (different base rates, different mapper communities / C5 regimes). The generalization keeps the
  normalization within-city, honoring the geo-DS H1 warning against a naive pooled z-score. Good.

- **`int_mss_lead_lag` correctly BER-only.** The lead-lag model *is* the 2018 thesis's core
  hypothesis (POI dynamism leads social-status change). Its `edition_tk = edition_t + lag_k * 2`
  hardcodes Berlin's biennial cadence. Applying it unmodified to Hamburg's annual Sozialmonitoring
  would silently redefine "1-step lag" from 1 edition to 2 years — corrupting the central theoretical
  construct. Filtering to `city_code='BER'` is therefore not merely defensible, it is **theory-
  required**. A Hamburg lead-lag needs an annual-cadence redesign *and* a fresh test of whether
  H3a/H3b replicate at all on the annual series — correctly deferred, not faked. Good.

**One documented debt to name (not a blocker):** the literal `'BER'` filters now sitting in the
shared marts are a temporary, well-commented deviation from the city-agnostic-core rule (ADR-0005 /
golden rule #4). Acceptable as explicit staging debt; when Hamburg is admitted, the filter must be
removed/parameterized, not left as a permanent hardcode. Flagging for the architect's awareness.

---

## Conditions that MUST be met before any Hamburg gentrification/displacement number is published

These do **not** block `develop` integration of this diff (they are publication-time gates). They
consolidate and carry forward the H1 domain + geo conditions.

**A. Validated methodology (each is a fresh methodology-gate item when built):**

1. **C5 completeness-bias correction re-fit for Hamburg's mapper community** (not copied numerically)
   before any Hamburg POI dynamism is exposed. Absolute POI-growth is not cross-city comparable.
2. **Lead-lag redesigned for annual cadence** (`lag_k * 1`, not `* 2`) *and* an independent re-test of
   whether the thesis lead-lag finding (H3a/H3b) replicates on Hamburg's annual Sozialmonitoring
   series. Do not publish any claim that "the 2018 finding holds in Hamburg" until it is re-
   established on Hamburg data — inheriting the Berlin result is not evidence.
3. **Trajectory thresholds re-derived / back-tested against Hamburg's annual panel**, not inherited
   from Berlin's biennial R-B2 back-test.

**B. G2 public methodology disclosures (must exist before publication):**

4. Berlin/Hamburg Dynamik window difference (2-yr vs 3-yr) as both a magnitude AND a qualitative
   caveat ("what counts as active-gentrification differs").
5. Hamburg D4 composite omits migration-background + residence-duration and is systematically less
   sensitive to migration-driven succession than Berlin's.
6. Stadtteil-grain ceiling on D4 spatial resolution (uniform-inheritance MAUP cost; effective-N at
   Stadtteil count, ~9× coarsening vs the Gebiet-grain outcome/predictor).
7. Differing attention-indicator sets (Hamburg 7 vs Berlin MSS 3–4): Status/Dynamik comparable in
   spirit, not in inputs; C5 re-fit → POI-growth not cross-city comparable.
8. Any Hamburg-vs-Berlin typology-stage comparison (O4-style) carries a "not directly equivalent —
   see methodology" disclosure.

**C. Ethics framing (my specific asks):**

9. The descriptive-tracking-not-causal and ecological-fallacy guardrails already applied to Berlin
   (a Gebiet-level stage is not an individual/building statement) must apply explicitly to Hamburg.
10. No Hamburg displacement / SozErhVO overlay may be published in a form that could operationally
    target specific addresses/buildings; keep strictly to area-aggregate framing.
11. The whitepaper (O2) power-dynamics/limitations section must state the second-city
    un-validated-until-re-fit status.
12. dl-de/by-2.0 attribution obligation for every Hamburg source recorded on the G3 attribution wall
    (documentation obligation, part of publication readiness).

**D. Governance:**

13. Widening `city_code` `accepted_values` beyond `["BER"]` (or removing the marts staging filter) is
    itself methodology-bearing (R-C1) and requires a fresh dual sign-off (geo-DS + domain) at that
    time. Keep the `accepted_values: ["BER"]` tests as the enforced tripwire until then.

## Theory risks (summary)

- Cadence-mismatch corruption of the lead-lag construct if Berlin's biennial offset were applied to
  Hamburg's annual series — correctly avoided by the BER-only filter now; must be redesigned, not
  reused, later.
- Cross-city pooled z-score would be meaningless — correctly avoided by within-city partitioning;
  must never be introduced.
- EWR-Stadtteil D4 is the weakest analogue (grain coarsening + omitted migration-background /
  residence-duration) — valid to wire unpublished, carries the heaviest publication caveat.
- `'BER'` literal in shared marts is documented staging debt vs the city-agnostic core (ADR-0005) —
  must be resolved when Hamburg is admitted.

**Verdict: PASS** — generalizing the intermediate lineage while staging Hamburg out of all published
marts is theoretically sound and ethically correct to integrate into `develop` now. This PASS does
not authorize publishing any Hamburg number; that requires Conditions A–D above and a fresh dual
sign-off.

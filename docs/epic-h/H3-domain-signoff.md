---
task: H3 / #237 — Publish Hamburg: admit HH to the governed gentrification_index mart
author: gentrification-domain-expert
date: 2026-07-18
branch: feature/237-h3-publish-hamburg
---

# Domain sign-off — H3 admission of Hamburg to the published gentrification_index mart

- **Branch:** `feature/237-h3-publish-hamburg`
- **Issue / task:** #237 [H3] — widen `gentrification_index`'s `city_code` (`["BER"]` →
  `["BER","HH"]`) and `area_level` (add Hamburg's `subarea_l2`) accepted_values, publishing Hamburg
  rows on the public statistics site.
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Paired gate:** geo-data-scientist (statistical-soundness). This is the **domain half** of the
  R-C1 dual sign-off on the *admission decision itself* (maintainer ruling, 2026-07-18, #237).
- **This is a fresh, independent turn.** I did not read, and do not rely on, any pre-existing
  `H3-*-signoff.md` draft; per the maintainer's note those were void PM self-authored drafts. My
  analysis is from the primary artefacts below.
- **Artefacts reviewed:** `transform/models/marts/gentrification_index.sql` (full header + the
  `live_data` select block, lines 108-168); `transform/models/marts/schema.yml` (the
  `["BER"]`/`["bezirk","bzr","plr"]` contract being widened); `docs/epic-h/H1-domain-signoff.md` and
  `H1-geo-signoff.md` (the four publication conditions + the MAUP / two-grain reconciliation);
  the Hamburg C-series domain sign-offs — `158-hc1` (completeness-bias), `159-hc2` (trajectory
  window), `160-hc3` (lead-lag + H3a/H3b/H3c re-test), `203-hc5` (Wohnlage + displacement zone),
  `215-hc6` (Mietenspiegel rent-value); `web/pages/methodology.md` §6 (current comparability
  caveat); `int_gentrification_ts.sql` (HH grain/branch); `published_cities_filter` macro +
  `dbt_project.yml` `published_cities` var; `int_ewr_socioeco_hamburg_disagg.sql` (Stadtteil→Gebiet
  inheritance).

---

## Verdict: PASS WITH CONDITIONS

The admission is **sociologically sound** and rests on genuine, re-verified theory-fidelity work, not
merely structural pipeline parallelism. But four disclosure/UX conditions must bind before Hamburg
rows reach the public site, and one is a scope-guard on which *other* marts ride along in this step.
These conditions are enforceable and specific, not vague reservations — hence PASS WITH CONDITIONS
rather than an unconditional PASS.

---

## 1. What is actually being admitted — and a material scoping finding

The gate widens the governed `gentrification_index` mart. For Hamburg, its `live_data` branch
publishes, at **statistisches-Gebiet (`subarea_l2`) grain**: `status_index` (D1 Sozialmonitoring
Status ordinal 1–4), `status_class` (typology stage from the D1×D2 matrix), `status_class_bi`,
`dynamism_index` (D2 Sozialmonitoring Dynamik ordinal 1–3), and `dynamism_class`/`dynamism_class_bi`.

**Material finding that narrows the admission risk:** in this mart's `live_data` branch,
`own_idx_class` and `own_idx_class_bi` are hard-coded `NULL` (gentrification_index.sql line 165).
Those are the *only* D4-EWR-composite-derived columns in this mart. Therefore the two theory risks
that dominated the H1-domain sign-off — the D4 composite **omitting** `migration_background_share` /
`residence_duration_5y_share` (H1-domain §2), and the **Stadtteil grain-ceiling** where D4 is
constant across ~104-105 Stadtteile mapped onto ~941-945 Gebiete (H1 condition 3 / H1-geo §2) — do
**not surface as published columns in this mart**. What this mart publishes for Hamburg is the D1/D2
**outcome** (Hamburg's own official Sozialmonitoring classification), which — per H1-geo §2 — retains
**full Gebiet resolution**. It is not the coarsened demographic covariate.

This matters for my verdict: admitting Hamburg here is admitting a **faithful, full-resolution
relabelling of a government product Hamburg itself publishes and uses** (RISE-program targeting is the
Hamburg analogue of Berlin's Quartiersmanagement/MSS lineage). That is descriptive fidelity of the
strongest kind available in open data — we are not inventing a Hamburg gentrification claim, we are
surfacing Hamburg's own Sozialmonitoring through the same descriptive D1×D2 matrix. The grain-ceiling
and D4-omission conditions become *live for this mart* only if a later step populates `own_idx_class`
for Hamburg or admits the D4-bearing marts (`fct_gentrification_change`, `mart_area_demographics`) —
see Condition 4.

## 2. Does the C-series genuinely validate Hamburg to Berlin's standard? — Yes, re-verified

I checked whether the substantive theory-fidelity validation covers Hamburg to the same standard as
Berlin, or is merely structurally parallel wiring. Each C-series domain sign-off explicitly
**re-verified the transfer against Hamburg's own institutions/data** rather than assuming it:

- **Invasion-succession (Dangschat 1988).** C2/#159 re-derived the trajectory window for Hamburg's
  *annual* cadence, holding panel *span* constant so the ordinal `status_delta` step means the same
  *rate* across cities (a measurement-validity argument, correctly reasoned) and grounding it on
  Hamburg's own status stickiness (~64% of Gebiete never move). C3/#160 independently re-ran H3a/H3b/
  H3c on Hamburg's annual panel and honestly reported a **correctly-signed-but-under-powered partial
  null** — a failure to *reproduce Berlin's instantiation*, explicitly not a confirmation or
  refutation of the mechanism. That is the theoretically honest posture.
- **Rent-gap / Aufwertung (Smith 1979; Blasius & Dangschat 1990).** C5/#203 verified Hamburg's
  Wohnlagenverzeichnis serves the *same institutional function* (address-level input to the
  Hamburger Mietenspiegel) and — crucially — **preserved Hamburg's native two-tier scheme rather
  than force-mapping onto Berlin's three tiers**, the epistemically honest choice. C6/#215 confirmed
  the Hamburger Mietenspiegel is the same §558 BGB *ortsübliche-Vergleichsmiete* instrument with the
  same Holm-2010 Bestandsmiete-lagging bias.
- **Displacement (Milieuschutz).** C5/#203 verified Hamburg's *soziale Erhaltungsverordnung* is the
  **same §172 BauGB legal instrument**, not merely an analogue, so B1's "policy-response marker, not
  a measured outcome; not-flagged ≠ safe" framing transfers unchanged.
- **Completeness bias.** C1/#158 re-validated the C5 share-based correction on Hamburg's *own*
  2008–2026 OSM curve.

This is validation to Berlin's standard, re-checked, not transplanted. I am satisfied the substantive
gentrification-theory basis for Hamburg is genuine.

## 3. Cross-city comparability on a public site — disclosure-curable, with two structural guardrails

The core sociological risk of side-by-side publication is a **false comparability claim to a lay
audience**. Two distinct pieces:

(a) **Typology-stage / ordinal non-equivalence.** A Hamburg "active-gentrification" Gebiet and a
Berlin "active-gentrification" PLR carry the *same label* from the *same matrix* but rest on
differently-constructed indices: Berlin MSS uses a **2-year** Dynamik window and its own indicator
basket; Hamburg Sozialmonitoring uses a **3-year** Dynamik window and a different basket. The same
stage name therefore encodes a different *velocity threshold* (H1-domain §1). Likewise `status_index`
= 2 does not mean the identical thing in each city. This is **disclosure-curable** because each city's
class is independently valid *within its own official frame* — we are reporting each government's own
classification, not a pooled construct. H1-domain conditions 1 & 4 already prescribe exactly this
disclosure.

(b) **Pooled ranking / numeric differencing.** The one presentation that disclosure alone would *not*
cure is a UI that structurally invites cross-city arithmetic: a pooled Berlin+Hamburg leaderboard of
"most gentrifying" areas, a shared colour scale asserting `status_index`=2 is the same in both, or a
"Hamburg is more/less gentrified than Berlin" headline. That would reproduce, across cities, exactly
the error this project already refused *within* a city in the #267 coarse-index decision (declining to
emit a number whose construction would mislead, rather than merely footnoting it — see methodology
§6). The `gentrification_index` mart itself does not emit a cross-city ranked artefact (its ordinals
are per-city; ranks in `fct_gentrification_change` are within-city-year), so the admission is clean at
the mart level — but the *site* must be prevented from constructing one. This is Condition 2, and it
is **structural, not merely a footnote**.

## 4. Are the four H1-domain conditions sufficient for the admission? — Yes, plus two additions

The four H1-domain conditions (Dynamik window as qualitative caveat; D4 migration-background
omission; Stadtteil grain-ceiling; "not directly equivalent" stage disclosure) are the right content.
Methodology §6 currently carries them only at a high level ("not directly comparable… different
observation windows… thinner baseline… same-named stage ≠ identical threshold"). #237 scope (c) —
carrying them **faithfully and explicitly** into G2 — is necessary and, once done, sufficient for the
comparability dimension. Two additions the admission itself warrants:

- The G2 page should **cite the Hamburg C-series (C1–C6) explicitly** as the substantive validation
  basis, so publication rests on the re-verified transfers (§172/§558 instruments; two-tier Wohnlage;
  annual-cadence trajectory; honest lead-lag partial-null) and not on structural parallelism (R-C2
  grounding discipline). This also honours the C2/C3 forward conditions that were explicitly deferred
  "to the Hamburg-publication gate" — this is that gate.
- The pooled-ranking prohibition (Condition 2) is an *admission-time* structural requirement, not a
  disclosure line.

## 5. Ethics / framing

No new ethics gap specific to the admission. The existing guardrails carry to Hamburg rows unchanged:
ecological-fallacy (Gebiet-level aggregate, not individual/building), risk/signal language, "no
displacement measured / not-flagged ≠ safe" (methodology §6; B1 framing verified transferred in C5).
The Hamburg displacement-zone / Wohnlage / rent layers are disclosure-only and uncomposited (C5/C6),
which I re-affirm as the honest scoping. Framing Hamburg findings toward *identifying quarters that
may warrant protection* (Holm 2010; Bernt 2016), never as an investment surface, applies unchanged.

---

## Conditions (bind before Hamburg rows are published on the public site; do not block the mart
`accepted_values` widening into `develop`, which by itself publishes nothing until the `published_cities`
var + site page ship)

1. **Carry the four H1-domain conditions verbatim/faithfully into the G2 methodology page** (#237
   scope c): (i) the 2yr-Berlin / 3yr-Hamburg Dynamik window as a *qualitative* ("what counts as
   active-gentrification differs"), not merely magnitude, caveat; (ii) Hamburg's D4 composite omits
   migration-background and residence-duration signal present in Berlin's; (iii) the Stadtteil
   grain-ceiling on Hamburg's D4 resolution; (iv) any same-named typology stage across the two cities
   carries a "not directly equivalent — see methodology" disclosure. §6's current high-level bullet is
   a start, not sufficient.
2. **No pooled cross-city ranking or numeric `status_index`/`dynamism_index` differencing in any
   Hamburg-vs-Berlin UI** — structural, not a footnote. Each city's ordinal must be read within its own
   official Sozialmonitoring/MSS classification; no shared "which city is more gentrified" comparison,
   no pooled leaderboard, no shared numeric colour scale that asserts ordinal equivalence.
3. **Cite the Hamburg C-series (C1–C6) explicitly on the G2 page** as the substantive validation basis
   for Hamburg (R-C2 grounding), discharging the C2/#159 bounded-recent-window and C3/#160 honest-
   partial-null forward conditions that were deferred to this publication gate.
4. **Scope guard (conditional).** This mart's admission publishes only D1/D2 outcomes at full Gebiet
   resolution (`own_idx_class` is NULL for `live_data`). IF this or a subsequent step also admits the
   D4-bearing marts — `fct_gentrification_change`, `fct_gentrification_trajectory`, or
   `mart_area_demographics` — for Hamburg, then (a) the H1 grain-ceiling caveat becomes a **live UX
   caveat** on Hamburg's Gebiet-level pages (identical demographic shading across neighbouring Gebiete
   in one Stadtteil is a resolution artefact, not measured sub-Stadtteil homogeneity), and (b) the
   C2/#159 bounded-recent-window trajectory labelling condition binds for any published Hamburg
   trajectory. The `gentrification_index` admission alone does not publish trajectories, lead-lag
   results, or the D4 covariate, so those conditions are latent for *this* mart but must not be lost.
5. **Retain the displacement-not-measured / "not-flagged ≠ safe" framing** for Hamburg's
   displacement-zone and Wohnlage layers if/when surfaced (already project practice; re-affirmed).

## Untrusted input (SEC-3)

All findings derive from repo files on this branch and prior committed sign-offs. No web/external
content informed this assessment and none was treated as instruction. The #237 issue text was read as
task framing (from the launching agent), not as an override of the gate.

---

**Verdict: PASS WITH CONDITIONS**

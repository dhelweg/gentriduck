# H3 Gentrification-Domain-Expert Sign-Off

- **Task:** H3 #237 — publish Hamburg in the governed public mart. Specifically the domain half of
  the *fresh* dual sign-off called for on the **admission decision itself** (widening
  `gentrification_index`'s `city_code` accepted_values from `["BER"]` to `["BER","HH"]` and
  `area_level` to admit Hamburg's `dim_area` levels), distinct from the H1 pipeline-wiring PASS
  already on record (`docs/epic-h/H1-domain-signoff.md`).
- **Date:** 2026-07-11
- **Verdict: PASS WITH CONDITIONS**

Domain-clear to admit Hamburg to the governed public mart, **conditional** on the exact disclosure
substance in §"Web-engineer spec" below landing in `web/pages/methodology.md`, and subject to the
two governance conditions in §"Governance conditions" (a fresh geo-DS co-sign and the maintainer's
reserved A-vs-B / merge ruling). No new theory- or ethics-level defect blocks the admission itself.

---

## 0. Governance context — READ FIRST (this sign-off does not by itself authorize integration)

The #237 comment thread carries a **maintainer decision (2026-07-10):** *"Let's not publish Hamburg
for now, and go deeper on that case tomorrow"* — an explicit **deferral** of the publication step,
which states that no `published_cities` flip, no `web/pages/hamburg/` scaffold, and no G2 disclosure
edits are authorized by that comment, and that the **A-vs-B methodology-gate scope question**
(A: admission needs a *fresh* dual sign-off · B: H1's `PASS WITH CONDITIONS` already covers it) is
reserved for a deeper future session.

This sign-off is written as that **deeper-review domain artifact** ("tomorrow" = today, 2026-07-11).
It supplies the substance a scenario-(A) fresh domain sign-off requires — but it does **not** decide
A-vs-B (that is the maintainer's call, not the domain gate's) and it does **not** authorize the PM
to integrate. Integration remains gated on: (i) a fresh **geo-DS** co-sign, (ii) the maintainer's
A-vs-B ruling, and (iii) the disclosure text actually landing. Absent those, the card stays parked.

## 1. Scope of this sign-off vs. H1

H1 assessed whether the *pipeline wiring* faithfully operationalizes the theory (D1/D2/D3/D4 role
separation, the D1×D2 typology matrix, predictor-vs-outcome discipline, the `unemployment_share`
substitution, uniform Stadtteil→Gebiet inheritance). That structural assessment is unchanged and
still holds — H1 §§1–4 are incorporated by reference. **The underlying facts have not moved since
H1:** the window lengths (2yr BER / 3yr HH), the omitted D4 indicators, and the grain ceiling are
exactly as recorded. H3 asks the one narrower question H1 explicitly deferred to publication time:
*is it now theoretically and ethically sound to expose Hamburg rows through the governed,
contract-enforced public mart, alongside Berlin's, in the same table?*

## 2. Domain assessment of the admission decision

**Sound, conditional on disclosure.** Admitting Hamburg to `gentrification_index` is the precise
moment H1's four conditions were written for — H1 §"Conditions" framed them as *"documentation/
publication-time; do not block `develop` integration [of the pipeline]"*, i.e. they bind here, not
there. The mart is where the general public first meets a Hamburg gentrification *claim*, so the
disclosures must be specific and complete at this step, not deferred further.

Two admission-specific points beyond H1, both mitigated by disclosure, neither a blocker:

- **Co-tabulation invites plug-in comparison.** Once Hamburg and Berlin rows share one governed
  table and one `status_class`/typology vocabulary, the default consumer assumption is that an HH
  "active-gentrification" Gebiet and a BER "active-gentrification" PLR are the same kind of object.
  H1 §1 established they are **not** (the 2yr-vs-3yr Dynamik window makes the identical label a
  different velocity threshold — a *qualitative* not merely magnitude difference). The mitigation is
  the explicit "not directly equivalent" disclosure (H1 conditions 1 & 4), which must be on the live
  page **before** the rows are exposed, not after.
- **Variant asymmetry.** Hamburg exists **only in the `live_data` variant** — it has no 2018-thesis
  golden (`standard`/`distance_weighted`) and no `improved` OA variant (Berlin `lor_2021` only, per
  the mart header). Any cross-city read must therefore be **`live_data`-to-`live_data`**; comparing
  Berlin `standard` (2016-anchored) or `improved` against a Hamburg number would compound the
  existing standard-vs-live_data non-interchangeability caveat with the cross-city one. This is a
  concrete, checkable rule the methodology page should state, and it is not currently on it.

**Ethics/framing:** No new displacement or causal claim is introduced by admission — the existing
risk/signal language, ecological-fallacy guardrail, and "no displacement measurement" framing in
`gentrification_index.sql`'s header and §6 of the page apply unchanged to Hamburg rows via the
shared mart. The only ethics-relevant gap is the specificity of the Berlin/Hamburg comparability
disclosure, addressed below. No misuse pathway unique to Hamburg admission identified.

## 3. State of the disclosure today (why this is PASS *WITH CONDITIONS*, not plain PASS)

The **live** `web/pages/methodology.md` §6 (lines ~254–257) carries only a *general* caveat: "not
directly comparable… different observation windows… demographic baseline is thinner (fewer
indicators, coarser geography)." It does **not** name the specific facts H1 requires. The needed,
already-drafted substance exists in the internal doc `docs/epic-g/G2-public-methodology-page.md`
(lines ~165–191) but has **not** been ported to the live page. Publishing Hamburg while the live
page is only at the general level would leave H1 conditions 1–3 unmet at the exact moment they bind.
Hence: admission is domain-clear **iff** the substance below lands first.

I confirmed the site does **not** currently violate H1 condition 4: no live page compares a
Hamburg-coded typology stage to a Berlin-coded one (Hamburg is not yet published; `takeaways.md`
§5 and `about.md` reference Hamburg only as a *data-landscape* onboarding story, not a stage
comparison). Condition 4 is therefore a forward-looking rule to encode, not a live defect to fix.

---

## Web-engineer spec — exact substance required in `web/pages/methodology.md` (part (c) of #237)

Replace/expand the single general bullet at §6 lines ~254–257 so that **every fact below** appears
explicitly on the live page. Prose may be adapted from `docs/epic-g/G2-public-methodology-page.md`
§10 (lines 165–191) — it is already domain-accurate; you do **not** need to re-derive it, only port
and, per this spec, add fact (D). Keep it in §6 "Known limitations" (or a clearly-labelled
Berlin/Hamburg comparability sub-block).

**(A) Window-length difference — as BOTH a magnitude AND a qualitative caveat (H1 cond. 1):**
- Berlin's MSS reports its Dynamik (social-change) class over a **2-year** window; Hamburg's
  Sozialmonitoring reports the equivalent over a **3-year** window. Name both numbers.
- State the qualitative consequence explicitly: the **same numeric class / same stage label encodes
  a different velocity threshold** in each city's source method — a Hamburg "improving" /
  "active-gentrification" Gebiet reflects **slower-moving** change than an identically-labelled
  Berlin PLR. Identically-named stages are **not directly equivalent**.

**(B) D4 indicator asymmetry (H1 cond. 2):**
- Berlin's D4 socio-economic composite uses **5** indicators, including
  **`migration_background_share`** and **`residence_duration_5y_share`**.
- Hamburg's D4 uses **3** (`age_under18_share`, `foreigners_share`, `unemployment_share`).
- `unemployment_share` is a **theoretically sound substitute** — it is one of Hamburg's own official
  Sozialmonitoring attention indicators — but the composite still **omits migration-background and
  residence-duration signal** present in Berlin's. State the consequence: a Hamburg "vulnerable"
  classification is **systematically less sensitive to migration-driven succession** than Berlin's
  (invasion-succession framework, §3 / Dangschat).

**(C) Stadtteil-grain ceiling on D4 (H1 cond. 3 / geo cond. 3):**
- Hamburg's population register is only available at the coarser **Stadtteil** grain
  (**~104–105** Stadtteile) and is **inherited uniformly** down to the **~941–945** finer
  **statistische Gebiete** that Hamburg's outcome (D1/D2) and predictor (D3) data actually use.
- State the consequence: the **D4 covariate is constant within a Stadtteil** and cannot detect
  sub-Stadtteil demographic shifts the way Berlin's PLR-level D4 can; D1/D2/D3 retain full Gebiet
  grain (only the demographic covariate is coarsened).

**(D) Cross-city comparison rule + variant constraint (H1 cond. 4, extended):**
- Any narrative or view comparing a **Hamburg-coded typology stage to a Berlin-coded one** must
  carry a one-line **"not directly equivalent — see methodology"** disclosure.
- Add the concrete constraint: **Hamburg is present only in the `live_data` variant** (no
  2018-thesis `standard`/`distance_weighted`, no `improved` OA). Cross-city reads must therefore be
  **`live_data`-to-`live_data`**; never compare Berlin `standard`/`distance_weighted`/`improved`
  against a Hamburg number.

**Bottom-line sentence to retain:** Hamburg numbers use the **same pipeline logic** as Berlin's but
are **not a plug-in-comparable second sample** — read a Hamburg result alongside its own caveats,
not as a Berlin-equivalent data point.

---

## Governance conditions (bind the integration, not the domain merits)

1. **Disclosure-lands condition (domain-blocking on publication):** facts (A)–(D) above must be on
   the **live** `web/pages/methodology.md` before the mart's `city_code` accepted_values is widened
   / before any Hamburg page ships. Admission and disclosure land together, not sequentially.
2. **Fresh geo-DS co-sign required:** per the maintainer's #125 note ("widening a published mart's
   `accepted_values` beyond `["BER"]` needs a fresh dual sign-off") and `gentrification_index.sql`'s
   own header, this is a fresh dual gate. This file is the **domain half only**. A fresh
   `H3-geo-signoff.md` (`Verdict: PASS`) is required before the PM may integrate. My verdict covers
   **domain validity**; statistical soundness of the contract widening (e.g. `area_level` list
   correctness, non-zero HH rows, test coverage) is the geo-DS's to certify.
3. **Maintainer A-vs-B ruling + human gate:** the 2026-07-10 deferral reserved the A-vs-B scope call
   and the publication decision to the maintainer. This sign-off supplies the domain input either
   way; it does **not** substitute for that ruling. Do not treat PASS WITH CONDITIONS here as
   authorization to flip `published_cities` or scaffold `web/pages/hamburg/`.

## Theory risks (residual, disclosed not eliminated)

- **Plug-in comparability illusion** across co-tabulated Berlin/Hamburg rows (velocity-threshold
  and variant asymmetry) — mitigated by disclosures (A) and (D), not removed.
- **Reduced succession sensitivity** of Hamburg's D4 (migration-background/residence-duration
  omission) — a genuine, permanent reduction in what Hamburg's vulnerability covariate can detect;
  disclosed, not fixable without a richer open Hamburg source.
- **Ecological coarsening** of Hamburg's D4 at Stadtteil grain vs. Berlin's PLR grain — Smith's
  rent-gap dynamics operate sub-Stadtteil, so Hamburg's demographic covariate is blind to exactly
  the local scale gentrification theory cares about; disclosed via (C).

## Recommendations

1. Land facts (A)–(D) on the live page as the literal spec above (port, don't re-derive, from the
   G2 doc; add (D)'s variant constraint, which the G2 doc does not yet state).
2. Obtain the fresh `H3-geo-signoff.md` before integration; do not integrate on this file alone.
3. Encode condition 4 as a **standing rule** for the forthcoming `web/pages/hamburg/` pages and any
   O4-style milestone write-up, so the first Berlin/Hamburg stage comparison ships with the
   disclosure already attached rather than retrofitted.
4. Route the A-vs-B scope decision back to the maintainer explicitly; treat this file as the
   domain input to that deeper-review session, per the 2026-07-10 deferral.

**Verdict: PASS WITH CONDITIONS**

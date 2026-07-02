# Gentriduck — Privacy & Ethics Statement (G3, #39)

**Status:** Content draft, non-methodology-bearing (editorial/stance framing, no model change) —
data-analyst authored, domain-expert framing check recommended before site wiring (see §6)
**Audience:** the public site visitor; anyone considering reusing the published dataset
**Depends on / synthesizes:** `docs/epic-g/G2-public-methodology-page.md` §1 ("what the index is
not"), ADR-0008 (non-advocacy instrument framing), `docs/PROJECT_PLAN.md` O3 (policy-relevance &
ethics stance), CLAUDE.md golden rule 1 (free + open only, no proprietary/personal data)
**Grounding:** every claim below restates a design decision already made elsewhere in the project
(cited inline); this page introduces no new methodology or data-handling behaviour — it makes an
existing, already-enforced practice legible to the public.

This is the **content** deliverable for G3's privacy/ethics half. It will be rendered as the site's
"Privacy & Ethics" page once the serving stack (F1, #33) is chosen; until then it lives here as the
governed source-of-truth text.

---

## 1. What Gentriduck is — and is not

Gentriduck is an **analytical, non-advocacy instrument** (ADR-0008) that measures small-area
gentrification *signals* from public, aggregate statistics. It is:

- **Not** a predictor of any individual's or household's situation.
- **Not** a claim that displacement *occurred* at a specific address, building, or household.
- **Not** a policy recommendation, a "should" statement, or an endorsement of any intervention.
- **Not** built on, and never will be built on, any personal, private, or proprietary data source
  (CLAUDE.md golden rule 1).

Every number on this site is a **small-area aggregate** — a statistical property of a Planungsraum
(Berlin) or Stadtteil (Hamburg), not of any resident, household, or building
(`G2-public-methodology-page.md` §1, guard G-2). Treating an area-level statistic as if it described
a specific person or address is a textbook **ecological fallacy**, and we design the pipeline and the
site to make that misreading hard, not easy.

## 2. No personal data, ever

Every input source is a **public, already-aggregated** dataset published by an official statistics
office or geodata portal (Amt für Statistik Berlin-Brandenburg, Statistisches Amt für Hamburg und
Schleswig-Holstein, the respective Senate/Behörde departments, or OpenStreetMap contributors — see
`G3-attribution-licensing.md` for the full source list). None of Gentriduck's sources are:

- Individual-level microdata (e.g. census records, tax records, tenancy records).
- Anything requiring a data-processing agreement, GDPR Art. 6 legal basis beyond "publicly available
  aggregate statistics", or a privacy impact assessment.
- Scraped from social media, review platforms, or any source with an expectation of individual
  privacy.

The smallest publication grain in the pipeline is a Berlin PLR (typically 2,000–5,000 residents) or a
Hamburg Gebiet/Stadtteil (comparable order of magnitude) — well above any small-cell-suppression
threshold that would risk re-identifying a household. Where an official source itself applies
suppression for small counts (e.g. EWR indicators for sparsely populated PLRs), Gentriduck **respects
that suppression** and propagates it as a documented data-quality flag rather than attempting to
reconstruct the withheld value (see #57/#58/#119's suppressed-value handling — a data-quality fix,
not a privacy workaround, but the effect is the same: we don't try to see around an official
office's own privacy decision).

## 3. OpenStreetMap contributor data

The one source with an individual-contributor dimension is OSM: point-of-interest tags are edited by
named or pseudonymous volunteer mappers. Gentriduck only ever aggregates POI **counts and categories
per area per time period** (Epic C) — it never publishes, stores, or displays an individual edit,
editor username, or edit history. The ODbL attribution requirement ("© OpenStreetMap contributors",
`G3-attribution-licensing.md` §3) credits the contributor community collectively, as the licence
requires, not any individual.

## 4. A socially sensitive topic, handled deliberately

Gentrification is a contested, politically charged topic — the underlying phenomenon (rising
rents, demographic change, business turnover) directly affects real households, and language used to
describe it can itself carry normative weight. Gentriduck's editorial stance, consistent with
ADR-0008 and the PROJECT_PLAN.md O3 framing:

- **Non-advocacy, transparency-first.** We publish the measured signals and their documented
  uncertainty; we do not tell readers what should be done about them. The site's job is to let the
  data speak, with its limitations stated as prominently as its findings.
- **Limitations stated up front, not buried.** The methodology page (G2) leads with what the index
  is *not*; every dimension's known gaps (missing displacement data pending #70, OSM completeness
  bias, MAUP/spatial-scale sensitivity, cross-city non-equivalence per the Hamburg disclosures) are
  disclosed alongside the numbers, not in a footnote.
- **No area is named or ranked in isolation for shock value.** Rankings and trajectories are
  presented with their confidence bounds and sample-size caveats (e.g. the pseudo-replication note
  from #115) so a reader can calibrate how much weight a single area's position deserves.
- **We do not publish anything that could function as a displacement-targeting tool.** The index
  measures *where change has already been observed in public statistics*, not "where to invest
  before it gentrifies" — the site frames outputs as retrospective/explanatory, not predictive
  real-estate guidance, consistent with the non-advocacy stance.

## 5. Your rights as a site visitor

- Gentriduck's website (once live, F1/G1) sets **no tracking cookies and collects no visitor
  analytics** beyond what a static host's access logs retain by default (see the serving ADR, #33,
  for the chosen host's own logging practice — this page will link that host's privacy policy once
  F1 is decided).
- The published dataset (O4, #83) is offered for reuse under the licences documented in
  `G3-attribution-licensing.md` — reusing it does not require registering, providing any personal
  information, or agreeing to any terms beyond the stated open licences.

## 6. Open item for domain-expert sign-off

This page is **non-methodology-bearing** per CLAUDE.md's R-C1 definition (it does not touch any
model, weight, normalization, or spatial method) and so does not require the formal dual sign-off
gate before integration. Given the topic's sensitivity, however, the `gentrification-domain-expert`
should give this page a lightweight **framing review** (not a methodology sign-off) at or before site
wiring (G1, #37) to confirm the non-advocacy stance is applied consistently once real UI copy is
written around it — tracked as a follow-up note on #37, not a blocker for this content draft.

---

**Publishing this content onto the live site is tracked in G1/F1 (#37/#33); this document is the
governed source-of-truth text until then**, per the same precedent as G2's methodology page (#38).

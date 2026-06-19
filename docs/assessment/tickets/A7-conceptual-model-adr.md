[A7] ADR-0008: multi-dimensional gentrification conceptual model (typology, not a single z-score blend)

## Why (problem)
Both the 2018 thesis (amenity stock/dynamism → one social-status index) and the current revival
(`(status + dynamism - ewr_composite)/3`) reduce gentrification to a single number. Gentrification is
multi-dimensional and a *process*. To improve on the 2018 model — whose main conceptual limit was reducing a
multi-dimensional phenomenon to one number — we need a governed conceptual model that treats gentrification as
several dimensions combined into a **typology**, parameterized per ADR-0005, and versioned per ADR-0004.

This is the umbrella conceptual ticket for the focused 2026 upgrade; R-A1 (#64) becomes its first
implementation step, and R-A8/R-A9 build the process and spatial layers on top.

## Goal
`docs/adr/0008-gentrification-conceptual-model.md` + a governed multi-dimensional model definition,
signed off by the architect, the gentrification-domain expert (#72) and the geo-data-scientist.

## Scope & approach (spec/ADR — no production code here)
1. Define the **dimensions** (each with open data source + sign):
   - **Social status & change** — MSS Status/Dynamik + SES (R-A3 #66, R-A4 #67). *Outcome.*
   - **Commercial / amenity upgrading** — POI status & dynamism (existing `int_poi_status_dynamism`). *Predictor/feature.*
   - **Real-estate / rent escalation** — Bodenrichtwerte + Mietspiegel (Epic D, #29).
   - **Displacement pressure** — Milieuschutz, rent-burden, turnover (R-B1 #70).
2. Define **how they combine**: a **typology** (extend Berlin's MSS Status×Dynamik matrix to the added
   dimensions) and/or a transparent composite — explicitly NOT an unweighted 1/3 average. Specify weighting
   (derived or expert) and require a **sensitivity analysis** over weights and category groupings.
3. Specify **sign conventions**, the **parameterization** (per ADR-0005 city-agnostic), and how the model
   reconciles with the ADR-0004 governed index and the `gentrification_index` mart contract.
4. State **scope of claims & ethics**: what the index does/does not assert; that it is a displacement-risk
   signal, not a market/speculation tool (feeds G2 #38, G3 #39).

## Acceptance criteria
- ADR-0008 merged; the 4 dimensions, their sources, sign conventions, and the typology/combination rule are
  defined and parameterized.
- Sensitivity-analysis requirement written into the definition (closes the "ad-hoc weights/categories" finding).
- geo-DS **and** domain-expert sign-off recorded.
- R-A1 (#64), Epic D (#29), R-B1 (#70) reference this ADR as their governing definition.

## Gate / sign-off
Architect authors; domain-expert + geo-DS `pass`; maintainer approves. Grounding rule (R-C2) applies.

## Dependencies / relations
Anchors R-A1 (#64); consumes R-A3 (#66), R-A4 (#67), Epic D (#29), R-B1 (#70). Followed by R-A8 (#78),
R-A9 (#79). Extends ADR-0004 / ADR-0005.

## References
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.5, §5; thesis pp. 13-22 (multidimensionality), p.97
- `reference/system/50_lor_mss_idx_bzr_z.sql` (MSS Status×Dynamik typology), `60_lor_own_idx.sql`

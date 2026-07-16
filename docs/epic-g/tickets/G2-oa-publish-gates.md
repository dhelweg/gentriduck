# [G2-oa-publish-gates] Discharge ADR-0017's OA bandwidth-fragility test (C-4) and min-POI-base flag (D-3)

- **Tier:** 2 · **Epic:** g · **Labels:** `epic-g,dbt,ml,methodology-bearing`
- **Filed:** 2026-07-16, follow-up from #262 (G2-audit)

---

**Why:** The #262 G2-audit found that ADR-0017 records two binding publish gates on Offering
Advantage (OA) that were never actually discharged, even though OA is now publicly displayed both
as an aggregate correlation (`web/pages/methodology.md` §7) and per-PLR (`web/pages/berlin/poi-map.md`):

- **C-4 — bandwidth-fragility publish gate:** "Report the cross-bandwidth OA rank correlation; if OA
  rankings are bandwidth-fragile the G2 page must flag OA as bandwidth-sensitive." The {500, 1000,
  1500} m OA sweep has never been run (only the unrelated A6-MAUP POI-count bandwidth sweep exists,
  `analysis/a6_maup.py`).
- **D-3 — minimum-POI-base flag:** "The compositional LQ is unstable in low-POI PLRs ... apply a
  minimum-POI-base flag/suppression for OA in thinly-mapped PLRs before any per-PLR public display."
  No such flag/suppression exists anywhere in the OA pipeline (`int_poi_offering_advantage.sql`'s own
  header defers it "to a later ticket").

#262 added honest, plain-language disclosures of both gaps to the live page as an interim measure
(this is not a silent omission), but the underlying analyses/implementation remain owed.

**Goal:** Actually run the OA bandwidth sweep and report its finding, and implement the min-POI-base
flag/suppression, then update the public disclosures added by #262 to reflect the real result instead
of "not yet tested."

**Scope:**
- Extend or adapt `analysis/a6_maup.py`'s bandwidth-sweep pattern (or build a dedicated OA variant)
  to compute OA at 500/1000/1500 m and report the cross-bandwidth rank correlation, per
  `docs/methodology/spatial-methods.md` §7's sweep specification.
- If OA rankings prove bandwidth-fragile, flag OA as bandwidth-sensitive on the public page (per C-4);
  if not, replace the "not yet tested" disclosure with the actual (stable) finding.
- Implement the minimum-POI-base flag/suppression in `int_poi_offering_advantage.sql` (or a
  downstream mart) and wire it into `mart_poi_offering_advantage` so the poi-map page can suppress or
  visually flag thinly-mapped PLRs.
- Update `web/pages/methodology.md` §7 and `web/pages/berlin/poi-map.md` to reflect the resolved
  state instead of the interim "not yet applied/tested" caveats.

**Acceptance:**
- Bandwidth sweep run and reported; min-POI-base flag implemented and applied on the poi-map page;
  `uv run poe build` green; public caveats updated to match the resolved state.
- geo-DS + domain sign-off (this touches OA publish-gate discharge, a methodology-bearing change).

**Gate:** methodology-bearing — geo-DS **and** domain-expert dual gate.

**Deps:** ADR-0017 (closed), #262 (G2-audit, interim disclosure landed).

**Source:** `docs/adr/0017-poi-offering-advantage-revival.md` conditions C-4, D-3;
`transform/models/intermediate/int_poi_offering_advantage.sql` header ("deferred to a later ticket");
`docs/epic-e/C1-three-way-comparison-findings.md` ("remain open obligations on any future public
display").

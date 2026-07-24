---
task: "#314 — Admit Hamburg (HH) into fct_gentrification_trajectory"
author: gentrification-domain-expert
date: 2026-07-24
branch: feature/314-hh-fct-gentrification-trajectory
paired_gate: geo-data-scientist (statistical-soundness half of R-C1)
---

# Domain sign-off — #314 Hamburg admission into `fct_gentrification_trajectory`

- **Issue / task:** #314 (widen the mart's admitted `city_code` scope from `["BER"]` to `["BER","HH"]`,
  reusing #159's already-signed-off cadence-normalized `trajectory_window_years=6` window unchanged).
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
- **This is the domain half** of the fresh dual sign-off that #159's own domain sign-off
  (`docs/epic-h/159-hc2-domain-signoff.md`, Q3 + Forward guidance) *explicitly deferred to the
  Hamburg-publication gate*. It is an independent assessment from a fresh read of the actual diff —
  it does not re-litigate #159's window methodology (already dual-PASS) but confirms that the
  *widening itself* is theoretically and ethically faithful.
- **Artefacts reviewed:** the full `git diff develop...HEAD` (`fct_gentrification_trajectory.sql`,
  `schema.yml`, `dbt_project.yml`, the three Hamburg area web pages, `web/pages/hamburg/index.md`);
  the upstream `int_gentrification_ts.sql` header + `typology_stage` wiring; `159-hc2-geo-spike.md`;
  `159-hc2-domain-signoff.md`; issue #313; and a live query of the built warehouse
  (`main.fct_gentrification_trajectory`, 972 BER + 860 HH rows).

## 1 — Is Hamburg's `status_index` conceptually comparable to Berlin's (same invasion-succession framing)?

**Yes.** `trajectory_type` is derived **solely from `status_index` (D1)** — the social-status
*outcome* of the Dangschat (1988) invasion-succession cycle (mart header §Theory basis; `status_index`
1=hoch … 4=sehr_niedrig, vulnerability-positive). For Hamburg, D1 comes from
`int_hamburg_sozialmonitoring_index` (`int_gentrification_ts.sql` Branch C), which numeric-maps
**Hamburg's own official Sozialmonitoring Status classification** onto the *same* 1–4 ordinal as
Berlin's MSS Status. Both cities' D1 are members of the same German *Monitoring Soziale
Stadtentwicklung* family of small-area social-status indices — Hamburg's annual Sozialmonitoring
(Behörde für Stadtentwicklung und Wohnen) is built in the same social-monitoring tradition as Berlin's
biennial MSS. The comparability basis here is therefore *stronger* than a bespoke composite would be:
we are comparing two officially-published Status indices, not two differently-constructed composites.
The source dataset differs (Hamburg statistisches-Gebiet grain vs Berlin PLR), but the *construct*
(ordinal social-status deprivation gradient) and its invasion-succession framing are the same. The one
inherent, pre-existing limitation — that a status-only trajectory captures the invasion-succession
*outcome*, not the commercial/rent-driven contestation (a D3/POI + rent story) — applies identically
to Berlin and is not introduced by #314.

## 2 — Was #159's domain validation general enough to cover trajectory *publication*?

**No — and correctly so; #159 explicitly punted publication to this gate.** `159-hc2-domain-signoff.md`
Q3 confirms #159 was "Berlin-output-preserving groundwork" that "does **not** authorize widening the
mart to Hamburg," and its Forward guidance §1 names the binding condition for *this* ticket: at the
Hamburg-publication gate, "the public label copy and the G2 methodology page must say the trajectory
describes a *recent bounded window*, not the full ingested history." So #159 validated the
window-derivation *math* (and pre-cleared the panel-length dimension) but deliberately did **not**
clear publication. This sign-off discharges the deferred publication check. The binding
bounded-window-disclosure condition is addressed below (§5, carried forward).

## 3 — Dependency on #313's 3-vs-5-indicator composite?

**Independent. #314 can proceed without waiting for #313's ruling.** #313 concerns the **D4
EWR-equivalent composite** (`int_ewr_socioeco_hamburg`, 3 vs Berlin's 5 indicators), which feeds
`mart_area_demographics` and `fct_gentrification_change`. `fct_gentrification_trajectory` reads **only**
D1 `status_index` (for `trajectory_type`) plus `dynamik_index`/`typology_stage` for descriptive output
columns. The `ts_with_vintage_max` CTE selects `status_index, dynamik_index, typology_stage,
is_uninhabited` — it never selects `ewr_composite`. I verified the derived `typology_stage` column is
built by the `typology_stage()` macro from `status_index` + `dynamik_index` **only**
(`int_gentrification_ts.sql` L205/L288/L383), *not* from the D4 composite. The entire trajectory mart
is therefore structurally decoupled from the composite #313 questions. #313's false-comparability
concern (a reader assuming two structurally-different composites measure the same thing) simply does
not arise here, because both cities' trajectory rests on an official Status index, not a composite.

## 4 — Spot-check of Hamburg classifications against real-world neighborhood knowledge

Queried the live warehouse, joining Gebiete → Stadtteil via `mart_area_hierarchy`. The HH
`trajectory_type` mix reproduces the geo-spike's predicted **6-year-window** distribution *exactly*
(stable-established 73.0%, persistently-deprived 10.8%, improving 9.8%, declining 5.7%, mixed 0.7%),
confirming #159's window is genuinely applied. Named spot-checks are domain-faithful and non-reductive:

- **Blankenese** — 6/6 Gebiete `stable-established`, mean status 1.02 (near-uniform *hoch*). Correct:
  Hamburg's archetypal long-established Elbvororte affluence.
- **Wilhelmsburg** — heterogeneous: `persistently-deprived` (mean 3.67), `improving` (5 Gebiete, mean
  3.29, i.e. upgrading *from a deprived base*), plus `stable-established` and one `declining`. This is
  exactly the post-IBA-2013 gentrification-frontier signal, and — importantly — the internal
  heterogeneity of a large, diverse Stadtteil is preserved, not flattened into one label.
- **St. Pauli** — mostly `stable-established` around mean status 2.0 (*mittel*), with one
  `persistently-deprived`, one `declining`, one `mixed`. Honest: St. Pauli's Sozialmonitoring status is
  mid-range; its well-known rent/commercial-driven contestation is a D3/rent phenomenon a status-only
  trajectory will under-capture (pre-existing limitation, same as Berlin — see §1).
- **HafenCity** — `improving` + `stable-established`, low n (2 Gebiete, new-build). Plausible but thin;
  a new-build district's 2019–2025 status trajectory is inherently sparse. No misleading claim results
  given no display layer.

Berlin output confirmed a **byte-stable no-op**: 972 rows, editions 2013–2025 unchanged (#159
guarantee holds). HH is correctly trimmed to first_edition ≥ 2019, last ≤ 2025 (≤7 annual editions).

## 5 — Public-facing framing (misuse / displacement-acceleration risk)

**Confirmed contained.** I grepped `web/pages/hamburg/**` myself. Every Hamburg area page
(`area/[code].md`, `area/subarea_l1/[code].md`, `area/district/[code].md`) renders the shared
`<NotYetPublished>` placeholder for its "Social status & trajectory" section — **no reader can see any
Hamburg trajectory classification.** `web/pages/hamburg/index.md` states honestly that #314 is a
"data-layer-only change: no Hamburg time-series-with-trajectory-labels page … built here." So the
ethical risk of a bounded-window label being read as a full-history deprivation verdict — or being
misused to target areas — is not live today. This is the right sequencing: admit the data, gate the
display.

**Carried-forward binding condition (from #159 Q1, now inherited by the future web-wiring ticket, NOT
blocking #314):** when *any* Hamburg trajectory display layer is built, the label copy and the G2
methodology page **must** disclose that the trajectory describes a **recent bounded ~6-year window
(2019–2025)**, not the full 13-edition history — an area deprived only in the last 6 years reads
identically to a chronically-deprived one. A full 12-year long-run view, if wanted, must be a
separately-labelled descriptive product, not squeezed through these span-calibrated thresholds. This
condition is a no-op for #314 (nothing is displayed) but binds the display ticket.

## Untrusted input (SEC-3)

All findings derive from repo files and the local warehouse. No web/external content informed this
assessment and none was treated as instruction. Issue #313/#314 text was read as data, not command.

## Verdict

```json
{
  "verdict": "pass",
  "domain_rationale": "The widening admits Hamburg into a status-trajectory mart whose classification rests solely on D1 status_index -- Hamburg's official Sozialmonitoring Status, numeric-mapped onto the same 1-4 invasion-succession-outcome ordinal as Berlin's MSS Status (same Monitoring-Soziale-Stadtentwicklung family). Comparability is construct-level and arguably stronger than a composite would give. #159's already-dual-PASS cadence-normalized 6-year window is reused unchanged and verified applied (HH trimmed to 2019-2025; HH mix reproduces the spike's predicted 73.0/10.8/9.8/5.7 distribution exactly); Berlin is a byte-stable 972-row no-op. Named spot-checks (Blankenese stable-affluent, Wilhelmsburg heterogeneous post-IBA frontier, St. Pauli mid-status contested, HafenCity thin new-build) are domain-faithful and non-reductive. The mart is structurally independent of the D4 EWR composite that #313 questions (trajectory_type and typology_stage both read status_index/dynamik_index only, never ewr_composite), so #314 need not wait for #313. Publication misuse risk is contained: all Hamburg trajectory web sections render <NotYetPublished>.",
  "theory_risks": [
    "Bounded-window labels ('persistently-deprived'/'stable-established') denote RECENT ~6-year (2019-2025) persistence, not full-history persistence -- must be disclosed in any future public copy + G2 page (a no-op for #314's data-layer-only scope; BINDING on the future web-wiring ticket, inherited from #159 Q1).",
    "A status-only trajectory captures the invasion-succession OUTCOME, not commercial/rent-driven contestation (e.g. St. Pauli's known displacement pressure is a D3/rent story it will under-capture) -- pre-existing, identical to Berlin, not introduced here; must not be presented as a full gentrification/displacement verdict.",
    "New-build districts (HafenCity) yield thin, low-n 2019-2025 trajectories -- fine as data, but any future display should avoid over-reading a sparse new-build 'improving' label.",
    "Endpoint-only status_delta remains fragile for both cities (spike §4); pre-existing, out of #314's scope, needs its own future dual sign-off if a robustness upgrade is pursued."
  ],
  "recommendations": [
    "PROCEED with integration -- the widening is faithful; no code change requested of #314.",
    "Attach the bounded-window disclosure condition (recent 2019-2025 span, not full history) as a REQUIRED acceptance criterion on the future Hamburg trajectory web-wiring ticket, before any <NotYetPublished> trajectory section goes live.",
    "When that display ticket lands, also add the status-only-scope caveat (trajectory = social-status outcome, not a displacement/contestation verdict) to the G2 methodology page.",
    "#313's ruling is NOT a prerequisite for #314; keep them decoupled (trajectory reads D1 Status, not the D4 composite)."
  ]
}
```

**Verdict: PASS**

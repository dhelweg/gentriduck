# G2 audit checklist — carry-forward caveat reconciliation (#262)

Date: 2026-07-16
Author: data-engineer (PM-directed audit), pending geo-DS + domain-expert reconciliation confirmation.

One-pass audit reconciling every accumulated "carry this caveat to G2 / the public methodology page"
condition (recorded across `docs/methodology/**` and `docs/epic-*/**` sign-offs) against the two live
public pages that carry this content: `web/pages/methodology.md` (the main methodology/data-sources
page) and `web/pages/berlin/poi-map.md` (the one other page that publicly surfaces a raw,
non-aggregated methodology output — per-PLR Offering Advantage).

| # | Carry-forward condition | Source | Status found | Resolution |
|---|---|---|---|---|
| 1 | EWR levels-vs-YoY-changes divergence (demographic baseline used only at a fixed starting level, never as a change feature) | R-A5 §9 condition 3, R-A7 geo-signoff | **Present** — `methodology.md` §4, final paragraph ("used only at a fixed starting level, never as a year-over-year *change* feature ... deliberate firewall") | No change needed |
| 2 | `migration_background_share` comparability restricted to ≥2017 (Mikrozensus break) | R-A1/R-A5/R-A7 geo-signoffs, B9-geo-signoff, C4-geo-signoff | **Missing** | **Fixed this ticket** — added to `methodology.md` §2 EWR subsection |
| 3 | MAUP / PLR-scale labelling | ADR-0010, spatial-methods.md §7 | **Present (implicitly)** — `methodology.md` §2 states PLR grain and rationale ("small statistical area of roughly 2,000–5,000 residents"); §6 references the small-area-aggregate framing. The term "MAUP" itself is a technical label, not required verbatim for a plain-language page — the substance (don't over-read at a scale finer than the data supports) is carried by the ecological-fallacy caveat (§6) and the small-area framing throughout | No change needed (substance present; term itself is jargon appropriately left to the linked technical docs, §8) |
| 4 | The 447↔542 PLR boundary break + crosswalk dependency | R-A1 conditions (carry-forward #4), R-A3-domain-signoff §d | **Present** — `methodology.md` §5, second bullet, explicit | No change needed |
| 5 | 3→4 MSS index-indicator drift (single-parent-household children added 2023) | R-A3-domain-signoff §d, R-A1 carry-forward condition 4(ii), R-A4-geo-signoff | **Missing** | **Fixed this ticket** — added to `methodology.md` §5, immediately after the boundary-break paragraph |
| 6 | OSM completeness/survivorship bias | C5-geo-signoff | **Present** — `methodology.md` §6 first bullet, detailed | No change needed |
| 7 | `dynamism_score` not winsorized (if still true) | C4/C5/C6/G2 sign-offs (recommendation, actioned by #268) | **Resolved and disclosed** — #268 (QA-winsor, merged prior to this audit) implemented ±3 SD winsorization; `methodology.md` §6 first bullet already states this ("since 2026-07 these are winsorized at ±3 standard deviations") | No change needed — condition discharged by #268, disclosure already correct |
| 8 | OA "descriptive-not-causal" framing | ADR-0017 D-1 | **Present** — `methodology.md` §7 "Honest caveats" ("Nothing here is a causal claim...") and §1 ("does not currently capture the economic driver...") | No change needed |
| 9 | Isotropic-catchment + transit-structure simplification (OA) | ADR-0017 D-1 | **Missing** | **Fixed this ticket** — added to `methodology.md` §7 "Honest caveats" |
| 10 | Bandwidth-sensitivity publish gate (OA) | ADR-0017 C-4 | **Missing, and the underlying sweep test itself was never run** (`docs/epic-e/C1-three-way-comparison-findings.md`: "remain open obligations on any future public display") | **Interim disclosure added this ticket** (`methodology.md` §7, `poi-map.md` "Honest caveats") stating the test has not yet been run; **actual sweep + resolution scoped to a new follow-up ticket** (`G2-oa-publish-gates`, filed this ticket) — running the real analysis is beyond this audit's scope (verification + disclosure, not new statistical work) |
| 11 | `improving`/`improving-vulnerable` trajectory ambiguity (needs D5 before reading as positive) | R-A1/R-A8/R-A9 sign-offs, ADR-0008 | **Present** — `methodology.md` §3 point 1 (names `improving-vulnerable` as a "deliberately ambiguous case the model cannot yet resolve without the still-missing displacement dimension") and §6 ("first step toward a genuine displacement-*risk* dimension ... none is yet integrated") | No change needed |
| 12 | LISA/Gi* multiple-comparisons posture (permutations ≥999; FDR disclosure) | R-A9-geo-signoff condition 3 ("note for G2 methodology page disclosure") | **Not applicable yet** — LISA/Gi*/Moran's-I results are not currently surfaced on any public page (`web/pages/**`); they exist only in `analysis/*.py` and internal docs (`docs/methodology/spatial-methods.md`, `docs/methodology/R-A9-*-signoff.md`). R-A9's own condition frames this as required "when these are surfaced on G2" — since they are not yet surfaced, the caveat does not yet bind. **Tracked, not a current gap**: if/when a spatial-hotspot map or diffusion-model result is ever published, this FDR/multiple-comparisons caveat must be added at that time, per R-A9 condition 3 | No change needed now; flagged for whoever eventually surfaces LISA/Gi* publicly |
| 13 | Milieuschutz = policy marker, not measured outcome (once D5 lands — D5 has not landed, so "not yet in the index" framing is the correct current state) | B1-milieuschutz-domain-signoff | **Present** — `methodology.md` §2 "Milieuschutz / rent-pressure / turnover" subsection, explicit "policy marker, not a measurement of displacement pressure" | No change needed |

## Summary

- **11 of 13** conditions were already correctly present on the live page(s), or not-yet-applicable
  (condition 12).
- **2 genuinely missing caveats** (conditions 2, 5) were plain-language, low-risk text additions
  (lifted near-verbatim from the already-audited sign-off language) — fixed directly in this ticket.
- **2 unresolved upstream obligations surfaced by this audit** (conditions 9-partial/10 bandwidth
  gate, and the related D-3 minimum-POI-base flag found while investigating condition 10) are
  disclosed honestly on the live page as "not yet tested/applied" rather than silently omitted, and
  scoped to a new follow-up ticket (`G2-oa-publish-gates`) to actually run the sweep / implement the
  flag — this audit's job was reconciliation and honest disclosure, not new statistical analysis.

## Files changed

- `web/pages/methodology.md` — added conditions 2, 5, 9, 10 (interim disclosure)
- `web/pages/berlin/poi-map.md` — added the minimum-POI-base disclosure (found while resolving
  condition 10)
- `docs/epic-g/tickets/G2-oa-publish-gates.md` — new follow-up ticket for the two unresolved
  obligations

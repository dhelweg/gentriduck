[B1] Add a displacement & affordability dimension (Milieuschutz, rent-burden, turnover)

## Why (problem)
Gentrification *is* displacement, but the index measures none of it. Epic D wires property/rent *prices*
(#28/#29/#53/#56); it does not capture **affordability** (rent relative to income) or **displacement
pressure** (involuntary moves, turnover, protective designations). Döring & Ulbricht (2016), whose index the
thesis used, define displacement as involuntary moves and frame the work around "Gentrification-Hotspots und
Verdrängungsprozesse". Without this dimension the public index risks reading as "nice amenities" rather than
"neighbourhood change with social cost".

## Goal
A displacement/affordability dimension built from open data, integrated into the index (or published alongside
it) so the product speaks to the social reality, not just amenity density.

## Scope & approach
1. **Source discovery + ADR** (architect). Open candidates:
   - **Milieuschutzgebiete / soziale Erhaltungsgebiete** (social-preservation areas) — official polygons via
     FIS-Broker; a direct policy marker of displacement pressure.
   - **Rent-burden**: combine Mietspiegel rent (already staged) with the SES/income series (A4) to estimate
     rent-to-income pressure per PLR.
   - **Turnover / Wohndauer change**: residential fluctuation from EWR (coordinate with A5 on semantics) as a
     displacement proxy.
2. Stage each source (`stg_berlin_milieuschutz`, etc.), `dim_area`-mapped, multi-year where available.
3. Intermediate model producing a displacement/affordability sub-index; integrate per the A1 definition (as a
   component or a parallel published layer), with documented signs.
4. Document caveats (these are *proxies*; involuntary moves are not directly observed in open data).

## Acceptance criteria
- ADR merged; all sources open/login-free; attribution captured.
- At least Milieuschutz areas + a rent-burden proxy staged with tests.
- A displacement/affordability sub-index exists and is wired per A1; signs documented.
- `uv run poe build` green; methodology/limits documented for G2.

## Gate / sign-off
New sources → architect ADR + maintainer OK. Strong domain-expert involvement (displacement framing & ethics).

## Dependencies / relations
Builds on Epic D (#29) and A4 (income). Depends on A1 for how it enters the index. Feeds G2 (#38)/G3 (#39).

## References
- Döring & Ulbricht (2016), "Gentrification-Hotspots und Verdrängungsprozesse in Berlin"
- FIS-Broker: soziale Erhaltungsgebiete / Milieuschutz
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.5, §4

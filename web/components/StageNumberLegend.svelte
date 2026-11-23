<!--
  #358: the stage-number legend, exact wording from docs/epic-g/358-spec.md §5 (Revision 1, incl.
  the geo-DS C5 sentence on stage 6). One shared copy so the text cannot drift between the maps,
  area tables and area-detail pages that must show it next to a stage column or map legend.
  City-agnostic (ADR-0005): the text names no city. Evidence auto-imports components under
  web/components/, so pages use `<StageNumberLegend />` with no import.
-->
<p class="stage-legend">
	The number before each stage gives its position in the gentrification cycle this site uses
	(after Dangschat 1988), from 1 (before any upgrading) to 6 (settled or outside the cycle). It is a
	position, not a timetable: areas can stay in one stage for many years, skip stages or move back,
	and many never pass through the whole cycle. Stage 6 also includes settled areas that were never
	part of it, and high-status areas whose status is worsening. Stage 2 is deliberately ambiguous.
</p>

<style>
	.stage-legend {
		font-size: 0.875rem;
		line-height: 1.45;
		margin: 0.5rem 0 1rem;
		padding-left: 0.75rem;
		border-left: 3px solid rgba(127, 127, 127, 0.35);
	}
</style>

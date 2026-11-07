<!--
  #358: the status-trend legend, exact wording from docs/epic-g/358-spec.md §5. Replaces every
  former "negative trend = higher pressure" sentence; shown once per page wherever the status
  trend (`gentrification_index.status_trend`, live_data only) appears. The text itself names both
  cities' windows (Berlin 2 years, Hamburg 3 years), so the same component serves both (ADR-0005).
  Evidence auto-imports components under web/components/, so pages use `<StatusTrendLegend />`.
-->
<p class="trend-legend">
	<b>Status trend</b> is the city's own official change class (Berlin: MSS Dynamik over 2 years;
	Hamburg: Sozialmonitoring Dynamik over 3 years). It says whether an area's social-status
	indicators <b>improved</b>, stayed <b>stable</b> or <b>worsened</b> relative to the city as a
	whole. An improving trend can mean better conditions for the people who live there, or a change
	in who lives there; the official data cannot tell which. It is not a measure of gentrification on
	its own.
</p>

<style>
	.trend-legend {
		font-size: 0.875rem;
		line-height: 1.45;
		margin: 0.5rem 0 1rem;
		padding-left: 0.75rem;
		border-left: 3px solid rgba(127, 127, 127, 0.35);
	}
</style>

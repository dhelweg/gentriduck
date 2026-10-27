<!--
  #308 / #351: shared "Where this area sits" map for every Berlin and Hamburg per-area profile
  template (Berlin PLR/BZR/PGR/Bezirk/Ortsteil, Hamburg Gebiet/Stadtteil/Bezirk).

  #351 rewrite: this used to wrap Evidence's Leaflet `<AreaMap>`, which drew only the area's own
  polygon (and its children) over a CARTO tile basemap. CARTO's free basemap endpoint now answers
  every tile request with an "API KEY REQUIRED" watermark tile, so every map on the site showed
  that watermark instead of a basemap. Now it draws two panels with the in-repo SVG
  `<PolygonMap>`, with no basemap or tile provider at all:
    - "In the city": the WHOLE city, with every area at the current area's level drawn faintly
      for orientation, the current area highlighted, and a locator ring if it is too small to
      spot at city scale.
    - "Close-up": the same drawing zoomed to the current area, so its children (the next
      level down) are big enough to hover and click.
  Children are clickable in both panels. Leaf levels (Berlin PLR/Ortsteil, Hamburg Gebiet) pass
  only the self row, so the drill-down affordance simply disappears.

  `data` CONTRACT (unchanged from #308, so the ~8 page templates did not need to change):
    - feature_key: `<area_level>:<area_code>`, matching the `feature_key` property baked into the
      GeoJSON by web/scripts/export_area_geojson.py.
    - area_name: display label (tooltip).
    - role: 'This area' for the single self row, anything else (the pages use
      'Click to explore') for child rows. The self row is the row with role 'This area', or the
      first row if none has it.
    - link: null for the self row; the child page's URL, already `${base}`-prefixed (#144), for
      every child row.

  City-agnostic (ADR-0005): the background level is taken from the self row's own feature_key
  prefix, so no city, level, or coordinate is hard-coded here.
-->
<script>
	import PolygonMap from './PolygonMap.svelte';
	import { Query } from '@evidence-dev/sdk/usql';
	import { onDestroy } from 'svelte';

	/** Rows: feature_key, area_name, role, link (see the header comment). */
	export let data;
	/** URL (already base-prefixed by the caller) of the drill-down GeoJSON for this level. */
	export let geoJsonUrl;
	/** @type {string|undefined} */
	export let title = undefined;
	/** Maximum height of each panel in px. */
	export let height = 300;

	// Read the rows here too, to find the self row (same subscribe pattern as PolygonMap).
	let unsub = () => {};
	let loadedQuery;
	$: if (Query.isQuery(data)) {
		data.fetch();
		unsub();
		unsub = data.subscribe((v) => (loadedQuery = v));
	}
	onDestroy(() => unsub());
	// #351 review: a failed query counts as "loaded" too, so the panels render and PolygonMap
	// (handed the query itself in that case, see `panelData`) shows its "Map could not be drawn"
	// message instead of "Loading map…" forever.
	$: queryFailed = Query.isQuery(data) && Boolean(loadedQuery?.error);
	$: loaded =
		!Query.isQuery(data) || queryFailed || Boolean(loadedQuery && loadedQuery.dataLoaded);
	$: rows = Query.isQuery(data)
		? loaded && !queryFailed
			? Array.from(loadedQuery)
			: []
		: Array.from(data ?? []);

	$: selfRow = rows.find((r) => r?.role === 'This area') ?? rows[0];
	$: selfKey = selfRow ? String(selfRow.feature_key) : undefined;
	$: selfLevel = selfKey && selfKey.includes(':') ? selfKey.slice(0, selfKey.indexOf(':')) : undefined;
	$: hasChildren = rows.length > 1;
	$: selfName = selfRow?.area_name ?? 'This area';

	// Background = every area at the self area's own level (its siblings across the city).
	$: contextFilter = (f) => !selfLevel || f.properties?.area_level === selfLevel;

	// "You are here" = the accent colour (filled on leaf pages, outlined when children exist, so
	// the children stay visible); children = a primary-blue tint. Both follow the site theme.
	const SELF_FILL = 'var(--accent)';
	const CHILD_FILL = 'color-mix(in srgb, var(--primary) 55%, var(--base-100))';
	$: palette = [SELF_FILL, CHILD_FILL];
	$: outlineKeys = hasChildren && selfKey ? [selfKey] : [];

	const tooltip = [
		{ id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' },
		{ id: 'hint', showColumnName: false, valueClass: 'text-xs', fmt: 'id' }
	];
	// Self row first (PolygonMap assigns categorical colours by first occurrence), plus a hint
	// line under the name in the tooltip.
	$: tipRows = [
		...(selfRow ? [{ ...selfRow, role: 'This area', hint: 'You are here' }] : []),
		...rows
			.filter((r) => r !== selfRow)
			.map((r) => ({ ...r, role: 'Click to explore', hint: r?.link ? 'Click to open' : '' }))
	];
	// On a query error the panels get the failed query itself, so PolygonMap reports the error.
	$: panelData = queryFailed ? data : tipRows;
</script>

<div class="adm">
	{#if title}
		<h4 class="markdown mb-2">{title}</h4>
	{/if}
	{#if !loaded}
		<div class="adm-wait" style="height: {Math.min(height, 240)}px">Loading map…</div>
	{:else}
	<div class="adm-panels">
		<figure class="adm-panel">
			<figcaption>In the city</figcaption>
			<PolygonMap
				data={panelData}
				{geoJsonUrl}
				geoId="feature_key"
				areaCol="feature_key"
				value="role"
				legendType="categorical"
				colorPalette={palette}
				link="link"
				{tooltip}
				unmatched="context"
				{contextFilter}
				{outlineKeys}
				focusKey={selfKey}
				legend={false}
				{height}
				ariaLabel="{selfName}: location within the whole city"
				emptyMessage="No boundary available for this area yet."
			/>
		</figure>
		<figure class="adm-panel">
			<figcaption>Close-up</figcaption>
			<PolygonMap
				data={panelData}
				{geoJsonUrl}
				geoId="feature_key"
				areaCol="feature_key"
				value="role"
				legendType="categorical"
				colorPalette={palette}
				link="link"
				{tooltip}
				unmatched="context"
				{contextFilter}
				{outlineKeys}
				fitKeys={selfKey ? [selfKey] : undefined}
				legend={false}
				{height}
				ariaLabel="{selfName}: close-up with its surroundings"
				emptyMessage="No boundary available for this area yet."
			/>
		</figure>
	</div>
	<div class="adm-legend">
		<span class="adm-item">
			<span
				class="adm-swatch"
				style={hasChildren
					? 'background: transparent; border: 2px solid var(--accent)'
					: 'background: var(--accent)'}
			/>
			{selfName}
		</span>
		{#if hasChildren}
			<span class="adm-item">
				<span class="adm-swatch" style="background: {CHILD_FILL}" />
				Areas within it (click to open)
			</span>
		{/if}
		<span class="adm-item">
			<span
				class="adm-swatch"
				style="background: color-mix(in srgb, var(--base-content) 7%, var(--base-100))"
			/>
			Other areas
		</span>
	</div>
	{/if}
</div>

<style>
	.adm {
		margin: 0.5rem 0 1rem;
	}
	.adm-wait {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--base-content) 6%, var(--base-100));
		color: var(--base-content-muted);
		font-size: 0.85rem;
	}
	.adm-panels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 0.75rem 1.25rem;
		align-items: start;
	}
	.adm-panel {
		margin: 0;
		min-width: 0;
	}
	.adm-panel figcaption {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--base-content-muted);
	}
	.adm-panel :global(.pm-root) {
		margin: 0.25rem 0 0;
	}
	.adm-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		margin-top: 0.5rem;
		font-size: 0.78rem;
		color: var(--base-content);
	}
	.adm-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}
	.adm-swatch {
		display: inline-block;
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 0.2rem;
		border: 1px solid color-mix(in srgb, var(--base-content) 20%, transparent);
	}
</style>

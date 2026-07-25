<!--
  #308: shared per-area drill-down mini map. One component, consumed by every Berlin and Hamburg
  per-area profile template (mirroring the I21 canonical-template consolidation, #300) instead of
  hand-copying an <AreaMap> block into each of the ~8 area template files.

  What it shows (per the issue spec): the CURRENT area's own polygon highlighted, plus (where the
  area has a next-deeper level) that level's polygons within it, each clickable to drill down
  exactly one level. Leaf-grain pages (Berlin PLR/Ortsteil, Hamburg statistisches Gebiet) pass a
  `data` set containing only the "self" row -- no separate "leaf mode" prop is needed, the drill-down
  affordance simply disappears when there is nothing to click (0 child rows => 0 non-self features
  drawn, per Areas.svelte's own `data`-driven feature filter -- see EvidenceMap's `processAreas()`).

  Why a `role`/`link` contract instead of re-deriving anything here: this component is intentionally
  DUMB -- it takes an already-computed `data` query (feature_key, area_name, role, link) and a
  `geoJsonUrl`, and just wires them into Evidence's own `<AreaMap>` (the same component already used
  on /berlin/maps, /hamburg/maps, /berlin/area/index.md -- see this repo's web-engineer notes for why
  that component was read, not reinvented). Each page's own SQL decides which areas are "self" vs
  "child" for `${params.code}` and builds the drill-down link -- this component has no city/level
  knowledge at all, which is what keeps it city-agnostic (ADR-0005) and reusable across all ~8
  per-area templates.

  `data` CONTRACT (rows must be pre-sorted self-row-first -- see rolePalette comment below):
    - feature_key: string, must match the `feature_key` property baked into the geoJSON file at
      export time (`web/scripts/export_area_geojson.py`'s `<area_level>:<area_code>` convention,
      #308) -- a level-qualified key, not a bare area_code, so two different levels' codes can never
      collide within one combined self+child geoJSON file.
    - area_name: display label (tooltip).
    - role: 'This area' for the single self row, 'Click to explore' for every child row.
    - link: null for the self row (no navigation on click -- see EvidenceMap.js's
      `if (link) window.location.href = link`, a falsy link is a no-op); the child page's relative
      URL for every child row.

  Geometry: geoJsonUrl points at one of the combined self+child (or self-only, for leaf levels)
  FeatureCollections `export_area_geojson.py` writes to `web/static/geo/` -- these are WHOLE-CITY
  files (same "static geometry, page-scoped SQL narrows what's drawn" pattern as every other
  AreaMap usage on this site); Areas.svelte only ever renders the features present in `data`, so the
  map stays small/scoped to this page's own area + its immediate context even though the underlying
  file covers every area at that level.

  Auto-fit view: startingLat/startingLong/startingZoom are deliberately NOT set -- BaseMap.svelte's
  own `userDefinedView` check means EvidenceMap auto-fits the map to whatever features actually get
  drawn (self + its children, maxZoom 12 -- see EvidenceMap.js's `updateBounds()`/`fitBounds()`).
  That is exactly the "small map, centered/zoomed on the current area's context" scope decision from
  the issue -- no per-area/per-city coordinate needs to be hardcoded anywhere.

  #144 basePath note: like every other geoJsonUrl/link on this site, the CALLER is responsible for
  prefixing `${base}` (from `$app/paths`) onto both `geoJsonUrl` and every `link` value in `data` --
  this component does not re-derive base path itself (consistent with every existing AreaMap usage,
  see e.g. pages/berlin/maps.md's own header comment on this exact point).
-->
<script>
	import { AreaMap } from '@evidence-dev/core-components';

	/** @type {import("@evidence-dev/sdk/usql").QueryValue} Rows: feature_key, area_name, role, link
	 *  (see header comment's "data CONTRACT"). */
	export let data;

	/** @type {string} URL (already base-prefixed by the caller) to the combined self+child (or
	 *  self-only) GeoJSON FeatureCollection for this page's level pair. */
	export let geoJsonUrl;

	/** @type {string|undefined} */
	export let title = undefined;

	/** @type {number} Small map -- deliberately shorter than AreaMap's own 300px default. */
	export let height = 240;

	// #308: fixed two-colour categorical palette -- "This area" (current area, highlighted,
	// non-clickable) vs "Click to explore" (next-deeper-level areas, clickable). EvidenceMap assigns
	// categorical colours positionally by FIRST-OCCURRENCE order in `data` (see
	// EvidenceMap.js handleLegendValues/initializeData, the same convention already documented in
	// pages/berlin/maps.md's header comment for its stage palette) -- every page wiring this
	// component is written to always emit the single self row before any child rows, so
	// colorPalette[0] always lands on "This area". Deliberately NOT reusing the RdYlBu-6
	// gentrification-stage palette (pages/berlin/maps.md, pages/hamburg/maps.md) -- this map carries
	// no pressure/stage meaning at all, and reusing that palette's colours here risked a reader
	// misreading "highlighted" as "worst stage". Neutral navigation colours instead: a dark slate for
	// "you are here", a mid blue for "click to go here".
	const rolePalette = ['#374151', '#3b82f6'];
</script>

<AreaMap
	{data}
	{geoJsonUrl}
	geoId="feature_key"
	areaCol="feature_key"
	value="role"
	legendType="categorical"
	colorPalette={rolePalette}
	{title}
	{height}
	link="link"
	tooltip={[{ id: 'area_name', showColumnName: false, valueClass: 'font-bold text-sm', fmt: 'id' }]}
	emptySet="warn"
	emptyMessage="No boundary available for this area yet."
/>

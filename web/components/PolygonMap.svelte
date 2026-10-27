<!--
  #351: self-contained SVG polygon map. It replaces Evidence's Leaflet-based `<AreaMap>` on every
  map on the site. There is no basemap, no tile provider, and no new npm dependency: the component
  fetches one of the static GeoJSON files `web/scripts/export_area_geojson.py` writes to
  `web/static/geo/`, projects it itself, and draws plain SVG paths. Nothing leaves the site's own
  origin.

  Projection: equirectangular with the x axis scaled by cos(mid-latitude). Over one city (well
  under 1 degree of latitude) this differs from Web Mercator only by a uniform scale factor, so
  shapes look the same as on a normal web map. The result is fitted to a 1000-unit-wide viewBox.

  Outlying parts (city-agnostic, ADR-0005): a polygon part that is both small (< 5 % of the total
  mapped area) and far from the rest (centroid more than 2 x sqrt(total area) from the
  area-weighted centre) is drawn in a small framed inset in the emptiest corner instead of
  stretching the whole map. Today this only catches Hamburg's North Sea exclave Neuwerk, about
  100 km from the city, which otherwise shrinks Hamburg to a third of the frame. Every regular
  part of both cities sits within 0.8 x sqrt(area), so the 2 x cut-off has plenty of margin. The
  rule is about geometry only, not about a named city or area.

  Props mirror the `<AreaMap>` props the pages already used (data, geoJsonUrl, geoId, areaCol,
  value, legendType, colorPalette, min, max, link, tooltip, title), so the page diffs stay small:
    - Categorical colours are assigned by position over the DISTINCT values of `value`, in
      first-occurrence order in `data`. That is the same rule EvidenceMap.js used, so the pages'
      existing `presentStagePalette()` helpers keep lining up colour i with value i.
    - Scalar colours are interpolated linearly in RGB across `colorPalette` between `min` and
      `max` (default: the data's own min/max), which is what chroma.scale().domain() did.
    - `tooltip` takes the same {id, title, showColumnName, fmt, valueClass} entries. Empty
      values are skipped instead of printing a blank line. Features with no data row still
      show their name from the GeoJSON `area_name` property.
    - `link` names a column holding an already `${base}`-prefixed URL (#144, the caller adds
      the prefix, as before). It is rendered as a real SVG <a>, so SvelteKit navigates on the
      client, keyboard users can tab to it, and a touch tap first shows the tooltip and a second
      tap follows the link.
  Additions for the per-area profile maps (see AreaDrilldownMap.svelte):
    - `unmatched`: 'nodata' (default; choropleth: features without a value are drawn grey and
      the legend gets a "No data" swatch) or 'context' (profile: faint, unlabelled background).
    - `contextFilter(feature)`: which unmatched features to draw at all (a drill-down file holds
      two levels; only one of them should form the background).
    - `outlineKeys`: features drawn as an outline only, on top of everything else.
    - `fitKeys`: zoom the view to these features (with padding) instead of the whole extent.
    - `focusKey`: if this feature ends up smaller than ~14 px on screen, a locator ring marks it.
    - `legend`: set false to hide the built-in legend (the caller draws its own).
  Theming uses the site's Evidence colour tokens (--base-100/-200/-300, --base-content,
  --primary, --accent), so light and dark mode both work without extra props.
-->
<script context="module">
	/** url -> Promise<FeatureCollection>, shared by every map on the page (a profile page draws
	 *  two panels from the same file, which is fetched and parsed once). */
	const geoCache = new Map();

	function loadGeo(url) {
		if (!geoCache.has(url)) {
			const p = fetch(url).then((r) => {
				if (!r.ok) throw new Error(`HTTP ${r.status} loading ${url}`);
				return r.json();
			});
			p.catch(() => geoCache.delete(url));
			geoCache.set(url, p);
		}
		return geoCache.get(url);
	}

	/** FeatureCollection -> projected model, memoized per parsed object. */
	const modelCache = new WeakMap();

	const VIEW_W = 1000;
	const round2 = (v) => Math.round(v * 100) / 100;

	function ringArea(ring) {
		let a = 0;
		let cx = 0;
		let cy = 0;
		for (let i = 0, n = ring.length; i < n; i++) {
			const [x0, y0] = ring[i];
			const [x1, y1] = ring[(i + 1) % n];
			const cr = x0 * y1 - x1 * y0;
			a += cr;
			cx += (x0 + x1) * cr;
			cy += (y0 + y1) * cr;
		}
		a /= 2;
		if (a === 0) return { area: 0, cx: ring[0][0], cy: ring[0][1] };
		return { area: Math.abs(a), cx: cx / (6 * a), cy: cy / (6 * a) };
	}

	function emptyBox() {
		return [Infinity, Infinity, -Infinity, -Infinity];
	}

	function growBox(b, x, y) {
		if (x < b[0]) b[0] = x;
		if (y < b[1]) b[1] = y;
		if (x > b[2]) b[2] = x;
		if (y > b[3]) b[3] = y;
	}

	export function buildModel(fc) {
		if (modelCache.has(fc)) return modelCache.get(fc);
		const feats = (fc?.features ?? []).filter((f) => f && f.geometry);

		let minLat = Infinity;
		let maxLat = -Infinity;
		const featurePolys = feats.map((f) => {
			const g = f.geometry;
			const polys =
				g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
			for (const p of polys)
				for (const ring of p)
					for (const c of ring) {
						if (c[1] < minLat) minLat = c[1];
						if (c[1] > maxLat) maxLat = c[1];
					}
			return polys;
		});
		if (!Number.isFinite(minLat)) {
			const empty = { width: VIEW_W, height: VIEW_W * 0.6, features: [], inset: null };
			modelCache.set(fc, empty);
			return empty;
		}
		const k = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);

		// Project every polygon part (x = lon * cos(lat0), y = -lat) and measure it.
		const parts = [];
		featurePolys.forEach((polys, fi) => {
			for (const p of polys) {
				const rings = p.map((ring) => ring.map((c) => [c[0] * k, -c[1]]));
				if (!rings[0] || rings[0].length < 3) continue;
				const { area, cx, cy } = ringArea(rings[0]);
				parts.push({ fi, rings, area, cx, cy, outlier: false });
			}
		});

		// Outlying parts go to an inset (see the header comment).
		const total = parts.reduce((s, p) => s + p.area, 0);
		if (total > 0) {
			const wcx = parts.reduce((s, p) => s + p.cx * p.area, 0) / total;
			const wcy = parts.reduce((s, p) => s + p.cy * p.area, 0) / total;
			const reach = 2 * Math.sqrt(total);
			for (const p of parts) {
				p.outlier = p.area < 0.05 * total && Math.hypot(p.cx - wcx, p.cy - wcy) > reach;
			}
			if (parts.every((p) => p.outlier)) parts.forEach((p) => (p.outlier = false));
		}

		const mainBox = emptyBox();
		const outBox = emptyBox();
		for (const p of parts) {
			const b = p.outlier ? outBox : mainBox;
			for (const [x, y] of p.rings[0]) growBox(b, x, y);
		}
		const spanX = mainBox[2] - mainBox[0] || 1e-9;
		const s = VIEW_W / spanX;
		const height = Math.max((mainBox[3] - mainBox[1]) * s, 1);
		const toMain = ([x, y]) => [(x - mainBox[0]) * s, (y - mainBox[1]) * s];

		let inset = null;
		let toInset = null;
		if (Number.isFinite(outBox[0])) {
			const ow = outBox[2] - outBox[0] || 1e-9;
			const oh = outBox[3] - outBox[1] || 1e-9;
			const si = Math.min((0.16 * VIEW_W) / ow, (0.22 * height) / oh);
			const iw = ow * si;
			const ih = oh * si;
			const margin = 0.012 * VIEW_W;
			const pad = 0.01 * VIEW_W;
			const fw = iw + 2 * margin;
			const fh = ih + 2 * margin;
			const corners = [
				[pad, pad],
				[VIEW_W - pad - fw, pad],
				[pad, height - pad - fh],
				[VIEW_W - pad - fw, height - pad - fh]
			];
			// Emptiest corner = fewest main-map vertices under the inset frame.
			const counts = corners.map(() => 0);
			for (const p of parts) {
				if (p.outlier) continue;
				for (const pt of p.rings[0]) {
					const [x, y] = toMain(pt);
					corners.forEach(([cx, cy], i) => {
						if (x >= cx && x <= cx + fw && y >= cy && y <= cy + fh) counts[i]++;
					});
				}
			}
			const best = counts.indexOf(Math.min(...counts));
			const [fx, fy] = corners[best];
			inset = { x: fx, y: fy, w: fw, h: fh };
			toInset = ([x, y]) => [fx + margin + (x - outBox[0]) * si, fy + margin + (y - outBox[1]) * si];
		}

		// One SVG path per feature (all of its parts, holes via even-odd fill).
		// `bbox` covers the feature's main-map parts only (falling back to its inset parts when it
		// has nothing else), so zooming to an area that owns an exclave zooms to the area itself
		// rather than to the area plus the inset frame.
		const pathParts = feats.map(() => []);
		const mainBoxes = feats.map(() => emptyBox());
		const insetBoxes = feats.map(() => emptyBox());
		for (const p of parts) {
			const tf = p.outlier ? toInset : toMain;
			const box = p.outlier ? insetBoxes[p.fi] : mainBoxes[p.fi];
			for (const ring of p.rings) {
				const pts = ring.map(tf);
				for (const [x, y] of pts) growBox(box, x, y);
				pathParts[p.fi].push('M' + pts.map(([x, y]) => `${round2(x)},${round2(y)}`).join('L') + 'Z');
			}
		}
		const features = feats
			.map((f, i) => ({
				props: f.properties ?? {},
				d: pathParts[i].join(''),
				bbox: Number.isFinite(mainBoxes[i][0]) ? mainBoxes[i] : insetBoxes[i]
			}))
			.filter((f) => f.d);

		const model = { width: VIEW_W, height, features, inset };
		modelCache.set(fc, model);
		return model;
	}
</script>

<script>
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Query } from '@evidence-dev/sdk/usql';

	/** Query result (or plain array) with one row per area to colour. */
	export let data = undefined;
	/** URL of the GeoJSON FeatureCollection, already `${base}`-prefixed by the caller (#144). */
	export let geoJsonUrl;
	/** GeoJSON feature property that identifies an area. */
	export let geoId = 'area_code';
	/** `data` column matching `geoId`. */
	export let areaCol = undefined;
	/** `data` column to colour by. */
	export let value = undefined;
	/** 'categorical' | 'scalar'; inferred from the first non-null value when omitted. */
	export let legendType = undefined;
	export let colorPalette = undefined;
	export let min = undefined;
	export let max = undefined;
	/** Format for scalar legend labels and the default tooltip ('id', 'num0'..'num3', 'pct0'..'pct3'). */
	export let valueFmt = undefined;
	/** `data` column holding a click-through URL. */
	export let link = undefined;
	/** Tooltip fields: [{ id, title?, showColumnName?, fmt?, valueClass? }]. */
	export let tooltip = undefined;
	/** Column (in `data`) or GeoJSON property used as the area's display name. */
	export let nameCol = 'area_name';
	export let title = undefined;
	/** Maximum map height in px; the frame keeps the city's aspect ratio below that. */
	export let height = 520;
	export let legend = true;
	export let legendTitle = undefined;
	/** 'nodata' | 'context' -- how to draw features that have no row/value in `data`. */
	export let unmatched = 'nodata';
	/** (feature) => boolean: which unmatched features to draw at all. */
	export let contextFilter = undefined;
	export let outlineKeys = [];
	export let fitKeys = undefined;
	export let focusKey = undefined;
	export let emptyMessage = 'No data to map for this selection.';
	export let ariaLabel = undefined;

	// Fallbacks mirror evidence.config.yaml's theme.colorPalettes.default / colorScales.default,
	// i.e. what <AreaMap> used when a page passed no colorPalette.
	const DEFAULT_CATEGORICAL = [
		'#236aa4',
		'#45a1bf',
		'#a5cdee',
		'#8dacbf',
		'#85c7c6',
		'#d2c6ac',
		'#f4b548',
		'#8f3d56',
		'#71b9f4',
		'#46a485'
	];
	const DEFAULT_SCALAR = ['#ADD8E6', '#00008B'];
	const NO_DATA_FILL = 'color-mix(in srgb, var(--base-content) 16%, var(--base-100))';
	const CONTEXT_FILL = 'color-mix(in srgb, var(--base-content) 7%, var(--base-100))';

	// ---- data loading (same subscribe pattern as Evidence's own QueryLoad.svelte) ----
	let unsub = () => {};
	let loadedQuery;
	$: if (Query.isQuery(data)) {
		data.fetch();
		unsub();
		unsub = data.subscribe((v) => (loadedQuery = v));
	}
	onDestroy(() => unsub());

	$: rows = Query.isQuery(data)
		? loadedQuery && loadedQuery.dataLoaded
			? Array.from(loadedQuery)
			: null
		: Array.isArray(data)
			? data
			: data == null
				? []
				: Array.from(data);
	$: queryError = Query.isQuery(data) && loadedQuery?.error ? String(loadedQuery.error.message ?? loadedQuery.error) : null;

	// ---- geometry loading (browser only; the static build renders a placeholder) ----
	let geo = null;
	let geoError = null;
	let loadToken = 0;
	$: if (browser && geoJsonUrl) startGeoLoad(geoJsonUrl);

	function startGeoLoad(url) {
		const token = ++loadToken;
		geoError = null;
		loadGeo(url).then(
			(fc) => {
				if (token === loadToken) geo = fc;
			},
			(err) => {
				if (token === loadToken) {
					geo = null;
					geoError = err?.message ?? String(err);
				}
			}
		);
	}

	$: model = geo ? buildModel(geo) : null;

	// ---- colours ----
	const toNumber = (v) => (typeof v === 'bigint' ? Number(v) : v);
	const isMissing = (v) =>
		v === null || v === undefined || v === '' || (typeof v === 'number' && Number.isNaN(v));

	function hexToRgb(hex) {
		let h = String(hex).trim().replace('#', '');
		if (h.length === 3)
			h = h
				.split('')
				.map((c) => c + c)
				.join('');
		const n = parseInt(h, 16);
		return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
	}

	function scalarColor(stops, t) {
		if (stops.length === 1) return stops[0];
		const x = Math.min(1, Math.max(0, t)) * (stops.length - 1);
		const i = Math.min(Math.floor(x), stops.length - 2);
		const f = x - i;
		const a = hexToRgb(stops[i]);
		const b = hexToRgb(stops[i + 1]);
		const c = a.map((v, j) => Math.round(v + (b[j] - v) * f));
		return `rgb(${c[0]},${c[1]},${c[2]})`;
	}

	$: keyCol = areaCol ?? geoId;
	$: rowByKey = (() => {
		const m = new Map();
		for (const r of rows ?? []) {
			const key = r?.[keyCol];
			if (key === null || key === undefined) continue;
			const k = String(key);
			if (!m.has(k)) m.set(k, r);
		}
		return m;
	})();

	$: present = value ? (rows ?? []).map((r) => toNumber(r?.[value])).filter((v) => !isMissing(v)) : [];
	$: resolvedType = legendType ?? (typeof present[0] === 'number' ? 'scalar' : 'categorical');
	$: categories = resolvedType === 'categorical' ? [...new Set(present.map(String))] : [];
	$: palette =
		colorPalette && colorPalette.length
			? colorPalette
			: resolvedType === 'scalar'
				? DEFAULT_SCALAR
				: DEFAULT_CATEGORICAL;
	$: numeric = resolvedType === 'scalar' ? present.filter((v) => typeof v === 'number') : [];
	$: domainMin = toNumber(min) ?? (numeric.length ? Math.min(...numeric) : 0);
	$: domainMax = toNumber(max) ?? (numeric.length ? Math.max(...numeric) : 1);

	// Built as a reactive closure (not a plain function) so that everything it reads is a visible
	// dependency of `layers` below -- a palette- or domain-only change must recolour the map.
	$: fillFor = (row) => {
		if (!value) return 'var(--primary)';
		const v = toNumber(row?.[value]);
		if (isMissing(v)) return null;
		if (resolvedType === 'scalar') {
			if (typeof v !== 'number') return null;
			const span = domainMax - domainMin;
			return scalarColor(palette, span ? (v - domainMin) / span : 0.5);
		}
		const i = categories.indexOf(String(v));
		return i < 0 ? null : palette[i % palette.length];
	};

	// ---- what to draw ----
	$: outlineSet = new Set((outlineKeys ?? []).map(String));
	$: layers = ((fillFor) => {
		const context = [];
		const filled = [];
		const outlines = [];
		if (!model) return { context, filled, outlines, anyNoData: false };
		let anyNoData = false;
		const byKey = new Map();
		for (const f of model.features) {
			const key = f.props?.[geoId];
			if (key === null || key === undefined) continue;
			byKey.set(String(key), f);
		}
		// Unmatched features first (background), then data rows in `data` order.
		for (const [key, f] of byKey) {
			if (rowByKey.has(key)) continue;
			if (contextFilter && !contextFilter({ properties: f.props })) continue;
			context.push({ key, f, row: null, fill: unmatched === 'context' ? CONTEXT_FILL : NO_DATA_FILL, kind: 'context' });
			if (unmatched !== 'context') anyNoData = true;
		}
		for (const [key, row] of rowByKey) {
			const f = byKey.get(key);
			if (!f) continue;
			if (outlineSet.has(key)) {
				outlines.push({ key, f, row, fill: 'none', kind: 'outline' });
				continue;
			}
			let fill = fillFor(row);
			if (!fill) {
				fill = NO_DATA_FILL;
				anyNoData = true;
			}
			const href = link ? row?.[link] : null;
			filled.push({ key, f, row, fill, kind: 'data', href: href ? String(href) : null });
		}
		return { context, filled, outlines, anyNoData };
	})(fillFor);
	$: drawnByKey = new Map([...layers.context, ...layers.filled, ...layers.outlines].map((d) => [d.key, d]));
	$: matchedCount = layers.filled.length + layers.outlines.length;

	// ---- view box ----
	$: viewBox = (() => {
		if (!model) return [0, 0, VIEW_W, VIEW_W * 0.6];
		const fullPad = 0.01 * VIEW_W;
		const full = [-fullPad, -fullPad, model.width + 2 * fullPad, model.height + 2 * fullPad];
		if (!fitKeys || !fitKeys.length) return full;
		const b = emptyBox();
		for (const k of fitKeys) {
			const d = drawnByKey.get(String(k));
			const fb = d?.f?.bbox ?? model.features.find((f) => String(f.props?.[geoId]) === String(k))?.bbox;
			if (!fb) continue;
			growBox(b, fb[0], fb[1]);
			growBox(b, fb[2], fb[3]);
		}
		if (!Number.isFinite(b[0])) return full;
		const minSpan = 0.08 * VIEW_W;
		const w = Math.max((b[2] - b[0]) * 1.5, minSpan);
		const h = Math.max((b[3] - b[1]) * 1.5, minSpan);
		const cx = (b[0] + b[2]) / 2;
		const cy = (b[1] + b[3]) / 2;
		return [cx - w / 2, cy - h / 2, w, h];
	})();
	$: aspect = viewBox[2] / viewBox[3];

	// ---- interaction ----
	let frameEl;
	let frameWidth = 0;
	let frameHeight = 0;
	let hoverKey = null;
	let tipX = 0;
	let tipY = 0;
	let lastPointerType = 'mouse';

	$: hovered = hoverKey ? drawnByKey.get(hoverKey) : null;
	$: unitsToPx = viewBox[2] ? Math.min(frameWidth / viewBox[2], frameHeight / viewBox[3]) : 0;

	function keyFromEvent(e) {
		const el = e.target?.closest?.('[data-key]');
		return el ? el.getAttribute('data-key') : null;
	}

	function placeTip(clientX, clientY) {
		if (!frameEl) return;
		const r = frameEl.getBoundingClientRect();
		tipX = clientX - r.left;
		tipY = clientY - r.top;
	}

	function onPointerMove(e) {
		lastPointerType = e.pointerType || 'mouse';
		if (lastPointerType === 'touch') return;
		hoverKey = keyFromEvent(e);
		if (hoverKey) placeTip(e.clientX, e.clientY);
	}

	function onPointerDown(e) {
		lastPointerType = e.pointerType || 'mouse';
	}

	function onClick(e) {
		const key = keyFromEvent(e);
		if (lastPointerType === 'touch') {
			// First tap shows the name; a second tap on the same area follows its link.
			if (key && key !== hoverKey) {
				e.preventDefault();
				hoverKey = key;
				placeTip(e.clientX, e.clientY);
			} else if (!key) {
				hoverKey = null;
			}
		}
	}

	function onFocusIn(e) {
		const key = keyFromEvent(e);
		if (!key) return;
		hoverKey = key;
		const r = e.target.getBoundingClientRect();
		placeTip(r.left + r.width / 2, r.top + r.height / 2);
	}

	// ---- tooltip content ----
	function formatValue(v, fmt) {
		v = toNumber(v);
		if (isMissing(v)) return null;
		if (typeof v !== 'number') return String(v);
		if (fmt === 'id') return String(v);
		const m = /^(num|pct)(\d)$/.exec(fmt ?? '');
		if (m) {
			const digits = Number(m[2]);
			const x = m[1] === 'pct' ? v * 100 : v;
			return (
				x.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }) +
				(m[1] === 'pct' ? '%' : '')
			);
		}
		return v.toLocaleString('en-US', { maximumFractionDigits: 2 });
	}

	function displayName(d) {
		const n = d.row?.[nameCol] ?? d.f.props?.[nameCol] ?? d.f.props?.area_name;
		return isMissing(n) ? String(d.f.props?.area_code ?? d.key) : String(n);
	}

	$: valueTooltipFmt = valueFmt ?? (tooltip ?? []).find((t) => t.id === value)?.fmt;

	function tipLines(d, tooltip) {
		if (!d) return [];
		if (!d.row) {
			const lines = [{ text: displayName(d), cls: 'font-bold text-sm' }];
			if (unmatched !== 'context') lines.push({ label: null, text: 'No data', cls: 'pm-muted' });
			return lines;
		}
		if (!tooltip || !tooltip.length) {
			const lines = [{ text: displayName(d), cls: 'font-bold text-sm' }];
			const v = value ? formatValue(d.row[value], valueFmt) : null;
			if (v !== null) lines.push({ label: legendTitle ?? value, text: v });
			return lines;
		}
		const lines = [];
		for (const t of tooltip) {
			let text = formatValue(d.row[t.id], t.fmt);
			if (text === null && t.id === nameCol) text = displayName(d);
			if (text === null || text.trim() === '') continue;
			lines.push({
				label: t.showColumnName === false ? null : (t.title ?? t.id),
				text,
				cls: t.valueClass ?? ''
			});
		}
		if (!lines.length) lines.push({ text: displayName(d), cls: 'font-bold text-sm' });
		return lines;
	}

	$: lines = tipLines(hovered, tooltip);
	$: tipFlipX = tipX > frameWidth * 0.6;
	$: tipFlipY = tipY > frameHeight * 0.6;

	$: focusDrawn = focusKey != null ? drawnByKey.get(String(focusKey)) : null;
	$: focusRing = (() => {
		if (!focusDrawn || !unitsToPx) return null;
		const b = focusDrawn.f.bbox;
		const sizePx = Math.max(b[2] - b[0], b[3] - b[1]) * unitsToPx;
		if (sizePx >= 14) return null;
		return { cx: (b[0] + b[2]) / 2, cy: (b[1] + b[3]) / 2, r: 11 / unitsToPx };
	})();

	$: scalarGradient =
		resolvedType === 'scalar'
			? `linear-gradient(to right, ${palette
					.map((c, i) => `${c} ${palette.length === 1 ? 0 : (i / (palette.length - 1)) * 100}%`)
					.join(', ')})`
			: '';
	$: legendHeading = legendTitle ?? (tooltip ?? []).find((t) => t.id === value)?.title ?? null;
	$: loading = !model || rows === null;
	$: error = geoError ?? queryError;
</script>

<div class="pm-root break-inside-avoid">
	{#if title}
		<h4 class="markdown mb-2">{title}</h4>
	{/if}
	{#if error}
		<div class="pm-message" role="alert">Map could not be drawn: {error}</div>
	{:else if loading}
		<div class="pm-skeleton" style="height: {Math.min(height, 360)}px" aria-busy="true">
			<span>Loading map…</span>
		</div>
	{:else if matchedCount === 0 && emptyMessage}
		<div class="pm-message">{emptyMessage}</div>
	{:else}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="pm-frame"
			bind:this={frameEl}
			bind:clientWidth={frameWidth}
			bind:clientHeight={frameHeight}
			style="aspect-ratio: {aspect}; max-height: {height}px;"
			data-sveltekit-preload-data="off"
			data-sveltekit-preload-code="off"
			on:pointermove={onPointerMove}
			on:pointerdown={onPointerDown}
			on:pointerleave={() => lastPointerType !== 'touch' && (hoverKey = null)}
			on:click={onClick}
			on:focusin={onFocusIn}
			on:focusout={() => (hoverKey = null)}
			on:keydown={(e) => e.key === 'Escape' && (hoverKey = null)}
		>
			<svg
				viewBox={viewBox.join(' ')}
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label={ariaLabel ?? title ?? 'Map'}
			>
				{#if model.inset}
					<rect
						class="pm-inset"
						x={model.inset.x}
						y={model.inset.y}
						width={model.inset.w}
						height={model.inset.h}
						rx="4"
					/>
				{/if}
				<g class="pm-context">
					{#each layers.context as d (d.key)}
						<path data-key={d.key} d={d.f.d} style="fill: {d.fill}" class="pm-area pm-ctx" />
					{/each}
				</g>
				<g class="pm-data">
					{#each layers.filled as d (d.key)}
						{#if d.href}
							<a href={d.href} data-key={d.key} aria-label={displayName(d)}>
								<path d={d.f.d} style="fill: {d.fill}" class="pm-area pm-link" />
							</a>
						{:else}
							<path data-key={d.key} d={d.f.d} style="fill: {d.fill}" class="pm-area" />
						{/if}
					{/each}
				</g>
				<g class="pm-outlines">
					{#each layers.outlines as d (d.key)}
						<path data-key={d.key} d={d.f.d} class="pm-outline" />
					{/each}
				</g>
				{#if hovered}
					<path d={hovered.f.d} class="pm-hover" />
				{/if}
				{#if focusRing}
					<circle class="pm-ring" cx={focusRing.cx} cy={focusRing.cy} r={focusRing.r} />
				{/if}
			</svg>
			{#if hovered && lines.length}
				<div
					class="pm-tip"
					class:flip-x={tipFlipX}
					class:flip-y={tipFlipY}
					style="left: {tipX}px; top: {tipY}px;"
					role="tooltip"
				>
					{#each lines as l}
						<div class="pm-tip-line">
							{#if l.label}<span class="pm-tip-label">{l.label}:</span>{/if}
							<span class={l.cls}>{l.text}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		{#if legend && value && (categories.length || resolvedType === 'scalar')}
			<div class="pm-legend" aria-label="Legend">
				{#if legendHeading}<span class="pm-legend-title">{legendHeading}</span>{/if}
				{#if resolvedType === 'categorical'}
					{#each categories as c, i}
						<span class="pm-legend-item">
							<span class="pm-swatch" style="background: {palette[i % palette.length]}" />
							{c}
						</span>
					{/each}
				{:else}
					<span class="pm-legend-item">
						<span class="pm-legend-num">{formatValue(domainMin, valueTooltipFmt ?? 'num1')}</span>
						<span class="pm-ramp" style="background: {scalarGradient}" />
						<span class="pm-legend-num">{formatValue(domainMax, valueTooltipFmt ?? 'num1')}</span>
					</span>
				{/if}
				{#if layers.anyNoData}
					<span class="pm-legend-item">
						<span class="pm-swatch" style="background: {NO_DATA_FILL}" />
						No data
					</span>
				{/if}
			</div>
		{/if}
	{/if}
</div>

<style>
	.pm-root {
		margin: 0.5rem 0 1rem;
	}
	.pm-frame {
		position: relative;
		width: 100%;
		touch-action: manipulation;
	}
	.pm-frame svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.pm-area {
		/* Near-white in light mode, near-black in dark mode: reads as a thin "white" border on
		   coloured areas but stays visible on very light fills (e.g. a diverging scale's midpoint). */
		stroke: color-mix(in srgb, var(--base-100) 82%, var(--base-content));
		stroke-width: 0.6px;
		stroke-linejoin: round;
		fill-rule: evenodd;
		vector-effect: non-scaling-stroke;
		transition: opacity 120ms ease;
	}
	.pm-ctx {
		stroke-width: 0.5px;
	}
	.pm-link {
		cursor: pointer;
	}
	.pm-data a:focus {
		outline: none;
	}
	.pm-data a:focus-visible .pm-area {
		stroke: var(--base-content);
		stroke-width: 2px;
	}
	.pm-outline {
		fill: none;
		stroke: var(--accent);
		stroke-width: 2.25px;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
		pointer-events: none;
	}
	.pm-hover {
		fill: color-mix(in srgb, var(--base-content) 12%, transparent);
		stroke: var(--base-content);
		stroke-width: 1.75px;
		stroke-linejoin: round;
		fill-rule: evenodd;
		vector-effect: non-scaling-stroke;
		pointer-events: none;
	}
	.pm-ring {
		fill: none;
		stroke: var(--accent);
		stroke-width: 2px;
		vector-effect: non-scaling-stroke;
		pointer-events: none;
	}
	.pm-inset {
		fill: var(--base-100);
		stroke: var(--base-300);
		stroke-width: 1px;
		stroke-dasharray: 3 2;
		vector-effect: non-scaling-stroke;
	}
	.pm-tip {
		position: absolute;
		z-index: 10;
		pointer-events: none;
		transform: translate(12px, 12px);
		max-width: 16rem;
		padding: 0.4rem 0.6rem;
		border-radius: 0.375rem;
		border: 1px solid var(--base-300);
		background: var(--base-100);
		color: var(--base-content);
		font-size: 0.8rem;
		line-height: 1.35;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
		white-space: normal;
	}
	.pm-tip.flip-x {
		transform: translate(calc(-100% - 12px), 12px);
	}
	.pm-tip.flip-y {
		transform: translate(12px, calc(-100% - 12px));
	}
	.pm-tip.flip-x.flip-y {
		transform: translate(calc(-100% - 12px), calc(-100% - 12px));
	}
	.pm-tip-label {
		color: var(--base-content-muted);
	}
	.pm-tip :global(.pm-muted) {
		color: var(--base-content-muted);
	}
	.pm-legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 1rem;
		margin-top: 0.5rem;
		font-size: 0.78rem;
		color: var(--base-content);
	}
	.pm-legend-title {
		font-weight: 600;
		margin-right: 0.25rem;
	}
	.pm-legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}
	.pm-swatch {
		display: inline-block;
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 0.2rem;
		border: 1px solid color-mix(in srgb, var(--base-content) 20%, transparent);
	}
	.pm-ramp {
		display: inline-block;
		width: 9rem;
		height: 0.7rem;
		border-radius: 0.2rem;
		border: 1px solid color-mix(in srgb, var(--base-content) 20%, transparent);
	}
	.pm-legend-num {
		font-variant-numeric: tabular-nums;
		color: var(--base-content-muted);
	}
	.pm-skeleton {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--base-content) 6%, var(--base-100));
		color: var(--base-content-muted);
		font-size: 0.85rem;
		animation: pm-pulse 1.6s ease-in-out infinite;
	}
	.pm-message {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px dashed var(--base-300);
		color: var(--base-content-muted);
		font-size: 0.85rem;
	}
	@keyframes pm-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.pm-skeleton {
			animation: none;
		}
		.pm-area {
			transition: none;
		}
	}
</style>

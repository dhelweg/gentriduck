# Gentriduck web

The public statistics site — [Evidence.dev](https://evidence.dev) (MIT), static export served
from dbt marts published to parquet. See `docs/adr/0012-serving-and-hosting-stack.md` for the
full decision (static export + in-browser DuckDB-WASM, Cloudflare Pages, no MotherDuck on the
serving path, no account needed to preview locally).

## Local development

Needs Node.js >= 18 (this repo doesn't pin a package manager beyond npm) and a built local
warehouse.

```bash
# from the repo root: build the warehouse and publish the marts this site reads
uv run poe build
uv run poe export-serving        # -> data/serving/*.parquet (gitignored, F2/#34)
uv run poe export-area-geojson   # -> web/static/geo/*.geojson (gitignored, G1c #132; needed by /maps)

# then, from web/:
npm install
npm run sources                  # materializes sources/gentriduck_marts/*.sql against data/serving/
npm run dev                      # live-reload dev server
npm run build                    # static build -> web/build/
```

No `MOTHERDUCK_TOKEN`, account, or network access is required to build or preview — the site
reads only the local `data/serving/*.parquet` snapshot.

## Analytics (optional, production only)

The build injects a [GoatCounter](https://www.goatcounter.com/) (AGPL-3.0, open-source,
cookieless, no consent banner) pageview beacon using the site code committed in
`goatcounter-code.txt` (one line, plain text — not a secret, it's designed to sit in every page's
public source) — see `docs/adr/0012-serving-and-hosting-stack.md` Amendment B for the full
decision. Committing the code (rather than only an env var) means every maintainer machine gets it
via `git pull`, with nothing to re-export per machine. If the file is empty/missing and
`GOATCOUNTER_CODE` is unset, the build is a no-op (no beacon, byte-identical output) — local
dev/preview needs no account, per golden rule #5. `GOATCOUNTER_CODE` still overrides the file when
set, e.g. to test a different code without touching the committed default:

```bash
GOATCOUNTER_CODE=<other-site-code> npm run build
```

> **Why this is safe to commit (and what is *not*).** The GoatCounter site *code* is a public
> identifier, not a credential — it ships verbatim in every page's HTML (`data-goatcounter="…"`)
> and grants no access on its own: viewing the dashboard, changing settings, or reading data all
> require the maintainer's GoatCounter account login. So `goatcounter-code.txt` is the right home
> for it. **Do not put actual secrets here or anywhere else in the repo** — a GoatCounter *API*
> token, a `MOTHERDUCK_TOKEN`, or any key that authenticates or authorizes belongs in an untracked
> `.env` / deploy-environment secret, never a tracked file.

## Layout
- `sources/gentriduck_marts/` — DuckDB source (`:memory:`, reads `../data/serving/*.parquet`
  directly via `read_parquet`); one `.sql` file per published mart.
- `pages/` — markdown + SQL pages (data-analyst-authored content; web-engineer owns structure).
- `scripts/export_area_geojson.py` — G1c (#132): joins `dim_area_geometry` + `gentrification_index`
  from the F2 parquet snapshot into static per-`area_level` GeoJSON `FeatureCollection`s under
  `static/geo/` (gitignored). Since #351 the geometry is simplified for display (shapely
  `coverage_simplify`, ~1 m coordinates), which keeps each file around 0.2-1.8 MB instead of 1-13 MB.
- `components/PolygonMap.svelte` — #351: every map on the site. A self-contained SVG polygon map
  (no Leaflet, no basemap or tile provider, no extra npm dependency) that fetches one of the
  `static/geo/` files and projects it in the browser. Choropleth props mirror Evidence's old
  `<AreaMap>` (`data`, `geoJsonUrl`, `geoId`, `areaCol`, `value`, `legendType`, `colorPalette`,
  `min`, `max`, `link`, `tooltip`, `title`); see the component's header comment for the rest.
  `components/AreaDrilldownMap.svelte` wraps it for the per-area profile pages (whole city with the
  area highlighted, plus a close-up with clickable sub-areas).
- `static/geo/` — generated GeoJSON export (gitignored, rebuilt via the script above); served at
  `/geo/<area_level>.geojson` in the built site.
- `evidence.config.yaml` — theme + plugin config; **DuckDB-only** by design (ADR-0012) — adding
  another datasource connector needs an ADR amendment.

## Learning more
- [Evidence docs](https://docs.evidence.dev/)
- [Evidence GitHub](https://github.com/evidence-dev/evidence)

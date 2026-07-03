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

# then, from web/:
npm install
npm run sources                  # materializes sources/gentriduck_marts/*.sql against data/serving/
npm run dev                      # live-reload dev server
npm run build                    # static build -> web/build/
```

No `MOTHERDUCK_TOKEN`, account, or network access is required to build or preview — the site
reads only the local `data/serving/*.parquet` snapshot.

## Layout
- `sources/gentriduck_marts/` — DuckDB source (`:memory:`, reads `../data/serving/*.parquet`
  directly via `read_parquet`); one `.sql` file per published mart.
- `pages/` — markdown + SQL pages (data-analyst-authored content; web-engineer owns structure).
- `evidence.config.yaml` — theme + plugin config; **DuckDB-only** by design (ADR-0012) — adding
  another datasource connector needs an ADR amendment.

## Learning more
- [Evidence docs](https://docs.evidence.dev/)
- [Evidence GitHub](https://github.com/evidence-dev/evidence)

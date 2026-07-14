# ADR-0019: Berlin displacement/affordability dimension — Milieuschutz source + rent-pressure proxy scope

- **Status:** Accepted
- **Date:** 2026-07-09

## Context

R-B1 (issue #70 [B1]) asks for a displacement & affordability dimension: gentrification *is*
displacement, but the live index measures amenity/social-status change only. Epic D already stages
open price/rent sources (Bodenrichtwerte, Mietspiegel, Wohnlage); what is missing is (a) a direct
**policy marker of displacement pressure** — designated protection areas — and (b) an
**affordability proxy** relating rent level to ability-to-pay.

Berlin's Hamburg counterpart (H-C5, #203) already has its side of this covered: Hamburg's
"Soziale Erhaltungsverordnungen" staging (`stg_hamburg_displacement_zones`, ADR-0014 Pillar 4) was
built ahead of Berlin's own equivalent, with an explicit code comment noting Berlin's #70 was
"blocked pending an architect ADR + maintainer source approval for FIS-Broker." This ADR resolves
that pending decision for the *Milieuschutz* (§172 BauGB soziale Erhaltungssatzung) half of #70 —
the exact same statute Hamburg's Erhaltungsverordnungen implement, so the two cities' staging
models are direct legal analogues, consistent with ADR-0005's city-agnostic seam.

**Why this doesn't need a fresh ping to the maintainer.** The candidate source
(`gdi.berlin.de/services/wfs`) is not a new domain or new access pattern — it is the *same* WFS
infrastructure, licence family (`dl-de-zero-2.0`), and adapter mechanics already approved and in
production for Berlin's Wohnlage (`ingest_wohnlage.py`), MSS outcome (ADR-0006), and MSS SES
indicators (ADR-0007). Per CLAUDE.md golden rule #2 ("consult the architect first"), this ADR *is*
that consultation — the same vehicle used for every prior `gdi.berlin.de` WFS layer in this repo. No
paid/proprietary/login-gated tool is introduced. This is a routine ADR, not a "genuinely ambiguous"
maintainer escalation.

## Decision

### 1. Milieuschutz areas — WFS source confirmed and adopted

**Endpoint (confirmed live via GetCapabilities + a GetFeature probe, 2026-07-09):**

```
https://gdi.berlin.de/services/wfs/erhaltungsverordnungsgebiete
```

Two feature types are published under this service, both implementing §172 BauGB but for
*different* protection purposes:

| Feature type | §172 BauGB purpose | Adopted? |
|---|---|---|
| `erhaltungsverordnungsgebiete:erhaltgeb_es` | Abs. 1 Nr. 1 — preserve urban/townscape character (*städtebauliche Eigenart*) | No — not a social/displacement marker |
| `erhaltungsverordnungsgebiete:erhaltgeb_em` | Abs. 1 Nr. 2 — preserve the composition of the resident population (*Erhaltung der Zusammensetzung der Wohnbevölkerung*) | **Yes — this is "Milieuschutz"** |

`erhaltgeb_em` is the layer commonly referred to in policy discourse as *Milieuschutzgebiete* — a
direct, legally-defined marker that the city considers a neighbourhood at risk of resident
displacement through redevelopment/luxury modernization. This is exactly the "protective
designation" proxy #70 asks for.

**Confirmed attributes** (live `GetFeature` sample, 2026-07-09, GeoJSON,
`outputFormat=application/json`, CRS `EPSG:25833` matching every other Berlin GDI layer):

```
schluessel   -- area code, e.g. "EM0105" (natural key)
bezirk       -- Bezirk name, e.g. "Mitte"
gebietsname  -- designation name, e.g. "Sparrplatz"
f_gvbl_dat   -- Gesetz-/Verordnungsblatt publication date (string)
f_in_kraft   -- date the designation took effect (string)
ae_gvbldat   -- amendment publication date, nullable
ae_inkraft   -- amendment effective date, nullable
fl_ha        -- area in hectares (string, needs numeric cast downstream)
```

No pagination is required (82 areas citywide as of 2026-07-09 — small, single-request dataset,
matching Hamburg's ~16-area scale of the same statute).

**Adapter:** `ingestion/berlin/displacement/ingest_milieuschutz.py`, mirroring
`ingest_hamburg_displacement.py`'s shape (single WFS fetch → GeoJSON → Shapely WKB → Parquet), using
the QA-2 (#177) shared `ingestion/common/http.fetch_geojson` + `common/io.atomic_write_parquet`
helpers (no new dependency; this is a genuinely new ingest script so it adopts the shared layer from
day one rather than adding another one-off to migrate later).

**Staging:** `stg_berlin_milieuschutz` — a straight polygon-attribute staging pull (area boundary +
designation name + Bezirk + effective date + area size), matching `stg_hamburg_displacement_zones`'s
shape 1:1 for the city-agnostic seam. **This is PLUMBING, not methodology** under CLAUDE.md's R-C1:
no weighting, scoring, or index-construction logic — it does not touch the methodology-bearing file
list and does not trigger the geo-DS/domain-expert gate.

**Licence:** `dl-de-zero-2.0` (no attribution legally required; credited anyway per this repo's
convention) — same licence as every other `gdi.berlin.de` layer already ingested.

### 2. Affordability / rent-pressure proxy — scoped, not built in this ADR

ADR-0007 documented an explicit gap: Berlin's best PLR-grain SES source (MSS `indexind`) carries no
income variable. There is therefore **no PLR-grain income series** anywhere in the pipeline, so a
literal "rent-to-income" ratio cannot be built honestly. This ADR scopes the affordability proxy as:

**rent level (already-staged Mietspiegel, `stg_berlin_mietspiegel` / `int_price_rent_wohnlage_mietspiegel`)
relative to the citywide/PLR median, combined with the SES transfer-receipt share
(`stg_berlin_mss_indicators`, ADR-0007) as an ability-to-pay-stress proxy** — not a true burden
ratio. Both components already exist in the pipeline; no new source is needed for this half.

**This proxy formula, and its integration into an intermediate sub-index or the governed
`gentrification_index`, is explicitly deferred to a follow-up gated slice** (touches
`transform/models/intermediate/*` / the index mart — methodology-bearing under R-C1, requiring
geo-data-scientist + gentrification-domain-expert sign-off per R-A1's grounding pattern). **(Follow-up now tracked: #258 (D5-wire) — see `docs/planning/deferred-work-audit-2026-07/README.md`.)** This ADR
only fixes the *sourcing* decision, consistent with keeping ADRs and methodology work as separate,
independently-reviewable slices (the same pattern ADR-0006/0007 used ahead of R-A1/R-A2).

### 3. Turnover / Wohndauer proxy — out of scope for this ADR

#70's third candidate (residential-fluctuation proxy from EWR) needs coordination with R-A5's (#68)
EWR indicator-semantics audit and is left for a later #70 slice; no source decision is made here.

**Update (2026-07-09):** #68 closed with `docs/methodology/indicator-semantics.md`, confirming
`residence_duration_5y_share` (EWR DAU5) semantics and the thesis's own negated-change convention.
No new source was needed — the proxy (`int_berlin_turnover_proxy`) reuses the already-sourced EWR
`residence_duration_5y_share` field. See `docs/methodology/B1-turnover-geo-signoff.md` and
`docs/methodology/B1-turnover-domain-signoff.md` (both `PASS`) for the gated methodology review.

## Alternatives considered

### A — `erhaltgeb_em` WFS layer (GDI Berlin) — **CHOSEN** for Milieuschutz areas

Already-approved domain/licence/adapter pattern (identical to Wohnlage/MSS/MSS-indicators);
authoritative (Senate-published, legally binding designation); no login; small dataset, cheap to
ingest and refresh.

### B — FIS-Broker WMS/download portal (fbinter.stadt-berlin.de) direct download — REJECTED for now

FIS-Broker also republishes Erhaltungsgebiete via its map viewer, but `gdi.berlin.de`'s WFS is the
scriptable, already-integrated channel this repo standardized on (Wohnlage, MSS, MSS-indicators) —
no reason to introduce a second Berlin geodata access pattern for the same dataset family.

### C — Literal rent-to-income ratio using a fabricated/estimated income series — REJECTED

Would violate R-C2 (grounding rule): no real PLR-grain income series exists in this pipeline
(ADR-0007's documented gap). Fabricating one to compute a ratio is exactly the kind of ungrounded
methodology choice R-C1/R-C2 exist to prevent. The rent-level-relative-to-median + transfer-receipt
proxy (Decision 2) is honest about being a proxy, not a ratio.

## Consequences

- `stg_berlin_milieuschutz` becomes available as a boolean/polygon marker of "this area is under a
  soziale Erhaltungsverordnung as of `f_in_kraft`" — usable both as a current-state disclosure and,
  via the effective date, a coarse historical flag ("was this area designated before/after year X").
- Zero consumers as of this ADR (mirrors QA-6/#181's treatment of the Hamburg equivalent) — the
  consuming intermediate/sub-index slice is a separate, gated follow-up under #70.
- `docs/methodology/` and G2 (#38) will need a caveat once the sub-index lands: Milieuschutz
  designation is a *policy* marker (city already recognizes displacement risk), not a *measured*
  displacement outcome — areas without a designation are not thereby "safe from displacement," only
  "not (yet) formally protected."
- City-agnostic seam upheld: Berlin's Milieuschutz and Hamburg's Erhaltungsverordnungen are both
  staged as `stg_<city>_displacement_zones`-shaped models (same columns, same statute), so a future
  shared `int_displacement_zones` model can union them without city-specific logic leaking into
  marts.

## Open questions

1. **`fl_ha` (area hectares) is a string in the raw WFS response** — cast to numeric in staging or
   left as-is pending a concrete consumer; deferred to the follow-up sub-index slice.
2. **Historical Milieuschutz vintages.** The WFS exposes only the *current* designation set (with
   `f_in_kraft`/`ae_inkraft` dates) — there is no separate "as published in year X" edition endpoint
   analogous to Wohnlage's per-year WFS. A time-series view of designation status must be
   reconstructed from the effective-date columns, not from multiple WFS editions. Document this
   limit in G2 when the sub-index lands.
3. **Rent-pressure proxy exact formula and its sensitivity** — left to the geo-data-scientist +
   gentrification-domain-expert gated slice (Decision 2).

## References

- Issue #70 [B1]: displacement & affordability dimension
- ADR-0006 (Berlin MSS data source), ADR-0007 (Berlin SES indicators) — same WFS domain/licence
  precedent this ADR follows
- ADR-0014 (Hamburg data sources, Pillar 4) — the Hamburg Erhaltungsverordnungen analogue already
  staged (`stg_hamburg_displacement_zones`)
- `ingestion/hamburg/displacement/ingest_hamburg_displacement.py` — implementation template mirrored
  here
- GDI Berlin WFS GetCapabilities (confirmed live 2026-07-09):
  `https://gdi.berlin.de/services/wfs/erhaltungsverordnungsgebiete?request=GetCapabilities&service=WFS`
- GDI Berlin dataset docs:
  `https://gdi.berlin.de/data/erhaltungsverordnungsgebiete/docs/erhaltgeb.pdf`,
  `https://gdi.berlin.de/data/erhaltungsverordnungsgebiete/docs/datenformatbeschreibung_erhaltgeb.pdf`
- Senate background: <https://www.berlin.de/sen/stadtentwicklung/quartiersentwicklung/stadterneuerung/soziales-erhaltungsrecht/>
- Datenlizenz Deutschland Zero 2.0: <https://www.govdata.de/dl-de/zero-2-0>

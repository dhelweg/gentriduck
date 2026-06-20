# D1b discovery — Kauffälle (property transactions) Berlin WFS (#53)

Domain-expert discovery note. Scope: does an open Kauffälle/Kaufpreissammlung WFS exist, and is
it usable as a D1b property-market signal for the Gentriduck index? Not a full analysis.

## Finding: **FOUND** (open WFS, per-year layers)

Berlin's *Gutachterausschuss für Grundstückswerte* publishes the **AKS Kauffälle**
(Automatisierte Kaufpreissammlung — registered, completed property transactions) as annual
WFS/WMS layers on the open-data portal, served from `gdi.berlin.de`. ADR-0003 covered
Bodenrichtwerte, Mietspiegel/Wohnlagen and the IBB report but **did not** include Kauffälle —
this is the gap #53 targets.

## Source URLs

- Portal (dataset listing, tag *Immobilienpreise*): https://daten.berlin.de/datensaetze?tags=Immobilienpreise
- 2024 WFS dataset page: https://daten.berlin.de/datensaetze/kauffalle-2024-bebaute-unbebaute-grundstucke-wohnungs-und-teileigentum-wfs-901314d5
- 2025 WFS dataset page: https://daten.berlin.de/datensaetze/kauffalle-2025-bebaute-unbebaute-grundstucke-wohnungs-und-teileigentum-wfs-55c18c0e
- AKS-online (Blockkarte context): https://www.berlin.de/gutachterausschuss/marktinformationen/aks-online/

## Layer name & WFS GetCapabilities

- Service path pattern (one service **per year**): `gdi.berlin.de/services/wfs/kauffaelle_<YEAR>`
- Confirmed 2024: `https://gdi.berlin.de/services/wfs/kauffaelle_2024?request=GetCapabilities&service=WFS`
- Teilmärkte (submarkets) per layer: **unbebaute Grundstücke / bebaute Grundstücke /
  Wohnungs- und Teileigentum**. The last (condominiums) is the most relevant gentrification
  signal — it tracks the dwelling-ownership market where displacement-via-conversion occurs.

## Coverage

- **Years:** rolling annual layers; 2024 and 2025 confirmed live. Each completed year is a
  separate service (so ingestion must enumerate years, not assume one endpoint).
- **Geographic level:** transactions are published mapped to the **block (Block/Blocknummer)**
  the property sits in, *not* raw addresses — the AKS deliberately anonymizes to block
  resolution. The portal's "Geographische Granularität: Berlin" field is the coverage extent,
  not the feature geometry. **Caveat to verify at ingest:** confirm whether the public WFS
  carries per-block point/polygon features with price attributes, or only symbolised map
  features without usable €-values (the detailed Kaufpreissammlung itself is fee-based via the
  Gutachterausschuss). This determines whether D1b yields a price signal or only a transaction-
  *count/dynamism* signal.

## License

**Datenlizenz Deutschland – Zero – 2.0 (dl-de-zero-2.0)** — public-domain-equivalent, free
reuse, no attribution legally required. Consistent with ADR-0003's other Senate price layers; we
should still credit "Senatsverwaltung … / Gutachterausschuss für Grundstückswerte" for trust (G3).

## Recommendation

**Suitable for ADR — recommend spawning `system-architect` to amend ADR-0003** (add Kauffälle as
source P-D) or open a focused ADR. Domain rationale:

- Property-transaction *volume/turnover* is a recognised gentrification lead indicator (rent-gap
  realisation, Smith; ownership turnover precedes social succession, Dangschat). It complements
  Bodenrichtwerte (structural land value, slow) with **market dynamism** (transaction churn).
- **Theory caveat for the methodology gate:** treat Kauffälle as a *predictor/dynamism* signal,
  not as a displacement *outcome*. A transaction is not a displacement; ownership change ≠
  tenant turnover. Block-level resolution must be areal-interpolated to PLR (geo-DS to sign off
  on the spatial method and on whether €-values or only counts are available).

**Alternative if WFS lacks usable prices:** fall back to the already-accepted **Bodenrichtwerte**
(ADR-0003 P-A) as the structural price proxy, and use Kauffälle purely as a transaction-count
dynamism layer. Either way the source is open and ingestion-ready.

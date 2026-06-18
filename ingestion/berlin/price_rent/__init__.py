"""
ingestion/berlin/price_rent
============================
D1 — Berlin price and rent data ingestion.

Sources:
  - Bodenrichtwerte 2024  (WFS GDI Berlin, dl-de-zero-2.0)
  - Wohnlagen Mietspiegel 2023 (WFS GDI Berlin, dl-de-zero-2.0)

Scripts:
  ingest_bodenrichtwerte.py  -- BRW land value zones polygon WFS
  ingest_wohnlage.py         -- Address-level Wohnlage classification WFS

Both scripts write Parquet files to data/raw/berlin/price_rent/.
"""

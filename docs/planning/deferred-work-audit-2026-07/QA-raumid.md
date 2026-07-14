# [QA-raumid] Fix un-padded raum_id at source + repo-wide un-padded-join audit

- **Issue:** [#266](https://github.com/dhelweg/gentriduck/issues/266)
- **Tier:** 2 · **Epic:** — · **Labels:** `dbt,data`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](./README.md))

---

**Why:** #200 fixed one un-padded `raum_id` join (the 7-vs-8-char mismatch that silently dropped 79% of PLRs in `e1_regressions.py`). Its geo-signoff noted the fix "does not audit whether the same inconsistency affects any *other* pipeline … a broader repo-wide grep for un-padded `raum_id` usage would be good due diligence for a future ticket." Separately, the I18 geo-signoff recommends fixing the thesis-golden `raum_id`s at source (`int_thesis_2018_area_index.sql` currently `lpad`s defensively in every consumer) "rather than defensively re-padding in every consumer … out of scope here, but worth tracking." Neither is filed.

**Goal:** Eliminate the latent 7-vs-8-char `raum_id` / `area_code` padding hazard repo-wide: fix at source where possible, and audit every join for the same class of silent-drop bug.

**Scope:**
- Repo-wide grep/audit of `raum_id` / `area_code` joins across dbt models and `analysis/*.py` for un-padded (7-char) vs zero-padded (8-char PLR / 6-char BZR) mismatches.
- Normalise at source in `int_thesis_2018_area_index.sql` (emit padded `area_code`) so consumers don't each re-`lpad`.
- Add a dbt test / assertion catching un-padded area codes at the staging boundary so this can't regress silently.

**Acceptance:**
- Audit findings documented; source-side padding applied; a guard test added; row-count parity confirmed on affected joins; `uv run poe build` green.

**Gate:** DE pair → reviewer. Not methodology-bearing (mechanical data-quality), but reviewer confirms no row-count/result changes beyond the intended un-drop.

**Deps:** #200 (closed). Touches `int_thesis_2018_area_index`, `dim_area`, and any `raum_id` consumer.

**Source (why this is unfiled work):** `docs/epic-e/R200-areacode-padding-fix-geo-signoff.md` ("repo-wide grep … for a future ticket"); `docs/epic-i/I18-geo-signoff.md` ("small standalone data-quality ticket … worth tracking").

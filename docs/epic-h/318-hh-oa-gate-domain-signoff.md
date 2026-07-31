---
task: H-C5-OA / #318 — Make the Hamburg OA completeness-contamination gate reproducible from committed code (+ durable Hamburg result doc)
author: gentrification-domain-expert
date: 2026-07-25
branch: feature/318-hh-oa-gate-reproducible
---

# Domain sign-off — #318 city-parametrized OA completeness-contamination gate + Hamburg addendum

- **Branch:** `feature/318-hh-oa-gate-reproducible` (off `develop`; working tree: two tracked files
  modified — `analysis/d_oa_mode_comparison.py`, `docs/methodology/OA-D5-mode-comparison-findings.md`
  — plus one untracked new file, `docs/methodology/OA-D5-hamburg-addendum.md`).
- **Issue / task:** #318 — a narrow follow-up to #312, closing that sign-off's Condition R4 ("make
  `run_contamination_gate` city-agnostic … the Hamburg numbers come from an ad-hoc filter swap, so
  the Hamburg gate is not yet reproducible from committed code").
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
  This is the **domain half** of the R-C1 dual gate; the paired geo-data-scientist verdict on
  statistical soundness is produced independently.
- **Why this needs a domain sign-off at all:** `analysis/*.py` is *unconditionally* on CLAUDE.md's
  methodology-bearing file list, so a sign-off is required even though the change touches no
  indicator, weight, normalization, threshold, join grain, or spatial method.
- **Artefacts reviewed:** the full `git diff develop` (both tracked files); the new
  `docs/methodology/OA-D5-hamburg-addendum.md` in full; `render_report`'s summary-table logic in
  `analysis/d_oa_mode_comparison.py` (lines ~858–884); the §4 body of the regenerated
  `OA-D5-mode-comparison-findings.md` (lines 192, 206); and the two #312 sign-offs this builds on
  (`docs/epic-h/312-hh-oa-geo-signoff.md` Condition R4, `docs/epic-h/312-hh-oa-domain-signoff.md`).

## What actually changed (scoping the review)

No production math, indicator definition, threshold, coverage proxy, or normalization changed. The
diff is **tooling + documentation**:

1. A `_city_filter_sql(city_code, alias)` helper that replaces the two previously Berlin-hardcoded
   `WHERE` fragments in `load_methods_level` and `run_contamination_gate`. Default `'BER'`
   reproduces the prior Berlin filter (`lower(city_code)='berlin' OR city_code='BER'`) byte-for-byte;
   any other code (e.g. `'HH'`) is matched case-insensitively and parameter-bound.
2. A `--city-code` CLI flag. Default `'BER'` runs the full six-deliverable Berlin report exactly as
   before. Any other city runs **only** the completeness-contamination gate (deliverable 4) and
   prints its table to stdout — writing no file.
3. A defensive change to the delta partition: the year-over-year groupby key becomes
   `(city_code, area_code)` instead of `area_code`. For a single-city result set this changes no
   numbers (one distinct `city_code`), and it honors #312/R4's documented `area_code`-collision
   caution if a future caller ever unions cities. (Statistical correctness is the geo-DS lane; from a
   domain view it changes nothing about *what* is measured.)
4. A new hand-maintained `OA-D5-hamburg-addendum.md` recording the Hamburg gate result (9/9 pass,
   |rho| ≤ 0.043), plus a pointer to it from the regenerated Berlin findings doc.

The core question for my gate — *does this change what "Offering Advantage" means, or how
completeness bias is tested for Hamburg vs Berlin?* — answers cleanly: **no**. The gate remains the
same temporal-contamination check (per-area OA delta vs city-wide coverage-proxy delta, fail at
|rho| ≥ 0.3 & p < 0.05), on the same join grain, against the same city-own coverage proxy
`all_domains_stock_city`. Hamburg is not measured differently from Berlin; the *identical* query
shape is now merely re-runnable for either city from one committed command instead of an uncommitted
filter swap. This is a reproducibility/durability change, not a methodology change.

## a. Does the Hamburg addendum's framing / caveats match the domain record?

**Yes.** The addendum is faithful to the #312 domain and geo sign-offs and does not overclaim:

- It is explicit that this is **tooling/reproducibility only** — "no change to the indicator,
  weights, normalization, or the |rho| ≥ 0.3 & p < 0.05 threshold … only which city's rows are
  queried" — which matches my read of the diff exactly.
- It carries the **per-cell caveat at the Berlin floor**: "a citywide, per-method PASS here is
  evidence, not by itself an authorization for a live year-over-year OA delta anywhere on the
  Hamburg site … (OA-D7 page's own carried-forward condition)." This is the same standing caveat the
  #312 domain sign-off (§c, §d) and geo sign-off (Condition 2) require, correctly transferred.
- It handles `percapita` honestly: determinate for Hamburg (n=9340, multiple EWR-reference-year
  transitions) where it is indeterminate for Berlin (n=540, single transition) — the same asymmetry
  both #312 sign-offs recorded — and still passing.
- It documents third-decimal drift vs #312's ad-hoc run (density 0.043 vs 0.039) as ordinary
  warehouse-refresh noise with no pass/fail flip, which is the correct, non-inflating framing.
- The durability design is sound: keeping the Hamburg record in a *separate hand-maintained* file
  rather than as a hand-added section inside the script-regenerated Berlin findings doc is exactly
  right — a hand edit inside the auto-generated file would be clobbered by the next Berlin refresh.

**On the #313 "narrower EWR-equivalent composite" comparability caveat specifically:** I checked
whether its omission from the addendum is a gap. It is **not** — it is correct scoping. This gate
does not touch Hamburg's socio-economic composite at all: it correlates OA-method deltas against the
*POI coverage proxy* (`all_domains_stock_city`), and the only EWR contact point is `percapita`'s
denominator, which is resident **population count**, not the narrower status composite from #313.
Injecting the #313 composite caveat here would wrongly imply the contamination gate depends on the
social-status side, which it does not. The place for the #313 narrower-composite caveat is the
Hamburg *trajectory / status-outcome* framing (where #314 already carries it), not this
coverage-contamination reproducibility doc. I affirm the addendum was right to leave it out.

## b. One non-blocking observation on the regenerated Berlin findings doc

Running the script to produce the current output also **regenerated** `OA-D5-mode-comparison-findings.md`.
Two effects worth recording:

1. **Berlin §4 numbers refreshed** (e.g. nested_lq 0.053→0.046, shrunk_lq p 0.0145→0.1171,
   zscore_slq p 0.0035→0.2128). I verified **no pass/fail or "Confirmed?" verdict flips** — every
   method stays `temporal-safe` with its prior classification. This is warehouse-refresh noise;
   conclusions are stable. Fine.
2. **A hand-added domain annotation was silently reverted.** The summary table's density row, whose
   final column ("Empirically temporal-safe") had been *hand-edited* in the committed doc to read
   `citywide only -- not a per-cell PASS`, was overwritten back to the machine value `yes` (the code
   at line ~879 only ever emits `yes` / `**NO**` / `n/a`). This is — ironically — the *exact*
   clobber-a-hand-edit failure mode #318 is fixing for the Hamburg record. It is **non-blocking**
   because the load-bearing per-cell caveat is **not** lost from the document: it survives verbatim
   and prominently in the §4 body (lines 192 and 206: "*This does not, by itself, authorize a live
   year-over-year delta on the OA-D7 page … not the per-cell completeness flag that page's own
   carried-forward condition requires*"), and under the column's literal header ("Empirically
   temporal-safe") `yes` is in fact the honest answer for density (it passed the temporal gate). So
   no reader-facing over-claim is introduced. My recommendation (below) is to make the caveat
   code-emitted rather than re-hand-editing it (which would just clobber again).

## c. Public-facing framing / ethics

**No new public claim, no ethics regression.** The addendum is explicitly an internal reproducibility
record; the `--city-code HH` path **writes no file** and does not touch any public web surface. The
live `/hamburg/poi-map` and `/berlin/poi-map` pages are untouched by this diff. The anti-erasure /
suppression / "blank ≠ commercially dead" governance validated in #312 is unaffected — this change
adds no map, no metric, and no year to any public page. The descriptive-not-causal posture and the
"citywide PASS is evidence, not authorization" caveat are both preserved. The three G2-methodology
forward-guidance items from the #312 domain sign-off (R-D1 inline directional anti-erasure caveat on
the Hamburg page; R-D2 density-delta temporal caveat next to the toggle; R-D3 structural-vs-empirical
invariance framing) remain open and are neither advanced nor regressed by #318.

## Recommendations (all non-blocking)

- **R-318-1 (durability parity).** To fully live up to #318's own durability principle, make the
  density "citywide only, not a per-cell PASS" caveat **code-emitted** (a footnote or a qualified
  cell value keyed off `expected_temporal_safe=false` + absolute reference point) so it survives the
  next Berlin regeneration, rather than relying on a hand edit that will be clobbered again. Until
  then, the §4 body caveat (lines 192/206) is sufficient and should not be removed.
- **R-318-2 (optional cross-link).** The addendum's scope note names only the temporal per-cell
  caveat (correct — this is a temporal gate). A one-line pointer to the #312 domain sign-off's
  *cross-sectional* under-mapping-gradient caveat (Hamburg's sharper Elbe divide, Haklay 2010) would
  help a reader not mistake a temporal-axis PASS for cross-sectional completeness safety. Optional,
  not required, since the two axes are clearly distinct and the cross-sectional axis is out of this
  gate's scope.

## Scope / residual notes

- SEC-3 untrusted-input: this assessment derives solely from the repo diff, repo files, and the local
  warehouse; no external/web content informed it.
- I take the statistics (row counts, rho values, delta-partition equivalence) on trust per my remit;
  the paired geo-data-scientist sign-off covers statistical soundness and must also record PASS
  before PM integration into `develop` (R-C1).

## Verdict

`#318` changes **no indicator, weight, normalization, threshold, join grain, coverage proxy, or
spatial method** — it parametrizes an already-approved gate by `city_code` (default Berlin behavior
preserved byte-for-byte), adds a defensive delta-partition key, and durably documents the Hamburg
result (9/9 pass, |rho| ≤ 0.043) that #312 had already accepted from an uncommitted run. "Offering
Advantage" means the same thing, and completeness bias is tested the same way, for Hamburg and
Berlin. The addendum's caveats match the domain record, correctly scope out the #313 socio-economic
composite (which this coverage gate does not use), and introduce no public claim or ethics
regression. The one substantive artifact — a hand-added density caveat reverted by regeneration — is
non-blocking because the load-bearing per-cell caveat survives in the §4 body; I record R-318-1 to
make it durable.

```json
{
  "verdict": "pass",
  "domain_rationale": "Tooling/reproducibility change only: parametrizes the OA completeness-contamination gate (load_methods_level, run_contamination_gate) by city_code so the already-approved #312 Hamburg gate re-run is reproducible from committed code, closing #312/R4. No indicator, weight, normalization, |rho|>=0.3 & p<0.05 threshold, join grain, or coverage proxy (all_domains_stock_city) changed -- 'Offering Advantage' means the same thing and completeness bias is tested identically for Hamburg and Berlin. The new OA-D5-hamburg-addendum.md faithfully carries the Berlin per-cell caveat ('evidence, not authorization for a live YoY delta'), handles Hamburg's determinate percapita honestly, and its separate hand-maintained-file design avoids the regeneration-clobber failure mode. The #313 narrower EWR-equivalent composite caveat is correctly omitted -- this gate uses the POI coverage proxy, not the social-status composite (only percapita's denominator touches EWR, as resident count). Internal doc; no public claim, no ethics regression, public poi-map pages untouched.",
  "theory_risks": [
    "Regenerating the Berlin findings doc silently reverted a hand-added domain annotation in the density summary-table cell ('citywide only -- not a per-cell PASS' -> 'yes'); non-blocking because the load-bearing per-cell caveat survives in the §4 body (lines 192, 206) and 'yes' is the honest value under that column's literal 'Empirically temporal-safe' header -- but it is the exact clobber-a-hand-edit anti-pattern #318 fixes for the Hamburg record.",
    "Berlin §4 rho/p values refreshed (warehouse noise); verified no pass/fail or Confirmed? flip -- conclusions stable.",
    "This is a temporal-contamination gate only; the cross-sectional under-mapping-gradient axis (Hamburg's sharper Elbe divide, Haklay 2010, per #312 domain sign-off) is out of scope here and handled by suppression/disclosure, not this gate -- unchanged by #318."
  ],
  "recommendations": [
    "R-318-1: make the density 'citywide only, not a per-cell PASS' caveat code-emitted so it survives the next Berlin regeneration, rather than re-hand-editing it; until then the §4 body caveat is sufficient and must not be removed.",
    "R-318-2 (optional): add a one-line cross-link in the addendum to the #312 domain sign-off's cross-sectional-gradient caveat so a temporal-axis PASS is not misread as cross-sectional completeness safety.",
    "Integrate into develop once the paired geo-data-scientist sign-off also records PASS (R-C1).",
    "Carry the still-open #312 G2 forward-guidance (R-D1/R-D2/R-D3) as before -- neither advanced nor regressed by #318."
  ]
}
```

Verdict: PASS

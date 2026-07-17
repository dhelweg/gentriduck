# Geo-Data-Scientist Sign-off: R-B2b Test D (Dynamism/D2 back-test)

- **Scope:** R-B2b #264 — Test D added to `analysis/backtest_index.py` (+ regenerated `docs/methodology/backtest.md`). **Scope item 1 only.** Scope item 2 (extending `seed_gentrification_ground_truth`) is deliberately deferred and reviewed separately under domain-expert judgment.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-16
- **Branch:** `feature/264-r-b2b-dynamism-backtest`
- **Verdict:** PASS

---

## What Test D actually is

Test D computes Spearman rank correlation between `gentrification_index.dynamism_index`
(`live_data` variant, latest period) and `int_gentrification_ts.dynamik_index` at the
latest MSS edition, joined on `area_code`. It mirrors Test A's design exactly, one
dimension over (D2 Dynamik instead of D1 Status), with the same thresholds
(rho > 0.3, p < 0.05).

I independently re-ran the harness: **Test D rho = 1.0000, p = 0.0000, n_paired = 535,
3 distinct classes (range 1.0–3.0), MSS edition 2025 — PASS.** All four tests PASS overall.

## Is the mirrored design appropriate for D2? — Yes

I verified the derivation of both columns from source rather than trusting the summary:

- `transform/models/marts/gentrification_index.sql:135` — the `live_data`
  `dynamism_index` is literally `cast(ts.dynamik_index as double)`, i.e. the D2 MSS
  Dynamik ordinal from `int_gentrification_ts` passed through the mart's join
  (edition selection, `lor_2021` vintage filter, uninhabited exclusion, `area_code` join)
  and cast to double.
- `int_gentrification_ts.dynamik_index` is the same MSS D2 ordinal sourced directly
  from `stg_berlin_mss` (`int_gentrification_ts.sql:15,184`).

So Test D is, correctly and by construction, the **D2 analogue of Test A**: a
mart-vs-intermediate pipeline-alignment cross-check on the same ordinal, not an
independent statistical claim about dynamism as a construct. The docstring, the
`backtest.md` prose, and the DE summary all frame it exactly this way — honestly and
without overclaiming.

The open question — whether D2's "different statistical properties (volatility/noise)"
warrant a different test design or threshold — **does not apply here.** That concern
would be valid if Test D validated dynamism against an *external, independent* truth
(where D2 could plausibly be noisier than D1). It does not: both sides are the identical
MSS D2 ordinal reached by two model paths. There is no measurement noise to accommodate;
the ranks are identical by construction, ties included (Spearman on identical tie
structure on both variables is exactly 1.0). Mirroring Test A is the consistent and
defensible choice, and inventing a bespoke threshold or a different statistic for D2
would create a false impression that a different construct is being validated.

## Is rho = 1.0000 suspicious / vacuous? — Expected, and not vacuous

rho = 1.0 is the **mathematically inevitable** result of correlating a rank-preserving
`cast(... as double)` of a column against that same column. It is exactly what Test A
already produces for D1 (also rho = 1.0000, 535 pairs) — a value the prior R-B2 sign-off
accepted. It is *not* a red flag.

Nor is it vacuous. The mart column is not the raw source returned twice; it flows through
the mart's edition/vintage/uninhabited filters and an `area_code` join. Test D therefore
does catch real, previously-observed classes of pipeline bug: wrong MSS edition selected
in the mart vs the intermediate, vintage-join drift, `area_code` zero-padding mismatches
(cf. the R200 padding fix), polarity/cast regressions, and row dropouts (a partial join
break shows up as n_paired shrinkage and/or rho degradation). It is a weak-but-real
regression guard, correctly scoped.

## Concerns / recommendations (non-blocking)

1. **Threshold is loose relative to the expected value.** Because the mathematically
   expected value here is exactly 1.0, the `rho > 0.3` floor is a very permissive gate —
   a substantial partial misalignment could still pass. A strictly stronger and more
   honest check would assert `rho ≈ 1.0` (e.g. `>= 0.999`) *and* row-count parity
   (`n_paired == n_valid` on the shared domain) or exact per-row ordinal equality.
   This same critique applies verbatim to the already-signed-off Test A, so for
   consistency I do **not** block on it — but I recommend a follow-up ticket to tighten
   *both* Test A and Test D to an exact-alignment assertion, since Spearman rho is a
   weaker instrument than the equality it is standing in for.
2. **Keep the "proposed / pending confirmation" language until integration.** The
   docstring and `backtest.md` currently mark Test D as pending geo-DS/domain
   confirmation. This sign-off resolves the geo-DS half; the language may be finalized
   once the domain-expert half lands.

Neither concern affects correctness of meaning or the PASS result. Lint reported clean
(verified upstream) and the harness runs deterministically with the documented
data-presence guards intact.

---

**Verdict: PASS**

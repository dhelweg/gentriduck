# NZ1 (#290) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** branch `feature/290-nz1-fdr-nan-z-guard`, implementation commit
  `391aa8c5` (NOT yet merged into `develop`) — the NZ1 remediation in
  `analysis/f_oa_getis_ord.py` (`run_gi_star_for_scope`): force `gi_star_p = NaN` whenever the
  esda Gi\* z-score is NaN, so degenerate all-zero-stock domain-years are excluded from both BH
  FDR families rather than leaking a floor `p_sim = 0.001` into the pool.
- **Date:** 2026-07-22
- **Grounding (R-C2):** `docs/methodology/OA-D3c-followup-geo-signoff.md` finding NZ1 (the prior
  independent re-review that discovered this); OA-D3c geo sign-off CC1/CC2/CC3; ADR-0025; ADR-0010;
  Benjamini & Hochberg (1995), *JRSS B* 57(1) — the step-up FDR procedure and its hypothesis-family
  definition; Caldas de Castro & Singer (2006), *Geographical Analysis* 38 — FDR for local spatial
  statistics ("one map = one family"); Getis & Ord (1992); Ord & Getis (1995).

> **Independence statement (R-C1).** This is a genuine, fresh, independent review turn. I worked
> from the primary artefacts only — `gh issue view 290`, the `git show 391aa8c5` diff, the source
> `analysis/f_oa_getis_ord.py`, the prior NZ1 finding, and my own re-execution against the
> regenerated parquet outputs. I did **not** read or rely on any pre-existing PM-authored or draft
> sign-off for #290; I searched and none exists. I re-derived the disputed output change from first
> principles and reproduced every headline number myself rather than trusting the implementer's or
> reviewer's account.

---

## Verdict: PASS

The fix is statistically correct, is the **best-justified** of the plausible alternatives (not an
overcorrection), and is cleanly implemented. It closes NZ1 exactly as recommended, leaves the
published mart surface and the primary hot/cold headline numbers untouched, and the one non-trivial
output change (pooled-secondary `lor_pre2021` PLR dropping from 577 to 0 real significant cells) is
a **correct removal of false positives**, not a regression. No conditions block integration into
`develop`. CC2/CC3 disclosure conditions from OA-D3c-followup remain carried forward and binding for
the G2 page (unchanged by this ticket).

---

## The methodology judgment call: is full exclusion (p=NaN) correct, or an overcorrection?

This is the crux the task rightly flags. There are three candidate treatments for a degenerate
all-zero-stock cell (z = NaN, esda floor p = 0.001):

1. **Floor p = 0.001, kept in the pool** (the pre-fix bug).
2. **p = 1, kept in the BH denominator `m`** (counted as a "tested-but-non-significant" hypothesis).
3. **p = NaN, fully excluded from `m`** (the chosen fix).

**Full exclusion (3) is the statistically principled choice.** BH corrects a *family of tested
hypotheses*. A cell where all-zero local stock gives Gi\* no variance has **no null permutation
distribution and no test statistic** — it is not a hypothesis that was tested and failed to reject;
it is a hypothesis that was never testable. It therefore does not belong in the family `m` at all.
Excluding it is the same treatment the pipeline already gives every other NaN-p unit
(`a6_hotspots.py` / `a9_spatial_dynamic.py` convention), so the fix is also internally consistent.

- Option **1** is indefensible: it counts a phantom non-test as the most-significant possible
  observation (0.001 is the permutation floor at `permutations=999`, i.e. `1/1000`), contaminating
  the family with ~4928 min-p ties.
- Option **2** (p=1 in the denominator) is *safe-direction* but methodologically wrong and
  strictly **over-conservative**: it inflates `m` by non-tests, which lowers the `k/m·α` threshold
  line for every genuine cell and suppresses real discoveries below the level the true family would
  yield. It buys nothing over exclusion except a loss of power, and it still misrepresents a
  non-test as a tested hypothesis.

So the fix is not an overcorrection — it is the tighter and more honest of the two defensible
options. **PASS on the core judgment.**

## Why the pooled `lor_pre2021` PLR count drops 577 → 0 — and why that is *correct*

I reconstructed the pre-fix pooled family from the regenerated parquet (re-inserting floor
`p=0.001` for the NaN-z cells and re-running BH per snapshot-year across all domains), and reproduced
the exact figures:

| pooled-secondary, lor_pre2021 PLR | significant cells |
|---|---|
| pre-fix, total (incl. phantom) | **5505** |
| pre-fix, real (non-degenerate) cells only | **577** |
| post-fix | **0** |

The mechanism, confirmed from first principles: the ~4928 phantom cells all tie at the permutation
**minimum** p (0.001), so they occupy the lowest ranks of the pooled sort. This does two things to a
genuine real cell at real-family rank `r`: it pushes its rank to ≈ `r + 4928`, and it inflates the
family size to `m + 4928`. Its BH threshold moves from `(r/m)·α` to `((r+4928)/(m+4928))·α`, which is
**larger** (since `r < m`). In other words, the phantom min-p ties *raise* the acceptance threshold
of real cells and spuriously flag them. The 577 pre-fix "real significant" cells in the pooled
variant were therefore **false positives manufactured by the contamination** — precisely the failure
mode NZ1 describes. Removing the phantoms restores the correct, stricter threshold, and none of the
`lor_pre2021` real cells clear it. The drop to 0 is the fix working, not an overcorrection. (The
pooled variant is a deliberately conservative cross-domain scan and legitimately reports 0 here;
`lor_2021` pooled was already 0 pre-existing.)

Note this contamination bites the **pooled** family specifically because pooling mixes the phantom
degenerate-domain cells with real populated-domain cells in one BH batch. The **primary** family
never does, which is why it is unaffected (below).

## Empirical verification of the "unaffected" claims (re-run against post-fix parquet)

All queried directly from the regenerated outputs on this branch:

- **Primary per-domain-per-map family, `lor_2021` PLR:** `{ns: 42168, hot: 72, cold: 36}` —
  **exactly** the 72 hot / 36 cold in `OA-D3c-followup-geo-signoff.md`. Unchanged. The primary
  family batches each `poi_domain_h` separately, so a degenerate domain-year forms its own
  all-phantom batch and cannot contaminate a populated domain's threshold; and `lor_2021`'s recent
  years have real stock in these domains, so no phantom cells arise there at all. **Confirmed.**
- **Degenerate domain-years** carrying NaN-z at `lor_pre2021` PLR: Office 2008–2013, Vacancy
  2008–2011, Services 2008 — 4928 rows, matching the all-zero-stock diagnosis.
- **Post-fix NaN-z rows:** all 4928 now carry `gi_star_p = NaN`, `gi_star_p_fdr = NaN`,
  `gi_star_fdr_significant = False`, `..._pooled_alldomains = False`, and
  `gi_star_cluster_label = 'ns'` (100%). The bogus floor p is gone at the staging layer too — this
  fixes the direct-`stg_oa_getis_ord`-consumer exposure NZ1 flagged, not just the mart.
- **`gi_star_cluster_label` protection:** `sig-but-ns = 0` in both `lor_2021` and `lor_pre2021` PLR.
  The label is `significant & z>0 / z<0`; for NaN z both comparisons are False, so degenerate cells
  stay `'ns'` **regardless of the significance flag, both before and after the fix** — the published
  mart field was and remains clean. Confirmed.

## Code-correctness of the guard

Keying the guard on `np.isnan(gi.Zs[i])` (not on p) is the right discriminator: z=NaN is esda's
signal that no statistic exists, whereas a finite z with floor p=0.001 is a *legitimate* minimum-p
result and is correctly retained. Islands receive the k-NN(k=6) fallback before this point, so a
NaN z here genuinely means "no computable statistic," which is exactly the exclude case. `p_fdr`
stays NaN through `benjamini_hochberg` (which drops NaN p from `m`), and `NaN < ALPHA` evaluates
False, so `*_significant` can never surface TRUE. The determinism contract (`seed=42`,
`permutations=999`) is untouched.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, maintainer-accepted ADRs, prior sign-offs, the maintainer's
own issue #290 text, and empirically-executed pipeline output. No web-fetched or non-maintainer text
was treated as instructions; nothing reviewed requested tool use, new dependencies, credential
access, or scope changes.

---

**Verdict: PASS.** The NaN-z / floor-p guard is the statistically correct fix (full exclusion is the
best-justified option; p=1-in-denominator would be over-conservative and p=0.001-in-pool is the
bug). The primary headline family (72 hot / 36 cold, `lor_2021` PLR) is genuinely unaffected, the
published `gi_star_cluster_label` stays `'ns'` for degenerate cells before and after, and the
pooled-secondary 577→0 drop is a correct removal of contamination-induced false positives. Clears
the R-C1 geo gate for integration into `develop`; the paired `gentrification-domain-expert` sign-off
is still required before the PM integrates.

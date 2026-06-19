# R-A5 Domain Sign-off — mean_age_years sign correction (#85 / PR #89)

- **Author:** gentrification-domain-expert
- **Date:** 2026-06-19
- **Scope:** domain-theory validity of removing the `-1.0 *` negation on `mean_age_years` in
  `int_ewr_socioeco.sql`, so older PLRs now score as *more pre-gentrification / vulnerable*
  (raising `ewr_composite`, lowering `gentrification_score` after the single outer negation).
- **Companion:** geo-DS statistical audit + re-signoff in `docs/methodology/indicator-semantics.md`
  (§4 root-cause, §9 post-fix re-verdict).

## Assessment

The fix is theory-consistent. The invasion-succession model (Dangschat 1988/2000) and the
Döring–Ulbricht displacement framing the thesis operationalises both cast the *young-adult
in-mover* (18–35) as the gentrifier and the *settled, ageing, long-tenure* resident as the
displaced/vulnerable group — so a high mean age belongs on the vulnerability-positive side, not
the gentrifier side. Mean age is strongly positively correlated with residence duration (DAU5),
the canonical Döring–Ulbricht vulnerability marker, which already enters the composite positively;
the pre-fix negation made these two facets of the same "settled older population" fight each other
and perversely scored *older* neighbourhoods as *more* gentrified — backwards for a pre-gentrification
measure. With all five `ewr_composite` inputs now vulnerability-positive and a single outer
negation in `gentrification_score`, the composite faithfully matches the 2018 thesis framing
(high index = more displacement pressure on the displaced population). This is a sign-convention
correction within the existing operationalisation, not a new indicator decision.

## Verdict

```
Verdict: PASS
Ref: docs/methodology/indicator-semantics.md §4, §9
```

Non-blocking carry-forward (already noted by geo-DS, condition #3): document the
levels-vs-YoY-changes divergence and the migration_background_share ≥2017 restriction on the
public G2 methodology page.

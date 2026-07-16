# Epic H — standing methodology requirements (Hamburg / multi-city expansion)

This page collects **durable, cross-cutting methodology requirements** for Epic H that must
survive across individual tickets — i.e. conditions attached to a sign-off that bind on *future*
work, not just the ticket that produced them. Re-home a requirement here (rather than letting it
evaporate when its origin ticket closes) whenever that origin ticket is closed before the future
work it constrains has been scoped. See `docs/epic-h/tickets/H-reg-SE.md` (#265) for the audit
that produced this page.

## Standing requirement: Stadtteil-clustered SEs for any Hamburg regression using D4

**Origin:** H1 geo-signoff Condition 2 (`docs/epic-h/H1-geo-signoff.md`, "Condition 2 (blocking
any future E1/E2 Hamburg regression...)"), restated via #129 (H2-SE) and re-homed via #265
(H-reg-SE) after #129 was closed without a Hamburg regression ticket yet existing to inherit the
requirement.

**Requirement:** Hamburg's EWR-equivalent composite (`int_ewr_socioeco_hamburg`, the D4
Hamburg-analogue) is estimated at **Stadtteil grain** (~104-105 areas) and then disaggregated by
name-matched containment onto the finer **statistisches-Gebiet** grain (~941-945 areas) used by
the outcome variable (Sozialmonitoring) and POI predictors — see that model's header for the
two-grain reconciliation method (ADR-0014 open question #5). This means any regression that
includes a D4/`ewr_composite` term at Gebiet grain has an effective sample size of ~104
Stadtteile, **not** ~941 Gebiete, once you account for the repeated/non-independent Stadtteil-level
values shared across their constituent Gebiete.

Therefore: **any future Hamburg E1/E2-equivalent regression (mirroring Berlin #30/#31) that
includes a D4-derived term must either:**
1. cluster standard errors at Stadtteil grain, **or**
2. aggregate the whole regression specification to Stadtteil grain,

and must **report the effective N honestly** (~104 Stadtteile), not the nominal Gebiet-grain row
count. This is a change-of-support / MAUP issue, not a stylistic preference — treating repeated
Stadtteil-level values as independent Gebiet-level observations understates standard errors by
roughly sqrt(9) ≈ 3x (9 Gebiete per Stadtteil on average).

**Binds on:** any ticket that builds a Hamburg regression/event-study/DiD analysis referencing
`int_ewr_socioeco_hamburg` or its `ewr_composite`/`z_*` columns (e.g. a future Hamburg analogue of
Epic E's #30/#31/#259/#260/#264 work). The dual methodology gate (geo-DS + domain expert) applies
to that work as normal; this page exists so the *specific* SE-clustering condition is not
rediscovered or silently dropped when that work is finally scoped.

**Status:** No Hamburg regression ticket exists yet as of 2026-07-16. This is a standing reminder,
not an open action item — closed when the future regression ticket lands with the AC baked in
(at which point this section should link to that ticket rather than restate the requirement).

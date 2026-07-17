# OA-D4 (#240, ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with `OA-D4-geo-signoff.md`).
- **Artifact under review:** `transform/models/intermediate/int_poi_within_group_dominance.sql`,
  `transform/seeds/seed_oa_dominance_groups.csv` (branch `feature/240-oa-d4-dominance`).
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.
- **Scope reviewed against:** my own OA-D0 domain sign-off (`docs/methodology/OA-D0-domain-signoff.md`)
  Conditions A (allow-list) and B (dominance ethics) — this ticket re-enters the R-C1 gate as a
  **conformance review** against conditions I already set, per that sign-off's own closing note
  ("these conditions land as acceptance criteria on D3/D4/D7 ... re-enters the gate on its own
  branch"), not a fresh open methodology question.

## Checks against my own Condition A (allow-list)

All nine allow-list resolutions are implemented as specified in `seed_oa_dominance_groups.csv`:

- **A.1-3 (Gastronomy/Retail/Entertainment CONFIRMED IN):** present at the grains I specified —
  Gastronomy at BOTH category (Cafe/Restaurant/Fast Food) and type grain (the cuisine-typed group,
  correctly firewalled — see B.3 below); Retail at category grain ONLY, all 12 categories present,
  no type-grain Retail group built (correctly avoids the fragmentation I warned about); Entertainment
  at category grain (Bar/Nightlife/Culture/Leisure), matching exactly.
- **A.4-5 (wellness signal-placement gap — the load-bearing correction I required):**
  `wellness_curated` correctly pools `Services > {Beauty, Massage}` with
  `Sports and Recreation > Sport > {Fitness Center, Martial Arts}` and `> Recreation > Sauna` as
  ONE curated cross-domain group. This is exactly the resolution I asked for (option (a): "include
  a curated fitness/wellness dominance group pooled across" both domains, not option (b)). The
  live spot-check the geo sign-off ran independently confirms Fitness Center correctly surfaces as
  a `top_child` with `offering_tier=3` — the canonical LSW (2008) wellness signature is no longer
  half-blind.
- **A.6 (Hipster/Coworking correctly absent):** confirmed NOT built as a dominance group, matching
  my confirmation that its k=1 degeneracy means the signal belongs to domain/category OA + Δ, not
  dominance. This ticket does not yet write the D7 page restating that as a documented choice —
  that remains D7's job, not a gap in this ticket's own acceptance criteria (D4 scope is the model,
  not the page copy).
- **A.7-9 (Vacancy, infrastructure domains, Tourism CONFIRMED OUT):** confirmed absent from the
  seed. None of the eight excluded domains (Vacancy, Mobility, Public Service, Religion, Office,
  Public Space, plus Tourism at A.9) appear anywhere in `seed_oa_dominance_groups.csv` — checked
  exhaustively, not spot-checked, since the seed is small enough (30 rows) to read in full.

## Checks against my own Condition B (dominance ethics, all four clauses mandatory)

- **B.1 (not market-power/antitrust):** the model SQL header and both schema.yml descriptions state
  plainly that HHI/entropy/evenness are descriptive diversity indices, no antitrust/market-health
  implication. Present in both the model docstring and the `hhi` column description — a reader
  hitting either surface gets the framing, not just the header comment a casual query-writer might
  skip.
- **B.2 (sign-blindness — MANDATORY pairing):** `top_child` + `top_child_offering_tier` +
  `top_child_offering_weight` are computed and exposed on EVERY row, joined from the same
  causality-first tier seed (`seed_poi_offering_relevance.csv`) the OA methods already cite. This
  is the correct mechanism — a caller cannot get a bare `hhi`/`top_share` without the paired
  columns sitting right next to them in the same row; nothing here forces a second join a consumer
  could skip. I confirm this satisfies "always published paired," not merely "pairable."
- **B.3 (anti-stigma/anti-xenophobia — the sharpest, non-negotiable clause):**
  `gastronomy_restaurant_cuisine` is the ONLY group with `is_public_safe = false`, and it is
  exactly the cuisine-typed Restaurant-type group I flagged (Asian/German/Greek/Indian/
  International/Italian/Turkish/Sushi/Steakhouse/Beer Garden Restaurant — all 11 Restaurant types
  in the current taxonomy, checked against the full Restaurant type enumeration, none missing).
  The category-grain `gastronomy_category` group (Cafe/Restaurant/Fast Food, NOT nationality-coded)
  is correctly `is_public_safe = true` — this is precisely the "restrict the public cut to category
  grain" resolution I required, not a blanket Gastronomy suppression that would have thrown away a
  legitimate public signal. I also confirm the geo sign-off's finding that a plain `min()` aggregation
  of a per-row flag is only sound with a seed-level invariant, and that the added blocking test
  (`test_oa_dominance_group_public_safe_constant.sql`) is the correct mechanism to guarantee my
  ethics condition can never silently be violated by a future seed edit. This is now a genuinely
  enforced technical control, not just a documented intention — I consider this the single most
  important verification in this review and it passes.
- **B.4 (descriptive-not-causal + low-base + anti-erasure):** `is_thin_base` is a flag column,
  never a row filter (confirmed by reading the model SQL — no `where` clause drops thin cells), and
  both the model header and the `is_thin_base` schema.yml description restate the anti-erasure
  framing (Haklay 2010) inherited from the OA model. The dominance-specific
  `max(10, 5*n_children)` threshold (stricter than OA's flat floor) is the right call given HHI's
  worse small-sample behaviour than a plain ratio — I defer to the geo sign-off's math judgement on
  the exact scaling constant, which was pre-agreed in my own OA-D0 sign-off's forward reference to
  this exact condition.

## What remains for later tickets (not this one's scope)

- **D7 (methodology page):** must restate the sign-blindness (B.2), anti-stigma (B.3), and
  Hipster/Vacancy documented-absence (A.6/A.7) framing in public-facing copy — this ticket built
  the correctly-gated DATA layer only; no site/page copy exists yet to audit.
  Any future consumer (poi-map, area pages, G2, O2) MUST filter `is_public_safe = true` before
  rendering — I flag this as a **binding forward condition** on whichever ticket first wires this
  mart into a public surface (mirrors the #276/#277 forward-binding pattern already used elsewhere
  in this backlog): re-confirm the `is_public_safe` filter is actually applied at the query/page
  layer, not just present as a column a consumer could ignore.

## Grounding (R-C2)

Herfindahl 1950; Hirschman 1945; Shannon 1948; Simpson 1949; Pielou 1966; Zukin 2009 *Naked City*;
Ley 1996 *The New Middle Class*; Lees/Slater/Wyly 2008 *Gentrification* (retail-succession
indicators incl. fitness/wellness); Smith 1979/1987 (rent-gap/disinvestment); Dangschat 1988
(invasion-succession); Haklay 2010 (VGI coverage non-neutrality); my own OA-D0 domain sign-off,
Conditions A and B, which this review conforms against.

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — all nine Condition-A allow-list resolutions and all four Condition-B ethics
clauses are correctly implemented and, for B.3 specifically, now technically enforced (not just
documented) by a new blocking test. One forward-binding condition carried to the future
public-surface-consuming ticket (re-verify the `is_public_safe` filter is applied at the point of
publication). Ready for `develop` integration.

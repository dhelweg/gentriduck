# OA-D0 (ADR-0024) — gentrification-domain-expert sign-off

**Verdict: PASS WITH CONDITIONS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with `OA-D0-geo-signoff.md`).
- **Artifact under review:** `docs/adr/0024-oa-calculation-modes-area-hierarchy-dominance.md`
  (feature branch `origin/claude/oa-calculation-rbay9g`) + scoping doc
  `docs/planning/oa-modes-hierarchy-dominance.md`.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.
- **Scope reviewed against:** the maintainer-CONFIRMED D7 knobs — method set = EVERYTHING (core six
  + z-score/binomial-SLQ + Getis-Ord + **density** + **per-capita**, all promoted to the mart layer);
  weighted roll-up = prefix-sum; Bezirk geometry by `ST_Union` dissolve; coarse-level grain = FULL
  category/type at every area level.

---

## Summary judgement

The **architecture is domain-valid and theory-faithful in the main**: methods-as-columns (never a
blended "consensus OA"), a separate dominance model that never folds into the LQ, the `faithful`
nested-LQ retained as the sole golden/Epic-B anchor, and the resolution-vs-stability framing of
`area_level` all correctly operationalize the constructs. I confirm the direction.

I do **not** rubber-stamp the maximal-breadth configuration. The maintainer's "everything" override
promotes into the *published* layer three measurements the ADR's own D7 recommended defaults
deliberately kept in the analysis layer (density, per-capita, Getis-Ord). From a
theory/ethics standpoint these are the highest-risk figures in the whole cluster: they answer
*different questions* than OA, they are the displacement-misuse surfaces, and two of them
(density, per-capita) are the modes the planning doc itself flags as coverage-confounded and
MAUP-reopening. Full category/type grain at Bezirk level compounds the ecological-fallacy exposure.
And the taxonomy inspection surfaced a genuine **signal-placement gap** (fitness/wellness) and a
concrete **ethnic-stigma hazard** (cuisine-typed dominance) that the ADR's open questions did not
name.

These are resolvable by carrying the conditions below into the acceptance criteria of the downstream
MB tickets (D3 method columns, D4 dominance model, D7 page). Each of those tickets re-enters this gate
on its own branch, so the conditions are enforceable there. Hence **PASS WITH CONDITIONS**, not a bare
PASS.

---

## Conditions

### A. The within-group dominance signal-domain allow-list (answers the ADR's open question to me)

The ADR proposes: Gastronomy, Retail (category grain), Entertainment IN; partial Services (wellness)
IN; Vacancy + infrastructure OUT. I **confirm the core** and **amend at the edges**. The allow-list
must be made **exhaustive over all 13 domains** so the D4 build does not guess disposition.

**Confirmed IN (theory-grounded):**

1. **Gastronomy** — category grain (Café / Restaurant / Fast Food) *and* type grain. This is the
   canonical artisanal / "third-wave" consumption signal (Zukin 2009, *Naked City*; Ley 1996,
   cultural-intermediary consumption). The seed tiers confirm a clean cultural/price ladder
   (Café/Coffee=tier 3 → Restaurant=tier 2 → Fast Food/Imbiss=tier 1; Ice Cream=tier 1 within Café),
   so a signed `top_child` reads directionally. **KEEP.**
2. **Retail** — category grain. Retail succession (boutiques/galleries vs everyday-needs shops) is a
   headline gentrification indicator (Lees/Slater/Wyly 2008; Zukin 2009). **KEEP at category grain**
   (type grain fragments too finely to be a stable monoculture read). 
3. **Entertainment** — category grain (Bar / Nightlife / Culture / Leisure). Cultural-consumption
   nightlife economy (Ley 1996). **KEEP.**

**Amended / newly-resolved (these are the load-bearing corrections):**

4. **`Sports and Recreation` — RESOLVE, do not silently drop.** The fitness/wellness amenity signal
   that Lees/Slater/Wyly (2008) name explicitly ("cafés, galleries, boutiques, **fitness/wellness**")
   is physically taxonomized under `Sports and Recreation` (`Sport > Fitness Center`, `Sport > Martial
   Arts`, `Recreation > Sauna`), **not** under Services. The ADR's "partial Services (wellness)"
   therefore captures only *half* the canonical wellness signal (Beauty/Massage) and drops boutique
   fitness/yoga/martial-arts studios — a real theory-fidelity gap. **Condition:** D4 must either
   (a) include a curated fitness/wellness dominance group pooled across `Services > Beauty/Massage` +
   `Sports and Recreation > {Fitness Center, Martial Arts, Sauna}`, or (b) if pooling across domains is
   architecturally undesirable, include `Sports and Recreation` at the relevant category/type subset —
   but it may **not** leave the fitness signal unmeasured while claiming to cover "wellness."
5. **Partial `Services` — confirm as a curated within-domain SUBSET, not whole-Services.** Dominance
   over the full Services domain would blend gentrification-signal categories (Beauty, Massage) with
   incumbent-serving ones (Funeral=tier 0, Laundry=tier 0, Travel=tier 0, Hairdresser=tier 1), diluting
   the signal into noise. **Condition:** compute Services dominance only over the wellness subset
   (Beauty, Massage), explicitly labelled as a curated subset, or fold it into condition A.4's
   cross-domain wellness group.
6. **`Other > Hipster` (Coworking Space) — acknowledge explicitly.** Coworking is a recognized
   creative-class / gentrification-frontier marker (Ley 1996; the seed literally labels the category
   "Hipster"). It is a single-child category today (k=1 → degenerate HHI), so it cannot support a
   meaningful *within-group* dominance measure and I do **not** require it in D4. **Condition:** state
   in D7 that this signal is intentionally carried by its **domain/category-level OA + Δ**, not by
   dominance — so its absence from the dominance model is a documented choice, not an oversight.

**Confirmed OUT (theory-grounded exclusions):**

7. **Vacancy / Leerstand** — single-category (`Vacancy > Vacancy`, k=1) → HHI trivially 1, entropy 0;
   a within-group dominance number is *degenerate and meaningless*. Its gentrification signal is the
   **domain-level OA + temporal Δ** as a disinvestment / rent-gap-trough marker (Smith 1979/1987),
   which the existing OA D-2 framing already carries. **KEEP OUT.**
8. **Infrastructure domains** — Mobility, Public Service, Religion, Office, Public Space. These are
   incumbent-serving / sign-neutral (OA D-2); concentration of bus stops, churches, mailboxes or public
   toilets carries no succession signal. **KEEP OUT.**
9. **`Tourism` — RESOLVE explicitly as OUT of the gentrification-dominance headline.** Tourism
   (Accommodation, Sights, Info) concentration measures **touristification**, a distinct-but-adjacent
   displacement driver that the literature keeps analytically separate from classic
   invasion-succession gentrification (Döring/Ulbricht displacement typologies distinguish drivers;
   Dangschat 1988). **Condition:** exclude Tourism from the gentrification-dominance model; if a
   touristification read is ever wanted it must be a **separately labelled** indicator, never blended
   into the gentrification dominance family (D-2 firm rule).

### B. Dominance ethics framing (answers the ADR's explicit open question to me)

The ADR is correct that HHI carries an **antitrust / market-concentration connotation** and that OA's
inherited D-1/D-2 language is insufficient. A **bespoke dominance ethics statement** must be authored
for D4/D7 and must contain **all four** of the following clauses (this is the minimum I require; none
may be dropped):

1. **Not a market-power / antitrust reading.** State plainly that HHI, top-share, entropy and evenness
   are used here as **descriptive diversity indices of the offering composition**, and carry **no**
   implication about market competition, business viability, monopoly, or economic "health." The
   Herfindahl-Hirschman name is borrowed for the math only (Herfindahl 1950; Hirschman 1945).
2. **Sign-blindness is the core hazard.** An unsigned concentration number **cannot distinguish
   opposite processes**: up-market monoculture (boutique-ification, Zukin 2009 — early/mid commercial
   gentrification) looks *identical* to down-market monoculture (disinvestment / rent-gap trough,
   Smith 1979) and to studentification. Dominance must therefore **always** be published paired with
   the signed `top_child` + its tier from `seed_poi_offering_relevance.csv`, and read alongside the
   vacancy dynamics and the social-status outcome — **never a bare HHI on a public surface**
   (mechanized in the ADR's "sign-blind → always with signed top_child" rule; the ethics copy must say
   *why*).
3. **Anti-stigma / anti-xenophobia clause (NEW — not in OA's D-1/D-2, and the sharpest risk).** The
   Restaurant taxonomy is **cuisine/nationality-coded** (Turkish, Greek, Asian, Indian, German,
   Italian, Sushi…). A type-within-Restaurant dominance figure therefore literally measures
   **concentration of a cuisine/national origin**, and "monoculture"/"dominance" language attached to
   it is a concrete vector for ethnic stigmatization (e.g. a high top-share of Kebab/Imbiss or of a
   given cuisine being read as coded disinvestment or anti-immigrant framing). **Condition:** the
   dominance model and page must state that these indices describe **form composition on a
   cultural/price ladder, never the cultural or national origin of proprietors, cuisine, or
   clientele**; and **cuisine-typed (type-within-Restaurant) dominance must not be published on a
   public displacement-adjacent surface** — restrict the public cut to category grain (Café /
   Restaurant / Fast Food), keeping cuisine-level concentration to the internal study only, or suppress
   it entirely. This clause is mandatory, not advisory.
4. **Descriptive-not-causal + low-base + anti-erasure.** Reaffirm (as OA does) that dominance tracks
   composition, does **not** predict displacement and must **never** be presented as an "up-and-coming
   Kiez" targeting signal. Because HHI on a small child-count explodes (two POIs both cafés →
   HHI 0.5, a spurious "monoculture"), the `min_parent_base` gate is **more** essential here than for
   OA; a suppressed/thin cell must read as "too thinly observed to characterize," **never**
   "commercially dead" — inherit the Haklay (2010) coverage-is-not-spatially-neutral anti-erasure
   disclosure the OA model already carries.

### C. The "everything" method set — density & per-capita in the published mart (the biggest theory risk)

The maintainer promoted density and per-capita into the mart. The ADR's own D7 defaults kept them in
the analysis layer for good reason. I do not veto the override, but the following are **binding
conditions**, grounded in the "never blend / label by question" rule (ADR-0017 D3):

1. **Per-capita OA is a DIFFERENT construct — provision/exposure, not offering advantage — and its
   denominator is endogenous to the very outcome we study.** "Cafés per resident" answers a
   provision/displacement-*pressure* question, and its denominator (residents) is itself changed by
   gentrification: per-capita provision can rise purely because population fell (i.e. *after*
   displacement has occurred). **Condition:** per-capita figures must (a) be labelled with the exact
   question they answer, (b) carry a denominator-endogeneity caveat (falling per-capita provision may
   indicate population loss/displacement, not disinvestment), and (c) **never share an axis, legend, or
   colour scale with any LQ-family mode**. It is not "an OA."
2. **Density (per km²) re-opens MAUP and conflates centrality with gentrification.** A raw count per
   area is not scale-invariant and directly tracks OSM completeness growth over time (the planning
   doc's own C-2 "avoid for temporal reads" verdict). Density answers "how much commerce is here"
   (agglomeration/centrality) — the exact confound the nested-LQ was built to remove; a dense central
   district is not thereby "gentrified." **Condition:** density must carry the MAUP + centrality-
   confound caveat, inherit the coverage/anti-erasure disclosure, and **never be differenced over time
   on a public surface unless the completeness-contamination test (D6) shows PASS** for that cell.
3. **Getis-Ord Gi\* hotspot maps are the single highest displacement-misuse surface.** A map captioned
   "where café-dominance clusters" reads to a bad-faith user as "where it's turning / where to invest."
   **Condition:** if promoted to the mart, Gi\* clustering defaults to the **BZR headline scale, not
   PLR** (per the scale-interpretation guidance below), carries the strongest descriptive-not-causal +
   anti-targeting banner, and is gated the same as every other mode.
4. **Every figure is labelled with the question it answers; nothing is blended (ADR-0017 D3).** I
   confirm the interpretation-by-question matrix in the planning doc is faithful (nested-LQ ↔ H1–H3
   representation; nested-LQ **only** ↔ Epic-B directional; share-diff/log ↔ temporal magnitude;
   dominance ↔ monoculture; density/per-capita ↔ provision — each in its own row, none cross-read).
   The mart's `oa_method` label column and the page must preserve this one-question-per-figure
   discipline; the "everything" breadth makes this labelling **more** critical, not less. No global-LQ,
   density or per-capita figure may be presented in a way that lets a reader mistake it for "the 2018
   result."

### D. Full category/type grain at coarse area levels — ecological-fallacy / MAUP caveat

The maintainer chose FULL category/type grain at every level (overriding the ADR's domain-grain-only
coarse default). Statistically this is the geo-DS's remit; my **domain condition** is on
interpretation:

1. A fine-grained figure at Bezirk level (e.g. "Italian-restaurant OA in Bezirk Mitte") is an
   **ecological-fallacy magnet** — the borough number says nothing about any Kiez within it, yet fine
   granularity invites false precision. **Condition:** public-facing copy at coarse levels (PGR,
   Bezirk) must carry the ecological-fallacy caveat and the resolution-vs-stability framing:
   **BZR is the recommended public headline scale** (stabler, less individually identifying);
   **PLR is the Kiez succession front but D-3-unstable and highest misuse risk**; **Bezirk is
   policy/context only — never Kiez-level inference.** This mirrors the domain-scale guidance already in
   the planning doc §"Interpretation by scale."
2. **Cross-scale rank-flips are a substantive finding, not a footnote.** Where an area's rank changes
   materially between scales, that is a real finding about the spatial grain of succession and must be
   surfaced (mirror the C-4 gate), never hidden.

### E. Epic B framing — confirmed, with one guardrail

I **confirm** the ADR's core Epic-B commitment holds: the `faithful` nested-LQ remains the sole
directional 2018-golden anchor (validated against `reference/goldens/20180909_result_full_plr.csv`),
and every new method (global-LQ, log-LQ, share-diff, shrunk-LQ, raw share, dominance, density,
per-capita, Gi\*) is a **new instrument, not a redefinition of the thesis construct** — validated by
orthogonality/robustness, not golden agreement. **Guardrail:** because the "everything" set adds
textbook-looking modes (global-LQ, density) that a reader might assume *are* "the OA," the D7 page must
state explicitly and prominently that **only nested-LQ is the 2018 construct**; the others answer
adjacent questions and were never in the thesis.

---

## What the maintainer should know before build (maximal-breadth flags)

1. **The allow-list has a real gap, not just a confirmation:** fitness/wellness is split across
   `Services` and `Sports and Recreation`; the ADR's "partial Services (wellness)" silently drops the
   `Sports and Recreation` half (boutique fitness/yoga/martial-arts) — a canonical LSW amenity signal.
   Condition A.4 fixes it; without it the wellness dominance read is half-blind.
2. **Cuisine-typed dominance is a live ethnic-stigma hazard** (Restaurant types are nationality-coded).
   Condition B.3 restricts the public cut to category grain. This is the sharpest single risk in the
   maximal config and is non-negotiable for any public surface.
3. **Density and per-capita in the published mart are the biggest theory-fidelity risk** — they answer
   provision/centrality questions, not offering-advantage, and per-capita's denominator is endogenous
   to displacement. They are safe only if hard-labelled by question and never blended/legend-shared
   with the LQ family (Condition C). This is exactly the axis the ADR's D7 default kept in the analysis
   layer; promoting it is defensible for a research page but multiplies the labelling burden.
4. **Getis-Ord hotspot maps + full type grain at PLR are the displacement-targeting surfaces** — BZR
   headline default + strongest anti-targeting framing required (Conditions C.3, D.1).
5. **These conditions land as acceptance criteria on D3/D4/D7**, each of which re-enters this gate on
   its own branch — so PASS WITH CONDITIONS here does not weaken the downstream gate; it front-loads
   the domain requirements the build must satisfy.

---

## Verdict line (for the PM pre-integration check)

**Verdict: PASS WITH CONDITIONS** — ADR-0024 architecture is domain-valid; integration of the ADR is
supported. The nine allow-list resolutions (A), the four-clause dominance ethics statement (B), the
density/per-capita/Gi\* framing conditions (C), the coarse-grain ecological-fallacy caveat (D), and the
Epic-B nested-LQ-only guardrail (E) are **binding acceptance criteria carried onto the downstream MB
tickets (D3, D4, D7)**, which re-enter the R-C1 gate individually.

Grounding (R-C2): Dangschat 1988 (invasion-succession); Smith 1979/1987 (rent-gap, disinvestment);
Zukin 2009 (*Naked City*, artisanal/third-wave); Ley 1996 (new cultural middle class); Lees/Slater/Wyly
2008 (retail succession incl. fitness/wellness); Döring/Ulbricht (displacement-driver typologies);
Herfindahl 1950 / Hirschman 1945, Shannon 1948, Simpson 1949, Theil 1972 (concentration/diversity
indices); Haklay 2010 (VGI coverage non-neutrality); ADR-0017 D1–D5, ADR-0018;
`seed_poi_offering_relevance.csv`; `docs/methodology/spatial-methods.md` §7, §11.

# Pre-registration #371 (E1c, matched-grain Berlin–Hamburg comparison) — Domain Review (R-C1, domain half)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-02
- **Reviewed:** `docs/methodology/371-matched-comparison-preregistration.md` @ d177340c (branch
  `feat/371-matched-comparison`), including the PM decisions M1/M3/M4, and the ADR-0014 amendment
  (3d324eb1).
- **Measured against:** my P354 review D1–D8 and N1–N8 (`354-355-preregistration-domain-review.md`),
  `docs/epic-e/354-domain-signoff.md` (§3 tie ceiling, §5 wording), and
  `docs/epic-h/355-domain-signoff.md` with its Addendum (Hamburg construct, D1/AsylbLG channel,
  "not comparable" rule).
- **Data access:** none. I did not open the DB. This is a document review, and the numbers quoted
  are the pre-registration's own.

Verdict: CONCERNS

The design is a real step forward, and most of it is theory-faithful (§1). The concerns are seven
text-level changes to the pre-registration (D1–D7, §8). They concern the construct gaps the design
discloses but does not yet act on, the shock text, one ethnic-misreading hazard, and the N2
framing. None needs a result in hand. All can be made before implementation.

```json
{
  "verdict": "concerns",
  "domain_rationale": "Matching grain, calendar and indicator set removes the three main reasons the #354/#355 panels were not comparable. Taking migration background and school leaving out of K answers my #355 R4. The rejection of protection-zone timing is correct. The X8 reading rules ('no difference detected' is never 'the same'; DIFFERS is not 'the processes differ') are right. Seven gaps remain. (1) Hamburg's transfer indicator contains the SGB II unemployed, so Hamburg K double-weights unemployment. That gap is disclosed but has no consequence for when a city difference may be stated. (2) Core-2 is justified as removing the refugee channel, but Hamburg's child-poverty indicator may also contain AsylbLG. (3) The W2 shock text is inaccurate about Hamburg T. (4) A context correlation of Hamburg migration background with café and fast-food OA is an ethnic-misreading hazard with no analytic gain. (5) N2 is framed as an 'early signal'. It has no decomposition, so a result driven by fast-food decline cannot be told apart, and its pandemic-cancellation claim is too strong. (6) A DIFFERS driven by a below-chance AUC would be read as a difference in association. (7) N1's above-median cut pools inner-city areas with peripheral large estates, which Dangschat's model does not cover.",
  "theory_risks": [
    "Matched grain (15-26k residents) is coarser than the scale of gentrification (Kiez/PLR, Doering & Ulbricht 2016). Nulls at matched grain do not rule out micro-scale processes.",
    "Hamburg Stadtteile include port, rural and new-build units (Vier- und Marschlande, Elbe islands, HafenCity) with no Berlin BZR analogue.",
    "With MDD about 0.26-0.42, nearly every X8 row will be 'too imprecise to say the cities agree'. That is honest, but it must be visible on any public page.",
    "N2 could be read as 'fewer doener shops signals improvement'. The kebab-free check (R3) is still not possible."
  ],
  "recommendations": ["D1-D7 required (§8)", "R1-R6 optional (§9)"]
}
```

## 1. What is right (keep)

- **The matched grain is thesis-faithful for Berlin.** BZR is one of the thesis's own grains: its
  H1, H2 and H3b best models were at BZR (Tabelle 6-16). So the Berlin matched panel is closer to
  the thesis than the PLR panel was for those hypotheses.
- **Hamburg's business mix becomes measurable** (all four commercial domains pass A1.1 at Stadtteil
  grain). Hamburg H1/H2 can then be stated as tests of *Angebotsstruktur* for the first time,
  instead of "not comparable" (355 Addendum). The §6.5 statement that "the measurability of the
  business mix is grain-dependent" is a correct and publishable MAUP finding.
- **K without migration background and school leaving.** This removes the construct that made
  every Hamburg H1a–c sentence carry an ethnic-misreading caveat (355 §4, R4). If Hamburg H1b holds
  on K, that is the strongest available answer to "is the fast-food link a migration-background
  artefact?".
- **Identical calendar windows and level-based changes**, the z-change fallback across definition
  seams, and the backcast for Berlin 2019 (P354 §3.1) are correct.
- **The X8 reading rules in §6.3 and §10** ("DIFFERS … does not say that the processes differ";
  "never 'the same'"; MDD always printed; "too imprecise to say the cities agree") meet the §4.5
  standard I asked for in D8(e). The power statement in the first paragraph is right.
- **(d) protection-zone timing is rejected for the right reasons:** designation selects on the
  outcome (§172 BauGB evidence requirements), only 2 Hamburg designations fall in the windows, and
  the topic pulls toward displacement wording (#358).
- **H3b keeps the start-of-window control** (D6), and H3a/N1 keep K at the pivot. The P354 §9 list
  carries over, and the document contains no "pressure" or displacement wording for the outcome.

## 2. Grain (BZR vs Stadtteil)

BZR vs Stadtteil is the best available pair, and keeping all 99 Stadtteile in the primary (M4) is
acceptable. But Hamburg's size dispersion is not only a noise problem. The 22 Stadtteile under
5,000 residents are mostly **a different kind of place**: rural Marschlande, Elbe islands, port
units, and recently built HafenCity, where population growth from new-build in-movers lowers
measured disadvantage without any compositional upgrading (P354 §9). Berlin has no BZR of that
kind. A city difference that exists only because of those units is a difference in *settlement
type*, not in the commerce–status relation. So a DIFFERS that flips under the ≥ 5,000 trim must not
be stated as a city difference at all (D1). The flag alone is not enough.

Scale: at 15–26k residents per unit, the matched grain is coarser than the Kiez scale at which
gentrification is observed in Berlin (Döring & Ulbricht 2016 work at PLR). Inner-city BZR and
Stadtteile (e.g. St. Pauli, Ottensen; Reuterkiez inside a larger BZR) mix upgrading blocks with
stable ones. A null at matched grain therefore does not rule out a micro-scale process, and the
findings should say so once (R1).

## 3. Harmonised core

**Is it like-for-like? Closer, not equal.**
- **U** is close: SGB II unemployed in both, with different age denominators. It depends on the DE
  confirming Hamburg S4 for 2023/2025.
- **C** is close *if* Hamburg S5 ("Mindestsicherung") turns out to be SGB II (+ SGB XII) only. If it
  includes AsylbLG, C carries the same refugee channel as Hamburg T (D2).
- **T** is the weak link, and the problem is larger than "scope". Berlin S3 counts **non-unemployed**
  recipients. Hamburg S3 counts **all** SGB II recipients (plus AsylbLG), so it *contains* the
  unemployed SGB II recipients who are already in U. Hamburg K therefore weights SGB II unemployment
  roughly twice, and Berlin K does not. Within-city z-scoring does not fix this. It is a difference
  in what K *means* in each city, and it can on its own produce a DIFFERS on any hypothesis whose
  predictor relates differently to unemployment than to non-employment transfer receipt (for
  example via pensioner or single-parent geography). §3.2 must name this (D1).

**The core-2 sensitivity (U + C) is the right one.** It is arguably the more like-for-like
construct. I do not ask to make it primary: core-3 keeps continuity with the #354 Berlin S composite
and with the thesis's MSS status. But a **city difference may be stated only where it holds under
both core-3 and core-2** (D1). If S5 contains AsylbLG, core-2 no longer removes the refugee channel,
and a U-only sensitivity is needed as well (D2).

**Migration background and school leaving as context only: correct, with one exception.** §3.1 /
§9.2(6) plans "descriptive correlations [of HH S1] with K and with the H1a/H1b OA". The S1 × K
correlation is legitimate, because it shows how far K departs from the Statusindex. An **S1 ×
café/fast-food OA** correlation answers no hypothesis that the K-based H1a/H1b primaries do not
already answer. Printed in a findings file or on a page, "fast-food share correlates with the share
of migrant children, ρ = …" is precisely the ethnic reading that R3, item 13 and the 355 Addendum
exist to prevent, and the anti-stigmatisation check still cannot run. It must be dropped (D4).

## 4. Windows and shocks

The identical calendar spans are right. The shock text needs three fixes.

1. **W2, Hamburg T (D3).** "In Hamburg it raises U and C; T changes less, because AsylbLG was already
   counted" is not accurate. Ukrainian refugees arriving from March 2022 entered Hamburg T **at
   arrival** (AsylbLG counts in S3 from 2019). At the 1 June switch, Hamburg T is unchanged and only
   U (and C, if S5 excludes AsylbLG) rise. Berlin T, U and C rise only from June, and Berlin T only
   for recipients who are not unemployed. Over W2 as a whole, **both** cities' indicators absorb the
   arrivals. The asymmetry lies in *which* indicator carries them and *when* within the window, not
   in whether Hamburg T moves.
2. **C conditional on S5 (D2).** All refugee-channel statements for C must be conditional on the DE's
   S5 finding.
3. **Local sites (D3).** Name the large arrival and accommodation sites as a local distortion of K
   and dK at matched grain, where a single site can move a whole unit. The Ukraine arrival centre at
   the former Tegel airport (from 2022) is the clearest Berlin case. Hamburg's central initial
   reception sites are the counterpart. Whether residents there are in the population counts is
   unknown, so this is disclosed, not corrected (same rule as P354 §3.4).

The W1 pandemic text, the W3 Bürgergeld/Wohngeld-Plus text, and the "a shift that follows the
existing geography is not harmless" sentence are correct. So is the "w2_only" flag.

## 5. Hypotheses and the X8 wording

The eight carry over faithfully (§6.1 = P354 §5.1 with K/dK). The X8 rules are right. One gap
makes a DIFFERS uninterpretable: **AUC rows with a below-chance estimate.** Amendment 3 reads
a significantly below-0.5 out-of-fold AUC as *no transferable prediction*, possibly a grouped-CV
artefact. If Hamburg H2 comes out at 0.44 and Berlin at 0.61, Δ = 0.17 may be "DIFFERS". But that Δ
partly measures the artefact, and it can never mean "the mix relates to change in the opposite way
in Hamburg". A reading rule is needed (D6).

## 6. New hypotheses

**N1 (level-conditional H3a, confirmatory): accepted, with one disclosure.**
- The selection is sound: it turns my D8(d) exploratory stratum into a directional test with a cut
  that is symmetric across the cities, and the sign is right.
- The citations are right: Dangschat 1988 for invasion–succession in initially low-status areas, and
  Döring & Ulbricht 2016 for Berlin's hotspots.
- **But** Dangschat's model concerns *innenstadtnahe Wohnviertel*. Above-median K pools inner-city
  poor areas (Nord-Neukölln, Wedding; St. Pauli, Veddel, Wilhelmsburg) with peripheral large
  estates (Marzahn-Hellersdorf, Gropiusstadt; Billstedt, Steilshoop, Osdorfer Born). Theory expects
  succession in the first group and stability or filtering in the second. A null N1 is therefore
  weak evidence against Dangschat, and the findings must say so (D7). An exploratory centrality
  split is recommended (R2).
- Public wording: "among the more disadvantaged half of neighbourhoods", never "gentrifying areas".

**N2 (café-to-fast-food log-ratio change, confirmatory): accepted as a test, with four changes.**
- **Framing (D5a).** The title "as an early signal" must go, from the title and from every public
  text. A validated "early signal" of neighbourhood upgrading is the clearest misuse vector in the
  whole project, because it is a leading indicator for investors. It also moves the language toward
  forecasting change, which #358 and the G2 ethics framing avoid. Name it as an ordering test, like
  H3a: "a relative shift in the gastronomy mix toward cafés precedes a relative decline in
  officially measured disadvantage".
- **Ethnic misreading and decomposition (D5b).** Δr rises if cafés grow *or* fast food shrinks. In
  Berlin and Hamburg a large part of fast food is the döner economy, and R3 still cannot separate
  it. A result driven by fast-food decline could reflect closures of owner-run outlets, which the
  commercial-gentrification literature treats as commercial displacement of migrant businesses.
  That is the opposite of a benign "signal". So pre-register the two components as secondaries,
  with the same controls: g(café share) and g(fast-food share) within Gastronomy. Pre-register a
  wording rule too: N2 is described only as "a shift in the gastronomy mix toward cafés", never as
  "fewer fast-food outlets" (let alone döner). If the fast-food component carries the result, the
  findings must state that it may reflect outlet closures and is not evidence of improvement. The
  kebab-free variant stays a sensitivity, conditional on the taxonomy. The OSM `cuisine` follow-up
  (354 R4) would make it possible.
- **Pandemic (D5c).** "Cancels … the pandemic gastronomy shock to first order" is too strong. During
  the 2020–21 lockdowns takeaway was permitted and sit-down cafés were closed, so the two
  categories were not hit alike. In OSM, closures also register with uneven lags. Pivot 2021 (P = W1)
  must be reported separately with the W1 mechanism named. The claim becomes "cancels the
  gastronomy-wide mapping completeness; the pandemic hit cafés and fast food differently".
- **Citation (D5d).** Glaeser, Kim & Luca (2018) relate business openings (including Starbucks and
  cafés) to **house-price** growth in US cities. Papachristos et al. (2011) relate coffee-shop growth
  to gentrification and crime in Chicago. Neither tests officially measured disadvantage. Say that
  the literature supports café growth as a marker of market upgrading, and that N2 tests whether it
  precedes a fall in measured disadvantage, which is a different construct (improvement ≠
  gentrification, P354 §9).

**N3 (spatial lag, exploratory): accepted.** Exploratory is the right family. Guerrieri, Hartley &
Hurst (2013) model spillover from **adjacent rich neighbourhoods**, which is a status gradient, not
commercial growth. Cite them for the general idea of spatial diffusion and note that N3 lags
commercial change rather than status (R3). No wording problem.

**Families.** T8 / N-family (N1, N2) / X8 separate, with N3, N1/N2 interactions and all
sensitivities uncorrected: correct. Signs are correct throughout (higher K/dK = more or growing
disadvantage, so the expected ρ < 0 means growth precedes falling disadvantage). The N1/N2
CONTRADICTED wording ("commercial growth was followed by a relative rise in measured disadvantage")
is neutral and correct.

**#358 scan.** No "pressure" wording for Dynamik or dK anywhere. "Upgrading" appears only in
theory citations. The protection-zone context column is descriptive. It must stay unlinked to any
outcome (R4).

## 7. What could make a Berlin–Hamburg difference uninterpretable

In order of weight:
1. the T scope gap and the U double weighting (D1);
2. small and rural Stadtteile, a settlement-type difference (D1);
3. a refugee channel carried by different indicators at different times (D2, D3);
4. below-chance AUCs entering Δ (D6);
5. OSM density, already handled by comparing within-city associations only;
6. power (MDD), already handled.

D1 turns the first two from flags into a reading rule.

## 8. Required changes (D1–D7)

- **D1 — Construct gap and the "robust DIFFERS" rule.**
  (a) §3.2: add gap 5: "Hamburg T (all SGB II recipients) contains the SGB II unemployed who are
  also in U. Hamburg K therefore weights SGB II unemployment about twice, Berlin K (S3 = non-unemployed
  recipients) does not. K means a different mix in each city even after within-city z-scoring."
  (b) §6.3 reading rules: "A city difference may be **stated** (findings headline, any public page)
  only if X8 gives DIFFERS under core-3 **and** under core-2 **and** in the ≥ 5,000-resident panel. A
  DIFFERS that fails any of these is reported as 'differs only under <condition>; not stated as a city
  difference'." The verdicts themselves stay as defined. This governs only what may be claimed.
- **D2 — Hamburg S5 and the refugee channel.**
  (a) §3.2 item 2 and §4.4: make every statement about C's refugee channel conditional on the DE's
  S5 definition.
  (b) Pre-register now: "If S5 includes AsylbLG, a **core-1U** sensitivity (U only) is added. Core-2
  is then described as 'without the transfer indicator', not as 'without the refugee channel'." The
  §3.2 rationale for core-2 is adjusted accordingly.
- **D3 — Shock text, W2 and local sites (§4.4).**
  (a) Replace the W2 Hamburg sentence with: "Ukrainian refugees arriving from March 2022 enter
  Hamburg T at arrival (AsylbLG is in S3 from 2019); at the 1 June 2022 switch Hamburg T is unchanged
  while U (and C, if S5 excludes AsylbLG) rise. Berlin U, T (non-unemployed recipients only) and C
  rise from June. Both cities' W2 absorb the arrivals; the asymmetry is in which indicator carries
  them and when within the window."
  (b) Add: "Large arrival and accommodation sites, such as the Berlin Ukraine arrival centre at
  the former Tegel airport (from 2022) and Hamburg's central initial reception sites, can move K and
  dK of a whole matched unit. Whether their residents are in the population counts is unknown, so
  this is disclosed, not corrected."
- **D4 — Drop the migration-background × OA context correlations.** §3.1, §9.2(6) and §10: keep HH
  S1/S7 correlations **with K only**. Remove "and with the H1a/H1b OA" (and any S1/S7 × café or
  fast-food row) from the findings and the CSV. Reason: an ethnic-misreading hazard, with no
  hypothesis it answers that the K-based primaries do not.
- **D5 — N2.**
  (a) Retitle §7.2 "café-to-fast-food ratio change and later status change". Remove "early signal"
  everywhere, and add N2 to the §10 must-not-claim list: "N2 is not an early-warning or investment
  signal".
  (b) Pre-register two N2 secondaries with the N2 controls, g(café share within Gastronomy) and
  g(fast-food share within Gastronomy), plus the wording rule in §6 above (only "a shift in the
  gastronomy mix toward cafés"; never "fewer fast-food outlets"; if the fast-food component carries
  the result, state that it may reflect outlet closures and is not evidence of improvement).
  (c) Replace "cancels … the pandemic gastronomy shock to first order" with "cancels the
  gastronomy-wide mapping completeness to first order; the pandemic hit cafés and takeaway fast food
  differently (lockdown rules), so pivot 2021 (P = W1) is reported separately with the W1 mechanism
  named".
  (d) Correct the Glaeser et al. / Papachristos et al. sentence as in §6 (house prices and
  gentrification markers, not measured disadvantage).
- **D6 — Below-chance AUC in Δ (§6.3).** Add: "If either city's AUC is below 0.5, a DIFFERS on that
  row reads 'differs in transferable discrimination: <city> shows none (Amendment 3)', never 'the
  association differs' or 'runs the other way'. Such a row is never stated as a city difference
  under D1(b)."
- **D7 — N1 scope disclosure (§7.1).** Add: "Above-median K pools inner-city disadvantaged areas,
  where invasion–succession is expected (Dangschat 1988: *innenstadtnahe Wohnviertel*), with
  peripheral large estates, where it is not. A NOT SIGNIFICANT N1 is therefore weak evidence against
  the model. Public wording: 'among the more disadvantaged half of neighbourhoods', never
  'gentrifying areas'."

## 9. Recommendations (non-blocking)

- **R1** The findings' first paragraph should add the scale caveat: "the matched units (15–26k
  residents) are coarser than the scale at which gentrification is usually observed, so a null here
  does not rule out a neighbourhood-scale process".
- **R2** Exploratory N1 split by centrality: units in the inner and outer halves of the city by
  population-weighted distance to the city centre (a city-relative, symmetric rule), reported per
  stratum, uncorrected.
- **R3** N3 citation: say that Guerrieri, Hartley & Hurst (2013) model spillover from adjacent
  high-status areas, and that N3 operationalises the diffusion idea with commercial change instead.
- **R4** The protection-zone share column: state that no association with K, dK, OA or any N row is
  computed or shown (§7.4 reasons apply to a correlation as much as to a timing test).
- **R5** A new-build diagnostic symmetric with the mapping-driven POI flag: report population growth
  per matched unit, and flag a verdict whose sign reverses when the top decile of population-growth
  units is dropped ("possibly new-build-driven"). This covers HafenCity and Berlin's new quarters.
- **R6** §3.6: the Berlin level check at PLR compares K with the #354 S composite, which is the same
  three indicators, so it is near-tautological (ρ ≈ 1 by construction). The informative checks are
  Hamburg K vs Status-summe and K vs each city's own classes at matched grain. Say so, so that a pass
  is not over-read.

## Sources

Helweg (2018) §4.5, §6.3, Tabelle 6-16. Dangschat (1988); Döring & Ulbricht (2016); Smith (1979);
Glaeser, Kim & Luca (2018); Papachristos et al. (2011); Pearce et al. (2007); Guerrieri, Hartley &
Hurst (2013). SenSBW *MSS* Indikatorenblätter (S1, S3, S4; #360). FHH *Sozialmonitoring* annexes
(S3–S5; `354-phase-a-data-prerequisites.md` §5). BA-Statistik (2022), Rechtskreiswechsel. Project:
P354 §3.4, §5.1–5.6, §9, Amendments 1–3; `354-domain-signoff.md`; `355-domain-signoff.md` with its
Addendum.

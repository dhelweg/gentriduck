# Gentrification Domain Expert Sign-off: B2 Back-Test Harness

- **Scope:** R-B2 #71 — `analysis/backtest_index.py`, `transform/seeds/seed_gentrification_ground_truth.csv`, `docs/methodology/backtest.md`
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-29
- **Verdict:** PASS

---

## Scope of review

This domain review assesses:
1. Whether the `seed_gentrification_ground_truth.csv` PLR labels correctly reflect the Berlin gentrification literature and housing-policy record
2. Whether the back-test harness's test design is appropriate for validating a gentrification vulnerability index
3. Whether the label semantics (hotspot / coldspot / mixed) are correctly operationalised

---

## Assessment

### 1. Ground-truth label validity — Berlin urban sociology perspective

**Hotspot PLRs (n=8):**

- **Rollberg, Wartheplatz, Schulenburgpark, Soldiner Straße, Koloniestraße (North Neukölln / Wedding):** These five PLRs are the canonical Berlin displacement-risk areas in the 2010s literature. Döring & Ulbricht (2016) specifically identify north Neukölln and Wedding as the leading active displacement zones of that period. By MSS 2025, these areas retain sehr_niedrig (4) or niedrig (3) social status, confirming they have not yet completed the gentrification transition and remain under active pressure. The labelling as `hotspot` is correct.

- **Prinzenstraße, Wassertorplatz (Kreuzberg SO36 fringe):** South-of-the-canal Kreuzberg has been under documented gentrification pressure since the mid-2010s, expanding from the Kottbusser Tor nucleus. MSS 2023/2025 assigns these PLRs Status=4, consistent with the pre-gentrification vulnerability reading. The labelling is correct; the citations are appropriate.

- **Silbersteinstraße (southern Neukölln):** Holm & Schulz (2016) document the southward expansion of the Neukölln gentrification wave. A niedrig (3) status with positiv (improving) dynamism in 2025 is the textbook pioneer-signal configuration, consistent with early-stage commercial succession pressure. Labelling as `hotspot` is reasonable.

**Assessment: All 8 hotspot labels are defensible and correctly grounded in peer-reviewed Berlin gentrification literature. PASS.**

**Coldspot PLRs (n=6):**

- **Dahlem, Wannsee, Nikolassee (Steglitz-Zehlendorf):** Established affluent outer-city areas. Dahlem is a university quarter with stable professional demographics; Wannsee and Nikolassee are villa-character lakeside residential areas with consistently high MSS status. These are standard examples of low-gentrification-pressure outer Berlin in the literature (e.g., Holm 2016; DIW housing reports). The labelling as `coldspot` is correct.

- **Alt-Gatow, Kladower Damm (Spandau):** Outer western Spandau with rural/village character and low population density. Structural absence of gentrification preconditions (low transit connectivity, low commercial density, low in-migration). Coldspot labelling is correct.

- **Dörfer Malchow-Wartenberg (Lichtenberg fringe):** Rural-character eastern fringe, structurally similar to Spandau examples. MSS Status=1 reflects persistent low vulnerability. Coldspot labelling is correct.

**Assessment: All 6 coldspot labels are consistent with the urban-sociology and housing-policy record for outer Berlin. PASS.**

**Mixed PLRs (n=4):**

- **Helmholtzplatz, Kollwitzplatz (Prenzlauer Berg):** These two are the textbook *completed* gentrification cases in Berlin. Kollwitzplatz is described in Holm (2006) and Holm & Schulz (2016) as fully gentrified by 2015; it now shows hoch (1) MSS status. Helmholtzplatz completed the transition somewhat later but shows mittel (2) by 2025. The `mixed` label (rather than `hotspot`) correctly reflects that the gentrification process has concluded — these areas are no longer sites of active displacement pressure, having become high-status residential areas. The seed's note that "completed gentrification areas will NOT appear in the top decile" is methodologically critical and correctly stated.

- **Reuterplatz (Reuterkiez, northern Neukölln):** Döring & Ulbricht (2016) document Reuterkiez as one of the key gentrification flashpoints of the 2011-2016 period. By 2025, the area shows mittel (2) status and stable dynamics — the wave has passed and the area has stabilised at a mid-status level. The transition from `hotspot` (pre-2016) to `mixed` (post-stabilisation) is well-documented in the literature. The labelling is correct.

- **Boxhagener Platz (Friedrichshain):** The 2018 thesis (§4.3) documents the gentrification cycle as concluded; MSS 2025 shows mittel (2) stable-established. Consistent with the empirical record. Labelling is correct.

**Assessment: All 4 mixed labels correctly identify completed-gentrification PLRs and are appropriate for exclusion from both the hotspot and coldspot recall tests. PASS.**

### 2. Back-test design — domain appropriateness

**Temporal framing:** The back-test compares the *current* (2025) live index against *current* MSS 2025 status. This is the correct comparison for a vulnerability index whose goal is identifying currently-at-risk neighbourhoods. The seed labels are assigned based on *current* MSS status (hotspot = currently deprived, not historically deprived), which is consistent.

**What the test proves and what it does not:** The back-test validates that the index correctly identifies currently-deprived areas (Test A: pipeline alignment; Tests B/C: tail discrimination). It does not validate predictive power (does high status_index in 2020 predict gentrification pressure in 2025?) — that requires a longitudinal evaluation which is appropriately deferred to future tickets (A8 trajectory, A9 spatial-dynamic). For a B2 ground-truth check, the current design is fit for purpose.

**The completed-gentrification distinction is the key methodological contribution of this seed.** Many Berlin gentrification assessments confuse *historically gentrified* areas with *currently at-risk* areas. The Helmholtzplatz and Kollwitzplatz labelling as `mixed` (not `hotspot`) reflects the correct urban-sociology reading: a gentrified area is one where displacement has already occurred; it is no longer the site of current pressure. A vulnerability index should not flag these areas as vulnerable in 2025 — the back-test design correctly reflects this.

**Assessment: The back-test design is appropriate for a ground-truth validation of a current gentrification vulnerability index. PASS.**

### 3. Literature grounding adequacy (R-C2)

The citations cover:
- Döring, T. & Ulbricht, K. (2016): peer-reviewed displacement-risk geography study, primary source for North Neukölln/Wedding hotspot labels.
- Holm, A. & Schulz, M. (2016): peer-reviewed Berlin gentrification typology, primary source for Prenzlauer Berg mixed labels and Neukölln extension.
- Helweg, D. (2018): the project's own thesis, cited for the Prenzlauer Berg mixed PLRs and Friedrichshain case.
- MSS 2023/2025: official Senate monitoring data, the ground-truth source for MSS-sourced labels.

The R-C2 grounding rule is satisfied: all labels have explicit citations with source type identified. PASS.

---

## Conditions

1. **[Advisory, G2 methodology page]** The public-facing methodology page should explain why Helmholtzplatz and Kollwitzplatz are labelled `mixed` rather than `hotspot` or `coldspot`, with a brief note on completed gentrification in the Berlin context. This is important for interpretability by non-specialist readers.
2. **[Advisory, future seed extension]** The seed currently has no hotspot PLRs from eastern Berlin (Mitte East, northern Pankow beyond Prenzlauer Berg, Lichtenberg). The gentrification literature has identified pressure in parts of Lichtenberg (Pfarrstrasse area) since the late 2010s. A future seed expansion should consider these to test whether the index identifies emerging hotspots outside the traditional western inner-city belt.

---

## Verdict

```json
{
  "verdict": "PASS",
  "scope": "R-B2 #71 — B2 ground-truth back-test harness",
  "rationale": "All 18 PLR labels in seed_gentrification_ground_truth.csv are correctly grounded in the Berlin gentrification literature and MSS record. The hotspot/coldspot/mixed semantic distinction is the correct operationalisation of the urban-sociology literature on completed vs active gentrification. The back-test correctly validates current vulnerability discrimination, not historical gentrification prediction. All three tests pass their thresholds. The domain labelling is fit for use as a regression guard (CI back-test) and as supporting evidence for the G2 methodology page.",
  "risks": [
    "Seed skews toward western inner city and southern Neukölln; eastern Berlin hotspots (Lichtenberg pressure zones) are not represented",
    "Mixed PLRs are used for narrative context only; no formal test covers them"
  ],
  "recommendations": [
    "Extend seed to include 2-3 Lichtenberg/eastern Berlin pressure-zone PLRs in a follow-up ticket",
    "Explain completed-gentrification semantics in plain language on the G2 methodology page"
  ]
}
```

Verdict: PASS

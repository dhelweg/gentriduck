# Gentrification Domain Expert Sign-off: R-A8 Longitudinal Trajectory Model

- **Scope:** R-A8 #78 — `transform/models/marts/fct_gentrification_trajectory.sql`
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-29
- **Verdict:** PASS WITH CONDITIONS

---

## Scope of review

This domain review assesses:
1. Whether the five trajectory types correctly operationalise Dangschat's invasion-succession framework
2. Whether the stage naming is appropriate for the Berlin gentrification context
3. Whether the cross-validation against known hotspot/coldspot PLRs is interpretively sound

---

## Assessment

### 1. Trajectory type alignment with Dangschat (1988) invasion-succession theory

The five trajectory types are:
- `stable-established` — consistently low deprivation throughout
- `persistently-deprived` — consistently high deprivation throughout
- `improving` — measurable D1 status improvement over the panel
- `declining` — measurable D1 status worsening over the panel
- `mixed` — no clear dominant trend

**Theory alignment assessment:**

**`stable-established` (Dangschat: pre-invasion stable zone):** Correctly captures the outer-city
affluent areas that do not enter the gentrification cycle because they lack the preconditions
(low rents, artistic/pioneer amenability). These are Dangschat's "stable" zones outside the
invasion-succession cycle. The naming is appropriate.

**`persistently-deprived` (Dangschat: high-pressure frontier):** This is the critical category
for gentrification analysis. Dangschat's model identifies high-deprivation inner-city areas as the
frontier of the invasion-succession cycle — the areas where pioneers settle because rents are low
and social control is reduced. The trajectory label correctly captures the persistence of this
deprivation, which is both the precondition for gentrification pressure AND a signal that
displacement may be ongoing (rents rising but population not yet "upgraded" by MSS classification).
The naming is appropriate and analytically correct.

**`improving` (Dangschat: succession phase / potential completion):** This is the most
interpretively complex category. In gentrification theory, a documented improvement in D1 status
(fewer deprived residents, better social indicators) can signify:
(a) **Completed gentrification** — displacement has occurred, original low-income residents have
    left, and the area's composition has shifted (the Prenzlauer Berg scenario).
(b) **Incumbent-led improvement** — genuine social mobility of existing residents without
    displacement (less common in Berlin).
(c) **Early pioneer-stage improvements** — first-wave investments improving infrastructure
    without full displacement yet.

The domain expert notes that the trajectory alone cannot distinguish these mechanisms — D5
(Milieuschutzgebiete, rent burden, turnover data from R-B1 #70) is required for that disambiguation.
**This limitation must be stated on the methodology page.** The `improving` label is descriptively
accurate and is correctly not overinterpreted in the mart itself. PASS (with G2 caveat — Condition 1).

**`declining` (Dangschat: vulnerability escalation / counter-trajectory):** An increase in
deprivation over the panel indicates either urban decline (suburban deconcentration or economic
shock), demographic shift (arrivals of more vulnerable populations), or policy failure. This is
NOT a gentrification trajectory in Dangschat's model — it is the counter-trajectory. The label
`declining` is appropriate and correctly signals that these 44 PLRs warrant separate analytical
attention. The methodology page should note that `declining` PLRs may require a different policy
response from `persistently-deprived` ones (worsening vs. persistent vulnerability).

**`mixed`:** Correctly reserved for indeterminate cases. With only 3 editions currently, `mixed`
is vacuous (all PLRs have clear classifications), which is noted in the geo-DS sign-off.

**Overall theory alignment: PASS.** The five types correctly map onto the Dangschat framework,
with the noted caveat that `improving` requires D5 data to distinguish gentrification-completion
from other improvement mechanisms.

### 2. Cross-validation against ground-truth seed — domain interpretation

**Hotspot PLRs:**
- Rollberg, Wartheplatz, Schulenburgpark (Neukölln), Soldiner Str., Koloniestr. (Wedding),
  Prinzenstraße, Wassertorplatz (Kreuzberg): all `persistently-deprived` with mean status_index = 4.0.
  This is the expected result: these are areas where displacement pressure has been documented since
  the 2010s but D1 MSS status has remained at sehr_niedrig (4) through 2025, indicating that the
  invasion-succession cycle has not yet materially improved the statistical social composition of these
  areas — either because displacement is still in progress, or because the poverty concentration is
  too deep for the current level of gentrification pressure to register at the PLR level.

- Silbersteinstraße (Neukölln): `improving` with status_delta = -1 (3→2). This is the Holm & Schulz
  (2016) pioneer-signal area. A move from niedrig (3) to mittel (2) over 2021–2025 is consistent
  with early-stage gentrification succession — pioneers have arrived, commercial succession is
  underway (high D2 dynamism), and the statistical population composition has begun to shift. This
  is the EXPECTED outcome for a pioneer-signal area: it should eventually move out of the
  persistently-deprived category. NOT a misclassification; it confirms the model's sensitivity to
  the process stage.

**Coldspot PLRs:**
- Dahlem, Wannsee, Nikolassee, Kladower Damm, Dörfer Malchow-Wartenberg: all `stable-established`
  with mean status_index = 1.0. Correct — these are the canonical stable outer-city affluent areas.

- Alt-Gatow (Spandau): `improving` with status_delta = -1 (2→1). Alt-Gatow improved from mittel (2)
  to hoch (1) over the panel. This is directionally correct for a stable outer-city area: it has
  always been low-deprivation and is moving toward even lower deprivation levels. The `improving`
  classification is technically accurate; the `is_persistently_affluent = True` flag correctly
  captures its overall low-deprivation character. No concern here.

**Domain validation: PASS.** All 14 PLRs receive trajectory assignments consistent with their
known Berlin gentrification/social-development trajectories.

### 3. Stage naming for public communication (G2)

The trajectory type names are technically appropriate for the dbt mart. For the public methodology
page (G2), the names need plain-language explanations:

- `stable-established` → "Stable affluent areas (low and consistent deprivation throughout 2021–2025)"
- `persistently-deprived` → "Chronically deprived areas (high vulnerability throughout 2021–2025; primary gentrification pressure zones)"
- `improving` → "Areas with improving social indicators (caution: may reflect completed gentrification with displacement, not genuine social mobility — requires context)"
- `declining` → "Areas with worsening social indicators (vulnerability increasing; counter-gentrification or urban decline trajectory)"
- `mixed` → "Indeterminate trajectory (insufficient data or complex pattern)"

**Condition 2 (advisory for G2):** Add these plain-language descriptions to the methodology page.
The `improving` type in particular requires careful framing to avoid misinterpretation as
unambiguously positive social change.

---

## Conditions

1. **[Binding, G2 pre-condition]** The methodology page must note that the `improving` trajectory
   type cannot be interpreted as unambiguous positive social change without D5 displacement data
   (Milieuschutzgebiete, rent burden, turnover — R-B1 #70). `Improving` may reflect completed
   gentrification with displacement rather than genuine social mobility of incumbent residents.

2. **[Advisory, G2 wording]** Add plain-language trajectory type descriptions (see §3 above) to
   the methodology page. Avoid using the technical labels (`persistently-deprived`) without
   explanation on the public-facing page.

3. **[Advisory, future R-A8 extension]** When the full 7-edition panel is available (2013–2025),
   distinguish between areas that were `improving` early and later stabilized vs. areas in ongoing
   succession. This enriches the Dangschat temporal framing.

---

## Verdict

```json
{
  "verdict": "PASS WITH CONDITIONS",
  "scope": "R-A8 #78 — fct_gentrification_trajectory mart",
  "rationale": "The five trajectory types correctly operationalise the Dangschat (1988) invasion-succession framework. The ground-truth cross-validation is interpretively sound: persistently-deprived hotspots and stable-established coldspots behave as expected; the Silbersteinstraße pioneer-signal improvement is the correct result for an early-stage gentrification area. Conditions: (1) note on methodology page that improving trajectory requires D5 data to distinguish completed-gentrification from genuine social mobility; (2) add plain-language trajectory descriptions for G2.",
  "risks": [
    "improving trajectory type risks misinterpretation as unambiguously positive social change without displacement context (D5 data — R-B1 #70)",
    "declining trajectory type requires separate policy framing from persistently-deprived — both are vulnerability zones but with different dynamics",
    "Trajectory based on 3 MSS editions (2021-2025) only — full Dangschat multi-phase arc requires 7 editions"
  ],
  "recommendations": [
    "Add D5 displacement caveat to improving trajectory description before G2",
    "Frame declining PLRs separately from gentrification hotspots on the public site",
    "Extend to full 7-edition panel when POI pipeline covers pre-2021 years"
  ]
}
```

Verdict: PASS WITH CONDITIONS

# Domain-Expert Sign-off: R-A1 (#64) Index Definition

- **Scope:** R-A1 #64 — governed index definition (`docs/methodology/index-definition.md`)
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-20
- **Branch:** feat/64-ra1-index-reground
- **Operationalizes:** ADR-0008 (multi-dimensional gentrification model, #77)
- **Verdict:** PASS WITH CONDITIONS

---

## Remit

My gate covers *domain validity*: theory fidelity (Dangschat 1988/2000 double invasion-succession;
Döring & Ulbricht 2016; Smith rent-gap scope; Berlin MSS/EWR frame, Holm 2010) and *indicator
meaning*. Statistical/spatial soundness is the geo-DS gate (`R-A1-geo-signoff.md`, still PENDING at
time of writing). Both must read `Verdict: PASS`/`PASS WITH CONDITIONS` before the DE pair codes.

I read the full `index-definition.md`, my prior `R-A7-domain-signoff.md`, and verified the two
load-bearing reference claims directly against `reference/system/50_lor_mss_idx_bzr_idx.sql`.

---

## Verification of the two load-bearing reference claims

**D1 polarity inversion (verified against the 2018 source).** In
`reference/system/50_lor_mss_idx_bzr_idx.sql`, `status_summe` is z-standardized and the class logic
maps the **high** z end (high `status_summe`) → `niedrig`/`sehr niedrig` and the **low** z end →
`hoch`. So in the thesis **higher `status_summe` = worse (more deprived) status**. The MSS published
class the document anchors D1 on encodes **`1=hoch` (highest status) … `4=sehr_niedrig` (lowest)**,
i.e. **lower numeric = higher status**. These are genuinely *inverse numeric scales encoding the
identical deprivation gradient*. The document states this correctly and unambiguously in §1.4, §5
(polarity table + worked example), and §9. **Claim confirmed, not merely asserted.**

**Dynamik ordering (verified).** The same reference maps `negativ` (worsening) to the **high** z end
and `positiv` (improving) to the **low** z end. The document's convention — `1=positiv` (improving),
`2=stabil`, `3=negativ` (worsening), with `3=negativ` the vulnerability-positive end — is consistent
in *meaning* with the thesis, and §1.4/§3.4 correctly make the empirical `{1,3,5}→{1,2,3}` code-order
confirmation a **binding pre-consumption gate** rather than an assumption. Correct.

---

## Focus-area findings (as tasked)

### (a) Stage names satisfy the G-1 displacement-event guardrail — YES

§1.2 G-1 explicitly **prohibits** `post-displacement` and mandates risk/signal/pressure framing
(`consolidation-pressure`, `high-displacement-signal`). The controlled stage list (§1.3) contains no
name asserting an observed displacement *event*; the most advanced stage is `consolidation-pressure`,
labelled "**Elevated displacement-pressure signal, NOT confirmed displacement (G-1)**", and §9 Stage 4
reiterates "**NOT 'post-displacement'**". G-2 supplies the ecological-inference disclaimer ("PLR-level
aggregate; not an individual- or building-level statement … ecological fallacy") as a required mart
comment and public rendering. This is a faithful operationalization of ADR-0008 Decision 5 into the
public product and of Lees/Slater/Wyly's caution on the politics of measurement. **G-1/G-2 discharged.**

One naming nuance, raised as a non-blocking condition (D-1 below): the `improving-vulnerable` *named
tension cell* is theoretically the strongest contribution here (it honestly refuses to force the "low
Status + positiv Dynamik" cell into `pioneer-signal`), but it must be presented on G2 as **"the model
cannot yet distinguish incumbent-led improvement from early gentrification"**, not as a stage on the
gentrification *path*. §1.3 note and §1.5 footnote `†` already say this; I want it preserved verbatim
into G2 so the public reading is not "this Kiez is gentrifying".

### (b) D4 endogeneity discipline is airtight — YES

This was my principal R-A7 concern and it is now firewalled at three independent layers:

1. **Role declaration (§0.2, §4):** D4 is typed "Predictor/baseline covariate", and §1.1 states D4
   "does **not** define a stage."
2. **Levels-vs-changes rule (§4.3, binding):** D4 enters the model *only* as a baseline LEVEL;
   D4-change features are excluded from the vulnerability/baseline block by design and, *if* admitted
   at all, must sit on the predictor/early-warning side **lagged identically to D3**. The recommended
   R-A1 default is to **exclude D4 changes from the predictor block** pending a §8 no-leakage
   demonstration. This directly discharges my R-A7 domain C2 and C3.
3. **Per-variable classification (§4.5)** and the **exclusion rule (§7.5)** make the firewall
   machine-checkable: each of the five inputs has an explicit "level = baseline / change =
   outcome-proxy" verdict grounded in Döring–Ulbricht (a falling long-tenure/foreigner/migration
   share *is* the demographic face of gentrification-in-progress, hence near-tautological as a
   contemporaneous predictor — §4.2). The §4.6 paragraph explicitly **resolves** (not just notes) the
   R-A5 levels-vs-changes divergence from the thesis. This is exactly what R-A7 condition 2 demanded.

The drop-D4 endogeneity sensitivity run (§8.4) closes the loop empirically. **C2/C3 airtight.**

### (c) D1 polarity inversion is documented so a developer cannot mis-implement it — YES

The inversion is stated in **four** mutually-reinforcing places, each with the
`reference/system/50_lor_mss_idx_bzr_idx.sql` citation: §1.4 (cell directions), §5 polarity table row
D1 ("INVERSE numeric vs 2018 thesis"), the §5 **worked end-to-end sign example**
(`2018-high-status_summe ↔ status_index = 4 ↔ most-vulnerable`), and §9 Stage 0. Critically, §5 carries
the binding instruction: "**The DE pair must put this note as a SQL comment in every model that touches
D1.**" Combined with the §3 ordinal-only treatment (flip is "for orientation reasoning only; never
metric-average codes"), a developer has no path to silently invert the deprivation gradient. **Best
in the document; fully discharged.**

### (d) Theory framing (Dangschat, Döring-Ulbricht) accurately operationalized — YES

- **Dangschat double invasion-succession** is operationalized as the lead-lag spine: the *social*
  cycle (D1/D2 movement) **leads** the *commercial* cycle (D3), the thesis's H3b-confirmed/H3a-rejected
  finding (p. 91). §2.1 fits *both* directions and treats H3b dominance as a **reported test outcome,
  not a hard-coded assumption** (my R-A7 condition 3) — theoretically and ethically the correct posture.
  §9 maps each stage to a cycle phase consistently.
- **Döring & Ulbricht (2016)** correctly grounds D4 polarity and the precondition-vs-process
  distinction (§0.4, §4.1–4.2, §4.5): demographic *composition* as an *initial condition* of
  susceptibility vs. demographic *change* as the process signature. Accurate.
- **Smith rent-gap scope limit** is honestly stated (§0.4): the model captures the social outcome and
  commercial/demographic correlates, **not** the capital/rent *driver*, deferred to D5. This carries
  my R-A7 Note B and must reach G2 unaltered.
- **Milieuschutz as overlay, not stage (§1.8):** correctly framed as simultaneously a pressure *signal*
  and a displacement-*suppressing* intervention; folding it into a stage would conflate a risk signal
  with its own treatment effect. Carries R-A7 Note A. Correct.

---

## Discharge of my prior R-A7 domain conditions

| R-A7 condition | Status | Where |
|---|---|---|
| **C1** — no displacement-event stage names; small-area ecological-inference disclaimer; D1 polarity inversion documented; Dynamik ordering confirmed | **DISCHARGED** | §1.2 (G-1/G-2), §1.3, §1.4, §1.5, §3.4, §5 |
| **C2** — D4 is a cross-sectional baseline LEVEL only; D4 changes are near-tautological outcome proxies, excluded/lagged; levels-vs-changes resolved | **DISCHARGED** | §4.1–§4.6, §7.5 |
| **C3** — D4 changes (if any) lagged identically to D3; H3b outcome→predictor headline; no contemporaneous D4 leakage | **DISCHARGED** | §2.1, §4.3 |
| **C4** — carry R-A3 C1–C4 and R-A5 condition 3 explicitly into the R-A1 note | **DISCHARGED** | §1.4, §1.7, §3.4, §4.4, §6, §7, §10 checklist |
| **Note A** (Milieuschutz biased pressure proxy) | **Honored** | §1.8 |
| **Note B** (no rent-gap/driver claim until D5) | **Honored** | §0.4 |
| **Note C** (cross-city outcome-construct labelling) | **Deferred to G2 (out of R-A1 scope)** | see D-3 below |

All four binding R-A7 domain conditions are discharged in the text.

---

## Eight session-3 requirements (domain view)

1. Typology stage names & cut-points / invasion-succession / D1 inversion — **OK** (§1, §5, §9).
2. Lead-lag with C5 correction before POI enters — **OK** (§2.1–§2.4); C5-before-lead-lag is binding.
3. D1 ordinal treatment (ordered logit / rank only) — **OK** (§3).
4. D4 baseline discipline (level not contemporaneous predictor) — **OK** (§4).
5. Polarity reference table with worked D1-inversion example — **OK** (§5).
6. LOR vintage-break handling — **OK** domain-wise (§6); statistical adequacy of the crosswalk is the
   geo-DS call, but §6.3's ordinal caveat (you cannot areally average an MSS class; use dominant-weight
   and flag approximate) is **domain-correct** and I endorse it.
7. Exclusion rules (uninhabited `gesamtindex IS NULL`; `transferbezug` null → MISSING not zero) — **OK**
   (§7.1, §7.2).
8. Sensitivity plan — **OK** domain-wise (§8); the drop-D4 endogeneity run (§8.4) is the one I care
   about most and it is present.

---

## Remaining conditions (PASS WITH CONDITIONS — all actionable during DE implementation)

These do **not** block the start of coding; they are checks the DE pair and the G2 author must honor.
None requires re-opening the conceptual architecture.

- **D-1 (G2 framing of `improving-vulnerable`).** Carry the §1.3/§1.5-`†` honesty caveat verbatim into
  the G2 methodology page: this cell flags *model ambiguity* (incumbent-led improvement vs early
  gentrification, unresolvable until D5), and must **not** be rendered publicly as a confirmed point on
  the gentrification path. (Ethics: avoiding a self-fulfilling "this Kiez is next" reading.)

- **D-2 (Dynamik tension-cell sign guard is a hard rule, not advisory).** The §1.5 `*` tension cells
  (negativ Dynamik in a high/mid-status PLR = *decline*, not gentrification) require that an upgrading
  stage have **D2 ∈ {positiv, stabil} as a necessary condition**, and that a D3 commercial signal in a
  *declining* high-status PLR does **not** promote it to an upgrading stage. The geo-DS owns the
  encoding, but I flag for the gate: this rule is **domain-binding**, not a nicety — mis-encoding it
  would label filtering-down decline as gentrification. Confirm it survives into the SQL.

- **D-3 (Note C carry-forward — out of R-A1 scope, into G2).** When the model goes multi-city, the
  "generic social-status outcome" slot means the *outcome construct differs by city* (official MSS-style
  monitor vs reconstructed SES). G2 must label which cities have an official-monitor outcome. Tracked
  for G2; not an R-A1 deliverable.

- **D-4 (R-C2 grounding into SQL, verified by the reviewer not by me).** The document repeatedly
  instructs the DE pair to copy the thesis/EWR/literature citation into the implementing model's SQL
  comment (notably the D1-inversion note, the C5-before-lead-lag note, and the transferbezug
  MISSING-not-zero note). I cannot verify SQL that does not yet exist; the **data-engineer-reviewer**
  must confirm these citations land in the models per R-C2 at PR review. Flagging so it is not lost
  between the methodology gate and code review.

---

## Certification

From the domain-validity perspective, `docs/methodology/index-definition.md` is theoretically sound,
faithful to the 2018 thesis (H3b confirmed / H3a rejected, p. 91), to Dangschat's (1988) double
invasion-succession cycle, to Döring–Ulbricht (2016), and to the Berlin MSS/EWR frame (Holm 2010). All
four R-A7 domain conditions (C1–C4) and all eight session-3 requirements are addressed; the
displacement-event guardrail (G-1/G-2), the D4 endogeneity firewall, and the D1 polarity-inversion
documentation are airtight.

**The DE pair may proceed with R-A1 implementation**, subject to (i) the geo-DS recording its own
`PASS`/`PASS WITH CONDITIONS` in `R-A1-geo-signoff.md`, and (ii) the data-engineer-reviewer verifying
conditions D-2 and D-4 land in the implementing SQL at PR review. Conditions D-1 and D-3 are G2-page
obligations tracked forward.

---

## Final Verdict

Verdict: PASS WITH CONDITIONS

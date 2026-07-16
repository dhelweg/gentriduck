# Gentrification Domain Expert Sign-off: R-B2c (emerging-east ground-truth label + Test E)

- **Scope:** R-B2c #278 — branch `feature/278-r-b2c-emerging-east` (commits `5b0c37d7`, `494283f7`)
  - New `emerging-east` label on `seed_gentrification_ground_truth.csv` (4 Lichtenberg PLRs)
  - New Test E (dynamism-aware recall) in `analysis/backtest_index.py`
  - Write-ups in `docs/methodology/backtest.md`, `transform/seeds/schema.yml`
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Gate:** R-C1 methodology-bearing; dual gate with geo-data-scientist (running in parallel)

## Verdict: PASS with conditions

Conditions 1 and 3 below are **blocking** — they must be implemented and re-verified before the
PM integrates into `develop`. This is **not** a clean `Verdict: PASS`. Condition 2 is to be settled
jointly with the geo-DS (statistical framing is their gate); condition 4 is already satisfied and
must simply be preserved.

I want to be explicit up front about what the data-engineer got *right*, because two of their review
decisions were exactly the calls I would have made:

- **Refusing to ship the loose (`D2 <= 2`, "non-declining") reading was correct.** My R-B2b wording
  "D2 (improving dynamism)" means MSS D2 = 1 (*positiv*), full stop. D2 = 2 is *stabil*, not
  improving; folding it in produced a 169/542 (31%) citywide match that is vacuous as an
  eastern-frontier discriminator (only 9/169 in Lichtenberg) and would have manufactured a
  falsely-reassuring PASS. The strict `dynamik_index == 1` tightening **faithfully honors my
  literal criterion**. Endorsed.
- **Not relabeling the seed unilaterally and deferring the design call to this gate was correct.**
  That is precisely how a methodology-bearing decision should be routed.

The problem is not honesty or pipeline correctness. The problem is a **theory-fidelity defect in the
label construct itself**, which the honest 0.25/FAIL surfaces but does not fix.

---

## Ruling on Open Question 1 — should 0.25/FAIL stand, or restructure?

**Restructure. The 0.25/FAIL must not ship as-is.**

The framing in the ticket — that a uniform 0.25/FAIL is "faithful to your original distinction" — has
it backwards. My R-B2b candidate table drew a *substantive theoretical distinction* between two
different invasion–succession states:

- **Roedeliusplatz** (`11300724`): labelled `emerging-east (hotspot-by-dynamism)`, **archetype** —
  D1=2 / **D2=1 (improving)** / typology `active-gentrification`. This is an *active* frontier: the
  MSS dynamism axis is actually registering upward movement. This is the pioneer-signal state
  Dangschat's (1988) invasion–succession model predicts for a Gründerzeit quarter inheriting pressure
  across the former Ringbahn border from Friedrichshain.
- **Victoriastadt/Kaskelkiez, Weitlingkiez, Frankfurter Allee Süd** (`11400927`, `11400929`,
  `11300826`): labelled `emerging-east / **control**` — D1=2 / **D2=2 (stabil)**. These are
  documented Milieuschutz Altbau pressure zones that are *watched but not currently accelerating* on
  the D2 axis. They are the **contrast cases** — what a frontier at mittel status looks like *without*
  an improving-dynamism signal.

Testing all four uniformly against the "improving dynamism" criterion **erases** that distinction and
then reports the erasure as a FAIL. That is the opposite of faithful. It treats three deliberately-chosen
*controls* as if they were *positives*, and the resulting 0.25 recall is an artifact of the mislabeling,
not a real finding about the pipeline or the label. Worse, it is a category error of exactly the kind
this gate exists to catch: it conflates two distinct theoretical states (active vs. watched frontier)
under one recall target. Shipping it would leave a permanent "ONE OR MORE FAIL" on the public back-test
that actually reflects a construct-definition mistake, not a discriminator failure.

**Required resolution (SPEC design Option 2, which my R-B2b sign-off already named as the alternative):**
separate the archetype from the controls.

1. Move the three D2=2 *stabil* PLRs (`11400927`, `11400929`, `11300826`) out of the **Test-E-gated**
   `emerging-east` positive set into an explicitly **non-gating** descriptive/"watch" role — my
   original "control" designation. Whether this is a new `accepted_values` label (e.g.
   `emerging-east-watch` / `frontier-control`) or a retained-but-not-scored partition inside
   `emerging-east` is an implementation choice for the data-engineer; the invariant is that these three
   **must not count as recall misses** against the improving-dynamism criterion, because they were never
   expected to meet it.
2. Test E's recall must then be computed **only over the true active-frontier archetype(s)** — currently
   just Roedeliusplatz (D2=1). Any future PLR that reaches D2=1 under Milieuschutz can be promoted into
   the scored set.

This is faithful to the literature (it keeps `active-gentrification` and `stable-established`
distinct — the ADR-0008 D1×D2 matrix already encodes them as different typology stages) and faithful to
my original candidate table (archetype vs. control).

## Condition 2 — the restructured test is underpowered; coordinate framing with geo-DS

With the positive set reduced to n=1 (Roedeliusplatz), a "recall ≥ 0.5" gate cannot carry a meaningful
pass/fail inference: 1/1 is not a validated PASS any more than 0.25 was a pipeline FAIL. From the domain
side the value of the `emerging-east` rows is **descriptive ground-truth coverage extension** into
eastern Berlin, not a powered validation test. I therefore recommend Test E be reported as a
**descriptive coverage check / non-gating diagnostic** at the current corpus size rather than a hard
gate. The exact statistical treatment (whether to gate at all at n=1, how to word the power caveat) is
the **geo-DS's call** — I flag it and defer the mechanism to their parallel sign-off. My only domain
requirement here is that neither a 1/1 PASS nor a 0.25 FAIL be presented as evidence about the
*construct's validity*.

## Ruling on Open Question 2 — Milieuschutz-implies-Altbau substitution

**Defensible for these four specific PLRs; the general assertion is domain-incorrect and is a blocking
wording fix.**

Two separate claims are tangled together in the current code/docs and must be pulled apart:

- **Per-PLR (correct, I confirm it):** For these four specific Lichtenberg PLRs, the Altbau /
  Gründerzeit criterion *is* satisfied, and I can confirm this from my R-B2b research and the cited seed
  notes — Roedeliusplatz (Altbau Soziale-Erhaltungsgebiet), Victoriastadt/Kaskelkiez ("one of
  Lichtenberg's oldest Gründerzeit-Altbau quarters"), Weitlingkiez (classic Lichtenberg-Mitte Altbau
  pressure zone), Frankfurter Allee Süd (Gründerzeit corridor Soziale-Erhaltungsgebiet). For *this
  corpus*, Milieuschutz and Altbau genuinely co-occur, so using the Milieuschutz flag as the
  computational gate does not misclassify any of the four. The substitution is acceptable **for these
  four rows**.
- **General (incorrect, must be removed):** The code comment's assertion that "Milieuschutz designation
  implies Altbau" is **false as a universal rule** and must not be shipped as a settled fact. Berlin
  Soziale-Erhaltungsgebiete are designated under **§172 BauGB to protect the social composition of the
  resident population against displacement — not by building era.** A Soziale-Erhaltungsgebiet can, and
  some do, include non-Altbau stock (interwar Siedlungen, mixed or postwar stock). The
  `int_berlin_milieuschutz_plr_flag` model header itself describes the flag as "a direct §172 BauGB
  policy marker of displacement risk" — a *social*-protection marker, precisely not a building-vintage
  marker. Generalizing "Milieuschutz ⇒ Altbau" would break the moment this label is extended to other
  Berlin PLRs or to another city (Epic H).

**Required (blocking):** replace the general "Milieuschutz implies Altbau" assertion — in the
`backtest_index.py` docstring/comment, `backtest.md`, and `schema.yml` — with a per-PLR statement:
*Altbau/Gründerzeit stock is domain-confirmed for these four specific Lichtenberg
Soziale-Erhaltungsgebiete (cited per-row in the seed notes, from R-B2b research); Milieuschutz is used
as the computational gate only because the warehouse has no PLR-level building-era column, and for these
four the two coincide. This coincidence is NOT assumed to generalize — §172 BauGB protects social
composition, not building era.* With that caveat the substitution is sound. No warehouse/data change is
required — this is a wording/caveat correction.

## Core theory-fidelity question

Does a recall=0.25 on a 4-candidate label stand as an acceptable, honestly-disclosed outcome? **No — not
because dishonesty crept in, but because the number is honest about the wrong thing.** It honestly
reports that 3 of 4 rows fail a criterion they were never designed to meet, which is a symptom that the
`emerging-east` label as currently constituted conflates archetype and control. The label needs the
Option-2 redesign (Condition 1) before it is fit for the public-facing ground-truth corpus. Once the
archetype is separated from the controls, the honest description is: *one confirmed active eastern
frontier (Roedeliusplatz, improving dynamism) plus three watched Milieuschutz Altbau frontiers at stabil
dynamism* — which is both true and theoretically coherent.

## Condition 4 — descriptive-not-destined framing (already satisfied; preserve)

The ethics framing I required in the R-B2b SPEC **is** honored in the current write-up. `backtest.md`
states plainly: *"This is NOT an assertion that any of these areas are causally destined to displace or
complete gentrification -- it documents a currently observed pressure signal per the cited literature."*
`schema.yml` carries the matching guard ("Tracked descriptively at mittel status, not asserted as
causally destined to displace"). This is correct and must be preserved verbatim into any G2 methodology
page / O2 whitepaper surface. No change needed here — noted so the geo-DS and PM can see the framing
requirement is met.

---

## Verdict block

```json
{
  "verdict": "concerns",
  "verdict_label": "PASS with conditions (conditions 1 and 3 blocking)",
  "scope": "R-B2c #278 — emerging-east ground-truth label + Test E dynamism-aware recall, branch feature/278-r-b2c-emerging-east",
  "domain_rationale": "The strict D2==1 criterion faithfully honors my R-B2b 'improving dynamism' wording, and refusing the vacuous loose (D2<=2) PASS was the right call. But the label conflates two distinct invasion-succession states: my R-B2b table deliberately distinguished Roedeliusplatz (D2=1, active-gentrification, ARCHETYPE) from the other three (D2=2, stabil, CONTROL). Testing all four uniformly erases that distinction and reports the erasure as a 0.25 FAIL -- a mislabeling artifact, not a finding. The Altbau->Milieuschutz substitution is defensible per-PLR for these four confirmed Gruenderzeit Soziale-Erhaltungsgebiete, but the general 'Milieuschutz implies Altbau' assertion is domain-incorrect (Sec 172 BauGB protects social composition, not building era) and must be removed. Descriptive-not-destined framing is present and correct.",
  "theory_risks": [
    "Archetype/control conflation: folding three deliberately-chosen D2=2 'stabil' controls into a single Test-E-gated recall target treats them as positives and manufactures a FAIL that reflects a construct-definition error, not a discriminator or pipeline failure. Ships a permanent misleading FAIL on the public back-test.",
    "Over-generalized Altbau proxy: 'Milieuschutz implies Altbau' is false as a universal rule and would break when the label extends to other PLRs or cities (Epic H). Sec 172 BauGB Soziale-Erhaltungsrecht protects social composition, not building vintage.",
    "Underpowered gate: a 'recall >= 0.5' pass/fail on n=1 (post-restructure) carries no inferential content; neither 1/1 nor 0.25 should be read as evidence about the construct's validity (defer statistical treatment to geo-DS)."
  ],
  "recommendations": [
    "CONDITION 1 (blocking): Restructure per SPEC design Option 2. Move 11400927, 11400929, 11300826 (all D2=2 stabil) out of the Test-E-gated emerging-east positive set into an explicitly non-gating descriptive 'watch'/control role; they must not count as recall misses. Test E scores only the active-frontier archetype(s) (D2=1; currently Roedeliusplatz).",
    "CONDITION 2 (settle with geo-DS): report Test E as a descriptive coverage check / non-gating diagnostic at the current n=1 positive set rather than a hard recall gate; exact statistical framing is the geo-DS's call.",
    "CONDITION 3 (blocking): remove the general 'Milieuschutz implies Altbau' assertion from backtest_index.py, backtest.md and schema.yml; replace with a per-PLR domain-confirmed statement plus the Sec 172 BauGB 'social composition, not building era' caveat. Altbau IS confirmed for these four specific PLRs.",
    "CONDITION 4 (already met; preserve): keep the descriptive-not-causally-destined framing verbatim into G2/O2.",
    "ENDORSED: the strict D2==1 tightening and the refusal to ship the vacuous loose PASS are both correct; do not revert them."
  ]
}
```

**Verdict: PASS with conditions** (conditions 1 and 3 are blocking; the PM may not integrate into
`develop` until they are implemented and this sign-off is re-issued as a clean `Verdict: PASS`, and the
geo-DS's parallel gate is also clean).

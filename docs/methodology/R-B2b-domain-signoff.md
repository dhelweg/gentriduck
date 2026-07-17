# Gentrification Domain Expert Sign-off: R-B2b (dynamism back-test + ground-truth seed extension)

- **Scope:** R-B2b #264 — branch `feature/264-r-b2b-dynamism-backtest`
  - Item 1 (implemented): Test D dynamism back-test in `analysis/backtest_index.py` + `docs/methodology/backtest.md`
  - Item 2 (deferred to domain expert): eastern-Berlin / Lichtenberg ground-truth extension of `transform/seeds/seed_gentrification_ground_truth.csv`
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Verdict (item 1):** PASS
- **Decision (item 2):** SPLIT into a dedicated follow-up ticket (candidate PLRs + design question specified below)

---

## Item 1 — Test D (dynamism/D2 back-test): does it carry domain content?

**Short answer: no — Test D is a data-engineering pipeline-alignment check with no gentrification-theory
claim to gate. I sign it off as PASS, with one framing guard on how it may be described publicly.**

Test D computes a Spearman rank correlation between `gentrification_index.dynamism_index` (live_data
variant, latest period) and `int_gentrification_ts.dynamik_index` at the matching MSS edition. Both
columns carry the *same* MSS D2 (Dynamik) ordinal (1 = positiv/improving, 2 = stabil, 3 = negativ/declining)
sourced from `stg_berlin_mss`, reaching the two models via different paths. This is the exact D2 twin of
Test A, which the R-B2 geo-signoff already characterised as "a pipeline-alignment test, not a statistical
inference test."

From the domain lens, what a rho ≈ 1.0 here proves is purely mechanical: no polarity flip, no edition
mismatch, no vintage/join error between the mart and the intermediate model. It makes **no** claim about
any of the things that *would* be domain questions:

- It does **not** validate that MSS D2 is a faithful operationalisation of "dynamism" as a gentrification
  construct.
- It does **not** test the 2018 thesis's core lead–lag hypothesis (POI dynamism leading social-status
  change). That hypothesis lives in `int_mss_lead_lag` and is out of scope here.
- It does **not** exercise the ground-truth seed at all — Test D is a mart-vs-intermediate cross-check
  and never touches the labelled PLRs.

So the dual gate should **not** manufacture domain review where there is no domain question. Extending
back-test coverage to the D2 axis is directionally good (status alone under-covers the index; the geo-signoff
flagged this), and mirroring Test A's design is the right, minimal way to do it. I have no domain objection.

**One framing guard (advisory, binds G2 / whitepaper, not this PR):** because "dynamism" is a loaded term in
the gentrification literature — it is the *predictor/lead* side of the lead–lag hypothesis — the public
methodology page and any release notes must not let "Test D passed" imply that the index's dynamism
dimension has been *validated as a construct* or that the lead–lag relationship has been confirmed. Test D
confirms the D2 ordinal survives the pipeline intact, nothing more. The current docstring and `backtest.md`
text already state this correctly ("cross-validates that the mart and the intermediate model agree on the
MSS D2 ordinal … not a new statistical claim about dynamism per se"); keep that wording and do not upgrade
it downstream. Statistical soundness of the test mechanics (thresholds, Spearman on a 3-class ordinal,
n_paired guard) is the geo-DS's call, reviewed in parallel.

**Item 1 verdict: PASS.**

---

## Item 2 — eastern-Berlin / Lichtenberg ground-truth extension: SPLIT, with a turnkey starting point

I was asked to either (a) hand the data-engineer 2–3 concrete cited PLR codes to add directly, or (b) declare
that this needs deeper judgment than a quick pass allows and recommend a split. **I choose (b) — but I am
providing the concrete candidate PLRs and the precise design question so the follow-up is turnkey, not a
blank-sheet research task.**

### Why this is not a clean "add rows and it passes" task

The R-B2 seed operationalises `hotspot` as *"under active pressure **and** currently deprived (D1 status
3–4, top decile of `status_index`)."* That definition is **west-Berlin-shaped**: North Neukölln, Wedding and
the Kreuzberg canal fringe are gentrification frontiers that are *also* still sehr_niedrig/niedrig in status.
Test B (hotspot recall @ top decile of `status_index`) is built directly on that coincidence.

Eastern-Berlin gentrification does **not** have that shape, and querying the live warehouse (MSS latest
edition, `lor_2021`, Lichtenberg = bezirk 11) makes the tension concrete:

- The genuine, literature- and policy-documented Lichtenberg gentrification frontiers — the Altbau
  Soziale-Erhaltungsgebiete (Milieuschutz) inheriting pressure from Friedrichshain across the former
  Ringbahn border — all sit at **D1 = 2 (mittel)**, *not* 3–4:
  - `11400929` **Weitlingkiez** — Milieuschutz; D1 = 2, D2 = 2
  - `11400927` **Victoriastadt (Kaskelkiez)** — Milieuschutz; D1 = 2, D2 = 2
  - `11300826` **Frankfurter Allee Süd** — Milieuschutz; D1 = 2, D2 = 2
  - `11300724` **Roedeliusplatz** — Milieuschutz; D1 = 2, **D2 = 1 (improving)**, typology
    `active-gentrification`
- The only Lichtenberg PLRs that *are* D1 = 3–4 (top decile) are the **GDR-era Plattenbau estates** of
  Neu-Hohenschönhausen and the Wartenberg/Falkenberg fringe (`11100308` Zingster Straße West,
  `11100205/206` Wartenberg Süd/Nord, `11100203` Falkenberg Ost, `11300616` Hohenschönhauser Straße).
  These are deprived for reasons of large-panel-housing concentration of social disadvantage, **not**
  gentrification pressure. In rent-gap terms (Smith) they have little exploitable gap and are not
  Gründerzeit-Altbau invasion targets (Dangschat's invasion–succession model, Berlin context). **Labelling
  a Plattenbau estate as a gentrification "hotspot" would be a theory error** — precisely the
  "conflate deprivation-as-outcome with gentrification-as-process" mis-signing the domain gate exists to
  catch. I will not endorse adding these as hotspots.

So there is **no** Lichtenberg PLR that is simultaneously (i) a documented gentrification frontier and
(ii) top-decile deprived. The two candidate sets are disjoint. This is not incidental — it is the
substantive finding that eastern pressure manifests at *mittel status with rising dynamism*, not at
sehr_niedrig deprivation. Forcing the real frontiers (D1 = 2) into the `hotspot` label would enter them as
recall *misses* (they cannot be in the `status_index` top decile), quietly diluting the very metric the
R-B2 seed was carefully designed to keep meaningful by reserving `mixed` for areas that shouldn't be in the
top decile. That is a change to what Test B *measures*, i.e. a methodology-design decision — exactly the kind
of thing that should be reviewed on its own, not slipped in under a seed edit.

### Recommendation

Split item 2 into a new follow-up ticket (**R-B2c**, suggested). The correct extension is not "add three
rows" but one of:

1. **A dynamism-aware hotspot test.** Introduce an `emerging-east` (or `pressure-mittel`) label tested
   against **D2 (improving dynamism) + Milieuschutz + Altbau**, rather than against the `status_index` top
   decile. This is the faithful operationalisation of eastern invasion–succession frontiers and pairs
   naturally with the new D2 dimension. Roedeliusplatz (`11300724`, D2 = 1, `active-gentrification`,
   Milieuschutz) is the archetype.
2. **Or** add the frontier PLRs as an explicitly separate control class documented as *not* expected in the
   `status_index` top decile (analogous to how `mixed` is handled), so Test B's recall denominator is not
   silently changed.

Either path needs a short design note and a joint geo-DS ↔ domain sign-off, which is more than a
quick-pass ticket can carry.

### Turnkey inputs for the follow-up (so it is not starting cold)

Candidate eastern-Berlin ground-truth PLRs, with cited rationale matching the existing seed convention
(all LOR 2021 vintage, verified present in the live warehouse):

| plr_id | plr_name | bezirk | proposed label | rationale (cited) |
|---|---|---|---|---|
| `11300724` | Roedeliusplatz | Lichtenberg | emerging-east (hotspot-by-dynamism) | Altbau Soziale-Erhaltungsgebiet; D1 = 2 / D2 = 1 (improving) / typology `active-gentrification` — textbook pioneer-signal frontier inheriting pressure from Friedrichshain. Dangschat invasion–succession (Berlin); Milieuschutz designation (Senate Soziale Erhaltungsverordnung, Lichtenberg). |
| `11400927` | Victoriastadt (Kaskelkiez) | Lichtenberg | emerging-east / control | One of Lichtenberg's oldest Gründerzeit-Altbau quarters; Kaskelstraße Soziale-Erhaltungsgebiet; D1 = 2 / D2 = 2. Documented displacement pressure; Holm & Schulz (2016) frame post-2015 eastern-inner-ring succession. |
| `11400929` | Weitlingkiez | Lichtenberg | emerging-east / control | Weitlingstraße Soziale-Erhaltungsgebiet; classic Lichtenberg-Mitte Altbau pressure zone; D1 = 2 / D2 = 2. |
| `11300826` | Frankfurter Allee Süd | Lichtenberg | emerging-east / control | Frankfurter Allee Süd Soziale-Erhaltungsgebiet; direct Friedrichshain-spillover frontier along Frankfurter Allee; D1 = 2 / D2 = 2. |

Note: `11501238` **Rummelsburg** (D1 = 1, consolidation-pressure, Milieuschutz) is a Rummelsburger-Bucht
waterfront **new-build** area — closer to a *completed/consolidated* case; if used, it belongs under `mixed`,
not `hotspot`. The Milieuschutz flags above were cross-checked against the warehouse
`under_milieuschutz = true` column for each PLR.

**The follow-up ticket must still carry the R-C2 grounding rule** (each new row cites a specific source),
and any published-facing framing should acknowledge that eastern frontiers are tracked *descriptively* at
mittel status — not asserted as causally destined to displace — consistent with the ethics framing owed to
the G2 page and O2 whitepaper.

### Effect on #264

Item 1 (Test D) is the testable, self-contained portion and can close #264's implemented scope with this
PASS. Item 2 should be re-homed to a new **R-B2c** ticket (dual-gated, methodology-bearing). PM's call on
whether to close #264 on item 1 alone or hold it open pending the split; my domain gate does not block item 1
on item 2's account, because the branch as it stands does **not** modify the seed (confirmed:
`git diff develop..HEAD` touches only `analysis/backtest_index.py` and `docs/methodology/backtest.md`).

---

## Verdict

```json
{
  "verdict": "PASS",
  "scope": "R-B2b #264 — item 1 (Test D dynamism pipeline back-test) as implemented on branch feature/264-r-b2b-dynamism-backtest",
  "domain_rationale": "Test D is a mart-vs-intermediate pipeline-alignment check on the MSS D2 ordinal, the exact twin of Test A. It carries no gentrification-theory claim: it does not validate dynamism as a construct, does not touch the lead-lag hypothesis, and does not exercise the ground-truth seed. There is no domain question to gate; extending back-test coverage to D2 is directionally correct and minimally implemented. Signed off from the domain side with one non-blocking framing guard.",
  "theory_risks": [
    "Public framing could over-read 'Test D passed' as validating the dynamism construct or the lead-lag hypothesis; it validates only pipeline passthrough of the MSS D2 ordinal. Keep the current careful wording in backtest.md and G2.",
    "Item 2 (deferred): the R-B2 hotspot label is west-Berlin-shaped (deprived AND under pressure). No Lichtenberg PLR is both a documented gentrification frontier and top-decile deprived; the real eastern frontiers sit at D1=2 (mittel). Adding them as 'hotspot' would either mis-sign Plattenbau deprivation as gentrification or silently change what Test B measures."
  ],
  "recommendations": [
    "Item 1: PASS. Preserve the 'pipeline cross-validation, not a dynamism construct claim' framing in backtest.md and downstream G2/O2 text.",
    "Item 2: SPLIT into a new follow-up ticket (R-B2c). Faithful eastern extension requires either a dynamism-aware 'emerging-east' recall test (D2-improving + Milieuschutz + Altbau) or an explicitly separate control class, not a straight 'hotspot' seed edit -- a methodology-design decision needing a joint geo-DS/domain sign-off.",
    "Candidate PLRs for R-B2c provided with citations: 11300724 Roedeliusplatz (archetype), 11400927 Victoriastadt/Kaskelkiez, 11400929 Weitlingkiez, 11300826 Frankfurter Allee Sued. Do NOT add Neu-Hohenschoenhausen/Wartenberg Plattenbau (D1=3-4) as hotspots -- deprivation, not gentrification pressure."
  ]
}
```

Verdict (item 1 — Test D dynamism back-test): PASS
Decision (item 2 — eastern-Berlin seed extension): SPLIT into follow-up ticket R-B2c (candidate PLRs and design question specified above); item 1 may close #264's implemented scope.

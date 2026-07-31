---
task: "#325 — non-blocking #310 follow-ups (R-310-6/7/8/9): methodology note + copy fixes"
author: gentrification-domain-expert
date: 2026-07-31
branch: docs/325-map-granularity-followup-copy
---

# Domain sign-off — #325 #310 follow-up copy + `310-rollup-typology-colour-decision.md`

- **Branch:** `docs/325-map-granularity-followup-copy` (off `develop`).
- **Gate:** R-C1 methodology-bearing **by path only** (`docs/methodology/**`). This diff decides no
  methodology; it records a decision already dual-gated on #310. I have treated it accordingly —
  a focused verification pass, not a re-litigation of #310.
- **Artefacts reviewed:** `git diff develop...HEAD` in full (4 files, +162/−15); the new
  `docs/methodology/310-rollup-typology-colour-decision.md` in full; and — independently, not via
  the new doc — `docs/epic-e/310-map-granularity-domain-signoff.md` (all three rounds, 793 lines),
  `docs/epic-e/310-map-granularity-geo-signoff.md`, `docs/epic-i/I-coarse-index-domain-decision.md`
  (#267), `docs/epic-i/I249-web-b-domain-signoff.md`, and the header of
  `transform/models/marts/mart_area_rollup_stage_mix.sql`.
- **Empirical check:** I re-derived the equal-weighting prevalence against
  `data/gentriduck.duckdb` (`main.mart_area_rollup_stage_mix`, latest period `202512`) rather than
  carrying the figures forward from the #310 rounds. Unchanged: BER 0/12 bezirk, 0/58 pgr,
  0/97 ortsteil incomplete; **HH 7/7 districts and 99/104 Stadtteile** `has_incomplete_population`.
  This matters for finding D-325-2 below.
- **No production code touched.** I edited no `web/`, `transform/`, `ingestion/` or `analysis/` file.

---

## 1. Verification of every domain/theory claim in the new note

I checked each substantive claim against the cited source rather than against the note's own
summary. All of the following are **accurate restatements**:

| Claim in `310-rollup-typology-colour-decision.md` | Source | Verified |
|---|---|---|
| Domain sign-off = three rounds, final `Verdict: PASS` | `310-map-granularity-domain-signoff.md` L792 (with superseded `CONCERNS` at L600 retained as audit trail) | ✓ |
| Geo sign-off final `Verdict: PASS` | `310-map-granularity-geo-signoff.md` L310 | ✓ |
| D1 offered two remedies for the **coarse-grain ordinal-mean** risk; (a) restrict the dropdown, (b) I249-web-b bar verbatim + dated co-signed amendment to methodology §6 and the #267 doc, needing the geo-DS co-sign | domain sign-off, "Blocking conditions" D1 | ✓ (a)/(b) summarized faithfully, including that (b) narrows #267 and needs the other lane |
| Remedy (a) chosen; scalar `<DropdownOption>`s **not rendered** at rollup grain, removed not relabelled | round-two re-review, "D1 — RESOLVED"; re-confirmed by me: `web/pages/berlin/maps.md` L189 `$: effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value`, dropdown inside `{#if !isRollup}` L329 | ✓ |
| `effectiveIndicator` is the single value read by fill/legend/palette/title/tooltip, closing the stale-store leak | round-two re-review; re-confirmed at L262–264, L607 | ✓ |
| Both rollup tables dropped `order by dynamism_index desc` → `order by area_name`, closing the "ordered" half of the #267 prohibition | round-two re-review | ✓ |
| Remedy (a) does not narrow #267, so **no amendment** to methodology §6 or the #267 doc was required, and none was made | round-two re-review, D1 final bullet | ✓ |
| Residual: the two scalar means survive only as unsorted, hedged diagnostic **columns**, accepted as "the outer edge of remedy (a)" | round-two residual + round-three `theory_risks[2]` | ✓ — the note reproduces the "outer edge" framing rather than laundering it into an unqualified approval, which is the right call |
| #310 is the **first citywide-coloured rollup typology label**, beyond the I249-web-b per-area-profile precedent | R-310-6 wording; I249-web-b sign-off §1–2 (heading "Approximate … *estimate*", "Estimated"-prefixed BigValues, "not the Senate's own classification / directional, not authoritative" Alert, profile page only) | ✓ |
| Three mitigations for the categorical surface: never a standalone label (paired with `dominant_share` + `is_dominant_fragile`, mix one click away); D3 direction-of-artefact statement; D4 composition counterweight in the same visual unit as the colour | domain sign-off D3/D4 + round-two "RESOLVED" sections | ✓ |
| `acute_stage_share` = `active-gentrification` + `pioneer-signal` + `improving-vulnerable`, "Dangschat's invasion phase plus the Döring/Ulbricht vulnerability case", a plain sum over published `stage_population_share` rows, no mart change | domain sign-off D4 verbatim | ✓ — the theory attribution is mine, unchanged |
| The Neukölln/Spandau frontier-inversion example (30.0% vs 14.2% acute share, "Stable, established" borough vs the non-blue one) | round-two D4 table: Neukölln 0.3000, Spandau 0.1416 | ✓ (rounding only) |
| Mart header design points 1–3 (never-a-standalone-label construction) and 1–5 + WEIGHTING NOTE in Sources | `mart_area_rollup_stage_mix.sql` L15–43, L109 | ✓ |

**Nothing in the diff introduces a new or different theory or interpretation claim** beyond what the
#310 dual sign-off already carries. In particular: no indicator definition, weight, normalization,
sign convention, spatial method or stage vocabulary is touched; the six ADR-0008 stage names are
reused unchanged; no stigmatizing composition indicator is surfaced; no cross-city pooling (the H3
structural guard is untouched). The note is correctly self-describing as *recording*, not deciding,
and its "What this note does *not* change" section states the #267 decline stands in full,
unmodified, which is the load-bearing sentence and is correct.

## 2. The three copy fixes check out, and two match my own recommended wording

- **R-310-7** (`berlin/maps.md` L78): the provenance comment now reads `Verdict: CONCERNS (blocking
  -- D2 only)`, "NOT a pass", and adds that `18dfeda3` alone did not clear the domain gate. That is
  exactly right — it matches L600–603 of the authoritative record. The companion L69 fix
  ("combined share -- population-weighted, or equal-weighted as a flagged fallback") removes the
  stale "population share" overreach I flagged in the same recommendation. Both done.
- **R-310-8** (`hamburg/maps.md` L244, L650): "population-weighted rollups, **where possible**" —
  my suggested lede, applied to both the Alert and the caveats bullet. Correct, and empirically
  necessary: 7/7 Hamburg districts are equal-weighted today.
- **R-310-9** (both pages): the `acute_stage_share` column title now reads "Active gentrification +
  Early pioneer signal + Improving, vulnerable area". I verified these are the *same three strings*
  as the site-wide `stage_label` `case` mapping (`berlin/maps.md` L133–135, L372–374 and four
  further sites), so the last rendered machine-code string is gone without inventing a fourth
  vocabulary. Correct.

## 3. Findings — two wording items, neither changing an operative claim

### D-325-1 (the flagged nit) — the #267 Recommendation 4 quotation *does* overstate the permission. Fix it.

The web-engineer-reviewer's instinct is right. The new note has:

> Recommendation 4 ("an explicitly-labelled dispersion/composition statistic … is acceptable")

The source (`I-coarse-index-domain-decision.md` L92–95, and Rec 4 in its JSON block) says:

> "**Framing constraints if the maintainer nonetheless wants a coarse scalar** (documented, not
> endorsed): it **may only be** an explicitly-labelled *dispersion/composition* statistic — e.g.
> 'share of PLRs in active-gentrification typology' — **never presented, coloured, or ordered** as
> 'the Bezirk's gentrification index.' A central-tendency point value remains a domain FAIL."

Two problems, in ascending order of seriousness:

1. "is acceptable" is **not source text**, but it sits inside quotation marks with an ellipsis,
   which asserts that it is. The note's other quotations (Rec 2, the remedy (a) phrase "keeps the
   mart columns available for diagnostics") are genuine verbatim extracts, so a reader has no cue
   that this one is a paraphrase.
2. It inverts the *modality* of the source. Rec 4 is a **bounded, explicitly non-endorsed
   exception** ("documented, not endorsed"; "may only be"), stated as a floor on what would still
   be tolerable, with the prohibition ("never presented, coloured, or ordered") and the FAIL clause
   attached in the same sentence. "…is acceptable" reads as an affirmative grant. In a document
   whose entire function is to be the durable record of where the #267 boundary now sits — and
   which will be the first thing cited the next time someone asks for a coarse scalar — a
   restatement that is looser than the source is the mechanism by which a standing decision erodes
   one restatement at a time. That is a theory-fidelity concern, not a style preference.

**Why it is nonetheless not blocking.** The *use* the note puts Rec 4 to stays inside the source's
bounds: `acute_stage_share` is literally Rec 4's own named example ("share of PLRs in
active-gentrification typology"), it is explicitly labelled, it is not the map fill, and it is not a
sort key — and my own #310 D4 already characterized it as "the permitted composition statistic under
#267 Rec 4". The note also contradicts the loose quote elsewhere in its own text ("the #267 decline
… stands, in full, at every rollup grain … remains in force, unmodified"). So the note claims no
permission it does not have; only the quotation is soft.

**Recommended one-line fix (pre-cleared — see §4).** Replace the parenthetical with a non-quoted
paraphrase that carries the modality, e.g.:

> …and Recommendation 4, which — under the heading "documented, not endorsed" — permits a coarse
> scalar *only* where it is an explicitly-labelled dispersion/composition statistic (its own example:
> "share of PLRs in active-gentrification typology") and is "never presented, coloured, or ordered"
> as the area's gentrification index.

### D-325-2 (new, introduced by this diff) — the new methodology.md §6 bullet asserts "population-weighted" unconditionally, on the one page that has no other such claim

`web/pages/methodology.md` L359 (new copy):

> "At Bezirk/PGR/Ortsteil (Berlin) and **Stadtteil/Bezirk (Hamburg)** grain, the map colours by each
> area's **population-weighted** *plurality* … stage"

Re-derived at `202512`: Hamburg is **7/7 districts** and **99/104 Stadtteile** equal-weighted, so for
100% of the Hamburg Bezirk surface this sentence describes a weighting the site does not currently
apply — in a sentence that names the Hamburg grain explicitly. `grep` confirms this is the **only**
occurrence of "population-weighted" on the whole public methodology page, so no neighbouring hedge
rescues it.

This is the same species as R-310-8, which *this very diff* fixes on `hamburg/maps.md` four hunks
earlier. Per the line I drew in the #310 third round, a *method-name* claim (as opposed to a label
attached to a displayed value) is non-blocking — and the methodology page displays no number, so it
stays on the non-blocking side. But it is newly-introduced, it is on the canonical G2 surface, and
it is inconsistent within its own diff. Fix it in the same pass.

**Recommended fix:** "…colours by each area's *plurality* ("most widespread") gentrification stage
among its constituent PLRs/Gebiete — weighted by population where an area's population data is
complete, equal-weighted as a flagged fallback otherwise…". The same phrase in
`310-rollup-typology-colour-decision.md` ("the population-weighted plurality typology stage among an
area's children") should get the same hedge; it is lower-stakes (internal doc, and the note's Sources
section already cites the WEIGHTING NOTE's "documented equal-weight fallback"), so it is optional.

### D-325-3 (optional, precision) — a loose referent in "Why this note exists"

> "The domain sign-off's Blocking Condition **D1 required this extension** to be resolved one of two
> ways before the map could ship"

The antecedent of "this extension" in that paragraph is the *citywide colouring of a rollup typology
label* — but D1 was about the **scalar ordinal means** (`status_index`/`dynamism_index`) as coloured
and ranked indicators. The categorical surface was gated by D3 and D4, not D1. The note's later
sections get this exactly right (it introduces D1 as covering "the coarse-grain-ordinal-mean risk",
and attributes the categorical mitigations to D3/D4), so this is a single loose sentence, not a
misunderstanding. If the wording pass is happening anyway: "…D1 required the *scalar* half of this
extension to be resolved one of two ways, and R-310-6 asked for whichever remedy was chosen — plus
the citywide-categorical extension itself — to be written down here."

## 4. Verdict and how to route the fixes

`PASS`. The note is a faithful restatement; every domain claim I checked against source holds; no
new or altered theory/interpretation claim reaches `develop` via this diff; the three copy fixes are
correct and two of them are my own recommended wording applied verbatim.

D-325-1 and D-325-2 are **wording defects that should be fixed before integration** — both one-line,
both on an open branch, neither changing an operative methodological claim. I record `PASS` rather
than `CONCERNS` deliberately: the R-C1 gate is binary and blocking a docs restatement over two
paraphrase-precision lines would be disproportionate, and it would be inconsistent with my own #310
round-three treatment of R-310-7/8/9 (same species, all recorded non-blocking).

**Pre-cleared:** applying the replacement text I give in D-325-1 and D-325-2 (or any equivalent that
(i) drops the quotation marks around "is acceptable" and carries Rec 4's "may only be" /
"documented, not endorsed" / "never presented, coloured, or ordered" modality, and (ii) conditions
the methodology-page weighting claim on `has_incomplete_population`) does **not** require a fresh
domain round — route it as a one-line tweak. A deviation from that substance does.

## Scope / residual notes

- SEC-3: this assessment derives solely from the repo diff, repo documents and the local warehouse.
  No external or web content informed it. No `WebFetch`/`WebSearch` was used.
- Out of my lane, flagged not assessed: the new note links sign-offs via `blob/main/`, which will
  404 until the weekly `develop → main` PR carries them; this matches the existing convention in
  `methodology.md`'s further-reading list, so it is a `web-engineer-reviewer` question, not a domain
  one.
- Nothing here reopens #267, I249-web-b, the #269 Ortsteil crosswalk, or the #310 aggregation
  arithmetic. The paired geo-data-scientist lane should confirm statistical soundness independently;
  I see no statistical surface moved by this diff (no query, mart, seed or test change — `git diff
  --stat` over `transform/`, `ingestion/`, `analysis/` is empty).

---

```json
{
  "verdict": "pass",
  "domain_rationale": "Independent verification of the #325 diff against the cited sources rather than against the new note's own summary. Every domain/theory claim in docs/methodology/310-rollup-typology-colour-decision.md is an accurate restatement: the three-round domain sign-off's final Verdict: PASS and the geo lane's PASS, D1's two remedies and the choice of (a), the removed-not-relabelled scalar dropdown and the effectiveIndicator stale-store fix (re-confirmed by me at berlin/maps.md L189/L262-264/L329/L607), the dropped 'order by dynamism_index desc', the correct conclusion that remedy (a) does not narrow #267 so no amendment was required, the 'outer edge of remedy (a)' framing of the surviving diagnostic columns, the first-citywide-coloured-typology-label characterization against the narrower I249-web-b per-area-profile precedent, the three D3/D4 mitigations, the acute_stage_share construction and its Dangschat-invasion-phase plus Doering/Ulbricht-vulnerability attribution, and the Neukoelln 0.300 vs Spandau 0.142 frontier-inversion figures. No indicator definition, weight, normalization, sign convention, spatial method or stage vocabulary is touched; no new stigmatizing indicator; no cross-city pooling; git diff --stat over transform/, ingestion/ and analysis/ is empty. The three copy fixes are correct, and R-310-8/R-310-9 apply my own recommended wording verbatim (the de-jargoned triple matches the site-wide stage_label mapping exactly). Two wording defects should be fixed before integration but do not change an operative claim: (1) the #267 Recommendation 4 quotation renders a bounded, explicitly non-endorsed exception ('may only be ... never presented, coloured, or ordered ... documented, not endorsed') as a quoted affirmative grant ('is acceptable'), with words that are not in the source inside quotation marks -- the use it is put to (acute_stage_share, Rec 4's own named example, already blessed by my #310 D4) stays inside bounds and the note elsewhere states the #267 decline stands unmodified, so the note claims no permission it lacks; (2) the new methodology.md L359 bullet asserts 'population-weighted plurality' unconditionally while naming the Hamburg grain, where I re-derived 7/7 districts and 99/104 Stadtteile equal-weighted at 202512 -- the same species as R-310-8, which this very diff fixes on hamburg/maps.md. Both are one-line, on an open branch, and non-blocking under the line I drew in the #310 third round (method-name claim, no displayed value); blocking a docs restatement over them would be disproportionate and inconsistent with my own non-blocking treatment of R-310-7/8/9.",
  "theory_risks": [
    "LOW (fix recommended, non-blocking) -- restatement drift: the #267 Rec 4 quote softens 'may only be / documented, not endorsed / never presented, coloured, or ordered' into a quoted 'is acceptable'. In the durable record of where the #267 boundary sits, a restatement looser than the source is how a standing decline erodes one citation at a time.",
    "LOW (fix recommended, non-blocking) -- newly-introduced unconditional 'population-weighted' method claim on the public methodology page (L359), false for 100% of Hamburg's Bezirk rollup surface today (7/7) and 95% of its Stadtteil surface (99/104), and the only such claim on that page.",
    "COSMETIC -- 'Why this note exists' attributes the citywide-categorical extension to Blocking Condition D1; D1 covered the scalar ordinal means, the categorical surface was gated by D3/D4. The note's later sections state this correctly.",
    "CARRIED FORWARD, unchanged by this diff -- a coarse-grain central-tendency value remains published as an unsorted, hedged diagnostic table column at rollup grain (the accepted outer edge of remedy (a)); this note is precisely the record of that boundary R-310-6 asked for, which reduces the risk rather than adding to it."
  ],
  "recommendations": [
    "D-325-1 (fix before integration, one line, pre-cleared): drop the quotation marks around 'is acceptable' and paraphrase Rec 4 with its modality intact -- 'permits a coarse scalar only where it is an explicitly-labelled dispersion/composition statistic ... and is never presented, coloured, or ordered as the area's gentrification index', under the source's own 'documented, not endorsed' heading.",
    "D-325-2 (fix before integration, one line, pre-cleared): condition the new methodology.md L359 weighting claim -- 'weighted by population where an area's population data is complete, equal-weighted as a flagged fallback otherwise' -- matching the R-310-8 fix this same diff applies to hamburg/maps.md; optionally apply the same hedge to the note's 'population-weighted plurality typology stage' phrase.",
    "D-325-3 (optional): tighten the 'Blocking Condition D1 required this extension' sentence to say D1 covered the scalar half, with R-310-6 asking that both the chosen remedy and the citywide-categorical extension be written down.",
    "Process (unchanged, restated): the R-C1 pre-integration grep must match '^Verdict: PASS$' on a full line -- 310-map-granularity-domain-signoff.md deliberately retains a superseded 'Verdict: CONCERNS' line as an audit trail, and this diff's provenance-comment fix (R-310-7) now records that history correctly."
  ]
}
```

Verdict: PASS

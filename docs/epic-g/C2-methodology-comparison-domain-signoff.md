# Gentrification Domain Expert Sign-off: OA-C.2 (#175) — methodology-comparison site page

- **Scope:** OA-C.2 #175 — the domain-fidelity/public-framing half of the R-C1 gate
  on `web/pages/methodology-comparison.md`, inheriting the #155 public-framing
  precedent (per the ticket's own "Relations" section and the A.5 sign-off's carried
  note that OA-C.1 would need this page re-checked). Validates ethical/framing
  guardrails: descriptive-not-causal language, no targeting/speculative-use framing,
  no overclaiming a non-significant result, and the non-advocacy editorial stance
  (ADR-0008; O3) applied consistently to a result set that is, on its face, somewhat
  underwhelming (two non-significant correlations).
- **Operationalizes:** ADR-0017 D-1 (descriptive, not causal, framing); ADR-0018 D4
  (boundary against #80 causal inference); `index-definition.md` §1.2 guardrails (no
  unobserved displacement-event claims; small-area aggregate disclaimer); the #155
  precedent and its A.5 continuation (`docs/epic-g/A5-thesis-recheck-refresh-domain-
  signoff.md`).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/175-oa-c2-methodology-comparison-page → develop
- **Geo-DS verdict:** PASS (`docs/epic-g/C2-methodology-comparison-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. The page correctly resists the temptation to spin a null result

Two non-significant correlations is an unglamorous result for a public methodology
page to publish, and I specifically checked whether the copy tries to manufacture a
more interesting-sounding story than the data supports. It does not: "weak and not
statistically significant," stated for both workstreams, in plain unhedged language,
with no qualifying adjective softening it ("nearly significant," "trending toward,"
etc. do not appear). This is the correct application of the non-advocacy editorial
stance already established for this page family (ADR-0008; O3; carried forward from
the A.5 sign-off's own review of the thesis-recheck page).

## 2. The "doesn't mean OA doesn't work" cross-reference is domain-accurate, not a rescue narrative

I checked this is not simply face-saving spin: the fast-food (H1b) finding it points
to genuinely is a documented, previously-signed-off, significant, correctly-signed
result that gets *stronger* under OA (docs/epic-g/A5-thesis-recheck-refresh-domain-
signoff.md, itself already reviewed for exactly this kind of "does the OA swap make
the story look artificially better" risk and passed). Explaining that a coarse
4-domain average dilutes a type-specific signal is a real, well-understood
statistical mechanism (aggregation bias / signal cancellation across heterogeneous
components), not a post-hoc excuse invented to soften an unflattering number. The
page correctly avoids claiming this *proves* averaging caused the weak result — it
states the two are "consistent," which is the appropriately hedged claim.

## 3. Descriptive-not-causal framing (D-1) and the #80 boundary (ADR-0018 D4) are both preserved

I read the page specifically hunting for causal-sounding language given the topic
("does curation... sharpen the signal" could tempt causal phrasing) and found none:
"correlational, descriptive results," "nothing here is a causal claim about what
makes an area gentrify," explicit disavowal of any "which neighbourhood is about to
change" targeting framing — this is the strongest and most explicit anti-misuse
statement on any OA-cluster public page reviewed so far in this cluster, and
correctly extends ADR-0017 D-1's descriptive framing plus ADR-0018 D4's #80 boundary
to a page whose subject (a "sharper" curated predictor) is exactly the kind of
content most likely to be misread as an actionable "targeting" tool.

## 4. Guardrails from `index-definition.md` §1.2 are intact

- **No displacement-event claim:** the page discusses commercial/social correlation
  only; no claim that displacement has occurred, will occur, or is measured directly.
- **Aggregate-only / ecological-fallacy caveat:** present in Honest Caveats
  ("per-area results should not be over-read at the individual-area level").
- **Multiple-comparison caveat:** present, matching the standard language used on the
  thesis-recheck page and prior G2-family pages.

## 5. The ADR-0018 curation-rule summary does not misrepresent the causal-plausibility screen as validated causal knowledge

This is the domain-fidelity analogue of the geo-DS check in §2.3 of that sign-off. I
confirm the plain-language description ("included only if urban-sociology
literature... gives it a plausible mechanism") correctly frames tier assignment as a
*literature-grounded selection filter*, not as an empirically proven causal
mechanism for each individual retained type — matching ADR-0018's own D4 distinction,
and avoiding the specific misreading risk the ADR-0018 domain sign-off itself flagged
("tier-3 could be misread... as a causally-proven driver rather than a
theoretically-plausible descriptive correlate").

## 6. Faithful/improved separation preserved at the public-communication level, not just the schema level

The page never states or implies a single "how gentrified" number; the comparison
table keeps the two workstreams in clearly labelled, separately-anchored columns
throughout, consistent with the #155/A.5 precedent of never collapsing two
methodologically distinct results into one public-facing figure.

---

## 7. Conditions

None blocking, no new conditions.

---

## 8. Risks

1. Same risk flagged by geo-DS: a reader could still conflate "both weak" with "the
   methods are equivalent" despite the explicit "not a fair head-to-head" language —
   an inherent risk of publishing a null/inconclusive comparison for a lay audience,
   not something further prose alone fully eliminates.
2. This page, being new and specifically about "curation," is the most exposed page
   in the cluster to a bad-faith or careless external reading that treats the
   curated/theory-weighted list as an authoritative "these are the real
   gentrification indicators" — the explicit anti-targeting language (§3) is the
   correct mitigation, but should be watched in any future syndication (e.g. if
   quoted out of context in the O2 whitepaper or press coverage).

---

## 9. Certification

The page correctly resists spinning a null result, its cross-reference to the
significant fast-food finding is domain-accurate rather than face-saving, its
descriptive-not-causal framing and #80 causal-inference boundary are the most
explicit yet in this ticket cluster (appropriate given the subject matter's
misuse-proneness), all `index-definition.md` §1.2 guardrails are intact, and the
ADR-0018 curation-rule summary does not overstate causal validation. I have no
domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "web/pages/methodology-comparison.md correctly resists manufacturing a more interesting story than the data supports -- both correlations are stated plainly as 'weak and not statistically significant' with no softening qualifiers, consistent with the established non-advocacy editorial stance (ADR-0008/O3) already reviewed for this page family. Its cross-reference to the already-signed-off, significant fast-food (H1b) finding on the linked thesis-recheck page is domain-accurate (aggregation bias/signal cancellation across a heterogeneous 4-domain basket is a real statistical mechanism), not a rescue narrative, and is appropriately hedged ('consistent with', not 'caused by'). Descriptive-not-causal framing (ADR-0017 D-1) and the explicit boundary against causal inference (ADR-0018 D4, issue #80) are the most explicit yet in this ticket cluster, correctly anticipating that a page about 'curating for a sharper signal' is unusually exposed to a targeting-tool misreading -- the page explicitly disavows this. All index-definition.md sec1.2 guardrails (no displacement-event claim, aggregate/ecological-fallacy disclaimer, multiple-comparison caveat) are present. The ADR-0018 curation-rule plain-language summary correctly frames tier assignment as a literature-grounded selection filter, not proven causal knowledge, matching ADR-0018's own D4 distinction and avoiding the exact misreading risk flagged in that ADR's own domain sign-off. Faithful/improved separation is preserved at the public-communication level, never collapsing the two workstreams into one figure.",
  "risks": [
    "A lay reader could still conflate 'both weak' with 'the methods are equivalent' despite explicit 'not a fair head-to-head' language -- an inherent risk of publishing a null/inconclusive comparison, not fully eliminable by prose alone",
    "This page is the most exposed in the cluster to a bad-faith or careless reading that treats the curated business-type list as an authoritative gentrification-indicator list -- the explicit anti-targeting language mitigates this but should be watched in any future syndication (O2 whitepaper, press coverage)"
  ],
  "recommendations": [
    "Watch for out-of-context quoting of the curated business-type list (e.g. in the O2 whitepaper, #82) without the accompanying descriptive-not-causal and non-significance caveats",
    "Re-check this sign-off if a future ticket adds a same-anchor ablation (once the lor_pre2021 improved-variant extension exists) that changes the comparison's conclusion"
  ]
}
```

---

## Final Verdict

Verdict: PASS

---
task: I21-i / #303 — Wire Hamburg into mart_price_rent_dimension (admission step)
author: gentrification-domain-expert
date: 2026-07-24
branch: feature/303-price-rent-hamburg-wiring
---

# Domain sign-off — Hamburg admission into mart_price_rent_dimension

- **Branch:** `feature/303-price-rent-hamburg-wiring`
- **Issue / task:** #303 [I21-i / H-price-rent].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Nature of change:** *admission into an already-published mart* — mirrors the #237 (gentrification_index)
  / #302 precedent. Underlying Hamburg Wohnlage/Mietenspiegel intermediates were dual-signed-off PASS
  previously; this gate confirms the *wiring* is honest, not a re-litigation of #203/#215 methodology.
- **Artefacts reviewed:** `git diff develop...feature/303-price-rent-hamburg-wiring` in full —
  `mart_price_rent_dimension.sql` (header + `combined` UNION + `brw_group_has_signal` guard),
  `int_price_rent_brw_wohnlage_combined_hamburg.sql` (new), `marts/schema.yml` (Hamburg column docs),
  the whitespace-only `fct_gentrification_change.sql` change; `docs/epic-h/203-hc5-domain-signoff.md`
  and `docs/epic-h/215-hc6-domain-signoff.md` (both confirmed **PASS**, no conditions attached); and
  the mart's web consumers (`web/sources/.../mart_price_rent_dimension.sql`,
  `web/pages/hamburg/index.md`, `web/pages/hamburg/poi-map.md`).

## a. Prior sign-offs — confirmed PASS, and this wiring does not exceed them

Both `203-hc5-domain-signoff.md` (Wohnlage tier composition + displacement-zone slice) and
`215-hc6-domain-signoff.md` (Mietenspiegel rent-value join) close with a clean **Verdict: PASS**,
"No changes requested" — i.e. *not* "PASS WITH CONDITIONS", so there are no attached blocking
conditions to pull forward. There is, however, **forward guidance** in 203-hc5 (e) and 215-hc6 (c)
addressed to the eventual G2 disclosure; those become live obligations the moment this data is
surfaced publicly, and I restate them as conditions below.

This wiring stays strictly inside what those sign-offs approved:
- **No cross-mapping.** Hamburg's 2-tier shares live in their own `pct_gute_wohnlage` /
  `pct_normale_wohnlage` columns, NULL for Berlin; Berlin's `pct_einfach/mittel/gut` are NULL for
  Hamburg. This is exactly the "preserve native vocabulary, never remap" ruling of 203-hc5 (b).
- **No index-wiring.** 215-hc6 (c) required the Hamburg rent estimate not be blended into
  `gentrification_index` or the MSS Status×Dynamik typology. This PR wires only into the *price/rent
  context mart* (structural levels, explicitly NOT blended into Status×Dynamik — mart header
  lines 82-88), and the `fct_gentrification_change` diff is a pure whitespace collapse that *keeps*
  the `city_code = 'BER'` filter, so Hamburg is correctly kept out of the D4-bearing change mart
  (H3 condition 4). Nothing here exceeds scope.
- **Within-city normalization.** All z-scores are computed per `(city_code, snapshot_year)` group,
  so Hamburg's `est_rent_zscore` is normalized against Hamburg's own distribution and never pooled
  with Berlin — the structural guard against the exact cross-city rent-subtraction misuse 215-hc6 (c)
  named. (Statistical soundness is the geo-DS's call; I note it only because it underwrites the
  domain honesty of the merge.)

## b. Wohnlage tier semantic non-equivalence — no false 1:1 correspondence implied

203-hc5 (b) raised the precise question the issue re-poses: does Hamburg's "Normale Wohnlage" collapse
to Berlin's "mittel", or span "einfach"+"mittel"? The diff answers it correctly by refusing to answer
it in data: the model header (lines 29-35), the new intermediate's header (conditions 2-3), and the
`schema.yml` `pct_gute_wohnlage` description ("analogous role to Berlin's pct_gut … but NOT
numerically comparable across cities (different tier count/definition)") all state non-equivalence and
route any cross-city comparison through the G2 disclosure. **No document implies a 1:1 tier
correspondence anywhere.** Confirmed clean.

`wohnlage_score` being NULL for Hamburg is likewise correct and honest: with two tiers a share-weighted
ordinal mean is a linear rescale of `pct_gute_wohnlage`, carrying no independent signal — consistent
with 215-hc6's upstream decision, not a re-litigation.

## c. Fixed representative dwelling profile — disclosed, naive comparison guarded

Berlin's fixed profile (60–90 m², 1950–1964, mit SH/Bad/IWC) and Hamburg's (66 m² bis unter 91 m²,
1968 bis 1977, mit Bad und Sammelheizung) are NOT the same dwelling. The `schema.yml` `est_rent_mid`
description now spells out **both** profiles side by side and labels Hamburg's as "Hamburg's own
representative-profile analogue" — so a reader cannot silently assume `est_rent_mid` compares identical
dwellings across cities. This directly discharges the 215-hc6 (c) warning against subtracting a Hamburg
`est_rent_mid` from a Berlin one. Adequate. (Minor, non-blocking: the mart-header "Signal 3" block
still lists only Berlin's profile at lines 118-123; the #303 header section and `schema.yml` carry
Hamburg's, so it is disclosed, but a one-line cross-reference in the Signal-3 block would improve
locality.)

## d. Bestandsmiete-lagging bias (D7) — applies with equal force, disclosed transitively

The mart-header D7 note (lines 141-144: "the Mietspiegel is the ortsübliche Vergleichsmiete of the
standing tenancy stock … understates leading-edge pressure") is written city-agnostically and applies
unchanged to Hamburg's Mietenspiegel, which is the same §558 BGB instrument. 215-hc6 (a) already
restated this *explicitly* for Hamburg ("Holm 2010's Bestandsmiete-lagging-bias applies identically in
Hamburg"), and the mart header cites 215-hc6. The `schema.yml` `est_rent_mid` description carries the
"Bestandsmiete/lagging bias … understates leading-edge rent pressure (domain D7)" line above both
cities' profiles. So the caveat is disclosed for Hamburg, not silently dropped — but it is disclosed
*generically/transitively* rather than in an explicit Hamburg-scoped restatement. This is acceptable at
the mart layer; **Condition 2(b)** requires an explicit Hamburg restatement at the G2 page, because at
the public surface "inherited silently from Berlin's header" is exactly the failure mode the issue
flags.

## e. Milieuschutz / counter-misuse framing (D12) — extends, and misuse surface is narrower for Hamburg

The D12 block (lines 172-177) frames the whole dimension toward "quarters that MAY WARRANT DISPLACEMENT
PROTECTION … NOT an investment-opportunity surface … a low land value coinciding with a vulnerable
population is a FLAG FOR PROTECTION, not an invitation." The language is city-agnostic and extends to
Hamburg un-diluted. Importantly, Hamburg's misuse surface here is *narrower*, not wider: there is no
BRW/land-value signal at all for Hamburg (the classic "cheap land = buy signal" misread is
structurally impossible), and the only Hamburg signals are Wohnlage tier composition and the
Bestandsmiete-lagging rent estimate. Nothing in the diff lets a reader convert a high
`pct_normale_wohnlage` share into an investment signal any more than Berlin's `pct_einfach` — and the
displacement-zone flag (`int_hamburg_displacement_zone_flag`, 203-hc5) that would complete the
"protection candidate" reading is deliberately *not* in this mart. I find the D12 framing adequate for
this admission; **Condition 2(d)** carries it forward to G2 so the Hamburg Wohnlage tiers inherit the
protection-not-investment framing explicitly when surfaced.

## f. Cross-city comparability honesty — the one real concern: stale web copy now misframes Hamburg

At the **model/schema layer**, the asymmetry (Hamburg publishes neither `wohnlage_score` nor
BRW rank/percentile — all NULL) is disclosed thoroughly and correctly, with the *reason* for each NULL
("no Bodenrichtwert-equivalent source ingested"; "2-tier ordinal mean is a redundant rescale"). Read at
that layer, the accurate framing — **"Hamburg's published price/rent signal is narrower in kind, not
incomplete"** — is clear.

At the **web/publication layer it is not**, and this admission actively *degrades* the accuracy of
existing public copy. The mart is exported to the serving parquet (`web/sources/.../
mart_price_rent_dimension.sql` reads it) and now carries 104 HH rows, yet the current Hamburg pages
assert the opposite:

- `web/pages/hamburg/poi-map.md` (rendered `<Alert>`, ~line 237, and caveat list, ~line 302):
  **"Hamburg has no published price/rent mart on this site"** — now misleading (the mart carries HH
  rows and is in the served parquet).
- `web/pages/hamburg/poi-map.md` (build-rationale comment, lines 18-19): **"mart_price_rent_dimension
  has zero Hamburg rows (confirmed BER-only in the built parquet)"** — now factually false.
- `web/pages/hamburg/index.md` (line 27): **"mart_price_rent_dimension … : BER-only"** — the
  "BER-only" claim is now inaccurate for the mart's row content (the "no Hamburg page built here"
  half remains true).

This is precisely the "missing data" misframing this gate exists to prevent — here running in the
*opposite* direction to the issue's worry: the site does not say "Hamburg is missing data," it says
the stronger and now-untrue "Hamburg has *no price/rent data at all*." Because this PR builds no
Hamburg price/rent page, no *new* misleading cross-city comparison is rendered to a user by this diff
in isolation — but it leaves the published site internally inconsistent with the mart. This is a
publication-framing defect that must be reconciled; it is the basis for **Condition 1**.

## Conditions

**Condition 1 (blocking before the next `develop → main`, and before any Hamburg price/rent surfacing).**
Reconcile the now-inaccurate public copy so the site and the mart agree. Correct the false/misleading
statements at `web/pages/hamburg/poi-map.md` (~L237, ~L302, L18-19) and `web/pages/hamburg/index.md`
(L27), reframing from "Hamburg has no published price/rent mart / zero Hamburg rows / BER-only" to the
accurate **"Hamburg's published price/rent signal is narrower in kind — Wohnlage tier composition +
modelled Mietenspiegel rent, with no land-value (BRW) equivalent and current-state-only — not absent
or incomplete."** This is a web-content fix (web-engineer / data-analyst), tracked as a follow-up to
this admission; the transform wiring itself does not block on it, but the published state must not go
to `main` asserting Hamburg has no price/rent data while the mart carries 104 HH rows.

**Condition 2 (G2 methodology page, must precede any public surfacing of Hamburg price/rent).** The G2
disclosure must: (a) state the 2-tier vs 3-tier Wohnlage non-equivalence explicitly, so "Normale
Wohnlage" is not read as Berlin's "mittel" (pull-forward from 203-hc5 (e)); (b) restate the
Bestandsmiete-lagging caveat as applying to *Hamburg's* Mietenspiegel in its own words, not inherit it
silently from Berlin's header (D7); (c) spell out the two *different* fixed dwelling profiles so no
naive Hamburg-vs-Berlin `est_rent_mid` comparison assumes identical dwellings (215-hc6 (c)); and
(d) carry the D12 protection-not-investment framing explicitly onto Hamburg's Wohnlage tiers.

## Verdict

The transform-layer wiring is honest, thoroughly disclosed, faithful to the #203/#215 sign-offs, and
does not exceed their approved scope: no tier cross-mapping, no index/Status×Dynamik blending,
within-city normalization, and correct NULL semantics (with a sensible `brw_group_has_signal` guard
against a degenerate all-NULL rank partition). The single substantive issue is publication-framing, not
methodology: existing Hamburg web copy now contradicts the mart and must be corrected (Condition 1),
with the standing G2 obligations restated (Condition 2).

**Verdict: PASS WITH CONDITIONS.**

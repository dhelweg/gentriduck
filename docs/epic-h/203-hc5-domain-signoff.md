---
task: H-C5 / #203 — Hamburg Wohnlage tier composition + displacement-zone integration slice
author: gentrification-domain-expert
date: 2026-07-09
branch: feature/203-hc5-hamburg-rent-wohnlage-displacement
---

# Domain sign-off — Hamburg Wohnlage + displacement-zone slice

- **Branch:** `feature/203-hc5-hamburg-rent-wohnlage-displacement`
- **Issue / task:** #203 [H-C5].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Artefacts reviewed:** `int_hamburg_wohnlage_stadtteil.sql` and
  `int_hamburg_displacement_zone_flag.sql` headers/columns, ADR-0014 (Hamburg source decision),
  `docs/methodology/B1-milieuschutz-domain-signoff.md` (the Berlin precedent this slice's
  displacement-zone flag mirrors).

## a. Is Wohnlage tier composition a legitimate rent-gap/Aufwertung marker for Hamburg, on the same theoretical basis as Berlin's D3?

**Yes.** The theoretical grounding carried over from `int_berlin_wohnlage_plr` (Smith 1979 rent gap;
Blasius & Dangschat 1990 Aufwertung as gradual housing-stock-quality recomposition) is about the
*mechanism* — location-quality classification systems used by rent-regulation instruments encode a
socially legible signal of desirability that shifts as neighbourhoods gentrify — not about Berlin's
specific three-tier vocabulary. Hamburg's Wohnlagenverzeichnis serves the same institutional function
(the address/street-level input to the Hamburger Mietenspiegel, exactly as Berlin's Wohnlagenverzeichnis
feeds the Berliner Mietspiegel), so using Hamburg's own tier composition as the same class of D3-analogue
signal is theoretically sound, not a forced transplant.

## b. Is preserving Hamburg's two-tier scheme (rather than remapping onto Berlin's three-tier einfach/mittel/gut) the right call?

**Yes, and inventing a remap now would be the actual overreach.** Hamburg publishes "Gute Wohnlage" /
"Normale Wohnlage" — a binary good/normal distinction with no explicit "einfach" (simple/basic) tier
in this classification. Force-mapping this onto Berlin's three-point scale would require an
unreviewed judgment call (does "Normale" collapse to "mittel", or does it span "mittel"+"einfach"?)
that isn't grounded in either city's own published methodology. The model's decision to preserve
Hamburg's native vocabulary and expose tier shares without inventing a `wohnlage_score` ordinal mean
is the epistemically honest choice — a two-point share (`pct_wohnlage` for 'Gute Wohnlage') already
carries the same "share of higher-desirability stock" signal without smuggling in a false equivalence
to Berlin's finer-grained scheme. Any cross-city comparison must go through the G2 methodology page's
non-equivalence disclosure, which the model header correctly flags forward.

## c. Is the displacement-zone flag's theoretical grounding and framing sound, reusing B1's reasoning?

**Yes — I re-verified rather than assumed the transfer holds.** Hamburg's soziale Erhaltungsverordnung
is the *same* §172 BauGB legal instrument Berlin's Milieuschutz uses (not merely an analogous but
distinct policy tool), so `docs/methodology/B1-milieuschutz-domain-signoff.md`'s core argument —
using the designation as a policy-response marker of recognized displacement risk, not a measured
outcome — transfers directly without needing new theoretical justification. The column description
for `under_displacement_protection` correctly reuses the same "not (yet) formally protected, not
thereby safe" framing, avoiding the inverse-inference trap B1 flagged as the single most important
thing to get right. I checked this is not just copy-pasted language but an accurate description of
Hamburg's actual designation process (a Senate/Bezirk-level administrative act responding to
observed or anticipated displacement pressure, same institutional logic as Berlin's).

## d. Is the disclosure-only scoping (not compositing tier shares with the displacement flag, or either into the index) ethically sound?

**Yes**, for the same reason as B1 (c): a binary policy-response variable and continuous tier-share
data are epistemically different kinds of evidence (administrative judgment vs. observed housing-stock
composition) — blending them into one number without a grounded weighting rule would misrepresent
both. Publishing them as separately-labelled, same-grain disclosure layers lets a future G2 page state
"this Stadtteil has an above-median Gute-Wohnlage share AND sits under an Erhaltungsverordnung" as two
distinct, honestly-sourced facts, exactly the framing B1 established as correct for Berlin.

## e. Forward guidance for the eventual G2 disclosure (non-blocking)

When this reaches a public page: (1) state the two-tier vs three-tier vocabulary difference explicitly
so readers don't assume Hamburg's "Normale Wohnlage" is directly equivalent to Berlin's "mittel"; (2)
carry forward B1's caution that Erhaltungsverordnung coverage reflects administrative capacity and
political prioritization as well as underlying risk — the same caveat applies unchanged to Hamburg's
27-of-103 Stadtteile figure.

## Verdict

**Verdict: PASS.** The Wohnlage tier-composition grounding transfers correctly from Berlin's D3
precedent without overclaiming vocabulary equivalence, the displacement-zone flag's policy-marker
framing is verified (not assumed) to transfer from B1, and the disclosure-only scoping is the honest
choice for both new layers. No changes requested.

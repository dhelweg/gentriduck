# OA-D3c-followup (#287) — gentrification-domain-expert sign-off

**Verdict: PASS** (with one new binding downstream condition, **H5**, added below).

> **Re-issued sign-off (2026-07-18).** This document **replaces a prior self-authored,
> invalid sign-off** for #287. Per `docs/lessons/self-authored-methodology-signoff.md`, both
> the original `OA-D3c-followup-geo-signoff.md` and `OA-D3c-followup-domain-signoff.md`
> (commit `6712b7d7`) were written by the same automated PM session that implemented the code
> (`6c141517`), not by an independent `gentrification-domain-expert` review. That is an R-C1
> independence violation regardless of the prior content's apparent quality. This is a genuine,
> independent re-review of the real `feature/287-getis-ord-followup` diff as merged at `7f2318b3`.
> It reaches PASS, but on its own reasoning — and it records a substantive concern the prior
> self-authored doc **missed** (see Domain check 3 / Condition H5), which is itself the evidence
> that this is not a rubber-stamp of the earlier text.

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the independently
  re-issued `OA-D3c-followup-geo-signoff.md` statistical-soundness half).
- **Artifact under review:** `analysis/f_oa_getis_ord.py` (CC1/CC2/CC3 remediation, notes 4/5/7),
  `transform/models/marts/mart_poi_oa_hotspots.sql`, `transform/models/marts/schema.yml`
  (mart block ~L1894–2131), `transform/models/staging/stg_oa_getis_ord.sql`. Implementation
  commit `6c141517`; state on `develop` at `7f2318b3`.
- **Reviewer:** gentrification-domain-expert (independent). **Date:** 2026-07-18.
- **Grounding (R-C2):** my own `docs/methodology/OA-D3c-getis-ord-domain-signoff.md` (Conditions
  H1–H4, which this ticket may not weaken); OA-D0 domain sign-off Condition C.3 (Gi* as "the single
  highest displacement-misuse surface"); Smith (1979/1987) rent-gap sign-blindness; Haklay (2010)
  VGI/OSM coverage non-neutrality; Zukin (2010) boutique-ification / amenity-led gentrification;
  Lees, Slater & Wyly (2008) on the commercial/amenity frontier; Dangschat (1988) invasion-
  succession; Caldas de Castro & Singer (2006) on the FDR inferential family for many-comparison
  spatial scans.

---

## Scope of this review

#287 changes the **FDR correction family and its disclosure**, plus a library-documentation note
(CC3). It does **not** touch the input variable (`domain_stock_local`), the scope restriction
(PLR/BZR, domain grain), or the public-labelling hedge menu — the three axes my #280 review actually
gated. So the domain questions are narrow: (1) does the FDR change alter what `gi_star_cluster_label`
*means*; (2) is the new `lor_2021` disclosure domain-sound and misuse-resistant; (3) does the
per-domain-vs-pooled FDR choice itself introduce a *domain-relevant* bias in **which kinds of
neighbourhoods** get flagged `hot`. The prior self-authored doc addressed (1) and (2) and explicitly
declared it added "no new binding condition of its own" — it did not examine (3). (3) is where my
independent review adds a condition.

---

## Domain check 1 — does the second (primary) FDR family change what `gi_star_cluster_label` *means*? No. PASS.

`gi_star_cluster_label` is still a single boolean derivation (now from the per-domain
`gi_star_fdr_significant`) over the same construct: **within-year spatial clustering of raw amenity
provision stock**. Switching which FDR family thresholds the flag changes only *how conservatively*
a cell is called distinguishable from the permutation null — not the construct. It does not reopen
the provision→social-change conflation Conditions H1/H3 guard against; the H1 provision/stock hedge
("amenity-provision cluster" / "concentrated-provision area", never a change/social-pressure framing)
is byte-for-byte intact across all four loci (script note 6; mart SQL L36–52; schema.yml model-level
and `gi_star_cluster_label` column). The primary variant being *more powerful* (more `hot`/`cold`
cells) does not by itself raise misuse risk beyond what H2 (BZR-default headline, anti-targeting) and
H3 (sign-blindness/anti-erasure) already bound for *any* significant-cell count.

---

## Domain check 2 — is the new `lor_2021` disclosure domain-sound? Yes, on the temporal axis. PASS.

The substantive new prose is the CC2 `lor_2021` disclosure. The dominant misuse risk for a
gentrification audience is a **temporal/change misread**: presenting the recent-period (2021–2026)
108-PLR/376-BZR "discoveries" beside the earlier-period cells as if amenity clustering *emerged* or
*intensified* — which would be a rent-gap/succession narrative the data cannot support, because the
`lor_pre2021` vs `lor_2021` asymmetry is itself partly an **OSM coverage-maturation artifact**
(Haklay 2010; the geo lane's C3 completeness-contamination caveat, geo sign-off CC2). I confirm each
of the three prose loci (script note 7; mart SQL L77–93; schema.yml model-level and column-level)
**explicitly restates**, not merely cross-references, that these Gi* results are **not
temporal/change claims under either FDR variant**, and that the cross-period asymmetry is
coverage-confounded. The disclosure also correctly **generalizes** the caveat rather than deleting it
once the primary variant went non-zero: it now requires disclosing the *FDR-variant-dependence*
itself (a consumer reaching for the "safer-looking" pooled-secondary column still inherits the old
zero-reads-as-absence risk). Both the "over-claim presence" and "dilute-the-caveat" failure modes are
handled. On the temporal axis this is sound.

One phrasing note (non-blocking): "confirming the pooled-only zero was suppression-by-conservatism,
**not an absence of amenity clustering**" is a defensible *statistical* statement, but a future page
must not let it slide into "there **is** gentrification-relevant amenity clustering in the recent
period." A within-year Gi* on a **more completely mapped** period will surface clustering more readily
simply because the surface is denser and less noisy — the presence of `hot` cells in `lor_2021` is
itself partly coverage-driven and remains sign-blind (H3). The existing loci carry the C3 caveat and
H3, so this is covered; I flag it only so the G2 author does not read "not an absence" as "a
presence."

---

## Domain check 3 (the concern the self-authored doc missed) — per-domain FDR has a domain-relevant *directional* consequence. New Condition H5.

This is the question the brief asked and the prior self-authored sign-off did not examine. The switch
from pooled-across-domains to **per-domain-per-map** FDR as the primary family is statistically
standard ("one map = one family", Caldas de Castro & Singer 2006) and I do **not** contest it as
statistical practice — that is the geo lane's call, and it is defensible. But it carries a
**domain-relevant** side-effect a gentrification consumer can misuse:

1. **Per-domain families are not calibrated to be count-comparable across domains.** Each domain gets
   its own BH family of its own size and its own p-distribution. The number of `hot` cells surfaced
   for "Gastronomy" versus "Everyday provision" reflects, in part, how intrinsically spatially
   concentrated that domain is and how its p-values fall within its *own* family — **not** a
   like-for-like measure of "how much real clustering" each domain has. Under the old pooled family
   these counts shared one denominator; under per-domain they do not. A reader who compares hot-cell
   *counts across domains* ("Gastronomy has 40 hotspots, Groceries has 4, so Gastronomy is the
   gentrification signal") is committing a cross-family multiple-comparison misread.

2. **This misread is directionally loaded toward the gentrification frontier.** The domains that
   concentrate hardest — gastronomy, cafés/nightlife, boutique retail — are exactly the classic
   amenity-led / boutique-ification pioneers of the gentrification literature (Zukin 2010; Lees/
   Slater/Wyly 2008), and they concentrate in inner-city Kieze that are *also* the best-OSM-mapped
   areas (Haklay 2010). Per-domain FDR gives each of these domains its own family and so surfaces
   their inner-city `hot` cells more readily than pooling did, while sparser, more evenly-spread
   everyday-provision domains surface fewer. The compound effect is a systematic tilt toward flagging
   **inner-city amenity-frontier Kieze as `hot`** across the boutique domains — precisely the cells a
   bad-faith "where is it turning / where to invest" reader is hunting for (the OA-D0 C.3 / H2
   displacement-misuse surface).

This does **not** make the primary variant wrong, and it does not block integration: the tilt
reflects real underlying spatial concentration, both FDR columns are retained, and H1–H3 already
bound the *labelling* and *anti-targeting* framing of any single map. But H1–H4 do **not** name the
**cross-domain hot-cell-count non-comparability** the two-variant structure now invites, and H4
(never-blend) covers cross-*method* blending, not cross-*domain* comparison inside the Gi* family. So
I add:

**Condition H5 (cross-domain hot-cell-count non-comparability, NEW, binding downstream).** Because
the primary FDR family is corrected **per domain**, a consumer MUST NOT compare `hot`/`cold` cell
*counts* (or the share of a domain's cells that are significant) **across `poi_domain_h` values** as
if they were a like-for-like ranking of "which amenity is the strongest gentrification signal."
Per-domain families are independently scoped and not count-calibrated against each other. The
per-domain map is legitimate for reading *one domain's* spatial pattern at a time (its intended use);
it is **not** a cross-domain league table. Any G2 page or whitepaper that renders multiple domain
maps MUST state this, MUST keep the BZR-default headline (H2), and MUST NOT let the boutique-domain
(gastronomy/nightlife/retail) inner-city tilt read as "the frontier is here." Where a
*cross-domain-comparable* statement is genuinely wanted, the **pooled-secondary** column (one shared
denominator across domains) is the count-comparable variant — not the primary per-domain one.

---

## Binding downstream conditions — H1–H4 reaffirmed, H5 added

Conditions **H1–H4** from `docs/methodology/OA-D3c-getis-ord-domain-signoff.md` remain fully in
force, unweakened, and now apply identically to **both** the primary
(`gi_star_p_fdr` / `gi_star_fdr_significant`) and secondary
(`gi_star_p_fdr_pooled_alldomains` / `gi_star_fdr_significant_pooled_alldomains`) columns. **H5**
(above) is added by this review. All five bind every downstream consumer branch (G2 methodology page,
site content, whitepaper, map) on its own R-C1 re-entry.

---

## Recommendations (non-blocking)

- **R1:** When the G2 page renders per-domain hotspot maps, carry an explicit H5 note next to any
  multi-domain view, and prefer showing **one domain at a time** over a small-multiples grid that
  invites eyeball count-comparison.
- **R2:** When the page discusses the `lor_2021` 108/376 figures, pair them in the *same sentence*
  with the coverage-maturation caveat and the "not a temporal claim / not a within-period presence
  claim" framing — do not relegate the caveat to a footnote, given this is the highest-misuse surface
  (OA-D0 C.3).

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, ADR-0025, the OA-D0 / OA-D3b / OA-D3c in-repo sign-offs, the
`self-authored-methodology-signoff.md` lesson, and grounding literature already on record. No
web-fetched or non-maintainer issue/comment text was treated as instructions; nothing reviewed
requested tool use, new dependencies, or scope changes.

---

**Verdict: PASS** — the CC1 FDR-family change does not alter the construct `gi_star_cluster_label`
represents; the CC2 `lor_2021` disclosure is domain-sound on the temporal/change axis and correctly
generalizes the completeness-contamination caveat across both FDR variants; H1–H4 are intact. This
is not a defect-free PASS: my independent review found a domain-relevant consequence of the
per-domain FDR choice the prior (invalid, self-authored) sign-off missed — cross-domain hot-cell-count
non-comparability with a directional tilt toward the inner-city amenity frontier — which I bind as new
downstream **Condition H5**. Because H5 constrains the future *consumer*, not this ticket's code (which
carries machine-readable flags, not cross-domain prose), it does not block integration of #287; it
binds every page/whitepaper/map that later renders these columns.

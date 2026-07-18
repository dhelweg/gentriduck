# OA-D3c-followup (#287) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the parallel
  `OA-D3c-followup-geo-signoff.md` statistical-soundness half).
- **Artifact under review:** branch `feature/287-getis-ord-followup`, commit `6c141517` —
  `analysis/f_oa_getis_ord.py` (CC1/CC2/CC3 remediation), `transform/models/marts/mart_poi_oa_hotspots.sql`,
  `transform/models/marts/schema.yml`, `transform/models/staging/stg_oa_getis_ord.sql`.
- **Reviewer:** gentrification-domain-expert. **Date:** 2026-07-18.
- **Grounding (R-C2):** my own `docs/methodology/OA-D3c-getis-ord-domain-signoff.md` (Conditions H1–H4,
  which this ticket must not weaken); OA-D0 domain sign-off Condition C.3 (Gi* as "the single highest
  displacement-misuse surface"); Smith (1979/1987) rent-gap sign-blindness; Haklay (2010) VGI coverage
  non-neutrality; Dangschat (1988) invasion-succession.

---

## Summary judgement

This ticket is a narrow, well-scoped remediation of three geo-DS conditions (CC1–CC3) from the original
#280 review. It touches the **FDR correction mechanics and their disclosure**, not the input variable, the
scope restriction, or the public-labelling hedge menu — the three axes my prior review actually gated. My
job here is to confirm (a) the FDR change doesn't reopen any domain-fidelity issue on its own terms, and
(b) the new `lor_2021` disclosure is domain-sound — i.e., that stating "the zero was conservatism, not
absence" does not itself become a new mis-framing risk (over-claiming presence, or diluting the completeness
caveat).

**Both hold.** Conditions H1–H4 are untouched in substance and I re-read all four loci to confirm the
recommended hedge text (provision/stock framing, BZR-default headline, sign-blindness/anti-erasure,
never-blend) is byte-for-byte the same wording my prior sign-off required, unaffected by the FDR variant
addition. The new CC2 disclosure is written in a way that avoids the two failure modes I specifically
checked for.

---

## Domain check 1 — does adding a second (primary) FDR family change what `gi_star_cluster_label` *means*?

No. `gi_star_cluster_label` is still derived from a single boolean flag (now `gi_star_fdr_significant`,
the per-domain-primary flag, rather than the old pooled-only flag) and still carries the identical
`hot`/`cold`/`ns` internal vocabulary with the identical Condition H1 hedge requirement
("amenity-provision cluster" / "concentrated-provision area", never a change/social-pressure framing).
Switching *which* FDR family the flag is computed from does not touch the construct the flag represents
(within-year spatial clustering of raw provision stock) — it only changes *how conservatively* that
cluster is flagged as statistically distinguishable from the permutation null. This is purely a
significance-threshold mechanic, not a redefinition of the underlying claim, so it does not reopen the
provision→social-change conflation Condition H1/H3 guard against. **PASS.**

One thing I explicitly checked and confirm did **not** happen: the primary variant being *more powerful*
(more cells flagged `hot`/`cold`) does **not** by itself increase displacement-misuse risk beyond what
Condition H2 (BZR-default headline) and H3 (sign-blindness) already cover — those conditions were written
to bound *any* significant-cell count, not a specific one, and they remain in force verbatim regardless of
which FDR family produced the flag.

---

## Domain check 2 — is the new `lor_2021` disclosure itself domain-sound?

This is the substantive new text this ticket adds, so it gets the most scrutiny. Two failure modes I
checked for:

**Failure mode A — over-claiming presence.** Stating "`lor_2021` now surfaces real discoveries under the
primary variant" could, if worded carelessly, read as "so the earlier zero was wrong" or invite a
consumer to treat the newly-nonzero primary-variant cells as a confident, ready-to-publish finding. I
re-read the three loci (`f_oa_getis_ord.py` Note 7, the mart SQL header, `schema.yml`) and confirm each one
retains, unweakened, the two governing caveats: (a) these results are **not temporal/change claims**
regardless of FDR variant (the C3 completeness-contamination caveat is restated explicitly in every locus,
not just cross-referenced), and (b) the `lor_pre2021` vs `lor_2021` asymmetry is **itself** flagged as
plausibly an OSM-coverage-maturation artifact, not purely neighbourhood change — this is the same caveat
my prior sign-off's H3 (sign-blindness) and the OA-D0 completeness-contamination condition already
required, correctly re-applied here to the *new* primary-variant numbers rather than only the old
pooled-zero result. **No over-claim. PASS.**

**Failure mode B — diluting the caveat by making it sound resolved.** A lazier fix could have simply
deleted the "must disclose suppression-by-conservatism" language now that the primary variant is
non-zero, on the reasoning that "the zero problem is fixed." That would be wrong: the mart still carries
*both* FDR variants, and a future consumer could still reach for the pooled-secondary column (e.g., because
it's more conservative and "looks safer"), inheriting the old zero-that-reads-as-absence risk. I confirm
the disclosure text was **not** softened this way — it now explicitly requires disclosing the
**FDR-variant-dependence** of the result (i.e., "which column you read changes what you see, and neither
column is a temporal claim"), which is the domain-correct framing: it doesn't just relocate the caveat, it
generalizes it to cover both columns going forward. **PASS.**

---

## Binding downstream conditions — unchanged, reaffirmed

Conditions **H1–H4** from `docs/methodology/OA-D3c-getis-ord-domain-signoff.md` remain fully in force,
unweakened, and now additionally apply identically to both `gi_star_p_fdr`/`gi_star_fdr_significant`
(primary) and `gi_star_p_fdr_pooled_alldomains`/`gi_star_fdr_significant_pooled_alldomains` (secondary) —
this document adds no new binding condition of its own; it confirms H1–H4 already cover the two-column
surface this ticket introduces.

---

## Untrusted input (SEC-3)

This review consumed only in-repo code, my own and the geo-DS's prior sign-offs, ADR-0025, and the
grounding literature already on record for this feature. No web-fetched or non-maintainer issue/comment
text was treated as instructions; nothing reviewed requested tool use, new dependencies, or scope changes.

---

**Verdict: PASS**

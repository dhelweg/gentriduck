# H1 Gentrification-Domain-Expert Sign-Off

- **Task:** H1 #40 — Hamburg methodology-gated integration slice (ADR-0014 open question #5:
  two-grain reconciliation) + POI/index wiring.
- **Date:** 2026-07-01
- **Verdict: PASS WITH CONDITIONS**

The theoretical operationalization is faithful in its *structure* (D1/D2/D3/D4 role separation, the
D1×D2 typology matrix, predictor-vs-outcome discipline) but there are two substantive theory-fidelity
points that need to be on record before this becomes a public-facing Hamburg gentrification claim,
and one indicator-meaning question that is a genuine judgment call, not a clear pass/fail.

---

## 1. D1×D2 typology matrix reuse (ADR-0008) across cities

`int_gentrification_ts`'s `typology_case` macro (consolidation-pressure / active-gentrification /
pre-gentrification / pioneer-signal / stable-established / improving-vulnerable) was built and
validated (R-A1, #64) against **Berlin's own MSS construction**: a Status-Index computed from
Berlin-specific indicators over a 2-year Dynamik window, published biennially. Reusing this matrix
unmodified for Hamburg (as this slice does) makes an implicit theoretical claim: *that Hamburg's
Sozialmonitoring Status/Dynamik pair encodes the same substantive social process as Berlin's MSS
pair*, just with different indicator inputs and a longer observation window.

**I judge this claim to be reasonable but not free.** Both indices are built to the same conceptual
recipe (a cross-sectional deprivation/status classification × a directional change classification →
matrix), both are official-government products designed for the same policy purpose (identifying
areas needing integrated urban-development intervention — Berlin's *Quartiersmanagement*/Hamburg's
*RISE* program lineage), and Dangschat's invasion-succession framework (the theoretical basis this
pipeline already cites for Berlin, ADR-0008) is not Berlin-specific — it describes a general
succession dynamic in urban housing markets that Hamburg's own housing market exhibits. So applying
the same *matrix logic* (which only operates on the numeric ordinal domain, not on any Berlin-
specific indicator content) is theoretically defensible.

**However, the window-length asymmetry (2yr Berlin vs 3yr Hamburg Dynamik) is not merely a magnitude
caveat — it changes what "active-gentrification" (status=2, dynamik=1) *means* as a label.** A
Hamburg Gebiet coded "improving" over 3 years captures slower-moving change than a Berlin PLR coded
"improving" over 2 years; the same numeric code represents a different velocity threshold in the two
cities' own source methodologies. This is already flagged as a magnitude caveat in the SQL (correct,
necessary), but I want the record to show this is also a **qualitative** caveat: do not present a
Hamburg "active-gentrification" Gebiet and a Berlin "active-gentrification" PLR as directly
equivalent cases in any public narrative (O4-style milestone write-up) without this disclosure. This
is a **condition on publication (G2/O4), not on `develop` integration** — the pipeline itself does
nothing wrong; the risk is in downstream interpretation/communication.

## 2. Indicator selection: unemployment_share as an added vulnerability marker

The Hamburg composite substitutes `unemployment_share` for Berlin's `migration_background_share` +
`residence_duration_5y_share` (absent from the ingested Hamburg source). I want to confirm this is a
theoretically sound substitution, not just a "use what's available" shortcut: **unemployment_share is
a canonical socio-economic vulnerability indicator in the German Sozialmonitoring/EWR tradition**
(indeed, Hamburg's own Sozialmonitoring attention-indicator set — ADR-0014 Pillar 2 — includes SGB-II
share and unemployment among its seven inputs, so this is consistent with how Hamburg's *own*
official methodology already treats unemployment as a status marker). This is a defensible,
literature-consistent choice (Döring & Ulbricht 2016's vulnerability framing explicitly includes
labour-market status), not an ad hoc substitute. **No objection.**

The bigger theory question is the **loss of migration_background_share** specifically, since the
2018 thesis's own indicator battery treats it as one of the more theoretically load-bearing
predictors (Dangschat's succession model is partly about demographic composition change, and
migration background is the closest available proxy for the "who is moving in/out" dynamic). Its
absence from Hamburg's composite is a genuine reduction in what the Hamburg D4 covariate can
detect relative to Berlin's — correctly disclosed in the SQL comments, but I want it explicit here
too: **a Hamburg "vulnerable" classification under this composite is systematically less sensitive
to migration-driven succession than Berlin's classification is.** This should be one sentence on the
G2 methodology page, not a blocker.

## 3. Uniform Stadtteil→Gebiet inheritance: ecological-fallacy risk

I concur with the geo-DS review's spatial-method assessment of the uniform-inheritance choice as
the honest option given the data constraint. From a domain-theory angle, I'll add: this means the
Hamburg D4 covariate **cannot distinguish gentrification-adjacent demographic shifts happening at
sub-Stadtteil scale** (e.g. a single Gebiet within a large, heterogeneous Stadtteil undergoing rapid
socio-economic change while its neighbours do not) — exactly the fine-grained spatial pattern
gentrification research (Smith's rent-gap theory operates at a very local, often block-level, scale)
cares about. This is a real limitation of the D4 pillar specifically; the D1/D2 outcome (Sozial-
monitoring) and D3 predictor (POI, once real data lands) both retain full Gebiet granularity, so the
overall panel is not blind to local variation — only the demographic *covariate* is coarsened. This
should be stated plainly on G2 as a known Hamburg limitation (ADR-0014 already anticipates this:
"Two-grain social pillar is a standing methodology note"). **No objection to integration; condition
is documentation-only, same as the geo-DS review's Condition 3.**

## 4. Ethics / framing check

No new public-facing claim is made by this slice (it is pipeline wiring; no dashboard/report is
published from it yet). The existing ethics guardrails (G-2 ecological-fallacy note, PLR/Gebiet-level
aggregate framing) already present in `gentrification_index.sql`'s header apply unchanged to Hamburg
rows via the shared mart — no Hamburg-specific ethics gap identified. When Hamburg reaches a public
narrative (O4-style), the two conditions above (window-length qualitative caveat, migration-background
absence) must be part of that framing, consistent with this project's existing practice of disclosing
Berlin's own limitations (W3 causal-inference caveat, MAUP notes) rather than presenting the index as
more precise than it is.

---

## Conditions (documentation/publication-time; do not block `develop` integration)

1. G2 methodology page must state the Berlin/Hamburg Dynamik window-length difference as both a
   magnitude AND a qualitative ("what counts as active-gentrification differs") caveat.
2. G2 methodology page must disclose that Hamburg's D4 composite omits migration-background and
   residence-duration signal present in Berlin's.
3. G2 methodology page must disclose the Stadtteil-grain ceiling on D4's spatial resolution for
   Hamburg (mirrors geo-DS Condition 3).
4. Any future public narrative comparing a Hamburg-coded typology stage to a Berlin-coded one
   (O4-style) must carry a one-line "not directly equivalent — see methodology" disclosure.

**Verdict: PASS**

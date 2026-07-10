# I3 process-honesty caveat text — domain-expert framing check

**Ticket:** I3 (#220), branch `feature/220-i3-page-revision-pass`
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-10
**Scope:** Narrow, lightweight framing check (NOT a full R-C1 methodology gate). I3 is a mechanical
page-template conversion; no model, indicator, weight, normalization, spatial method, or
statistical/gentrification-finding claim changes in this diff. At the web-engineer's request via the
PM, this note covers only the two newly added *process-honesty* caveat passages the web-engineer
flagged, checked against `docs/epic-i/storytelling-guide.md` tone rules (esp. rule 6) and my own I1
C2 watch-item (`docs/epic-i/I1-storytelling-domain-signoff.md`).

Artifacts reviewed (diff `develop..feature/220-i3-page-revision-pass`):
`web/pages/about.md` "Honest caveats", `web/pages/how-its-organised.md` "Honest caveats".
Fact-check of the cited #200 correction against `web/pages/thesis-recheck.md` (lines 142-143).

---

## Verdict: PASS

Both new caveat passages state what the gate *did* without slipping into either forbidden register.
No gentrification or statistical-finding wording changed anywhere in the diff, so no R-C1 gate is
triggered. I3 may integrate on the strength of the web-engineer-reviewer's build/render sign-off
plus this framing check.

## What I checked and why it holds

1. **Epic B "directional, not number-for-number" caveat (about.md).** Matches CLAUDE.md's "Epic B
   framing" section faithfully: "a *directional* revival — does the 2018 thesis's finding still
   hold, broadly? — not an exercise in reproducing the original numbers exactly." This is a new
   *location* for already-published language, not a new claim, and it does **not** overstate
   confirmation (it frames Epic B as an open directional check, consistent with the arc's honest
   "real, but fragile" headline). Clear.

2. **"Supervised is an enforced process, not a guarantee" caveat (both pages).** This is precisely
   my I1 C2 watch-item's target zone (the AI-process chapter is where self-congratulation creeps
   in), and the wording resolves it correctly:
   - It **states what the gate did**, not adjectives of quality: "catching and disclosing an
     error" / "the gate's own after-the-fact review process catching and disclosing an error."
     No "rigorous," "robust," "bulletproof," "cutting-edge" — tone rule 6 respected.
   - It **explicitly inverts** the infallibility overclaim risk (b): the caught bug is framed as
     "*not* evidence the process is error-proof" and "they reduce the rate of error, they do not
     eliminate it." A caught bug is presented as proof the process is fallible, not as a brag —
     the humility framing, not the promotional one.
   - It avoids the self-congratulatory "our rigorous process" register (a): the how-its-organised
     version even adds "describes the intended workflow, not a claim that every task follows it
     perfectly," pointing readers to the unfiltered PR/issue record.

3. **The cited #200 example is real and accurately characterized.** `thesis-recheck.md` lines
   142-143 document the 2026-07-09 area-code join bug that understated the H1 (OA) sample (n=92 vs
   correct n=435). The caveat's description ("area-code join bug… found in a live statistical
   result and corrected after publication") matches the documented facts — no embellishment, no
   invented severity, correct issue number and date.

## Theory / framing risks

- None material. The passages make no gentrification claim (both explicitly disclaim it and defer
  numeric/finding claims to `/methodology`), so the displacement-inference and sign-convention
  guardrails I gate for are not engaged here.

## Recommendations (non-blocking)

- **Keep the humility framing verbatim if this copy is propagated.** The "not evidence the process
  is error-proof" clause is doing the load-bearing work that satisfies C2; if future tickets
  shorten these caveats, that clause must survive — dropping it would reopen the infallibility
  overclaim.
- Unrelated to this diff: my I1 C1 recommended fix ("peer-review-grade" on the home page) is
  tracked separately and is not part of I3's scope.

**Verdict: PASS**

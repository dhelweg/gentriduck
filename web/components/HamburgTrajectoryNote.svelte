<!--
  #353 (Hamburg-Berlin parity): the binding Hamburg trajectory disclosure, extracted so every page
  that shows a Hamburg trajectory label renders the same words. Before #353 it was hand-copied onto
  three area pages (#317); #353 adds two more consumers (/hamburg/time-series, /hamburg/area-detail).

  BINDING (docs/epic-h/314-hh-trajectory-domain-signoff.md §5 "Carried-forward binding condition",
  inherited from docs/epic-h/159-hc2-domain-signoff.md Q1): every Hamburg trajectory display must
  disclose (1) that the label describes a recent ~6-year window (2019-2025), not the full
  13-edition history, and (2) that it is a status-only classification, never a displacement
  verdict. The wording below is the #317 wording, apart from the `subject` noun and one #353
  domain spot-check change (O4, docs/epic-g/353-domain-spotcheck.md): the comparison with "Berlin's
  own multi-decade biennial figures" became "don't read it as a long-run verdict", because Berlin's
  trajectory uses the same bounded window, so the comparison misled.

  This is Hamburg-specific content (the window and cadence are Hamburg's), not a shared
  city-agnostic component; Berlin's pages carry their own reading note.

  Usage: <HamburgTrajectoryNote subject="this Gebiet" />  (or "each Gebiet")
-->
<script>
	import { Alert } from '@evidence-dev/core-components';
	import { base } from '$app/paths';

	/** "this Gebiet" on a single-Gebiet page, "each Gebiet" where several are listed. */
	export let subject = 'each Gebiet';
	$: singular = subject.startsWith('this');
</script>

<Alert status="warning">
	<b>Two things to know before reading this section (#317):</b><br />
	<b>1. Recent window, not full history.</b> These labels describe a bounded
	<b>~6-year window (2019–2025)</b> of Hamburg's own annual Sozialmonitoring panel, not the full
	13-edition (2013–2025) series on record — the same cadence-normalized window already used for
	Berlin (H-C2, #159), applied here to Hamburg's annual cadence for the first time (#314). A Gebiet
	classified <b>persistently-deprived</b> or <b>stable-established</b> reflects only the last ~6
	years, not necessarily {singular ? "this area's" : 'its'} full history — don't read it as a
	long-run verdict.<br />
	<b>2. Status-only, not a displacement verdict.</b> <code>stable-established</code>,
	<code>persistently-deprived</code>, <code>improving</code>, <code>declining</code>, and
	<code>mixed</code> describe how {subject}'s <i>officially-measured social status</i> moved over
	that window — never a claim about who moved, why, or whether any resident was displaced. See
	<a href="{base}/methodology">methodology</a> for what this classification does and doesn't claim.
</Alert>

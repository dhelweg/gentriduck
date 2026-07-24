<!--
  I21-g (#301): shared "not yet published for Hamburg" state. Extracted so every section of the
  Hamburg area-hierarchy scaffold (`/hamburg/area/…`) renders the SAME honest wording instead of
  five hand-copied Alert blocks drifting apart over time -- same "one source of truth" reasoning as
  FooterNav.svelte/Hero.svelte (I1, #218).

  Why this exists instead of a live query that just happens to return empty: this ticket (I21-g,
  Track 1 of I21 §4) is scoped as structure-only -- no real Hamburg per-area number may render on
  this route, full stop, even where an underlying mart already has real Hamburg rows (e.g.
  gentrification_index already publishes Hamburg subarea_l2 stage/status on /hamburg/maps, H3/#237).
  A live query against that mart here would technically be "correct" today but would make this
  page's content depend on which marts happen to be populated, rather than on the explicit,
  separately-gated decision I21-i (#303) is reserved for. Rendering a fixed, honest placeholder
  instead of a maybe-empty query is the deliberate choice: it can never leak a real number, in this
  ticket or in any future mart change, until I21-i explicitly flips it.

  Evidence auto-imports any `.svelte` file under `web/components/` (see FooterNav.svelte's header
  comment for the mechanism) -- no import needed in page markdown, just `<NotYetPublished what="…" />`.
-->
<script>
	// Evidence's markdown auto-import (`sveltekit-autoimport`) only injects core components into
	// `.md` pages, not into nested `.svelte` components under web/components/ (no existing
	// component here relies on it -- checked before adding this dependency) -- so `<Alert>` is
	// imported explicitly, same package the page-level markdown resolves it from.
	import { Alert } from '@evidence-dev/core-components';

	/** Short, lower-case noun phrase for what this section would show once published, e.g. "this
	 * area's Offering Advantage profile" or "demographic figures for this Gebiet". */
	export let what = 'this section';
	/** Optional: set true for the page-level (above-the-fold) banner, which uses slightly stronger
	 * wording than a per-section one. */
	export let pageLevel = false;
</script>

<Alert status="info">
	{#if pageLevel}
		<b>Not yet published for Hamburg.</b> This page is a structural scaffold (I21-g, #301) —
		the route, breadcrumb, and section layout exist and are reviewed, but Hamburg's real numbers
		for {what} are deliberately withheld here until Hamburg's own fresh, independent geo- and
		domain-expert sign-off clears for this specific view and the <code>published_cities</code>
		gate is flipped for it (I21-i, #303). This is never a broken query — it is an explicit,
		reviewed decision not to show a value yet.
	{:else}
		<b>Not yet published for Hamburg.</b> {what} would render here once I21-i (#303) clears its
		own sign-off and publication gate — this section exists structurally but deliberately shows
		no figure yet, not a broken or empty query.
	{/if}
</Alert>

<!--
  I21-g (#301): shared "not published for Hamburg" state, so every Hamburg area-profile section
  that cannot show a figure says so in the same words instead of hand-copied Alerts drifting apart
  (same "one source of truth" reasoning as FooterNav.svelte/Hero.svelte, I1 #218).

  Why a fixed statement and not a live query that happens to return nothing: whether a Hamburg
  figure may appear on a public page is decided by a methodology sign-off, not by whether a mart
  happens to carry Hamburg rows. A fixed statement can never leak a number that no sign-off covers,
  whatever the marts contain.

  #353 (Hamburg-Berlin parity): the original wording pointed every section at I21-i (#303) as "the"
  pending gate. #303 has since closed (it admitted Hamburg price/rent rows to the mart only), and
  several sections are now published under their own sign-offs (#314/#317 trajectory, I20
  amenities, H3 stage). So each remaining use now states its own concrete reason in the default
  slot -- which sign-off condition or missing data blocks it -- instead of a generic pointer.
  docs/epic-g/353-hamburg-berlin-parity-audit.md lists every remaining gap and its reason.

  Evidence auto-imports any `.svelte` file under `web/components/` -- no import needed in page
  markdown:
    <NotYetPublished what="Land value and estimated rent for this Stadtteil">
      Reason sentence(s), may contain <a href="/methodology">links</a>.
    </NotYetPublished>
-->
<script>
	// Evidence's markdown auto-import only injects core components into `.md` pages, not into
	// nested `.svelte` components under web/components/ -- so `<Alert>` is imported explicitly.
	import { Alert } from '@evidence-dev/core-components';
	// A component's own template is not base-path rewritten (see FooterNav.svelte's comment).
	import { base } from '$app/paths';

	/** What this section would show, as a sentence subject, e.g. "Demographic figures for this
	 * Stadtteil". */
	export let what = 'This section';
</script>

<Alert status="info">
	<b>Not published for Hamburg.</b>
	{what} is not shown here.
	<slot>
		No existing methodology sign-off covers showing this for Hamburg yet, so this page says so
		instead of showing a number. See the <a href="{base}/hamburg">Hamburg data hub</a> for what is and
		isn't published.
	</slot>
</Alert>

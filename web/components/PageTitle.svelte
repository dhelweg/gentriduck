<!--
  #353 (Hamburg-Berlin parity, #352 review follow-up): sets the browser tab / document <title> on
  templated pages (`[code].md`), which have no frontmatter `title` and so fell back to Evidence's
  default "<title>Evidence</title>" on every area profile page in both cities.

  Why a component and not a <svelte:head> in the page: Evidence's preprocessor already injects one
  <svelte:head> block into every page (@evidence-dev/preprocess/src/frontmatter/handle-og.cjs), and
  Svelte rejects a second <svelte:head> in the same component (see the header comment in
  pages/methodology-comparison.md). A child component may carry its own <svelte:head>. Svelte keeps
  one document title: on the server the title rendered last wins, and on the client a <title>
  inside <svelte:head> writes document.title whenever the value changes. On the server this
  component renders after the injected default, so its title wins in the static HTML; on the
  client the default is re-applied during hydration, so the title is written again after mount
  (see the script below).

  Usage: <PageTitle title={someLabel} />. Falsy titles render nothing, so the default stays until
  the page's query resolves.
-->
<script>
	import { onMount, tick } from 'svelte';

	/** @type {string | null | undefined} */
	export let title = undefined;
	/** Appended after the title, so tabs read e.g. "Altona-Altstadt — Stadtteil profile · Hamburg · Gentriduck". */
	export let suffix = 'Gentriduck';

	$: full = title ? (suffix ? `${title} · ${suffix}` : title) : null;

	// Client side: on a prerendered page the title is known at hydration, and the page's injected
	// default <title>Evidence</title> is applied during the same hydration pass, after this
	// component's <svelte:head> -- so the default won in the production build (the dev server
	// hid this because the title only arrived once the query resolved). Re-applying it after mount
	// (and on every later change) makes ours the last write.
	let mounted = false;
	onMount(async () => {
		await tick();
		mounted = true;
	});
	$: if (mounted && full && typeof document !== 'undefined') document.title = full;
</script>

<svelte:head>
	{#if full}
		<title>{full}</title>
	{/if}
</svelte:head>

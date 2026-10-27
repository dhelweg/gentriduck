<!--
  #353 (Hamburg-Berlin parity, #352 review follow-up): sets the browser tab / document <title> on
  templated pages (`[code].md`), which have no frontmatter `title` and so fell back to Evidence's
  default "<title>Evidence</title>" on every area profile page in both cities.

  Why a component and not a <svelte:head> in the page: Evidence's preprocessor already injects one
  <svelte:head> block into every page (@evidence-dev/preprocess/src/frontmatter/handle-og.cjs), and
  Svelte rejects a second <svelte:head> in the same component (see the header comment in
  pages/methodology-comparison.md). A child component may carry its own <svelte:head>. Svelte keeps
  one document title: on the server the title rendered last wins, and on the client a <title>
  inside <svelte:head> writes document.title whenever the value changes. This component renders
  after the injected default, so its title is the one that sticks.

  Usage: <PageTitle title={someLabel} />. Falsy titles render nothing, so the default stays until
  the page's query resolves.
-->
<script>
	/** @type {string | null | undefined} */
	export let title = undefined;
	/** Appended after the title, so tabs read e.g. "Altona-Altstadt — Stadtteil profile · Hamburg · Gentriduck". */
	export let suffix = 'Gentriduck';

	$: full = title ? (suffix ? `${title} · ${suffix}` : title) : null;
</script>

<svelte:head>
	{#if full}
		<title>{full}</title>
	{/if}
</svelte:head>

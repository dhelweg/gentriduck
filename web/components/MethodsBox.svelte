<!--
  Shared "how this was done" box (#371). A bordered, titled panel for a short methods summary on
  an evidence page, so a page does not need its own inline CSS for it (the reason Hero/LinkCard
  were extracted, I3 #220). Evidence auto-imports `.svelte` files under `web/components/`, so
  `<MethodsBox>` works in page markdown with no import. Markdown inside the box renders as usual
  as long as it is separated from the tags by blank lines (same as `<Details>`).

  Usage:
    <MethodsBox title="How the comparison works">

    - **Grain.** ...

    </MethodsBox>

  Styling uses translucent greys only (as Hero does), so it reads in both light and dark mode
  without theme tokens. No layout width is fixed, so it follows the page column on mobile.
-->
<script>
	/** Box heading (plain text). */
	export let title = '';
	/**
	 * Heading level of the title (2, 3 or 4; default 3), so the box title is a real heading in
	 * the page outline (#371 page review low 7). Pick the level that fits where the box sits,
	 * e.g. 3 inside an h2 section.
	 */
	export let level = 3;
</script>

<section class="methods-box">
	{#if title}
		{#if level === 2}
			<h2 class="methods-box-title">{title}</h2>
		{:else if level === 4}
			<h4 class="methods-box-title">{title}</h4>
		{:else}
			<h3 class="methods-box-title">{title}</h3>
		{/if}
	{/if}
	<div class="methods-box-body"><slot /></div>
</section>

<style>
	.methods-box {
		margin: 1.25rem 0 1.5rem;
		padding: 1rem 1.25rem 0.5rem;
		border: 1px solid rgba(127, 127, 127, 0.28);
		border-left: 4px solid rgba(37, 99, 235, 0.55);
		border-radius: 0.6rem;
		background: rgba(127, 127, 127, 0.05);
		overflow-wrap: break-word;
	}
	.methods-box-title {
		margin: 0;
		line-height: 1.3;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		opacity: 0.75;
		margin-bottom: 0.4rem;
	}
	@media (max-width: 640px) {
		.methods-box {
			padding: 0.85rem 0.9rem 0.35rem;
		}
	}
</style>

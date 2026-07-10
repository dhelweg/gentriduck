<!--
  Shared page hero (I1, #218). Extracted from the two hand-duplicated `.hero`/`.hero-compact`
  blocks that previously lived inline on `pages/index.md` and `pages/thesis-recheck.md` (flagged
  by the 2026-07-10 storytelling review, finding 4). Evidence auto-imports any `.svelte` file
  under `web/components/` into every `.md`/`.svelte` page (see
  `@evidence-dev/sdk`'s `injectComponents.js` -> `sveltekit-autoimport`), so no explicit import is
  needed in page markdown -- just `<Hero>...</Hero>`.

  Per the I1 page template (`docs/epic-i/storytelling-guide.md` §4.1): "orient the reader in one
  glance -- what page is this, which audience/chapter is it for, one sentence of stakes."

  Usage (full, home page):
    <Hero eyebrow="..." title="Gentriduck" lede="...">
      <a href="/how-its-organised" class="primary">How it's organised →</a>
      <a href="#the-finding" class="secondary">What we found →</a>
    </Hero>

  Usage (compact, secondary pages -- e.g. /thesis-recheck):
    <Hero compact eyebrow="..." title="..." lede="..." />
-->
<script>
	/** Small uppercase label above the H1 (states which chapter/audience this page is for). */
	export let eyebrow = '';
	/** The H1 text. */
	export let title = '';
	/**
	 * The lede paragraph beneath the H1. Rendered as HTML (via {@html}) so a page can include
	 * inline links/emphasis, matching what the previous inline hero blocks supported.
	 */
	export let lede = '';
	/** Compact variant (`.hero-compact`, smaller padding/type) for secondary pages. */
	export let compact = false;
</script>

<div class="hero" class:hero-compact={compact}>
	{#if eyebrow}<div class="hero-eyebrow">{@html eyebrow}</div>{/if}
	{#if title}<h1>{title}</h1>{/if}
	{#if lede}<p class="hero-lede">{@html lede}</p>{/if}
	{#if $$slots.default}
		<div class="hero-links"><slot /></div>
	{/if}
</div>

<style>
	.hero {
		margin: -0.5rem -0.25rem 1.75rem;
		padding: 2.1rem 1.6rem;
		border-radius: 1rem;
		background:
			radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.18), transparent 55%),
			radial-gradient(circle at 88% 82%, rgba(194, 65, 12, 0.15), transparent 55%),
			rgba(127, 127, 127, 0.04);
		border: 1px solid rgba(127, 127, 127, 0.16);
	}
	.hero.hero-compact {
		margin: -0.5rem -0.25rem 1.5rem;
		padding: 1.5rem 1.6rem;
		background:
			radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.16), transparent 55%),
			radial-gradient(circle at 88% 82%, rgba(194, 65, 12, 0.13), transparent 55%),
			rgba(127, 127, 127, 0.04);
	}
	.hero-eyebrow {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		font-weight: 700;
		color: #2563eb;
		margin-bottom: 0.5rem;
	}
	.hero-compact .hero-eyebrow {
		margin-bottom: 0.45rem;
	}
	.hero h1 {
		margin: 0 0 0.65rem 0;
		font-size: 2.5rem;
		line-height: 1.1;
	}
	.hero-compact h1 {
		margin: 0 0 0.55rem 0;
		font-size: 1.9rem;
		line-height: 1.15;
	}
	.hero-lede {
		max-width: 46rem;
		font-size: 1.02rem;
		line-height: 1.55;
		opacity: 0.92;
		margin: 0 0 1.1rem 0;
	}
	.hero-compact .hero-lede {
		font-size: 0.98rem;
		line-height: 1.5;
		margin: 0;
	}
	.hero-links :global(a) {
		display: inline-block;
		margin: 0 0.55rem 0.4rem 0;
		padding: 0.45rem 0.85rem;
		border-radius: 0.5rem;
		text-decoration: none !important;
		font-weight: 600;
		font-size: 0.85rem;
	}
	.hero-links :global(a.primary) {
		background: #2563eb;
		color: #fff !important;
	}
	.hero-links :global(a.secondary) {
		background: transparent;
		border: 1px solid #2563eb;
		color: #2563eb !important;
	}
	.hero-links :global(a.primary:hover) {
		background: #1d4ed8;
	}
	.hero-links :global(a.secondary:hover) {
		background: rgba(37, 99, 235, 0.08);
	}
</style>

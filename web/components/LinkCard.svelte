<!--
  Shared "where next" / audience-router card (I3, #220). Extracted from the `.audience-card`
  markup + CSS that I1 (#218) introduced inline on `pages/index.md` ("Pick your path") and I2
  (#219) then hand-copied onto `pages/berlin/index.md` ("Where to go next") -- the exact kind of
  duplicated inline markup/CSS I3's scope calls out for removal (docs/epic-i/storytelling-guide.md
  §4.5's "where next" section; ticket I3's "remove any duplicated inline CSS/markup that I1 didn't
  already extract"). Evidence auto-imports `.svelte` files under `web/components/`, so
  `<LinkCard>...</LinkCard>` works with no import; use inside a `<LinkCards>` wrapper for the grid.

  A card with no `href` renders as a non-linking, dashed-border "planned" card (same visual
  treatment as I1's two "coming soon" audience cards) -- use this for a page/route that does not
  exist yet, never a placeholder `<a>` pointing nowhere (Evidence's static build 404s the whole
  build on a broken internal link).

  Usage (linked):
    <LinkCard href="/methodology" icon="🏙️" title="You study cities & gentrification" cta="Start with methodology →">
      What "gentrification pressure" means here...
    </LinkCard>

  Usage (planned / not yet built):
    <LinkCard icon="🏛️" title="You work in housing policy or a local initiative" cta="Takeaways page — coming soon">
      Plain-language, honestly caveated takeaways...
    </LinkCard>

  `href` values are resolved through Evidence's own `addBasePath` helper (idempotent -- returns
  external/absolute URLs and already-prefixed paths unchanged, see
  `@evidence-dev/sdk/src/utils/svelte/addBasePath.js`), the same helper
  `@evidence-dev/core-components`' `Sidebar.svelte` uses for its nav links. This -- not the naive
  `${base}${href}` string-concat pattern `FooterNav.svelte` uses -- is required here specifically
  because `LinkCard` is invoked *with a literal `href="..."` attribute* from `+page.md` files
  (`pages/index.md`, `pages/berlin/index.md`): Evidence's `addBasePathToHrefAndSrc` preprocessor
  (`@evidence-dev/sdk`) regex-rewrites every literal `href=`/`src=` it finds in a `+page.md`
  file's raw markup -- including inside a custom component's own attribute, since it runs before
  Svelte parses component boundaries -- so by the time this component receives its `href` prop,
  a page-level basePath prefix may *already* be present. A naive second `${base}${href}` concat
  (confirmed locally: produced `/gentriduck/gentriduck/methodology`, hard-failing
  `npm run build`'s prerender crawl) double-prefixes it; `addBasePath`'s own
  `if (_path.startsWith(basePath)) return _path;` check makes it safe either way.
-->
<script>
	import { addBasePath } from '@evidence-dev/sdk/utils/svelte';

	/** Internal route (e.g. "/methodology") or full external URL. Omit for a "planned" card. */
	export let href = undefined;
	/** Emoji/icon shown at the top of the card. */
	export let icon = '';
	/** Card heading. */
	export let title = '';
	/** Bottom call-to-action text (e.g. "Start with methodology →" or "Takeaways page — coming soon"). */
	export let cta = '';

	$: resolvedHref = href ? addBasePath(href) : href;
</script>

{#if href}
	<a href={resolvedHref} class="audience-card">
		<div class="audience-icon">{icon}</div>
		<h3>{title}</h3>
		<p><slot /></p>
		<span class="audience-cta">{cta}</span>
	</a>
{:else}
	<div class="audience-card audience-card-planned">
		<div class="audience-icon">{icon}</div>
		<h3>{title}</h3>
		<p><slot /></p>
		<span class="audience-cta">{cta}</span>
	</div>
{/if}

<style>
	.audience-card {
		display: block;
		text-decoration: none !important;
		color: inherit;
		padding: 1.15rem 1.15rem 1rem;
		border-radius: 0.75rem;
		border: 1px solid rgba(127, 127, 127, 0.25);
		background: rgba(127, 127, 127, 0.04);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}
	.audience-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		border-color: #2563eb;
	}
	.audience-card-planned {
		cursor: default;
		opacity: 0.8;
		border-style: dashed;
	}
	.audience-card-planned:hover {
		transform: none;
		box-shadow: none;
		border-color: rgba(127, 127, 127, 0.25);
	}
	.audience-icon {
		font-size: 1.7rem;
		margin-bottom: 0.4rem;
	}
	.audience-card h3 {
		margin: 0 0 0.4rem 0;
		font-size: 1rem;
	}
	.audience-card p {
		margin: 0 0 0.7rem 0;
		font-size: 0.85rem;
		opacity: 0.85;
		line-height: 1.4;
	}
	.audience-card p :global(a) {
		text-decoration: underline;
	}
	.audience-cta {
		font-size: 0.82rem;
		font-weight: 700;
		color: #2563eb;
	}
</style>

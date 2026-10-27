<!--
  #353 (Hamburg-Berlin parity): city-aware breadcrumb trail for the area profile templates
  (`/berlin/area/…`, `/hamburg/area/…`), used together with `hide_breadcrumbs: true` in the
  page's frontmatter.

  Why not Evidence's own breadcrumb: `@evidence-dev/core-components`' BreadCrumbs.svelte collapses
  any trail longer than three crumbs after "Home" into "Home / … / <parent> / <page>" and labels
  the "…" with the title of whatever page sits at that depth. On a four-level route such as
  `/hamburg/area/subarea_l1/<code>` that drops the city entirely ("Home / Area profiles /
  Stadtteile / <name>"), and on Berlin's `/berlin/area/bzr/<code>` it shows the raw folder slug
  "bzr". This component takes an explicit trail instead, so every profile page in both cities reads
  "Home › <City> › <list page> › … › <this area>".

  Usage (in a page's <script>, so no quote characters sit in markdown text — see the smart-quote
  note in pages/hamburg/area/[code].md):
    $: crumbs = [
      { label: 'Hamburg', href: '/hamburg' },
      { label: 'Stadtteile', href: '/hamburg/area/subarea_l1' },
      { label: stadtteilName }   // last crumb: the current page, no href
    ];
  then in markup: <AreaBreadcrumbs {crumbs} />

  hrefs go through Evidence's idempotent `addBasePath` (same reason as LinkCard.svelte: a
  component's own template is not rewritten by the markdown base-path preprocessor). Markup and
  classes mirror the stock breadcrumb so the trail sits in the same place and looks the same.
-->
<script>
	import { addBasePath } from '@evidence-dev/sdk/utils/svelte';

	/** @type {{ label: string, href?: string }[]} trail after "Home"; the last entry is the current page. */
	export let crumbs = [];

	$: trail = [{ label: 'Home', href: '/' }, ...(crumbs ?? []).filter((c) => c && c.label)];
</script>

<nav aria-label="Breadcrumb" class="flex items-start mt-0 whitespace-nowrap overflow-auto">
	<div class="inline-flex items-center text-sm gap-1 text-base-content-muted mb-2 sm:mb-4">
		{#each trail as crumb, i}
			{#if i > 0}<span aria-hidden="true" class="opacity-60">›</span>{/if}
			{#if crumb.href && i < trail.length - 1}
				<a href={addBasePath(crumb.href)} class="hover:underline">{crumb.label}</a>
			{:else}
				<span class="cursor-default" aria-current={i === trail.length - 1 ? 'page' : undefined}
					>{crumb.label}</span
				>
			{/if}
		{/each}
	</div>
</nav>

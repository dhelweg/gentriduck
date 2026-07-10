<!--
  Shared footer nav (I1, #218). Extracted from the identical
  `<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) ·
  [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>` line that was hand-copied onto
  every page (the review's finding 4 called out the hero/agent-pipeline duplication specifically;
  this footer line was already *consistent* across pages, just copy-pasted -- extracting it here
  keeps it that way with one source of truth). Evidence auto-imports `.svelte` files under
  `web/components/`, so `<FooterNav />` works with no import.

  Markdown link syntax (`[text](url)`) is only processed inside `.md` files (Evidence's
  markdown/rehype pipeline rewrites those hrefs to be basePath-aware automatically); a `.svelte`
  component's own template does NOT go through that pipeline, so a bare `href="/"` here 404s the
  static prerender build under this deployment's `basePath: /gentriduck` (confirmed locally: a
  first version of this file without the `base` import broke `npm run build` with
  "404 / does not begin with `base`"). Same fix pattern as `/maps`' and `/poi-map`'s AreaMap
  click-through fix (#144, 2026-07-10): prepend SvelteKit's `base` (= deployment.basePath in the
  build; "" when served at root in dev) to every internal href.
-->
<script>
	import { base } from '$app/paths';
</script>

<sub class="footer-nav">
	<a href="{base}/">Home</a> ·
	<a href="{base}/timeline">Timeline</a> ·
	<a href="{base}/methodology">Methodology &amp; data sources</a> ·
	<a href="{base}/about">About this project</a> ·
	<a href="https://github.com/dhelweg/gentriduck">GitHub repository</a>
</sub>

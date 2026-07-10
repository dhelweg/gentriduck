<!--
  Shared vertical timeline (I4, #221). CSS-only — no charting library, per ADR-0012's "stay inside
  the stack, no new dependency" constraint and I4's SPEC ("CSS vertical timeline ... no new
  library"). Evidence auto-imports `.svelte` files under `web/components/`, so `<Timeline
  milestones={...} />` works with no import (same pattern as Hero/AgentPipeline/LinkCards).

  `milestones` is a plain array of `{ date, title, body, href?, hrefLabel? }` objects, curated by
  the calling page (never derived from `git log` — see I4's SPEC on why: history is squashed and
  its dates are wrong for this purpose). This component only renders what it is given; it does not
  fetch or compute dates itself.

  Usage:
    <Timeline milestones={[
      { date: '2018-09-09', title: 'Thesis submitted', body: '...', href: '...', hrefLabel: '...' },
      ...
    ]} />

  Layout: a single vertical rail with alternating-free (always left-aligned) entries — deliberately
  not left/right alternating, since that pattern collapses to a single column on mobile anyway and
  a consistent left rail is simpler to keep readable at every width (mobile-friendly by
  construction, no separate breakpoint layout needed).
-->
<script>
	import { addBasePath } from '@evidence-dev/sdk/utils/svelte';

	/** @type {{date: string, title: string, body: string, href?: string, hrefLabel?: string}[]} */
	export let milestones = [];
</script>

<ol class="timeline">
	{#each milestones as m}
		<li class="timeline-entry">
			<div class="timeline-marker" aria-hidden="true"></div>
			<div class="timeline-content">
				<time class="timeline-date" datetime={m.date}>{m.date}</time>
				<h3>{m.title}</h3>
				<p>{@html m.body}</p>
				{#if m.href}
					<!-- addBasePath here (same as LinkCard.svelte) -- m.href is bound, not a literal
					     `href=` attribute in the calling .md, so Evidence's addBasePathToHrefAndSrc
					     preprocessor never sees/rewrites it; idempotent, safe for internal or external. -->
					<a class="timeline-link" href={addBasePath(m.href)}>{m.hrefLabel ?? 'Source →'}</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.timeline {
		list-style: none;
		margin: 1.5rem 0;
		padding: 0;
		position: relative;
	}
	.timeline-entry {
		position: relative;
		padding: 0 0 1.75rem 1.75rem;
		border-left: 2px solid rgba(127, 127, 127, 0.25);
	}
	.timeline-entry:last-child {
		border-left-color: transparent;
		padding-bottom: 0;
	}
	.timeline-marker {
		position: absolute;
		left: -0.5rem;
		top: 0.2rem;
		width: 0.85rem;
		height: 0.85rem;
		border-radius: 50%;
		background: #2563eb;
		border: 2px solid var(--evidence-base-color, transparent);
		box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
	}
	.timeline-content {
		margin-left: 0.4rem;
	}
	.timeline-date {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #2563eb;
		opacity: 0.9;
		margin-bottom: 0.2rem;
	}
	.timeline-content h3 {
		margin: 0.1rem 0 0.35rem 0;
		font-size: 1.05rem;
	}
	.timeline-content p {
		margin: 0 0 0.4rem 0;
		font-size: 0.9rem;
		line-height: 1.5;
		opacity: 0.9;
	}
	.timeline-link {
		font-size: 0.82rem;
		font-weight: 600;
	}

	@media (max-width: 640px) {
		.timeline-entry {
			padding-left: 1.25rem;
		}
		.timeline-marker {
			left: -0.42rem;
			width: 0.7rem;
			height: 0.7rem;
		}
	}
</style>

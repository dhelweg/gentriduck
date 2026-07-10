<!--
  Shared agent-pipeline diagram (I1, #218). Extracted from the `.agent-pipeline` markup + CSS
  that was hand-duplicated on `pages/index.md` (home, "Built by a team of AI agents") and
  `pages/how-its-organised.md` (flagged by the 2026-07-10 storytelling review, finding 4 --
  ".agent-pipeline CSS appears twice"). Evidence auto-imports `.svelte` files under
  `web/components/` into every page, so `<AgentPipeline />` works with no import.

  The two pages' diagrams differ slightly in wording (e.g. "Data engineer" vs "Coder"), so this
  takes an optional `steps` prop -- a data-driven array -- instead of hard-coding one page's copy.
  With no prop it renders the diagram exactly as it appeared on the home page (this ticket only
  converts the home page; `how-its-organised` keeps its own inline copy until I3 converts it, at
  which point it can pass its own `steps` array here instead of duplicating the CSS again).

  Each step: { icon, label, note, kind?, arrow? }
    - note may contain inline HTML (e.g. "<code>develop</code>"), rendered via {@html}.
    - kind: 'gate' | 'human' controls the highlighted step styling.
    - arrow: the connector rendered *before* this step (default '→'); ignored for the first step.
-->
<script context="module">
	const homeSteps = [
		{ icon: '🗂️', label: 'Project manager', note: 'picks the next task' },
		{ icon: '🛠️', label: 'Data engineer', note: 'builds it', arrow: '→' },
		{ icon: '🔍', label: 'Reviewer', note: 'independently checks', arrow: '↔' },
		{
			icon: '⚖️',
			label: 'Dual methodology gate',
			note: 'geo-data-scientist &amp; domain expert — both must PASS',
			kind: 'gate',
			arrow: '→'
		},
		{ icon: '🔀', label: 'PM self-integrates', note: 'onto <code>develop</code>', arrow: '→' },
		{
			icon: '🧑',
			label: 'Human maintainer',
			note: 'merges to the live site — once a week, by hand',
			kind: 'human',
			arrow: '→'
		}
	];
</script>

<script>
	/** @type {{icon: string, label: string, note: string, kind?: 'gate'|'human', arrow?: string}[]} */
	export let steps = homeSteps;
</script>

<div class="agent-pipeline">
	{#each steps as step, i}
		{#if i > 0}<div class="pipe-arrow">{step.arrow ?? '→'}</div>{/if}
		<div
			class="pipe-step"
			class:pipe-gate={step.kind === 'gate'}
			class:pipe-human={step.kind === 'human'}
		>
			<span class="pipe-icon">{step.icon}</span>
			<b>{step.label}</b>
			<small>{@html step.note}</small>
		</div>
	{/each}
</div>

<style>
	.agent-pipeline {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		margin: 1.1rem 0 1.4rem;
		padding: 1rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(194, 65, 12, 0.06));
		border: 1px solid rgba(37, 99, 235, 0.16);
	}
	.pipe-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		min-width: 7rem;
		padding: 0.55rem 0.6rem;
		border-radius: 0.6rem;
		background: rgba(127, 127, 127, 0.06);
		border: 1px solid rgba(127, 127, 127, 0.18);
		font-size: 0.8rem;
	}
	.pipe-step b {
		font-size: 0.82rem;
		margin-top: 0.2rem;
	}
	.pipe-step small {
		opacity: 0.75;
		font-size: 0.68rem;
		margin-top: 0.15rem;
		line-height: 1.25;
	}
	.pipe-icon {
		font-size: 1.3rem;
		line-height: 1;
	}
	.pipe-gate {
		border-color: #c2410c;
		background: rgba(194, 65, 12, 0.08);
	}
	.pipe-human {
		border-color: #16a34a;
		background: rgba(22, 163, 74, 0.1);
	}
	.pipe-arrow {
		font-size: 1.1rem;
		opacity: 0.55;
		padding: 0 0.05rem;
	}
	@media (max-width: 640px) {
		.agent-pipeline {
			flex-direction: column;
			align-items: stretch;
		}
		.pipe-arrow {
			transform: rotate(90deg);
			align-self: center;
		}
	}
</style>

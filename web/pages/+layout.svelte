<script>
	import '@evidence-dev/tailwind/fonts.css';
	import '../app.css';
	import { EvidenceDefaultLayout } from '@evidence-dev/core-components';
	export let data;
</script>

<EvidenceDefaultLayout {data}>
	<slot slot="content" />
</EvidenceDefaultLayout>

<style>
	:global(table.markdown) {
		display: block;
		max-width: 100%;
		overflow-x: auto;
	}
</style>

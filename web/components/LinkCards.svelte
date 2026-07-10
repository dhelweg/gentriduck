<!--
  Grid wrapper for `<LinkCard>` (I3, #220) -- see that component's header comment for why this
  pair exists. Usage:
    <LinkCards>
      <LinkCard href="/methodology" icon="🏙️" title="..." cta="...">...</LinkCard>
      <LinkCard icon="🏛️" title="..." cta="...coming soon">...</LinkCard>
    </LinkCards>
-->
<div class="audience-cards"><slot /></div>

<style>
	.audience-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 1rem;
		margin: 1.1rem 0 1.5rem;
	}
</style>

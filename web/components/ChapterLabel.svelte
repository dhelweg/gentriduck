<!--
  Shared chapter-arc label (I3, #220). Extracted from the `<p class="chapter-label">...</p>` +
  its accompanying `.chapter-label` CSS that I1 (#218) introduced inline on `pages/index.md` only
  (I1's home-page exemplar) and I3 now needs on every other converted page (per the I1 template's
  "explicit chapter framing, not implicit" requirement -- docs/epic-i/storytelling-guide.md §4.1
  and §1's "how the chapters connect"). Evidence auto-imports `.svelte` files under
  `web/components/`, so `<ChapterLabel>...</ChapterLabel>` works with no import.

  Usage: <ChapterLabel>Chapter 3 — The Evidence</ChapterLabel>
-->
<p class="chapter-label"><slot /></p>

<style>
	.chapter-label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 700;
		color: #2563eb;
		opacity: 0.85;
		margin: -0.4rem 0 0.9rem 0;
	}
</style>

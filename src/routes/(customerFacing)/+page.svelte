<script lang="ts">
	import ProductGridSection from '$lib/components/ProductGridSection.svelte';

	let { data } = $props();
</script>

<div class="space-y-12">
	<ProductGridSection title="Most popular" products={data.mostPopularProducts} />
	<ProductGridSection title="Newest" products={data.newestProducts} />
</div>

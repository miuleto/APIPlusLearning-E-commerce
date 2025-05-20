<script lang="ts">
	import type { Product } from "@prisma/client";
    import { Button } from "$lib/components/ui/button"
	import { ArrowRight } from "lucide-svelte";
	import ProductCard from "./ProductCard.svelte";
    
    type ProductGridSectionProps = {
        title: string
        products: Product[]
    }
    let { products, title}: ProductGridSectionProps = $props();
</script>

<div class = "space-y-4">
    <div class = "flex gap-4">
        <h2 class = 'text-3xl font-bold capitalize'>{title}</h2>
        <Button variant = "outline" class = "space-x-2" href = 'products'>
            <span>View All</span>
            <ArrowRight class = "size-4"/>
        </Button>
    </div>

    <div class = "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        {#each products as product}
             <ProductCard {...product } />
        {/each}
    </div>
</div>


<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
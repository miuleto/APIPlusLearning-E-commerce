<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { formatCurrency, formatNumber } from '$lib/utils.js';
	import { XCircle, CheckCircle, MoreVertical } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

<div class="flex items-center justify-between gap-4">
	<PageHeader>Products</PageHeader>
	<Button href="/admin/products/new">Add product</Button>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Available for purchase</span>
			</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head>Order</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.products as product}
			<Table.Row>
				<Table.Cell>
					{#if product.isAvailableForPurchase}
						<span class="sr-only">Available</span>
						<CheckCircle />
					{:else}
						<span class="sr-only">Unavailable</span>
						<XCircle />
					{/if}
				</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
				<Table.Cell>{formatNumber(product._count.Order)}</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
              <MoreVertical/>
              <span class = 'sr-only'> Action </span>
            </DropdownMenu.Trigger>
						<DropdownMenu.Content>
								<DropdownMenu.Item href='/admin/products/{product.id}/download' download> Download</DropdownMenu.Item>
                <DropdownMenu.Item href='/admin/products/{product.id}/edit'>Edit</DropdownMenu.Item>
                <!--toggle active status-->
                <form action= "?/toggleAvailability" method="POST" use:enhance>
                  <Button type = "submit" class = 'w-full'>
                    {#if product.isAvailableForPurchase}
                      Deactivate
                      {:else}
                      Activate
                    {/if}
                  </Button>
                  <input type="hidden" name='id' value={product.id}>
                  <input type="checkbox" name='isAvailableForPurchase' class="hidden" checked = {!product.isAvailableForPurchase}>
                  <!--delete-->
                  </form>
                  <form action=""></form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

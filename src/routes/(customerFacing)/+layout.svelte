<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	// import * as Card from "$lib/components/ui/card"
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	// type DashboardCardProps = {
	// 	title: string;
	// 	subtitle: string;
	// 	body: string;
	// };
	let { children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<Nav>
	{@render navLink({ href: '/', text: 'home' })}
	{@render navLink({ href: '/products', text: 'products' })}
	{@render navLink({ href: '/orders', text: 'orders' })}
</Nav>

<div class="container my-6">
	{@render children()}
</div>
<!-- 
{#snippet dashboardCard({ title, body, subtitle }: DashboardCardProps)}
	<Card.Root>
	  <Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{subtitle}</Card.Description>
	  </Card.Header>
	  <Card.Content>
		<p>{body}</p>
	  </Card.Content>
	</Card.Root>
{/snippet} -->

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		{href}
		class={cn(
			'p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
			pathname === href && 'bg-background text-foreground'
		)}>{text}</a
	>
{/snippet}

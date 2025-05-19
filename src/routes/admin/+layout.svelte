<script lang="ts">
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import { cn } from '$lib/utils';

    let pathname = $derived(page.url.pathname)
    let {children} = $props()
</script>

<Nav>
	{@render navLink({ href: '/admin', text: 'dashboard' })}
    {@render navLink({ href: '/admin/products', text: 'products' })}
    {@render navLink({ href: '/admin/users', text: 'customers' })}
    {@render navLink({ href: '/admin/orders', text: 'sales' })}

    <!--log out to added-->
</Nav>
<div class="container my-6">
    {@render children()}
</div>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		{href}
		class={cn(
			'p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground'
            , pathname === href && 'bg-background text-foreground'
		)}>{text}</a
	>
{/snippet}



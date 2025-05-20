<script lang="ts">
	import { formatCurrency } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement, Address, LinkAuthenticationElement } from 'svelte-stripe';
	import { PUBLIC_SERVER_URL, PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';

	let stripe: any = $state();
	let elements: any = $state(undefined);
	let isLoading = $state(false);
	let errorMessage: string | undefined = $state(undefined);
	let email: string | null = $state(null);
	let { data } = $props();
	let productId = $derived(data.product.id);

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLIC_KEY);
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (stripe === null || elements === undefined || isLoading || !email) return;
		isLoading = true;
		const orderExists = (
			await fetch('/api/order/exist', {
				method: 'POST',
				body: JSON.stringify({ email, productId }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		if (await orderExists) {
			errorMessage = 'You have already purchased this product.';
			isLoading = false;
			return;
		}

		if (stripe) {
			stripe
				.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${PUBLIC_SERVER_URL}/stripe/purchase-status`
					}
				})
				.then(({ error }) => {
					if (error) {
						if (error.type === 'card_error' || error.type === 'validation_error') {
							errorMessage = error.message;
						} else {
							errorMessage = 'An unknown error had occured.';
						}
					}
				}).finally(()=> {
            isLoading = false
        })
		}
	}
</script>

<div class="mx-auto w-full max-w-5xl space-y-8">
	<div class="flex items-center gap-4">
		<img class="max-w-[40%] object-cover" src={data.product.imagePath} alt="" />
		<div>
			<div class="text-lg">
				{formatCurrency(data.product.priceInCents / 100)}
			</div>
			<h1 class="text-2xl font-bold capitalize">
				{data.product.name}
			</h1>
			<p class="line-clamp-3 text-muted-foreground">
				{data.product.description}
			</p>
		</div>
	</div>

	<!--stripe payment-->
	<Elements clientSecret={data.clientSecret} {stripe} bind:elements>
		<form onsubmit={handleSubmit}>
			<Card.Root>
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					{#if errorMessage}
						<Card.Description class="text-destructive">{errorMessage}</Card.Description>
					{/if}
				</Card.Header>
				<Card.Content>
					<LinkAuthenticationElement on:change={(e) => (email = e.detail.value.email)} />
					<PaymentElement />
					<Address mode="billing" />
				</Card.Content>
				<Card.Footer>
					<Button
						type="submit"
						class="w-full"
						size="lg"
						disabled={stripe === null || elements === undefined}
					>
						{#if isLoading}
							<Loader class="size-4 animate-spin" />
						{:else}
							Purchase - {formatCurrency(data.product.priceInCents / 100)}
						{/if}
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	</Elements>
</div>

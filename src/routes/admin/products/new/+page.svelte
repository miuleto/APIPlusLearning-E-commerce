<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { addFormSchema } from '$lib/formSchema.js';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { formatCurrency } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';

	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});

	const { form: formData, enhance, delayed } = form;
	const image = fileProxy(formData, 'image');
	const file = fileProxy(formData, 'file');
</script>

<PageHeader>Add Product</PageHeader>
<form
	method="POST"
	class="space-y-8"
	action="/admin/products/new"
	enctype="multipart/form-data"
	use:enhance
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="priceInCents">
		<Form.Control let:attrs>
			<Form.Label>Price in cents</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.priceInCents} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="text-muted-foreground">
		{formatCurrency($formData.priceInCents / 100)}
	</div>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>{$formData.description.length}/500</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="file">
		<Form.Control let:attrs>
			<Form.Label>File</Form.Label>
			<input {...attrs} type="file" bind:files={$file} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label>Image</Form.Label>
			<input {...attrs} accept="image/*" type="file" bind:files={$image} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit" onclick={() => console.log($formData)}>
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			Save
		{/if}
	</Button>
</form>

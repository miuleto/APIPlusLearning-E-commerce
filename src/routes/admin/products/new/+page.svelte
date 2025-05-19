<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Form from '$lib/components/ui/form';
	import { addFormSchema } from '$lib/formSchema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
    import { Input } from "$lib/components/ui/input"

	let { data } = $props();
	let form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});

	let { form: formData, enhance, delayed } = form;
</script>

<PageHeader>Add Product</PageHeader>
<form method="POST" class="space-y-8" action="/admin/product/new" enctype="multipart/form-data" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>Description</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addFormSchema } from '$lib/formSchema';

export const load = (async () => {
	return { form: await superValidate(zod(addFormSchema)) };
}) satisfies PageServerLoad;

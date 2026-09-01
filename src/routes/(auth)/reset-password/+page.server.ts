import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.safeGetSession();

  if (!session) {
    throw redirect(303, '/login');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const password = formData.get('password') as string;

    if (!password) {
      return { error: 'Password is required' };
    }

    if (password.length < 8) {
      return { error: 'Password must be at least 8 characters' };
    }

    const { error } = await locals.supabase.auth.updateUser({
      password
    });

    if (error) {
      return { error: error.message };
    }

    throw redirect(303, '/login?reset=success');
  }
};

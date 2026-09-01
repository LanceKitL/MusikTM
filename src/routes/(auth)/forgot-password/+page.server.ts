import { redirect } from '@sveltejs/kit';
import { PUBLIC_APP_URL } from '$env/static/public';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { session } = await locals.safeGetSession();
  if (session) {
    throw redirect(303, '/dashboard');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email) {
      return { error: 'Email is required' };
    }

    const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${PUBLIC_APP_URL}/auth/callback?type=recovery`
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  }
};

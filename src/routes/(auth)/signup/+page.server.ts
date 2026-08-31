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
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!fullName || !email || !password) {
      return { error: 'All fields are required' };
    }

    const { data, error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${PUBLIC_APP_URL}/auth/callback`,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      return { error: error.message };
    }

    return { success: 'Check your email for a confirmation link.' };
  }
};

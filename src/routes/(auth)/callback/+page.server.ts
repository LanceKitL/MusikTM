import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const token_hash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/dashboard';

  // Email confirmation flow
  if (token_hash && type) {
    const { error } = await locals.supabase.auth.verifyOtp({
      token_hash,
      type: type as 'signup' | 'magiclink' | 'recovery' | 'email_change'
    });
    if (!error) {
      throw redirect(303, next);
    }
  }

  // OAuth flow
  if (code) {
    const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      throw redirect(303, next);
    }
  }

  throw redirect(303, '/login?error=auth_failed');
};

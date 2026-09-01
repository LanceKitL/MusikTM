import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const { session, user } = await locals.safeGetSession();

  if (!session) {
    const redirectTo = encodeURIComponent(url.pathname);
    throw redirect(303, `/login?redirectTo=${redirectTo}`);
  }

  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  let team = null;

  const { data: membership } = await locals.supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .single();

  if (membership) {
    const { data: teamData } = await locals.supabase
      .from('teams')
      .select('*')
      .eq('id', membership.team_id)
      .single();

    team = teamData;
  }

  return { session, user, profile, team };
};

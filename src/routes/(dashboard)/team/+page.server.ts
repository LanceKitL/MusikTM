import { fail } from '@sveltejs/kit';
import { generateTeamCode } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.safeGetSession();

  const { data: membership } = await locals.supabase
    .from('team_members')
    .select('team_id, instrument_role')
    .eq('user_id', user.id)
    .single();

  let team = null;
  let members: Array<{ user_id: string; instrument_role: string; full_name: string }> = [];

  if (membership) {
    const { data: teamData } = await locals.supabase
      .from('teams')
      .select('*')
      .eq('id', membership.team_id)
      .single();

    team = teamData;

    if (team) {
      const { data: memberRows } = await locals.supabase
        .from('team_members')
        .select('user_id, instrument_role')
        .eq('team_id', team.id);

      if (memberRows && memberRows.length > 0) {
        const userIds = memberRows.map((m) => m.user_id);

        const { data: profiles } = await locals.supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name]) ?? []);

        members = memberRows.map((m) => ({
          user_id: m.user_id,
          instrument_role: m.instrument_role,
          full_name: profileMap.get(m.user_id) ?? 'Unknown'
        }));
      }
    }
  }

  return {
    team,
    membership,
    members
  };
};

export const actions: Actions = {
  create: async ({ locals }) => {
    const { user } = await locals.safeGetSession();

    const formData = await locals.request.formData();
    const teamName = formData.get('teamName') as string;

    if (!teamName || teamName.trim().length < 2) {
      return fail(400, { error: 'Team name must be at least 2 characters' });
    }

    const code = generateTeamCode();

    const { data: team, error: teamError } = await locals.supabase
      .from('teams')
      .insert({
        name: teamName.trim(),
        code,
        director_id: user.id
      })
      .select()
      .single();

    if (teamError) {
      return fail(500, { error: 'Failed to create team' });
    }

    const { error: memberError } = await locals.supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: user.id,
        instrument_role: 'song_lead'
      });

    if (memberError) {
      return fail(500, { error: 'Failed to add you as team member' });
    }

    await locals.supabase
      .from('profiles')
      .update({ role: 'director' })
      .eq('id', user.id);

    return { success: true, team };
  }
};

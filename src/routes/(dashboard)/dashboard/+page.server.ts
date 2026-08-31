import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.safeGetSession();

  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  let team = null;
  let memberCount = 0;
  let nextSchedule = null;
  let songCount = 0;

  const { data: membership } = await locals.supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .single();

  if (membership) {
    const { data: teamData } = await locals.supabase
      .from('teams')
      .select('id, name')
      .eq('id', membership.team_id)
      .single();

    team = teamData;

    if (team) {
      const { count } = await locals.supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', team.id);

      memberCount = count ?? 0;

      const { data: schedules } = await locals.supabase
        .from('schedules')
        .select('id, title, date')
        .eq('team_id', team.id)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(1);

      nextSchedule = schedules?.[0] ?? null;

      const { count: songs } = await locals.supabase
        .from('songs')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', team.id);

      songCount = songs ?? 0;
    }
  }

  return {
    profile,
    team,
    memberCount,
    nextSchedule,
    songCount
  };
};

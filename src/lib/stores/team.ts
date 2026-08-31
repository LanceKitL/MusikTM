import { writable, derived } from 'svelte/store';
import type { Team, TeamMember } from '$lib/types';

interface TeamState {
  currentTeam: Team | null;
  members: TeamMember[];
  loading: boolean;
}

function createTeamStore() {
  const { subscribe, set, update } = writable<TeamState>({
    currentTeam: null,
    members: [],
    loading: false
  });

  return {
    subscribe,
    setTeam: (team: Team | null) =>
      update((state) => ({ ...state, currentTeam: team })),
    setMembers: (members: TeamMember[]) =>
      update((state) => ({ ...state, members })),
    addMember: (member: TeamMember) =>
      update((state) => ({ ...state, members: [...state.members, member] })),
    removeMember: (userId: string) =>
      update((state) => ({
        ...state,
        members: state.members.filter((m) => m.user_id !== userId)
      })),
    setLoading: (loading: boolean) =>
      update((state) => ({ ...state, loading })),
    clear: () => set({ currentTeam: null, members: [], loading: false })
  };
}

export const teamStore = createTeamStore();

export const teamMemberCount = derived(teamStore, ($team) => $team.members.length);

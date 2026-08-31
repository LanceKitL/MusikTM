import { writable } from 'svelte/store';
import type { Schedule, ScheduleAssignment } from '$lib/types';

interface ScheduleState {
  currentSchedule: Schedule | null;
  assignments: ScheduleAssignment[];
  loading: boolean;
}

function createScheduleStore() {
  const { subscribe, set, update } = writable<ScheduleState>({
    currentSchedule: null,
    assignments: [],
    loading: false
  });

  return {
    subscribe,
    setSchedule: (schedule: Schedule | null) =>
      update((state) => ({ ...state, currentSchedule: schedule })),
    setAssignments: (assignments: ScheduleAssignment[]) =>
      update((state) => ({ ...state, assignments })),
    updateAssignment: (userId: string, status: ScheduleAssignment['status']) =>
      update((state) => ({
        ...state,
        assignments: state.assignments.map((a) =>
          a.user_id === userId ? { ...a, status } : a
        )
      })),
    setLoading: (loading: boolean) =>
      update((state) => ({ ...state, loading })),
    clear: () => set({ currentSchedule: null, assignments: [], loading: false })
  };
}

export const scheduleStore = createScheduleStore();

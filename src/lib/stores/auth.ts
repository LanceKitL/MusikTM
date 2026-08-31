import { writable } from 'svelte/store';
import type { Profile } from '$lib/types';

function createAuthStore() {
  const { subscribe, set, update } = writable<Profile | null>(null);

  return {
    subscribe,
    setUser: (profile: Profile | null) => set(profile),
    updateProfile: (updates: Partial<Profile>) =>
      update((current) => (current ? { ...current, ...updates } : null)),
    clear: () => set(null)
  };
}

export const authStore = createAuthStore();

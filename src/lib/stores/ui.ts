import { writable } from 'svelte/store';

interface UIState {
  sidebarOpen: boolean;
  modalOpen: string | null;
}

function createUIStore() {
  const { subscribe, set, update } = writable<UIState>({
    sidebarOpen: false,
    modalOpen: null
  });

  return {
    subscribe,
    toggleSidebar: () =>
      update((state) => ({ ...state, sidebarOpen: !state.sidebarOpen })),
    openSidebar: () =>
      update((state) => ({ ...state, sidebarOpen: true })),
    closeSidebar: () =>
      update((state) => ({ ...state, sidebarOpen: false })),
    openModal: (id: string) =>
      update((state) => ({ ...state, modalOpen: id })),
    closeModal: () =>
      update((state) => ({ ...state, modalOpen: null }))
  };
}

export const uiStore = createUIStore();

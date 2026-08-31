import { writable, derived } from 'svelte/store';
import type { Song, ChordData } from '$lib/types';

interface CifraState {
  currentSong: Song | null;
  hiddenInstruments: string[];
  transposeSteps: number;
}

function createCifraStore() {
  const { subscribe, set, update } = writable<CifraState>({
    currentSong: null,
    hiddenInstruments: [],
    transposeSteps: 0
  });

  return {
    subscribe,
    setSong: (song: Song | null) => set((state) => ({ ...state, currentSong: song })),
    toggleInstrument: (instrument: string) =>
      update((state) => {
        const hidden = state.hiddenInstruments.includes(instrument)
          ? state.hiddenInstruments.filter((i) => i !== instrument)
          : [...state.hiddenInstruments, instrument];
        return { ...state, hiddenInstruments: hidden };
      }),
    transpose: (steps: number) =>
      update((state) => ({ ...state, transposeSteps: state.transposeSteps + steps })),
    resetTranspose: () =>
      update((state) => ({ ...state, transposeSteps: 0 })),
    clear: () => set({ currentSong: null, hiddenInstruments: [], transposeSteps: 0 })
  };
}

export const cifraStore = createCifraStore();

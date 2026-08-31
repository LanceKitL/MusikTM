import type { InstrumentRole } from '$lib/types';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function transposeChord(chord: string, steps: number): string {
  if (!chord || steps === 0) return chord;

  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return chord;

  let noteIndex = NOTES.indexOf(match[1].replace('b', '#'));
  if (noteIndex === -1) return chord;

  noteIndex = (noteIndex + steps + 12) % 12;
  return NOTES[noteIndex] + match[2];
}

export function getInstrumentLabel(role: InstrumentRole): string {
  const labels: Record<InstrumentRole, string> = {
    song_lead: 'Song Lead',
    backup_vocals: 'Backup Vocals',
    guitarist: 'Guitar',
    bassist: 'Bass',
    drummer: 'Drums',
    keyboardist: 'Keyboard',
    percussionist: 'Percussion',
    sound_operator: 'Sound',
    other: 'Other'
  };
  return labels[role];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function generateTeamCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

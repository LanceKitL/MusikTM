export type UserRole = 'director' | 'member';

export type InstrumentRole =
  | 'song_lead'
  | 'backup_vocals'
  | 'guitarist'
  | 'bassist'
  | 'drummer'
  | 'keyboardist'
  | 'percussionist'
  | 'sound_operator'
  | 'other';

export type AvailabilityStatus = 'available' | 'unavailable' | 'pending';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  director_id: string;
  created_at: string;
}

export interface TeamMember {
  team_id: string;
  user_id: string;
  instrument_role: InstrumentRole;
  joined_at: string;
  profile?: Profile;
}

export interface Schedule {
  id: string;
  team_id: string;
  title: string;
  date: string;
  created_by: string;
  created_at: string;
  assignments?: ScheduleAssignment[];
}

export interface ScheduleAssignment {
  schedule_id: string;
  user_id: string;
  status: AvailabilityStatus;
  updated_at: string;
  profile?: Profile;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  lyrics: string;
  chords: ChordData;
}

export interface ChordData {
  sections: ChordSection[];
}

export interface ChordSection {
  name: string;
  lines: ChordLine[];
}

export interface ChordLine {
  chords: (string | null)[];
  lyrics: string;
}

export interface Lineup {
  id: string;
  schedule_id: string;
  song_id: string;
  order_index: number;
  arrangement_notes: string | null;
  song?: Song;
}

export interface Announcement {
  id: string;
  team_id: string;
  content: string;
  created_by: string;
  created_at: string;
  profile?: Profile;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  user: AuthUser | null;
  profile: Profile | null;
}

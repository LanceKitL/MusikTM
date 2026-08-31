# MusikkTM Architecture

## Overview

MusikkTM is a mobile-first Progressive Web App (PWA) built for worship team management. It provides schedule management, real-time chord/lyrics display (Cifra), and a lyrics presenter (Praisent). The application targets Music Directors and Team Members, enabling assignment tracking, availability tagging, and seamless communication.

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | SvelteKit 2 | File-based routing, SSR, PWA support, TypeScript-first |
| UI | daisyUI + Tailwind CSS | Svelte-compatible, utility-first, pre-built component classes |
| Icons | FontAwesome 6 | Consistent icon set across the application |
| Backend | Supabase | PostgreSQL database, auth, realtime subscriptions, storage |
| Auth | Supabase Auth | Email/password, magic links, OAuth providers |
| PWA | vite-plugin-pwa | Service worker, web manifest, offline capability |
| Testing | Vitest + Playwright | Unit tests and end-to-end browser testing |
| Language | TypeScript | Type safety, better DX, fewer runtime errors |
| Build | Vite | Fast dev server, optimized production builds |

## Folder Structure

```
MusikkTM/
├── src/
│   ├── lib/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── ui/               # Base primitives (Button, Card, Input, Modal)
│   │   │   ├── layout/           # Structural components (Navbar, Sidebar, Footer)
│   │   │   └── shared/           # Domain-specific shared components
│   │   ├── features/             # Feature-based modules
│   │   │   ├── auth/             # Authentication (login, signup, callback)
│   │   │   ├── schedule/         # Schedule CRUD, assignments, availability
│   │   │   ├── cifra/            # Chord and lyrics display, instrument toggle
│   │   │   ├── praisent/         # Full-screen lyrics presenter
│   │   │   └── team/             # Team creation, joining, member management
│   │   ├── stores/               # Svelte writable/readable stores
│   │   ├── services/             # Supabase client, API abstractions
│   │   ├── utils/                # Pure helper functions
│   │   └── types/                # TypeScript interfaces and enums
│   ├── routes/                   # SvelteKit file-based routing
│   │   ├── (auth)/               # Auth route group (login, signup, callback)
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── callback/
│   │   ├── (dashboard)/          # Protected dashboard route group
│   │   │   ├── dashboard/
│   │   │   ├── schedule/
│   │   │   ├── team/
│   │   │   ├── cifra/
│   │   │   └── praisent/
│   │   ├── +layout.svelte        # Root layout (navbar, auth provider)
│   │   ├── +layout.server.ts     # Server-side session loading
│   │   ├── +page.svelte          # Landing page
│   │   └── +error.svelte         # Global error boundary
│   ├── hooks.server.ts           # Supabase SSR client, auth guard
│   ├── app.html                  # HTML template
│   └── app.css                   # Tailwind directives, daisyUI theme, global styles
├── static/                       # Static assets served at root
│   ├── icons/                    # PWA icons (192x192, 512x512)
│   ├── favicon.ico
│   └── robots.txt
├── history/                      # Approved plan files
│   └── plan1.md                  # Initial project setup
├── tests/                        # Playwright E2E tests
├── src/                          # Vitest unit tests colocated with source
├── architecture.md               # This document
├── progress.md                   # Session tracking
├── AGENTS.md                     # Agent workflow rules
├── project.md                    # Product requirements
├── package.json
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── .env.example
```

## Component Architecture

### Component Layers

**Base Components** (`src/lib/components/ui/`):
Primitive building blocks with no business logic. These wrap daisyUI classes and accept standard props (size, variant, disabled, etc.). Examples: Button, Card, Input, Select, Modal, Badge, Alert.

**Layout Components** (`src/lib/components/layout/`):
Structural components that define page shape. Handle navigation, responsive sidebar collapse, and footer placement. Examples: Navbar, Sidebar, MobileNav, Footer.

**Shared Components** (`src/lib/components/shared/`):
Components reused across features but contain domain logic. Examples: UserAvatar, TeamCodeDisplay, SongCard, ScheduleTimeline.

**Feature Components** (`src/lib/features/*/`):
Components specific to a single feature. Co-located with their logic, types, and tests. Not imported outside their feature folder.

### Component Rules

1. One component per file. Filename matches the exported component name.
2. Props defined via TypeScript interfaces at the top of the script block.
3. Events dispatched via callback props, not CustomEvent.
4. Styles scoped via Svelte's default behavior. Tailwind classes for utility styling.
5. No business logic in components. Delegate to stores or service functions.

## State Management

### Store Pattern

All global state lives in `src/lib/stores/`. Each store file exports a writable or readable store and functions to mutate it.

```typescript
// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

function createAuthStore() {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    setUser: (user: User | null) => set(user),
    clear: () => set(null)
  };
}

export const authStore = createAuthStore();
```

### Store Files

| File | Purpose |
|------|---------|
| `auth.ts` | Current user session, login/logout state |
| `team.ts` | Active team, members, team code |
| `schedule.ts` | Current schedule, assignments, availability |
| `cifra.ts` | Active song, chords, arrangement settings |
| `ui.ts` | Sidebar open state, modal triggers, theme |

### Rules

1. Stores are for shared state only. Local component state stays in the component.
2. No store-to-store dependencies. Use derived stores for composed state.
3. Async operations (API calls) happen in service functions, not stores.
4. Stores reset on logout via `authStore.clear()`.

## Authentication Flow

### Supabase SSR Integration

```
Request
  ↓
hooks.server.ts
  ├── Create Supabase client (per-request, cookie-based)
  ├── Extract session from cookies
  ├── Validate session via getUser()
  ├── Attach user to event.locals
  └── Check protected routes
        ├── No session → Redirect to /login
        └── Has session → Continue
  ↓
+layout.server.ts
  └── Pass session/user to all pages via load function
  ↓
Component
  └── Access user from page data
```

### Auth Flows

**Email/Password Signup:**
1. User submits email + password to `/signup`
2. Server calls `supabase.auth.signUp()`
3. Confirmation email sent (Supabase managed)
4. User clicks link, redirected to `/callback`
5. Callback exchanges token for session
6. Profile row created in `profiles` table
7. Redirect to `/dashboard`

**Magic Link Login:**
1. User submits email to `/login`
2. Server calls `supabase.auth.signInWithOtp()`
3. Magic link email sent
4. User clicks link, redirected to `/callback`
5. Session established, redirect to `/dashboard`

**OAuth (Google/GitHub):**
1. User clicks OAuth button
2. Redirect to provider consent screen
3. Provider redirects back to `/callback` with code
4. Code exchanged for session
5. Profile created or updated
6. Redirect to `/dashboard`

### Route Protection

Protected routes defined in `hooks.server.ts`:

```
/(dashboard)/**  → Requires authenticated session
/(auth)/**       → Redirects to /dashboard if already logged in
/                → Public landing page
```

## Database Schema

### Tables

**profiles**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, references auth.users |
| full_name | text | Display name |
| role | enum | 'director' or 'member' |
| avatar_url | text | Nullable |
| created_at | timestamptz | Default now() |

**teams**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | Team name |
| code | text | Unique 6-character join code |
| director_id | uuid | FK to profiles |
| created_at | timestamptz | Default now() |

**team_members**
| Column | Type | Notes |
|--------|------|-------|
| team_id | uuid | FK to teams |
| user_id | uuid | FK to profiles |
| instrument_role | text | e.g., 'drummer', 'guitarist', 'song_lead' |
| joined_at | timestamptz | Default now() |

**schedules**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| team_id | uuid | FK to teams |
| title | text | Schedule title |
| date | date | Event date |
| created_by | uuid | FK to profiles |
| created_at | timestamptz | Default now() |

**schedule_assignments**
| Column | Type | Notes |
|--------|------|-------|
| schedule_id | uuid | FK to schedules |
| user_id | uuid | FK to profiles |
| status | enum | 'available', 'unavailable', 'pending' |
| updated_at | timestamptz | Default now() |

**songs**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| title | text | Song title |
| artist | text | Original artist |
| key | text | Musical key |
| tempo | integer | BPM |
| lyrics | text | Full lyrics |
| chords | jsonb | Chord progression data |

**lineups**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| schedule_id | uuid | FK to schedules |
| song_id | uuid | FK to songs |
| order_index | integer | Sort order in lineup |
| arrangement_notes | text | Key changes, custom arrangements |

**announcements**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| team_id | uuid | FK to teams |
| content | text | Announcement text |
| created_by | uuid | FK to profiles |
| created_at | timestamptz | Default now() |

### Row Level Security

- Users can only read/update their own profile
- Team members can only read data for teams they belong to
- Directors can manage schedules and lineups for their teams
- Songs are readable by all team members, writable by directors only

## Realtime

Supabase Realtime enables live updates without polling.

### Subscriptions

| Channel | Table | Event | Purpose |
|---------|-------|-------|---------|
| `schedule:{id}` | schedule_assignments | UPDATE | Live availability status |
| `team:{id}` | team_members | INSERT, DELETE | Member join/leave |
| `announcements:{id}` | announcements | INSERT | New announcements |

### Client Setup

```typescript
// In Svelte component onMount
const channel = supabase
  .channel(`schedule:${scheduleId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'schedule_assignments',
    filter: `schedule_id=eq.${scheduleId}`
  }, (payload) => {
    // Update local state
  })
  .subscribe();

// Cleanup on destroy
onDestroy(() => {
  supabase.removeChannel(channel);
});
```

## Cifra (Chord Display)

### Data Flow

1. Director adds songs to lineup with arrangement notes
2. Team members view lineup in real-time
3. Song displays lyrics with inline chord symbols
4. Members can toggle instrument tracks on/off
5. Key changes sync to all viewers instantly

### Chord Format

Chords stored as JSONB with structure:

```json
{
  "sections": [
    {
      "name": "Verse 1",
      "lines": [
        { "chords": ["G", null, "D", "Em"], "lyrics": "Amazing grace how" },
        { "chords": ["C", null, "G", null], "lyrics": "sweet the sound" }
      ]
    }
  ]
}
```

### Instrument Toggle

Each member can hide chord lines for instruments they do not play. Toggle state stored locally (localStorage), not synced.

## Praisent (Lyrics Presenter)

### Display Mode

Full-screen presentation view for projected lyrics. Features:
- Large, readable text with high contrast
- Auto-advance or manual advance via tap/arrow keys
- Background customization (solid color, image)
- Current/next song preview
- Responsive to projector aspect ratios

### Access Control

Only directors or designated presenters can control the presentation. Team members view in read-only mode.

## PWA Configuration

### vite-plugin-pwa Setup

- **Strategy**: `generateSW` for automatic service worker generation
- **Caching**: Cache-first for static assets, network-first for API calls
- **Offline**: Basic offline page with cached assets
- **Install**: Prompts on mobile after second visit

### Manifest

```json
{
  "name": "MusikkTM - Worship Team Sync",
  "short_name": "MusikkTM",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

## Deployment

### Adapter

Use `@sveltejs/adapter-auto` for Vercel/Netlify, or `@sveltejs/adapter-static` for full static deployment with Supabase handling all dynamic content.

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key (never exposed to client) |

### Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run test     # Run unit tests (Vitest)
npm run test:e2e # Run E2E tests (Playwright)
npm run lint     # ESLint + Prettier check
npm run format   # Auto-format code
```

## Accessibility

- All images require alt text
- Semantic HTML elements (nav, main, section, article)
- ARIA labels on interactive elements
- Keyboard navigation for all menus and modals
- Color contrast ratio minimum 4.5:1 (WCAG AA)
- Focus indicators visible on all interactive elements
- Screen reader announcements for dynamic content updates

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

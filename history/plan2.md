# Plan 2: Team Creation Feature (Director)

**Goal:** Allow directors to create a team with a unique 6-character join code.

**Scope:**
- Fetch user's team (if any) in dashboard layout
- Create form action to insert team + update profile role
- Build team creation form UI
- Show team code after creation

**Approved:** 2026-09-01

**Approach:**

### Sub-step 2a-1: Fetch User's Team
- Edit `(dashboard)/+layout.server.ts`
- Query `team_members` for user's team
- If found, fetch `teams` row
- Pass `team` data to all dashboard pages

### Sub-step 2a-2: Create Team Form Action
- Create `(dashboard)/team/+page.server.ts`
- Form action: insert team, add director as member, update profile role
- Generate 6-char code using existing `generateTeamCode()` utility

### Sub-step 2a-3 + 2a-4: Build UI + Show Code
- Update `(dashboard)/team/+page.svelte`
- Show create/join buttons if no team
- Show team info (name, code, members) if team exists
- Form for team creation with name input

**Files Modified:**
- `src/routes/(dashboard)/+layout.server.ts`
- `src/routes/(dashboard)/team/+page.server.ts` (new)
- `src/routes/(dashboard)/team/+page.svelte`

**Dependencies:**
- profiles, teams, team_members tables exist
- Database trigger creates profile on signup (plan1)

**Risk:** Low. Isolated feature, no breaking changes.

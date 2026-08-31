# AGENTS.md

## Project Type
Mobile-first PWA. Svelte. Clean architecture. Scalable structure.

## Core Principles
- Mobile-first always. Design smallest screen first.
- Clean code patterns. Separate concerns. Small components.
- Scalable folder structure. Feature-based organization.
- No emojis. No em dashes. No gradient backgrounds.

## Workflow
1. Read progress.md first. Get latest state.
2. Read latest history/planN.md. Get approved plan.
3. Write code. Follow patterns below.
4. Test locally before any PR.
5. Update progress.md after work.
6. Push to GitHub. Open PR only after tests pass.

## GitHub Rules
- Branch per feature. Never push to main directly.
- Test suite must pass before PR creation.
- PR description references plan file used.
- Commit messages: short, imperative, no filler.

## progress.md
- Lives at project root.
- Update every session end.
- Format: Date, What changed, What's next, Blockers.
- New sessions read this first. No re-explaining needed.

## history/ folder
- Store approved plans only: plan1.md, plan2.md, etc.
- Never edit past plan files. Create new numbered file for changes.
- Each plan file: Goal, Scope, Approved date, Approach.

## Security
- Auth0 for all authentication.
- No custom auth logic. No storing tokens insecurely.
- Session handling via Auth0 SDK only.

## UI System
- BKLIT UI for all data display components.
- Tables, lists, cards: use BKLIT UI components first.
- Custom components only when BKLIT UI lacks coverage.

## Typography and Icons
- Professional fonts only.
- Never use Inter. Never use cursive fonts.
- FontAwesome for all icons. No mixed icon sets.

## Visual Hierarchy
- Clear heading scale. Consistent spacing system.
- Primary actions visually dominant. Secondary actions subdued.
- Consistent color tokens across components.

## Accessibility and Performance
- Every image needs alt text. No exceptions.
- Target Lighthouse pass on all four categories.
- Test Lighthouse before PR, not after.

## Agent Behavior
- Ask questions when requirements unclear.
- Never assume scope. Confirm before large changes.
- No narration during execution. Run tools, show result, stop.
import { test, expect } from '@playwright/test';
import { TeamPage } from '../../pages/team.page';

test.describe('Team page - UX audit', () => {
  test.beforeEach(async ({ page }) => {
    const team = new TeamPage(page);
    await team.goto();
    await page.waitForLoadState('networkidle');
  });

  test('team page layout', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/09-team.png', fullPage: true });

    const url = page.url();
    if (url.includes('/login')) {
      console.log('NOTE: Team page requires auth');
      return;
    }

    // Check page has meaningful content
    const content = await page.textContent('body');
    const hasTeamContent = content?.includes('team') || content?.includes('Team');
    if (!hasTeamContent) {
      console.log('UX ISSUE: Team page missing team-related content');
    }
  });

  test('team page - create team flow', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/10-team-create.png', fullPage: true });

    const url = page.url();
    if (url.includes('/login')) return;

    // Look for create team button or form
    const createBtn = page.getByRole('button', { name: /create/i });
    const createVisible = await createBtn.isVisible().catch(() => false);

    if (!createVisible) {
      console.log('UX ISSUE: No "Create team" button visible');
    }
  });

  test('team page - join team flow', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/11-team-join.png', fullPage: true });

    const url = page.url();
    if (url.includes('/login')) return;

    // Look for join team button or form
    const joinBtn = page.getByRole('button', { name: /join/i });
    const joinVisible = await joinBtn.isVisible().catch(() => false);

    if (!joinVisible) {
      console.log('UX ISSUE: No "Join team" button visible');
    }
  });
});

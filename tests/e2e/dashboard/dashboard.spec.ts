import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Dashboard - UX audit', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (may redirect to login)
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await page.waitForLoadState('networkidle');
  });

  test('dashboard layout and content', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/06-dashboard.png', fullPage: true });

    // Check if we're on login page (not authenticated)
    const url = page.url();
    if (url.includes('/login')) {
      console.log('NOTE: Dashboard requires auth - redirected to login');
      return;
    }

    // Check for key UI elements
    const navbar = page.getByRole('banner');
    await expect(navbar).toBeVisible();

    // Check sidebar or bottom nav exists
    const sidebar = page.locator('aside, [role="navigation"]').first();
    const sidebarVisible = await sidebar.isVisible().catch(() => false);

    if (!sidebarVisible) {
      console.log('UX ISSUE: No sidebar or navigation visible on dashboard');
    }
  });

  test('dashboard - check heading hierarchy', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/07-dashboard-heading.png', fullPage: true });

    const url = page.url();
    if (url.includes('/login')) return;

    // Check that headings follow proper hierarchy (h1 -> h2 -> h3)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('Heading hierarchy:', headings);

    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    const h1Count = await h1.count();
    if (h1Count === 0) {
      console.log('UX ISSUE: No H1 heading found on dashboard');
    } else if (h1Count > 1) {
      console.log('UX ISSUE: Multiple H1 headings found on dashboard');
    }
  });

  test('dashboard - quick actions are discoverable', async ({ page }) => {
    await page.screenshot({ path: 'screenshots/08-dashboard-actions.png', fullPage: true });

    const url = page.url();
    if (url.includes('/login')) return;

    // Check for buttons/links that represent actions
    const buttons = await page.getByRole('button').all();
    const links = await page.getByRole('link').all();

    console.log(`Found ${buttons.length} buttons, ${links.length} links on dashboard`);

    // Check if action buttons have clear labels
    for (const btn of buttons.slice(0, 5)) {
      const text = await btn.textContent();
      console.log(`Button: "${text?.trim()}"`);
    }
  });
});

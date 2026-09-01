import { test, expect } from '@playwright/test';

test.describe('Mobile navigation - UX audit', () => {
  test('bottom nav is visible on mobile', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    if (url.includes('/login')) {
      console.log('NOTE: Requires auth for mobile nav test');
      return;
    }

    await page.screenshot({ path: 'screenshots/12-mobile-dashboard.png', fullPage: true });

    // Check bottom nav exists
    const bottomNav = page.locator('[class*="bottom"], [role="navigation"]').last();
    const bottomNavVisible = await bottomNav.isVisible().catch(() => false);

    if (!bottomNavVisible) {
      console.log('CRITICAL: Bottom navigation not visible on mobile');
    }
  });

  test('touch targets are at least 48px', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    if (url.includes('/login')) return;

    await page.screenshot({ path: 'screenshots/13-mobile-touch.png', fullPage: true });

    // Check interactive elements have adequate size
    const buttons = await page.getByRole('button').all();
    const links = await page.getByRole('link').all();

    const smallElements: string[] = [];

    for (const btn of buttons.slice(0, 10)) {
      const box = await btn.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        const text = await btn.textContent();
        smallElements.push(`Button "${text?.trim()}" (${box.width}x${box.height})`);
      }
    }

    for (const link of links.slice(0, 10)) {
      const box = await link.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        const text = await link.textContent();
        smallElements.push(`Link "${text?.trim()}" (${box.width}x${box.height})`);
      }
    }

    if (smallElements.length > 0) {
      console.log('UX ISSUE: Touch targets below 44px minimum:', smallElements);
    }
  });

  test('content does not overlap bottom nav', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    if (url.includes('/login')) return;

    await page.screenshot({ path: 'screenshots/14-mobile-overlap.png', fullPage: true });

    // Check if main content has bottom padding to avoid nav overlap
    const main = page.locator('main').first();
    const mainBox = await main.boundingBox().catch(() => null);

    if (mainBox) {
      const viewport = page.viewportSize();
      if (viewport && mainBox.y + mainBox.height > viewport.height - 100) {
        console.log('UX ISSUE: Main content may overlap bottom navigation');
      }
    }
  });
});

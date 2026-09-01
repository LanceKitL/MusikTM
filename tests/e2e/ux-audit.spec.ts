import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'homepage' },
  { path: '/login', name: 'login' },
  { path: '/signup', name: 'signup' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/team', name: 'team' },
  { path: '/schedule', name: 'schedule' },
  { path: '/cifra', name: 'cifra' },
  { path: '/praisent', name: 'praisent' },
];

test.describe('Full UX audit - every page', () => {
  for (const { path, name } of pages) {
    test(`${name} page - screenshot and basic checks`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `screenshots/audit-${name}.png`, fullPage: true });

      // Check page title
      const title = await page.title();
      console.log(`[${name}] Title: "${title}"`);

      // Check for console errors
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      // Check heading hierarchy
      const headings = await page.locator('h1, h2, h3').allTextContents();
      console.log(`[${name}] Headings:`, headings);

      // Check for empty buttons/links
      const buttons = await page.getByRole('button').all();
      for (const btn of buttons) {
        const text = await btn.textContent();
        if (!text?.trim()) {
          console.log(`[${name}] UX ISSUE: Empty button found`);
        }
      }

      // Check images have alt text
      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (!alt) {
          console.log(`[${name}] UX ISSUE: Image missing alt text`);
        }
      }

      // Check form inputs have labels
      const inputs = await page.locator('input:not([type="hidden"])').all();
      for (const input of inputs) {
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');

        if (!id && !ariaLabel && !placeholder) {
          console.log(`[${name}] UX ISSUE: Input missing label/aria-label`);
        }
      }
    });
  }
});

test.describe('Accessibility quick checks', () => {
  test('skip to main content link exists', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const skipLink = page.getByRole('link', { name: /skip/i });
    const skipVisible = await skipLink.isVisible().catch(() => false);

    if (!skipVisible) {
      console.log('A11Y ISSUE: No "Skip to main content" link visible');
    }
  });

  test('focus visible on interactive elements', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Tab through elements and check focus ring
    const emailInput = page.getByLabel('Email');
    await emailInput.focus();

    // Check if focus ring is visible
    const outline = await emailInput.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineStyle: styles.outlineStyle,
        boxShadow: styles.boxShadow,
      };
    });

    console.log('[login] Focus styles:', outline);
  });

  test('color contrast check', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Check if text has sufficient contrast (basic check)
    const textElements = await page.locator('p, span, a, h1, h2, h3').all();

    for (const el of textElements.slice(0, 5)) {
      const styles = await el.evaluate((el) => {
        const s = window.getComputedStyle(el);
        return { color: s.color, bg: s.backgroundColor };
      });
      console.log('[dashboard] Text colors:', styles);
    }
  });
});

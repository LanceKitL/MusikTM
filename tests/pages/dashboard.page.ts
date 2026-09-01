import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly greeting: Locator;
  readonly heroCard: Locator;
  readonly quickActions: Locator;
  readonly teamsSection: Locator;
  readonly sidebar: Locator;
  readonly bottomNav: Locator;
  readonly navbar: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.greeting = page.getByText(/good (morning|afternoon|evening)/i);
    this.heroCard = page.locator('[class*="hero"], [class*="stat"]').first();
    this.quickActions = page.getByText(/quick action/i);
    this.teamsSection = page.getByText(/your team/i);
    this.sidebar = page.getByRole('navigation', { name: /sidebar/i });
    this.bottomNav = page.getByRole('navigation', { name: /bottom/i });
    this.navbar = page.getByRole('banner');
  }

  async goto() {
    await this.navigate('/dashboard');
  }
}

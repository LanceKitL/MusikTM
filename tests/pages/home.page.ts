import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly loginButton: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.loginButton = page.getByRole('link', { name: /log in/i });
    this.signupButton = page.getByRole('link', { name: /create account/i });
  }

  async goto() {
    await this.navigate('/');
  }
}

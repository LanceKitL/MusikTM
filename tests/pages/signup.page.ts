import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class SignupPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByLabel('Full name');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: /create account/i });
    this.errorMessage = page.getByRole('alert');
    this.loginLink = page.getByRole('link', { name: /log in/i });
  }

  async goto() {
    await this.navigate('/signup');
  }

  async signup(fullName: string, email: string, password: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

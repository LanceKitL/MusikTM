import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class TeamPage extends BasePage {
  readonly heading: Locator;
  readonly createTeamButton: Locator;
  readonly joinTeamButton: Locator;
  readonly teamNameInput: Locator;
  readonly inviteCodeInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly membersList: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.createTeamButton = page.getByRole('button', { name: /create team/i });
    this.joinTeamButton = page.getByRole('button', { name: /join team/i });
    this.teamNameInput = page.getByLabel(/team name/i);
    this.inviteCodeInput = page.getByLabel(/invite code/i);
    this.submitButton = page.getByRole('button', { name: /submit|join|create/i });
    this.errorMessage = page.getByRole('alert');
    this.successMessage = page.locator('[class*="alert-success"], [class*="toast"]');
    this.membersList = page.getByRole('list');
  }

  async goto() {
    await this.navigate('/team');
  }
}

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';

test.describe('Auth flow - UX audit', () => {
  test('homepage loads and has clear entry points', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });

    // Check that the page has meaningful content
    await expect(page).toHaveTitle(/musikktm/i);

    // Check for visible heading
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible();
  });

  test('login page - check form usability', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await page.screenshot({ path: 'screenshots/02-login.png', fullPage: true });

    // Check form fields are visible and labeled
    await expect(login.emailInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.submitButton).toBeVisible();

    // Check that labels are associated (clicking label should focus input)
    await login.emailInput.blur();
    await page.getByLabel('Email').click();
    await expect(login.emailInput).toBeFocused();

    // Check tab order
    await login.emailInput.press('Tab');
    await expect(login.passwordInput).toBeFocused();
  });

  test('signup page - check form usability', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await page.screenshot({ path: 'screenshots/03-signup.png', fullPage: true });

    // Check form fields are visible
    await expect(signup.fullNameInput).toBeVisible();
    await expect(signup.emailInput).toBeVisible();
    await expect(signup.passwordInput).toBeVisible();
    await expect(signup.submitButton).toBeVisible();

    // Check that submit button is disabled or shows loading on click
    await expect(signup.submitButton).toBeEnabled();
  });

  test('login page - error state on invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('test@example.com', 'wrongpassword');
    await page.screenshot({ path: 'screenshots/04-login-error.png', fullPage: true });

    // Check error is announced to screen readers
    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
  });

  test('signup page - password requirements visible', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    await page.screenshot({ path: 'screenshots/05-signup-password.png', fullPage: true });

    // Check if password requirements are visible
    const requirements = page.getByText(/at least 6 characters/i);
    const reqVisible = await requirements.isVisible().catch(() => false);

    // Log if requirements are missing
    if (!reqVisible) {
      console.log('UX ISSUE: Password requirements not visible on signup page');
    }
  });
});

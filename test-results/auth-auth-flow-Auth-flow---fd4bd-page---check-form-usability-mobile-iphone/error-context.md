# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\auth-flow.spec.ts >> Auth flow - UX audit >> signup page - check form usability
- Location: tests\e2e\auth\auth-flow.spec.ts:40:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /create account/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /create account/i })

```

```yaml
- link "Skip to content":
  - /url: "#main-content"
- heading "Create account" [level=2]
- text: Full name
- textbox "Full name":
  - /placeholder: John Doe
- text: Email
- textbox "Email":
  - /placeholder: you@example.com
- text: Password
- textbox "Password":
  - /placeholder: At least 8 characters
- paragraph: Must be at least 8 characters
- button "Sign up"
- text: or
- paragraph:
  - text: Already have an account?
  - link "Log in":
    - /url: /login
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../../pages/home.page';
  3  | import { LoginPage } from '../../pages/login.page';
  4  | import { SignupPage } from '../../pages/signup.page';
  5  | 
  6  | test.describe('Auth flow - UX audit', () => {
  7  |   test('homepage loads and has clear entry points', async ({ page }) => {
  8  |     const home = new HomePage(page);
  9  |     await home.goto();
  10 |     await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
  11 | 
  12 |     // Check that the page has meaningful content
  13 |     await expect(page).toHaveTitle(/musikktm/i);
  14 | 
  15 |     // Check for visible heading
  16 |     const heading = page.getByRole('heading').first();
  17 |     await expect(heading).toBeVisible();
  18 |   });
  19 | 
  20 |   test('login page - check form usability', async ({ page }) => {
  21 |     const login = new LoginPage(page);
  22 |     await login.goto();
  23 |     await page.screenshot({ path: 'screenshots/02-login.png', fullPage: true });
  24 | 
  25 |     // Check form fields are visible and labeled
  26 |     await expect(login.emailInput).toBeVisible();
  27 |     await expect(login.passwordInput).toBeVisible();
  28 |     await expect(login.submitButton).toBeVisible();
  29 | 
  30 |     // Check that labels are associated (clicking label should focus input)
  31 |     await login.emailInput.blur();
  32 |     await page.getByLabel('Email').click();
  33 |     await expect(login.emailInput).toBeFocused();
  34 | 
  35 |     // Check tab order
  36 |     await login.emailInput.press('Tab');
  37 |     await expect(login.passwordInput).toBeFocused();
  38 |   });
  39 | 
  40 |   test('signup page - check form usability', async ({ page }) => {
  41 |     const signup = new SignupPage(page);
  42 |     await signup.goto();
  43 |     await page.screenshot({ path: 'screenshots/03-signup.png', fullPage: true });
  44 | 
  45 |     // Check form fields are visible
  46 |     await expect(signup.fullNameInput).toBeVisible();
  47 |     await expect(signup.emailInput).toBeVisible();
  48 |     await expect(signup.passwordInput).toBeVisible();
> 49 |     await expect(signup.submitButton).toBeVisible();
     |                                       ^ Error: expect(locator).toBeVisible() failed
  50 | 
  51 |     // Check that submit button is disabled or shows loading on click
  52 |     await expect(signup.submitButton).toBeEnabled();
  53 |   });
  54 | 
  55 |   test('login page - error state on invalid credentials', async ({ page }) => {
  56 |     const login = new LoginPage(page);
  57 |     await login.goto();
  58 |     await login.login('test@example.com', 'wrongpassword');
  59 |     await page.screenshot({ path: 'screenshots/04-login-error.png', fullPage: true });
  60 | 
  61 |     // Check error is announced to screen readers
  62 |     const error = page.getByRole('alert');
  63 |     await expect(error).toBeVisible();
  64 |   });
  65 | 
  66 |   test('signup page - password requirements visible', async ({ page }) => {
  67 |     const signup = new SignupPage(page);
  68 |     await signup.goto();
  69 |     await page.screenshot({ path: 'screenshots/05-signup-password.png', fullPage: true });
  70 | 
  71 |     // Check if password requirements are visible
  72 |     const requirements = page.getByText(/at least 6 characters/i);
  73 |     const reqVisible = await requirements.isVisible().catch(() => false);
  74 | 
  75 |     // Log if requirements are missing
  76 |     if (!reqVisible) {
  77 |       console.log('UX ISSUE: Password requirements not visible on signup page');
  78 |     }
  79 |   });
  80 | });
  81 | 
```
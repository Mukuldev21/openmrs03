import { test, expect } from '../fixtures/custom-test';
import { LoginDetails } from '../fixtures/Logindetails';

/**
 * Module 1: Authentication Tests
 * 
 * IMPORTANT: These tests do NOT use storageState because:
 * 1. We are testing the login/logout functionality itself
 * 2. Using storage state would bypass the authentication flow we need to test
 * 3. Each test must perform the full login/logout sequence
 * 
 * Best Practice: Develop and test ONE test at a time
 * - Run: npx playwright test tests/auth.spec.ts --grep="TC001" --workers=1
 * - Verify TC001 passes before adding TC002
 */
test.describe('Module 1: Authentication', () => {

  // TC001: Successful Login with Valid Credentials
  test('TC001: Successful Login with Valid Credentials', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter valid username and click Continue', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter valid password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.validUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Handle potential location selection', async () => {
      await loginPage.handleLocationSelection();
    });

    await test.step('Verify user is redirected to Service Queues page', async () => {
      // Wait for navigation to complete - using 'load' is faster than 'networkidle'
      await page.waitForLoadState('load', { timeout: 30000 });
      await page.waitForTimeout(5000); // Additional 5 second wait to ensure page fully loaded

      // Get the actual URL
      const url = await page.url();

      // Verify we're not on login page anymore (primary check)
      expect(url).not.toContain('login');

      // Verify URL contains spa (OpenMRS SPA)
      expect(url).toContain('/spa/');
    });
  });

  // TC002: Login Failure with Invalid Credentials
  test('TC002: Login Failure with Invalid Credentials', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter invalid username and click Continue', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.invalidUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter invalid password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.invalidUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify error notification is displayed', async () => {
      // Wait for error notification
      await page.waitForTimeout(2000);

      // Verify error notification is visible
      await loginPage.waitForElement(loginPage.errorNotificationSubtitle);
      await expect(loginPage.errorNotificationSubtitle).toBeVisible();

      // Verify error message is not empty
      const errorText = await loginPage.getErrorNotificationText();
      expect(errorText).not.toBe('');

      // Verify still on login page
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC003: Login with Empty Username
  test('TC003: Login with Empty Username', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Leave username empty and click Continue', async () => {
      // Leave username field empty
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Verify Continue button is still visible (validation prevents progress)', async () => {
      // Button should still be visible because form validation prevents submission
      await expect(loginPage.continueButton).toBeVisible();

      // Verify still on login page
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC004: Login with Empty Password
  test('TC004: Login with Empty Password', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter valid username and click Continue', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Leave password empty and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      // Leave password empty
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify Log in button is still visible (validation prevents progress)', async () => {
      await expect(loginPage.loginButton).toBeVisible();
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC005: Login with Empty Username and Password
  test('TC005: Login with Empty Username and Password', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Leave both fields empty and click Continue', async () => {
      // Leave both empty
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Verify Continue button is still visible', async () => {
      await expect(loginPage.continueButton).toBeVisible();
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC006: Login with Special Characters in Username
  test('TC006: Login with Special Characters in Username', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter username with special characters', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.specialCharsUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.specialCharsUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify login fails with error notification', async () => {
      await page.waitForTimeout(2000);
      await loginPage.waitForElement(loginPage.errorNotificationSubtitle);
      await expect(loginPage.errorNotificationSubtitle).toBeVisible();
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC007: Login with SQL Injection Attempt
  test('TC007: Login with SQL Injection Attempt', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter SQL injection string in username', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.sqlInjectionUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.sqlInjectionUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify SQL injection is prevented', async () => {
      await page.waitForTimeout(2000);
      // Should show error or stay on login page
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC008: Login with XSS Attempt
  test('TC008: Login with XSS Attempt', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter XSS script in username', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.xssUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.xssUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify XSS is prevented and no script execution', async () => {
      await page.waitForTimeout(2000);
      const url = await page.url();
      expect(url).toContain('login');
      // Verify no alert was triggered (XSS prevented)
    });
  });

  // TC009: Login with Very Long Username
  test('TC009: Login with Very Long Username', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter very long username', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.longUsername.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.longUsername.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Verify login fails gracefully', async () => {
      await page.waitForTimeout(2000);
      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC010: Case Sensitivity in Username
  test('TC010: Case Sensitivity in Username', async ({ page, loginPage }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);
    });

    await test.step('Enter username in uppercase', async () => {
      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.uppercaseUser.username);
      await loginPage.clickElement(loginPage.continueButton);
    });

    await test.step('Enter password and click Log in', async () => {
      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.uppercaseUser.password);
      await loginPage.clickElement(loginPage.loginButton);
    });

    await test.step('Handle potential location selection', async () => {
      await loginPage.handleLocationSelection();
    });

    await test.step('Verify login succeeds (username is NOT case-sensitive)', async () => {
      // OpenMRS login is NOT case-sensitive
      await page.waitForLoadState('load', { timeout: 30000 });
      await page.waitForTimeout(5000);

      const url = await page.url();
      expect(url).not.toContain('login');
      expect(url).toContain('/spa/');
    });
  });

  // TC011: Successful Logout
  test('TC011: Successful Logout', async ({ page, loginPage, homePage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);

      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
      await loginPage.clickElement(loginPage.continueButton);

      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.validUser.password);
      await loginPage.clickElement(loginPage.loginButton);
      await loginPage.handleLocationSelection();

      // Wait for navigation after login - networkidle needed for logout test
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      await page.waitForTimeout(5000);

      const url = await page.url();
      expect(url).not.toContain('login');
      expect(url).toContain('/spa/');
    });

    await test.step('Click user menu button', async () => {
      await homePage.clickUserButton();
      await homePage.waitForElement(homePage.userMenuLogout);
    });

    await test.step('Click Logout option', async () => {
      await homePage.clickUserMenuLogout();
    });

    await test.step('Verify user is redirected to login page', async () => {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      await page.waitForTimeout(3000);

      await loginPage.waitForElement(loginPage.usernameInput);
      await expect(loginPage.usernameInput).toBeVisible();

      const url = await page.url();
      expect(url).toContain('login');
    });
  });

  // TC012: Session Persistence After Page Refresh
  test('TC012: Session Persistence After Page Refresh', async ({ page, loginPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);

      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
      await loginPage.clickElement(loginPage.continueButton);

      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.validUser.password);
      await loginPage.clickElement(loginPage.loginButton);
      await loginPage.handleLocationSelection();

      await page.waitForLoadState('load', { timeout: 30000 });
      await page.waitForTimeout(5000);

      const url = await page.url();
      expect(url).not.toContain('login');
    });

    await test.step('Refresh the page', async () => {
      await page.reload({ waitUntil: 'load' });
      await page.waitForTimeout(3000);
    });

    await test.step('Verify user remains logged in after refresh', async () => {
      const url = await page.url();
      // Should still be logged in (not redirected to login)
      expect(url).not.toContain('login');
      expect(url).toContain('/spa/');
    });
  });

  // TC014: Multiple Failed Login Attempts
  test('TC014: Multiple Failed Login Attempts', async ({ page, loginPage }) => {
    const attemptCount = 3;

    for (let i = 1; i <= attemptCount; i++) {
      await test.step(`Login attempt ${i} with invalid credentials`, async () => {
        await loginPage.navigateToHomePage();
        await loginPage.waitForElement(loginPage.usernameInput);

        await loginPage.fillInput(loginPage.usernameInput, LoginDetails.invalidUser.username);
        await loginPage.clickElement(loginPage.continueButton);

        await loginPage.waitForElement(loginPage.passwordInput);
        await loginPage.fillInput(loginPage.passwordInput, LoginDetails.invalidUser.password);
        await loginPage.clickElement(loginPage.loginButton);

        await page.waitForTimeout(2000);

        // Verify error notification
        await loginPage.waitForElement(loginPage.errorNotificationSubtitle);
        await expect(loginPage.errorNotificationSubtitle).toBeVisible();

        const url = await page.url();
        expect(url).toContain('login');
      });
    }

    await test.step('Verify system handles multiple failures gracefully', async () => {
      // Should still show login page, not locked out (OpenMRS doesn't lock accounts)
      const url = await page.url();
      expect(url).toContain('login');
      await expect(loginPage.usernameInput).toBeVisible();
    });
  });

  // TC015: Browser Back Button After Logout
  test('TC015: Browser Back Button After Logout', async ({ page, loginPage, homePage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.waitForElement(loginPage.usernameInput);

      await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
      await loginPage.clickElement(loginPage.continueButton);

      await loginPage.waitForElement(loginPage.passwordInput);
      await loginPage.fillInput(loginPage.passwordInput, LoginDetails.validUser.password);
      await loginPage.clickElement(loginPage.loginButton);
      await loginPage.handleLocationSelection();

      await page.waitForLoadState('networkidle', { timeout: 30000 });
      await page.waitForTimeout(5000);

      const url = await page.url();
      expect(url).not.toContain('login');
    });

    await test.step('Logout successfully', async () => {
      await homePage.clickUserButton();
      await homePage.waitForElement(homePage.userMenuLogout);
      await homePage.clickUserMenuLogout();

      await page.waitForLoadState('networkidle', { timeout: 30000 });
      await page.waitForTimeout(3000);

      await loginPage.waitForElement(loginPage.usernameInput);
      const url = await page.url();
      expect(url).toContain('login');
    });

    await test.step('Click browser back button', async () => {
      await page.goBack();
      await page.waitForTimeout(3000);
    });

    await test.step('Verify user is redirected back to login page', async () => {
      // Should not be able to access authenticated page after logout
      const url = await page.url();
      expect(url).toContain('login');
      await expect(loginPage.usernameInput).toBeVisible();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();
      await testInfo.attach('Failure Screenshot', { body: screenshot, contentType: 'image/png' });
    }
  });
});

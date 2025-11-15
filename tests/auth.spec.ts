import { test, expect } from '@playwright/test';
// Allure reporter removed
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LoginDetails } from '../fixtures/Logindetails';


test.describe('User Authentication', () => {
  test('TC-01: Login with valid credentials', async ({ page }, testInfo) => {
    // Allure metadata removed

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Navigate to the login page', async () => {
      console.log('[TC-01] Navigating to the login page');
      await loginPage.navigateToHomePage();
    });

    await test.step('Enter valid username and password, click Login', async () => {
      console.log('[TC-01] Entering valid credentials and clicking Login');
      await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
    });

    await test.step('Verify user is redirected to the home page or Service Queues page', async () => {
      console.log('[TC-01] Verifying redirection to home or Service Queues page');
      await homePage.waitForElement(homePage.homePageHeader);
      expect(await homePage.homePageHeader.isVisible()).toBeTruthy();
      const url = await homePage.getCurrentUrl();
      console.log(`[TC-01] Current URL after login: ${url}`);
      expect(url).toMatch(/home|service-queues/);
    });
  });


  test('TC-02: Login with invalid credentials', async ({ page }, testInfo) => {
    // Allure metadata removed

    const loginPage = new LoginPage(page);

    await test.step('Navigate to the login page', async () => {
      console.log('[TC-02] Navigating to the login page');
      await loginPage.navigateToHomePage();
    });

    await test.step('Enter invalid username and password, click Login', async () => {
      console.log('[TC-02] Entering invalid credentials and clicking Login');
      await loginPage.login(LoginDetails.invalidUser.username, LoginDetails.invalidUser.password);
    });

    await test.step('Verify error message is displayed and user is not logged in', async () => {
      console.log('[TC-02] Verifying error message is displayed');
      await loginPage.waitForElement(loginPage.errorNotificationSubtitle);
      expect(await loginPage.isErrorNotificationVisible()).toBeTruthy();
      const errorText = await loginPage.getErrorNotificationText();
      console.log(`[TC-02] Error message: ${errorText}`);
      expect(errorText).not.toBe('');
      const url = await loginPage.getCurrentUrl();
      console.log(`[TC-02] Current URL after failed login: ${url}`);
      expect(url).toContain('login');
    });
  });



  test('TC-03: Logout flow', async ({ page }, testInfo) => {
    // Allure metadata removed

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Log in as valid user', async () => {
      console.log('[TC-03] Logging in as valid user');
      await loginPage.navigateToHomePage();
      await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
      await homePage.waitForElement(homePage.homePageHeader);
    });

    await test.step('Click the Logout button', async () => {
      console.log('[TC-03] Clicking the Logout button');
      await homePage.clickUserButton();
      await homePage.waitForElement(homePage.userMenuLogout);
      await homePage.clickUserMenuLogout();
    });

    await test.step('Verify user is redirected to login page', async () => {
      console.log('[TC-03] Verifying user is redirected to login page');
      await loginPage.waitForElement(loginPage.usernameInput);
      expect(await loginPage.isElementVisible(loginPage.usernameInput)).toBeTruthy();
      const url = await loginPage.getCurrentUrl();
      console.log(`[TC-03] Current URL after logout: ${url}`);
      expect(url).toContain('login');
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Attach screenshot to Allure report on failure using Playwright's built-in attachment
      const screenshot = await page.screenshot();
      await testInfo.attach('Failure Screenshot', { body: screenshot, contentType: 'image/png' });
    }
  });
});

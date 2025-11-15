import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LoginDetails } from '../fixtures/Logindetails';

// TC-01: Login with valid credentials
test('TC-01: Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Step 1: Navigate to the login page
  await loginPage.navigateToHomePage();

  // Step 2 & 3: Enter valid username and password, click Login
  await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);

  // Expected: User is redirected to the home page or Service Queues page
  // Wait for home page header (OpenMRS Logo) to be visible
  await homePage.waitForElement(homePage.homePageHeader);
  expect(await homePage.homePageHeader.isVisible()).toBeTruthy();

  // Optionally, check URL contains 'home' or 'service-queues'
  const url = await homePage.getCurrentUrl();
  expect(url).toMatch(/home|service-queues/);
});

// TC-02: Login with invalid credentials
test('TC-02: Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to the login page
  await loginPage.navigateToHomePage();

  // Step 2: Enter invalid username and password, click Login
  await loginPage.login(LoginDetails.invalidUser.username, LoginDetails.invalidUser.password);

  // Expected: Error message is displayed; user is not logged in
  await loginPage.waitForElement(loginPage.errorNotificationSubtitle);
  expect(await loginPage.isErrorNotificationVisible()).toBeTruthy();
  const errorText = await loginPage.getErrorNotificationText();
  expect(errorText).not.toBe('');

  // Optionally, check that we are still on the login page
  const url = await loginPage.getCurrentUrl();
  expect(url).toContain('login');
});

// TC-03: Logout flow
test('TC-03: Logout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Step 1: Log in as valid user
  await loginPage.navigateToHomePage();
  await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
  await homePage.waitForElement(homePage.homePageHeader);

  // Step 2: Click the 'Logout' button or link
  await homePage.clickUserButton();
  await homePage.waitForElement(homePage.userMenuLogout);
  await homePage.clickUserMenuLogout();

  // Expected: User is logged out and redirected to the login page
  await loginPage.waitForElement(loginPage.usernameInput);
  expect(await loginPage.isElementVisible(loginPage.usernameInput)).toBeTruthy();
  const url = await loginPage.getCurrentUrl();
  expect(url).toContain('login');
});

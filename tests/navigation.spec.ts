import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LoginDetails } from '../fixtures/Logindetails';

// TC-04: Navigate to Service Queues from Home
test.describe('2. Navigation', () => {
test('TC-04: Navigate to Service Queues from Home', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Log in first
  console.log('[TC-04] Navigating to login page');
  await loginPage.navigateToHomePage();
  console.log('[TC-04] Logging in as valid user');
  await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
  await homePage.waitForElement(homePage.homePageHeader);

  // Locate and click the 'Service Queues' link or menu item
  console.log('[TC-04] Clicking Service Queues link');
  await homePage.serviceQueuesNav.click();

  // Verify navigation to Service Queues page
  console.log('[TC-04] Verifying navigation to Service Queues page');
  await expect(page).toHaveURL(/service-queues/);
  // Wait for the Service Queues page to be fully loaded
  await homePage.waitForServiceQueuesPageLoaded();
});

// TC-05: Verify Service Queues page loads correctly
test('TC-05: Verify Service Queues page loads correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Log in and navigate to Service Queues page
  console.log('[TC-05] Navigating to login page');
  await loginPage.navigateToHomePage();
  console.log('[TC-05] Logging in as valid user');
  await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
  await homePage.waitForElement(homePage.homePageHeader);
  console.log('[TC-05] Clicking Service Queues link');
  await homePage.serviceQueuesNav.click();
  await expect(page).toHaveURL(/service-queues/);

  // Wait for the Service Queues page to be fully loaded
  console.log('[TC-05] Waiting for Service Queues page to be fully loaded');
  await homePage.waitForServiceQueuesPageLoaded();
  console.log('[TC-05] Checked for "Patients currently in queue" header');

  console.log('[TC-05] Checking for "Add patient to queue" button');
  await expect(homePage.addPatientButton).toBeVisible();

  console.log('[TC-05] Checking for filter dropdown');
  await expect(homePage.filterDropdownLabel).toBeVisible();

  console.log('[TC-05] Checking for table columns');
  for (const header of homePage.tableHeaders) {
    const th = page.locator('th', { hasText: header });
    await expect(th).toBeVisible();
  }
});
});

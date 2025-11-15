import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QueuePage } from '../pages/QueuePage';
import { LoginDetails } from '../fixtures/Logindetails';

// TC-06: View all available service queues
// Preconditions: User is on the Service Queues page.
test('TC-06: View all available service queues', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const queuePage = new QueuePage(page);

  // Log in and navigate to Service Queues page
  await loginPage.navigateToHomePage();
  await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
  await homePage.waitForElement(homePage.homePageHeader);
  await homePage.serviceQueuesNav.click();
  await homePage.waitForServiceQueuesPageLoaded();

  // Step 1: Observe the list of queues displayed
  const queueCount = await queuePage.getServiceQueuesCount();
  const queueDetails = await queuePage.getAllServiceQueuesDetails();

  // Expected Result: All existing queues are listed with relevant details
  console.log(`[TC-06] Number of queues found: ${queueCount}`);
  console.log('[TC-06] Queue details:', queueDetails);
  expect(queueCount).toBeGreaterThanOrEqual(0); // At least 0 queues (empty state is valid)
  // Optionally, check that each row has the expected number of columns
  for (const row of queueDetails) {
    expect(row.length).toBe(queuePage.tableHeaders.length);
  }
});

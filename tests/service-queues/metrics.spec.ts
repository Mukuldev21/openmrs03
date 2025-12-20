import { test, expect } from '../../fixtures/custom-test';
import { LoginDetails } from '../../fixtures/Logindetails';

/**
 * Module 3: Service Queues - Metrics
 * 
 * Objectives:
 * - Verify the correctness and visibility of the metrics cards.
 */
test.describe('Module 3: Service Queues - Metrics', () => {

    test.beforeEach(async ({ loginPage, homePage }) => {
        await test.step('Preconditions: Login and Navigate', async () => {
            await loginPage.navigateToHomePage();
            await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
            await homePage.waitForHomePageLoad();
            await homePage.serviceQueuesNav.click();
            await homePage.waitForServiceQueuesPageLoaded();
        });
    });

    test('TC017: Checked In Patients Metric Display', async ({ homePage }) => {
        await test.step('Locate "Checked in patients" card', async () => {
            await expect(homePage.checkedInCard).toBeVisible();
        });

        await test.step('Verify "Patients: X" label', async () => {
            // Verify the 'Patients' label text exists within the card
            await expect(homePage.checkedInLabel).toBeVisible();
            await expect(homePage.checkedInLabel).toHaveText('Patients');
        });

        await test.step('Verify count is valid number', async () => {
            await expect(homePage.checkedInCount).toBeVisible();

            // Use toPass to handle potential async data loading
            await expect(async () => {
                const rawText = await homePage.checkedInCount.innerText();
                const countText = rawText.trim();
                console.log(`Checked In Count Read: "${countText}"`);

                // If it's loading (e.g., "--" or empty), this will fail and retry
                expect(countText, 'Count should be a number').toMatch(/^\d+$/);

                const count = parseInt(countText, 10);
                expect(count).toBeGreaterThanOrEqual(0);
            }).toPass({ timeout: 10000 });
        });
    });
});

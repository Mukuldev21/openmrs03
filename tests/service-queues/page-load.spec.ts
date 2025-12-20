import { test, expect } from '../../fixtures/custom-test';
import { LoginDetails } from '../../fixtures/Logindetails';

/**
 * Module 2: Service Queues - Page Load & Navigation
 * 
 * Objectives:
 * - Verify the initial load and rendering of the Service Queues page.
 * - Verify navigation to Service Queues from other modules.
 * 
 * Best Practice:
 * - Use 'test.step' for clear reporting.
 * - Use shared fixtures (loginPage, homePage) for dependency injection.
 */
test.describe('Module 2: Service Queues - Page Load & Navigation', () => {

    test.beforeEach(async ({ loginPage, homePage }) => {
        await test.step('Preconditions: Login as Admin', async () => {
            await loginPage.navigateToHomePage();
            await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
            await homePage.waitForHomePageLoad();
        });
    });

    test('TC015: Service Queues Page Initial Load', async ({ page, homePage, queuePage }) => {
        await test.step('Navigate to Service Queues', async () => {
            // 1. Navigate to Service Queues (via side nav/link for realistic flow)
            await homePage.serviceQueuesNav.click();
        });

        await test.step('Wait for page to load', async () => {
            // 2. Wait for page load
            await page.waitForLoadState('load');
            await homePage.waitForServiceQueuesPageLoaded();
        });

        await test.step('Verify Headers and Breadcrumbs', async () => {
            // 3. Verify page header 'Service queues' visible
            await expect(homePage.serviceQueuesHeader).toBeVisible();
            // 4. Verify Breadcrumb shows 'Clinic'
            await expect(homePage.clinicBreadcrumb).toBeVisible();
        });

        await test.step('Verify Queue Table content', async () => {
            // 5. Verify patient queue table visible OR empty message
            // Standards: Narrow down scope.
            // We expect EITHER the table rows to be present OR the "No patients" message.
            const isTableVisible = await queuePage.queuesTableRows.first().isVisible().catch(() => false);
            const isEmptyMessageVisible = await queuePage.noQueuesMessage.isVisible().catch(() => false);

            expect(isTableVisible || isEmptyMessageVisible, 'Either table rows or "No patients" message should be visible').toBeTruthy();

            // Verify specific section header
            await expect(homePage.serviceQueuesSection).toBeVisible();
        });

        await test.step('Verify Action Buttons', async () => {
            // 6. Verify Action buttons present
            await expect(homePage.addPatientButton).toBeVisible();
            await expect(homePage.clearQueueButton).toBeVisible();
            await expect(homePage.filterDropdownLabel).toBeVisible();
            await expect(homePage.filterTableLabel).toBeVisible();
        });
    });

    test('TC016: Navigation to Service Queues from Other Modules', async ({ page, homePage }) => {
        await test.step('Navigate to Appointments Module', async () => {
            // 1. Navigate to another module (Appointments)
            await homePage.appointmentsNav.click();
            await page.waitForLoadState('load');

            // Verify we are on Appointments page (basic check)
            await expect(page).toHaveURL(/.*appointments/);
        });

        await test.step('Navigate back to Service Queues', async () => {
            // 2. Click 'Service queues' in side nav
            await homePage.serviceQueuesNav.click();
            await page.waitForLoadState('load');
            await homePage.waitForServiceQueuesPageLoaded();
        });

        await test.step('Verify Service Queues Page Load', async () => {
            // 4. Verify Service Queues page loads content correctly
            await expect(homePage.serviceQueuesHeader).toBeVisible();
            await expect(homePage.serviceQueuesSection).toBeVisible();

            // Verify URL changes to service-queues
            await expect(page).toHaveURL(/.*service-queues/);
        });
    });
});

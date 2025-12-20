import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Service Queues - Navigation', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await loginPage.navigateToHomePage();
        await loginPage.login('admin', 'Admin123');
        await homePage.waitForHomePageLoad();
    });

    test('TC016: Navigation to Service Queues from Other Modules', async ({ page }) => {
        // 1. Navigate to another module (Appointments)
        await homePage.clickAppointmentsNav();
        expect(await homePage.isAppointmentsPageVisible()).toBeTruthy();

        // 2. Click 'Service queues' in side nav
        await homePage.serviceQueuesNav.click();

        // 3. Wait for page load
        await homePage.waitForServiceQueuesPageLoaded();

        // Verify Service Queues page loads
        // Verify URL changes to /home/service-queues
        expect(page.url()).toContain('/home/service-queues');

        // Verify Page content displayed correctly
        await expect(homePage.serviceQueuesSection).toBeVisible();
    });
});

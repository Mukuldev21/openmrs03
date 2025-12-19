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
 * For other modules (2-10), storage state can be used to avoid repeated logins.
 */
test.describe('Module 1: Authentication - Core Tests', () => {

    test('TC001: Successful Login with Valid Credentials', async ({ page, loginPage, homePage }) => {
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
            console.log('About to click login button');
            await loginPage.clickElement(loginPage.loginButton);
            console.log('Clicked login button');
        });

        await test.step('Verify user is redirected to Service Queues page', async () => {
            // Wait for navigation to complete - using 'load' is faster than 'networkidle'
            console.log('Waiting for navigation...');
            await page.waitForLoadState('load', { timeout: 30000 }); // 30 seconds for slow login
            await page.waitForTimeout(5000); // Additional 5 second wait to ensure page fully loaded

            // Get the actual URL
            const url = await page.url();
            console.log('Current URL after login:', url);

            // Verify we're not on login page anymore (primary check)
            expect(url).not.toContain('login');

            // Verify URL contains spa (OpenMRS SPA)
            expect(url).toContain('/spa/');
        });
    });

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

    test('TC011: Successful Logout', async ({ page, loginPage, homePage }) => {
        await test.step('Login with valid credentials', async () => {
            // Navigate to login page
            await loginPage.navigateToHomePage();
            await loginPage.waitForElement(loginPage.usernameInput);

            // Enter username
            await loginPage.fillInput(loginPage.usernameInput, LoginDetails.validUser.username);
            await loginPage.clickElement(loginPage.continueButton);

            // Enter password
            await loginPage.waitForElement(loginPage.passwordInput);
            await loginPage.fillInput(loginPage.passwordInput, LoginDetails.validUser.password);
            await loginPage.clickElement(loginPage.loginButton);

            // Wait for navigation after login - networkidle needed for logout test
            await page.waitForLoadState('networkidle', { timeout: 30000 }); // 30 seconds for slow login
            await page.waitForTimeout(5000); // Additional 5 second wait to ensure page fully loaded

            // Verify we're logged in (not on login page)
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
            // Wait for navigation to login page
            await page.waitForLoadState('networkidle');

            // Verify login page elements are visible
            await loginPage.waitForElement(loginPage.usernameInput);
            await expect(loginPage.usernameInput).toBeVisible();

            // Verify URL contains login
            const url = await page.url();
            expect(url).toContain('login');
        });
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot();
            await testInfo.attach('Failure Screenshot', { body: screenshot, contentType: 'image/png' });
        }
    });
});

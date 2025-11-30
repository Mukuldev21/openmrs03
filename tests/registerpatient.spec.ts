import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LoginDetails } from '../fixtures/Logindetails';
import { RegisterPatientPage } from '../pages/RegisterPatientPage';


//TC: Register Patient Fucntionality
test.describe('3. Register Patient Functionality', () => {
    test('TC-08: Verify Register Patient Page loads correctly', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const registerPatientPage = new RegisterPatientPage(page);

        // Log in first
        console.log('[TC-08] Navigating to login page');
        await loginPage.navigateToHomePage();
        await loginPage.waitForLoginPageLoad();

        console.log('[TC-08] Logging in as valid user');
        await loginPage.login(LoginDetails.validUser.username, LoginDetails.validUser.password);
        await homePage.waitForElement(homePage.homePageHeader);
        await homePage.waitForHomePageLoad();


        // Locate and click the 'Register Patient' button
        console.log('[TC-08] Locate Register Patient button');
        await homePage.isRegisterPatientButtonVisible();
        console.log('[TC-08] Clicking Register Patient button');
        await homePage.clickRegisterPatientButton();

        // Verify navigation to Register Patient page
        console.log('[TC-08] Verifying navigation to Register Patient page');
        await expect(page).toHaveURL(/patient-registration/);
        // Wait for the Register Patient page to be fully loaded
        await registerPatientPage.waitForRegisterPatientPageLoad();

        // Verify that key elements on the Register Patient page are visible
        console.log('[TC-08] Verifying key elements on Register Patient page are visible');
        await expect(registerPatientPage.newPatientHeader).toBeVisible();
        await expect(registerPatientPage.basicInfoHeader).toBeVisible();
        await expect(registerPatientPage.contactInfoHeader).toBeVisible();
        await expect(registerPatientPage.realtionshipsHeader).toBeVisible();
        await expect(registerPatientPage.givenNameInput).toBeVisible();
        await expect(registerPatientPage.familyNameInput).toBeVisible();
        await expect(registerPatientPage.dateOfBirthInput).toBeVisible();
        await expect(registerPatientPage.sex).toBeVisible();
        await expect(registerPatientPage.registerButton).toBeVisible();

        console.log('[TC-08] Register Patient page loaded correctly with all key elements visible');


    });
});    
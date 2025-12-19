import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QueuePage } from '../pages/QueuePage';
import { RegisterPatientPage } from '../pages/RegisterPatientPage';

// Declare the types of your fixtures
type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    queuePage: QueuePage;
    registerPatientPage: RegisterPatientPage;
};

// Extend the base test with custom fixtures
export const test = base.extend<MyFixtures>({
    // Define how 'loginPage' is initialized
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Define how 'homePage' is initialized
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    // Define how 'queuePage' is initialized
    queuePage: async ({ page }, use) => {
        const queuePage = new QueuePage(page);
        await use(queuePage);
    },

    // Define how 'registerPatientPage' is initialized
    registerPatientPage: async ({ page }, use) => {
        const registerPatientPage = new RegisterPatientPage(page);
        await use(registerPatientPage);
    },
});

export { expect } from '@playwright/test';

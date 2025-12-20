import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorNotificationTitle: Locator; // Added locator
    readonly errorNotificationSubtitle: Locator; // Added locator
    readonly inpatientWardLocation: Locator;
    readonly locationConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.errorNotificationTitle = page.locator('div.cds--inline-notification__title'); // Added locator
        this.errorNotificationSubtitle = page.locator('div.cds--inline-notification__subtitle'); // Added locator
        this.inpatientWardLocation = page.locator('span', { hasText: 'Inpatient Ward' }).first();
        this.locationConfirmButton = page.locator('button', { hasText: 'Confirm' });
    }

    async waitForLoginPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillInput(this.usernameInput, username);
        await this.clickElement(this.continueButton);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
        await this.handleLocationSelection();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return this.isElementVisible(this.loginButton);
    }

    async getLoginButtonText(): Promise<string> {
        return this.getElementText(this.loginButton);
    }

    // Method to validate error notification
    async isErrorNotificationVisible(): Promise<boolean> {
        return this.isElementVisible(this.errorNotificationSubtitle);
    }

    async getErrorNotificationText(): Promise<string> {
        return this.getElementText(this.errorNotificationSubtitle);
    }

    /**
     * Handles the conditional location selection page.
     * Checks if the URL contains 'login/location' or if the 'Inpatient Ward' element is present.
     * If present, selects 'Inpatient Ward' and clicks 'Confirm'.
     */
    async handleLocationSelection(): Promise<void> {
        try {
            // Wait briefly to see if we satisfy the location page condition
            // Using a race condition check or short timeout to not slow down normal tests 
            // if the page doesn't appear.

            // Wait for potential navigation or element appearance
            await this.page.waitForTimeout(2000);

            if (this.page.url().includes('/login/location') || await this.inpatientWardLocation.isVisible()) {
                console.log('Location selection page detected. Selecting Inpatient Ward...');
                await this.clickElement(this.inpatientWardLocation);
                await this.clickElement(this.locationConfirmButton);
                // Wait for navigation away from location page
                await this.page.waitForLoadState('load');
            } else {
                console.log('Location selection page not detected. Continuing...');
            }
        } catch (error) {
            console.log('Error handling location selection (ignoring as it might not be present):', error);
        }
    }
}
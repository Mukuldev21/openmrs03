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
        // Priority 1: Semantics
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });

        // Error notifications
        // Standard: Container + Child Pattern
        // 'role="alert"' was not found in the DOM, so falling back to class-based Container.
        const notificationContainer = page.locator('.cds--inline-notification');
        this.errorNotificationTitle = notificationContainer.locator('.cds--inline-notification__title');
        this.errorNotificationSubtitle = notificationContainer.locator('.cds--inline-notification__subtitle');

        // Location Selection
        // "Inpatient Ward" is likely a label or button/link. Standard: getByText or getByLabel
        this.inpatientWardLocation = page.getByText('Inpatient Ward', { exact: true });

        // Confirm Button
        this.locationConfirmButton = page.getByRole('button', { name: 'Confirm' });
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
        // Standard: Handling Conditional Navigation using waitFor with timeout
        try {
            // Wait for 'Inpatient Ward' to be visible. 
            // Using a moderate timeout (e.g., 5000ms) to allow for network delays (redirecting to location page).
            // If it appears, we are on the location page.
            await this.inpatientWardLocation.waitFor({ state: 'visible', timeout: 5000 });

            console.log('Location selection page detected. Selecting Inpatient Ward...');
            // Inpatient Ward locator is typically a text node. Clicking it usually works to select.
            await this.inpatientWardLocation.click();
            await this.locationConfirmButton.click();

            // Wait for navigation away from location page (Login complete)
            await this.page.waitForLoadState('load');

        } catch (error) {
            // If timeout occurs, it implies we are NOT on the location selection page (or it didn't load in time).
            // This is acceptable if we went straight to the Dashboard.
            // We just log and continue. Use verify steps in the test to confirm where we actually are.
            console.log('Location selection not detected (or timed out). Assuming direct login or previous failure.');
        }
    }
}
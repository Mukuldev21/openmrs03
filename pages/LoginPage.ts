import {Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly continueButton: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorNotificationTitle: Locator; // Added locator
    readonly errorNotificationSubtitle: Locator; // Added locator

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.errorNotificationTitle = page.locator('div.cds--inline-notification__title'); // Added locator
        this.errorNotificationSubtitle = page.locator('div.cds--inline-notification__subtitle'); // Added locator
    }

    async waitForLoginPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillInput(this.usernameInput, username);
        await this.clickElement(this.continueButton);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
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
}
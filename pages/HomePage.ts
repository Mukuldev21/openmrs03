import {Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly homePageHeader: Locator;
    //readonly loggedInUser: Locator;
    //readonly accountOverviewLink: Locator;
    readonly userButton: Locator;

    // User menu locators
    readonly userMenu: Locator;
    readonly userMenuUser: Locator;
    readonly userMenuChangeLanguage: Locator;
    readonly userMenuChangePassword: Locator;
    readonly userMenuLogout: Locator;

    constructor(page: Page) {
        super(page);
        // Updated locator for the OpenMRS Logo header
        this.homePageHeader = page.locator('svg[aria-label="OpenMRS Logo"]');
        this.userButton = page.locator('button[aria-label="My Account"]');

        // User menu locators
        this.userMenu = page.locator('ul[aria-label="User menu options"]');
        this.userMenuUser = page.locator('a[aria-label="User"]');
        this.userMenuChangeLanguage = page.locator('a[aria-label="Change language"]');
        this.userMenuChangePassword = page.locator('a[aria-label="Change password"]');
        this.userMenuLogout = page.locator('button:has-text("Logout")');
    }

    async clickUserButton(): Promise<void> {
        await this.userButton.click();
    }

    async clickUserMenuUser(): Promise<void> {
        await this.userMenuUser.click();
    }

    async clickUserMenuChangeLanguage(): Promise<void> {
        await this.userMenuChangeLanguage.click();
    }

    async clickUserMenuChangePassword(): Promise<void> {
        await this.userMenuChangePassword.click();
    }

    async clickUserMenuLogout(): Promise<void> {
        await this.userMenuLogout.click();
    }

    async isUserMenuVisible(): Promise<boolean> {
        return this.userMenu.isVisible();
    }
}

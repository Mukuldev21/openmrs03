import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly homePageHeader: Locator;
    readonly userButton: Locator;
    readonly userMenu: Locator;
    readonly userMenuUser: Locator;
    readonly userMenuChangeLanguage: Locator;
    readonly userMenuChangePassword: Locator;
    readonly userMenuLogout: Locator;
    readonly resgisterPatientButton: Locator;

    // Service Queues navigation and page locators
    readonly serviceQueuesNav: Locator;
    readonly addPatientButton: Locator;
    readonly filterDropdownLabel: Locator;
    readonly filterTableLabel: Locator;
    readonly clearQueueButton: Locator;
    readonly serviceQueuesSection: Locator;
    readonly tableHeaders: string[] = [
        'Name',
        'Coming from',
        'Priority',
        'Status',
        'Queue',
        'Wait time',
        'Actions'
    ];

    //for language change
    readonly myAccountMenu: Locator;
    readonly changeLanguageOption: Locator;
    readonly englishLanguageOption: Locator;

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

        // Updated locator for Add Patient button - using the one verified in browser tool
        this.resgisterPatientButton = page.locator('button[aria-label="Add patient"]').first();

        // Service Queues navigation locator
        this.serviceQueuesNav = page.locator('p:has-text("Service queues")');

        // Service Queues page locators
        this.serviceQueuesSection = page.getByText('Patients currently in queue', { exact: true });
        this.addPatientButton = page.locator('button[aria-label="Search Patient Button"].cds--btn.cds--btn--sm.cds--layout--size-sm.cds--btn--secondary', { hasText: 'Add patient to queue' });
        this.filterDropdownLabel = page.locator('label.cds--label', { hasText: 'Show patients with status:' });
        this.filterTableLabel = page.locator('label.cds--label', { hasText: 'Filter table' });
        this.clearQueueButton = page.locator('button.cds--btn.cds--btn--lg.cds--layout--size-lg.cds--btn--ghost', { hasText: 'Clear queue' });

        // Language change menu
        this.myAccountMenu = page.getByRole('button', { name: 'My Account' });
        this.changeLanguageOption = page.getByLabel('Change language').getByRole('button', { name: 'Change' });
        this.englishLanguageOption = page.getByRole('button', { name: 'English' });
    }

    async waitForHomePageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async waitForServiceQueuesSection(): Promise<void> {
        await this.serviceQueuesSection.waitFor({ state: 'visible', timeout: 10000 });
    }

    async waitForServiceQueuesPageLoaded(): Promise<void> {
        await this.serviceQueuesSection.waitFor({ state: 'visible', timeout: 15000 });
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

    async clickRegisterPatientButton(): Promise<void> {
        await this.resgisterPatientButton.click();
    }

    async isRegisterPatientButtonVisible(): Promise<boolean> {
        return this.resgisterPatientButton.isVisible();
    }

    async isMyAccountMenuVisible(): Promise<boolean> {
        return this.myAccountMenu.isVisible();
    }

    async clickMyAccountMenu(): Promise<void> {
        await this.myAccountMenu.click();
    }
}
import {Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly homePageHeader: Locator;
    readonly userButton: Locator;
    readonly userMenu: Locator;
    readonly userMenuUser: Locator;
    readonly userMenuChangeLanguage: Locator;
    readonly userMenuChangePassword: Locator;
    readonly userMenuLogout: Locator;

    // Service Queues navigation and page locators (updated to match provided DOM)
    readonly serviceQueuesNav: Locator;
    //readonly serviceQueuesHeader: Locator;
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

        // Service Queues navigation locator
        this.serviceQueuesNav = page.locator('p:has-text("Service queues")');
        // Service Queues page locators (all selectors match provided DOM)
        // Section containing the Patients currently in queue header (simple getByText)
        this.serviceQueuesSection = page.getByText('Patients currently in queue', { exact: true });
        //this.serviceQueuesHeader = page.locator('div.-esm-service-queues__queue-table__headerContainer___DDkBX div.-esm-service-queues__queue-table__tabletHeading___53e1q > h4');
           
        this.addPatientButton = page.locator('button[aria-label="Search Patient Button"].cds--btn.cds--btn--sm.cds--layout--size-sm.cds--btn--secondary', { hasText: 'Add patient to queue' });
        this.filterDropdownLabel = page.locator('label.cds--label', { hasText: 'Show patients with status:' });
        this.filterTableLabel = page.locator('label.cds--label', { hasText: 'Filter table' });
        this.clearQueueButton = page.locator('button.cds--btn.cds--btn--lg.cds--layout--size-lg.cds--btn--ghost', { hasText: 'Clear queue' });
    }


    async waitForServiceQueuesSection(): Promise<void> {
        await this.serviceQueuesSection.waitFor({ state: 'visible', timeout: 10000 });
    }

    async waitForServiceQueuesPageLoaded(): Promise<void> {
        // Wait for the main section and header to be visible
        await this.serviceQueuesSection.waitFor({ state: 'visible', timeout: 15000 });
        //await this.serviceQueuesHeader.waitFor({ state: 'visible', timeout: 15000 });
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

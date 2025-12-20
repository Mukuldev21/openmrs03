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
    readonly serviceQueuesHeader: Locator;
    readonly clinicBreadcrumb: Locator;
    readonly appointmentsNav: Locator;
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
        // Priority 1: Semantics
        this.homePageHeader = page.getByRole('img', { name: 'OpenMRS Logo' });
        this.userButton = page.getByRole('button', { name: 'My Account' });

        // User menu locators
        this.userMenu = page.getByRole('menu', { name: 'User menu options' });
        // fallback to generic if menu role not present, but trying standard first:
        // If "ul" doesn't have explicit role='menu', standard is list. 
        // But let's stick to the visible text/label approach for items.
        this.userMenuUser = page.getByRole('link', { name: 'User', exact: true });
        this.userMenuChangeLanguage = page.getByRole('link', { name: 'Change language' });
        this.userMenuChangePassword = page.getByRole('link', { name: 'Change password' });
        this.userMenuLogout = page.getByRole('button', { name: 'Logout' });

        // Add Patient - Priority 1: getByRole
        // "Add patient" might be multiple, standards say "Narrow down scope by parent" or use robust unique accessible name.
        // Assuming there is only one "Add patient" button on Home or we are finding it in the App list?
        // Actually, the previous locator was `button[aria-label="Add patient"]`.
        this.resgisterPatientButton = page.getByRole('button', { name: 'Add patient' });

        // Service Queues navigation
        // Priority 1: Semantics. It is an anchor tag.
        this.serviceQueuesNav = page.getByRole('link', { name: 'Service queues' });

        // Service Queues page locators

        // Header: Avoid opaque class 'P5kBN...'. Use content.
        // It is a 'p' tag acting as a header.
        this.serviceQueuesHeader = page.locator('p').filter({ hasText: /^Service queues$/ });

        // Section header: Semantic Heading
        this.serviceQueuesSection = page.getByRole('heading', { name: 'Patients currently in queue' });

        // Breadcrumb: Text content
        this.clinicBreadcrumb = page.locator('p').filter({ hasText: /^Clinic$/ });

        // Add Patient Button in Queue
        // Priority 2: Stable Attribute (aria-label)
        // Reverting from getByRole because the accessible name calculation might be flaky or overridden in CI/CD envs.
        this.addPatientButton = page.locator('button[aria-label="Search Patient Button"]');

        // Filter Controls
        this.filterDropdownLabel = page.getByText('Show patients with status');

        // Filter Table Input
        this.filterTableLabel = page.getByPlaceholder('Search this list');

        // Clear Queue
        this.clearQueueButton = page.getByRole('button', { name: 'Clear queue' });

        // Appointments navigation
        this.appointmentsNav = page.getByText('Appointments', { exact: true });

        // Language change menu
        this.myAccountMenu = page.getByRole('button', { name: 'My Account' });
        // Nested lookup example provided in standards? 
        // Standards: "Priority 3: The Container + Filter Pattern".
        // this.changeLanguageOption = page.getByLabel('Change language').getByRole('button', { name: 'Change' });
        // Refactoring to be safer if label isn't direct parent
        this.changeLanguageOption = page.getByRole('button', { name: 'Change' }).filter({ hasText: 'Change' }); // slightly redundant but if multiple, we'd need container.
        // Let's rely on the previous specific chain if it was working, or simplify.
        // `page.getByLabel('Change language')` finds the element labelled by it.
        this.changeLanguageOption = page.getByLabel('Change language').getByRole('button', { name: 'Change' });

        this.englishLanguageOption = page.getByRole('button', { name: 'English' });

        // Metrics Cards Locators (Priority 3: Container + Filter)
        // Verified via DOM inspection: Cards are .cds--tile elements with specific valid text headers.

        // 1. Checked in patients
        this.checkedInCard = page.locator('.cds--tile').filter({ hasText: 'Checked in patients' });
        this.checkedInLabel = this.checkedInCard.locator('span', { hasText: 'Patients' });
        this.checkedInCount = this.checkedInCard.locator('p'); // The value is in the <p> tag

        // 2. Waiting for
        this.waitingForCard = page.locator('.cds--tile').filter({ hasText: 'Waiting for:' });
        this.waitingForLabel = this.waitingForCard.locator('label', { hasText: 'Waiting for:' });
        this.waitingForCount = this.waitingForCard.locator('p');
        // Dropdown specific to Waiting For card
        this.waitingForFilter = this.waitingForCard.getByRole('combobox');

        // 3. Average wait time
        this.averageWaitCard = page.locator('.cds--tile').filter({ hasText: 'Average wait time today' });
        this.averageWaitLabel = this.averageWaitCard.locator('span', { hasText: 'Minutes' });
        this.averageWaitValue = this.averageWaitCard.locator('p');
    }

    // Metrics Locators
    readonly checkedInCard: Locator;
    readonly checkedInLabel: Locator;
    readonly checkedInCount: Locator;

    readonly waitingForCard: Locator;
    readonly waitingForLabel: Locator;
    readonly waitingForCount: Locator;
    readonly waitingForFilter: Locator;

    readonly averageWaitCard: Locator;
    readonly averageWaitLabel: Locator;
    readonly averageWaitValue: Locator;

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

    async clickAppointmentsNav(): Promise<void> {
        await this.appointmentsNav.click();
    }

    async isAppointmentsPageVisible(): Promise<boolean> {
        // Checking for a specific element unique to Appointments page or just url
        return await this.page.url().includes('appointments');
    }
}
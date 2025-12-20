import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPatientPage extends BasePage {

    readonly page: Page;
    readonly givenNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly familyNameInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly emailInput: Locator;
    readonly addressInput: Locator;
    readonly registerButton: Locator;
    readonly cancelButton: Locator;
    readonly clearFormButton: Locator;
    readonly unknownPatientCheckbox: Locator;
    readonly advancedSearchLink: Locator;
    readonly sex: Locator;
    readonly maleGenderButton: Locator;
    readonly femaleGenderButton: Locator;
    readonly otherGenderButton: Locator;
    readonly unknownGenderButton: Locator;
    //readonly identifierTypeSelect: Locator;
    readonly countryInput: Locator;

    //headers
    readonly newPatientHeader: Locator;
    readonly basicInfoHeader: Locator;
    readonly contactInfoHeader: Locator;
    readonly realtionshipsHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.page = page;
        // Priority 1: Semantics (Accessible Names/Labels)
        this.givenNameInput = page.getByRole('textbox', { name: 'Given Name' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
        this.familyNameInput = page.getByRole('textbox', { name: 'Family Name' });

        // Date picker might be complex. Using Label if possible, or fallback to reliable attribute if strictly standard
        // "Date of Birth" or "Birthdate". Trying Role first.
        this.dateOfBirthInput = page.getByLabel('Date of Birth');

        this.phoneNumberInput = page.getByRole('textbox', { name: 'Telephone Number' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' }); // Check exact label? likely "Email"
        this.addressInput = page.getByRole('textbox', { name: 'Address' }); // Address 1?

        // Buttons
        this.registerButton = page.getByRole('button', { name: 'Register Patient' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.clearFormButton = page.getByRole('button', { name: 'Clear Form' });

        // Checkbox
        this.unknownPatientCheckbox = page.getByRole('checkbox', { name: 'Unknown patient' }); // Guessing label from variable name

        this.advancedSearchLink = page.getByRole('link', { name: 'Advanced Search' });
        this.sex = page.getByRole('heading', { name: 'Sex' });
        this.maleGenderButton = page.getByRole('radio', { name: 'Male', exact: true });
        this.femaleGenderButton = page.getByRole('radio', { name: 'Female', exact: true });
        this.otherGenderButton = page.getByRole('radio', { name: 'Other', exact: true });
        this.unknownGenderButton = page.getByRole('radio', { name: 'Unknown', exact: true });
        //this.identifierTypeSelect = page.locator('select[name="identifierType"]');
        this.countryInput = page.getByRole('textbox', { name: 'Country' });

        //headers
        this.newPatientHeader = page.getByText('Create new patient', { exact: true });
        this.basicInfoHeader = page.getByText('Basic Info', { exact: true });
        this.contactInfoHeader = page.getByText('Contact Details', { exact: true });
        this.realtionshipsHeader = page.getByText('Relationships', { exact: true });
    }

    async enterGivenName(text: string): Promise<void> {
        await this.givenNameInput.fill(text, { force: true });
    }

    async enterMiddleName(text: string): Promise<void> {
        await this.middleNameInput.fill(text, { force: true });
    }

    async enterFamilyName(text: string): Promise<void> {
        await this.familyNameInput.fill(text, { force: true });
    }

    async enterDateOfBirth(date: string): Promise<void> {
        await this.dateOfBirthInput.fill(date, { force: true });
    }

    async enterPhoneNumber(phone: string): Promise<void> {
        await this.phoneNumberInput.fill(phone, { force: true });
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email, { force: true });
    }

    async enterAddress(address: string): Promise<void> {
        await this.addressInput.fill(address, { force: true });
    }

    async clickRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }

    async clickClearFormButton(): Promise<void> {
        await this.clearFormButton.click();
    }

    async checkUnknownPatient(): Promise<void> {
        await this.unknownPatientCheckbox.check();
    }

    async uncheckUnknownPatient(): Promise<void> {
        await this.unknownPatientCheckbox.uncheck();
    }

    async clickAdvancedSearchLink(): Promise<void> {
        await this.advancedSearchLink.click();
    }

    async issexVisible(): Promise<boolean> {
        return await this.sex.isVisible();
    }

    async selectGender(gender: string): Promise<void> {
        switch (gender.toLowerCase()) {
            case 'male':
                await this.maleGenderButton.click();
                break;
            case 'female':
                await this.femaleGenderButton.click();
                break;
            case 'other':
                await this.otherGenderButton.click();
                break;
            case 'unknown':
                await this.unknownGenderButton.click();
                break;
            default:
                throw new Error(`Invalid gender option: ${gender}`);
        }
    }

    /*
    async selectIdentifierType(type: string): Promise<void> {
       // await this.identifierTypeSelect.selectOption(type);
    }*/

    async enterCountry(country: string): Promise<void> {
        await this.countryInput.fill(country);
    }

    async isRegisterButtonVisible(): Promise<boolean> {
        return await this.registerButton.isVisible();
    }

    async isUnknownPatientChecked(): Promise<boolean> {
        return await this.unknownPatientCheckbox.isChecked();
    }

    async getGivenNameValue(): Promise<string> {
        return await this.givenNameInput.inputValue();
    }

    async getFamilyNameValue(): Promise<string> {
        return await this.familyNameInput.inputValue();
    }

    async registerPatient(givenName: string, familyName: string, gender: string, dateOfBirth: string): Promise<void> {
        await this.enterGivenName(givenName);
        await this.enterFamilyName(familyName);
        await this.selectGender(gender);
        await this.enterDateOfBirth(dateOfBirth);
        await this.clickRegisterButton();
    }

    async waitForRegisterPatientPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
        await this.givenNameInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    async isNewPatientHeaderVisible(): Promise<boolean> {
        return await this.newPatientHeader.isVisible();
    }

    async isBasicInfoHeaderVisible(): Promise<boolean> {
        return await this.basicInfoHeader.isVisible();
    }

    async isContactInfoHeaderVisible(): Promise<boolean> {
        return await this.contactInfoHeader.isVisible();
    }

    async isRealtionshipsHeaderVisible(): Promise<boolean> {
        return await this.realtionshipsHeader.isVisible();
    }

}

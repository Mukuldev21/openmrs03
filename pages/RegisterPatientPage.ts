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
    readonly otherGenderButton : Locator;
    readonly unknownGenderButton : Locator;
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
        this.givenNameInput = page.locator('input[name="givenName"]');
        this.middleNameInput = page.locator('input[name="middleName"]');
        this.familyNameInput = page.locator('input[name="familyName"]');
        //this.dateOfBirthInput = page.locator('input[name="birthdate"]');
        this.dateOfBirthInput = page.locator('input[type="date"][name="birthdate"]');
        this.phoneNumberInput = page.locator('input[name="telephoneNumber"]');
        this.emailInput = page.locator('input[name="email"]');
        this.addressInput = page.locator('input[name="address1"]');
        this.registerButton = page.locator('button:has-text("Register Patient")');
        this.cancelButton = page.locator('button:has-text("Cancel")');
        this.clearFormButton = page.locator('button:has-text("Clear Form")');
        this.unknownPatientCheckbox = page.locator('input[type="checkbox"][name="unknown"]');
        this.advancedSearchLink = page.locator('a:has-text("Advanced Search")');
        this.sex = page.getByRole('heading', { name: 'Sex' });
        this.maleGenderButton = page.getByLabel('Male');
        this.femaleGenderButton = page.getByLabel('Female');
        this.otherGenderButton = page.getByLabel('Other');
        this.unknownGenderButton = page.getByLabel('Unknown');
        //this.identifierTypeSelect = page.locator('select[name="identifierType"]');
        this.countryInput = page.getByRole('textbox', { name: 'Country' });

        //headers
        this.newPatientHeader = page.getByText('Create new patient', { exact: true });
        this.basicInfoHeader = page.getByText('Basic Info', { exact: true });
        this.contactInfoHeader = page.getByText('Contact Details', { exact: true });
        this.realtionshipsHeader = page.getByText('Relationships', { exact: true });
    }

    async enterGivenName(text: string): Promise<void> {
        await this.givenNameInput.fill(text);
    }

    async enterMiddleName(text: string): Promise<void> {
        await this.middleNameInput.fill(text);
    }

    async enterFamilyName(text: string): Promise<void> {
        await this.familyNameInput.fill(text);
    }

    async enterDateOfBirth(date: string): Promise<void> {
        await this.dateOfBirthInput.fill(date);
    }

    async enterPhoneNumber(phone: string): Promise<void> {
        await this.phoneNumberInput.fill(phone);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterAddress(address: string): Promise<void> {
        await this.addressInput.fill(address);
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
        await this.page.waitForLoadState('domcontentloaded');
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
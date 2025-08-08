import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator
    readonly purchaseForeignCurrencyTab: Locator
    readonly currencySelector: Locator
    readonly currencyRateText: Locator
    readonly conversionAmountInput: Locator
    readonly inDollarsRadioButton: Locator
    readonly calculateCostsButton: Locator
    readonly conversionAmountText: Locator
    readonly purchaseButton: Locator
    readonly alertMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator('#sp_payee')
        this.payeeDetailsButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
        this.purchaseForeignCurrencyTab = page.locator('text=Purchase Foreign Currency')
        this.currencySelector = page.locator('#pc_currency')
        this.currencyRateText = page.locator('#sp_sell_rate')
        this.conversionAmountInput = page.locator('#pc_amount')
        this.inDollarsRadioButton = page.locator('#pc_inDollars_true')
        this.calculateCostsButton = page.locator('#pc_calculate_costs')
        this.conversionAmountText = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.alertMessage = page.locator('#alert_content')
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption('apple')
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption('6')
        await this.amountInput.fill('5000')
        await this.dateInput.fill('2025-11-09')
        await this.descriptionInput.fill('Some message')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted')
    }

    async selectCurrency(currencyCode) {
        await this.purchaseForeignCurrencyTab.click()
        await this.currencySelector.selectOption(currencyCode)
        switch (currencyCode) {
            case 'EUR':
                await expect(this.currencyRateText).toContainText('1 euro (EUR) = 1.3862 U.S. dollar (USD)')
                break
            default:
                throw new Error('Currency Code is not valid')
        }
    }

    async exchangeCurrency(amount) {
        await this.conversionAmountInput.fill(amount.toString())
        await this.inDollarsRadioButton.click()
        await this.calculateCostsButton.click()
        await expect(this.conversionAmountText).toContainText('euro (EUR) = ')
        await this.purchaseButton.click()
    }

    async assertSuccessfulExchange(){
        await expect(this.alertMessage).toContainText('Foreign currency cash was successfully purchased.')
    }
}
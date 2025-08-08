import { expect, Locator, Page } from '@playwright/test'

export class AccountActivityPage {
    readonly page: Page
    readonly accountSelector: Locator
    readonly transactionList: Locator
    readonly noResultsMessage: Locator

    constructor (page: Page) {
        this.page = page
        this.accountSelector = page.locator('#aa_accountId')
        this.transactionList = page.locator('#all_transactions_for_account tbody tr')
        this.noResultsMessage = page.locator('.well')
    }

    async selectAccountType(type){
        switch (type) {
            case 'Checking':
                await this.accountSelector.selectOption('2')
                break
            case 'Loan':
                await this.accountSelector.selectOption('4')
                break
            case 'No Results':
                await this.accountSelector.selectOption('6')
                break
            default:
                throw new Error('Such account type does not exist')
        }
    }

    async assertTransactionCount(count){
        await expect(this.transactionList).toHaveCount(count)
    }

    async assertNoResults(){
        await expect(this.noResultsMessage).toBeVisible()
    }
}
import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Currency Exchange", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test("Currency exchange", async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')
        await page.fill('#pc_amount', '500')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        const conversionAmount = page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('360.70 euro (EUR) = 500.00 U.S. dollar (USD)')
        await page.click('#purchase_cash')
        const successMessage = page.locator('#alert_content')
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toContainText('Foreign currency cash was successfully purchased.')
    })
})
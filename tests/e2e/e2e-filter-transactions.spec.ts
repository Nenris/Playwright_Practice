import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { AccountActivityPage } from '../../page-objects/AccountActivityPage'

test.describe("Filter Transactions", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    let navbar: Navbar
    let accountActivityPage: AccountActivityPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        navbar = new Navbar(page)
        accountActivityPage = new AccountActivityPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test("Verify the results for each account", async ({ page }) => {
        await navbar.clickOnTab('Account Activity')
        await accountActivityPage.selectAccountType('Checking')
        await accountActivityPage.assertTransactionCount(3)

        await accountActivityPage.selectAccountType('Loan')
        await accountActivityPage.assertTransactionCount(2)

        await accountActivityPage.selectAccountType('No Results')
        await accountActivityPage.assertNoResults()
    })
})
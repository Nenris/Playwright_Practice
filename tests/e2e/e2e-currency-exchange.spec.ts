import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe("Currency Exchange", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let paymentPage: PaymentPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        paymentPage = new PaymentPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })

    test("Currency exchange", async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')
        await paymentPage.selectCurrency('EUR')
        await paymentPage.exchangeCurrency(500)
        await paymentPage.assertSuccessfulExchange()
    })
})
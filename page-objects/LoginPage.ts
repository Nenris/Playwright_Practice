import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong')
    }

    async snapshotLoginForm() {
        const screenshot = await this.loginForm.screenshot();
        await expect(screenshot).toMatchSnapshot('login-form.png');
    }

    async snapshotErrorMessage() {
        const screenshot = await this.errorMessage.screenshot();
        await expect(screenshot).toMatchSnapshot('error-message.png');
    }
}
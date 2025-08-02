import { test, expect } from '@playwright/test'

test.describe("Example.com tests", () => {
  test("Simple basic test @example", async ({ page }) => {
    await page.goto("https://www.example.com")
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")
  })

  test("Assertions @example", async ({ page }) => {
    await page.goto("https://www.example.com")
    await expect(page).toHaveURL("https://www.example.com")
    await expect(page).toHaveTitle("Example Domain")

    const element = await page.locator("h1")
    await expect(element).toBeVisible()
    await expect(element).toHaveText("Example Domain")
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
    })

    test("Screenshots @example", async ({ page }) => {
    await page.goto("https://www.example.com")
    await page.screenshot({ path: "screenshot.png", fullPage: true})
    })

    test("Single element screenshot @example", async ({ page }) => {
      await page.goto("https://www.example.com")
      const element = await page.$('h1')
      if (!element) throw new Error('Элемент <h1> не найден!');
      await element.screenshot({ path: "single_element_screenshot.png" })
    })
  })



test("Clicking on Elements", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.click("text=Sign in")
    
    const errorMessage = await page.locator(".alert-error")
    await expect (errorMessage).toContainText("Login and/or password are wrong.")
})

test.skip("Selectors", async ({ page }) => {
    //text
    await page.click("text=some text")
    //CSS selectors:
    await page.click("button")
    //ID
    await page.click("#id")
    //class
    await page.click("class")
    //Only visible css selector
    await page.click(".submit-button:visible")
    //Combinations
    await page.click("#username .first") //Id .Class
    //XPath
    await page.click("//button")
}) 

test("Working with inputs", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.fill('#user_login', 'someusername')
    await page.fill('#user_password', 'somepassword')
    await page.click("text=Sign in")
    const errorMessage = await page.locator(".alert-error")
    await expect (errorMessage).toContainText("Login and/or password are wrong.")
    })



test("Screenshots", async ({ page }) => {

})

test("", async ({ page }) => {
})
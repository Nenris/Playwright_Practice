import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe.only("Tips and tricks section", () => {
    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto('http://www.example.com')
        console.log(testInfo.title)
        let newNumber = await getRandomNumber()
        let newString = await getRandomString()

        console.log(newNumber)
        console.log(newString)
    })

    test("Test skip browser", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature is not ready in Chrome browser")
        await page.goto('http://www.example.com')
    })

    test("Test fixme annotation", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        await page.goto('http://www.example.com')
    })

    const people = ["Mike", "Judy", "Peter", "Elon", "Alice"]
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.fill('#searchTerm', `${name}`)
        await page.waitForTimeout(3000)
    })
    }

    test("Mouse movement simulation", async ({page}) => {
        await page.goto("https://www.example.com")
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.move(100, 100)
        await page.mouse.up()
    })

    test("Multiple page tabs", async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto("https://www.example.com")
        await page2.goto("https://www.example.com")
        await page3.goto("https://www.example.com")
        await page1.waitForTimeout(5000)
    })
})

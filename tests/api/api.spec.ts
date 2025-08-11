import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseUrl = 'https://reqres.in/api'
    const ApiKey = 'reqres-free-v1'

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`, {
            headers: {
                'x-api-key': ApiKey
            }            
        })
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`, {
            headers: {
                'x-api-key': ApiKey
            }            
        })
        expect(response.status()).toBe(404)
    })

    test("GET Request - Get user detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`, {
            headers: {
                'x-api-key': ApiKey
            }            
        })
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

        test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            headers: {
                'x-api-key': ApiKey
            },
            data: {
                id: 1000,
            }      
        })
        expect(response.status()).toBe(201)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST Request - Login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            headers: {
                'x-api-key': ApiKey
            },
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }      
        })
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()
    })

    test("POST Request - Login Fail", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            headers: {
                'x-api-key': ApiKey
            },
            data: {
                email: 'eve.holt@reqres.in'
            }      
        })
        expect(response.status()).toBe(400)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBe("Missing password")
    })

    test("PUT Request - Update User", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            headers: {
                'x-api-key': ApiKey
            },
            data: {
                name: 'new name',
                job: 'new job'
            }      
        })
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("DELETE Request - Update User", async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`, {
            headers: {
                'x-api-key': ApiKey
            }    
        })
        expect(response.status()).toBe(204)
    })
})
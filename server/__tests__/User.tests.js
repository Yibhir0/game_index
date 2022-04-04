const supertest = require('supertest')
const app = require("../app")
const request = supertest(app)
const db = require('../mongoose/db')
const User = require('../mongoose/models/userSchema')
const mongoose = require('mongoose')

describe('Test /users/:id', () => {
    test('Should get a specific user', async () => {
        const response = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(200)
        expect(response.type).toMatch('application/json')
        expect(response._body.name).toBe('Nael Louis')
    })
})
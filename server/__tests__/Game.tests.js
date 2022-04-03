const supertest = require('supertest')
const app = require("../app")
const request = supertest(app)
const db = require('../mongoose/db')
const router = require('../routes/api')

beforeAll(async () => await db.connectToDB());
afterAll(async () => await db.closeDB());

describe('Test /games', () => {
    test('should return the list of games', async () => {
        const response = await request.get('/api/games')
        expect(response.status).toEqual(200)
        expect(response.type).toMatch('application/json')
        expect(response._body[0].name).toBe('Wii Sports')
    })
})

describe('Test /games/:id', () => {
    test('Should return a specific game', async () => {
        const response = await request.get('/api/games/623ca8d6daa8ca47ebf7a682')
        expect(response.status).toBe(200)
        expect(response.type).toMatch('application/json')
        expect(response._body.name).toBe('Super Mario Bros.')
    })
})

describe('Test /games/:id/feedback', () => {
    test('Should return the comments on a specific game', async () => {
        const response = await request.get('/api/games/623ca8d6daa8ca47ebf7a68d/feedback')
        expect(response.status).toBe(200)
        expect(response.type).toMatch('application/json')
        expect(response._body[0].comment).toBe('sick game.')
    })
})




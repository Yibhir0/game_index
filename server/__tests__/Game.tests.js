const supertest = require('supertest')
const app = require("../app")
const request = supertest(app)
const db = require('../mongoose/db')
const router = require('../routes/api')
const FeedBack = require('../mongoose/models/feedbackSchema')
const mongoose = require('mongoose')

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

describe('Test /games/filter', () => {
    test('Should return a list of game where the filter apply', async () => {
        const response = await request.get('/api/games/filter?keywords=&year=1992&publisher=&genre=&platform=')
        expect(response.status).toBe(200)
        expect(response.type).toMatch('application/json')
        expect(response._body[0].name).toBe('Super Mario Land 2: 6 Golden Coins')
        expect(response._body.length).toEqual(29)
    })
})

describe('Test /games/:id/feedback Post', () => {
    test('Should post a comment under a specific game', async () => {
        const comments = await request.get('/api/games/623ca8d6daa8ca47ebf7a68d/feedback')
        const count = comments._body.length
        var gameId = new mongoose.Types.ObjectId('623ca8d6daa8ca47ebf7a68d')
        var userId = new mongoose.Types.ObjectId('56cb91bdc3464f14678934ba')
        let feedback = await FeedBack.create({
            gameID: gameId,
            userID: userId,
            comment: "I love this game!",
            rating: 2
        })
        const postComment = await request.post('/api/games/623ca8d6daa8ca47ebf7a68d/feedback').send(feedback)
        const newComments = await request.get('/api/games/623ca8d6daa8ca47ebf7a68d/feedback')
        expect(newComments._body.length).toEqual(count + 1)
        expect(postComment.status).toBe(200)
        await FeedBack.findByIdAndDelete({ _id: feedback._id })
    })
})




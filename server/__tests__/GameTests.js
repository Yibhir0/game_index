const request = require('supertest')
const db = require('../mongoose/db')
const mockinggoose = require("mockingoose")
const api = require("../routes/api")
const games = require("../mongoose/models/gameSchema")
// const express = require('express');
// const app = express()

// beforeAll(async () => await db.connectToDB());
// afterAll(async () => await db.closeDB());

// describe('Test /games', () => {
//     test('should return the list of games', async () => {
//         mockinggoose(games).toReturn([
//             {
//                 jpsales: 3770000,
//                 nasales: 41490000,
//                 othersales: 8460000,
//                 eusales: 29020000,
//                 platform: ["Wii"],
//                 year: 2006,
//                 publisher: "Nintendo",
//                 esrbrating: "E",
//                 criticscore: 3.8,
//                 globalsales: 82780000,
//                 name: "Wii Sports",
//                 genre: "Sports",
//                 image_URL: ["wii_sports_wii.jpg"],
//             },
//             {
//                 jpsales: 3870000,
//                 nasales: 42490000,
//                 othersales: 8560000,
//                 eusales: 29120000,
//                 platform: ["PS4"],
//                 year: 2007,
//                 publisher: "Nintendo",
//                 esrbrating: "E",
//                 criticscore: 3.8,
//                 globalsales: 82780000,
//                 name: "Other Game 1",
//                 genre: "Sports",
//                 image_URL: ["other_game_ps4.jpg"],  
//             }
//         ], 'find')
//         const response = await request(api).get('/games')
//         expect(response.statusCode).toEqual(200)
//         // expect(response.type).toMatch('application/json')
//         // expect(response[0].name).toBe('Wii Sports')
//     })
// })

describe('Test /games/:id', () => {
    it('Should return a specific game', async () => {
        mockinggoose(games).toReturn({
            jpsales: 3770000,
            nasales: 41490000,
            othersales: 8460000,
            eusales: 29020000,
            platform: ["Wii"],
            year: 2006,
            publisher: "Nintendo",
            esrbrating: "E",
            criticscore: 3.8,
            globalsales: 82780000,
            name: "Wii Sports",
            genre: "Sports",
            image_URL: ["wii_sports_wii.jpg"],
        }, 'findOne')
        const response = await request(api).get('/games/623ca8d6daa8ca47ebf7a681')
        expect(response.status).toEqual(200)
        expect(response.type).toMatch('application/json')
    })
})




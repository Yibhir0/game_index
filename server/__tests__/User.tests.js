const supertest = require('supertest')
const app = require("../app")
const request = supertest(app)

describe('Test /users/:id get', () => {
    test('Should get a specific user', async () => {
        const response = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(200)
        expect(response.type).toMatch('application/json')
        expect(response._body.name).toBe('Nael Louis')
    })
})

describe('Test /users/:id post', () => {
    test('Should update the bio of a specific user', async () => {
        const response = await request.post('/api/users/6241f2f9daa8ca47eb711649/bio?desc=No Role Modelz')
        const userBio = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(201)
        expect(userBio._body.bio).toBe('No Role Modelz')
    })

    test('Should create a list for a specific user', async () => {
        const response = await request.post('/api/users/6241f2f9daa8ca47eb711649/list?name=Favorites')
        const user = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(201)
        expect(user._body.lists[0].name).toBe('Favorites')
    })

    test('Should add a game to a specific list for a specific user', async () => {
        const response = await request.post('/api/users/6241f2f9daa8ca47eb711649/list/addGame?gameId=623ca8d6daa8ca47ebf7a682&index=0')
        const user = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(201)
        expect(user._body.lists[0].games[0].name).toBe('Super Mario Bros.')
    })

    test('Should delete a game from a specific list for a specific user', async () => {
        const response = await request.post('/api/users/6241f2f9daa8ca47eb711649/list/delGame?gameId=623ca8d6daa8ca47ebf7a682&index=0')
        const user = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(201)
        expect(user._body.lists[0].games.length).toEqual(0)
    })

    test('Should delete a list for a specific user', async () => {
        const response = await request.post('/api/users/6241f2f9daa8ca47eb711649/delList?name=Favorites')
        const user = await request.get('/api/users/6241f2f9daa8ca47eb711649')
        expect(response.status).toBe(201)
        expect(user._body.lists.length).toEqual(0)
    })
})
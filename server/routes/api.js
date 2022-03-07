const express = require('express');
const router = express.Router();
const games = require('../controllers/games');

const feedback = require('../controllers/feedback');

/**
 * @swagger 
 * /games:
 *   get:  
 *     summary: Retrieve a list of games
 *     description: Retrieve a list of games from our gamedata collection from mongoDB. WARNING, DO NOT EXECUTE QUERY HERE!
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   description: ObjectId created by MongoDB.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 jpsales:
 *                   type: number
 *                   description: The number of sales made in Japan. 
 *                   example: 18
 *                 nasales:
 *                   type: number
 *                   description: The number of sales made in North America.
 *                   example: 20
 *                 othersales:
 *                   type: number
 *                   description: The number of sales made in other regions.
 *                   example: 22
 *                 eusales:
 *                   type: number
 *                   description: The number of sales made in Europe.
 *                   example: 24
 *                 platform:
 *                   type: string
 *                   description: The platform the game is on.
 *                   example: PS3
 *                 year:
 *                   type: number
 *                   description: The year the game was released.
 *                   example: 2019
 *                 publisher:
 *                   type: string
 *                   description: The name of the publisher.
 *                   example: Rockstar Games
 *                 esrbrating:
 *                   type: string
 *                   description: The rating of the game.
 *                   example: M
 *                 criticscore:
 *                   type: number
 *                   description: The critic score of the game.
 *                   example: 2.7
 *                 globalsales:
 *                   type: number
 *                   description: The global sales made.
 *                   example: 26
 *                 name:
 *                   type: string
 *                   description: The name of the game.
 *                   example: Grand theft Auto V
 *                 genre: 
 *                   type: string
 *                   description: The genre of the game.
 *                   example: Action
 *                 feedback:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       gameID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       userID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       comment: 
 *                         type: string
 *                         description: The comment posted by a user.
 *                         example: Super game!
 *                       rating:
 *                         type: number
 *                         description: The rating attributed to the game by the user.
 *                         example: 4.7
 *                 userrating:
 *                   type: number
 *                   description: The rating attributed to the game by the users.
 *                   example: 3.5                    
 */
router.get('/games', games.getGames);

/**
 * @swagger 
 * /games/filter:
 *   get:  
 *     summary: Retrieve a list of games
 *     description: Retrieve a list of games from our gamedata collection from mongoDB that match the filter that the user entered. WARNING, DO NOT EXECUTE QUERY HERE!
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   description: ObjectId created by MongoDB.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 jpsales:
 *                   type: number
 *                   description: The number of sales made in Japan. 
 *                   example: 18
 *                 nasales:
 *                   type: number
 *                   description: The number of sales made in North America.
 *                   example: 20
 *                 othersales:
 *                   type: number
 *                   description: The number of sales made in other regions.
 *                   example: 22
 *                 eusales:
 *                   type: number
 *                   description: The number of sales made in Europe.
 *                   example: 24
 *                 platform:
 *                   type: string
 *                   description: The platform the game is on.
 *                   example: PS3
 *                 year:
 *                   type: number
 *                   description: The year the game was released.
 *                   example: 2019
 *                 publisher:
 *                   type: string
 *                   description: The name of the publisher.
 *                   example: Rockstar Games
 *                 esrbrating:
 *                   type: string
 *                   description: The rating of the game.
 *                   example: M
 *                 criticscore:
 *                   type: number
 *                   description: The critic score of the game.
 *                   example: 2.7
 *                 globalsales:
 *                   type: number
 *                   description: The global sales made.
 *                   example: 26
 *                 name:
 *                   type: string
 *                   description: The name of the game.
 *                   example: Grand theft Auto V
 *                 genre: 
 *                   type: string
 *                   description: The genre of the game.
 *                   example: Action
 *                 feedback:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       gameID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       userID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       comment: 
 *                         type: string
 *                         description: The comment posted by a user.
 *                         example: Super game!
 *                       rating:
 *                         type: number
 *                         description: The rating attributed to the game by the user.
 *                         example: 4.7
 *                 userrating:
 *                   type: number
 *                   description: The rating attributed to the game by the users.
 *                   example: 3.5                    
 */
router.get('/games/filter', games.getGamesByFilter);

/**
 * @swagger 
 * /games/{id}:
 *   get:
 *     summary: One specific game
 *     description: Retrieve one specific game from the database by its id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ObjectId fo the game to retrieve generated by mongoDB.
 *     responses:
 *       200:
 *         description: One specific game from mongo collection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   description: ObjectId created by MongoDB.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 jpsales:
 *                   type: number
 *                   description: The number of sales made in Japan. 
 *                   example: 18
 *                 nasales:
 *                   type: number
 *                   description: The number of sales made in North America.
 *                   example: 20
 *                 othersales:
 *                   type: number
 *                   description: The number of sales made in other regions.
 *                   example: 22
 *                 eusales:
 *                   type: number
 *                   description: The number of sales made in Europe.
 *                   example: 24
 *                 platform:
 *                   type: string
 *                   description: The platform the game is on.
 *                   example: PS3
 *                 year:
 *                   type: number
 *                   description: The year the game was released.
 *                   example: 2019
 *                 publisher:
 *                   type: string
 *                   description: The name of the publisher.
 *                   example: Rockstar Games
 *                 esrbrating:
 *                   type: string
 *                   description: The rating of the game.
 *                   example: M
 *                 criticscore:
 *                   type: number
 *                   description: The critic score of the game.
 *                   example: 2.7
 *                 globalsales:
 *                   type: number
 *                   description: The global sales made.
 *                   example: 26
 *                 name:
 *                   type: string
 *                   description: The name of the game.
 *                   example: Grand theft Auto V
 *                 genre: 
 *                   type: string
 *                   description: The genre of the game.
 *                   example: Action
 *                 feedback:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       gameID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       userID:
 *                         type: object
 *                         description: ObjectId created by MongoDB.
 *                         example: 621b8ef1843a083862da7de7
 *                       comment: 
 *                         type: string
 *                         description: The comment posted by a user.
 *                         example: Super game!
 *                       rating:
 *                         type: number
 *                         description: The rating attributed to the game by the user.
 *                         example: 4.7
 *                 userrating:
 *                   type: number
 *                   description: The rating attributed to the game by the users.
 *                   example: 3.5
 */
router.get('/games/:id', games.getGame);

router.get('/', games.goHome);

router.get('/games/:id/feedback', feedback.getComments);

router.post('/games/:id/feedback', feedback.addComment);

// Parser middleware will parse the json payload
router.use(express.json());


module.exports = router;
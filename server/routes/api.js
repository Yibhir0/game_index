const express = require('express');
const router = express.Router();
const games = require('../controllers/games');
const dotenv = require('dotenv');
dotenv.config();
const feedback = require('../controllers/feedback');
const users = require('../controllers/users');

/**
 * @swagger 
 * /games:
 *   get:  
 *     summary: Retrieve a list of games.
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
 *     summary: Retrieve a list of games.
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
 *     summary: Retrieve one specific game.
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve the homepage.
 *     description: Return the user to the homepage.
 *     responses: 
 *       200: 
 *         description: Homepage.
 */
router.get('/', games.goHome);

/**
 * @swagger 
 * /games/{id}/feedback:
 *   get:
 *     summary: Retrieve a list of comments under a particular game.
 *     description: Retrieve a list of comments posted under a particular game from mongoDB. Can be a bunch of fake comments during testing and prototyping.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ObjectId fo the game to retrieve generated by mongoDB.
 *     responses:
 *       200: 
 *         description: A list of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 _id:
 *                   type: object
 *                   description: ObjectId generated by mongoDB at the time of insertion.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 gameID:
 *                   type: object
 *                   description: ObjectId generated by mongoDB. Represent the id of the game the comment was posted under.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 userID:
 *                   type: object
 *                   description: ObjectId generated by mongoDB. Represent the id of the user who posted the comment.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 comment:
 *                   type: string
 *                   description: The comment text posted.
 *                   example: Excellent game!
 *                 rating:
 *                   type: number
 *                   description: The personal rating the user gave to the game.
 *                   example: 3.8
 */
router.get('/games/:id/feedback', feedback.getComments);

/**
 * @swagger
 * /games/{id}/feedback:
 *   post:
 *     summary: Create a comment under a game.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ObjectId fo the game to retrieve generated by mongoDB.
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   description: ObjectId generated by mongoDB at the time of insertion.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 gameID:
 *                   type: object
 *                   description: ObjectId generated by mongoDB. Represent the id of the game the comment was posted under.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 userID:
 *                   type: object
 *                   description: ObjectId generated by mongoDB. Represent the id of the user who posted the comment.
 *                   example: 620d6ef065ee1d5092d1c795
 *                 comment:
 *                   type: string
 *                   description: The comment text posted.
 *                   example: Excellent game!
 *                 rating:
 *                   type: number
 *                   description: The personal rating the user gave to the game.
 *                   example: 3.8
 */
router.post('/games/:id/feedback', feedback.addComment);

router.post("/users/login", users.postUser);

router.delete("/users/logout", users.logOutUser);

router.get("/users/:id", users.getUser);

// Parser middleware will parse the json payload
router.use(express.json());


module.exports = router;
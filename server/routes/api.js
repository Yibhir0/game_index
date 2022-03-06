const express = require('express');
const router = express.Router();
const games = require('../controllers/games');
const dotenv = require('dotenv');
dotenv.config();
const feedback = require('../controllers/feedback');
const users = require('../controllers/users');
router.get('/games', games.getGames);

router.get('/games/filter', games.getGamesByFilter);

router.get('/games/:id', games.getGame);

router.get('/', games.goHome);

router.get('/games/:id/feedback', feedback.getComments);

router.post('/games/:id/feedback', feedback.addComment);

router.post("/users/login", users.postUser);

router.delete("/users/logout", users.logOutUser);

// Parser middleware will parse the json payload
router.use(express.json());


module.exports = router;
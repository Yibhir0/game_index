const express = require('express');
const router = express.Router();
const games = require('../controllers/games');

const feedback = require('../controllers/feedback');

router.get('/games', games.getGames);

router.get('/games/:id', games.getGame);

router.get('/games/name/:keyword', games.getGamesByName);

router.get('/', games.goHome);

router.get('/games/:id/feedback', feedback.getComments);

router.post('/games/:id/feedback', feedback.addComment);

// Parser middleware will parse the json payload
router.use(express.json());


module.exports = router;
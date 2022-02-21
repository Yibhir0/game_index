const express = require('express');
const router = express.Router();
const games = require('../controllers/games');

router.get('/games', games.getGames);

router.get('/', games.goHome);

router.get('/games/:id', games.getById);

module.exports = router;
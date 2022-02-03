const express = require('express');
const router = express.Router();
const games = require('../controllers/games');

router.get('/games', games.getGames);

router.get('/', games.goHome);

module.exports = router;
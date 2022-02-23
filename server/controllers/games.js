const db = require('../mongoose/db');

let games = [{
    "_id": "222222222222",
    "name": "Tetris",
    "rank": 6,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc.",
}];

// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {
        res.status(200).json(games);
    }
    catch (error) {
        res.satus(404).json({ message: error.message })
    }
};

// Response for home page
exports.goHome = async (req, res) => {
    try {
        res.send('Games Index');
    }
    catch (error) {
        res.satus(404).json({ message: error.message })
    }
};

// Response for endpoint /game/{id}
exports.getGame = async (req, res) => {
    try {
       const readyState = await db.connectToDB();
       if (readyState === 1) {
           const game = await db.getGame(req.params.id)
           //return the feedbacks and the game
           res.send(game)
       }
       else {
           res.status(404).json({ message: "Could not connect to the database" })
       }
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
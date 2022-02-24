const db = require('../mongoose/db');

// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            const games = await db.getGames();
            res.send(games);
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Response for a specific page
exports.getGame = async (req, res) => {
    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            const game = await db.getGame(req.params.id)
            res.send(game)
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Response for filtering games
exports.getGamesByFilter = async (req, res) => {
    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let filters = {
                keywords: req.query.keywords,
                year: req.query.year,
            };

            console.log(filters);
            const games = await db.getGamesByFilter(filters)
            res.send(games)
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Response for home page
exports.goHome = async (req, res) => {
    try {
        res.send('Games Index');
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

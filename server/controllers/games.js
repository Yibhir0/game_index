const db = require('../mongoose/db');
const cache = require("memory-cache");

// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {
        let response = cache.get("allGames")
        if (!response) {
            const readyState = await db.connectToDB();
            if (readyState === 1) {
                response = await db.getGames();
                cache.put("allGames", response)

            }
            else {
                res.status(404).json({ message: "Could not connect to the database" })
            }
        }
        res.send(response);
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Response for a specific page
exports.getGame = async (req, res) => {
    try {
        let query = "game" + req.params.id
        let response = cache.get(query)
       
        if (!response) {

            const readyState = await db.connectToDB();

            if (readyState === 1) {

                response = await db.getGame(req.params.id)

                cache.put(query, response)

            }
            else {
                res.status(404).json({ message: "Could not connect to the database" })
            }
        }

        res.send(response)
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
                publisher: req.query.publisher,
                genre: req.query.genre,
                platform: req.query.platform
            };

            const games = await db.getGamesByFilter(filters);
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

// Response for home page
exports.goHome = async (req, res) => {
    try {
        res.send('Games Index');
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

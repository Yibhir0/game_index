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
        let query = "games" + req.query.keywords + req.query.year + req.query.publisher + req.query.genre + req.query.platform
        let response = cache.get(query)
        if (!response) {
            const readyState = await db.connectToDB();
            if (readyState === 1) {

                let filters = {
                    keywords: req.query.keywords,
                    year: req.query.year,
                    publisher: req.query.publisher,
                    genre: req.query.genre,
                    platform: req.query.platform
                };

                //console.log(filters);
                response = await db.getGamesByFilter(filters)
                cache.put(query, games)

            }
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }

        res.send(response)
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

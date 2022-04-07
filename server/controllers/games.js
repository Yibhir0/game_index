const db = require('../mongoose/db');
const cache = require("memory-cache");

// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {
        //Get the cache 
        let response = cache.get("allGames")
        //If there's no instance of cache 
        if (!response) {
            //Connect to the db
            const readyState = await db.connectToDB();
            //If the connection is successful
            if (readyState === 1) {
                //Get all the games from the db
                response = await db.getGames();
                //Put the response in cache
                cache.put("allGames", response)

            }
            //Else set status to 404
            else {
                res.status(404)
            }
        }
        //Send the response 
        res.send(response);
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Response for a specific page
exports.getGame = async (req, res) => {
    try {
        //Connect to db
        const readyState = await db.connectToDB();
        //If the connection is successful
        if (readyState === 1) {
            //Get the specific game from the db using the id in request and return that game
            response = await db.getGame(req.params.id)
            res.send(response);
        }
        //Else set the status to 404
        else {
            res.status(404)
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

            //Create the filters from the request
            let filters = {
                keywords: req.query.keywords,
                year: req.query.year,
                publisher: req.query.publisher,
                genre: req.query.genre,
                platform: req.query.platform
            };

            //Fetch the games that are true to the filters and send it back
            const games = await db.getGamesByFilter(filters);
            res.send(games);

        }
        else {
            res.status(404)
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

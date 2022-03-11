const { createSecureServer } = require("http2");
const db = require("../mongoose/db");

// Create list and add to user
exports.createList = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            let list = {
                name: req.query.name,
                games: [],
            }

            let userId = req.params.id;

            const listCreated = await db.createList(list, userId);

            console.log(listCreated)

            // req.session.userId = user.id
            res.status(201)
            res.end("List successfully created!");
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create list and add to user
exports.addGameToList = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            
            let listIndex = req.query.index;
            let userId = req.params.id;
            let gameId = req.query.gameId;

            console.log(listIndex);
            console.log(userId);
            console.log(gameId);
            const gameAdded = await db.addGameToList(userId, listIndex, gameId);

            console.log(gameAdded)

            // req.session.userId = user.id
            res.status(201)
            res.end("Game successfully added!");
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
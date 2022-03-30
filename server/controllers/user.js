const { createSecureServer } = require("http2");
const db = require("../mongoose/db");

// Update user bio
exports.updateBio = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let userId = req.params.id;
            let desc = req.query.desc;

            const bioUpdated = await db.updateBio(userId, desc);

            res.status(201)
            res.end("Bio successfully updated!");
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

// Delete list from user
exports.deleteList = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let userId = req.params.id;
            let listName = req.query.name;

            const listDeleted = await db.deleteList(userId, listName);

            console.log(listDeleted)

            res.status(201)
            res.end("List successfully deleted.");
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Add game to list
exports.addGameToList = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let listIndex = req.query.index;
            let userId = req.params.id;
            let gameId = req.query.gameId;

            const gameAdded = await db.addGameToList(userId, listIndex, gameId);

            console.log(gameAdded)

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

// Remove game from a list
exports.removeGameFromList = async (req, res) => {

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let listIndex = req.query.index;
            let userId = req.params.id;
            let gameId = req.query.gameId;

            const gameRemoved = await db.removeGameFromList(userId, listIndex, gameId);

            console.log(gameRemoved)

            res.status(201)
            res.end("Game successfully removed.");
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};


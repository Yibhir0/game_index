const { createSecureServer } = require("http2");
const db = require("../mongoose/db");

// Update user bio
exports.updateBio = async (req, res) => {

    try {
        //Connect to the db and if the connection is successful
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            let userId = req.params.id;
            let desc = req.query.desc;

            //Update the bio of a specific user using the id in query and the description in query
            const bioUpdated = await db.updateBio(userId, desc);

            //Set the status to 201 and end the operation with a message to say it was successful
            res.status(201)
            res.end("Bio successfully updated!");
        }
        else {
            res.status(404)
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
            //Create the list object 
            let list = {
                //Set the name to the name in the request
                name: req.query.name,
                games: [],
            }

            //Get the user id from the request
            let userId = req.params.id;

            //Create the list in the lists field of the user
            const listCreated = await db.createList(list, userId);

            //Set status to 201 and end the operation with a message 
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

            //Delete the list from the user document
            const listDeleted = await db.deleteList(userId, listName);

            //Set status to 201 and end the operation with a message 
            res.status(201)
            res.end("List successfully deleted.");
        }
        else {
            res.status(404)
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

            //Add the game to the user list
            const gameAdded = await db.addGameToList(userId, listIndex, gameId);

            //Set status to 201 and end the operation with a message 
            res.status(201)
            res.end("Game successfully added!");
        }
        else {
            res.status(404)
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

            //Remove the game from the list of the user
            const gameRemoved = await db.removeGameFromList(userId, listIndex, gameId);

            //Set status to 201 and end the operation with a message 
            res.status(201)
            res.end("Game successfully removed.");
        }
        else {
            res.status(404)
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};


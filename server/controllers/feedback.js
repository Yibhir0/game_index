const db = require("../mongoose/db");
const cache = require("memory-cache");

// Response for a specific game comments
exports.getComments = async (req, res) => {
    try {
        //Connect to the db
        const readyState = await db.connectToDB();
        //If the connection is successful
        if (readyState === 1) {
            //fetch all the comments from the db where the game id is equal to the one in request
            const comments = await db.getFeedbacks(req.params.id)
            //Return that array of comments
            res.send(comments)
        }
        //Else set the status as 404
        else {
            res.status(404)
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Post comment for a specific game
exports.addComment = async (req, res) => {
    try {
        //Connect to the db
        const readyState = await db.connectToDB()
        //If the connection is successful
        if (readyState === 1) {
            //Add the comment to the db
            const r = await db.addFeedback(req.body);
            //Return that json returned by mongoose function addFeedback
            res.json(r);
        }
        else {
            res.status(404)
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


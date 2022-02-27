const db = require("../mongoose/db");




// Response for a specific game comments
exports.getComments = async (req, res) => {
    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            const comments = await db.getFeedbacks(req.params.id)
            res.send(comments)
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Post comment for a specific game
exports.addComment = async (req, res) => {
    try {
        const readyState = await db.connectToDB()
        if (readyState === 1) {
            await db.addFeedback(req.body)

        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


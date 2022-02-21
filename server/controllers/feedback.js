const db = require("../mongoose/db");

let feedback = [
    {
        "gameId": "222222222222",
        "userId": "234",
        "comment": "Nice Game",
        "rating": 3,
    },
    {
        "gameId": "222222222222",
        "userId": "234",
        "comment": "Funny",
        "rating": 3,
    },

    {
        "gameId": "124",
        "userId": "235",
        "comment": "I played this game when i was a kid",
        "rating": 2,
    },

    {
        "gameId": "125",
        "userId": "236",
        "comment": "cool game!!",
        "rating": 4,
    },

];



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
            console.log(req.body.gameId);
            await db.addFeedback(req.body)
            let comments = await db.getFeedbacks(req.body.gameId)
            res.send(comments) 
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


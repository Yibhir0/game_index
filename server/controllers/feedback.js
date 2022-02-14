
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
        const comments = feedback.filter(f => f.gameId === req.params.id);
        res.send(comments);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Post comment for a specific game

exports.addComment = async (req, res) => {
    try {
        // Get values inside the body and store them in mongoose.
        console.log(req.body);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


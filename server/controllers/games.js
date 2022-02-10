
let games = [{
    "_id": "222222222222",
    "name": "Tetris",
    "rank": 6,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
}];




// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {
        
        res.status(200).json(games);
    }
    catch (error) {
        res.satus(404).json({ message: error.message })
    }
};

// Response for home page
exports.goHome = async (req, res) => {
    try {
        res.send('Games Index');
    }
    catch (error) {
        res.satus(404).json({ message: error.message });
    }
};
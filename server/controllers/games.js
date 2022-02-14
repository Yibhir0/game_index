
let games = [{
    "id": "222222222222",
    "name": "Tetris",
    "rank": 6,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "62626262",
    "name": "Mario",
    "rank": 6,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "11111111",
    "name": "Sonic",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "5555555",
    "name": "Sonic2",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "112513532",
    "name": "Minecraft",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "392302",
    "name": "Roblox",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "1239012",
    "name": "Random Game",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
},
{
    "id": "90808890",
    "name": "AAAAAAa",
    "rank": 5,
    "platform": "IDK",
    "year": 2010,
    "genre": "Retro",
    "publisher": "GameMaker Inc."
}
];

// Response for endpoint /games
exports.getGames = async (req, res) => {
    try {

        res.status(200).json(games);
    }
    catch (error) {
        res.satus(404).json({ message: error.message })
    }
};

// Response for a specific page
exports.getGame = async (req, res) => {
    try {

        const game = games.find(g => g.id == req.params.id);
        res.send(game);
    }
    catch (error) {

        res.status(404).json({ message: error.message });
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


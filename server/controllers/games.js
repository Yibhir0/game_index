
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
},
{
    "id": "12333333",
    "name": "Diablo",
    "rank": 6,
    "platform": "PC",
    "year": 2002,
    "genre": "Fantasy",
    "publisher": "Blizzard"
},
{
    "id": "97777777",
    "name": "Valorant",
    "rank": 32,
    "platform": "PC",
    "year": 2007,
    "genre": "Shooter",
    "publisher": "Riot Games"
},
{
    "id": "12515325",
    "name": "League Of Legends",
    "rank": 999,
    "platform": "PC",
    "year": 2009,
    "genre": "Fantasy",
    "publisher": "Riot Games"
},
{
    "id": "3259320",
    "name": "Final Fantasy",
    "rank": 1,
    "platform": "Console",
    "year": 2002,
    "genre": "Fantasy",
    "publisher": "Square Enix"
},
{
    "id": "3204922",
    "name": "Genshin Impact",
    "rank": 992,
    "platform": "PC",
    "year": 2001,
    "genre": "Fantasy",
    "publisher": "Idk"
},
{
    "id": "666666",
    "name": "Lost Ark",
    "rank": 20,
    "platform": "PC",
    "year": 2022,
    "genre": "Fantasy",
    "publisher": "Amazon"
},
{
    "id": "45635363",
    "name": "New World",
    "rank": 25,
    "platform": "PC",
    "year": 2021,
    "genre": "Fantasy",
    "publisher": "Amazon"
},
{
    "id": "2434323",
    "name": "Path of Exile",
    "rank": 996,
    "platform": "PC",
    "year": 2013,
    "genre": "Fantasy",
    "publisher": "Idk"
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

        const game = games.find(g => g.id === req.params.id);
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


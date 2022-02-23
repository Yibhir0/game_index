const db = require('../mongoose/db');
const Game = require('../mongoose/models/gameSchema');


(async () => {
    await db.connectToDB();
})()


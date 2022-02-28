<<<<<<< HEAD
<<<<<<< HEAD
const db = require('../mongoose/db');
const Game = require('../mongoose/models/gameSchema');


(async () => {
    await db.connectToDB();
    console.log(await Game.find())
=======
=======
>>>>>>> 6008f0ba534a4b37eb7fab27c24279ac01ffb5a5
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const dbUri = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const Games = require('./models/gameSchema')


(async () => {
    let mng = await mongoose.connect(dbUri)
        .then(() => { console.log("Connected to MongoDB") })
<<<<<<< HEAD
=======

    console.log(typeof (mongoose.connection.readyState))
})()
>>>>>>> 6008f0ba534a4b37eb7fab27c24279ac01ffb5a5

    console.log(typeof (mongoose.connection.readyState))
>>>>>>> 6008f0b (Add Skeleton for graphController & graphDash components and basic Home page rendering)
})()


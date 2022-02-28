const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const dbUri = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const Games = require('./models/gameSchema')


(async () => {
    let mng = await mongoose.connect(dbUri)
        .then(() => { console.log("Connected to MongoDB") })

    console.log(typeof (mongoose.connection.readyState))
})()



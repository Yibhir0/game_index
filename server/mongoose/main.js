const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const dbUri = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const Games = require('./models/gameSchema')

    //Is never ran, was used to test the connection to db
    (async () => {
        let mng = await mongoose.connect(dbUri)
            .then(() => {})
    })()

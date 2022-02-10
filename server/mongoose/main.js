require('dotenv').config();
const dbUri = process.env.ATLAS_URI;
const mongoose = require('mongoose');

(async () => {
    console.log(dbUri)
    await mongoose.connect(dbUri)
        .then(() => { console.log("Connected to MongoDB") })
        .catch((err) => {console.error(err.message)})
})()


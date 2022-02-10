const mongoose = require('mongoose');
require("dotenv").config();
const dbUri = process.env.ATLAS_URI;

(async () => {
    await mongoose.connect(dbUri)
        .then(() => { console.log("Connected to MongoDB") })
})()


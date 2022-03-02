const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String},
    password: {
        hash: {type: String},
        salt: {type: String}
    },
    creation_date: {type: String},
    last_login: {type: String},
    bio: {type: String},
    lists: [{
        id: {type: Number},
        name: {type: String},
        games: []
    }]
})

const model = mongoose.model("UserModels", userSchema);

module.exports = model;
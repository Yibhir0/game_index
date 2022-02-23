const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    name: { type: String },
    genre: { type: String },
    esrbrating: { type: String },
    platform: { type: String },
    publisher: { type: String },
    criticscore: { type: String },
    globalsales: { type: Number },
    genre: { type: String },
    nasales: { type: Number },
    eusales: { type: Number },
    jpsales: { type: Number },
    othersales: { type: Number },
    year: { type: Number },
})

const model = mongoose.model("GameModels", gameSchema, 'gamedata');

module.exports = model;
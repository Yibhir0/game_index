const { Double } = require("bson");
const mongoose = require("mongoose");
const feedbackModel = require("./feedbackSchema").schema

const gameSchema = new mongoose.Schema({
    jpsales: { type: Number },
    nasales: { type: Number },
    othersales: { type: Number },
    eusales: { type: Number },
    platform: [],
    year: { type: Number },
    publisher: { type: String },
    esrbrating: { type: String },
    criticscore: { type: Number },
    globalsales: { type: Number },
    name: { type: String },
    genre: { type: String },
    image_URL: [],
    userrating: { type: Number }
})

const model = mongoose.model("GameModels", gameSchema, "gamedata");

module.exports = model;
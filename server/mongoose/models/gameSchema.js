const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    name: { type: String },
    genre: { type: String },
    esrbRating: { type: String },
    platform: { type: String },
    publisher: { type: String },
    criticScore: { type: String },
    globalSales: { type: Number },
    genre: { type: String },
    naSales: { type: Number },
    euSales: { type: Number },
    jpSales: { type: Number },
    otherSales: { type: Number },
    year: { type: Number },
})

const model = mongoose.model("GameModels", gameSchema);

module.exports = model;
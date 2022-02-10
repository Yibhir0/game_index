const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    name: { type: String },
    genre: {type: String},
    rank: { type: Number },
    platform: { type: String },
    year: { type: Number },
    genre: { type: String },
    publisher: { type: String },
    NA_sales: { type: Number },
    EU_sales: { type: Number },
    JP_sales: { type: Number },
    Other_Sales: {type: Number},
})

const model = mongoose.model("GameModels", gameSchema);

module.exports = model;
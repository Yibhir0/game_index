const mongoose = require("mongoose");
const Feedback = new mongoose.Schema({
    gameID: Number,
    userID: Number,
    comment: String,
    rating: Number
})

const model = mongoose.model("FeedbackModels", Feedback);

module.exports = model;
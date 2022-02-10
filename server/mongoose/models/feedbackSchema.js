const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    gameID: Number,
    userID: Number,
    comment: String,
    rating: Number
})

const model = mongoose.model("FeedbackSchema", feedbackSchema);

module.exports = model;
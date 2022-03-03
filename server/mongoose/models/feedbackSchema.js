const mongoose = require("mongoose");
const Feedback = new mongoose.Schema({
    gameID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    comment: String,
    rating: Number
});

const model = mongoose.model("FeedbackModels", Feedback);

module.exports = model;
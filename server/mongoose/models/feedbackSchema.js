const mongoose = require("mongoose");
const Feedback = new mongoose.Schema({
    gameID: { type: mongoose.Schema.Types.ObjectId },
    userID: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: String },
    rating: { type: Number }
})

const model = mongoose.model("FeedbackModels", Feedback);

module.exports = model;
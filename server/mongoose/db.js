const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
const Games = require("../mongoose/models/gameSchema")
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports.connectToDB = async () => {
    const dbURI = process.env.ATLAS_URI;
    await mongoose.connect(dbURI);
    return mongoose.connection.readyState;
}

module.exports.closeDB = async () => {
    await mongoose.connection.close();
}

module.exports.deleteFeedBack = async (feedback) => {
    await FeedBack.deleteOne({ _id: feedback._id });
}

module.exports.deleteAllFeedBack = async () => {
    await FeedBack.deleteMany();
}

module.exports.editFeedback = async () => {
    
}

module.exports.getFeedback = async (gameId) => {
    return await FeedBack.find({ gameID: gameId })
}

module.exports.getFeedbacks = async () => {
    let comments = await FeedBack.find()
    return comments.toArray()
}

module.exports.addFeedback = async (feedback) => {
    await FeedBack.insertOne(feedback)
}

module.exports.getGame = async (id) => {
    return await Games.findById({ _id: id })
}

module.exports.getGames = async () => {
    let games = await Games.find();
    return games.toArray();
}


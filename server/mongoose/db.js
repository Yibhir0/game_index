const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
const Games = require("../mongoose/models/gameSchema")
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
//.env file is set up under server folder

module.exports.connectToDB = async () => {
    const dbURI = process.env.ATLAS_URI;
    await mongoose.connect(dbURI);
    return mongoose.connection.readyState;
}

module.exports.closeDB = async () => {
    await mongoose.connection.close();
}

module.exports.deleteFeedBack = async (feedback) => {
    await FeedBack.deleteOne({ _id: feedback._id })
}

module.exports.deleteAllFeedBack = async () => {
    await FeedBack.deleteMany();
}

module.exports.editFeedback = async (feedback) => {
    await FeedBack.updateOne({ _id: feedback._id }, feedback)
}

module.exports.getFeedback = async (gameId) => {
    return await FeedBack.find({ gameID: gameId })
}

module.exports.getFeedbacks = async (gameId) => {
    let comments = await FeedBack.find({ gameID: gameId })
    return comments
}

module.exports.addFeedback = async (feedback) => {
    const awesome_instance = new FeedBack(feedback);

    // Save the new model instance, passing a callback
    await awesome_instance.save(function (err) {
        if (err) return handleError(err);
    });

}

module.exports.getGame = async (id) => {

    return await Games.findById({ _id: id })
}

module.exports.getGames = async () => {
    let games = await Games.find()
    return games
}

module.exports.getGamesByFilter = async (filters) => {

    let games = await Games
        .aggregate([
            {
                $addFields:
                {
                    yearStr: { $toString: '$year' }
                }
            },
            {
                $match:
                {
                    name: { '$regex': filters.keywords, '$options': 'i' },
                    yearStr: { $regex: filters.year }
                }
            }
        ])
    console.log(games);
    return games
}



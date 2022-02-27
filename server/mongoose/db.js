const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
const Games = require('../mongoose/models/gameSchema')
const User = require('../mongoose/models/userSchema')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports.connectToDB = async () => {
    const dbURI = process.env.ATLAS_URI;
    await mongoose.connect(dbURI);
    return mongoose.connection.readyState;
}

module.exports.closeDB = async () => {
    await mongoose.connection.close();
}

module.exports.getFeedbacks = async (gameId) => {
    let comments = await FeedBack.find({ gameID: gameId})
    return comments
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

module.exports.getGame = async (id) => {
    return await Games.findById({ _id: id })
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

module.exports.getList = async (user, list_id) => {
    let current_user = await User.findOne({ _id: user._id });
    for (let index in current_user.lists) {
        if (current_user.lists[index].id == list_id) {
            return current_user.lists[index];
        };
    };
}


module.exports.createList = async (user, id, list_name, gameslist ) => {
    await User.findOneAndUpdate({_id: user._id}, {lists : {id: id, name: list_name , games: gameslist}});
}

module.exports.addToList = async (user, list_name, game_name) => {
    let current_user = await User.findOne({ _id: user._id });
    let lists = current_user.lists;

    for (let index in lists) {
        if (lists[index].name == list_name) {
            lists[index].games.push(game_name);
        }
    }

    await User.findOneAndReplace({ _id: user_id }, user);

}

module.exports.deleteFromList = async (user, list_name, game_name) => {
    let current_user = await User.findOne({ _id: user._id });
    let lists = current_user.lists;

    for (let index in lists) {
        if (lists[index].name == list_name) {
            let index = lists[index].games.indexOf(game_name);
            array.splice(index, 1);
        }
    }

    await User.findOneAndReplace({ _id: user_id }, user);
    
}

module.exports.addFeedback = async (feedback) => {
    await FeedBack.insertOne(feedback)
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
    //console.log(games);
    return games
}



const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
const Game = require('../mongoose/models/gameSchema')
const User = require('../mongoose/models/userSchema')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports.connectToDB = async () => {
    const dbURI = process.env.ATLAS_URI;
    await mongoose.connect(dbURI);
    return mongoose.connection.readyState;
}

module.exports.closeDB = async () => {
    await mongoose.connection.close();
}

module.exports.getFeedback = async (game) => {
    let feedbacks = await FeedBack.find({ gameID: game._id });
    return feedbacks;

}

module.exports.deleteFeedBack = async (feedback) => {
    await FeedBack.deleteOne({ _id: feedback._id });
}

module.exports.deleteAllFeedBack = async () => {
    await FeedBack.deleteMany();
}

module.exports.editFeedback = async (feedback,query) => {
    let editedFeedback = await FeedBack.findOneAndUpdate({ _id: feedback._id }, query);
    return editedFeedback;
}

module.exports.getGames = async () => {
    let games = await Game.find();
    return games;
}

module.exports.getGame = async (game_name) => {
    let game = await Game.findOne({ name: game_name });
    return game;
}


module.exports.getUsers = async () => {
    let users = await User.find();
    return users;
}

module.exports.getUser = async (userName) => {
    let user = await User.findOne({ name: userName });
    return user;
}

module.exports.deleteUser = async (user) => {
    await User.deleteOne({ _id: user._id});
}

module.exports.editUser = async (user,query) => {
    let editedUser = await FeedBack.findOneAndUpdate({ _id: user._id }, query);
    return editedUser;
}

module.exports.getLists = async (user) => {
    let user = await User.findOne({ _id: user._id });
    return user.lists;
}

module.exports.getList = async (user, list_id) => {
    let user = await User.findOne({ _id: user._id });
    for (let list in user.lists) {
        if (list['id'] == list_id) {
            return list['id'];
        };
    };
}

module.exports.createList = async (user, id, list_name, gameslist ) => {
    await User.findOneAndUpdate({_id: user._id}, {lists : {id: id, name: list_name , games: gameslist}});
}

module.exports.addToList = async (user, list_name, game_name) => {
    let user = await User.findOne({ _id: user._id });
    let lists = user.lists;

    for (let list in lists) {
        if (list['list_name'] == list_name) {
            list['games'].push(game_name);
        }
    }

    await User.findOneAndReplace({ _id: user_id }, user);

}

module.exports.deleteFromList = async (user, list_name, game_name) => {
    let user = await User.findOne({ _id: user._id });
    let lists = user.lists;

    for (let list in lists) {
        if (list['list_name'] == list_name) {
            let index = list['games'].indexOf('game_name');
            array.splice(index, 1);
        }
    }

    await User.findOneAndReplace({ _id: user_id }, user);
    
}

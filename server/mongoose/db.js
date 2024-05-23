const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
const Games = require('../mongoose/models/gameSchema')
const User = require('../mongoose/models/userSchema')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//Connect to db using the url in .env and return the state
module.exports.connectToDB = async () => {
    //Get the url from /env
    const dbURI = process.env.ATLAS_URI;
    //connect
    await mongoose.connect(dbURI);
    return mongoose.connection.readyState;
}

//Close the connection
module.exports.closeDB = async () => {
    await mongoose.connection.close();
}

/*Get the feedback from db using the gameId as a filter and returns it
get an id as input */
module.exports.getFeedbacks = async (gameId) => {
    let comments = await FeedBack.find({ gameID: gameId })
    return comments
}

/*Delete the feedback from the db using the id
get a feedback object as input
*/
module.exports.deleteFeedBack = async (feedback) => {
    await FeedBack.findByIdAndDelete({ _id: feedback._id })
}

//Delete all the feedback from the db
module.exports.deleteAllFeedBack = async () => {
    await FeedBack.deleteMany();
}

/*Update the feedback once it's found by it's id
Take a feedback object as input
*/ 
module.exports.editFeedback = async (feedback) => {
    await FeedBack.updateOne({ _id: feedback._id }, feedback)
}

/* Get a specific game from db using its id
get an id as input
*/
module.exports.getGame = async (id) => {
    return await Games.findById({ _id: id })
}

/* Get a specific comment from the db using the gameId as filter and returns it
get a gameId as input */
module.exports.getFeedbacks = async (gameId) => {
    let comments = await FeedBack.find({ gameID: gameId })
    return comments
}

/* Save a feedback in db
Get a feedback object as input 
return the feedback */
module.exports.addFeedback = async (feedback) => {
    //create a feedback model using the object we got as input
    const feed = new FeedBack(feedback);
    // Save the new model instance, passing a callback
    await feed.save(function (err) {
        if (err) return handleError(err);

    });

    return feed;

}

/* Get a specific game from db using its id
get an id as input
*/
module.exports.getGame = async (id) => {
    return await Games.findById({ _id: id })
}

//Get all the games from db and return the array
module.exports.getGames = async () => {
    let games = await Games.find()
    return games
}

/* Get the list from the users documents 
Get and user object and the list id from the query
Return the list*/
module.exports.getList = async (user, list_id) => {
    //Get the user
    let current_user = await User.findOne({ _id: user._id });
    //Find the index at which the specific list is
    for (let index in current_user.lists) {
        //If the the of the list is equal to the one we got as input
        if (current_user.lists[index].id == list_id) {
            //return that list
            return current_user.lists[index];
        };
    };
}

/*Add a specific game to a list 
get the user object, the list name, and the name of the game as input
*/
module.exports.addToList = async (user, list_name, game_name) => {
    //Find the current user
    let current_user = await User.findOne({ _id: user._id });
    //get the lists 
    let lists = current_user.lists;
    //Goes through the lists to find the one that has the same name as the one we got as input
    for (let index in lists) {
        //If the names are the same add the game to the list
        if (lists[index].name == list_name) {
            lists[index].games.push(game_name);
        }
    }
    //Update the user document with the updated list
    await User.findOneAndReplace({ _id: user_id }, user);

}

/*Delete a specific game from a list 
get the user object, the list name, and the name of the game as input
*/
module.exports.deleteFromList = async (user, list_name, game_name) => {
    //Find the current user
    let current_user = await User.findOne({ _id: user._id });
    //get the lists
    let lists = current_user.lists;

    //Goes through the lists to find the one that has the same name as the one we got as input
    for (let index in lists) {
        if (lists[index].name == list_name) {
            //If the names are the same delete the game from the list
            let index = lists[index].games.indexOf(game_name);
            array.splice(index, 1);
        }
    }

    //Update the user document with the updated list
    await User.findOneAndReplace({ _id: user_id }, user);
}

/*Get a list of game according to the filters
get filters object as input
Return a list of games*/
module.exports.getGamesByFilter = async (filters) => {
    //Get all the games that are in accordance with the filter given in the query
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
                    yearStr: { $regex: filters.year },
                    publisher: { '$regex': filters.publisher, '$options': 'i' },
                    genre: { '$regex': filters.genre, '$options': 'i' },
                    platform: { '$regex': filters.platform, '$options': 'i' }
                }
            }
        ])
    return games
}


/* Create a user and save it into the db
Get the user object from query
Return an user object*/
module.exports.createUser = async (user) => {

    try {
        //Set up the object that will be the user
        let obj = {
            name: user.name,
            email: user.email,
            picture: user.picture,
            bio: user.bio,
        }

        //Define the email of the user
        let filter = { email: obj.email };

        //Using the object and the filter create the user model that will be updated in db and return it
        let newUser = await User.findOneAndUpdate(filter, obj, {
            new: true,
            upsert: true
        });
        return newUser;
    }
    catch (error) {
        console.log(error);
    }

}

/*Update the bio field in a specific user document
get the userId and the desc (string to put in the bio) as input
Return the updated user document*/
module.exports.updateBio = async (userId, desc) => {

    try {
        //find the specific user and update the bio field
        let updatedBio = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            { $set: { bio: desc } }
        );
        return updatedBio;
    }
    catch (error) {
        console.log(error);
    }
}

/* Create a list object in the lists field of a specific user document
get the list object and the user id as input
return the updated user document*/
module.exports.createList = async (list, userId) => {

    try {
        //Create the list object
        let obj = {
            name: list.name,
            games: [],
        }
        //Find the specific user and update the lists field
        let newList = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { lists: obj } },
        );
        //return the updated user
        return newList;
    }
    catch (error) {
        console.log(error);
    }

}

/* Delete a list object from the lists field of a specific user document
get the list name and the user id as input
return the updated user document*/
module.exports.deleteList = async (userId, listName) => {

    try {
        //Find the specific user and delete the list from the lists field
        let delList = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            { $pull: { lists: { name: listName } } }
        );
        //Return the updated user document
        return delList;
    }
    catch (error) {
        console.log(error);
    }

}

/*Add a game to the list object inside the lists field of a specific user document
get the user id the index of that list object and the game id
return the updated user document*/
module.exports.addGameToList = async (userId, listIndex, gameId) => {
    try {
        //Find the specific game by its id
        let game = await Games.findById({ _id: gameId });
        //Find the specific user by its id and add the game to the list at the index given as input
        let addGame = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            { $push: { [`lists.${listIndex}.games`]: game } }
        );
        //return the updated user document
        return addGame;
    }
    catch (error) {
        console.log(error);
    }
}

/*Delete a game from the list object inside the lists field of a specific user document
get the user id the index of that list object and the game id
return the updated user document*/
module.exports.removeGameFromList = async (userId, listIndex, gameId) => {
    try {
        //Find the specific game by its id
        let game = await Games.findById({ _id: gameId });
        //Find the specific user by its id and delete the game from the list at the index given as input
        let addGame = await User.findOneAndUpdate(
            {
                _id: userId,
            },
            { $pull: { [`lists.${listIndex}.games`]: game } }
        );
        //return the updated user document
        return addGame;
    }
    catch (error) {
        console.log(error);
    }
}

/*Get a specific user using their id
get the user id as input
return the user document*/
module.exports.getUser = async (id) => {
    return await User.findById({ _id: id })
}

/*Delete a specific user using their id
get the user id as input*/
module.exports.deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
}


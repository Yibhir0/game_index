const mongoose = require('mongoose')
const path = require('path');
const FeedBack = require('../mongoose/models/feedbackSchema')
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


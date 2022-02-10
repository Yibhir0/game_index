const mongoose = require('mongoose');

// // Testing DB connection with test schema/model
// (async () => {

//     // Connect to db
//     await mongoose.connect("mongodb+srv://BigTimmy:1amsh0rt@cluster0.nszmf.mongodb.net/Gamer_Index?retryWrites=true&w=majority").then(() => {
//         console.log("Connected to DB");
//     })

(async () => {
    await mongoose.connect("mongodb+srv://BigTimmy:1amsh0rt@cluster0.nszmf.mongodb.net/Gamer_Index?retryWrites=true&w=majority")
        .then(() => { console.log("Connected to MongoDB") })
})()

const db = require('../mongoose/db')
const FeedBack = require('../mongoose/models/feedbackSchema')
const User = require('../mongoose/models/userSchema')
const mongoose = require("mongoose")

beforeAll(async () => await db.connectToDB());
afterAll(async () => await db.closeDB()); 

test('Succesfully Connects to the DB', async () => {
  const result = await db.connectToDB()
  expect(result).toBe(1);
});

test('Upload model to DB', async () => {
  var gameId = new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca')
  var userId = new mongoose.Types.ObjectId('56cb91bdc3464f14678934ba')
  let feedbackTest = await FeedBack.create({
    gameID: gameId,
    userID: userId,
    comment: "Le big bruh",
    rating: 5
  });

  await feedbackTest.save();

  const recentlyCreatedFeedback = await FeedBack.findOne({ gameID: gameId})


  expect(recentlyCreatedFeedback.gameID).toMatchObject(gameId);

  await FeedBack.findByIdAndDelete({_id:feedbackTest._id})
});

test('Delete a specific document', async () => {
  var gameId = new mongoose.Types.ObjectId()
  var userId = new mongoose.Types.ObjectId()
  let feedbackTest = await FeedBack.create({
    gameID: gameId,
    userID: userId,
    comment: "Le big bruh",
    rating: 5
  })
  
  await feedbackTest.save();

  await db.deleteFeedBack(feedbackTest);

  expect(await FeedBack.exists({ _id: feedbackTest._id })).toBe(null)
})

test('Get all games from the DB', async () => {
  const result = await db.getGames();
  expect(result.length).toBe(11133);
});

test('Get a specific game from the DB', async () => {
  const result = await db.getGame('623ca8d6daa8ca47ebf7a681')
  expect(result['year']).toEqual(2006);
});


test('Get a user from DB', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    email: 'Bobbybilly@gmail.com',
    picture: 'image.com',
    password: { hash: 'asfd', salt: 'nopepper' },
    bio: "It's getting harder everyday",
    list: []
  });
  await fakeUser.save();

  let queriedUser = await db.getUser(fakeUser._id);

  expect(queriedUser.email).toBe('Bobbybilly@gmail.com');

  await User.deleteMany({ name: 'Billy Bob' });

});

// test('Delete a specific User from the DB', async () => {
//   let fakeUser = await User.create({
//     name: 'Billy Bob',
//     email: 'Bobbybilly@gmail.com',
//     picture: 'image.com',
//     password: { hash: 'asfd', salt: 'nopepper' },
//     bio: "It's getting harder everyday",
//     list: []
//   });

//   await fakeUser.save();

//   await db.deleteUser(fakeUser);

//   let deletedUser = await db.getUser('Billy Bob')

//   expect(deletedUser).toBe(null);


// });

test('Edit specific User', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    email: 'Bobbybilly@gmail.com',
    picture: 'image.com',
    password: { hash: 'asfd', salt: 'nopepper' },
    bio: "It's getting harder everyday",
    list: []
  });

  await fakeUser.save();

  let query = { bio: "I've never been to paris" };

  await db.updateBio(fakeUser._id, query);

  let editedUser = await db.getUser(fakeUser._id);
  expect(editedUser.bio).toBe("I've never been to paris");

  await db.deleteUser(editedUser._id);

});


// test('Get all game lists from User', async () => {
//   let fakeUser = await User.create({
//     name: 'Billy Bob',
//     email: 'Bobbybilly@gmail.com',
//     picture: 'image.com',
//     password: { hash: 'asfd', salt: 'nopepper' },
//     bio: "It's getting harder everyday",
//     lists: [{
//       name: "first-list",
//       games: ['banana rpg', 'the big gun', 'hummus 2: hummus harder']
//     },
//       {
//         name: "second-list",
//         games: ['a water bottle']
//     }]
//   });

//   await fakeUser.save();

//   let game_list = await db.getLists(fakeUser);

//   expect(game_list.length).toBe(2)

//   await db.deleteUser(fakeUser);

// });

// test('Get a specific list from user', async () => {
//   let fakeUser = await User.create({
//     name: 'Billy Bob',
//     password: { hash: 'asfd', salt: 'nopepper' },
//     creation_date: '1983-09-12',
//     last_login: "2020-03-02",
//     bio: "It's getting harder everyday",
//     lists: [{
//       id: 1,
//       name: "first-list",
//       games: ['banana rpg', 'the big gun', 'hummus 2: hummus harder']
//     },
//       {
//         id: 2,
//         name: "second-list",
//         games: ['a water bottle']
//     }]
//   });

//   await fakeUser.save();

//   let list = await db.getList(fakeUser, 2)

//   expect(list.name).toBe('second-list')

//   await db.deleteUser(fakeUser);
  
// });



const db = require('../mongoose/db')
const FeedBack = require('../mongoose/models/feedbackSchema')
const User = require('../mongoose/models/userSchema')

beforeAll(async () => await db.connectToDB());
afterAll(async () => await db.closeDB()); 

test('Succesfully Connects to the DB', async () => {
  const result = await db.connectToDB()
  expect(result).toBe(1);
});

test('Upload model to DB', async () => {
  let feedbackTest = await FeedBack.create({
    gameID: 122,
    userID: 43,
    comment: "Le big bruh",
    rating: 5
  });

  await feedbackTest.save();

  const recentlyCreatedFeedback = await FeedBack.findOne({ gameID: 122 })


  expect(recentlyCreatedFeedback.gameID).toBe(122);

  await FeedBack.deleteOne({_id:feedbackTest._id})
});

test('Delete a specific document', async () => {
  let feedbackTest = await FeedBack.create({
    gameID: 122,
    userID: 43,
    comment: "Le big bruh",
    rating: 5
  })
  
  await feedbackTest.save();

  await db.deleteFeedBack(feedbackTest);

  expect(await FeedBack.exists({ _id: feedbackTest._id })).toBe(null)
})

test('Get all games from the DB', async () => {
  const result = await db.getGames();
  expect(result.length).toBe(15886);
});

test('Get a specific game from the DB', async () => {
  const result = await db.getGame('620d6ef065ee1d5092d1c790')
  expect(result['globalsales']).toBe(24490000);
});

test('Get a user from DB', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    password: { hash: 'asfd', salt: 'nopepper' },
    creation_date: '1983-09-12',
    last_login: "2020-03-02",
    bio: "It's getting harder everyday",
    list: []
  });
  await fakeUser.save();

  let queriedUser = await db.getUser('Billy Bob');

  expect(queriedUser.creation_date).toBe('1983-09-12');

  await User.deleteOne({ name: 'Billy Bob' });

});

test('Delete a specific User from the DB', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    password: { hash: 'asfd', salt: 'nopepper' },
    creation_date: '1983-09-12',
    last_login: "2020-03-02",
    bio: "It's getting harder everyday",
    list: []
  });

  await fakeUser.save();

  await db.deleteUser(fakeUser);

  let deletedUser = await db.getUser('Billy Bob')

  expect(deletedUser).toBe(null);


});


test('Edit specific User', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    password: { hash: 'asfd', salt: 'nopepper' },
    creation_date: '1983-09-12',
    last_login: "2020-03-02",
    bio: "It's getting harder everyday",
    list: []
  });

  await fakeUser.save();

  let query = { bio: "I've never been to paris" };

  await db.editUser(fakeUser, query);

  let editedUser = await db.getUser('Billy Bob');

  expect(editedUser.bio).toBe("I've never been to paris");

  await db.deleteUser(editedUser);

});


test('Get all game lists from User', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    password: { hash: 'asfd', salt: 'nopepper' },
    creation_date: '1983-09-12',
    last_login: "2020-03-02",
    bio: "It's getting harder everyday",
    lists: [{
      id: 1,
      name: "first-list",
      games: ['banana rpg', 'the big gun', 'hummus 2: hummus harder']
    },
      {
        id: 2,
        name: "second-list",
        games: ['a water bottle']
    }]
  });

  await fakeUser.save();

  let game_list = await db.getLists(fakeUser);

  expect(game_list.length).toBe(2)

  await db.deleteUser(fakeUser);

});

test('Get a specific list from user', async () => {
  let fakeUser = await User.create({
    name: 'Billy Bob',
    password: { hash: 'asfd', salt: 'nopepper' },
    creation_date: '1983-09-12',
    last_login: "2020-03-02",
    bio: "It's getting harder everyday",
    lists: [{
      id: 1,
      name: "first-list",
      games: ['banana rpg', 'the big gun', 'hummus 2: hummus harder']
    },
      {
        id: 2,
        name: "second-list",
        games: ['a water bottle']
    }]
  });

  await fakeUser.save();

  let list = await db.getList(fakeUser, 2)

  expect(list.name).toBe('second-list')

  await db.deleteUser(fakeUser);
  
});



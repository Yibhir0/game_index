const db = require('../mongoose/db')
const FeedBack = require('../mongoose/models/feedbackSchema')

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


});
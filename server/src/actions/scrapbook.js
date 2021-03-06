const { Types: { ObjectId } } = require('mongoose');
const Scrapbook = require('../models/scrapbook');

async function createScrapbook(options) {
  const {
    name,
    authorId,
    start,
    eventId,
  } = options;

  const scrapbook = new Scrapbook({
    name,
    authorId,
    start,
    eventId,
  });
  await scrapbook.save();
  return scrapbook;
}

async function deleteScrapbook(id) {
  const scrapbook = await Scrapbook.findByIdAndDelete(id);
  return scrapbook;
}

async function changeScrapbookName(id, name) {
  const scrapbook = await Scrapbook.findByIdAndUpdate(id, { name }, { returnDocument: 'after' });
  return scrapbook;
}

async function changeScrapbookStart(id, start) {
  const scrapbook = await Scrapbook.findByIdAndUpdate(id, { start }, { returnDocument: 'after' });
  return scrapbook;
}

async function getScrapbook(id) {
  const scrapbook = await Scrapbook.findById(id);
  return scrapbook;
}

async function getScrapbooksByAuthor(author) {
  const scrapbooks = await Scrapbook.find({ author });
  return scrapbooks;
}

async function getScrapbooksByEventId(eventId) {
  const scrapbooks = await Scrapbook.find({ eventId: ObjectId(eventId) });
  return scrapbooks;
}

module.exports = {
  createScrapbook,
  deleteScrapbook,
  changeScrapbookName,
  changeScrapbookStart,
  getScrapbook,
  getScrapbooksByAuthor,
  getScrapbooksByEventId,
};

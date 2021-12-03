const mongoose = require('mongoose');
const Anchor = require('./anchor');

const { ObjectId } = mongoose.SchemaTypes;

/**
 * The Mongoose Schema for a scrapbook.
 */
const scrapbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    required: true,
  },
  start: Anchor,
  eventId: {
    type: ObjectId,
  },
}, { versionKey: false });

const Scrapbook = mongoose.model('Scrapbook', scrapbookSchema);

module.exports = Scrapbook;

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
  authorId: {
    type: ObjectId,
    required: true,
  },
  eventId: {
    type: ObjectId,
    default: null,
  },
  start: Anchor,
}, { versionKey: false });

const Scrapbook = mongoose.model('Scrapbook', scrapbookSchema);

module.exports = Scrapbook;

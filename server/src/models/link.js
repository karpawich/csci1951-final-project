const mongoose = require('mongoose');
const Anchor = require('./anchor');

const { ObjectId } = mongoose.SchemaTypes;

/**
 * The Mongoose Schema for a link.
 */
const linkSchema = new mongoose.Schema({
  anchor1: Anchor,
  anchor2: Anchor,
  scrapbookId: {
    type: ObjectId,
    required: true,
  },
}, { versionKey: false });

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;

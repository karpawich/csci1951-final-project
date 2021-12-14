const mongoose = require('mongoose');
const Moment = require('./moment');

const { ObjectId } = mongoose.SchemaTypes;

/**
 * The Mongoose Schema for a group of moments.
 */
const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  momentIds: [{
    type: ObjectId,
    ref: Moment,
  }],
  eventId: {
    type: ObjectId,
    default: null,
  },
  authorId: {
    type: ObjectId,
    required: true,
  },
}, { versionKey: false });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

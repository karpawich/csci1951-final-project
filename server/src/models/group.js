const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

/**
 * The Mongoose Schema for a group of moments.
 */
const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null,
  },
  moments: [{
    type: ObjectId,
  }],
}, { versionKey: false });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

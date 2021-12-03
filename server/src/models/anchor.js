const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

// The Mongoose Schema configuration for an anchor.
module.exports = {
  anchorType: {
    type: String,
    required: true,
    enum: ['moment', 'group'],
  },
  anchorId: {
    type: ObjectId,
    required: true,
  },
};

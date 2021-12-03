const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

// The Mongoose Schema configuration for an anchor.
module.exports = {
  idType: {
    type: String,
    required: true,
    enum: ['moment', 'group'],
  },
  id: {
    type: ObjectId,
    required: true,
  },
};

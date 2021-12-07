const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.SchemaTypes;

/**
 * The Mongoose Schema for a moment.
 */
const momentSchema = new mongoose.Schema({
  media: {
    mediaUrl: {
      type: String,
      required: true,
      validate: validator.default.isURL,
    },
    mediaType: {
      type: String,
      enum: ['image', 'audio', 'video'],
      required: true,
    },
  },
  emails: [{
    type: String,
    validate: validator.default.isEmail,
  }],
  eventId: {
    type: ObjectId,
    default: null,
  },
  timestamp: {
    type: Date,
    required: true,
  },
}, { versionKey: false });

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;

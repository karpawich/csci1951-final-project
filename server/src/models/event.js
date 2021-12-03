const mongoose = require('mongoose');
const validator = require('validator');

/**
 * The Mongoose Schema for an event.
 */
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTimestamp: {
    type: Date,
    required: true,
  },
  endTimestamp: {
    type: Date,
    default: null,
  },
  emails: [{
    type: String,
    validate: validator.default.isEmail,
  }],
}, { versionKey: false });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

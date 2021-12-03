const mongoose = require('mongoose');
const Anchor = require('./anchor');

/**
 * The Mongoose Schema for a link.
 */
const linkSchema = new mongoose.Schema({
  anchor1: Anchor,
  anchor2: Anchor,
}, { versionKey: false });

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;

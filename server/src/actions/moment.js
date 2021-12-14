const { Types: { ObjectId } } = require('mongoose');
const Moment = require('../models/moment');

async function createMoment(options) {
  const {
    media,
    emails,
    eventId,
    timestamp,
  } = options;

  const moment = new Moment({
    media,
    emails,
    eventId,
    timestamp,
  });
  await moment.save();
  return moment;
}

async function deleteMoments(ids) {
  const results = await Moment.deleteMany({ _id: { $in: ids } });
  return results;
}

async function addEmailToMomentsByEventId(eventId, email) {
  const results = await Moment.updateMany({ eventId }, { $addToSet: { emails: email } });
  return results;
}

async function removeEmailFromMomentsByEventId(eventId, email) {
  const results = await Moment.updateMany({ eventId }, { $pull: { emails: email } });
  return results;
}

async function getMoment(id) {
  const moment = await Moment.findById(id);
  return moment;
}

async function getMomentsByIds(ids) {
  const momentIds = ids.map((id) => ObjectId(id));
  const moments = await Moment.find({ _id: { $in: momentIds } });
  return moments;
}

async function searchMoments(options) {
  const {
    emails = [],
    events = [],
    dates = {},
  } = options;

  if (
    !Array.isArray(emails)
    || !Array.isArray(emails)
    || typeof dates !== 'object'
  ) {
    throw new Error('Invalid search parameters');
  }
  const { before, after } = dates;

  const query = {};
  if (emails.length > 0) {
    query.emails = { $all: emails };
  }
  if (events.length > 0) {
    query.eventId = { $in: events };
  }
  if (before) {
    query.timestamp = { $lte: before };
  }
  if (after) {
    query.timestamp = {
      ...query.timestamp,
      $gte: after,
    };
  }

  const moments = await Moment
    .find(query)
    .sort({ timestamp: -1 });

  return moments;
}

module.exports = {
  createMoment,
  deleteMoments,
  addEmailToMomentsByEventId,
  removeEmailFromMomentsByEventId,
  getMoment,
  getMomentsByIds,
  searchMoments,
};

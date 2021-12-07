const Event = require('../models/event');

async function createEvent(options) {
  const { name, endTimestamp, emails } = options;
  const event = new Event({
    name,
    startTimestamp: Date.now(),
    endTimestamp,
    emails,
  });
  await event.save();
  return event;
}

async function deleteEvent(id) {
  const event = await Event.findByIdAndDelete(id);
  return event;
}

async function stopEvent(id) {
  const event = await Event.findById(id);
  event.endTimestamp = Date.now();
  await event.save();
  return event;
}

async function changeEventName(id, name) {
  const event = await Event.findByIdAndUpdate(id, { name }, { returnDocument: 'after' });
  return event;
}

async function addEmailToEvent(id, email) {
  const event = await Event.findByIdAndUpdate(id, { $addToSet: { emails: email } }, { returnDocument: 'after' });
  return event;
}

async function removeEmailFromEvent(id, email) {
  const event = await Event.findByIdAndUpdate(id, { $pull: { emails: email } }, { returnDocument: 'after' });
  return event;
}

async function getEvent(id) {
  const event = await Event.findById(id);
  return event;
}

async function getEventsByEmail(email) {
  const events = await Event.find({ emails: email });
  return events;
}

module.exports = {
  createEvent,
  deleteEvent,
  stopEvent,
  changeEventName,
  addEmailToEvent,
  removeEmailFromEvent,
  getEvent,
  getEventsByEmail,
};

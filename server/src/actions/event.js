const Event = require('../models/event');

async function createEvent(name, endTimestamp, emails) {
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
  const event = await Event.findByIdAndUpdate(id, { name });
  return event;
}

async function addEmailToEvent(id, email) {
  const event = await Event.findByIdAndUpdate(id, { $addToSet: { emails: email } });
  // TODO: check if email is already in event
  // TODO: add that email to all moments of the event
  return event;
}

async function removeEmailFromEvent(id, email) {
  const event = await Event.findByIdAndUpdate(id, { $pull: { emails: email } });
  // TODO: remove that email from all moments of the event
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
  getEventsByEmail,
};

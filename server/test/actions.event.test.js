const { expect } = require('chai');
const Event = require('../src/models/event');
const {
  createEvent,
  deleteEvent,
  stopEvent,
  changeEventName,
  addEmailToEvent,
  removeEmailFromEvent,
  getEvent,
  getEventsByEmail,
} = require('../src/actions/event');

describe('event: actions', () => {
  beforeEach((done) => {
    Event.deleteMany({}).exec().then(() => done());
  });

  it('createEvent should create an event', (done) => {
    createEvent('event', null, ['andy@brown.edu'])
      .then(() => {
        Event.findOne({}).exec()
          .then((event) => {
            expect(event.name).to.equal('event');
            expect(event.startTimestamp).to.not.be.null;
            expect(event.endTimestamp).to.be.null;
            expect(Array.isArray(event.emails)).to.be.true;
            expect(event.emails.length).to.equal(1);
            done();
          });
      });
  });

  it('deleteEvent should delete an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        deleteEvent(event._id)
          .then(() => {
            Event.find({}).exec()
              .then((events) => {
                expect(events).to.have.lengthOf(0);
                done();
              });
          });
      });
  });

  it('stopEvent should stop an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        expect(event.endTimestamp).to.be.null;
        stopEvent(event._id)
          .then((event1) => {
            expect(event1.endTimestamp).to.not.be.null;
            done();
          });
      });
  });

  it('changeEventName should change the name of an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        changeEventName(event._id, 'new name')
          .then((event1) => {
            expect(event1.name).to.equal('new name');
            done();
          });
      });
  });

  it('addEmailToEvent should not add a duplicate email to an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        addEmailToEvent(event._id, 'andy@brown.edu')
          .then((event1) => {
            expect(event1.emails).to.have.lengthOf(1);
            done();
          });
      });
  });

  it('addEmailToEvent should add a new email to an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        addEmailToEvent(event._id, 'norm@brown.edu')
          .then((event1) => {
            expect(event1.emails).to.have.lengthOf(2);
            done();
          });
      });
  });

  it('removeEmailFromEvent should remove an email from an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu', 'norm@brown.edu'],
    })
      .then((event) => {
        removeEmailFromEvent(event._id, 'andy@brown.edu')
          .then((event1) => {
            expect(event1.emails).to.have.lengthOf(1);
            done();
          });
      });
  });

  it('getEvent should get an event', (done) => {
    Event.create({
      name: 'event',
      startTimestamp: new Date(),
      emails: ['andy@brown.edu'],
    })
      .then((event) => {
        getEvent(event._id)
          .then((event1) => {
            expect(event1.name).to.equal('event');
            done();
          });
      });
  });

  it('getEventsByEmail should get events by email', (done) => {
    Event.create([
      {
        name: 'event1',
        startTimestamp: new Date(),
        emails: ['andy@brown.edu'],
      },
      {
        name: 'event2',
        startTimestamp: new Date(),
        emails: ['andy@brown.edu'],
      },
    ])
      .then(() => {
        getEventsByEmail('andy@brown.edu')
          .then((events) => {
            expect(events).to.have.lengthOf(2);
            done();
          });
      });
  });
});

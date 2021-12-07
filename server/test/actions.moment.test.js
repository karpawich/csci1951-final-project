const { expect } = require('chai');
const Moment = require('../src/models/moment');
const {
  createMoment,
  deleteMoments,
  addEmailToMomentsByEventId,
  removeEmailFromMomentsByEventId,
  getMoment,
  searchMoments,
} = require('../src/actions/moment');

const objectId = '551137c2f9e1fac808a5f572';
const objectId1 = '551137c2f9e1fac808a5f573';

describe('moment: actions', () => {
  beforeEach((done) => {
    Moment.deleteMany({}).exec().then(() => done());
  });

  it('createMoment should create a new moment', (done) => {
    createMoment({
      media: {
        mediaUrl: 'https://picsum.photos/200/300',
        mediaType: 'image',
      },
      emails: ['andy@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    }).then(() => {
      Moment.findOne({}).exec()
        .then((moment) => {
          expect(moment.media.mediaUrl).to.equal('https://picsum.photos/200/300');
          expect(moment.emails).to.include('andy@brown.edu');
          expect(moment.eventId.toString()).to.equal(objectId);
          expect(moment.timestamp).to.be.an.instanceof(Date);
          done();
        });
    });
  });

  it('deleteMoments should delete several moments', (done) => {
    const moment = {
      media: {
        mediaUrl: 'https://picsum.photos/200/300',
        mediaType: 'image',
      },
      emails: ['andy@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    Moment.create([moment, moment])
      .then((moments) => {
        deleteMoments(moments.map((m) => m._id))
          .then(() => {
            Moment.find({}).exec()
              .then((moments1) => {
                expect(moments1.length).to.equal(0);
                done();
              });
          });
      });
  });

  it('addEmailToMomentsByEventId should add an email to moments of an event', (done) => {
    const media = {
      mediaUrl: 'https://picsum.photos/200/300',
      mediaType: 'image',
    };
    const moment1 = {
      media,
      emails: ['andy@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    const moment2 = {
      media,
      emails: ['norm@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    Moment.create([moment1, moment2])
      .then(() => {
        addEmailToMomentsByEventId(objectId, 'elliot@brown.edu')
          .then(() => {
            Moment.find({}).exec()
              .then((moments1) => {
                expect(moments1[0].emails).to.include('elliot@brown.edu');
                expect(moments1[1].emails).to.include('elliot@brown.edu');
                done();
              });
          });
      });
  });

  it('removeEmailFromMomentsByEventId should remove an email from moments of an event', (done) => {
    const media = {
      mediaUrl: 'https://picsum.photos/200/300',
      mediaType: 'image',
    };
    const moment1 = {
      media,
      emails: ['andy@brown.edu', 'elliot@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    const moment2 = {
      media,
      emails: ['norm@brown.edu', 'elliot@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    Moment.create([moment1, moment2])
      .then(() => {
        removeEmailFromMomentsByEventId(objectId, 'elliot@brown.edu')
          .then(() => {
            Moment.find({}).exec()
              .then((moments1) => {
                expect(moments1[0].emails).to.not.include('elliot@brown.edu');
                expect(moments1[1].emails).to.not.include('elliot@brown.edu');
                done();
              });
          });
      });
  });

  it('getMoment should get a moment', (done) => {
    const media = {
      mediaUrl: 'https://picsum.photos/200/300',
      mediaType: 'image',
    };
    const moment = {
      media,
      emails: ['andy@brown.edu'],
      eventId: objectId,
      timestamp: new Date(),
    };
    Moment.create(moment)
      .then((moment1) => {
        getMoment(moment1._id)
          .then((moment2) => {
            expect(moment2.media.mediaUrl).to.equal('https://picsum.photos/200/300');
            expect(moment2.emails).to.include('andy@brown.edu');
            expect(moment2.eventId.toString()).to.equal(objectId);
            expect(moment2.timestamp).to.be.an.instanceof(Date);
            done();
          });
      });
  });

  it('searchMoments should search moments', (done) => {
    // TODO
    done();
  });
});

const { expect } = require('chai');
const Scrapbook = require('../src/models/scrapbook');
const {
  createScrapbook,
  deleteScrapbook,
  changeScrapbookName,
  changeScrapbookStart,
  getScrapbook,
  getScrapbooksByAuthor,
} = require('../src/actions/scrapbook');

const objectId = '551137c2f9e1fac808a5f572';
const objectId1 = '551137c2f9e1fac808a5f573';

describe('scrapbook: actions', () => {
  beforeEach((done) => {
    Scrapbook.deleteMany({}).exec().then(() => done());
  });

  it('createScrapbook should create a scrapbook', (done) => {
    createScrapbook({
      name: 'scrapbook',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    }).then(() => {
      Scrapbook.findOne({}).exec().then((scrapbook) => {
        expect(scrapbook.name).to.equal('scrapbook');
        expect(scrapbook.authorId.toString()).to.equal(objectId);
        expect(scrapbook.eventId.toString()).to.equal(objectId);
        expect(scrapbook.start.anchorType).to.equal('moment');
        expect(scrapbook.start.anchorId.toString()).to.equal(objectId);
        done();
      });
    });
  });

  it('deleteScrapbook should delete a scrapbook', (done) => {
    Scrapbook.create({
      name: 'scrapbook',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    }).then((scrapbook) => {
      deleteScrapbook(scrapbook._id).then(() => {
        Scrapbook.findOne({}).exec().then((scrapbook1) => {
          expect(scrapbook1).to.equal(null);
          done();
        });
      });
    });
  });

  it('changeScrapbookName should change the name of a scrapbook', (done) => {
    Scrapbook.create({
      name: 'scrapbook',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    }).then((scrapbook) => {
      changeScrapbookName(scrapbook._id, 'scrapbook1').then(() => {
        Scrapbook.findOne({}).exec().then((scrapbook1) => {
          expect(scrapbook1.name).to.equal('scrapbook1');
          done();
        });
      });
    });
  });

  it('changeScrapbookStart should change the start of a scrapbook', (done) => {
    Scrapbook.create({
      name: 'scrapbook',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    }).then((scrapbook) => {
      changeScrapbookStart(scrapbook._id, {
        anchorType: 'group',
        anchorId: objectId1,
      }).then(() => {
        Scrapbook.findOne({}).exec().then((scrapbook1) => {
          expect(scrapbook1.start.anchorType).to.equal('group');
          expect(scrapbook1.start.anchorId.toString()).to.equal(objectId1);
          done();
        });
      });
    });
  });

  it('getScrapbook should get a scrapbook', (done) => {
    Scrapbook.create({
      name: 'scrapbook',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    }).then((scrapbook) => {
      getScrapbook(scrapbook._id).then((scrapbook1) => {
        expect(scrapbook1.name).to.equal('scrapbook');
        expect(scrapbook1.authorId.toString()).to.equal(objectId);
        expect(scrapbook1.eventId.toString()).to.equal(objectId);
        expect(scrapbook1.start.anchorType).to.equal('moment');
        expect(scrapbook1.start.anchorId.toString()).to.equal(objectId);
        done();
      });
    });
  });

  it('getScrapbooksByAuthor should get scrapbooks by author', (done) => {
    const scrapbook1 = {
      name: 'scrapbook1',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'moment',
        anchorId: objectId,
      },
    };
    const scrapbook2 = {
      name: 'scrapbook2',
      authorId: objectId,
      eventId: objectId,
      start: {
        anchorType: 'group',
        anchorId: objectId1,
      },
    };
    Scrapbook.create([scrapbook1, scrapbook2]).then(() => {
      getScrapbooksByAuthor(objectId).then((scrapbooks) => {
        expect(scrapbooks.length).to.equal(2);
        expect(scrapbooks[0].name).to.equal('scrapbook1');
        expect(scrapbooks[0].authorId.toString()).to.equal(objectId);
        expect(scrapbooks[1].name).to.equal('scrapbook2');
        expect(scrapbooks[1].authorId.toString()).to.equal(objectId);
        done();
      });
    });
  });
});

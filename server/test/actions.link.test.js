const { expect } = require('chai');
const Link = require('../src/models/link');
const {
  doesLinkExist,
  createLink,
  deleteLink,
  deleteLinksByAnchors,
  deleteLinksByScrapbookId,
} = require('../src/actions/link');

const objectId = '551137c2f9e1fac808a5f572';
const objectId1 = '551137c2f9e1fac808a5f573';
const objectId2 = '551137c2f9e1fac808a5f574';

describe('link: actions', () => {
  beforeEach((done) => {
    Link.deleteMany({}).exec().then(() => done());
  });

  it('createLink should create a link', (done) => {
    createLink(
      {
        anchor1: {
          anchorType: 'moment',
          anchorId: objectId,
        },
        anchor2: {
          anchorType: 'group',
          anchorId: objectId1,
        },
        scrapbookId: objectId,
      },
    )
      .then(() => {
        Link.findOne({}).exec()
          .then((link) => {
            expect(link.anchor1.anchorType).to.equal('moment');
            expect(link.anchor1.anchorId.toString()).to.equal(objectId);
            expect(link.anchor2.anchorType).to.equal('group');
            expect(link.anchor2.anchorId.toString()).to.equal(objectId1);
            expect(link.scrapbookId.toString()).to.equal(objectId);
            done();
          });
      });
  });

  it('deleteLink should delete a link', (done) => {
    Link.create(
      {
        anchor1: {
          anchorType: 'moment',
          anchorId: objectId,
        },
        anchor2: {
          anchorType: 'group',
          anchorId: objectId1,
        },
        scrapbookId: objectId,
      },
    )
      .then((link) => {
        deleteLink(link._id)
          .then(() => {
            Link.findOne({ _id: link._id }).exec()
              .then((link1) => {
                expect(link1).to.be.null;
                done();
              });
          });
      });
  });

  it('doesLinkExist should check whether a link exists', (done) => {
    const anchorA = {
      anchorType: 'moment',
      anchorId: objectId,
    };
    const anchorB = {
      anchorType: 'group',
      anchorId: objectId1,
    };
    const link1 = {
      anchor1: anchorA,
      anchor2: anchorB,
      scrapbookId: objectId,
    };
    const link2 = {
      anchor1: anchorB,
      anchor2: anchorA,
      scrapbookId: objectId,
    };
    Link.create([link1, link2])
      .then(() => {
        doesLinkExist({ anchor1: anchorA, anchor2: anchorB })
          .then((result) => {
            expect(result).to.be.true;
            doesLinkExist({ anchor1: anchorB, anchor2: anchorA })
              .then((result1) => {
                expect(result1).to.be.true;
                done();
              });
          });
      });
  });

  it('deleteLinksByAnchors should delete links by anchors', (done) => {
    const anchorA = {
      anchorType: 'moment',
      anchorId: objectId,
    };
    const anchorB = {
      anchorType: 'group',
      anchorId: objectId1,
    };
    const anchorC = {
      anchorType: 'group',
      anchorId: objectId2,
    };

    const link1 = {
      anchor1: anchorA,
      anchor2: anchorB,
      scrapbookId: objectId,
    };
    const link2 = {
      anchor1: anchorB,
      anchor2: anchorC,
      scrapbookId: objectId,
    };
    const link3 = {
      anchor1: anchorC,
      anchor2: anchorA,
      scrapbookId: objectId,
    };
    Link.create([link1, link2, link3])
      .then(() => {
        deleteLinksByAnchors([anchorC])
          .then(() => {
            Link.find({}).exec()
              .then((links) => {
                expect(links.length).to.equal(1);
                expect(links[0].anchor1.anchorId.toString()).to.equal(objectId);
                expect(links[0].anchor2.anchorId.toString()).to.equal(objectId1);
                done();
              });
          });
      });
  });

  it('deleteLinksByScrapbookId should delete links by scrapbookId', (done) => {
    const link = {
      anchor1: {
        anchorType: 'moment',
        anchorId: objectId,
      },
      anchor2: {
        anchorType: 'group',
        anchorId: objectId1,
      },
      scrapbookId: objectId,
    };
    Link.create(link)
      .then(() => {
        deleteLinksByScrapbookId(objectId)
          .then(() => {
            Link.find({}).exec()
              .then((links) => {
                expect(links.length).to.equal(0);
                done();
              });
          });
      });
  });
});

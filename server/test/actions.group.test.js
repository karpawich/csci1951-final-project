const { expect } = require('chai');
const Group = require('../src/models/group');
const {
  createGroup,
  deleteGroup,
  changeGroupTitle,
  addMomentIdToGroup,
  removeMomentIdFromGroup,
} = require('../src/actions/group');

const objectId = '551137c2f9e1fac808a5f572';
const objectId1 = '551137c2f9e1fac808a5f573';

describe('group: actions', () => {
  beforeEach((done) => {
    Group.deleteMany({}).exec().then(() => done());
  });

  it('createGroup should create a group', (done) => {
    createGroup({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then(() => {
        Group.findOne({}).exec()
          .then((group) => {
            expect(group.title).to.equal('group');
            expect(group.momentIds.map((oid) => oid.toString())).to.deep.equal([objectId]);
            expect(group.eventId.toString()).to.equal(objectId);
            expect(group.authorId.toString()).to.equal(objectId);
            done();
          });
      });
  });

  it('deleteGroup should delete a group', (done) => {
    Group.create({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then((group) => {
        deleteGroup(group._id)
          .then(() => Group.findById(group._id))
          .then((group1) => {
            expect(group1).to.be.null;
            done();
          });
      });
  });

  it('changeGroupTitle should change the title of a group', (done) => {
    Group.create({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then((group) => {
        changeGroupTitle(group._id, 'group1')
          .then(() => Group.findById(group._id))
          .then((group1) => {
            expect(group1.title).to.equal('group1');
            done();
          });
      });
  });

  it('addMomentIdToGroup should not add duplicate momentIds to a group', (done) => {
    Group.create({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then((group) => {
        addMomentIdToGroup(group._id, objectId)
          .then(() => Group.findById(group._id))
          .then((group1) => {
            expect(
              group1.momentIds.map((oid) => oid.toString()),
            ).to.deep.equal([objectId]);
            done();
          });
      });
  });

  it('addMomentIdToGroup should not add new momentIds to a group', (done) => {
    Group.create({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then((group) => {
        addMomentIdToGroup(group._id, objectId1)
          .then(() => Group.findById(group._id))
          .then((group1) => {
            expect(
              group1.momentIds.map((oid) => oid.toString()),
            ).to.deep.equal([objectId, objectId1]);
            done();
          });
      });
  });

  it('removeMomentIdFromGroup should remove a momentId from a group', (done) => {
    Group.create({
      title: 'group',
      momentIds: [objectId],
      eventId: objectId,
      authorId: objectId,
    })
      .then((group) => {
        removeMomentIdFromGroup(group._id, objectId)
          .then(() => Group.findById(group._id))
          .then((group1) => {
            expect(
              group1.momentIds.map((oid) => oid.toString()),
            ).to.deep.equal([]);
            done();
          });
      });
  });
});

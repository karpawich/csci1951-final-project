const { expect } = require('chai');
const User = require('../src/models/user');
const {
  createUser,
  deleteUser,
  doesUserWithEmailExist,
} = require('../src/actions/user');

describe('user: actions', () => {
  beforeEach((done) => {
    User.deleteMany({}).exec().then(() => done());
  });

  it('createUser should create a user', (done) => {
    createUser(
      {
        email: 'andy@brown.edu',
        firstName: 'Andy',
        lastName: 'Van Dam',
      },
    )
      .then(() => {
        User.findOne({}).exec()
          .then((user) => {
            expect(user.email).to.equal('andy@brown.edu');
            expect(user.firstName).to.equal('Andy');
            expect(user.lastName).to.equal('Van Dam');
            done();
          }).catch(done);
      })
      .catch(done);
  });

  it('createUser should only allow Brown email addresses', (done) => {
    createUser(
      {
        email: 'andy@harvard.edu',
        firstName: 'Andy',
        lastName: 'Van Dam',
      },
    )
      .catch(() => {
        done();
      });
  });

  it('createUser should only allow unique email addresses', (done) => {
    User.create(
      {
        email: 'andy@brown.edu',
        firstName: 'Andy',
        lastName: 'Van Dam',
      },
    )
      .then(() => {
        createUser(
          {
            email: 'andy@brown.edu',
            firstName: 'Andy',
            lastName: 'Van Dam',
          },
        )
          .catch(() => {
            done();
          });
      });
  });

  it('deleteUser should delete a user', (done) => {
    User.create(
      {
        email: 'andy@brown.edu',
        firstName: 'Andy',
        lastName: 'Van Dam',
      },
    )
      .then((user) => {
        deleteUser(user.email)
          .then(() => {
            User.findOne({ _id: user._id }).exec()
              .then((user1) => {
                expect(user1).to.be.null;
                done();
              });
          });
      });
  });

  it('doesUserWithEmail should check whether a user exists with the email', (done) => {
    const user = {
      email: 'andy@brown.edu',
      firstName: 'Andy',
      lastName: 'Van Dam',
    };
    User.create([user])
      .then(() => {
        doesUserWithEmailExist('andy@brown.edu')
          .then((result) => {
            expect(result).to.be.true;
            done();
          });
      });
  });
});

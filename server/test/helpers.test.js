const mongoose = require('mongoose');
const db = require('../src/util/db');

before((done) => {
  db().then(() => {
    done();
  });
});

after((done) => {
  mongoose.connection.db.dropDatabase().then(() => {
    mongoose.connection.close().then(() => {
      done();
    });
  });
});

const Datastore = require('nedb-promises');
const db = Datastore.create({ filename: './data.db', autoload: true });
const usersDb = Datastore.create({ filename: './users.db', autoload: true });
module.exports = {db, usersDb};
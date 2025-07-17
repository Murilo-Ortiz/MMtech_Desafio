const Datastore = require('nedb-promises');
const contactsDb = Datastore.create({ filename: 'data.db', autoload: true });
const usersDb = Datastore.create({ filename: 'users.db', autoload: true });
module.exports = {contactsDb, usersDb};
const Datastore = require('nedb-promises');
const db = Datastore.create({ filename: './data.db', autoload: true });

module.exports = db;
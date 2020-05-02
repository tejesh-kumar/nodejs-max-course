const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
// '_' => this variable will be only used in this file

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://tejesh:jeIJ3EMjPYgesXG8@max-node-vpc9g.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        _db = client.db();                // Storing an access to the database in _db
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://tejesh:jeIJ3EMjPYgesXG8@max-node-vpc9g.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;

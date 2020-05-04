const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class User {
    constructor(userName, email, cart, id) {
        this.name = userName;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(_id === product._id)

        const updatedCart = {items: [{ productId: new mongodb.ObjectID(this._id), quantity: 1 }]};
        const db = getDb();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: { cart: updatedCart } });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectID(userId) })
        .then(user => {
            return user;
        })
        .catch(err => console.log(err));
    }
}

module.exports = User;
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
        const db = getDb();
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();   
        })

        let newQuantity = 1;
        const updatedCartItems = [ ...this.cart.items ];

        if(cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({ productId: new mongodb.ObjectID(product._id), quantity: newQuantity });
        }
        
        const updatedCart = { 
            items: updatedCartItems 
        };
        
        return db.collection('users').updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDb();
        
        const productIds = this.cart.items.map(i => i.productId);
        return db.collection('products').find({_id: {$in: productIds}}).toArray()
        .then(products => {
            return products.map(product => {
                return { ...product, quantity: this.cart.items.find(item => {
                    return item.productId.toString() === product._id.toString(); 
                }).quantity
              };
            })
        })
    }

    deleteItemFromCart(prodId) {
        const db = getDb();

        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== prodId.toString());

        const updatedCart = {
            items: updatedCartItems
        }

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
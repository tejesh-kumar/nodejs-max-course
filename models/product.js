const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);  

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {                                // cb - callback function is passed to fetchAll(), hence once it returns the array to products, then it is res.render({...}) rendered.
           cb([]);
        }
        else {
            cb(JSON.parse(fileContent)); 
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {        // id='null', for products that are getting newly created.
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if(this.id) {
               const existingProductIndex = products.findIndex(p => p.id === this.id);
               const updatedProducts = [ ...products ];
               updatedProducts[existingProductIndex] = this;
               fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }


        });
    }

    static delete(prodId) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === prodId);
            console.log(product);
            const updatedProducts = products.filter(p => p.id !== prodId);   // updatedProducts now does not contain deleted product & we can update it to file.
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(prodId, product.price);
                }
            })
        })
    }

    static fetchAll(cb) {   
        getProductsFromFile(cb);
    }

    static findById(id, cb) {   
        getProductsFromFile((products) => {
            const product = products.find(p => id === p.id);
            cb(product);
        });
    }
}
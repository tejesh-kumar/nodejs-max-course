const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);  

const getContentsFromFile = (cb) => {
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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();                        // Adds an unique product id while saving in the file.
        getContentsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {   
        getContentsFromFile(cb);
    }
}
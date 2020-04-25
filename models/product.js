const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );                              

        fs.readFile(p, (err, fileContent) => {
            // console.log(err);
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
            
        })                   
    }

    static fetchAll(cb) {   
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );  
        
        fs.readFile(p, (err, fileContent) => {
            if(err) {                                // cb - callback function is passed to fetchAll(), hence once it returns the array to products, then it is res.render({...}) rendered.
                cb([]);
            }
            cb(JSON.parse(fileContent)); 
        })
    }
}
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);  

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch previous cart.
        let cart = { products: [], totalPrice: 0 };

        fs.readFile(p, (err, fileContent) => {
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => Find existing product.
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [ ...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct ];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });

        

        // Add new Product or increase the quantity.
    }

    static deleteProduct(id, productPrice) {
     
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(p => p.id === id);
          
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (+productPrice * product.qty); 
         
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        })
    }

    // static getAllProducts() {
    //     fs.readFile(p, (err, fileContent) => {
    //         if(!err) {
    //             const cart = JSON.parse(fileContent);
    //         }
            
    //     })
    // }
}
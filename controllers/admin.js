const mongodb = require('mongodb');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {                
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => { 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, price, description, imageUrl);
    product.save()
    .then(result => {
        // console.log(result);
        console.log('Product Created');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));             
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    
    if(!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
    .then(product => {
        if(!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err)); 
}

exports.postEditProduct = (req, res, next) => {
    const productData = {
        id: req.body.productId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }

    const product = new Product(productData.title, productData.price, productData.description, productData.imageUrl, new mongodb.ObjectID(productData.id));
    product.save()
    .then(() => {
        console.log('Product updated successfully');        // Instead of chaining promises inside the 1st promise is returned & another then() method performs subsequent operations, the single 'catch()' catches any errors in all 'then()' blocks.
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));  
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(() => {
        console.log('Destroyed Product');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {  
    Product.fetchAll()
    .then((products) => {
        res.render('admin/products', {           // path must be viewed as root folder is views.
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        }); 
    })
    .catch(err => console.log(err));
           
}
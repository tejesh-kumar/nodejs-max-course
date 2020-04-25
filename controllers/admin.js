const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {                
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {             
    const product = new Product(req.body.title);      // product is created by instantiation of class.
    product.save();                                  // To save the product
    res.redirect('/');                   
}

exports.getProducts = (req, res, next) => {   
    Product.fetchAll((products) => {
        res.render('admin/products', {           // path must be viewed as root folder is views.
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });    
    });
}
// products controller logic - All controller logics involving the products is contained in this folder
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {                
    res.render('add-product', {
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
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });    
}


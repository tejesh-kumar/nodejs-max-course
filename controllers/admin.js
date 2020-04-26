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

    const product = new Product(title, imageUrl, description, price);      // product is created by instantiation of class.
    product.save();                                                      // To save the product
    res.redirect('/');                   
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    
    if(!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {

        if(!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });

}

exports.postEditProduct = (req, res, next) => {
    const editedProductDetails = {
        id: req.body.id,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }

    const updatedProduct = new Person(editedProductDetails.title, editedProductDetails.imageUrl, editedProductDetails.description, editedProductDetails.price);
//    Product.fetchAll((products) => {
//        const products = [ ...products ];
//        products[editProductIndex] = updatedProduct;
//    });
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
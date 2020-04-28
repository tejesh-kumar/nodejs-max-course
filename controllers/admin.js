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

    const product = new Product(null, title, imageUrl, description, price);      // product is created by instantiation of class.
    product.save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });                                                      // To save the product               
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
        id: req.body.productId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    }

    console.log(editedProductDetails);

    const updatedProduct = new Product(editedProductDetails.id, editedProductDetails.title, editedProductDetails.imageUrl, editedProductDetails.description, editedProductDetails.price);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.delete(prodId);
    res.redirect('/admin/products');
    
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
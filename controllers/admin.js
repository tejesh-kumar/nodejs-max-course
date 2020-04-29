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

    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
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
    req.user.getProducts({where: {id: prodId}})
    // Product.findByPk(prodId)
    .then(products => {
        const product = products[0];
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

    Product.findByPk(productData.id)
    .then((product) => {
        product.id = productData.id;
        product.title = productData.title;
        product.imageUrl = productData.imageUrl;
        product.price = productData.price;
        product.description = productData.description;      // changes are saved only in js object but not in database.

        return product.save();                                    // Now, changes are saved or updated to the database.
    })
    .then(() => {
        console.log('Product updated successfully');        // Instead of chaining promises inside the 1st promise is returned & another then() method performs subsequent operations, the single 'catch()' catches any errors in all 'then()' blocks.
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));  
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByPk(prodId)
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
    req.user.getProducts() 
    // Product.findAll()
    .then((products) => {
        res.render('admin/products', {           // path must be viewed as root folder is views.
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        }); 
    })
    .catch(err => console.log(err));
           
}
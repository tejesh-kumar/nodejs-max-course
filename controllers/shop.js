const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {   
    Product.findAll().then(products => {
        res.render('shop/product-list', {           // path must be viewed as root folder is views.
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        }); 
    })
    .catch(err => console.log(err));
}


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
            pageTitle: product[0].title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
}


exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then((products) => {
        res.render('shop/index', {           // path must be viewed as root folder is views.
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        });  
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if(cart.products.find(p => product.id === p.id)) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        })
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    
    Product.findById(prodId, (product) => {
        // res.render('shop/cart', {
        //     product: product,
        //     pageTitle: 'Your Cart',
        //     path: '/cart'
        // });
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
    
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Product Checkout',
        path: '/checkout'
    });
}



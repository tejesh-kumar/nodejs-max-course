const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
// const db = require('./util/database');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);    


// In product.js model
    // static fetchAll() {   
    //     return db.execute('SELECT * FROM products');     // returns a promise
    // }
// In shop.js controller
    // exports.getProducts = (req, res, next) => {   
    //     Product.fetchAll()
    //     .then(([rows, fieldData]) => {                  // Array destructuring
    //         res.render('shop/product-list', {           // path must be viewed as root folder is views.
    //             prods: rows, 
    //             pageTitle: 'All Products', 
    //             path: '/products'
    //         }); 
    //     });
    // }

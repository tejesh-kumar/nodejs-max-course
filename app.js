const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(3000); 
})
.catch(err => console.log(err));

// Edit or updating products

// Method 1
    // exports.postEditProduct = (req, res, next) => {
    //     Product.update({
    //         id: req.body.productId,
    //         title: req.body.title,
    //         imageUrl: req.body.imageUrl,
    //         price: req.body.price,
    //         description: req.body.description
    //     }, {where: {id: req.body.productId}})
    //     .then(() => {
    //         console.log('Product updated successfully');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));  
    // }

// Method 2
    // exports.postEditProduct = (req, res, next) => {
    //     const productData = {
    //         id: req.body.productId,
    //         title: req.body.title,
    //         imageUrl: req.body.imageUrl,
    //         price: req.body.price,
    //         description: req.body.description
    //     }

    //     Product.findByPk(productData.id)
    //     .then((product) => {
    //         product.id = productData.id;
    //         product.title = productData.title;
    //         product.imageUrl = productData.imageUrl;
    //         product.price = productData.price;
    //         product.description = productData.description;      // changes are saved only in js object but not in database.

    //         return product.save();                                    // Now, changes are saved or updated to the database.
    //     })
    //     .then(() => {
    //         console.log('Product updated successfully');        // Instead of chaining promises inside the 1st promise is returned & another then() method performs subsequent operations, the single 'catch()' catches any errors in all 'then()' blocks.
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));  
    // }   



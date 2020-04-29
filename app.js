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

// Deleting products using Sequelize.

    // exports.postDeleteProduct = (req, res, next) => {
    //     const prodId = req.body.productId;

    //     Product.findByPk(prodId)
    //     .then(product => {
    //         return product.destroy();
    //     })
    //     .then(() => {
    //         console.log('Destroyed Product');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // }


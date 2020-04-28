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

// Two ways to find a product by id using sequelize from table.
// Product.findByPk(productId) will return the particular product from table.
// Product.findAll({where: {id: prodId}}) will return an array of products matching this id.
// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     Product.findAll({where: {id: prodId}}).then(products => {
//             res.render('shop/product-detail', {
//             product: products[0],
//             pageTitle: products[0].title,
//             path: '/products'
//         });
//     })
//     .catch(err => console.log(err));
    // Product.findByPk(prodId)
    // .then(product => {
    //     res.render('shop/product-detail', {
    //         product: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     });
    // })
    // .catch(err => console.log(err));
// }

   



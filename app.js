const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();   

app.set('view engine', 'pug');      // pug is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: '404 page'});
})

app.listen(3000);    


// Using templating engines pug, handlebars, ejs
// In order to make express aware of using templating engines we must set a global configuration object in an express application using app.set(). These can be keys or configuration objects which express does not understand & ignores them but we can read them by accessing using app.get(). This can be other way of sharing data across express application
// (views, view engine, etc) are some of reserved global configuration objects provided by express.
// view engine - represents the registered templating engine that express has to use to deliver dynamic content templates [eg:- app.set('view engine', 'pug')].
// views - tells express where to find these dynamic views. The default value for views is views folder in root directory but if we want to re-configure to some other folder value needs to be explicitly set.
// We have added pug files in views(shop.pug)
// router.get('/', (req, res, next) => {     // express will render 'shop.pug' file in views with configured templating engine extension(pug) for this route.
//     res.render('shop');    
// });
// if prods.length > 0      // if statement in pug
// each product in prods     // for each loop in pug
// h1.product__title #{product.title}    // output dynamic content



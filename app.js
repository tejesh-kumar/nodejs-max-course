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
    res.status(404).render('404', {pageTitle: 'Page not found'});
})

app.listen(3000);    


// block styles - block keyword in pug allows to add extra html lines in other files (eg:- additional css files linked with link tags for which 'styles' is placeholder).
//extends layouts/main-layout.pug   // extends the common layout into other pages(eg:- header).
// block content            // defining what the content variable must render in 404 page.
//      h1 Page not found



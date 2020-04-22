const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: '/default'});
})

app.listen(3000);    


// Model View Controllers
// model - objects that represents data in your code & allowing to work with data (eg:- save, fetch to or from a file)
// views - responsible for what the user sees. Rendering the right content in the html. They are decoupled from your application code and things like templating engines can be used to generate the views by inserting data.
// controllers - connects models with views. Act like middleware, contains inbetween logic. Controllers are split across different middleware functions.
// So, the Routes decide which controllers to run for that route, and those controllers decide which models & views should run. 

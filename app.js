const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();   

app.engine('hbs', expressHbs());   // express is made aware of handlebars engine is available.
app.set('view engine', 'hbs');      // handlebars is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
})

app.listen(3000);    


// We have to manually instally express-handlebars using
// const expressHbs = require('express-handlebars');
// app.engine('handlebars', expressHbs());   // express is made aware of handlebars engine is available (expressHbs() - initializes the engine)
// app.set('view engine', 'handlebars');     // handlebars is a registered templating engine to deliver templates.
// extension of files must match the variable 'handlebars' (eg:- shop.handlebars).
// Dynamic content in handlebars is loaded within {{pageTitle}}.


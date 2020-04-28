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
    console.log(result);
    app.listen(3000); 
})
.catch(err => console.log(err));

   


// To create tables for product model by sequelize, we make sure that all models get transformed into tables, or a table that belongs to model on starting the application.   
// sync() looks at all the models which are defined & create a tables for them & relations if we have.
// Starting the server only if no error in creating tables.
//      const sequelize = require('./util/database');
        // sequelize.sync().then(result => {
        //     console.log(result);
        //     app.listen(3000); 
        // })
        // .catch(err => console.log(err));
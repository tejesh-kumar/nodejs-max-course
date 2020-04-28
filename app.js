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


// In product.js, 
// Import Sequelize & sequelize to create a product model establish a database connection.

//'product' - name of model.
// The object parameter defines the model and also the database structure.

    // const Sequelize = require('sequelize');
    // const sequelize = require('../util/database');
    // const Product = sequelize.define('product', {});    

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


// Sequelize is an object relational mapping library.
// Sequelize requires 'mysql2' package.
// Steps to execute in sequelize :-
// 1. Create a model & connect to a database.

// In database.js file, code written to connect sequelize to the database,
// const Sequelize = require('sequelize');   // Since, we are importing a class or constructor function it is named as 'Sequelize'.
// const sequelize = new Sequelize('node-complete', 'root', 'tejesh123', {
//     dialect: 'mysql',
//     host: 'localhost'
// });
// module.exports = sequelize;           
// 'sequelize' is an instance, which is also a connection pool.

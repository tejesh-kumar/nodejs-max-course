const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);    


// created mysql database.
// npm install --save mysql2   => 'mysql2' package installed to interact with mysql.
// Create database.js in utils => code that connects to mysql database & give us back a connection object which allows to run queries.
// A connection must be established to run queries and close the connection, doing manually is practically impossible for each query. Hence, we can create a connection pool. This pool contains connections which can be used for each query, the connections in pool get exhausted on shutting down the program.
    // const pool = mysql.createPool({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'node-complete',
    //     password: 'tejesh123'
    // });
    // module.exports = pool.promise();
// db - contains pool of connections to run queries.
// db.execute('SELECT * FROM products') - used to execute queries.
// db.end() - used when the application needs to shut down.
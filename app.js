const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');


const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(user => {
    //     req.user = user;
    //     next();              
    // })
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
});




// Installing mongodb driver
// npm install --save mongodb  => mongodb driver to connect to mongodb.

    // const mongodb = require('mongodb');
    // const MongoClient = mongodb.MongoClient;
    // MongoClient.connect('mongodb+srv://tejesh:jeIJ3EMjPYgesXG8@max-node-vpc9g.mongodb.net/test?retryWrites=true&w=majority');
// We can connect this 'MongoClient' to the mongodb database.
// mongodb+srv://tejesh:<password>@max-node-vpc9g.mongodb.net/test?retryWrites=true&w=majority => connection-string. 
// Replace the correct userName & password.
// 'connect' method returns a promise
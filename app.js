const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(5)
    .then(user => {
        req.user = user;
        next();              // We stored the sequelize object 'user' in 'req' object, but, we are not sending response => we use next() so that the request is funneled to next middlewares.
    })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product, {constraints: true});

// sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    return User.findByPk(5); 
})
.then((user) => {
    if(!user) {
        return User.create({ name: 'tejesh', email: 'tejesh@gmail.com' });
    } 
    // return Promise.resolve('user');
    return user;
})
.then((user) => {
    // console.log(user);
    app.listen(3000); 
})
.catch(err => console.log(err));


// Creating a dummy user

    // sequelize.sync()
    // .then(result => {
    //     return User.findByPk(5); 
    // })
    // .then((user) => {
    //     if(!user) {
    //         return User.create({ name: 'tejesh', email: 'tejesh@gmail.com' });
    //     } 
    //     // return Promise.resolve('user');
    //     return user;
    // })
    // .then((user) => {
    //     // console.log(user);
    //     app.listen(3000); 
    // })
    // .catch(err => console.log(err));



    // app.use((req, res, next) => {
    //     User.findByPk(5);
    // });
// Once all the tables are created, in then()
// If user exists, we return user-object but if user does not exist we return a user-promise, hence to return always a consistent user-promise, we used Promise.resolve(user);
// But, by default when we are returning any object into then(), it internally returns a promise-object that can be resolved in then(). Hence, we can return only a object, return user;

    // app.use((req, res, next) => {
    //     User.findByPk(5)
    //     .then(user => {
    //         req.user = user;
    //         next();              // We stored the sequelize object 'user' in 'req' object, but, we are not sending response => we use next() so that the request is funneled to next middlewares.
    //     })
    // });
// A middleware function executed to fetch the user on incoming requests. 
// Initially, when server starts, it sets up tables & starts listening to incoming requests. The above middleware is just registered and is executed only on incoming requests. Hence, we are very much guaranteed that we get a user from database using above middleware on incoming requests.
//  We want to store this user in a request, req.user = user; => Valid as we can add a new field to a existing request(req) object but not over-riding some of existing fields like 'body'.
// This user retrieved from db is not just a normal js object containing values but is a 'sequelize object' stored in the database => we can utilize all sequelize methods like (destroy, etc).
// Now, we can use the user to create other products.

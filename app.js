const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();              // We stored the sequelize object 'user' in 'req' object, but, we are not sending response => we use next() so that the request is funneled to next middlewares.
    })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsTo(Order, { through: OrderItem });

// sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    return User.findByPk(1); 
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
    user.createCart();
})
.then((cart) => {
    app.listen(3000); 
})
.catch(err => console.log(err));


//  On clicking 'checkout' in cart all products from cart must be removed & create a new order that is related to couple of products & a user.
//  Order is an in-between table (between a user (to which this order belongs) and multiple products present in this order)

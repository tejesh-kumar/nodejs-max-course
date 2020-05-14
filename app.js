const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const User = require('./models/user');


const app = express();   

app.set('view engine', 'ejs');     
app.set('views', 'views');        

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5eaec41c3b43c24eef83172f')
    .then(user => {
        console.log(user);
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();              
    })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://tejesh:jeIJ3EMjPYgesXG8@max-node-vpc9g.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));



// Drop the shop collection in mongodb.
// In product model,
// Import mongoose & create a 'Schema' which is a constructor function. This constructor allows me to create new schemas (eg: productSchema)

// This object passed to constructor defines the fields and their datatypes present in productSchema. Object-Id will be added to schema automatically.

 

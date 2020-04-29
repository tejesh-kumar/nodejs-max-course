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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product, {constraints: true});

sequelize.sync({force: true})
.then(result => {
    // console.log(result);
    app.listen(3000); 
})
.catch(err => console.log(err));


// Association(relations) across different models.
// Each model can have one-one, one-many, many-one relationships with other models. To represent these associations with Sequelize,
// In app.js, before syncing with database,

    // Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// User created the product, "onDelete: 'CASCADE'" implies if a user is deleted, his relative products should get deleted.

    // User.hasMany(Product, {constraints: true});
// One user can add or create multiple products.

    // sequelize.sync({force: true})
    // .then(result => {
    //     // console.log(result);
    //     app.listen(3000); 
    // })
    // .catch(err => console.log(err));
// force: true => any previously created tables with no relations can be forced to over-ride to follow relations or associations with other tables as configured using above model-relations. This parameter not used in production.
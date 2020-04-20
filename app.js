const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();   

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);

app.use('/shop', shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');  
})

app.listen(3000);    




// Instead of using
// router.post('/admin/add-product', (req, res, next) => {         // in admin.js file    
//     // res.send('<h1>Product Added Successfully</h1>');
//     console.log(req.body);         
//     res.redirect('/');                   
// });

// app.use('admin', adminRoutes);       // in app.js file


// We can filter paths using this method
// router.post('/add-product', (req, res, next) => {            // in admin.js file 
//     // res.send('<h1>Product Added Successfully</h1>');
//     console.log(req.body);         
//     res.redirect('/');                   
// });

// app.use('admin', adminRoutes);       // in app.js file

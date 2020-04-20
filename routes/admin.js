const express = require('express');

const router = express.Router();

// Since, these routes reached by admin
router.get('/add-product', (req, res, next) => {                
    res.send(
        '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
        );      
});

router.post('/product', (req, res, next) => {             
    // res.send('<h1>Product Added Successfully</h1>');
    console.log(req.body);         
    res.redirect('/');                   
});



module.exports = router;


// const router = express.Router() - 'router' is like mini express app tied or pluggable to other express app.
// module.exports = router - 'router' can be exported this way & this Router is used to register routes.
// router is a valid middleware function hence it can be used as app.use(adminRoutes);
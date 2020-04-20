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



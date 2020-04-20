const express = require('express');

const router = express.Router();

// Since, these routes reached by admin

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {                
    res.send(
        '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
    );      
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {             
    // res.send('<h1>Product Added Successfully</h1>');
    console.log(req.body);         
    res.redirect('/');                   
});



module.exports = router;



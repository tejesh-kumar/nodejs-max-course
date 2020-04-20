const express = require('express');

const router = express.Router();

// Since, these routes reached by users
router.get('/', (req, res, next) => {             
    res.send('<h1>Hello from shop</h1>');      
});

module.exports = router;
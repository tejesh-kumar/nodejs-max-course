const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {             
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));     
});

module.exports = router;


// res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //path.join() constructs the absolute path from root of os, depending on the os.
// __dirname provides absolute path from root of operating system to the file which we are presently calling in(here inside routes).

const path = require('path');

module.exports = path.dirname(process.mainModule.filename);


// better way to construct the path to a file
// path.dirname(process.mainModule.filename);                   // provides an absolute path (parent directory) to the file which is serving files(app.js).
//router.get('/add-product', (req, res, next) => {                
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));  
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));            // helper function to construct absolute path.   
//});
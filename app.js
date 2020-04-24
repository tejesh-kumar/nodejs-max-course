const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);    


// saving products to a file instead of pushing to array.
// data folder created in main directory with products.json file in it.
// fs.readFile() - reads the complete file
// fs.createReadStream - Reading data in chunks & start working on them if it is big file.

// fs.readFile(p, (err, fileContent) => {
//     // console.log(err);
//     let products = [];                         // reading data from file for previously saved products.
//     if(!err) {                                 // if(err) => 'no such file or directory', means no products previously saved as there is no file, hence products = [].
//         products = JSON.parse(fileContent);    // if(!err) => parse & read content of file.
//     }
//     products.push(this);
//     fs.writeFile(p, JSON.stringify(products), (err) => {
//         console.log(err);
//     });
// })

// fs.readFile(p, (err, fileContent) => {
//     if(err) {                                // err - No file in this name, hence no products
//         return [];                           // reading data from file
//     }
//     return(JSON.parse(fileContent));
// })

// static fetchAll() {   
//     const p = path.join(                            // getting an error in products.js as products.length is not defined, due to asynchronous nature of code, products.length is executed before products array is returned from product.js model.
//         path.dirname(process.mainModule.filename), 
//         'data', 
//         'products.json'
//     );  
    
//     fs.readFile(p, (err, fileContent) => {
//         if(err) {                                // err - No file in this name, hence no products
//             return [];
//         }
//         return(JSON.parse(fileContent));
//     })
// }
const express = require('express');
const bodyParser = require('body-parser');   

const app = express();   

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {                
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');      
});

app.post('/product', (req, res, next) => {             
    // res.send('<h1>Product Added Successfully</h1>');
    console.log(req.body);         
    res.redirect('/');                   
});

app.use('/', (req, res, next) => {             
    res.send('<h1>Hello from express</h1>');      
});


app.listen(3000);    



// app.use('/product', (req, res, next) => {             
//     console.log(req.body);         
//     res.redirect('/');                   
// });
// To filter the above middleware for get or post requests we can use app.get() or app.post()
// app.post('/product', (req, res, next) => {       // triggers only for post requests      
//     console.log(req.body);         
//     res.redirect('/');                   
// });

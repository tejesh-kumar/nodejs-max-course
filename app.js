const express = require('express');
const bodyParser = require('body-parser');   

const app = express();   

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {                
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');      
});

app.use('/product', (req, res, next) => {             
    // res.send('<h1>Product Added Successfully</h1>');

    console.log(req.body);            // convenient method added by express (req.body)
    res.redirect('/');               // alternate to set header & send to other url.      
});

app.use('/', (req, res, next) => {             
    res.send('<h1>Hello from express</h1>');      
});


app.listen(3000);    


// body-parser = 3rd party express package to parse the request body as req does not have 'body' method.
// This body-parser middleware must be above other routing middlewares as body must be parsed irrespective of where the routes get funneled.
//  body-parser is installed and require.
// app.use(bodyParser.urlencoded())  :- urlEncoded() method is a middleware which parses the entire body and next() is executed internally to funnel req to further middlewares.
// bodyParser has different methods to handle different types of req body(eg:-urlencoded()). Hence, express is very flexible.
// app.use(bodyParser.urlencoded({extended: false})) :- the config object indicates bodyParser must be able to parse non-default objects.

// const http = require('http');

const express = require('express');   

const app = express();   

app.use('/', (req, res, next) => {              // executes callback for all urls starting with '/'(any url is satisfied).
    console.log('This always runs');
    next();                                    // if response is not sent by middleware then it is transferred to next set of middlewares by adding next()
});

app.use('/add-product', (req, res, next) => {                
    console.log('add-product');
    res.send('<h1>Hello from add product</h1>');      
});

app.use('/', (req, res, next) => {             // executes callback for all urls starting with '/'(can be used as default route, to be last middleware from top so that only default routes get funneled).
    console.log('hello from express');
    res.send('<h1>Hello from express</h1>');      
});


app.listen(3000);    // shortcut provided by express equivalent to spin up a server and listen to requests.


// app.use([url1, url2, ...], [callback fn1, callback fn2, callback fn3]);    // it executes corresponding callbacks for those urls(acts as url filter). 
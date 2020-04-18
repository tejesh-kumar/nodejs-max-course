const http = require('http');

const express = require('express');   

const app = express();   

app.use((req, res, next) => {   // use() allows to use a new middleware function. use() accepts an array of request handlers
    console.log('in the middleware');
    next();    // allows the request to continue to next middleware in line. We must return a response in a middleware if next() is not used otherwise the request dies.
});     

app.use((req, res, next) => {   // use() allows to use a new middleware function. use() accepts an array of request handlers
    console.log('in the next middleware');
});

const server = http.createServer(app);   

server.listen(3000); 

// middlewares - set of functions(request handlers) through which requests are funneled until a response is sent from one of the middleware.
// Helps to split the business logic into modules(middlewares) to handle requests.
// Even, 3rd party packages provide such middleware functions which can be plugged into express middlewares(flexible). 
// next() is a function passed as an argument to the function by express to funnel requests to next middlewares.


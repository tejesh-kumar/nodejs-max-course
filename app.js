// const http = require('http');

const express = require('express');   

const app = express();   

app.use((req, res, next) => {   
    console.log('in the middleware');
    next();    
});     

app.use((req, res, next) => {                     // send response from this middleware.
    console.log('in the next middleware');
    res.send('<h1>Hello from express</h1>');             // send() allows to send a response.
});

// const server = http.createServer(app);   

// server.listen(3000); 

app.listen(3000);    // shortcut provided by express equivalent to spin up a server and listen to requests.



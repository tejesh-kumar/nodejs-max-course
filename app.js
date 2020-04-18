const http = require('http');

const express = require('express');   // express exports a express() function to create an instance

const app = express();   // creating an express app & storing in variable. Now, the app is a valid request handler.

const server = http.createServer(app);    // app - requesthandler  

server.listen(3000);       



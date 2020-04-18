// http, https, fs, path, os are default packages that ship with node.

// create a node server
const http = require('http');

const routes = require('./routes');

console.log(routes.someText);

const server = http.createServer(routes.handler);   // createServer returns a server object which is stored in variable.

server.listen(3000);       // listen allows nodejs to receive incoming requests instead of quitting. listen takes two optional arguments(port, hostname=localhost in development)



// http, https, fs, path, os are default packages that ship with node.

// create a node server
const http = require('http');

const server = http.createServer((req, res) => {   // createServer returns a server object which is stored in variable.
            console.log(req.url, req.headers, req.method);       // req - request object created by node.js containing the request information.
            // process.exit();         // Server shuts down

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Response</title></head>');
            res.write('<body><h1>Hello from node.js server</h1></body>');
            res.write('<html>');
            res.end();

        });

server.listen(3000);       // listen allows nodejs to receive incoming requests instead of quitting. listen takes two optional arguments(port, hostname=localhost in development)
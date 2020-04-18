// http, https, fs, path, os are default packages that ship with node.

// create a node server
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {   // createServer returns a server object which is stored in variable.
           
        if(req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('<html>');
            return res.end();
        }

        if(req.url === '/message' && req.method === 'POST') {
            const body = [];

            req.on('data', (chunk) => {
                body.push(chunk);
                console.log(chunk);
            });

            return req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                console.log(parsedBody);
                const message = parsedBody.split('=')[1];
                // fs.writeFileSync('userMsg.txt', message);
                fs.writeFile('userMsg.txt', message, (err) => {
                    res.statusCode = 302;              //procedure to redirect to a page
                    res.setHeader('Location', '/');
                   return res.end();
                });  // writeFileSync(filename, message) is writing to file synchronously which will block the thread, hence writeFile(filename, message, callback) to make this process asynchronously.
            })
           
        }

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Response</title></head>');
            res.write('<body><h1>Hello from node.js server</h1></body>');
            res.write('<html>');
            res.end();

        });

server.listen(3000);       // listen allows nodejs to receive incoming requests instead of quitting. listen takes two optional arguments(port, hostname=localhost in development)
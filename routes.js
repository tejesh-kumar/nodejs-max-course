const fs = require('fs');


const requestHandler = (req, res) => {
const url = req.url;
const method = req.method;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('<html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
        
            fs.writeFile('message.txt', message, (err) => {
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
}


// module.exports = requestHandler;

// // multiple exports (multiple-ways)
// module.exports = {
//     handler: requestHandler,
//     someText: 'Hardcoded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = 'Hardcoded text';

// exports.handler = requestHandler;
// exports.someText = 'Hardcoded text';



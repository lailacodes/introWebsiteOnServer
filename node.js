const http = require('http');
const fs = require('fs')
const path = require('path')

http.createServer(function (req, res) {
    let extname = path.extname(req.url);
    let contentType = 'text/html';
    if (extname == '.jpeg') contentType = 'image/jpeg'

    res.writeHead(200, {'Content-Type': contentType});
    if (req.url == '/' || req.url == '/index.html') {
        fs.readFile('./index.html', null, function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found")
            }
            res.write(data);
            res.end();
        });
    }
    if (req.url == '/introduction.html') {
        fs.readFile('./introduction.html', null, function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found")
            }
            res.write(data);
            res.end();
        });
    }
    if (req.url.startsWith('/img/')) {
        // Serve image files
        const imagePath = path.join(__dirname, req.url);
        fs.readFile(imagePath, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }
}).listen(3000);

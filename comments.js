// create web server
// run server: node comments.js

// require node modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// create http server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];

    // check if request is for static files
    if (extname) {
        fs.readFile(__dirname + pathname, function (err, data) {
            if (err) {
                // display error
                res.writeHead(500);
                return res.end('Error loading ' + pathname);
            }

            // set mime type and send data
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(data);
        });
    } else {
        // check if request is for comments
        if (req.method === 'POST') {
            // get data from request body
            var body = '';
            req.on('data', function (data) {
                body += data;
            });

            // process data from request body
            req.on('end', function () {
                var comment = qs.parse(body);

                // append comment to file
                fs.appendFile('comments.txt', comment.comment + '\n', function (err) {
                    if (err) {
                        // display error
                        res.writeHead(500);
                        return res.end('Error loading ' + pathname);
                    }

                    // redirect to comments.html
                    res.writeHead(302, {'Location': 'comments.html'});
                    res.end();
                });
            });
        } else {
            // display comments
            fs.readFile('comments.txt', function (err, data) {
                if (err) {
                    // display error
                    res.writeHead(500);
                    return res.end('Error loading ' + pathname);
                }

                // set mime type and send data
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            });
        }
    }
}).listen(3000, '127    .0.0.1');   // listen on port 3000
console.log('Server running at http://');

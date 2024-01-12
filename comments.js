// create web server
var http = require('http');

// create web server object
var server = http.createServer(function(req, res) {
    // write http header
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    // write message and signal communication is complete
    res.end('Hello World\n');
});

// start listening on port 3000
server.listen(3000, '
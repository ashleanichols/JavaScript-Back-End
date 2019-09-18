const http = require('http');
const port = 5555;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.write('Hello');
    res.end();
}).listen(port);
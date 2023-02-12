const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html',
    });

    if (req.url == '/') {
        res.write('<h1>Hello from NodeJS</h1>');
    } else if (req.url == '/cats') {
        res.write('<h1>Timmy says Hi!!!</h1>');
    } else {
        res.write('<h1>404 Not Found!!!!</h1>');
    }

    res.end();
});

server.listen(5000);
console.log('Server is running on port 5000...');

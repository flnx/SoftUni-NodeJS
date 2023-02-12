const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Hello from NodeJS');
    res.end();
});

server.listen(5000);
console.log('Server is running on port 5000...');

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url == '/favicon.ico') {
        res.writeHead(404);
        res.write('404 Not Found');
        res.end();
    } else {
        fs.createReadStream('./veryBigFile.txt').pipe(res);
    }
});

server.listen(3000);
console.log('Server is running on port 3000... :)');

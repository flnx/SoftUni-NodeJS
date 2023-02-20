const http = require('http');
// const eventBus = require('./eventBus');
const emitter = require('./eventBus');

const server = http.createServer((req, res) => {
    emitter.emit('request', { method: req.method, url: req.url });

    res.end();
});

server.listen(5000);

console.log('Server is listening on port 5000...');

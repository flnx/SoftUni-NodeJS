const { homePage, sendFile } = require('./boardController');
const { createImage } = require('./createController');

function handleRequest(req, res) {
    let handler;

    if (req.method == 'GET') {
        if (req.url == '/') {
            handler = homePage;
        } else if (req.url == '/style.css' || req.url.slice(0, 4) == '/img') {
            handler = sendFile;
        }
    } else if (req.method == 'POST') {
        handler = createImage;
    }

    if (typeof handler == 'function') {
        handler(req, res);
    } else {
        res.writeHead(404);
        res.write('404 Not Found');
        res.end();
    }
}

module.exports = {
    handleRequest,
};

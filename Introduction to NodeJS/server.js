const http = require('http');

const cats = require('./cats.json');
const siteCss = require('./css/site.css');

const homePage = require('./views/index');
const editPage = require('./views/edit');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    if (req.url == '/') {
        res.write(homePage);
    } else if (req.url == '/css/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css',
        });
        res.write(siteCss);
    } else if (/cats\/\d+\/edit/.test(req.url)) {
        let catId = req.url.split('/')[2];
        let cat = cats.find(x => x.id == catId);

        res.write(editPage(cat));
    } else {
        res.write(`
            <h1>Not found</h1>
        `);
    }

    res.end();
});

server.listen(5000);
console.log('Server is running on port 5000...');

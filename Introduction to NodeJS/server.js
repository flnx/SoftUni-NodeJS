const http = require('http');

const cats = require('./cats.json');
const siteCss = require('./css/site.css');

const homePage = require('./views/index');
const editPage = require('./views/edit');
const addCatPage = require('./views/addCat');
const addBreedPage = require('./views/addBreed');
const shelterCatPage = require('./views/catShelter');

const server = http.createServer((req, res) => {
    console.log(req.method);

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

    } else if (isEditById(req.url)) {
        let catId = req.url.split('/')[2];
        let cat = cats.find((x) => x.id == catId);

        res.write(editPage(cat));

    } else if (isDeleteById(req.url)) {
        const catId = req.url.split('/')[2];
        let cat = cats.find((x) => x.id == catId);

        res.write(shelterCatPage(cat));

    } else if (req.url == '/cats/add-breed') {
        res.write(addBreedPage);

    } else if (req.url == '/cats/add-cat') {
        res.write(addCatPage);

    } else {
        res.write(`
            <h1>Not found</h1>
        `);
    }

    res.end();
});

server.listen(5000);
console.log('Server is running on port 5000...');

function isEditById(url) {
    return /cats\/\d+\/edit/.test(url);
}

function isDeleteById(url) {
    return /cats\/\d+\/delete/.test(url);
}

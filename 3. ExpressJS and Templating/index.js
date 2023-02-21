const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h1>Home page</h1>
        <a href="/">Home</a>
        <a href="/cats">Cats</a>
        <a href="/dogs">Dogs</a>
        `);
});

app.get('/cats', (req, res) => {
    res.send(`
        <h1>Cats page</h1>
        <a href="/">Home</a>
        <a href="/cats">Cats</a>
        <a href="/dogs">Dogs</a>
        `);
});

app.get('/cats/:catId', (req, res) => {
    res.send(`
        <h1>Cat Details</h1>
        <a href="/">Home</a>
        <a href="/cats">Cats</a>
        <a href="/dogs">Dogs</a>
        <p>I'm a very angry cat!!</p>
        `);
});

app.get('/dogs', (req, res) => {
    res.send(`
        <h1>Dogs page</h1>
        <a href="/">Home</a>
        <a href="/cats">Cats</a>
        <a href="/dogs">Dogs</a>
    `);
});

app.post('/cats', (req, res) => {
    console.log(req);
    res.send(`Nice post!`);
});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});

app.listen(3000, () => console.log('Server is listening on port 5000...'));

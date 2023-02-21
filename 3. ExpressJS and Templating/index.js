const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(htmlTemplate('Home page'));
});

app.get('/cats', (req, res) => {
    res.send(htmlTemplate('Cats page'));
});

app.get('/cats/1', (req, res) => {
    res.download('./barni.jpg');
});

app.get('/cats/:catId', (req, res) => {
    let { catId } = req.params;

    res.send(`
        ${htmlTemplate('Cat Details')}
              <p>I'm a very angry cat with id ${catId}!!</p>
        `);
});

app.get('/dogs', (req, res) => {
    res.send(htmlTemplate('Dogs Page'));
});

app.post('/cats', (req, res) => {
    res.send(`Nice post!`);
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'hello from json!!!' });
});

app.get('/redirect', (req, res) => {
    res.redirect('/cats');
});

app.get('*', (req, res) => {
    res.send('404 Not Found');
});


app.listen(3000, () => console.log('Server is listening on port 5000...'));

function htmlTemplate(title) {
    return `
        <h1>${title}</h1>
        <ul>    
            <li><a href="/">Home</a></li>
            <li><a href="/cats">Cats</a></li>
            <li><a href="/dogs">Dogs</a></li>
            <li><a href="/cats/1">Check out Barni - the cool cat</a></li>
        </ul>
        
        
        
       
    `;
}

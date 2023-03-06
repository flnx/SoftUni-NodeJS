const cookieParser = require('cookie-parser');
const express = require('express');
const { homePage, loginPage } = require('./templates');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/login', (req, res) => {
    res.send(loginPage);
});

app.get('/', (req, res) => {
    res.send(homePage);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username == 'Ivan' && password == 'peti') {
        const authData = { username: 'Ivan' };

        res.cookie('auth', JSON.stringify(authData));
        return res.redirect('/');
    }

    res.status(401).end();
});

app.get('/profile', (req, res) => {
    const authData = req.cookies['auth'];

    if(!authData) {
        return res.status(401).end();
    }

    const { username } = JSON.parse(authData);
    res.send(`<h2>Hello, ${username}</h2>`)

});

app.listen(3000, () => console.log('Server is running on port 3000'));

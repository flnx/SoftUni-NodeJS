const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const dataService = require('./dataService');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.get('/', (req, res) => {
    const authData = JSON.parse(req.cookies.authData);

    console.log(req.session);

    res.send(homePage(authData.username));
});

app.get('/login', (req, res) => {
    res.send(loginPage());
});

app.get('/register', (req, res) => {
    res.send(registerPage());
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        await dataService.loginUser(username, password);

        const authData = { username };

        res.cookie('authData', JSON.stringify(authData));
        req.session.username = username;
        req.session.privateInfo = `Hello there, Jedi ${username}!`;

        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        res.status(401).end();
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const authData = { username };
    res.cookie('authData', JSON.stringify(authData));

    req.session.username = username;
    req.session.privateInfo = `Hello there, Jedi ${username}!`;
    res.redirect('/profile');

    try {
        await dataService.registerUser(username, password);
    } catch (err) {
        console.log(err);
        res.status(401).end();
    }
});

app.get('/profile', (req, res) => {
    console.log(req.session);

    res.send(profilePage(req.session.username, req.session.privateInfo));
});

app.listen(3000, () => console.log('Server is running on port 3000'));

function loginPage() {
    return `
    <h1>Login</h1>
    <form method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />

        <label for="password">Password</label>
        <input type="password" name="password" id="password" />

        <input type="submit" value="Login" />
    </form>
`;
}

function registerPage() {
    return `
        <h1>Register</h1>
        <form method="POST">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" />

            <label for="password">Password</label>
            <input type="password" name="password" id="password" />

            <input type="submit" value="Register" />
        </form>
`;
}

function homePage(username) {
    return `
        <h1>Hello, ${username || 'Guest'}</h1>
        <p><a href="/profile">Profile</a></p> 
        <p><a href="/register">Register</a></p> 
        <p><a href="/login">Login</a></p>
`;
}

function profilePage(username, privateInfo) {
    return `<h2>Hello, ${username || 'Guest'}</h2> <p>${privateInfo || ''}</p>`;
}

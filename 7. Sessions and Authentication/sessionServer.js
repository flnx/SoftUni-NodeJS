const express = require('express');
const expressSession = require('express-session');

const dataService = require('./dataService');
const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(
    expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.get('/login', (req, res) => {
    res.send(loginPage());
});

app.get('/register', (req, res) => {
    res.send(registerPage());
});

app.get('/', (req, res) => {
    res.send(homePage());
});

app.post('/login', (req, res) => {
    res.redirect('/');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        await dataService.registerUser(username, password);
    } catch (err) {
        console.log(err);
    }

    req.session.username = username;
    res.redirect('/');
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

function homePage() {
    return `
        <h1>Hello</h1>
        <p><a href="/profile">Profile</a></p> 
        <p><a href="/register">Register</a></p> 
        <p><a href="/login">Login</a></p>
`;
}

function profilePage(username, privateInfo) {
    return `<h2>Hello, ${username || 'Guest'}</h2> <p>${privateInfo || ''}</p>`;
}

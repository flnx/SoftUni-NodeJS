const { isGuest, hasUser } = require('../middlewares/guards');
const { login, register } = require('../services/authService');


const authController = require('express').Router();

authController.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await login(username, password);
        attachToken(req, res, result);

        res.redirect('/');
    } catch (err) {
        res.render('login', {
            error: err.message,
        });
    }
});

authController.post('/register', async (req, res) => {
    const { username, password, rePass } = req.body;

    try {
        if (username.trim().length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        if (password !== rePass) {
            throw new Error("Passwords don't match");
        }

        const result = await register(username.trim(), password);

        attachToken(req, res, result);
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            error: err.message,
        });
    }
});

authController.get('/logout', hasUser(), async (req, res) => {
    console.log(req.cookies)
    res.clearCookie('jwt');
    res.redirect('/');
});

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14400000 });
}

module.exports = authController;

const { login } = require('../services/authService');

const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await login(username, password);
        const token = req.signJwt(result);
        res.cookie('jwt', token);
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            error: err.message,
        });
    }
});

module.exports = authController;

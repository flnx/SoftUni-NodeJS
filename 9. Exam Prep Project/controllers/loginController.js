const loginController = require('express').Router();
require('dotenv').config();

const handleErrors = require('../utils/errorHandler');
const jwt = require('../lib/jwt');

const { loginUser } = require('../services/userService');

loginController.get('/', (req, res) => {
    res.render('login');
});

loginController.post('/', async (req, res) => {
    try {
        const payload = await loginUser(req.body);

        const token = await jwt.sign(payload, process.env.SECRET, {
            expiresIn: '4h',
        });

        res.cookie('jwt', token, { maxAge: 14400000, httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            errors: handleErrors(err),
        });
    }
});

module.exports = loginController;

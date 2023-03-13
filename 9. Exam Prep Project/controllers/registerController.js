const registerController = require('express').Router();
require('dotenv').config();

const handleErrors = require('../utils/errorHandler');
const jwt = require('../lib/jwt');

const { registerUser } = require('../services/userService');

registerController.get('/', (req, res) => {
    res.render('register');
});

registerController.post('/', async (req, res) => {
    try {
        const payload = await registerUser(req.body);
        const token = await jwt.sign(payload, process.env.SECRET, {
            expiresIn: '4h',
        });

        res.cookie('jwt', token, { maxAge: 14400000, httpOnly: true });
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.render('register', {
            errors: handleErrors(err),
        });
    }
});

module.exports = registerController;

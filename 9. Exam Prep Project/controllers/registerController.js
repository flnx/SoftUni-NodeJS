const { registerUser } = require('../services/userService');
const registerController = require('express').Router();
const jwt = require('../lib/jwt');
require('dotenv').config();

const handleErrors = require('../utils/errorHandler');

registerController.get('/', (req, res) => {
    res.render('register');
});

registerController.post('/', async (req, res) => {
    try {
        const payload = await registerUser(req.body);
        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '4h' });
        
        res.cookie('jwt', token, { maxAge: 14400000 });

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.render('register', {
            errors: handleErrors(err),
        });
    }
});

module.exports = registerController;

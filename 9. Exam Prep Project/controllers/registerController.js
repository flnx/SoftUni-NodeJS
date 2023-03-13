const { registerUser } = require('../services/userService');
const registerController = require('express').Router();

const handleErrors = require('../utils/errorHandler');

registerController.get('/', (req, res) => {
    res.render('register');
});

registerController.post('/', async (req, res) => {
    try {
        await registerUser(req.body);

        res.redirect('/');
    } catch (err) {
        res.render('register', {
            errors: handleErrors(err),
        });
    }
});

module.exports = registerController;

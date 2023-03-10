const logoutController = require('express').Router();

logoutController.get('/', async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = logoutController;
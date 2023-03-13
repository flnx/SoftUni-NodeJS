const detailsController = require('express').Router();

detailsController.get('/', async (req, res) => {
    res.render('details');
});

module.exports = detailsController;
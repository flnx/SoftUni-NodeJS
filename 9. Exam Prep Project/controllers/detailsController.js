const detailsController = require('express').Router();

detailsController.get('/', (req, res) => {
    res.render('details');
});

module.exports = detailsController;
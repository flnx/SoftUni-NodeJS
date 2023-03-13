const searchController = require('express').Router();

searchController.get('/', (req, res) => {
    res.render('search');
});

module.exports = searchController;
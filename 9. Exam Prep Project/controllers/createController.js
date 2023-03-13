const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create');
});

module.exports = createController;
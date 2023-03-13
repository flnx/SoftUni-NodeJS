const editController = require('express').Router();

editController.get('/', (req, res) => {
    res.render('edit');
});

module.exports = editController;
const { addNewCrypto } = require('../services/cryptoService');
const handleErrors = require('../utils/errorHandler');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create');
});

createController.post('/', async (req, res) => {
    try {
        const result = await addNewCrypto(req.body);
        res.redirect(`/details/${result._id}`);
    } catch (err) {
        res.render('create', {
            errors: handleErrors(err),
        });
    }
});

module.exports = createController;

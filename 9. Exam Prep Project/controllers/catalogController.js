const { getAllCryptos } = require('../services/cryptoService');
const handleErrors = require('../utils/errorHandler');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    try {
        const cryptoData = await getAllCryptos();
        res.render('catalog', {
            cryptoData,
        });
    } catch (err) {
        res.render('catalog', {
            error: handleErrors(err),
        });
    }
});

module.exports = catalogController;

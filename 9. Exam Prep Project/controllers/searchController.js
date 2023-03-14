const { searchCrypto } = require('../services/cryptoService');
const handleErrors = require('../utils/errorHandler');

const searchController = require('express').Router();

searchController.get('/', (req, res) => {
    res.render('search');
});

searchController.post('/', async (req, res) => {
    try {
        const searchResult = await searchCrypto(req.body);

        let isNotMatch = searchResult.length == 0 ? true : false;

        res.render('search', {
            result: searchResult,
            isNotMatch
        });
    } catch (err) {
        res.render('search', {
            errors: handleErrors(err),
        });
    }
});

module.exports = searchController;

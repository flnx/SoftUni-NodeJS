const { getCryptoById } = require('../services/cryptoService');
const handleErrors = require('../utils/errorHandler');

const detailsController = require('express').Router();

detailsController.get('/:cryptoId', async (req, res) => {
    const { cryptoId } = req.params;

    try {
        const cryptoDetails = await getCryptoById(cryptoId);
        console.log(cryptoDetails);

        res.render('details', {
            crypto: {
                ...cryptoDetails,
                price: cryptoDetails.price.toFixed(2),
            },
        });
    } catch (err) {
        res.redirect('/404');
    }
});

module.exports = detailsController;

const { getCryptoById } = require('../services/cryptoService');
const { getUserById } = require('../services/userService');
const handleErrors = require('../utils/errorHandler');

const detailsController = require('express').Router();

detailsController.get('/:cryptoId', async (req, res) => {
    const { cryptoId } = req.params;

    try {
        const [cryptoDetails, user] = await Promise.all([
            getCryptoById(cryptoId),
            getUserById(req.user?._id),
        ]);

        const isBoughtByUser = user?._ownedCrypto.some((x) => x == cryptoDetails._id);
        const isOwner = cryptoDetails._ownerId == req.user?._id;

        res.render('details', {
            crypto: {
                ...cryptoDetails,
                price: cryptoDetails.price.toFixed(2),
            },
            isOwner,
            isNotOwner: !isOwner,
            isBoughtByUser,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
});

module.exports = detailsController;

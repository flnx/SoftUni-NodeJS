const { getCryptoById } = require('../services/cryptoService');
const {
    getUserById,
    findUserAndUpdateCrypto,
} = require('../services/userService');
const handleErrors = require('../utils/errorHandler');

const { isAuthenticated } = require('../middlewares/guards');

const detailsController = require('express').Router();

detailsController.get('/:cryptoId', async (req, res) => {
    const { cryptoId } = req.params;

    try {
        const [cryptoDetails, user] = await Promise.all([
            getCryptoById(cryptoId),
            getUserById(req.user?._id),
        ]);

        const isBoughtByUser = user?._ownedCrypto.some((x) => x.toString() == cryptoDetails._id);

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

detailsController.get('/:cryptoId/buy', isAuthenticated(), async (req, res) => {
    const { cryptoId } = req.params;
    const userId = req.user?._id;

    try {
        const crypto = await getCryptoById(cryptoId);
        const isOwner = crypto._ownerId == userId;

        if (isOwner) {
            throw Error('This crypto is already in your list!');
        }

        await findUserAndUpdateCrypto(userId, cryptoId);
        res.redirect(`/details/${cryptoId}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/details/${cryptoId}`);
    }
});

module.exports = detailsController;

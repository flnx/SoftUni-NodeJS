const Crypto = require('../models/cryptoSchema');

async function addNewCrypto({ name, imageUrl, price, description, payment }) {
    if (isNaN(price)) throw Error('Price must be a valid number');

    const crypto = await Crypto.create({
        name,
        imageUrl,
        price,
        description,
        payment,
    });

    return crypto;
}

async function getCryptoById(id) {
    return Crypto.findById(id).lean().exec();
}

module.exports = {
    addNewCrypto,
    getCryptoById,
};

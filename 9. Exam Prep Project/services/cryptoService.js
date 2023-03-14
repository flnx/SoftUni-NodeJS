const Crypto = require('../models/cryptoSchema');

async function addNewCrypto(cryptoData, ownerId) {
    const { name, imageUrl, price, description, payment } = cryptoData;

    if (isNaN(price)) throw Error('Price must be a valid number');

    console.log(ownerId);

    const crypto = await Crypto.create({
        name,
        imageUrl,
        price,
        description,
        payment,
        ownerId,
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

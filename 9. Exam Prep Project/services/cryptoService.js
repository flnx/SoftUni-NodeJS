const Crypto = require('../models/cryptoSchema');

async function addNewCrypto(cryptoData, _ownerId) {
    const { name, imageUrl, price, description, payment } = cryptoData;

    if (isNaN(price)) throw Error('Price must be a valid number');

    const crypto = await Crypto.create({
        name,
        imageUrl,
        price,
        description,
        payment,
        _ownerId,
    });

    return crypto;
}

async function getAllCryptos() {
    return Crypto.find({}).lean().exec();
}

async function getCryptoById(id) {
    return Crypto.findById(id).lean().exec();
}

async function searchCrypto({ searchParam, paymentMethod }) {
    return Crypto.find()
        .where('name')
        .regex(new RegExp(searchParam, 'i'))
        .where('payment')
        .equals(paymentMethod)
        .lean()
        .exec();
}

module.exports = {
    addNewCrypto,
    getCryptoById,
    getAllCryptos,
    searchCrypto,
};

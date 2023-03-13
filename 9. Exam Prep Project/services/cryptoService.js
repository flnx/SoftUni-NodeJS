const Crypto = require('../models/cryptoSchema');

async function cryptoService({ name, imageUrl, price, description, payment }) {
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

module.exports = {
    cryptoService,
};

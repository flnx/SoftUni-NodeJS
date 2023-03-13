const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');

const cryptoSchema = new Schema({
    name: {
        type: String,
        minLength: [2, 'Crypto must be at least 2 characters long'],
        trim: true,
        lowercase: true,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        trim: true,
        validate: [Math.sign, 'Price must be a positive number'],
        required: [true, 'Price is required'],
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: [validator.isURL, 'Invalid URL'],
        match: [
            /^(http|https):\/\//,
            'URL must start with "http://" or "https://"',
        ],
        required: [true, 'Image url is required'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [10, 'Description must be at least 10 characters long'],
        required: [true, 'Description is required'],
    },
    payment: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Payment method is required'],
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

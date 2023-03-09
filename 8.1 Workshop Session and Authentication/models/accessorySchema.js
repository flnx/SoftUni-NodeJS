const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 35,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 250,
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;

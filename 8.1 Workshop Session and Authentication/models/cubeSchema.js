const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        minLength: 6,
    },
    imageUrl: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 250,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 6,
    },
    accessories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Accessory',
            default: [],
        },
    ],
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;

const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const roomSchema = new Schema({
    city: { type: String, required: true },
    price: { type: Number, required: true, min: 0.01 },
    beds: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    imgUrl: { type: String },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

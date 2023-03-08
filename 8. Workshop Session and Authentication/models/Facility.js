const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const facilitySchema = new Schema({
    label: { type: String, required: true },
    iconUrl: { type: String },
    rooms: { type: [Types.ObjectId], default: [], ref: 'Room' },
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;

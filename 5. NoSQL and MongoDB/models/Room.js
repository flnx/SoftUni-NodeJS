const moongose = require('mongoose');
const { Schema } = require('mongoose');

const roomSchema = new Schema({
    city: { type: String, required: [true, 'City is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    beds: { type: Number, required: [true, 'Beds are required'], min: 1 },
    imgUrl: { type: String, required: [true, 'Image url is required'] },
});

roomSchema.methods.showCity = function () {
    return `${this.city} is awesome`;
};

roomSchema.path('price').validate(function () {
    return this.price > 0;
}, 'Price must be higher than 0');

roomSchema
    .virtual('town')
    .get(function () {
        return `${this.city} - ${this.description}`;
    })
    .set(function (updatedCity) {
        console.log(`${this.city} is changed to ${updatedCity}`);
        this.city = updatedCity;
    });

const Room = moongose.model('Room', roomSchema);

module.exports = Room;

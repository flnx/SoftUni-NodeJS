const Room = require('../models/Room');

function getAll(search) {
    return Room.find({ city: { $regex: new RegExp(search, 'i') } }).lean();
}

function getById(id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(roomData, ownerId) {
    const room = {
        city: roomData.city,
        description: roomData.description,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imgUrl: roomData.imgUrl,
        owner: ownerId,
    };

    const isFieldInvalid = Object.values(room).some((v) => !v);

    if (isFieldInvalid) {
        throw new Error('All fields are required!');
    }

    const result = await Room.create(room);

    return result;
}

module.exports = {
    getAll,
    getById,
    create,
};

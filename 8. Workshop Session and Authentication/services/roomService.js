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

async function updateRoom(roomId, newRoomData) {
    if (
        !newRoomData.city ||
        !newRoomData.description ||
        !newRoomData.price ||
        !newRoomData.beds ||
        !newRoomData.imgUrl
    ) {
        throw new Error('All fields are required!');
    }

    const isFieldInvalid = Object.values(newRoomData).some((v) => !v);

    if (isFieldInvalid) {
        throw new Error('All fields are required!');
    }

    const room = await Room.findById(roomId);

    room.city = newRoomData.city;
    room.description = newRoomData.description;
    room.price = Number(newRoomData.price);
    room.beds = Number(newRoomData.beds);
    room.imgUrl = newRoomData.imgUrl;

    room.save();

    return room;
}

async function deleteRoom(id) {
    return Room.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    updateRoom,
    deleteRoom,
};

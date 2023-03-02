const Room = require('../models/Room');

function getAll(search) {
   return Room.find({});
}

function getById(id) {
    return Room.findById(id);
}

// async function create(roomData) {
//     const room = {
//         city: roomData.city.trim(),
//         description: roomData.description.trim(),
//         price: Number(roomData.price),
//         beds: Number(roomData.beds),
//         imgUrl: roomData.imgUrl.trim(),
//     };

//     const isFieldInvalid = Object.values(room).some((v) => !v);

//     if (isFieldInvalid) {
//         throw new Error('All fields are required!');
//     }

//     catalogData.push(room);
//     await persist();
//     return room.id;
// }

// async function persist() {
//     await fs.writeFile(filename, JSON.stringify(catalogData, null, 2));
// }

module.exports = {
    getAll,
    getById,
};

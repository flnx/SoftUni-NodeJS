const fs = require('fs/promises');
const catalogData = require('./database.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filename = path.resolve(__dirname, './database.json');

function getAll(search) {
    return catalogData.filter((x) =>
        x.city.toLowerCase().includes(search.toLowerCase())
    );
}

function getById(id) {
    return catalogData.find((x) => x.id == id);
}

async function create(roomData) {
    const room = {
        city: roomData.city.trim(),
        description: roomData.description.trim(),
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imgUrl: roomData.imgUrl.trim(),
        id: uuidv4(),
    };

    const isFieldInvalid = Object.values(room).some((v) => !v);

    if (isFieldInvalid) {
        throw new Error('All fields are required!');
    }

    catalogData.push(room);
    await persist();
    return room.id;
}

async function persist() {
    fs.writeFile(filename, JSON.stringify(catalogData2, null, 2));
}

module.exports = {
    getAll,
    getById,
    create,
};

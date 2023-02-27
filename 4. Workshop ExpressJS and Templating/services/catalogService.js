const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filename = './services/database.json';
const catalogData = JSON.parse(fs.readFileSync(filename));

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
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(catalogData, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    getAll,
    getById,
    create,
};

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filename = './services/database.json';
const catalogData = JSON.parse(fs.readFileSync(filename));

function getAll() {
    return catalogData;
}

function getById(id) {
    return catalogData.find((x) => x.id == id);
}

async function create(roomData) {
    if (
        !roomData.city ||
        !roomData.description ||
        !roomData.price ||
        !roomData.beds ||
        !roomData.imgUrl
    ) {
        throw new Error('Missing fields...');
    }

    const room = {
        city: roomData.city,
        description: roomData.description,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imgUrl: roomData.imgUrl,
        id: uuidv4(),
    };

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

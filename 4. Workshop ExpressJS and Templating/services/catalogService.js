const fs = require('fs');

const filename = './services/database.json';
const catalogData = JSON.parse(fs.readFileSync(filename));

function getAll() {
    return catalogData;
}

function getById(id) {
    return catalogData.find(x => x.id == id);
}

module.exports = {
    getAll,
    getById
};

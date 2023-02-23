const fs = require('fs');
const fsp = require('fs/promises');

/** @type {Object[]} */

const data = JSON.parse(fs.readFileSync('./services/data.json'));

function getList() {
    return data;
}

function getById(id) {
    return data.find((p) => p.id == id);
}

async function create(name, price) {
    const id = 'asdf-' + ('0000' + ((Math.random() * 99999) | 0)).slice(-4);

    data.push({
        id,
        name,
        price,
    });

    await persist();
}

async function deleteById(id) {
    const index = data.findIndex(p => p.id == id);
    data.splice(index, 1);

    await persist();
}

async function persist() {
    return await fsp.writeFile('./services/data.json', JSON.stringify(data, null, 2));

    // return new Promise((resolve, reject) => {
    //     fs.writeFile('./services/data.json', JSON.stringify(data, null, 2),
    //         (err) => {
    //             if (err == null) {
    //                 resolve();
    //             } else {
    //                 reject(err);
    //             }
    //         }
    //     );
    // });
}

module.exports = {
    getList,
    getById,
    create,
    deleteById
};

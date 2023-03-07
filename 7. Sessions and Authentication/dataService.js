const fs = require('fs/promises');
const bcrypt = require('bcrypt');

const db = require('./db.json');

async function saveDb() {
    const data = JSON.stringify(db, null, 2);

    await fs.writeFile('./db.json', data);
}

exports.registerUser = async (username, password) => {
    if (db.users.some((x) => x.username === username)) {
        throw 'User already exist';
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    db.users.push({
        username,
        password: hash,
    });

    await saveDb();
};
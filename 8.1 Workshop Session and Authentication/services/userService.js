const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

async function registerUser({ username, password }) {
    const isUserTaken = await User.findOne({
        username: new RegExp(username, 'i'),
    });

    if (isUserTaken) {
        throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword,
    });

    return {
        username,
    };
}

module.exports = registerUser;

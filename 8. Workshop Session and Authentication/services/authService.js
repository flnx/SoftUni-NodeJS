const bcrypt = require('bcrypt');
const User = require('../models/User');

async function login(username, password) {
    const user = await User.findOne({
        username: { $regex: new RegExp(username, 'i') },
    });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return {
        username: user.username,
        user: user.roles,
    };
}

async function register(username, password) {
    const isUserAlreadyTaken = await User.findOne({
        username: { $regex: new RegExp(username, 'i') },
    });

    if (isUserAlreadyTaken) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword,
    });

    return {
        username,
        roles: user.roles,
    };
}

module.exports = {
    login,
    register,
};

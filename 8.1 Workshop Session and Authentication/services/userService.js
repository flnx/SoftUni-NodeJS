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
        _id: user._id,
    };
}

async function loginUser({ username, password }) {
    const user = await User.findOne({
        username: new RegExp(username, 'i'),
    });

    if (!user) {
        throw Error('Wrong username or password.');
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
        throw new Error('Wrong username or password.');
    }

    return {
        username,
        _id: user._id,
    };
}

async function logoutUser(username) {

}

module.exports = {
    loginUser,
    registerUser,
};

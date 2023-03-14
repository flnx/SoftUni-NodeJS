const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

async function registerUser({ username, password, rePass, email }) {
    if (password != rePass) {
        throw Error("Passwords don't match");
    }

    if (password.length < 6) {
        throw Error('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        email,
    });

    return {
        username,
        email,
        _id: user._id,
    };
}

async function loginUser({ email, password }) {
    const user = await User.findOne({
        email: new RegExp(email, 'i'),
    });

    if (!user || !password) {
        throw Error('Invalid username or password');
    }

    if (password.length < 6) {
        throw Error('Password must be at least 6 characters long');
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
        throw Error('Invalid username or password');
    }

    return {
        username: user.username,
        email: user.email,
        _id: user._id,
    };
}

async function getUserById(id) {
    return User.findById(id).select('_ownedCrypto').lean().exec();
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
};

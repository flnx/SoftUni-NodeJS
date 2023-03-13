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

module.exports = {
    registerUser,
};

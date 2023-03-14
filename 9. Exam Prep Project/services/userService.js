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

async function findUserAndUpdateCrypto(userId, cryptoId) {
    // there is another alternative to that. Explanation at the bottom
    const user = await User.findById(userId).exec();

    const isBoughtByUser = user?._ownedCrypto.some((x) => x.toString() == cryptoId);

    if (isBoughtByUser) {
        throw Error('This crypto is already in your list!');
    }

    user._ownedCrypto.push(cryptoId);
    await user.save();
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    findUserAndUpdateCrypto,
};

// await user.updateOne({ _id: userId }, { $push: { _ownedCrypto: cryptoId } });

// This code snippet updates the user document with the specified _id by adding the new ID to the ids array using the $push operator. This approach can be more efficient than retrieving the entire document from the database and modifying the array in memory, especially if you have very large arrays and/or many concurrent updates.

// However, using the $push operator directly requires you to write more complex and low-level MongoDB queries, which may not be as easy to read and maintain as the Mongoose code. It also requires more careful handling of concurrency and error conditions. So, you should carefully consider your specific needs and constraints before deciding which approach to use.


const bcrypt = require('bcrypt');
const User = require('../models/User');

async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username.toLowerCase() == 'peter' && password == '123456') {
            resolve({
                _id: '123f',
                username: 'Peter',
                roles: ['user'],
            });
        } else {
            reject(new Error('Incorrect username or password'));
        }
    });
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

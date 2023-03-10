const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
        minLength: 6
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
    },
    hashedPassword: {
        type: String,
    },
    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

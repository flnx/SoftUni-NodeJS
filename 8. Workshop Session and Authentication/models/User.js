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

userSchema.index({ username: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

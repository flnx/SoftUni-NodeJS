require('dotenv').config();

const config = {
    development: {
        PORT: process.env.DEV_PORT,
    },
    production: {
        PORT: process.env.PROD_PORT,
    },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];

const config = {
    development: {
        PORT: process.env.PORT || 3000
    },
    production: {}
}

const env = process.env.NODE_ENV || 'development';

module.exports = config[env]
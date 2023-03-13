const mongoose = require('mongoose');

require('dotenv').config();

async function database() {
    try {
        await mongoose.connect(process.env.DATABASE_KEY);
    } catch (err) {
        console.error('----- Error initializing database -----');
        console.error(err.message);
        process.exit(1);
    }

    console.log('----- DATABASE CONNECTED -----');
}

module.exports = database;

const mongoose = require('mongoose');

const connStr = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/booking';

database().catch((err) => {
    console.error('Error initializing database');
    console.error(err.message);
    process.exit(1);
});

async function database(app) {
    await mongoose.connect(connStr);
    console.log('Database connected');
}

module.exports = database;

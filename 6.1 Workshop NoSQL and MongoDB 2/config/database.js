const mongoose = require('mongoose');

const mongoURI = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/cubicle';

database().catch((err) => {
    console.error('----- Error initializing database -----');
    console.error(err.message);
    process.exit(1);
});

async function database() {
    await mongoose.connect(mongoURI);
    
    console.log('Database connected')
}

module.exports = database;

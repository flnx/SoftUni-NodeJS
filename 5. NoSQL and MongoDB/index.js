const mongoose = require('mongoose');
const Room = require('./models/Room');

const connectionString = 'mongodb://127.0.0.1:27017/booking';

start().catch((err) => console.log(err));

async function start() {
    await mongoose.connect(connectionString);

    const data = await Room.find({});

    const room = new Room({
        city: 'Sopot',
        description: 'Room with a nice view',
        price: 10,
        beds: 2,
        imgUrl: 'https://i.pinimg.com/736x/11/1c/ca/111cca84d4355a1eefd13ac0ad67f13d.jpg',
    });

    await room.save();

    // data[0].town = 'Nesebar';
    // await data[0].save();
    // console.log(data[0].showCity());
    // console.log(data[0].town);
}

// const room = new Room({
//     city: 'Varna',
//     description: 'Room with a nice view',
//     price: 55,
//     beds: 2,
//     imgUrl: 'https://i.pinimg.com/736x/11/1c/ca/111cca84d4355a1eefd13ac0ad67f13d.jpg',
// });

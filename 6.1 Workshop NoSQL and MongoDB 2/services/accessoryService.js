const Accessory = require('../models/accessorySchema');

async function getAllAccessories() {
    const x = await Accessory.find().select('name').lean();
    console.log(x);

    return x;
}

async function createAccessory(accessoryData) {
    const accessory = {
        name: accessoryData.name,
        description: accessoryData.description,
        imageUrl: accessoryData.imageUrl,
    };

    const result = await Accessory.create(accessory);

    return result;
}

async function attachAccessory(data, id) {}

module.exports = {
    createAccessory,
    attachAccessory,
    getAllAccessories,
};

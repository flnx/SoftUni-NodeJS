const Accessory = require('../models/accessorySchema');
const Cube = require('../models/cubeSchema');

async function getAllAccessories() {
    const x = await Accessory.find().select('name').lean();

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

async function attachAccessory(accessoryId, cubeId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    await cube.save();
}

module.exports = {
    createAccessory,
    attachAccessory,
    getAllAccessories,
};

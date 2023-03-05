const Accessory = require("../models/accessorySchema");

async function createAccessory(accessoryData) {
    const accessory = {
        name: accessoryData.name,
        description: accessoryData.description,
        imageUrl: accessoryData.imageUrl
    }

    const result = await Accessory.create(accessory);

    return result;
}

module.exports = {
    createAccessory
}
const Cube = require('../models/cubeSchema');

async function getAllCubes() {
    return Cube.find({}).lean();
}

async function createCube(cubeData) {
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel),
    };

    const result = await Cube.create(cube);

    return result;
}

module.exports = {
    createCube,
    getAllCubes
}
const Cube = require('../models/cubeSchema');

async function getAllCubes({ search, from, to }) {
    const queryParam = search?.toLowerCase() || '';
    const difficultyFrom = Number(from) || 0;
    const difficultyTo = Number(to) || 6;

    let cubes = await Cube.find({
        name: { $regex: new RegExp(queryParam, 'i') },
    })
        .where('difficultyLevel')
        .gte(difficultyFrom)
        .lte(difficultyTo)
        .lean();

    return cubes;
}

async function getCubeById(id) {
    return Cube.findById(id).populate('accessories').lean();
}

async function createCube(cubeData, creatorId) {
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel),
        creatorId,
    };

    const result = await Cube.create(cube);

    return result;
}

async function updateCube(cubeData, cubeId) {
    const cube = await Cube.findById(cubeId);

    cube.name = cubeData.name;
    cube.description = cubeData.description;
    cube.imageUrl = cubeData.imageUrl;
    cube.difficultyLevel = Number(cubeData.difficultyLevel);

    await cube.save();

    return cube;
}

async function deleteCube(cubeId) {
    return Cube.findByIdAndRemove(cubeId);
}

module.exports = {
    createCube,
    getAllCubes,
    getCubeById,
    updateCube,
    deleteCube,
};

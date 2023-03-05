const Cube = require('../models/cubeSchema');

async function getAllCubes({ search, from, to }) {
    const queryParam = search?.toLowerCase() || '';
    const difficultyFrom = Number(from) || 0;
    const difficultyTo = Number(to) || 6;

    let cubes = await Cube.find({name: { $regex: new RegExp(queryParam, 'i') }})
        .where('difficultyLevel')
        .gte(difficultyFrom)
        .lte(difficultyTo)
        .lean();

    return cubes;
}

async function getCubeById(id) {
    return Cube.findById(id).populate('accessories').lean();
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
    getAllCubes,
    getCubeById,
};

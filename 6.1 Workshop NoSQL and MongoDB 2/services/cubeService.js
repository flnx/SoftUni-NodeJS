const Cube = require('../models/cubeSchema');

async function getAllCubes({ search, from, to }) {
    const queryParam = search?.toLowerCase() || '';
    const difficultyFrom = Number(from);
    const difficultyTo = Number(to);

    let cubes = await Cube.find({
        name: {
            $regex: new RegExp(queryParam, 'i'),
        },
    }).lean();

    if (difficultyFrom) {
        cubes = cubes.filter(c => c.difficultyLevel >= difficultyFrom);
    }
    
    if (difficultyTo) {
        cubes = cubes.filter(c => c.difficultyLevel <= difficultyTo);
    }

    return cubes;
}

async function getCubeById(id) {
    return Cube.findById(id).lean();
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

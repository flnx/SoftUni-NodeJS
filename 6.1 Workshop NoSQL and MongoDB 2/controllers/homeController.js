const { getAllCubes } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();

    res.render('home', {
        cubes,
    });
});

module.exports = router;

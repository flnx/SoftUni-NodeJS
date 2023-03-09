const { getAllCubes } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    const cubes = await getAllCubes({ search, from, to });

    res.render('home', {
        cubes,
    });
});

module.exports = router;

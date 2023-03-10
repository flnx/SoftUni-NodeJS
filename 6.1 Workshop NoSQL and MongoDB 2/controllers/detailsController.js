const { getCubeById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);

    res.render('details', {
        cube,
    });
});

module.exports = router;

const { getCubeById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);

    res.render('attachAccessory.hbs', {
        cube,
    });
});

module.exports = router; 

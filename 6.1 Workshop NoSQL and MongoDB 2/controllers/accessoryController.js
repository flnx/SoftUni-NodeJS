const { attachAccessory, getAllAccessories } = require('../services/accessoryService');
const { getCubeById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);
    const accessories = await getAllAccessories();

    res.render('attachAccessory.hbs', {
        cube,
        accessories
    });
});

router.post('/accessory/:cubeId', async(req, res) => {
    const { cubeId } = req.params;
    console.log(req.body);
});

module.exports = router; 

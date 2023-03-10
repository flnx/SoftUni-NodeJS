const { attachAccessory, getAllAccessories } = require('../services/accessoryService');
const { getCubeById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);
    const accessories = await getAllAccessories();

    res.render('attachAccessory', {
        cube,
        accessories
    });
});

router.post('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const { accessory } = req.body;

    try {
        await attachAccessory(accessory, cubeId);
        res.redirect(`/attach/accessory/${cubeId}`)

    } catch(err) {
        console.log(err.message)
    }

});

module.exports = router; 

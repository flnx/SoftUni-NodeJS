const { getCubeById, updateCube } = require('../services/cubeService');

const router = require('express').Router();

router.get('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);

    const isOwner = req.user._id == cube.creatorId.toString();

    if (!isOwner) {
        return res.redirect(`/details/${cubeId}`);
    }

    res.render('edit', {
        title: 'Edit Room',
        cube,
    });
});

router.post('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);

    const isOwner = req.user._id == cube.creatorId.toString();

    if (!isOwner) {
        return res.redirect(`/details/${cubeId}`);
    }

    try {
        const updatedRoom = await updateCube(req.body, cubeId);
        res.redirect(`/details/${updatedRoom._id}`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Room',
            cube,
            error: err.message,
        });
    }
});

module.exports = router;

const { getCubeById, deleteCube } = require('../services/cubeService');

const router = require('express').Router();

router.get('/accessory/:cubeId', async (req, res) => {
    const { cubeId } = req.params;

    const cube = await getCubeById(cubeId);

    const isOwner = req.user._id == cube.creatorId.toString();

    if (!isOwner) {
        return res.redirect(`/details/${cubeId}`);
    }

    res.render('delete', {
        title: 'Delete Room',
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
        await deleteCube(cubeId);
        res.redirect(`/`);
    } catch (err) {
        res.render('delete', {
            title: 'Delete Room',
            cube,
            error: err.message,
        });
    }
});

module.exports = router;

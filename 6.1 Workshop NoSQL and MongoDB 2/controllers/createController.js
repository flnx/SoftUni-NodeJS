const { createCube } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('create');
});

router.get('/accessory', (req, res) => {
    res.render('createAccessory.hbs');
});

router.post('/', async (req, res) => {
    try {
        const cube = await createCube(req.body);
        console.log(cube);
        res.redirect('/create');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;

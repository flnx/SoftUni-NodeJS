const { createAccessory } = require('../services/accessoryService');
const { createCube } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('create');
});

router.get('/accessory', (req, res) => {
    res.render('createAccessory');
});

router.post('/accessory', async (req, res) => {
    try {
        await createAccessory(req.body);
        res.redirect('/create/accessory')
    } catch (err) {
        const errorMessages = err.message.split(',');

        res.render('createAccessory', {
            errors: errorMessages,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        await createCube(req.body);
        res.redirect('/create');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;

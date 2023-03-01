const { create } = require('../services/catalogService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('host');
});

router.post('/', async(req, res) => {
    try {
        const roomId = await create(req.body);
        res.redirect(`/catalog/${roomId}`);
    } catch (err) {
        res.render('host', {
            error: err
        })
    }
});

module.exports = router;

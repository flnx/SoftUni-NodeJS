const { hasUser } = require('../middlewares/guards');
const { create } = require('../services/roomService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('host');
});

router.post('/', async (req, res) => {
    try {
        const room = await create(req.body, req.user._id);
        
        res.redirect(`/catalog/${room._id}`);
    } catch (err) {
        res.render('host', {
            error: err.message,
        });
    }
});

module.exports = router;

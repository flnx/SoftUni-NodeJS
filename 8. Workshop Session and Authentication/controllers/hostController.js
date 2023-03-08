const { create } = require('../services/roomService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('host');
});

router.post('/', async (req, res) => {
    console.log(req);
    
    try {
        const room = await create(req.body);
        
        res.redirect(`/catalog/${room._id}`);
    } catch (err) {
        console.log(err.message);
        res.render('host', {
            error: err,
        });
    }
});

module.exports = router;

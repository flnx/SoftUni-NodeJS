const router = require('express').Router();
const { getAll, getById } = require('../services/catalogService');

router.get('/', (req, res) => {
    const rooms = getAll();
    res.render('catalog', {
        rooms
    });
});

router.get('/:roomId', (req, res) => {
    const { roomId } = req.params;

    const room = getById(roomId);
    console.log(room);

    res.render('details', {
        room
    });
});

module.exports = router;
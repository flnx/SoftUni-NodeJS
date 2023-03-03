const router = require('express').Router();
const { getAll, getById } = require('../services/roomService');

router.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';
    const rooms = await getAll(searchQuery);

    res.render('catalog', {
        rooms,
        search: searchQuery,
    });
});

router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params;

    const room = await getById(roomId);

    res.render('details', {
        room,
    });
});

module.exports = router;

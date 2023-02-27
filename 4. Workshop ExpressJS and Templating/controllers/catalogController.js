const router = require('express').Router();
const { getAll, getById } = require('../services/catalogService');

router.get('/', (req, res) => {
    const searchQuery = req.query.search || '';
    const rooms = getAll(searchQuery);

    res.render('catalog', {
        rooms,
        search: searchQuery,
    });
});

router.get('/:roomId', (req, res) => {
    const { roomId } = req.params;

    const room = getById(roomId);

    res.render('details', {
        room,
    });
});

module.exports = router;

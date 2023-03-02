const router = require('express').Router();
const { getAllFacilities } = require('../services/facilityService');
const { getAll, getById } = require('../services/roomService');
const facilityController = require('./facilityController');

router.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';
    const rooms = await getAll(searchQuery).lean();

    res.render('catalog', {
        rooms,
        search: searchQuery,
    });
});

router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params;

    const room = await getById(roomId).lean();

    res.render('details', {
        room,
    });
});

module.exports = router;

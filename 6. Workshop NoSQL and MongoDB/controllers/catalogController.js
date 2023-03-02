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

facilityController.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    const facilities = await getAllFacilities();

    console.log(facilities);

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities
    })
});

module.exports = router;
